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
  { name: 'Pro', price: { monthly: 29, yearly: 24 }, ctaStyle: 'neutral', features: ['100','4','Unlimited','1'] },
  { name: 'Team', price: { monthly: 54, yearly: 49 }, ctaStyle: 'primary', features: ['250','Unlimited','Unlimited','5'], featured: true },
  { name: 'Enterprise', price: { monthly: 85, yearly: 79 }, ctaStyle: 'neutral', features: ['Unlimited','Unlimited','Unlimited','Unlimited'] },
]

const LABEL_GROUPS = [
  { title: 'Usage', rows: ['Social Connections','Custom Domains','User Role Management','External Databases'] },
  { title: 'Features', rows: ['Custom Connection','Advanced Deployment Options','Extra Add-ons','Admin Roles','Deploy and Monitor','Enterprise Add-ons'] },
  { title: 'Support', rows: ['Premium Support'] },
]

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
  const headerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const [buttonOffset, setButtonOffset] = useState(0)

  useEffect(() => {
    if (headerRef.current && buttonRef.current) {
      const updateOffset = () => {
        const headerRect = headerRef.current?.getBoundingClientRect()
        const buttonRect = buttonRef.current?.getBoundingClientRect()
        
        if (headerRect && buttonRect) {
          // Calculate the offset from the top of the card to the button
          const offset = buttonRect.top - headerRect.top
          setButtonOffset(offset)
        }
      }
      
      updateOffset()
      window.addEventListener('resize', updateOffset)
      return () => window.removeEventListener('resize', updateOffset)
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        {/* Left labels column */}
        <aside className={styles.labelsCol}>
          {/* Spacer to align toggle with buttons */}
          <div style={{ height: buttonOffset }}></div>

          {/* Toggle aligned with buttons */}
          <div className={styles.toggleContainer}>
            <div className={styles.toggleLine}>
              <span>Monthly</span>
              <span
                role="switch"
                aria-checked={annual}
                onClick={() => setAnnual((s) => !s)}
                className={styles.toggle}
                style={{
                  background: annual ? '#8b5cf6' : '#4a5568',
                }}
              >
                <span
                  className={styles.toggleThumb}
                  style={{
                    left: annual ? 22 : 2,
                  }}
                />
              </span>
              <span>Yearly</span>
              <span className={styles.discount}>(-20%)</span>
            </div>
          </div>

          {/* Groups */}
          {LABEL_GROUPS.map((g, gi) => (
            <div key={gi} className={styles.labelGroup}>
              <div className={styles.groupTitle}>{g.title}</div>
              {g.rows.map((r, i) => (
                <div key={i} className={styles.labelRow}>
                  <span>{r}</span>
                </div>
              ))}
            </div>
          ))}
        </aside>

        {/* Plan cards */}
        {PLANS.map((plan, index) => (
          <PlanCard 
            key={plan.name} 
            plan={plan} 
            annual={annual} 
            headerRef={index === 0 ? headerRef : undefined}
            buttonRef={index === 0 ? buttonRef : undefined}
          />
        ))}
      </div>
    </div>
  )
}

function PlanCard({ 
  plan, 
  annual, 
  headerRef,
  buttonRef
}: { 
  plan: Plan; 
  annual: boolean; 
  headerRef?: React.RefObject<HTMLDivElement | null>;
  buttonRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const price = annual ? plan.price.yearly : plan.price.monthly

  return (
    <section className={`${styles.card} ${plan.featured ? styles.featured : ''}`}>
      {/* Header */}
      <div 
        className={styles.cardHeader} 
        ref={headerRef}
      >
        <div className={styles.planName}>{plan.name}</div>
        <div className={styles.priceRow}>
          <span className={styles.currency}>$</span>
          <span className={styles.price}>{price}</span>
          <span className={styles.period}>/mo</span>
        </div>
        <p className={styles.description}>Everything at your fingertips.</p>
      </div>

      {/* Button aligned with toggle */}
      <div className={styles.buttonContainer} ref={buttonRef}>
        <button className={`${styles.btn} ${plan.ctaStyle === 'primary' ? styles.btnPrimary : styles.btnSecondary}`}>
          Get Started →
        </button>
      </div>

      {/* Usage section */}
      <div className={styles.section}>
        {plan.features.map((value, i) => (
          <div key={i} className={styles.featureRow}>
            <svg className={styles.checkIcon} viewBox="0 0 16 16">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg>
            <span>{value}</span>
          </div>
        ))}
      </div>

      {/* Features section */}
      <div className={styles.section}>
        <div className={styles.sectionSpacer}></div>
        {LABEL_GROUPS[1].rows.map((label, i) => (
          <div key={i} className={styles.featureRow}>
            {FEATURE_CHECKS[plan.name].has(label) ? (
              <svg className={styles.checkIcon} viewBox="0 0 16 16">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
              </svg>
            ) : (
              <div className={styles.emptyCheck}></div>
            )}
            <span></span>
          </div>
        ))}
      </div>

      {/* Support section */}
      <div className={styles.section}>
        <div className={styles.sectionSpacer}></div>
        {LABEL_GROUPS[2].rows.map((label, i) => (
          <div key={i} className={styles.featureRow}>
            {FEATURE_CHECKS[plan.name].has(label) ? (
              <svg className={styles.checkIcon} viewBox="0 0 16 16">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
              </svg>
            ) : (
              <div className={styles.emptyCheck}></div>
            )}
            <span></span>
          </div>
        ))}
      </div>
    </section>
  )
}
