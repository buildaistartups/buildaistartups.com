import { IconValidate, IconBuild, IconLaunch, IconDocument } from '@/components/app/icons'

export const metadata = { title: 'Templates' }

export default function TemplatesPage() {
  const templates = [
    { name: 'Idea Brief', stage: 'Validate', desc: 'One-pager: problem, solution, ICP, why now, risks', Icon: IconValidate, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { name: 'Competitor Matrix', stage: 'Validate', desc: 'Table: competitor, pricing, strengths, weaknesses', Icon: IconValidate, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { name: 'Customer Interview Script', stage: 'Validate', desc: '10 questions for problem discovery interviews', Icon: IconDocument, color: 'text-violet-500', bg: 'bg-violet-500/10' },
    { name: 'PRD Template', stage: 'Build', desc: 'Structured spec: problem, solution, user stories, data model', Icon: IconBuild, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { name: 'Launch Announcement', stage: 'Launch', desc: 'Template for Product Hunt, X, Indie Hackers, Reddit', Icon: IconLaunch, color: 'text-violet-500', bg: 'bg-violet-500/10' },
  ]

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold mb-2">Templates</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Pre-built templates for every stage of your startup journey.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((t) => (
          <div key={t.name} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${t.bg} flex items-center justify-center`}>
                <t.Icon className={`w-4.5 h-4.5 ${t.color}`} />
              </div>
              <span className="text-xs text-violet-500 dark:text-violet-400 font-medium">{t.stage}</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">{t.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{t.desc}</p>
            <button className="text-xs font-medium text-gray-400 dark:text-gray-500" disabled>
              Coming soon
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
