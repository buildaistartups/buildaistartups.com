import Link from 'next/link'

export default function PricingTeaser() {
  return (
    <section className="relative">
      {/* Radial gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 aspect-square">
          <div className="absolute inset-0 rounded-full blur-[120px] opacity-30" style={{ background: 'var(--ls-accent)' }} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Header — solid purple */}
          <div className="text-center mb-12">
            <div className="inline-flex font-medium text-purple-500 pb-3 text-sm">
              Simple pricing
            </div>
            <h2 className="h2 text-[var(--ls-text)] pb-4">
              Start free. Upgrade when you need more.
            </h2>
          </div>

          {/* Plans */}
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {/* Free Plan */}
            <div className="rounded-2xl border border-[var(--ls-card-border)] bg-[var(--ls-card-bg)] p-8" data-aos="fade-up">
              <div className="mb-5">
                <div className="text-sm font-medium text-[var(--ls-text-muted)] mb-1">Free</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[var(--ls-text)]">&euro;0</span>
                  <span className="text-sm text-[var(--ls-text-muted)]">/month</span>
                </div>
                <p className="text-sm text-[var(--ls-text-muted)] mt-2">Perfect for validating your first idea.</p>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                {[
                  '1 active project',
                  '5-stage journey with checklists',
                  '3 AI analysis calls',
                  'LaunchScore calculation',
                  'PMF survey (20 responses)',
                  '5 starter templates',
                  'Revenue tracker',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[var(--ls-text-secondary)]">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="btn w-full text-[var(--ls-text)] border border-[var(--ls-border)] hover:bg-[var(--ls-bg-alt)] transition duration-150 ease-in-out"
              >
                Get Started Free
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="rounded-2xl border-2 border-[var(--ls-accent)]/50 bg-[var(--ls-card-bg)] p-8 relative" data-aos="fade-up" data-aos-delay="100">
              <div className="absolute top-0 right-6 -translate-y-1/2">
                <span className="inline-flex text-xs font-semibold bg-[var(--ls-accent)] text-white px-3 py-1 rounded-full">
                  Recommended
                </span>
              </div>
              <div className="mb-5">
                <div className="text-sm font-medium text-[var(--ls-accent-text)] mb-1">Pro</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[var(--ls-text)]">&euro;19</span>
                  <span className="text-sm text-[var(--ls-text-muted)]">/month</span>
                </div>
                <p className="text-sm text-[var(--ls-text-muted)] mt-2">For serious indie makers tracking multiple ideas.</p>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                {[
                  'Unlimited active projects',
                  'Unlimited AI analysis calls',
                  'Full template library (10+)',
                  'PMF survey (unlimited responses)',
                  'Evidence ledger with export',
                  'Runway calculator',
                  'Growth experiments tracker',
                  'AI monthly retro assistant',
                  'Custom LaunchScore weights',
                  'Data export (JSON/CSV)',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[var(--ls-accent)] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[var(--ls-text-secondary)]">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="btn w-full text-white bg-[var(--ls-accent)] hover:bg-[var(--ls-accent-hover)] transition duration-150 ease-in-out shadow-md"
              >
                Start Pro &rarr;
              </Link>
            </div>
          </div>

          <p className="text-center text-sm text-[var(--ls-text-muted)] mt-6">
            No credit card required for Free. Cancel Pro anytime.{' '}
            <Link href="/pricing" className="text-[var(--ls-accent-text)] hover:underline">
              Full comparison &rarr;
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
