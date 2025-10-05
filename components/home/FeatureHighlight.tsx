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
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left content – keep above orb layers */}
            <div
              className={`relative z-10 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              {/* Label styled EXACTLY like the StartupJourney label */}
              <div className="inline-flex items-center gap-2 text-purple-400 mb-4">
                <span className="text-sm font-medium">THE AUTONOMY-FIRST BUILDER</span>
              </div>

              {/* Main headline stays as the big heading */}
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

            {/* AI Orb Visual */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="relative pt-16 md:pt-20 pb-5 md:pb-7 -mt-10 md:-mt-12">
                {/* Particles behind the orb for subtle depth */}
                <Particles className="absolute inset-0 -z-10" quantity={8} staticity={30} />
                {/* AI Orb Component */}
                <AIOrb />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
