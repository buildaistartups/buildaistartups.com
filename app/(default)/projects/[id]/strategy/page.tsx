'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Target, TrendingUp, AlertTriangle, CheckCircle, XCircle, Users, Zap, Database, Award } from 'lucide-react'

interface StrategyAsset {
  name: string
  type: 'distribution' | 'marketplace' | 'data' | 'evals' | 'network'
  strength: number
  moatPotential: number
}

interface PivotSuggestion {
  direction: string
  vertical: string
  reasoning: string
  adjacency: number
  marketSignals: string[]
}

interface PMFGateStatus {
  pmfScore: number
  daysSinceStart: number
  threshold: number
  daysThreshold: number
  status: 'pass' | 'warn' | 'fail'
}

export default function StrategyPage() {
  const params = useParams()
  const projectId = params.id as string
  
  const [loading, setLoading] = useState(false)
  const [assets, setAssets] = useState<StrategyAsset[]>([])
  const [pmfGate, setPmfGate] = useState<PMFGateStatus | null>(null)
  const [pivotSuggestions, setPivotSuggestions] = useState<PivotSuggestion[]>([])
  const [showPivotAnalysis, setShowPivotAnalysis] = useState(false)

  // Sample strategy assets based on Build AI Startups ecosystem
  const sampleAssets: StrategyAsset[] = [
    { name: 'Code Generation Platform', type: 'distribution', strength: 85, moatPotential: 70 },
    { name: 'Template Marketplace', type: 'marketplace', strength: 75, moatPotential: 85 },
    { name: 'Build Score Dataset', type: 'data', strength: 90, moatPotential: 95 },
    { name: 'AI Evaluation Harness', type: 'evals', strength: 80, moatPotential: 80 },
    { name: 'Developer Network', type: 'network', strength: 60, moatPotential: 75 }
  ]

  const samplePMFGate: PMFGateStatus = {
    pmfScore: 65,
    daysSinceStart: 120,
    threshold: 70,
    daysThreshold: 90,
    status: 'warn'
  }

  useEffect(() => {
    // Initialize with sample data
    setAssets(sampleAssets)
    setPmfGate(samplePMFGate)
  }, [])

  const analyzePivots = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/strategy/pivot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          pmfScore: pmfGate?.pmfScore || 0,
          marketSignals: ['ai-adoption-increasing', 'dev-tool-consolidation', 'no-code-expansion']
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        setPivotSuggestions(data.pivots || [])
        setShowPivotAnalysis(true)
      }
    } catch (error) {
      console.error('Error analyzing pivots:', error)
    } finally {
      setLoading(false)
    }
  }

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'distribution': return <TrendingUp className="w-4 h-4" />
      case 'marketplace': return <Users className="w-4 h-4" />
      case 'data': return <Database className="w-4 h-4" />
      case 'evals': return <Zap className="w-4 h-4" />
      case 'network': return <Users className="w-4 h-4" />
      default: return <Target className="w-4 h-4" />
    }
  }

  const getGateStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'warn': return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      case 'fail': return <XCircle className="w-5 h-5 text-red-400" />
      default: return <AlertTriangle className="w-5 h-5 text-gray-400" />
    }
  }

  const getGateStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'border-green-400/20 bg-green-400/5'
      case 'warn': return 'border-yellow-400/20 bg-yellow-400/5'
      case 'fail': return 'border-red-400/20 bg-red-400/5'
      default: return 'border-gray-400/20 bg-gray-400/5'
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center gap-4">
            <Link 
              href={`/projects/${projectId}`}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Project
            </Link>
            <div className="h-4 w-px bg-white/20" />
            <h1 className="text-xl font-semibold">Strategy Map</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Strategy Assets Map */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Assets → Moat Potential</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {assets.map((asset, i) => (
                  <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-slate-800 p-2">
                        {getAssetIcon(asset.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm">{asset.name}</h3>
                        <p className="text-xs text-slate-400 capitalize mt-1">{asset.type}</p>
                        
                        <div className="mt-3 space-y-2">
                          <div>
                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                              <span>Current Strength</span>
                              <span>{asset.strength}%</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-1.5">
                              <div 
                                className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${asset.strength}%` }}
                              />
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                              <span>Moat Potential</span>
                              <span>{asset.moatPotential}%</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-1.5">
                              <div 
                                className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${asset.moatPotential}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Recommendations */}
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-6">
              <h3 className="font-semibold mb-4">Strategic Recommendations</h3>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <div className="rounded-full bg-green-500/20 p-1">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                  </div>
                  <p className="text-slate-300">
                    <strong>Strengthen data moat:</strong> Your Build Score dataset (90% strength, 95% potential) is your strongest differentiator. Double down on collection and analysis.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="rounded-full bg-yellow-500/20 p-1">
                    <AlertTriangle className="w-3 h-3 text-yellow-400" />
                  </div>
                  <p className="text-slate-300">
                    <strong>Expand network effects:</strong> Developer network (60% strength) has high potential (75%). Focus on community-driven features.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="rounded-full bg-blue-500/20 p-1">
                    <Target className="w-3 h-3 text-blue-400" />
                  </div>
                  <p className="text-slate-300">
                    <strong>Marketplace leverage:</strong> Template marketplace shows strong potential. Consider revenue sharing and quality badges.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PMF Gate & Pivot Analysis */}
          <div className="space-y-6">
            {/* PMF Gate Status */}
            {pmfGate && (
              <div className={`rounded-xl border p-6 ${getGateStatusColor(pmfGate.status)}`}>
                <div className="flex items-center gap-3 mb-4">
                  {getGateStatusIcon(pmfGate.status)}
                  <h3 className="font-semibold">PMF Gate Status</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">PMF Score</span>
                      <span className="font-mono">{pmfGate.pmfScore}/100</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          pmfGate.pmfScore >= pmfGate.threshold ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${pmfGate.pmfScore}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-400">Days Active</p>
                      <p className="font-mono">{pmfGate.daysSinceStart}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Target</p>
                      <p className="font-mono">{pmfGate.threshold}% by {pmfGate.daysThreshold}d</p>
                    </div>
                  </div>

                  {pmfGate.status !== 'pass' && (
                    <div className="pt-4 border-t border-white/10">
                      <button
                        onClick={analyzePivots}
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
                      >
                        {loading ? 'Analyzing...' : 'Analyze Pivot Options'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Pivot Suggestions */}
            {showPivotAnalysis && pivotSuggestions.length > 0 && (
              <div className="rounded-xl border border-orange-400/20 bg-orange-400/5 p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Pivot Suggestions
                </h3>
                
                <div className="space-y-4">
                  {pivotSuggestions.map((pivot, i) => (
                    <div key={i} className="rounded-lg border border-white/10 bg-slate-900/40 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium">{pivot.direction}</span>
                        <Link
                          href={`/start?vertical=${pivot.vertical}`}
                          className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                        >
                          Try Vertical
                        </Link>
                      </div>
                      
                      <p className="text-sm text-slate-300 mb-3">{pivot.reasoning}</p>
                      
                      <div className="flex justify-between items-center text-xs text-slate-400">
                        <span>Adjacency: {Math.round(pivot.adjacency * 100)}%</span>
                        <span>{pivot.marketSignals.length} signals</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href={`/projects/${projectId}/finance`}
                  className="flex items-center gap-3 p-3 rounded-lg border border-white/10 hover:bg-slate-800/40 transition-colors text-sm"
                >
                  <Award className="w-4 h-4 text-green-400" />
                  <span>Review Finance Readiness</span>
                </Link>
                
                <Link
                  href={`/projects/${projectId}`}
                  className="flex items-center gap-3 p-3 rounded-lg border border-white/10 hover:bg-slate-800/40 transition-colors text-sm"
                >
                  <Target className="w-4 h-4 text-blue-400" />
                  <span>Update Build Score</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
