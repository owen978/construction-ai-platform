import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  roleLabel,
  taskLabel,
  timeSavedLabel,
  toolLabel,
  type DailyIdea,
  type Difficulty,
  type Risk,
} from '@/lib/daily-ideas'

const DIFFICULTY_VARIANT: Record<Difficulty, 'success' | 'warning' | 'info'> = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'info',
}

const RISK_VARIANT: Record<Risk, 'success' | 'warning' | 'destructive'> = {
  low: 'success',
  medium: 'warning',
  high: 'destructive',
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

/**
 * Honest chips only: who it's for, the task, the tool, typical time (when
 * Owen's figures exist), difficulty and how bad an unchecked error would be.
 * No scores or revenue figures.
 */
export function IdeaChips({
  idea,
  maxRoles = 2,
  className,
}: {
  idea: DailyIdea
  maxRoles?: number
  className?: string
}) {
  const time = timeSavedLabel(idea)

  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {idea.roles.slice(0, maxRoles).map((r) => (
        <Badge key={r} variant="outline">{roleLabel(r)}</Badge>
      ))}
      <Badge variant="outline">{taskLabel(idea.task)}</Badge>
      <Badge variant="outline">{toolLabel(idea.tool)}</Badge>
      {time && (
        <Badge variant="success" title="Typical time by hand and with AI">
          {time} typical
        </Badge>
      )}
      <Badge variant={DIFFICULTY_VARIANT[idea.difficulty]}>{cap(idea.difficulty)}</Badge>
      <Badge variant={RISK_VARIANT[idea.riskIfWrong]} title="How bad an unchecked error would be">
        Risk if wrong: {cap(idea.riskIfWrong)}
      </Badge>
    </div>
  )
}
