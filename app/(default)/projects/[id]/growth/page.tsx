// app/(default)/projects/[id]/growth/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

type Channel = 'seo' | 'social' | 'email' | 'partnerships' | 'ads' | 'community'
type PipelineStage = 'lead' | 'trial' | 'paid'

interface CalendarDay {
  day: number
  date: string
  tasks: Array<{
    id: string
    type: 'content' | 'outreach' | 'optimization' | 'analysis'
    title: string
    description: string
    channel: Channel
    effort: 'low' | 'medium' | 'high'
    expected: string
  }>
}

interface PipelineEntry {
  id: string
  name: string
  email?: string
  company?: string
  stage: PipelineStage
  source: string
  value: number
  probability: number
  notes?: string
  createdAt: number
  updatedAt: number
}

const CHANNEL_OPTIONS = [
  { value: 'seo', label: 'SEO & Content' },
  { value: 'social', label: 'Social Media' },
  { value: 'email', label: 'Email Marketing' },
  { value: 'partnerships', label: 'Partnerships' },
  { value: 'ads', label: 'Paid Ads' },
  { value: 'community', label: 'Community' }
]

const EFFORT_COLORS = {
  low: 'bg-green-500/20 text-green-300',
  medium: 'bg-yellow-500/20 text-yellow-300',
  high: 'bg-red-500/20 text-red-300'
}

const STAGE_COLORS = {
  lead: 'bg-blue-500/20 text-blue-300',
  trial: 'bg-yellow-500/20 text-yellow-300',
  paid: 'bg-green-500/20 text-green-300'
}

export default function GrowthPage() {
  const params = useParams()
  const projectId = params.id as string
  
  const [selectedChannels, setSelectedChannels] = useState<Channel[]>(['seo', 'social'])
  const [calendar, setCalendar] = useState<CalendarDay[]>([])
  const [pipeline, setPipeline] = useState<PipelineEntry[]>([])
  const [pipelineStats, setPipelineStats] = useState<any>({})
  const [growthScore, setGrowthScore] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [showAddPipeline, setShowAddPipeline] = useState(false)
  const [viewMode, setViewMode] = useState<'calendar' | 'pipeline'>('calendar')
  
  const [newPipelineEntry, setNewPipelineEntry] = useState({
    name: '',
    email: '',
    company: '',
    stage: 'lead' as PipelineStage,
    source: '',
    value: 0,
    probability: 50,
    notes: ''
  })

  useEffect(() => {
    loadCalendar()
    loadPipeline()
    loadGrowthScore()
  }, [selectedChannels, projectId])

  const loadCalendar = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/growth/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channels: selectedChannels,
          vertical: 'saas',
          projectId
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        setCalendar(data.calendar || [])
      }
    } catch (error) {
      console.error('Failed to load calendar:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadPipeline = async () => {
    try {
      const response = await fetch(`/api/growth/pipeline?projectId=${projectId}`)
      if (response.ok) {
        const data = await response.json()
        setPipeline(data.entries || [])
        setPipelineStats(data.stats || {})
      }
    } catch (error) {
      console.error('Failed to load pipeline:', error)
    }
  }

  const loadGrowthScore = async () => {
    try {
      const response = await fetch(`/api/score/growth?projectId=${projectId}`)
      if (response.ok) {
        const data = await response.json()
        setGrowthScore(data.score || 0)
      }
    } catch (error) {
      console.error('Failed to load growth score:', error)
    }
  }

  const addPipelineEntry = async () => {
    try {
      const response = await fetch('/api/growth/pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newPipelineEntry, projectId })
      })
      
      if (response.ok) {
        await loadPipeline()
        await loadGrowthScore()
        setShowAddPipeline(false)
        setNewPipelineEntry({
          name: '',
          email: '',
          company: '',
          stage: 'lead',
          source: '',
          value: 0,
          probability: 50,
          notes: ''
        })
      }
    } catch (error) {
      console.error('Failed to add pipeline entry:', error)
    }
  }

  const handleChannelChange = (channel: Channel, checked: boolean) => {
    if (checked) {
      if (selectedChannels.length < 2) {
        setSelectedChannels([...selectedChannels, channel])
      }
    } else {
      setSelectedChannels(selectedChannels.filter(c => c !== channel))
    }
  }

  return (
    <main className="bg-slate-950 text-slate-200 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Growth</h1>
            <p className="text-slate-400 mt-1">30-day calendar, channel strategy, and sales pipeline</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">{growthScore}</div>
              <div className="text-xs text-slate-400">Growth Score</div>
            </div>
          </div>
        </div>

        {/* Channel Picker */}
        <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Focus Channels (Pick 2)</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {CHANNEL_OPTIONS.map(option => (
              <label
                key={option.value}
                className={`
                  flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors
                  ${selectedChannels.includes(option.value as Channel)
                    ? 'border-violet-500 bg-violet-500/10' 
                    : 'border-white/10 hover:border-white/20'
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={selectedChannels.includes(option.value as Channel)}
                  onChange={(e) => handleChannelChange(option.value as Channel, e.target.checked)}
                  disabled={!selectedChannels.includes(option.value as Channel) && selectedChannels.length >= 2}
                  className="rounded"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-4 py-2 rounded-lg ${
              viewMode === 'calendar' ? 'bg-violet-500 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            30-Day Calendar
          </button>
          <button
            onClick={() => setViewMode('pipeline')}
            className={`px-4 py-2 rounded-lg ${
              viewMode === 'pipeline' ? 'bg-violet-500 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Sales Pipeline
          </button>
        </div>

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
            <h2 className="text-xl font-semibold mb-4">30-Day Content Calendar</h2>
            {loading ? (
              <div className="text-center py-8">Loading calendar...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {calendar.slice(0, 10).map(day => (
                  <div key={day.day} className="border border-white/10 rounded-lg p-4">
                    <div className="font-medium mb-2">Day {day.day}</div>
                    <div className="text-xs text-slate-400 mb-3">{day.date}</div>
                    <div className="space-y-2">
                      {day.tasks.map(task => (
                        <div
                          key={task.id}
                          className="text-xs p-2 rounded border border-white/10"
                        >
                          <div className="font-medium">{task.title}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-1 rounded text-xs ${EFFORT_COLORS[task.effort]}`}>
                              {task.effort}
                            </span>
                            <span className="text-slate-400">{task.channel}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Pipeline View */}
        {viewMode === 'pipeline' && (
          <div className="space-y-6">
            {/* Pipeline Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
                <div className="text-2xl font-bold">{pipelineStats.total || 0}</div>
                <div className="text-sm text-slate-400">Total Leads</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
                <div className="text-2xl font-bold text-green-400">
                  ${Math.round(pipelineStats.totalValue || 0).toLocaleString()}
                </div>
                <div className="text-sm text-slate-400">Pipeline Value</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
                <div className="text-2xl font-bold text-blue-400">
                  {Math.round(pipelineStats.winRate || 0)}%
                </div>
                <div className="text-sm text-slate-400">Win Rate</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
                <div className="text-2xl font-bold text-purple-400">
                  ${Math.round(pipelineStats.avgDeal || 0).toLocaleString()}
                </div>
                <div className="text-sm text-slate-400">Avg Deal</div>
              </div>
            </div>

            {/* Add Pipeline Entry */}
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Sales Pipeline</h2>
                <button
                  onClick={() => setShowAddPipeline(true)}
                  className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-400 transition-colors"
                >
                  Add Entry
                </button>
              </div>

              {showAddPipeline && (
                <div className="mb-6 p-4 border border-white/10 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Name"
                      value={newPipelineEntry.name}
                      onChange={(e) => setNewPipelineEntry({...newPipelineEntry, name: e.target.value})}
                      className="px-3 py-2 bg-slate-800 border border-white/10 rounded-lg"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={newPipelineEntry.email}
                      onChange={(e) => setNewPipelineEntry({...newPipelineEntry, email: e.target.value})}
                      className="px-3 py-2 bg-slate-800 border border-white/10 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Company"
                      value={newPipelineEntry.company}
                      onChange={(e) => setNewPipelineEntry({...newPipelineEntry, company: e.target.value})}
                      className="px-3 py-2 bg-slate-800 border border-white/10 rounded-lg"
                    />
                    <select
                      value={newPipelineEntry.stage}
                      onChange={(e) => setNewPipelineEntry({...newPipelineEntry, stage: e.target.value as PipelineStage})}
                      className="px-3 py-2 bg-slate-800 border border-white/10 rounded-lg"
                    >
                      <option value="lead">Lead</option>
                      <option value="trial">Trial</option>
                      <option value="paid">Paid</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Source"
                      value={newPipelineEntry.source}
                      onChange={(e) => setNewPipelineEntry({...newPipelineEntry, source: e.target.value})}
                      className="px-3 py-2 bg-slate-800 border border-white/10 rounded-lg"
                    />
                    <input
                      type="number"
                      placeholder="Deal Value ($)"
                      value={newPipelineEntry.value}
                      onChange={(e) => setNewPipelineEntry({...newPipelineEntry, value: Number(e.target.value)})}
                      className="px-3 py-2 bg-slate-800 border border-white/10 rounded-lg"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={addPipelineEntry}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 transition-colors"
                    >
                      Add Entry
                    </button>
                    <button
                      onClick={() => setShowAddPipeline(false)}
                      className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Pipeline Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Company</th>
                      <th className="text-left py-3 px-4">Stage</th>
                      <th className="text-left py-3 px-4">Source</th>
                      <th className="text-left py-3 px-4">Value</th>
                      <th className="text-left py-3 px-4">Probability</th>
                      <th className="text-left py-3 px-4">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pipeline.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-slate-400">
                          No pipeline entries yet. Add your first lead!
                        </td>
                      </tr>
                    )}
                    {pipeline.map(entry => (
                      <tr key={entry.id} className="border-b border-white/10 hover:bg-white/5">
                        <td className="py-3 px-4">
                          <div className="font-medium">{entry.name}</div>
                          {entry.email && (
                            <div className="text-sm text-slate-400">{entry.email}</div>
                          )}
                        </td>
                        <td className="py-3 px-4 text-sm">{entry.company || '—'}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs ${STAGE_COLORS[entry.stage]}`}>
                            {entry.stage}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm">{entry.source || '—'}</td>
                        <td className="py-3 px-4 text-sm">${entry.value.toLocaleString()}</td>
                        <td className="py-3 px-4 text-sm">{entry.probability}%</td>
                        <td className="py-3 px-4 text-sm">
                          {new Date(entry.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
