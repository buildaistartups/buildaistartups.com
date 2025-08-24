// app/(default)/resources/roadmap/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const siteUrl = 'https://www.buildaistartups.com'
const pageUrl = `${siteUrl}/resources/roadmap`
const ogImage = '/brand/og-default.png'

export const metadata: Metadata = {
  title: 'Roadmap — What we’re building next | Build AI Startups',
  description:
    'Follow the HyperNova roadmap: what’s shipping now, what’s next, and what’s planned. Vote on features and track progress via the changelog.',
  alternates: { canonical: pageUrl },
  openGraph: {
    type: 'website',
    url: pageUrl,
    title: 'Roadmap — What we’re building next | Build AI Startups',
    description:
      'Now / Next / Later board, release timeline, and prioritization policy for HyperNova & Build AI Startups.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Build AI Startups — Roadmap' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roadmap — What we’re building next | Build AI Startups',
    description:
      'See what’s shipping now, next, and later. Vote on features and track releases.',
    images: [ogImage],
  },
}

type RoadmapItem = {
  id: string
  title: string
  summary: string
  status: 'now' | 'next' | 'later' | 'done'
  eta?: string
  theme: 'Builder' | 'Ecosystem' | 'Marketplace' | 'API' | 'Integrity' | 'Templates'
  tags: string[]
  link?: string
}

const items: RoadmapItem[] = [
  // ---- NOW ----
  {
    id: 'builder-gold-templates',
    title: 'Builder: Gold Templates (SaaS, API)',
    summary:
      'Production-grade starters with auth, Stripe, analytics, tests, and docs. Opinionated defaults and Spec DSL presets.',
    status: 'now',
    eta: 'Shipping',
    theme: 'Builder',
    tags: ['SaaS', 'API', 'Spec DSL'],
    link: '/product/builder',
  },
  {
    id: 'build-score-v1',
    title: 'Build Score v1 + Quality Gates',
    summary:
      'Composite score from lint/types, tests, security scans, performance budgets, and license checks to gate Autopilot.',
    status: 'now',
    eta: 'Shipping',
    theme: 'Integrity',
    tags: ['Quality', 'CI', 'Security'],
    link: '/resources/docs#concepts',
  },
  {
    id: 'ecosystem-cross-promos',
    title: 'Ecosystem: Cross-Promotions',
    summary:
      'Auto-network new launches with partner microsites and shared feeds. Incremental growth without extra ad spend.',
    status: 'now',
    eta: 'Shipping',
    theme: 'Ecosystem',
    tags: ['Growth', 'Distribution'],
    link: '/product/ecosystem',
  },
  // ---- NEXT ----
  {
    id: 'marketplace-beta',
    title: 'Marketplace Beta (Listings & Diligence Packs)',
    summary:
      'List, license, or transfer projects with live demos, Build Score, and readiness checklist. Optional escrow.',
    status: 'next',
    eta: 'Q4',
    theme: 'Marketplace',
    tags: ['Deals', 'Escrow', 'Transfer'],
    link: '/product/marketplace',
  },
  {
    id: 'api-v1',
    title: 'API v1 + Webhooks',
    summary:
      'Endpoints for ideas, builds, experiments, events, and Marketplace listings. Signed webhooks for lifecycle events.',
    status: 'next',
    eta: 'Q4',
    theme: 'API',
    tags: ['Developers', 'Automation'],
    link: '/product/api',
  },
  {
    id: 'prompt-packs',
    title: 'Prompt Packs & Blueprints',
    summary:
      'Reusable, auditable prompt sets and Spec patterns for common verticals and workflows.',
    status: 'next',
    eta: 'Q4',
    theme: 'Templates',
    tags: ['Spec DSL', 'Verticals'],
    link: '/resources/templates',
  },
  // ---- LATER ----
  {
    id: 'vertical-agents',
    title: 'Vertical Agents (3.0)',
    summary:
      'Domain-tuned agents for fintech, creator tools, and ops. Stricter compliance packs and data policies.',
    status: 'later',
    eta: 'H1',
    theme: 'Builder',
    tags: ['Agents', 'Compliance'],
  },
  {
    id: 'acquisition-automation',
    title: 'Acquisition Automation',
    summary:
      'Buy-side console with allocation preferences, private rooms, and milestone-based escrow workflows.',
    status: 'later',
    eta: 'H1',
    theme: 'Marketplace',
    tags: ['Investors', 'Workflow'],
  },
  {
    id: 'studio-automation',
    title: 'Venture Studio Automation',
    summary:
      'Always-on idea scouting, Spec seeding, and prototype shipping behind flags for review by studios/accelerators.',
    status: 'later',
    eta: 'H1',
    theme: 'Ecosystem',
    tags: ['Studios', 'Backlog'],
  },
  // ---- DONE (sample) ----
  {
    id: 'docs-hub',
    title: 'Docs Hub & Quick Start',
    summary:
      'Documentation hub with Quick Start, Concepts, API overview, Webhooks, Security, and FAQ.',
    status: 'done',
    eta: 'Shipped',
    theme: 'Templates',
    tags: ['Docs', 'DX'],
    link: '/resources/docs',
  },
]

const statusLabel: Record<RoadmapItem['status'], string> = {
  now: 'Now',
  next: 'Next',
  later: 'Later',
  done: 'Shipped',
}

const themeColor: Record<RoadmapItem['theme'], string> = {
  Builder: 'from-violet-500 to-fuchsia-500',
  Ecosystem: 'from-teal-400 to-emerald-500',
  Marketplace: 'from-amber-400 to-orange-500',
  API: 'from-sky-400 to-indigo-500',
  Integrity: 'from-rose-400 to-red-500',
  Templates: 'from-cyan-400 to-blue-500',
}

// -------- JSON-LD --------
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Resources', item: `${siteUrl}/resources` },
    { '@type': 'ListItem', position: 3, name: 'Roadmap', item: pageUrl },
  ],
}

const collectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Build AI Startups — Roadmap',
  url: pageUrl,
  description:
    'Public roadmap for HyperNova and Build AI Startups: Now / Next / Later board, milestones, and prioritization policy.',
}

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: items.map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: t.title,
    url: `${pageUrl}#${t.id}`,
    description: t.summary,
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'status', value: statusLabel[t.status] },
      { '@type': 'PropertyValue', name: 'theme', value: t.theme },
      ...(t.eta ? [{ '@type': 'PropertyValue', name: 'eta', value: t.eta }] : []),
    ],
  })),
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do you prioritize roadmap items?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We balance user demand, ecosystem impact, technical leverage, and safety. Items move from Next to Now when they meet readiness criteria and we have capacity.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I vote or request a feature?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Use the feature request form on the roadmap page. We aggregate votes and report decisions in the changelog.',
      },
    },
    {
      '@type': 'Question',
      name: 'What’s the difference between Copilot and Autopilot?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Copilot requires human approvals at gates; Autopilot ships when all gates are green and the Build Score meets threshold.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where can I see what shipped?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Check the public changelog for release notes and migration tips.',
      },
    },
  ],
}

export default function RoadmapPage() {
  const now = items.filter((i) => i.status === 'now')
  const next = items.filter((i) => i.status === 'next')
  const later = items.filter((i) => i.status === 'later')
  const done = items.filter((i) => i.status === 'done')

  const Column = ({
    title,
    children,
  }: {
    title: string
    children: React.ReactNode
  }) => (
    <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
      <div className="mb-3 text-sm font-semibold tracking-wide text-slate-200">{title}</div>
      <div className="space-y-3">{children}</div>
    </div>
  )

  const Card = ({ item }: { item: RoadmapItem }) => (
    <div id={item.id} className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
      <div className="flex items-center justify-between">
        <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${themeColor[item.theme]} px-3 py-1 text-xs font-medium text-white`}>
          <span>{item.theme}</span>
        </div>
        <div className="text-xs text-slate-400">{item.eta || statusLabel[item.status]}</div>
      </div>
      <div className="mt-2 text-base font-semibold text-slate-100">{item.title}</div>
      <p className="mt-1 text-sm text-slate-400">{item.summary}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {item.tags.map((t) => (
          <span key={t} className="rounded-md border border-white/10 bg-slate-900/60 px-2 py-0.5 text-xs text-slate-300">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3">
        {item.link ? (
          <Link href={item.link} className="text-sm text-sky-300 hover:underline">
            Learn more →
          </Link>
        ) : null}
        <a
          href={`/contact?subject=Roadmap: ${encodeURIComponent(item.title)}`}
          className="text-sm text-slate-300 hover:underline"
        >
          Share feedback
        </a>
      </div>
    </div>
  )

  return (
    <>
      {/* JSON-LD */}
      <Script id="ld-breadcrumb" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Script id="ld-collection" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <Script id="ld-itemlist" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="bg-slate-950 text-slate-200">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-20 sm:pt-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-widest text-slate-400">Resources</p>
              <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Roadmap — what we’re building next</h1>
              <p className="mt-4 text-lg text-slate-300">
                Here’s the public roadmap for HyperNova & Build AI Startups. We ship in small, verifiable steps and record
                changes in the <Link href="/changelog" className="text-sky-300 hover:underline">changelog</Link>.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#board" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400">
                  View the board
                </a>
                <Link href="/contact?subject=Roadmap%20feedback" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5">
                  Suggest a feature
                </Link>
              </div>
              <p className="mt-3 text-sm text-slate-400">Priorities: user value · ecosystem impact · technical leverage · safety</p>
            </div>
            <div className="relative">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50">
                <img src="/media/screens/roadmap-hero.png" alt="Roadmap overview mock" className="h-full w-full object-cover" />
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">Board view · Timeline · Status & ETA</p>
            </div>
          </div>
        </section>

        {/* Board: Now / Next / Later / Shipped */}
        <section id="board" className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold">Now / Next / Later</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-4">
            <Column title="Now">
              {now.map((i) => <Card key={i.id} item={i} />)}
              {now.length === 0 && <div className="text-sm text-slate-500">Nothing here yet.</div>}
            </Column>
            <Column title="Next">
              {next.map((i) => <Card key={i.id} item={i} />)}
              {next.length === 0 && <div className="text-sm text-slate-500">Nothing here yet.</div>}
            </Column>
            <Column title="Later">
              {later.map((i) => <Card key={i.id} item={i} />)}
              {later.length === 0 && <div className="text-sm text-slate-500">Nothing here yet.</div>}
            </Column>
            <Column title="Shipped">
              {done.map((i) => <Card key={i.id} item={i} />)}
              {done.length === 0 && <div className="text-sm text-slate-500">Nothing here yet.</div>}
            </Column>
          </div>
        </section>

        {/* Themes */}
        <section id="themes" className="mx-auto max-w-6xl px-6 py-10">
          <h2 className="text-2xl font-semibold">Roadmap themes</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                t: 'Builder',
                d: 'Compress the loop from intent → repo → deploy. Invest in Spec DSL, starter kits, CI, and Build Score.',
                bg: themeColor.Builder,
              },
              { t: 'Ecosystem', d: 'Make every launch easier with cross-promos, shared feeds, and partner surfaces.', bg: themeColor.Ecosystem },
              { t: 'Marketplace', d: 'Turn working software into deals: listings, diligence packs, and transfer rails.', bg: themeColor.Marketplace },
              { t: 'API', d: 'Unlock automation and pipelines with REST, webhooks, and (later) SDKs.', bg: themeColor.API },
              { t: 'Integrity', d: 'Bake in safety, provenance, quality gates, and license hygiene.', bg: themeColor.Integrity },
              { t: 'Templates', d: 'Ship faster with reusable starters, prompt packs, and vertical blueprints.', bg: themeColor.Templates },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-white/10 bg-slate-900/40 p-5">
                <div className={`inline-flex rounded-full bg-gradient-to-r ${x.bg} px-3 py-1 text-xs font-medium text-white`}>{x.t}</div>
                <p className="mt-3 text-sm text-slate-300">{x.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section id="timeline" className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Timeline</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
              <div className="text-lg font-semibold">This quarter</div>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
                <li>Gold Templates (SaaS, API) ✅</li>
                <li>Build Score v1 + quality gates ✅</li>
                <li>Ecosystem cross-promotions (launch) ✅</li>
                <li>Marketplace beta (listings + diligence) →</li>
                <li>API v1 + webhooks →</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
              <div className="text-lg font-semibold">Next quarter</div>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
                <li>Prompt Packs & Blueprints</li>
                <li>Partner program for accelerators/cohorts</li>
                <li>Marketplace: offers, escrow milestones</li>
                <li>API feeds for investors</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            ETAs are directional and may change. We announce releases in the <Link href="/changelog" className="text-sky-300 hover:underline">changelog</Link>.
          </p>
        </section>

        {/* Prioritization policy */}
        <section id="policy" className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">How we prioritize</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
              <div className="text-base font-medium">Signals we weigh</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li><strong>User value</strong>: time-to-value, breadth of impact</li>
                <li><strong>Ecosystem effect</strong>: boosts other launches</li>
                <li><strong>Technical leverage</strong>: unlocks compounding speed/quality</li>
                <li><strong>Safety & integrity</strong>: raises bar for reliable autonomy</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
              <div className="text-base font-medium">What moves something to “Now”</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Clear spec, validated need, and owner capacity</li>
                <li>Meets safety/quality bar; minimal external dependencies</li>
                <li>Stacks with current initiatives (Builder/Ecosystem/Marketplace)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Feature requests */}
        <section id="requests" className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
            <h2 className="text-2xl font-semibold">Request a feature</h2>
            <p className="mt-2 text-slate-300">
              Tell us what would unlock the most value for you. We read everything and update this page as plans evolve.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link href="/contact?subject=Feature%20request" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400">
                Submit a request
              </Link>
              <Link href="/changelog" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5">
                Read the changelog
              </Link>
              <Link href="/resources/templates" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5">
                Browse templates
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ (mirrors JSON-LD) */}
        <section id="faq" className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Roadmap FAQ</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-base font-medium">How do I vote on an item?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Click “Share feedback” on a card or use the feature request form. We aggregate signals by account.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">Will dates slip?</h3>
              <p className="mt-1 text-sm text-slate-300">Sometimes. We optimize for quality, safety, and reliability of the build loop.</p>
            </div>
            <div>
              <h3 className="text-base font-medium">Where can I follow progress?</h3>
              <p className="mt-1 text-sm text-slate-300">Changelog posts major releases. Minor updates appear on product pages.</p>
            </div>
            <div>
              <h3 className="text-base font-medium">Can partners influence priorities?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Yes, via partner programs. See <Link href="/solutions/accelerators" className="text-sky-300 hover:underline">Accelerators & Universities</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/10 bg-slate-900/40 py-14">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-semibold">Help shape the roadmap</h2>
            <p className="mt-2 text-slate-300">
              Tell us what you’re building and we’ll optimize the Build loop for your outcomes.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link href="/contact?subject=Roadmap%20feedback" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400">
                Suggest a feature
              </Link>
              <Link href="/changelog" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5">
                View changelog
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
