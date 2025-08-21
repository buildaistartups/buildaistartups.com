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
  { name: 'Pro', price: { monthly: 29, yearly: 24 }, ctaStyle: 'neutral', features: ['100','4','Unlimited','1'] },
  { name: 'Team', price: { monthly: 54, yearly: 49 }, ctaStyle: 'primary', features: ['250','Unlimited','Unlimited','5'], featured: true },
  { name: 'Enterprise', price: { monthly: 85, yearly: 79 }, ctaStyle: 'neutral', features: ['Unlimited','Unlimited','Unlimited','Unlimited'] },
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

type TableRow = 
  | { type: 'header' }
  | { type: 'button' }
  | { type: 'section'; title: string }
  | { type: 'feature'; label: string; values: string[] }
  | { type: 'check'; label: string; checks: boolean[] }

export default function PricingLight() {
  const [annual, setAnnual] = useState(true)

  // Create all rows data for perfect alignment
  const allRows: TableRow[] = [
    // Header row
    { type: 'header' },
    // Button row
    { type: 'button' },
    // Usage section
    { type: 'section', title: 'Usage' },
    { type: 'feature', label: 'Social Connections', values: ['100', '250', 'Unlimited'] },
    { type: 'feature', label: 'Custom Domains', values: ['4', 'Unlimited', 'Unlimited'] },
    { type: 'feature', label: 'User Role Management', values: ['Unlimited', 'Unlimited', 'Unlimited'] },
    { type: 'feature', label: 'External Databases', values: ['1', '5', 'Unlimited'] },
    // Features section
    { type: 'section', title: 'Features' },
    { type: 'check', label: 'Custom Connection', checks: [true, true, true] },
    { type: 'check', label: 'Advanced Deployment Options', checks: [true, true, true] },
    { type: 'check', label: 'Extra Add-ons', checks: [true, true, true] },
    { type: 'check', label: 'Admin Roles', checks: [false, true, true] },
    { type: 'check', label: 'Deploy and Monitor', checks: [false, true, true] },
    { type: 'check', label: 'Enterprise Add-ons', checks: [false, true, true] },
    // Support section
    { type: 'section', title: 'Support' },
    { type: 'check', label: 'Premium Support', checks: [false, true, true] },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        {allRows.map((row, index) => (
          <div key={index} className={styles.gridRow}>
            {/* Labels column */}
            <div className={styles.labelCell}>
              {row.type === 'header' && (
                <div></div> // Empty for header row
              )}
              {row.type === 'button' && (
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
              )}
              {row.type === 'section' && (
                <div className={styles.sectionTitle}>{row.title}</div>
              )}
              {(row.type === 'feature' || row.type === 'check') && (
                <div className={styles.featureLabel}>{row.label}</div>
              )}
            </div>

            {/* Plan columns */}
            {PLANS.map((plan, planIndex) => (
              <div key={plan.name} className={`${styles.planCell} ${plan.featured ? styles.featured : ''}`}>
                {row.type === 'header' && (
                  <div className={styles.planHeader}>
                    <div className={styles.planName}>{plan.name}</div>
                    <div className={styles.priceRow}>
                      <span className={styles.currency}>$</span>
                      <span className={styles.price}>{annual ? plan.price.yearly : plan.price.monthly}</span>
                      <span className={styles.period}>/mo</span>
                    </div>
                    <p className={styles.description}>Everything at your fingertips.</p>
                  </div>
                )}
                {row.type === 'button' && (
                  <div className={styles.buttonCell}>
                    <button className={`${styles.btn} ${plan.ctaStyle === 'primary' ? styles.btnPrimary : styles.btnSecondary}`}>
                      Get Started →
                    </button>
                  </div>
                )}
                {row.type === 'feature' && (
                  <div className={styles.featureValue}>
                    <svg className={styles.checkIcon} viewBox="0 0 16 16">
                      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                    </svg>
                    <span>{row.values[planIndex]}</span>
                  </div>
                )}
                {row.type === 'check' && (
                  <div className={styles.featureValue}>
                    {row.checks[planIndex] ? (
                      <svg className={styles.checkIcon} viewBox="0 0 16 16">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                      </svg>
                    ) : (
                      <div className={styles.emptyCheck}></div>
                    )}
                    <span></span>
                  </div>
                )}
                {row.type === 'section' && <div className={styles.emptySectionCell}></div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
