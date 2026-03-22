import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!stripeKey || !webhookSecret) return NextResponse.json({ error: 'Not configured' }, { status: 503 })

  const body = await request.text()
  const signature = request.headers.get('stripe-signature')
  if (!signature) return NextResponse.json({ error: 'No signature' }, { status: 400 })

  try {
    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(stripeKey)
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    // Use service role to update profiles (webhook has no user session)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as { customer: string; subscription: string; metadata?: { supabase_user_id?: string } }
        const userId = session.metadata?.supabase_user_id
        if (userId) {
          await supabase.from('profiles').update({
            plan: 'pro',
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
            stripe_subscription_status: 'active',
            ai_calls_limit: 999999,
          }).eq('id', userId)
        }
        break
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object as { id: string; status: string; customer: string }
        const status = sub.status
        const plan = status === 'active' ? 'pro' : 'free'
        const limit = status === 'active' ? 999999 : 3
        await supabase.from('profiles').update({
          plan, ai_calls_limit: limit, stripe_subscription_status: status,
        }).eq('stripe_customer_id', sub.customer as string)
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as { customer: string }
        await supabase.from('profiles').update({
          plan: 'free', ai_calls_limit: 3, stripe_subscription_status: 'canceled',
        }).eq('stripe_customer_id', sub.customer as string)
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Stripe webhook error:', err)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 400 })
  }
}
