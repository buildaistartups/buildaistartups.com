import type { Metadata } from 'next'
import Image from 'next/image'
import Illustration from '@/public/images/page-illustration.svg'

export const metadata: Metadata = {
  title: 'About',
  description: 'Build AI Startups is an open project helping indie makers validate, build, and grow AI-powered micro-SaaS with structured evidence.',
}

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="absolute left-1/2 -translate-x-1/2 -mt-36 blur-2xl pointer-events-none -z-10" style={{ opacity: 'var(--ls-glow-opacity)' }} aria-hidden="true">
          <Image src={Illustration} className="max-w-none" width={1440} height={427} alt="" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="h1 bg-clip-text text-transparent bg-linear-to-r from-[var(--ls-text-heading)]/60 via-[var(--ls-text-heading)] to-[var(--ls-text-heading)]/60 pb-4">
                About this project
              </h1>
              <p className="text-lg text-[var(--ls-text-muted)]">
                Build AI Startups is an open project, not a company. We&apos;re building the tools we wish we had when we started our own ventures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pb-12 md:pb-20">
            <div className="max-w-3xl mx-auto">
              <div className="space-y-8 text-[var(--ls-text-secondary)]">
                <div>
                  <h2 className="text-xl font-semibold text-[var(--ls-text)] mb-3">The problem we saw</h2>
                  <p>
                    The vibe coding tools made building apps 10x faster. But they made the validation problem worse. 
                    Now founders can build a beautiful app in 28 minutes and still fail because nobody wants it.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[var(--ls-text)] mb-3">What we&apos;re building</h2>
                  <p>
                    LaunchScore is the accountability layer that sits alongside whatever tool you use to build. 
                    It tracks your startup from idea to revenue using a structured 5-stage journey with AI-assisted validation at each stage. 
                    Your LaunchScore (0-100) tells you — honestly — whether to persevere, pivot, or move on.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[var(--ls-text)] mb-3">Our principles</h2>
                  <ul className="space-y-3">
                    {[
                      ['Honesty over hype', 'No fake metrics, no fabricated testimonials, no unrealistic promises. When real users exist, we use their real words.'],
                      ['Evidence over vibes', 'Every recommendation is based on real data — signups, PMF scores, revenue, competitor analysis — not gut feelings.'],
                      ['Solo-founder friendly', 'Every feature is designed for one person to use and benefit from. No enterprise complexity, no team-required workflows.'],
                      ['You own everything', 'Your data, your exports, your decision. We are a tool, not a gatekeeper.'],
                    ].map(([title, desc]) => (
                      <li key={title} className="flex gap-3">
                        <svg className="w-5 h-5 text-[var(--ls-accent)] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <span className="font-medium text-[var(--ls-text)]">{title}.</span>{' '}
                          <span className="text-[var(--ls-text-muted)]">{desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[var(--ls-text)] mb-3">The bigger vision</h2>
                  <p>
                    LaunchScore is the first piece of a larger platform. Over time, we&apos;re building an ecosystem where AI startups 
                    can be validated, built, launched, grown, and even traded — all with quality gates and structured evidence at every step. 
                    But we&apos;re starting small, focused, and honest.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
