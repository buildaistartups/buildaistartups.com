export default function Pricing() {
  return (
    <section>
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Simple pricing for everyone</h2>
        <p className="text-lg text-gray-700 dark:text-slate-300 mb-8">
          No hidden fees. Start free, upgrade when you grow.
        </p>
        <div className="inline-block px-8 py-8 rounded-3xl bg-white dark:bg-slate-900 shadow-lg border border-gray-200 dark:border-slate-800">
          <div className="mb-4 text-5xl font-bold text-purple-700 dark:text-purple-400">$29</div>
          <div className="mb-4 text-gray-600 dark:text-slate-400">per month, all features</div>
          <a href="#0" className="btn bg-gradient-to-r from-purple-500 to-purple-400 text-white dark:text-slate-900 hover:from-purple-600 hover:to-purple-500 transition">Get Started</a>
        </div>
      </div>
    </section>
  )
}
