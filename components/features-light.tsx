'use client'

import { useState } from 'react'
import Image from 'next/image'
import Particles from './particles'
import Illustration from '@/public/images/glow-top.svg'

export default function FeaturesLight() {
  const [tab, setTab] = useState<number>(1)

  return (
    <section>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Illustration background */}
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
              priority
            />
          </div>
        </div>

        <div className="pt-16 pb-12 md:pt-52 md:pb-20">
          <div>
            <div className="max-w-xl mx-auto md:max-w-none flex flex-col md:flex-row md:space-x-8 lg:space-x-16 xl:space-x-20 space-y-8 space-y-reverse md:space-y-0">

              {/* Left column */}
              <div
                className="md:w-7/12 lg:w-1/2 order-1 md:order-none max-md:text-center"
                data-aos="fade-down"
              >
                {/* Eyebrow */}
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

                {/* Title */}
                <h3 className="h3 bg-clip-text text-transparent bg-linear-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-3">
                  Simplify your security with authentication services
                </h3>

                {/* Subtext */}
                <p className="feature-subtext text-lg mb-8 dark:text-slate-400">
                  Define access roles for the end-users, and extend your authorization capabilities to implement dynamic access control.
                </p>

                {/* Tabs */}
                <div className="mt-8 max-w-xs max-md:mx-auto space-y-2">
                  <button
                    aria-pressed={tab === 1}
                    className={`feature-tab flex items-center text-sm font-medium rounded-sm border w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 ${
                      tab !== 1
                        ? 'border-slate-700 opacity-50'
                        : 'border-purple-700 shadow-sm shadow-purple-500/25'
                    }`}
                    onClick={() => setTab(1)}
                  >
                    <svg className="shrink-0 mr-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                      <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12Zm0 14V2H2v12h12Zm-3-7H5a1 1 0 1 1 0-2h6a1 1 0 0 1 0 2Zm0 4H5a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span>Simplify your security</span>
                  </button>

                  <button
                    aria-pressed={tab === 2}
                    className={`feature-tab flex items-center text-sm font-medium rounded-sm border w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 ${
                      tab !== 2
                        ? 'border-slate-700 opacity-50'
                        : 'border-purple-700 shadow-sm shadow-purple-500/25'
                    }`}
                    onClick={() => setTab(2)}
                  >
                    <svg className="shrink-0 mr-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                      <path d="M2 6H0V2a2 2 0 0 1 2-2h4v2H2v4ZM16 6h-2V2h-4V0h4a2 2 0 0 1 2 2v4ZM14 16h-4v-2h4v-4h2v4a2 2 0 0 1-2 2ZM6 16H2a2 2 0 0 1-2-2v-4h2v4h4v2Z" />
                    </svg>
                    <span>Customer identity</span>
                  </button>

                  <button
                    aria-pressed={tab === 3}
                    className={`feature-tab flex items-center text-sm font-medium rounded-sm border w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 ${
                      tab !== 3
                        ? 'border-slate-700 opacity-50'
                        : 'border-purple-700 shadow-sm shadow-purple-500/25'
                    }`}
                    onClick={() => setTab(3)}
                  >
                    <svg className="shrink-0 mr-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                      <path d="M14.3.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-8 8c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l8-8ZM15 7c.6 0 1 .4 1 1 0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.6 0 1 .4 1 1s-.4 1-1 1C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6c0-.6.4-1 1-1Z" />
                    </svg>
                    <span>Adaptable authentication</span>
                  </button>
                </div>
              </div>

              {/* Right column (with halo + particles) */}
              <div className="relative md:w-5/12 lg:w-1/2" data-aos="fade-up" data-aos-delay="100">
                {/* Halo circles */}
                <div className="absolute inset-0 rounded-[2rem] -z-10 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.35)_0%,rgba(168,85,247,0.15)_35%,transparent_65%)]" />
                <div className="absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)] bg-[linear-gradient(90deg,rgba(124,58,237,.35)_1px,transparent_1px),linear-gradient(0deg,rgba(124,58,237,.35)_1px,transparent_1px)] bg-[size:56px_56px]" />

                {/* Particles */}
                <Particles className="absolute inset-0 -z-10" />

                {/* Placeholder illustration / content */}
                <div className="aspect-square bg-white/40 backdrop-blur rounded-[2rem]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Light-theme overrides */}
      <style jsx>{`
        :global(html.light) .feature-tab {
          color: #475569 !important;
          background: rgba(255,255,255,0.60) !important;
          border-color: #e5e7eb !important;
        }
        :global(html.light) .feature-tab svg {
          fill: currentColor !important;
        }
        :global(html.light) .feature-tab:hover {
          color: #0f172a !important;
          border-color: #d1d5db !important;
        }
        :global(html.light) .feature-tab[aria-pressed="true"] {
          color: #0f172a !important;
          background: rgba(255,255,255,0.85) !important;
          border-color: #7c3aed !important;
          box-shadow: 0 0 0 2px rgba(124,58,237,0.35) !important;
          opacity: 1 !important;
        }
      `}</style>
    </section>
  )
}
