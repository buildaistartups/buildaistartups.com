'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon, ExclamationTriangleIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline'

interface DiscoveryResult {
  source: string
  painPoints: string[]
  confidence: 'high' | 'medium' | 'low'
  rawData: string
}

interface DiscoveryAgentProps {
  projectId: string
  onComplete?: (results: DiscoveryResult[]) => void
  className?: string
}

export default function DiscoveryAgent({ 
  projectId, 
  onComplete,
  className = '' 
}: DiscoveryAgentProps) {
  const [status, setStatus] = useState<'idle' | 'running' | 'complete' | 'error'>('idle')
  const [progress, setProgress] = useState('')
  const [results, setResults] = useState<DiscoveryResult[]>([])
  const [error, setError] = useState('')

  const mockSources = [
    'reddit.com/r/entrepreneur',
    'news.ycombinator.com',
    'indiehackers.com/interviews',
    'twitter.com/hashtag/startup',
    'productboard.com/blog'
  ]

  const mockPainPoints = {
    'reddit.com/r/entrepreneur': [
      'Finding reliable contractors is impossibly time-consuming',
      'Payment processing fees eat into already thin margins',
      'Customer support becomes overwhelming as you scale',
      'Marketing attribution is confusing and expensive'
    ],
    'news.ycombinator.com': [
      'Database scaling decisions are paralyzing for small teams',
      'Security compliance requirements unclear for B2B SaaS',
      'Developer hiring is competitive and expensive',
      'Infrastructure costs spike unpredictably'
    ],
    'indiehackers.com/interviews': [
      'Email deliverability issues hurt onboarding conversion',
      'Building landing pages that convert takes forever',
      'Integration APIs constantly change and break workflows',
      'Customer churn reasons are hard to identify and fix'
    ],
    'twitter.com/hashtag/startup': [
      'Investors want metrics we don\'t know how to track',
      'Product-market fit feels subjective and unclear',
      'Team coordination tools create more noise than value',
      'Legal setup costs are surprising for early-stage companies'
    ],
    'productboard.com/blog': [
      'Feature prioritization becomes political rather than data-driven',
      'User research is expensive and time-consuming to do right',
      'Roadmap communication gets lost between teams',
      'Technical debt accumulates faster than planned refactoring'
    ]
  }

  const runDiscovery = async () => {
    setStatus('running')
    setResults([])
    setError('')

    try {
      // Mock scraping process with realistic timing
      for (let i = 0; i < mockSources.length; i++) {
        const source = mockSources[i]
        setProgress(`Scraping ${source}...`)
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))
        
        const painPoints = mockPainPoints[source as keyof typeof mockPainPoints] || []
        
        const result: DiscoveryResult = {
          source,
          painPoints: painPoints.slice(0, 2 + Math.floor(Math.random() * 3)), // Random 2-4 points
          confidence: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as any,
          rawData: `Mock scraped content from ${source} - ${painPoints.length} discussions analyzed`
        }
        
        setResults(prev => [...prev, result])
      }

      setProgress('Clustering pain points...')
      await new Promise(resolve => setTimeout(resolve, 2000))

      setProgress('Logging evidence...')
      
      // Log to Evidence Ledger
      await fetch('/api/evidence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          type: 'note',
          title: `Discovery Agent: Analyzed ${mockSources.length} sources`,
          detail: `Found ${results.reduce((sum, r) => sum + r.painPoints.length, 0)} unique pain points across ${mockSources.join(', ')}`,
          meta: {
            agentType: 'discovery',
            sourcesScraped: mockSources.length,
            painPointsFound: results.reduce((sum, r) => sum + r.painPoints.length, 0),
            confidence: results.filter(r => r.confidence === 'high').length / results.length
          }
        })
      })

      setStatus('complete')
      onComplete?.(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Discovery failed')
      setStatus('error')
    }
  }

  const StatusIcon = status === 'running' ? ClockIcon :
                   status === 'complete' ? CheckCircleIcon :
                   status === 'error' ? ExclamationTriangleIcon :
                   MagnifyingGlassIcon

  return (
    <div className={`rounded-lg border border-white/10 bg-slate-950/40 p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
          status === 'running' ? 'bg-blue-500/20 animate-pulse' :
          status === 'complete' ? 'bg-green-500/20' :
          status === 'error' ? 'bg-red-500/20' :
          'bg-violet-500/20'
        }`}>
          <StatusIcon className={`h-4 w-4 ${
            status === 'running' ? 'text-blue-400' :
            status === 'complete' ? 'text-green-400' :
            status === 'error' ? 'text-red-400' :
            'text-violet-400'
          }`} />
        </div>
        <div>
          <h3 className="text-sm font-medium text-slate-100">Discovery Agent</h3>
          <p className="text-xs text-slate-400">
            Scrape sources + cluster pain points → log evidence
          </p>
        </div>
      </div>

      {/* Progress */}
      {status === 'running' && (
        <div className="mb-4 rounded-lg bg-slate-900/50 p-3">
          <div className="text-xs font-medium text-blue-400 mb-1">Running...</div>
          <div className="text-xs text-slate-300">{progress}</div>
          <div className="mt-2 h-1 rounded-full bg-slate-800">
            <div className="h-1 rounded-full bg-blue-500 transition-all duration-300"
                 style={{ width: `${(results.length / mockSources.length) * 100}%` }} />
          </div>
        </div>
      )}

      {/* Error */}
      {status === 'error' && (
        <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3">
          <div className="text-xs font-medium text-red-400 mb-1">Error</div>
          <div className="text-xs text-slate-300">{error}</div>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-2">
            Discovered Pain Points ({results.reduce((sum, r) => sum + r.painPoints.length, 0)} total)
          </h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {results.map((result, i) => (
              <div key={i} className="rounded-lg bg-slate-900/30 p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-medium text-slate-300">{result.source}</div>
                  <span className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${
                    result.confidence === 'high' ? 'bg-green-500/20 text-green-400' :
                    result.confidence === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {result.confidence}
                  </span>
                </div>
                <ul className="space-y-1">
                  {result.painPoints.map((pain, j) => (
                    <li key={j} className="text-xs text-slate-400 flex items-start gap-2">
                      <span className="text-violet-400 mt-0.5">•</span>
                      <span>{pain}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action */}
      <div className="flex gap-2">
        <button
          onClick={runDiscovery}
          disabled={status === 'running'}
          className="flex-1 rounded-lg bg-violet-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === 'running' ? 'Running...' : 
           status === 'complete' ? 'Run Again' :
           'Start Discovery'}
        </button>
        
        {status === 'complete' && (
          <button
            onClick={() => {
              setStatus('idle')
              setResults([])
              setProgress('')
            }}
            className="rounded-lg border border-white/10 bg-slate-900/50 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-900"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  )
}
