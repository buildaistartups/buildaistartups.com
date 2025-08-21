'use client'

import { useEffect, useRef, useState } from 'react'
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

// Checkmark pattern identical to dark table
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

  // Measure plan header & the left "Usage + divider" block,
  // then set --head-h = (planHeader - usageHeader)
  const planHeadRef = useRef<HTMLDivElement | null>(null)
  const usageBlockRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const update = () => {
      const headH = planHeadRef.current?.getBoundingClientRect().height ?? 0
      const usageH = usageBlockRef.current?.getBoundingClientRect().height ?? 0
      const shim = Math.max(0, Math.round(headH - usageH))
      // apply to all pricing roots on the page
      document.querySelectorAll<HTMLElement>('.' + styles.vars).forEach(root => {
        root.style.setProperty('--head-h', `${shim}px`)
      })
    }
    update()
    const ro = new ResizeObserver(update)
    if (planHeadRef.current) ro.observe(planHeadRef.current)
    if (usageBlockRef.current) ro.observe(usageBlockRef.current)
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

          {/* Spacer BEFORE the "Usage + divider" block (we subtract its height) */}
          <div className={styles.headShim} />

          {/* Usage group header we measure */}
          <div ref={usageBlockRef}>
            <div className={styles.h3}>Usage</div>
            <hr className={styles.hr} />
          </div>

          {/* Usage rows */}
          {LABEL_GROUPS[0].rows.map((r, i) => (
            <div key={r} className={styles.row}>
              <svg className={styles.check} viewBox="0 0 12 9" aria-hidden="true">
                <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
              </svg>
              <span>{r}</span>
            </div>
          ))}

          {/* Features group */}
          <div style={{ marginTop: 18 }}>
            <div className={styles.h3}>Features</div>
            <hr className={styles.hr} />
            {LABEL_GROUPS[1].rows.map((r) => (
              <div key={r} className={styles.row}>
                <svg className={styles.check} viewBox="0 0 12 9" aria-hidden="true">
                  <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>{r}</span>
              </div>
            ))}
          </div>

          {/* Support group */}
          <div style={{ marginTop: 18 }}>
            <div className={styles.h3}>Support</div>
            <hr className={styles.hr} />
            {LABEL_GROUPS[2].rows.map((r) => (
              <div key={r} className={styles.row}>
                <svg className={styles.check} viewBox="0 0 12 9" aria-hidden="true">
                  <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>{r}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Plan cards */}
        {PLANS.map((p, idx) => (
          <PlanCard key={p.name} plan={p} annual={annual} headRef={idx === 0 ? planHeadRef : undefined} />
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
      {/* Plan header (measured on the first card) */}
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

      {/* Usage (values) */}
      <hr className={styles.hr} />
      {plan.features.map((v, i) => valueRow(v, i))}

      {/* Features (checks pattern mirrors dark table) */}
      <hr className={styles.hr} />
      {LABEL_GROUPS[1].rows.map((label, i) =>
        checkRow(FEATURE_CHECKS[plan.name].has(label), i)
      )}

      {/* Support */}
      <hr className={styles.hr} />
      {checkRow(FEATURE_CHECKS[plan.name].has('Premium Support'))}
    </section>
  )
}

function valueRow(content: string, key?: number) {
  return (
    <div className={styles.row} key={key}>
      <svg className={styles.check} viewBox="0 0 12 9" aria-hidden="true">
        <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
      </svg>
      <span>{content}</span>
    </div>
  )
}

function checkRow(checked: boolean, key?: number) {
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
