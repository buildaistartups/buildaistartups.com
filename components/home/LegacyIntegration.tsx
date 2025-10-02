// components/home/LegacyIntegration.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'

const integrations = [
  { from: 'Salesforce CRM', to: 'AI Lead Scoring' },
  { from: 'Zendesk Support', to: 'AI Response Bot' },
  { from: 'Stripe Billing', to: 'AI Churn Prediction' },
  { from: 'Google Analytics', to: 'AI Growth Insights' }
]

const platforms = [
  'Salesforce', 'HubSpot', 'Zendesk', 'Intercom', 'Slack', 'Teams',
  'Jira', 'Asana', 'Monday', 'Stripe', 'QuickBooks', 'SAP'
]

export default function LegacyIntegration() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-slate-200 to-slate-500 bg-clip-text text-transparent mb-4">
              Your Old Stack + Our AI = Immediate Value
            </h2>
          </div>

          <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-8 mb-12">
            <h3 className="text-lg font-semibold text-slate-200 mb-6">Integration Flowchart</h3>
            <div className="space-y-4">
              {integrations.map((integration) => (
                <div key={integration.from} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="px-3 py-1 bg-slate-700 rounded text-slate-300">
                      {integration.from}
                    </div>
                    <ArrowRight className="w-5 h-5 text-purple-400" />
                    <div className="px-3 py-1 bg-purple-500/20 rounded text-purple-400">
                      {integration.to}
                    </div>
                  </div>
                  <Zap className="w-5 h-5 text-yellow-400" />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-lg font-semibold text-slate-200 mb-6 text-center">One-Click Integrations</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {platforms.map((platform) => (
                <div
                  key={platform}
                  className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 hover:border-purple-500/50 hover:text-purple-400 transition-colors cursor-pointer"
                >
                  {platform}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link
              href="/integrations"
              className="btn bg-purple-500 text-white hover:bg-purple-600"
            >
              Connect Your Stack
            </Link>
            <Link
              href="/docs/integrations"
              className="btn bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700"
            >
              See Integration Docs
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
