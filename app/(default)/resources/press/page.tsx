// app/(default)/resources/press/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.buildaistartups.com'
const PAGE_URL = `${SITE_URL}/resources/press`
const OG = '/brand/og-default.png'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Press Kit — Build AI Startups | Build AI Startups',
  description:
    'Logos, product shots, founder bios, boilerplates, color & typography, and media-ready assets for Build AI Startups.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Press Kit — Build AI Startups',
    description:
      'Media-ready assets, boilerplates, screenshots, and contact for press & analysts.',
    images: [{ url: OG, width: 1200, height: 630, alt: 'Build AI Startups — Press Kit' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Press Kit — Build AI Startups',
    description:
      'Logos, screenshots, founder bios, and media assets for Build AI Startups.',
    images: [OG],
  },
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Build AI Startups',
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo-light.svg`,
  sameAs: [
    'https://x.com/buildaistartups',
    'https://github.com/buildaistartups',
    'https://www.linkedin.com/company/buildaistartups',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'media relations',
      email: 'press@buildaistartups.com',
      url: PAGE_URL,
      areaServed: 'Worldwide',
      availableLanguage: ['en'],
    },
  ],
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Resources', item: `${SITE_URL}/resources` },
    { '@type': 'ListItem', position: 3, name: 'Press Kit', item: PAGE_URL },
  ],
}

export default function PressPage() {
  return (
    <>
      <Script
        id="ld-org"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <Script
        id="ld-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="bg-slate-950 text-slate-200">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-20 sm:pt-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-widest text-slate-400">Resources</p>
              <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Press Kit</h1>
              <p className="mt-4 text-lg text-slate-300">
                Logos, screenshots, founder bios, boilerplates, and media-ready assets for{' '}
                <strong>Build AI Startups</strong>.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/brand/press-kit.zip"
                  className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400 transition-colors"
                >
                  📦 Download full kit (.zip)
                </Link>
                <a
                  href="mailto:press@buildaistartups.com?subject=Press%20inquiry"
                  className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5 transition-colors"
                >
                  📧 Contact press team
                </a>
              </div>
              <p className="mt-3 text-sm text-slate-400">
                Response target: &lt;24h · Embargoes honored · Briefings on request
              </p>
            </div>
            <div className="relative">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50 p-6">
                <img
                  src="/media/press/press-collage.png"
                  alt="Build AI Startups press kit visual collage showing logos, screenshots, and brand elements"
                  className="h-full w-full object-contain"
                  loading="eager"
                />
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">Collage: logos, product shots & founder</p>
            </div>
          </div>
        </section>

        {/* Fast facts */}
        <section className="mx-auto max-w-6xl px-6 pb-8">
          <h2 className="text-2xl font-semibold mb-6">Fast facts</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { k: 'Name', v: 'Build AI Startups', icon: '🏢' },
              { k: 'Category', v: 'Autonomous venture creation / AI DevOps', icon: '🤖' },
              { k: 'Status', v: 'Public alpha', icon: '🚀' },
              { k: 'Founded', v: '2025', icon: '📅' },
              { k: 'HQ', v: 'Remote-first, EU/Global', icon: '🌍' },
              { k: 'Ownership', v: 'Independent / founder-led', icon: '👤' },
            ].map((x) => (
              <div key={x.k} className="rounded-xl border border-white/10 bg-slate-900/40 p-4 hover:border-violet-500/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{x.icon}</span>
                  <div className="text-xs uppercase tracking-wider text-slate-400">{x.k}</div>
                </div>
                <div className="text-base font-medium">{x.v}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Boilerplates */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <h2 className="text-2xl font-semibold mb-6">Company boilerplate</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5 hover:border-violet-500/30 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-violet-400">📝</span>
                <div className="text-sm font-medium">25-word</div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Build AI Startups is an autonomous builder that turns a one-sentence intent into a production-ready
                micro-SaaS—spec, repo, UI, pricing, deploy, and growth.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5 hover:border-violet-500/30 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-blue-400">📄</span>
                <div className="text-sm font-medium">50-word</div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Build AI Startups automates the entire startup loop. From idea to live product, it generates specs,
                code, branding, pricing, docs, and launches—then runs experiments. Users own the repos, infra, and revenue;
                the platform powers the build and improvement engine.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5 hover:border-violet-500/30 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-green-400">📋</span>
                <div className="text-sm font-medium">100-word</div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Build AI Startups is a public platform that turns a one-sentence intent into a live product. Provide a brief or a niche;
                the system drafts the product spec, scaffolds the repo, builds the UI, wires authentication, billing, analytics, and SEO,
                generates docs and pricing, and deploys a live preview. It then runs growth experiments and ships improvements behind
                quality gates (tests, security, performance, licenses). Startups can cross-promote within an ecosystem to compound distribution.
                There's no lock-in: users retain GitHub, Vercel, database, and Stripe access.
              </p>
            </div>
          </div>
        </section>

        {/* Product snapshot */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold mb-6">Product snapshot</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">💡</span>
                <div className="text-sm uppercase tracking-wider text-slate-400">One-liner</div>
              </div>
              <p className="text-slate-200 mb-4">
                From intent to revenue—Build AI Startups designs, codes, brands, deploys, and grows micro-SaaS autonomously.
              </p>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">⚡</span>
                <div className="text-sm uppercase tracking-wider text-slate-400">Differentiators</div>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-violet-400 mt-1">•</span>
                  Full-loop autonomy (not just code snippets)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-400 mt-1">•</span>
                  Ecosystem cross-promotion between generated startups
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-400 mt-1">•</span>
                  Monetization-first (pricing, billing, growth experiments)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-400 mt-1">•</span>
                  No lock-in (you own code, infra, and revenue)
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🏗️</span>
                <div className="text-sm uppercase tracking-wider text-slate-400">Core Products</div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { t: 'Builder', d: 'Spec → repo → UI → docs → pricing → deploy', icon: '🚀' },
                  { t: 'Ecosystem', d: 'Cross-promos and shared surfaces that compound', icon: '🌐' },
                  { t: 'Marketplace', d: 'Diligence packs and transfer readiness', icon: '🏪' },
                  { t: 'API', d: 'Ideas, builds, experiments, and listings via API', icon: '⚡' },
                ].map((x) => (
                  <div key={x.t} className="rounded-xl border border-white/10 bg-slate-950/40 p-4 hover:border-violet-500/30 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{x.icon}</span>
                      <div className="text-sm font-medium">{x.t}</div>
                    </div>
                    <p className="text-xs text-slate-300">{x.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Logos */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold mb-6">Logos</h2>
          <p className="text-slate-300 text-sm mb-6">
            Use the full logo when space allows; use the mark for favicons and small placements.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { 
                title: 'Full logo (light)', 
                png: '/brand/logo-light.png', 
                svg: '/brand/logo-light.svg',
                desc: 'For dark backgrounds',
                bg: 'bg-slate-950'
              },
              { 
                title: 'Full logo (dark)', 
                png: '/brand/logo-dark.png', 
                svg: '/brand/logo-dark.svg',
                desc: 'For light backgrounds',
                bg: 'bg-slate-100'
              },
              { 
                title: 'Logomark', 
                png: '/brand/mark.png', 
                svg: '/brand/mark.svg',
                desc: 'Icon/favicon version',
                bg: 'bg-slate-950'
              },
            ].map((l) => (
              <div key={l.title} className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 hover:border-violet-500/30 transition-colors">
                <div className={`aspect-[16/7] overflow-hidden rounded-lg border border-white/10 ${l.bg} mb-3`}>
                  <img src={l.png} alt={l.title} className="h-full w-full object-contain p-4" loading="lazy" />
                </div>
                <div className="text-sm font-medium mb-1">{l.title}</div>
                <div className="text-xs text-slate-400 mb-3">{l.desc}</div>
                <div className="flex gap-3">
                  <Link href={l.svg} className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                    SVG
                  </Link>
                  <Link href={l.png} className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                    PNG
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/brand/press-kit.zip"
              className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 text-sm font-medium text-slate-200 hover:bg-white/5 transition-colors"
            >
              📦 Download all logos (.zip)
            </Link>
          </div>
        </section>

        {/* Colors & typography */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold mb-6">Color & typography</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🎨</span>
                <div className="text-sm uppercase tracking-wider text-slate-400">Brand Palette</div>
              </div>
              <div className="grid grid-cols-5 gap-3 mb-4">
                {[
                  { name: 'Primary', hex: '#7C3AED', desc: 'Main brand' },
                  { name: 'Indigo', hex: '#6366F1', desc: 'Secondary' },
                  { name: 'Teal', hex: '#14B8A6', desc: 'Accent' },
                  { name: 'Slate-950', hex: '#020617', desc: 'Dark bg' },
                  { name: 'Slate-200', hex: '#E2E8F0', desc: 'Light text' },
                ].map((c) => (
                  <div key={c.hex} className="text-center">
                    <div 
                      className="h-12 w-full rounded-md border border-white/10 mb-2" 
                      style={{ backgroundColor: c.hex }} 
                    />
                    <div className="text-[10px] font-medium text-slate-300">{c.name}</div>
                    <div className="text-[10px] text-slate-500">{c.hex}</div>
                  </div>
                ))}
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-violet-400 mt-1">•</span>
                  Prefer dark backgrounds; use light lockups on dark
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-400 mt-1">•</span>
                  Maintain contrast ratios for accessibility
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🔤</span>
                <div className="text-sm uppercase tracking-wider text-slate-400">Typography</div>
              </div>
              <div className="space-y-4">
                <div className="p-3 rounded-lg border border-white/10 bg-slate-950/40">
                  <div className="font-semibold text-slate-200" style={{ fontFamily: 'Inter' }}>Inter</div>
                  <div className="text-sm text-slate-400">UI & body copy</div>
                </div>
                <div className="p-3 rounded-lg border border-white/10 bg-slate-950/40">
                  <div className="font-mono font-semibold text-slate-200">JetBrains Mono</div>
                  <div className="text-sm text-slate-400">Code snippets & technical UI</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-300">
                Set generous letter-spacing in all-caps labels; keep headlines tight.
              </p>
            </div>
          </div>
        </section>

        {/* Screenshots & video */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold mb-6">Screenshots & video</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {[
              { t: 'Homepage', p: '/media/press/screen-home.png', icon: '🏠' },
              { t: 'Builder', p: '/media/press/screen-builder.png', icon: '🏗️' },
              { t: 'Ecosystem', p: '/media/press/screen-ecosystem.png', icon: '🌐' },
              { t: 'Marketplace', p: '/media/press/screen-marketplace.png', icon: '🏪' },
              { t: 'API', p: '/media/press/screen-api.png', icon: '⚡' },
              { t: 'Docs', p: '/media/press/screen-docs.png', icon: '📚' },
            ].map((s) => (
              <figure key={s.t} className="group overflow-hidden rounded-xl border border-white/10 bg-slate-900/40 hover:border-violet-500/30 transition-colors">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={s.p} 
                    alt={`${s.t} interface screenshot`} 
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    loading="lazy"
                  />
                </div>
                <figcaption className="flex items-center gap-2 px-3 py-2">
                  <span className="text-sm">{s.icon}</span>
                  <span className="text-xs text-slate-400">{s.t}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🎥</span>
                <div className="text-sm font-medium">3-minute overview (MP4)</div>
              </div>
              <div className="aspect-video rounded-lg border border-white/10 bg-slate-950/40 mb-3 overflow-hidden">
                <video
                  className="w-full h-full"
                  controls
                  poster="/media/press/video-poster.png"
                  src="/media/press/overview.mp4"
                  loading="lazy"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="text-xs text-slate-400">Downloadable, no narration version available on request.</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🎬</span>
                <div className="text-sm font-medium">B-roll & animation</div>
              </div>
              <p className="text-sm text-slate-300 mb-4">
                Request B-roll, logo animations, and overlay-safe UI loops for your coverage.
              </p>
              <a 
                href="mailto:press@buildaistartups.com?subject=B-roll%20request" 
                className="inline-flex items-center justify-center rounded-lg bg-violet-500/20 border border-violet-500/30 px-4 py-2 text-sm font-medium text-violet-300 hover:bg-violet-500/30 transition-colors"
              >
                Request B-roll
              </a>
            </div>
          </div>
        </section>

        {/* Founder bio & photos */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold mb-6">Founder bio & photos</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">👤</span>
                <div className="text-sm uppercase tracking-wider text-slate-400">Bio (short)</div>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                <strong>[Your Name]</strong> is the creator of Build AI Startups. Previously shipped
                developer tools and AI products used by thousands. Focused on compressing time-to-value in software creation.
              </p>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">📝</span>
                <div className="text-sm uppercase tracking-wider text-slate-400">Bio (long)</div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                [Your Name] is a builder focused on autonomous software systems. After leading projects across AI tooling and
                developer experience, they created Build AI Startups—a platform that turns a one-sentence intent into a live product with
                quality gates and a growth loop. The platform enables founders, teams, and investors to ship faster with ownership preserved.
                Based in Europe; working globally.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { t: 'Headshot (color)', p: '/media/press/founder-color.jpg', icon: '🎨' },
                { t: 'Headshot (b&w)', p: '/media/press/founder-bw.jpg', icon: '⚫' },
              ].map((f) => (
                <figure key={f.t} className="group overflow-hidden rounded-xl border border-white/10 bg-slate-900/40 hover:border-violet-500/30 transition-colors">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={f.p} 
                      alt={f.t} 
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="flex items-center gap-2 px-3 py-2">
                    <span className="text-sm">{f.icon}</span>
                    <span className="text-xs text-slate-400">{f.t}</span>
                  </figcaption>
                </figure>
              ))}
              <div className="flex gap-3">
                <Link href="/media/press/founder-color.jpg" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                  Color JPG
                </Link>
                <Link href="/media/press/founder-bw.jpg" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                  B&W JPG
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quotes */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold mb-6">Quotes</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <blockquote className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 hover:border-violet-500/30 transition-colors">
              <div className="text-4xl text-violet-400 mb-3">"</div>
              <p className="text-slate-200 mb-4 leading-relaxed">
                Most ideas die between inspiration and execution. Build AI Startups compresses that gap—from intent to live product—while
                keeping ownership with the builder.
              </p>
              <footer className="text-sm text-slate-400">— [Your Name], Founder</footer>
            </blockquote>
            <blockquote className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 hover:border-violet-500/30 transition-colors">
              <div className="text-4xl text-blue-400 mb-3">"</div>
              <p className="text-slate-200 mb-4 leading-relaxed">
                Instead of point tools, this is a full loop. It builds, ships, learns, and repeats. It's how software wants to be
                made now.
              </p>
              <footer className="text-sm text-slate-400">— Early user</footer>
            </blockquote>
          </div>
        </section>

        {/* Usage guidelines */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold mb-6">Usage guidelines</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-green-400 text-xl">✅</span>
                <div className="text-sm font-medium text-green-300">Do</div>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  Use provided SVG/PNG files—do not recreate the logo
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  Maintain clear space equal to the "B" height around the logo
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  Use light lockup on dark backgrounds; dark on light
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  Link the first mention to buildaistartups.com
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-red-400 text-xl">❌</span>
                <div className="text-sm font-medium text-red-300">Don't</div>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  Alter colors, stretch, rotate, or add effects
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  Place over low-contrast or busy backgrounds
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  Combine with other marks to form a new lockup
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Sample headlines & social copy */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold mb-6">Sample headlines & social copy</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">📰</span>
                <div className="text-sm uppercase tracking-wider text-slate-400">Headlines</div>
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="p-3 rounded-lg border border-white/10 bg-slate-950/40">
                  "Startups that build themselves: Build AI Startups launches the Builder."
                </li>
                <li className="p-3 rounded-lg border border-white/10 bg-slate-950/40">
                  "From intent to revenue: a full-loop autonomous engine for micro-SaaS."
                </li>
                <li className="p-3 rounded-lg border border-white/10 bg-slate-950/40">
                  "No lock-in AI: ship with your own repos, infra, and billing."
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">📱</span>
                <div className="text-sm uppercase tracking-wider text-slate-400">Social</div>
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="p-3 rounded-lg border border-white/10 bg-slate-950/40">
                  "We built a system that takes a one-line idea → live product (repo, UI, pricing, deploy). Meet the Builder: buildaistartups.com"
                </li>
                <li className="p-3 rounded-lg border border-white/10 bg-slate-950/40">
                  "Autonomous startups + ecosystem cross-promos. No lock-in. Try the Builder today: buildaistartups.com/generate"
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Press releases */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold mb-6">Press releases</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 hover:border-violet-500/30 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">📄</span>
                <div className="text-sm font-medium">Template (DOCX)</div>
              </div>
              <p className="text-sm text-slate-300 mb-4">
                Use this as a starting point; we can co-author an announcement.
              </p>
              <Link href="/brand/press-release-template.docx" className="inline-flex items-center text-violet-400 hover:text-violet-300 transition-colors">
                Download template →
              </Link>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 hover:border-violet-500/30 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">📋</span>
                <div className="text-sm font-medium">Sample: Public alpha</div>
              </div>
              <p className="text-sm text-slate-300 mb-4">Announces the v0.1 public alpha with Builder and quality gates.</p>
              <Link href="/brand/press-release-sample-alpha.pdf" className="inline-flex items-center text-violet-400 hover:text-violet-300 transition-colors">
                Download sample →
              </Link>
            </div>
          </div>
        </section>

        {/* Coverage & contact */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold mb-6">Coverage & contact</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">📺</span>
                <div className="text-sm uppercase tracking-wider text-slate-400">Selected coverage</div>
              </div>
              <div className="p-4 rounded-lg border border-white/10 bg-slate-950/40 text-center">
                <div className="text-slate-400 text-sm">Coming soon — launch week briefings</div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">📞</span>
                <div className="text-sm uppercase tracking-wider text-slate-400">Contact</div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-violet-400">📧</span>
                  <strong className="text-slate-300">Media:</strong>
                  <a href="mailto:press@buildaistartups.com" className="text-violet-400 hover:text-violet-300 transition-colors">
                    press@buildaistartups.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">💬</span>
                  <strong className="text-slate-300">General:</strong>
                  <a href="mailto:hello@buildaistartups.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                    hello@buildaistartups.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">🐦</span>
                  <strong className="text-slate-300">Social:</strong>
                  <a href="https://x.com/buildaistartups" className="text-green-400 hover:text-green-300 transition-colors">
                    @buildaistartups
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/10 bg-slate-900/40 py-14">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-semibold">See it in action</h2>
            <p className="mt-2 text-slate-300">Open the Builder and go from idea to live preview today.</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link
                href="/generate"
                className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400 transition-colors"
              >
                🚀 Generate now
              </Link>
              <Link
                href="/resources/templates"
                className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5 transition-colors"
              >
                📋 Use a template
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
