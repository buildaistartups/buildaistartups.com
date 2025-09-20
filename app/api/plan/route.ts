import { NextRequest, NextResponse } from 'next/server'
import { validateMiniPlan, ajvErrorsToMessage } from '@/lib/validate'
import type { MiniPlanInput, Forecast } from '@/lib/schemas'

// Constants for better maintainability
const REVENUE_BASE = {
  'ai-leadgen': 5000,
  default: 3000
} as const

const MULTIPLIERS = {
  feature: 0.2,
  channel: 0.15,
  revenue: 2.5
} as const

const TIME_TO_CUSTOMER = {
  'ai-leadgen': 14,
  default: 21
} as const

const CONFIDENCE = {
  base: 65,
  featureBonus: 5,
  max: 85
} as const

function generateForecast(plan: MiniPlanInput): Forecast {
  // Get base revenue based on vertical
  const baseRevenue = REVENUE_BASE[plan.vertical as keyof typeof REVENUE_BASE] || REVENUE_BASE.default
  
  // Calculate multipliers with null safety
  const featureCount = plan.mvpFeatures?.length || 0
  const channelCount = plan.launchChannels?.length || 0
  
  const featureMultiplier = 1 + (featureCount * MULTIPLIERS.feature)
  const channelBoost = 1 + (channelCount * MULTIPLIERS.channel)
  
  // Calculate revenue range
  const low = Math.floor(baseRevenue * featureMultiplier * channelBoost)
  const high = Math.floor(low * MULTIPLIERS.revenue)
  
  // Calculate time to first customer
  const timeToFirstCustomer = TIME_TO_CUSTOMER[plan.vertical as keyof typeof TIME_TO_CUSTOMER] || TIME_TO_CUSTOMER.default
  
  // Calculate confidence score with cap
  const confidenceScore = Math.min(
    CONFIDENCE.base + (featureCount * CONFIDENCE.featureBonus), 
    CONFIDENCE.max
  )
  
  return {
    revenueRange: { low, high },
    timeToFirstCustomer,
    confidenceScore,
    assumptions: [
      'Market demand remains stable',
      'MVP launches within 30 days',
      'Basic marketing execution',
      'Average conversion rates for vertical'
    ]
  }
}

export async function POST(req: NextRequest) {
  try {
    // Parse request body with error handling
    let body: unknown
    try {
      body = await req.json()
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }
    
    // Validate input
    const isValid = validateMiniPlan(body)
    if (!isValid) {
      const errors = validateMiniPlan.errors || []
      return NextResponse.json(
        { error: ajvErrorsToMessage(errors) },
        { status: 400 }
      )
    }
    
    // After validation, we can safely cast to MiniPlanInput
    const plan = body as MiniPlanInput
    
    // Generate forecast
    const forecast = generateForecast(plan)
    
    return NextResponse.json({ forecast }, { status: 200 })
    
  } catch (error) {
    console.error('Error in /api/plan:', error)
    
    // More specific error handling
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    
    return NextResponse.json(
      { error: 'Failed to generate forecast' },
      { status: 500 }
    )
  }
}
