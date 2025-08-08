'use client'

import { useState } from 'react'

// Pricing plan details
const plans = [
  {
    name: 'Pro',
    prices: { annual: 24, monthly: 29 },
    ctaStyle: 'text-slate-900 bg-linear-to-r from-white/80 via-white to-white/80 hover:bg-white',
    highlight: false,
  },
  {
    name: 'Team',
    prices: { annual: 49, monthly: 54 },
    ctaStyle: 'text-white bg-purple-500 hover:bg-purple-600',
    highlight: true,
  },
  {
    name: 'Enterprise',
    prices: { annual: 79, monthly: 85 },
    ctaStyle: 'text-slate-900 bg-linear-to-r from-white/80 via-white to-white/80 hover:bg-white',
    highlight: false,
  }
]

// Table feature rows (order matches columns)
const featureRows = [
  // USAGE
  {
    section: 'Usage',
    values: ['', '', ''],
    isHeader: true,
  },
  // Social Connections
  {
    section: 'Social Connections',
    values: ['100', '250', 'Unlimited'],
  },
  // Custom Domains
  {
    section: 'Custom Domains',
    values: ['4', 'Unlimited', 'Unlimited'],
  },
  // User Role Management
  {
    section: 'User Role Management',
    values: ['Unlimited', 'Unlimited', 'Unlimited'],
  },
  // External Databases
  {
    section: 'External Databases',
    values: ['1', '5', 'Unlimited'],
  },
  // FEATURES
  {
    section: 'Features',
    values: ['', '', ''],
    isHeader: true,
  },
  // Custom Connection
  {
    section: 'Custom Connection',
    values: [true, true, true],
  },
  // Advanced Deployment Options
  {
    section: 'Advanced Deployment Options',
    values: [true, true, true],
  },
  // Extra Add-ons
  {
    section: 'Extra Add-ons',
    values: [true, true, true],
  },
  // Admin Roles
  {
    section: 'Admin Roles',
    values: [false, false, true],
  },
  // Deploy and Monitor
  {
    section: 'Deploy and Monitor',
    values: [false, false, true],
  },
  // Enterprise Add-ons
  {
    section: 'Enterprise Add-ons',
    values: [false, false, true],
  },
  // SUPPORT
  {
    section: 'Support',
    values: ['', '', ''],
    isHeader: true,
  },
  // Premium Support
  {
    section: 'Premium Support',
    values: [false, true, true],
  },
]

// Utility to render feature cell
function renderFeatureCell(value: string | boolean) {
  if (typeof value === 'boolean') {
    if (value) {
      return (
        <span className="flex items-center h-full py-2 text-slate-400">
          <svg className="shrink-0 fill-purple-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9"><path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" /></svg>
        </span>
      )
    } else {
      return (
        <span className="flex items-center h-full py-2 text-slate-600 opacity-50">
          <svg className="shrink-0 fill-slate-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9"><path d="M2 7l3 3 7-7" /></svg>
        </span>
      )
    }
  }
  if (value === '') return <span />
  return (
    <span className="flex items-center h-full py-2 text-slate-400">{value}</span>
  )
}

export default function Pricing() {
  const [annual, setAnnual] = useState<boolean>(true)

  return (
    <div className="relative">
      {/* Blurred shape */}
      <div className="max-md:hidden absolute bottom-0 -mb-20 left-2/3 -translate-x-1/2 blur-2xl opacity-70 pointer-events-none" aria-hidden="true">
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
      {/* Pricing Table */}
      <div className="grid md:grid-cols-4 xl:-mx-6 text-sm [&>div]:bg-slate-700/20 [&>div:nth-of-type(4n+1)]:bg-transparent">
        {/* Toggle Switch Column */}
        <div className="px-6 flex flex-col justify-end">
          <div className="pb-5 md:border-b border-slate-800">
            <div className="max-md:text-center">
              <div className="inline-flex items-center whitespace-nowrap">
                <div className="text-sm text-slate-500 font-medium mr-2 md:max-lg:hidden">Monthly</div>
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
                <div className="text-sm text-slate-500 font-medium ml-2">Yearly <span className="text-teal-500">(-20%)</span></div>
              </div>
            </div>
          </div>
        </div>
        {/* Pricing Plan Columns */}
        {plans.map((plan, i) => (
          <div key={plan.name} className="px-6 flex flex-col justify-end">
            <div className="grow pb-4 mb-4 border-b border-slate-800">
              <div className="text-base font-medium bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-purple-200 pb-0.5">{plan.name}</div>
              <div className="mb-1">
                <span className="text-lg font-medium text-slate-500">$</span>
                <span className="text-3xl font-bold text-slate-50">{annual ? plan.prices.annual : plan.prices.monthly}</span>
                <span className="text-sm text-slate-600 font-medium">/mo</span>
              </div>
              <div className="text-slate-500">Everything at your fingertips.</div>
            </div>
            <div className="pb-4 border-b border-slate-800">
              <a
                className={`btn-sm w-full transition duration-150 ease-in-out group ${plan.ctaStyle}`}
                href="#0"
              >
                Get Started <span className={`tracking-normal ${plan.highlight ? 'text-purple-300' : 'text-purple-500'} group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1`}>&rarr;</span>
              </a>
            </div>
          </div>
        ))}
        {/* Feature Table Rows */}
        {featureRows.map((row, idx) => (
          <div
            key={idx}
            className={`px-6 flex flex-col justify-end ${row.isHeader ? 'bg-transparent [&>*]:!text-slate-50 [&>*]:!font-medium mt-4' : ''}`}
          >
            {row.isHeader ? (
              <div className="py-2 text-slate-50 font-medium">{row.section}</div>
            ) : (
              row.values.map((value, i) => (
                <div
                  key={i}
                  className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400"
                >
                  {i === 0 && (
                    <span className="w-36 md:w-auto mr-2">{row.section}</span>
                  )}
                  {renderFeatureCell(value)}
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
