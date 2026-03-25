export function TabInfo({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-violet-500/5 border border-violet-500/10 rounded-xl p-4 mb-4">
      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">{title}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
    </div>
  )
}
