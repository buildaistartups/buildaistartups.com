// app/(default)/docs/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const siteUrl = 'https://www.buildaistartups.com'
const ogImage = '/brand/og-default.png'

export const metadata: Metadata = {
  title: 'Docs — Build, ship, and grow with HyperNova | Build AI Startups',
  description:
    'Getting started, core concepts, API reference, webhooks, SDKs, security, and FAQs for Build AI Startups (HyperNova). From intent to live micro-SaaS.',
  alternates: { canonical: `${siteUrl}/docs` },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/docs`,
    title: 'Docs — Build, ship, and grow with HyperNova | Build AI Startups',
    description:
      'From intent to live micro-SaaS: Quick start, Concepts, API, Webhooks, SDKs, Security, FAQ.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Build AI Startups — Docs' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Docs — Build, ship, and grow with HyperNova | Build AI Startups',
    description:
      'Quick start, Concepts, API, Webhooks, SDKs, Security, and FAQ for HyperNova.',
    images: [ogImage],
  },
}

// ---- JSON-LD Schemas ----
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Build AI Startups',
  url: siteUrl,
  logo: `${siteUrl}/brand/logo-light.svg`,
  sameAs: ['https://x.com/buildaistartups', 'https://github.com/buildaistartups'],
}

const collectionPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Build AI Startups Documentation',
  url: `${siteUrl}/docs`,
  description:
    'Documentation hub for Build AI Startups (HyperNova): getting started, concepts, API, webhooks, SDKs, security, FAQ.',
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Docs', item: `${siteUrl}/docs` },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do I need the API to use Build AI Startups?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The web app covers most workflows. The API is optional for automation, integrations, cohorts, and partners.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who owns the code and revenue?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You do. Repos live under your GitHub and deploy to your infrastructure. Billing uses your Stripe; you keep revenue.',
      },
    },
    {
      '@type': 'Question',
      name: 'How are builds validated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Each build passes quality gates: lint/types, tests, security scans, performance budgets, and license checks. Results roll into a Build Score.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the platform safe to run in Autopilot mode?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, with guardrails. Autopilot ships only when all gates are green and your Build Score meets threshold. Use Copilot mode to require approvals.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the default rate limits?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Default 60 requests per minute per API key. Higher tiers are available on paid plans.',
      },
    },
  ],
}

export default function DocsHomePage() {
  return (
    <>
      {/* Structured data */}
      <Script id="ld-org" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <Script id="ld-collection" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }} />
      <Script id="ld-breadcrumb" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="bg-slate-950 text-slate-200">
        {/* Hero / TOC */}
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-20 sm:pt-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-widest text-slate-400">Documentation</p>
              <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Docs — Build, ship, and grow with HyperNova</h1>
              <p className="mt-4 text-lg text-slate-300">
                Everything you need to go from a one-sentence intent to a live micro-SaaS. Start with the Quick Start,
                then explore Concepts, API, Webhooks, and Security.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#quickstart" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400">
                  Quick Start
                </a>
                <a href="#api" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5">
                  API overview
                </a>
              </div>
              <p className="mt-3 text-sm text-slate-400">Spec DSL · Build Score · Gates · Webhooks · SDKs</p>
            </div>
            <div className="relative">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50">
                <img src="/media/screens/docs-hero.png" alt="Documentation overview" className="h-full w-full object-cover" />
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">Start here → Quick Start · Concepts · API</p>
            </div>
          </div>

          {/* On-page nav */}
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: '#quickstart', t: 'Quick Start', d: 'First build in minutes' },
              { href: '#concepts', t: 'Core Concepts', d: 'Spec DSL, Build Score, modes' },
              { href: '#api', t: 'API Reference', d: 'Endpoints and auth' },
              { href: '#webhooks', t: 'Webhooks', d: 'Events and signatures' },
            ].map((x) => (
              <a key={x.href} href={x.href} className="rounded-xl border border-white/10 bg-slate-900/40 p-4 hover:bg-white/5">
                <div className="text-base font-medium">{x.t}</div>
                <div className="text-sm text-slate-400">{x.d}</div>
              </a>
            ))}
          </div>
        </section>

        {/* Quick Start */}
        <section id="quickstart" className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Quick Start</h2>

          <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-300">
            <li>Create an account and connect <em>GitHub</em>, <em>Vercel</em>, <em>Supabase</em> (optional), and <em>Stripe</em>.</li>
            <li>Open <Link href="/generate" className="text-sky-300 hover:underline">/generate</Link> and describe your idea and constraints.</li>
            <li>Choose <strong>Copilot</strong> (review gates) or <strong>Autopilot</strong> (ship when green).</li>
            <li>Review the Spec DSL and click <em>Build</em>. A repo, UI, docs, pricing, and analytics are generated.</li>
            <li>Deploy to preview on Vercel. Connect your domain. Run the readiness checklist.</li>
          </ol>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <pre className="overflow-auto rounded-xl border border-white/10 bg-slate-900/70 p-4 text-sm">
{`# Trigger a build (API)
curl -X POST ${siteUrl}/api/v1/builds \\
  -H "Authorization: Bearer <API_KEY>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "intent": "Inbox AI summarizer for support teams",
    "mode": "copilot",
    "constraints": {"stack":"nextjs","db":"supabase","billing":"stripe"}
  }'`}
            </pre>
            <pre className="overflow-auto rounded-xl border border-white/10 bg-slate-900/70 p-4 text-sm">
{`// Minimal TypeScript client
class BAS {
  constructor(private key: string, private base = '${siteUrl}/api/v1') {}
  headers() { return { 'Authorization': 'Bearer ' + this.key, 'Content-Type': 'application/json' } }
  async createBuild(payload: any) {
    const r = await fetch(this.base + '/builds', { method: 'POST', headers: this.headers(), body: JSON.stringify(payload) })
    if (!r.ok) throw await r.json(); return r.json()
  }
  async getBuild(id: string) {
    const r = await fetch(this.base + '/builds/' + id, { headers: this.headers() })
    if (!r.ok) throw await r.json(); return r.json()
  }
}`}
            </pre>
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-slate-900/40 p-4 text-sm text-slate-300">
            <strong>Environment variables:</strong> The repo generator creates a <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs">.env.example</code>.
            Provide keys for GitHub (actions), Vercel, Supabase (optional), Stripe, and your analytics choice (Plausible/PostHog).
          </div>
        </section>

        {/* Core Concepts */}
        <section id="concepts" className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Core Concepts</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: 'Spec DSL',
                d: 'A structured PRD that defines scope, ICP, UX outline, data model, pricing, and integrations. Keeps PM/Design/Eng aligned.',
              },
              {
                t: 'Build Loop',
                d: 'Intent → Spec → Repo → UI/Copy → Docs → Pricing → Deploy → Experiments → Learn. Continuous improvement by signals.',
              },
              {
                t: 'Build Score',
                d: 'A composite score from gates (lint/types, tests, security, performance, licenses). Threshold controls Autopilot shipping.',
              },
              {
                t: 'Modes',
                d: 'Copilot pauses at gates for approvals. Autopilot ships automatically when all gates pass and score meets threshold.',
              },
              {
                t: 'Quality Gates',
                d: 'Static analysis, unit/smoke tests, dependency & license checks, Lighthouse budgets, security scans.',
              },
              {
                t: 'Starter Kits',
                d: 'SaaS, API, and Content templates with routes, components, docs, analytics, and pricing wiring.',
              },
            ].map((c) => (
              <div key={c.t} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="text-base font-medium">{c.t}</div>
                <p className="mt-1 text-sm text-slate-400">{c.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-white/10 bg-slate-900/50 p-4">
            <img src="/media/screens/docs-concepts.png" alt="Spec DSL and Build Score overview" className="rounded-lg" />
          </div>
        </section>

        {/* API Overview */}
        <section id="api" className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-semibold">API Overview (v1)</h2>
            <Link href="/product/api" className="text-sky-300 hover:underline text-sm">Full API page →</Link>
          </div>
          <p className="mt-2 text-slate-300">
            REST with JSON. Versioned under <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs">/api/v1</code>. Auth via Bearer API keys.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { m: 'POST', p: '/api/v1/ideas', d: 'Generate idea candidates from seed + constraints.' },
              { m: 'POST', p: '/api/v1/builds', d: 'Create a new build from intent/spec.' },
              { m: 'GET',  p: '/api/v1/builds/:id', d: 'Fetch build status, gates, Build Score, preview URL.' },
              { m: 'POST', p: '/api/v1/experiments', d: 'Start an A/B test (hero, pricing, onboarding).' },
              { m: 'GET',  p: '/api/v1/events', d: 'Telemetry: experiments, conversions, funnels.' },
              { m: 'POST', p: '/api/v1/marketplace/listings', d: 'Create a Marketplace listing.' },
            ].map((e, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="text-xs uppercase tracking-wide text-slate-400">{e.m}</div>
                <div className="text-sm font-medium">{e.p}</div>
                <p className="mt-1 text-sm text-slate-400">{e.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <pre className="overflow-auto rounded-xl border border-white/10 bg-slate-900/70 p-4 text-sm">
{`# Auth: create an API key in Settings → API, then:
curl -H "Authorization: Bearer $BAS_API_KEY" ${siteUrl}/api/v1/builds/BUILDX`}
            </pre>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4 text-sm text-slate-300">
              <strong>Rate limits:</strong> 60 req/min per key (default). Response headers include
              <code className="rounded bg-slate-800 px-1 py-0.5 text-xs ml-1">X-RateLimit-*</code>. Contact us for higher limits.
            </div>
          </div>
        </section>

        {/* Webhooks */}
        <section id="webhooks" className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Webhooks</h2>
          <p className="mt-2 text-slate-300">Receive signed events to orchestrate your own pipelines and alerts.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: 'Build lifecycle', e: ['build.started', 'build.completed', 'build.failed'] },
              { t: 'Experiments', e: ['experiment.started', 'experiment.won'] },
              { t: 'Marketplace', e: ['marketplace.listed', 'marketplace.offer', 'marketplace.transferred'] },
            ].map((x, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="text-base font-medium">{x.t}</div>
                <div className="mt-1 text-xs text-slate-400">{x.e.join(' · ')}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <pre className="overflow-auto rounded-xl border border-white/10 bg-slate-900/70 p-4 text-sm">
{`POST /your-endpoint
Headers:
  X-BAS-Signature: <hex_hmac_sha256>
  X-BAS-Timestamp: <unix>

Body:
{
  "type": "build.completed",
  "build_id": "BUILDX",
  "score": 86,
  "checks": {"lint": "pass","tests":"pass","security":"pass","lighthouse":"pass","license":"pass"},
  "preview_url": "https://project-foo.vercel.app"
}`}
            </pre>
            <pre className="overflow-auto rounded-xl border border-white/10 bg-slate-900/70 p-4 text-sm">
{`// Verify (Node/TS)
import crypto from 'crypto'
export function verify(sig: string, body: string, secret: string) {
  const mac = crypto.createHmac('sha256', secret).update(body, 'utf8').digest('hex')
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(mac))
}`}
            </pre>
          </div>
          <div className="mt-4 rounded-xl border border-white/10 bg-slate-900/40 p-4 text-sm text-slate-300">
            <strong>Replay protection:</strong> Reject events older than 5 minutes using <code className="rounded bg-slate-800 px-1 py-0.5 text-xs">X-BAS-Timestamp</code>.
          </div>
        </section>

        {/* SDKs & CLI */}
        <section id="sdks" className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">SDKs & CLI</h2>
          <p className="mt-2 text-slate-300">
            Use raw REST today; official SDKs ship after GA. Community PRs welcome.
          </p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
              <div className="text-lg font-semibold">JavaScript/TypeScript (planned)</div>
              <pre className="mt-3 overflow-auto rounded-xl border border-white/10 bg-slate-950/60 p-4 text-sm">
{`import { BAS } from '@buildaistartups/sdk'
const bas = new BAS(process.env.BAS_API_KEY!)
const { id } = await bas.createBuild({ intent: 'Invoice parser', mode: 'autopilot' })
console.log('Build started:', id)`}
              </pre>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
              <div className="text-lg font-semibold">CLI (planned)</div>
              <pre className="mt-3 overflow-auto rounded-xl border border-white/10 bg-slate-950/60 p-4 text-sm">
{`npx bas init
npx bas build --intent "Docs generator for APIs" --mode copilot
npx bas status --id BUILDX`}
              </pre>
            </div>
          </div>
        </section>

        {/* Security & Compliance */}
        <section id="security" className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Security & Compliance</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
              <div className="text-base font-medium">Authentication & secrets</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Per-org API keys with scopes and rate limits</li>
                <li>User-owned tokens for GitHub, Vercel, Supabase, Stripe</li>
                <li>Short-lived tokens and secret redaction in logs</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
              <div className="text-base font-medium">Quality gates</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Lint/types, tests, security scans, performance budgets</li>
                <li>Dependency & license checks in PR</li>
                <li>Build Score threshold controls Autopilot shipping</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            Need a DPA, GDPR/FERPA supplement, or SSO/SAML? Contact <Link href="/contact" className="text-sky-300 hover:underline">partnerships</Link>.
          </p>
        </section>

        {/* Resources */}
        <section id="resources" className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Resources</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: '/product/builder', t: 'Builder', d: 'Spec → repo → UI → pricing → deploy' },
              { href: '/product/ecosystem', t: 'Ecosystem', d: 'Cross-promotions & shared growth' },
              { href: '/product/marketplace', t: 'Marketplace', d: 'List, license, or transfer' },
              { href: '/product/api', t: 'API', d: 'Automation & webhooks' },
            ].map((x) => (
              <Link key={x.href} href={x.href} className="rounded-xl border border-white/10 bg-slate-900/40 p-4 hover:bg-white/5">
                <div className="text-base font-medium">{x.t}</div>
                <div className="text-sm text-slate-400">{x.d}</div>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
            <Link href="/changelog" className="text-sky-300 hover:underline">Changelog →</Link>
            <span className="text-slate-600">•</span>
            <Link href="/contact" className="text-sky-300 hover:underline">Contact support →</Link>
          </div>
        </section>

        {/* FAQ (mirrors JSON-LD) */}
        <section id="faq" className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Docs FAQ</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-base font-medium">Do I need the API?</h3>
              <p className="mt-1 text-sm text-slate-300">No. It’s optional for automation and integrations.</p>
            </div>
            <div>
              <h3 className="text-base font-medium">Who owns the code and revenue?</h3>
              <p className="mt-1 text-sm text-slate-300">You do. Your GitHub, your infra, your Stripe.</p>
            </div>
            <div>
              <h3 className="text-base font-medium">How are builds validated?</h3>
              <p className="mt-1 text-sm text-slate-300">Through gates and a Build Score. Failures pause Autopilot.</p>
            </div>
            <div>
              <h3 className="text-base font-medium">What are the rate limits?</h3>
              <p className="mt-1 text-sm text-slate-300">60 req/min per key by default. Contact us for higher tiers.</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/10 bg-slate-900/40 py-14">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-semibold">Build your first product today</h2>
            <p className="mt-2 text-slate-300">
              Use the Builder to generate your repo, deploy to preview, and talk to real users.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link
                href="/generate"
                className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400"
              >
                Generate now
              </Link>
              <Link
                href="/product/api"
                className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5"
              >
                Explore API
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
