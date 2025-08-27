import Link from 'next/link'

export const metadata = {
  title: 'Deploy, Learn, Iterate – BuildAIStartups',
  description:
    'Deploy to Vercel, observe real usage, ship updates. HyperNova proposes improvements and keeps the spec in sync.',
  openGraph: {
    title: 'Deploy, Learn, Iterate – BuildAIStartups',
    description:
      'Launch on Vercel, measure what matters, and iterate with AI-assisted changelogs and PRs.',
    url: 'https://buildaistartups.com/product/builder/deploy-iterate',
  },
}

export default function DeployIterate() {
  return (
    <section className="relative mx-auto max-w-3xl px-4 sm:px-6 py-20">
      <header className="text-center mb-10">
        <div className="inline-flex font-medium pb-2 bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-purple-200">
          Builder · Step 3
        </div>
        <h1 className="h2 bg-clip-text text-transparent bg-linear-to-r from-slate-200/60 via-slate-200 to-slate-200/60">
          Deploy, learn, iterate
        </h1>
        <p className="mt-4 text-slate-300">
          Push to Vercel, validate with real users, and let HyperNova suggest the next best change.
        </p>
      </header>

      <div className="prose prose-invert max-w-none">
        <h3>Launch pipeline</h3>
        <ul>
          <li><strong>Vercel deploy</strong> from main with preview branches for PRs</li>
          <li><strong>Postgres/Supabase</strong> ready for data models the PRD defines</li>
          <li><strong>Stripe</strong> hooks &amp; webhooks wired when you enable billing</li>
        </ul>

        <h3>Learn fast</h3>
        <ul>
          <li>Event analytics hooks (page, signup, activate, pay)</li>
          <li>Changelog notes and release tags auto-updated</li>
          <li>Feedback loop into the PRD (kept in <code>/docs/prd.md</code>)</li>
        </ul>

        <h3>Iterate safely</h3>
        <ul>
          <li>AI-assisted PR suggestions tied to user signals</li>
          <li>Migrations &amp; test scaffolds for critical paths</li>
          <li>Rollbacks and preview checks built-in</li>
        </ul>

        <div className="mt-10">
          <Link
            href="/generate"
            className="btn text-slate-900 bg-linear-to-r from-white/80 via-white to-white/80 hover:bg-white transition duration-150 ease-in-out group"
          >
            Generate Startup
            <span className="tracking-normal text-purple-500 ml-1 transition-transform duration-150 ease-in-out group-hover:translate-x-0.5">
              -&gt;
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
