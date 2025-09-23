'use client'

import { useEffect, useState, useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

type LeaderboardItem = {
  projectId: string
  displayName: string
  score: number
  parts: {
    product: number
    traction: number
    ai: number
    finance: number
  }
  updatedAt: number
  commit?: string
  vertical: string
  stack: string[]
  homepage?: string
  logoUrl?: string
  flags: {
    hasRecentEval: boolean
    financeReadiness: boolean
  }
}

type LeaderboardData = {
  items: LeaderboardItem[]
  facets: {
    verticals: string[]
    stacks: string[]
  }
  total: number
}

type TabKey = 'overall' | 'vertical' | 'stack'

export default function LeaderboardClient() {
  const [data, setData] = useState<LeaderboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // Get current tab and filters from URL with proper defaults
  const activeTab = (searchParams.get('tab') as TabKey) || 'overall'
  const activeVertical = searchParams.get('vertical') || ''
  const activeStack = searchParams.get('stack') || ''
  
  // Update URL helper function
  function updateUrl(updates: Partial<{ tab: TabKey; vertical: string; stack: string }>) {
    const params = new URLSearchParams(searchParams.toString())
    
    if (updates.tab !== undefined) {
      params.set('tab', updates.tab)
    }
    if (updates.vertical !== undefined) {
      updates.vertical ? params.set('vertical', updates.vertical) : params.delete('vertical')
    }
    if (updates.stack !== undefined) {
      updates.stack ? params.set('stack', updates.stack) : params.delete('stack')
    }
    
    router.replace(`${pathname}?${params.toString()}`)
  }
  
  // Fetch leaderboard data
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (activeVertical) params.set('vertical', activeVertical)
        if (activeStack) params.set('stack', activeStack)
        
        const response = await fetch(`/api/leaderboard?${params}`, {
          cache: 'no-store'
        })
        if (!response.ok) throw new Error('Failed to fetch leaderboard')
        
        const result = await response.json()
        setData(result)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [activeVertical, activeStack])
  
  // Filter data based on active tab
  const filteredItems = useMemo(() => {
    if (!data) return []
    return data.items // API already handles filtering
  }, [data])
  
  // Handle tab changes with filter reset logic
  const handleTabChange = (newTab: TabKey) => {
    if (newTab === 'overall') {
      // Reset all filters for overall view
      updateUrl({ tab: newTab, vertical: '', stack: '' })
    } else if (newTab === 'vertical') {
      // Keep vertical filter, clear stack
      updateUrl({ tab: newTab, stack: '' })
    } else if (newTab === 'stack') {
      // Keep stack filter, clear vertical
      updateUrl({ tab: newTab, vertical: '' })
    } else {
      updateUrl({ tab: newTab })
    }
  }
  
  // Handle filter changes
  const handleFilterChange = (type: 'vertical' | 'stack', value: string | null) => {
    updateUrl({ [type]: value || '' })
  }
  
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
        <p className="mt-3 text-slate-400">Loading leaderboard...</p>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="text-red-400 text-center py-12 space-y-2">
        <p>Error loading leaderboard: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="text-sm text-violet-400 hover:text-violet-300 underline"
        >
          Try again
        </button>
      </div>
    )
  }
  
  if (!data) {
    return <div className="text-center py-12 text-slate-400">No data available</div>
  }
  
  return (
    <div className="space-y-6">
      {/* Enhanced Tabs */}
      <div className="border-b border-white/10">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'overall' as TabKey, label: 'Top Overall', desc: 'All projects ranked by Build Score' },
            { key: 'vertical' as TabKey, label: 'Top by Vertical', desc: 'Filter by AI vertical' },
            { key: 'stack' as TabKey, label: 'Top by Stack', desc: 'Filter by technology stack' },
          ].map(({ key, label, desc }) => (
            <button
              key={key}
              onClick={() => handleTabChange(key)}
              className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === key
                  ? 'border-violet-500 text-violet-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-300'
              }`}
              title={desc}
            >
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
      
      {/* Enhanced Filters */}
      {(activeTab === 'vertical' || activeTab === 'stack') && (
        <div className="flex flex-wrap items-center gap-4">
          {activeTab === 'vertical' && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Filter by Vertical
              </label>
              <select
                value={activeVertical}
                onChange={(e) => handleFilterChange('vertical', e.target.value || null)}
                className="rounded-md border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-200 min-w-[160px] focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              >
                <option value="">All verticals</option>
                {data.facets.verticals.map(vertical => (
                  <option key={vertical} value={vertical}>
                    {vertical.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {activeTab === 'stack' && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Filter by Tech Stack
              </label>
              <select
                value={activeStack}
                onChange={(e) => handleFilterChange('stack', e.target.value || null)}
                className="rounded-md border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-200 min-w-[160px] focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              >
                <option value="">All stacks</option>
                {data.facets.stacks.map(stack => (
                  <option key={stack} value={stack}>
                    {stack}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
      
      {/* Enhanced Table */}
      <div className="rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-slate-900/60">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Traction
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  AI
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Finance
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Updated
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-900/30 divide-y divide-white/10">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-400">
                    <div className="space-y-2">
                      <p>No projects found for current filters</p>
                      <p className="text-xs">
                        {activeTab !== 'overall' ? 'Try adjusting your filters or ' : ''}
                        Build and submit your first Build Score to appear here!
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredItems.map((item, index) => (
                  <tr key={item.projectId} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-slate-100">
                      #{index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-medium text-slate-200 flex items-center gap-2">
                            {item.homepage ? (
                              <a 
                                href={item.homepage} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-violet-400 transition-colors"
                              >
                                {item.displayName}
                              </a>
                            ) : (
                              <Link 
                                href={`/investor/${encodeURIComponent(item.projectId)}`}
                                className="hover:text-violet-400 transition-colors"
                              >
                                {item.displayName}
                              </Link>
                            )}
                            {item.flags.hasRecentEval && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-green-500/20 text-green-300">
                                AI Eval
                              </span>
                            )}
                            {item.flags.financeReadiness && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-500/20 text-blue-300">
                                Finance
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-400 mt-1">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 mr-2">
                              {item.vertical.replace(/-/g, ' ')}
                            </span>
                            <span className="text-slate-500">
                              {item.stack.slice(0, 3).join(', ')}
                              {item.stack.length > 3 && ` +${item.stack.length - 3}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-bold ${getScoreColor(item.score)}`}>
                        {item.score}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">
                      {Math.round(item.parts.product)}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">
                      {Math.round(item.parts.traction)}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">
                      {Math.round(item.parts.ai)}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">
                      {Math.round(item.parts.finance)}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400">
                      {new Date(item.updatedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Enhanced Footer */}
      <div className="text-center space-y-2">
        <p className="text-xs text-slate-500">
          Showing {filteredItems.length} of {data.total} projects. 
          Scores update when projects submit build reports and evidence.{' '}
          <Link href="/docs/build-score" className="text-violet-400 hover:text-violet-300 transition-colors">
            Learn more
          </Link>
        </p>
        <p className="text-xs text-slate-500">
          Share rankings: copy URL with filters • API:{' '}
          <code className="ml-1 rounded bg-slate-800 px-1.5 py-0.5 text-violet-300">
            /api/leaderboard?vertical=ai-support&stack=nextjs
          </code>
        </p>
      </div>
    </div>
  )
}

function getScoreColor(score: number): string {
  if (score >= 90) return 'text-green-400'
  if (score >= 75) return 'text-yellow-400'
  if (score >= 60) return 'text-orange-400'
  return 'text-red-400'
}
