import Link from 'next/link'
import { cn, truncate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import type { Guide } from '@/types'
import type { DifficultyLevel } from '@/types'

interface GuideCardProps {
  guide: Pick<Guide, 'title' | 'slug' | 'description' | 'difficulty' | 'reading_time_minutes'>
  className?: string
}

const difficultyVariant: Record<DifficultyLevel, 'info' | 'warning' | 'success'> = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'info',
}

export function GuideCard({ guide, className }: GuideCardProps) {
  const { title, slug, description, difficulty, reading_time_minutes } = guide

  return (
    <Link
      href={`/guides/${slug}`}
      className={cn(
        'group relative flex flex-col rounded-lg border border-slate-200/60 border-l-4 border-l-transparent bg-white p-6 shadow-sm hover:shadow-lg hover:border-l-[#ff6b35] transition-all duration-300',
        className
      )}
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
        <svg className="h-5 w-5 text-[#ff6b35]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-[#ff6b35] transition-colors">
        {title}
      </h3>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {truncate(description, 120)}
        </p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Badge variant={difficulty ? difficultyVariant[difficulty] : 'info'}>
          {difficulty ? difficulty.charAt(0).toUpperCase() + difficulty.slice(1) : 'Guide'}
        </Badge>
        {reading_time_minutes != null && (
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-500">
            {reading_time_minutes} min read
          </span>
        )}
      </div>
    </Link>
  )
}
