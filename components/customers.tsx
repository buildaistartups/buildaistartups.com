export default function Customers() {
  return (
    <section className="bg-white dark:bg-slate-900 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
          Trusted by Founders Worldwide
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-slate-100 dark:bg-slate-800">
            <p className="text-slate-700 dark:text-slate-400 mb-4">"BuildAIStartups.com accelerated our go-to-market by months!"</p>
            <span className="block font-semibold text-slate-900 dark:text-slate-100">Sarah L.</span>
            <span className="block text-slate-500 dark:text-slate-400 text-sm">Tech Founder</span>
          </div>
          <div className="p-6 rounded-xl bg-slate-100 dark:bg-slate-800">
            <p className="text-slate-700 dark:text-slate-400 mb-4">"Amazing templates and onboarding. Super smooth experience."</p>
            <span className="block font-semibold text-slate-900 dark:text-slate-100">James P.</span>
            <span className="block text-slate-500 dark:text-slate-400 text-sm">Startup CEO</span>
          </div>
          <div className="p-6 rounded-xl bg-slate-100 dark:bg-slate-800">
            <p className="text-slate-700 dark:text-slate-400 mb-4">"Their support is the best I’ve seen."</p>
            <span className="block font-semibold text-slate-900 dark:text-slate-100">Ava W.</span>
            <span className="block text-slate-500 dark:text-slate-400 text-sm">Product Lead</span>
          </div>
        </div>
      </div>
    </section>
  );
}
