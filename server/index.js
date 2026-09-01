import { onRequest as handleGallery } from '../functions/api/gallery.js'

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)

    // Route API requests directly to your gallery function
    if (url.pathname.startsWith('/api/gallery')) {
      return handleGallery({ request, env, ctx })
    }

    // Serve frontend static assets and handle SPA routing via Workers Asset Binding
    return env.ASSETS.fetch(request)
  },
}