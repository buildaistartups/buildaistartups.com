'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useCurrency } from '@/components/app/currency-provider'
import { CURRENCIES } from '@/lib/currency'

export default function AccountSettingsPage() {
  const [user, setUser] = useState<{ id: string; email: string; user_metadata: { full_name?: string }; app_metadata: { provider?: string }; created_at: string } | null>(null)
  const { currency, setCurrency } = useCurrency()
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) setUser(user as typeof user & { id: string; email: string; user_metadata: { full_name?: string }; app_metadata: { provider?: string }; created_at: string })
    }
    load()
  }, [])

  function handleCurrencyChange(code: string) {
    setCurrency(code)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-2xl mx-auto">
      <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold mb-8">Account Settings</h1>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6 space-y-6">
        {/* Profile */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Profile</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-violet-500 flex items-center justify-center text-white text-xl font-bold">
              {user?.user_metadata?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800 dark:text-gray-100">{user?.user_metadata?.full_name || 'No name set'}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">Signed in via {user?.app_metadata?.provider || 'email'}</div>
            </div>
          </div>
        </div>

        <hr className="border-gray-200 dark:border-gray-700/60" />

        {/* Currency */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Currency</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Choose the currency displayed in revenue tracking and reports.</p>
          <div className="flex items-center gap-3">
            <select
              value={currency}
              onChange={e => handleCurrencyChange(e.target.value)}
              className="form-select rounded-xl text-sm bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 w-64"
            >
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>{c.symbol} — {c.name} ({c.code})</option>
              ))}
            </select>
            {saved && <span className="text-xs text-emerald-500 font-medium">Saved!</span>}
          </div>
        </div>

        <hr className="border-gray-200 dark:border-gray-700/60" />

        {/* Account info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Account</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Account ID: <code className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded">{user?.id}</code></p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Joined: {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}</p>
        </div>

        <hr className="border-gray-200 dark:border-gray-700/60" />

        {/* Danger */}
        <div>
          <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Delete Account</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Permanently delete your account and all project data. This cannot be undone.</p>
          <button className="btn text-sm bg-red-500 hover:bg-red-600 text-white rounded-xl" disabled>Delete Account (contact support)</button>
        </div>
      </div>
    </div>
  )
}
