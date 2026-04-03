export const revalidate = 3600

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getRoleBySlug, getRoleSlugs } from '@/lib/queries/roles'
import { getTaskBySlug, getTaskSlugs } from '@/lib/queries/tasks'
import { getWorkflowsByRoleId, getWorkflowsByTaskId } from '@/lib/queries/workflows'
import { WorkflowCard } from '@/components/cards/workflow-card'
import { breadcrumbSchema, collectionPageSchema, jsonLdScriptProps } from '@/lib/schema'
import { NewsletterInline } from '@/components/sections/newsletter-inline'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buildcopilot.ai'

export async function generateStaticParams() {
  const [roles, tasks] = await Promise.all([getRoleSlugs(), getTaskSlugs()])
  return [...roles, ...tasks].map(({ slug }) => ({ slug }))
}

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

    const schemas = [
      breadcrumbSchema([
        { name: 'Home', url: SITE_URL },
        { name: 'AI for Roles & Tasks', url: `${SITE_URL}/ai-for` },
        { name: `AI for ${role.name}` },
      ]),
      collectionPageSchema({
        name: `AI for ${role.name}`,
        description: role.description || `AI workflows and prompts for ${role.name} in construction`,
        url: `${SITE_URL}/ai-for/${role.slug}`,
        items: workflows.map((w) => ({
          name: w.title,
          url: `${SITE_URL}/ai-workflows/${w.slug}`,
        })),
      }),
    ]

    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <script {...jsonLdScriptProps(schemas)} />

        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-primary transition-colors">
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

        <NewsletterInline />
      </div>
    )
  }

  // Try task
  const task = await getTaskBySlug(slug)
  if (task) {
    const workflows = await getWorkflowsByTaskId(task.id)

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
    ]

    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <script {...jsonLdScriptProps(schemas)} />

        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-primary transition-colors">
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

        <NewsletterInline />
      </div>
    )
  }

  notFound()
}
