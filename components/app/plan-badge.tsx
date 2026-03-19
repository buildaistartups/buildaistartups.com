'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function PlanBadge() {
  const [plan, setPlan] = useState<string>('free')
  const [used, setUsed] = useState<number>(0)
  const [limit, setLimit] = useState<number>(3)

  useEffect(() => {
    async function fetchPlan() {
      const supabase = createClient()

      const { data: { user }, error: userError } = await supabase.auth.getUser()
      console.log('🔍 User:', user)
      console.log('🔍 User error:', userError)

      if (!user) return

      const { data, error } = await supabase
        .from('profiles')
        .select('plan, ai_calls_used, ai_calls_limit')
        .eq('id', user.id)
        .single()

      console.log('🔍 Profile data:', data)
      console.log('🔍 Profile error:', error)

      if (data) {
        setPlan(data.plan)
        setUsed(data.ai_calls_used)
        setLimit(data.ai_calls_limit)
      }
    }
    fetchPlan()
  }, [])

  const isPro = plan === 'pro'
  const remaining = Math.max(0, limit - used)

  return (
    <div className={`px-3 py-2 rounded-lg ${isPro ? 'bg-violet-500/20' : 'bg-violet-500/10'}`}>
      <div className={`text-xs font-medium ${isPro ? 'text-violet-400' : 'text-violet-500'}`}>
        {isPro ? 'Pro Plan' : 'Free Plan'}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
        {isPro ? 'Unlimited AI calls' : `${remaining} AI call${remaining !== 1 ? 's' : ''} remaining`}
      </div>
      {!isPro && (
        <Link href="/app/account/billing" className="text-xs font-medium text-violet-500 hover:text-violet-600 mt-1 inline-block">
          Upgrade to Pro &rarr;
        </Link>
      )}
    </div>
  )
}
