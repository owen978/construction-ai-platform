export const revalidate = 3600

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CopyButton } from '@/components/ui/copy-button'
import { IdeaChips } from '@/components/daily/idea-chips'
import { IdeaTeaser } from '@/components/daily/idea-teaser'
import { ServiceCTA } from '@/components/sections/service-cta'
import { NewsletterBanner } from '@/components/sections/newsletter-banner'
import { pageMetadata } from '@/lib/metadata'
import { isDailyIdeasEnabled } from '@/lib/features'
import { AUTHOR } from '@/lib/author'
import { SITE_URL } from '@/lib/site'
import { breadcrumbSchema, dailyIdeaSchema, jsonLdScriptProps } from '@/lib/schema'
import {
  formatIdeaDate,
  getIdeaByParam,
  getPublishedIdeas,
  getRelatedIdeas,
  ideaParam,
  ideaPath,
  toolLabel,
} from '@/lib/daily-ideas'

interface DailyIdeaPageProps {
  params: Promise<{ slug: string }>
}

// Ideas published by build time are prerendered; later ones render on their day.
export async function generateStaticParams() {
  if (!isDailyIdeasEnabled()) return []
  return getPublishedIdeas().map((idea) => ({ slug: ideaParam(idea) }))
}

export async function generateMetadata({ params }: DailyIdeaPageProps): Promise<Metadata> {
  const { slug } = await params
  const idea = isDailyIdeasEnabled() ? getIdeaByParam(slug) : null
  if (!idea) return { title: 'Idea Not Found' }

  return pageMetadata({
    path: ideaPath(idea),
    title: idea.title,
    description: idea.summary,
    type: 'article',
    routeImage: true,
  })
}

const sectionHeading = 'mb-3 border-b border-slate-200 pb-2 text-xl font-semibold text-slate-900'

export default async function DailyIdeaPage({ params }: DailyIdeaPageProps) {
  const { slug } = await params
  const idea = isDailyIdeasEnabled() ? getIdeaByParam(slug) : null
  if (!idea) notFound()

  const related = getRelatedIdeas(idea, 3)
  const path = ideaPath(idea)

  return (
    <>
      <script
        {...jsonLdScriptProps([
          dailyIdeaSchema({
            title: idea.title,
            summary: idea.summary,
            path,
            publishDate: idea.publishDate,
            steps: idea.steps,
            tool: toolLabel(idea.tool),
            timeWithAiMins: idea.timeWithAiMins,
          }),
          breadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Daily ideas', url: `${SITE_URL}/daily` },
            { name: idea.title },
          ]),
        ])}
      />

      <div className="mx-auto max-w-3xl px-4 py-12">
        <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/daily" className="hover:text-primary transition-colors">Daily ideas</Link>
        </nav>

        <article>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Workflow of the day · <time dateTime={idea.publishDate}>{formatIdeaDate(idea.publishDate)}</time>
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{idea.title}</h1>
          <p className="mt-3 text-sm text-slate-500">
            {AUTHOR.bylineLabel}:{' '}
            <Link href={AUTHOR.path} className="font-medium text-slate-700 hover:text-primary transition-colors">
              {AUTHOR.name}
            </Link>
          </p>
          <IdeaChips idea={idea} maxRoles={4} className="mt-4" />
          <p className="mt-5 text-lg leading-relaxed text-slate-600">{idea.summary}</p>

          {idea.whenToUse && (
            <section className="mt-8">
              <h2 className={sectionHeading}>When to use it</h2>
              <p className="leading-relaxed text-slate-600">{idea.whenToUse}</p>
            </section>
          )}

          <section className="mt-8">
            <h2 className={sectionHeading}>The prompt</h2>
            <div className="relative">
              <div className="absolute top-4 right-4 z-10">
                <CopyButton text={idea.prompt} />
              </div>
              <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-slate-900 p-6 pt-14 font-mono text-sm leading-relaxed text-slate-100 shadow-lg">
                {idea.prompt}
              </pre>
            </div>
          </section>

          {idea.result && (
            <section className="mt-8">
              <h2 className={sectionHeading}>What it produced</h2>
              <p className="leading-relaxed text-slate-600">{idea.result}</p>
            </section>
          )}

          {idea.whatToCheck.length > 0 && (
            <section className="mt-8">
              <h2 className={sectionHeading}>What you still check</h2>
              <ul className="list-disc space-y-2 pl-5 leading-relaxed text-slate-600">
                {idea.whatToCheck.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </section>
          )}

          {idea.steps.length > 0 && (
            <section className="mt-8">
              <h2 className={sectionHeading}>Steps</h2>
              <ol className="list-decimal space-y-2 pl-5 leading-relaxed text-slate-600">
                {idea.steps.map((s) => <li key={s}>{s}</li>)}
              </ol>
            </section>
          )}

          {idea.source.kind === 'community' && idea.source.url && (
            <p className="mt-8 rounded-lg border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600">
              Seen in the wild:{' '}
              <a href={idea.source.url} className="font-semibold text-primary hover:underline" rel="noopener noreferrer">
                {idea.source.label ?? idea.source.url}
              </a>
            </p>
          )}

          {idea.relatedWorkflow && (
            <p className="mt-8 text-slate-600">
              Want the longer version, with an example output and more detail?{' '}
              <Link href={`/ai-workflows/${idea.relatedWorkflow}`} className="font-semibold text-primary hover:underline">
                Read the full workflow
              </Link>
              .
            </p>
          )}
        </article>

        <ServiceCTA config={null} utmContent={`daily-${idea.slug}`} />

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Related ideas</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((r) => <IdeaTeaser key={r.slug} idea={r} />)}
            </div>
          </section>
        )}

        <NewsletterBanner />
      </div>
    </>
  )
}
