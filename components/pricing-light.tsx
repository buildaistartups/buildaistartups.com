'use client'

import { useState } from 'react'
import styles from './pricing-light.module.css'

export default function Pricing() {
  const [annual, setAnnual] = useState(true)

  return (
    <div className="relative">
      {/* 4-column grid: left labels + 3 plan cards */}
      <div className="grid md:grid-cols-4 gap-6">
        {/* ===== Left labels column ===== */}
        <div className={`${styles.leftCol} ${styles.cardShadow} p-6`}>
          {/* Toggle row */}
          <div className={`pb-5 ${styles.borderBottom}`}>
            <div className="flex items-center gap-3">
              <span className={`${styles.primaryText} text-sm`}>Monthly</span>

              {/* simple toggle */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={annual}
                  onChange={() => setAnnual((v) => !v)}
                />
                <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:bg-purple-500 transition-colors" />
                <span
                  className="absolute left-[2px] top-[2px] h-5 w-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"
                  aria-hidden
                />
              </label>

              <span className={`${styles.primaryText} text-sm`}>
                Yearly <span className="text-purple-600">(20%)</span>
              </span>
            </div>
          </div>

          {/* Sections & rows */}
          <div className="mt-6 space-y-8">
            <Section title="Usage" rows={[
              'Social Connections',
              'Custom Domains',
              'User Role Management',
              'External Databases',
            ]} />
            <Section title="Features" rows={[
              'Custom Connection',
              'Advanced Deployment',
              'Extra Add-ons',
              'Admin Roles',
              'Deploy and Monitor',
              'Enterprise Add-ons',
            ]} />
          </div>
        </div>

        {/* ===== Plans ===== */}
        <PlanCard
          name="Pro"
          price={annual ? '24' : '29'}
          outline={false}
          buttonClass={styles.ctaGrey}
          rows={['100', '4', 'Unlimited', '1']}
        />

        <PlanCard
          name="Team"
          price={annual ? '49' : '54'}
          outline={true}
          buttonClass={styles.ctaPurple}
          rows={['250', 'Unlimited', 'Unlimited', '5']}
        />

        <PlanCard
          name="Enterprise"
          price={annual ? '79' : '85'}
          outline={false}
          buttonClass={styles.ctaGrey}
          rows={['Unlimited', 'Unlimited', 'Unlimited', 'Unlimited']}
        />
      </div>
    </div>
  )
}

/* ---------- Helpers ---------- */

function Section({ title, rows }: { title: string; rows: string[] }) {
  return (
    <div>
      <div className="font-semibold text-base text-slate-900">{title}</div>
      <ul className="mt-3">
        {rows.map((t) => (
          <li key={t} className={`py-3 ${styles.borderBottom} ${styles.primaryText}`}>
            {t}
          </li>
        ))}
      </ul>
    </div>
  )
}

function PlanCard({
  name,
  price,
  outline,
  buttonClass,
  rows,
}: {
  name: string
  price: string
  outline: boolean
  buttonClass: string
  rows: string[]
}) {
  return (
    <div
      className={[
        styles.card,
        styles.cardShadow,
        outline ? styles.outlinePurple : '',
        'p-6',
      ].join(' ')}
    >
      <div className="text-lg font-semibold text-slate-900">{name}</div>

      {/* Price */}
      <div className="mt-2">
        <span className={`text-lg ${styles.secondaryText}`}>$</span>
        <span className="text-4xl font-extrabold text-slate-900">{price}</span>
        <span className={`text-sm ml-1 ${styles.secondaryText}`}>/mo</span>
      </div>

      {/* Tagline */}
      <div className={`mt-3 ${styles.secondaryText}`}>
        Everything at your fingertips.
      </div>

      {/* CTA */}
      <div className={`mt-4 pb-4 ${styles.borderBottom}`}>
        <button
          type="button"
          className={`w-full rounded-md px-4 py-3 text-center font-medium transition ${buttonClass}`}
        >
          Get Started →
        </button>
      </div>

      {/* Rows */}
      <ul className="mt-4">
        {rows.map((v, i) => (
          <li key={i} className={`flex items-center gap-3 py-3 ${styles.borderBottom}`}>
            <svg className={styles.checkIcon} width="12" height="9" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
            </svg>
            <span className="text-slate-900">{v}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
