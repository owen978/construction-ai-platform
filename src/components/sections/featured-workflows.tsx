import Link from 'next/link'
import { WorkflowCard } from '@/components/cards/workflow-card'
import type { Workflow } from '@/types'

interface FeaturedWorkflowsProps {
  workflows: Workflow[]
}

export function FeaturedWorkflows({ workflows }: FeaturedWorkflowsProps) {
  if (workflows.length === 0) return null

  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#ff6b35] mb-3">Featured Workflows</p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Start with These AI Workflows</h2>
          <p className="mt-4 text-lg text-slate-600">Our most popular workflows, ready to copy and use today.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workflows.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/ai-workflows" className="inline-flex items-center text-sm font-semibold text-[#ff6b35] hover:text-[#e85d26] transition-colors">
            View all workflows
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
