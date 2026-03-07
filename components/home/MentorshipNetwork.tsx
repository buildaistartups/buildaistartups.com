// components/home/MentorshipNetwork.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { Users, Briefcase, Code, TrendingUp, DollarSign, CheckCircle } from 'lucide-react'

const mentorCategories = [
  { icon: <Briefcase />, title: 'Serial Entrepreneurs', color: 'purple' },
  { icon: <TrendingUp />, title: 'Growth Experts', color: 'green' },
  { icon: <Code />, title: 'Technical CTOs', color: 'blue' },
  { icon: <DollarSign />, title: 'Fundraising Veterans', color: 'yellow' }
]

export default function MentorshipNetwork() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-purple-400 mb-4">
              <span className="text-sm font-medium">MENTORSHIP NETWORK</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-slate-200 to-slate-500 bg-clip-text text-transparent mb-4">
              Every Founder Gets a Perfect Mentor Match
            </h2>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-purple-400 mb-2">Expert Mentorship</h3>
            <p className="text-lg text-slate-400">Connect with experienced founders and industry experts</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {/* Card 1 — purple tint */}
            <div className="spotlight-card relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/25 p-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div
                className="pointer-events-none absolute -top-10 -left-10 h-56 w-72 -z-10
                           bg-[radial-gradient(closest-side,rgba(168,85,247,0.12),transparent_60%)]
                           blur-2xl"
                aria-hidden="true"
              />
              <div className="relative">
                <div className="inline-flex p-3 bg-purple-500/20 rounded-lg mb-4">
                  <Briefcase className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-sm text-slate-200">Serial Entrepreneurs</div>
              </div>
            </div>

            {/* Card 2 — green tint */}
            <div className="spotlight-card relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/25 p-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div
                className="pointer-events-none absolute -top-10 -right-10 h-56 w-72 -z-10
                           bg-[radial-gradient(closest-side,rgba(34,197,94,0.12),transparent_60%)]
                           blur-2xl"
                aria-hidden="true"
              />
              <div className="relative">
                <div className="inline-flex p-3 bg-purple-500/20 rounded-lg mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-sm text-slate-200">Growth Experts</div>
              </div>
            </div>

            {/* Card 3 — blue tint */}
            <div className="spotlight-card relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/25 p-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div
                className="pointer-events-none absolute -bottom-12 -left-10 h-56 w-72 -z-10
                           bg-[radial-gradient(closest-side,rgba(59,130,246,0.12),transparent_60%)]
                           blur-2xl"
                aria-hidden="true"
              />
              <div className="relative">
                <div className="inline-flex p-3 bg-purple-500/20 rounded-lg mb-4">
                  <Code className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-sm text-slate-200">Technical CTOs</div>
              </div>
            </div>

            {/* Card 4 — yellow tint */}
            <div className="spotlight-card relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/25 p-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div
                className="pointer-events-none absolute -bottom-12 -right-10 h-56 w-72 -z-10
                           bg-[radial-gradient(closest-side,rgba(234,179,8,0.12),transparent_60%)]
                           blur-2xl"
                aria-hidden="true"
              />
              <div className="relative">
                <div className="inline-flex p-3 bg-purple-500/20 rounded-lg mb-4">
                  <DollarSign className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-sm text-slate-200">Fundraising Veterans</div>
              </div>
            </div>
          </div>

          {/* AI Matching Criteria card with spotlight effect */}
          <div className="spotlight-card relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/25 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div
              className="pointer-events-none absolute -top-10 -right-10 h-64 w-80 -z-10
                         bg-[radial-gradient(closest-side,rgba(139,92,246,0.12),transparent_60%)]
                         blur-2xl"
              aria-hidden="true"
            />
            <div className="relative">
              <h3 className="text-xl font-semibold text-slate-200 mb-6">AI Matching Criteria</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  'Industry Alignment',
                  'Stage Compatibility',
                  'Skill Gaps Analysis',
                  'Timezone Optimization',
                  'Communication Style'
                ].map((criteria) => (
                  <div key={criteria} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-slate-300">{criteria}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center mt-8">
            <Link
              href="/get-matched"
              className="btn bg-purple-500 text-white hover:bg-purple-600"
            >
              Get Matched
            </Link>
            <Link
              href="/become-mentor"
              className="btn bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700"
            >
              Become a Mentor
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
