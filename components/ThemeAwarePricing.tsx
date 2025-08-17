'use client'

import { useTheme } from 'next-themes'
import Pricing from '@/components/pricing'
import PricingLight from '@/components/pricing-light'

export default function ThemeAwarePricing() {
  const { theme } = useTheme()

  if (theme === 'light') {
    return <PricingLight />
  }

  return <Pricing /> // default to dark
}
