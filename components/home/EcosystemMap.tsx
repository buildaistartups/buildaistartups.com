// components/home/EcosystemMap.tsx
'use client'

import React from 'react'
import Link from 'next/link'

export default function EcosystemMap() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-slate-200 to-slate-500 bg-clip-text text-transparent mb-4">
              Every Connection Creates Value for Everyone
            </h2>
          </div>

          <div className="relative h-[500px] bg-slate-900/50 rounded-xl border border-slate-700 overflow-hidden mb-12">
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(168, 85, 247)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              
              <line x1="50%" y1="20%" x2="20%" y2="40%" stroke="url(#grad1)" strokeWidth="2" />
              <line x1="50%" y1="20%" x2="80%" y2="40%" stroke="url(#grad1)" strokeWidth="2" />
              <line x1="20%" y1="40%" x2="20%" y2="70%" stroke="url(#grad1)" strokeWidth="2" />
              <line x1="80%" y1="40%" x2="80%" y2="70%" stroke="url(#grad1)" strokeWidth="2" />
              <line x1="20%" y1="70%" x2="50%" y2="80%" stroke="url(#grad1)" strokeWidth="2" />
              <line x1="80%" y1="70%" x2="50%" y2="80%" stroke="url(#grad1)" strokeWidth="2" />
            </svg>

            <div className="absolute top-[15%] left-1/2 -translate-x-1/2 bg-purple-500/20 rounded-lg px-4 py-2 border border-purple-500/50">
              <span className="text-purple-400 font-semibold">🏗️ BUILDERS</span>
            </div>
            <div className="absolute top-[35%] left-[15%] bg-blue-500/20 rounded-lg px-4 py-2 border border-blue-500/50">
              <span className="text-blue-400 font-semibold">STUDENTS</span>
            </div>
            <div className="absolute top-[35%] right-[15%] bg-green-500/20 rounded-lg px-4 py-2 border border-green-500/50">
              <span className="text-green-400 font-semibold">MENTORS</span>
            </div>
            <div className="absolute top-[65%] left-[15%] bg-yellow-500/20 rounded-lg px-4 py-2 border border-yellow-500/50">
              <span className="text-yellow-400 font-semibold">ACCELERATORS</span>
            </div>
            <div className="absolute top-[65%] right-[15%] bg-red-500/20 rounded-lg px-4 py-2 border border-red-500/50">
              <span className="text-red-400 font-semibold">INVESTORS</span>
            </div>
            <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 bg-cyan-500/20 rounded-lg px-4 py-2 border border-cyan-500/50">
              <span className="text-cyan-400 font-semibold">ENTERPRISES</span>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="text-2xl font-bold text-slate-200">🏛️ ECOSYSTEM</div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-xl font-semibold text-slate-200 mb-4">Network Intelligence</h3>
            <p className="text-slate-400">
              Our AI-powered ecosystem connects all stakeholders to create maximum value
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Link
              href="/ecosystem"
              className="btn bg-purple-500 text-white hover:bg-purple-600"
            >
              Join Ecosystem
            </Link>
            <Link
              href="/network-effects"
              className="btn bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700"
            >
              See Network Effects
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
