import type { Metadata } from 'next'
import Link from 'next/link'

const BRAND = 'Build AI Startups'
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.buildaistartups.com'
const CANON = `${SITE}/product/builder`
const OG = '/brand/og-default.png'
const DESC = 'AI-powered Builder that goes from intent to live startup. Spec, repo, UI, docs, pricing, deploy—fully autonomous with quality gates.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: `Builder — ${BRAND}`,
  description: DESC,
  alternates: { canonical: CANON },
  openGraph: {
    type: 'website',
    url: CANON,
    title: `Builder — ${BRAND}`,
    description: 'From brief to repo in minutes. The Builder turns a plain-language intent into a production-ready app—spec, repo, UI, copy, docs, and deploy. No boilerplate. No waiting.',
    images: [{ url: OG, width: 1200, height: 630, alt: BRAND }],
    siteName: BRAND,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Builder — ${BRAND}`,
    description: DESC,
    images: [OG],
  },
}

export default function BuilderPage() {
  return (
    <>
      <main className="bg-slate-950 text-slate-200">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-20 sm:pt-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-widest text-slate-400">PRODUCT</p>
              <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
                From brief to repo in minutes
              </h1>
              <p className="mt-4 text-lg text-slate-300">
                The Builder turns a plain-language intent into a production-ready app—spec, repo, UI, copy, docs, and deploy.
                No boilerplate. No waiting.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/generate"
                  className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400"
                >
                  Try the Builder
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5"
                >
                  See pricing
                </Link>
              </div>
              <p className="mt-3 text-sm text-slate-400">Autonomy Confidence 86/100 · 23 checks passed</p>
              <p className="mt-2 text-sm text-slate-500">Open-source models · Deploys to Vercel · Stripe payments · GitHub first</p>
            </div>
            <div className="relative">
              {/* Replace with an actual capture of the build flow if you have it */}
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50">
                <video className="h-full w-full" autoPlay muted loop playsInline poster="/media/screens/builder-overview.png">
                  <source src="/media/screens/builder-overview.webm" type="video/webm" />
                  <source src="/media/screens/builder-overview.mp4" type="video/mp4" />
                </video>
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">Intent → Spec → Repo → Live preview</p>
            </div>
          </div>
        </section>

        {/* How it works: 5 steps */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { t: 'Set intent', d: 'Pick a niche or let the Builder scout pains & trends.', href: '/product/builder/research-spec' },
              { t: 'Connect', d: 'Link GitHub, Vercel, database, Stripe—no lock-in.', href: null },
              { t: 'Autobuild', d: 'Spec → repo → UI → copy → docs → pricing → landing.', href: '/product/builder/generate-ui' },
              { t: 'Go live', d: 'Preview, domain, analytics, SEO, onboarding wired.', href: '/product/builder/deploy-iterate' },
              { t: 'Self-improve', d: 'A/B hero, pricing, onboarding—driven by signals.', href: null },
            ].map((item, i) => {
              const Component = item.href ? Link : 'div'
              const props = item.href ? { href: item.href } : {}
              
              return (
                <Component
                  key={i}
                  {...props}
                  className={`rounded-xl border border-white/10 bg-slate-900/40 p-4 transition-colors ${
                    item.href ? 'hover:bg-slate-900/60 hover:border-white/20 cursor-pointer' : ''
                  }`}
                >
                  <div className="text-sm uppercase tracking-wide text-slate-400">Step {i + 1}</div>
                  <div className="mt-1 text-base font-medium">{item.t}</div>
                  <p className="mt-1 text-sm text-slate-400">{item.d}</p>
                  {item.href && (
                    <div className="mt-2 text-xs text-violet-400">Learn more →</div>
                  )}
                </Component>
              )
            })}
          </div>
        </section>

        {/* Split sections */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">Spec Studio</h3>
              <p className="mt-2 text-slate-300">
                Define your goal, constraints, and audience. The Builder writes a structured PRD (Spec DSL) covering
                problem, ICP, value props, features, data model, pages, pricing, and success metrics—easy to validate, easy to change.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Diff-able JSON schema, not brittle prose</li>
                <li>Regenerate only the parts that need change</li>
                <li>Perfect for PR review & approvals</li>
              </ul>
              <div className="mt-4">
                <Link
                  href="/product/builder/research-spec"
                  className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Learn more about Research & Spec
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <img src="/media/screens/spec-studio.png" alt="Spec Studio" className="rounded-lg" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="order-2 md:order-1 rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <img src="/media/screens/repo-forge.png" alt="Repo Forge" className="rounded-lg" />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-xl font-semibold">Repo Forge</h3>
              <p className="mt-2 text-slate-300">
                A clean GitHub repo scaffolded with CI, env templates, tests, and sensible defaults. No more boilerplate or
                yak-shaving—start where it matters.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Next.js + TypeScript + Tailwind + shadcn/ui</li>
                <li>Stripe billing, auth, analytics wired</li>
                <li>GitHub Actions CI with quality gates</li>
                <li>Environment configs & secrets handling</li>
              </ul>
              <div className="mt-4">
                <Link
                  href="/product/builder/generate-ui"
                  className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Learn more about Generate UI
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">UI Workshop</h3>
              <p className="mt-2 text-slate-300">
                Polished components, responsive layouts, and conversion-focused copy. Landing pages, pricing tiers, 
                dashboards, and onboarding flows—designed for engagement and retention.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Mobile-first responsive design</li>
                <li>Accessibility (WCAG) compliance built in</li>
                <li>SEO-optimized markup and meta tags</li>
                <li>Performance budgets enforced</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <img src="/media/screens/ui-workshop.png" alt="UI Workshop" className="rounded-lg" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="order-2 md:order-1 rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <img src="/media/screens/one-click-deploy.png" alt="One-click Deploy" className="rounded-lg" />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-xl font-semibold">One-click Deploy</h3>
              <p className="mt-2 text-slate-300">
                Preview environments, production deployments, custom domains, and analytics—all configured automatically.
                Ship fast, iterate faster.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Vercel integration with preview branches</li>
                <li>Custom domain setup and SSL certificates</li>
                <li>Analytics and conversion tracking</li>
                <li>Performance monitoring and alerts</li>
              </ul>
              <div className="mt-4">
                <Link
                  href="/product/builder/deploy-iterate"
                  className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Learn more about Deploy & Iterate
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Build Score & Quality Indicators */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6">Build Score & Quality Indicators</h2>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-slate-300">
                Every build gets a comprehensive quality score based on code quality, security, performance, and documentation.
                Transparent metrics give you confidence in what ships.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li><strong>Code Quality (25%):</strong> Lint, types, test coverage</li>
                <li><strong>Security (25%):</strong> Vulnerability scans, dependency checks</li>
                <li><strong>Performance (25%):</strong> Lighthouse scores, bundle size</li>
                <li><strong>Documentation (25%):</strong> README, API docs, changelog</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <img
                src="/images/resources/templates/build-score-badges.svg"
                alt="Build score badges and quality indicators"
                className="w-full h-auto rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Quality Gates */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <div className="mb-6">
            <img src="/images/resources/templates/quality-gates.svg" alt="Quality gates system" className="w-full h-32 object-contain" />
          </div>
        </section>

        {/* Spec DSL Preview */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6">Spec DSL Preview</h2>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-slate-300">
                The Builder uses a structured Product Spec DSL (Domain Specific Language) to ensure consistent, 
                diff-able specifications that can be validated and version-controlled.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>JSON Schema validation for reliability</li>
                <li>Version control and diff capabilities</li>
                <li>Re-run capability that preserves your edits</li>
              </ul>
              <div className="mt-6 flex gap-3">
                <Link href="/product/builder" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5 transition-colors">
                  🏗️ See the Builder
                </Link>
                <Link href="/generate" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400 transition-colors">
                  🚀 Start with a template
                </Link>
              </div>
            </div>
            {/* Spec DSL snippet */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">📝</span>
                <div className="text-sm font-medium text-slate-200">Spec DSL (excerpt)</div>
              </div>
              <pre className="overflow-auto rounded-lg border border-white/10 bg-slate-950/60 p-4 text-xs text-slate-300 mb-4">
{`spec:
  name: "SaaS Starter"
  icp: "B2B teams needing subscriptions, auth, and analytics"
  stack: {
    framework: "nextjs",
    language: "ts",
    ui: "tailwind+shadcn"
  }
  modules:
  - auth: {
      provider: "email+oauth",
      roles: ["owner","admin","member"]
    }
  - billing: {
      provider: "stripe",
      plans: ["Free","Pro","Team"]
    }
  - analytics: { provider: "plausible" }
  routes:
  - "/": {
      type: "landing",
      variants: 2,
      goal: "signup"
    }
  - "/pricing": {
      experiments: ["pricePoints","ctaCopy"]
    }
  - "/dashboard": { gated: true }
  quality:
    tests: { unit: true, smoke: true }
    performance: { lighthouseMin: 90 }
    licenses: { allow: ["MIT","Apache-2.0"] }`}
              </pre>
              <p className="text-xs text-slate-500 leading-relaxed">
                The Builder consumes this Spec to generate code, content, and configurations — then validates via quality gates.
              </p>
            </div>
          </div>
        </section>

        {/* Licensing & versioning */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6">Licensing & versioning</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-green-400 text-xl">📄</span>
                <div className="text-base font-medium text-green-300">License</div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Templates ship under a permissive license (MIT-like) appropriate for commercial use. Dependencies retain their original licenses.
                The PR includes a license summary in the repo.
              </p>
            </div>
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-blue-400 text-xl">🔄</span>
                <div className="text-base font-medium text-blue-300">Versioning</div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Each template has a semantic version. When an update is available, you can diff changes and selectively merge using the Builder.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6">Templates FAQ</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                q: 'Can I mix templates?',
                a: 'Yes. Start with one, then add modules from another (e.g., add API Starter to SaaS).',
              },
              {
                q: 'Do templates lock me in?',
                a: 'No. You own the repo and infra; templates are just scaffolds to accelerate shipping.',
              },
              {
                q: 'Are there example datasets or fixtures?',
                a: 'Yes. Starters include seed data and fixtures for tests and preview deployments.',
              },
              {
                q: 'How do I contribute a template?',
                a: 'We publish a spec and review checklist. Templates that pass quality gates get featured.',
              },
              {
                q: 'What about custom requirements?',
                a: 'The Spec DSL supports custom modules and integrations. Contact us for enterprise needs.',
              },
              {
                q: 'Are builds deterministic?',
                a: 'Yes. Same spec + same Builder version = same output. Perfect for CI/CD and collaboration.',
              },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
                <h3 className="text-base font-medium">{item.q}</h3>
                <p className="mt-1 text-sm text-slate-300">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Workflow Navigation */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6">Explore the Workflow</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Link
              href="/product/builder/research-spec"
              className="group rounded-xl border border-white/10 bg-slate-900/40 p-6 transition-all hover:bg-slate-900/60 hover:border-white/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                  <span className="text-violet-400 font-semibold">1</span>
                </div>
                <h3 className="text-lg font-semibold">Research & Spec</h3>
              </div>
              <p className="text-slate-400 text-sm mb-4">Market research, competitive analysis, and structured specification generation.</p>
              <div className="flex items-center gap-2 text-violet-400 group-hover:text-violet-300">
                <span className="text-sm">Learn more</span>
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            <Link
              href="/product/builder/generate-ui"
              className="group rounded-xl border border-white/10 bg-slate-900/40 p-6 transition-all hover:bg-slate-900/60 hover:border-white/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <span className="text-blue-400 font-semibold">2</span>
                </div>
                <h3 className="text-lg font-semibold">Generate UI</h3>
              </div>
              <p className="text-slate-400 text-sm mb-4">Repository creation, component generation, and full application scaffolding.</p>
              <div className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300">
                <span className="text-sm">Learn more</span>
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            <Link
              href="/product/builder/deploy-iterate"
              className="group rounded-xl border border-white/10 bg-slate-900/40 p-6 transition-all hover:bg-slate-900/60 hover:border-white/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <span className="text-emerald-400 font-semibold">3</span>
                </div>
                <h3 className="text-lg font-semibold">Deploy & Iterate</h3>
              </div>
              <p className="text-slate-400 text-sm mb-4">Launch to Vercel, monitor performance, and iterate based on real user feedback and analytics.</p>
              <div className="flex items-center gap-2 text-emerald-400 group-hover:text-emerald-300">
                <span className="text-sm">Learn more</span>
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </section>

        {/* Additional FAQ */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6">Builder FAQ</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-base font-medium">Who owns the code?</h3>
              <p className="mt-1 text-sm text-slate-300">You do. Repos are created under your GitHub organization or account.</p>
            </div>
            <div>
              <h3 className="text-base font-medium">What stack is generated?</h3>
              <p className="mt-1 text-sm text-slate-300">Next.js + TypeScript + Tailwind + shadcn/ui, with tests and CI.</p>
            </div>
            <div>
              <h3 className="text-base font-medium">Does it handle billing?</h3>
              <p className="mt-1 text-sm text-slate-300">Yes—Stripe test mode by default, with pricing pages and plan scaffolds.</p>
            </div>
            <div>
              <h3 className="text-base font-medium">How do you ensure quality?</h3>
              <p className="mt-1 text-sm text-slate-300">Lint, tests, security scans, Lighthouse budgets, license checks, and a Build Score threshold.</p>
            </div>
            <div>
              <h3 className="text-base font-medium">Can I review before deploy?</h3>
              <p className="mt-1 text-sm text-slate-300">Yes—use Copilot mode to pause at Spec, Code PR, Pricing, and Deploy gates.</p>
            </div>
            <div>
              <h3 className="text-base font-medium">Is there lock-in?</h3>
              <p className="mt-1 text-sm text-slate-300">No. Your GitHub, your Vercel, your database, your Stripe—always.</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/10 bg-slate-900/40 py-14">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-semibold">Generate your first startup</h2>
            <p className="mt-2 text-slate-300">
              Worst case: you learn. Best case: you launch. It's all yours—code, infra, and revenue.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link
                href="/generate"
                className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400"
              >
                Try the Builder
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5"
              >
                See pricing
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
