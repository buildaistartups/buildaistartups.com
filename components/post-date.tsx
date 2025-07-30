import { format } from 'date-fns'

export default function PostDate({ dateString }: { dateString: string }) {
  const date = new Date(dateString)
  return (
    <time className="text-sm text-gray-500 dark:text-slate-400">
      {format(date, 'MMMM d, yyyy')}
    </time>
  )
}
