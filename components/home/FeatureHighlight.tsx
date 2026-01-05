// components/home/FeatureHighlight.tsx
'use client'

import React, { useEffect, useState } from 'react'
import Particles from '@/components/particles'
import AIOrb from '@/components/aiorb'

export default function FeatureHighlight() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Slightly increased bottom padding */}
        <div className="pt-12 md:pt-20 pb-5 md:pb-7">
          
          {/* --- PHASE 1: NEW VISUAL (Idea -> Output) --- */}
          <div className="text-center">
             <div className="inline-flex items-center gap-2 text-purple-400 mb-4 justify-center">
               <span className="text-sm font-medium uppercase tracking-wider">What You Get</span>
             </div>
             <h3 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4 mb-8">
               We generate the boring stuff <br /> so you can code the fun stuff.
             </h3>
             <div className="relative max-w-4xl mx-auto bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-purple-500/10 blur-[100px] -z-10"></div>
                <div className="grid md:grid-cols-3 gap-8 items-center">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-4 border border-slate-700 shadow-lg">
                            <span className="text-3xl">💡</span>
                        </div>
                        <div className="font-semibold text-slate-200">Your Idea</div>
                        <div className="text-xs text-slate-500 mt-1">"Uber for Dog Walking"</div>
                    </div>
                    <div className="hidden md:flex justify-center text-purple-500">
                        <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <div className="w-16 h-16 bg-purple-900/20 rounded-2xl flex items-center justify-center mb-4 border border-purple-500/30 shadow-lg shadow-purple-500/10">
                                <span className="text-3xl">📄</span>
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center border-2 border-slate-900">
                                <span className="text-sm">💻</span>
                            </div>
                        </div>
                        <div className="font-semibold text-slate-200">Blueprint & Repo</div>
                        <div className="text-xs text-slate-500 mt-1">Architecture, DB, Auth</div>
                    </div>
                </div>
             </div>
          </div>

          {/* --- PHASE 1 HIDDEN: ORIGINAL COMPLEX LAYOUT --- */}
          {/*
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            <div
              className={`relative z-10 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="inline-flex items-center gap-2 text-purple-400 mb-4">
                <span className="text-sm font-medium">THE AUTONOMY-FIRST BUILDER</span>
              </div>

              <h3 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">
                Build faster than ever before
              </h3>

              <p className="text-lg text-slate-400 mb-6">
                Our AI-powered platform handles the complexity so you can focus on your vision. From idea validation to
                production deployment, we automate the entire journey.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-purple-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-300">Complete CI/CD pipeline setup in minutes</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-purple-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-300">Built-in payments, auth, and analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-purple-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-300">Production-ready from day one</span>
                </li>
              </ul>
            </div>

            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="relative pt-16 md:pt-20 pb-5 md:pb-7 -mt-10 md:-mt-12">
                <Particles className="absolute inset-0 -z-10" quantity={8} staticity={30} />
                <AIOrb />
              </div>
            </div>
          </div>
          */}

        </div>
      </div>
    </section>
  )
}
