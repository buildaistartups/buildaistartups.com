'use client'

import { useEffect, useState } from 'react'

type CheckinData = {
  energy: number
  clarity: number
  momentum: number
  blocker?: string
  ts: number
}

type FocusData = {
  focus1: string
  focus2: string
  focus3: string
  week: string
  ts: number
}

type WellnessData = {
  checkins: CheckinData[]
  trends: { energy?: string; clarity?: string; momentum?: string }
  summary?: {
    latest: CheckinData
    avgEnergy: number
    avgClarity: number
    avgMomentum: number
  }
}

export default function WellnessCheck({ 
  projectId,
  enabled = false 
}: { 
  projectId: string
  enabled?: boolean 
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [tab, setTab] = useState<'checkin' | 'focus'>('checkin')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  
  // Checkin state
  const [energy, setEnergy] = useState(5)
  const [clarity, setClarity] = useState(5)
  const [momentum, setMomentum] = useState(5)
  const [blocker, setBlocker] = useState('')
  const [wellnessData, setWellnessData] = useState<WellnessData | null>(null)
  
  // Focus state
  const [focus1, setFocus1] = useState('')
  const [focus2, setFocus2] = useState('')
  const [focus3, setFocus3] = useState('')
  const [currentFocus, setCurrentFocus] = useState<FocusData | null>(null)

  // Load wellness data when opening
  useEffect(() => {
    if (isOpen && tab === 'checkin') {
      loadWellnessData()
    }
    if (isOpen && tab === 'focus') {
      loadFocusData()
    }
  }, [isOpen, tab, projectId])

  const loadWellnessData = async () => {
    try {
      const res = await fetch(`/api/founder/checkin?projectId=${encodeURIComponent(projectId)}`)
      if (res.ok) {
        const data = await res.json()
        setWellnessData(data)
      }
    } catch (err) {
      console.warn('Failed to load wellness data:', err)
    }
  }

  const loadFocusData = async () => {
    try {
      const res = await fetch(`/api/founder/focus?projectId=${encodeURIComponent(projectId)}`)
      if (res.ok) {
        const data = await res.json()
        if (data.current) {
          setCurrentFocus(data.current)
          setFocus1(data.current.focus1)
          setFocus2(data.current.focus2)
          setFocus3(data.current.focus3)
        }
      }
    } catch (err) {
      console.warn('Failed to load focus data:', err)
    }
  }

  const submitCheckin = async () => {
    if (loading) return
    
    setLoading(true)
    try {
      const res = await fetch('/api/founder/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          energy,
          clarity,
          momentum,
          blocker: blocker.trim() || undefined
        })
      })

      if (res.ok) {
        setToast('Check-in saved')
        setBlocker('')
        loadWellnessData() // Refresh
        setTimeout(() => setToast(null), 3000)
      } else {
        const err = await res.json()
        setToast(err.error || 'Failed to save check-in')
        setTimeout(() => setToast(null), 3000)
      }
    } catch (err) {
      setToast('Network error')
      setTimeout(() => setToast(null), 3000)
    } finally {
      setLoading(false)
    }
  }

  const submitFocus = async () => {
    if (loading || !focus1.trim() || !focus2.trim() || !focus3.trim()) return
    
    setLoading(true)
    try {
      const res = await fetch('/api/founder/focus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          focus1: focus1.trim(),
          focus2: focus2.trim(),
          focus3: focus3.trim()
        })
      })

      if (res.ok) {
        setToast('Weekly focus saved')
        loadFocusData() // Refresh
        setTimeout(() => setToast(null), 3000)
      } else {
        const err = await res.json()
        setToast(err.error || 'Failed to save focus')
        setTimeout(() => setToast(null), 3000)
      }
    } catch (err) {
      setToast('Network error')
      setTimeout(() => setToast(null), 3000)
    } finally {
      setLoading(false)
    }
  }

  const getTrendIcon = (trend?: string) => {
    if (trend === 'up') return '↗️'
    if (trend === 'down') return '↘️'
    return '→'
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400'
    if (score >= 6) return 'text-yellow-300'
    return 'text-orange-400'
  }

  if (!enabled) return null

  return (
    <>
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 rounded-lg bg-slate-800 border border-white/10 px-4 py-2 text-sm text-slate-200">
          {toast}
        </div>
      )}

      {/* Toggle Button */}
      <div className="mt-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/50 px-3 py-2 text-sm text-slate-300 hover:bg-white/5 transition-colors"
        >
          <span className="text-base">🧘</span>
          <span>Wellness</span>
          <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
      </div>

      {/* Wellness Panel */}
      {isOpen && (
        <div className="mt-4 rounded-xl border border-white/10 bg-slate-900/30 p-6">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-lg font-semibold">Founder Wellness</h3>
            <div className="flex rounded-lg border border-white/10 bg-slate-900/50 p-1">
              <button
                onClick={() => setTab('checkin')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  tab === 'checkin' 
                    ? 'bg-violet-500 text-white' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Check-in
              </button>
              <button
                onClick={() => setTab('focus')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  tab === 'focus' 
                    ? 'bg-violet-500 text-white' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Focus
              </button>
            </div>
          </div>

          {/* Check-in Tab */}
          {tab === 'checkin' && (
            <div className="space-y-6">
              {/* Current Scores */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Energy Level
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={energy}
                    onChange={(e) => setEnergy(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>Drained</span>
                    <span className={getScoreColor(energy)}>{energy}</span>
                    <span>Energized</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Mental Clarity
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={clarity}
                    onChange={(e) => setClarity(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>Foggy</span>
                    <span className={getScoreColor(clarity)}>{clarity}</span>
                    <span>Clear</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Momentum
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={momentum}
                    onChange={(e) => setMomentum(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>Stuck</span>
                    <span className={getScoreColor(momentum)}>{momentum}</span>
                    <span>Moving</span>
                  </div>
                </div>
              </div>

              {/* Blocker */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  What's blocking you? (optional)
                </label>
                <textarea
                  value={blocker}
                  onChange={(e) => setBlocker(e.target.value)}
                  placeholder="Decision fatigue, unclear priorities, technical debt..."
                  className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-200 placeholder-slate-500 outline-none resize-none"
                  rows={2}
                />
              </div>

              {/* Trends */}
              {wellnessData?.trends && (
                <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-slate-900/50">
                  <div className="text-center">
                    <div className="text-xs text-slate-400">Energy Trend</div>
                    <div className="text-lg">{getTrendIcon(wellnessData.trends.energy)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-400">Clarity Trend</div>
                    <div className="text-lg">{getTrendIcon(wellnessData.trends.clarity)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-400">Momentum Trend</div>
                    <div className="text-lg">{getTrendIcon(wellnessData.trends.momentum)}</div>
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                onClick={submitCheckin}
                disabled={loading}
                className="w-full rounded-lg bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-400 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Saving...' : 'Save Check-in'}
              </button>
            </div>
          )}

          {/* Focus Tab */}
          {tab === 'focus' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-4">
                  Top 3 priorities this week
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Priority #1</label>
                    <input
                      type="text"
                      value={focus1}
                      onChange={(e) => setFocus1(e.target.value)}
                      placeholder="Most important thing to achieve"
                      className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-200 placeholder-slate-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Priority #2</label>
                    <input
                      type="text"
                      value={focus2}
                      onChange={(e) => setFocus2(e.target.value)}
                      placeholder="Second priority"
                      className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-200 placeholder-slate-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Priority #3</label>
                    <input
                      type="text"
                      value={focus3}
                      onChange={(e) => setFocus3(e.target.value)}
                      placeholder="Third priority"
                      className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-200 placeholder-slate-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Current Focus Display */}
              {currentFocus && (
                <div className="p-4 rounded-lg bg-slate-900/50">
                  <div className="text-xs text-slate-400 mb-2">
                    Current week focus (Week {currentFocus.week})
                  </div>
                  <ol className="text-sm text-slate-200 space-y-1">
                    <li>1. {currentFocus.focus1}</li>
                    <li>2. {currentFocus.focus2}</li>
                    <li>3. {currentFocus.focus3}</li>
                  </ol>
                </div>
              )}

              {/* Submit */}
              <button
                onClick={submitFocus}
                disabled={loading || !focus1.trim() || !focus2.trim() || !focus3.trim()}
                className="w-full rounded-lg bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-400 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Saving...' : 'Save Weekly Focus'}
              </button>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </>
  )
}
