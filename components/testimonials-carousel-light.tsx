'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function TestimonialsCarouselLight() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const testimonials = [
    {
      title: 'Anonymous User',
      description: 'Incorporate rich user profiling, and facilitate more transactions.',
      link: '#',
      icon: '/images/icon-01.svg',
    },
    {
      title: 'Bot Detection',
      description: 'Incorporate rich user profiling, and facilitate more transactions.',
      link: '#',
      icon: '/images/icon-02.svg',
    },
    {
      title: 'Social integrations',
      description: 'Incorporate rich user profiling, and facilitate more transactions.',
      link: '#',
      icon: '/images/icon-03.svg',
    },
  ]

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">

            {/* Eyebrow */}
            <div
              className="inline-flex font-semibold pb-3"
              style={{
                color: '#7500D6',
                background: 'none',
                WebkitBackgroundClip: 'initial',
                WebkitTextFillColor: '#7500D6',
              }}
            >
              The security first platform
            </div>

            {/* Title */}
            <h2
              className="h2 pb-4"
              style={{
                color: '#374151',
                background: 'none',
                WebkitBackgroundClip: 'initial',
                WebkitTextFillColor: '#374151',
              }}
            >
              Spot issues faster
            </h2>

            {/* Paragraph */}
            <p
              className="text-lg"
              style={{
                color: '#6b7280',
                background: 'none',
                WebkitBackgroundClip: 'initial',
                WebkitTextFillColor: '#6b7280',
              }}
            >
              All the lorem ipsum generators on the Internet tend to repeat predefined chunks as
              necessary, making this the first true generator on the Internet.
            </p>
          </div>

          {/* Carousel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="flex flex-col p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-800 text-white mr-4">
                    <Image src={item.icon} alt={item.title} width={24} height={24} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">{item.title}</h4>
                </div>
                <p className="text-slate-500 flex-grow">{item.description}</p>
                <a
                  href={item.link}
                  className="mt-4 inline-flex items-center text-sm font-medium text-purple-500 hover:text-purple-700"
                >
                  Learn More <span className="ml-1">→</span>
                </a>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
