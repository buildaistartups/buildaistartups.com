'use client'

import { useState } from 'react'
import styles from './pricing-light.module.css'

type PlanKey = 'Pro' | 'Team' | 'Enterprise'

type Plan = {
  name: PlanKey
  price: { monthly: number; yearly: number }
  ctaStyle: 'primary' | 'neutral'
  // Usage values (these are the numbers/strings that appear in the first 4 rows)
  usage: [string, string, string, string]
  featured?: boolean
}

/** Left column groups & rows (no checkmarks here). */
const LABEL_GROUPS = [
  { title: 'Usage',    rows: ['Social Connections', 'Custom Domains', 'User Role Management', 'External Databases'] },
  { title: 'Features', rows: ['Custom Connection', 'Advanced Deployment Options', 'Extra Add-ons', 'Admin Roles', 'Deploy and Monitor', 'Enterprise Add-ons'] },
  { title: 'Support',  rows: ['Premium Support'] },
]

/** Plans: price + usage values */
const PLANS: Plan[] = [
  { name: 'Pro',  price: { monthly: 29, yearly: 24 }, ctaStyle: 'neutral',  usage: ['100', '4', 'Unlimited', '1'] },
  { name: 'Team', price: { monthly: 54, yearly: 49 }, ctaStyle: 'primary',  usage: ['250', 'Unlimited', 'Unlimited', '5'], featured: true },
  { name: 'Enterprise', price: { monthly: 85, yearly: 79 }, ctaStyle: 'neutral', usage: ['Unlimited', 'Unlimited', 'Unlimited', 'Unlimited'] },
]

/** Feature matrix (second group): which rows get a check per plan.
 *  Order corresponds to LABEL_GROUPS[1].rows
 */
const FEATURES: Record<PlanKey, boolean[]> = {
  Pro:         [true,  true,  true,  false, false, false],
  Team:        [true,  true,  true,  true,  true,  false],
  Enterprise:  [true,  true,  true,  true,  true,  true ],
}

/** Support matrix (third group): which plans have Premium Support. */
const SUPPORT: Record<PlanKey, boolean> = {
  Pro: false,
  Team: true,
  Enterprise: true,
}

export default function PricingLight() {
  const [annual, setAnnual] = useState(true)

  return (
    <div className={`${styles.vars} ${styles.forceText}`}>
      <div className={styles.wrap}>
        {/* Left labels column (no checkmarks, no duplicate borders) */}
        <aside className={styles.labelsCol}>
          {/* Toggle */}
          <div className={styles.toggleLine} style={{ marginBottom: 14 }}>
            <span>Monthly</span>
            <span
              role="switch"
              aria-checked={annual}
              onClick={() => setAnnual((s) => !s)}
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

          {LABEL_GROUPS.map((g, gi) => (
            <div key={gi} style={{ marginTop: gi === 0 ? 6 : 18 }}>
              <div className={styles.labelTitle}>{g.title}</div>
              {g.rows.map((r, i) => (
                <div key={i} className={styles.labelRow}>
                  {r}
                </div>
              ))}
            </div>
          ))}
        </aside>

        {/* Three plan cards */}
        {PLANS.map((p) => (
          <PlanCard key={p.name} plan={p} annual={annual} />
        ))}
      </div>
    </div>
  )
}

function PlanCard({ plan, annual }: { plan: Plan; annual: boolean }) {
  const price = annual ? plan.price.yearly : plan.price.monthly
  const btnClass =
    plan.ctaStyle === 'primary'
      ? `${styles.btn} ${styles.btnPrimary}`
      : `${styles.btn} ${styles.btnNeutral}`

  const featureBools = FEATURES[plan.name]
  const supportBool  = SUPPORT[plan.name]

  return (
    <section className={`${styles.card} ${plan.featured ? styles.featured : ''}`}>
      <div className={styles.h3}>{plan.name}</div>

      <div className={styles.priceRow}>
        <span className={styles.curr}>$</span>
        <span className={styles.value}>{price}</span>
        <span className={styles.per}>/mo</span>
      </div>

      <p className={styles.blurb}>Everything at your fingertips.</p>
      <button className={btnClass} type="button">Get Started →</button>

      {/* Usage rows */}
      <hr className={styles.hr} />
      {plan.usage.map((val, idx) => (
        <CardRow key={`u-${idx}`} checked={true} content={val} />
      ))}

      {/* Features rows (checks based on matrix) */}
      {featureBools.map((ok, idx) => (
        <CardRow key={`f-${idx}`} checked={ok} content="" />
      ))}

      {/* Support row */}
      <CardRow checked={supportBool} content="" />
    </section>
  )
}

function CardRow({ checked, content }: { checked: boolean; content: string }) {
  return (
    <div className={styles.row}>
      <svg className={`${styles.check} ${checked ? '' : styles.invisible}`} viewBox="0 0 12 9" aria-hidden="true">
        <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
      </svg>
      <span>{content}</span>
    </div>
  )
}
