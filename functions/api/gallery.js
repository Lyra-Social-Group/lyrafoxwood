// functions/api/gallery.js
// Lists public Google Drive images from the configured folders.

const FOLDER_ENV_BY_CATEGORY = {
  'me': 'VITE_DRIVE_ME',
  'me and confetti': 'VITE_DRIVE_ME_CONFETTI',
  'me and luna': 'VITE_DRIVE_ME_LUNA',
  'me and milk': 'VITE_DRIVE_ME_MILK',
  'Me & Darienfox': 'VITE_DRIVE_ME_DARIENFOX',
  'Me & Fox': 'VITE_DRIVE_ME_FOX',
  'Me & Uni': 'VITE_DRIVE_ME_UNI',
  'Me & Lyraboone': 'VITE_DRIVE_ME_LYRABOONE',
  'Me & Quinnexe': 'VITE_DRIVE_ME_QUINNEXE',
  'Syru & Kasuri': 'VITE_DRIVE_SYRU_KASURI',
  'Furality Ultra': 'VITE_DRIVE_FURALITY_ULTRA',
}

const IMAGE_EXTENSIONS = /\.(?:png|jpe?g|webp|gif|avif)$/i

const IMAGE_MIME_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'image/avif',
])

const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
}

const CACHE_HEADERS = {
  ...JSON_HEADERS,
  'Cache-Control': 'public, max-age=300, s-maxage=300',
}

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      ...JSON_HEADERS,
      ...(init.headers || {}),
    },
  })
}

function getFolderId(value) {
  if (!value) return null

  const valueString = String(value).trim()

  // Accept either a raw folder ID or a complete Drive folder URL.
  const match = valueString.match(/\/folders\/([a-zA-Z0-9_-]+)/)

  return match ? match[1] : valueString
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

function safeDate(value) {
  if (!value) return null

  const date = new Date(value)

  return Number.isNaN(date.getTime())
    ? null
    : date.toISOString()
}

function parseDriveEntries(html) {
  const entries = new Map()

  /*
   * Google Drive embedded folder view normally contains links such as:
   *
   * https://drive.google.com/file/d/FILE_ID/view
   *
   * We extract those file IDs and then attempt to find the nearby filename.
   */

  const fileLinkRegex =
    /https?:\\?\/\\?\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]{10,})\/view(?:\?[^"'\\s<>]*)?/g

  let match

  while ((match = fileLinkRegex.exec(html)) !== null) {
    const id = match[1]

    const start = Math.max(0, match.index - 2500)
    const end = Math.min(
      html.length,
      fileLinkRegex.lastIndex + 2500
    )

    const context = html.slice(start, end)

    const names = [
      ...context.matchAll(
        /(?:[A-Za-z0-9_ .()\-\[\]]+\.(?:png|jpe?g|webp|gif|avif))/gi
      ),
    ]
      .map((item) => ({
        name: decodeHtml(item[0]).trim(),
        position: start + item.index,
      }))
      .filter((item) => IMAGE_EXTENSIONS.test(item.name))

    const filename = names.length
      ? names.sort(
          (a, b) =>
            Math.abs(a.position - match.index) -
            Math.abs(b.position - match.index)
        )[0].name
      : `VRChat Shot ${entries.size + 1}`

    if (!entries.has(id)) {
      entries.set(id, {
        id,
        filename,
        creationTime: null,
      })
    }
  }

  /*
   * Fallback for newer Google Drive markup.
   *
   * Google sometimes exposes the folder contents through the internal
   * _DRIVE_ivd structure.
   */

  const ivdMatch = html.match(
    /window\['_DRIVE_ivd'\]\s*=\s*'([\s\S]*?)';/
  )

  if (ivdMatch) {
    let encoded = ivdMatch[1]

    encoded = encoded
      .replace(
        /\\x([0-9a-f]{2})/gi,
        (_, hex) =>
          String.fromCharCode(parseInt(hex, 16))
      )
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\')

    try {
      const data = JSON.parse(encoded)

      const rows = Array.isArray(data?.[0])
        ? data[0]
        : []

      for (const row of rows) {
        if (!Array.isArray(row) || row.length < 4) {
          continue
        }

        const id =
          typeof row[0] === 'string'
            ? row[0]
            : null

        const filename =
          typeof row[2] === 'string'
            ? row[2]
            : null

        const mimeType =
          typeof row[3] === 'string'
            ? row[3]
            : null

        if (
          !id ||
          !filename ||
          (
            !IMAGE_EXTENSIONS.test(filename) &&
            !IMAGE_MIME_TYPES.has(mimeType)
          )
        ) {
          continue
        }

        const existing = entries.get(id)

        entries.set(id, {
          id,
          filename,
          creationTime:
            existing?.creationTime || null,
        })
      }
    } catch {
      // Ignore malformed internal Drive data.
      // Explicit file links will still be used.
    }
  }

  return [...entries.values()]
}

function buildImageUrl(fileId) {
  /*
   * Google Drive thumbnail endpoint.
   *
   * IMPORTANT: this endpoint only accepts a single dimension in `sz`
   * (e.g. `w1000`). Passing a combined `w-h` value (e.g. `w1600-h1200`)
   * is NOT supported here and causes the request to fail, which is why
   * images were rendering as blank boxes.
   */

  return `https://drive.google.com/thumbnail?id=${encodeURIComponent(
    fileId
  )}&sz=w1000`
}

function buildFallbackImageUrl(fileId) {
  /*
   * Alternate host for public Drive images. This one DOES accept the
   * combined `w-h` sizing syntax. Used as a client-side fallback if the
   * primary thumbnail URL above ever fails to load (e.g. transient
   * Google-side throttling).
   */

  return `https://lh3.googleusercontent.com/d/${encodeURIComponent(
    fileId
  )}=w1000-h1000`
}

async function fetchFolder(folderId) {
  const url =
    `https://drive.google.com/embeddedfolderview?id=` +
    `${encodeURIComponent(folderId)}#grid`

  const response = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
        'AppleWebKit/537.36 (KHTML, like Gecko) ' +
        'Chrome/124.0.0.0 Safari/537.36',

      'Accept-Language':
        'en-US,en;q=0.9',
    },

    redirect: 'follow',
  })

  if (!response.ok) {
    throw new Error(
      `Google Drive returned HTTP ${response.status}`
    )
  }

  return response.text()
}

export async function onRequest(context) {
  const url = new URL(context.request.url)

  /*
   * IMPORTANT:
   * The default category is "me", not "Me (Lyra)".
   */

  const category =
    url.searchParams.get('category') || 'me'

  const envName =
    FOLDER_ENV_BY_CATEGORY[category]

  const folderId =
    getFolderId(
      envName
        ? context.env?.[envName]
        : null
    )

  if (!envName || !folderId) {
    return json(
      {
        category,
        photos: [],
        error:
          'Gallery folder is not configured.',
      },
      {
        status: 404,
      }
    )
  }

  try {
    const html =
      await fetchFolder(folderId)

    const entries =
      parseDriveEntries(html)

    const photos = entries
      .filter((entry) =>
        IMAGE_EXTENSIONS.test(entry.filename)
      )
      .map((entry, index) => ({
        id: `${category}-${entry.id}`,

        filename:
          entry.filename ||
          `VRChat Shot #${index + 1}`,

        creationTime:
          safeDate(entry.creationTime),

        baseUrl:
          buildImageUrl(entry.id),

        fallbackUrl:
          buildFallbackImageUrl(entry.id),

        driveUrl:
          `https://drive.google.com/file/d/` +
          `${entry.id}/view`,
      }))

    return new Response(
      JSON.stringify({
        category,
        photos,
      }),
      {
        headers: CACHE_HEADERS,
      }
    )
  } catch (err) {
    return json(
      {
        category,
        photos: [],

        error:
          err instanceof Error
            ? err.message
            : 'Unable to load Google Drive folder.',
      },
      {
        status: 502,
      }
    )
  }
}