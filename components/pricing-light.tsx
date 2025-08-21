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

const FEATURE_CHECKS: Record<Plan['name'], Set<string>> = {
  Pro: new Set(['Custom Connection', 'Advanced Deployment Options', 'Extra Add-ons']),
  Team: new Set(['Custom Connection','Advanced Deployment Options','Extra Add-ons','Admin Roles','Premium Support']),
  Enterprise: new Set(['Custom Connection','Advanced Deployment Options','Extra Add-ons','Admin Roles','Deploy and Monitor','Enterprise Add-ons','Premium Support']),
}

export default function PricingLight() {
  const [annual, setAnnual] = useState(true)

  // elements we measure from the first card
  const headRef = useRef<HTMLDivElement | null>(null)
  const btnRef  = useRef<HTMLButtonElement | null>(null)
  const usageBlockRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const update = () => {
      const headH  = headRef.current?.offsetHeight ?? 0      // includes padding
      const usageH = usageBlockRef.current?.offsetHeight ?? 0
      const btnTop = btnRef.current ? (btnRef.current.offsetTop + btnRef.current.offsetHeight / 2) : 0

      document.querySelectorAll<HTMLElement>('.' + styles.vars).forEach(root => {
        // height to push labels so first label row aligns with first value row
        root.style.setProperty('--head-h', `${Math.max(0, headH - usageH)}px`)
        // vertical center of the first button (for the toggle)
        root.style.setProperty('--btn-top', btnTop ? `${btnTop}px` : '50%')
      })
    }

    // run twice to catch font/layout settling
    const raf = () => requestAnimationFrame(() => requestAnimationFrame(update))
    raf()

    const ro = new ResizeObserver(raf)
    headRef.current && ro.observe(headRef.current)
    usageBlockRef.current && ro.observe(usageBlockRef.current)
    btnRef.current && ro.observe(btnRef.current)
    window.addEventListener('resize', raf)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', raf)
    }
  }, [])

  return (
    <div className={`${styles.vars} ${styles.forceText}`}>
      <div className={styles.wrap}>
        {/* ============== Left labels column ============== */}
        <aside className={styles.labelsCol}>
          <div className={styles.headShim}>
            {/* Toggle aligned to the first button */}
            <div className={`${styles.toggleLine} ${styles.toggleAnchor}`}>
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
          </div>

          {/* "Usage" header + hr (we measure this block) */}
          <div ref={usageBlockRef}>
            <div className={styles.h3}>Usage</div>
            <hr className={styles.hr} />
          </div>

          {/* Usage rows */}
          {LABEL_GROUPS[0].rows.map((r) => (
            <div key={r} className={styles.row}>
              <svg className={styles.check} viewBox="0 0 12 9" aria-hidden="true">
                <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
              </svg>
              <span>{r}</span>
            </div>
          ))}

          {/* Features */}
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

          {/* Support */}
          <div style={{ marginTop: 18 }}>
            <div className={styles.h3}>Support</div>
            <hr className={styles.hr} />
            <div className={styles.row}>
              <svg className={styles.check} viewBox="0 0 12 9" aria-hidden="true">
                <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
              </svg>
              <span>Premium Support</span>
            </div>
          </div>
        </aside>

        {/* ============== Plan cards ============== */}
        {PLANS.map((p, idx) => (
          <PlanCard
            key={p.name}
            plan={p}
            annual={annual}
            headRef={idx === 0 ? headRef : undefined}
            buttonRef={idx === 0 ? btnRef : undefined}
          />
        ))}
      </div>
    </div>
  )
}

function PlanCard({
  plan, annual, headRef, buttonRef,
}: {
  plan: Plan
  annual: boolean
  headRef?: React.Ref<HTMLDivElement>
  buttonRef?: React.Ref<HTMLButtonElement>
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
        <button className={btnClass} type="button" ref={buttonRef}>
          Get Started →
        </button>
      </div>

      {/* Group: Usage */}
      <hr className={styles.hr} />
      {plan.features.map((v, i) => (
        <div className={styles.row} key={i}>
          <svg className={styles.check} viewBox="0 0 12 9" aria-hidden="true">
            <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
          </svg>
          <span>{v}</span>
        </div>
      ))}

      {/* Group: Features */}
      <hr className={styles.hr} />
      {LABEL_GROUPS[1].rows.map((label, i) => (
        <div className={styles.row} key={i}>
          {FEATURE_CHECKS[plan.name].has(label) ? (
            <svg className={styles.check} viewBox="0 0 12 9" aria-hidden="true">
              <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
            </svg>
          ) : (
            <span style={{ width: 12, height: 9 }} />
          )}
          <span />
        </div>
      ))}

      {/* Group: Support */}
      <hr className={styles.hr} />
      <div className={styles.row}>
        {FEATURE_CHECKS[plan.name].has('Premium Support') ? (
          <svg className={styles.check} viewBox="0 0 12 9" aria-hidden="true">
            <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
          </svg>
        ) : (
          <span style={{ width: 12, height: 9 }} />
        )}
        <span />
      </div>
    </section>
  )
}
