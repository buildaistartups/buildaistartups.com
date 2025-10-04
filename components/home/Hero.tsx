// components/home/Hero.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Particles from '@/components/particles'
import Illustration from '@/public/images/glow-bottom.svg'

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
  },
]

export default function Hero() {
  const [currentAudience, setCurrentAudience] = useState(0)

  // --- Keep a stable height for the title + subtitle block across slides ---
  const textBlockRef = useRef<HTMLDivElement | null>(null)
  const [textBlockHeight, setTextBlockHeight] = useState<number | null>(null)

  useEffect(() => {
    const measure = () => {
      const container = textBlockRef.current
      if (!container) return

      // Create an offscreen measuring root with the same width as the live block
      const w = container.clientWidth || 900
      const root = document.createElement('div')
      root.style.position = 'absolute'
      root.style.left = '-99999px'
      root.style.top = '0'
      root.style.width = `${w}px`
      root.style.pointerEvents = 'none'
      root.style.visibility = 'hidden'
      document.body.appendChild(root)

      // Build a measuring node per audience with the exact same classes
      audiences.forEach(a => {
        const wrap = document.createElement('div')
        wrap.style.marginBottom = '0' // no gaps between samples

        const h1 = document.createElement('h1')
        h1.className =
          'text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-b from-slate-200 to-slate-500 bg-clip-text text-transparent tracking-tight'
        h1.textContent = a.headline

        const p = document.createElement('p')
        p.className = 'text-lg text-slate-400 max-w-2xl mx-auto'
        p.textContent = a.subheadline

        wrap.appendChild(h1)
        wrap.appendChild(p)
        root.appendChild(wrap)
      })

      const max = Array.from(root.children).reduce((acc, el) => {
        const h = (el as HTMLElement).getBoundingClientRect().height
        return Math.max(acc, h)
      }, 0)

      document.body.removeChild(root)
      setTextBlockHeight(Math.ceil(max))
    }

    // Initial + on resize
    measure()
    const ro = new ResizeObserver(measure)
    if (textBlockRef.current) ro.observe(textBlockRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  // Rotate slides
  useEffect(() => {
    const id = setInterval(
      () => setCurrentAudience(p => (p + 1) % audiences.length),
      5000
    )
    return () => clearInterval(id)
  }, [])

  const current = audiences[currentAudience]

  return (
    <section className="relative">
      {/* Glow illustration behind everything */}
      <div
        className="absolute inset-0 -z-10 -mx-28 rounded-b-[3rem] pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0">
          <Image
            src={Illustration}
            className="max-w-none"
            width={2146}
            height={744}
            priority
            alt=""
          />
        </div>
      </div>

      {/* Particles above glow */}
      <Particles className="absolute inset-0 -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="pt-32 pb-16 md:pt-52 md:pb-32">
          {/* Carousel dots + label */}
          <div className="text-center mb-8">
            <div className="inline-flex gap-2">
              {audiences.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentAudience(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentAudience ? 'w-8 bg-purple-500' : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                  aria-label={`Show: ${audiences[i].title}`}
                />
              ))}
            </div>
            <div className="mt-4 text-sm font-medium text-purple-400">
              {current.title}
            </div>
          </div>

          {/* Main content */}
          <div className="text-center">
            {/* Stable-height text block (prevents vertical jump) */}
            <div
              ref={textBlockRef}
              style={{
                height: textBlockHeight ?? undefined,             // lock when measured
              }}
              className={`
                ${textBlockHeight ? '' : 'min-h-[200px] md:min-h-[240px] lg:min-h-[260px]'}
                flex flex-col items-center justify-start gap-4
              `}
            >
              <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-b from-slate-200 to-slate-500 bg-clip-text text-transparent tracking-tight">
                {current.headline}
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                {current.subheadline}
              </p>
            </div>

            {/* CTAs (fixed distance from text block) */}
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

          {/* Value props (stay locked in place) */}
          <div className="mt-16 grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-slate-800/30 backdrop-blur rounded-lg p-4 border border-slate-700/50">
              <div className="text-2xl mb-2">🚀</div>
              <div className="text-sm font-semibold text-slate-200">Rapid Launch</div>
              <div className="text-xs text-slate-400">From idea to live product</div>
            </div>
            <div className="bg-slate-800/30 backdrop-blur rounded-lg p-4 border border-slate-700/50">
              <div className="text-2xl mb-2">🤝</div>
