export default function Faqs() {
  return (
    <section className="relative">
      {/* Blurred shape */}
      <div
        className="absolute top-0 -translate-y-1/3 left-1/2 -translate-x-1/2 ml-24 blur-2xl opacity-50 pointer-events-none -z-10"
        aria-hidden="true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
          <defs>
            <linearGradient id="bs3-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            fill="url(#bs3-a)"
            fillRule="evenodd"
            d="m410 0 461 369-284 58z"
            transform="matrix(1 0 0 -1 -410 427)"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t [border-image:linear-gradient(to_right,transparent,var(--color-slate-800),transparent)1]">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <div>
              <div className="inline-flex font-medium bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-purple-200 pb-3">
                Getting started with Build AI Starups
              </div>
            </div>
            <h2 className="h2 bg-clip-text text-transparent bg-linear-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">
              Everything you need to know
            </h2>
          </div>

          {/* Columns */}
          <div className="md:flex md:space-x-12 space-y-8 md:space-y-0">
            {/* Column */}
            <div className="w-full md:w-1/2 space-y-8">
              {/* Item */}
              <div className="space-y-2">
                <h4 className="font-semibold">What is Build AI Starups?</h4>
                <p className="text-slate-400">
                  A builder that turns a one-line idea into a production-ready micro-SaaS. You get a structured
                  spec, a Next.js/TypeScript repo with tests, landing &amp; pricing pages, docs scaffolds, analytics
                  wiring, and deploy previews — all in your own GitHub and infra.
                </p>
              </div>

              {/* Item */}
              <div className="space-y-2">
                <h4 className="font-semibold">Do I own the code, infra, and revenue?</h4>
                <p className="text-slate-400">
                  Yes. Repos live under your GitHub; deploy to your Vercel/Supabase/Stripe accounts. There’s no
                  lock-in or required branding — you control everything from day one.
                </p>
              </div>

              {/* Item */}
              <div className="space-y-2">
                <h4 className="font-semibold">Can I remove “Powered by Build AI Starups” branding?</h4>
                <p className="text-slate-400">
                  Absolutely. Starters and templates don’t require attribution. Use your own brand kit, domains,
                  and product copy.
                </p>
              </div>
            </div>

            {/* Column */}
            <div className="w-full md:w-1/2 space-y-8">
              {/* Item */}
              <div className="space-y-2">
                <h4 className="font-semibold">What data do you store?</h4>
                <p className="text-slate-400">
                  We minimize data and use user-scoped tokens. Builds target your infrastructure (GitHub, Vercel,
                  DB, Stripe). Audit logs and license checks are included for transparency.
                </p>
              </div>

              {/* Item */}
              <div className="space-y-2">
                <h4 className="font-semibold">Is there a free plan?</h4>
                <p className="text-slate-400">
                  Yes — start free to try the Builder and ship a first MVP. Paid tiers unlock Autopilot, growth
                  packs, and Marketplace options. See pricing for details.
                </p>
              </div>

              {/* Item */}
              <div className="space-y-2">
                <h4 className="font-semibold">Is it affordable for small teams or indie makers?</h4>
                <p className="text-slate-400">
                  That’s the goal. Indie-friendly plans keep costs low while teams can scale into additional
                  features (experiments, webhooks, listings) as traction grows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
