import Link from 'next/link'
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
 *
 * On the idea's own page, role and tool chips link to their hub pages
 * (`roleLinks` lists the roles that have an /ai-for/ page). Elsewhere the
 * chips sit inside a card link, so they stay plain.
 */
export function IdeaChips({
  idea,
  maxRoles = 2,
  roleLinks,
  toolHref,
  className,
}: {
  idea: DailyIdea
  maxRoles?: number
  roleLinks?: string[]
  toolHref?: string | null
  className?: string
}) {
  const time = timeSavedLabel(idea)
  const linked = 'transition-colors hover:border-primary/50 hover:text-primary'

  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {idea.roles.slice(0, maxRoles).map((r) =>
        roleLinks?.includes(r) ? (
          <Link key={r} href={`/ai-for/${r}`} title={`AI for ${roleLabel(r)}`}>
            <Badge variant="outline" className={linked}>{roleLabel(r)}</Badge>
          </Link>
        ) : (
          <Badge key={r} variant="outline">{roleLabel(r)}</Badge>
        )
      )}
      <Badge variant="outline">{taskLabel(idea.task)}</Badge>
      {toolHref ? (
        <Link href={toolHref} title={`${toolLabel(idea.tool)} for construction`}>
          <Badge variant="outline" className={linked}>{toolLabel(idea.tool)}</Badge>
        </Link>
      ) : (
        <Badge variant="outline">{toolLabel(idea.tool)}</Badge>
      )}
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
