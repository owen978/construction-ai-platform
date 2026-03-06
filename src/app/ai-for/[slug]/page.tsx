export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getRoleBySlug } from '@/lib/queries/roles'
import { getTaskBySlug } from '@/lib/queries/tasks'
import { getWorkflowsByRoleId, getWorkflowsByTaskId } from '@/lib/queries/workflows'
import { WorkflowCard } from '@/components/cards/workflow-card'

interface AIForPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: AIForPageProps): Promise<Metadata> {
  const { slug } = await params

  const role = await getRoleBySlug(slug)
  if (role) {
    return {
      title: role.meta_title || `AI for ${role.name}`,
      description: role.meta_description || role.description || undefined,
    }
  }

  const task = await getTaskBySlug(slug)
  if (task) {
    return {
      title: task.meta_title || `AI for ${task.name}`,
      description: task.meta_description || task.description || undefined,
    }
  }

  return { title: 'Not Found' }
}

export default async function AIForPage({ params }: AIForPageProps) {
  const { slug } = await params

  // Try role first
  const role = await getRoleBySlug(slug)
  if (role) {
    const workflows = await getWorkflowsByRoleId(role.id)

    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-[#ff6b35] transition-colors">
            Home
          </Link>
          <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
          <span className="font-medium text-slate-900">AI for {role.name}</span>
        </nav>

        <div className="h-16 w-16 rounded-lg bg-orange-50 text-4xl flex items-center justify-center mb-4" aria-hidden="true">
          {role.icon || ''}
        </div>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          AI for {role.name}
        </h1>
        {role.description && (
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-600">
            {role.description}
          </p>
        )}

        {workflows.length > 0 ? (
          <div>
            <h2 className="mb-6 border-b border-slate-200 pb-3 text-2xl font-bold text-slate-900">Workflows</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {workflows.map((workflow) => (
                <WorkflowCard key={workflow.id} workflow={workflow} />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-slate-500">No workflows available for this role yet.</p>
        )}
      </div>
    )
  }

  // Try task
  const task = await getTaskBySlug(slug)
  if (task) {
    const workflows = await getWorkflowsByTaskId(task.id)

    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-[#ff6b35] transition-colors">
            Home
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

        {workflows.length > 0 ? (
          <div>
            <h2 className="mb-6 border-b border-slate-200 pb-3 text-2xl font-bold text-slate-900">Workflows</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {workflows.map((workflow) => (
                <WorkflowCard key={workflow.id} workflow={workflow} />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-slate-500">No workflows available for this task yet.</p>
        )}
      </div>
    )
  }

  notFound()
}
