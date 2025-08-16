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
                {/* Eyebrow */}
                <div>
                  <div
                    className="inline-flex font-semibold pb-3 text-[#7500D6]"
                  >
                    The security first platform
                  </div>
                </div>

                <h3 className="h3 bg-clip-text text-transparent bg-gradient-to-r from-slate-700 via-slate-900 to-slate-700 pb-3">
                  Simplify your security with authentication services
                </h3>

                <p className="feature-subtext text-lg mb-8 text-slate-600">
                  Define access roles for the end-users, and extend your authorization capabilities to implement dynamic access control.
                </p>

                {/* Tabs */}
                <div className="mt-8 max-w-xs max-md:mx-auto space-y-2">
                  
                  {/* Tab 1 */}
                  <button
                    className={[
                      'group flex items-center text-sm font-medium rounded-sm border w-full px-3 py-2 transition duration-150 ease-in-out',
                      'bg-white/70 backdrop-blur',
                      tab === 1
                        ? 'text-slate-900 border-purple-600 ring-2 ring-purple-500/60 shadow-sm'
                        : 'text-slate-400 border-slate-200 hover:text-slate-900 hover:border-slate-300'
                    ].join(' ')}
                    onClick={() => setTab(1)}
                  >
                    <svg
                      className={`shrink-0 mr-3 ${tab === 1 ? 'fill-slate-900' : 'fill-slate-400 group-hover:fill-slate-900'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                    >
                      <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12Zm0 14V2H2v12h12Zm-3-7H5a1 1 0 1 1 0-2h6a1 1 0 0 1 0 2Zm0 4H5a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className={tab === 1 ? 'text-slate-900' : 'group-hover:text-slate-900'}>
                      Simplify your security
                    </span>
                  </button>

                  {/* Tab 2 */}
                  <button
                    className={[
                      'group flex items-center text-sm font-medium rounded-sm border w-full px-3 py-2 transition duration-150 ease-in-out',
                      'bg-white/70 backdrop-blur',
                      tab === 2
                        ? 'text-slate-900 border-purple-600 ring-2 ring-purple-500/60 shadow-sm'
                        : 'text-slate-400 border-slate-200 hover:text-slate-900 hover:border-slate-300'
                    ].join(' ')}
                    onClick={() => setTab(2)}
                  >
                    <svg
                      className={`shrink-0 mr-3 ${tab === 2 ? 'fill-slate-900' : 'fill-slate-400 group-hover:fill-slate-900'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                    >
                      <path d="M2 6H0V2a2 2 0 0 1 2-2h4v2H2v4ZM16 6h-2V2h-4V0h4a2 2 0 0 1 2 2v4ZM14 16h-4v-2h4v-4h2v4a2 2 0 0 1-2 2ZM6 16H2a2 2 0 0 1-2-2v-4h2v4h4v2Z" />
                    </svg>
                    <span className={tab === 2 ? 'text-slate-900' : 'group-hover:text-slate-900'}>
                      Customer identity
                    </span>
                  </button>

                  {/* Tab 3 */}
                  <button
                    className={[
                      'group flex items-center text-sm font-medium rounded-sm border w-full px-3 py-2 transition duration-150 ease-in-out',
                      'bg-white/70 backdrop-blur',
                      tab === 3
                        ? 'text-slate-900 border-purple-600 ring-2 ring-purple-500/60 shadow-sm'
                        : 'text-slate-400 border-slate-200 hover:text-slate-900 hover:border-slate-300'
                    ].join(' ')}
                    onClick={() => setTab(3)}
                  >
                    <svg
                      className={`shrink-0 mr-3 ${tab === 3 ? 'fill-slate-900' : 'fill-slate-400 group-hover:fill-slate-900'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                    >
                      <path d="M14.3.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-8 8c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l8-8ZM15 7c.6 0 1 .4 1 1 0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.6 0 1 .4 1 1s-.4 1-1 1C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6c0-.6.4-1 1-1Z" />
                    </svg>
                    <span className={tab === 3 ? 'text-slate-900' : 'group-hover:text-slate-900'}>
                      Adaptable authentication
                    </span>
                  </button>
                </div>
              </div>

              {/* Image / Particles */}
              <div className="md:w-5/12 lg:w-1/2" data-aos="fade-up">
                <div className="relative flex items-center justify-center">
                  <Particles className="absolute inset-0 -z-10" quantity={10} staticity={30} />
                  <div className="relative w-40 h-40 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
