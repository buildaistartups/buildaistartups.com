'use client'

import { useState } from 'react'
import { Settings, AlertTriangle, CheckCircle, Clock, Wrench } from 'lucide-react'

interface OpsTask {
  id: string
  name: string
  description: string
  estimatedDuration: number // minutes
  integrations: string[]
  outputs: string[]
}

interface OpsResult {
  taskId: string
  success: boolean
  duration: number
  outputs: Array<{
    type: string
    description: string
    mockData?: any
  }>
  logs: string[]
}

interface OpsAgentProps {
  projectId: string
  onComplete?: (result: OpsResult) => void
  className?: string
}

const AVAILABLE_TASKS: OpsTask[] = [
  {
    id: 'setup-analytics',
    name: 'Setup Analytics Tracking',
    description: 'Configure event tracking, conversion funnels, and dashboard alerts',
    estimatedDuration: 8,
    integrations: ['Google Analytics', 'Mixpanel', 'Vercel Analytics'],
    outputs: ['Event schema', 'Dashboard config', 'Alert rules']
  },
  {
    id: 'optimize-images',
    name: 'Optimize Site Performance',
    description: 'Compress images, analyze bundle size, implement caching headers',
    estimatedDuration: 12,
    integrations: ['Cloudinary', 'Vercel', 'Lighthouse CI'],
    outputs: ['Performance report', 'Optimization diff', 'CDN config']
  },
  {
    id: 'backup-setup',
    name: 'Setup Automated Backups',
    description: 'Configure database backups, file storage sync, and recovery procedures',
    estimatedDuration: 15,
    integrations: ['AWS S3', 'Supabase', 'GitHub Actions'],
    outputs: ['Backup schedule', 'Recovery scripts', 'Monitoring alerts']
  },
  {
    id: 'security-audit',
    name: 'Security Hardening',
    description: 'Scan for vulnerabilities, update dependencies, configure security headers',
    estimatedDuration: 20,
    integrations: ['Snyk', 'OWASP ZAP', 'Security Headers'],
    outputs: ['Vulnerability report', 'Fix recommendations', 'Security config']
  },
  {
    id: 'deploy-pipeline',
    name: 'CI/CD Pipeline Setup',
    description: 'Configure automated testing, staging deployments, and rollback procedures',
    estimatedDuration: 25,
    integrations: ['GitHub Actions', 'Vercel', 'Jest', 'Playwright'],
    outputs: ['Pipeline config', 'Test reports', 'Deployment logs']
  }
]

export default function OpsAgent({ 
  projectId, 
  onComplete,
  className = '' 
}: OpsAgentProps) {
  const [status, setStatus] = useState<'idle' | 'running' | 'complete' | 'error'>('idle')
  const [selectedTask, setSelectedTask] = useState<OpsTask | null>(null)
  const [progress, setProgress] = useState('')
  const [result, setResult] = useState<OpsResult | null>(null)

  const executeTask = async (task: OpsTask) => {
    setStatus('running')
    setSelectedTask(task)
    setResult(null)

    const startTime = Date.now()
    const logs: string[] = []

    try {
      // Mock task execution with realistic steps
      const steps = [
        'Initializing task environment...',
        'Connecting to integrations...',
        'Analyzing current configuration...',
        'Applying optimizations...',
        'Running validation checks...',
        'Generating reports...',
        'Finalizing configuration...'
      ]

      for (let i = 0; i < steps.length; i++) {
        const step = steps[i]
        setProgress(step)
        logs.push(`[${new Date().toLocaleTimeString()}] ${step}`)
        
        // Variable delay based on step complexity
        const delay = 800 + Math.random() * 1200 + (i * 200)
        await new Promise(resolve => setTimeout(resolve, delay))
      }

      // Generate mock outputs based on task type
      const outputs = task.outputs.map((output) => ({
        type: output,
        description: generateMockOutput(task.id, output),
        mockData: generateMockData(task.id, output)
      }))

      const duration = Math.floor((Date.now() - startTime) / 1000)
      
      const taskResult: OpsResult = {
        taskId: task.id,
        success: Math.random() > 0.1, // 90% success rate
        duration,
        outputs,
        logs
      }

      setResult(taskResult)

      // Log to Evidence Ledger
      await fetch('/api/evidence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          type: 'deploy',
          title: `Ops Agent: ${task.name}`,
          detail: taskResult.success 
            ? `Successfully completed in ${duration}s. Generated ${outputs.length} outputs.`
            : `Task failed after ${duration}s. Check logs for details.`,
          meta: {
            agentType: 'ops',
            taskId: task.id,
            success: taskResult.success,
            duration,
            integrations: task.integrations,
            outputCount: outputs.length
          }
        })
      })

      setStatus(taskResult.success ? 'complete' : 'error')
      onComplete?.(taskResult)

    } catch (err) {
      const duration = Math.floor((Date.now() - startTime) / 1000)
      const errorResult: OpsResult = {
        taskId: task.id,
        success: false,
        duration,
        outputs: [],
        logs: [...logs, `[ERROR] ${err instanceof Error ? err.message : 'Unknown error'}`]
      }
      
      setResult(errorResult)
      setStatus('error')
    }
  }

  const generateMockOutput = (taskId: string, output: string): string => {
    const outputs: Record<string, Record<string, string>> = {
      'setup-analytics': {
        'Event schema': 'Configured 12 key events: page_view, sign_up, subscription_start, etc.',
        'Dashboard config': 'Created conversion funnel with 3 stages, 85% completion rate',
        'Alert rules': 'Set up 5 alerts for conversion drops, traffic spikes, and error rates'
      },
      'optimize-images': {
        'Performance report': 'Lighthouse score improved from 76 to 94. LCP reduced by 1.2s',
        'Optimization diff': 'Compressed 47 images (2.1MB → 580KB). Implemented WebP fallbacks',
        'CDN config': 'Configured edge caching with 97% hit rate, 45ms avg response time'
      },
      'backup-setup': {
        'Backup schedule': 'Daily DB snapshots at 2 AM UTC, file sync every 4 hours',
        'Recovery scripts': 'Created point-in-time recovery with 30-day retention policy',
        'Monitoring alerts': 'Slack alerts for backup failures, storage threshold warnings'
      },
      'security-audit': {
        'Vulnerability report': 'Found 3 medium-risk issues, 0 critical. All patched successfully',
        'Fix recommendations': 'Updated 12 dependencies, enabled security headers, added rate limiting',
        'Security config': 'Configured CSP, HSTS, and secure cookies. Security score: A+'
      },
      'deploy-pipeline': {
        'Pipeline config': '4-stage pipeline: test → build → preview → production with approval gates',
        'Test reports': '98% test coverage, 47 test cases passing. E2E tests added for key flows',
        'Deployment logs': 'Average deploy time: 3m 42s. Zero-downtime rolling deployments enabled'
      }
    }

    return outputs[taskId]?.[output] || `Mock output for ${output} from ${taskId}`
  }

  const generateMockData = (taskId: string, output: string) => {
    // Return structured mock data that could be displayed or downloaded
    if (output.includes('report')) {
      return {
        score: 85 + Math.floor(Math.random() * 15),
        improvements: Math.floor(Math.random() * 10) + 3,
        timestamp: new Date().toISOString()
      }
    }
    if (output.includes('config')) {
      return {
        files: ['config.json', 'env.production', 'deploy.yml'],
        settings: Math.floor(Math.random() * 20) + 10
      }
    }
    return null
  }

  const StatusIcon = status === 'running' ? Clock :
                   status === 'complete' ? CheckCircle :
                   status === 'error' ? AlertTriangle :
                   Settings

  return (
    <div className={`rounded-lg border border-white/10 bg-slate-950/40 p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
          status === 'running' ? 'bg-blue-500/20 animate-pulse' :
          status === 'complete' ? 'bg-green-500/20' :
          status === 'error' ? 'bg-red-500/20' :
          'bg-orange-500/20'
        }`}>
          <StatusIcon className={`h-4 w-4 ${
            status === 'running' ? 'text-blue-400' :
            status === 'complete' ? 'text-green-400' :
            status === 'error' ? 'text-red-400' :
            'text-orange-400'
          }`} />
        </div>
        <div>
          <h3 className="text-sm font-medium text-slate-100">Ops Agent</h3>
          <p className="text-xs text-slate-400">
            Execute ops tasks + log evidence
          </p>
        </div>
      </div>

      {/* Task Selection */}
      {status === 'idle' && (
        <div>
          <h4 className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-3">
            Available Tasks
          </h4>
          <div className="space-y-2">
            {AVAILABLE_TASKS.map(task => (
              <button
                key={task.id}
                onClick={() => executeTask(task)}
                className="w-full text-left rounded-lg border border-white/10 bg-slate-900/30 p-3 transition hover:bg-slate-900/50 hover:border-white/20"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Wrench className="h-4 w-4 text-orange-400" />
                  <div className="font-medium text-sm text-slate-100">{task.name}</div>
                  <div className="text-xs text-slate-400 ml-auto">~{task.estimatedDuration}m</div>
                </div>
                <div className="text-xs text-slate-400 mb-2">{task.description}</div>
                <div className="flex flex-wrap gap-1">
                  {task.integrations.map(integration => (
                    <span key={integration} className="inline-block rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-300">
                      {integration}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Progress */}
      {status === 'running' && selectedTask && (
        <div className="mb-4">
          <div className="rounded-lg bg-slate-900/50 p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-blue-400">{selectedTask.name}</div>
              <div className="text-xs text-slate-400">Running...</div>
            </div>
            <div className="text-xs text-slate-300 mb-2">{progress}</div>
            <div className="h-1 rounded-full bg-slate-800">
              <div className="h-1 rounded-full bg-blue-500 transition-all duration-300 animate-pulse"
                   style={{ width: '70%' }} />
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mb-4">
      <div className={`rounded-lg border p-3 ${
            result.success 
              ? 'bg-green-500/10 border-green-500/20' 
              : 'bg-red-500/10 border-red-500/20'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`text-sm font-medium ${
                result.success ? 'text-green-400' : 'text-red-400'
              }`}>
                {result.success ? 'Task Completed' : 'Task Failed'}
              </div>
              <div className="text-xs text-slate-400">
                {result.duration}s elapsed
              </div>
            </div>
            
            {result.success && result.outputs.length > 0 && (
              <div className="mt-3">
                <div className="text-xs font-medium text-slate-300 mb-2">Outputs Generated:</div>
                <div className="space-y-2">
                  {result.outputs.map((output, i) => (
                    <div key={i} className="rounded bg-slate-900/50 p-2">
                      <div className="text-xs font-medium text-slate-200">{output.type}</div>
                      <div className="text-xs text-slate-400 mt-1">{output.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Show last few log entries */}
            {result.logs.length > 0 && (
              <details className="mt-3">
                <summary className="text-xs text-slate-400 cursor-pointer hover:text-slate-300">
                  View logs ({result.logs.length} entries)
                </summary>
                <div className="mt-2 max-h-32 overflow-y-auto rounded bg-slate-900/50 p-2">
                  {result.logs.slice(-5).map((log, i) => (
                    <div key={i} className="text-xs text-slate-400 font-mono">
                      {log}
                    </div>
                  ))}
                </div>
              </details>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      {(status === 'complete' || status === 'error') && (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setStatus('idle')
              setSelectedTask(null)
              setResult(null)
              setProgress('')
            }}
            className="flex-1 rounded-lg border border-white/10 bg-slate-900/50 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-900"
          >
            Run Another Task
          </button>
          
          {result?.success && (
            <button
              onClick={() => {
                // Mock download of task results
                const data = {
                  task: selectedTask?.name,
                  outputs: result.outputs,
                  logs: result.logs,
                  duration: result.duration
                }
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `ops-agent-${selectedTask?.id}-${Date.now()}.json`
                a.click()
                URL.revokeObjectURL(url)
              }}
              className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-400"
            >
              Download Results
            </button>
          )}
        </div>
      )}
    </div>
  )
}
