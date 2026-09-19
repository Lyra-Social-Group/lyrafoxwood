export async function onRequest(context) {
  const { request, env } = context

  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method Not Allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const stripeSecretKey = env.STRIPE_SECRET_KEY
  if (!stripeSecretKey) {
    return new Response(
      JSON.stringify({ error: 'STRIPE_SECRET_KEY is missing from environment variables.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    const body = await request.json().catch(() => ({}))
    const donationAmount = Number(body.amount)

    if (!Number.isFinite(donationAmount) || donationAmount < 1 || donationAmount > 10000) {
      return new Response(
        JSON.stringify({ error: 'Donation amount must be between $1 and $10,000.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const origin = new URL(request.url).origin
    const unitAmountCents = Math.round(donationAmount * 100)

    const params = new URLSearchParams()
    params.append('mode', 'payment')
    params.append('success_url', `${origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`)
    params.append('cancel_url', `${origin}/donate/cancel`)
    params.append('billing_address_collection', 'auto')

    params.append('line_items[0][price_data][currency]', 'usd')
    params.append('line_items[0][price_data][unit_amount]', unitAmountCents.toString())
    params.append('line_items[0][price_data][product_data][name]', 'Donation to Lyra Foxwood')
    params.append('line_items[0][price_data][product_data][description]', 'Support ongoing projects, tech infrastructure, and content creation.')
    params.append('line_items[0][quantity]', '1')

    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    })

    const session = await stripeResponse.json()

    if (!stripeResponse.ok) {
      return new Response(
        JSON.stringify({ error: `Stripe API Error (${stripeResponse.status}): ${session.error?.message || 'Checkout failed'}` }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ url: session.url }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: `Handler Error: ${err.message}` }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  }
}