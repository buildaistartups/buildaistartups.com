// components/home/Hero.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Particles from '@/components/particles'

const audiences = [
  {
    title: 'For Startups',
    headline: 'Build, Scale, and Profit from AI.',
    subheadline: 'Complete toolkit to launch and grow your AI business',
    cta1: { text: 'Start Building', href: '/generate' },
    cta2: { text: 'Explore Tools', href: '/solutions/indie-makers' }
  },
  {
    title: 'For Enterprises',
    headline: 'Launch Your Innovation Lab.',
    subheadline: 'Transform your organization with enterprise-grade AI tools',
    cta1: { text: 'Deploy Lab', href: '/solutions/enterprises' },
    cta2: { text: 'Learn More', href: '/product/api' }
  },
  {
    title: 'For Accelerators',
    headline: 'Run Programs That Ship Products.',
    subheadline: 'Complete cohort management system for real results',
    cta1: { text: 'Manage Cohorts', href: '/solutions/accelerators' },
    cta2: { text: 'View Features', href: '/product/ecosystem' }
  },
  {
    title: 'For Product Managers',
    headline: 'Enterprise Workflows. Zero Dependencies.',
    subheadline: 'Integrate AI directly into your existing stack',
    cta1: { text: 'See Integrations', href: '/solutions/product-teams' },
    cta2: { text: 'Book Demo', href: '/contact?type=demo' }
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
      {/* Keep original Particles background */}
      <Particles className="absolute inset-0 -z-10" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="pt-32 pb-12 md:pt-52 md:pb-20">
          {/* Audience indicator - styled like original */}
          <div className="text-center">
            <div className="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-200 pb-3">
              {current.title}
            </div>
          </div>

          {/* Main content - original styling */}
          <div className="text-center">
            <h1 className="h1 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">
              {current.headline}
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              {current.subheadline}
            </p>
            
            {/* CTAs with original button styling */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={current.cta1.href} 
                className="btn text-slate-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white transition duration-150 ease-in-out group"
              >
                {current.cta1.text}
                <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                  -&gt;
                </span>
              </Link>
              <Link 
                href={current.cta2.href} 
                className="btn text-slate-200 hover:text-white bg-slate-900 bg-opacity-25 hover:bg-opacity-30 border border-slate-700 transition duration-150 ease-in-out"
              >
                {current.cta2.text}
              </Link>
            </div>
          </div>

          {/* Remove fake statistics - Action 2 - Replace with value props */}
          <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-slate-900/50 backdrop-blur rounded-lg p-6 border border-slate-800">
                <div className="text-3xl mb-3">🚀</div>
                <div className="text-sm font-semibold text-slate-200">Rapid Launch</div>
                <div className="text-xs text-slate-400 mt-1">From idea to live product faster than ever</div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-slate-900/50 backdrop-blur rounded-lg p-6 border border-slate-800">
                <div className="text-3xl mb-3">🤝</div>
                <div className="text-sm font-semibold text-slate-200">Complete Ecosystem</div>
                <div className="text-xs text-slate-400 mt-1">Everything you need in one platform</div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-slate-900/50 backdrop-blur rounded-lg p-6 border border-slate-800">
                <div className="text-3xl mb-3">💡</div>
                <div className="text-sm font-semibold text-slate-200">AI-Powered</div>
                <div className="text-xs text-slate-400 mt-1">Smart automation at every step</div>
              </div>
            </div>
          </div>

          {/* Audience switcher dots */}
          <div className="flex justify-center gap-2 mt-8">
            {audiences.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentAudience(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentAudience 
                    ? 'w-8 bg-gradient-to-r from-purple-500 to-purple-600' 
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
                aria-label={`Switch to ${audiences[index].title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
