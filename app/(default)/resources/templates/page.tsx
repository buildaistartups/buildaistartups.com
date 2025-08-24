// app/(default)/resources/templates/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const siteUrl = 'https://www.buildaistartups.com'
const pageUrl = `${siteUrl}/resources/templates`
const ogImage = '/brand/og-default.png'

// -------------------- SEO --------------------
export const metadata: Metadata = {
  title: 'Templates — SaaS, API, Content & Growth kits | Build AI Startups',
  description:
    'Production-ready starter kits for HyperNova: SaaS, API, Content/Docs, and Growth templates with pricing, auth, analytics, and tests pre-wired.',
  alternates: { canonical: pageUrl },
  openGraph: {
    type: 'website',
    url: pageUrl,
    title: 'Templates — SaaS, API, Content & Growth kits | Build AI Startups',
    description:
      'Pick a template, customize the Spec, and HyperNova ships a repo with CI/tests, pricing, analytics, and docs.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Build AI Startups — Templates' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Templates — SaaS, API, Content & Growth kits | Build AI Startups',
    description:
      'Starter kits for rapid venture creation: SaaS, API, Content/Docs, and Growth. Build loops with quality gates.',
    images: [ogImage],
  },
}

// -------------------- JSON-LD --------------------
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Resources', item: `${siteUrl}/resources` },
    { '@type': 'ListItem', position: 3, name: 'Templates', item: pageUrl },
  ],
}

const collectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Build AI Startups — Templates',
  url: pageUrl,
  description:
    'Production-ready starter templates for HyperNova: SaaS, API, Content/Docs, Growth, and AI components.',
}

const templates = [
  {
    slug: 'saas-starter',
    name: 'SaaS Starter',
    summary:
      'Auth, teams, billing, entitlements, onboarding, settings, and email — production scaffold for B2B SaaS.',
    tags: ['SaaS', 'Stripe', 'Auth', 'Teams'],
    preview: '/media/templates/saas-starter.png',
    score: 92,
    route: '/generate?template=saas-starter',
  },
  {
    slug: 'api-starter',
    name: 'API Starter',
    summary:
      'Public API with keys, usage metering, rate limits, docs site, and examples. Ready for dev-tool products.',
    tags: ['API', 'Docs', 'Rate limits'],
    preview: '/media/templates/api-starter.png',
    score: 89,
    route: '/generate?template=api-starter',
  },
  {
    slug: 'content-docs',
    name: 'Content & Docs',
    summary:
      'Docs engine, changelog, blog, and programmatic SEO clusters; MDX-ready with sitemap & OpenGraph.',
    tags: ['Content', 'SEO', 'Docs'],
    preview: '/media/templates/content-docs.png',
    score: 87,
    route: '/generate?template=content-docs',
  },
  {
    slug: 'growth-microsite',
    name: 'Growth Microsite',
    summary:
      'High-converting landing with A/B hero, pricing experiments, social assets, and email capture wired.',
    tags: ['Growth', 'A/B', 'Landing'],
    preview: '/media/templates/growth-microsite.png',
    score: 85,
    route: '/generate?template=growth-microsite',
  },
  {
    slug: 'ai-assistant-widget',
    name: 'AI Assistant Widget',
    summary:
      'Embeddable chat widget with guardrails, docs context, analytics, and feedback loops.',
    tags: ['AI', 'Widget', 'Analytics'],
    preview: '/media/templates/ai-widget.png',
    score: 86,
    route: '/generate?template=ai-assistant-widget',
  },
  {
    slug: 'stripe-subscriptions',
    name: 'Stripe Subscriptions Kit',
    summary:
      'Stripe products/prices wiring, webhooks, customer portal, invoices, and dunning flows.',
    tags: ['Stripe', 'Billing', 'SaaS'],
    preview: '/media/templates/stripe-kit.png',
    score: 88,
    route: '/generate?template=stripe-subscriptions',
  },
  {
    slug: 'support-inbox-ai',
    name: 'Support Inbox AI',
    summary:
      'Shared inbox + AI summaries and canned responses; roles, tags, and satisfaction metrics.',
    tags: ['SaaS', 'AI', 'Support'],
    preview: '/media/templates/support-inbox.png',
    score: 84,
    route: '/generate?template=support-inbox-ai',
  },
  {
    slug: 'programmatic-seo-blog',
    name: 'Programmatic SEO Blog',
    summary:
      'Clustered content generator with schema, internal linking, and search-intent briefs.',
    tags: ['Content', 'SEO'],
    preview: '/media/templates/seo-blog.png',
    score: 83,
    route: '/generate?template=programmatic-seo-blog',
  },
  {
    slug: 'customer-portal',
    name: 'Customer Portal',
    summary:
      'Self-serve billing, usage, invoices, entitlements, and team management for your users.',
    tags: ['SaaS', 'Stripe', 'Portal'],
    preview: '/media/templates/customer-portal.png',
    score: 82,
    route: '/generate?template=customer-portal',
  },
  {
    slug: 'data-reporting-kit',
    name: 'Data Reporting Kit',
    summary:
      'Analytics dashboards, cohorts, and funnels; PostHog/Plausible wiring and weekly readouts.',
    tags: ['Analytics', 'Dashboards'],
    preview: '/media/templates/reporting-kit.png',
    score: 81,
    route: '/generate?template=data-reporting-kit',
  },
]

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: templates.map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${pageUrl}#${t.slug}`,
    name: t.name,
    description: t.summary,
  })),
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do I need a template to build with HyperNova?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Templates help you move faster with proven scaffolds, but you can start from an empty Spec and build from scratch.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I customize templates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can edit the Spec, tweak components, and re-run the loop. You own the repo, infra, and revenue.',
      },
    },
    {
      '@type': 'Question',
      name: 'What license applies to templates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Templates ship under a permissive license (MIT-like) for commercial use. Third-party dependencies retain their original licenses.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I contribute or request a template?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can request templates on the roadmap page or contribute via our GitHub once public. Featured contributions include attribution.',
      },
    },
  ],
}

export default function TemplatesPage() {
  return (
    <>
      {/* Structured Data */}
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
              <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Templates — hit the ground shipping</h1>
              <p className="mt-4 text-lg text-slate-300">
                Choose a production-ready starter kit, customize the Spec, and HyperNova will ship a repo with CI/tests,
                pricing, analytics, and docs. <em>You own everything.</em>
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#catalog" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400">
                  Browse templates
                </a>
                <Link href="/generate" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5">
                  Use a template
                </Link>
              </div>
              <p className="mt-3 text-sm text-slate-400">SaaS · API · Content/Docs · Growth · AI components</p>
            </div>
            <div className="relative">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50">
                <img src="/media/templates/templates-hero.png" alt="Template gallery preview" className="h-full w-full object-cover" />
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">Pick a kit → customize Spec → build & deploy</p>
            </div>
          </div>

          {/* Filters (UI only) */}
          <div className="mt-10 flex flex-wrap items-center gap-2">
            {['All', 'SaaS', 'API', 'Content', 'Growth', 'AI', 'Stripe', 'Analytics'].map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-slate-900/40 px-3 py-1 text-sm text-slate-300">
                {tag}
              </span>
            ))}
            <div className="ml-auto">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/40 px-3 py-1.5">
                <svg width="16" height="16" fill="currentColor" className="text-slate-500"><path d="M11 11l4 4m-2.5-6A4.5 4.5 0 1 1 1.5 8a4.5 4.5 0 0 1 11 0z"/></svg>
                <input
                  aria-label="Search templates"
                  placeholder="Search templates"
                  className="bg-transparent text-sm outline-none placeholder:text-slate-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold">Featured</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {templates.slice(0, 3).map((t) => (
              <a key={t.slug} id={t.slug} href={t.route} className="group rounded-2xl border border-white/10 bg-slate-900/40 p-4 hover:bg-white/5">
                <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-slate-900/50">
                  <img src={t.preview} alt={`${t.name} preview`} className="h-full w-full object-cover" />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-base font-semibold">{t.name}</div>
                  <div className="text-xs text-slate-400">Build Score {t.score}</div>
                </div>
                <p className="mt-1 text-sm text-slate-400">{t.summary}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {t.tags.map((x) => (
                    <span key={x} className="rounded-md border border-white/10 bg-slate-950/40 px-2 py-0.5 text-xs text-slate-300">
                      {x}
                    </span>
                  ))}
                </div>
                <div className="mt-3">
                  <span className="text-sky-300">Use this template →</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Catalog */}
        <section id="catalog" className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">All templates</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((t) => (
              <div key={t.slug} id={t.slug} className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
                <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-slate-900/50">
                  <img src={t.preview} alt={`${t.name} preview`} className="h-full w-full object-cover" />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-base font-semibold">{t.name}</div>
                  <div className="text-xs text-slate-400">Build Score {t.score}</div>
                </div>
                <p className="mt-1 text-sm text-slate-400">{t.summary}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {t.tags.map((x) => (
                    <span key={x} className="rounded-md border border-white/10 bg-slate-950/40 px-2 py-0.5 text-xs text-slate-300">
                      {x}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <Link href={t.route} className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-400">
                    Use template
                  </Link>
                  <Link href={`/resources/templates/${t.slug}`} className="text-sm text-sky-300 hover:underline">
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Want something specific? <Link href="/roadmap" className="text-sky-300 hover:underline">Request a template</Link> or{' '}
            <Link href="/contact" className="text-sky-300 hover:underline">contact partnerships</Link>.
          </p>
        </section>

        {/* How templates work */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid items-start gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold">How templates work</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-300">
                <li>Select a template and open the Spec pre-filled with best practices.</li>
                <li>Customize ICP, features, data model, pricing, and integrations.</li>
                <li>Run the loop: repo → UI/copy → docs → pricing → deploy → experiments.</li>
              </ol>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>CI/tests, performance budgets, and license checks are included.</li>
                <li>All deployments happen on your infra (GitHub/Vercel/Stripe/etc.).</li>
                <li>Re-run the loop anytime — the system preserves your edits.</li>
              </ul>
              <div className="mt-5 flex gap-3">
                <Link href="/product/builder" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5">
                  See the Builder
                </Link>
                <Link href="/generate" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400">
                  Start with a template
                </Link>
              </div>
            </div>

            {/* Spec DSL snippet */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <div className="text-sm font-medium text-slate-200">Spec DSL (excerpt)</div>
              <pre className="mt-2 overflow-auto rounded-lg border border-white/10 bg-slate-950/60 p-4 text-xs">
{`spec:
  name: "SaaS Starter"
  icp: "B2B teams needing subscriptions, auth, and analytics"
  stack: { framework: "nextjs", language: "ts", ui: "tailwind+shadcn" }
  modules:
    - auth: { provider: "email+oauth", roles: ["owner","admin","member"] }
    - billing: { provider: "stripe", plans: ["Free","Pro","Team"] }
    - analytics: { provider: "plausible" }
  routes:
    - "/": { type: "landing", variants: 2, goal: "signup" }
    - "/pricing": { experiments: ["pricePoints","ctaCopy"] }
    - "/dashboard": { gated: true }
  quality:
    tests: { unit: true, smoke: true }
    performance: { lighthouseMin: 90 }
    licenses: { allow: ["MIT","Apache-2.0"] }`}
              </pre>
              <p className="mt-2 text-xs text-slate-500">
                The Builder consumes this Spec to generate code, content, and configurations — then validates via gates.
              </p>
            </div>
          </div>
        </section>

        {/* Licensing & versioning */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Licensing & versioning</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
              <div className="text-base font-medium">License</div>
              <p className="mt-2 text-sm text-slate-300">
                Templates ship under a permissive license (MIT-like) appropriate for commercial use. Dependencies retain their original licenses.
                The PR includes a license summary in the repo.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
              <div className="text-base font-medium">Versioning</div>
              <p className="mt-2 text-sm text-slate-300">
                Each template has a semantic version. When an update is available, you can diff changes and selectively merge using the Builder.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Templates FAQ</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-base font-medium">Can I mix templates?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Yes. Start with one, then add modules from another (e.g., add API Starter to SaaS).
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">Do templates lock me in?</h3>
              <p className="mt-1 text-sm text-slate-300">
                No. You own the repo and infra; templates are just scaffolds to accelerate shipping.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">Are there example datasets or fixtures?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Yes. Starters include seed data and fixtures for tests and preview deployments.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">How do I contribute a template?</h3>
              <p className="mt-1 text-sm text-slate-300">
                We publish a spec and review checklist. Start at <Link href="/roadmap" className="text-sky-300 hover:underline">the roadmap</Link> or{' '}
                <Link href="/contact" className="text-sky-300 hover:underline">contact us</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/10 bg-slate-900/40 py-14">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-semibold">Start with a proven kit</h2>
            <p className="mt-2 text-slate-300">
              Pick a template, customize the Spec, and ship a live product this week.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link href="/generate" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400">
                Use a template
              </Link>
              <Link href="/product/builder" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5">
                How the Builder works
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
