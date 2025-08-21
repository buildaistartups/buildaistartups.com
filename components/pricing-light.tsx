'use client'

import { useState } from 'react'
import styles from './pricing-light.module.css'

export default function Pricing() {
  const [annual, setAnnual] = useState<boolean>(true)

  return (
    <div className="relative">
      {/* Content */}
      <div className="grid md:grid-cols-4 xl:-mx-6 text-sm">
        {/* Pricing toggle */}
        <div className="px-6 flex flex-col justify-end">
          <div className={`pb-5 md:border-b ${styles.borderBottom}`}>
            <div className="max-md:text-center">
              <div className="inline-flex items-center whitespace-nowrap">
                <div className={`${styles.secondaryText} mr-2 md:max-lg:hidden`}>Monthly</div>
                {/* Toggle */}
                <div className={`${styles.secondaryText} ml-2`}>
                  Yearly <span className={styles.purpleText}>(-20%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Pro price */}
        <div className="px-6 flex flex-col justify-end">
          <div className={`grow pb-4 mb-4 ${styles.borderBottom}`}>
            <div className={`text-base ${styles.purpleText} pb-0.5`}>Pro</div>
            <div className="mb-1">
              <span className={`text-lg ${styles.secondaryText}`}>$</span>
              <span className={`text-3xl font-bold ${styles.primaryText}`}>{annual ? '24' : '29'}</span>
              <span className={`text-sm ${styles.secondaryText}`}>/mo</span>
            </div>
            <div className={styles.secondaryText}>Everything at your fingertips.</div>
          </div>
        </div>
        
        {/* Continue with other sections... */}
      </div>
    </div>
  )
}
