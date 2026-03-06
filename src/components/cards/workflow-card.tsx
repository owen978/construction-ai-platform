import Link from 'next/link'
import { cn, truncate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import type { Workflow } from '@/types'
import type { DifficultyLevel } from '@/types'

interface WorkflowCardProps {
  workflow: Pick<Workflow, 'title' | 'slug' | 'description' | 'difficulty' | 'icon'>
  className?: string
}

const difficultyVariant: Record<DifficultyLevel, 'info' | 'warning' | 'success'> = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'info',
}

export function WorkflowCard({ workflow, className }: WorkflowCardProps) {
  const { title, slug, description, difficulty, icon } = workflow

  return (
    <Link
      href={`/ai-workflows/${slug}`}
      className={cn(
        'group relative flex flex-col rounded-lg border border-slate-200/60 border-l-4 border-l-transparent bg-white p-6 shadow-sm hover:shadow-lg hover:border-l-[#ff6b35] transition-all duration-300',
        className
      )}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 text-2xl">
        {icon || '\u2699\uFE0F'}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-[#ff6b35] transition-colors">
        {title}
      </h3>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {truncate(description, 120)}
        </p>
      )}
      <div className="mt-3">
        <Badge variant={difficulty ? difficultyVariant[difficulty] : 'info'}>
          {difficulty ? difficulty.charAt(0).toUpperCase() + difficulty.slice(1) : 'Workflow'}
        </Badge>
      </div>
      <span className="mt-auto pt-4 inline-flex items-center text-sm font-medium text-[#ff6b35] opacity-0 group-hover:opacity-100 transition-opacity">
        Learn more &rarr;
      </span>
    </Link>
  )
}
