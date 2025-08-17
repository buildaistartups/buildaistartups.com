'use client'

import { useState } from 'react'

export default function PricingLight() {
  const [annual, setAnnual] = useState<boolean>(true)

  return (
    <div className="relative">
      {/* Blurred shape */}
      <div
        className="max-md:hidden absolute bottom-0 -mb-20 left-2/3 -translate-x-1/2 blur-2xl opacity-70 pointer-events-none"
        aria-hidden="true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
          <defs>
            <linearGradient id="bs5-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            fill="url(#bs5-a)"
            fillRule="evenodd"
            d="m661 736 461 369-284 58z"
            transform="matrix(1 0 0 -1 -661 1163)"
          />
        </svg>
      </div>
      {/* Content */}
      <div className="grid md:grid-cols-4 xl:-mx-6 text-sm [&>div]:bg-slate-50 [&>div:nth-of-type(4n+1)]:bg-transparent">
        {/* Pricing toggle */}
        <div className="px-6 flex flex-col justify-end">
          <div className="pb-5 md:border-b border-gray-200">
            <div className="max-md:text-center">
              <div className="inline-flex items-center whitespace-nowrap">
                <div className="text-sm text-slate-600 font-medium mr-2 md:max-lg:hidden">
                  Monthly
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    id="toggle"
                    className="peer sr-only"
                    checked={annual}
                    onChange={() => setAnnual(!annual)}
                  />
                  <label
                    htmlFor="toggle"
                    className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-300 px-0.5 outline-gray-300 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow-xs before:transition-transform before:duration-150 peer-checked:bg-purple-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-focus-visible:peer-checked:outline-purple-500"
                  >
                    <span className="sr-only">Pay Yearly</span>
                  </label>
                </div>
                <div className="text-sm text-slate-600 font-medium ml-2">
                  Yearly <span className="text-teal-500">(-20%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Example price block */}
        <div className="px-6 flex flex-col justify-end">
          <div className="grow pb-4 mb-4 border-b border-gray-200">
            <div className="text-base font-medium text-purple-600 pb-0.5">Pro</div>
            <div className="mb-1">
              <span className="text-lg font-medium text-slate-500">$</span>
              <span className="text-3xl font-bold text-slate-900">
                {annual ? '24' : '29'}
              </span>
              <span className="text-sm text-slate-500 font-medium">/mo</span>
            </div>
            <div className="text-slate-600">Everything at your fingertips.</div>
          </div>
          <div className="pb-4 border-b border-gray-200">
            <a
              className="btn-sm text-slate-900 bg-linear-to-r from-white/80 via-white to-white/80 hover:bg-white w-full transition duration-150 ease-in-out group"
              href="#0"
            >
              Get Started{' '}
              <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                -&gt;
              </span>
            </a>
          </div>
        </div>

        {/* TODO: copy over the rest of your pricing rows with border-gray-200 instead of border-slate-800 */}
      </div>
    </div>
  )
}
