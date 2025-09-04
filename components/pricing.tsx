'use client'

import { useState } from 'react'

type Plan = {
  id: 'indie' | 'startup' | 'scale'
  name: string
  blurb: string
  monthly: number
  yearly: number
  ctaHref: string
  ctaLabel?: string
  highlight?: boolean
}

const plans: Plan[] = [
  { id: 'indie', name: 'Indie', blurb: 'Launch solo with ownership intact.', monthly: 29, yearly: 24, ctaHref: '/signup?plan=indie' },
  { id: 'startup', name: 'Startup', blurb: 'Everything to ship and grow a product team.', monthly: 79, yearly: 63, ctaHref: '/signup?plan=startup', highlight: true },
  { id: 'scale', name: 'Scale', blurb: 'Advanced controls, SLA and priority distribution.', monthly: 149, yearly: 119, ctaHref: '/contact?topic=sales', ctaLabel: 'Talk to us' },
]

type RowValue = boolean | string
type Section = {
  title: string
  rows: {
    label: string
    values: Record<Plan['id'], RowValue>
    note?: string
  }[]
}

const sections: Section[] = [
  {
    title: 'Usage',
    rows: [
      { label: 'Build runs / month', values: { indie: '10', startup: '50', scale: '200' } },
      { label: 'Autopilot deploys / month', values: { indie: '2', startup: '10', scale: 'Unlimited' } },
      { label: 'Seats', values: { indie: '1', startup: '5', scale: '20' } },
      { label: 'API calls / month', values: { indie: '50k', startup: '250k', scale: '1M' } },
    ],
  },
  {
    title: 'Features',
    rows: [
      { label: 'Builder (Spec → Repo → UI → Docs → Deploy)', values: { indie: true, startup: true, scale: true } },
      { label: 'Gold templates', values: { indie: '3 packs', startup: 'All packs', scale: 'All + Custom' } },
      { label: 'Ecosystem cross-promotion', values: { indie: 'Limited', startup: 'Standard', scale: 'Priority' }, note: 'Cross-promo across generated startups.' },
      { label: 'Marketplace listing', values: { indie: 'Included (10% fee)', startup: 'Included (7%)', scale: 'Included (5%)' } },
      { label: 'Compliance pack', values: { indie: 'Basic', startup: 'Standard', scale: 'Advanced' } },
    ],
  },
  {
    title: 'Security & Control',
    rows: [
      { label: 'Private repos (your GitHub)', values: { indie: true, startup: true, scale: true } },
      { label: 'Your infra (Vercel/DB/Stripe)', values: { indie: true, startup: true, scale: true } },
      { label: 'SSO (SAML / OIDC)', values: { indie: false, startup: false, scale: true } },
      { label: 'SLA', values: { indie: '—', startup: '—', scale: '99.9%' } },
    ],
  },
  {
    title: 'Support',
    rows: [{ label: 'Support', values: { indie: 'Community', startup: 'Email (48h)', scale: 'Priority (8h)' } }],
  },
]

const check = (
  <svg className="shrink-0 fill-purple-500" xmlns="http://www.w3.org/2000/svg" width="12" height="9" aria-hidden="true">
    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
  </svg>
)

function displayValue(v: RowValue) {
  if (typeof v === 'boolean') return v ? check : <span className="text-slate-500">—</span>
  return <span>{v}</span>
}

function priceFor(plan: Plan, annual: boolean) {
  const p = annual ? plan.yearly : plan.monthly
  return (
    <>
      <span className="text-lg font-medium text-slate-500">$</span>
      <span className="text-3xl font-bold text-slate-50">{p}</span>
      <span className="text-sm text-slate-600 font-medium">/mo</span>
    </>
  )
}

export default function Pricing() {
  const [annual, setAnnual] = useState<boolean>(true)

  // which plan column is highlighted (0..2). default to 0 if none.
  const featuredIdx = Math.max(0, plans.findIndex((p) => p.highlight))
  const colLeftClass = ['left-1/4', 'left-1/2', 'left-3/4'][featuredIdx] ?? 'left-1/2'

  return (
    <div className="relative">
      {/* Header row with toggle + plan cards */}
      <div className="grid md:grid-cols-4 xl:-mx-6 text-sm relative">
        {/* ONE header highlight rectangle */}
        <div
          aria-hidden
          className={`pointer-events-none absolute hidden md:block inset-y-2 ${colLeftClass} w-1/4
                      rounded-[2.25rem] ring-1 ring-purple-400/50
                      [background:radial-gradient(60%_55%_at_50%_85%,rgba(168,85,247,.18),transparent_70%)]
                      z-0`}
        />

        {/* Toggle */}
        <div className="px-6 flex flex-col justify-end relative z-10">
          <div className="pb-5 md:border-b border-slate-800">
            <div className="max-md:text-center">
              <div className="inline-flex items-center whitespace-nowrap">
                <div className="text-sm text-slate-500 font-medium mr-2 md:max-lg:hidden">Monthly</div>
                <div className="relative">
                  <input id="toggle" type="checkbox" className="peer sr-only" checked={annual} onChange={() => setAnnual((s) => !s)} />
                  <label
                    htmlFor="toggle"
                    className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-slate-400 px-0.5 outline-slate-400 transition-colors
                               before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow-xs before:transition-transform before:duration-150
                               peer-checked:bg-purple-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2
                               peer-focus-visible:outline-gray-400 peer-focus-visible:peer-checked:outline-purple-500"
                  >
                    <span className="sr-only">Pay yearly</span>
                  </label>
                </div>
                <div className="text-sm text-slate-500 font-medium ml-2">
                  Yearly <span className="text-teal-500">(-20%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Plans */}
        {plans.map((plan) => (
          <div key={plan.id} className="px-6 flex flex-col justify-end relative z-10">
            <div className="grow pb-4 mb-4 border-b border-slate-800 relative">
              {plan.highlight && (
                <span className="absolute -top-2 right-0 rounded-full bg-purple-600/20 px-2 py-1 text-[10px] font-semibold text-purple-300 ring-1 ring-purple-500/40">
                  Popular
                </span>
              )}
              <div className="text-base font-medium bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-purple-200 pb-0.5">{plan.name}</div>
              <div className="mb-1">{priceFor(plan, annual)}</div>
              <div className="text-slate-500">{plan.blurb}</div>
            </div>
            <div className="pb-4 border-b border-slate-800">
              <a
                className={`btn-sm w-full transition duration-150 ease-in-out group ${
                  plan.highlight ? 'text-white bg-purple-500 hover:bg-purple-600' : 'text-slate-900 bg-linear-to-r from-white/80 via-white to-white/80 hover:bg-white'
                }`}
                href={plan.ctaHref}
              >
                <span className="inline-flex items-center">
                  {plan.ctaLabel ?? 'Get started'}
                  <span className={`${plan.highlight ? 'text-purple-300' : 'text-purple-500'} ml-1 transition-transform duration-150 ease-in-out group-hover:translate-x-0.5`}>
                    -&gt;
                  </span>
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Feature matrix — ONE continuous column highlight */}
      <div className="mt-6 relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-700/10">
        {/* the single tall rectangle for the whole matrix */}
        <div
          aria-hidden
          className={`pointer-events-none absolute hidden md:block top-2 bottom-2 ${colLeftClass} w-1/4
                      rounded-[1.75rem] ring-1 ring-purple-400/40
                      [background:radial-gradient(70%_65%_at_50%_50%,rgba(168,85,247,.12),transparent_70%)]
                      z-0`}
        />

        <div className="relative z-10">
          {sections.map((section, si) => (
            <div key={section.title} className={si > 0 ? 'border-t border-slate-800' : ''}>
              <div className="px-6 py-3 text-slate-50 font-medium">{section.title}</div>
              <div className="divide-y divide-slate-800">
                {section.rows.map((row) => (
                  <div key={row.label} className="grid grid-cols-4">
                    <div className="px-6 py-3 text-slate-300">{row.label}</div>
                    {plans.map((p) => (
                      <div key={p.id} className="px-6 py-3 text-slate-200 flex items-center">
                        {displayValue(row.values[p.id])}
                      </div>
                    ))}
                    {row.note && <div className="col-span-4 px-6 -mt-2 pb-3 text-[11px] text-slate-500">{row.note}</div>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer notes */}
      <p className="mt-3 text-xs text-slate-500">
        All plans include user-owned repos/infra and license guardrails. Yearly billing applies 20% discount. Marketplace takes a per-plan fee as shown.
      </p>
    </div>
  )
}
