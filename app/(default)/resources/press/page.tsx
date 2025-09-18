// app/(default)/resources/press/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const siteUrl = 'https://www.buildaistartups.com'
const pageUrl = `${siteUrl}/resources/press`
const ogImage = '/og/resources-press.png'

export const metadata: Metadata = {
  title: 'Press Kit - Media resources & brand assets | Build AI Startups',
  description: 'Download logos, screenshots, and media resources for Build AI Startups. Press inquiries and brand guidelines.',
  alternates: { canonical: pageUrl },
  openGraph: {
    type: 'website',
    url: pageUrl,
    title: 'Press Kit - Media resources & brand assets | Build AI Startups',
    description: 'Media resources, brand assets, and press information for Build AI Startups.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Build AI Startups - Press Kit' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Press Kit - Media resources & brand assets | Build AI Startups',
    description: 'Media resources, brand assets, and press information for Build AI Startups.',
    images: [ogImage],
  },
}

type MediaAsset = {
  name: string
  description: string
  url: string
  type: 'logo' | 'screenshot' | 'video' | 'document'
  format: string
  size?: string
}

const mediaAssets: MediaAsset[] = [
  {
    name: 'Primary Logo',
    description: 'Main Build AI Startups logo with wordmark',
    url: '/brand/logo-primary.svg',
    type: 'logo',
    format: 'SVG',
  },
  {
    name: 'Logo Mark',
    description: 'Icon-only version of the logo',
    url: '/brand/logo-mark.svg',
    type: 'logo',
    format: 'SVG',
  },
  {
    name: 'Logo White',
    description: 'White version for dark backgrounds',
    url: '/brand/logo-white.svg',
    type: 'logo',
    format: 'SVG',
  },
  {
    name: 'Platform Screenshot',
    description: 'Main dashboard interface',
    url: '/images/resources/press/platform-screenshot.svg',
    type: 'screenshot',
    format: 'SVG',
    size: '2400x1600',
  },
  {
    name: 'Builder Interface',
    description: 'Spec DSL editor and generation flow',
    url: '/images/resources/press/builder-interface.svg',
    type: 'screenshot',
    format: 'SVG',
    size: '2400x1600',
  },
  {
    name: 'Product Demo',
    description: 'Overview of the platform capabilities',
    url: '/images/resources/press/product-demo.svg',
    type: 'video',
    format: 'SVG',
    size: '1920x1080',
  },
]

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Resources', item: `${siteUrl}/resources` },
    { '@type': 'ListItem', position: 3, name: 'Press', item: pageUrl },
  ],
}

export default function PressPage() {
  const logos = mediaAssets.filter(asset => asset.type === 'logo')
  const screenshots = mediaAssets.filter(asset => asset.type === 'screenshot')
  const videos = mediaAssets.filter(asset => asset.type === 'video')

  return (
    <>
      <Script id="ld-breadcrumb" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="bg-slate-950 text-slate-200">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-20 sm:pt-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-widest text-slate-400">Resources</p>
              <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Press Kit - media resources</h1>
              <p className="mt-4 text-lg text-slate-300">
                Download logos, screenshots, and media resources for Build AI Startups. For press inquiries, contact our team.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#assets" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400">
                  Download assets
                </a>
                <Link href="/contact?subject=Press%20inquiry" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5">
                  Press inquiry
                </Link>
              </div>
              <p className="mt-3 text-sm text-slate-400">Logos, screenshots, videos, brand guidelines</p>
            </div>
            <div className="relative">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50">
                <img src="/images/resources/press/hero.svg" alt="Press kit overview" className="h-full w-full object-cover" />
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">Media assets and brand resources</p>
            </div>
          </div>
        </section>

        {/* Media Kit Preview */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <div className="mb-6">
            <img src="/images/resources/press/media-kit.svg" alt="Media kit contents preview" className="w-full h-32 object-contain" />
          </div>
        </section>

        {/* Company Info */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold mb-6">Company Information</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-6">
              <h3 className="text-lg font-semibold mb-3">About Build AI Startups</h3>
              <p className="text-slate-300 mb-4">
                Build AI Startups is an autonomous venture creation platform that transforms one-sentence ideas 
                into live, production-ready products. Our AI-powered Builder generates code, content, and 
                infrastructure while maintaining quality through automated gates.
              </p>
              <div className="space-y-2 text-sm">
                <div><span className="text-slate-400">Founded:</span> 2024</div>
                <div><span className="text-slate-400">Headquarters:</span> San Francisco, CA</div>
                <div><span className="text-slate-400">Industry:</span> AI, Developer Tools, Venture Creation</div>
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-6">
              <h3 className="text-lg font-semibold mb-3">Key Statistics</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="text-center p-3 rounded-lg border border-white/10 bg-slate-950/40">
                  <div className="text-xl font-bold text-violet-400">10+</div>
                  <div className="text-xs text-slate-400">Templates</div>
                </div>
                <div className="text-center p-3 rounded-lg border border-white/10 bg-slate-950/40">
                  <div className="text-xl font-bold text-blue-400">90+</div>
                  <div className="text-xs text-slate-400">Build Score</div>
                </div>
                <div className="text-center p-3 rounded-lg border border-white/10 bg-slate-950/40">
                  <div className="text-xl font-bold text-teal-400">24h</div>
                  <div className="text-xs text-slate-400">Ship Time</div>
                </div>
                <div className="text-center p-3 rounded-lg border border-white/10 bg-slate-950/40">
                  <div className="text-xl font-bold text-green-400">MIT</div>
                  <div className="text-xs text-slate-400">License</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <div className="mb-6">
            <img src="/images/resources/press/company-timeline.svg" alt="Company timeline and milestones" className="w-full h-40 object-contain" />
          </div>
        </section>

        {/* Brand Assets */}
        <section id="assets" className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold mb-6">Brand Assets</h2>
          
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-lg font-semibold">Logos</h3>
              <img src="/images/resources/press/logo-variations.svg" alt="Logo variations" className="h-6" />
            </div>
            <img src="/images/resources/press/brand-assets.svg" alt="Brand assets overview" className="w-full mb-6" />
            <div className="grid gap-4 sm:grid-cols-3">
              {logos.map((asset) => (
                <div key={asset.name} className="rounded-xl border border-white/10 bg-slate-900/40 p-6 text-center">
                  <div className="aspect-square w-full mb-4 flex items-center justify-center bg-white rounded-lg">
                    <img src={asset.url} alt={asset.name} className="max-w-[80%] max-h-[80%] object-contain" />
                  </div>
                  <h4 className="font-medium mb-1">{asset.name}</h4>
                  <p className="text-sm text-slate-400 mb-3">{asset.description}</p>
                  <a 
                    href={asset.url} 
                    download 
                    className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-400"
                  >
                    Download {asset.format}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Screenshots */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Screenshots</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {screenshots.map((asset) => (
                <div key={asset.name} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                  <div className="aspect-video w-full mb-3 overflow-hidden rounded-lg border border-white/10 bg-slate-950/40">
                    <img src={asset.url} alt={asset.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{asset.name}</h4>
                      <p className="text-sm text-slate-400">{asset.description}</p>
                      {asset.size && <p className="text-xs text-slate-500">{asset.size}</p>}
                    </div>
                    <a 
                      href={asset.url} 
                      download 
                      className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-400"
                    >
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Videos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Videos</h3>
            <div className="grid gap-4">
              {videos.map((asset) => (
                <div key={asset.name} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                  <div className="aspect-video w-full mb-3 overflow-hidden rounded-lg border border-white/10 bg-slate-950/40">
                    <img src={asset.url} alt={asset.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{asset.name}</h4>
                      <p className="text-sm text-slate-400">{asset.description}</p>
                      {asset.size && <p className="text-xs text-slate-500">{asset.size}</p>}
                    </div>
                    <a 
                      href={asset.url} 
                      download 
                      className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-400"
                    >
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Press Coverage */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <div className="mb-6">
            <img src="/images/resources/press/press-coverage.svg" alt="Press coverage and media mentions" className="w-full h-32 object-contain" />
          </div>
        </section>

        {/* Brand Guidelines */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold mb-6">Brand Guidelines</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-6">
              <img src="/images/resources/press/color-palette.svg" alt="Brand color palette" className="h-12 w-12 mb-4" />
              <h3 className="text-lg font-semibold mb-3">Colors</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-500"></div>
                  <div>
                    <div className="font-medium">Primary Purple</div>
                    <div className="text-sm text-slate-400">#6366F1</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                  <div>
                    <div className="font-medium">Secondary Blue</div>
                    <div className="text-sm text-slate-400">#3B82F6</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-950 border border-white/20"></div>
                  <div>
                    <div className="font-medium">Dark Background</div>
                    <div className="text-sm text-slate-400">#020617</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-6">
              <img src="/images/resources/press/usage-guidelines.svg" alt="Usage guidelines" className="h-12 w-12 mb-4" />
              <h3 className="text-lg font-semibold mb-3">Usage Guidelines</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Use logos on light or dark backgrounds as appropriate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Maintain clear space around logos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Use high-resolution versions for print</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Do not modify colors or proportions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Do not use outdated logo versions</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Press Contact */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-8 text-center">
            <img src="/images/resources/press/contact-info.svg" alt="Press contact" className="w-32 h-32 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Press Inquiries</h2>
            <p className="text-slate-300 mb-6">
              For interviews, product demos, or additional resources, contact our press team.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link href="/contact?subject=Press%20inquiry" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400">
                Contact Press Team
              </Link>
              <a href="mailto:press@buildaistartups.com" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5">
                press@buildaistartups.com
              </a>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/10 bg-slate-900/40 py-14">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-semibold">Ready to build?</h2>
            <p className="mt-2 text-slate-300">
              Experience the autonomous venture creation platform yourself.
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
