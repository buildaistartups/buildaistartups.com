import Link from 'next/link'

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Already have a business idea?',
      description: 'Tell us your startup idea in your own words, in any language. Our AI analyzes the market, identifies competitors, profiles your ideal customer, and gives you an honest validation score.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      num: '02',
      title: 'Track through 5 stages',
      description: 'Follow a structured journey: Validate, Build, Launch, Measure, Grow. At each stage, collect real evidence — signups, PMF surveys, revenue — that feeds your LaunchScore.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      num: '03',
      title: 'Get an honest score',
      description: 'Your LaunchScore (0-100) tells you — honestly — whether to persevere, pivot, or kill. Based on real evidence, not vibes. Updated weekly as you collect more data.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ]

  return (
    <section className="relative" id="how-it-works">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex font-medium text-purple-500 pb-3 text-sm">
              How it works
            </div>
            <h2 className="h2 text-[var(--ls-text)] pb-4">
              From gut-feel to evidence in 3 steps
            </h2>
            <p className="text-lg text-[var(--ls-text-muted)] max-w-2xl mx-auto">
              Stop building in the dark. LaunchScore gives you a structured system to know — not guess — whether your startup is on track.
            </p>
          </div>

          {/* Step 00 — Idea Generator */}
          <div
            className="mb-12 md:mb-16 max-w-2xl mx-auto"
            data-aos="fade-up"
          >
            <div className="rounded-2xl border border-dashed border-[var(--ls-accent)]/40 bg-[var(--ls-accent)]/5 p-6 md:p-8 text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--ls-accent)]/10 border border-[var(--ls-accent)]/20 text-[var(--ls-accent)] mb-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div className="text-xs uppercase tracking-widest text-[var(--ls-accent)] font-medium mb-2">
                Optional — Step 00
              </div>
              <h3 className="text-lg font-semibold text-[var(--ls-text)] mb-2">
                Don&apos;t have an idea for your startup yet?
              </h3>
              <p className="text-sm text-[var(--ls-text-muted)] mb-4 max-w-md mx-auto">
                Tell us your interests, skills, and budget. Our AI generates 10 tailored startup ideas
                based on real market gaps — complete with estimated difficulty, competition level, and revenue potential.
                Pick one and go straight to Step 1.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ls-accent)] hover:text-[var(--ls-accent-hover)] transition"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate Ideas for Me
              </Link>
            </div>
          </div>

          {/* Steps 1-3 */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step) => (
              <div key={step.num} className="text-center" data-aos="fade-up" data-aos-delay={parseInt(step.num) * 100}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--ls-accent)]/10 border border-[var(--ls-accent)]/20 text-[var(--ls-accent)] mb-4">
                  {step.icon}
                </div>
                <div className="text-xs uppercase tracking-widest text-[var(--ls-accent)] font-medium mb-2">
                  Step {step.num}
                </div>
                <h3 className="text-lg font-semibold text-[var(--ls-text)] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--ls-text-muted)]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
