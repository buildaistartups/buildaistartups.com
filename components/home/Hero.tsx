// components/home/Hero.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import Particles from '@/components/particles'
import Illustration from '@/public/images/glow-bottom.svg'

export default function Hero() {
  return (
    <section className="relative">
      {/* Bottom glow background */}
      <div
        className="absolute inset-0 -z-10 -mx-28 rounded-b-[3rem] pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0">
          <Image src={Illustration} className="max-w-none" width={2146} height={744} priority alt="" />
        </div>
      </div>

      {/* Particles */}
      <Particles className="absolute inset-0 -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="-translate-y-[2.67px] md:-translate-y-[2.67px] lg:-translate-y-[2.67px]">
          <div className="pt-32 pb-16 md:pt-52 md:pb-32">
            
            {/* Phase 1 Label */}
            <div className="text-center mb-8 translate-y-[0.67px]">
              <div className="inline-flex items-center justify-center px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-medium mb-4">
                Phase 1: The Blueprint Engine
              </div>
            </div>

            {/* Main content */}
            <div className="text-center">
              <div className="flex flex-col items-center">
                <h1
                  className="
                    font-bold tracking-tight
                    text-4xl md:text-[53.33px] lg:text-[57.33px]
                    leading-tight md:leading-[1.06]
                    bg-gradient-to-b from-slate-200 to-slate-500 bg-clip-text text-transparent
                    overflow-visible
                    md:[&>span>span]:pb-[1px] lg:[&>span>span]:pb-[2px]
                  "
                >
                  <span className="block whitespace-nowrap">Turn Your Idea into a</span>
                  <span className="block whitespace-nowrap">Professional Tech Spec & Repo</span>
                </h1>

                {/* Subtitle */}
                <p className="mt-4 -translate-y-[5.33px] text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
                  Stop dreaming, start building. Get a CTO-level architectural blueprint and a production-ready Next.js boilerplate in 24 hours.
                </p>
              </div>

              {/* CTAs */}
              <div className="mt-8 -translate-y-[5.33px] flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  href="/pricing" // Direct to pricing/checkout
                  className="inline-flex items-center justify-center h-10 px-8 rounded-full text-base font-medium bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500/40 shadow-lg shadow-purple-500/20 transition-all hover:scale-105"
                >
                  Get My Spec ($49)
                </Link>
                <Link
                  href="#how-it-works" // Anchor to process section
                  className="inline-flex items-center justify-center h-10 px-8 rounded-full text-base font-medium bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500/30 transition-all"
                >
                  How it Works
                </Link>
              </div>
            </div>

            {/* Value Props - Single Static Set for Phase 1 */}
            <div className="mt-16 -translate-y-[0.67px] grid md:grid-cols-3 gap-6 text-center">
              
              {/* Card 1 */}
              <div className="spotlight-card relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/25 p-4 md:pb-3 md:px-6 md:pt-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <div className="pointer-events-none absolute -top-10 -left-10 h-56 w-72 -z-10 bg-[radial-gradient(closest-side,rgba(244,114,182,0.12),transparent_60%)] blur-2xl" aria-hidden="true" />
                <div className="relative">
                  <div className="text-3xl mb-2 text-blue-400">🤖</div>
                  <div className="text-sm font-semibold text-slate-200">AI Architect</div>
                  <div className="text-xs text-slate-400">Deep analysis of your idea</div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="spotlight-card relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/25 p-4 md:pb-3 md:px-6 md:pt-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <div className="pointer-events-none absolute -top-10 -right-10 h-56 w-72 -z-10 bg-[radial-gradient(closest-side,rgba(99,102,241,0.12),transparent_60%)] blur-2xl" aria-hidden="true" />
                <div className="relative">
                  <div className="text-3xl mb-2 text-blue-400">📄</div>
                  <div className="text-sm font-semibold text-slate-200">PDF Blueprint</div>
                  <div className="text-xs text-slate-400">DB Schema, API, & Strategy</div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="spotlight-card relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/25 p-4 md:pb-3 md:px-6 md:pt-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <div className="pointer-events-none absolute -bottom-12 -right-10 h-56 w-72 -z-10 bg-[radial-gradient(closest-side,rgba(20,184,166,0.12),transparent_60%)] blur-2xl" aria-hidden="true" />
                <div className="relative">
                  <div className="text-3xl mb-2 text-blue-400">📦</div>
                  <div className="text-sm font-semibold text-slate-200">Golden Template</div>
                  <div className="text-xs text-slate-400">Production-ready GitHub Repo</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
