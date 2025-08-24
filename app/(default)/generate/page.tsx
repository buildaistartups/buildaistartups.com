// app/(default)/generate/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import GenerateForm from '@/components/generate-form'

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.buildaistartups.com'
const CANON = `${SITE}/generate`
const OG = '/brand/og-default.png'

export const metadata: Metadata = {
  title: 'Generate Startup — Build AI Startups',
  description:
    'Turn a one-sentence idea into a production-ready micro-SaaS. HyperNova plans, scaffolds, brands, prices, deploys, and sets up growth—all in one loop.',
  alternates: { canonical: CANON },
  openGraph: {
    type: 'website',
    url: CANON,
    title: 'Generate your next startup — Build AI Startups',
    description:
      'Turn a one-sentence idea into a production-ready micro-SaaS. HyperNova plans, scaffolds, brands, prices, deploys, and sets up growth—all in one loop.',
    images: [{ url: OG, width: 1200, height: 630, alt: 'Build AI Startups' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generate your next startup — Build AI Startups',
    description:
      'From intent to repo, landing page, pricing, and launch—fully automated.',
    images: [OG],
  },
}

export default function GeneratePage() {
  return (
    <main className="relative">
      {/* Hero */}
      <section className="pt-10 md:pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex font-medium bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-purple-200 pb-2">
              HyperNova Builder
            </div>
            <h1 className="h1 bg-clip-text text-transparent bg-linear-to-r from-slate-200/70 via-slate-200 to-slate-200/70">
              Generate your next startup
            </h1>
            <p className="mt-4 text-lg text-slate-400">
              Drop a one-sentence intent. HyperNova drafts a PRD, scaffolds the
              repo, wires the UI, pricing, landing page, analytics, and a first
              set of growth experiments. You own the code, infra, and revenue.
            </p>

            <ul className="mt-6 grid gap-2 text-slate-300 text-sm sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-purple-400" />
                From idea → repo → live site in one loop
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-purple-400" />
                Copilot (review) or Autopilot (ship when green)
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-purple-400" />
                Your GitHub, Vercel, DB, Stripe—no lock-in
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-purple-400" />
                Build Score, tests, security & license gates
              </li>
            </ul>

            <div className="mt-6">
              <Link
                href="#builder"
                className="btn text-white bg-purple-500 hover:bg-purple-600 shadow-xs"
              >
                Start a build
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Builder */}
      <section id="builder" className="py-10 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <GenerateForm />
        </div>
      </section>

      {/* How it works */}
      <section className="py-8 md:py-14 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="h3 text-slate-100">What happens after you click “Generate”</h2>
          <ol className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-sm text-slate-300">
            <li className="rounded-xl border border-white/10 p-4">
              <div className="text-slate-200 font-medium">1) Plan</div>
              PRD (Spec DSL), user stories, data model, license & dependency plan.
            </li>
            <li className="rounded-xl border border-white/10 p-4">
              <div className="text-slate-200 font-medium">2) Scaffold</div>
              Repo, UI shell, auth, emails, pricing, landing, docs, tests.
            </li>
            <li className="rounded-xl border border-white/10 p-4">
              <div className="text-slate-200 font-medium">3) Launch</div>
              Deploy to Vercel, seed analytics, SEO, waitlist, & onboarding.
            </li>
            <li className="rounded-xl border border-white/10 p-4">
              <div className="text-slate-200 font-medium">4) Improve</div>
              A/B copy & pricing, instrument funnels, growth experiments.
            </li>
          </ol>
          <p className="mt-6 text-sm text-slate-500">
            Tip: Use <span className="text-slate-300">Autopilot</span> for fully autonomous
            shipping, or <span className="text-slate-300">Copilot</span> to review each step.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="h3">Ready to ship something real?</h3>
          <p className="mt-2 text-slate-400">
            Worst case: you learn. Best case: you launch.
          </p>
          <div className="mt-6">
            <Link
              href="#builder"
              className="btn text-white bg-purple-500 hover:bg-purple-600 shadow-xs"
            >
              Generate my first startup
            </Link>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            By continuing you agree to our{' '}
            <Link href="/legal/terms" className="underline">Terms</Link> and{' '}
            <Link href="/legal/privacy" className="underline">Privacy Policy</Link>.
          </p>
        </div>
      </section>
    </main>
  )
}
