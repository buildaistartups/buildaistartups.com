'use client'

import { useEffect, useState } from 'react'

interface ProductScore {
  projectId: string
  score: number
  breakdown: {
    firstDollarScore: number
    firstTenScore: number
    retentionScore: number
  }
  meta: {
    totalTasks: number
    completedTasks: number
    completionRate: number
    hasFirstDollar: boolean
    hasReachedTen: boolean
    retentionRate: number
  }
}

interface Props {
  projectId: string
}

export default function ProductScoreCard({ projectId }: Props) {
  const [score, setScore] = useState<ProductScore | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchScore()
  }, [projectId])

  const fetchScore = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/score/product?projectId=${encodeURIComponent(projectId)}`)
      if (response.ok) {
        const data = await response.json()
        setScore(data)
      }
    } catch (error) {
      console.warn('Failed to fetch product score:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    if (score >= 40) return 'text-orange-400'
    return 'text-red-400'
  }

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-400'
    if (score >= 60) return 'from-yellow-500 to-orange-400'
    if (score >= 40) return 'from-orange-500 to-red-400'
    return 'from-red-500 to-pink-400'
  }

  if (isLoading) {
    return (
      <div className="rounded-lg bg-slate-900/40 border border-white/10 p-4">
        <div className="flex items-center justify-center h-20">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-violet-400 border-t-transparent"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg bg-slate-900/40 border border-white/10 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-sm text-slate-400 mb-1">Product Lane Score</div>
          <div className="flex items-center gap-2">
            <div className={`text-2xl font-bold ${score ? getScoreColor(score.score) : 'text-slate-500'}`}>
              {score?.score ?? '--'}
            </div>
            <div className="text-xs text-slate-500">/100</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400 mb-1">Completion</div>
          <div className="text-sm text-slate-300">
            {score?.meta.completionRate ?? '--'}%
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-slate-800 rounded-full mb-3">
        <div 
          className={`h-2 rounded-full transition-all duration-500 ${
            score ? `bg-gradient-to-r ${getScoreGradient(score.score)}` : 'bg-slate-700'
          }`}
          style={{ width: `${score?.meta.completionRate ?? 0}%` }}
        />
      </div>

      {score ? (
        <div className="space-y-2">
          {/* Breakdown */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className={`font-semibold ${getScoreColor(score.breakdown.firstDollarScore)}`}>
                {score.breakdown.firstDollarScore}
              </div>
              <div className="text-slate-500">First $</div>
            </div>
            <div className="text-center">
              <div className={`font-semibold ${getScoreColor(score.breakdown.firstTenScore)}`}>
                {score.breakdown.firstTenScore}
              </div>
              <div className="text-slate-500">First 10</div>
            </div>
            <div className="text-center">
              <div className={`font-semibold ${getScoreColor(score.breakdown.retentionScore)}`}>
                {score.breakdown.retentionScore}
              </div>
              <div className="text-slate-500">Retention</div>
            </div>
          </div>

          {/* Milestones */}
          <div className="flex items-center gap-4 pt-2 border-t border-white/10">
            <div className={`flex items-center gap-1 text-xs ${score.meta.hasFirstDollar ? 'text-green-400' : 'text-slate-500'}`}>
              <span>{score.meta.hasFirstDollar ? '✓' : '○'}</span>
              First $
            </div>
            <div className={`flex items-center gap-1 text-xs ${score.meta.hasReachedTen ? 'text-blue-400' : 'text-slate-500'}`}>
              <span>{score.meta.hasReachedTen ? '✓' : '○'}</span>
              10 Users
            </div>
            {score.meta.retentionRate > 0 && (
              <div className={`flex items-center gap-1 text-xs ${score.meta.retentionRate >= 60 ? 'text-purple-400' : 'text-slate-500'}`}>
                <span>{score.meta.retentionRate >= 60 ? '✓' : '○'}</span>
                {score.meta.retentionRate}% Retention
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-xs text-slate-500 text-center">
          Complete checklists to calculate your score
        </div>
      )}
    </div>
  )
}
