// components/home/Hero.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Particles from '@/components/particles'
import Illustration from '@/public/images/glow-bottom.svg'

const audiences = [
  { title: 'For Startups',
    headline: 'Build, Scale, and Profit from AI. Complete Toolkit Included.',
    subheadline: 'Everything you need to launch and grow your AI business in one platform',
    cta1: { text: 'Start Building', href: '/generate' },
    cta2: { text: 'Access Startup Tools', href: '/solutions/indie-makers' } },
  { title: 'For Enterprises',
    headline: 'Launch Your Innovation Lab. White-Label Everything.',
    subheadline: 'Transform your organization into an AI powerhouse with enterprise-grade tools',
    cta1: { text: 'Deploy Enterprise Lab', href: '/solutions/enterprises' },
    cta2: { text: 'See Enterprise Features', href: '/product/api' } },
  { title: 'For Accelerators',
    headline: 'Run World-Class Programs. Ship Real Products.',
    subheadline: 'Complete cohort management system that gets startups to revenue faster',
    cta1: { text: 'Manage Your Cohort', href: '/solutions/accelerators' },
    cta2: { text: 'Demo Day Tools', href: '/product/ecosystem' } },
  { title: 'For Product Managers',
    headline: 'Enterprise Workflows. Zero Dependencies.',
    subheadline: 'Integrate AI capabilities directly into your existing enterprise stack',
    cta1: { text: 'See Enterprise Integrations', href: '/solutions/product-teams' },
    cta2: { text: 'Book PM Demo', href: '/contact?type=demo' } },
]

export default function Hero() {
  const [currentAudience, setCurrentAudience] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentAudience((p) => (p + 1) % audiences.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const current = audiences[currentAudience]

  return (
    <section className="relative">
      {/* Glow layer */}
      <div className="absolute inset-0 -z-10 -mx-28 rounded-b-[3rem] pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0">
          <Image src={Illustration} className="max-w-none" width={2146} height={744} priority alt="" />
        </div>
      </div>

      {/* Particles above glow */}
      <Particles className="absolute inset-0 -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="pt-32 pb-16 md:pt-52 md:pb-32">

          {/* Dots + label */}
          <div className="text-center mb-8">
            <div className="inline-flex gap-2">
              {audiences.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentAudience(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentAudience ? 'w-8 bg-purple-500' : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>
            <div className="mt-4 text-sm font-medium text-purple-400">{current.title}</div>
          </div>

          {/* Main content */}
          <div className="text-center">
            {/* FIX: reserve stable height for headline + subheadline */}
            <div className="min-h-[170px] md:min-h-[224px] lg:min-h-[248px] flex flex-col items-center justify-center">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 bg-gradient-to-b from-slate-200 to-slate-500 bg-clip-text text-transparent">
                {current.headline}
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                {current.subheadline}
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href={current.cta1.href}
                className="inline-flex items-center justify-center h-9 md:h-10 px-4 md:px-5 rounded-full text-sm md:text-[15px] font-medium bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
              >
                {current.cta1.text}
              </Link>
              <Link
                href={current.cta2.href}
                className="inline-flex items-center justify-center h-9 md:h-10 px-4 md:px-5 rounded-full text-sm md:text-[15px] font-medium bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500/30"
              >
                {current.cta2.text}
              </Link>
            </div>
          </div>

          {/* Value props */}
          <div className="mt-16 grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-slate-800/30 backdrop-blur rounded-lg p-4 border border-slate-700/50">
              <div className="text-2xl mb-2">🚀</div>
              <div className="text-sm font-semibold text-slate-200">Rapid Launch</div>
              <div className="text-xs text-slate-400">From idea to live product</div>
            </div>
            <div className="bg-slate-800/30 backdrop-blur rounded-lg p-4 border border-slate-700/50">
              <div className="text-2xl mb-2">🤝</div>
              <div className="text-sm font-semibold text-slate-200">Complete Ecosystem</div>
              <div className="text-xs text-slate-400">Everything you need to succeed</div>
            </div>
            <div className="bg-slate-800/30 backdrop-blur rounded-lg p-4 border border-slate-700/50">
              <div className="text-2xl mb-2">💡</div>
              <div className="text-sm font-semibold text-slate-200">AI-Powered</div>
              <div className="text-xs text-slate-400">Smart tools at every step</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
