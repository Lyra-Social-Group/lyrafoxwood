import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      {
        name: 'google-drive-auto-scraper',
        configureServer(server) {
          server.middlewares.use('/api/gallery', async (req, res) => {
            const url = new URL(req.url, `http://${req.headers.host}`)
            const category = url.searchParams.get('category') || 'me'

            const folderMap = {
              'me': env.VITE_DRIVE_ME,
              'me and confetti': env.VITE_DRIVE_ME_CONFETTI,
              'me and luna': env.VITE_DRIVE_ME_LUNA,
              'me and milk': env.VITE_DRIVE_ME_MILK,
              'Me & Darienfox': env.VITE_DRIVE_ME_DARIENFOX,
              'Me & Fox': env.VITE_DRIVE_ME_FOX,
              'Me & Uni': env.VITE_DRIVE_ME_UNI,
              'Me & Lyraboone': env.VITE_DRIVE_ME_LYRABOONE,
              'Me & Quinnexe': env.VITE_DRIVE_ME_QUINNEXE,
              'Syru & Kasuri': env.VITE_DRIVE_SYRU_KASURI,
              'Furality Ultra': env.VITE_DRIVE_FURALITY_ULTRA,
            }

            const folderId = folderMap[category]

            if (!folderId) {
              res.setHeader('Content-Type', 'application/json')
              return res.end(JSON.stringify({ category, photos: [] }))
            }

            try {
              const driveUrl = `https://drive.google.com/drive/folders/${folderId}`
              const response = await fetch(driveUrl, {
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
                }
              })
              const html = await response.text()

              // Strict regex targeting Drive file IDs and matching only real image filenames
              const itemRegex = /"([a-zA-Z0-9_-]{28,35})",.*?"([^"]+\.(?:png|jpg|jpeg|webp|PNG|JPG|JPEG|WEBP))"/g
              const photosMap = new Map()
              let match

              while ((match = itemRegex.exec(html)) !== null) {
                const id = match[1]
                const name = match[2]
                
                if (
                  id !== folderId && 
                  !id.startsWith('0B') && 
                  !id.includes('folder') && 
                  !name.includes('gstatic') && 
                  !name.includes('google') &&
                  !photosMap.has(id)
                ) {
                  photosMap.set(id, name)
                }
              }

              const photos = Array.from(photosMap.entries()).map(([fileId, fileName]) => ({
                id: `${category}-${fileId}`,
                filename: fileName,
                creationTime: new Date().toISOString(),
                baseUrl: `https://lh3.googleusercontent.com/d/${fileId}=w1600-h1200`
              }))

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