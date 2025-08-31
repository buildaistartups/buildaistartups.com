// components/cta.tsx
export default function Cta() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative px-8 py-12 md:py-20 rounded-[3rem] overflow-hidden">
          {/* Radial gradient */}
          <div
            className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/3 aspect-square"
            aria-hidden="true"
          >
            <div className="absolute inset-0 translate-z-0 bg-purple-500 rounded-full blur-[120px] opacity-70" />
            <div className="absolute w-1/4 h-1/4 translate-z-0 bg-purple-400 rounded-full blur-[40px]" />
          </div>

          {/* Blurred shape */}
          <div
            className="absolute bottom-0 translate-y-1/2 left-0 blur-2xl opacity-50 pointer-events-none -z-10"
            aria-hidden="true"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
              <defs>
                <linearGradient id="bs5-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
                  <stop offset="0%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                fill="url(#bs5-a)"
                fillRule="evenodd"
                d="m0 0 461 369-284 58z"
                transform="matrix(1 0 0 -1 0 427)"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="max-w-3xl mx-auto text-center">
            <div>
              <div className="inline-flex font-medium bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-purple-200 pb-3">
                From brief to shipped product
              </div>
            </div>

            <h2 className="h2 bg-clip-text text-transparent bg-linear-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">
              Turn a one-line idea into a working startup
            </h2>

            <p className="text-lg text-slate-400 mb-8">
              HyperNova researches the niche, drafts the spec, scaffolds a production-ready repo, ships the UI &amp; docs,
              wires auth, billing &amp; analytics, and deploys to Vercel. You own everything — your GitHub, your Vercel,
              your Stripe. No lock-in.
            </p>

            {/* Compact buttons (same scale as hero) */}
            <div className="flex items-center justify-center gap-3">
              {/* Primary – white pill */}
              <a
                href="/generate"
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold
                           text-slate-900 bg-white/95 hover:bg-white ring-1 ring-black/5 shadow-sm transition"
              >
                Generate Startup
                <span className="text-purple-600">→</span>
              </a>

              {/* Secondary – purple pill with wand */}
              <a
                href="/resources/docs"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white
                           bg-linear-to-r from-purple-600 to-purple-500 hover:brightness-110 ring-1 ring-white/10 transition"
              >
                <svg
                  aria-hidden="true"
                  className="h-3.5 w-3.5 opacity-90"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7 2h2v2H7zM15 20h2v2h-2zM19 7h2v2h-2zM2 15h2v2H2zM16.95 7.05l-9.9 9.9a1.5 1.5 0 1 0 2.12 2.12l9.9-9.9a1.5 1.5 0 1 0-2.12-2.12Z" />
                </svg>
                Read the docs
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
