'use client'

import { useState } from 'react'

// Local check icon (no extra deps)
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
    <div className="relative isolate">
      {/* Table wrapper — gives the whole table a subtle light/gray background,
          and prevents the section radial gradient from washing it out */}
      <div className="rounded-3xl ring-1 ring-gray-200 bg-slate-50/95 shadow-sm overflow-hidden">
        {/* 4-column grid: labels + 3 plans (same layout as dark) */}
        <div className="grid md:grid-cols-4">
          {/* ===== Column A: Labels / Toggle (unchanged structure, light colors) ===== */}
          <div className="p-6 md:p-8 bg-slate-50">
            {/* Toggle */}
            <div className="pb-6 border-b border-gray-200">
              <div className="flex items-center gap-3 text-sm text-slate-600">
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
                <span className="text-slate-600">
                  Yearly <span className="text-teal-600">(-20%)</span>
                </span>
              </div>
            </div>

            {/* Labels list */}
            <div className="pt-6 text-sm text-slate-700">
              <div className="font-semibold text-slate-800 mb-3">Usage</div>
              <ul className="space-y-3 border-b border-gray-200 pb-6">
                <li>Social Connections</li>
                <li>Custom Domains</li>
                <li>User Role Management</li>
                <li>External Databases</li>
              </ul>

              <div className="font-semibold text-slate-800 mt-6 mb-3">Features</div>
              <ul className="space-y-3 border-b border-gray-200 pb-6">
                <li>Custom Connection</li>
                <li>Advanced Deployment Options</li>
                <li>Extra Add-ons</li>
                <li>Admin Roles</li>
                <li>Deploy and Monitor</li>
                <li>Enterprise Add-ons</li>
              </ul>

              <div className="font-semibold text-slate-800 mt-6 mb-3">Support</div>
              <ul className="space-y-3">
                <li>Premium Support</li>
              </ul>
            </div>
          </div>

          {/* ===== Column B: Pro plan ===== */}
          <div className="p-6 md:p-8 bg-white/95 ring-0 md:ring-l-1 md:ring-gray-200">
            {/* Header */}
            <div className="pb-6 mb-6 border-b border-gray-200">
              <div className="text-slate-900 font-medium mb-1">Pro</div>
              <div className="flex items-end gap-1">
                <span className="text-slate-500">$</span>
                <span className="text-3xl font-bold text-slate-900">
                  {annual ? '24' : '29'}
                </span>
                <span className="text-slate-500 text-sm">/mo</span>
              </div>
              <div className="text-slate-600 mt-1">Everything at your fingertips.</div>
            </div>
            {/* CTA */}
            <div className="pb-6 mb-6 border-b border-gray-200">
              <a
                href="#0"
                className="btn-sm w-full inline-flex items-center justify-center rounded-lg bg-white text-slate-900 ring-1 ring-gray-300 hover:bg-slate-100 transition"
              >
                Get Started →
              </a>
            </div>
            {/* Feature values */}
            <ul className="text-sm text-slate-700">
              <li className="flex items-center gap-2 py-2 border-b border-gray-200">
                <CheckIcon className="text-purple-600" /> 100
              </li>
              <li className="flex items-center gap-2 py-2 border-b border-gray-200">
                <CheckIcon className="text-purple-600" /> 4
              </li>
              <li className="flex items-center gap-2 py-2 border-b border-gray-200">
                <CheckIcon className="text-purple-600" /> Unlimited
              </li>
              <li className="flex items-center gap-2 py-2">
                <CheckIcon className="text-purple-600" /> 1
              </li>
            </ul>
          </div>

          {/* ===== Column C: Team plan (purple highlight) ===== */}
          <div className="relative p-6 md:p-8 bg-white/95 ring-2 ring-purple-500 rounded-none md:rounded-2xl md:shadow-sm md:m-3">
            {/* Header */}
            <div className="pb-6 mb-6 border-b border-gray-200">
              <div className="text-slate-900 font-medium mb-1">Team</div>
              <div className="flex items-end gap-1">
                <span className="text-slate-500">$</span>
                <span className="text-3xl font-bold text-slate-900">
                  {annual ? '49' : '54'}
                </span>
                <span className="text-slate-500 text-sm">/mo</span>
              </div>
              <div className="text-slate-600 mt-1">Everything at your fingertips.</div>
            </div>
            {/* CTA */}
            <div className="pb-6 mb-6 border-b border-gray-200">
              <a
                href="#0"
                className="btn-sm w-full inline-flex items-center justify-center rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
              >
                Get Started →
              </a>
            </div>
            {/* Feature values */}
            <ul className="text-sm text-slate-700">
              <li className="flex items-center gap-2 py-2 border-b border-gray-200">
                <CheckIcon className="text-purple-600" /> 250
              </li>
              <li className="flex items-center gap-2 py-2 border-b border-gray-200">
                <CheckIcon className="text-purple-600" /> Unlimited
              </li>
              <li className="flex items-center gap-2 py-2 border-b border-gray-200">
                <CheckIcon className="text-purple-600" /> Unlimited
              </li>
              <li className="flex items-center gap-2 py-2">
                <CheckIcon className="text-purple-600" /> 5
              </li>
            </ul>
          </div>

          {/* ===== Column D: Enterprise plan ===== */}
          <div className="p-6 md:p-8 bg-white/95">
            {/* Header */}
            <div className="pb-6 mb-6 border-b border-gray-200">
              <div className="text-slate-900 font-medium mb-1">Enterprise</div>
              <div className="flex items-end gap-1">
                <span className="text-slate-500">$</span>
                <span className="text-3xl font-bold text-slate-900">
                  {annual ? '79' : '85'}
                </span>
                <span className="text-slate-500 text-sm">/mo</span>
              </div>
              <div className="text-slate-600 mt-1">Everything at your fingertips.</div>
            </div>
            {/* CTA */}
            <div className="pb-6 mb-6 border-b border-gray-200">
              <a
                href="#0"
                className="btn-sm w-full inline-flex items-center justify-center rounded-lg bg-white text-slate-900 ring-1 ring-gray-300 hover:bg-slate-100 transition"
              >
                Get Started →
              </a>
            </div>
            {/* Feature values */}
            <ul className="text-sm text-slate-700">
              <li className="flex items-center gap-2 py-2 border-b border-gray-200">
                <CheckIcon className="text-purple-600" /> Unlimited
              </li>
              <li className="flex items-center gap-2 py-2 border-b border-gray-200">
                <CheckIcon className="text-purple-600" /> Unlimited
              </li>
              <li className="flex items-center gap-2 py-2 border-b border-gray-200">
                <CheckIcon className="text-purple-600" /> Unlimited
              </li>
              <li className="flex items-center gap-2 py-2">
                <CheckIcon className="text-purple-600" /> Unlimited
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
