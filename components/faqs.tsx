export default function Faqs() {
  return (
    <section className="bg-white dark:bg-slate-900 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          <div className="py-4">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">How do I start?</h3>
            <p className="text-slate-700 dark:text-slate-400">
              Simply sign up on BuildAIStartups.com and follow the onboarding steps.
            </p>
          </div>
          <div className="py-4">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Is there a free trial?</h3>
            <p className="text-slate-700 dark:text-slate-400">
              Yes, we offer a 14-day free trial for all new users.
            </p>
          </div>
          <div className="py-4">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Can I cancel anytime?</h3>
            <p className="text-slate-700 dark:text-slate-400">
              Absolutely! You can cancel your subscription at any time from your dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
