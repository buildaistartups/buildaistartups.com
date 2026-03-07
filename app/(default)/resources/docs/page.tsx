import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const siteUrl = 'https://www.buildaistartups.com'
const docsUrl = `${siteUrl}/resources/docs`
const ogImage = '/og/resources-docs.png'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Docs — Build, ship, and grow with Build AI Startups | Build AI Startups',
  description:
    'Getting started, core concepts, API reference, webhooks, SDKs, security, and FAQs for Build AI Startups. From intent to live micro-SaaS.',
  alternates: { canonical: docsUrl },
  openGraph: {
    type: 'website',
    url: docsUrl,
    title: 'Docs — Build, ship, and grow with Build AI Startups | Build AI Startups',
    description:
      'From intent to live micro-SaaS: Quick start, Concepts, API, Webhooks, SDKs, Security, FAQ.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Build AI Startups — Docs' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Docs — Build, ship, and grow with Build AI Startups | Build AI Startups',
    description: 'Quick start, Concepts, API, Webhooks, SDKs, and Security for Build AI Startups.',
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
  url: docsUrl,
  description:
    'Documentation hub for Build AI Startups: getting started, concepts, API, webhooks, SDKs, security, FAQ.',
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Resources', item: `${siteUrl}/resources` },
    { '@type': 'ListItem', position: 3, name: 'Docs', item: docsUrl },
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
              <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Docs — Build, ship, and grow with Build AI Startups</h1>
              <p className="mt-4 text-lg text-slate-300">
                Everything you need to go from a one-sentence intent to a live micro-SaaS. Start with the Quick Start,
                then explore Concepts, API, Webhooks, and Security.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#quickstart" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400 transition-colors">
                  Quick Start
                </a>
                <a href="#api" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5 transition-colors">
                  API overview
                </a>
              </div>
              <p className="mt-3 text-sm text-slate-400">Spec DSL · Build Score · Gates · Webhooks · SDKs</p>
            </div>
            <div className="relative">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50 p-6">
                <img 
                  src="/images/resources/docs/hero.svg" 
                  alt="Documentation interface overview showing organized sections and navigation" 
                  className="h-full w-full object-contain"
                  loading="eager"
                />
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">Start here → Quick Start · Concepts · API</p>
            </div>
          </div>

          {/* Search Interface */}
          <div className="mt-8 mb-6">
            <img src="/images/resources/docs/search-interface.svg" alt="Documentation search interface" className="w-full h-16 object-contain" />
          </div>

          {/* On-page nav */}
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: '#quickstart', t: 'Quick Start', d: 'First build in minutes', icon: '⚡︎' },
              { href: '#concepts', t: 'Core Concepts', d: 'Spec DSL, Build Score, modes', icon: '◉︎' },
              { href: '#api', t: 'API Reference', d: 'Endpoints and auth', icon: '⚙︎' },
              { href: '#webhooks', t: 'Webhooks', d: 'Events and signatures', icon: '⧈︎' },
            ].map((x) => (
              <a key={x.href} href={x.href} className="group rounded-xl border border-white/10 bg-slate-900/40 p-4 hover:bg-white/5 hover:border-violet-500/30 transition-all">
                <div className="text-2xl mb-2 text-blue-400">{x.icon}</div>
                <div className="text-base font-medium group-hover:text-violet-300 transition-colors">{x.t}</div>
                <div className="text-sm text-slate-400">{x.d}</div>
              </a>
            ))}
          </div>
        </section>

        {/* Navigation Tree */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <img src="/images/resources/docs/navigation-tree.svg" alt="Documentation navigation structure" className="w-full h-32 object-contain" />
        </section>

        {/* Quick Start */}
        <section id="quickstart" className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-semibold">Quick Start</h2>
            <div className="inline-flex items-center rounded-full bg-violet-500/20 px-3 py-1 text-xs font-medium text-violet-300">
              5 minutes
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <ol className="space-y-4">
                {[
                  { step: 1, title: 'Connect your accounts', desc: 'GitHub, Vercel, Supabase (optional), and Stripe' },
                  { step: 2, title: 'Describe your idea', desc: 'Open /generate and describe your constraints' },
                  { step: 3, title: 'Choose your mode', desc: 'Copilot (review gates) or Autopilot (ship when green)' },
                  { step: 4, title: 'Review and build', desc: 'Check the Spec DSL and click Build' },
                  { step: 5, title: 'Deploy and launch', desc: 'Preview on Vercel, connect domain, run checklist' },
                ].map((item) => (
                  <li key={item.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center text-sm font-medium text-white">
                      {item.step}
                    </div>
                    <div>
                      <div className="font-medium text-slate-200">{item.title}</div>
                      <div className="text-sm text-slate-400">{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
              <img 
                src="/images/resources/docs/quick-start.svg" 
                alt="Quick start workflow visualization" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <div className="text-sm font-medium text-slate-300 mb-3">API Example</div>
              <pre className="overflow-auto text-xs text-slate-300">
{`# Trigger a build (API)
curl -X POST ${siteUrl}/api/v1/builds \\
  -H "Authorization: Bearer <API_KEY>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "intent": "Inbox AI summarizer for support teams",
    "mode": "copilot",
    "constraints": {
      "stack": "nextjs",
      "db": "supabase",
      "billing": "stripe"
    }
  }'`}
              </pre>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <div className="text-sm font-medium text-slate-300 mb-3">TypeScript Client</div>
              <pre className="overflow-auto text-xs text-slate-300">
{`// Minimal TypeScript client
class BAS {
  constructor(private key: string) {}
  
  async createBuild(payload: any) {
    const response = await fetch('/api/v1/builds', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    return response.json()
  }
}`}
              </pre>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-violet-500/30 bg-violet-500/10 p-4">
            <div className="flex items-start gap-3">
              <div className="text-blue-400 text-xl">◆︎</div>
              <div>
                <div className="font-medium text-violet-300">Environment Setup</div>
                <div className="text-sm text-slate-300 mt-1">
                  The repo generator creates a <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs">.env.example</code>.
                  Provide keys for GitHub (actions), Vercel, Supabase (optional), Stripe, and your analytics choice.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Concepts */}
        <section id="concepts" className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6">Core Concepts</h2>
          
          <div className="mb-8">
            <img src="/images/resources/docs/concepts-overview.svg" alt="Core concepts overview diagram" className="w-full h-40 object-contain" />
          </div>
          
          <div className="grid gap-6 lg:grid-cols-2 mb-8">
            <div className="space-y-6">
              {[
                {
                  t: 'Spec DSL',
                  d: 'A structured PRD that defines scope, ICP, UX outline, data model, pricing, and integrations. Keeps PM/Design/Eng aligned.',
                  icon: '▣︎'
                },
                {
                  t: 'Build Loop',
                  d: 'Intent → Spec → Repo → UI/Copy → Docs → Pricing → Deploy → Experiments → Learn. Continuous improvement by signals.',
                  icon: '↻︎'
                },
                {
                  t: 'Build Score',
                  d: 'A composite score from gates (lint/types, tests, security, performance, licenses). Threshold controls Autopilot shipping.',
                  icon: '▤︎'
                },
              ].map((c) => (
                <div key={c.t} className="rounded-xl border border-white/10 bg-slate-900/40 p-5 hover:border-violet-500/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl text-blue-400">{c.icon}</div>
                    <div>
                      <div className="text-base font-medium">{c.t}</div>
                      <p className="mt-1 text-sm text-slate-400">{c.d}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-6">
              {[
                {
                  t: 'Modes',
                  d: 'Copilot pauses at gates for approvals. Autopilot ships automatically when all gates pass and score meets threshold.',
                  icon: '◎︎'
                },
                {
                  t: 'Quality Gates',
                  d: 'Static analysis, unit/smoke tests, dependency & license checks, Lighthouse budgets, security scans.',
                  icon: '⬟︎'
                },
                {
                  t: 'Starter Kits',
                  d: 'SaaS, API, and Content templates with routes, components, docs, analytics, and pricing wiring.',
                  icon: '▲︎'
                },
              ].map((c) => (
                <div key={c.t} className="rounded-xl border border-white/10 bg-slate-900/40 p-5 hover:border-violet-500/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl text-blue-400">{c.icon}</div>
                    <div>
                      <div className="text-base font-medium">{c.t}</div>
                      <p className="mt-1 text-sm text-slate-400">{c.d}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* API Overview */}
        <section id="api" className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold">API Overview (v1)</h2>
              <p className="mt-2 text-slate-300">
                REST with JSON. Versioned under <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs">/api/v1</code>. Auth via Bearer API keys.
              </p>
            </div>
            <Link href="/product/api" className="text-violet-400 hover:text-violet-300 text-sm transition-colors">
              Full API page →
            </Link>
          </div>

          <div className="mb-8">
            <img src="/images/resources/docs/api-docs.svg" alt="API documentation overview" className="w-full h-32 object-contain" />
          </div>

          <div className="grid gap-6 lg:grid-cols-2 mb-8">
            <div className="space-y-4">
              {[
                { m: 'POST', p: '/api/v1/ideas', d: 'Generate idea candidates from seed + constraints.', color: 'bg-green-500' },
                { m: 'POST', p: '/api/v1/builds', d: 'Create a new build from intent/spec.', color: 'bg-green-500' },
                { m: 'GET',  p: '/api/v1/builds/:id', d: 'Fetch build status, gates, Build Score, preview URL.', color: 'bg-blue-500' },
              ].map((e, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4 hover:border-violet-500/30 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`text-xs font-bold px-2 py-1 rounded ${e.color} text-white`}>{e.m}</div>
                    <div className="text-sm font-mono text-slate-300">{e.p}</div>
                  </div>
                  <p className="text-sm text-slate-400">{e.d}</p>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {[
                { m: 'POST', p: '/api/v1/experiments', d: 'Start an A/B test (hero, pricing, onboarding).', color: 'bg-green-500' },
                { m: 'GET',  p: '/api/v1/events', d: 'Telemetry: experiments, conversions, funnels.', color: 'bg-blue-500' },
                { m: 'POST', p: '/api/v1/marketplace/listings', d: 'Create a Marketplace listing.', color: 'bg-green-500' },
              ].map((e, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4 hover:border-violet-500/30 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`text-xs font-bold px-2 py-1 rounded ${e.color} text-white`}>{e.m}</div>
                    <div className="text-sm font-mono text-slate-300">{e.p}</div>
                  </div>
                  <p className="text-sm text-slate-400">{e.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <div className="text-sm font-medium text-slate-300 mb-3">Authentication</div>
              <pre className="overflow-auto text-xs text-slate-300">
{`# Create API key in Settings → API, then:
curl -H "Authorization: Bearer $BAS_API_KEY" \\
     ${siteUrl}/api/v1/builds/BUILDX`}
              </pre>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <div className="text-sm font-medium text-slate-300 mb-3">Rate Limits</div>
              <div className="text-sm text-slate-300">
                <strong>Default:</strong> 60 req/min per key<br/>
                <strong>Headers:</strong> <code className="text-xs bg-slate-800 px-1 py-0.5 rounded">X-RateLimit-*</code><br/>
                <strong>Higher limits:</strong> Available on paid plans
              </div>
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <div className="mb-6">
            <img src="/images/resources/docs/code-examples.svg" alt="Code examples and syntax highlighting" className="w-full h-32 object-contain" />
          </div>
        </section>

        {/* Webhooks */}
        <section id="webhooks" className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6">Webhooks</h2>
          <p className="text-slate-300 mb-6">Receive signed events to orchestrate your own pipelines and alerts.</p>
          
          <div className="grid gap-6 lg:grid-cols-2 mb-8">
            <div className="space-y-4">
              {[
                { t: 'Build lifecycle', e: ['build.started', 'build.completed', 'build.failed'], icon: '⚒︎' },
                { t: 'Experiments', e: ['experiment.started', 'experiment.won'], icon: '◈︎' },
                { t: 'Marketplace', e: ['marketplace.listed', 'marketplace.offer', 'marketplace.transferred'], icon: '⬢︎' },
              ].map((x, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4 hover:border-violet-500/30 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl text-blue-400">{x.icon}</span>
                    <div className="text-base font-medium">{x.t}</div>
                  </div>
                  <div className="text-xs text-slate-400">{x.e.join(' · ')}</div>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
              <img 
                src="/images/resources/docs/integration-guide.svg" 
                alt="Webhook event flow diagram" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <div className="text-sm font-medium text-slate-300 mb-3">Webhook Payload</div>
              <pre className="overflow-auto text-xs text-slate-300">
{`POST /your-endpoint
Headers:
  X-BAS-Signature: <hex_hmac_sha256>
  X-BAS-Timestamp: <unix>

Body:
{
  "type": "build.completed",
  "build_id": "BUILDX",
  "score": 86,
  "checks": {
    "lint": "pass",
    "tests": "pass",
    "security": "pass",
    "lighthouse": "pass",
    "license": "pass"
  },
  "preview_url": "https://project-foo.vercel.app"
}`}
              </pre>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <div className="text-sm font-medium text-slate-300 mb-3">Signature Verification</div>
              <pre className="overflow-auto text-xs text-slate-300">
{`// Verify signature (Node.js/TypeScript)
import crypto from 'crypto'

export function verifySignature(
  signature: string, 
  body: string, 
  secret: string
) {
  const mac = crypto
    .createHmac('sha256', secret)
    .update(body, 'utf8')
    .digest('hex')
  
  return crypto.timingSafeEqual(
    Buffer.from(signature), 
    Buffer.from(mac)
  )
}`}
              </pre>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-orange-500/30 bg-orange-500/10 p-4">
            <div className="flex items-start gap-3">
              <div className="text-orange-400 text-xl">⚠︎</div>
              <div>
                <div className="font-medium text-orange-300">Replay Protection</div>
                <div className="text-sm text-slate-300 mt-1">
                  Reject events older than 5 minutes using <code className="rounded bg-slate-800 px-1 py-0.5 text-xs">X-BAS-Timestamp</code> header.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SDKs & CLI */}
        <section id="sdks" className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6">SDKs & CLI</h2>
          <p className="text-slate-300 mb-6">
            Use raw REST today; official SDKs ship after GA. Community PRs welcome.
          </p>
          
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl text-blue-400">▣︎</div>
                <div>
                  <div className="text-lg font-semibold">JavaScript/TypeScript</div>
                  <div className="text-sm text-slate-400">Coming soon</div>
                </div>
              </div>
              <pre className="overflow-auto rounded-xl border border-white/10 bg-slate-950/60 p-4 text-sm">
{`import { BAS } from '@buildaistartups/sdk'

const bas = new BAS(process.env.BAS_API_KEY!)

const { id } = await bas.createBuild({
  intent: 'Invoice parser',
  mode: 'autopilot'
})

console.log('Build started:', id)`}
              </pre>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl text-blue-400">⚡︎</div>
                <div>
                  <div className="text-lg font-semibold">CLI</div>
                  <div className="text-sm text-slate-400">Coming soon</div>
                </div>
              </div>
              <pre className="overflow-auto rounded-xl border border-white/10 bg-slate-950/60 p-4 text-sm">
{`npx bas init

npx bas build \\
  --intent "Docs generator for APIs" \\
  --mode copilot

npx bas status --id BUILDX`}
              </pre>
            </div>
          </div>
        </section>

        {/* Security & Compliance */}
        <section id="security" className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6">Security & Compliance</h2>
          
          <div className="grid gap-6 lg:grid-cols-2 mb-8">
            <div className="space-y-6">
              <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-xl text-blue-400">🔒︎</div>
                  <div className="text-base font-medium">Authentication & secrets</div>
                </div>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400 mt-1">•</span>
                    Per-org API keys with scopes and rate limits
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400 mt-1">•</span>
                    User-owned tokens for GitHub, Vercel, Supabase, Stripe
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400 mt-1">•</span>
                    Short-lived tokens and secret redaction in logs
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-xl text-blue-400">⬟︎</div>
                  <div className="text-base font-medium">Quality gates</div>
                </div>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400 mt-1">•</span>
                    Lint/types, tests, security scans, performance budgets
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400 mt-1">•</span>
                    Dependency & license checks in PR
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400 mt-1">•</span>
                    Build Score threshold controls Autopilot shipping
                  </li>
                </ul>
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
              <img 
                src="/images/resources/docs/troubleshooting.svg" 
                alt="Security and compliance illustration" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>

          <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
            <div className="flex items-start gap-3">
              <div className="text-blue-400 text-xl">▣︎</div>
              <div>
                <div className="font-medium text-blue-300">Enterprise Requirements</div>
                <div className="text-sm text-slate-300 mt-1">
                  Need a DPA, GDPR/FERPA supplement, or SSO/SAML? Contact{' '}
                  <Link href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">
                    partnerships
                  </Link>
                  .
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Build Score Deep Dive */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6">Build Score Deep Dive</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <p className="text-slate-300">
                The Build Score is a composite metric that evaluates code quality, security, performance, and compliance.
                It determines whether Autopilot can ship changes automatically.
              </p>
              <div className="space-y-3">
                {[
                  { check: 'Lint & Types', weight: '20%', desc: 'ESLint, TypeScript, Prettier' },
                  { check: 'Tests', weight: '25%', desc: 'Unit tests, integration tests, coverage' },
                  { check: 'Security', weight: '25%', desc: 'Dependency scans, SAST, secrets detection' },
                  { check: 'Performance', weight: '20%', desc: 'Lighthouse scores, bundle size' },
                  { check: 'Licenses', weight: '10%', desc: 'License compatibility checks' },
                ].map((item) => (
                  <div key={item.check} className="flex justify-between items-center p-3 rounded-lg border border-white/10 bg-slate-900/40">
                    <div>
                      <div className="font-medium text-slate-200">{item.check}</div>
                      <div className="text-xs text-slate-400">{item.desc}</div>
                    </div>
                    <div className="text-sm font-medium text-violet-400">{item.weight}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
              <img 
                src="/images/resources/docs/concepts-overview.svg" 
                alt="Build Score calculation diagram" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Resources */}
        <section id="resources" className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6">Resources</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: '/product/builder', t: 'Builder', d: 'Spec → repo → UI → pricing → deploy', icon: '⚒︎' },
              { href: '/product/ecosystem', t: 'Ecosystem', d: 'Cross-promotions & shared growth', icon: '◉︎' },
              { href: '/product/marketplace', t: 'Marketplace', d: 'List, license, or transfer', icon: '⬢︎' },
              { href: '/product/api', t: 'API', d: 'Automation & webhooks', icon: '⚡︎' },
            ].map((x) => (
              <Link key={x.href} href={x.href} className="group rounded-xl border border-white/10 bg-slate-900/40 p-4 hover:bg-white/5 hover:border-violet-500/30 transition-all">
                <div className="text-2xl mb-2 text-blue-400">{x.icon}</div>
                <div className="text-base font-medium group-hover:text-violet-300 transition-colors">{x.t}</div>
                <div className="text-sm text-slate-400">{x.d}</div>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
            <Link href="/resources/changelog" className="text-violet-400 hover:text-violet-300 transition-colors">Changelog →</Link>
            <span className="text-slate-600">•</span>
            <Link href="/contact" className="text-violet-400 hover:text-violet-300 transition-colors">Contact support →</Link>
          </div>
        </section>

        {/* FAQ (mirrors JSON-LD) */}
        <section id="faq" className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                q: 'Do I need the API?',
                a: 'No. It\'s optional for automation and integrations.',
                icon: '◐︎'
              },
              {
                q: 'Who owns the code and revenue?',
                a: 'You do. Your GitHub, your infra, your Stripe.',
                icon: '◯︎'
              },
              {
                q: 'How are builds validated?',
                a: 'Through gates and a Build Score. Failures pause Autopilot.',
                icon: '✓︎'
              },
              {
                q: 'What are the rate limits?',
                a: '60 req/min per key by default. Contact us for higher tiers.',
                icon: '◷︎'
              },
            ].map((faq, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-5 hover:border-violet-500/30 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="text-xl text-blue-400">{faq.icon}</div>
                  <div>
                    <h3 className="text-base font-medium text-slate-200">{faq.q}</h3>
                    <p className="mt-1 text-sm text-slate-300">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
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
                className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400 transition-colors"
              >
                Generate now
              </Link>
              <Link
                href="/product/api"
                className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5 transition-colors"
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
