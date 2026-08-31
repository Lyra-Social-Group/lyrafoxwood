// functions/api/gallery.js
export async function onRequest(context) {
  const url = new URL(context.request.url)
  const category = url.searchParams.get('category') || 'Me (Lyra)'

  const albumMap = {
    'Me (Lyra)': context.env?.VITE_ALBUM_ME_LYRA || 'https://photos.app.goo.gl/7Nm4f1M7AvRg4Hbx8',
    'Quinnexe & Me': context.env?.VITE_ALBUM_QUINNEXE || 'https://photos.app.goo.gl/4fRSPzrej9RZ8Ni77',
    'Luna & Me': context.env?.VITE_ALBUM_LUNA || 'https://photos.app.goo.gl/nDMw3nDTQr2Lmivo7',
    'Furality Ultra': context.env?.VITE_ALBUM_FURALITY || 'https://photos.app.goo.gl/yjbpMvmx2ftkPLxn6',
    'Syru & Kasuri & Me': context.env?.VITE_ALBUM_SYRU_KASURI || 'https://photos.app.goo.gl/ZN8Hgfyco3mnoovw7',
    'Me & Uni': context.env?.VITE_ALBUM_UNI || 'https://photos.app.goo.gl/28nN1dGPavz86A7y6',
    'Me & Lyraboone': context.env?.VITE_ALBUM_LYRABOONE || 'https://photos.app.goo.gl/83PJoaxP4dL8dEHL7',
  }

  let shareLink = albumMap[category]

  if (!shareLink) {
    return new Response(JSON.stringify({ category, photos: [] }), {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  if (!shareLink.startsWith('http')) {
    shareLink = `https://photos.app.goo.gl/${shareLink}`
  }

  try {
    const response = await fetch(shareLink, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
      }
    })
    const html = await response.text()

    const imageRegex = /(https:\/\/lh3\.googleusercontent\.com\/pw\/[a-zA-Z0-9_-]+)/g
    const imageMatches = [...new Set(html.match(imageRegex) || [])]

    const dateRegex = /\[(\d{13}),\d+,\d+\]/g
    const dateMatches = []
    let match
    while ((match = dateRegex.exec(html)) !== null) {
      dateMatches.push(parseInt(match[1]))
    }

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
        baseUrl: `${baseUrl}=w1600-h1200-no`
      }
    })

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