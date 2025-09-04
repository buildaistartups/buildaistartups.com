'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Transition } from '@headlessui/react'
import Particles from './particles'
import AiOrb from './ai-orb'        // ← NEW
import Illustration from '@/public/images/glow-top.svg'

type Tab = 1 | 2 | 3

const TAB_ROUTES: Record<Tab, string> = {
  1: '/product/builder/research-spec',
  2: '/product/builder/generate-ui',
  3: '/product/builder/deploy-iterate',
}

const TAB_COPY: Record<Tab, string> = {
  1: 'Build AI Startups maps the niche, analyzes competitors, drafts a PRD, and turns your one-line brief into a crisp plan with clear acceptance criteria.',
  2: 'We scaffold a production-ready Next.js app with a polished UI, docs, auth, billing, and analytics wired — pushed to your own GitHub.',
  3: 'One-click deploy to Vercel, observe real usage, and let Build AI Startups propose improvements, iterate specs, and ship updates safely.',
}

export default function Features() {
  const [tab, setTab] = useState<Tab>(1)

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
              alt="Features background glow"
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
                  <div className="inline-flex font-medium pb-3 bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-purple-200 eyebrow-text">
                    The autonomy-first builder
                  </div>
                </div>

                <h3 className="h3 bg-clip-text text-transparent bg-linear-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-3">
                  From one-line brief to running product
                </h3>

                <p className="feature-subtext text-lg mb-8 dark:text-slate-400">
                  Describe your idea in a sentence. Build AI Startups researches the niche, drafts the product spec,
                  scaffolds a production-ready repo, ships the UI &amp; docs, wires auth/billing/analytics, and deploys.
                  You keep everything under your own GitHub, Vercel, and Stripe.
                </p>

                {/* Tabs (unchanged, with ARIA retained) */}
                <div className="mt-8 max-w-xs max-md:mx-auto space-y-2" role="tablist" aria-label="Builder steps">
                  <button
                    id="tab-1"
                    role="tab"
                    aria-selected={tab === 1}
                    aria-controls="panel-features"
                    className={`flex items-center text-sm font-medium text-slate-50 rounded-sm border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-purple-500/60 ${
                      tab !== 1 ? 'border-slate-700 opacity-50' : 'border-purple-700 shadow-sm shadow-purple-500/25'
                    }`}
                    onClick={() => setTab(1)}
                  >
                    <svg className="shrink-0 fill-slate-300 mr-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true">
                      <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12Zm0 14V2H2v12h12Zm-3-7H5a1 1 0 1 1 0-2h6a1 1 0 0 1 0 2Zm0 4H5a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span>Research &amp; spec</span>
                  </button>

                  <button
                    id="tab-2"
                    role="tab"
                    aria-selected={tab === 2}
                    aria-controls="panel-features"
                    className={`flex items-center text-sm font-medium text-slate-50 rounded-sm border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-purple-500/60 ${
                      tab !== 2 ? 'border-slate-700 opacity-50' : 'border-purple-700 shadow-sm shadow-purple-500/25'
                    }`}
                    onClick={() => setTab(2)}
                  >
                    <svg className="shrink-0 fill-slate-300 mr-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true">
                      <path d="M2 6H0V2a2 2 0 0 1 2-2h4v2H2v4ZM16 6h-2V2h-4V0h4a2 2 0 0 1 2 2v4ZM14 16h-4v-2h4v-4h2v4a2 2 0 0 1-2 2ZM6 16H2a2 2 0 0 1-2-2v-4h2v4h4v2Z" />
                    </svg>
                    <span>Generate repo &amp; UI</span>
                  </button>

                  <button
                    id="tab-3"
                    role="tab"
                    aria-selected={tab === 3}
                    aria-controls="panel-features"
                    className={`flex items-center text-sm font-medium text-slate-50 rounded-sm border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-purple-500/60 ${
                      tab !== 3 ? 'border-slate-700 opacity-50' : 'border-purple-700 shadow-sm shadow-purple-500/25'
                    }`}
                    onClick={() => setTab(3)}
                  >
                    <svg className="shrink-0 fill-slate-300 mr-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true">
                      <path d="M14.3.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-8 8c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l8-8ZM15 7c.6 0 1 .4 1 1 0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.6 0 1 .4 1 1s-.4 1-1 1C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6c0-.6.4-1 1-1Z" />
                    </svg>
                    <span>Deploy, learn, iterate</span>
                  </button>
                </div>

                {/* Tab detail + Learn more */}
                <div
                  id="panel-features"
                  role="tabpanel"
                  aria-labelledby={`tab-${tab}`}
                  className="rounded-md border border-slate-700/60 bg-slate-900/30 p-4 mt-4 max-w-lg max-md:mx-auto"
                  aria-live="polite"
                >
                  <p className="text-sm text-slate-300">{TAB_COPY[tab]}</p>
                  <div className="mt-3">
                    <Link
                      href={TAB_ROUTES[tab]}
                      className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300 transition group"
                    >
                      <span>Learn more</span>
                      <span aria-hidden className="ml-1 transition-transform duration-150 group-hover:translate-x-0.5">→</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Visual */}
              <div className="md:w-5/12 lg:w-1/2" data-aos="fade-up" data-aos-delay="100">
                <div className="relative py-24 -mt-12">
                  <Particles className="absolute inset-0 -z-10" quantity={8} staticity={30} />
                  <div className="flex items-center justify-center">
                    <AiOrb active={tab as 1 | 2 | 3} size={420}>
                      {/* swap with your SVG/logo if you prefer */}
                      <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill="#E5E7EB" d="m12 2 2.6 5.3L20 8l-4 3.9L17.2 18 12 15l-5.2 3 1.2-6.1L4 8l5.4-.7z"/>
                      </svg>
                    </AiOrb>
                  </div>
                </div>
              </div>
              {/* /Visual */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
