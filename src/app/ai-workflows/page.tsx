export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { getWorkflows } from '@/lib/queries/workflows'
import { WorkflowCard } from '@/components/cards/workflow-card'
import { breadcrumbSchema, collectionPageSchema, jsonLdScriptProps } from '@/lib/schema'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buildcopilot.ai'

export const metadata: Metadata = {
  title: 'AI Workflows',
  description:
    'Browse AI-powered workflows for construction professionals. Ready-to-use prompts for Quantity Surveyors, Project Managers, and more.',
}

export default async function WorkflowsPage() {
  const workflows = await getWorkflows()

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'AI Workflows' },
    ]),
    collectionPageSchema({
      name: 'AI Workflows for Construction',
      description:
        'Browse AI-powered workflows for construction professionals. Ready-to-use prompts for Quantity Surveyors, Project Managers, and more.',
      url: `${SITE_URL}/ai-workflows`,
      items: workflows.map((w) => ({
        name: w.title,
        url: `${SITE_URL}/ai-workflows/${w.slug}`,
      })),
    }),
  ]

  return (
    <>
      <script {...jsonLdScriptProps(schemas)} />

      {/* Page Header */}
      <div className="bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:pt-16">
          <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-[#ff6b35] transition-colors">Home</Link>
            <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
            <span className="font-medium text-slate-900">AI Workflows</span>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">AI Workflows</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">Ready-to-use AI workflows designed for construction professionals. Copy, paste, and save hours.</p>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        {workflows.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workflows.map((workflow) => (
              <WorkflowCard key={workflow.id} workflow={workflow} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <p className="text-slate-500">No items available yet. Check back soon.</p>
          </div>
        )}
      </div>
    </>
  )
}
