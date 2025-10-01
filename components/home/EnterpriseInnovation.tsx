// components/home/EnterpriseInnovation.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { Building, Shield, Users, TrendingUp, Zap, Settings } from 'lucide-react'

export default function EnterpriseInnovation() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-purple-400 mb-4">
              <span className="text-sm font-medium">NEW SECTION</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-slate-200 to-slate-500 bg-clip-text text-transparent mb-4">
              Your Own AI Venture Studio. Completely White-Labeled.
            </h2>
          </div>

          {/* White-label features grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <div className="text-lg font-semibold text-slate-200 mb-4">Your Control</div>
              {[
                'Your Brand, Your Domain',
                'Your Innovation Metrics',
                'Your Integration Stack',
                'Your Compliance Rules',
                'Your Success Stories'
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-slate-300">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  {item}
                </div>
              ))}
            </div>

            {/* Fortune 500 Dashboard Visual */}
            <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-6">
              <div className="text-sm text-purple-400 mb-2">Fortune 500 Dashboard</div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">AI Ventures Launched</span>
                  <span className="text-2xl font-bold text-purple-400">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Acquired Back Into Core</span>
                  <span className="text-2xl font-bold text-green-400">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">New Revenue Streams</span>
                  <span className="text-2xl font-bold text-blue-400">$47M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Employee Satisfaction</span>
                  <span className="text-2xl font-bold text-yellow-400">89%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features checklist */}
          <div className="bg-slate-800/30 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-slate-200 mb-6">Enterprise Features</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: <Shield />, text: 'Complete White-Label Platform' },
                { icon: <Settings />, text: 'Custom Compliance Framework' },
                { icon: <Users />, text: 'Enterprise SSO + RBAC' },
                { icon: <TrendingUp />, text: 'Department Budget Controls' },
                { icon: <Zap />, text: 'Legacy System Connectors' },
                { icon: <Building />, text: 'Innovation KPI Dashboard' }
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    {React.cloneElement(feature.icon, { className: 'w-5 h-5 text-purple-400' })}
                  </div>
                  <span className="text-slate-300">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-4 justify-center mt-8">
            <Link
              href="/enterprise"
              className="btn bg-purple-500 text-white hover:bg-purple-600"
            >
              Deploy Innovation Lab
            </Link>
            <Link
              href="/customers"
              className="btn bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700"
            >
              See Enterprise Customers
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
