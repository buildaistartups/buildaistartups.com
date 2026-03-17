import Link from 'next/link'

export const metadata = { title: 'Billing' }

export default function BillingPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-2xl mx-auto">
      <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold mb-8">Billing &amp; Plan</h1>

      {/* Current plan */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Current Plan</h2>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">Free</span>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <p>1 active project</p>
          <p>3 AI analysis calls (total)</p>
          <p>5 starter templates</p>
        </div>
      </div>

      {/* Upgrade CTA */}
      <div className="bg-gray-900 dark:bg-gray-800 border-2 border-violet-500/30 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white dark:text-gray-100 mb-2">Upgrade to Pro</h2>
        <p className="text-sm text-gray-300 dark:text-gray-400 mb-4">
          Unlimited projects, unlimited AI calls, full template library, data export, and priority support.
        </p>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-3xl font-bold text-white dark:text-gray-100">&euro;19</span>
          <span className="text-sm text-gray-400">/month</span>
        </div>
        <button className="btn bg-violet-500 hover:bg-violet-600 text-white text-sm shadow-sm rounded-xl" disabled>
          Upgrade — Coming Soon
        </button>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Stripe payments will be available in Week 5.</p>
      </div>
    </div>
  )
}
