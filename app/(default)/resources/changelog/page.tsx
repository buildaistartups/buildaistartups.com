// app/(default)/resources/changelog/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import {
  allReleases,
  BASE_URL,
  fmtDate,
  sectionTitle,
  themeChip,
  type SectionKey,
} from '@/lib/changelog'

const pageUrl = `${BASE_URL}/resources/changelog`
const ogImage = '/brand/og-default.png'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Changelog — What shipped recently | Build AI Startups',
  description:
    'All notable changes to Build AI Startups: features, improvements, fixes, and security notes.',
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
      'Release notes for the Builder, Ecosystem, Marketplace, API, and Docs.',
    images: [ogImage],
  },
}

const releases = allReleases()

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Resources', item: `${BASE_URL}/resources` },
    { '@type': 'ListItem', position: 3, name: 'Changelog', item: pageUrl },
  ],
}
const collectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Build AI Startups — Changelog',
  url: pageUrl,
  description:
    'Release notes for Build AI Startups: Builder, Ecosystem, Marketplace, API, Docs.',
}
const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: releases.map((r, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: `${r.version} — ${r.summary}`,
    url: `${pageUrl}/${r.id}`,
  })),
}

export default function ChangelogPage() {
  const latestRelease = releases[0]
  const recentReleases = releases.slice(0, 5)

  return (
    <>
      <Script
        id="ld-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="ld-collection"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <Script
        id="ld-items"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <main className="bg-slate-950 text-slate-200">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-20 sm:pt-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-widest text-slate-400">Resources</p>
              <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Changelog — what shipped</h1>
              <p className="mt-4 text-lg text-slate-300">
                Every improvement to Build AI Startups. We track features, fixes, and security notes across
                the Builder, Ecosystem, Marketplace, API, and Docs.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#feed"
                  className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400 transition-colors"
                >
                  Jump to releases
                </a>
                <Link
                  href="/resources/roadmap"
                  className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5 transition-colors"
                >
                  View roadmap
                </Link>
              </div>
              <p className="mt-3 text-sm text-slate-400">Subscribe via RSS or email below</p>
            </div>
            <div className="relative">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50 p-6">
                <img
                  src="/media/screens/changelog-hero.png"
                  alt="Changelog interface showing release timeline and version history"
                  className="h-full w-full object-contain"
                  loading="eager"
                />
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">
                Dates, versions, and themed highlights
              </p>
            </div>
          </div>

          {/* Latest Release Highlight */}
          {latestRelease && (
            <div className="mt-12 rounded-2xl border border-violet-500/30 bg-gradient-to-r from-violet-500/10 to-blue-500/10 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="inline-flex items-center rounded-full bg-violet-500 px-3 py-1 text-xs font-medium text-white">
                  Latest
                </div>
                <h3 className="text-xl font-semibold">{latestRelease.version}</h3>
                <time className="text-sm text-slate-400">{fmtDate(latestRelease.date)}</time>
              </div>
              <p className="text-slate-300 mb-4">{latestRelease.summary}</p>
              <Link
                href={`/resources/changelog/${latestRelease.id}`}
                className="inline-flex items-center text-violet-400 hover:text-violet-300 transition-colors"
              >
                Read full release notes →
              </Link>
            </div>
          )}

          {/* Subscribe Options */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Link
              href="/resources/changelog/rss.xml"
              className="group rounded-lg border border-white/10 bg-slate-900/40 px-4 py-3 text-center text-sm hover:bg-white/5 hover:border-violet-500/30 transition-all"
            >
              <div className="text-lg mb-1">📡</div>
              <div className="font-medium">RSS Feed</div>
              <div className="text-xs text-slate-500">For developers</div>
            </Link>
            <a
              href="mailto:changelog-subscribe@buildaistartups.com?subject=Subscribe%20to%20changelog"
              className="group rounded-lg border border-white/10 bg-slate-900/40 px-4 py-3 text-center text-sm hover:bg-white/5 hover:border-violet-500/30 transition-all"
            >
              <div className="text-lg mb-1">📧</div>
              <div className="font-medium">Email Updates</div>
              <div className="text-xs text-slate-500">Weekly digest</div>
            </a>
            <Link
              href="/resources/blog"
              className="group rounded-lg border border-white/10 bg-slate-900/40 px-4 py-3 text-center text-sm hover:bg-white/5 hover:border-violet-500/30 transition-all"
            >
              <div className="text-lg mb-1">📝</div>
              <div className="font-medium">Blog Posts</div>
              <div className="text-xs text-slate-500">Deep dives</div>
            </Link>
          </div>
        </section>

        {/* Release Stats */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <div className="grid gap-6 sm:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4 text-center">
              <div className="text-2xl font-bold text-violet-400">{releases.length}</div>
              <div className="text-sm text-slate-400">Total Releases</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">
                {releases.filter(r => r.theme === 'feature').length}
              </div>
              <div className="text-sm text-slate-400">New Features</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4 text-center">
              <div className="text-2xl font-bold text-green-400">
                {releases.filter(r => r.theme === 'improvement').length}
              </div>
              <div className="text-sm text-slate-400">Improvements</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4 text-center">
              <div className="text-2xl font-bold text-orange-400">
                {releases.filter(r => r.theme === 'security').length}
              </div>
              <div className="text-sm text-slate-400">Security Updates</div>
            </div>
          </div>
        </section>

        {/* Release Feed */}
        <section id="feed" className="mx-auto max-w-6xl px-6 pb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Recent Releases</h2>
            <Link
              href="/resources/changelog/archive"
              className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
            >
              View all releases →
            </Link>
          </div>
          
          <div className="space-y-6">
            {recentReleases.map((r, index) => (
              <article
                key={r.id}
                className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 hover:border-violet-500/30 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`inline-flex items-center rounded-full bg-gradient-to-r ${themeChip[r.theme]} px-3 py-1 text-xs font-medium text-white`}
                    >
                      {r.theme}
                    </div>
                    <Link
                      href={`/resources/changelog/${r.id}`}
                      className="text-lg font-semibold hover:text-violet-300 transition-colors"
                    >
                      {r.version}
                    </Link>
                  </div>
                  <time className="text-xs text-slate-400">{fmtDate(r.date)}</time>
                </div>
                
                <p className="text-slate-300 mb-4">{r.summary}</p>

                <div className="grid gap-4 md:grid-cols-2">
                  {(Object.keys(r.sections) as SectionKey[])
                    .filter((k) => r.sections[k] && r.sections[k]!.length > 0)
                    .map((k) => (
                      <div
                        key={k}
                        className="rounded-xl border border-white/10 bg-slate-950/40 p-4"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="text-xs font-semibold tracking-wide text-slate-200">
                            {sectionTitle[k]}
                          </div>
                          <div className="text-xs text-slate-500">
                            ({r.sections[k]!.length})
                          </div>
                        </div>
                        <ul className="space-y-1 text-sm text-slate-300">
                          {r.sections[k]!.slice(0, 3).map((li, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-violet-400 mt-1.5 text-xs">•</span>
                              <span dangerouslySetInnerHTML={{ __html: li }} />
                            </li>
                          ))}
                          {r.sections[k]!.length > 3 && (
                            <li className="text-xs text-slate-500 italic">
                              +{r.sections[k]!.length - 3} more items
                            </li>
                          )}
                        </ul>
                      </div>
                    ))}
                </div>

                {r.links && r.links.length > 0 && (
                  <div className="mt-4 flex flex-wrap items-center gap-3 pt-3 border-t border-white/10">
                    {r.links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
                      >
                        {l.label} →
                      </Link>
                    ))}
                    <Link
                      href={`/resources/changelog/${r.id}`}
                      className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      Full details →
                    </Link>
                  </div>
                )}
              </article>
            ))}
          </div>

          {releases.length > 5 && (
            <div className="mt-8 text-center">
              <Link
                href="/resources/changelog/archive"
                className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5 transition-colors"
              >
                Load more releases
              </Link>
            </div>
          )}
        </section>

        {/* Release Categories */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6">What we track</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'New Features',
                desc: 'Major capabilities and product additions',
                icon: '🚀',
                color: 'from-violet-500 to-purple-500'
              },
              {
                title: 'Improvements',
                desc: 'Performance, UX, and quality enhancements',
                icon: '⚡',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                title: 'Bug Fixes',
                desc: 'Resolved issues and stability improvements',
                icon: '🔧',
                color: 'from-green-500 to-emerald-500'
              },
              {
                title: 'Security',
                desc: 'Security patches and vulnerability fixes',
                icon: '🛡️',
                color: 'from-orange-500 to-red-500'
              },
            ].map((category) => (
              <div
                key={category.title}
                className="rounded-xl border border-white/10 bg-slate-900/40 p-5 hover:border-violet-500/30 transition-all"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} mb-3`}>
                  <span className="text-xl">{category.icon}</span>
                </div>
                <h3 className="font-semibold mb-2">{category.title}</h3>
                <p className="text-sm text-slate-400">{category.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mx-auto max-w-6xl px-6 pb-12">
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="text-2xl font-semibold">Never miss an update</h2>
                <p className="mt-2 text-slate-300">
                  Get release notes delivered to your inbox. Weekly digest of new features, improvements, and fixes.
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  No spam. Unsubscribe anytime.
                </p>
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
                  className="h-11 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 text-sm outline-none placeholder:text-slate-500 focus:border-violet-500/50 transition-colors"
                />
                <button
                  type="submit"
                  className="h-11 whitespace-nowrap rounded-lg bg-violet-500 px-4 text-sm font-medium text-white hover:bg-violet-400 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/10 bg-slate-900/40 py-14">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-semibold">Build something your users love</h2>
            <p className="mt-2 text-slate-300">
              Open the Builder and go from idea to live preview today.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link
                href="/generate"
                className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400 transition-colors"
              >
                Generate now
              </Link>
              <Link
                href="/resources/templates"
                className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5 transition-colors"
              >
                Use a template
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
