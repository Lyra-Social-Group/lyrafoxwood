import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import https from 'node:https'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      {
        name: 'vite-plugin-stripe-checkout',
        configureServer(server) {
          server.middlewares.use('/api/create-donation-checkout', (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              return res.end(JSON.stringify({ error: 'Method not allowed' }))
            }

            let body = ''
            req.on('data', chunk => { body += chunk })
            req.on('end', () => {
              try {
                const { amount } = JSON.parse(body || '{}')
                const donationAmount = Number(amount)

                if (!Number.isFinite(donationAmount) || donationAmount < 1 || donationAmount > 10000) {
                  res.statusCode = 400
                  res.setHeader('Content-Type', 'application/json')
                  return res.end(JSON.stringify({ error: 'Donation must be between $1 and $10,000.' }))
                }

                const stripeKey = env.STRIPE_SECRET_KEY
                if (!stripeKey) {
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'application/json')
                  return res.end(JSON.stringify({ error: 'STRIPE_SECRET_KEY is missing from .env.local' }))
                }

                const host = req.headers.host
                const protocol = req.headers['x-forwarded-proto'] || 'http'
                const origin = `${protocol}://${host}`
                const unitAmountCents = Math.round(donationAmount * 100)

                const postData = new URLSearchParams({
                  'mode': 'payment',
                  'success_url': `${origin}/#/donate/success?session_id={CHECKOUT_SESSION_ID}`,
                  'cancel_url': `${origin}/#/donate/cancel`,
                  'billing_address_collection': 'auto',
                  'line_items[0][price_data][currency]': 'usd',
                  'line_items[0][price_data][unit_amount]': unitAmountCents.toString(),
                  'line_items[0][price_data][product_data][name]': 'Donation to Lyra Foxwood',
                  'line_items[0][price_data][product_data][description]': 'Support ongoing projects, tech infrastructure, and content creation.',
                  'line_items[0][quantity]': '1'
                }).toString()

                const options = {
                  hostname: 'api.stripe.com',
                  port: 443,
                  path: '/v1/checkout/sessions',
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${stripeKey}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(postData)
                  }
                }

                const stripeReq = https.request(options, stripeRes => {
                  let resBody = ''
                  stripeRes.on('data', chunk => { resBody += chunk })
                  stripeRes.on('end', () => {
                    res.statusCode = stripeRes.statusCode
                    res.setHeader('Content-Type', 'application/json')
                    res.end(resBody)
                  })
                })

                stripeReq.on('error', err => {
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ error: err.message }))
                })

                stripeReq.write(postData)
                stripeReq.end()
              } catch (err) {
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: err.message }))
              }
            })
          })
        }
      }
    ]
  }
})