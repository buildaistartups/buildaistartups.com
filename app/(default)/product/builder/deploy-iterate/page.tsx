// app/(default)/product/builder/deploy-iterate/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import AnimatedSvgOnScroll from '@/components/animated-svg-on-scroll'

const BRAND = 'Build AI Starups'
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.buildaistartups.com'
const CANON = `${SITE}/product/builder/deploy-iterate`
const OG = '/og/product-builder.svg'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: `Deploy, Learn, Iterate — ${BRAND}`,
  description:
    'Deploy to Vercel, observe real usage, ship updates. Build AI Starups proposes improvements and keeps the spec in sync.',
  alternates: { canonical: CANON },
  openGraph: {
    title: `Deploy, Learn, Iterate — ${BRAND}`,
    description:
      'Launch on Vercel, measure what matters, and iterate with AI-assisted changelogs and PRs.',
    url: CANON,
    type: 'website',
    images: [{ url: OG, width: 1200, height: 630, alt: `${BRAND} — Deploy & Iterate` }],
    siteName: BRAND,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Deploy, Learn, Iterate — ${BRAND}`,
    description:
      'Launch on Vercel, measure what matters, and iterate with AI-assisted changelogs and PRs.',
    images: [OG],
  },
}

export default function DeployIterate() {
  return (
    <main className="bg-slate-950 text-slate-200 min-h-screen">
      <section className="relative mx-auto max-w-4xl px-4 sm:px-6 py-20">
        {/* Visual Header - ANIMATED ON SCROLL */}
        <AnimatedSvgOnScroll threshold={0.2}>
          <div className="mb-12 flex justify-center">
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur">
              <img 
                src="/images/product/builder/flow-deploy-iterate.svg" 
                alt="Deploy, learn, iterate workflow" 
                className="h-40 w-auto mx-auto"
                loading="eager"
              />
            </div>
          </div>
        </AnimatedSvgOnScroll>

        <header className="text-center mb-12">
          <div className="inline-flex font-medium pb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-200">
            Builder · Step 3
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60">
            Deploy, learn, iterate
          </h1>
          <p className="mt-6 text-xl text-slate-300 max-w-2xl mx-auto">
            Push to Vercel, validate with real users, and let {BRAND} suggest the next best
            change.
          </p>
        </header>

        {/* Content Cards */}
        <div className="grid gap-8 md:gap-12 mb-12">
          {/* Launch Pipeline */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white">Launch pipeline</h3>
            </div>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-white">Vercel deploy</strong> from main with preview branches for PRs
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-white">Postgres/Supabase</strong> ready for data models the PRD defines
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-white">Stripe</strong> hooks &amp; webhooks wired when you enable billing
                </div>
              </li>
            </ul>
          </div>

          {/* Learn Fast */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white">Learn fast</h3>
            </div>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <div>Event analytics hooks (page, signup, activate, pay)</div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <div>Changelog notes and release tags auto-updated</div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <div>
                  Feedback loop into the PRD (kept in <code className="bg-slate-800 px-2 py-1 rounded text-sm">/docs/prd.md</code>)
                </div>
              </li>
            </ul>
          </div>

          {/* Iterate Safely */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white">Iterate safely</h3>
            </div>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                <div>AI-assisted PR suggestions tied to user signals</div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                <div>Migrations &amp; test scaffolds for critical paths</div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                <div>Rollbacks and preview checks built-in</div>
              </li>
            </ul>
          </div>
        </div>

        {/* Quality Badges */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-center mb-6">Deployment features</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/40 px-4 py-2">
              <img src="/images/product/builder/badges/fast-bolt.svg" alt="Fast deployment" className="h-4 w-4" />
              <span className="text-sm text-slate-300">Instant deploys</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/40 px-4 py-2">
              <img src="/images/product/builder/badges/quality.svg" alt="Quality checks" className="h-4 w-4" />
              <span className="text-sm text-slate-300">Quality gates</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/40 px-4 py-2">
              <img src="/images/product/builder/badges/github.svg" alt="GitHub integration" className="h-4 w-4" />
              <span className="text-sm text-slate-300">GitHub Actions</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mb-12">
          <Link
            href="/product/builder/generate-ui"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous: Generate UI
          </Link>
          <Link
            href="/product/builder"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
          >
            Back to Builder
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
            Ready to deploy your first AI-generated startup?
          </p>
        </div>
      </section>
    </main>
  )
}
