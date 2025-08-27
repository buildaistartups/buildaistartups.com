import Link from 'next/link'

export const metadata = {
  title: 'Generate Repo & UI – BuildAIStartups',
  description:
    'Scaffold a production-ready Next.js app with polished UI, docs, auth, billing, and analytics wired. Pushed to your own GitHub.',
  openGraph: {
    title: 'Generate Repo & UI – BuildAIStartups',
    description:
      'Next.js + Tailwind + shadcn/ui, auth, Stripe billing, analytics, and docs — under your GitHub.',
    url: 'https://buildaistartups.com/product/builder/generate-ui',
  },
}

export default function GenerateUI() {
  return (
    <section className="relative mx-auto max-w-3xl px-4 sm:px-6 py-20">
      <header className="text-center mb-10">
        <div className="inline-flex font-medium pb-2 bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-purple-200">
          Builder · Step 2
        </div>
        <h1 className="h2 bg-clip-text text-transparent bg-linear-to-r from-slate-200/60 via-slate-200 to-slate-200/60">
          Generate repo &amp; UI
        </h1>
        <p className="mt-4 text-slate-300">
          We scaffold your app with the essentials so you can launch sooner and spend time on what’s unique.
        </p>
      </header>

      <div className="prose prose-invert max-w-none">
        <h3>Stack &amp; conventions</h3>
        <ul>
          <li><strong>Next.js 15</strong>, <strong>TypeScript</strong>, <strong>App Router</strong></li>
          <li><strong>Tailwind</strong> + sensible tokens; <strong>shadcn/ui</strong> for primitives</li>
          <li>Auth stub + cookie session; Stripe billing stub; analytics hooks</li>
          <li>Docs as Markdown in <code>/docs</code>; API routes under <code>/api</code></li>
        </ul>

        <h3>What’s wired for you</h3>
        <ul>
          <li>Marketing pages (hero, features, pricing, contact) with SEO metadata</li>
          <li>Sign in / Sign up / Reset password stubs</li>
          <li>Pricing tiers &amp; FAQ components</li>
          <li>“Generate Startup” flow with saved dashboard gate</li>
        </ul>

        <h3>Repo anatomy (sample)</h3>
        <pre>
{`app/
  (default)/
    page.tsx
    pricing/
    contact/
    product/
  api/
    contact/
components/
lib/
public/
docs/`}
        </pre>

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
