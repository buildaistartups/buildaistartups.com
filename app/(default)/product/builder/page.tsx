// app/(default)/product/builder/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const siteUrl = 'https://www.buildaistartups.com'
const ogImage = '/brand/og-default.png'

export const metadata: Metadata = {
  title: 'Builder — From brief to repo in minutes | Build AI Startups',
  description:
    'HyperNova Builder turns a plain-language intent into a production-ready Next.js app with repo, CI, tests, docs, pricing, and deploy. From idea to live preview—fast.',
  alternates: { canonical: `${siteUrl}/product/builder` },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/product/builder`,
    title: 'Builder — From brief to repo in minutes | Build AI Startups',
    description:
      'HyperNova Builder turns a plain-language intent into a production-ready Next.js app with repo, CI, tests, docs, pricing, and deploy.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Build AI Startups — Builder' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Builder — From brief to repo in minutes | Build AI Startups',
    description:
      'Turn a one-sentence brief into a working app with CI, tests, docs, pricing, and deploy—automatically.',
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

const appJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'HyperNova Builder',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  description:
    'Turn a plain-language intent into a production-ready app with repo, CI, tests, docs, pricing, and deploy.',
  offers: [
    {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      name: 'Starter',
      url: `${siteUrl}/pricing`,
    },
    {
      '@type': 'Offer',
      price: '49',
      priceCurrency: 'USD',
      name: 'Builder',
      url: `${siteUrl}/pricing`,
    },
    {
      '@type': 'Offer',
      price: '149',
      priceCurrency: 'USD',
      name: 'Studio',
      url: `${siteUrl}/pricing`,
    },
  ],
  brand: {
    '@type': 'Brand',
    name: 'Build AI Startups',
  },
  url: `${siteUrl}/product/builder`,
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Product', item: `${siteUrl}/` },
    { '@type': 'ListItem', position: 3, name: 'Builder', item: `${siteUrl}/product/builder` },
  ],
}

export default function BuilderPage() {
  return (
    <>
      {/* Structured data */}
      <Script id="ld-org" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <Script id="ld-app" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <Script id="ld-breadcrumb" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="bg-slate-950 text-slate-200">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-20 sm:pt-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-widest text-slate-400">Product</p>
              <h1 className="mt-2 text-4xl font-bold sm:text-5xl">From brief to repo in minutes</h1>
              <p className="mt-4 text-lg text-slate-300">
                HyperNova Builder turns a plain-language intent into a production-ready app—spec, repo, UI, copy,
                docs, pricing, and deploy. No boilerplate. No waiting.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/generate"
                  className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400"
                >
                  Try the Builder
                </Link>
                <Link href="/pricing" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5">
                  See pricing
                </Link>
              </div>
              <p className="mt-3 text-sm text-slate-400">Autonomy Confidence 86/100 · 23 checks passed</p>
              <p className="mt-2 text-sm text-slate-500">Open-source models · Deploys to Vercel · Stripe payments · GitHub first</p>
            </div>
            <div className="relative">
              {/* Replace with an actual capture of the build flow if you have it */}
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50">
                <video className="h-full w-full" autoPlay muted loop playsInline poster="/media/screens/builder-overview.png">
                  <source src="/media/screens/builder-overview.webm" type="video/webm" />
                  <source src="/media/screens/builder-overview.mp4" type="video/mp4" />
                </video>
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">Intent → Spec → Repo → Live preview</p>
            </div>
          </div>
        </section>

        {/* How it works: 5 steps */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { t: 'Set intent', d: 'Pick a niche or let HyperNova scout pains & trends.' },
              { t: 'Connect', d: 'Link GitHub, Vercel, database, Stripe—no lock-in.' },
              { t: 'Autobuild', d: 'Spec → repo → UI → copy → docs → pricing → landing.' },
              { t: 'Go live', d: 'Preview, domain, analytics, SEO, onboarding wired.' },
              { t: 'Self-improve', d: 'A/B hero, pricing, onboarding—driven by signals.' },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="text-sm uppercase tracking-wide text-slate-400">Step {i + 1}</div>
                <div className="mt-1 text-base font-medium">{item.t}</div>
                <p className="mt-1 text-sm text-slate-400">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Split sections */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">Spec Studio</h3>
              <p className="mt-2 text-slate-300">
                Define your goal, constraints, and audience. HyperNova writes a structured PRD (Spec DSL) covering
                problem, ICP, value props, features, data model, pages, pricing, and success metrics—easy to validate, easy to change.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Diff-able JSON schema, not brittle prose</li>
                <li>Regenerate only the parts that need change</li>
                <li>Perfect for PR review & approvals</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <img src="/media/screens/spec-studio.png" alt="Spec Studio" className="rounded-lg" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="order-2 md:order-1 rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <img src="/media/screens/repo-forge.png" alt="Repo Forge" className="rounded-lg" />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-xl font-semibold">Repo Forge</h3>
              <p className="mt-2 text-slate-300">
                A clean GitHub repo scaffolded with CI, env templates, tests, and sensible defaults. No more boilerplate or
                yak-shaving—start where it matters.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Next.js + TypeScript + Tailwind + shadcn/ui</li>
                <li>Auth, settings, pricing, docs routes pre-wired</li>
                <li>Playwright smoke tests & Vitest unit tests</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">UI Workshop</h3>
              <p className="mt-2 text-slate-300">
                Production-ready components and content blocks, generated to match your audience and positioning. Copy, images,
                FAQs, and pricing tables included.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Brand kit (logo, palette, typography, OG images)</li>
                <li>Landing, docs, FAQs, changelog, and one-pager</li>
                <li>Programmatic SEO pages (topic clusters)</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <img src="/media/screens/ui-workshop.png" alt="UI Workshop" className="rounded-lg" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="order-2 md:order-1 rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <img src="/media/screens/deploy-checks.png" alt="One-click Deploy" className="rounded-lg" />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-xl font-semibold">One-click Deploy</h3>
              <p className="mt-2 text-slate-300">
                Automatic deploys to Vercel with preview links, health checks, analytics wiring, and Stripe test mode. Flip to
                production when you’re ready.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Preview → canary → full; auto-rollback on errors</li>
                <li>Plausible/PostHog events & funnel basics</li>
                <li>Domain & environment handoff scripts included</li>
              </ul>
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">What you get</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'GitHub repo with CI, tests, env templates',
              'Landing, pricing, onboarding flows',
              'Docs: FAQs, changelog, API (if relevant)',
              'Brand kit & social assets',
              'Data model & seed data (if applicable)',
              'Growth pack: SEO pages, emails, social posts',
            ].map((t, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4 text-slate-300">
                {t}
              </div>
            ))}
          </div>
        </section>

        {/* Quality gates / Confidence */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
            <h2 className="text-2xl font-semibold">Predictable builds, production-ready</h2>
            <p className="mt-2 text-slate-300">
              Every build passes strict checks before it ships. Autopilot deploys only when everything is green; otherwise it
              pauses for your review.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {['Lint/Types', 'Unit & Smoke tests', 'Security scan', 'Lighthouse budgets', 'License check'].map((c, i) => (
                <div key={i} className="rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-300">
                  ✓ {c}
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-400">Autonomy Confidence 86/100 (weighted across 23 checks)</p>
          </div>
        </section>

        {/* Modes */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <h2 className="text-2xl font-semibold">Choose your operating mode</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
              <h3 className="text-lg font-semibold">Copilot</h3>
              <p className="mt-2 text-slate-300">
                The pipeline pauses at four gates—Spec, Code PR, Pricing, Deploy—for your review &amp; approval. Perfect for
                teams and first-time users.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
              <h3 className="text-lg font-semibold">Autopilot</h3>
              <p className="mt-2 text-slate-300">
                Ships automatically when the build passes all quality gates and meets the Build Score threshold. Flip it on
                per project.
              </p>
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Integrations</h2>
          <p className="mt-2 text-slate-300">User-owned integrations. Short-lived tokens. No secret sprawl.</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-slate-300">
            {['GitHub', 'Vercel', 'Supabase', 'Stripe', 'Plausible/PostHog'].map((name) => (
              <span key={name} className="rounded-md border border-white/10 bg-slate-900/40 px-3 py-1.5 text-sm">
                {name}
              </span>
            ))}
          </div>
        </section>

        {/* Example: tiny API flow (optional, builds trust even if UI-first) */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Example: one build, programmatically</h2>
          <p className="mt-2 text-slate-300">UI first, but power users can script builds when needed.</p>
          <pre className="mt-4 overflow-auto rounded-xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-200">
{`curl -X POST ${siteUrl}/api/builds \\
  -H "Authorization: Bearer <API_KEY>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "intent": "Analytics micro-SaaS for YouTube creators",
    "mode": "autopilot",
    "constraints": {"stack":"nextjs","billing":"stripe","db":"supabase"}
  }'`}
          </pre>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Builder FAQ</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-base font-medium">Who owns the code?</h3>
              <p className="mt-1 text-sm text-slate-300">You do. Repos are created under your GitHub organization or account.</p>
            </div>
            <div>
              <h3 className="text-base font-medium">What stack is generated?</h3>
              <p className="mt-1 text-sm text-slate-300">Next.js + TypeScript + Tailwind + shadcn/ui, with tests and CI.</p>
            </div>
            <div>
              <h3 className="text-base font-medium">Does it handle billing?</h3>
              <p className="mt-1 text-sm text-slate-300">Yes—Stripe test mode by default, with pricing pages and plan scaffolds.</p>
            </div>
            <div>
              <h3 className="text-base font-medium">How do you ensure quality?</h3>
              <p className="mt-1 text-sm text-slate-300">Lint, tests, security scans, Lighthouse budgets, license checks, and a Build Score threshold.</p>
            </div>
            <div>
              <h3 className="text-base font-medium">Can I review before deploy?</h3>
              <p className="mt-1 text-sm text-slate-300">Yes—use Copilot mode to pause at Spec, Code PR, Pricing, and Deploy gates.</p>
            </div>
            <div>
              <h3 className="text-base font-medium">Is there lock-in?</h3>
              <p className="mt-1 text-sm text-slate-300">No. Your GitHub, your Vercel, your database, your Stripe—always.</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/10 bg-slate-900/40 py-14">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-semibold">Generate your first startup</h2>
            <p className="mt-2 text-slate-300">
              Worst case: you learn. Best case: you launch. It’s all yours—code, infra, and revenue.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link
                href="/generate"
                className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400"
              >
                Try the Builder
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5"
              >
                See pricing
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
