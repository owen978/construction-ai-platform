import Link from 'next/link'
import { cn, truncate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
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
    <Link href={`/ai-workflows/${slug}`} className={cn('group', className)}>
      <Card className="h-full border-l-4 border-l-transparent transition-all duration-300 hover:border-l-primary hover:shadow-lg">
        <CardContent className="flex h-full flex-col p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 text-2xl">
            {icon || '\u2699\uFE0F'}
          </div>
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="mt-2 leading-relaxed">
              {truncate(description, 120)}
            </CardDescription>
          )}
          <div className="mt-3">
            <Badge variant={difficulty ? difficultyVariant[difficulty] : 'info'}>
              {difficulty ? difficulty.charAt(0).toUpperCase() + difficulty.slice(1) : 'Workflow'}
            </Badge>
          </div>
          <span className="mt-auto pt-4 inline-flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            Learn more &rarr;
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
