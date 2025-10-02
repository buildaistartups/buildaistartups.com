// components/home/FeatureHighlight.tsx
'use client'

import React from 'react'
import Image from 'next/image'

export default function FeatureHighlight() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-200 pb-3">
                The autonomy-first builder
              </div>
              <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">
                Build faster than ever before
              </h2>
              <p className="text-lg text-slate-400 mb-6">
                Our AI-powered platform handles the complexity so you can focus on your vision. From idea validation to production deployment, we automate the entire journey.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-purple-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-300">Complete CI/CD pipeline setup</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-purple-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-300">Built-in payments and authentication</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-purple-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-300">Production-ready from day one</span>
                </li>
              </ul>
            </div>
            
            <div className="relative">
              {/* Animated illustration placeholder */}
              <div className="relative h-[400px] bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/30 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🚀</div>
                  <h3 className="text-xl font-semibold text-slate-200 mb-2">
                    Visual Builder
                  </h3>
                  <p className="text-sm text-slate-400">
                    Watch your startup come to life with our visual building experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
