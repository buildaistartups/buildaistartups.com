'use client'

import { useState } from 'react'

export default function Pricing() {
  const [annual, setAnnual] = useState(true)

  return (
    <div className="relative">
      {/* Pricing grid */}
      <div
        className="
          grid md:grid-cols-4 xl:-mx-6 text-sm text-slate-900

          [&>div:nth-of-type(-n+4)]:py-6
          [&>div:nth-last-of-type(-n+4)]:pb-6
          max-md:[&>div:nth-last-of-type(-n+4)]:mb-8
          max-md:[&>div:nth-of-type(-n+4):nth-of-type(n+1)]:rounded-t-3xl
          max-md:[&>div:nth-last-of-type(-n+4)]:rounded-b-3xl
          md:[&>div:nth-of-type(2)]:rounded-tl-3xl
          md:[&>div:nth-of-type(4)]:rounded-tr-3xl
          md:[&>div:nth-last-of-type(3)]:rounded-bl-3xl
          md:[&>div:nth-last-of-type(1)]:rounded-br-3xl

          /* Light cards */
          [&>div]:!bg-white
          [&>div:nth-of-type(4n+1)]:!bg-slate-50  /* left label column a bit darker */

          max-md:[&>div:nth-of-type(4n+5)]:hidden
          max-md:[&>div:nth-of-type(4n+2)]:order-1
          max-md:[&>div:nth-of-type(4n+3)]:order-2
          max-md:[&>div:nth-of-type(4n+4)]:order-3

          /* Purple selector rectangle for middle (Team) column */
          [&>div:nth-of-type(4n+3)]:relative
          [&>div:nth-of-type(4n+3)]:before:absolute
          [&>div:nth-of-type(4n+3)]:before:-inset-px
          [&>div:nth-of-type(4n+3)]:before:rounded-[inherit]
          [&>div:nth-of-type(4n+3)]:before:border-x-2
          [&>div:nth-of-type(3)]:before:border-t-2
          [&>div:nth-last-of-type(2)]:before:border-b-2
          [&>div:nth-of-type(4n+3)]:before:border-purple-500
          [&>div:nth-of-type(4n+3)]:before:-z-10
        "
      >
        {/* Toggle column */}
        <div className="px-6 flex flex-col justify-end">
          <div className="pb-5 md:border-b !border-black">
            <div className="max-md:text-center">
              <div className="inline-flex items-center whitespace-nowrap">
                <div className="text-sm !text-slate-900 font-medium mr-2 md:max-lg:hidden">Monthly</div>
                <div className="relative">
                  <input
                    id="toggle"
                    type="checkbox"
                    className="peer sr-only"
                    checked={annual}
                    onChange={() => setAnnual(!annual)}
                  />
                  <label
                    htmlFor="toggle"
                    className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-slate-400 px-0.5 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow-xs before:transition-transform peer-checked:bg-purple-500 peer-checked:before:translate-x-full"
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
        </div>

        {/* ===== Pro (non-selected) ===== */}
        <div className="px-6 flex flex-col justify-end">
          <div className="grow pb-4 mb-4 border-b !border-black">
            <div className="text-base font-medium">Pro</div>
            <div className="mb-1">
              <span className="text-lg font-medium">$</span>
              <span className="text-3xl font-bold">{annual ? '24' : '29'}</span>
              <span className="text-sm font-medium">/mo</span>
            </div>
            <div>Everything at your fingertips.</div>
          </div>
          <div className="pb-4 border-b !border-black">
            <a className="btn-sm !text-slate-900 !bg-slate-200 hover:!bg-slate-300 w-full transition group" href="#0">
              Get Started
              <span className="ml-1 group-hover:translate-x-0.5 transition">-&gt;</span>
            </a>
          </div>
        </div>

        {/* ===== Team (featured) ===== */}
        <div className="px-6 flex flex-col justify-end">
          <div className="grow pb-4 mb-4 border-b !border-black">
            <div className="text-base font-medium">Team</div>
            <div className="mb-1">
              <span className="text-lg font-medium">$</span>
              <span className="text-3xl font-bold">{annual ? '49' : '54'}</span>
              <span className="text-sm font-medium">/mo</span>
            </div>
            <div>Everything at your fingertips.</div>
          </div>
          <div className="pb-4 border-b !border-black">
            <a className="btn-sm text-white bg-purple-500 hover:bg-purple-600 w-full transition group" href="#0">
              Get Started <span className="ml-1 group-hover:translate-x-0.5 transition">-&gt;</span>
            </a>
          </div>
        </div>

        {/* ===== Enterprise (non-selected) ===== */}
        <div className="px-6 flex flex-col justify-end">
          <div className="grow pb-4 mb-4 border-b !border-black">
            <div className="text-base font-medium">Enterprise</div>
            <div className="mb-1">
              <span className="text-lg font-medium">$</span>
              <span className="text-3xl font-bold">{annual ? '79' : '85'}</span>
              <span className="text-sm font-medium">/mo</span>
            </div>
            <div>Everything at your fingertips.</div>
          </div>
          <div className="pb-4 border-b !border-black">
            <a className="btn-sm !text-slate-900 !bg-slate-200 hover:!bg-slate-300 w-full transition group" href="#0">
              Get Started <span className="ml-1 group-hover:translate-x-0.5 transition">-&gt;</span>
            </a>
          </div>
        </div>

        {/* ===== Row labels & rows (all black text + black dividers) ===== */}
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 font-medium mt-4">Usage</div>
        </div>
        <div className="px-6 flex flex-col justify-end"><div className="py-2 font-medium mt-4 md:hidden">Usage</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="py-2 font-medium mt-4 md:hidden">Usage</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="py-2 font-medium mt-4 md:hidden">Usage</div></div>

        {/* Social Connections */}
        <div className="px-6 flex flex-col justify-end"><div className="py-2 border-b !border-black">Social Connections</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="flex items-center h-full py-2 border-b !border-black"><Dot/>100</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="flex items-center h-full py-2 border-b !border-black"><Dot/>250</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="flex items-center h-full py-2 border-b !border-black"><Dot/>Unlimited</div></div>

        {/* Custom Domains */}
        <div className="px-6 flex flex-col justify-end"><div className="py-2 border-b !border-black">Custom Domains</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="flex items-center h-full py-2 border-b !border-black"><Dot/>4</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="flex items-center h-full py-2 border-b !border-black"><Dot/>Unlimited</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="flex items-center h-full py-2 border-b !border-black"><Dot/>Unlimited</div></div>

        {/* User Role Management */}
        <div className="px-6 flex flex-col justify-end"><div className="py-2 border-b !border-black">User Role Management</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="flex items-center h-full py-2 border-b !border-black"><Dot/>Unlimited</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="flex items-center h-full py-2 border-b !border-black"><Dot/>Unlimited</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="flex items-center h-full py-2 border-b !border-black"><Dot/>Unlimited</div></div>

        {/* External Databases */}
        <div className="px-6 flex flex-col justify-end"><div className="py-2 border-b !border-black">External Databases</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="flex items-center h-full py-2 border-b !border-black"><Dot/>1</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="flex items-center h-full py-2 border-b !border-black"><Dot/>5</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="flex items-center h-full py-2 border-b !border-black"><Dot/>Unlimited</div></div>
      </div>
    </div>
  )
}

/** small purple check bullet */
function Dot() {
  return (
    <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
    </svg>
  )
}
