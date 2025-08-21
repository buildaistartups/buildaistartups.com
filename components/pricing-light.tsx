'use client'

import { useState } from 'react'
import styles from './pricing-light.module.css'

type Plan = {
  name: string
  price: { monthly: number; yearly: number }
  ctaStyle: 'primary' | 'neutral'
  // Usage rows (counts): [Social Connections, Custom Domains, User Role Management, External Databases]
  features: string[]
  featured?: boolean
}

const PLANS: Plan[] = [
  { name: 'Pro',         price: { monthly: 29, yearly: 24 }, ctaStyle: 'neutral', features: ['100','4','Unlimited','1'] },
  { name: 'Team',        price: { monthly: 54, yearly: 49 }, ctaStyle: 'primary', features: ['250','Unlimited','Unlimited','5'], featured: true },
  { name: 'Enterprise',  price: { monthly: 85, yearly: 79 }, ctaStyle: 'neutral', features: ['Unlimited','Unlimited','Unlimited','Unlimited'] },
]

const LABEL_GROUPS = [
  { title: 'Usage',    rows: ['Social Connections','Custom Domains','User Role Management','External Databases'] },
  { title: 'Features', rows: ['Custom Connection','Advanced Deployment Options','Extra Add-ons','Admin Roles'] },
  { title: 'Support',  rows: ['Premium Support'] },
]

export default function PricingLight() {
  const [annual, setAnnual] = useState(true)

  return (
    <div className={`${styles.vars} ${styles.forceText}`}>
      <div className={styles.wrap}>
        {/* Left labels column */}
        <aside className={styles.labelsCol}>
          <div className={styles.toggleLine} style={{ marginBottom: 14 }}>
            <span>Monthly</span>

            {/* Toggle */}
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
              aria-label="Toggle annual billing"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setAnnual((s) => !s)}
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
            <div key={gi} style={{ marginTop: gi === 0 ? 8 : 18 }}>
              <div className={styles.h3}>{g.title}</div>
              <hr className={styles.hr} />
              {g.rows.map((r, i) => (
                <div key={i} className={styles.row}>
                  <svg className={styles.check} viewBox="0 0 12 9" aria-hidden="true">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>{r}</span>
                </div>
              ))}
            </div>
          ))}
        </aside>

        {/* Plan cards */}
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

  // Row counts pulled from LABEL_GROUPS to keep layout in sync
  const usageCount   = LABEL_GROUPS[0].rows.length // 4
  const featuresCount = LABEL_GROUPS[1].rows.length // 4
  const supportCount  = LABEL_GROUPS[2].rows.length // 1

  return (
    <section className={`${styles.card} ${plan.featured ? styles.featured : ''}`}>
      {/* Plan name (forced purple in CSS) */}
      <div className={styles.h3}>{plan.name}</div>

      {/* Price line */}
      <div className={styles.priceRow}>
        <span className={styles.curr}>$</span>
        <span className={styles.value}>{price}</span>
        <span className={styles.per}>/mo</span>
      </div>

      <p className={styles.blurb}>Everything at your fingertips.</p>

      <button className={btnClass} type="button">
        Get Started →
      </button>

      {/* Group: Usage (numbers) */}
      <hr className={styles.hr} />
      {Array.from({ length: usageCount }).map((_, i) =>
        renderRowValue(plan.features[i] ?? '')
      )}

      {/* Group: Features (checks only) */}
      <hr className={styles.hr} />
      {Array.from({ length: featuresCount }).map((_, i) => renderRowCheck(i))}

      {/* Group: Support (checks only) */}
      <hr className={styles.hr} />
      {Array.from({ length: supportCount }).map((_, i) => renderRowCheck(i))}
    </section>
  )
}

function renderRowValue(content: string) {
  return (
    <div className={styles.row}>
      <svg className={styles.check} viewBox="0 0 12 9" aria-hidden="true">
        <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
      </svg>
      <span>{content}</span>
    </div>
  )
}

function renderRowCheck(key?: number) {
  return (
    <div className={styles.row} key={key}>
      <svg className={styles.check} viewBox="0 0 12 9" aria-hidden="true">
        <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
      </svg>
      {/* empty span keeps consistent height/alignment */}
      <span style={{ visibility: 'hidden' }}>.</span>
    </div>
  )
}
