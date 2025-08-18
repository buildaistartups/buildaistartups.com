'use client'

import { useState } from 'react'

export default function PricingLight() {
  const [annual, setAnnual] = useState<boolean>(true)

  return (
    <div className="relative">
      {/* Optional purple glow kept very subtle */}
      <div className="max-md:hidden absolute bottom-0 -mb-20 left-2/3 -translate-x-1/2 blur-2xl opacity-50 pointer-events-none" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
          <defs>
            <linearGradient id="bs5-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path fill="url(#bs5-a)" fillRule="evenodd" d="m661 736 461 369-284 58z" transform="matrix(1 0 0 -1 -661 1163)" />
        </svg>
      </div>

      {/* GRID */}
      <div
        className={[
          'grid md:grid-cols-4 xl:-mx-6 text-sm',
          '[&>div:nth-of-type(-n+4)]:py-6 [&>div:nth-last-of-type(-n+4)]:pb-6',
          'max-md:[&>div:nth-last-of-type(-n+4)]:mb-8',
          'max-md:[&>div:nth-of-type(-n+4):nth-of-type(n+1)]:rounded-t-3xl',
          'max-md:[&>div:nth-last-of-type(-n+4)]:rounded-b-3xl',
          'md:[&>div:nth-of-type(2)]:rounded-tl-3xl md:[&>div:nth-of-type(4)]:rounded-tr-3xl',
          'md:[&>div:nth-last-of-type(3)]:rounded-bl-3xl md:[&>div:nth-last-of-type(1)]:rounded-br-3xl',

          // LIGHT THEME ENFORCEMENT
          // All cards: light grey; first column (feature labels) stays transparent
          '[&>div]:!bg-gray-100 [&>div:nth-of-type(4n+1)]:!bg-transparent',
          // Ordering on mobile
          'max-md:[&>div:nth-of-type(4n+5)]:hidden',
          'max-md:[&>div:nth-of-type(4n+2)]:order-1',
          'max-md:[&>div:nth-of-type(4n+3)]:order-2',
          'max-md:[&>div:nth-of-type(4n+4)]:order-3',
          'max-md:md:[&>div:nth-of-type(n)]:mb-0',
          // Selector outline (middle column)
          '[&>div:nth-of-type(4n+3)]:relative',
          '[&>div:nth-of-type(4n+3)]:before:absolute',
          '[&>div:nth-of-type(4n+3)]:before:-inset-px',
          '[&>div:nth-of-type(4n+3)]:before:rounded-[inherit]',
          '[&>div:nth-of-type(4n+3)]:before:border-x-2',
          '[&>div:nth-of-type(3)]:before:border-t-2',
          '[&>div:nth-last-of-type(2)]:before:border-b-2',
          '[&>div:nth-of-type(4n+3)]:before:border-purple-500',
          '[&>div:nth-of-type(4n+3)]:before:-z-10',
          '[&>div:nth-of-type(4n+3)]:before:pointer-events-none',
        ].join(' ')}
      >
        {/* Toggle */}
        <div className="px-6 flex flex-col justify-end">
          <div className="pb-5 md:border-b !border-gray-200">
            <div className="max-md:text-center">
              <div className="inline-flex items-center whitespace-nowrap">
                <div className="text-sm !text-slate-800 font-medium mr-2 md:max-lg:hidden">Monthly</div>
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
                <div className="text-sm !text-slate-800 font-medium ml-2">
                  Yearly <span className="text-teal-600">(-20%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PRO */}
        <div className="px-6 flex flex-col justify-end">
          <div className="grow pb-4 mb-4 border-b !border-gray-200">
            <div className="text-base font-semibold !text-slate-900">Pro</div>
            <div className="mt-1">
              <span className="text-lg font-medium !text-slate-800">$</span>
              <span className="text-3xl font-bold !text-slate-900">{annual ? '24' : '29'}</span>
              <span className="text-sm !text-slate-900 font-medium">/mo</span>
            </div>
            <div className="!text-slate-700 mt-1">Everything at your fingertips.</div>
          </div>
          <div className="pb-4 border-b !border-gray-200">
            <a className="btn-sm !text-slate-900 bg-white hover:bg-white w-full border !border-gray-200 transition group" href="#0">
              Get Started{' '}
              <span className="tracking-normal text-purple-600 group-hover:translate-x-0.5 transition-transform ml-1">-&gt;</span>
            </a>
          </div>
        </div>

        {/* TEAM (highlight) */}
        <div className="px-6 flex flex-col justify-end">
          <div className="grow pb-4 mb-4 border-b !border-gray-200">
            <div className="text-base font-semibold !text-slate-900">Team</div>
            <div className="mt-1">
              <span className="text-lg font-medium !text-slate-800">$</span>
              <span className="text-3xl font-bold !text-slate-900">{annual ? '49' : '54'}</span>
              <span className="text-sm !text-slate-900 font-medium">/mo</span>
            </div>
            <div className="!text-slate-700 mt-1">Everything at your fingertips.</div>
          </div>
          <div className="pb-4 border-b !border-gray-200">
            <a className="btn-sm text-white bg-purple-600 hover:bg-purple-700 w-full transition group" href="#0">
              Get Started{' '}
              <span className="tracking-normal text-purple-200 group-hover:translate-x-0.5 transition-transform ml-1">-&gt;</span>
            </a>
          </div>
        </div>

        {/* ENTERPRISE */}
        <div className="px-6 flex flex-col justify-end">
          <div className="grow pb-4 mb-4 border-b !border-gray-200">
            <div className="text-base font-semibold !text-slate-900">Enterprise</div>
            <div className="mt-1">
              <span className="text-lg font-medium !text-slate-800">$</span>
              <span className="text-3xl font-bold !text-slate-900">{annual ? '79' : '85'}</span>
              <span className="text-sm !text-slate-900 font-medium">/mo</span>
            </div>
            <div className="!text-slate-700 mt-1">Everything at your fingertips.</div>
          </div>
          <div className="pb-4 border-b !border-gray-200">
            <a className="btn-sm !text-slate-900 bg-white hover:bg-white w-full border !border-gray-200 transition group" href="#0">
              Get Started{' '}
              <span className="tracking-normal text-purple-600 group-hover:translate-x-0.5 transition-transform ml-1">-&gt;</span>
            </a>
          </div>
        </div>

        {/* ===== Labels ===== */}
        <div className="px-6 flex flex-col justify-end"><div className="py-2 !text-slate-900 font-semibold mt-4">Usage</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="py-2 !text-slate-900 font-semibold mt-4 md:hidden">Usage</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="py-2 !text-slate-900 font-semibold mt-4 md:hidden">Usage</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="py-2 !text-slate-900 font-semibold mt-4 md:hidden">Usage</div></div>

        {/* ===== Rows (Social Connections) ===== */}
        <div className="px-6 flex flex-col justify-end"><div className="py-2 !text-slate-700 border-b !border-gray-200">Social Connections</div></div>
        <Row value="100" />
        <Row value="250" />
        <Row value="Unlimited" />

        {/* ===== Custom Domains ===== */}
        <div className="px-6 flex flex-col justify-end"><div className="py-2 !text-slate-700 border-b !border-gray-200">Custom Domains</div></div>
        <Row value="4" />
        <Row value="Unlimited" />
        <Row value="Unlimited" />

        {/* ===== User Role Management ===== */}
        <div className="px-6 flex flex-col justify-end"><div className="py-2 !text-slate-700 border-b !border-gray-200">User Role Management</div></div>
        <Row value="Unlimited" />
        <Row value="Unlimited" />
        <Row value="Unlimited" />

        {/* ===== External Databases ===== */}
        <div className="px-6 flex flex-col justify-end"><div className="py-2 !text-slate-700 border-b !border-gray-200">External Databases</div></div>
        <Row value="1" />
        <Row value="5" />
        <Row value="Unlimited" />

        {/* ===== Labels ===== */}
        <div className="px-6 flex flex-col justify-end"><div className="py-2 !text-slate-900 font-semibold mt-4">Features</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="py-2 !text-slate-900 font-semibold mt-4 md:hidden">Features</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="py-2 !text-slate-900 font-semibold mt-4 md:hidden">Features</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="py-2 !text-slate-900 font-semibold mt-4 md:hidden">Features</div></div>

        {/* Feature rows (placeholders kept to match original grid) */}
        <FeatRow label="Custom Connection" />
        <FeatRow />
        <FeatRow />

        <div className="px-6 flex flex-col justify-end"><div className="py-2 !text-slate-700 border-b !border-gray-200">Advanced Deployment Options</div></div>
        <FeatRow /><FeatRow /><FeatRow />

        <div className="px-6 flex flex-col justify-end"><div className="py-2 !text-slate-700 border-b !border-gray-200">Extra Add-ons</div></div>
        <FeatRow /><FeatRow /><FeatRow />

        <div className="px-6 flex flex-col justify-end"><div className="py-2 !text-slate-700 border-b !border-gray-200">Admin Roles</div></div>
        <BlankRow /><BlankRow /><FeatRow />

        <div className="px-6 flex flex-col justify-end"><div className="py-2 !text-slate-700 border-b !border-gray-200">Deploy and Monitor</div></div>
        <BlankRow /><BlankRow /><FeatRow />

        <div className="px-6 flex flex-col justify-end"><div className="py-2 !text-slate-700 border-b !border-gray-200">Enterprise Add-ons</div></div>
        <BlankRow /><BlankRow /><FeatRow />

        {/* ===== Support ===== */}
        <div className="px-6 flex flex-col justify-end"><div className="py-2 !text-slate-900 font-semibold mt-4">Support</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="py-2 !text-slate-900 font-semibold mt-4 hidden">Support</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="py-2 !text-slate-900 font-semibold mt-4 md:hidden">Support</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="py-2 !text-slate-900 font-semibold mt-4 md:hidden">Support</div></div>

        <div className="px-6 flex flex-col justify-end"><div className="py-2 !text-slate-700 border-b !border-gray-200">Premium Support</div></div>
        <BlankRow /><FeatRow /><FeatRow />
      </div>
    </div>
  )
}

/* ---------- helpers ---------- */

function Row({ value }: { value: string }) {
  return (
    <div className="px-6 flex flex-col justify-end">
      <div className="flex items-center h-full border-b !border-gray-200 py-2 !text-slate-800">
        <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
          <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
        </svg>
        <span>{value}</span>
      </div>
    </div>
  )
}

function FeatRow({ label }: { label?: string }) {
  return (
    <>
      <div className="px-6 flex flex-col justify-end">
        <div className="py-2 !text-slate-700 border-b !border-gray-200">{label ?? ''}</div>
      </div>
      <div className="px-6 flex flex-col justify-end">
        <div className="flex items-center h-full border-b !border-gray-200 py-2 !text-slate-800">
          <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
            <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
          </svg>
          <span />
        </div>
      </div>
      <div className="px-6 flex flex-col justify-end">
        <div className="flex items-center h-full border-b !border-gray-200 py-2 !text-slate-800">
          <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
            <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
          </svg>
          <span />
        </div>
      </div>
    </>
  )
}

function BlankRow() {
  return (
    <div className="px-6 flex flex-col justify-end">
      <div className="flex items-center border-b !border-gray-200 py-2 !text-slate-700 max-md:hidden">
        <span />
      </div>
    </div>
  )
}
