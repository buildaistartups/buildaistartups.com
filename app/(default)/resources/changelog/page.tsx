// app/(default)/resources/changelog/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const siteUrl = 'https://www.buildaistartups.com'
const pageUrl = `${siteUrl}/resources/changelog`
const ogImage = '/brand/og-default.png'

export const metadata: Metadata = {
  title: 'Changelog - Product updates & releases | Build AI Startups',
  description: 'Track all product updates, new features, and releases from Build AI Startups. See what shipped and what is coming next.',
  alternates: { canonical: pageUrl },
  openGraph: {
    type: 'website',
    url: pageUrl,
    title: 'Changelog - Product updates & releases | Build AI Startups',
    description: 'Product updates, new features, and releases from Build AI Startups.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Build AI Startups - Changelog' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Changelog - Product updates & releases | Build AI Startups',
    description: 'Product updates, new features, and releases from Build AI Startups.',
    images: [ogImage],
  },
}

type ReleaseType = 'major' | 'minor' | 'patch' | 'hotfix'
type ReleaseTheme = 'API' | 'Builder' | 'Ecosystem' | 'Marketplace' | 'Docs' | 'Integrity'

type ChangelogEntry = {
  id: string
  version: string
  title: string
  date: string
  type: ReleaseType
  theme: ReleaseTheme
  summary: string
  changes: {
    added?: string[]
    improved?: string[]
    fixed?: string[]
    removed?: string[]
  }
  breaking?: boolean
  migration?: string
}

const releases: ChangelogEntry[] = [
  {
    id: 'v1-2-0',
    version: '1.2.0',
    title: 'Templates & Build Score',
    date: '2025-01-15',
    type: 'minor',
    theme: 'Builder',
    summary: 'Launched production-ready templates and Build Score quality gates for automated validation.',
    changes: {
      added: [
        'SaaS Starter template with auth, billing, and analytics',
        'API Starter template with rate limiting and docs',
        'Build Score v1 with quality gates',
        'Automated license compatibility checks',
      ],
      improved: [
        'Spec DSL validation and error messages',
        'Code generation performance by 40%',
        'Template customization workflow',
      ],
      fixed: [
        'Edge case in authentication flow generation',
        'Stripe webhook signature validation',
        'TypeScript strict mode compatibility',
      ],
    },
    breaking: false,
  },
  {
    id: 'v1-1-5',
    version: '1.1.5',
    title: 'Ecosystem Cross-Promotions',
    date: '2025-01-08',
    type: 'patch',
    theme: 'Ecosystem',
    summary: 'Enabled cross-promotional features for startups built on the platform.',
    changes: {
      added: [
        'Partner microsite generation',
        'Shared feed integration',
        'Cross-promotion analytics dashboard',
      ],
      improved: [
        'Launch announcement automation',
        'Partner discovery algorithm',
      ],
      fixed: [
        'Feed synchronization timing issues',
        'Analytics tracking for partner clicks',
      ],
    },
    breaking: false,
  },
  {
    id: 'v1-1-0',
    version: '1.1.0',
    title: 'Docs Hub & Quick Start',
    date: '2024-12-20',
    type: 'minor',
    theme: 'Docs',
    summary: 'Comprehensive documentation hub with interactive quick start guide.',
    changes: {
      added: [
        'Interactive Quick Start tutorial',
        'Comprehensive API documentation',
        'Webhook reference and examples',
        'Security best practices guide',
        'FAQ section with search',
      ],
      improved: [
        'Navigation and content organization',
        'Code examples with syntax highlighting',
        'Mobile responsive design',
      ],
    },
    breaking: false,
  },
  {
    id: 'v1-0-0',
    version: '1.0.0',
    title: 'Platform Launch',
    date: '2024-12-01',
    type: 'major',
    theme: 'Builder',
    summary: 'Initial launch of the Build AI Startups platform with core Builder functionality.',
    changes: {
      added: [
        'Spec DSL for project definition',
        'Code generation engine',
        'GitHub integration',
        'Vercel deployment automation',
        'Basic analytics and monitoring',
      ],
    },
    breaking: false,
  },
]

const typeColor: Record<ReleaseType, string> = {
  major: 'bg-red-500/20 text-red-300 border-red-500/30',
  minor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  patch: 'bg-green-500/20 text-green-300 border-green-500/30',
  hotfix: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
}

const themeColor: Record<ReleaseTheme, string> = {
  Builder: 'from-violet-500 to-fuchsia-500',
  Ecosystem: 'from-teal-400 to-emerald-500',
  Marketplace: 'from-amber-400 to-orange-500',
  API: 'from-sky-400 to-indigo-500',
  Integrity: 'from-rose-400 to-red-500',
  Docs: 'from-cyan-400 to-blue-500',
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Resources', item: `${siteUrl}/resources` },
    { '@type': 'ListItem', position: 3, name: 'Changelog', item: pageUrl },
  ],
}

export default function ChangelogPage() {
  const latestRelease = releases[0]
  const majorReleases = releases.filter(r => r.type === 'major')
  const minorReleases = releases.filter(r => r.type === 'minor')

  return (
    <>
      <Script id="ld-breadcrumb" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="bg-slate-950 text-slate-200">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-20 sm:pt-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-widest text-slate-400">Resources</p>
              <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Changelog - what shipped</h1>
              <p className="mt-4 text-lg text-slate-300">
                Track all product updates, new features, and releases. We ship fast and document everything.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#releases" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400">
                  View releases
                </a>
                <Link href="/resources/roadmap" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5">
                  See roadmap
                </Link>
              </div>
              <p className="mt-3 text-sm text-slate-400">Latest: {latestRelease.version} - {latestRelease.title}</p>
            </div>
            <div className="relative">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50">
                <img src="/media/changelog/changelog-hero.png" alt="Changelog overview" className="h-full w-full object-cover" />
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">Release timeline and updates</p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <div className="grid gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4 text-center">
              <div className="text-2xl font-bold text-violet-400">{releases.length}</div>
              <div className="text-sm text-slate-400">Total Releases</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{minorReleases.length}</div>
              <div className="text-sm text-slate-400">New Features</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{majorReleases.length}</div>
              <div className="text-sm text-slate-400">Major Versions</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4 text-center">
              <div className="text-2xl font-bold text-orange-400">
                {releases.filter(r => r.breaking).length}
              </div>
              <div className="text-sm text-slate-400">Breaking Changes</div>
            </div>
          </div>
        </section>

        {/* Latest Release */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold mb-6">Latest release</h2>
          <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className={`rounded-full border px-3 py-1 text-sm font-medium ${typeColor[latestRelease.type]}`}>
                  {latestRelease.type}
                </span>
                <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${themeColor[latestRelease.theme]} px-3 py-1 text-xs font-medium text-white`}>
                  {latestRelease.theme}
                </div>
              </div>
              <div className="text-sm text-slate-400">
                {new Date(latestRelease.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {latestRelease.version} - {latestRelease.title}
            </h3>
            <p className="text-slate-300 mb-4">{latestRelease.summary}</p>
            
            {latestRelease.changes.added && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-green-300 mb-2">✨ Added</h4>
                <ul className="space-y-1">
                  {latestRelease.changes.added.map((item, i) => (
                    <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {latestRelease.changes.improved && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-blue-300 mb-2">🚀 Improved</h4>
                <ul className="space-y-1">
                  {latestRelease.changes.improved.map((item, i) => (
                    <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {latestRelease.changes.fixed && (
              <div>
                <h4 className="text-sm font-medium text-orange-300 mb-2">🐛 Fixed</h4>
                <ul className="space-y-1">
                  {latestRelease.changes.fixed.map((item, i) => (
                    <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* All Releases */}
        <section id="releases" className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6">All releases</h2>
          <div className="space-y-6">
            {releases.map((release) => (
              <div key={release.id} className="rounded-xl border border-white/10 bg-slate-900/40 p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full border px-3 py-1 text-sm font-medium ${typeColor[release.type]}`}>
                      {release.type}
                    </span>
                    <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${themeColor[release.theme]} px-3 py-1 text-xs font-medium text-white`}>
                      {release.theme}
                    </div>
                    {release.breaking && (
                      <span className="rounded-full border border-red-500/30 bg-red-500/20 px-3 py-1 text-xs font-medium text-red-300">
                        Breaking
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-slate-400">
                    {new Date(release.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">
                  {release.version} - {release.title}
                </h3>
                <p className="text-slate-300 mb-4">{release.summary}</p>

                <div className="grid gap-4 md:grid-cols-3">
                  {release.changes.added && (
                    <div>
                      <h4 className="text-sm font-medium text-green-300 mb-2">✨ Added</h4>
                      <ul className="space-y-1">
                        {release.changes.added.map((item, i) => (
                          <li key={i} className="text-sm text-slate-400">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {release.changes.improved && (
                    <div>
                      <h4 className="text-sm font-medium text-blue-300 mb-2">🚀 Improved</h4>
                      <ul className="space-y-1">
                        {release.changes.improved.map((item, i) => (
                          <li key={i} className="text-sm text-slate-400">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {release.changes.fixed && (
                    <div>
                      <h4 className="text-sm font-medium text-orange-300 mb-2">🐛 Fixed</h4>
                      <ul className="space-y-1">
                        {release.changes.fixed.map((item, i) => (
                          <li key={i} className="text-sm text-slate-400">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {release.migration && (
                  <div className="mt-4 p-3 rounded-lg border border-yellow-500/30 bg-yellow-500/10">
                    <h4 className="text-sm font-medium text-yellow-300 mb-1">Migration required</h4>
                    <p className="text-sm text-slate-300">{release.migration}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Subscribe */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-8 text-center">
            <h2 className="text-2xl font-semibold mb-2">Stay updated</h2>
            <p className="text-slate-300 mb-6">
              Get notified when we ship new features and updates.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link href="/contact?subject=Release%20notifications" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400">
                Subscribe to updates
              </Link>
              <Link href="/resources/roadmap" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5">
                View roadmap
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/10 bg-slate-900/40 py-14">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-semibold">Ready to build?</h2>
            <p className="mt-2 text-slate-300">
              Start using the latest features to build your next startup.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link href="/generate" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400">
                Start building
              </Link>
              <Link href="/product/builder" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5">
                How it works
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
