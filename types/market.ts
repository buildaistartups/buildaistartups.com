// types/market.ts

export type PMFSurveyResponse = {
  id: string
  projectId: string
  userId?: string
  responses: {
    disappointment: 'very-disappointed' | 'somewhat-disappointed' | 'not-disappointed' // How disappointed would you be if you could no longer use this product?
    primaryBenefit: string // What is the main benefit you get from this product?
    improvement: string // How can we improve this product for you?
  }
  ts: number
  meta?: Record<string, unknown>
}

export type LOIEntry = {
  id: string
  projectId: string
  email: string
  company?: string
  useCase?: string
  budget?: string
  timeline?: string
  source?: string // where they came from
  ts: number
}

export type WaitlistEntry = {
  id: string
  projectId: string
  email: string
  referral?: string // how they heard about it
  ts: number
}

export type Competitor = {
  id: string
  projectId: string
  name: string
  url?: string
  pricing?: string
  position?: string // key differentiator
  strengths?: string[]
  weaknesses?: string[]
  marketShare?: 'dominant' | 'significant' | 'niche' | 'emerging'
  ts: number
}

export type DemandMetrics = {
  projectId: string
  landingViews: number
  signups: number
  ctaClicks: number
  shareCount: number
  period: 'week' | 'month' | 'quarter'
  ts: number
}

export type PMFScore = {
  projectId: string
  score: number // 0-100, based on % very-disappointed
  responses: number
  breakdown: {
    veryDisappointed: number
    somewhatDisappointed: number
    notDisappointed: number
  }
  ts: number
}

export type MarketScore = {
  projectId: string
  score: number // 0-100 overall market validation score
  components: {
    pmf: number // 40% weight - PMF score
    demand: number // 40% weight - LOI/waitlist/preorders
    traction: number // 20% weight - landing CTR/engagement
  }
  weights: {
    pmf: number
    demand: number
    traction: number
  }
  evidence: {
    pmfScore?: number
    loiCount: number
    waitlistCount: number
    landingCTR?: number
  }
  ts: number
}

export type ICPProfile = {
  projectId: string
  persona: string
  jobTitle?: string
  company?: string
  pain?: string
  budget?: string
  decisionProcess?: string
  ts: number
}
