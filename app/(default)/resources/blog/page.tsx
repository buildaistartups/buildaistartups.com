// app/(default)/resources/blog/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const siteUrl = 'https://www.buildaistartups.com'
const pageUrl = `${siteUrl}/resources/blog`
const ogImage = '/brand/og-default.png'

// ---------------- SEO ----------------
export const metadata: Metadata = {
  title: 'Blog — Build AI Startups (HyperNova)',
  description:
    'Deep dives, case studies, and release notes on autonomous venture creation. Learn how to go from intent to revenue with HyperNova.',
  alternates: { canonical: pageUrl },
  openGraph: {
    type: 'website',
    url: pageUrl,
    title: 'Blog — Build AI Startups (HyperNova)',
    description:
      'Insights on the Builder, Ecosystem effects, Marketplace diligence, and API automation.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Build AI Startups — Blog' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Build AI Startups (HyperNova)',
    description:
      'Essays, guides, and case studies about autonomous startups and the HyperNova build loop.',
    images: [ogImage],
  },
}

// -------------- Content --------------
type Post = {
  slug: string
  title: string
  excerpt: string
  date: string // ISO
  minutes: number
  tags: string[]
  cover: string
  featured?: boolean
}

const posts: Post[] = [
  {
    slug: 'from-intent-to-revenue-the-hypernova-loop',
    title: 'From Intent to Revenue: The HyperNova Build Loop',
    excerpt:
      'A step-by-step walkthrough of how a one-sentence idea becomes a production-ready micro-SaaS—spec, repo, UI, pricing, deploy, and growth.',
    date: '2025-08-02',
    minutes: 8,
    tags: ['Builder', 'Spec DSL', 'Autonomy'],
    cover: '/media/blog/loop-cover.png',
    featured: true,
  },
  {
    slug: 'spec-dsl-reproducible-startups',
    title: 'Spec DSL: Reproducible Startups',
    excerpt:
      'Why a structured product spec (ICP, UX, data, pricing, integrations) makes autonomous builds predictable and reviewable.',
    date: '2025-07-21',
    minutes: 7,
    tags: ['Spec DSL', 'Quality', 'DX'],
    cover: '/media/blog/spec-dsl-cover.png',
    featured: true,
  },
  {
    slug: 'build-score-and-quality-gates',
    title: 'Build Score & Quality Gates',
    excerpt:
      'How lint/types, tests, security scans, performance budgets, and license checks roll up into a single Build Score that governs Autopilot.',
    date: '2025-07-10',
    minutes: 6,
    tags: ['Integrity', 'Security', 'Performance'],
    cover: '/media/blog/build-score-cover.png',
  },
  {
    slug: 'ecosystem-effects-cross-promotion',
    title: 'Ecosystem Effects: Cross-Promotion Between Micro-SaaS',
    excerpt:
      'Generated products amplify each other via shared surfaces, partner microsites, and opt-in feeds—creating distribution that compounds.',
    date: '2025-06-24',
    minutes: 6,
    tags: ['Ecosystem', 'Growth'],
    cover: '/media/blog/ecosystem-cover.png',
  },
  {
    slug: 'marketplace-diligence-packs',
    title: 'Marketplace Diligence Packs: Trust at a Glance',
    excerpt:
      'Live demo links, Build Score history, telemetry, and transfer-readiness checklists reduce friction for acquisitions and licenses.',
    date: '2025-06-11',
    minutes: 5,
    tags: ['Marketplace', 'Investors'],
    cover: '/media/blog/marketplace-cover.png',
  },
  {
    slug: 'copilot-to-autopilot',
    title: 'Going from Copilot to Autopilot',
    excerpt:
      'When to require approvals and when to let the system ship changes automatically. A practical safety playbook.',
    date: '2025-05-30',
    minutes: 5,
    tags: ['Autonomy', 'Process'],
    cover: '/media/blog/copilot-autopilot-cover.png',
  },
  {
    slug: 'case-study-24h-micro-saas',
    title: 'Case Study: Shipping a Micro-SaaS in 24 Hours',
    excerpt:
      'We generated a working analytics product in one day. Here’s the spec, repo diff, experiments, and first user feedback.',
    date: '2025-05-12',
    minutes: 9,
    tags: ['Case Study', 'Builder', 'Growth'],
    cover: '/media/blog/case-study-cover.png',
  },
]

// -------------- Helpers --------------
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function uniqueTags() {
  const set = new Set<string>()
  posts.forEach((p) => p.tags.forEach((t) => set.add(t)))
  return Array.from(set).sort()
}

// -------------- JSON-LD --------------
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Resources', item: `${siteUrl}/resources` },
    { '@type': 'ListItem', position: 3, name: 'Blog', item: pageUrl },
  ],
}

const blogJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Build AI Startups — Blog',
  url: pageUrl,
  description:
    'Essays, case studies, and release notes about autonomous venture creation with HyperNova.',
  publisher: {
    '@type': 'Organization',
    name: 'Build AI Startups',
    url: siteUrl,
    logo: `${siteUrl}/brand/logo-light.svg`,
  },
}

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: posts.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${pageUrl}/${p.slug}`,
    name: p.title,
    description: p.excerpt,
  })),
}

// Site search (for the blog section)
const searchJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: pageUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${pageUrl}?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

export default function BlogIndex({
  searchParams,
}: {
  searchParams?: { q?: string; tag?: string }
}) {
  const q = (searchParams?.q || '').toString().trim().toLowerCase()
  const tag = (searchParams?.tag || '').toString().trim()

  const filtered = posts.filter((p) => {
    const matchesQ =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    const matchesTag = !tag || p.tags.includes(tag)
    return matchesQ && matchesTag
  })

  const featured = filtered.filter((p) => p.featured).slice(0, 2)
  const rest = filtered.filter((p) => !p.featured)

  const tags = uniqueTags()

  return (
    <>
      {/* JSON-LD */}
      <Script id="ld-breadcrumb" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Script id="ld-blog" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
      <Script id="ld-items" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <Script id="ld-search" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(searchJsonLd) }} />

      <main className="bg-slate-950 text-slate-200">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-20 sm:pt-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-widest text-slate-400">Resources</p>
              <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Blog — Ideas that ship</h1>
              <p className="mt-4 text-lg text-slate-300">
                Essays, playbooks, and case studies on autonomous startups. Everything we learn while building HyperNova and
                launching with the Builder, Ecosystem, Marketplace, and API.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#featured"
                  className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400"
                >
                  Read featured posts
                </a>
                <Link
                  href="/resources/docs"
                  className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5"
                >
                  Go to Docs
                </Link>
              </div>
              <p className="mt-3 text-sm text-slate-400">Case studies · Spec DSL · Build Score · Ecosystem · Marketplace</p>
            </div>
            <div className="relative">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50">
                <img src="/media/blog/blog-hero.png" alt="Blog hero" className="h-full w-full object-cover" />
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">Stories from the build loop</p>
            </div>
          </div>

          {/* Search + Tags */}
          <form className="mt-10 flex flex-wrap items-center gap-3" action="/resources/blog" method="get">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/40 px-3 py-1.5">
              <svg width="16" height="16" fill="currentColor" className="text-slate-500"><path d="M11 11l4 4m-2.5-6A4.5 4.5 0 1 1 1.5 8a4.5 4.5 0 0 1 11 0z"/></svg>
              <input
                name="q"
                defaultValue={q}
                placeholder="Search posts"
                className="bg-transparent text-sm outline-none placeholder:text-slate-500"
                aria-label="Search blog posts"
              />
            </div>
            <select
              name="tag"
              defaultValue={tag}
              className="rounded-lg border border-white/10 bg-slate-900/40 px-3 py-1.5 text-sm"
              aria-label="Filter by tag"
            >
              <option value="">All tags</option>
              {tags.map((t) => (
                <option value={t} key={t}>
                  {t}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-lg bg-violet-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-violet-400"
            >
              Apply
            </button>
            {(q || tag) && (
              <Link
                href="/resources/blog"
                className="text-sm text-sky-300 hover:underline"
                aria-label="Clear filters"
              >
                Clear
              </Link>
            )}
            <div className="ml-auto flex items-center gap-4 text-sm">
              <Link href="/resources/blog/rss.xml" className="text-slate-400 hover:text-slate-200">
                RSS
              </Link>
              <Link href="/contact?subject=Guest%20post%20proposal" className="text-slate-400 hover:text-slate-200">
                Write for us
              </Link>
            </div>
          </form>
        </section>

        {/* Featured */}
        {featured.length > 0 && (
          <section id="featured" className="mx-auto max-w-6xl px-6 py-8">
            <h2 className="text-2xl font-semibold">Featured</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {featured.map((p) => (
                <article key={p.slug} className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40">
                  <Link href={`/resources/blog/${p.slug}`}>
                    <div className="aspect-[16/9] w-full overflow-hidden border-b border-white/10 bg-slate-900/50">
                      <img src={p.cover} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-5">
                      <div className="text-xs text-slate-400">{formatDate(p.date)} • {p.minutes} min read</div>
                      <h3 className="mt-1 text-xl font-semibold">{p.title}</h3>
                      <p className="mt-1 text-sm text-slate-400">{p.excerpt}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span key={t} className="rounded-md border border-white/10 bg-slate-950/40 px-2 py-0.5 text-xs text-slate-300">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 text-sky-300">Read more →</div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* All posts */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">All posts ({filtered.length})</h2>
          {filtered.length === 0 ? (
            <p className="mt-4 text-slate-400">No posts match your filters.</p>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <article key={p.slug} className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40">
                  <Link href={`/resources/blog/${p.slug}`}>
                    <div className="aspect-[16/9] w-full overflow-hidden border-b border-white/10 bg-slate-900/50">
                      <img src={p.cover} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-5">
                      <div className="text-xs text-slate-400">{formatDate(p.date)} • {p.minutes} min read</div>
                      <h3 className="mt-1 text-lg font-semibold">{p.title}</h3>
                      <p className="mt-1 text-sm text-slate-400">{p.excerpt}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span key={t} className="rounded-md border border-white/10 bg-slate-950/40 px-2 py-0.5 text-xs text-slate-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Newsletter CTA */}
        <section className="mx-auto max-w-6xl px-6 pb-12">
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-semibold">Get the Build Feed</h2>
                <p className="mt-2 text-slate-300">
                  A short weekly email: shipped features, case studies, and practical tips for compressing time-to-value.
                </p>
                <p className="mt-2 text-xs text-slate-500">No spam. One-click unsubscribe.</p>
              </div>
              <form
                className="flex w-full items-center gap-2"
                action="https://formspree.io/f/your-form-id" // TODO: replace with your provider
                method="POST"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@company.com"
                  className="h-11 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 text-sm outline-none placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  className="h-11 whitespace-nowrap rounded-lg bg-violet-500 px-4 text-sm font-medium text-white hover:bg-violet-400"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Writing principles */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Our writing principles</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-3">
            {[
              { t: 'Show your work', d: 'Specs, diffs, metrics, and decisions—not just opinions.' },
              { t: 'Useful today', d: 'Every post should help you ship faster this week.' },
              { t: 'Honest tradeoffs', d: 'We document what failed so you can avoid it.' },
            ].map((x) => (
              <div key={x.t} className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
                <div className="text-base font-medium">{x.t}</div>
                <p className="mt-1 text-sm text-slate-400">{x.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/10 bg-slate-900/40 py-14">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-semibold">Put the ideas to work</h2>
            <p className="mt-2 text-slate-300">
              Open the Builder, generate your repo, and talk to real users this week.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link
                href="/generate"
                className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400"
              >
                Generate now
              </Link>
              <Link
                href="/resources/templates"
                className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5"
              >
                Start from a template
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
