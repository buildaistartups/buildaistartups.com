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

const FEATURE_LABELS = [
  'Social Connections',
  'Custom Domains', 
  'User Role Management',
  'External Databases'
]

const CHECK_FEATURES = [
  'Custom Connection',
  'Advanced Deployment Options', 
  'Extra Add-ons',
  'Admin Roles',
  'Deploy and Monitor',
  'Enterprise Add-ons',
  'Premium Support'
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

  const allRows: TableRow[] = [
    { type: 'header' },
    { type: 'button' },
    { type: 'section', title: 'Usage' },
    { type: 'feature', label: 'Social Connections', values: ['100', '250', 'Unlimited'] },
    { type: 'feature', label: 'Custom Domains', values: ['4', 'Unlimited', 'Unlimited'] },
    { type: 'feature', label: 'User Role Management', values: ['Unlimited', 'Unlimited', 'Unlimited'] },
    { type: 'feature', label: 'External Databases', values: ['1', '5', 'Unlimited'] },
    { type: 'section', title: 'Features' },
    { type: 'check', label: 'Custom Connection', checks: [true, true, true] },
    { type: 'check', label: 'Advanced Deployment Options', checks: [true, true, true] },
    { type: 'check', label: 'Extra Add-ons', checks: [true, true, true] },
    { type: 'check', label: 'Admin Roles', checks: [false, true, true] },
    { type: 'check', label: 'Deploy and Monitor', checks: [false, true, true] },
    { type: 'check', label: 'Enterprise Add-ons', checks: [false, true, true] },
    { type: 'section', title: 'Support' },
    { type: 'check', label: 'Premium Support', checks: [false, true, true] },
  ]

  return (
    <div className={styles.container}>
      {/* Desktop Grid Layout */}
      <div className={styles.gridContainer}>
        {allRows.map((row, index) => (
          <div key={index} className={styles.gridRow}>
            <div className={styles.labelCell}>
              {row.type === 'header' && <div></div>}
              {row.type === 'button' && (
                <div className={styles.toggleLine}>
                  <span>Monthly</span>
                  <span
                    role="switch"
                    aria-checked={annual}
                    onClick={() => setAnnual((s) => !s)}
                    className={styles.toggle}
                    style={{ background: annual ? '#8b5cf6' : '#4a5568' }}
                  >
                    <span
                      className={styles.toggleThumb}
                      style={{ left: annual ? 22 : 2 }}
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

      {/* Mobile Card Layout */}
      <div className={styles.mobileCards}>
        {/* Mobile Toggle */}
        <div className={styles.mobileToggle}>
          <span>Monthly</span>
          <span
            role="switch"
            aria-checked={annual}
            onClick={() => setAnnual((s) => !s)}
            className={styles.mobileToggleSwitch}
            style={{ background: annual ? '#8b5cf6' : '#4a5568' }}
          >
            <span
              className={styles.mobileToggleThumb}
              style={{ left: annual ? 22 : 2 }}
            />
          </span>
          <span>Yearly</span>
          <span className={styles.mobileDiscount}>(-20%)</span>
        </div>

        {/* Mobile Cards */}
        {PLANS.map((plan, planIndex) => (
          <div key={plan.name} className={`${styles.mobileCard} ${plan.featured ? styles.featured : ''}`}>
            {/* Card Header */}
            <div className={styles.mobileCardHeader}>
              <div className={styles.mobileCardName}>{plan.name}</div>
              <div className={styles.mobileCardPrice}>
                <span className={styles.mobileCardCurrency}>$</span>
                <span className={styles.mobileCardPriceAmount}>
                  {annual ? plan.price.yearly : plan.price.monthly}
                </span>
                <span className={styles.mobileCardPeriod}>/mo</span>
              </div>
              <p className={styles.mobileCardDescription}>Everything at your fingertips.</p>
            </div>

            {/* CTA Button */}
            <button 
              className={`${styles.mobileCardButton} ${plan.ctaStyle === 'primary' ? styles.primary : styles.secondary}`}
            >
              Get Started →
            </button>

            {/* Usage Section */}
            <div className={styles.mobileCardSection}>
              <div className={styles.mobileCardSectionTitle}>Usage</div>
              {FEATURE_LABELS.map((label, index) => (
                <div key={label} className={styles.mobileCardFeature}>
                  <svg className={styles.mobileCardFeatureIcon} viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                  <span className={styles.mobileCardFeatureLabel}>{label}</span>
                  <span className={styles.mobileCardFeatureValue}>{plan.features[index]}</span>
                </div>
              ))}
            </div>

            {/* Features Section */}
            <div className={styles.mobileCardSection}>
              <div className={styles.mobileCardSectionTitle}>Features</div>
              {CHECK_FEATURES.slice(0, 6).map((feature) => (
                <div key={feature} className={styles.mobileCardFeature}>
                  {FEATURE_CHECKS[plan.name].has(feature) ? (
                    <svg className={styles.mobileCardFeatureIcon} viewBox="0 0 16 16">
                      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                    </svg>
                  ) : (
                    <div className={styles.mobileCardFeatureIconEmpty}></div>
                  )}
                  <span className={styles.mobileCardFeatureLabel}>{feature}</span>
                </div>
              ))}
            </div>

            {/* Support Section */}
            <div className={styles.mobileCardSection}>
              <div className={styles.mobileCardSectionTitle}>Support</div>
              <div className={styles.mobileCardFeature}>
                {FEATURE_CHECKS[plan.name].has('Premium Support') ? (
                  <svg className={styles.mobileCardFeatureIcon} viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                ) : (
                  <div className={styles.mobileCardFeatureIconEmpty}></div>
                )}
                <span className={styles.mobileCardFeatureLabel}>Premium Support</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
