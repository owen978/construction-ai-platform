export const revalidate = 3600

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getToolBySlug, getToolSlugs, getOtherTools } from '@/lib/queries/tools'
import { getWorkflowsByToolId } from '@/lib/queries/workflows'
import { Badge } from '@/components/ui/badge'
import { WorkflowCard } from '@/components/cards/workflow-card'
import { articleSchema, breadcrumbSchema, extractFaqFromMarkdown, faqSchema, softwareApplicationSchema, jsonLdScriptProps } from '@/lib/schema'
import { NewsletterInline } from '@/components/sections/newsletter-inline'
import { NewsletterSidebar } from '@/components/ui/newsletter-sidebar'
import { ToolCard } from '@/components/cards/tool-card'
import { DailyIdeasStrip } from '@/components/daily/daily-ideas-strip'
import { ServiceCTA } from '@/components/sections/service-cta'
import { FreeOfferBlock, FreeOfferCard } from '@/components/leads/free-offer'
import { getRoles } from '@/lib/queries/roles'
import { getPageBody, pageUpdatedAt } from '@/lib/page-bodies'
import { splitAtMarkers } from '@/lib/markdown-split'
import { MarkdownContent } from '@/components/markdown-content'
import { StartHere } from '@/components/ui/start-here'
import type { Workflow } from '@/types'
import { dailyArchiveHref, getIdeasForToolPage } from '@/lib/daily-ideas'
import { SITE_URL } from '@/lib/site'
import { pageMetadata } from '@/lib/metadata'
import { contentDate } from '@/lib/utils'
import { Byline } from '@/components/ui/byline'

export async function generateStaticParams() {
  const slugs = await getToolSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

interface ToolDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ToolDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const tool = await getToolBySlug(slug)

  if (!tool) {
    return { title: 'Tool Not Found' }
  }

  return pageMetadata({
    path: `/ai-tools/${slug}`,
    title: tool.meta_title || tool.name,
    description: tool.meta_description || tool.description || undefined,
  })
}

const COMMERCIAL_ROLES = ['Quantity Surveyor', 'Commercial Manager', 'Estimator', 'Contracts Manager', 'Procurement Manager']
const SITE_ROLES = ['Site Manager', 'Health & Safety Manager']

/** A tool's workflows in three groups by role, for the "workflows by role" section of a page body. */
function WorkflowsByRole({ workflows, roleNames }: { workflows: Workflow[]; roleNames: Map<string, string> }) {
  const groupOf = (w: Workflow) => {
    const role = (w.role_id && roleNames.get(w.role_id)) || ''
    return COMMERCIAL_ROLES.includes(role) ? 'Commercial' : SITE_ROLES.includes(role) ? 'Site and H&S' : 'Project'
  }
  return (
    <>
      {['Commercial', 'Project', 'Site and H&S'].map((group) => {
        const items = workflows.filter((w) => groupOf(w) === group)
        if (items.length === 0) return null
        return (
          <section key={group} className="mt-8">
            <h3 className="mb-4 text-xl font-semibold text-slate-900">{group}</h3>
            <div className="grid gap-6 sm:grid-cols-2">
              {items.map((workflow) => (
                <WorkflowCard key={workflow.id} workflow={workflow} />
              ))}
            </div>
          </section>
        )
      })}
    </>
  )
}

export default async function ToolDetailPage({ params }: ToolDetailPageProps) {
  const { slug } = await params
  const tool = await getToolBySlug(slug)

  if (!tool) {
    notFound()
  }

  const [workflows, otherTools, roles] = await Promise.all([
    getWorkflowsByToolId(tool.id),
    getOtherTools(slug, 10), // all the other tools, so every tool page gets linked
    getRoles(),
  ])
  const roleNames = new Map(roles.map((r) => [r.id, r.name]))

  // A written page body (marketing/page-bodies/ai-tools/<slug>.md) turns the
  // listing into a guide about the tool: an Article about the SoftwareApplication.
  const pageBody = getPageBody('ai-tools', slug)
  const h1 = pageBody?.h1 ?? `${tool.name} for Construction`
  const segments = pageBody ? splitAtMarkers(pageBody.body) : []
  const inlineOffer = segments.some((seg) => seg.kind === 'marker' && seg.name === 'cta')
  const faqItems = pageBody ? extractFaqFromMarkdown(pageBody.body) : []
  const updatedAt = pageUpdatedAt(contentDate(tool), pageBody)

  const toolSchema: Record<string, unknown> = softwareApplicationSchema({
    name: tool.name,
    description: tool.description || `AI tool for construction professionals: ${tool.name}`,
    slug: tool.slug,
    category: tool.category,
    pricing: tool.pricing,
    url: tool.url,
  })
  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'AI Tools', url: `${SITE_URL}/ai-tools` },
      { name: tool.name },
    ]),
    ...(pageBody
      ? [
          articleSchema({
            title: h1,
            description: tool.meta_description || tool.description || h1,
            path: `/ai-tools/${slug}`,
            dateModified: updatedAt,
            image: `${SITE_URL}/og-image.png`,
            about: Object.fromEntries(Object.entries(toolSchema).filter(([k]) => k !== '@context')),
          }),
          ...(faqItems.length > 0 ? [faqSchema(faqItems)] : []),
        ]
      : [toolSchema]),
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
        <Link href="/ai-tools" className="hover:text-primary transition-colors">
          AI Tools
        </Link>
        <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
        <span className="font-medium text-slate-900">{tool.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{h1}</h1>

          {(pageBody?.intro ?? tool.description) && (
            <p className="mb-4 text-lg leading-relaxed text-slate-600">
              {pageBody?.intro ?? tool.description}
            </p>
          )}

          <Byline path={`/ai-tools/${slug}`} updatedAt={updatedAt} className="mb-6" />
          <StartHere path={`ai-tools/${slug}`} className="-mt-2 mb-6" />

          <div className="mb-6 flex flex-wrap gap-2">
            {tool.category && <Badge variant="info">{tool.category}</Badge>}
            {tool.pricing && <Badge variant="default">{tool.pricing}</Badge>}
          </div>

          {!pageBody && tool.long_description && (
            <div className="mb-8">
              <h2 className="mb-4 border-b border-slate-200 pb-3 text-xl font-semibold text-slate-900">About</h2>
              <div className="whitespace-pre-wrap text-slate-600">
                {tool.long_description}
              </div>
            </div>
          )}

          {tool.url && (
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all"
            >
              Visit {tool.name} &rarr;
            </a>
          )}

          {pageBody &&
            segments.map((seg, i) =>
              seg.kind === 'markdown' ? (
                <MarkdownContent key={i} content={seg.text} />
              ) : seg.name === 'workflows' ? (
                <WorkflowsByRole key={i} workflows={workflows} roleNames={roleNames} />
              ) : seg.name === 'cta' ? (
                <FreeOfferBlock key={i} path={`/ai-tools/${slug}`} utmContent={`tool-${slug}`} />
              ) : null
            )}

          {/* Related Workflows */}
          {!pageBody && workflows.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 border-b border-slate-200 pb-3 text-2xl font-bold text-slate-900">
                Workflows Using {tool.name}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {workflows.map((workflow) => (
                  <WorkflowCard key={workflow.id} workflow={workflow} />
                ))}
              </div>
            </div>
          )}

          <ServiceCTA config={null} utmContent={`tool-${slug}`} />

          <DailyIdeasStrip
            ideas={getIdeasForToolPage(slug)}
            title={`Daily ideas using ${tool.name}`}
            moreHref={dailyArchiveHref({ tool: slug })}
            moreLabel={`All ${tool.name} ideas`}
          />
        </div>

        {/* Sidebar: the call card and newsletter follow the reader down the page. */}
        <div className="space-y-6">
          {otherTools.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Other AI Tools
              </h3>
              <div className="space-y-3">
                {otherTools.map((otherTool) => (
                  <ToolCard key={otherTool.id} tool={otherTool} />
                ))}
              </div>
            </div>
          )}

          <div className="space-y-6 lg:sticky lg:top-24">
            {!inlineOffer && <FreeOfferCard path={`/ai-tools/${slug}`} utmContent={`tool-${slug}`} />}
            <NewsletterSidebar />
          </div>
        </div>
      </div>

      <NewsletterInline />
    </div>
  )
}
