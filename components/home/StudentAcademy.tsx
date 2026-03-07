// components/home/StudentAcademy.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { GraduationCap, Award, Briefcase, DollarSign, ChevronRight } from 'lucide-react'

const certificationPath = [
  { level: 'Foundation', skills: 'HTML/JS', icon: '🎓︎' },
  { level: 'Builder', skills: 'First Product', icon: '🏆︎' },
  { level: 'Advanced', skills: 'Scale to Users', icon: '🥇︎' },
  { level: 'Master', skills: 'Exit Ready', icon: '🏅︎' }
]

const universities = ['Stanford', 'MIT', 'Harvard', 'Berkeley', 'CMU']

export default function StudentAcademy() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="py-12 md:py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-purple-400 mb-4">
              <span className="text-sm font-medium">STUDENT ACADEMY</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-slate-200 to-slate-500 bg-clip-text text-transparent mb-4">
              Learn, Build, Earn, Get Certified
            </h2>
          </div>

          <div className="mb-12">
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              {certificationPath.map((cert, index) => (
                <div key={cert.level} className="flex items-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2 text-blue-400">{cert.icon}</div>
                    <div className="text-sm font-semibold text-slate-200">{cert.level}</div>
                    <div className="text-xs text-slate-400 mt-1">{cert.skills}</div>
                  </div>
                  {index < certificationPath.length - 1 && (
                    <ChevronRight className="w-8 h-8 text-slate-600 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 mb-12">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">University Partnerships</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {universities.map((uni) => (
                <div key={uni} className="px-4 py-2 bg-slate-700/50 rounded-lg text-slate-300">
                  {uni}
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-200">Certification Benefits</h3>
              {[
                'Verified LinkedIn Badge',
                'Employer Recognition',
                'Portfolio Showcase',
                'Internship Priority',
                'Startup Team Matching'
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <span className="text-blue-400 text-lg">✓︎</span>
                  <span className="text-slate-300">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-xl p-6">
              <div className="text-center">
                <div className="text-lg font-semibold text-purple-400 mb-2">Join the Academy</div>
                <p className="text-slate-300 mb-4">Start your journey to becoming an AI startup founder</p>
                <div className="border-t border-slate-700 pt-4">
                  <div className="text-sm text-slate-400">Career-changing opportunity</div>
                  <div className="text-2xl font-bold text-green-400">Start Free</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link
              href="/certification"
              className="btn bg-purple-500 text-white hover:bg-purple-600"
            >
              Start Certification
            </Link>
            <Link
              href="/university-partnership"
              className="btn bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700"
            >
              University Partnership
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
