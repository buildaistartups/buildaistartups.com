export default function Features() {
  return (
    <section className="bg-white dark:bg-slate-900 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          Powerful Features for Your AI Startup
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-slate-100 dark:bg-slate-800">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">AI Workflow Automation</h3>
            <p className="text-slate-700 dark:text-slate-400">
              Streamline your operations with advanced AI automations.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-slate-100 dark:bg-slate-800">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Real-time Analytics</h3>
            <p className="text-slate-700 dark:text-slate-400">
              Get instant insights to grow faster and smarter.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-slate-100 dark:bg-slate-800">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Secure Infrastructure</h3>
            <p className="text-slate-700 dark:text-slate-400">
              Built with security best practices to protect your data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
