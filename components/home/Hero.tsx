// components/home/Hero.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Particles from '@/components/particles'
import Illustration from '@/public/images/glow-bottom.svg'

type Audience = {
  title: string
  headline: string                 // mobile (natural wrap)
  linesMd: [string, string]        // exact two lines for md+ (force breaks)
  subheadline: string
  cta1: { text: string; href: string }
  cta2: { text: string; href: string }
}

const audiences: Audience[] = [
  {
    title: 'For Startups',
    headline: 'Build, Scale, and Profit from AI. Complete Toolkit Included.',
    linesMd: ['Build, Scale, and Profit from AI. Complete', 'Toolkit Included.'],
    subheadline: 'Everything you need to launch and grow your AI business in one platform',
    cta1: { text: 'Start Building', href: '/generate' },
    cta2: { text: 'Access Startup Tools', href: '/solutions/indie-makers' },
  },
  {
    title: 'For Enterprises',
    headline: 'Launch Your Innovation Lab. White-Label Everything.',
    linesMd: ['Launch Your Innovation Lab. White-Label', 'Everything.'],
    subheadline: 'Transform your organization into an AI powerhouse with enterprise-grade tools',
    cta1: { text: 'Deploy Enterprise Lab', href: '/solutions/enterprises' },
    cta2: { text: 'See Enterprise Features', href: '/product/api' },
  },
  {
    title: 'For Accelerators',
    headline: 'Run World-Class Programs. Ship Real Products.',
    linesMd: ['Run World-Class Programs. Ship Real', 'Products.'],
    subheadline: 'Complete cohort management system that gets startups to revenue faster',
    cta1: { text: 'Manage Your Cohort', href: '/solutions/accelerators' },
    cta2: { text: 'Demo Day Tools', href: '/product/ecosystem' },
  },
  {
    title: 'For Product Managers',
    headline: 'Enterprise Workflows. Zero Dependencies.',
    linesMd: ['Enterprise Workflows. Zero', 'Dependencies.'],
    subheadline: 'Integrate AI capabilities directly into your existing enterprise stack',
    cta1: { text: 'See Enterprise Integrations', href: '/solutions/product-teams' },
    cta2: { text: 'Book PM Demo', href: '/contact?type=demo' },
  },
]

export default function Hero() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setI(p => (p + 1) % audiences.length), 5000)
    return () => clearInterval(id)
  }, [])

  const a = audiences[i]

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
        {/* Tiny vertical nudge to align with ORIGINAL mock (≈1pt) */}
        <div className="-translate-y-[1.33px] md:-translate-y-[1.33px] lg:-translate-y-[1.33px]">
          <div className="pt-32 pb-16 md:pt-52 md:pb-32">
            {/* Dots + label */}
            <div className="text-center mb-8">
              <div className="inline-flex gap-2">
                {audiences.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setI(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === i ? 'w-8 bg-purple-500' : 'bg-slate-600 hover:bg-slate-500'
                    }`}
                    aria-label={`Show: ${audiences[idx].title}`}
                  />
                ))}
              </div>
              <div className="mt-4 text-sm font-medium text-purple-400">{a.title}</div>
            </div>

            {/* Main content */}
            <div className="text-center">
              {/* Title + subtitle (no min-height → no phantom gap) */}
              <div className="flex flex-col items-center">
                <h1
                  className="
                    font-bold tracking-tight leading-[1.08]
                    text-4xl md:text-[55px] lg:text-[59px]   /* tuned size so lines fit */
                    bg-gradient-to-b from-slate-200 to-slate-500 bg-clip-text text-transparent
                  "
                >
                  {/* md+: exact two lines with fixed breaks; mobile: natural wrap */}
                  <span className="hidden md:block">
                    <span className="block whitespace-nowrap">{a.linesMd[0]}</span>
                    <span className="block whitespace-nowrap">{a.linesMd[1]}</span>
                  </span>
                  <span className="md:hidden">{a.headline}</span>
                </h1>

                <p className="mt-4 text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
                  {a.subheadline}
                </p>
              </div>

              {/* CTAs — fixed distance from subtitle */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  href={a.cta1.href}
                  className="inline-flex items-center justify-center h-9 md:h-10 px-4 md:px-5 rounded-full text-sm md:text-[15px] font-medium bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                >
                  {a.cta1.text}
                </Link>
                <Link
                  href={a.cta2.href}
                  className="inline-flex items-center justify-center h-9 md:h-10 px-4 md:px-5 rounded-full text-sm md:text-[15px] font-medium bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500/30"
                >
                  {a.cta2.text}
                </Link>
              </div>
            </div>

            {/* Value props — with hover lighting */}
            <div className="mt-16 grid md:grid-cols-3 gap-6 text-center">
              {[
                { emoji: '🚀', title: 'Rapid Launch', text: 'From idea to live product' },
                { emoji: '🤝', title: 'Complete Ecosystem', text: 'Everything you need to succeed' },
                { emoji: '💡', title: 'AI-Powered', text: 'Smart tools at every step' },
              ].map((item) => (
                <div
                  key={item.title}
                  className="
                    group relative overflow-hidden
                    rounded-2xl border border-slate-700/50
                    bg-slate-800/30 backdrop-blur p-4
                    transition-transform hover:-translate-y-0.5
                  "
                >
                  {/* hover glow */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  >
                    <div className="absolute -inset-12 blur-2xl bg-[radial-gradient(120%_120%_at_50%_0%,rgba(168,85,247,0.35),transparent_60%)]" />
                    <div className="absolute inset-0 blur-xl bg-gradient-to-r from-purple-500/10 via-fuchsia-500/10 to-purple-500/10" />
                  </div>

                  <div className="relative">
                    <div className="text-2xl mb-2">{item.emoji}</div>
                    <div className="text-sm font-semibold text-slate-200">{item.title}</div>
                    <div className="text-xs text-slate-400">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
