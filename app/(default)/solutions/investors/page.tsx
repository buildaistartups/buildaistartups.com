// app/(default)/solutions/investors/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const siteUrl = 'https://www.buildaistartups.com'
const ogImage = '/og/solutions-investors.png' // Updated to use your new OG image

export const metadata: Metadata = {
  title: 'Investors — Continuous Deal Flow | Build AI Starups',
  description:
    'Filter by market, traction proxies, and tech; review working products—not PDFs. Get cohort views, comparable dashboards, and exit-ready assets.',
  alternates: { canonical: `${siteUrl}/solutions/investors` },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/solutions/investors`,
    title: 'Investors — Continuous Deal Flow | Build AI Starups',
    description:
      'See instant demos, not decks. Pipeline scoring, comparable metrics, cohort views, and exit-ready assets.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Build AI Starups — Investors' }],
    siteName: 'Build AI Starups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Investors — Continuous Deal Flow | Build AI Starups',
    description:
      'See instant demos, not decks. Pipeline scoring, comparable metrics, cohort views, and exit-ready assets.',
    images: [ogImage],
  },
}

// ---- JSON-LD Schemas ----
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Build AI Starups',
  url: siteUrl,
  logo: `${siteUrl}/brand/logo-light.svg`,
  sameAs: ['https://x.com/buildaistartups', 'https://github.com/buildaistartups'],
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Solutions', item: `${siteUrl}/` },
    { '@type': 'ListItem', position: 3, name: 'Investors', item: `${siteUrl}/solutions/investors` },
  ],
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Investor Deal Flow Platform',
  description: 'Continuous deal flow with live demos, pipeline scoring, and comparable metrics for investors.',
  provider: { '@type': 'Organization', name: 'Build AI Starups', url: siteUrl },
  serviceType: 'Investment Platform',
  areaServed: 'Worldwide',
}

export default function InvestorsPage() {
  return (
    <>
      {/* Structured data */}
      <Script id="ld-org" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <Script id="ld-breadcrumb" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Script id="ld-service" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <main className="bg-slate-950 text-slate-200">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-20 sm:pt-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-widest text-slate-400">Solutions</p>
              <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Investors — continuous deal flow with instant demos</h1>
              <p className="mt-4 text-lg text-slate-300">
                Filter by market, traction proxies, and tech—then open a live demo. See working products, not PDFs. 
                Get pipeline scoring, comparable metrics, and exit-ready assets.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact?reason=investor"
                  className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400"
                >
                  Request investor access
                </Link>
                <Link
                  href="/product/builder"
                  className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5"
                >
                  How the builder works
                </Link>
              </div>
              <p className="mt-3 text-sm text-slate-400">Live demos · Pipeline scoring · Cohort tracking · Exit-ready</p>
            </div>
            <div className="relative">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50 p-[15px] flex items-center justify-center">
                <img 
                  src="/images/solutions/investors/hero.svg" 
                  alt="Investor dashboard with live demos and deal flow management" 
                  className="h-full w-full object-contain"
                  loading="eager"
                />
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">Live demos · Scoring · Metrics · Cohorts</p>
            </div>
          </div>
        </section>

        {/* Live Demos vs Decks */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">See live demos, not decks</h2>
            <p className="mt-2 text-slate-300">Working products tell the real story</p>
          </div>
          <div className="flex justify-center mb-8">
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-[15px] flex items-center justify-center">
              <img 
                src="/images/solutions/investors/live-demo.svg" 
                alt="Live demo previews vs traditional pitch decks comparison" 
                className="h-48 w-auto"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Value propositions */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Why investors love Build AI Starups</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: 'Pipeline scoring', d: 'Automated triaging by market size, defensibility, and speed-to-demo.' },
              { t: 'Comparable metrics', d: 'Standardized traction proxies across all startups for apples-to-apples comparison.' },
              { t: 'Cohort tracking', d: 'Build watchlists by thesis and track progress without chasing emails.' },
              { t: 'Exit-ready assets', d: 'Clean docs, architecture notes, and handover checklists for fast due diligence.' },
            ].map((c, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="text-base font-medium">{c.t}</div>
                <p className="mt-1 text-sm text-slate-400">{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pipeline Scoring */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">Automated pipeline scoring</h3>
              <p className="mt-2 text-slate-300">
                Every startup gets automatically scored on market size, defensibility, and execution speed. 
                Sort and filter by what matters to your thesis.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li><strong>Market signals:</strong> Addressable market size and growth indicators</li>
                <li><strong>Defensibility:</strong> Technical moats and competitive positioning</li>
                <li><strong>Execution speed:</strong> Time from idea to working demo</li>
                <li><strong>Code quality:</strong> Architecture, tests, and technical debt analysis</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-[15px] flex items-center justify-center">
              <img 
                src="/images/solutions/investors/pipeline-scoring.svg" 
                alt="Automated pipeline scoring system with startup rankings" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Comparable Metrics */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="order-2 md:order-1 rounded-xl border border-white/10 bg-slate-900/50 p-[15px] flex items-center justify-center">
              <img 
                src="/images/solutions/investors/comparable-metrics.svg" 
                alt="Standardized startup metrics dashboard for comparison" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-xl font-semibold">Standardized metrics</h3>
              <p className="mt-2 text-slate-300">
                Every startup reports the same traction proxies. Compare activation rates, retention, and revenue 
                across sectors and stages with confidence.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Normalized activation and retention metrics</li>
                <li>Early revenue indicators and growth rates</li>
                <li>Usage funnels and engagement patterns</li>
                <li>Comparable cohort analysis across portfolio</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cohort Tracking */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">Cohort views & watchlists</h3>
              <p className="mt-2 text-slate-300">
                Build watchlists by investment thesis and track progress over time. See who's shipping, 
                who's stalling, and who's ready for the next round.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Thesis-based grouping (AI infra, EU fintech, etc.)</li>
                <li>Weekly progress updates and shipping velocity</li>
                <li>PRD changes and feature development tracking</li>
                <li>Live demo links updated automatically</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-[15px] flex items-center justify-center">
              <img 
                src="/images/solutions/investors/cohort-tracking.svg" 
                alt="Cohort tracking and watchlist management for investors" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Deal Flow Automation */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="order-2 md:order-1 rounded-xl border border-white/10 bg-slate-900/50 p-[15px] flex items-center justify-center">
              <img 
                src="/images/solutions/investors/deal-flow.svg" 
                alt="Automated deal flow process from discovery to decision" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-xl font-semibold">Automated deal flow</h3>
              <p className="mt-2 text-slate-300">
                Stop chasing decks and demos. Get a continuous stream of qualified opportunities 
                with automated screening and scoring.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Automatic discovery of new startups</li>
                <li>Thesis-based filtering and matching</li>
                <li>Instant access to live demos and code</li>
                <li>Streamlined evaluation workflow</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Portfolio Dashboard */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">Portfolio management</h2>
            <p className="mt-2 text-slate-300">Track performance across your entire portfolio</p>
          </div>
          <div className="flex justify-center mb-8">
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-[15px] flex items-center justify-center">
              <img 
                src="/images/solutions/investors/portfolio-dashboard.svg" 
                alt="Comprehensive portfolio dashboard with performance tracking" 
                className="h-48 w-auto"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Exit-Ready Assets */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">Exit-ready documentation</h3>
              <p className="mt-2 text-slate-300">
                Every startup ships with clean PRDs, architecture docs, and handover checklists. 
                When something hits, due diligence takes days—not months.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Structured PRDs and technical documentation</li>
                <li>Architecture diagrams and code quality reports</li>
                <li>License compliance and IP documentation</li>
                <li>Transfer-ready handover checklists</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-[15px] flex items-center justify-center">
              <img 
                src="/images/solutions/investors/exit-ready.svg" 
                alt="Exit-ready assets and documentation for fast due diligence" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Due Diligence Acceleration */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="order-2 md:order-1 rounded-xl border border-white/10 bg-slate-900/50 p-[15px] flex items-center justify-center">
              <img 
                src="/images/solutions/investors/due-diligence.svg" 
                alt="Accelerated due diligence process comparison" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-xl font-semibold">Accelerated due diligence</h3>
              <p className="mt-2 text-slate-300">
                Pre-organized documentation and standardized reporting cut due diligence time from months to days.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Pre-structured technical documentation</li>
                <li>Automated code quality and security reports</li>
                <li>Standardized financial and traction metrics</li>
                <li>Ready-to-review legal and IP documentation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Market Intelligence */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">Market intelligence</h3>
              <p className="mt-2 text-slate-300">
                Get insights into emerging trends, market opportunities, and competitive landscapes 
                across the entire startup ecosystem.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Trend analysis across sectors and technologies</li>
                <li>Market size and opportunity assessment</li>
                <li>Competitive landscape mapping</li>
                <li>Investment thesis validation</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-[15px] flex items-center justify-center">
              <img 
                src="/images/solutions/investors/market-intelligence.svg" 
                alt="Market intelligence and trend analysis dashboard" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Investment Thesis Tracking */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="order-2 md:order-1 rounded-xl border border-white/10 bg-slate-900/50 p-[15px] flex items-center justify-center">
              <img 
                src="/images/solutions/investors/thesis-tracking.svg" 
                alt="Investment thesis tracking and validation system" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-xl font-semibold">Thesis validation</h3>
              <p className="mt-2 text-slate-300">
                Track how your investment theses perform over time. See which bets are paying off 
                and where to double down.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Thesis performance tracking and validation</li>
                <li>Portfolio alignment with investment strategy</li>
                <li>Market timing and opportunity assessment</li>
                <li>Risk and return analysis by thesis</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Access Request */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
            <h2 className="text-2xl font-semibold">Investor console access</h2>
            <p className="mt-2 text-slate-300">
              Join the beta and get curated deal flow delivered weekly. See live demos, not decks.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { feature: 'Live demo access', note: 'Instant access to working products' },
                { feature: 'Pipeline scoring', note: 'Automated ranking and filtering' },
                { feature: 'Cohort tracking', note: 'Thesis-based watchlists and progress' },
              ].map((x, i) => (
                <div key={i} className="rounded-lg border border-white/10 bg-slate-950/40 px-4 py-3">
                  <div className="text-base font-semibold">{x.feature}</div>
                  <div className="text-sm text-slate-400">{x.note}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="/contact?reason=investor"
                className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400"
              >
                Request investor access
              </Link>
              <Link
                href="/resources/press"
                className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5"
              >
                Press & overview
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/10 bg-slate-900/40 py-14">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-semibold">See the future being built</h2>
            <p className="mt-2 text-slate-300">
              Get continuous access to live demos, standardized metrics, and exit-ready startups. 
              Join the investor console beta today.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link
                href="/contact?reason=investor"
                className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400"
              >
                Request investor access
              </Link>
              <Link
                href="/product/builder"
                className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5"
              >
                How it works
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
