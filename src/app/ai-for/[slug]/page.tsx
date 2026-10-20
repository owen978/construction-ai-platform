export const revalidate = 3600

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getRoleBySlug, getRoleSlugs } from '@/lib/queries/roles'
import { getTaskBySlug, getTaskSlugs } from '@/lib/queries/tasks'
import { getWorkflowsByRoleId, getWorkflowsBySlugs, getWorkflowsByTaskId } from '@/lib/queries/workflows'
import { getHubWorkflowSlugs } from '@/lib/hub-workflows'
import { WorkflowCard } from '@/components/cards/workflow-card'
import { breadcrumbSchema, collectionPageSchema, faqSchema, jsonLdScriptProps } from '@/lib/schema'
import { getAiForExtras } from '@/lib/ai-for-extras'
import { AiForExtras } from '@/components/sections/ai-for-extras'
import { NewsletterInline } from '@/components/sections/newsletter-inline'
import { getRelatedContent, withoutShown } from '@/lib/queries/related'
import { getRelatedGuideSlugs } from '@/lib/related-guides'
import { RelatedResources } from '@/components/sections/related-resources'
import { RelatedGuides } from '@/components/sections/related-guides'
import { DailyIdeasStrip } from '@/components/daily/daily-ideas-strip'
import { dailyArchiveHref, getIdeasForRole } from '@/lib/daily-ideas'
import { ServiceCTA } from '@/components/sections/service-cta'
import { CallCtaInline } from '@/components/leads/call-cta'
import { getServiceCta } from '@/lib/service-cta'
import { ConstructionRatingNote } from '@/components/sections/construction-rating-note'
import { getConstructionRatingNote } from '@/lib/construction-rating'
import { SITE_URL } from '@/lib/site'
import { pageMetadata } from '@/lib/metadata'
import { pluralRole } from '@/lib/utils'

export async function generateStaticParams() {
  const [roles, tasks] = await Promise.all([getRoleSlugs(), getTaskSlugs()])
  return [...roles, ...tasks].map(({ slug }) => ({ slug }))
}

/** The hub's own workflows, then the extra ones it should also list (no repeats). */
function withHubWorkflows<T extends { slug: string }>(own: T[], extra: T[]): T[] {
  const seen = new Set(own.map((w) => w.slug))
  return [...own, ...extra.filter((w) => !seen.has(w.slug))]
}

/** Quick links under the hub heading: straight to the workflows, or down to the reading. */
function HubJumpLinks({ workflows, guide, faqs }: { workflows: number; guide: boolean; faqs: boolean }) {
  if (workflows === 0 && !guide) return null
  const link = 'font-semibold text-primary hover:underline'
  return (
    <p className="-mt-4 mb-8 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
      <span>Jump to:</span>
      {workflows > 0 && <a href="#workflows" className={link}>{workflows} workflows</a>}
      {guide && <a href="#how-ai-helps" className={link}>How AI helps</a>}
      {faqs && <a href="#faqs" className={link}>FAQs</a>}
    </p>
  )
}

interface AIForPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: AIForPageProps): Promise<Metadata> {
  const { slug } = await params

  const role = await getRoleBySlug(slug)
  if (role) {
    return pageMetadata({
      path: `/ai-for/${slug}`,
      title: role.meta_title || `AI for ${pluralRole(role.name)}`,
      description: role.meta_description || role.description || undefined,
      routeImage: true,
    })
  }

  const task = await getTaskBySlug(slug)
  if (task) {
    return pageMetadata({
      path: `/ai-for/${slug}`,
      title: task.meta_title || `AI for ${task.name}`,
      description: task.meta_description || task.description || undefined,
      routeImage: true,
    })
  }

  return { title: 'Not Found' }
}

export default async function AIForPage({ params }: AIForPageProps) {
  const { slug } = await params
  const serviceCta = getServiceCta('ai-for', slug)
  const extras = getAiForExtras(slug)

  // Try role first
  const role = await getRoleBySlug(slug)
  if (role) {
    const workflows = withHubWorkflows(await getWorkflowsByRoleId(role.id), await getWorkflowsBySlugs(getHubWorkflowSlugs(slug)))
    const relatedResources = await getRelatedContent({
      title: role.name,
      context: role.description ?? '',
      excludeType: null,
      excludeSlug: role.slug,
    })

    const schemas = [
      breadcrumbSchema([
        { name: 'Home', url: SITE_URL },
        { name: 'AI for Roles & Tasks', url: `${SITE_URL}/ai-for` },
        { name: `AI for ${pluralRole(role.name)}` },
      ]),
      collectionPageSchema({
        name: `AI for ${pluralRole(role.name)}`,
        description: role.description || `AI workflows and prompts for ${role.name} in construction`,
        url: `${SITE_URL}/ai-for/${role.slug}`,
        items: workflows.map((w) => ({
          name: w.title,
          url: `${SITE_URL}/ai-workflows/${w.slug}`,
        })),
      }),
      ...(extras && extras.faqs.length > 0 ? [faqSchema(extras.faqs)] : []),
    ]

    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <script {...jsonLdScriptProps(schemas)} />

        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
          <Link href="/ai-for" className="hover:text-primary transition-colors">
            AI for Roles &amp; Tasks
          </Link>
          <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
          <span className="font-medium text-slate-900">AI for {pluralRole(role.name)}</span>
        </nav>

        <div className="h-16 w-16 rounded-lg bg-orange-50 text-4xl flex items-center justify-center mb-4" aria-hidden="true">
          {role.icon || ''}
        </div>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          AI for {pluralRole(role.name)}
        </h1>
        {role.description && (
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-600">
            {role.description}
          </p>
        )}

        <HubJumpLinks
          workflows={workflows.length}
          guide={Boolean(role.long_description || extras)}
          faqs={Boolean(extras?.faqs.length)}
        />

        {workflows.length > 0 ? (
          <section id="workflows" className="scroll-mt-20">
            <h2 className="mb-6 border-b border-slate-200 pb-3 text-2xl font-bold text-slate-900">
              {workflows.length} AI workflows for {pluralRole(role.name)}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {workflows.map((workflow) => (
                <WorkflowCard key={workflow.id} workflow={workflow} />
              ))}
            </div>
          </section>
        ) : (
          <p className="text-slate-500">No workflows available for this role yet.</p>
        )}

        <ServiceCTA config={serviceCta} utmContent={`ai-for-${slug}`} className="max-w-3xl" />
        <ConstructionRatingNote note={getConstructionRatingNote('ai-for', slug)} className="max-w-3xl" />

        <DailyIdeasStrip
          ideas={getIdeasForRole(slug)}
          title="Latest daily ideas for this role"
          moreHref={dailyArchiveHref({ role: slug })}
          moreLabel="All daily ideas for this role"
        />

        {(role.long_description || extras) && (
          <div id="how-ai-helps" className="mt-12 scroll-mt-20">
          {role.long_description && (
            <div className="mb-10 max-w-3xl">
              <h2 className="mb-4 border-b border-slate-200 pb-3 text-xl font-semibold text-slate-900">Overview</h2>
              <div className="whitespace-pre-wrap text-slate-600">
                {role.long_description}
              </div>
            </div>
          )}

          {extras && (
            <AiForExtras
              extras={extras}
              title={pluralRole(role.name) === role.name ? `How AI helps with ${role.name.toLowerCase()}` : `How AI helps ${pluralRole(role.name)}`}
            />
          )}
          </div>
        )}

        <CallCtaInline heading={`How could AI work for ${pluralRole(role.name).toLowerCase()} in your business?`} utmContent={`ai-for-inline-${slug}`} className="max-w-3xl" />

        <RelatedGuides section="ai-for" slug={slug} />

        <RelatedResources items={withoutShown(relatedResources, { workflows: workflows.map((w) => w.slug), guides: getRelatedGuideSlugs('ai-for', slug) })} />

        <NewsletterInline />
      </div>
    )
  }

  // Try task
  const task = await getTaskBySlug(slug)
  if (task) {
    const workflows = withHubWorkflows(await getWorkflowsByTaskId(task.id), await getWorkflowsBySlugs(getHubWorkflowSlugs(slug)))
    const relatedResources = await getRelatedContent({
      title: task.name,
      context: task.description ?? '',
      excludeType: null,
      excludeSlug: task.slug,
    })

    const schemas = [
      breadcrumbSchema([
        { name: 'Home', url: SITE_URL },
        { name: 'AI for Roles & Tasks', url: `${SITE_URL}/ai-for` },
        { name: `AI for ${task.name}` },
      ]),
      collectionPageSchema({
        name: `AI for ${task.name}`,
        description: task.description || `AI workflows and prompts for ${task.name} in construction`,
        url: `${SITE_URL}/ai-for/${task.slug}`,
        items: workflows.map((w) => ({
          name: w.title,
          url: `${SITE_URL}/ai-workflows/${w.slug}`,
        })),
      }),
      ...(extras && extras.faqs.length > 0 ? [faqSchema(extras.faqs)] : []),
    ]

    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <script {...jsonLdScriptProps(schemas)} />

        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
          <Link href="/ai-for" className="hover:text-primary transition-colors">
            AI for Roles &amp; Tasks
          </Link>
          <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
          <span className="font-medium text-slate-900">AI for {task.name}</span>
        </nav>

        <div className="h-16 w-16 rounded-lg bg-orange-50 text-4xl flex items-center justify-center mb-4" aria-hidden="true">
          {task.icon || ''}
        </div>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          AI for {task.name}
        </h1>
        {task.description && (
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-600">
            {task.description}
          </p>
        )}

        <HubJumpLinks
          workflows={workflows.length}
          guide={Boolean(task.long_description || extras)}
          faqs={Boolean(extras?.faqs.length)}
        />

        {workflows.length > 0 ? (
          <section id="workflows" className="scroll-mt-20">
            <h2 className="mb-6 border-b border-slate-200 pb-3 text-2xl font-bold text-slate-900">
              {workflows.length} AI workflows for {task.name.toLowerCase()}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {workflows.map((workflow) => (
                <WorkflowCard key={workflow.id} workflow={workflow} />
              ))}
            </div>
          </section>
        ) : (
          <p className="text-slate-500">No workflows available for this task yet.</p>
        )}

        <ServiceCTA config={serviceCta} utmContent={`ai-for-${slug}`} className="max-w-3xl" />
        <ConstructionRatingNote note={getConstructionRatingNote('ai-for', slug)} className="max-w-3xl" />

        {(task.long_description || extras) && (
          <div id="how-ai-helps" className="mt-12 scroll-mt-20">
          {task.long_description && (
            <div className="mb-10 max-w-3xl">
              <h2 className="mb-4 border-b border-slate-200 pb-3 text-xl font-semibold text-slate-900">Overview</h2>
              <div className="whitespace-pre-wrap text-slate-600">
                {task.long_description}
              </div>
            </div>
          )}

          {extras && <AiForExtras extras={extras} title={`How AI helps with ${task.name.toLowerCase()}`} />}
          </div>
        )}

        <CallCtaInline heading={`How could AI handle ${task.name.toLowerCase()} in your business?`} utmContent={`ai-for-inline-${slug}`} className="max-w-3xl" />

        <RelatedGuides section="ai-for" slug={slug} />

        <RelatedResources items={withoutShown(relatedResources, { workflows: workflows.map((w) => w.slug), guides: getRelatedGuideSlugs('ai-for', slug) })} />

        <NewsletterInline />
      </div>
    )
  }

  notFound()
}
