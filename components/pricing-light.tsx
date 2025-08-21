// components/pricing-light.tsx
'use client'

import { useState } from 'react'

export default function Pricing() {
  const [annual, setAnnual] = useState<boolean>(true)

  return (
    <div className="relative">
      {/* (Optional) very soft background glow */}
      <div
        className="max-md:hidden absolute bottom-0 -mb-20 left-2/3 -translate-x-1/2 blur-2xl opacity-40 pointer-events-none"
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

      {/* ==== GRID (1 labels column + 3 plan columns) ==== */}
      <div
        className="
          grid md:grid-cols-4 xl:-mx-6 text-sm
          [&>div:nth-of-type(-n+4)]:py-6
          [&>div:nth-last-of-type(-n+4)]:pb-6
          max-md:[&>div:nth-last-of-type(-n+4)]:mb-8
          max-md:[&>div:nth-of-type(-n+4):nth-of-type(n+1)]:rounded-t-3xl
          max-md:[&>div:nth-last-of-type(-n+4)]:rounded-b-3xl
          md:[&>div:nth-of-type(2)]:rounded-tl-3xl
          md:[&>div:nth-of-type(4)]:rounded-tr-3xl
          md:[&>div:nth-last-of-type(3)]:rounded-bl-3xl
          md:[&>div:nth-last-of-type(1)]:rounded-br-3xl

          /* Light theme enforcement */
          [&>div]:!bg-slate-100               /* all plan cards */
          [&>div:nth-of-type(4n+1)]:!bg-slate-50 /* labels column lighter */
        "
      >
        {/* ===== Toggle column ===== */}
        <div className="px-6 flex flex-col justify-end">
          <div className="pb-5 md:border-b !border-slate-900/80">
            <div className="max-md:text-center">
              <div className="inline-flex items-center whitespace-nowrap">
                <div className="text-sm !text-slate-900 font-medium mr-2 md:max-lg:hidden">Monthly</div>
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
                    className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-slate-400 px-0.5 outline-slate-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow-xs before:transition-transform before:duration-150 peer-checked:bg-purple-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-focus-visible:peer-checked:outline-purple-500"
                  >
                    <span className="sr-only">Pay Yearly</span>
                  </label>
                </div>
                <div className="text-sm !text-slate-900 font-medium ml-2">
                  Yearly <span className="text-teal-600">(-20%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section labels */}
          <div className="py-6">
            <div className="py-2 text-slate-900 font-semibold mt-4">Usage</div>
            {[
              'Social Connections',
              'Custom Domains',
              'User Role Management',
              'External Databases',
            ].map((label) => (
              <div key={label} className="py-2 text-slate-900 border-b !border-slate-900/80">
                {label}
              </div>
            ))}

            <div className="py-2 text-slate-900 font-semibold mt-6">Features</div>
            {[
              'Custom Connection',
              'Advanced Deployment Options',
              'Extra Add-ons',
              'Admin Roles',
              'Deploy and Monitor',
              'Enterprise Add-ons',
            ].map((label) => (
              <div key={label} className="py-2 text-slate-900 border-b !border-slate-900/80">
                {label}
              </div>
            ))}

            <div className="py-2 text-slate-900 font-semibold mt-6">Support</div>
            <div className="py-2 text-slate-900 border-b !border-slate-900/80">Premium Support</div>
          </div>
        </div>

        {/* ===== Pro ===== */}
        <div className="px-6 flex flex-col justify-end rounded-3xl">
          <div className="grow pb-4 mb-4 border-b !border-slate-900/80">
            <div className="text-base font-semibold !text-slate-900 pb-0.5">Pro</div>
            <div className="mb-1">
              <span className="text-lg font-medium !text-slate-900">$</span>
              <span className="text-3xl font-extrabold !text-slate-900">{annual ? '24' : '29'}</span>
              <span className="text-sm !text-slate-900 font-medium">/mo</span>
            </div>
            <div className="!text-slate-900">Everything at your fingertips.</div>
          </div>
          <div className="pb-4 border-b !border-slate-900/80">
            <a
              className="btn-sm !text-slate-900 !bg-slate-300 hover:!bg-slate-400 w-full transition duration-150 ease-in-out group"
              href="#0"
            >
              Get Started <span className="tracking-normal !text-slate-900 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
            </a>
          </div>

        {/* Pro features (row borders strong) */}
          {[
            '100',
            '4',
            'Unlimited',
            '1',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '']
            .map((txt, i) => (
              <div key={i} className="flex items-center border-b !border-slate-900/80 py-2 text-slate-900">
                {txt ? (
                  <>
                    <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                    <span>{txt}</span>
                  </>
                ) : (
                  <span className="h-5" />
                )}
              </div>
            ))}
        </div>

        {/* ===== Team (featured, purple ring) ===== */}
        <div className="px-6 flex flex-col justify-end rounded-3xl ring-2 ring-purple-500">
          <div className="grow pb-4 mb-4 border-b !border-slate-900/80">
            <div className="text-base font-semibold !text-slate-900 pb-0.5">Team</div>
            <div className="mb-1">
              <span className="text-lg font-medium !text-slate-900">$</span>
              <span className="text-3xl font-extrabold !text-slate-900">{annual ? '49' : '54'}</span>
              <span className="text-sm !text-slate-900 font-medium">/mo</span>
            </div>
            <div className="!text-slate-900">Everything at your fingertips.</div>
          </div>
          <div className="pb-4 border-b !border-slate-900/80">
            <a
              className="btn-sm text-white bg-purple-600 hover:bg-purple-700 w-full transition duration-150 ease-in-out group"
              href="#0"
            >
              Get Started <span className="tracking-normal text-purple-200 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
            </a>
          </div>

          {[
            '250',
            'Unlimited',
            'Unlimited',
            '5',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '']
            .map((txt, i) => (
              <div key={i} className="flex items-center border-b !border-slate-900/80 py-2 text-slate-900">
                {txt ? (
                  <>
                    <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                    <span>{txt}</span>
                  </>
                ) : (
                  <span className="h-5" />
                )}
              </div>
            ))}
        </div>

        {/* ===== Enterprise ===== */}
        <div className="px-6 flex flex-col justify-end rounded-3xl">
          <div className="grow pb-4 mb-4 border-b !border-slate-900/80">
            <div className="text-base font-semibold !text-slate-900 pb-0.5">Enterprise</div>
            <div className="mb-1">
              <span className="text-lg font-medium !text-slate-900">$</span>
              <span className="text-3xl font-extrabold !text-slate-900">{annual ? '79' : '85'}</span>
              <span className="text-sm !text-slate-900 font-medium">/mo</span>
            </div>
            <div className="!text-slate-900">Everything at your fingertips.</div>
          </div>
          <div className="pb-4 border-b !border-slate-900/80">
            <a
              className="btn-sm !text-slate-900 !bg-slate-300 hover:!bg-slate-400 w-full transition duration-150 ease-in-out group"
              href="#0"
            >
              Get Started <span className="tracking-normal !text-slate-900 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
            </a>
          </div>

          {[
            'Unlimited',
            'Unlimited',
            'Unlimited',
            'Unlimited',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '']
            .map((txt, i) => (
              <div key={i} className="flex items-center border-b !border-slate-900/80 py-2 text-slate-900">
                {txt ? (
                  <>
                    <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                    <span>{txt}</span>
                  </>
                ) : (
                  <span className="h-5" />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
