// lib/buildScore.ts
// Build score calculation and storage

export type BuildScoreParts = {
  product: number    // 0-100: features, UX, completeness
  traction: number   // 0-100: users, revenue, growth
  ai: number         // 0-100: AI eval scores, safety
  finance: number    // 0-100: unit economics, runway
}

export type BuildScore = {
  projectId: string
  score: number      // weighted overall 0-100
  parts: BuildScoreParts
  updatedAt: number
  commit?: string
}

// In-memory store (replace with DB later)
const BuildScoreStore: Record<string, BuildScore> = {}

// Scoring weights
const WEIGHTS = {
  product: 0.35,
  traction: 0.30,
  ai: 0.20,
  finance: 0.15
}

export function calculateBuildScore(
  projectId: string,
  parts: Partial<BuildScoreParts>,
  commit?: string
): BuildScore {
  const existing = BuildScoreStore[projectId]
  
  // Merge with existing parts
  const finalParts: BuildScoreParts = {
    product: parts.product ?? existing?.parts.product ?? 0,
    traction: parts.traction ?? existing?.parts.traction ?? 0,
    ai: parts.ai ?? existing?.parts.ai ?? 0,
    finance: parts.finance ?? existing?.parts.finance ?? 0
  }
  
  // Calculate weighted score
  const score = Math.round(
    finalParts.product * WEIGHTS.product +
    finalParts.traction * WEIGHTS.traction +
    finalParts.ai * WEIGHTS.ai +
    finalParts.finance * WEIGHTS.finance
  )
  
  const buildScore: BuildScore = {
    projectId,
    score: Math.max(0, Math.min(100, score)), // clamp 0-100
    parts: finalParts,
    updatedAt: Date.now(),
    commit
  }
  
  BuildScoreStore[projectId] = buildScore
  return buildScore
}

export function getBuildScore(projectId: string): BuildScore | null {
  return BuildScoreStore[projectId] || null
}

export function getAllBuildScores(): BuildScore[] {
  return Object.values(BuildScoreStore)
    .sort((a, b) => b.score - a.score)
}

export function updateBuildScorePart(
  projectId: string, 
  part: keyof BuildScoreParts, 
  value: number,
  commit?: string
): BuildScore {
  return calculateBuildScore(projectId, { [part]: value }, commit)
}
