// app/(default)/resources/press/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.buildaistartups.com'
const PAGE_URL = `${SITE_URL}/resources/press`
const OG = '/brand/og-default.png'

export const metadata: Metadata = {
  title: 'Press Kit — Build AI Startups (HyperNova)',
  description:
    'Logos, product shots, founder bios, boilerplates, color & typography, and media-ready assets for Build AI Startups (HyperNova).',
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
      'Logos, screenshots, founder bios, and media assets for Build AI Startups (HyperNova).',
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
                <strong>Build AI Startups</strong> (HyperNova).
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/brand/press-kit.zip"
                  className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400"
                >
                  Download full kit (.zip)
                </Link>
                <a
                  href="mailto:press@buildaistartups.com?subject=Press%20inquiry"
                  className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5"
                >
                  Contact press@buildaistartups.com
                </a>
              </div>
              <p className="mt-3 text-sm text-slate-400">
                Response target: &lt;24h · Embargoes honored · Briefings on request
              </p>
            </div>
            <div className="relative">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50">
                <img
                  src="/media/press/press-collage.png"
                  alt="Build AI Startups press visuals collage"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">Collage: logos, product shots & founder</p>
            </div>
          </div>
        </section>

        {/* Fast facts */}
        <section className="mx-auto max-w-6xl px-6 pb-4">
          <h2 className="text-2xl font-semibold">Fast facts</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { k: 'Name', v: 'Build AI Startups (HyperNova)' },
              { k: 'Category', v: 'Autonomous venture creation / AI DevOps' },
              { k: 'Status', v: 'Public alpha' },
              { k: 'Founded', v: '2025' },
              { k: 'HQ', v: 'Remote-first, EU/Global' },
              { k: 'Ownership', v: 'Independent / founder-led' },
            ].map((x) => (
              <div key={x.k} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="text-xs uppercase tracking-wider text-slate-400">{x.k}</div>
                <div className="mt-1 text-base">{x.v}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Boilerplates */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <h2 className="text-2xl font-semibold">Company boilerplate</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
              <div className="text-sm font-medium">25-word</div>
              <p className="mt-2 text-sm text-slate-300">
                Build AI Startups (HyperNova) is an autonomous engine that turns a one-sentence intent into a production-ready
                micro-SaaS—spec, repo, UI, pricing, deploy, and growth.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
              <div className="text-sm font-medium">50-word</div>
              <p className="mt-2 text-sm text-slate-300">
                Build AI Startups (HyperNova) automates the entire startup loop. From idea to live product, it generates specs,
                code, branding, pricing, docs, and launches—then runs experiments. Users own the repos, infra, and revenue;
                HyperNova powers the build and improvement engine.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
              <div className="text-sm font-medium">100-word</div>
              <p className="mt-2 text-sm text-slate-300">
                Build AI Startups is the public platform for HyperNova—an autonomous venture engine. Provide a one-sentence intent
                or a niche; HyperNova drafts the product spec, scaffolds the repo, builds the UI, wires authentication, billing,
                analytics, and SEO, generates docs and pricing, and deploys a live preview. It then runs growth experiments and
                ships improvements behind quality gates (tests, security, performance, licenses). Startups cross-promote within an
                ecosystem to compound distribution. There’s no lock-in: users retain GitHub, Vercel, database, and Stripe access.
                Builders launch faster; investors get diligence-ready assets. Startups that build themselves.
              </p>
            </div>
          </div>
        </section>

        {/* Product snapshot */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold">Product snapshot</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <div className="text-sm uppercase tracking-wider text-slate-400">One-liner</div>
              <p className="mt-2 text-slate-200">
                From intent to revenue—HyperNova designs, codes, brands, deploys, and grows micro-SaaS autonomously.
              </p>
              <div className="mt-4 text-sm uppercase tracking-wider text-slate-400">Differentiators</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-300">
                <li>Full-loop autonomy (not just code snippets)</li>
                <li>Ecosystem cross-promotion between generated startups</li>
                <li>Monetization-first (pricing, billing, growth experiments)</li>
                <li>No lock-in (you own code, infra, and revenue)</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { t: 'Builder', d: 'Spec → repo → UI → docs → pricing → deploy' },
                  { t: 'Ecosystem', d: 'Cross-promos and shared surfaces that compound' },
                  { t: 'Marketplace', d: 'Diligence packs and transfer readiness' },
                  { t: 'API', d: 'Ideas, builds, experiments, and listings via API' },
                ].map((x) => (
                  <div key={x.t} className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
                    <div className="text-sm font-medium">{x.t}</div>
                    <p className="mt-1 text-sm text-slate-300">{x.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Logos */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold">Logos</h2>
          <p className="mt-2 text-slate-300 text-sm">
            Use the full logo when space allows; use the mark for favicons and small placements.
          </p>
          <div className="mt-4 grid gap-6 md:grid-cols-3">
            {[
              { title: 'Full logo (light)', png: '/brand/logo-light.png', svg: '/brand/logo-light.svg' },
              { title: 'Full logo (dark)', png: '/brand/logo-dark.png', svg: '/brand/logo-dark.svg' },
              { title: 'Logomark', png: '/brand/mark.png', svg: '/brand/mark.svg' },
            ].map((l) => (
              <div key={l.title} className="rounded-2xl border border-white/10 bg-slate-900/40 p-5">
                <div className="aspect-[16/7] overflow-hidden rounded-lg border border-white/10 bg-slate-950/40">
                  <img src={l.png} alt={l.title} className="h-full w-full object-contain p-4" />
                </div>
                <div className="mt-3 text-sm font-medium">{l.title}</div>
                <div className="mt-2 flex gap-3">
                  <Link href={l.svg} className="text-sm text-sky-300 hover:underline">
                    SVG
                  </Link>
                  <Link href={l.png} className="text-sm text-sky-300 hover:underline">
                    PNG
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link
              href="/brand/press-kit.zip"
              className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 text-sm font-medium text-slate-200 hover:bg-white/5"
            >
              Download all logos (.zip)
            </Link>
          </div>
        </section>

        {/* Colors & typography */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold">Color & typography</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <div className="text-sm uppercase tracking-wider text-slate-400">Palette</div>
              <div className="mt-3 grid grid-cols-5 gap-3">
                {[
                  { name: 'Primary', hex: '#7C3AED' },
                  { name: 'Indigo', hex: '#6366F1' },
                  { name: 'Teal', hex: '#14B8A6' },
                  { name: 'Slate-950', hex: '#020617' },
                  { name: 'Slate-200', hex: '#E2E8F0' },
                ].map((c) => (
                  <div key={c.hex} className="text-center">
                    <div className="h-10 w-full rounded-md" style={{ backgroundColor: c.hex }} />
                    <div className="mt-1 text-[11px] text-slate-400">{c.name}</div>
                    <div className="text-[11px]">{c.hex}</div>
                  </div>
                ))}
              </div>
              <ul className="mt-4 list-disc pl-5 text-sm text-slate-300">
                <li>Prefer dark backgrounds; use light lockups on dark.</li>
                <li>Maintain contrast ratios for accessibility.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <div className="text-sm uppercase tracking-wider text-slate-400">Typefaces</div>
              <ul className="mt-3 text-sm text-slate-300">
                <li>
                  <strong>Inter</strong> — UI & body copy
                </li>
                <li>
                  <strong>JetBrains Mono</strong> — code snippets & technical UI
                </li>
              </ul>
              <p className="mt-3 text-sm text-slate-300">
                Set generous letter-spacing in all-caps labels; keep headlines tight.
              </p>
            </div>
          </div>
        </section>

        {/* Screenshots & video */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold">Screenshots & video</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: 'Homepage', p: '/media/press/screen-home.png' },
              { t: 'Builder', p: '/media/press/screen-builder.png' },
              { t: 'Ecosystem', p: '/media/press/screen-ecosystem.png' },
              { t: 'Marketplace', p: '/media/press/screen-marketplace.png' },
              { t: 'API', p: '/media/press/screen-api.png' },
              { t: 'Docs', p: '/media/press/screen-docs.png' },
            ].map((s) => (
              <figure key={s.t} className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/40">
                <img src={s.p} alt={s.t} className="h-full w-full object-cover" />
                <figcaption className="px-3 py-2 text-xs text-slate-400">{s.t}</figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
              <div className="text-sm font-medium">3-minute overview (MP4)</div>
              <video
                className="mt-3 aspect-video w-full rounded-lg border border-white/10"
                controls
                poster="/media/press/video-poster.png"
                src="/media/press/overview.mp4"
              />
              <div className="mt-2 text-xs text-slate-400">Downloadable, no narration version available on request.</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
              <div className="text-sm font-medium">B-roll & animation</div>
              <p className="mt-2 text-sm text-slate-300">
                Request B-roll, logo animations, and overlay-safe UI loops via{' '}
                <a href="mailto:press@buildaistartups.com" className="text-sky-300 hover:underline">
                  press@buildaistartups.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Founder bio & photos */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold">Founder bio & photos</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <div className="text-sm uppercase tracking-wider text-slate-400">Bio (short)</div>
              <p className="mt-2 text-sm text-slate-300">
                <strong>[Your Name]</strong> is the creator of HyperNova and founder of Build AI Startups. Previously shipped
                developer tools and AI products used by thousands. Focused on compressing time-to-value in software creation.
              </p>
              <div className="mt-4 text-sm uppercase tracking-wider text-slate-400">Bio (long)</div>
              <p className="mt-2 text-sm text-slate-300">
                [Your Name] is a builder focused on autonomous software systems. After leading projects across AI tooling and
                developer experience, they created HyperNova—an engine that turns a one-sentence intent into a live product with
                quality gates and a growth loop. Build AI Startups is the public platform for this engine, enabling founders,
                teams, and investors to ship faster with ownership preserved. Based in Europe; working globally.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { t: 'Headshot (color)', p: '/media/press/founder-color.jpg' },
                { t: 'Headshot (bw)', p: '/media/press/founder-bw.jpg' },
              ].map((f) => (
                <figure key={f.t} className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/40">
                  <img src={f.p} alt={f.t} className="h-full w-full object-cover" />
                  <figcaption className="px-3 py-2 text-xs text-slate-400">{f.t}</figcaption>
                </figure>
              ))}
              <div className="flex gap-3">
                <Link href="/media/press/founder-color.jpg" className="text-sm text-sky-300 hover:underline">
                  JPG
                </Link>
                <Link href="/media/press/founder-bw.jpg" className="text-sm text-sky-300 hover:underline">
                  B/W
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quotes */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold">Quotes</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <blockquote className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <p className="text-slate-200">
                “Most ideas die between inspiration and execution. HyperNova compresses that gap—from intent to live product—while
                keeping ownership with the builder.”
              </p>
              <footer className="mt-3 text-sm text-slate-400">— [Your Name], Founder</footer>
            </blockquote>
            <blockquote className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <p className="text-slate-200">
                “Instead of point tools, this is a full loop. It builds, ships, learns, and repeats. It’s how software wants to be
                made now.”
              </p>
              <footer className="mt-3 text-sm text-slate-400">— Early user</footer>
            </blockquote>
          </div>
        </section>

        {/* Usage guidelines */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold">Usage guidelines</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <div className="text-sm font-medium">Do</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-300">
                <li>Use provided SVG/PNG files—do not recreate the logo.</li>
                <li>Maintain clear space equal to the “B” height around the logo.</li>
                <li>Use light lockup on dark backgrounds; dark on light.</li>
                <li>Link the first mention to buildaistartups.com.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <div className="text-sm font-medium">Don’t</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-300">
                <li>Alter colors, stretch, rotate, or add effects.</li>
                <li>Place over low-contrast or busy backgrounds.</li>
                <li>Combine with other marks to form a new lockup.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Sample headlines & social copy */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold">Sample headlines & social copy</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <div className="text-sm uppercase tracking-wider text-slate-400">Headlines</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-300">
                <li>“Startups that build themselves: Build AI Startups launches HyperNova.”</li>
                <li>“From intent to revenue: a full-loop autonomous engine for micro-SaaS.”</li>
                <li>“No lock-in AI: ship with your own repos, infra, and billing.”</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <div className="text-sm uppercase tracking-wider text-slate-400">Social</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-300">
                <li>
                  “We built a system that takes a one-line idea → live product (repo, UI, pricing, deploy). Meet HyperNova:
                  buildaistartups.com”
                </li>
                <li>
                  “Autonomous startups + ecosystem cross-promos. No lock-in. Try the Builder today: buildaistartups.com/generate”
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Press releases */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold">Press releases</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <div className="text-sm font-medium">Template (DOCX)</div>
              <p className="mt-2 text-sm text-slate-300">
                Use this as a starting point; we can co-author an announcement.
              </p>
              <Link href="/brand/press-release-template.docx" className="mt-3 inline-block text-sky-300 hover:underline">
                Download template →
              </Link>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <div className="text-sm font-medium">Sample: Public alpha</div>
              <p className="mt-2 text-sm text-slate-300">Announces the v0.1 public alpha with Builder and quality gates.</p>
              <Link href="/brand/press-release-sample-alpha.pdf" className="mt-3 inline-block text-sky-300 hover:underline">
                Download sample →
              </Link>
            </div>
          </div>
        </section>

        {/* Coverage & contact */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold">Coverage & contact</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <div className="text-sm uppercase tracking-wider text-slate-400">Selected coverage</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-300">
                <li>Coming soon — launch week briefings</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <div className="text-sm uppercase tracking-wider text-slate-400">Contact</div>
              <p className="mt-2 text-sm text-slate-300">
                <strong>Media:</strong>{' '}
                <a href="mailto:press@buildaistartups.com" className="text-sky-300 hover:underline">
                  press@buildaistartups.com
                </a>
              </p>
              <p className="mt-1 text-sm text-slate-300">
                <strong>General:</strong>{' '}
                <a href="mailto:hello@buildaistartups.com" className="text-sky-300 hover:underline">
                  hello@buildaistartups.com
                </a>
              </p>
              <p className="mt-1 text-sm text-slate-300">
                <strong>Social:</strong>{' '}
                <a href="https://x.com/buildaistartups" className="text-sky-300 hover:underline">
                  @buildaistartups
                </a>
              </p>
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
                className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400"
              >
                Generate now
              </Link>
              <Link
                href="/resources/templates"
                className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5"
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
