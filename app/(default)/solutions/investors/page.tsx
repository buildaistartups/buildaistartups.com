// app/(default)/solutions/investors/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Investors — Continuous Deal Flow | Build AI Starups',
  description:
    'Filter by market, traction proxies, and tech; review working products—not PDFs. Get cohort views, comparable dashboards, and exit-ready assets.',
  alternates: { canonical: 'https://buildaistartups.com/solutions/investors' },
  openGraph: {
    type: 'website',
    title: 'Investors — Continuous Deal Flow | Build AI Starups',
    description:
      'See instant demos, not decks. Pipeline scoring, comparable metrics, cohort views, and exit-ready assets.',
    url: 'https://buildaistartups.com/solutions/investors',
    images: [{ url: '/brand/og-default.png', width: 1200, height: 630, alt: 'Build AI Starups — Investors' }],
    siteName: 'Build AI Starups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Investors — Continuous Deal Flow | Build AI Starups',
    description:
      'See instant demos, not decks. Pipeline scoring, comparable metrics, cohort views, and exit-ready assets.',
    images: ['/brand/og-default.png'],
  },
}

export default function Investors() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 md:py-28">
      {/* Hero */}
      <header className="grid items-center gap-10 md:grid-cols-2">
        <div className="max-w-xl">
          <div className="inline-flex font-medium pb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-200">
            Solutions · Investors
          </div>
          <h1 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60">
            Continuous deal flow with instant demos.
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Filter by market, traction proxies, and tech—then open a live demo.
            See working products, not PDFs.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            {/* Primary CTA */}
            <Link
              href="/contact?reason=investor"
              className="btn group relative w-full sm:w-auto whitespace-nowrap text-slate-300 transition duration-150 ease-in-out hover:text-white [background:linear-gradient(var(--color-slate-900),var(--color-slate-900))_padding-box,conic-gradient(var(--color-slate-400),var(--color-slate-700)_25%,var(--color-slate-700)_75%,var(--color-slate-400)_100%)_border-box] before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-slate-800/30"
            >
              <span className="relative inline-flex items-center">
                Request investor access
                <span className="ml-1 translate-x-0 text-purple-500 transition-transform duration-150 ease-in-out group-hover:translate-x-0.5">
                  -&gt;
                </span>
              </span>
            </Link>

            {/* Secondary */}
            <Link
              href="/product/builder"
              className="btn text-slate-200 hover:text-white bg-slate-900/25 hover:bg-slate-900/30 w-full sm:w-auto transition duration-150 ease-in-out"
            >
              How the builder works
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-1 shadow-2xl">
            <Image
              src="/media/screens/investor-console.png"
              alt="Investor console view"
              width={1440}
              height={900}
              priority
              className="rounded-xl"
            />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-purple-500/10 via-fuchsia-400/5 to-indigo-400/10 blur-2xl"
          />
        </div>
      </header>

      {/* Value props */}
      <div className="mt-20 grid gap-6 sm:gap-8 md:grid-cols-2">
        <Card
          title="Pipeline scoring"
          subtitle="Market size, defensibility, speed."
        >
          Triaged automatically from the founder’s brief and repo signals:
          addressable market notes, wedge defensibility, and time-to-demo. You get a
          sortable, comparable score—plus links into the actual code and live app.
        </Card>

        <Card
          title="Comparable metrics"
          subtitle="Standardized dashboards."
        >
          Each project self-reports the same set of traction proxies: activation,
          retention pings, early revenue toggles, and usage funnels—normalized so you
          can compare apples to apples across sectors and stages.
        </Card>

        <Card
          title="Cohort views"
          subtitle="Track groups across time."
        >
          Build watchlists by thesis (e.g., “AI infra for SMB”, “EU fintech”)
          and follow progress weekly. See pace-of-ship, PRD deltas, and live demo
          links without chasing emails.
        </Card>

        <Card
          title="Exit-ready assets"
          subtitle="Docs & transfer helpers."
        >
          Every repo ships with a clean PRD, architecture notes, licenses,
          and a handover checklist. When something hits, due diligence is days—not months.
        </Card>
      </div>

      {/* Final CTA */}
      <div className="mt-16 rounded-2xl border border-white/10 bg-slate-900/40 p-6 sm:p-8 text-center">
        <h2 className="h4 text-slate-200">See live demos, not decks.</h2>
        <p className="mt-2 text-slate-400">
          Join the investor console beta and get curated cohorts delivered weekly.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/contact?reason=investor"
            className="btn group relative w-full sm:w-auto whitespace-nowrap text-slate-300 transition duration-150 ease-in-out hover:text-white [background:linear-gradient(var(--color-slate-900),var(--color-slate-900))_padding-box,conic-gradient(var(--color-slate-400),var(--color-slate-700)_25%,var(--color-slate-700)_75%,var(--color-slate-400)_100%)_border-box] before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-slate-800/30"
          >
            <span className="relative inline-flex items-center">
              Request investor access
              <span className="ml-1 translate-x-0 text-purple-500 transition-transform duration-150 ease-in-out group-hover:translate-x-0.5">
                -&gt;
              </span>
            </span>
          </Link>
          <Link
            href="/resources/press"
            className="btn text-slate-200 hover:text-white bg-slate-900/25 hover:bg-slate-900/30 w-full sm:w-auto transition duration-150 ease-in-out"
          >
            Press & overview
          </Link>
        </div>
      </div>
    </section>
  )
}

/** Small presentational card component (local to this page) */
function Card({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5 sm:p-6">
      <div className="mb-2 text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-200">
        {subtitle}
      </div>
      <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
      <p className="mt-2 text-slate-300">{children}</p>
    </div>
  )
}
