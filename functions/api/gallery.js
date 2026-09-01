// functions/api/gallery.js
export async function onRequest(context) {
  const url = new URL(context.request.url)
  const category = url.searchParams.get('category') || 'me'

  const folderMap = {
    'me': context.env?.VITE_DRIVE_ME,
    'me and confetti': context.env?.VITE_DRIVE_ME_CONFETTI,
    'me and luna': context.env?.VITE_DRIVE_ME_LUNA,
    'me and milk': context.env?.VITE_DRIVE_ME_MILK,
    'Me & Darienfox': context.env?.VITE_DRIVE_ME_DARIENFOX,
    'Me & Fox': context.env?.VITE_DRIVE_ME_FOX,
    'Me & Uni': context.env?.VITE_DRIVE_ME_UNI,
    'Me & Lyraboone': context.env?.VITE_DRIVE_ME_LYRABOONE,
    'Me & Quinnexe': context.env?.VITE_DRIVE_ME_QUINNEXE,
    'Syru & Kasuri': context.env?.VITE_DRIVE_SYRU_KASURI,
    'Furality Ultra': context.env?.VITE_DRIVE_FURALITY_ULTRA,
  }

  const folderId = folderMap[category]

  if (!folderId) {
    return new Response(JSON.stringify({ category, photos: [] }), {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    const driveUrl = `https://drive.google.com/drive/folders/${folderId}`
    const response = await fetch(driveUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
      }
    })
    const html = await response.text()

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

    return new Response(JSON.stringify({ category, photos }), {
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300'
      }
    })
  } catch (err) {
    return new Response(JSON.stringify({ category, photos: [], error: err.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    })
  }
}