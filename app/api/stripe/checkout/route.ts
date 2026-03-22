import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST() {
  const stripeKey = process.env.STRIPE_SECRET_KEY
  if (!stripeKey) return NextResponse.json({ error: 'Payments not configured yet' }, { status: 503 })

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase.from('profiles').select('stripe_customer_id, email').eq('id', user.id).single()
  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 })

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.buildaistartups.com'
  const priceId = process.env.STRIPE_PRICE_ID

  if (!priceId) return NextResponse.json({ error: 'Stripe price not configured' }, { status: 503 })

  try {
    // Dynamic import to avoid errors when stripe isn't installed
    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(stripeKey)

    // Get or create customer
    let customerId = profile.stripe_customer_id
    if (!customerId) {
      const customer = await stripe.customers.create({ email: profile.email, metadata: { supabase_user_id: user.id } })
      customerId = customer.id
      await supabase.from('profiles').update({ stripe_customer_id: customerId }).eq('id', user.id)
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/app/account/billing?success=true`,
      cancel_url: `${siteUrl}/app/account/billing?canceled=true`,
      metadata: { supabase_user_id: user.id },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json({ error: 'Payment session creation failed' }, { status: 500 })
  }
}
