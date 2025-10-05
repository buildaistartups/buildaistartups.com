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
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-purple-400 mb-4">
              <span className="text-sm font-medium">ENTERPRISE INNOVATION</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-slate-200 to-slate-500 bg-clip-text text-transparent mb-4">
              Your Own AI Venture Studio. Completely White-Labeled.
            </h2>
          </div>

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

            <div className="spotlight-card relative overflow-hidden bg-slate-900/25 rounded-xl border border-slate-800 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div
                className="pointer-events-none absolute -top-10 -right-10 h-56 w-72 -z-10
                           bg-[radial-gradient(closest-side,rgba(99,102,241,0.12),transparent_60%)]
                           blur-2xl"
                aria-hidden="true"
              />
              <div className="relative">
                <div className="text-sm text-purple-400 mb-4">What You'll Get</div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div>
                      <div className="text-slate-200 font-medium">Complete White-Label Solution</div>
                      <div className="text-sm text-slate-400">Your brand, your domain, your rules</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <div className="text-slate-200 font-medium">Innovation Lab Dashboard</div>
                      <div className="text-sm text-slate-400">Track and manage all ventures</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <div className="text-slate-200 font-medium">Revenue Generation</div>
                      <div className="text-sm text-slate-400">Build new income streams</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="spotlight-card relative overflow-hidden bg-slate-900/25 rounded-xl p-8 border border-slate-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div
              className="pointer-events-none absolute -bottom-12 -right-10 h-64 w-80 -z-10
                         bg-[radial-gradient(closest-side,rgba(168,85,247,0.12),transparent_60%)]
                         blur-2xl"
              aria-hidden="true"
            />
            <div className="relative">
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
          </div>

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
