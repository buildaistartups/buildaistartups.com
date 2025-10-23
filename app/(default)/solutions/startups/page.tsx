import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.buildaistartups.com'

export const metadata: Metadata = {
  title: 'Startups — Build Your AI Business Together | Build AI Startups',
  description:
    'Complete platform for founding teams to validate, build, and launch AI products. Join our growing ecosystem of entrepreneurs.',
  alternates: { canonical: `${siteUrl}/solutions/startups` },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/solutions/startups`,
    title: 'Startups — Build Your AI Business Together',
    description:
      'The platform for founding teams to build AI products. From idea validation to launch.',
    images: [{ 
      url: '/og/solutions-startups.png', 
      width: 1200, 
      height: 630, 
      alt: 'Build AI Startups — For Founding Teams' 
    }],
    siteName: 'Build AI Startups',
  },
}

export default function StartupsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-violet-950/10 to-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="relative px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-transparent to-blue-600/10" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-sm mb-6">
                <span className="w-2 h-2 bg-violet-400 rounded-full mr-2" />
                For Founding Teams
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">
                Build Your AI Startup With Complete Tools
              </h1>
              
              <p className="mt-6 text-xl text-slate-300">
                Everything founding teams need to validate ideas, build products, and launch to market. 
                Join our ecosystem where startups help each other succeed.
              </p>

              {/* Platform Capabilities */}
              <div className="mt-8 p-6 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-violet-500/20">
                <h3 className="text-sm font-semibold text-violet-400 mb-4">PLATFORM CAPABILITIES</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">✓︎</span>
                    <span className="text-sm">Team Alignment Tools</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">✓︎</span>
                    <span className="text-sm">AI Code Generation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">✓︎</span>
                    <span className="text-sm">Built-in Analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">✓︎</span>
                    <span className="text-sm">Payment Integration</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link 
                  href="/start" 
                  className="px-8 py-4 bg-gradient-to-r from-violet-600 to-violet-500 rounded-lg font-semibold hover:from-violet-500 hover:to-violet-400 transition-all shadow-lg shadow-violet-600/25"
                >
                  Get Started
                </Link>
                <Link 
                  href="/how-it-works" 
                  className="px-8 py-4 bg-slate-800 rounded-lg font-semibold hover:bg-slate-700 transition-all border border-slate-700"
                >
                  How It Works
                </Link>
              </div>

              <p className="mt-4 text-sm text-slate-400">
                Free to start • Pay as you grow • Cancel anytime
              </p>
            </div>

            <div className="relative">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50 p-6">
                <img 
                  src="/images/solutions/startups/hero.svg" 
                  alt="Startup Ecosystem Platform"
                  className="h-full w-full object-contain"
                  loading="eager"
                />
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">Intent → Spec → Repo → UI → Pricing → Deploy</p>
            </div>
          </div>
        </div>
      </section>

      {/* The rest of the page remains unchanged and follows the original structure */}

      <section className="px-6 py-20 bg-slate-900/50">
        {/* Content for Feature Sections */}
      </section>
    </main>
  )
}
