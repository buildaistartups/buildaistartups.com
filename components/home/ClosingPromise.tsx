// components/home/ClosingPromise.tsx
import Link from 'next/link'
import Image from 'next/image'
import Glow from '@/public/images/glow-top.svg'

export default function ClosingPromise() {
  return (
    <section className="relative overflow-hidden">
      {/* page background tint */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent" />

      {/* Heading kept inside the standard container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="py-16 md:py-24">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-b from-slate-200 to-slate-500 bg-clip-text text-transparent max-w-4xl mx-auto">
              This Isn't Just a Platform. It's the Future of How AI Businesses Get Built.
            </h2>
          </div>
        </div>
      </div>

      {/* === FULL-WIDTH PANEL (like the hero) ================================= */}
      <div className="relative w-screen left-1/2 -ml-[50vw]">
        <div className="relative overflow-hidden rounded-none md:rounded-2xl border-y md:border border-slate-800 bg-slate-900/40">
          {/* Glow behind content */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 -translate-x-1/2 -top-[26%]">
              <Image
                src={Glow}
                alt=""
                priority={false}
                width={1800}
                height={760}
                className="max-w-none opacity-70"
              />
            </div>
          </div>

          {/* Panel content is still constrained to your site width */}
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 md:py-14">
            <h3 className="text-xl md:text-2xl font-semibold text-slate-200 mb-8 text-center">
              Join the AI Revolution
            </h3>

            {/* Value props */}
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              <div className="text-center">
                <div className="text-4xl mb-4 text-purple-400">🚀︎</div>
                <h4 className="text-lg md:text-xl font-bold text-purple-400 mb-2">Launch Fast</h4>
                <p className="text-sm text-slate-400">
                  Go from idea to live product faster than ever before possible
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4 text-green-400">📈︎</div>
                <h4 className="text-lg md:text-xl font-bold text-green-400 mb-2">Scale Smart</h4>
                <p className="text-sm text-slate-400">
                  Built-in tools to grow from zero to revenue efficiently
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4 text-blue-400">🌍︎</div>
                <h4 className="text-lg md:text-xl font-bold text-blue-400 mb-2">Impact Global</h4>
                <p className="text-sm text-slate-400">
                  Join a community building the future of AI
                </p>
              </div>
            </div>

            {/* Question */}
            <div className="text-center mb-6 md:mb-8">
              <p className="text-xl md:text-2xl font-semibold text-slate-200">
                Will you be part of the future?
              </p>
              <p className="text-base md:text-lg text-slate-400 mt-2">
                The tools are ready. The ecosystem is waiting. Your idea deserves to exist.
              </p>
            </div>

            {/* CTAs — match height to middle; trim width on 1st & 3rd so all feel similar */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              {/* Primary — a touch narrower padding */}
              <Link
                href="/generate"
                className="
                  inline-flex items-center justify-center
                  h-9 md:h-10 px-3.5 md:px-4
                  rounded-full text-sm md:text-[15px] font-medium leading-none whitespace-nowrap
                  bg-gradient-to-r from-purple-500 to-purple-600 text-white
                  hover:from-purple-600 hover:to-purple-700
                  focus:outline-none focus:ring-2 focus:ring-purple-500/40
                "
              >
                Start Your Journey
              </Link>

              {/* Secondary — reference size */}
              <Link
                href="/find-role"
                className="
                  inline-flex items-center justify-center
                  h-9 md:h-10 px-4 md:px-5
                  rounded-full text-sm md:text-[15px] font-medium leading-none whitespace-nowrap
                  bg-slate-800 text-slate-200 border border-slate-700
                  hover:bg-slate-700
                  focus:outline-none focus:ring-2 focus:ring-slate-500/30
                "
              >
                Find Your Role
              </Link>

              {/* Accent — same trim as primary */}
              <Link
                href="/ecosystem"
                className="
                  inline-flex items-center justify-center
                  h-9 md:h-10 px-3.5 md:px-4
                  rounded-full text-sm md:text-[15px] font-medium leading-none whitespace-nowrap
                  bg-gradient-to-r from-blue-500 to-cyan-500 text-white
                  hover:from-blue-600 hover:to-cyan-600
                  focus:outline-none focus:ring-2 focus:ring-blue-500/30
                "
              >
                Join the Revolution
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* ===================================================================== */}

      {/* Closing note — back in the standard container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-8 md:pt-10 pb-16 md:pb-24 text-center">
          <p className="text-slate-400 max-w-2xl mx-auto">
            BuildAIStartups is where ambitious founders, innovative enterprises, and forward-thinking
            investors come together to build the future. Be among the first to shape this revolution.
          </p>
        </div>
      </div>
    </section>
  )
}
