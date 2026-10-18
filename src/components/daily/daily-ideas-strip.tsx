import Link from 'next/link'
import { IdeaTeaser } from '@/components/daily/idea-teaser'
import { isDailyIdeasEnabled } from '@/lib/features'
import { cn } from '@/lib/utils'
import type { DailyIdea } from '@/lib/daily-ideas'

/**
 * A row of daily idea cards for workflow, role, tool, guide and template
 * pages. These links are how Google finds the daily pages beyond the
 * archive, so every hub that has matching ideas shows them.
 */
export function DailyIdeasStrip({
  ideas,
  title = 'Daily ideas',
  moreHref,
  moreLabel = 'See all daily ideas',
  className,
}: {
  ideas: DailyIdea[]
  title?: string
  moreHref?: string
  moreLabel?: string
  className?: string
}) {
  if (!isDailyIdeasEnabled() || ideas.length === 0) return null

  return (
    <section className={cn('mt-12', className)}>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        {moreHref && (
          <Link href={moreHref} className="text-sm font-semibold text-primary hover:underline">
            {moreLabel} &rarr;
          </Link>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {ideas.map((idea) => <IdeaTeaser key={idea.slug} idea={idea} />)}
      </div>
    </section>
  )
}
