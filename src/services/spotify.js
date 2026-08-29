// Access variables from Vite environment
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
const REFRESH_TOKEN = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN

// Exchange Refresh Token for a temporary Access Token (valid for 1 hour)
const getAccessToken = async () => {
  const basicAuth = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
  
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  })

  const data = await response.json()
  return data.access_token
}

// Fetch currently playing track
export const getCurrentlyPlaying = async () => {
  try {
    const token = await getAccessToken()
    const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (res.status === 204 || res.status > 400) return null
    return await res.json()
  } catch (err) {
    console.error('Error fetching current track:', err)
    return null
  }
}

// Fetch recently played tracks
export const getRecentlyPlayed = async (limit = 5) => {
  try {
    const token = await getAccessToken()
    const res = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!res.ok) return []
    const data = await res.json()
    return data.items
  } catch (err) {
    console.error('Error fetching recent tracks:', err)
    return []
  }
}