// components/home/TrustedBy.tsx
'use client'

import React from 'react'

const logos = [
  'YCombinator', 'TechStars', 'Google', 'Microsoft', 'Amazon', 
  'Stanford', 'MIT', 'Harvard', 'Berkeley', 'Sequoia'
]

export default function TrustedBy() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12">
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-slate-500">Trusted by leading innovators</p>
          </div>
          
          <div className="relative">
            <div className="flex space-x-12 animate-scroll">
              {[...logos, ...logos].map((logo, i) => (
                <div key={i} className="flex-shrink-0 h-12 px-8 flex items-center">
                  <span className="text-slate-600 font-medium">{logo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </section>
  )
}
