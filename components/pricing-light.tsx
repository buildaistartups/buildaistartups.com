'use client'

import { useState } from 'react'

export default function PricingLight() {
  const [annual, setAnnual] = useState<boolean>(true)

  return (
    <div className="relative">
      {/* Subtle background bloom (kept, but very light so it doesn't wash text) */}
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

      {/* CONTENT (same grid and order as original) */}
      <div className="grid md:grid-cols-4 xl:-mx-6 text-sm
        [&>div:nth-of-type(-n+4)]:py-6
        [&>div:nth-last-of-type(-n+4)]:pb-6
        max-md:[&>div:nth-last-of-type(-n+4)]:mb-8
        max-md:[&>div:nth-of-type(-n+4):nth-of-type(n+1)]:rounded-t-3xl
        max-md:[&>div:nth-last-of-type(-n+4)]:rounded-b-3xl
        md:[&>div:nth-of-type(2)]:rounded-tl-3xl
        md:[&>div:nth-of-type(4)]:rounded-tr-3xl
        md:[&>div:nth-last-of-type(3)]:rounded-bl-3xl
        md:[&>div:nth-last-of-type(1)]:rounded-br-3xl

        /* >>> LIGHT THEME SURFACE & LINES <<< */
        [&>div]:bg-slate-100
        [&>div]:shadow-sm
        [&>div]:ring-1
        [&>div]:ring-slate-200

        /* keep first (left column) hollow as in original layout */
        [&>div:nth-of-type(4n+1)]:bg-transparent
        [&>div:nth-of-type(4n+1)]:ring-0
        [&>div:nth-of-type(4n+1)]:shadow-none

        /* mobile ordering preserved */
        max-md:[&>div:nth-of-type(4n+5)]:hidden
        max-md:[&>div:nth-of-type(4n+2)]:order-1
        max-md:[&>div:nth-of-type(4n+3)]:order-2
        max-md:[&>div:nth-of-type(4n+4)]:order-3
        max-md:md:[&>div:nth-of-type(n)]:mb-0

        /* keep purple highlight frame on the middle column */
        [&>div:nth-of-type(4n+3)]:relative
        [&>div:nth-of-type(4n+3)]:before:absolute
        [&>div:nth-of-type(4n+3)]:before:-inset-px
        [&>div:nth-of-type(4n+3)]:before:rounded-[inherit]
        [&>div:nth-of-type(4n+3)]:before:border-x-2
        [&>div:nth-of-type(3)]:before:border-t-2
        [&>div:nth-last-of-type(2)]:before:border-b-2
        [&>div:nth-of-type(4n+3)]:before:border-purple-500
        [&>div:nth-of-type(4n+3)]:before:-z-10
        [&>div:nth-of-type(4n+3)]:before:pointer-events-none"
      >
        {/* Pricing toggle (left column) */}
        <div className="px-6 flex flex-col justify-end">
          <div className="pb-5 md:border-b border-slate-200">
            <div className="max-md:text-center">
              <div className="inline-flex items-center whitespace-nowrap">
                <div className="text-sm text-slate-700 font-medium mr-2 md:max-lg:hidden">Monthly</div>
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
                    className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-slate-400 px-0.5 outline-slate-400 transition-colors
                      before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow-xs before:transition-transform before:duration-150
                      peer-checked:bg-purple-500 peer-checked:before:translate-x-full
                      peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-focus-visible:peer-checked:outline-purple-500"
                  >
                    <span className="sr-only">Pay Yearly</span>
                  </label>
                </div>
                <div className="text-sm text-slate-700 font-medium ml-2">
                  Yearly <span className="text-teal-600">(-20%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pro price */}
        <div className="px-6 flex flex-col justify-end">
          <div className="grow pb-4 mb-4 border-b border-slate-200">
            <div className="text-base font-medium text-slate-900 pb-0.5">Pro</div>
            <div className="mb-1">
              <span className="text-lg font-medium text-slate-900">$</span>
              <span className="text-3xl font-bold text-slate-900">{annual ? '24' : '29'}</span>
              <span className="text-sm text-slate-900 font-medium">/mo</span>
            </div>
            <div className="text-slate-700">Everything at your fingertips.</div>
          </div>
          <div className="pb-4 border-b border-slate-200">
            <a
              className="btn-sm text-slate-900 bg-linear-to-r from-white via-white to-white hover:bg-white w-full transition duration-150 ease-in-out group ring-1 ring-slate-300"
              href="#0"
            >
              Get Started{' '}
              <span className="tracking-normal text-purple-600 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                -&gt;
              </span>
            </a>
          </div>
        </div>

        {/* Team price (highlighted by purple frame via :before above) */}
        <div className="px-6 flex flex-col justify-end">
          <div className="grow pb-4 mb-4 border-b border-slate-200">
            <div className="text-base font-medium text-slate-900 pb-0.5">Team</div>
            <div className="mb-1">
              <span className="text-lg font-medium text-slate-900">$</span>
              <span className="text-3xl font-bold text-slate-900">{annual ? '49' : '54'}</span>
              <span className="text-sm text-slate-900 font-medium">/mo</span>
            </div>
            <div className="text-slate-700">Everything at your fingertips.</div>
          </div>
          <div className="pb-4 border-b border-slate-200">
            <a
              className="btn-sm text-white bg-purple-600 hover:bg-purple-700 w-full transition duration-150 ease-in-out group"
              href="#0"
            >
              Get Started{' '}
              <span className="tracking-normal text-purple-200 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                -&gt;
              </span>
            </a>
          </div>
        </div>

        {/* Enterprise price */}
        <div className="px-6 flex flex-col justify-end">
          <div className="grow pb-4 mb-4 border-b border-slate-200">
            <div className="text-base font-medium text-slate-900 pb-0.5">Enterprise</div>
            <div className="mb-1">
              <span className="text-lg font-medium text-slate-900">$</span>
              <span className="text-3xl font-bold text-slate-900">{annual ? '79' : '85'}</span>
              <span className="text-sm text-slate-900 font-medium">/mo</span>
            </div>
            <div className="text-slate-700">Everything at your fingertips.</div>
          </div>
          <div className="pb-4 border-b border-slate-200">
            <a
              className="btn-sm text-slate-900 bg-linear-to-r from-white via-white to-white hover:bg-white w-full transition duration-150 ease-in-out group ring-1 ring-slate-300"
              href="#0"
            >
              Get Started{' '}
              <span className="tracking-normal text-purple-600 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                -&gt;
              </span>
            </a>
          </div>
        </div>

        {/* ========== LEFT COLUMN: SECTION LABELS (same items as original) ========== */}
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-900 font-medium mt-4">Usage</div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-900 font-medium mt-4 md:hidden">Usage</div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-900 font-medium mt-4 md:hidden">Usage</div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-900 font-medium mt-4 md:hidden">Usage</div>
        </div>

        {/* Social Connections row header */}
        <HeaderRow title="Social Connections" />

        {/* Social Connections values */}
        <ValueRow value="100" />
        <ValueRow value="250" />
        <ValueRow value="Unlimited" />

        {/* Custom Domains header */}
        <HeaderRow title="Custom Domains" />

        {/* Custom Domains values */}
        <ValueRow value="4" />
        <ValueRow value="Unlimited" />
        <ValueRow value="Unlimited" />

        {/* User Role Management header */}
        <HeaderRow title="User Role Management" />

        {/* User Role Management values */}
        <ValueRow value="Unlimited" />
        <ValueRow value="Unlimited" />
        <ValueRow value="Unlimited" />

        {/* External Databases header */}
        <HeaderRow title="External Databases" />

        {/* External Databases values */}
        <ValueRow value="1" />
        <ValueRow value="5" />
        <ValueRow value="Unlimited" />

        {/* Features section title (left-side) */}
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-900 font-medium mt-4">Features</div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-900 font-medium mt-4 md:hidden">Features</div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-900 font-medium mt-4 md:hidden">Features</div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-900 font-medium mt-4 md:hidden">Features</div>
        </div>

        {/* Feature rows (Custom Connection) */}
        <HeaderRow title="Custom Connection" />
        <TickRow />
        <TickRow />
        <TickRow />

        {/* Advanced Deployment Options */}
        <HeaderRow title="Advanced Deployment Options" />
        <TickRow />
        <TickRow />
        <TickRow />

        {/* Extra Add-ons */}
        <HeaderRow title="Extra Add-ons" />
        <TickRow />
        <TickRow />
        <TickRow />

        {/* Admin Roles */}
        <HeaderRow title="Admin Roles" />
        <BlankRow />
        <BlankRow />
        <TickRow />

        {/* Deploy and Monitor */}
        <HeaderRow title="Deploy and Monitor" />
        <BlankRow />
        <BlankRow />
        <TickRow />

        {/* Enterprise Add-ons */}
        <HeaderRow title="Enterprise Add-ons" />
        <BlankRow />
        <BlankRow />
        <TickRow />

        {/* Support section title */}
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-900 font-medium mt-4">Support</div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-900 font-medium mt-4 hidden">Support</div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-900 font-medium mt-4 md:hidden">Support</div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-900 font-medium mt-4 md:hidden">Support</div>
        </div>

        {/* Premium Support */}
        <HeaderRow title="Premium Support" />
        <BlankRow />
        <TickRow />
        <TickRow />
      </div>
    </div>
  )
}

/* ---------- helpers (same semantics as the original table) ---------- */

function HeaderRow({ title }: { title: string }) {
  return (
    <div className="px-6 flex flex-col justify-end">
      <div className="py-2 text-slate-600 border-b border-slate-200">{title}</div>
    </div>
  )
}

function ValueRow({ value }: { value: string }) {
  return (
    <div className="px-6 flex flex-col justify-end">
      <div className="flex items-center h-full border-b border-slate-200 py-2 text-slate-700">
        <CheckIcon />
        <span>{value}</span>
      </div>
    </div>
  )
}

function TickRow() {
  return (
    <div className="px-6 flex flex-col justify-end">
      <div className="flex items-center h-full border-b border-slate-200 py-2 text-slate-700">
        <CheckIcon />
        <span className="md:hidden">&nbsp;</span>
      </div>
    </div>
  )
}

function BlankRow() {
  return (
    <div className="px-6 flex flex-col justify-end">
      <div className="flex items-center border-b border-slate-200 py-2 text-slate-700 max-md:hidden">
        <span className="opacity-0 select-none">.</span>
      </div>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9" aria-hidden="true">
      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
    </svg>
  )
}
