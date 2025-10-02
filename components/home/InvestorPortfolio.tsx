// components/home/InvestorPortfolio.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { TrendingUp, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react'

export default function InvestorPortfolio() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="py-12 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-slate-200 to-slate-500 bg-clip-text text-transparent mb-4">
              Manage Your Entire Portfolio. See Everything.
            </h2>
          </div>

          <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-8">
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-200 mb-4">Portfolio Management Suite</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">Track</div>
                  <div className="text-xl font-bold text-slate-200">Investments</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">Monitor</div>
                  <div className="text-xl font-bold text-slate-200">Performance</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">Analyze</div>
                  <div className="text-xl font-bold text-green-400">Returns</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">Optimize</div>
                  <div className="text-xl font-bold text-purple-400">Strategy</div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-200 mb-4">Smart Alerts System</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-blue-400" />
                  <span className="text-slate-300">Important updates about your portfolio companies</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">Growth opportunities and expansion signals</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                  <span className="text-slate-300">Exit opportunities and acquisition interest</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-4">AI-Powered Insights</h3>
              <ul className="space-y-2">
                <li className="text-slate-300">• Find startups that match your investment thesis</li>
                <li className="text-slate-300">• Identify synergies between portfolio companies</li>
                <li className="text-slate-300">• Get alerts on market opportunities</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4 justify-center mt-8">
            <Link
              href="/investor"
              className="btn bg-purple-500 text-white hover:bg-purple-600"
            >
              Access Portfolio Tools
            </Link>
            <Link
              href="/investor-network"
              className="btn bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700"
            >
              Join Investor Network
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
