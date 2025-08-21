'use client'

import { useState } from 'react'

export default function Pricing() {
  const [annual, setAnnual] = useState<boolean>(true)

  return (
    <div className="relative pricing-light">
      {/* Content */}
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

          /* LIGHT theme enforcement */
          [&>div]:!bg-slate-100
          [&>div:nth-of-type(4n+1)]:!bg-slate-50
          [&_*]:!text-slate-900
        "
      >
        {/* Pricing toggle */}
        <div className="px-6 flex flex-col justify-end">
          <div className="pb-5 md:border-b !border-slate-900">
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
        </div>

        {/* ===== Pro (non-selected) ===== */}
        <div className="px-6 flex flex-col justify-end">
          <div className="grow pb-4 mb-4 border-b !border-slate-900">
            <div className="text-base font-medium pb-0.5">Pro</div>
            <div className="mb-1">
              <span className="text-lg font-medium">$</span>
              <span className="text-3xl font-bold">{annual ? '24' : '29'}</span>
              <span className="text-sm font-medium">/mo</span>
            </div>
            <div>Everything at your fingertips.</div>
          </div>
          <div className="pb-4 border-b !border-slate-900">
            <a
              className="btn-sm !text-slate-900 !bg-slate-200 hover:!bg-slate-300 w-full transition duration-150 ease-in-out group"
              href="#0"
            >
              Get Started
              <span className="tracking-normal !text-slate-900 ml-1 group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </a>
          </div>
        </div>

        {/* ===== Team (FEATURED – purple rail) ===== */}
        <div className="px-6 flex flex-col justify-end relative before:absolute before:-inset-px before:rounded-[inherit] before:border-x-2 before:border-t-2 before:border-b-2 before:border-purple-500 before:pointer-events-none before:-z-10">
          <div className="grow pb-4 mb-4 border-b !border-slate-900">
            <div className="text-base font-medium pb-0.5">Team</div>
            <div className="mb-1">
              <span className="text-lg font-medium">$</span>
              <span className="text-3xl font-bold">{annual ? '49' : '54'}</span>
              <span className="text-sm font-medium">/mo</span>
            </div>
            <div>Everything at your fingertips.</div>
          </div>
          <div className="pb-4 border-b !border-slate-900">
            <a
              className="btn-sm text-white bg-purple-500 hover:bg-purple-600 w-full transition duration-150 ease-in-out group"
              href="#0"
            >
              Get Started
              <span className="tracking-normal text-purple-100 ml-1 group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </a>
          </div>
        </div>

        {/* ===== Enterprise (non-selected) ===== */}
        <div className="px-6 flex flex-col justify-end">
          <div className="grow pb-4 mb-4 border-b !border-slate-900">
            <div className="text-base font-medium pb-0.5">Enterprise</div>
            <div className="mb-1">
              <span className="text-lg font-medium">$</span>
              <span className="text-3xl font-bold">{annual ? '79' : '85'}</span>
              <span className="text-sm font-medium">/mo</span>
            </div>
            <div>Everything at your fingertips.</div>
          </div>
          <div className="pb-4 border-b !border-slate-900">
            <a
              className="btn-sm !text-slate-900 !bg-slate-200 hover:!bg-slate-300 w-full transition duration-150 ease-in-out group"
              href="#0"
            >
              Get Started
              <span className="tracking-normal !text-slate-900 ml-1 group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </a>
          </div>
        </div>

        {/* ===== Section labels: Usage / Features / Support ===== */}
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 font-medium mt-4">Usage</div>
        </div>
        <div className="px-6 flex flex-col justify-end"><div className="py-2 font-medium mt-4 md:hidden">Usage</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="py-2 font-medium mt-4 md:hidden">Usage</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="py-2 font-medium mt-4 md:hidden">Usage</div></div>

        {/* Social Connections */}
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 border-b !border-slate-900">Social Connections</div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b !border-slate-900 py-2">
            <svg className="shrink-0 fill-purple-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9"><path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" /></svg>
            <span>100 <span className="md:hidden">Social Connections</span></span>
          </div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b !border-slate-900 py-2">
            <svg className="shrink-0 fill-purple-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9"><path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" /></svg>
            <span>250 <span className="md:hidden">Social Connections</span></span>
          </div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b !border-slate-900 py-2">
            <svg className="shrink-0 fill-purple-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9"><path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" /></svg>
            <span>Unlimited <span className="md:hidden">Social Connections</span></span>
          </div>
        </div>

        {/* Custom Domains */}
        <div className="px-6 flex flex-col justify-end"><div className="py-2 border-b !border-slate-900">Custom Domains</div></div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b !border-slate-900 py-2">
            <svg className="shrink-0 fill-purple-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9"><path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" /></svg>
            <span>4 <span className="md:hidden">Custom Domains</span></span>
          </div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b !border-slate-900 py-2">
            <svg className="shrink-0 fill-purple-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9"><path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" /></svg>
            <span>Unlimited <span className="md:hidden">Custom Domains</span></span>
          </div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b !border-slate-900 py-2">
            <svg className="shrink-0 fill-purple-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9"><path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" /></svg>
            <span>Unlimited <span className="md:hidden">Custom Domains</span></span>
          </div>
        </div>

        {/* User Role Management */}
        <div className="px-6 flex flex-col justify-end"><div className="py-2 border-b !border-slate-900">User Role Management</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="flex items-center h-full border-b !border-slate-900 py-2"><svg className="shrink-0 fill-purple-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9"><path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" /></svg><span>Unlimited <span className="md:hidden">User Role Management</span></span></div></div>
        <div className="px-6 flex flex-col justify-end"><div className="flex items-center h-full border-b !border-slate-900 py-2"><svg className="shrink-0 fill-purple-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9"><path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" /></svg><span>Unlimited <span className="md:hidden">User Role Management</span></span></div></div>
        <div className="px-6 flex flex-col justify-end"><div className="flex items-center h-full border-b !border-slate-900 py-2"><svg className="shrink-0 fill-purple-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9"><path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" /></svg><span>Unlimited <span className="md:hidden">User Role Management</span></span></div></div>

        {/* External Databases */}
        <div className="px-6 flex flex-col justify-end"><div className="py-2 border-b !border-slate-900">External Databases</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="flex items-center h-full border-b !border-slate-900 py-2"><svg className="shrink-0 fill-purple-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9"><path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" /></svg><span>1 <span className="md:hidden">External Databases</span></span></div></div>
        <div className="px-6 flex flex-col justify-end"><div className="flex items-center h-full border-b !border-slate-900 py-2"><svg className="shrink-0 fill-purple-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9"><path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" /></svg><span>5 <span className="md:hidden">External Databases</span></span></div></div>
        <div className="px-6 flex flex-col justify-end"><div className="flex items-center h-full border-b !border-slate-900 py-2"><svg className="shrink-0 fill-purple-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9"><path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" /></svg><span>Unlimited <span className="md:hidden">External Databases</span></span></div></div>

        {/* Features / Support headers */}
        <div className="px-6 flex flex-col justify-end"><div className="py-2 font-medium mt-4">Features</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="py-2 font-medium mt-4 md:hidden">Features</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="py-2 font-medium mt-4 md:hidden">Features</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="py-2 font-medium mt-4 md:hidden">Features</div></div>

        {/* (empty feature rows kept for spacing) */}
        <div className="px-6 flex flex-col justify-end"><div className="py-2 border-b !border-slate-900">Custom Connection</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="flex items-center h-full border-b !border-slate-900 py-2"><span className="md:hidden">Custom Connection</span></div></div>
        <div className="px-6 flex flex-col justify-end"><div className="flex items-center h-full border-b !border-slate-900 py-2"><span className="md:hidden">Custom Connection</span></div></div>
        <div className="px-6 flex flex-col justify-end"><div className="flex items-center h-full border-b !border-slate-900 py-2"><span className="md:hidden">Custom Connection</span></div></div>

        <div className="px-6 flex flex-col justify-end"><div className="py-2 font-medium mt-4">Support</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="py-2 font-medium mt-4 hidden">Support</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="py-2 font-medium mt-4 md:hidden">Support</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="py-2 font-medium mt-4 md:hidden">Support</div></div>

        <div className="px-6 flex flex-col justify-end"><div className="py-2 border-b !border-slate-900">Premium Support</div></div>
        <div className="px-6 flex flex-col justify-end"><div className="flex items-center border-b !border-slate-900 py-2 max-md:hidden"><span className="md:hidden">Premium Support</span></div></div>
        <div className="px-6 flex flex-col justify-end"><div className="flex items-center h-full border-b !border-slate-900 py-2"><span className="md:hidden">Premium Support</span></div></div>
      </div>
    </div>
  )
}
