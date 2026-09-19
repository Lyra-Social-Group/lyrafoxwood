import Stripe from 'stripe'

export async function onRequestPost(context) {
  try {
    // Access Stripe Secret Key from Cloudflare environment variables
    const stripe = new Stripe(context.env.STRIPE_SECRET_KEY)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'The Ultament PC Build Supporter Tier',
              description: 'Support the hyper-dimensional 256-core build!',
            },
            unit_amount: 100, // $1.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${new URL(context.request.url).origin}/pc-build?success=true`,
      cancel_url: `${new URL(context.request.url).origin}/pc-build?canceled=true`,
    })

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}