export default function Features() {
  const features = [
    {
      title: 'AI Idea Generator',
      description: 'No idea yet? Share your interests, skills, and budget. AI suggests 10 tailored startup ideas with market gaps, difficulty, and revenue potential.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
    },
    {
      title: 'AI Idea Validation',
      description: 'Describe your idea in any language — get honest market analysis, competitor mapping, and an ICP profile. Know before you build.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'PMF Survey & Scoring',
      description: 'Run the Sean Ellis test. See exactly what percentage of users would be "very disappointed" without your product.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: 'Revenue & Runway',
      description: 'Track MRR, burn rate, and runway in one place. Know exactly how long you can keep going.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Pivot / Persevere / Kill',
      description: 'AI analyzes your metrics and evidence to recommend whether to keep going, change direction, or move on.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
    {
      title: 'Evidence Ledger',
      description: 'Log every signal — first customer, churn event, press mention. Build a paper trail of your startup journey.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
  ]

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex font-medium text-purple-500 pb-3 text-sm">
              What you get
            </div>
            <h2 className="h2 text-[var(--ls-text)] pb-4">
              Everything you need to validate and grow
            </h2>
            <p className="text-lg text-[var(--ls-text-muted)] max-w-2xl mx-auto">
              LaunchScore is the strategic command center that connects your tools into one journey with one score.
            </p>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="relative rounded-2xl border border-[var(--ls-card-border)] bg-[var(--ls-card-bg)] p-6 transition-colors hover:border-[var(--ls-accent)]/30"
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--ls-accent)]/10 text-[var(--ls-accent)]">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-[var(--ls-text)]">{feature.title}</h3>
                </div>
                <p className="text-sm text-[var(--ls-text-muted)]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
