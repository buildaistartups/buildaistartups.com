'use client'

import { useState } from 'react'
import Image from 'next/image'
import Illustration from '@/public/images/glow-top.svg'

/* ---------- Small inline icons (no external deps) ---------- */
function IconFileText(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  )
}
function IconScan(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <rect x="8" y="8" width="8" height="8" rx="2" />
    </svg>
  )
}
function IconRefresh(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12a9 9 0 1 1-3-6.7" />
      <path d="M21 3v6h-6" />
    </svg>
  )
}

export default function FeaturesLight() {
  const [tab, setTab] = useState(0)

  const tabs = [
    { title: 'Simplify your security', Icon: IconFileText },
    { title: 'Customer identity', Icon: IconScan },
    { title: 'Adaptable authentication', Icon: IconRefresh },
  ]

  return (
    <section>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Glow background (same as dark, but lighter) */}
        <div className="absolute inset-0 -z-10 -mx-28 rounded-t-[3rem] pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 -z-10">
            <Image src={Illustration} className="max-w-none" width={1404} height={658} alt="Features Illustration" />
          </div>
        </div>

        <div className="pt-16 pb-12 md:pt-52 md:pb-20">
          <div className="max-w-xl mx-auto md:max-w-none flex flex-col md:flex-row md:space-x-8 lg:space-x-16 xl:space-x-20 space-y-8 space-y-reverse md:space-y-0">

            {/* Left column */}
            <div className="md:w-7/12 lg:w-1/2 order-1 md:order-none max-md:text-center" data-aos="fade-down">
              {/* Eyebrow – solid purple */}
              <div className="inline-flex font-semibold pb-3" style={{ color: '#7500D6' }}>
                The security first platform
              </div>

              {/* Title — readable on light */}
              <h3 className="h3 text-slate-900 pb-3">
                Simplify your security with authentication services
              </h3>

              {/* Body copy */}
              <p className="text-lg text-slate-700 mb-8">
                Define access roles for the end-users, and extend your authorization capabilities to implement dynamic access control.
              </p>

              {/* Tabs */}
              <div className="mt-8 max-w-md max-md:mx-auto space-y-3">
                {tabs.map(({ title, Icon }, i) => {
                  const active = tab === i
                  return (
                    <button
                      key={title}
                      onClick={() => setTab(i)}
                      className={[
                        'group flex items-center rounded-md border w-full px-4 py-3 transition-all duration-150 ease-in-out',
                        active
                          ? 'bg-white border-purple-500 shadow-[0_0_0_1px_rgba(168,85,247,.35)]'
                          : 'bg-white/80 border-slate-300 hover:border-slate-400',
                      ].join(' ')}
                      /* Force black text when selected to avoid theme overrides */
                      style={active ? { color: '#0f172a' } : { color: '#64748b' }} // inactive = slate-500
                    >
                      <Icon
                        className="shrink-0 mr-3 h-5 w-5 transition-colors"
                        style={active ? { color: '#0f172a' } : undefined} // selected = black
                      />
                      <span
                        className="truncate transition-colors"
                        style={active ? { color: '#0f172a' } : undefined} // selected = black
                      >
                        {title}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Right column — grid + halo + tile */}
            <div className="md:w-5/12 lg:w-1/2">
              <div className="relative mx-auto md:mx-0 h-[340px] w-full flex items-center justify-center overflow-hidden rounded-2xl">
                {/* Subtle grid */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-[0.22]"
                  aria-hidden="true"
                  viewBox="0 0 400 400"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <pattern id="light-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8b5cf6" strokeWidth="0.6" />
                    </pattern>
                    <radialGradient id="halo" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.35" />
                      <stop offset="60%" stopColor="#a78bfa" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#light-grid)" />
                  <rect width="100%" height="100%" fill="url(#halo)" />
                </svg>

                {/* Pulsing halo circles */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="w-[420px] h-[420px] rounded-full bg-purple-400/25 blur-3xl animate-pulse" />
                  <div className="absolute w-[300px] h-[300px] rounded-full bg-purple-300/25 blur-3xl animate-[ping_2.6s_linear_infinite]" />
                </div>

                {/* Floating tile with the active icon */}
                <div className="relative z-10 w-40 h-40 rounded-2xl bg-white shadow-xl flex items-center justify-center">
                  {(() => {
                    const ActiveIcon = tabs[tab].Icon
                    return <ActiveIcon className="h-12 w-12 text-slate-900" />
                  })()}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
