export const revalidate = 3600

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CopyButton } from '@/components/ui/copy-button'
import { IdeaChips } from '@/components/daily/idea-chips'
import { DailyIdeasStrip } from '@/components/daily/daily-ideas-strip'
import { ServiceCTA } from '@/components/sections/service-cta'
import { NewsletterBanner } from '@/components/sections/newsletter-banner'
import { pageMetadata } from '@/lib/metadata'
import { isDailyIdeasEnabled } from '@/lib/features'
import { AUTHOR } from '@/lib/author'
import { SITE_URL } from '@/lib/site'
import { pluralRole } from '@/lib/utils'
import { breadcrumbSchema, dailyIdeaSchema, jsonLdScriptProps } from '@/lib/schema'
import { getRoles } from '@/lib/queries/roles'
import { getToolBySlug, getToolSlugs } from '@/lib/queries/tools'
import { getWorkflowBySlug } from '@/lib/queries/workflows'
import { getGuideBySlug } from '@/lib/queries/guides'
import { getTemplateBySlug } from '@/lib/queries/templates'
import {
  dailyArchiveHref,
  formatIdeaDate,
  getIdeaByParam,
  getPublishedIdeas,
  getRelatedIdeas,
  ideaParam,
  ideaPath,
  roleLabel,
  toolLabel,
  toolPageSlug,
  type DailyIdea,
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
    title: idea.metaTitle ?? idea.title,
    description: idea.summary,
    type: 'article',
    routeImage: true,
  })
}

/** A failed lookup drops the link rather than breaking the page. */
async function safe<T>(p: Promise<T>, fallback: T): Promise<T> {
  try {
    return await p
  } catch {
    return fallback
  }
}

const RELATED_KIND = { guides: 'Guide', templates: 'Free template', 'ai-tools': 'Tool guide' } as const

/** Links out to the rest of the site, using live page titles so nothing points at a missing page. */
async function getLinks(idea: DailyIdea) {
  const toolSlug = toolPageSlug(idea.tool)
  const [roles, toolSlugs, workflow, related] = await Promise.all([
    safe(getRoles(), []),
    toolSlug ? safe(getToolSlugs(), []) : Promise.resolve([]),
    idea.relatedWorkflow ? safe(getWorkflowBySlug(idea.relatedWorkflow), null) : Promise.resolve(null),
    getRelatedPage(idea.relatedPage),
  ])
  const mainRole = roles.find((r) => r.slug === idea.roles[0])
  return {
    roleLinks: roles.map((r) => r.slug).filter((r) => idea.roles.includes(r)),
    mainRolePage: mainRole ? { name: mainRole.name, href: `/ai-for/${mainRole.slug}` } : null,
    toolHref: toolSlug && toolSlugs.some((t) => t.slug === toolSlug) ? `/ai-tools/${toolSlug}` : null,
    workflow: workflow ? { title: workflow.title, href: `/ai-workflows/${workflow.slug}` } : null,
    related,
  }
}

async function getRelatedPage(path: string | null) {
  const m = path?.match(/^\/(guides|templates|ai-tools)\/([a-z0-9-]+)$/)
  if (!m) return null
  const [, kind, slug] = m as unknown as [string, keyof typeof RELATED_KIND, string]
  const title =
    kind === 'guides'
      ? (await safe(getGuideBySlug(slug), null))?.title
      : kind === 'templates'
        ? (await safe(getTemplateBySlug(slug), null))?.name
        : (await safe(getToolBySlug(slug), null))?.name
  return title ? { kind: RELATED_KIND[kind], title, href: path! } : null
}

const sectionHeading = 'mb-3 border-b border-slate-200 pb-2 text-xl font-semibold text-slate-900'

export default async function DailyIdeaPage({ params }: DailyIdeaPageProps) {
  const { slug } = await params
  const idea = isDailyIdeasEnabled() ? getIdeaByParam(slug) : null
  if (!idea) notFound()

  const related = getRelatedIdeas(idea, 3)
  const path = ideaPath(idea)
  const links = await getLinks(idea)
  const mainRole = idea.roles[0]

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
          <IdeaChips idea={idea} maxRoles={4} roleLinks={links.roleLinks} toolHref={links.toolHref} className="mt-4" />
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

          <section className="mt-8 rounded-lg border border-slate-200 bg-slate-50 px-5 py-4">
            <h2 className="font-semibold text-slate-900">Go further</h2>
            <ul className="mt-2 space-y-1.5 text-slate-600">
              {links.workflow && (
                <li>
                  The full workflow, with an example output:{' '}
                  <Link href={links.workflow.href} className="font-semibold text-primary hover:underline">
                    {links.workflow.title}
                  </Link>
                </li>
              )}
              {links.related && (
                <li>
                  {links.related.kind}:{' '}
                  <Link href={links.related.href} className="font-semibold text-primary hover:underline">
                    {links.related.title}
                  </Link>
                </li>
              )}
              {links.mainRolePage && (
                <li>
                  Every workflow for this role:{' '}
                  <Link href={links.mainRolePage.href} className="font-semibold text-primary hover:underline">
                    AI for {pluralRole(links.mainRolePage.name)}
                  </Link>
                </li>
              )}
              <li>
                More ideas like this:{' '}
                <Link href={dailyArchiveHref({ role: mainRole })} className="font-semibold text-primary hover:underline">
                  daily ideas for {roleLabel(mainRole)}s
                </Link>
              </li>
            </ul>
          </section>
        </article>

        <ServiceCTA config={null} utmContent={`daily-${idea.slug}`} />

        <DailyIdeasStrip ideas={related} title="Related ideas" moreHref="/daily" />

        <NewsletterBanner />
      </div>
    </>
  )
}
