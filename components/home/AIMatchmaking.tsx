// components/home/AIMatchmaking.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Users, Briefcase, Lightbulb, Building } from 'lucide-react'

const liveMatches = [
  {
    type: 'Investors → Startups',
    icon: <Briefcase className="w-5 h-5" />,
    description: 'Your portfolio needs SaaS. BuildCo has 87 Build Score + SaaS focus',
    compatibility: 94,
    action: 'Connect Now'
  },
  {
    type: 'Mentors → Founders',
    icon: <Users className="w-5 h-5" />,
    description: 'You need growth expertise. James scaled 3 startups to $10M',
    compatibility: 91,
    action: 'Schedule Call'
  },
  {
    type: 'Enterprises → Builders',
    icon: <Building className="w-5 h-5" />,
    description: 'Your innovation lab needs AI support tools. 4 builders match',
    compatibility: 88,
    action: 'View Matches'
  },
  {
    type: 'Accelerator Cohorts',
    icon: <Lightbulb className="w-5 h-5" />,
    description: '17 compatible startups for your next batch. All pre-validated.',
    compatibility: 92,
    action: 'Review Batch'
  }
]

export default function AIMatchmaking() {
  const [selectedMatch, setSelectedMatch] = useState(0)

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-purple-400 mb-4">
              <span className="text-sm font-medium">NEW SECTION</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-slate-200 to-slate-500 bg-clip-text text-transparent mb-4">
              The Ecosystem That Connects Itself
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              🤖 AI-Powered Connections Happening Now
            </p>
          </div>

          {/* Live matching visualization */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: Match list */}
            <div className="space-y-4">
              {liveMatches.map((match, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedMatch(index)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedMatch === index 
                      ? 'bg-purple-500/20 border-purple-500' 
                      : 'bg-slate-800/50 border-slate-700 hover:border-purple-500/50'
                  }`}
                >
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
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-slate-500">Match Compatibility:</div>
                      <div className="text-sm font-bold text-purple-400">{match.compatibility}%</div>
                    </div>
                    <button className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1">
                      {match.action}
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  
                  {/* Compatibility bar */}
                  <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-purple-400 transition-all"
                      style={{ width: `${match.compatibility}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Visual representation */}
            <div className="relative h-[400px] bg-slate-900/50 rounded-xl border border-slate-700 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Animated connection lines */}
                  <svg className="absolute inset-0 w-full h-full">
                    <defs>
                      <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgb(168, 85, 247)" stopOpacity="0" />
                        <stop offset="50%" stopColor="rgb(168, 85, 247)" stopOpacity="1" />
                        <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Animated lines connecting nodes */}
                    <line
                      x1="50"
                      y1="100"
                      x2="250"
                      y2="200"
                      stroke="url(#gradient-line)"
                      strokeWidth="2"
                      className="animate-pulse"
                    />
                    <line
                      x1="250"
                      y1="200"
                      x2="150"
                      y2="300"
                      stroke="url(#gradient-line)"
                      strokeWidth="2"
                      className="animate-pulse delay-75"
                    />
                  </svg>

                  {/* Network nodes */}
                  <div className="absolute top-20 left-10 w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/50">
                    <Briefcase className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="absolute top-40 right-20 w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/50">
                    <Users className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/50">
                    <Building className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </div>

              {/* Overlay text */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur rounded-lg p-3">
                <p className="text-sm text-slate-400">
                  Real-time matching powered by AI analysis of skills, needs, and compatibility scores
                </p>
              </div>
            </div>
          </div>

          {/* CTAs */}
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
