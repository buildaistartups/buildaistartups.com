export interface StrategyAsset {
  name: string
  type: 'distribution' | 'marketplace' | 'data' | 'evals' | 'network'
  strength: number
  moatPotential: number
}

export interface PMFGateStatus {
  pmfScore: number
  daysSinceStart: number
  threshold: number
  daysThreshold: number
  status: 'pass' | 'warn' | 'fail'
}

export interface PivotSuggestion {
  direction: string
  vertical: string
  reasoning: string
  adjacency: number
  marketSignals: string[]
}

/**
 * Calculate PMF gate status based on score and timeline
 */
export function calculatePMFGateStatus(
  pmfScore: number,
  daysSinceStart: number,
  threshold: number = 70,
  daysThreshold: number = 90
): PMFGateStatus {
  let status: 'pass' | 'warn' | 'fail' = 'fail'
  
  if (pmfScore >= threshold) {
    status = 'pass'
  } else if (pmfScore >= threshold * 0.8 || daysSinceStart < daysThreshold) {
    status = 'warn'
  }

  return {
    pmfScore,
    daysSinceStart,
    threshold,
    daysThreshold,
    status
  }
}

/**
 * Format pivot suggestion for display with vertical link
 */
export function formatPivotWithVerticalLink(pivot: PivotSuggestion): string {
  return `/start?vertical=${pivot.vertical}`
}

/**
 * Calculate overall strategy score from assets
 */
export function calculateStrategyScore(assets: StrategyAsset[]): number {
  if (assets.length === 0) return 0
  
  const weights = {
    distribution: 0.25,
    marketplace: 0.20,
    data: 0.30,
    evals: 0.15,
    network: 0.10
  }
  
  const weightedScore = assets.reduce((total, asset) => {
    const weight = weights[asset.type] || 0.1
    const assetScore = (asset.strength + asset.moatPotential) / 2
    return total + (assetScore * weight)
  }, 0)
  
  return Math.round(weightedScore)
}

/**
 * Get recommended strategic actions based on asset analysis
 */
export function getStrategicRecommendations(assets: StrategyAsset[]): Array<{
  type: 'strength' | 'opportunity' | 'risk'
  title: string
  description: string
}> {
  const recommendations = []
  
  // Find strongest asset
  const strongest = assets.reduce((prev, curr) => 
    prev.strength > curr.strength ? prev : curr
  )
  
  if (strongest) {
    recommendations.push({
      type: 'strength' as const,
      title: `Leverage ${strongest.name}`,
      description: `Your strongest asset (${strongest.strength}% strength). Consider doubling down on this advantage.`
    })
  }
  
  // Find highest potential
  const highestPotential = assets.reduce((prev, curr) => 
    prev.moatPotential > curr.moatPotential ? prev : curr
  )
  
  if (highestPotential && highestPotential.strength < 80) {
    recommendations.push({
      type: 'opportunity' as const,
      title: `Develop ${highestPotential.name}`,
      description: `High moat potential (${highestPotential.moatPotential}%) but underutilized. Focus development here.`
    })
  }
  
  // Find weakest critical asset
  const weakest = assets.filter(a => ['data', 'distribution'].includes(a.type))
    .reduce((prev, curr) => prev.strength < curr.strength ? prev : curr)
  
  if (weakest && weakest.strength < 60) {
    recommendations.push({
      type: 'risk' as const,
      title: `Shore up ${weakest.name}`,
      description: `Critical asset with low strength (${weakest.strength}%). Address this vulnerability.`
    })
  }
  
  return recommendations
}

/**
 * Determine if pivot should be recommended based on PMF and timeline
 */
export function shouldRecommendPivot(pmfGate: PMFGateStatus): boolean {
  const { pmfScore, daysSinceStart, threshold, daysThreshold } = pmfGate
  
  // Recommend pivot if:
  // 1. PMF score is low and timeline exceeded
  // 2. PMF score is very low regardless of timeline
  return (
    (pmfScore < threshold * 0.7 && daysSinceStart > daysThreshold) ||
    pmfScore < threshold * 0.5
  )
}

/**
 * Get market signals for vertical
 */
export function getMarketSignalsForVertical(vertical: string): string[] {
  const signalMap: Record<string, string[]> = {
    'ai-leadgen': ['sales-automation-growth', 'outbound-fatigue', 'personalization-demand'],
    'ai-support': ['customer-service-costs', 'deflection-roi', 'self-service-adoption'],
    'social-commerce': ['live-shopping-growth', 'social-selling', 'creator-economy'],
    'finance-ops': ['fintech-automation', 'compliance-burden', 'cash-flow-management'],
    'generic': ['ai-adoption-increasing', 'dev-tool-consolidation', 'no-code-expansion']
  }
  
  return signalMap[vertical] || signalMap.generic
}
