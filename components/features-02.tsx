export default function Features02() {
  return (
    <section className="bg-white dark:bg-slate-900 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Why BuildAIStartups.com?
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-400">
              From ideation to scale, we’ve got your back with all-in-one tools and integrations.
            </p>
          </div>
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-slate-100 dark:bg-slate-800">
              <span className="block text-lg font-semibold text-slate-900 dark:text-slate-100">Easy Integrations</span>
              <span className="block text-slate-700 dark:text-slate-400">Connect with your favorite services.</span>
            </div>
            <div className="p-6 rounded-xl bg-slate-100 dark:bg-slate-800">
              <span className="block text-lg font-semibold text-slate-900 dark:text-slate-100">AI Co-Pilot</span>
              <span className="block text-slate-700 dark:text-slate-400">Get recommendations as you build.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
