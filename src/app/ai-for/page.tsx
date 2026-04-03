export const revalidate = 3600

import type { Metadata } from 'next'
import Link from 'next/link'
import { getRoles } from '@/lib/queries/roles'
import { getTasks } from '@/lib/queries/tasks'
import { RoleCard } from '@/components/cards/role-card'
import { TaskCard } from '@/components/cards/task-card'
import { breadcrumbSchema, collectionPageSchema, jsonLdScriptProps } from '@/lib/schema'
import { NewsletterInline } from '@/components/sections/newsletter-inline'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buildcopilot.ai'

export const metadata: Metadata = {
  title: 'AI for Construction Roles & Tasks',
  description:
    'Find AI workflows tailored to your construction role. Browse by role or task — QS, Project Manager, Site Manager, Estimator, and more.',
}

export default async function AIForPage() {
  const roles = await getRoles()
  const tasks = await getTasks()

  const allItems = [
    ...roles.map((r) => ({ name: `AI for ${r.name}`, url: `${SITE_URL}/ai-for/${r.slug}` })),
    ...tasks.map((t) => ({ name: `AI for ${t.name}`, url: `${SITE_URL}/ai-for/${t.slug}` })),
  ]

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'AI for Roles & Tasks' },
    ]),
    collectionPageSchema({
      name: 'AI for Construction Roles & Tasks',
      description:
        'Find AI workflows tailored to your construction role. Browse by role or task — QS, Project Manager, Site Manager, Estimator, and more.',
      url: `${SITE_URL}/ai-for`,
      items: allItems,
    }),
  ]

  return (
    <>
      <script {...jsonLdScriptProps(schemas)} />

      {/* Page Header */}
      <div className="bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:pt-16">
          <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
            <span className="font-medium text-slate-900">AI for Roles & Tasks</span>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">AI for Your Role</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">Find AI workflows tailored to your construction role, or browse by task to find exactly what you need.</p>
        </div>
      </div>

      {/* Roles Section */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">By Role</p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Construction Roles</h2>
          <p className="mt-2 text-slate-600">Select your role to see AI workflows built specifically for you.</p>
        </div>

        {roles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => (
              <RoleCard key={role.id} role={role} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <p className="text-slate-500">No roles available yet.</p>
          </div>
        )}
      </div>

      {/* Tasks Section */}
      <div className="mx-auto max-w-7xl px-4 pb-16">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">By Task</p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Construction Tasks</h2>
          <p className="mt-2 text-slate-600">Browse AI workflows by the type of work you need to do.</p>
        </div>

        {tasks.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <p className="text-slate-500">No tasks available yet.</p>
          </div>
        )}
      </div>

      <NewsletterInline />
    </>
  )
}
