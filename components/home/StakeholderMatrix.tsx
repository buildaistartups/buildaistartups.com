// components/home/StakeholderMatrix.tsx
'use client'

import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

const stakeholders = [
  {
    title: 'ENTERPRISES',
    badge: 'New!',
    features: [
      'White-Label Deployment',
      'Custom Integration Framework',
      'Innovation Lab Dashboard',
      'Compliance Center (SOC2/GDPR)',
      'Enterprise API Gateway'
    ],
    cta: { text: 'Launch Innovation Lab', href: '/solutions/enterprises' }
  },
  {
    title: 'ACCELERATORS',
    badge: 'New!',
    features: [
      'Cohort Batch Management',
      'Mentor Assignment System',
      'Demo Day Prep Suite',
      'Program Analytics Dashboard',
      'Success Tracking per Startup'
    ],
    cta: { text: 'Manage Your Program', href: '/solutions/accelerators' }
  },
  {
    title: 'PRODUCT MANAGERS',
    badge: 'Enhanced!',
    features: [
      'Jira/Slack/Teams Integration',
      'Enterprise SSO Workflows',
      'Department-Level Billing',
      'Compliance Approval Flows',
      'Legacy System Connectors'
    ],
    cta: { text: 'Book Enterprise Demo', href: '/contact?type=demo' }
  },
  {
    title: 'INVESTORS',
    badge: 'Enhanced!',
    features: [
      'Portfolio Management Suite',
      'Deal Flow AI Scoring',
      'Syndicate Formation Tools',
      'Exit Opportunity Alerts',
      'Due Diligence Automation'
    ],
    cta: { text: 'Access Investor Portal', href: '/investor' }
  },
  {
    title: 'STUDENTS',
    badge: 'Enhanced!',
    features: [
      'Certification Program',
      'Learning Paths with Badges',
      'University Partnership',
      'Internship Matching',
      'Portfolio Showcase'
    ],
    cta: { text: 'Start Learning Path', href: '/solutions/universities' }
  },
  {
    title: 'EXISTING STARTUPS',
    badge: 'Enhanced!',
    features: [
      'Legacy System Integration',
      'API Migration Tools',
      'Gradual AI Adoption Path',
      'Team Training Modules',
      'Growth Acceleration Suite'
    ],
    cta: { text: 'Integrate Your Stack', href: '/solutions/startups' }
  }
]

export default function StakeholderMatrix() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-slate-200 to-slate-500 bg-clip-text text-transparent mb-4">
              Every Role. Every Tool. Every Gap Filled.
            </h2>
            <p className="text-lg text-slate-400">
              Interactive Grid - Shows ALL Capabilities
            </p>
          </div>

          {/* Stakeholder grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stakeholders.map((stakeholder) => (
              <div
                key={stakeholder.title}
                className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700 hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-200">{stakeholder.title}</h3>
                  {stakeholder.badge && (
                    <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full">
                      {stakeholder.badge}
                    </span>
                  )}
                </div>
                
                <ul className="space-y-2 mb-6">
                  {stakeholder.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href={stakeholder.cta.href}
                  className="block text-center py-2 px-4 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
                >
                  {stakeholder.cta.text}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
