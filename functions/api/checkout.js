import Stripe from 'stripe'

export async function onRequestPost(context) {
  try {
    const secretKey = context.env.STRIPE_SECRET_KEY

    if (!secretKey) {
      return new Response(JSON.stringify({ error: 'STRIPE_SECRET_KEY missing.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const stripe = new Stripe(secretKey)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'The Ultament PC Build Supporter Tier',
              description: 'Support the hyper-dimensional build!',
            },
            unit_amount: 100, // $1.00 USD
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${new URL(context.request.url).origin}/ultament-pc?success=true`,
      cancel_url: `${new URL(context.request.url).origin}/ultament-pc?canceled=true`,
    })

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}