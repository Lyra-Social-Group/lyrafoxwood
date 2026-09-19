export async function onRequestPost(context) {
  try {
    const secretKey = context.env.STRIPE_SECRET_KEY

    if (!secretKey) {
      return new Response(JSON.stringify({ error: 'STRIPE_SECRET_KEY environment variable is not configured in Cloudflare Pages.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const domain = new URL(context.request.url).origin

    // Form-encoded parameters required by Stripe API
    const bodyParams = new URLSearchParams()
    bodyParams.append('mode', 'payment')
    bodyParams.append('payment_method_types[0]', 'card')
    bodyParams.append('line_items[0][price_data][currency]', 'usd')
    bodyParams.append('line_items[0][price_data][product_data][name]', 'The Ultament PC Build Supporter Tier')
    bodyParams.append('line_items[0][price_data][product_data][description]', 'Support the hyper-dimensional build!')
    bodyParams.append('line_items[0][price_data][unit_amount]', '100') // $1.00 in cents
    bodyParams.append('line_items[0][quantity]', '1')
    bodyParams.append('success_url', `${domain}/ultament-pc?success=true`)
    bodyParams.append('cancel_url', `${domain}/ultament-pc?canceled=true`)

    // Native fetch request to Stripe Checkout Session API
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
      return new Response(JSON.stringify({ error: data.error?.message || 'Stripe API request failed.' }), {
        status: stripeRes.status,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({ url: data.url }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}