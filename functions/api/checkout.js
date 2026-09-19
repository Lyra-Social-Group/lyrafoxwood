export async function onRequestPost(context) {
  try {
    const secretKey = context.env.STRIPE_SECRET_KEY

    if (!secretKey) {
      return new Response(
        JSON.stringify({ error: 'STRIPE_SECRET_KEY is missing.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Capture requesting origin for local testing & live site
    const requestHost = context.request.headers.get('origin') || new URL(context.request.url).origin

    const bodyParams = new URLSearchParams()
    bodyParams.append('ui_mode', 'embedded_page')
    bodyParams.append('mode', 'payment')
    bodyParams.append('line_items[0][price_data][currency]', 'usd')
    bodyParams.append('line_items[0][price_data][product_data][name]', 'The Ultament PC Build Supporter Tier')
    bodyParams.append('line_items[0][price_data][product_data][description]', 'Support the hyper-dimensional build!')
    bodyParams.append('line_items[0][price_data][unit_amount]', '100') // $1.00 USD
    bodyParams.append('line_items[0][quantity]', '1')
    bodyParams.append('return_url', `${requestHost}/ultament-pc?session_id={CHECKOUT_SESSION_ID}`)

    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: bodyParams.toString()
    })

    const data = await stripeRes.json()

    if (!stripeRes.ok) {
      return new Response(
        JSON.stringify({ error: data.error?.message || 'Stripe Session creation failed.' }),
        { status: stripeRes.status, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new Response(JSON.stringify({ client_secret: data.client_secret }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}