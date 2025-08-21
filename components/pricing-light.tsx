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

export default function PricingLight() {
  const [annual, setAnnual] = useState(true)

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={styles.pricingTable}>
          <thead>
            <tr>
              <th className={styles.labelHeader}>
                {/* Toggle */}
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
              </th>
              {PLANS.map((plan) => (
                <th key={plan.name} className={`${styles.planHeader} ${plan.featured ? styles.featured : ''}`}>
                  <div className={styles.planName}>{plan.name}</div>
                  <div className={styles.priceRow}>
                    <span className={styles.currency}>$</span>
                    <span className={styles.price}>{annual ? plan.price.yearly : plan.price.monthly}</span>
                    <span className={styles.period}>/mo</span>
                  </div>
                  <p className={styles.description}>Everything at your fingertips.</p>
                  <button className={`${styles.btn} ${plan.ctaStyle === 'primary' ? styles.btnPrimary : styles.btnSecondary}`}>
                    Get Started →
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Usage Section */}
            <tr className={styles.sectionRow}>
              <td className={styles.sectionTitle}>Usage</td>
              <td className={styles.emptyCell}></td>
              <td className={styles.emptyCell}></td>
              <td className={styles.emptyCell}></td>
            </tr>
            
            <tr>
              <td className={styles.featureLabel}>Social Connections</td>
              <td className={styles.featureValue}>
                <svg className={styles.checkIcon} viewBox="0 0 16 16">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
                <span>100</span>
              </td>
              <td className={styles.featureValue}>
                <svg className={styles.checkIcon} viewBox="0 0 16 16">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
                <span>250</span>
              </td>
              <td className={styles.featureValue}>
                <svg className={styles.checkIcon} viewBox="0 0 16 16">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
                <span>Unlimited</span>
              </td>
            </tr>

            <tr>
              <td className={styles.featureLabel}>Custom Domains</td>
              <td className={styles.featureValue}>
                <svg className={styles.checkIcon} viewBox="0 0 16 16">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
                <span>4</span>
              </td>
              <td className={styles.featureValue}>
                <svg className={styles.checkIcon} viewBox="0 0 16 16">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
                <span>Unlimited</span>
              </td>
              <td className={styles.featureValue}>
                <svg className={styles.checkIcon} viewBox="0 0 16 16">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
                <span>Unlimited</span>
              </td>
            </tr>

            <tr>
              <td className={styles.featureLabel}>User Role Management</td>
              <td className={styles.featureValue}>
                <svg className={styles.checkIcon} viewBox="0 0 16 16">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
                <span>Unlimited</span>
              </td>
              <td className={styles.featureValue}>
                <svg className={styles.checkIcon} viewBox="0 0 16 16">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
                <span>Unlimited</span>
              </td>
              <td className={styles.featureValue}>
                <svg className={styles.checkIcon} viewBox="0 0 16 16">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
                <span>Unlimited</span>
              </td>
            </tr>

            <tr>
              <td className={styles.featureLabel}>External Databases</td>
              <td className={styles.featureValue}>
                <svg className={styles.checkIcon} viewBox="0 0 16 16">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
                <span>1</span>
              </td>
              <td className={styles.featureValue}>
                <svg className={styles.checkIcon} viewBox="0 0 16 16">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
                <span>5</span>
              </td>
              <td className={styles.featureValue}>
                <svg className={styles.checkIcon} viewBox="0 0 16 16">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
                <span>Unlimited</span>
              </td>
            </tr>

            {/* Features Section */}
            <tr className={styles.sectionRow}>
              <td className={styles.sectionTitle}>Features</td>
              <td className={styles.emptyCell}></td>
              <td className={styles.emptyCell}></td>
              <td className={styles.emptyCell}></td>
            </tr>

            {['Custom Connection', 'Advanced Deployment Options', 'Extra Add-ons', 'Admin Roles', 'Deploy and Monitor', 'Enterprise Add-ons'].map((feature) => (
              <tr key={feature}>
                <td className={styles.featureLabel}>{feature}</td>
                {PLANS.map((plan) => (
                  <td key={plan.name} className={styles.featureValue}>
                    {FEATURE_CHECKS[plan.name].has(feature) ? (
                      <svg className={styles.checkIcon} viewBox="0 0 16 16">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                      </svg>
                    ) : (
                      <div className={styles.emptyCheck}></div>
                    )}
                    <span></span>
                  </td>
                ))}
              </tr>
            ))}

            {/* Support Section */}
            <tr className={styles.sectionRow}>
              <td className={styles.sectionTitle}>Support</td>
              <td className={styles.emptyCell}></td>
              <td className={styles.emptyCell}></td>
              <td className={styles.emptyCell}></td>
            </tr>

            <tr>
              <td className={styles.featureLabel}>Premium Support</td>
              {PLANS.map((plan) => (
                <td key={plan.name} className={styles.featureValue}>
                  {FEATURE_CHECKS[plan.name].has('Premium Support') ? (
                    <svg className={styles.checkIcon} viewBox="0 0 16 16">
                      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                    </svg>
                  ) : (
                    <div className={styles.emptyCheck}></div>
                  )}
                  <span></span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
