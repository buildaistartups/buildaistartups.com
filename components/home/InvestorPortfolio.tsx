// components/home/InvestorPortfolio.tsx
'use client'

import Link from 'next/link'
import { TrendingUp, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react'

export default function InvestorPortfolio() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-slate-200 to-slate-500 bg-clip-text text-transparent mb-4">
              Manage Your Entire Portfolio. See Everything.
            </h2>
          </div>

          {/* Investor Dashboard Preview */}
          <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-8">
            {/* Portfolio Overview */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-200 mb-4">Portfolio Overview</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">Investments</div>
                  <div className="text-2xl font-bold text-slate-200">12</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">Deployed</div>
                  <div className="text-2xl font-bold text-slate-200">$4.2M</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">Avg Multiple</div>
                  <div className="text-2xl font-bold text-green-400">3.7x</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">IRR</div>
                  <div className="text-2xl font-bold text-purple-400">47%</div>
                </div>
              </div>
            </div>

            {/* Real-Time Alerts */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-200 mb-4">Real-Time Alerts</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span className="text-slate-300">TechCo burn rate increasing</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <span className="text-slate-300">BuildCo needs growth expertise</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">AIStart ready for Series A</span>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-4">AI Recommendations</h3>
              <ul className="space-y-2">
                <li className="text-slate-300">• SaaSCo matches your thesis + 91 Build Score</li>
                <li className="text-slate-300">• Formation opportunity: 3 portfolio cos could merge</li>
                <li className="text-slate-300">• Exit opportunity: Acquirer interested in MailAI</li>
              </ul>
            </div>
          </div>

          {/* CTAs */}
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
