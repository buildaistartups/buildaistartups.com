// components/home/StartupJourney.tsx
'use client'

import React, { useState } from 'react' // ADD React import here!
import Link from 'next/link'
import { ArrowRight, Lightbulb, Code, Rocket, TrendingUp, Target } from 'lucide-react'

const journeySteps = [
  {
    icon: <Lightbulb />,
    title: 'Validate',
    time: 'Step 1',
    description: 'Test your idea with AI validation',
    details: 'Market analysis, competitor research, and viability scoring'
  },
  {
    icon: <Code />,
    title: 'Build',
    time: 'Step 2',
    description: 'Generate production-ready code',
    details: 'Complete application with payments, auth, and analytics'
  },
  {
    icon: <Rocket />,
    title: 'Launch',
    time: 'Step 3',
    description: 'Deploy to production instantly',
    details: 'Live on your domain with SSL, CDN, and monitoring'
  },
  {
    icon: <TrendingUp />,
    title: 'Grow',
    time: 'Step 4',
    description: 'Scale with built-in growth tools',
    details: 'Marketing automation and customer acquisition features'
  },
  {
    icon: <Target />,
    title: 'Succeed',
    time: 'Step 5',
    description: 'Build sustainable business',
    details: 'Analytics, optimization, and scaling infrastructure'
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
              Your Path from Idea to Success
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Follow our proven framework to build and launch your AI startup
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
                    {journeySteps[activeStep].title}: {journeySteps[activeStep].description}
                  </h4>
                  <p className="text-slate-300">
                    {journeySteps[activeStep].details}
                  </p>
                </div>
                <Link
                  href="/generate"
                  className="btn bg-purple-500 text-white hover:bg-purple-600 whitespace-nowrap"
                >
                  Start Building
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>

          {/* Remove fake metrics - per Action 4 */}
        </div>
      </div>
    </section>
  )
}
