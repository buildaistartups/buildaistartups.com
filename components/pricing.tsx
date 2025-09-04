'use client'

import { useState } from 'react'

// ---- Pricing model (edit here, not in markup) ----
type Plan = {
  id: 'indie' | 'startup' | 'scale'
  name: string
  blurb: string
  monthly: number
  yearly: number // discounted price per month when billed yearly
  ctaHref: string
  ctaLabel?: string
  highlight?: boolean
}

const plans: Plan[] = [
  {
    id: 'indie',
    name: 'Indie',
    blurb: 'Launch solo with ownership intact.',
    monthly: 29,
    yearly: 24,
    ctaHref: '/signup?plan=indie',
  },
  {
    id: 'startup',
    name: 'Startup',
    blurb: 'Everything to ship and grow a product team.',
    monthly: 79,
    yearly: 63,
    ctaHref: '/signup?plan=startup',
    highlight: true, // visually emphasize
  },
  {
    id: 'scale',
    name: 'Scale',
    blurb: 'Advanced controls, SLA and priority distribution.',
    monthly: 149,
    yearly: 119,
    ctaHref: '/contact?topic=sales',
    ctaLabel: 'Talk to us',
  },
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
      {
        label: 'Builder (Spec → Repo → UI → Docs → Deploy)',
        values: { indie: true, startup: true, scale: true },
      },
      {
        label: 'Gold templates',
        values: { indie: '3 packs', startup: 'All packs', scale: 'All + Custom' },
      },
      {
        label: 'Ecosystem cross-promotion',
        values: { indie: 'Limited', startup: 'Standard', scale: 'Priority' },
        note: 'Cross-promo across startups.',
      },
      {
        label: 'Marketplace listing',
        values: { indie: 'Included (10% fee)', startup: 'Included (7%)', scale: 'Included (5%)' },
      },
      {
        label: 'Compliance pack',
        values: { indie: 'Basic', startup: 'Standard', scale: 'Advanced' },
      },
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

// ---- helpers ----
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
          <path fill="url(#bs5-a)" fillRule="evenodd" d="m661 736 461 369-284 58z" transform="matrix(1 0 0 -1 -661 1163)" />
        </svg>
      </div>

      {/* Header row with toggle + plan cards */}
      <div className="grid md:grid-cols-4 xl:-mx-6 text-sm">
        {/* Toggle */}
        <div className="px-6 flex flex-col justify-end">
          <div className="pb-5 md:border-b border-slate-800">
            <div className="max-md:text-center">
              <div className="inline-flex items-center whitespace-nowrap">
                <div className="text-sm text-slate-500 font-medium mr-2 md:max-lg:hidden">Monthly</div>
                <div className="relative">
                  <input id="toggle" type="checkbox" className="peer sr-only" checked={annual} onChange={() => setAnnual((s) => !s)} />
                  <label
                    htmlFor="toggle"
                    className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-slate-400 px-0.5 outline-slate-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow-xs before:transition-transform before:duration-150 peer-checked:bg-purple-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-focus-visible:peer-checked:outline-purple-500"
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
          <div key={plan.id} className="px-6 flex flex-col justify-end">
            <div className="plan-card grow pb-4 mb-4 border-b border-slate-800 relative" data-highlight={plan.highlight ? 'true' : 'false'}>
              {plan.highlight && (
                <span className="absolute -top-2 right-0 rounded-full bg-purple-600/20 px-2 py-1 text-[10px] font-semibold text-purple-300 ring-1 ring-purple-500/40">
                  Popular
                </span>
              )}
              <div className="text-base font-medium bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-purple-200 pb-0.5">
                {plan.name}
              </div>
              <div className="mb-1">{priceFor(plan, annual)}</div>
              <div className="text-slate-500">{plan.blurb}</div>
            </div>
            <div className="pb-4 border-b border-slate-800">
              <a
                className={`btn-sm w-full transition duration-150 ease-in-out group ${
                  plan.highlight
                    ? 'text-white bg-purple-500 hover:bg-purple-600'
                    : 'text-slate-900 bg-linear-to-r from-white/80 via-white to-white/80 hover:bg-white'
                }`}
                href={plan.ctaHref}
              >
                <span className="inline-flex items-center">
                  {plan.ctaLabel ?? 'Get started'}
                  <span
                    className={`${
                      plan.highlight ? 'text-purple-300' : 'text-purple-500'
                    } ml-1 transition-transform duration-150 ease-in-out group-hover:translate-x-0.5`}
                  >
                    -&gt;
                  </span>
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Feature matrix */}
      <div className="relative mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-700/10">
        {/* Column selection overlay (entire matrix) */}
        <div id="selected-grid-col" aria-hidden="true" />

        {sections.map((section, si) => (
          <div key={section.title} className={si > 0 ? 'border-t border-slate-800' : ''}>
            <div className="px-6 py-3 text-slate-50 font-medium">{section.title}</div>
            <div className="divide-y divide-slate-800">
              {section.rows.map((row) => (
                <div key={row.label} className="grid grid-cols-4">
                  <div className="px-6 py-3 text-slate-300">{row.label}</div>
                  {plans.map((p) => (
                    <div
                      key={p.id}
                      className={`py-3 text-slate-200 flex items-center ${
                        p.highlight ? 'matrix-cell--selected px-8' : 'px-6'
                      }`}
                    >
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

      {/* Footer notes */}
      <p className="mt-3 text-xs text-slate-500">
        All plans include user-owned repos/infra and license guardrails. Yearly billing applies 20% discount. Marketplace takes a
        per-plan fee as shown.
      </p>

      {/* Highlight styling + spacing adjustments */}
      <style jsx global>{`
        /* Tweak these to fine-tune the highlight box position */
        :root {
          --sel-top: -26px;     /* place top line a bit above the "Startup" label */
          --sel-bottom: -56px;  /* push bottom line lower so it clears “Email (48h)” */
          --sel-lr: -18px;      /* extra side room so borders don’t hug the text */
        }

        /* Header highlight (only around the highlighted plan card) */
        .plan-card[data-highlight='true'] {
          position: relative;
        }
        .plan-card[data-highlight='true']::after {
          content: '';
          position: absolute;
          inset: var(--sel-top) var(--sel-lr) -14px var(--sel-lr); /* extend a bit below the header card */
          border: 1px solid rgba(168, 85, 247, 0.55);
          border-radius: 28px;
          pointer-events: none;
        }

        /* Entire matrix column highlight (md+) */
        #selected-grid-col {
          display: none;
        }
        @media (min-width: 768px) {
          #selected-grid-col {
            display: block;
            position: absolute;
            inset: 0; /* anchor to matrix wrapper */
            pointer-events: none;
            z-index: 10;
          }
          #selected-grid-col::after {
            content: '';
            position: absolute;
            /* The matrix uses grid-cols-4: [labels | indie | startup | scale]
               So the selected (startup) column starts at 25% and ends at 75%. */
            left: 25%;
            right: 50%;
            top: var(--sel-top);
            bottom: var(--sel-bottom);
            border: 1px solid rgba(168, 85, 247, 0.55);
            border-radius: 28px;
          }
        }

        /* Give selected column cells breathing room + center on md+ */
        .matrix-cell--selected {
          padding-left: 2rem !important;  /* px-8 */
          padding-right: 2rem !important; /* px-8 */
          text-align: inherit;
        }
        @media (min-width: 768px) {
          .matrix-cell--selected {
            text-align: center;
          }
        }
      `}</style>
    </div>
  )
}
