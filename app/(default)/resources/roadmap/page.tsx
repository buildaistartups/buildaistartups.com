// app/(default)/resources/roadmap/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const siteUrl = 'https://www.buildaistartups.com'
const pageUrl = `${siteUrl}/resources/roadmap`
const ogImage = '/brand/og-default.png'

export const metadata: Metadata = {
  title: 'Roadmap - What we are building next | Build AI Startups',
  description: 'Follow the Build AI Startups roadmap: what is shipping now, what is next, and what is planned. Vote on features and track progress via the changelog.',
  alternates: { canonical: pageUrl },
  openGraph: {
    type: 'website',
    url: pageUrl,
    title: 'Roadmap - What we are building next | Build AI Startups',
    description: 'Now / Next / Later board, release timeline, and prioritization policy for Build AI Startups.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Build AI Startups - Roadmap' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roadmap - What we are building next | Build AI Startups',
    description: 'See what is shipping now, next, and later. Vote on features and track releases.',
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
  votes?: number
}

const items: RoadmapItem[] = [
  {
    id: 'builder-gold-templates',
    title: 'Builder: Gold Templates (SaaS, API)',
    summary: 'Production-grade starters with auth, Stripe, analytics, tests, and docs. Opinionated defaults and Spec DSL presets.',
    status: 'now',
    eta: 'Shipping',
    theme: 'Builder',
    tags: ['SaaS', 'API', 'Spec DSL'],
    link: '/product/builder',
    votes: 127,
  },
  {
    id: 'build-score-v1',
    title: 'Build Score v1 + Quality Gates',
    summary: 'Composite score from lint/types, tests, security scans, performance budgets, and license checks to gate Autopilot.',
    status: 'now',
    eta: 'Shipping',
    theme: 'Integrity',
    tags: ['Quality', 'CI', 'Security'],
    link: '/resources/docs#concepts',
    votes: 89,
  },
  {
    id: 'ecosystem-cross-promos',
    title: 'Ecosystem: Cross-Promotions',
    summary: 'Auto-network new launches with partner microsites and shared feeds. Incremental growth without extra ad spend.',
    status: 'now',
    eta: 'Shipping',
    theme: 'Ecosystem',
    tags: ['Growth', 'Distribution'],
    link: '/product/ecosystem',
    votes: 156,
  },
  {
    id: 'marketplace-beta',
    title: 'Marketplace Beta (Listings & Diligence Packs)',
    summary: 'List, license, or transfer projects with live demos, Build Score, and readiness checklist. Optional escrow.',
    status: 'next',
    eta: 'Q4',
    theme: 'Marketplace',
    tags: ['Deals', 'Escrow', 'Transfer'],
    link: '/product/marketplace',
    votes: 203,
  },
  {
    id: 'api-v1',
    title: 'API v1 + Webhooks',
    summary: 'Endpoints for ideas, builds, experiments, events, and Marketplace listings. Signed webhooks for lifecycle events.',
    status: 'next',
    eta: 'Q4',
    theme: 'API',
    tags: ['Developers', 'Automation'],
    link: '/product/api',
    votes: 178,
  },
  {
    id: 'docs-hub',
    title: 'Docs Hub & Quick Start',
    summary: 'Documentation hub with Quick Start, Concepts, API overview, Webhooks, Security, and FAQ.',
    status: 'done',
    eta: 'Shipped',
    theme: 'Templates',
    tags: ['Docs', 'DX'],
    link: '/resources/docs',
    votes: 234,
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

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Resources', item: `${siteUrl}/resources` },
    { '@type': 'ListItem', position: 3, name: 'Roadmap', item: pageUrl },
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
            Learn more
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
      <Script id="ld-breadcrumb" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="bg-slate-950 text-slate-200">
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-20 sm:pt-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-widest text-slate-400">Resources</p>
              <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Roadmap - what we are building next</h1>
              <p className="mt-4 text-lg text-slate-300">
                Here is the public roadmap for Build AI Startups. We ship in small, verifiable steps and record
                changes in the <Link href="/resources/changelog" className="text-sky-300 hover:underline">changelog</Link>.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#board" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400">
                  View the board
                </a>
                <Link href="/contact?subject=Roadmap%20feedback" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5">
                  Suggest a feature
                </Link>
              </div>
              <p className="mt-3 text-sm text-slate-400">Priorities: user value, ecosystem impact, technical leverage, safety</p>
            </div>
            <div className="relative">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50">
                <img src="/media/screens/roadmap-hero.png" alt="Roadmap overview" className="h-full w-full object-cover" />
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">Board view, Timeline, Status & ETA</p>
            </div>
          </div>
        </section>

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

        <section className="border-t border-white/10 bg-slate-900/40 py-14">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-semibold">Help shape the roadmap</h2>
            <p className="mt-2 text-slate-300">
              Tell us what you are building and we will optimize the Build loop for your outcomes.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link href="/contact?subject=Roadmap%20feedback" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400">
                Suggest a feature
              </Link>
              <Link href="/resources/changelog" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5">
                View changelog
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
