// app/(default)/product/builder/research-spec/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

const BRAND = 'Build AI Starups'
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.buildaistartups.com'
const CANON = `${SITE}/product/builder/research-spec`
const OG = '/og/product-builder.svg'
const DESC =
  'Turn a one-line idea into a crisp product plan. Build AI Starups researches the niche, analyzes competitors, and drafts a PRD with acceptance criteria.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: `Research & Spec — ${BRAND}`,
  description: DESC,
  alternates: { canonical: CANON },
  openGraph: {
    type: 'website',
    url: CANON,
    title: `Research & Spec — ${BRAND}`,
    description:
      'From signal to spec: niche scan, competitor map, ICP, and a PRD you can ship against.',
    images: [{ url: OG, width: 1200, height: 630, alt: `${BRAND} — Research & Spec` }],
    siteName: BRAND,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Research & Spec — ${BRAND}`,
    description: DESC,
    images: [OG],
  },
}

export default function ResearchSpec() {
  return (
    <main className="bg-slate-950 text-slate-200 min-h-screen">
      <section className="relative mx-auto max-w-4xl px-4 sm:px-6 py-20">
        {/* Visual Header */}
        <div className="mb-12 flex justify-center">
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur">
            <img 
              src="/images/product/builder/flow-research-spec.svg" 
              alt="Research and specification workflow" 
              className="h-40 w-auto mx-auto"
              loading="eager"
            />
          </div>
        </div>

        <header className="mb-12 text-center">
          <div className="inline-flex font-medium pb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-200">
            Builder · Step 1
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60">
            Research &amp; product spec
          </h1>
          <p className="mt-6 text-xl text-slate-300 max-w-2xl mx-auto">
            Give {BRAND} a one-sentence brief. We turn it into a plan you can ship:
            market context, opportunity thesis, and a PRD with acceptance criteria.
          </p>
        </header>

        {/* Content Cards */}
        <div className="grid gap-8 md:gap-12 mb-12">
          {/* What You Get */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white">What you get</h3>
            </div>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-white">Opportunity scan:</strong> problem framing, segments, TAM notes.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-white">Competitor map:</strong> positioning, gaps, wedge ideas.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-white">ICP &amp; jobs-to-be-done:</strong> who we help and why.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-white">Draft PRD:</strong> user stories, flows, API surface, data model sketch.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-white">Acceptance criteria:</strong> demoable outcomes for the first release.
                </div>
              </li>
            </ul>
          </div>

          {/* Why This Matters */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white">Why this matters</h3>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed">
              Clear specs de-risk build time. You keep ownership and control: all artifacts
              are pushed to your own GitHub as Markdown in <code className="bg-slate-800 px-2 py-1 rounded text-sm">/docs/</code>.
            </p>
          </div>

          {/* Outputs */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white">Outputs in your repo</h3>
            </div>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                <div>
                  <code className="bg-slate-800 px-2 py-1 rounded text-sm text-emerald-300">/docs/brief.md</code> — normalized problem &amp; scope
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                <div>
                  <code className="bg-slate-800 px-2 py-1 rounded text-sm text-emerald-300">/docs/market-notes.md</code> — scan &amp; competitor table
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                <div>
                  <code className="bg-slate-800 px-2 py-1 rounded text-sm text-emerald-300">/docs/prd.md</code> — user stories, flows, criteria
                </div>
              </li>
            </ul>
          </div>

          {/* Research Process */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white">Research process</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center p-4 rounded-xl border border-white/10 bg-slate-950/50">
                <div className="text-2xl mb-2">🎯</div>
                <div className="text-sm font-medium text-white">Problem Analysis</div>
                <div className="text-xs text-slate-400 mt-1">Market pain points</div>
              </div>
              <div className="text-center p-4 rounded-xl border border-white/10 bg-slate-950/50">
                <div className="text-2xl mb-2">🔍</div>
                <div className="text-sm font-medium text-white">Competitor Scan</div>
                <div className="text-xs text-slate-400 mt-1">Positioning gaps</div>
              </div>
              <div className="text-center p-4 rounded-xl border border-white/10 bg-slate-950/50">
                <div className="text-2xl mb-2">👥</div>
                <div className="text-sm font-medium text-white">ICP Definition</div>
                <div className="text-xs text-slate-400 mt-1">Target audience</div>
              </div>
              <div className="text-center p-4 rounded-xl border border-white/10 bg-slate-950/50">
                <div className="text-2xl mb-2">📋</div>
                <div className="text-sm font-medium text-white">PRD Draft</div>
                <div className="text-xs text-slate-400 mt-1">Spec & criteria</div>
              </div>
            </div>
          </div>
        </div>

        {/* Research Features */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-center mb-6">Research capabilities</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/40 px-4 py-2">
              <img src="/images/product/builder/badges/fast-bolt.svg" alt="Fast research" className="h-4 w-4" />
              <span className="text-sm text-slate-300">Rapid analysis</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/40 px-4 py-2">
              <img src="/images/product/builder/badges/quality.svg" alt="Quality insights" className="h-4 w-4" />
              <span className="text-sm text-slate-300">Deep insights</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/40 px-4 py-2">
              <img src="/images/product/builder/badges/github.svg" alt="GitHub docs" className="h-4 w-4" />
              <span className="text-sm text-slate-300">GitHub docs</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mb-12">
          <Link
            href="/product/builder"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Builder
          </Link>
          <Link
            href="/product/builder/generate-ui"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
          >
            Next: Generate UI
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/generate"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:from-violet-500 hover:to-purple-500"
          >
            Generate Startup
            <svg className="h-5 w-5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <p className="mt-4 text-sm text-slate-400">
            Start with your one-sentence idea and get a complete research brief
          </p>
        </div>
      </section>
    </main>
  )
}
