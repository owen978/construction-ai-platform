export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getGuideBySlug } from '@/lib/queries/guides'
import { Badge } from '@/components/ui/badge'
import { WorkflowCard } from '@/components/cards/workflow-card'
import { createClient } from '@/lib/supabase/server'
import { breadcrumbSchema, articleSchema, jsonLdScriptProps } from '@/lib/schema'
import type { DifficultyLevel, Workflow } from '@/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buildcopilot.ai'

const difficultyVariant: Record<DifficultyLevel, 'info' | 'warning' | 'success'> = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'info',
}

interface GuideDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: GuideDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const guide = await getGuideBySlug(slug)

  if (!guide) {
    return { title: 'Guide Not Found' }
  }

  return {
    title: guide.meta_title || guide.title,
    description: guide.meta_description || guide.description || undefined,
  }
}

export default async function GuideDetailPage({ params }: GuideDetailPageProps) {
  const { slug } = await params
  const guide = await getGuideBySlug(slug)

  if (!guide) {
    notFound()
  }

  // Fetch workflows that reference this guide
  const supabase = await createClient()
  const { data: workflows } = await supabase
    .from('workflows')
    .select('*')
    .eq('guide_id', guide.id)
    .eq('status', 'published')
    .order('sort_order', { ascending: true })

  const relatedWorkflows: Workflow[] = workflows ?? []

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Guides', url: `${SITE_URL}/guides` },
      { name: guide.title },
    ]),
    articleSchema({
      title: guide.title,
      description: guide.description || `Construction AI guide: ${guide.title}`,
      slug: guide.slug,
      datePublished: guide.created_at,
      dateModified: guide.updated_at,
      readingTimeMinutes: guide.reading_time_minutes,
    }),
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <script {...jsonLdScriptProps(schemas)} />

      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-[#ff6b35] transition-colors">
          Home
        </Link>
        <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
        <Link href="/guides" className="hover:text-[#ff6b35] transition-colors">
          Guides
        </Link>
        <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
        <span className="font-medium text-slate-900">{guide.title}</span>
      </nav>

      <article className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{guide.title}</h1>

        {guide.description && (
          <p className="mb-6 text-lg leading-relaxed text-slate-600">
            {guide.description}
          </p>
        )}

        <div className="mb-8 flex flex-wrap items-center gap-3">
          <Badge variant={guide.difficulty ? difficultyVariant[guide.difficulty] : 'info'}>
            {guide.difficulty ? guide.difficulty.charAt(0).toUpperCase() + guide.difficulty.slice(1) : 'Guide'}
          </Badge>
          {guide.reading_time_minutes != null && (
            <span className="text-sm text-slate-500">
              {guide.reading_time_minutes} min read
            </span>
          )}
        </div>

        {/* Guide content */}
        {guide.content && (
          <div className="whitespace-pre-wrap leading-relaxed text-slate-700">
            {guide.content}
          </div>
        )}
      </article>

      {/* Related Workflows */}
      {relatedWorkflows.length > 0 && (
        <div className="mx-auto mt-12 max-w-3xl">
          <h2 className="mb-6 border-b border-slate-200 pb-3 text-2xl font-bold text-slate-900">Related Workflows</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {relatedWorkflows.map((workflow) => (
              <WorkflowCard key={workflow.id} workflow={workflow} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
