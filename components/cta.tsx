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

            {/* Buttons — pill style */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* Primary: white gradient pill */}
              <a
                href="/generate"
                className="group inline-flex items-center rounded-full px-6 py-3 text-base font-semibold text-slate-900
                           bg-[linear-gradient(90deg,rgba(255,255,255,.85),rgba(255,255,255,1),rgba(255,255,255,.85))]
                           hover:bg-white transition-colors duration-150
                           ring-1 ring-inset ring-white/30
                           shadow-[inset_0_0_0_1px_rgba(255,255,255,.35),0_1px_1px_rgba(0,0,0,.06),0_12px_30px_rgba(124,58,237,.25)]"
              >
                Generate Startup
                <svg
                  className="ml-2 h-4 w-4 text-purple-500 transition-transform duration-150 group-hover:translate-x-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M11.293 4.293a1 1 0 011.414 0l4.999 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 010-1.414z" />
                </svg>
              </a>

              {/* Secondary: purple gradient pill with wand icon */}
              <a
                href="/resources/docs"
                className="group inline-flex items-center rounded-full px-6 py-3 text-base font-semibold text-slate-100
                           bg-gradient-to-r from-purple-700/80 via-purple-600/80 to-purple-500/80
                           hover:from-purple-700 hover:via-purple-600 hover:to-purple-500
                           ring-1 ring-white/10
                           shadow-[inset_0_0_0_1px_rgba(255,255,255,.08)]
                           transition-colors duration-150"
              >
                <svg
                  className="mr-2 h-4 w-4 opacity-90"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  {/* magic wand-ish icon */}
                  <path d="M6 19L19 6l-1.414-1.414L4.586 17.586 6 19zM20 4l-2-2 1-1 2 2-1 1zM16 4l-1-3 1-1 1 3-1 1zM22 10l-3-1 1-1 3 1-1 1zM8 20l-3-1 1-1 3 1-1 1z" />
                </svg>
                Read the docs
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
