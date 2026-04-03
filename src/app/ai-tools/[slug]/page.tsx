export const revalidate = 3600

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getToolBySlug, getToolSlugs } from '@/lib/queries/tools'
import { getWorkflowsByToolId } from '@/lib/queries/workflows'
import { Badge } from '@/components/ui/badge'
import { WorkflowCard } from '@/components/cards/workflow-card'
import { breadcrumbSchema, softwareApplicationSchema, jsonLdScriptProps } from '@/lib/schema'
import { NewsletterInline } from '@/components/sections/newsletter-inline'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buildcopilot.ai'

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

  return {
    title: tool.meta_title || tool.name,
    description: tool.meta_description || tool.description || undefined,
  }
}

export default async function ToolDetailPage({ params }: ToolDetailPageProps) {
  const { slug } = await params
  const tool = await getToolBySlug(slug)

  if (!tool) {
    notFound()
  }

  const workflows = await getWorkflowsByToolId(tool.id)

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'AI Tools', url: `${SITE_URL}/ai-tools` },
      { name: tool.name },
    ]),
    softwareApplicationSchema({
      name: tool.name,
      description: tool.description || `AI tool for construction professionals: ${tool.name}`,
      slug: tool.slug,
      category: tool.category,
      pricing: tool.pricing,
      url: tool.url,
    }),
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

      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{tool.name}</h1>

        {tool.description && (
          <p className="mb-6 text-lg leading-relaxed text-slate-600">
            {tool.description}
          </p>
        )}

        <div className="mb-6 flex flex-wrap gap-2">
          {tool.category && <Badge variant="info">{tool.category}</Badge>}
          {tool.pricing && <Badge variant="default">{tool.pricing}</Badge>}
        </div>

        {tool.long_description && (
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
      </div>

      {/* Related Workflows */}
      {workflows.length > 0 && (
        <div>
          <h2 className="mb-6 border-b border-slate-200 pb-3 text-2xl font-bold text-slate-900">
            Workflows Using {tool.name}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workflows.map((workflow) => (
              <WorkflowCard key={workflow.id} workflow={workflow} />
            ))}
          </div>
        </div>
      )}
      <NewsletterInline />
    </div>
  )
}
