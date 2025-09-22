'use client'

import { useEffect, useState, useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

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

export default function LeaderboardClient() {
  const [data, setData] = useState<LeaderboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // Get current tab and filters from URL
  const activeTab = searchParams.get('tab') || 'overall'
  const activeVertical = searchParams.get('vertical')
  const activeStack = searchParams.get('stack')
  
  // Fetch leaderboard data
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (activeVertical) params.set('vertical', activeVertical)
        if (activeStack) params.set('stack', activeStack)
        
        const response = await fetch(`/api/leaderboard?${params}`)
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
    
    switch (activeTab) {
      case 'vertical':
        return data.items // already filtered by API if vertical param set
      case 'stack':
        return data.items // already filtered by API if stack param set
      default:
        return data.items
    }
  }, [data, activeTab])
  
  // Update URL when tab changes
  const handleTabChange = (tab: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('tab', tab)
    router.push(`${pathname}?${params}`)
  }
  
  // Update URL when filter changes
  const handleFilterChange = (type: 'vertical' | 'stack', value: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set(type, value)
    } else {
      params.delete(type)
    }
    router.push(`${pathname}?${params}`)
  }
  
  if (loading) return <div className="text-center py-12">Loading leaderboard...</div>
  if (error) return <div className="text-red-400 text-center py-12">Error: {error}</div>
  if (!data) return <div className="text-center py-12">No data available</div>
  
  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10">
        <TabButton 
          active={activeTab === 'overall'} 
          onClick={() => handleTabChange('overall')}
        >
          Top Overall
        </TabButton>
        <TabButton 
          active={activeTab === 'vertical'} 
          onClick={() => handleTabChange('vertical')}
        >
          Top by Vertical
        </TabButton>
        <TabButton 
          active={activeTab === 'stack'} 
          onClick={() => handleTabChange('stack')}
        >
          Top by Stack
        </TabButton>
      </div>
      
      {/* Filters */}
      {(activeTab === 'vertical' || activeTab === 'stack') && (
        <div className="flex gap-4 items-center">
          {activeTab === 'vertical' && (
            <FilterSelect
              label="Vertical"
              value={activeVertical || ''}
              options={data.facets.verticals}
              onChange={(value) => handleFilterChange('vertical', value)}
            />
          )}
          {activeTab === 'stack' && (
            <FilterSelect
              label="Tech Stack"
              value={activeStack || ''}
              options={data.facets.stacks}
              onChange={(value) => handleFilterChange('stack', value)}
            />
          )}
        </div>
      )}
      
      {/* Table */}
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
                    No projects found for current filters
                  </td>
                </tr>
              ) : (
                filteredItems.map((item, index) => (
                  <tr key={item.projectId} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-sm text-slate-300">
                      {index + 1}
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
                              item.displayName
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
                          <div className="text-xs text-slate-400">
                            {item.vertical} • {item.stack.join(', ') || 'Unknown stack'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-medium ${getScoreColor(item.score)}`}>
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
      
      <p className="text-xs text-slate-500 text-center">
        Showing {filteredItems.length} of {data.total} projects. 
        Scores update when projects submit build reports and evidence.
      </p>
    </div>
  )
}

function TabButton({ 
  active, 
  onClick, 
  children 
}: { 
  active: boolean
  onClick: () => void
  children: React.ReactNode 
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-t border-b-2 transition-colors ${
        active
          ? 'text-violet-400 border-violet-400 bg-slate-900/40'
          : 'text-slate-400 border-transparent hover:text-slate-300 hover:border-slate-600'
      }`}
    >
      {children}
    </button>
  )
}

function FilterSelect({
  label,
  value,
  options,
  onChange
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string | null) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-slate-300">{label}:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value || null)}
        className="px-3 py-1 text-sm bg-slate-800 border border-white/10 rounded text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
      >
        <option value="">All</option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-400'
  if (score >= 60) return 'text-yellow-400'
  if (score >= 40) return 'text-orange-400'
  return 'text-red-400'
}
