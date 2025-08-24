// app/(default)/resources/changelog/[id]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import {
  getRelease,
  allReleases,
  BASE_URL,
  fmtDate,
  sectionTitle,
  themeChip,
  type SectionKey,
} from '@/lib/changelog'

type Params = { id: string }

export async function generateStaticParams() {
  return allReleases().map((r) => ({ id: r.id }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const r = getRelease(params.id)
  if (!r) return {}
  const url = `${BASE_URL}/resources/changelog/${r.id}`
  const ogImage = '/brand/og-default.png'
  return {
    title: `${r.version} — ${r.summary} | Changelog | Build AI Startups`,
    description: r.summary,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${r.version} — ${r.summary} | Build AI Startups`,
      description: r.summary,
      images: [{ url: ogImage, width: 1200, height: 630, alt: 'Build AI Startups — Changelog' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${r.version} — ${r.summary} | Build AI Startups`,
      description: r.summary,
      images: [ogImage],
    },
  }
}

export default function ReleasePage({ params }: { params: Params }) {
  const r = getRelease(params.id)
  if (!r) notFound()

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${r.version} — ${r.summary}`,
    datePublished: r.date,
    author: { '@type': 'Organization', name: 'Build AI Startups' },
    publisher: {
      '@type': 'Organization',
      name: 'Build AI Startups',
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/brand/logo-light.svg` },
    },
    mainEntityOfPage: `${BASE_URL}/resources/changelog/${r.id}`,
  }

  return (
    <>
      <Script id="ld-article" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <main className="bg-slate-950 text-slate-200">
        <section className="mx-auto max-w-3xl px-6 pb-10 pt-20 sm:pt-28">
          <Link href="/resources/changelog" className="text-sky-300 hover:underline">
            ← Back to changelog
          </Link>

          <div className="mt-4 flex items-center justify-between">
            <div className={`inline-flex items-center rounded-full bg-gradient-to-r ${themeChip[r.theme]} px-3 py-1 text-xs font-medium text-white`}>
              {r.theme}
            </div>
            <time className="text-xs text-slate-400">{fmtDate(r.date)}</time>
          </div>

          <h1 className="mt-3 text-3xl font-bold">{r.version}</h1>
          <p className="mt-2 text-slate-300">{r.summary}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {(Object.keys(r.sections) as SectionKey[])
              .filter((k) => r.sections[k] && r.sections[k]!.length > 0)
              .map((k) => (
                <div key={k} className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
                  <div className="text-xs font-semibold tracking-wide text-slate-200">{sectionTitle[k]}</div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
                    {r.sections[k]!.map((li, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: li }} />
                    ))}
                  </ul>
                </div>
              ))}
          </div>

          {r.links && r.links.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {r.links.map((l) => (
                <Link key={l.href} href={l.href} className="text-sm text-sky-300 hover:underline">
                  {l.label} →
                </Link>
              ))}
            </div>
          )}

          <div className="mt-10 border-t border-white/10 pt-6">
            <div className="text-sm text-slate-400">
              Want to see what’s next?{' '}
              <Link href="/resources/roadmap" className="text-sky-300 hover:underline">
                Check the roadmap
              </Link>
              .
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
