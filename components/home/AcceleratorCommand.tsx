// components/home/AcceleratorCommand.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { CheckCircle, XCircle, Rocket } from 'lucide-react'

export default function AcceleratorCommand() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="py-12 md:py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-purple-400 mb-4">
              <span className="text-sm font-medium">ACCELERATOR TOOLS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-slate-200 to-slate-500 bg-clip-text text-transparent mb-4">
              Run Programs That Ship Products, Not Just Pitch Decks
            </h2>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Traditional Accelerator (rose-tinted neutral glass) */}
            <div className="spotlight-card relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors hover:border-purple-500/30 hover:bg-slate-900/50">
              {/* subtle tint */}
              <div className="pointer-events-none absolute -top-10 -left-10 h-56 w-72 -z-10
                              bg-[radial-gradient(closest-side,rgba(244,114,182,0.12),transparent_60%)] blur-2xl" />
              <h3 className="text-lg font-semibold text-slate-200 mb-4">Traditional Accelerator</h3>
              <ul className="space-y-3">
                {[
                  'Lengthy programs',
                  'Manual processes',
                  'Tracking spreadsheets',
                  'Generic mentorship',
                  'Variable outcomes',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* BuildAIStartups Accelerator (indigo/teal-tinted neutral glass) */}
            <div className="spotlight-card relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors hover:border-purple-500/30 hover:bg-slate-900/50">
              {/* subtle tint */}
              <div className="pointer-events-none absolute -top-10 -right-10 h-56 w-72 -z-10
                              bg-[radial-gradient(closest-side,rgba(99,102,241,0.12),transparent_60%)] blur-2xl" />
              <h3 className="text-lg font-semibold text-slate-200 mb-4">BuildAIStartups Accelerator</h3>
              <ul className="space-y-3">
                {[
                  'Rapid deployment',
                  'Automated workflows',
                  'Real-time dashboards',
                  'AI-matched mentors',
                  'Consistent results',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tools list */}
          <div className="spotlight-card rounded-xl border border-slate-800 bg-slate-900/40 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <h3 className="text-xl font-semibold text-slate-200 mb-6">Your Accelerator Tools</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Cohort Batch Manager', desc: 'Manage multiple startups efficiently' },
                { title: 'Mentor Assignment AI', desc: 'Perfect expertise matching' },
                { title: 'Demo Day Builder', desc: 'Streamline pitch preparation' },
                { title: 'Program Analytics', desc: 'Track success metrics' },
                { title: 'Graduation Gateway', desc: 'Automated milestone tracking' },
                { title: 'Investor Network', desc: 'Connect with VCs' },
              ].map((tool) => (
                <div key={tool.title} className="flex items-start gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg mt-1">
                    <Rocket className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-200">{tool.title}</div>
                    <div className="text-sm text-slate-400">{tool.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs — compact Stellar-sized pills */}
          <div className="flex gap-3 sm:gap-4 justify-center mt-8">
            <Link
              href="/accelerator"
              className="
                inline-flex items-center justify-center
                h-9 md:h-10 px-4 md:px-5
                rounded-full text-sm md:text-[15px] font-medium
                bg-gradient-to-r from-purple-500 to-purple-600 text-white
                hover:from-purple-600 hover:to-purple-700
                focus:outline-none focus:ring-2 focus:ring-purple-500/40
              "
            >
              Launch Your Program
            </Link>
            <Link
              href="/demo"
              className="
                inline-flex items-center justify-center
                h-9 md:h-10 px-4 md:px-5
                rounded-full text-sm md:text-[15px] font-medium
                bg-slate-800 text-slate-200 border border-slate-700
                hover:bg-slate-700
                focus:outline-none focus:ring-2 focus:ring-slate-500/30
              "
            >
              See Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
