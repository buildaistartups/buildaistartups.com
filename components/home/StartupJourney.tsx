// components/home/StartupJourney.tsx
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Lightbulb, Code, Rocket, TrendingUp, Target, FileText } from 'lucide-react'

// --- PHASE 1: SIMPLIFIED STEPS ---
const simpleSteps = [
  {
    icon: <Lightbulb />,
    title: '1. Describe',
    description: 'Tell us your idea in plain English.',
  },
  {
    icon: <FileText />,
    title: '2. Generate',
    description: 'Our AI architects the database & API.',
  },
  {
    icon: <Code />,
    title: '3. Receive',
    description: 'Get your PDF Spec & GitHub Repo.',
  }
]

// --- PHASE 1 HIDDEN: ORIGINAL 5 STEPS ---
/*
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
*/

export default function StartupJourney() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section className="relative" id="how-it-works">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* ↓ reduced only TOP padding; kept bottom the same */}
        <div className="pt-8 md:pt-12 pb-12 md:pb-20">
          
          {/* Section header */}
          <div className="text-center mb-12">
            {/* <div className="inline-flex items-center gap-2 text-purple-400 mb-4">
              <Rocket className="w-4 h-4" />
              <span className="text-sm font-medium">THE STARTUP JOURNEY</span>
            </div>
            */}
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-slate-200 to-slate-500 bg-clip-text text-transparent mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              From concept to code in 3 simple steps.
            </p>
          </div>

          {/* --- PHASE 1: SIMPLE 3-COLUMN GRID --- */}
          <div className="grid md:grid-cols-3 gap-8 relative max-w-4xl mx-auto">
             {/* Connector Line (Desktop) */}
             <div className="absolute top-8 left-[16%] right-[16%] h-0.5 bg-slate-800 hidden md:block -z-10 border-t border-dashed border-slate-700"></div>

             {simpleSteps.map((step, i) => (
                 <div key={i} className="flex flex-col items-center text-center group">
                     <div className="w-16 h-16 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center mb-4 z-10 group-hover:border-purple-500/50 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all">
                         {/* FIXED LINE BELOW: Added <any> to cast */}
                         {React.cloneElement(step.icon as React.ReactElement<any>, { className: 'w-6 h-6 text-purple-400' })}
                     </div>
                     <h3 className="text-lg font-semibold text-slate-200 mb-2">{step.title}</h3>
                     <p className="text-sm text-slate-400">{step.description}</p>
                 </div>
             ))}
          </div>

          {/* --- PHASE 1 HIDDEN: INTERACTIVE TIMELINE --- */}
          {/*
          <div className="relative">
            <div className="absolute top-12 left-0 right-0 h-0.5 bg-slate-700 hidden md:block">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                style={{ width: `${(activeStep + 1) * 20}%` }}
              />
            </div>

            <div className="grid md:grid-cols-5 gap-6 relative">
              {journeySteps.map((step, index) => (
                <div
                  key={step.title}
                  className="relative cursor-pointer"
                  onClick={() => setActiveStep(index)}
                  onMouseEnter={() => setActiveStep(index)}
                >
                  <div
                    className={`
                      w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center transition-all
                      ${activeStep === index 
                        ? 'bg-gradient-to-br from-purple-500 to-blue-500 scale-110' 
                        : 'bg-slate-800 border-2 border-slate-700'}
                    `}
                  >
                    {React.cloneElement(step.icon, { 
                      className: `w-10 h-10 ${activeStep === index ? 'text-white' : 'text-slate-400'}` 
                    })}
                  </div>

                  <div className="text-center">
                    <div
                      className={`text-xs font-medium mb-1 ${
                        activeStep === index ? 'text-purple-400' : 'text-slate-500'
                      }`}
                    >
                      {step.time}
                    </div>
                    <h3
                      className={`font-semibold mb-2 ${
                        activeStep === index ? 'text-slate-200' : 'text-slate-400'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

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
                  <p className="text-slate-300">{journeySteps[activeStep].details}</p>
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
          */}

        </div>
      </div>
    </section>
  )
}
