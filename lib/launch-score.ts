export type ScoreComponents = {
  market: number
  product: number
  pmf: number
  finance: number
  growth: number
}

export type ScoreResult = {
  overall: number
  components: ScoreComponents
  label: string
  recommendation: string
}

const WEIGHTS = { market: 0.25, product: 0.20, pmf: 0.25, finance: 0.15, growth: 0.15 }

export function calculateLaunchScore(data: {
  competitorCount: number
  icpDefined: boolean
  demandSignals: number
  checklistValidate: { total: number; completed: number }
  checklistBuild: { total: number; completed: number }
  pmfScore: number | null
  mrr: number
  runwayMonths: number | null
  experimentCount: number
}): ScoreResult {
  let market = 0
  if (data.competitorCount >= 1) market += 20
  if (data.competitorCount >= 3) market += 15
  if (data.icpDefined) market += 30
  if (data.demandSignals >= 1) market += 15
  if (data.demandSignals >= 5) market += 10
  if (data.checklistValidate.total > 0) {
    market += Math.round((data.checklistValidate.completed / data.checklistValidate.total) * 10)
  }
  market = Math.min(100, market)

  let product = 0
  if (data.checklistBuild.total > 0) {
    product = Math.round((data.checklistBuild.completed / data.checklistBuild.total) * 100)
  }

  const pmf = data.pmfScore ?? 0

  let finance = 0
  if (data.mrr > 0) finance += 30
  if (data.mrr >= 100) finance += 20
  if (data.mrr >= 500) finance += 20
  if (data.runwayMonths !== null && data.runwayMonths >= 6) finance += 15
  if (data.runwayMonths !== null && data.runwayMonths >= 12) finance += 15
  finance = Math.min(100, finance)

  let growth = 0
  if (data.experimentCount >= 1) growth += 30
  if (data.experimentCount >= 3) growth += 30
  if (data.mrr > 0) growth += 20
  if (data.demandSignals >= 10) growth += 20
  growth = Math.min(100, growth)

  const components: ScoreComponents = { market, product, pmf, finance, growth }
  const overall = Math.round(
    components.market * WEIGHTS.market +
    components.product * WEIGHTS.product +
    components.pmf * WEIGHTS.pmf +
    components.finance * WEIGHTS.finance +
    components.growth * WEIGHTS.growth
  )

  let label: string
  let recommendation: string
  if (overall <= 20) { label = 'Critical'; recommendation = 'Idea not validated. Focus on customer discovery before building.' }
  else if (overall <= 40) { label = 'Early'; recommendation = 'Some signals emerging. Gather more evidence before committing.' }
  else if (overall <= 60) { label = 'Promising'; recommendation = 'Traction emerging. Focus on product-market fit.' }
  else if (overall <= 80) { label = 'Strong'; recommendation = 'Real evidence of PMF. Invest in growth.' }
  else { label = 'Exceptional'; recommendation = 'Strong PMF + revenue. Consider scaling up.' }

  return { overall, components, label, recommendation }
}

export function scoreColor(score: number): string {
  if (score <= 20) return 'text-red-500'
  if (score <= 40) return 'text-orange-500'
  if (score <= 60) return 'text-yellow-500'
  if (score <= 80) return 'text-green-500'
  return 'text-purple-500'
}

export function scoreBgColor(score: number): string {
  if (score <= 20) return 'bg-red-500/10 text-red-500'
  if (score <= 40) return 'bg-orange-500/10 text-orange-500'
  if (score <= 60) return 'bg-yellow-500/10 text-yellow-500'
  if (score <= 80) return 'bg-green-500/10 text-green-500'
  return 'bg-purple-500/10 text-purple-500'
}
