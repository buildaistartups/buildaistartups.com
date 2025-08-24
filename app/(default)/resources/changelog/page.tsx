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
  type Release,
  type SectionKey,
} from '@/lib/changelog'

const pageUrl = `${BASE_URL}/resources/changelog`
const ogImage = '/brand/og-default.png'

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
    'Release notes for HyperNova and Build AI Startups: Builder, Ecosystem, Marketplace, API, Docs.',
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
  return (
    <>
      <Script id="ld-breadcrumb" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Script id="ld-collection" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <Script id="ld-items" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

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
            <Link href="/resources/blog/rss.xml" className="rounded-lg border border-white/10 bg-slate-900/40 px-4 py-3 text-center text-sm hover:bg-white/5">
              RSS feed
            </Link>
            <a href="https://formspree.io/f/your-form-id" className="rounded-lg border border-white/10 bg-slate-900/40 px-4 py-3 text-center text-sm hover:bg-white/5">
              Subscribe by email
            </a>
            <Link href="/resources/blog" className="rounded-lg border border-white/10 bg-slate-900/40 px-4 py-3 text-center text-sm hover:bg-white/5">
              Read the blog
            </Link>
          </div>
        </section>

        {/* Feed */}
        <section id="feed" className="mx-auto max-w-6xl px-6 pb-8">
          <h2 className="text-2xl font-semibold">Releases</h2>
          <div className="mt-6 space-y-6">
            {releases.map((r) => (
              <article key={r.id} className="rounded-2xl border border-white/10 bg-slate-900/40 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`inline-flex items-center rounded-full bg-gradient-to-r ${themeChip[r.theme]} px-3 py-1 text-xs font-medium text-white`}>
                      {r.theme}
                    </div>
                    <Link href={`/resources/changelog/${r.id}`} className="text-lg font-semibold hover:underline">
                      {r.version}
                    </Link>
                  </div>
                  <time className="text-xs text-slate-400">{fmtDate(r.date)}</time>
                </div>
                <p className="mt-2 text-slate-300">{r.summary}</p>

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

                {r.links && r.links.length > 0 && (
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    {r.links.map((l) => (
                      <Link key={l.href} href={l.href} className="text-sm text-sky-300 hover:underline">
                        {l.label} →
                      </Link>
                    ))}
                    <Link href={`/resources/changelog/${r.id}`} className="text-sm text-sky-300 hover:underline">
                      Details →
                    </Link>
                  </div>
                )}
              </article>
            ))}
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
