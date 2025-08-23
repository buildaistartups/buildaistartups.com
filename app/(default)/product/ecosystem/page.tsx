// app/(default)/product/ecosystem/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const siteUrl = 'https://www.buildaistartups.com'
const ogImage = '/brand/og-default.png'

export const metadata: Metadata = {
  title: 'Ecosystem — Startups that help each other grow | Build AI Startups',
  description:
    'HyperNova Ecosystem adds cross-promotion, shared components, and referral economics so each generated startup boosts the others. Compound growth by design.',
  alternates: { canonical: `${siteUrl}/product/ecosystem` },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/product/ecosystem`,
    title: 'Ecosystem — Startups that help each other grow | Build AI Startups',
    description:
      'Cross-promotions, shared components, and referral engine turn single apps into a network with compounding growth.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Build AI Startups — Ecosystem' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ecosystem — Startups that help each other grow | Build AI Startups',
    description:
      'Cross-promo placements, shared components, and referral economics for compounding growth.',
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
  name: 'HyperNova Ecosystem Engine',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'A cross-promotion and referral network that connects generated startups with shared components and compound growth.',
  url: `${siteUrl}/product/ecosystem`,
  brand: { '@type': 'Brand', name: 'Build AI Startups' },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Product', item: `${siteUrl}/` },
    { '@type': 'ListItem', position: 3, name: 'Ecosystem', item: `${siteUrl}/product/ecosystem` },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do I have to participate in cross-promotions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Ecosystem is strictly opt-in. You can enable/disable placements per app, set caps, and exclude categories.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will other apps advertise on my product without approval?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. You control allowlists/denylists and max impressions per placement. Nothing appears without your opt-in.',
      },
    },
    {
      '@type': 'Question',
      name: 'How are placements allocated fairly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A fair-rotation algorithm allocates impressions within category/ICP matches, respecting per-app caps and quality scores.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I earn from referrals?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can choose credits toward your plan or cash-out commissions where available.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is data shared between apps?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We share only aggregate performance and attribution data for placements. No user PII is shared between apps.',
      },
    },
  ],
}

export default function EcosystemPage() {
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
              <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Startups that help each other grow</h1>
              <p className="mt-4 text-lg text-slate-300">
                Ecosystem turns single apps into a network. Opt-in cross-promotions, shared components, and referral
                economics create compounding growth—without extra work.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/generate"
                  className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400"
                >
                  Try the Builder
                </Link>
                <Link
                  href="#join"
                  className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5"
                >
                  Explore the network
                </Link>
              </div>
              <p className="mt-3 text-sm text-slate-400">Opt-in · Capped · Transparent analytics</p>
            </div>
            <div className="relative">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50">
                <video className="h-full w-full" autoPlay muted loop playsInline poster="/media/screens/ecosystem-graph.png">
                  <source src="/media/screens/ecosystem-graph.webm" type="video/webm" />
                  <source src="/media/screens/ecosystem-graph.mp4" type="video/mp4" />
                </video>
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">Cross-promotions · Shared components · Referrals</p>
            </div>
          </div>
        </section>

        {/* What it is (4 pillars) */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">What Ecosystem adds to every product</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: 'Cross-promotions', d: 'Small, respectful placements between complementary apps; strictly opt-in with caps.' },
              { t: 'Shared components', d: 'Auth, billing, onboarding, and settings shared for speed and consistency.' },
              { t: 'Referral engine', d: 'Tracked referrals with credits or commissions. Reward the surfaces that convert.' },
              { t: 'Compound growth', d: 'More apps → more surfaces → more traffic → more conversions.' },
            ].map((c, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="text-base font-medium">{c.t}</div>
                <p className="mt-1 text-sm text-slate-400">{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works (steps) */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { t: 'Opt in', d: 'Enable the Ecosystem switch per app. Choose categories and audiences.' },
              { t: 'Place', d: 'Pick where a tiny cross-promo can appear (onboarding, empty state, footer, docs).' },
              { t: 'Match', d: 'We match by category/ICP and rotate fairly within your caps and rules.' },
              { t: 'Attribute', d: 'See clicks, activations, and revenue attribution without sharing PII.' },
              { t: 'Reward', d: 'Earn credits/commissions or reinvest into more impressions.' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="text-sm uppercase tracking-wide text-slate-400">Step {i + 1}</div>
                <div className="mt-1 text-base font-medium">{s.t}</div>
                <p className="mt-1 text-sm text-slate-400">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Controls & brand safety */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">You’re in control</h3>
              <p className="mt-2 text-slate-300">
                Ecosystem is opt-in with strict controls—so it boosts your product without compromising experience.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li><strong>Caps:</strong> Set daily/weekly impression limits per placement.</li>
                <li><strong>Rules:</strong> Allowlist/denylist partners and exclude categories.</li>
                <li><strong>Brand safety:</strong> Policy packs; no intrusive formats.</li>
                <li><strong>Placement quality:</strong> Small, contextual, and dismissible.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <img src="/media/screens/cross-promo.png" alt="Cross-promotion placement controls" className="rounded-lg" />
            </div>
          </div>
        </section>

        {/* Analytics & transparency */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="order-2 md:order-1 rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <img src="/media/screens/ecosystem-stats.png" alt="Ecosystem analytics and attribution" className="rounded-lg" />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-xl font-semibold">Transparent performance</h3>
              <p className="mt-2 text-slate-300">
                See what’s shown where, to whom, and why. We expose placement logs and outcomes so you can tune for quality.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Impressions, clicks, activations, attributed revenue</li>
                <li>Top routes and surfaces driving conversions</li>
                <li>Category/ICP match breakdowns</li>
                <li>Export to CSV/Notion/Looker via API</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Shared components */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Shared components (faster together)</h2>
          <p className="mt-2 text-slate-300">
            Reuse the things every SaaS needs—wired once, consistent everywhere.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'Auth (email/OAuth), profile & teams',
              'Billing (Stripe), pricing & entitlements',
              'Onboarding checklist & empty states',
              'Settings, notifications, webhooks',
              'Docs, FAQs, changelog templates',
              'Analytics events & funnels (Plausible/PostHog)',
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4 text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Referrals & economics */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">Referrals that actually pay</h3>
              <p className="mt-2 text-slate-300">
                Attribute conversions to the surfaces that drove them and reward accordingly—credits or commissions.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Per-category commission rates</li>
                <li>Credit-back toward your plan (default)</li>
                <li>Cash-out where available</li>
                <li>Fraud detection & anomaly alerts</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <img src="/media/screens/referrals.png" alt="Referral engine and rewards" className="rounded-lg" />
            </div>
          </div>
        </section>

        {/* Integration steps */}
        <section id="join" className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Join the network in minutes</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-300">
            <li>Turn on <em>Ecosystem</em> in your project dashboard.</li>
            <li>Select categories/ICP and choose placements (onboarding, empty state, docs, footer).</li>
            <li>Set impression caps and optional allow/deny rules.</li>
            <li>Review & publish. Analytics start as soon as it’s live.</li>
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
          <p className="mt-3 text-sm text-slate-400">Note: Ecosystem is available on Builder & Studio tiers.</p>
        </section>

        {/* Example network cards (dummy content) */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Live examples from the network</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Creator Metrics',
                vp: 'Analytics for YouTube creators',
                tags: ['Analytics', 'Creator'],
              },
              {
                name: 'FormPilot',
                vp: 'Forms + automations for indie apps',
                tags: ['Automation', 'Forms'],
              },
              {
                name: 'InboxIQ',
                vp: 'AI summaries for support inboxes',
                tags: ['AI', 'Support'],
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
                <div className="mt-3 flex items-center gap-2">
                  <Link href="#" className="text-sm text-sky-300 hover:underline">
                    Live demo
                  </Link>
                  <span className="text-slate-600">•</span>
                  <Link href="#" className="text-sm text-sky-300 hover:underline">
                    View repo
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Ecosystem FAQ</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-base font-medium">Do I have to participate?</h3>
              <p className="mt-1 text-sm text-slate-300">
                No. It’s strictly opt-in. You can enable/disable per app, control placements, and set caps.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">Can I choose which apps appear?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Yes. Use allowlists/denylists and exclude categories to keep placements relevant and safe.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">How are impressions allocated?</h3>
              <p className="mt-1 text-sm text-slate-300">
                A fair-rotation algorithm within category/ICP matches, respecting caps and quality scores.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">What do I earn from referrals?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Default is credits toward your plan; cash-out is available where supported.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">What data is shared?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Only aggregate performance and attribution metrics. No PII is shared between apps.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">Will it slow down my app?</h3>
              <p className="mt-1 text-sm text-slate-300">
                No. Placements are tiny, cached, and loaded after primary content. You can disable on any route.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/10 bg-slate-900/40 py-14">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-semibold">Let your products lift each other</h2>
            <p className="mt-2 text-slate-300">
              Turn on Ecosystem and unlock compounding growth—opt-in, transparent, and under your control.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
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
          </div>
        </section>
      </main>
    </>
  )
}
