import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      {
        name: 'google-photos-auto-scraper',
        configureServer(server) {
          server.middlewares.use('/api/gallery', async (req, res) => {
            const url = new URL(req.url, `http://${req.headers.host}`)
            const category = url.searchParams.get('category') || 'Me (Lyra)'

            // Shared album links loaded from .env.local
            const albumMap = {
              'Me (Lyra)': env.VITE_ALBUM_ME_LYRA,
              'Quinnexe & Me': env.VITE_ALBUM_QUINNEXE,
              'Luna & Me': env.VITE_ALBUM_LUNA,
              'Furality Ultra': env.VITE_ALBUM_FURALITY,
              'Syru & Kasuri & Me': env.VITE_ALBUM_SYRU_KASURI,
              'Me & Uni': env.VITE_ALBUM_UNI,
              'Me & Lyraboone': env.VITE_ALBUM_LYRABOONE,
            }

            let shareLink = albumMap[category]

            if (!shareLink) {
              res.setHeader('Content-Type', 'application/json')
              return res.end(JSON.stringify({ category, photos: [] }))
            }

            if (!shareLink.startsWith('http')) {
              shareLink = `https://photos.app.goo.gl/${shareLink}`
            }

            try {
              // Fetch shared page source
              const response = await fetch(shareLink, {
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
                }
              })
              const html = await response.text()

              // Extract direct high-resolution image URLs
              const imageRegex = /(https:\/\/lh3\.googleusercontent\.com\/pw\/[a-zA-Z0-9_-]+)/g
              const imageMatches = [...new Set(html.match(imageRegex) || [])]

              // Extract photo timestamps from embedded JSON metadata
              const dateRegex = /\[(\d{13}),\d+,\d+\]/g
              const dateMatches = []
              let match
              while ((match = dateRegex.exec(html)) !== null) {
                dateMatches.push(parseInt(match[1]))
              }

              // Extract photo filenames if embedded in title meta
              const titleRegex = /"([^"]+\.(?:png|jpg|jpeg|webp))"/gi
              const titleMatches = []
              while ((match = titleRegex.exec(html)) !== null) {
                titleMatches.push(match[1])
              }

              const photos = imageMatches.map((baseUrl, index) => {
                const timestamp = dateMatches[index] ? new Date(dateMatches[index]).toISOString() : new Date().toISOString()
                const rawName = titleMatches[index] || `VRChat Shot #${index + 1}`

                return {
                  id: `${category}-${index}`,
                  filename: rawName,
                  creationTime: timestamp,
                  baseUrl: `${baseUrl}=w1600-h1200-no` // Force high-res direct image rendering
                }
              })

              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ category, photos }))
            } catch (err) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ category, photos: [], error: err.message }))
            }
          })
        }
      }
    ]
  }
})