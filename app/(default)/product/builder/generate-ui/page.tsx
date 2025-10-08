// app/(default)/product/builder/generate-ui/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

const BRAND = 'Build AI Starups'
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.buildaistartups.com'
const CANON = `${SITE}/product/builder/generate-ui`
const OG = '/og/product-builder.svg'
const DESC =
  'Scaffold a production-ready Next.js app with polished UI, docs, auth, billing, and analytics wired. Pushed to your own GitHub.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: `Generate Repo & UI — ${BRAND}`,
  description: DESC,
  alternates: { canonical: CANON },
  openGraph: {
    type: 'website',
    url: CANON,
    title: `Generate Repo & UI — ${BRAND}`,
    description: 'Next.js + Tailwind + shadcn/ui, auth, Stripe billing, analytics, and docs — under your GitHub.',
    images: [{ url: OG, width: 1200, height: 630, alt: `${BRAND} — Generate UI` }],
    siteName: BRAND,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Generate Repo & UI — ${BRAND}`,
    description: DESC,
    images: [OG],
  },
}

export default function GenerateUI() {
  return (
    <main className="bg-slate-950 text-slate-200 min-h-screen">
      <section className="relative mx-auto max-w-4xl px-4 sm:px-6 py-20">
        {/* Visual Header */}
        <div className="mb-12 flex justify-center">
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur">
            <img 
              src="/images/product/builder/flow-generate-ui.svg" 
              alt="Generate repo and UI workflow" 
              className="h-40 w-auto mx-auto"
              loading="eager"
            />
          </div>
        </div>

        <header className="text-center mb-12">
          <div className="inline-flex font-medium pb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-200">
            Builder · Step 2
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60">
            Generate repo &amp; UI
          </h1>
          <p className="mt-6 text-xl text-slate-300 max-w-2xl mx-auto">
            We scaffold your app with the essentials so you can launch sooner and spend time on what's unique.
          </p>
        </header>

        {/* Content Cards */}
        <div className="grid gap-8 md:gap-12 mb-12">
          {/* Stack & Conventions */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white">Stack &amp; conventions</h3>
            </div>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-white">Next.js 15</strong>, <strong className="text-white">TypeScript</strong>, <strong className="text-white">App Router</strong>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-white">Tailwind</strong> + sensible tokens; <strong className="text-white">shadcn/ui</strong> for primitives
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                <div>Auth stub + cookie session; Stripe billing stub; analytics hooks</div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                <div>
                  Docs as Markdown in <code className="bg-slate-800 px-2 py-1 rounded text-sm">/docs</code>; API routes under <code className="bg-slate-800 px-2 py-1 rounded text-sm">/api</code>
                </div>
              </li>
            </ul>
          </div>

          {/* What's Wired */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white">What's wired for you</h3>
            </div>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <div>Marketing pages (hero, features, pricing, contact) with SEO metadata</div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <div>Sign in / Sign up / Reset password stubs</div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <div>Pricing tiers &amp; FAQ components</div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <div>"Generate Startup" flow with saved dashboard gate</div>
              </li>
            </ul>
          </div>

          {/* Repo Anatomy */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white">Repo anatomy (sample)</h3>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-950/50 p-6 overflow-x-auto">
              <pre className="text-sm text-slate-300 font-mono">
{`app/
  (default)/
    page.tsx
    pricing/
    contact/
    product/
  api/
    contact/
components/
lib/
public/
docs/`}
              </pre>
            </div>
          </div>

          {/* UI Preview */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white">Generated UI preview</h3>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
              <img 
                src="/images/product/builder/shell-preview.svg" 
                alt="Generated application UI preview" 
                className="w-full h-auto rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-center mb-6">Tech stack included</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Next.js 15',
              'TypeScript',
              'Tailwind CSS',
              'shadcn/ui',
              'Stripe',
              'Supabase',
              'Vercel',
              'Playwright'
            ].map((tech) => (
              <span key={tech} className="rounded-lg border border-white/10 bg-slate-900/40 px-3 py-2 text-sm text-slate-300">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Quality Features */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/40 px-4 py-2">
              <img src="/images/product/builder/badges/fast-bolt.svg" alt="Fast generation" className="h-4 w-4" />
              <span className="text-sm text-slate-300">Instant scaffolding</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/40 px-4 py-2">
              <img src="/images/product/builder/badges/quality.svg" alt="Quality code" className="h-4 w-4" />
              <span className="text-sm text-slate-300">Production ready</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/40 px-4 py-2">
              <img src="/images/product/builder/badges/github.svg" alt="GitHub ready" className="h-4 w-4" />
              <span className="text-sm text-slate-300">Your repository</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mb-12">
          <Link
            href="/product/builder/research-spec"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous: Research & Spec
          </Link>
          <Link
            href="/product/builder/deploy-iterate"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
          >
            Next: Deploy & Iterate
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
            Ready to generate your production-ready codebase?
          </p>
        </div>
      </section>
    </main>
  )
}
