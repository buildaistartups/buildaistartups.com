import { IconMeasure } from '@/components/app/icons'

export const metadata = { title: 'Measure' }

export default function MeasurePage() {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-8 text-center">
      <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
        <IconMeasure className="w-7 h-7 text-amber-500" />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Measure</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-4">PMF survey, revenue tracker, runway calculator, evidence ledger, and metrics dashboard.</p>
      <span className="inline-flex text-xs font-medium px-3 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400">Coming in Week 4</span>
    </div>
  )
}
