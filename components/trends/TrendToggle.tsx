'use client'

import { useState, useEffect } from 'react'
import { ChevronDownIcon, ChevronRightIcon, SparklesIcon, BoltIcon, ShieldCheckIcon, CubeIcon, TrendingUpIcon } from '@heroicons/react/24/outline'
import { TREND_PRESETS, type TrendId, type TrendPreset } from '@/lib/trends'

export interface TrendToggleProps {
  /** Current selected trends - controlled */
  selected?: TrendId[]
  /** Callback when trends change */
  onChange?: (trends: TrendId[]) => void
  /** Show as expanded by default */
  defaultExpanded?: boolean
  /** Custom styling */
  className?: string
}

const trendIcons: Record<TrendId, React.ComponentType<any>> = {
  'gen-ai': SparklesIcon,
  'agents': BoltIcon,
  'compliance-heavy': ShieldCheckIcon,
  'low-code-saas': CubeIcon,
  'bootstrapper': TrendingUpIcon,
}

const trendColors: Record<TrendId, string> = {
  'gen-ai': 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  'agents': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  'compliance-heavy': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  'low-code-saas': 'text-green-400 bg-green-500/10 border-green-500/20',
  'bootstrapper': 'text-pink-400 bg-pink-500/10 border-pink-500/20',
}

export default function TrendToggle({
  selected = [],
  onChange,
  defaultExpanded = false,
  className = '',
}: TrendToggleProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const [localSelected, setLocalSelected] = useState<TrendId[]>(selected)

  // Sync with external state changes
  useEffect(() => {
    setLocalSelected(selected)
  }, [selected])

  const handleToggle = (trendId: TrendId) => {
    const newSelection = localSelected.includes(trendId)
      ? localSelected.filter(id => id !== trendId)
      : [...localSelected, trendId]
    
    setLocalSelected(newSelection)
    onChange?.(newSelection)
  }

  const handlePresetApply = (preset: TrendPreset) => {
    setLocalSelected(preset.trends)
    onChange?.(preset.trends)
  }

  const selectedCount = localSelected.length

  return (
    <div className={`rounded-lg border border-white/10 bg-slate-950/40 ${className}`}>
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between p-4 text-left transition hover:bg-white/5"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/20">
            <SparklesIcon className="h-4 w-4 text-violet-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-100">Current Trends</h3>
            <p className="text-xs text-slate-400">
              Shape your quiz defaults {selectedCount > 0 && `• ${selectedCount} selected`}
            </p>
          </div>
        </div>
        {expanded ? (
          <ChevronDownIcon className="h-4 w-4 text-slate-400" />
        ) : (
          <ChevronRightIcon className="h-4 w-4 text-slate-400" />
        )}
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-white/10 p-4">
          {/* Quick Presets */}
          <div className="mb-4">
            <h4 className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-2">
              Quick Presets
            </h4>
            <div className="flex flex-wrap gap-2">
              {Object.values(TREND_PRESETS).map(preset => (
                <button
                  key={preset.id}
                  onClick={() => handlePresetApply(preset)}
                  className="rounded-full border border-white/10 bg-slate-900/50 px-3 py-1 text-xs font-medium text-slate-300 transition hover:bg-white/5 hover:text-slate-100"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Individual Trends */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-2">
              Individual Trends
            </h4>
            <div className="space-y-2">
              {Object.values(TREND_PRESETS).flatMap(p => p.trends)
                .filter((trend, index, arr) => arr.indexOf(trend) === index) // unique
                .map(trendId => {
                  const Icon = trendIcons[trendId]
                  const isSelected = localSelected.includes(trendId)
                  const colors = trendColors[trendId]
                  
                  return (
                    <label
                      key={trendId}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition ${
                        isSelected 
                          ? colors
                          : 'border-white/10 bg-slate-900/30 hover:bg-slate-900/50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggle(trendId)}
                        className="sr-only"
                      />
                      <div className={`flex h-6 w-6 items-center justify-center rounded ${
                        isSelected ? 'bg-current/20' : 'bg-slate-800'
                      }`}>
                        <Icon className={`h-3.5 w-3.5 ${
                          isSelected ? 'text-current' : 'text-slate-500'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm font-medium ${
                          isSelected ? 'text-current' : 'text-slate-200'
                        }`}>
                          {trendId.split('-').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </div>
                        <div className={`text-xs ${
                          isSelected ? 'text-current/70' : 'text-slate-400'
                        }`}>
                          Affects quiz scoring and plan suggestions
                        </div>
                      </div>
                    </label>
                  )
                })}
            </div>
          </div>

          {/* Applied Summary */}
          {selectedCount > 0 && (
            <div className="mt-4 rounded-lg bg-slate-900/50 p-3">
              <div className="text-xs font-medium text-slate-300 mb-1">
                Applied Trends ({selectedCount})
              </div>
              <div className="flex flex-wrap gap-1">
                {localSelected.map(trend => (
                  <span 
                    key={trend}
                    className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${trendColors[trend]}`}
                  >
                    {trend.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
