import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const siteUrl = 'https://www.buildaistartups.com'
const pageUrl = `${siteUrl}/resources/templates`
const ogImage = '/og/resources-templates.png'

// -------------------- SEO --------------------
export const metadata: Metadata = {
  title: 'Templates — SaaS, API, Content & Growth kits | Build AI Startups',
  description:
    'Production-ready starter kits for Build AI Startups: SaaS, API, Content/Docs, and Growth templates with pricing, auth, analytics, and tests pre-wired.',
  alternates: { canonical: pageUrl },
  openGraph: {
    type: 'website',
    url: pageUrl,
    title: 'Templates — SaaS, API, Content & Growth kits | Build AI Startups',
    description:
      'Pick a template, customize the Spec, and Build AI Startups ships a repo with CI/tests, pricing, analytics, and docs.',
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
    'Production-ready starter templates for Build AI Startups: SaaS, API, Content/Docs, Growth, and AI components.',
}

const templates = [
  {
    slug: 'saas-starter',
    name: 'SaaS Starter',
    summary:
      'Auth, teams, billing, entitlements, onboarding, settings, and email — production scaffold for B2B SaaS.',
    tags: ['SaaS', 'Stripe', 'Auth', 'Teams'],
    preview: '/images/resources/templates/saas-starter.svg',
    score: 92,
    route: '/generate?template=saas-starter',
    category: 'SaaS',
    icon: '⬢︎',
    featured: true,
  },
  {
    slug: 'api-starter',
    name: 'API Starter',
    summary:
      'Public API with keys, usage metering, rate limits, docs site, and examples. Ready for dev-tool products.',
    tags: ['API', 'Docs', 'Rate limits'],
    preview: '/images/resources/templates/api-starter.svg',
    score: 89,
    route: '/generate?template=api-starter',
    category: 'API',
    icon: '⚡︎',
    featured: true,
  },
  {
    slug: 'content-docs',
    name: 'Content & Docs',
    summary:
      'Docs engine, changelog, blog, and programmatic SEO clusters; MDX-ready with sitemap & OpenGraph.',
    tags: ['Content', 'SEO', 'Docs'],
    preview: '/images/resources/templates/content-docs.svg',
    score: 87,
    route: '/generate?template=content-docs',
    category: 'Content',
    icon: '▤︎',
    featured: true,
  },
  {
    slug: 'growth-microsite',
    name: 'Growth Microsite',
    summary:
      'High-converting landing with A/B hero, pricing experiments, social assets, and email capture wired.',
    tags: ['Growth', 'A/B', 'Landing'],
    preview: '/images/resources/templates/growth-microsite.svg',
    score: 85,
    route: '/generate?template=growth-microsite',
    category: 'Growth',
    icon: '▲︎',
  },
  {
    slug: 'ai-assistant-widget',
    name: 'AI Assistant Widget',
    summary:
      'Embeddable chat widget with guardrails, docs context, analytics, and feedback loops.',
    tags: ['AI', 'Widget', 'Analytics'],
    preview: '/images/resources/templates/ai-widget.svg',
    score: 86,
    route: '/generate?template=ai-assistant-widget',
    category: 'AI',
    icon: '◉︎',
  },
  {
    slug: 'stripe-subscriptions',
    name: 'Stripe Subscriptions Kit',
    summary:
      'Stripe products/prices wiring, webhooks, customer portal, invoices, and dunning flows.',
    tags: ['Stripe', 'Billing', 'SaaS'],
    preview: '/images/resources/templates/stripe-kit.svg',
    score: 88,
    route: '/generate?template=stripe-subscriptions',
    category: 'SaaS',
    icon: '▣︎',
  },
  {
    slug: 'support-inbox-ai',
    name: 'Support Inbox AI',
    summary:
      'Shared inbox + AI summaries and canned responses; roles, tags, and satisfaction metrics.',
    tags: ['SaaS', 'AI', 'Support'],
    preview: '/images/resources/templates/support-inbox.svg',
    score: 84,
    route: '/generate?template=support-inbox-ai',
    category: 'SaaS',
    icon: '◈︎',
  },
  {
    slug: 'programmatic-seo-blog',
    name: 'Programmatic SEO Blog',
    summary:
      'Clustered content generator with schema, internal linking, and search-intent briefs.',
    tags: ['Content', 'SEO'],
    preview: '/images/resources/templates/seo-blog.svg',
    score: 83,
    route: '/generate?template=programmatic-seo-blog',
    category: 'Content',
    icon: '◐︎',
  },
  {
    slug: 'customer-portal',
    name: 'Customer Portal',
    summary:
      'Self-serve billing, usage, invoices, entitlements, and team management for your users.',
    tags: ['SaaS', 'Stripe', 'Portal'],
    preview: '/images/resources/templates/customer-portal.svg',
    score: 82,
    route: '/generate?template=customer-portal',
    category: 'SaaS',
    icon: '◯︎',
  },
  {
    slug: 'data-reporting-kit',
    name: 'Data Reporting Kit',
    summary:
      'Analytics dashboards, cohorts, and funnels; PostHog/Plausible wiring and weekly readouts.',
    tags: ['Analytics', 'Dashboards'],
    preview: '/images/resources/templates/reporting-kit.svg',
    score: 81,
    route: '/generate?template=data-reporting-kit',
    category: 'Analytics',
    icon: '▤︎',
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
      name: 'Do I need a template to build with Build AI Startups?',
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
  const featuredTemplates = templates.filter(t => t.featured)
  const categories = [...new Set(templates.map(t => t.category))]

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
                Choose a production-ready starter kit, customize the Spec, and Build AI Startups will ship a repo with CI/tests,
                pricing, analytics, and docs. <em>You own everything.</em>
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#catalog" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400 transition-colors">
                  <span className="text-blue-400 mr-2">▣︎</span> Browse templates
                </a>
                <Link href="/generate" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5 transition-colors">
                  <span className="text-blue-400 mr-2">⚡︎</span> Use a template
                </Link>
              </div>
              <p className="mt-3 text-sm text-slate-400">SaaS · API · Content/Docs · Growth · AI components</p>
            </div>
            <div className="relative">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50 p-6">
                <img 
                  src="/images/resources/templates/hero.svg" 
                  alt="Template gallery interface showing various starter kit options" 
                  className="h-full w-full object-contain"
                  loading="eager"
                />
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">Pick a kit → customize Spec → build & deploy</p>
            </div>
          </div>

          {/* Template Categories Overview */}
          <div className="mt-10 mb-6">
            <img src="/images/resources/templates/categories.svg" alt="Template categories overview" className="w-full h-32 object-contain" />
          </div>

          {/* Stats */}
          <div className="mt-10 grid gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4 text-center hover:border-violet-500/30 transition-colors">
              <div className="text-2xl font-bold text-violet-400">{templates.length}</div>
              <div className="text-sm text-slate-400">Templates</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4 text-center hover:border-blue-500/30 transition-colors">
              <div className="text-2xl font-bold text-blue-400">{categories.length}</div>
              <div className="text-sm text-slate-400">Categories</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4 text-center hover:border-teal-500/30 transition-colors">
              <div className="text-2xl font-bold text-teal-400">
                {Math.round(templates.reduce((sum, t) => sum + t.score, 0) / templates.length)}
              </div>
              <div className="text-sm text-slate-400">Avg Build Score</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4 text-center hover:border-green-500/30 transition-colors">
              <div className="text-2xl font-bold text-green-400">MIT</div>
              <div className="text-sm text-slate-400">License</div>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-violet-500/50 bg-violet-500/20 px-3 py-1 text-sm text-violet-300 font-medium">
              All
            </span>
            {categories.map((category) => (
              <span key={category} className="rounded-full border border-white/10 bg-slate-900/40 px-3 py-1 text-sm text-slate-300 hover:border-violet-500/30 hover:bg-violet-500/10 transition-colors cursor-pointer">
                {category}
              </span>
            ))}
            <div className="ml-auto">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/40 px-3 py-1.5">
                <svg width="16" height="16" fill="none" stroke="currentColor" className="text-slate-500" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  aria-label="Search templates"
                  placeholder="Search templates"
                  className="bg-transparent text-sm outline-none placeholder:text-slate-500 w-32"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Featured</h2>
            <div className="text-sm text-slate-400">Most popular starters</div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredTemplates.map((t) => (
              <div key={t.slug} id={t.slug} className="group rounded-2xl border border-white/10 bg-slate-900/40 p-4 hover:border-violet-500/30 transition-all duration-300">
                <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-slate-900/50 mb-4">
                  <img 
                    src={t.preview} 
                    alt={`${t.name} preview interface`} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-blue-400">{t.icon}</span>
                    <div className="text-base font-semibold group-hover:text-violet-300 transition-colors">{t.name}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <div className="text-xs text-slate-400">{t.score}</div>
                  </div>
                </div>
                <p className="text-sm text-slate-400 mb-3 leading-relaxed">{t.summary}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {t.tags.map((x) => (
                    <span key={x} className="rounded-md border border-white/10 bg-slate-950/40 px-2 py-0.5 text-xs text-slate-300">
                      {x}
                    </span>
                  ))}
                </div>
                <Link href={t.route} className="inline-flex items-center text-violet-400 hover:text-violet-300 transition-colors">
                  Use this template →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Code Generation Process */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <div className="mb-6">
            <img src="/images/resources/templates/code-generation.svg" alt="Code generation process" className="w-full h-32 object-contain" />
          </div>
        </section>

        {/* Catalog */}
        <section id="catalog" className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">All templates</h2>
            <div className="text-sm text-slate-400">{templates.length} total</div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((t) => (
              <div key={t.slug} id={t.slug} className="group rounded-2xl border border-white/10 bg-slate-900/40 p-4 hover:border-violet-500/30 transition-all duration-300">
                <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-slate-900/50 mb-4">
                  <img 
                    src={t.preview} 
                    alt={`${t.name} preview interface`} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-blue-400">{t.icon}</span>
                    <div className="text-base font-semibold group-hover:text-violet-300 transition-colors">{t.name}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <div className="text-xs text-slate-400">{t.score}</div>
                  </div>
                </div>
                <p className="text-sm text-slate-400 mb-3 leading-relaxed">{t.summary}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {t.tags.map((x) => (
                    <span key={x} className="rounded-md border border-white/10 bg-slate-950/40 px-2 py-0.5 text-xs text-slate-300">
                      {x}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <Link href={t.route} className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-400 transition-colors">
                    Use template
                  </Link>
                  <Link href={`/resources/templates/${t.slug}`} className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                    Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 mb-4">
              Want something specific?{' '}
              <Link href="/resources/roadmap" className="text-violet-400 hover:text-violet-300 transition-colors">
                Request a template
              </Link>
              {' '}or{' '}
              <Link href="/contact" className="text-violet-400 hover:text-violet-300 transition-colors">
                contact partnerships
              </Link>
              .
            </p>
          </div>
        </section>

        {/* How templates work */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold mb-6">How templates work</h2>
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: 'Select a template',
                    desc: 'Choose from production-ready starters with pre-configured best practices',
                    icon: '▣︎'
                  },
                  {
                    step: 2,
                    title: 'Customize the Spec',
                    desc: 'Edit ICP, features, data model, pricing, and integrations to fit your needs',
                    icon: '⚙︎'
                  },
                  {
                    step: 3,
                    title: 'Build & Deploy',
                    desc: 'Run the loop: repo → UI/copy → docs → pricing → deploy → experiments',
                    icon: '⚡︎'
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 p-4 rounded-xl border border-white/10 bg-slate-950/40 hover:border-violet-500/30 transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center text-sm font-medium text-white">
                      {item.step}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg text-blue-400">{item.icon}</span>
                        <div className="font-medium text-slate-200">{item.title}</div>
                      </div>
                      <div className="text-sm text-slate-400">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl border border-blue-500/30 bg-blue-500/10">
                <h3 className="font-medium text-blue-300 mb-2">What's included:</h3>
                <ul className="space-y-1 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    CI/tests, performance budgets, and license checks
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    Deployments on your infra (GitHub/Vercel/Stripe/etc.)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    Re-run capability that preserves your edits
                  </li>
                </ul>
              </div>

              <div className="mt-6 flex gap-3">
                <Link href="/product/builder" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5 transition-colors">
                  <span className="text-blue-400 mr-2">⚒︎</span> See the Builder
                </Link>
                <Link href="/generate" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400 transition-colors">
                  <span className="text-blue-400 mr-2">⚡︎</span> Start with a template
                </Link>
              </div>
            </div>

            {/* Spec DSL snippet */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl text-blue-400">▣︎</span>
                <div className="text-sm font-medium text-slate-200">Spec DSL (excerpt)</div>
              </div>
              <pre className="overflow-auto rounded-lg border border-white/10 bg-slate-950/60 p-4 text-xs text-slate-300 mb-4">
{`spec:
  name: "SaaS Starter"
  icp: "B2B teams needing subscriptions, auth, and analytics"
  stack: { 
    framework: "nextjs", 
    language: "ts", 
    ui: "tailwind+shadcn" 
  }
  modules:
    - auth: { 
        provider: "email+oauth", 
        roles: ["owner","admin","member"] 
      }
    - billing: { 
        provider: "stripe", 
        plans: ["Free","Pro","Team"] 
      }
    - analytics: { provider: "plausible" }
  routes:
    - "/": { 
        type: "landing", 
        variants: 2, 
        goal: "signup" 
      }
    - "/pricing": { 
        experiments: ["pricePoints","ctaCopy"] 
      }
    - "/dashboard": { gated: true }
  quality:
    tests: { unit: true, smoke: true }
    performance: { lighthouseMin: 90 }
    licenses: { allow: ["MIT","Apache-2.0"] }`}
              </pre>
              <p className="text-xs text-slate-500 leading-relaxed">
                The Builder consumes this Spec to generate code, content, and configurations — then validates via quality gates.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-white/10 bg-slate-900/50 p-6">
            <img 
              src="/images/resources/templates/workflow.svg" 
              alt="Template workflow visualization showing selection to deployment process" 
              className="w-full h-auto rounded-lg"
              loading="lazy"
            />
          </div>
        </section>

        {/* Template Customization */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <div className="mb-6">
            <img src="/images/resources/templates/customization.svg" alt="Template customization interface" className="w-full h-32 object-contain" />
          </div>
        </section>

        {/* Build Scores */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6">Build Score breakdown</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl text-blue-400">◎︎</span>
                <div className="text-base font-medium">Quality gates</div>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Tests & Coverage', weight: '25%', desc: 'Unit, integration, and smoke tests' },
                  { name: 'Security Scans', weight: '25%', desc: 'Dependency and SAST analysis' },
                  { name: 'Performance', weight: '20%', desc: 'Lighthouse scores and bundle size' },
                  { name: 'Code Quality', weight: '20%', desc: 'Lint, types, and formatting' },
                  { name: 'Licenses', weight: '10%', desc: 'License compatibility checks' },
                ].map((item) => (
                  <div key={item.name} className="flex justify-between items-center p-3 rounded-lg border border-white/10 bg-slate-950/40">
                    <div>
                      <div className="text-sm font-medium text-slate-200">{item.name}</div>
                      <div className="text-xs text-slate-400">{item.desc}</div>
                    </div>
                    <div className="text-sm font-medium text-violet-400">{item.weight}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
              <img 
                src="/images/resources/templates/build-score.svg" 
                alt="Build score badges and quality indicators" 
                className="w-full h-auto rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Quality Gates */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <div className="mb-6">
            <img src="/images/resources/templates/quality-gates.svg" alt="Quality gates system" className="w-full h-32 object-contain" />
          </div>
        </section>

        {/* Licensing & versioning */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6">Licensing & versioning</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-green-400 text-xl">▣︎</span>
                <div className="text-base font-medium text-green-300">License</div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Templates ship under a permissive license (MIT-like) appropriate for commercial use. Dependencies retain their original licenses.
                The PR includes a license summary in the repo.
              </p>
            </div>
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-blue-400 text-xl">↻︎</span>
                <div className="text-base font-medium text-blue-300">Versioning</div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Each template has a semantic version. When an update is available, you can diff changes and selectively merge using the Builder.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6">Templates FAQ</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                q: 'Can I mix templates?',
                a: 'Yes. Start with one, then add modules from another (e.g., add API Starter to SaaS).',
                icon: '↻︎'
              },
              {
                q: 'Do templates lock me in?',
                a: 'No. You own the repo and infra; templates are just scaffolds to accelerate shipping.',
                icon: '◯︎'
              },
              {
                q: 'Are there example datasets or fixtures?',
                a: 'Yes. Starters include seed data and fixtures for tests and preview deployments.',
                icon: '▤︎'
              },
              {
                q: 'How do I contribute a template?',
                a: 'We publish a spec and review checklist. Start at the roadmap or contact us.',
                icon: '◈︎'
              },
            ].map((faq, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-5 hover:border-violet-500/30 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="text-xl text-blue-400">{faq.icon}</div>
                  <div>
                    <h3 className="text-base font-medium text-slate-200 mb-2">{faq.q}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
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
              <Link href="/generate" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400 transition-colors">
                <span className="text-blue-400 mr-2">⚡︎</span> Use a template
              </Link>
              <Link href="/product/builder" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5 transition-colors">
                <span className="text-blue-400 mr-2">⚒︎</span> How the Builder works
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
