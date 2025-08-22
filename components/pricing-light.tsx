'use client'

import { useState } from 'react'
import styles from './pricing-light.module.css'

export default function PricingLight() {
  const [annual, setAnnual] = useState(true)

  const plans = [
    { 
      name: 'Pro', 
      price: { monthly: 29, yearly: 24 }, 
      ctaStyle: 'secondary',
      features: {
        'Social Connections': '100',
        'Custom Domains': '4', 
        'User Role Management': 'Unlimited',
        'External Databases': '1'
      },
      checkFeatures: ['Custom Connection', 'Advanced Deployment Options', 'Extra Add-ons']
    },
    { 
      name: 'Team', 
      price: { monthly: 54, yearly: 49 }, 
      ctaStyle: 'primary',
      featured: true,
      features: {
        'Social Connections': '250',
        'Custom Domains': 'Unlimited', 
        'User Role Management': 'Unlimited',
        'External Databases': '5'
      },
      checkFeatures: ['Custom Connection', 'Advanced Deployment Options', 'Extra Add-ons', 'Admin Roles', 'Deploy and Monitor', 'Enterprise Add-ons', 'Premium Support']
    },
    { 
      name: 'Enterprise', 
      price: { monthly: 85, yearly: 79 }, 
      ctaStyle: 'secondary',
      features: {
        'Social Connections': 'Unlimited',
        'Custom Domains': 'Unlimited', 
        'User Role Management': 'Unlimited',
        'External Databases': 'Unlimited'
      },
      checkFeatures: ['Custom Connection', 'Advanced Deployment Options', 'Extra Add-ons', 'Admin Roles', 'Deploy and Monitor', 'Enterprise Add-ons', 'Premium Support']
    }
  ]

  const allCheckFeatures = ['Custom Connection', 'Advanced Deployment Options', 'Extra Add-ons', 'Admin Roles', 'Deploy and Monitor', 'Enterprise Add-ons', 'Premium Support']

  return (
    <div className={styles.container}>
      {/* Desktop Grid Layout - keeping existing structure */}
      <div className={styles.gridContainer}>
        {/* Your existing desktop grid code here */}
      </div>

      {/* Mobile Card Layout */}
      <div className={styles.mobileCards}>
        {/* Mobile Toggle */}
        <div className={styles.mobileToggle}>
          <span>Monthly</span>
          <div
            className={styles.mobileToggleSwitch}
            style={{ background: annual ? '#8b5cf6' : '#4a5568' }}
            onClick={() => setAnnual(!annual)}
          >
            <div
              className={styles.mobileToggleThumb}
              style={{ left: annual ? '22px' : '2px' }}
            />
          </div>
          <span>Yearly</span>
          <span className={styles.mobileDiscount}>(-20%)</span>
        </div>

        {/* Mobile Cards */}
        {plans.map((plan) => (
          <div key={plan.name} className={`${styles.mobileCard} ${plan.featured ? styles.featured : ''}`}>
            {/* Header */}
            <div className={styles.mobileCardHeader}>
              <h3 className={styles.mobileCardName}>{plan.name}</h3>
              <div className={styles.mobileCardPrice}>
                <span className={styles.mobileCardCurrency}>$</span>
                <span className={styles.mobileCardPriceAmount}>
                  {annual ? plan.price.yearly : plan.price.monthly}
                </span>
                <span className={styles.mobileCardPeriod}>/mo</span>
              </div>
              <p className={styles.mobileCardDescription}>Everything at your fingertips.</p>
            </div>

            {/* Button */}
            <button className={`${styles.mobileCardButton} ${styles[plan.ctaStyle]}`}>
              Get Started →
            </button>

            {/* Usage Section */}
            <div className={styles.mobileCardSection}>
              <h4 className={styles.mobileCardSectionTitle}>Usage</h4>
              {Object.entries(plan.features).map(([feature, value]) => (
                <div key={feature} className={styles.mobileCardFeature}>
                  <svg className={styles.mobileCardFeatureIcon} viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                  <span className={styles.mobileCardFeatureLabel}>{feature}</span>
                  <span className={styles.mobileCardFeatureValue}>{value}</span>
                </div>
              ))}
            </div>

            {/* Features Section */}
            <div className={styles.mobileCardSection}>
              <h4 className={styles.mobileCardSectionTitle}>Features</h4>
              {allCheckFeatures.slice(0, 6).map((feature) => (
                <div key={feature} className={styles.mobileCardFeature}>
                  {plan.checkFeatures.includes(feature) ? (
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
              <h4 className={styles.mobileCardSectionTitle}>Support</h4>
              <div className={styles.mobileCardFeature}>
                {plan.checkFeatures.includes('Premium Support') ? (
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
