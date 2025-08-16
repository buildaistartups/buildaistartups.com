'use client'

import { useState } from 'react'
import { FileText, ScanLine, RefreshCcw } from 'lucide-react'

const features = [
  {
    title: 'Simplify your security',
    description:
      'Define access roles for the end-users, and extend your authorization capabilities to implement dynamic access control.',
    icon: FileText,
  },
  {
    title: 'Customer identity',
    description:
      'Easily manage customer identities and provide seamless login experiences across platforms.',
    icon: ScanLine,
  },
  {
    title: 'Adaptable authentication',
    description:
      'Implement adaptable authentication strategies that balance security and user experience.',
    icon: RefreshCcw,
  },
]

export default function FeaturesLight() {
  const [selected, setSelected] = useState(0)

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Background halo circles */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="absolute w-[800px] h-[800px] rounded-full bg-purple-400/30 blur-3xl animate-pulse" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-purple-300/20 blur-3xl animate-ping" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-2 lg:gap-x-16 items-center">
        {/* Left content */}
        <div>
          <p className="text-sm font-semibold text-purple-600">The security first platform</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Simplify your security with authentication services
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-700">
            {features[selected].description}
          </p>

          {/* Tabs */}
          <div className="mt-8 flex flex-col gap-3">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              const isActive = idx === selected
              return (
                <button
                  key={idx}
                  onClick={() => setSelected(idx)}
                  className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-base font-medium transition-all
                    ${isActive
                      ? 'border-purple-500 bg-white text-black'
                      : 'border-gray-300 bg-white/70 text-gray-500 hover:text-black hover:border-gray-400'
                    }`}
                >
                  <Icon
                    className={`h-5 w-5 transition-colors ${
                      isActive ? 'text-black' : 'text-gray-400 group-hover:text-black'
                    }`}
                  />
                  {feature.title}
                </button>
              )
            })}
          </div>
        </div>

        {/* Right icon area */}
        <div className="relative mt-16 lg:mt-0 flex justify-center items-center">
          <div className="w-40 h-40 flex items-center justify-center rounded-2xl bg-white shadow-xl">
            {(() => {
              const Icon = features[selected].icon
              return <Icon className="h-12 w-12 text-gray-900" />
            })()}
          </div>
        </div>
      </div>
    </section>
  )
}
