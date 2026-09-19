import { onRequest as handleGallery } from '../functions/api/gallery.js'
import { onRequest as handleDonationCheckout } from '../functions/api/create-donation-checkout.js'

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)

    // Route API requests directly to your gallery function
    if (url.pathname.startsWith('/api/gallery')) {
      return handleGallery({ request, env, ctx })
    }

    // Route API requests for donation checkout
    if (url.pathname === '/api/create-donation-checkout') {
      return handleDonationCheckout({ request, env, ctx })
    }

    // Attempt to fetch the static asset first
    let response = await env.ASSETS.fetch(request)

    // If the asset doesn't exist (e.g. hitting /about directly) and it's not an API or file request,
    // fallback to serving index.html so vue-router can handle the path on the client side.
    if (response.status === 404 && !url.pathname.includes('.')) {
      const indexRequest = new Request(new URL('/', request.url), request)
      response = await env.ASSETS.fetch(indexRequest)
    }

    return response
  },
}