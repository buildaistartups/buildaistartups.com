'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Transition } from '@headlessui/react'
import Particles from './particles'
import Illustration from '@/public/images/glow-top.svg'

export default function FeaturesLight() {
  const [tab, setTab] = useState<number>(1)

  return (
    <section>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Illustration */}
        <div
          className="absolute inset-0 -z-10 -mx-28 rounded-t-[3rem] pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 -translate-x-1/2 top-0 -z-10">
            <Image
              src={Illustration}
              className="max-w-none"
              width={1404}
              height={658}
              alt="Features Illustration"
            />
          </div>
        </div>

        <div className="pt-16 pb-12 md:pt-52 md:pb-20">
          <div>
            {/* Section content */}
            <div className="max-w-xl mx-auto md:max-w-none flex flex-col md:flex-row md:space-x-8 lg:space-x-16 xl:space-x-20 space-y-8 space-y-reverse md:space-y-0">

              {/* Content */}
              <div
                className="md:w-7/12 lg:w-1/2 order-1 md:order-none max-md:text-center"
                data-aos="fade-down"
              >
                {/* Eyebrow — solid color for light mode */}
                <div>
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
                </div>

                <h3 className="h3 bg-clip-text text-transparent bg-linear-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-3">
                  Simplify your security with authentication services
                </h3>

                <p className="feature-subtext text-lg mb-8 dark:text-slate-400">
                  Define access roles for the end-users, and extend your authorization capabilities to implement dynamic access control.
                </p>

                {/* Selector buttons */}
                <div className="mt-8 max-w-xs max-md:mx-auto space-y-2">
                  <button
                    className={`flex items-center text-sm font-medium rounded-md border w-full px-3 py-2 transition duration-150 ease-in-out
                      ${tab !== 1
                        ? 'bg-white border-gray-200 text-[var(--color-slate-100)] hover:shadow-sm'
                        : 'bg-white border-purple-700 shadow-sm shadow-purple-500/25 text-[var(--color-slate-100)]'
                      }`}
                    onClick={() => setTab(1)}
                    type="button"
                  >
                    <svg className="shrink-0 fill-slate-400 mr-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true">
                      <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12Zm0 14V2H2v12h12Zm-3-7H5a1 1 0 1 1 0-2h6a1 1 0 0 1 0 2Zm0 4H5a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span>Simplify your security</span>
                  </button>

                  <button
                    className={`flex items-center text-sm font-medium rounded-md border w-full px-3 py-2 transition duration-150 ease-in-out
                      ${tab !== 2
                        ? 'bg-white border-gray-200 text-[var(--color-slate-100)] hover:shadow-sm'
                        : 'bg-white border-purple-700 shadow-sm shadow-purple-500/25 text-[var(--color-slate-100)]'
                      }`}
                    onClick={() => setTab(2)}
                    type="button"
                  >
                    <svg className="shrink-0 fill-slate-400 mr-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true">
                      <path d="M2 6H0V2a2 2 0 0 1 2-2h4v2H2v4ZM16 6h-2V2h-4V0h4a2 2 0 0 1 2 2v4ZM14 16h-4v-2h4v-4h2v4a2 2 0 0 1-2 2ZM6 16H2a2 2 0 0 1-2-2v-4h2v4h4v2Z" />
                    </svg>
                    <span>Customer identity</span>
                  </button>

                  <button
                    className={`flex items-center text-sm font-medium rounded-md border w-full px-3 py-2 transition duration-150 ease-in-out
                      ${tab !== 3
                        ? 'bg-white border-gray-200 text-[var(--color-slate-100)] hover:shadow-sm'
                        : 'bg-white border-purple-700 shadow-sm shadow-purple-500/25 text-[var(--color-slate-100)]'
                      }`}
                    onClick={() => setTab(3)}
                    type="button"
                  >
                    <svg className="shrink-0 fill-slate-400 mr-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true">
                      <path d="M14.3.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-8 8c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l8-8ZM15 7c.6 0 1 .4 1 1 0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.6 0 1 .4 1 1s-.4 1-1 1C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6c0-.6.4-1 1-1Z" />
                    </svg>
                    <span>Adaptable authentication</span>
                  </button>
                </div>
              </div>

              {/* Image */}
              <div className="md:w-5/12 lg:w-1/2" data-aos="fade-up" data-aos-delay="100">
                <div className="relative py-24 -mt-12">
                  {/* Particles animation */}
                  <Particles className="absolute inset-0 -z-10" quantity={8} staticity={30} />
                  {/* (Your existing icon / halo / grid block remains unchanged) */}
                  {/* ... */}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
