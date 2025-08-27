import Link from 'next/link'

export const metadata = {
  title: 'Research & Spec – BuildAIStartups',
  description:
    'Turn a one-line idea into a crisp product plan. HyperNova researches the niche, analyzes competitors, and drafts a PRD with acceptance criteria.',
  openGraph: {
    title: 'Research & Spec – BuildAIStartups',
    description:
      'From signal to spec: niche scan, competitor map, ICP, and a PRD you can ship against.',
    url: 'https://buildaistartups.com/product/builder/research-spec',
  },
}

export default function ResearchSpec() {
  return (
    <section className="relative mx-auto max-w-3xl px-4 sm:px-6 py-20">
      <header className="text-center mb-10">
        <div className="inline-flex font-medium pb-2 bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-purple-200">
          Builder · Step 1
        </div>
        <h1 className="h2 bg-clip-text text-transparent bg-linear-to-r from-slate-200/60 via-slate-200 to-slate-200/60">
          Research &amp; product spec
        </h1>
        <p className="mt-4 text-slate-300">
          Give HyperNova a one-sentence brief. We turn it into a plan you can ship:
          market context, opportunity thesis, and a PRD with acceptance criteria.
        </p>
      </header>

      <div className="prose prose-invert max-w-none">
        <h3>What you get</h3>
        <ul>
          <li><strong>Opportunity scan:</strong> problem framing, segments, TAM notes.</li>
          <li><strong>Competitor map:</strong> positioning, gaps, wedge ideas.</li>
          <li><strong>ICP &amp; jobs-to-be-done:</strong> who we help and why.</li>
          <li><strong>Draft PRD:</strong> user stories, flows, API surface, data model sketch.</li>
          <li><strong>Acceptance criteria:</strong> demoable outcomes for the first release.</li>
        </ul>

        <h3>Why this matters</h3>
        <p>
          Clear specs de-risk build time. You keep ownership and control: all artifacts
          are pushed to your own GitHub as markdown in <code>/docs/</code>.
        </p>

        <h3>Outputs in your repo</h3>
        <ul>
          <li><code>/docs/brief.md</code> – normalized problem &amp; scope</li>
          <li><code>/docs/market-notes.md</code> – scan &amp; competitor table</li>
          <li><code>/docs/prd.md</code> – user stories, flows, criteria</li>
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
