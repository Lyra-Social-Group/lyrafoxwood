import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

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

const IMAGE_EXTENSIONS =
  /\.(?:png|jpe?g|webp|gif|avif)$/i

const IMAGE_MIME_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'image/avif',
])

function getFolderId(value) {
  if (!value) return null

  const raw = String(value).trim()

  const match =
    raw.match(
      /\/folders\/([a-zA-Z0-9_-]+)/
    )

  return match
    ? match[1]
    : raw
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

function parseDriveEntries(html) {
  const entries = new Map()

  const fileLinkRegex =
    /https?:\\?\/\\?\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]{10,})\/view(?:\?[^"'\\s<>]*)?/g

  let match

  while (
    (match = fileLinkRegex.exec(html)) !== null
  ) {
    const id = match[1]

    const start =
      Math.max(
        0,
        match.index - 2500
      )

    const end =
      Math.min(
        html.length,
        fileLinkRegex.lastIndex + 2500
      )

    const context =
      html.slice(start, end)

    const names = [
      ...context.matchAll(
        /(?:[A-Za-z0-9_ .()\-\[\]]+\.(?:png|jpe?g|webp|gif|avif))/gi
      ),
    ]
      .map((item) => ({
        name:
          decodeHtml(item[0]).trim(),

        position:
          start + item.index,
      }))
      .filter((item) =>
        IMAGE_EXTENSIONS.test(
          item.name
        )
      )

    const filename = names.length
      ? names.sort(
          (a, b) =>
            Math.abs(
              a.position -
              match.index
            ) -
            Math.abs(
              b.position -
              match.index
            )
        )[0].name
      : `VRChat Shot ${entries.size + 1}`

    if (!entries.has(id)) {
      entries.set(id, {
        id,
        filename,
      })
    }
  }

  const ivdMatch =
    html.match(
      /window\['_DRIVE_ivd'\]\s*=\s*'([\s\S]*?)';/
    )

  if (ivdMatch) {
    let encoded =
      ivdMatch[1]
        .replace(
          /\\x([0-9a-f]{2})/gi,
          (_, hex) =>
            String.fromCharCode(
              parseInt(
                hex,
                16
              )
            )
        )
        .replace(
          /\\'/g,
          "'"
        )
        .replace(
          /\\"/g,
          '"'
        )
        .replace(
          /\\\\/g,
          '\\'
        )

    try {
      const data =
        JSON.parse(encoded)

      const rows =
        Array.isArray(data?.[0])
          ? data[0]
          : []

      for (const row of rows) {
        if (
          !Array.isArray(row) ||
          row.length < 4
        ) {
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
            !IMAGE_EXTENSIONS.test(
              filename
            ) &&
            !IMAGE_MIME_TYPES.has(
              mimeType
            )
          )
        ) {
          continue
        }

        entries.set(
          id,
          {
            id,
            filename,
          }
        )
      }
    } catch {
      // Keep explicit file links.
    }
  }

  return [
    ...entries.values(),
  ].filter(
    (entry) =>
      IMAGE_EXTENSIONS.test(
        entry.filename
      )
  )
}

async function loadDrivePhotos(
  folderId
) {
  const driveUrl =
    `https://drive.google.com/embeddedfolderview?id=` +
    `${encodeURIComponent(folderId)}#grid`

  const response =
    await fetch(
      driveUrl,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
            'AppleWebKit/537.36 (KHTML, like Gecko) ' +
            'Chrome/124.0.0.0 Safari/537.36',

          'Accept-Language':
            'en-US,en;q=0.9',
        },

        redirect: 'follow',
      }
    )

  if (!response.ok) {
    throw new Error(
      `Google Drive returned HTTP ${response.status}`
    )
  }

  const html =
    await response.text()

  return parseDriveEntries(
    html
  ).map(
    (entry, index) => ({
      id:
        `drive-${entry.id}`,

      filename:
        entry.filename ||
        `VRChat Shot #${index + 1}`,

      creationTime:
        null,

      baseUrl:
        `https://drive.google.com/thumbnail?id=` +
        `${encodeURIComponent(entry.id)}` +
        `&sz=w1000`,

      fallbackUrl:
        `https://lh3.googleusercontent.com/d/` +
        `${encodeURIComponent(entry.id)}` +
        `=w1000-h1000`,

      driveUrl:
        `https://drive.google.com/file/d/` +
        `${entry.id}/view`,
    })
  )
}

export default defineConfig(
  ({ mode }) => {
    const env =
      loadEnv(
        mode,
        process.cwd(),
        ''
      )

    return {
      plugins: [
        vue(),

        {
          name:
            'google-drive-gallery-api',

          configureServer(
            server
          ) {
            server.middlewares.use(
              '/api/gallery',
              async (
                req,
                res
              ) => {
                const url =
                  new URL(
                    req.url || '/',
                    `http://${req.headers.host || 'localhost'}`
                  )

                /*
                 * IMPORTANT:
                 * Default category must be "me".
                 */

                const category =
                  url.searchParams.get(
                    'category'
                  ) || 'me'

                const envName =
                  FOLDER_ENV_BY_CATEGORY[
                    category
                  ]

                const folderId =
                  getFolderId(
                    envName
                      ? env[envName]
                      : null
                  )

                res.setHeader(
                  'Content-Type',
                  'application/json; charset=utf-8'
                )

                res.setHeader(
                  'Cache-Control',
                  'no-store'
                )

                if (
                  !envName ||
                  !folderId
                ) {
                  res.statusCode =
                    404

                  return res.end(
                    JSON.stringify({
                      category,
                      photos: [],
                      error:
                        'Gallery folder is not configured.',
                    })
                  )
                }

                try {
                  const photos =
                    await loadDrivePhotos(
                      folderId
                    )

                  return res.end(
                    JSON.stringify({
                      category,
                      photos,
                    })
                  )
                } catch (err) {
                  res.statusCode =
                    502

                  return res.end(
                    JSON.stringify({
                      category,
                      photos: [],

                      error:
                        err instanceof Error
                          ? err.message
                          : 'Unable to load Google Drive folder.',
                    })
                  )
                }
              }
            )
          },
        },
      ],
    }
  }
)