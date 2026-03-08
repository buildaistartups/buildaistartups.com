import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing. Start free, upgrade to Pro at €19/month when you need unlimited projects, AI calls, and templates.',
}

const faqItems = [
  { q: 'Can I try before I pay?', a: 'Yes. The Free plan is fully functional for 1 project with 3 AI calls. No credit card required.' },
  { q: 'What counts as an "AI call"?', a: 'Each AI analysis (idea validation, launch plan, pivot advisor, or monthly retro) counts as one call. Free gets 3 total; Pro gets unlimited.' },
  { q: 'Can I cancel anytime?', a: 'Yes. Cancel from your account settings. You keep Pro access until the end of your billing period, then revert to Free.' },
  { q: 'Do I lose my data if I downgrade?', a: 'Never. All your projects, evidence, and scores are preserved. You just lose access to Pro-only features like unlimited AI and exports.' },
  { q: 'Is there a yearly discount?', a: 'Not yet. We want to keep things simple at launch. Yearly billing may come later based on demand.' },
  { q: 'What payment methods do you accept?', a: 'Credit/debit cards via Stripe. We may add more options in the future.' },
]

export default function PricingPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-10 md:pt-40 md:pb-16">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="h1 bg-clip-text text-transparent bg-linear-to-r from-[var(--ls-text-heading)]/60 via-[var(--ls-text-heading)] to-[var(--ls-text-heading)]/60 pb-4">
                Simple, transparent pricing
              </h1>
              <p className="text-lg text-[var(--ls-text-muted)]">
                Start free with one project. Upgrade to Pro when you&apos;re serious about tracking multiple ideas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-12 md:pb-20">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Free */}
            <div className="rounded-2xl border border-[var(--ls-card-border)] bg-[var(--ls-card-bg)] p-8">
              <div className="mb-6">
                <div className="text-sm font-medium text-[var(--ls-text-muted)] mb-1">Free</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-[var(--ls-text)]">&euro;0</span>
                  <span className="text-sm text-[var(--ls-text-muted)]">/month</span>
                </div>
                <p className="text-sm text-[var(--ls-text-muted)] mt-2">Validate your first idea without risk.</p>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                {[
                  '1 active project',
                  '5-stage journey with all checklists',
                  '3 AI analysis calls (total)',
                  'LaunchScore calculation',
                  'PMF survey (up to 20 responses)',
                  '5 starter templates',
                  'Revenue tracker (manual entry)',
                  'Community support',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[var(--ls-text-secondary)]">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="btn w-full text-[var(--ls-text)] border border-[var(--ls-border)] hover:bg-[var(--ls-bg-alt)] transition">
                Get Started Free
              </Link>
            </div>

            {/* Pro */}
            <div className="rounded-2xl border-2 border-[var(--ls-accent)]/50 bg-[var(--ls-card-bg)] p-8 relative">
              <div className="absolute top-0 right-6 -translate-y-1/2">
                <span className="inline-flex text-xs font-semibold bg-[var(--ls-accent)] text-white px-3 py-1 rounded-full">Recommended</span>
              </div>
              <div className="mb-6">
                <div className="text-sm font-medium text-[var(--ls-accent-text)] mb-1">Pro</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-[var(--ls-text)]">&euro;19</span>
                  <span className="text-sm text-[var(--ls-text-muted)]">/month</span>
                </div>
                <p className="text-sm text-[var(--ls-text-muted)] mt-2">Everything you need to run multiple ideas.</p>
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
                  'Priority support (email)',
                  'Custom LaunchScore weights',
                  'Data export (JSON/CSV)',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[var(--ls-text-secondary)]">
                    <svg className="w-4 h-4 text-[var(--ls-accent)] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="btn w-full text-white bg-[var(--ls-accent)] hover:bg-[var(--ls-accent-hover)] transition shadow-md">
                Start Pro &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-12 md:pb-20">
          <h2 className="text-2xl font-semibold text-[var(--ls-text)] mb-6">Frequently asked questions</h2>
          <div className="divide-y divide-[var(--ls-border)] rounded-2xl border border-[var(--ls-card-border)] bg-[var(--ls-card-bg)]">
            {faqItems.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-[var(--ls-text)] hover:bg-[var(--ls-bg-alt)]/50">
                  <span className="text-base font-medium">{f.q}</span>
                  <span className="ml-4 rounded-full border border-[var(--ls-border)] w-6 h-6 flex items-center justify-center text-[var(--ls-text-muted)] transition-transform group-open:rotate-45 text-sm">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-[var(--ls-text-muted)] text-sm">{f.a}</div>
              </details>
            ))}
          </div>
          <p className="mt-6 text-sm text-[var(--ls-text-muted)]">
            Still have questions?{' '}
            <Link href="/contact" className="text-[var(--ls-accent-text)] hover:underline">Contact us</Link>.
          </p>
        </div>
      </section>
    </main>
  )
}
