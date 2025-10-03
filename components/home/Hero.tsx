// components/home/Hero.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Particles from '@/components/particles'
import Glow from '@/public/images/glow-bottom.svg'
import SpotlightGroup from '@/components/ui/SpotlightGroup'
import SpotlightCard from '@/components/ui/SpotlightCard'

const audiences = [
  {
    title: 'For Startups',
    headline: 'Build, Scale, and Profit from AI. Complete Toolkit Included.',
    subheadline: 'Everything you need to launch and grow your AI business in one platform',
    cta1: { text: 'Start Building', href: '/generate' },
    cta2: { text: 'Access Startup Tools', href: '/solutions/indie-makers' }
  },
  {
    title: 'For Enterprises',
    headline: 'Launch Your Innovation Lab. White-Label Everything.',
    subheadline: 'Transform your organization into an AI powerhouse with enterprise-grade tools',
    cta1: { text: 'Deploy Enterprise Lab', href: '/solutions/enterprises' },
    cta2: { text: 'See Enterprise Features', href: '/product/api' }
  },
  {
    title: 'For Accelerators',
    headline: 'Run World-Class Programs. Ship Real Products.',
    subheadline: 'Complete cohort management system that gets startups to revenue faster',
    cta1: { text: 'Manage Your Cohort', href: '/solutions/accelerators' },
    cta2: { text: 'Demo Day Tools', href: '/product/ecosystem' }
  },
  {
    title: 'For Product Managers',
    headline: 'Enterprise Workflows. Zero Dependencies.',
    subheadline: 'Integrate AI capabilities directly into your existing enterprise stack',
    cta1: { text: 'See Enterprise Integrations', href: '/solutions/product-teams' },
    cta2: { text: 'Book PM Demo', href: '/contact?type=demo' }
  }
]

export default function Hero() {
  const [currentAudience, setCurrentAudience] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAudience((prev) => (prev + 1) % audiences.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const current = audiences[currentAudience]

  return (
    <section className="relative">
      {/* Stars layer */}
      <Particles className="absolute inset-0 -z-10" />

      {/* Purple glow background from the old hero */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 -z-10">
          <Image
            src={Glow}
            className="max-w-none"
            width={2146}
            height={780}
            priority
            alt=""
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="pt-32 pb-16 md:pt-52 md:pb-32">
          {/* Rotating audience indicator */}
          <div className="text-center mb-8">
            <div className="inline-flex gap-2">
              {audiences.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentAudience(index)}
                  aria-label={`Show content for ${audiences[index].title}`}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentAudience
                      ? 'w-8 bg-purple-500'
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>
            <div className="mt-4 text-sm font-medium text-purple-400">
              {current.title}
            </div>
          </div>

          {/* Main content */}
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-b from-slate-200 to-slate-500 bg-clip-text text-transparent">
              {current.headline}
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              {current.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={current.cta1.href}
                className="btn bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700"
              >
                {current.cta1.text}
              </Link>
              <Link
                href={current.cta2.href}
                className="btn bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700"
              >
                {current.cta2.text}
              </Link>
            </div>
          </div>

          {/* Value props with EXACT Stellar-style spotlight */}
          <SpotlightGroup>
            <div className="mt-16 grid md:grid-cols-3 gap-6 text-center">
              <SpotlightCard>
                <div className="text-2xl mb-2">🚀</div>
                <div className="text-sm font-semibold text-slate-200">Rapid Launch</div>
                <div className="text-xs text-slate-400">From idea to live product</div>
              </SpotlightCard>

              <SpotlightCard>
                <div className="text-2xl mb-2">🤝</div>
                <div className="text-sm font-semibold text-slate-200">Complete Ecosystem</div>
                <div className="text-xs text-slate-400">Everything you need to succeed</div>
              </SpotlightCard>

              <SpotlightCard>
                <div className="text-2xl mb-2">💡</div>
                <div className="text-sm font-semibold text-slate-200">AI-Powered</div>
                <div className="text-xs text-slate-400">Smart tools at every step</div>
              </SpotlightCard>
            </div>
          </SpotlightGroup>
        </div>
      </div>
    </section>
  )
}
