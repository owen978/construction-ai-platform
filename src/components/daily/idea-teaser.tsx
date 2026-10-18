import Link from 'next/link'
import { cn } from '@/lib/utils'
import { formatIdeaDate, ideaPath, roleLabel, timeSavedLabel, type DailyIdea } from '@/lib/daily-ideas'

/** Compact link card for "More ideas", related ideas and the /daily archive. */
export function IdeaTeaser({ idea, className }: { idea: DailyIdea; className?: string }) {
  const time = timeSavedLabel(idea)

  return (
    <Link
      href={ideaPath(idea)}
      className={cn(
        'group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 transition-all hover:border-primary/40 hover:shadow-md',
        className
      )}
    >
      <time dateTime={idea.publishDate} className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {formatIdeaDate(idea.publishDate)}
      </time>
      <h3 className="mt-2 font-semibold leading-snug text-slate-900 group-hover:text-primary transition-colors">
        {idea.title}
      </h3>
      <p className="mt-auto pt-3 text-sm text-slate-500">
        {idea.roles.slice(0, 2).map(roleLabel).join(', ')}
        {time && <span className="text-slate-400"> · {time}</span>}
      </p>
    </Link>
  )
}
