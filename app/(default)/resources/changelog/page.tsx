// app/(default)/resources/changelog/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const siteUrl = 'https://www.buildaistartups.com'
const pageUrl = `${siteUrl}/resources/changelog`
const ogImage = '/brand/og-default.png'

// ───────────────── SEO ─────────────────
export const metadata: Metadata = {
  title: 'Changelog — What shipped recently | Build AI Startups',
  description:
    'All notable changes to Build AI Startups (HyperNova): features, improvements, fixes, and security notes.',
  alternates: { canonical: pageUrl },
  openGraph: {
    type: 'website',
    url: pageUrl,
    title: 'Changelog — What shipped recently | Build AI Startups',
    description:
      'Release notes for the Builder, Ecosystem, Marketplace, API, and Docs.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Build AI Startups — Changelog' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Changelog — What shipped recently | Build AI Startups',
    description:
      'Release notes for HyperNova: features, improvements, fixes, and security notes.',
    images: [ogImage],
  },
}

// ───────────────── Content model ─────────────────
type SectionKey = 'added' | 'improved' | 'fixed' | 'security' | 'deprecated'
type Release = {
  id: string
  version: string
  date: string // ISO
  summary: string
  theme: 'Builder' | 'Ecosystem' | 'Marketplace' | 'API' | 'Docs' | 'Integrity'
  sections: Partial<Record<SectionKey, string[]>>
  links?: { label: string; href: string }[]
}

const releases: Release[] = [
  {
    id: '2025-08-12-gold-templates',
    version: 'v0.3.0',
    date: '2025-08-12',
    summary:
      'Gold Templates for SaaS & API, Build Score v1, and cross-promotions across the ecosystem.',
    theme: 'Builder',
    sections: {
      added: [
        '🚀 **Gold Templates**: SaaS Starter (auth, teams, Stripe, analytics) & API Starter (keys, rate limits, docs).',
        '🧪 **Build Score v1**: composite from lint/types, tests, security, performance, and licenses to gate Autopilot.',
        '🔗 **Ecosystem cross-promos**: opt-in partner surfaces and shared launch feeds.',
      ],
      improved: [
        'Spec DSL presets for pricing and onboarding experiments.',
        'Faster repo generation (-23%) and clearer PR descriptions.',
      ],
      fixed: [
        'Resolved flaky Lighthouse budget check on Vercel preview URLs.',
        'Corrected license scanner allowing Apache-2.0 sub-packages.',
      ],
    },
    links: [
      { label: 'Docs: Builder', href: '/product/builder' },
      { label: 'Docs: Concepts', href: '/resources/docs#concepts' },
    ],
  },
  {
    id: '2025-07-22-api-webhooks-preview',
    version: 'v0.2.2',
    date: '2025-07-22',
    summary:
      'API & webhooks preview, Templates hub, and Marketplace diligence pack scaffolds.',
    theme: 'API',
    sections: {
      added: [
        '🔌 **API preview**: `/api/v1/ideas`, `/builds`, `/experiments`, `/marketplace/listings`.',
        '📬 **Webhooks**: `build.completed`, `build.failed`, `experiment.won`, `marketplace.listed`.',
        '📦 **Templates hub** at `/resources/templates` with 10 starters.',
      ],
      improved: [
        'Clear error types for rate-limit and validation failures.',
        'Webhook signature docs and Node verifier helper.',
      ],
      fixed: [
        'Handled empty `constraints` map in idea generation endpoint.',
      ],
    },
    links: [
      { label: 'API page', href: '/product/api' },
      { label: 'Templates', href: '/resources/templates' },
    ],
  },
  {
    id: '2025-07-02-docs-and-DSL',
    version: 'v0.2.0',
    date: '2025-07-02',
    summary:
      'Docs hub, Spec DSL structure, and first Marketplace readiness checklist.',
    theme: 'Docs',
    sections: {
      added: [
        '📚 **Docs hub** (`/resources/docs`) with Quick Start, Concepts, API overview, Webhooks, and Security.',
        '🧩 **Spec DSL**: ICP, UX outline, data model, pricing, integrations, and quality gates.',
        '✅ **Marketplace readiness**: preview transfer checklist (domain, billing, analytics, licensing).',
      ],
      improved: [
        'Cleaner hero copy across product pages and broader examples in Quick Start.',
      ],
      fixed: [
        'Anchor nav offsets on smaller screens.',
      ],
    },
    links: [
      { label: 'Docs home', href: '/resources/docs' },
      { label: 'Marketplace', href: '/product/marketplace' },
    ],
  },
  {
    id: '2025-06-11-alpha',
    version: 'v0.1.0',
    date: '2025-06-11',
    summary:
      'Public alpha: end-to-end build loop from intent → repo → deploy.',
    theme: 'Integrity',
    sections: {
      added: [
        '🎉 **Alpha**: Copilot and Autopilot modes, preview deploys, analytics wiring.',
        '🧰 **Quality gates**: lint/types, tests, security scan, Lighthouse budgets, license checks.',
      ],
      security: [
        'Secret scrubbing in logs and short-lived tokens for integrations.',
      ],
    },
    links: [{ label: 'About', href: '/about' }],
  },
]

// ───────────────── JSON-LD ─────────────────
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Resources', item: `${siteUrl}/resources` },
    { '@type': 'ListItem', position: 3, name: 'Changelog', item: pageUrl },
  ],
}

const collectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Build AI Startups — Changelog',
  url: pageUrl,
  description:
    'Release notes for HyperNova and Build AI Startups: Builder, Ecosystem, Marketplace, API, Docs.',
}

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: releases.map((r, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: `${r.version} — ${r.summary}`,
    url: `${pageUrl}#${r.id}`,
  })),
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How often do you release?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We ship continuously and batch notes weekly. Major features land once they clear quality gates and Build Score thresholds.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where can I see what’s coming next?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Check the public roadmap to see Now / Next / Later items. You can also suggest features.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide RSS or email updates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Subscribe to the RSS feed or join the Build Feed newsletter for highlights.',
      },
    },
  ],
}

// ───────────────── UI helpers ─────────────────
const themeChip: Record<Release['theme'], string> = {
  Builder: 'from-violet-500 to-fuchsia-500',
  Ecosystem: 'from-teal-400 to-emerald-500',
  Marketplace: 'from-amber-400 to-orange-500',
  API: 'from-sky-400 to-indigo-500',
  Docs: 'from-cyan-400 to-blue-500',
  Integrity: 'from-rose-400 to-red-500',
}

const sectionTitle: Record<SectionKey, string> = {
  added: 'NEW',
  improved: 'IMPROVED',
  fixed: 'FIXED',
  security: 'SECURITY',
  deprecated: 'DEPRECATED',
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// ───────────────── Page ─────────────────
export default function ChangelogPage() {
  return (
    <>
      {/* Structured data */}
      <Script id="ld-breadcrumb" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Script id="ld-collection" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <Script id="ld-items" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="bg-slate-950 text-slate-200">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-20 sm:pt-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-widest text-slate-400">Resources</p>
              <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Changelog — what shipped</h1>
              <p className="mt-4 text-lg text-slate-300">
                Every improvement to HyperNova and Build AI Startups. We track features, fixes,
                and security notes across the Builder, Ecosystem, Marketplace, API, and Docs.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#feed" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400">
                  Jump to releases
                </a>
                <Link href="/resources/roadmap" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5">
                  View roadmap
                </Link>
              </div>
              <p className="mt-3 text-sm text-slate-400">Subscribe via RSS or email below</p>
            </div>
            <div className="relative">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50">
                <img src="/media/screens/changelog-hero.png" alt="Changelog overview mock" className="h-full w-full object-cover" />
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">Dates, versions, and themed highlights</p>
            </div>
          </div>

          {/* Subscribe */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Link
              href="/resources/blog/rss.xml"
              className="rounded-lg border border-white/10 bg-slate-900/40 px-4 py-3 text-center text-sm hover:bg-white/5"
            >
              RSS feed
            </Link>
            <a
              href="https://formspree.io/f/your-form-id"
              className="rounded-lg border border-white/10 bg-slate-900/40 px-4 py-3 text-center text-sm hover:bg-white/5"
            >
              Subscribe by email
            </a>
            <Link
              href="/resources/blog"
              className="rounded-lg border border-white/10 bg-slate-900/40 px-4 py-3 text-center text-sm hover:bg-white/5"
            >
              Read the blog
            </Link>
          </div>
        </section>

        {/* Feed */}
        <section id="feed" className="mx-auto max-w-6xl px-6 pb-8">
          <h2 className="text-2xl font-semibold">Releases</h2>
          <div className="mt-6 space-y-6">
            {releases.map((r) => (
              <article key={r.id} id={r.id} className="rounded-2xl border border-white/10 bg-slate-900/40 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`inline-flex items-center rounded-full bg-gradient-to-r ${themeChip[r.theme]} px-3 py-1 text-xs font-medium text-white`}>
                      {r.theme}
                    </div>
                    <h3 className="text-lg font-semibold">{r.version}</h3>
                  </div>
                  <time className="text-xs text-slate-400">{fmtDate(r.date)}</time>
                </div>
                <p className="mt-2 text-slate-300">{r.summary}</p>

                {/* Sections */}
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {(Object.keys(r.sections) as SectionKey[])
                    .filter((k) => r.sections[k] && r.sections[k]!.length > 0)
                    .map((k) => (
                      <div key={k} className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
                        <div className="text-xs font-semibold tracking-wide text-slate-200">
                          {sectionTitle[k]}
                        </div>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
                          {r.sections[k]!.map((li, i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: li }} />
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>

                {/* Links */}
                {r.links && r.links.length > 0 && (
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    {r.links.map((l) => (
                      <Link key={l.href} href={l.href} className="text-sm text-sky-300 hover:underline">
                        {l.label} →
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Notes & policy */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
              <div className="text-lg font-semibold">Release notes policy</div>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
                <li>We ship continuously; notes are batched weekly.</li>
                <li>Major features include Docs links and migration guidance if needed.</li>
                <li>Security items include CVE references or mitigation steps when applicable.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
              <div className="text-lg font-semibold">Where to next</div>
              <p className="mt-2 text-sm text-slate-300">
                See what’s coming on the public roadmap, or explore deep-dives on the blog.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link href="/resources/roadmap" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 text-sm font-medium text-slate-200 hover:bg-white/5">
                  Roadmap
                </Link>
                <Link href="/resources/blog" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 text-sm font-medium text-slate-200 hover:bg-white/5">
                  Blog
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ (mirrors JSON-LD) */}
        <section id="faq" className="mx-auto max-w-6xl px-6 pb-12">
          <h2 className="text-2xl font-semibold">Changelog FAQ</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-base font-medium">How often do you release?</h3>
              <p className="mt-1 text-sm text-slate-300">
                We deploy continuously and publish notes weekly or when a major feature lands.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">Can I request a feature?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Yes—use the request form on the <Link href="/resources/roadmap" className="text-sky-300 hover:underline">roadmap</Link>.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">Do you support RSS or email?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Both. Subscribe via the RSS link above or join the Build Feed.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">Where are security updates posted?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Security-relevant fixes appear here under **SECURITY**. Critical items may also be emailed to impacted users.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/10 bg-slate-900/40 py-14">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-semibold">Build something your users love</h2>
            <p className="mt-2 text-slate-300">Open the Builder and go from idea to live preview today.</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link href="/generate" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400">
                Generate now
              </Link>
              <Link href="/resources/templates" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5">
                Use a template
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
