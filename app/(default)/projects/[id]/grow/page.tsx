import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import FirstDollar from '@/components/grow/FirstDollar'
import FirstTen from '@/components/grow/FirstTen'
import Retention30 from '@/components/grow/Retention30'
import ProductScoreCard from '@/components/grow/ProductScoreCard'

interface Props {
  params: {
    id: string
  }
  searchParams: {
    tab?: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Grow Project ${params.id} | Build AI Startups`,
    description: 'Track your path from first dollar to sustained growth with outcome-driven checklists.'
  }
}

async function getProject(id: string) {
  if (!id || id.length < 3) {
    return null
  }
  
  return {
    id,
    name: `Project ${id}`,
    vertical: 'ai-leadgen',
    createdAt: new Date('2024-01-01')
  }
}

const tabs = [
  { id: 'first-dollar', label: 'First $', icon: '💰' },
  { id: 'first-ten', label: 'First 10 Users', icon: '👥' },
  { id: 'retention', label: '30-Day Retention', icon: '🔄' }
]

export default async function GrowProjectPage({ params, searchParams }: Props) {
  const project = await getProject(params.id)
  
  if (!project) {
    notFound()
  }

  const activeTab = searchParams.tab || 'first-dollar'

  return (
    <main className="bg-slate-950 text-slate-200 min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">G</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Grow: {project.name}</h1>
              <p className="text-slate-400 text-sm">
                Outcome-driven checklists to scale from first dollar to sustainable growth
              </p>
            </div>
          </div>
          
          <ProductScoreCard projectId={params.id} />
        </div>

        <div className="mb-8">
          <nav className="flex space-x-1 rounded-lg bg-slate-900/50 p-1">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                href={`/projects/${params.id}/grow?tab=${tab.id}`}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === tab.id
                    ? 'bg-violet-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-8">
          {activeTab === 'first-dollar' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-2">Path to First Dollar</h2>
                <p className="text-slate-300">
                  Systematic steps to validate your idea and collect your first payment. 
                  Each task builds toward revenue generation.
                </p>
              </div>
              <FirstDollar projectId={params.id} />
            </div>
          )}

          {activeTab === 'first-ten' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-2">Scale to 10 Users</h2>
                <p className="text-slate-300">
                  Growth tactics to reach your first 10 paying customers. 
                  Focus on systematic acquisition and early feedback loops.
                </p>
              </div>
              <FirstTen projectId={params.id} />
            </div>
          )}

          {activeTab === 'retention' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-2">30-Day Retention</h2>
                <p className="text-slate-300">
                  Keep users engaged and coming back. Build the foundation for long-term growth 
                  through better onboarding and lifecycle engagement.
                </p>
              </div>
              <Retention30 projectId={params.id} />
            </div>
          )}
        </div>

        <div className="mt-12 p-6 rounded-xl bg-slate-900/40 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-white mb-1">Ready for the next phase?</h3>
              <p className="text-sm text-slate-400">
                Complete all checklists and hit your targets to unlock advanced growth tools.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/projects/${params.id}/evidence`}
                className="px-4 py-2 text-sm border border-white/10 rounded-md hover:bg-white/5 transition-colors"
              >
                View Evidence
              </Link>
              <Link
                href={`/projects/${params.id}/marketplace`}
                className="px-4 py-2 text-sm bg-violet-500 text-white rounded-md hover:bg-violet-400 transition-colors"
              >
                List on Marketplace
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function ProductScoreCard({ projectId }: { projectId: string }) {
  return (
    <div className="rounded-lg bg-slate-900/40 border border-white/10 p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-400 mb-1">Product Lane Score</div>
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-white">--</div>
            <div className="text-xs text-slate-500">/100</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400 mb-1">Completion</div>
          <div className="text-sm text-slate-300">--%</div>
        </div>
      </div>
      <div className="mt-3 h-2 bg-slate-800 rounded-full">
        <div 
          className="h-2 bg-gradient-to-r from-violet-500 to-purple-400 rounded-full transition-all duration-500"
          style={{ width: '0%' }}
        />
      </div>
      <div className="mt-2 text-xs text-slate-500">
        Complete checklists to calculate your score
      </div>
    </div>
  )
}
