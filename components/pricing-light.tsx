// components/pricing-light.tsx
'use client'

import { useState } from 'react'

export default function Pricing() {
  const [annual, setAnnual] = useState(true)

  return (
    <div className="relative">
      {/* grid: 1 labels column + 3 plan cards */}
      <div
        className="
          grid md:grid-cols-4 xl:-mx-6 text-sm
          [&>div:nth-of-type(-n+4)]:py-6
          [&>div:nth-last-of-type(-n+4)]:pb-6
          md:[&>div:nth-of-type(2)]:rounded-tl-3xl
          md:[&>div:nth-of-type(4)]:rounded-tr-3xl
          md:[&>div:nth-last-of-type(3)]:rounded-bl-3xl
          md:[&>div:nth-last-of-type(1)]:rounded-br-3xl

          /* light theme overrides */
          [&>div]:bg-slate-100
          [&>div:nth-of-type(4n+1)]:bg-slate-50
          [&_*]:text-slate-900
        "
      >
        {/* ===== left labels / toggle ===== */}
        <div className="px-6">
          <div className="pb-5 md:border-b border-slate-900/80">
            <div className="inline-flex items-center whitespace-nowrap">
              <div className="text-sm font-medium mr-2 md:max-lg:hidden">Monthly</div>
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
                  className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-slate-400 px-0.5
                             before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow-xs
                             before:transition-transform before:duration-150
                             peer-checked:bg-purple-600 peer-checked:before:translate-x-full"
                >
                  <span className="sr-only">Pay yearly</span>
                </label>
              </div>
              <div className="text-sm font-medium ml-2">
                Yearly <span className="text-teal-600">(-20%)</span>
              </div>
            </div>
          </div>

          {/* labels */}
          <div className="py-6">
            <div className="py-2 font-semibold mt-4">Usage</div>
            {['Social Connections','Custom Domains','User Role Management','External Databases'].map((t)=>(
              <div key={t} className="py-2 border-b border-slate-900/80">{t}</div>
            ))}

            <div className="py-2 font-semibold mt-6">Features</div>
            {[
              'Custom Connection','Advanced Deployment Options','Extra Add-ons','Admin Roles',
              'Deploy and Monitor','Enterprise Add-ons'
            ].map((t)=>(
              <div key={t} className="py-2 border-b border-slate-900/80">{t}</div>
            ))}

            <div className="py-2 font-semibold mt-6">Support</div>
            <div className="py-2 border-b border-slate-900/80">Premium Support</div>
          </div>
        </div>

        {/* helper: plan card component */}
        {[
          { name:'Pro', price: annual ? '24':'29', cta:'gray' as const, ring:false,
            features:['100','4','Unlimited','1'] },
          { name:'Team', price: annual ? '49':'54', cta:'purple' as const, ring:true,
            features:['250','Unlimited','Unlimited','5'] },
          { name:'Enterprise', price: annual ? '79':'85', cta:'gray' as const, ring:false,
            features:['Unlimited','Unlimited','Unlimited','Unlimited'] },
        ].map((plan, idx) => (
          <div key={plan.name}
               className={`px-6 rounded-3xl flex flex-col justify-start ${plan.ring ? 'ring-2 ring-purple-600' : ''}`}>
            {/* header */}
            <div className="pb-4 mb-4 border-b border-slate-900/80">
              <div className="text-base font-semibold pb-0.5">{plan.name}</div>
              <div className="mb-1">
                <span className="text-lg font-medium">$</span>
                <span className="text-3xl font-extrabold">{plan.price}</span>
                <span className="text-sm font-medium">/mo</span>
              </div>
              <div>Everything at your fingertips.</div>
            </div>

            {/* CTA */}
            <div className="pb-4 border-b border-slate-900/80">
              {plan.cta === 'purple' ? (
                <a className="btn-sm w-full text-white bg-purple-600 hover:bg-purple-700 transition">
                  Get Started <span className="ml-1">-&gt;</span>
                </a>
              ) : (
                <a className="btn-sm w-full bg-slate-300 hover:bg-slate-400 text-slate-900 transition">
                  Get Started <span className="ml-1">-&gt;</span>
                </a>
              )}
            </div>

            {/* rows */}
            {plan.features.map((f, i) => (
              <div key={i} className="flex items-center border-b border-slate-900/80 py-2">
                <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                  <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>{f}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
