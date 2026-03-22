import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST() {
  const stripeKey = process.env.STRIPE_SECRET_KEY
  if (!stripeKey) return NextResponse.json({ error: 'Payments not configured' }, { status: 503 })

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase.from('profiles').select('stripe_customer_id').eq('id', user.id).single()
  if (!profile?.stripe_customer_id) return NextResponse.json({ error: 'No billing account' }, { status: 404 })

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.buildaistartups.com'

  try {
    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(stripeKey)
    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${siteUrl}/app/account/billing`,
    })
    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe portal error:', err)
    return NextResponse.json({ error: 'Portal creation failed' }, { status: 500 })
  }
}
