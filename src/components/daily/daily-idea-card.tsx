import Link from 'next/link'
import { CopyButton } from '@/components/ui/copy-button'
import { buttonVariants } from '@/components/ui/button-variants'
import { IdeaChips } from '@/components/daily/idea-chips'
import { IdeaTeaser } from '@/components/daily/idea-teaser'
import { bookingUrl } from '@/lib/ghl'
import { formatIdeaDate, ideaPath, type DailyIdea } from '@/lib/daily-ideas'

/**
 * Homepage "Construction AI workflow of the day": the whole idea is free on
 * the card (prompt included), with a link to its permanent dated page, the
 * full workflow, and a quiet Roadmap Review line.
 */
export function DailyIdeaCard({
  idea,
  rotated,
  today,
  more,
}: {
  idea: DailyIdea
  rotated: boolean
  today: string
  more: DailyIdea[]
}) {
  return (
    <section id="workflow-of-the-day" aria-labelledby="daily-idea-heading" className="scroll-mt-16 bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Construction AI workflow of the day
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {rotated ? (
                <>From the archive, first shared {formatIdeaDate(idea.publishDate)}</>
              ) : (
                <time dateTime={today}>{formatIdeaDate(today, { weekday: true })}</time>
              )}
            </p>
          </div>
          <Link href="/daily" className="text-sm font-semibold text-primary hover:text-primary/90 transition-colors">
            See all daily ideas &rarr;
          </Link>
        </div>

        <article className="grid gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 id="daily-idea-heading" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              <Link href={ideaPath(idea)} className="hover:text-primary transition-colors">
                {idea.title}
              </Link>
            </h2>
            <IdeaChips idea={idea} className="mt-4" />
            <p className="mt-4 leading-relaxed text-slate-600">{idea.summary}</p>

            {idea.result && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">What it produced</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{idea.result}</p>
              </div>
            )}

            {idea.whatToCheck.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">What you still check</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-600">
                  {idea.whatToCheck.slice(0, 3).map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={ideaPath(idea)} className={buttonVariants()}>
                Read the full idea
              </Link>
              {idea.relatedWorkflow && (
                <Link href={`/ai-workflows/${idea.relatedWorkflow}`} className={buttonVariants({ variant: 'outline' })}>
                  Full workflow &rarr;
                </Link>
              )}
            </div>

            <p className="mt-5 text-sm text-slate-500">
              Want this built into your team&apos;s systems?{' '}
              <a
                href={bookingUrl(`daily-${idea.slug}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                Book a Roadmap Review
              </a>
            </p>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-900">The prompt</h3>
            <div className="relative">
              <div className="absolute top-3 right-3 z-10">
                <CopyButton text={idea.prompt} />
              </div>
              <pre className="max-h-[28rem] overflow-auto whitespace-pre-wrap rounded-lg bg-slate-900 p-5 pt-12 font-mono text-sm leading-relaxed text-slate-100 shadow-lg">
                {idea.prompt}
              </pre>
            </div>
          </div>
        </article>

        {more.length > 0 && (
          <div className="mt-10">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-900">More ideas</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {more.map((m) => (
                <IdeaTeaser key={m.slug} idea={m} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
