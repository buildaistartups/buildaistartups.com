// components/home/AIMatchmaking.tsx
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Users, Briefcase, Lightbulb, Building } from 'lucide-react'
import AIMatchmakingVisual from '@/components/AIMatchmakingVisual'

const liveMatches = [
  {
    type: 'Investors → Startups',
    icon: <Briefcase className="w-5 h-5" />,
    description: 'Find startups that match your investment thesis',
    action: 'Connect Now',
    glowColor: 'rgba(244,114,182,0.12)' // rose
  },
  {
    type: 'Mentors → Founders',
    icon: <Users className="w-5 h-5" />,
    description: 'Get matched with experienced mentors in your field',
    action: 'Schedule Call',
    glowColor: 'rgba(99,102,241,0.12)' // indigo
  },
  {
    type: 'Enterprises → Builders',
    icon: <Building className="w-5 h-5" />,
    description: 'Connect with builders for your innovation needs',
    action: 'View Matches',
    glowColor: 'rgba(20,184,166,0.12)' // teal
  },
  {
    type: 'Accelerator Cohorts',
    icon: <Lightbulb className="w-5 h-5" />,
    description: 'Find compatible startups for your program',
    action: 'Review Batch',
    glowColor: 'rgba(234,179,8,0.12)' // yellow
  }
]

export default function AIMatchmaking() {
  const [selectedMatch, setSelectedMatch] = useState(0)

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="py-12 md:py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-purple-400 mb-4">
              <span className="text-sm font-medium">AI MATCHMAKING ENGINE</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-slate-200 to-slate-500 bg-clip-text text-transparent mb-4">
              The Ecosystem That Connects Itself
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              AI-Powered connections that create value for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {liveMatches.map((match, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedMatch(index)}
                  className={`spotlight-card relative overflow-hidden p-4 rounded-lg border cursor-pointer transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${
                    selectedMatch === index 
                      ? 'bg-purple-500/20 border-purple-500' 
                      : 'bg-slate-900/25 border-slate-800 hover:border-purple-500/50'
                  }`}
                >
                  <div
                    className="pointer-events-none absolute -top-10 -left-10 h-56 w-72 -z-10 blur-2xl"
                    style={{
                      background: `radial-gradient(closest-side, ${match.glowColor}, transparent 60%)`
                    }}
                    aria-hidden="true"
                  />
                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                          {match.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-200 mb-1">{match.type}</h4>
                          <p className="text-sm text-slate-400">{match.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end mt-3">
                      <button className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1">
                        {match.action}
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="spotlight-card relative h-[400px] bg-slate-900/25 rounded-xl border border-slate-800 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div
                className="pointer-events-none absolute -top-10 -right-10 h-64 w-80 -z-10
                           bg-[radial-gradient(closest-side,rgba(168,85,247,0.12),transparent_60%)]
                           blur-2xl"
                aria-hidden="true"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8 relative">
                  {/* REPLACED 🤖 with animation */}
                  <div className="mb-4">
                    <AIMatchmakingVisual />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-200 mb-2">
                    Intelligent Matching
                  </h3>
                  <p className="text-sm text-slate-400">
                    Our AI analyzes skills, needs, and compatibility to create perfect matches across the ecosystem
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center mt-8">
            <Link
              href="/matches"
              className="btn bg-purple-500 text-white hover:bg-purple-600"
            >
              See Your Matches
            </Link>
            <Link
              href="/preferences"
              className="btn bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700"
            >
              Configure Preferences
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
