// app/(default)/solutions/startups/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import Image from 'next/image'

const siteUrl = 'https://www.buildaistartups.com'
const ogImage = '/og/product-builder.svg' // safe existing OG

export const metadata: Metadata = {
  title: 'Startups — Ship faster, learn faster, grow faster | Build AI Startups',
  description:
    'For founding teams: go from brief → repo → revenue in days. Builder generates a production repo, Ecosystem drives distribution, Marketplace opens monetization. Experiments, A/Bs, analytics, and flags included.',
  alternates: { canonical: `${siteUrl}/solutions/startups` },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/solutions/startups`,
    title: 'Startups — Ship faster, learn faster, grow faster | Build AI Startups',
    description:
      'From zero to traction: generate code, ship features behind flags, run growth loops, and charge real money.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Build AI Startups — Startups' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Startups — Ship faster, learn faster, grow faster',
    description: 'Brief → repo → revenue in days, with growth flywheels built‑in.',
    images: [ogImage],
  },
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Build AI Startups',
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
    { '@type': 'ListItem', position: 3, name: 'Startups', item: `${siteUrl}/solutions/startups` },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do we own the code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You get a private repo under your org. No lock‑in.',
      },
    },
    {
      '@type': 'Question',
      name: 'What stack do we get?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Next.js + TypeScript + Tailwind + shadcn/ui, with tests, CI, analytics, flags, and docs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How fast can we launch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most teams put a live MVP in front of users in 1–2 weeks.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can we bring our own cloud?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Works with Vercel/Netlify (frontend), Render/Railway (backend), and Supabase (DB).',
      },
    },
  ],
}

export default function Page() {
  return (
    <>
      {/* Structured data */}
      <Script id="org-jsonld" type="application/ld+json">
        {JSON.stringify(orgJsonLd)}
      </Script>
      <Script id="breadcrumb-jsonld" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
      <Script id="faq-jsonld" type="application/ld+json">
        {JSON.stringify(faqJsonLd)}
      </Script>

      <main className="relative">
        {/* Decorative backdrop */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-[-10%] h-[40rem] w-[60rem] -translate-x-1/2 rounded-full blur-3xl"
               style={{background: 'radial-gradient(50% 50% at 50% 50%, rgba(124,58,237,0.25) 0%, rgba(0,0,0,0) 70%)'}}/>
        </div>

        {/* HERO */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="mx-auto max-w-6xl px-6 pt-12 pb-6 text-center">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight">
                Startups: ship faster, learn faster, grow faster
              </h1>
              <p className="mt-4 text-slate-300">
                From one‑sentence brief to live product and first revenue. Generate a production repo, run experiments behind flags,
                and spin the go‑to‑market flywheel without extra headcount.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Link href="/start" className="inline-flex items-center rounded-xl bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400">
                  Start a 14‑day pilot
                </Link>
                <Link href="/product/builder" className="inline-flex items-center rounded-xl border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5">
                  See the Builder
                </Link>
              </div>
              <div className="mt-4 text-xs text-slate-400">No lock‑in • You own the repo • Bring your cloud</div>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="mx-auto max-w-6xl px-6 pb-12">
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 ring-1 ring-white/5">
              <Image
                src="/images/product/builder/hero.svg"
                alt="Build AI Startups — Builder generating a repo from a brief"
                width={1360}
                height={768}
                priority
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </section>

        {/* Why startups choose us */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold text-center mb-6">Why founding teams choose Build AI Startups</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { t: 'Brief → Repo in hours', d: 'A production‑ready Next.js + TS + Tailwind + shadcn/ui repo, tests, CI, docs, pricing & analytics.' },
              { t: 'Evidence before spend', d: 'Ship behind feature flags, run A/B tests & user surveys, and read real telemetry before big bets.' },
              { t: 'Built‑in GTM', d: 'Templates for onboarding, paywalls, email capture, referral loops, and marketplace listing.' },
            ].map((c, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="text-base font-medium">{c.t}</div>
                <p className="mt-1 text-sm text-slate-400">{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">How it works</h2>
            <p className="mt-2 text-slate-300">3 tight loops to get to traction quickly</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { s: '1', t: 'Define the bet', d: 'Outcomes > features. Add constraints, guardrails, and success metrics.' },
              { s: '2', t: 'Generate the repo', d: 'Builder scaffolds features, tests, telemetry, docs, pricing, and CI/CD.' },
              { s: '3', t: 'Ship & measure', d: 'Release behind flags, run A/Bs, gather feedback, and iterate weekly.' },
            ].map((x) => (
              <div key={x.s} className="rounded-xl border border-white/10 bg-slate-900/40 p-6">
                <div className="text-3xl font-semibold">{x.s}</div>
                <div className="mt-2 text-lg font-medium">{x.t}</div>
                <p className="mt-1 text-sm text-slate-400">{x.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Screenshot / preview */}
        <section className="mx-auto max-w-6xl px-6 py-4">
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 ring-1 ring-white/5">
            <Image
              src="/images/product/builder/shell-preview.svg"
              alt="Starter app shell preview with telemetry, flags, and CI"
              width={1360}
              height={768}
              className="w-full h-auto rounded-xl"
            />
          </div>
        </section>

        {/* What you get */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold text-center mb-6">What you get on day one</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-6">
              <div className="text-lg font-medium">Product</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-300 space-y-1">
                <li>Production repo (Next.js + TS + Tailwind + shadcn/ui), tests & CI</li>
                <li>Feature flags, A/B framework, analytics, and event taxonomy</li>
                <li>Pricing & paywall skeleton (Stripe-ready), onboarding flows</li>
                <li>Docs, changelog, and release templates</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-6">
              <div className="text-lg font-medium">Growth</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-300 space-y-1">
                <li>Launch checklist, 7‑day content sprint, and referral loop</li>
                <li>Marketplace listing and lead capture widgets</li>
                <li>Partner outreach scripts and demo day guide</li>
                <li>Metrics board: activation, retention, revenue</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Proof (examples) */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold text-center mb-6">Example startup builds</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { t: 'AI Lead Gen Pipeline', d: 'Inbound→score→route→outreach. 3 week build, paid pilots in week 4.' },
              { t: 'Support Copilot', d: 'RAG + workflows + quality gates. CSAT +18% in 60 days.' },
              { t: 'Ops Agent', d: 'Cost‑to‑serve −27% via automation and better triage.' },
            ].map((x,i)=> (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="text-base font-medium">{x.t}</div>
                <p className="mt-1 text-sm text-slate-400">{x.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing CTA */}
        <section className="mx-auto max-w-6xl px-6 py-12 text-center">
          <h2 className="text-2xl font-semibold">Startup‑friendly pricing</h2>
          <p className="mt-2 text-slate-300">Build free. Upgrade when you charge your first $1.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href="/pricing" className="inline-flex items-center rounded-xl bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400">
              See pricing
            </Link>
            <Link href="/generate" className="inline-flex items-center rounded-xl border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5">
              Try a spec
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-4xl px-6 py-12">
          <h2 className="text-2xl font-semibold text-center mb-6">Startups FAQ</h2>
          <div className="divide-y divide-white/10 rounded-xl border border-white/10 bg-slate-900/40">
            {[
              { q: 'Do we own the code?', a: 'Yes. You get a private repo under your org. No lock‑in.' },
              { q: 'What stack do we get?', a: 'Next.js + TypeScript + Tailwind + shadcn/ui, with tests, CI, analytics, flags, and docs.' },
              { q: 'How fast can we launch?', a: 'Most teams put a live MVP in front of users in 1–2 weeks.' },
              { q: 'Can we bring our own cloud?', a: 'Yes. Works with Vercel/Netlify (frontend), Render/Railway (backend), and Supabase (DB).' },
            ].map((f,i)=> (
              <details key={i} className="group p-4">
                <summary className="cursor-pointer list-none font-medium text-slate-100">{f.q}</summary>
                <p className="mt-2 text-sm text-slate-400">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-6xl px-6 pb-16 text-center">
          <h2 className="text-2xl font-semibold">Make the next 30 days count</h2>
          <p className="mt-2 text-slate-300">Ship something users love. Learn from real signals. Earn your first revenue.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href="/start" className="inline-flex items-center rounded-xl bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400">
              Start now
            </Link>
            <Link href="/product/ecosystem" className="inline-flex items-center rounded-xl border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5">
              See the Ecosystem
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
