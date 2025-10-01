// components/home/StartupJourney.tsx
'use client'

import { useState } from 'react'
import React from 'react'
import Link from 'next/link'
import { ArrowRight, Lightbulb, Code, Rocket, TrendingUp, DollarSign } from 'lucide-react'

const journeySteps = [
  {
    icon: <Lightbulb />,
    title: 'Idea',
    time: 'Minute 0',
    description: 'Describe your vision in plain English',
    details: 'AI validates market fit, competition, and viability instantly'
  },
  {
    icon: <Code />,
    title: 'Build',
    time: 'Hour 2',
    description: 'Get production-ready code automatically',
    details: 'Complete Next.js app with payments, auth, and analytics'
  },
  {
    icon: <Rocket />,
    title: 'Launch',
    time: 'Day 1',
    description: 'Deploy to production with one click',
    details: 'Live on your domain with SSL, CDN, and monitoring'
  },
  {
    icon: <TrendingUp />,
    title: 'Grow',
    time: 'Week 2',
    description: 'First customers start arriving',
    details: 'AI-powered marketing and customer acquisition tools'
  },
  {
    icon: <DollarSign />,
    title: 'Revenue',
    time: 'Month 1',
    description: 'Start generating real revenue',
    details: 'Built-in billing, subscriptions, and revenue analytics'
  }
]

export default function StartupJourney() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-purple-400 mb-4">
              <Rocket className="w-4 h-4" />
              <span className="text-sm font-medium">THE STARTUP JOURNEY</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-slate-200 to-slate-500 bg-clip-text text-transparent mb-4">
              From Idea to Revenue in 30 Days
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Watch how startups go from zero to revenue faster than ever before possible
            </p>
          </div>

          {/* Journey Timeline */}
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-12 left-0 right-0 h-0.5 bg-slate-700 hidden md:block">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                style={{ width: `${(activeStep + 1) * 20}%` }}
              />
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-5 gap-6 relative">
              {journeySteps.map((step, index) => (
                <div
                  key={step.title}
                  className="relative cursor-pointer"
                  onClick={() => setActiveStep(index)}
                  onMouseEnter={() => setActiveStep(index)}
                >
                  {/* Icon */}
                  <div className={`
                    w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center transition-all
                    ${activeStep === index 
                      ? 'bg-gradient-to-br from-purple-500 to-blue-500 scale-110' 
                      : 'bg-slate-800 border-2 border-slate-700'
                    }
                  `}>
                    {React.cloneElement(step.icon, { 
                      className: `w-10 h-10 ${activeStep === index ? 'text-white' : 'text-slate-400'}` 
                    })}
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <div className={`text-xs font-medium mb-1 ${
                      activeStep === index ? 'text-purple-400' : 'text-slate-500'
                    }`}>
                      {step.time}
                    </div>
                    <h3 className={`font-semibold mb-2 ${
                      activeStep === index ? 'text-slate-200' : 'text-slate-400'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {step.description}
                    </p>
                  </div>

                  {/* Connector Arrow (mobile) */}
                  {index < journeySteps.length - 1 && (
                    <ArrowRight className="w-6 h-6 text-slate-600 mx-auto mt-4 md:hidden" />
                  )}
                </div>
              ))}
            </div>

            {/* Active Step Details */}
            <div className="mt-12 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-xl p-6 border border-purple-500/30">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  {React.cloneElement(journeySteps[activeStep].icon, { 
                    className: 'w-8 h-8 text-purple-400' 
                  })}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-slate-200 mb-2">
                    {journeySteps[activeStep].title} - {journeySteps[activeStep].time}
                  </h4>
                  <p className="text-slate-300">
                    {journeySteps[activeStep].details}
                  </p>
                </div>
                <Link
                  href="/generate"
                  className="btn bg-purple-500 text-white hover:bg-purple-600 whitespace-nowrap"
                >
                  Start Your Journey
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>

          {/* Success Metrics */}
          <div className="mt-12 grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-400">48hr</div>
              <div className="text-sm text-slate-400">Average time to MVP</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">87%</div>
              <div className="text-sm text-slate-400">Reach first customer</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">$2.4K</div>
              <div className="text-sm text-slate-400">Avg first month revenue</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">12x</div>
              <div className="text-sm text-slate-400">Faster than traditional</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
