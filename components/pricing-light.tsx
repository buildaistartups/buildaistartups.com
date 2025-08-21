'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './pricing-light.module.css'

type Plan = {
  name: 'Pro' | 'Team' | 'Enterprise'
  price: { monthly: number; yearly: number }
  ctaStyle: 'primary' | 'neutral'
  features: string[]        // Usage values (4 rows)
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

// check-marks pattern identical to your dark table
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

  // measure plan header once -> mirror in labels column
  const headRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = headRef.current
    if (!el) return
    const update = () => {
      const h = el.getBoundingClientRect().height + 16 /* .head padding-bottom */
      document.querySelectorAll<HTMLElement>('.' + styles.vars).forEach(root => {
        root.style.setProperty('--head-h', `${h}px`)
      })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className={`${styles.vars} ${styles.forceText}`}>
      <div className={styles.wrap}>
        {/* Left labels column */}
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

          {/* Spacer to push first label row to the same baseline as the first plan row */}
          <div className={styles.headShim} />

          {/* Groups (Usage / Features / Support) */}
          {LABEL_GROUPS.map((g, gi) => (
            <div key={gi} style={{ marginTop: gi === 0 ? 0 : 18 }}>
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
        {PLANS.map((p, idx) => (
          <PlanCard key={p.name} plan={p} annual={annual} headRef={idx === 0 ? headRef : undefined} />
        ))}
      </div>
    </div>
  )
}

function PlanCard({
  plan,
  annual,
  headRef,
}: {
  plan: Plan
  annual: boolean
  headRef?: React.Ref<HTMLDivElement>
}) {
  const price = annual ? plan.price.yearly : plan.price.monthly
  const btnClass =
    plan.ctaStyle === 'primary'
      ? `${styles.btn} ${styles.btnPrimary}`
      : `${styles.btn} ${styles.btnNeutral}`

  return (
    <section className={`${styles.card} ${plan.featured ? styles.featured : ''}`}>
      {/* Header (measured on the first card) */}
      <div className={styles.head} ref={headRef}>
        <div className={styles.h3}>{plan.name}</div>

        <div className={styles.priceRow}>
          <span className={styles.curr}>$</span>
          <span className={styles.value}>{price}</span>
          <span className={styles.per}>/mo</span>
        </div>

        <p className={styles.blurb}>Everything at your fingertips.</p>
        <button className={btnClass} type="button">Get Started →</button>
      </div>

      {/* === Match the labels column structure exactly === */}
      
      {/* Group: Usage - Mirror the exact structure from labels */}
      <div style={{ marginTop: 0 }}>
        <div className={styles.h3} style={{ visibility: 'hidden' }}>Usage</div>
        <hr className={styles.hr} />
        {plan.features.map((v, i) => renderValueRow(v, i))}
      </div>

      {/* Group: Features - Mirror the exact structure from labels */}
      <div style={{ marginTop: 18 }}>
        <div className={styles.h3} style={{ visibility: 'hidden' }}>Features</div>
        <hr className={styles.hr} />
        {LABEL_GROUPS[1].rows.map((label, i) =>
          renderCheckRow(FEATURE_CHECKS[plan.name].has(label), i)
        )}
      </div>

      {/* Group: Support - Mirror the exact structure from labels */}
      <div style={{ marginTop: 18 }}>
        <div className={styles.h3} style={{ visibility: 'hidden' }}>Support</div>
        <hr className={styles.hr} />
        {LABEL_GROUPS[2].rows.map((label, i) =>
          renderCheckRow(FEATURE_CHECKS[plan.name].has(label), i)
        )}
      </div>
    </section>
  )
}

function renderValueRow(content: string, key?: number) {
  return (
    <div className={styles.row} key={key}>
      <svg className={styles.check} viewBox="0 0 12 9" aria-hidden="true">
        <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
      </svg>
      <span>{content}</span>
    </div>
  )
}

function renderCheckRow(checked: boolean, key?: number) {
  return (
    <div className={styles.row} key={key}>
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
