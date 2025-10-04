// components/home/AcceleratorCommand.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { CheckCircle, XCircle, Users, Rocket } from 'lucide-react'

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

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-red-900/20 rounded-xl border border-red-500/30 p-6">
              <h3 className="text-lg font-semibold text-red-400 mb-4">Traditional Accelerator</h3>
              <ul className="space-y-3">
                {[
                  'Lengthy programs',
                  'Manual processes',
                  'Tracking spreadsheets',
                  'Generic mentorship',
                  'Variable outcomes'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-900/20 rounded-xl border border-green-500/30 p-6">
              <h3 className="text-lg font-semibold text-green-400 mb-4">BuildAIStartups Accelerator</h3>
              <ul className="space-y-3">
                {[
                  'Rapid deployment',
                  'Automated workflows',
                  'Real-time dashboards',
                  'AI-matched mentors',
                  'Consistent results'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-slate-200 mb-6">Your Accelerator Tools</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Cohort Batch Manager', desc: 'Manage multiple startups efficiently' },
                { title: 'Mentor Assignment AI', desc: 'Perfect expertise matching' },
                { title: 'Demo Day Builder', desc: 'Streamline pitch preparation' },
                { title: 'Program Analytics', desc: 'Track success metrics' },
                { title: 'Graduation Gateway', desc: 'Automated milestone tracking' },
                { title: 'Investor Network', desc: 'Connect with VCs' }
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

          <div className="flex gap-4 justify-center mt-8">
            <Link
              href="/accelerator"
              className="btn bg-purple-500 text-white hover:bg-purple-600"
            >
              Launch Your Program
            </Link>
            <Link
              href="/demo"
              className="btn bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700"
            >
              See Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
