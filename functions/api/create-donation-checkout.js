import Stripe from 'stripe'

export async function onRequestPost(context) {
  const { request, env } = context

  // Check secret key
  const stripeSecretKey = env.STRIPE_SECRET_KEY
  if (!stripeSecretKey) {
    return new Response(
      JSON.stringify({ error: 'STRIPE_SECRET_KEY is missing from Cloudflare environment variables.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    const { amount } = await request.json()
    const donationAmount = Number(amount)

    if (!Number.isFinite(donationAmount) || donationAmount < 1 || donationAmount > 10000) {
      return new Response(
        JSON.stringify({ error: 'Donation amount must be between $1 and $10,000.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const stripe = new Stripe(stripeSecretKey)
    const origin = new URL(request.url).origin

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donation to Lyra Foxwood',
              description: 'Support ongoing projects, tech infrastructure, and content creation.'
            },
            unit_amount: Math.round(donationAmount * 100)
          },
          quantity: 1
        }
      ],
      success_url: `${origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donate/cancel`,
      billing_address_collection: 'auto'
    })

    return new Response(
      JSON.stringify({ url: session.url }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || 'Stripe error occurred.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}