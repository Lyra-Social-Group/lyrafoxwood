import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)

    // Route API requests to your gallery logic or import it directly
    if (url.pathname.startsWith('/api/')) {
      // Handle your gallery API or delegate to your handler logic here
      return new Response(JSON.stringify({ error: 'API endpoint' }), {
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Serve static assets and handle SPA routing for frontend routes
    try {
      return await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        {
          mapRequestToAsset: (req) => {
            // Fallback to index.html for client-side routing (e.g. /gallery)
            const parsedUrl = new URL(req.url)
            if (!parsedUrl.pathname.includes('.')) {
              parsedUrl.pathname = '/index.html'
              return new Request(parsedUrl.toString(), req)
            }
            return req
          },
        }
      )
    } catch (e) {
      return new Response('Not Found', { status: 404 })
    }
  },
}