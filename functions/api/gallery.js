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
  const match = valueString.match(/\/folders\/([a-zA-Z0-9_-]+)/)

  return match ? match[1] : valueString
}

function decodeHtml(value) {
  return value
    .replace(/&/g, '&')
    .replace(/"/g, '"')
    .replace(/'/g, "'")
    .replace(/</g, '<')
    .replace(/>/g, '>')
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
        /(?:[A-Za-z0-9_ .()\-\[\]:]+)(?:\.(?:png|jpe?g|webp|gif|avif))?/gi
      ),
    ]
      .map((item) => ({
        name: decodeHtml(item[0]).trim(),
        position: start + item.index,
      }))
      .filter((item) => {
        const lower = item.name.toLowerCase()
        return (
          item.name.length > 0 &&
          !lower.includes('drive.google') &&
          !lower.includes('google') &&
          !lower.includes('drive') &&
          !lower.startsWith('http') &&
          !lower.includes('//') &&
          !lower.includes('a href') &&
          !lower.includes('class') &&
          !lower.includes('data')
        )
      })

    const validNames = names.sort(
      (a, b) =>
        Math.abs(a.position - match.index) -
        Math.abs(b.position - match.index)
    )

    let rawFilename = null
    for (const item of validNames) {
      const low = item.name.toLowerCase()
      if (
        !low.includes('drive') &&
        !low.includes('google') &&
        !low.includes('http') &&
        item.name.length < 60
      ) {
        rawFilename = item.name
        break
      }
    }

    const filename =
      rawFilename &&
      !rawFilename.toLowerCase().includes('drive') &&
      !rawFilename.toLowerCase().includes('google')
        ? rawFilename.includes('.')
          ? rawFilename
          : `${rawFilename}.png`
        : `VRChat Shot ${entries.size + 1}`

    if (!entries.has(id)) {
      entries.set(id, {
        id,
        filename,
        creationTime: null,
      })
    }
  }

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
    }
  }

  return [...entries.values()]
}

function buildImageUrl(fileId) {
  return `https://drive.google.com/thumbnail?id=${encodeURIComponent(
    fileId
  )}&sz=w1000`
}

function buildFallbackImageUrl(fileId) {
  return `https://drive.google.com/uc?export=view&id=${encodeURIComponent(
    fileId
  )}`
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