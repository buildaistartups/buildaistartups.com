'use client'

import { useState } from 'react'
import styles from './pricing-light.module.css'

type Plan = {
  name: 'Pro' | 'Team' | 'Enterprise'
  price: { monthly: number; yearly: number }
  ctaStyle: 'primary' | 'neutral'
  features: string[]
  featured?: boolean
}

const PLANS: Plan[] = [
  { name: 'Pro',        price: { monthly: 29, yearly: 24 }, ctaStyle: 'neutral', features: ['100','4','Unlimited','1'] },
  { name: 'Team',       price: { monthly: 54, yearly: 49 }, ctaStyle: 'primary', features: ['250','Unlimited','Unlimited','5'], featured: true },
  { name: 'Enterprise', price: { monthly: 85, yearly: 79 }, ctaStyle: 'neutral', features: ['Unlimited','Unlimited','Unlimited','Unlimited'] },
]

const LABEL_GROUPS = [
  { title: 'Usage',    rows: ['Social Connections','Custom Domains','User Role Management','External Databases'] },
  { title: 'Features', rows: ['Custom Connection','Advanced Deployment Options','Extra Add-ons','Admin Roles','Deploy and Monitor','Enterprise Add-ons'] },
  { title: 'Support',  rows: ['Premium Support'] },
]

// Which “Features” rows get a check per plan (to match the dark layout)
const FEATURE_CHECKS: Record<Plan['name'], Set<string>> = {
  Pro: new Set(['Custom Connection', 'Advanced Deployment Options', 'Extra Add-ons']),
  Team: new Set([
    'Custom Connection',
    'Advanced Deployment Options',
    'Extra Add-ons',
    'Admin Roles',
    'Deploy and Monitor',
    'Enterprise Add-ons',
    'Premium Support',
  ]),
  Enterprise: new Set([
    'Custom Connection',
    'Advanced Deployment Options',
    'Extra Add-ons',
    'Admin Roles',
    'Deploy and Monitor',
    'Enterprise Add-ons',
    'Premium Support',
  ]),
}

export default function PricingLight() {
  const [annual, setAnnual] = useState(true)

  return (
    <div className={`${styles.vars} ${styles.forceText}`}>
      <div className={styles.wrap}>
        {/* Left labels column */}
        <aside className={styles.labelsCol}>
          <div className={styles.toggleLine} style={{ marginBottom: 14 }}>
            <span>Monthly</span>
            <span
              role="switch"
              aria-checked={annual}
              onClick={() => setAnnual(s => !s)}
              style={{
                width: 42, height: 22, borderRadius: 9999,
                background: annual ? 'var(--purple)' : 'var(--btn-neutral)',
                position: 'relative', display: 'inline-block', cursor: 'pointer',
                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.08)',
              }}
            >
              <span
                style={{
                  position: 'absolute', top: 2, left: annual ? 22 : 2,
                  width: 18, height: 18, borderRadius: '9999px',
                  background: '#fff', transition: 'left .15s ease',
                }}
              />
            </span>
            <span>Yearly</span>
            <span className={styles.discount}>(-20%)</span>
          </div>

          {/* Spacer to align “Social Connections” with the first plan row */}
          <div className={styles.headShim} />

          {LABEL_GROUPS.map((g, gi) => (
            <div key={gi} style={{ marginTop: gi === 0 ? 0 : 18 }}>
              <div className={styles.h3}>{g.title}</div>
              <hr className={styles.hr} />
              {g.rows.map((r, i) => (
                <div key={i} className={styles.row}>
                  {/* Purple check shown only to mirror the visual bullets in the left column */}
                  <svg className={styles.check} viewBox="0 0 12 9" aria-hidden="true">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>{r}</span>
                </div>
              ))}
            </div>
          ))}
        </aside>

        {/* Plan columns */}
        {PLANS.map((p) => (
          <section key={p.name} className={`${styles.card} ${p.featured ? styles.featured : ''}`}>
            {/* header with fixed min-height to line up with labels shim */}
            <div className={styles.head}>
              <div className={styles.h3}>{p.name}</div>

              <div className={styles.priceRow}>
                <span className={styles.curr}>$</span>
                <span className={styles.value}>{annual ? p.price.yearly : p.price.monthly}</span>
                <span className={styles.per}>/mo</span>
              </div>

              <p className={styles.blurb}>Everything at your fingertips.</p>
              <button
                className={`${styles.btn} ${p.ctaStyle === 'primary' ? styles.btnPrimary : styles.btnNeutral}`}
                type="button"
              >
                Get Started →
              </button>
            </div>

            <hr className={styles.hr} />

            {/* Usage rows (always values) */}
            {['0','1','2','3'].map((idx) => renderValueRow(p.features[Number(idx)]))}

            {/* Features rows with checks following the dark-theme pattern */}
            {LABEL_GROUPS[1].rows.map((label) => renderCheckRow(FEATURE_CHECKS[p.name].has(label)))}

            {/* Support row (Premium Support) */}
            {renderCheckRow(FEATURE_CHECKS[p.name].has('Premium Support'))}
          </section>
        ))}
      </div>
    </div>
  )
}

function renderValueRow(content: string) {
  return (
    <div className={styles.row}>
      <svg className={styles.check} viewBox="0 0 12 9" aria-hidden="true">
        <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
      </svg>
      <span>{content}</span>
    </div>
  )
}

function renderCheckRow(checked: boolean) {
  return (
    <div className={styles.row}>
      {checked ? (
        <svg className={styles.check} viewBox="0 0 12 9" aria-hidden="true">
          <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
        </svg>
      ) : (
        <span style={{ width: 12, height: 9 }} />
      )}
      <span />
    </div>
  )
}
