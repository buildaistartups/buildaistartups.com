// app/(default)/product/api/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const siteUrl = 'https://www.buildaistartups.com'
const ogImage = '/brand/og-default.png'

export const metadata: Metadata = {
  title: 'API — Programmatic access to HyperNova | Build AI Startups',
  description:
    'Trigger builds, poll status, run experiments, fetch metrics, manage listings, and receive webhooks. Secure, scoped, and designed for automation.',
  alternates: { canonical: `${siteUrl}/product/api` },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/product/api`,
    title: 'API — Programmatic access to HyperNova | Build AI Startups',
    description:
      'Trigger builds, poll status, run experiments, fetch metrics, manage listings, and receive webhooks.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Build AI Startups — API' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API — Programmatic access to HyperNova | Build AI Startups',
    description:
      'Automation-first API: builds, experiments, metrics, marketplace, and webhooks.',
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

const webApiJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebAPI',
  name: 'Build AI Startups API',
  description:
    'Programmatic access to the HyperNova engine for builds, experiments, metrics, and marketplace operations.',
  documentation: `${siteUrl}/product/api`,
  provider: { '@type': 'Organization', name: 'Build AI Startups', url: siteUrl },
  endpointUrl: `${siteUrl}/api/v1`,
  termsOfService: `${siteUrl}/docs#terms`,
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Product', item: `${siteUrl}/` },
    { '@type': 'ListItem', position: 3, name: 'API', item: `${siteUrl}/product/api` },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is the API required to use the product?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The website covers most use cases. The API is optional and exists for automation, integrations, and cohorts.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is the API secured?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Per-organization API keys with scopes and rate limits. Webhooks are HMAC-SHA256 signed and include replay protection.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there versioning?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Endpoints are namespaced by major version, e.g., /api/v1. Deprecations are announced in the changelog.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the rate limits?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Default 60 requests/minute per API key. Higher limits are available on paid plans.',
      },
    },
  ],
}

export default function ApiPage() {
  return (
    <>
      {/* Structured data */}
      <Script id="ld-org" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <Script id="ld-webapi" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApiJsonLd) }} />
      <Script id="ld-bc" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="bg-slate-950 text-slate-200">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-20 sm:pt-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-widest text-slate-400">Product</p>
              <h1 className="mt-2 text-4xl font-bold sm:text-5xl">API — Programmatic access to HyperNova</h1>
              <p className="mt-4 text-lg text-slate-300">
                Automate builds, run experiments, fetch metrics, manage marketplace listings, and subscribe to webhooks.
                Secure, scoped, and designed for teams and partners.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/signin"
                  className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400"
                >
                  Get API key
                </Link>
                <Link
                  href="#quickstart"
                  className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5"
                >
                  Quick start
                </Link>
              </div>
              <p className="mt-3 text-sm text-slate-400">Versioned · Scoped · HMAC webhooks · Audit logs</p>
            </div>
            <div className="relative">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50">
                <img src="/media/screens/api-console.png" alt="API console and logs" className="h-full w-full object-cover" />
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">Minimal surface · Predictable contracts · Helpful errors</p>
            </div>
          </div>
        </section>

        {/* Quick start */}
        <section id="quickstart" className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Quick start</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-300">
            <li>Sign in and create an API key in <em>Settings → API</em>.</li>
            <li>Trigger a build with <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs">POST /api/v1/builds</code>.</li>
            <li>Poll build status with <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs">GET /api/v1/builds/:id</code>.</li>
            <li>Subscribe to webhooks like <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs">build.completed</code>.</li>
          </ol>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <pre className="overflow-auto rounded-xl border border-white/10 bg-slate-900/70 p-4 text-sm">
{`# 1) Create a build
curl -X POST ${siteUrl}/api/v1/builds \\
  -H "Authorization: Bearer <API_KEY>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "intent": "Analytics micro-SaaS for YouTube creators",
    "mode": "autopilot",
    "constraints": {"stack":"nextjs","billing":"stripe","db":"supabase"}
  }'

# 2) Check status
curl -H "Authorization: Bearer <API_KEY>" \\
  ${siteUrl}/api/v1/builds/BUILDX

# 3) Example webhook (HMAC-SHA256 signed)
{
  "type": "build.completed",
  "build_id": "BUILDX",
  "score": 86,
  "checks": {"lint": "pass","tests":"pass","security":"pass","lighthouse":"pass","license":"pass"},
  "preview_url": "https://project-foo.vercel.app"
}`}
            </pre>

            <pre className="overflow-auto rounded-xl border border-white/10 bg-slate-900/70 p-4 text-sm">
{`// Minimal TypeScript client
export class BAS {
  constructor(private key: string, private base = '${siteUrl}/api/v1') {}
  private headers() { return { 'Authorization': 'Bearer ' + this.key, 'Content-Type': 'application/json' } }
  async createBuild(payload: any) {
    const res = await fetch(this.base + '/builds', { method: 'POST', headers: this.headers(), body: JSON.stringify(payload) })
    if (!res.ok) throw await res.json()
    return res.json()
  }
  async getBuild(id: string) {
    const res = await fetch(this.base + '/builds/' + id, { headers: this.headers() })
    if (!res.ok) throw await res.json()
    return res.json()
  }
}`}</pre>
          </div>
        </section>

        {/* Core endpoints */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Endpoints (v1)</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { m: 'POST', p: '/api/v1/ideas', d: 'Generate idea candidates from seed + constraints.' },
              { m: 'POST', p: '/api/v1/builds', d: 'Create a new build from intent/spec.' },
              { m: 'GET',  p: '/api/v1/builds/:id', d: 'Fetch build status, gates, and Build Score.' },
              { m: 'POST', p: '/api/v1/experiments', d: 'Start an A/B test (hero, pricing, onboarding).' },
              { m: 'GET',  p: '/api/v1/events', d: 'Telemetry: experiments, conversions, funnels.' },
              { m: 'POST', p: '/api/v1/marketplace/listings', d: 'Create a Marketplace listing.' },
              { m: 'PATCH',p: '/api/v1/marketplace/listings/:id', d: 'Update price/terms/state.' },
              { m: 'POST', p: '/api/v1/webhooks/test', d: 'Send a signed test webhook to your endpoint.' },
              { m: 'GET',  p: '/api/v1/meta', d: 'Plans, limits, feature flags for your org.' },
            ].map((e, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="text-xs uppercase tracking-wide text-slate-400">{e.m}</div>
                <div className="text-sm font-medium">{e.p}</div>
                <p className="mt-1 text-sm text-slate-400">{e.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-slate-400">See the Docs for complete schemas and pagination details.</p>
        </section>

        {/* Auth & security */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-start gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">Authentication & security</h3>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li><strong>API keys per org</strong> with <em>scopes</em> (e.g., <code>build:write</code>, <code>metrics:read</code>).</li>
                <li><strong>Rate limits</strong>: 60 req/min default; higher on paid plans.</li>
                <li><strong>Audit logs</strong> for every API call (who, when, what).</li>
                <li><strong>IP allowlists</strong> (optional) and secret redaction.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Webhooks</h3>
              <p className="mt-2 text-slate-300">Receive signed events and orchestrate your own pipelines.</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li><code>build.started</code>, <code>build.completed</code>, <code>build.failed</code></li>
                <li><code>experiment.started</code>, <code>experiment.won</code></li>
                <li><code>marketplace.listed</code>, <code>marketplace.offer</code>, <code>marketplace.transferred</code></li>
              </ul>
              <pre className="mt-4 overflow-auto rounded-xl border border-white/10 bg-slate-900/70 p-4 text-xs">
{`// Verify signature (Node/TS example)
import crypto from 'crypto'
export function verify(signature: string, body: string, secret: string) {
  const hmac = crypto.createHmac('sha256', secret).update(body, 'utf8').digest('hex')
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(hmac))
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* SDKs & tooling */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">SDKs & tooling</h2>
          <p className="mt-2 text-slate-300">Use the REST API directly or install the lightweight SDK.</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
              <div className="text-lg font-semibold">JavaScript/TypeScript</div>
              <pre className="mt-3 overflow-auto rounded-xl border border-white/10 bg-slate-950/60 p-4 text-sm">
{`import { BAS } from '@buildaistartups/sdk'  // (coming soon)
const bas = new BAS(process.env.BAS_API_KEY!)
const build = await bas.createBuild({ intent: 'Form SaaS for creators', mode: 'copilot' })
console.log(build.id)`}
              </pre>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
              <div className="text-lg font-semibold">cURL</div>
              <pre className="mt-3 overflow-auto rounded-xl border border-white/10 bg-slate-950/60 p-4 text-sm">
{`curl -H "Authorization: Bearer $BAS_API_KEY" ${siteUrl}/api/v1/events?limit=100&since=7d`}
              </pre>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-400">More SDKs planned after GA; open to community contributions.</p>
        </section>

        {/* Rate limits & errors */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid items-start gap-10 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
              <h3 className="text-xl font-semibold">Rate limits</h3>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Default: 60 req/min per API key</li>
                <li>Burst buckets for webhook receivers</li>
                <li>Headers: <code>X-RateLimit-Limit</code>, <code>X-RateLimit-Remaining</code>, <code>X-RateLimit-Reset</code></li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
              <h3 className="text-xl font-semibold">Errors</h3>
              <p className="mt-2 text-slate-300">Consistent JSON error shapes with trace IDs.</p>
              <pre className="mt-3 overflow-auto rounded-xl border border-white/10 bg-slate-950/60 p-4 text-sm">
{`{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Too many requests. See X-RateLimit-Reset.",
    "trace_id": "req_abc123"
  }
}`}
              </pre>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-400">
            Breaking changes are announced in the <Link href="/changelog" className="text-sky-300 hover:underline">Changelog</Link>.
          </p>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">API FAQ</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-base font-medium">Do I need the API to use Build AI Startups?</h3>
              <p className="mt-1 text-sm text-slate-300">
                No. The UI covers 90% of workflows. The API is for automation, integrations, and partners.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">Where do I create API keys?</h3>
              <p className="mt-1 text-sm text-slate-300">In your dashboard: <em>Settings → API</em>.</p>
            </div>
            <div>
              <h3 className="text-base font-medium">How are webhooks secured?</h3>
              <p className="mt-1 text-sm text-slate-300">
                HMAC-SHA256 signatures with replay protection via timestamp windows. Verify on receipt.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">Is data shared with other apps?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Never. Cross-app Ecosystem features use aggregate performance only—no PII leaves your project.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/10 bg-slate-900/40 py-14">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-semibold">Automate your build loop</h2>
            <p className="mt-2 text-slate-300">
              Schedule builds, wire your CI, and connect your stack with webhooks and a minimal, predictable API.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link
                href="/signin"
                className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400"
              >
                Get API key
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5"
              >
                Read the docs
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
