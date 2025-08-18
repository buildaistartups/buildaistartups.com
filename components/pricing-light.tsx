'use client'

import { useState } from 'react'

// tiny local check icon
function CheckIcon({ className = '', size = 16 }: { className?: string; size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export default function PricingLight() {
  const [annual, setAnnual] = useState(true)

  return (
    <div className="relative">
      {/* HARD MASK to block the section gradient */}
      <div className="absolute inset-0 bg-slate-50" aria-hidden="true" />

      {/* Table container on top of the mask */}
      <div className="relative z-10 rounded-3xl ring-1 ring-gray-200 bg-slate-50 shadow-sm overflow-hidden">
        {/* 4 columns: labels + 3 plans (same as dark) */}
        <div className="grid md:grid-cols-4">
          {/* ===== Labels / Toggle ===== */}
          <div className="p-6 md:p-8 bg-slate-50">
            <div className="pb-6 border-b border-gray-200">
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <span>Monthly</span>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={annual}
                    onChange={() => setAnnual(!annual)}
                    aria-label="Pay yearly"
                  />
                  <span className="h-6 w-11 rounded-full bg-gray-300 transition-colors peer-checked:bg-purple-600 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-[1.25rem]" />
                </label>
                <span className="text-slate-700">
                  Yearly <span className="text-teal-600">(-20%)</span>
                </span>
              </div>
            </div>

            <div className="pt-6 text-sm text-slate-800">
              <div className="font-semibold mb-3">Usage</div>
              <ul className="space-y-3 border-b border-gray-200 pb-6">
                <li>Social Connections</li>
                <li>Custom Domains</li>
                <li>User Role Management</li>
                <li>External Databases</li>
              </ul>

              <div className="font-semibold mt-6 mb-3">Features</div>
              <ul className="space-y-3 border-b border-gray-200 pb-6">
                <li>Custom Connection</li>
                <li>Advanced Deployment Options</li>
                <li>Extra Add-ons</li>
                <li>Admin Roles</li>
                <li>Deploy and Monitor</li>
                <li>Enterprise Add-ons</li>
              </ul>

              <div className="font-semibold mt-6 mb-3">Support</div>
              <ul className="space-y-3">
                <li>Premium Support</li>
              </ul>
            </div>
          </div>

          {/* ===== Pro ===== */}
          <div className="p-6 md:p-8 bg-white">
            <div className="pb-6 mb-6 border-b border-gray-200">
              <div className="text-slate-900 font-medium mb-1">Pro</div>
              <div className="flex items-end gap-1">
                <span className="text-slate-500">$</span>
                <span className="text-3xl font-bold text-slate-900">{annual ? '24' : '29'}</span>
                <span className="text-slate-500 text-sm">/mo</span>
              </div>
              <div className="text-slate-600 mt-1">Everything at your fingertips.</div>
            </div>
            <div className="pb-6 mb-6 border-b border-gray-200">
              <a
                href="#0"
                className="btn-sm w-full inline-flex items-center justify-center rounded-lg bg-white text-slate-900 ring-1 ring-gray-300 hover:bg-slate-100 transition"
              >
                Get Started →
              </a>
            </div>
            <ul className="text-sm text-slate-800">
              <li className="flex items-center gap-2 py-2 border-b border-gray-200"><CheckIcon className="text-purple-600" />100</li>
              <li className="flex items-center gap-2 py-2 border-b border-gray-200"><CheckIcon className="text-purple-600" />4</li>
              <li className="flex items-center gap-2 py-2 border-b border-gray-200"><CheckIcon className="text-purple-600" />Unlimited</li>
              <li className="flex items-center gap-2 py-2"><CheckIcon className="text-purple-600" />1</li>
            </ul>
          </div>

          {/* ===== Team (highlight) ===== */}
          <div className="relative p-6 md:p-8 bg-white md:m-3 rounded-2xl ring-2 ring-purple-500 shadow-sm">
            <div className="pb-6 mb-6 border-b border-gray-200">
              <div className="text-slate-900 font-medium mb-1">Team</div>
              <div className="flex items-end gap-1">
                <span className="text-slate-500">$</span>
                <span className="text-3xl font-bold text-slate-900">{annual ? '49' : '54'}</span>
                <span className="text-slate-500 text-sm">/mo</span>
              </div>
              <div className="text-slate-600 mt-1">Everything at your fingertips.</div>
            </div>
            <div className="pb-6 mb-6 border-b border-gray-200">
              <a
                href="#0"
                className="btn-sm w-full inline-flex items-center justify-center rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
              >
                Get Started →
              </a>
            </div>
            <ul className="text-sm text-slate-800">
              <li className="flex items-center gap-2 py-2 border-b border-gray-200"><CheckIcon className="text-purple-600" />250</li>
              <li className="flex items-center gap-2 py-2 border-b border-gray-200"><CheckIcon className="text-purple-600" />Unlimited</li>
              <li className="flex items-center gap-2 py-2 border-b border-gray-200"><CheckIcon className="text-purple-600" />Unlimited</li>
              <li className="flex items-center gap-2 py-2"><CheckIcon className="text-purple-600" />5</li>
            </ul>
          </div>

          {/* ===== Enterprise ===== */}
          <div className="p-6 md:p-8 bg-white">
            <div className="pb-6 mb-6 border-b border-gray-200">
              <div className="text-slate-900 font-medium mb-1">Enterprise</div>
              <div className="flex items-end gap-1">
                <span className="text-slate-500">$</span>
                <span className="text-3xl font-bold text-slate-900">{annual ? '79' : '85'}</span>
                <span className="text-slate-500 text-sm">/mo</span>
              </div>
              <div className="text-slate-600 mt-1">Everything at your fingertips.</div>
            </div>
            <div className="pb-6 mb-6 border-b border-gray-200">
              <a
                href="#0"
                className="btn-sm w-full inline-flex items-center justify-center rounded-lg bg-white text-slate-900 ring-1 ring-gray-300 hover:bg-slate-100 transition"
              >
                Get Started →
              </a>
            </div>
            <ul className="text-sm text-slate-800">
              <li className="flex items-center gap-2 py-2 border-b border-gray-200"><CheckIcon className="text-purple-600" />Unlimited</li>
              <li className="flex items-center gap-2 py-2 border-b border-gray-200"><CheckIcon className="text-purple-600" />Unlimited</li>
              <li className="flex items-center gap-2 py-2 border-b border-gray-200"><CheckIcon className="text-purple-600" />Unlimited</li>
              <li className="flex items-center gap-2 py-2"><CheckIcon className="text-purple-600" />Unlimited</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
