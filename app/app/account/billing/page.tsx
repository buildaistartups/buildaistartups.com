'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { IconChecklist } from '@/components/app/icons'

function BillingContent() {
  const searchParams = useSearchParams()
  const [plan, setPlan] = useState('free')
  const [loading, setLoading] = useState(false)
  const [portalLoading, setPortalLoading] = useState(false)
  const [stripeConfigured, setStripeConfigured] = useState(false)
  const success = searchParams.get('success')
  const canceled = searchParams.get('canceled')

  useEffect(() => {
    async function fetchProfile() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('profiles').select('plan, stripe_customer_id').eq('id', user.id).single()
      if (data) setPlan(data.plan)
    }
    fetchProfile()

    fetch('/api/stripe/checkout', { method: 'POST' }).then(r => {
      if (r.status !== 503) setStripeConfigured(true)
    }).catch(() => {})
  }, [])

  const isPro = plan === 'pro'

  async function handleUpgrade() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else alert(data.error || 'Failed to create checkout')
    } catch { alert('Payment error') }
    finally { setLoading(false) }
  }

  async function handlePortal() {
    setPortalLoading(true)
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else alert(data.error || 'Failed to open portal')
    } catch { alert('Portal error') }
    finally { setPortalLoading(false) }
  }

  const freeFeatures = ['1 active project', '3 AI analysis calls (total)', '5 starter templates', 'Basic LaunchScore']
  const proFeatures = ['Unlimited projects', 'Unlimited AI calls', 'Full template library', 'AI Launch Plan & Growth Advisor', 'Revenue & PMF tracking', 'Evidence ledger', 'Data export (JSON/CSV)', 'Priority support']

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-3xl mx-auto">
      <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold mb-8">Billing &amp; Plan</h1>

      {success && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-sm text-emerald-600 dark:text-emerald-400">
          Payment successful! Your account has been upgraded to Pro. Welcome aboard.
        </div>
      )}
      {canceled && (
        <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-sm text-amber-600 dark:text-amber-400">
          Payment canceled. No charges were made. You can upgrade anytime.
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className={`bg-white dark:bg-gray-800 border rounded-xl p-6 ${!isPro ? 'border-violet-500/50 ring-1 ring-violet-500/20' : 'border-gray-200 dark:border-gray-700/60'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Free</h2>
            {!isPro && <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400">Current</span>}
          </div>
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">&euro;0</span>
            <span className="text-sm text-gray-400">/month</span>
          </div>
          <ul className="space-y-2">
            {freeFeatures.map(f => (
              <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <IconChecklist className="w-4 h-4 text-gray-400 shrink-0" /> {f}
              </li>
            ))}
          </ul>
        </div>

        <div className={`bg-white dark:bg-gray-800 border rounded-xl p-6 ${isPro ? 'border-violet-500/50 ring-1 ring-violet-500/20' : 'border-gray-200 dark:border-gray-700/60'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Pro</h2>
            {isPro && <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400">Current</span>}
          </div>
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">&euro;19</span>
            <span className="text-sm text-gray-400">/month</span>
          </div>
          <ul className="space-y-2 mb-6">
            {proFeatures.map(f => (
              <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <IconChecklist className="w-4 h-4 text-violet-500 shrink-0" /> {f}
              </li>
            ))}
          </ul>

          {!isPro && stripeConfigured && (
            <button onClick={handleUpgrade} disabled={loading}
              className="btn w-full bg-violet-500 hover:bg-violet-600 text-white text-sm rounded-xl py-2.5 shadow-sm shadow-violet-500/25 disabled:opacity-50">
              {loading ? 'Redirecting to checkout...' : 'Upgrade to Pro — €19/mo'}
            </button>
          )}
          {!isPro && !stripeConfigured && (
            <button disabled className="btn w-full bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 text-sm rounded-xl py-2.5 cursor-not-allowed">
              Payments coming soon
            </button>
          )}
          {isPro && (
            <button onClick={handlePortal} disabled={portalLoading}
              className="btn w-full border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 text-sm rounded-xl py-2.5 disabled:opacity-50">
              {portalLoading ? 'Opening portal...' : 'Manage Subscription'}
            </button>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4 text-sm">
          <div>
            <div className="font-medium text-gray-700 dark:text-gray-300">Can I cancel anytime?</div>
            <div className="text-gray-500 dark:text-gray-400 mt-1">Yes. Cancel from the billing portal. Your Pro access continues until the end of the billing period.</div>
          </div>
          <div>
            <div className="font-medium text-gray-700 dark:text-gray-300">What happens to my data if I downgrade?</div>
            <div className="text-gray-500 dark:text-gray-400 mt-1">All data is preserved. You can view everything but new AI calls are limited to free tier quotas.</div>
          </div>
          <div>
            <div className="font-medium text-gray-700 dark:text-gray-300">Do you offer refunds?</div>
            <div className="text-gray-500 dark:text-gray-400 mt-1">Yes, within 7 days of purchase. Contact support.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BillingPage() {
  return (
    <Suspense fallback={<div className="px-4 sm:px-6 lg:px-8 py-8"><div className="text-sm text-gray-400">Loading billing...</div></div>}>
      <BillingContent />
    </Suspense>
  )
}
