import Link from 'next/link'
import { cn, truncate } from '@/lib/utils'
import type { Task } from '@/types'

interface TaskCardProps {
  task: Pick<Task, 'name' | 'slug' | 'description' | 'icon'>
  className?: string
}

export function TaskCard({ task, className }: TaskCardProps) {
  const { name, slug, description, icon } = task

  return (
    <Link
      href={`/ai-for/${slug}`}
      className={cn(
        'group relative flex flex-col rounded-lg border border-slate-200/60 border-l-4 border-l-transparent bg-white p-6 shadow-sm hover:shadow-lg hover:border-l-[#ff6b35] transition-all duration-300',
        className
      )}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-orange-50 text-3xl">
        {icon || '\uD83D\uDCCB'}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-[#ff6b35] transition-colors">
        {name}
      </h3>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {truncate(description, 120)}
        </p>
      )}
      <span className="mt-auto pt-4 inline-flex items-center text-sm font-medium text-[#ff6b35] opacity-0 group-hover:opacity-100 transition-opacity">
        View workflows &rarr;
      </span>
    </Link>
  )
}
