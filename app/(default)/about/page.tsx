// app/(default)/about/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const siteUrl = 'https://www.buildaistartups.com'
const ogImage = '/brand/og-default.png'

export const metadata: Metadata = {
  title: 'About | Build AI Startups',
  description:
    'Build AI Startups is the public platform for HyperNova—an autonomous engine that designs, codes, brands, deploys, and grows micro-SaaS in one loop.',
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/about`,
    title: 'About | Build AI Startups',
    description:
      'Build AI Startups is the public platform for HyperNova—an autonomous engine that designs, codes, brands, deploys, and grows micro-SaaS in one loop.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Build AI Startups' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Build AI Startups',
    description:
      'Build AI Startups is the public platform for HyperNova—an autonomous engine that designs, codes, brands, deploys, and grows micro-SaaS in one loop.',
    images: [ogImage],
  },
}

// ---- JSON-LD Schemas ----
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Build AI Startups',
  url: siteUrl,
  description:
    'Autonomous engine that designs, codes, brands, deploys and grows micro-SaaS.',
  logo: `${siteUrl}/brand/logo-light.svg`,
  sameAs: ['https://x.com/buildaistartups', 'https://github.com/buildaistartups'],
  founder: { '@type': 'Person', name: 'Founder (Your Name)' },
}

const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Build AI Startups',
  url: siteUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteUrl}/search?q={query}`,
    'query-input': 'required name=query',
  },
}

export default function About() {
  return (
    <>
      {/* Structured data */}
      <Script
        id="ld-org"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <Script
        id="ld-website"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />

      <main className="bg-slate-950 text-slate-200">
        {/* Hero */}
        <section className="mx-auto max-w-4xl px-6 pb-8 pt-16 sm:pt-24">
          <p className="text-sm uppercase tracking-widest text-slate-400">
            Company
          </p>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
            About Build AI Startups
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            <strong>Startups that build themselves.</strong> Build AI Startups is the
            public platform for <em>HyperNova</em>, an autonomous engine that takes a
            one-sentence intent and turns it into a production-ready micro-SaaS—complete
            with repo, UI, docs, pricing, deployment, analytics, and growth experiments.
          </p>
        </section>

        {/* Mission */}
        <section className="mx-auto max-w-4xl px-6 py-10">
          <h2 className="text-2xl font-semibold">Mission</h2>
          <p className="mt-3 text-slate-300">
            <strong>Put world-class venture creation on autopilot</strong> so anyone can
            go from idea to revenue in a single continuous loop.
          </p>
        </section>

        {/* What we are */}
        <section className="mx-auto max-w-4xl px-6 py-10">
          <h2 className="text-2xl font-semibold">What we are (and how it fits)</h2>
          <ul className="mt-4 space-y-2 text-slate-300">
            <li>
              <strong>Platform:</strong> BuildAIStartups.com — the UI where you
              generate, review, and launch projects.
            </li>
            <li>
              <strong>Engine:</strong> <em>HyperNova 2.0</em> — the pipeline that
              discovers, plans, builds, ships, and learns.
            </li>
            <li>
              <strong>Roadmap:</strong> <em>HyperNova 3.0</em> — vertical agents (e.g.,
              fintech/health), stricter compliance packs, and acquisition automation.
            </li>
          </ul>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-4xl px-6 py-10">
          <h2 className="text-2xl font-semibold">How it works (at a glance)</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-300">
            <li>
              <strong>Set intent</strong> — Pick a niche or let HyperNova scout trends
              and pains.
            </li>
            <li>
              <strong>Connect</strong> — Link GitHub, Vercel, database, and Stripe—no
              lock-in.
            </li>
            <li>
              <strong>Autobuild</strong> — Spec → repo → UI → copy → docs → pricing →
              landing.
            </li>
            <li>
              <strong>Go live</strong> — Domain, analytics, SEO and onboarding wired
              automatically.
            </li>
            <li>
              <strong>Self-improve</strong> — A/B copy, pricing, onboarding—driven by
              usage signals.
            </li>
          </ol>
          <p className="mt-4 rounded-lg border border-white/10 bg-slate-900/40 p-4 text-sm text-slate-400">
            <strong>Ownership:</strong> You own the code, infra, and revenue. We provide
            the engine.
          </p>
        </section>

        {/* Differentiators */}
        <section className="mx-auto max-w-4xl px-6 py-10">
          <h2 className="text-2xl font-semibold">What makes it different</h2>
          <ul className="mt-4 grid gap-3 text-slate-300 sm:grid-cols-2">
            <li>Full-loop autonomy — not just code snippets.</li>
            <li>Ecosystem effects — generated startups cross-promote each other.</li>
            <li>Monetization-first — pricing, billing, and growth experiments from day one.</li>
            <li>
              Predictable builds — structured PRD (Spec DSL) + CI quality gates +{' '}
              <strong>Build Score</strong>.
            </li>
            <li>No lock-in — your GitHub, your Vercel, your DB, your Stripe.</li>
          </ul>
        </section>

        {/* Principles */}
        <section className="mx-auto max-w-4xl px-6 py-10">
          <h2 className="text-2xl font-semibold">Principles</h2>
          <ul className="mt-4 grid gap-3 text-slate-300 sm:grid-cols-2">
            <li>Open-source first (where feasible)</li>
            <li>No lock-in — user-owned repos and infra</li>
            <li>Builder empathy — ship value in minutes, not months</li>
            <li>Safety by design — audit logs, approvals, license guardrails</li>
            <li>Transparent roadmap &amp; changelog</li>
          </ul>
        </section>

        {/* Governance & Safety */}
        <section className="mx-auto max-w-4xl px-6 py-10">
          <h2 className="text-2xl font-semibold">Governance &amp; Safety</h2>
          <ul className="mt-4 space-y-2 text-slate-300">
            <li>
              <strong>Two modes:</strong> <em>Copilot</em> (review gates) and{' '}
              <em>Autopilot</em> (ships when green).
            </li>
            <li>
              <strong>Quality gates:</strong> lint, tests, security scans, performance
              budgets, license checks.
            </li>
            <li>
              <strong>Spec DSL:</strong> structured PRD for reproducible builds.
            </li>
            <li>
              <strong>Secrets:</strong> user-owned integrations, short-lived tokens,
              secret scrubbing.
            </li>
          </ul>
        </section>

        {/* Milestones */}
        <section className="mx-auto max-w-4xl px-6 py-10">
          <h2 className="text-2xl font-semibold">Milestones</h2>
          <ul className="mt-4 space-y-2 text-slate-300">
            <li>
              <strong>v0.1 —</strong> First public alpha: end-to-end build loop running.
            </li>
            <li>
              <strong>v0.2 —</strong> Gold Templates (SaaS, API), CI gates,{' '}
              <strong>Build Score</strong> badge.
            </li>
            <li>
              <strong>v0.3 —</strong> Ecosystem cross-promos, pricing generator, API
              webhooks.
            </li>
            <li>
              <strong>Next —</strong> Prompt Packs, Marketplace beta, Transfer-readiness
              checklist.
            </li>
            <li>
              <strong>Later —</strong> Vertical agents, compliance packs, acquisition
              automation.
            </li>
          </ul>
        </section>

        {/* Public metrics (placeholder values) */}
        <section className="mx-auto max-w-4xl px-6 py-10">
          <h2 className="text-2xl font-semibold">Public metrics (updated periodically)</h2>
          <ul className="mt-4 grid gap-3 text-slate-300 sm:grid-cols-2">
            <li>
              <strong>Median time-to-MVP:</strong> N minutes
            </li>
            <li>
              <strong>Build success rate:</strong> N% (all gates green)
            </li>
            <li>
              <strong>Activation (first-value) rate:</strong> N%
            </li>
            <li>
              <strong>Experiments shipped (30d):</strong> N
            </li>
            <li>
              <strong>Marketplace GMV:</strong> $N (beta)
            </li>
          </ul>
          <p className="mt-2 text-sm text-slate-400">
            Metrics are opt-in and anonymized; we’ll publish updates in the changelog.
          </p>
        </section>

        {/* Founder’s note */}
        <section className="mx-auto max-w-4xl px-6 py-10">
          <h2 className="text-2xl font-semibold">Founder’s note</h2>
          <blockquote className="mt-4 rounded-xl border border-white/10 bg-slate-900/40 p-5 text-slate-300">
            “I built HyperNova because most ideas die in the gap between inspiration and
            execution. By compressing the loop from intent to revenue—and letting builders
            own everything—we make it practical to try more things, faster, with real
            users.”
            <footer className="mt-3 text-sm text-slate-400">
              — <em>Founder, Build AI Startups</em>
            </footer>
          </blockquote>
        </section>

        {/* Press & speaking */}
        <section className="mx-auto max-w-4xl px-6 py-10">
          <h2 className="text-2xl font-semibold">Press &amp; speaking</h2>
          <ul className="mt-4 space-y-2 text-slate-300">
            <li>
              <strong>Press Kit:</strong> brand assets, screenshots, founder bio, and the
              3-minute demo.
            </li>
            <li>
              <strong>Topics:</strong> autonomous venture creation, network effects across
              micro-SaaS, evals for AI systems, reproducible builds.
            </li>
          </ul>
          <p className="mt-2 text-slate-300">
            <strong>Email:</strong>{' '}
            <a className="text-sky-300 hover:underline" href="mailto:press@buildaistartups.com">
              press@buildaistartups.com
            </a>
          </p>
        </section>

        {/* Get involved + CTA */}
        <section className="mx-auto max-w-4xl px-6 py-10">
          <h2 className="text-2xl font-semibold">Get involved</h2>
          <ul className="mt-4 space-y-1 text-slate-300">
            <li>
              <Link href="/generate" className="text-sky-300 hover:underline">
                Generate your first startup
              </Link>
            </li>
            <li>
              <Link href="/" className="text-sky-300 hover:underline">
                Follow the Build Feed
              </Link>{' '}
              (Today’s auto-launches)
            </li>
            <li>
              <Link href="/roadmap" className="text-sky-300 hover:underline">
                Suggest a feature
              </Link>
            </li>
          </ul>
        </section>

        {/* Final CTA band */}
        <section className="border-t border-white/10 bg-slate-900/40 py-14">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-semibold">Ready to try it?</h2>
            <p className="mt-2 text-slate-300">
              Spin up your next startup today. Worst case: you learn. Best case: you launch.
            </p>
            <Link
              href="/generate"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400"
            >
              Generate my first startup
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
