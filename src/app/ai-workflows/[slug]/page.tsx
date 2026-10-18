export const revalidate = 3600

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getWorkflowBySlug, getWorkflowSlugs, getWorkflowsByRoleId } from '@/lib/queries/workflows'
import { getRelatedContent } from '@/lib/queries/related'
import { RelatedResources } from '@/components/sections/related-resources'
import { WorkflowCard } from '@/components/cards/workflow-card'
import { Badge } from '@/components/ui/badge'
import { Byline } from '@/components/ui/byline'
import { CopyButton } from '@/components/ui/copy-button'
import { ToolCard } from '@/components/cards/tool-card'
import { GuideCard } from '@/components/cards/guide-card'
import { CopilotCTA } from '@/components/ui/copilot-cta'
import { features } from '@/lib/features'
import { breadcrumbSchema, faqSchema, howToSchema, jsonLdScriptProps } from '@/lib/schema'
import { NewsletterSidebar } from '@/components/ui/newsletter-sidebar'
import { NewsletterBanner } from '@/components/sections/newsletter-banner'
import { ServiceCTA } from '@/components/sections/service-cta'
import { getServiceCta } from '@/lib/service-cta'
import { TypicalResult } from '@/components/sections/typical-result'
import { getWorkflowResult } from '@/lib/workflow-results'
import { WorkflowExtras } from '@/components/sections/workflow-extras'
import { getWorkflowExtras } from '@/lib/workflow-extras'
import { ConstructionRatingNote } from '@/components/sections/construction-rating-note'
import { getConstructionRatingNote } from '@/lib/construction-rating'
import { RelatedGuides } from '@/components/sections/related-guides'
import { DailyIdeasStrip } from '@/components/daily/daily-ideas-strip'
import { getIdeasForWorkflow } from '@/lib/daily-ideas'
import type { DifficultyLevel } from '@/types'
import { SITE_URL } from '@/lib/site'
import { pageMetadata } from '@/lib/metadata'
import { pluralRole } from '@/lib/utils'

export async function generateStaticParams() {
  const slugs = await getWorkflowSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

const difficultyVariant: Record<DifficultyLevel, 'info' | 'warning' | 'success'> = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'info',
}

interface WorkflowDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: WorkflowDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const workflow = await getWorkflowBySlug(slug)

  if (!workflow) {
    return { title: 'Workflow Not Found' }
  }

  return pageMetadata({
    path: `/ai-workflows/${slug}`,
    title: workflow.meta_title || workflow.title,
    description: workflow.meta_description || workflow.description || undefined,
    routeImage: true,
  })
}

export default async function WorkflowDetailPage({ params }: WorkflowDetailPageProps) {
  const { slug } = await params
  const workflow = await getWorkflowBySlug(slug)

  if (!workflow) {
    notFound()
  }

  const serviceCta = getServiceCta('ai-workflows', slug)
  const result = getWorkflowResult(slug)
  const extras = getWorkflowExtras(slug)
  const [relatedResources, roleWorkflows] = await Promise.all([
    getRelatedContent({
      title: workflow.title,
      context: workflow.description ?? '',
      excludeType: 'workflow',
      excludeSlug: slug,
    }),
    workflow.role_id ? getWorkflowsByRoleId(workflow.role_id) : Promise.resolve([]),
  ])
  const moreForRole = roleWorkflows.filter((w) => w.slug !== slug).slice(0, 4)

  // HowTo steps describe using the workflow. (Splitting the prompt itself gave
  // steps like "4. Materials", which are headings inside the prompt, not steps.)
  const howToSteps = [
    `Open your preferred AI tool (e.g. ChatGPT, Claude, or Microsoft Copilot)`,
    `Copy the ${workflow.title} prompt below and paste it into the AI tool`,
    `Customise the placeholders with your project-specific details`,
    `Review the AI output and refine as needed for your project`,
  ]

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'AI Workflows', url: `${SITE_URL}/ai-workflows` },
      { name: workflow.title },
    ]),
    howToSchema({
      name: workflow.title,
      description: workflow.description || `AI workflow for construction professionals: ${workflow.title}`,
      slug: workflow.slug,
      steps: howToSteps.slice(0, 10), // Google recommends max ~10 steps
      difficulty: workflow.difficulty,
      tool: workflow.tool ? { name: workflow.tool.name, url: workflow.tool.url } : null,
      estimatedTime: result ? `PT${result.timeWithAiMins}M` : undefined,
      dateModified: workflow.updated_at,
    }),
    ...(extras && extras.faqs.length > 0 ? [faqSchema(extras.faqs)] : []),
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <script {...jsonLdScriptProps(schemas)} />

      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
        <Link href="/ai-workflows" className="hover:text-primary transition-colors">
          AI Workflows
        </Link>
        <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
        <span className="font-medium text-slate-900">{workflow.title}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{workflow.title}</h1>

          {workflow.description && (
            <p className="mb-6 text-lg leading-relaxed text-slate-600">
              {workflow.description}
            </p>
          )}

          {/* Badges */}
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge variant={workflow.difficulty ? difficultyVariant[workflow.difficulty] : 'info'}>
              {workflow.difficulty ? workflow.difficulty.charAt(0).toUpperCase() + workflow.difficulty.slice(1) : 'Workflow'}
            </Badge>
            {workflow.role && (
              <Link href={`/ai-for/${workflow.role.slug}`} title={`AI for ${pluralRole(workflow.role.name)}`}>
                <Badge variant="default" className="transition-opacity hover:opacity-80">{workflow.role.name}</Badge>
              </Link>
            )}
            {workflow.task && (
              <Link href={`/ai-for/${workflow.task.slug}`} title={`AI for ${workflow.task.name.toLowerCase()}`}>
                <Badge variant="info" className="transition-opacity hover:opacity-80">{workflow.task.name}</Badge>
              </Link>
            )}
          </div>

          <Byline updatedAt={workflow.updated_at} className="mt-4" />

          {/* Long description */}
          {workflow.long_description && (
            <div className="mt-8">
              <h2 className="mb-4 border-b border-slate-200 pb-3 text-xl font-semibold text-slate-900">Overview</h2>
              <div className="whitespace-pre-wrap text-slate-600">
                {workflow.long_description}
              </div>
            </div>
          )}

          <NewsletterBanner />

          {/* Prompt */}
          {workflow.prompt && (
            <div className="mt-8">
              <h2 className="mb-4 border-b border-slate-200 pb-3 text-xl font-semibold text-slate-900">Prompt</h2>
              <div className="relative">
                <div className="absolute top-4 right-4">
                  <CopyButton text={workflow.prompt} />
                </div>
                <pre className="overflow-x-auto whitespace-pre-wrap relative rounded-lg bg-slate-900 p-6 font-mono text-sm leading-relaxed text-slate-100 shadow-lg">
                  {workflow.prompt}
                </pre>
              </div>
            </div>
          )}

          {result && <TypicalResult result={result} />}

          <ServiceCTA config={serviceCta} utmContent={`workflow-${slug}`} />
          <ConstructionRatingNote note={getConstructionRatingNote('ai-workflows', slug)} />

          {/* Example Output */}
          {workflow.example_output && (
            <div className="mt-8">
              <h2 className="mb-4 border-b border-slate-200 pb-3 text-xl font-semibold text-slate-900">Example Output</h2>
              <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-slate-900 p-6 font-mono text-sm leading-relaxed text-slate-100 shadow-lg">
                {workflow.example_output}
              </pre>
            </div>
          )}

          {/* Use Case */}
          {workflow.use_case && (
            <div className="mt-8">
              <h2 className="mb-4 border-b border-slate-200 pb-3 text-xl font-semibold text-slate-900">Use Case</h2>
              <div className="whitespace-pre-wrap text-slate-600">
                {workflow.use_case}
              </div>
            </div>
          )}

          {extras && <WorkflowExtras extras={extras} />}

          <DailyIdeasStrip ideas={getIdeasForWorkflow(slug)} title="Daily ideas that build on this workflow" moreHref="/daily" />
        </div>

        {/* Sidebar */}
        <div className="space-y-6 lg:sticky lg:top-24">
          {workflow.tool && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Recommended Tool
              </h3>
              <ToolCard tool={workflow.tool} />
            </div>
          )}

          {workflow.guide && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Related Guide
              </h3>
              <GuideCard guide={workflow.guide} />
            </div>
          )}

          {features.copilot && <CopilotCTA />}

          <NewsletterSidebar />
        </div>
      </div>

      {moreForRole.length > 0 && workflow.role && (
        <section className="mt-16">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-slate-200 pb-3">
            <h2 className="text-2xl font-bold text-slate-900">More AI workflows for {pluralRole(workflow.role.name)}</h2>
            <Link href={`/ai-for/${workflow.role.slug}`} className="text-sm font-semibold text-primary hover:underline">
              All {workflow.role.name} workflows &rarr;
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {moreForRole.map((w) => <WorkflowCard key={w.id} workflow={w} />)}
          </div>
        </section>
      )}

      <RelatedGuides section="ai-workflows" slug={slug} />

      <RelatedResources items={relatedResources} />
    </div>
  )
}
