// app/(default)/product/marketplace/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const siteUrl = 'https://www.buildaistartups.com'
const ogImage = '/brand/og-default.png'

export const metadata: Metadata = {
  title: 'Marketplace — Launch. List. License. Exit. | Build AI Startups',
  description:
    'List your generated products for acquisition or licensing. Live demos, due-diligence pages, transfer-readiness checklist, and transparent fees.',
  alternates: { canonical: `${siteUrl}/product/marketplace` },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/product/marketplace`,
    title: 'Marketplace — Launch. List. License. Exit. | Build AI Startups',
    description:
      'A marketplace for AI-generated micro-SaaS: list, license, or sell with live demos, build scores, and transfer-readiness.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Build AI Startups — Marketplace' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketplace — Launch. List. License. Exit. | Build AI Startups',
    description:
      'Sell or license AI-generated micro-SaaS with live demos and due diligence built-in.',
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
  '@type': 'WebApplication',
  name: 'Build AI Startups Marketplace',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'A marketplace to list, license, or sell AI-generated micro-SaaS with live demos, due diligence pages, and transfer-readiness.',
  url: `${siteUrl}/product/marketplace`,
  brand: { '@type': 'Brand', name: 'Build AI Startups' },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Product', item: `${siteUrl}/` },
    { '@type': 'ListItem', position: 3, name: 'Marketplace', item: `${siteUrl}/product/marketplace` },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who owns the IP before a sale?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You do. Projects are created under your GitHub and use your infrastructure. Marketplace facilitates listing, licensing, and transfer.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do fees work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We charge a transparent commission on completed sales and a small listing fee on higher tiers. See the Fees section for details.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there escrow?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Payments are handled via Stripe Connect with optional milestone-based escrow to protect both buyers and sellers.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes a project “transfer-ready”?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A checklist covering domain, billing, env secrets, analytics, documentation, license status, and access handoff. Listings display a readiness badge.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I list for licensing instead of full sale?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Offer commercial licenses (single use, multi use, or OEM) with clear terms and automated fulfillment.',
      },
    },
  ],
}

export default function MarketplacePage() {
  return (
    <>
      {/* Structured data */}
      <Script id="ld-org" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <Script id="ld-app" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <Script id="ld-bc" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="bg-slate-950 text-slate-200">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-20 sm:pt-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-widest text-slate-400">Product</p>
              <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Launch. List. License. Exit.</h1>
              <p className="mt-4 text-lg text-slate-300">
                Turn builds into businesses. Marketplace lets you list micro-SaaS with live demos, Build Scores,
                due-diligence pages, and a transfer-readiness checklist. Sell or license—on your terms.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="#list"
                  className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400"
                >
                  Create a listing
                </Link>
                <Link
                  href="#browse"
                  className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5"
                >
                  Browse listings
                </Link>
              </div>
              <p className="mt-3 text-sm text-slate-400">Transparent fees · Stripe Connect · Optional escrow</p>
            </div>
            <div className="relative">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50">
                <video className="h-full w-full" autoPlay muted loop playsInline poster="/media/screens/marketplace-grid.png">
                  <source src="/media/screens/marketplace-grid.webm" type="video/webm" />
                  <source src="/media/screens/marketplace-grid.mp4" type="video/mp4" />
                </video>
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">Live demos · Build Score · Transfer-readiness</p>
            </div>
          </div>
        </section>

        {/* What you can do */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">What Marketplace adds</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: 'One-click listing',
                d: 'Publish from your project dashboard. Auto-generated product page with live demo and spec summary.',
              },
              {
                t: 'Licensing options',
                d: 'Offer commercial licenses (single, multi, OEM) with clear terms and automated delivery.',
              },
              {
                t: 'Transfer-readiness',
                d: 'Domain, Stripe, env secrets, analytics, docs—checklist scored and visible to buyers.',
              },
              {
                t: 'Due-diligence page',
                d: 'Build Score, quality gates, commit history, dependency licenses, and traffic/proxy metrics.',
              },
              {
                t: 'Negotiation & offers',
                d: 'Private offers, public buy-now, or auctions. Message securely and keep an audit trail.',
              },
              {
                t: 'Payouts & escrow',
                d: 'Stripe Connect for instant payouts. Optional milestone-based escrow for peace of mind.',
              },
            ].map((c, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="text-base font-medium">{c.t}</div>
                <p className="mt-1 text-sm text-slate-400">{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How selling works (5 steps) */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">How selling works</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { t: 'Prepare', d: 'Run the transfer checklist and confirm Build Score and gates are green.' },
              { t: 'Verify', d: 'Connect Stripe Connect, verify ownership, and choose sale/licensing terms.' },
              { t: 'List', d: 'Generate a listing: value prop, pricing, metrics, and demo links.' },
              { t: 'Negotiate', d: 'Receive offers, chat privately, or set buy-now. Enable escrow if needed.' },
              { t: 'Transfer', d: 'Use the guided handoff: domain, repos, env, billing, analytics. Close and payout.' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="text-sm uppercase tracking-wide text-slate-400">Step {i + 1}</div>
                <div className="mt-1 text-base font-medium">{s.t}</div>
                <p className="mt-1 text-sm text-slate-400">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Buyer experience */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">A better buyer experience</h3>
              <p className="mt-2 text-slate-300">
                See working products, not PDFs. Filter by market, stack, and traction proxies, then try the live demo.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Filters: category, ICP, Build Score, transfer-readiness</li>
                <li>Live previews + repo/commit history (when enabled)</li>
                <li>Comparable dashboards and quality gate results</li>
                <li>Clear license terms and usage rights</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <img src="/media/screens/buyer-console.png" alt="Buyer console with filters and live demo" className="rounded-lg" />
            </div>
          </div>
        </section>

        {/* Fees & payouts */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
            <h2 className="text-2xl font-semibold">Fees & payouts</h2>
            <p className="mt-2 text-slate-300">
              Simple, transparent pricing. No surprises. You set your price; we handle the rails.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { t: 'Listing fee', d: 'Free on Starter; included in Builder/Studio.' },
                { t: 'Commission', d: 'A small % only when a sale closes.' },
                { t: 'Payouts', d: 'Stripe Connect; instant or scheduled.' },
                { t: 'Escrow', d: 'Optional milestone-based releases.' },
              ].map((x, i) => (
                <div key={i} className="rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-300">
                  <div className="font-medium">{x.t}</div>
                  <div className="text-slate-400">{x.d}</div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-slate-400">See full details on the Pricing page.</p>
          </div>
        </section>

        {/* Quality & compliance */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="order-2 md:order-1 rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <img src="/media/screens/diligence.png" alt="Due diligence and compliance" className="rounded-lg" />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-xl font-semibold">Quality & compliance by default</h3>
              <p className="mt-2 text-slate-300">
                Listings display Build Score and quality gates so buyers know what they’re getting. We also surface
                license status and basic compliance checks.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Build gates: lint, tests, security, performance, licenses</li>
                <li>IP/license checks on dependencies</li>
                <li>Privacy/PII flags for data sources (if relevant)</li>
                <li>Audit trail for listing changes and negotiations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Join / create listing */}
        <section id="list" className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Create a listing in minutes</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-300">
            <li>Open your project dashboard and click <em>List on Marketplace</em>.</li>
            <li>Choose Sale or Licensing, set price and terms.</li>
            <li>Run the transfer-readiness checklist (auto-filled from your project).</li>
            <li>Publish. Buyers can preview, message, and make offers immediately.</li>
          </ol>
          <div className="mt-6 flex items-center gap-3">
            <Link
              href="/generate"
              className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400"
            >
              Generate a product
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5"
            >
              See pricing
            </Link>
          </div>
          <p className="mt-3 text-sm text-slate-400">Marketplace features are available on the Studio tier; viewing is free.</p>
        </section>

        {/* Browse examples */}
        <section id="browse" className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Featured listings</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'InsightLoom',
                vp: 'Micro-analytics for Shopify stores',
                tags: ['Analytics', 'E-commerce'],
                score: 87,
                ready: '6/6',
              },
              {
                name: 'TicketPilot',
                vp: 'AI triage for support inboxes',
                tags: ['AI', 'Support'],
                score: 84,
                ready: '5/6',
              },
              {
                name: 'DocsCraft',
                vp: 'Docs & changelog generator',
                tags: ['DevTools'],
                score: 89,
                ready: '6/6',
              },
            ].map((p, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-slate-900/50">
                  <img src={`/media/projects/project-${i + 1}.png`} alt={p.name} className="h-full w-full object-cover" />
                </div>
                <div className="mt-3 text-base font-medium">{p.name}</div>
                <p className="text-sm text-slate-400">{p.vp}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-md border border-white/10 bg-slate-950/40 px-2 py-0.5 text-xs text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                  <span>Build Score: <span className="text-slate-200">{p.score}</span></span>
                  <span>•</span>
                  <span>Transfer-ready: <span className="text-slate-200">{p.ready}</span></span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Link href="#" className="text-sm text-sky-300 hover:underline">Live demo</Link>
                  <span className="text-slate-600">•</span>
                  <Link href="#" className="text-sm text-sky-300 hover:underline">Due diligence</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ (also reflected in JSON-LD) */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Marketplace FAQ</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-base font-medium">Who owns the IP before a sale?</h3>
              <p className="mt-1 text-sm text-slate-300">
                You do. Projects are under your GitHub and infrastructure. Marketplace just provides the rails for listing,
                licensing, and transfer.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">How are payments handled?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Stripe Connect handles payouts. You can opt into milestone-based escrow for added protection.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">What’s the commission?</h3>
              <p className="mt-1 text-sm text-slate-300">
                A small percentage on completed sales (varies by tier). Listing is free on Starter; included on Builder/Studio.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">Can I sell code and keep a license?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Yes—offer licensing models or structure sales to retain certain rights. Terms are displayed clearly to buyers.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">How is quality verified?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Build Score + gates (lint, tests, security, performance, license) and an optional manual review for featured listings.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">What’s in the transfer-readiness checklist?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Domain, billing/Stripe, environment secrets, analytics, docs, support handoff, and license status. Listings show readiness badges.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/10 bg-slate-900/40 py-14">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-semibold">Turn builds into outcomes</h2>
            <p className="mt-2 text-slate-300">
              List your product today—sell, license, or field offers. You choose the path; Marketplace handles the rails.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link
                href="/generate"
                className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400"
              >
                Generate a product
              </Link>
              <Link
                href="#list"
                className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5"
              >
                Create a listing
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
