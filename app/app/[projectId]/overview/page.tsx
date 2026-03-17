export const metadata = { title: 'Overview' }

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* LaunchScore card */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">LaunchScore</h2>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400">Early Stage</span>
        </div>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-5xl font-bold text-gray-800 dark:text-gray-100">0</span>
          <span className="text-lg text-gray-400">/100</span>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {['Market', 'Product', 'PMF', 'Finance', 'Growth'].map((c) => (
            <div key={c} className="text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{c}</div>
              <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">--</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4">Score components will populate as you add evidence through each stage.</p>
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">Next step</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Start by validating your idea in the Validate tab.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">Evidence ledger</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">No evidence logged yet. Start collecting data.</p>
        </div>
      </div>
    </div>
  )
}
