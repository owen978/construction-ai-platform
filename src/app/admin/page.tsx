import { createAdminClient } from '@/lib/supabase/admin'
import { requireAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

interface StatCard {
  label: string
  count: number
  href: string
}

export default async function AdminDashboardPage() {
  await requireAdmin()
  const supabase = createAdminClient()

  const [
    { count: workflowCount },
    { count: toolCount },
    { count: guideCount },
    { count: roleCount },
    { count: taskCount },
    { count: contentCount },
  ] = await Promise.all([
    supabase.from('workflows').select('*', { count: 'exact', head: true }),
    supabase.from('tools').select('*', { count: 'exact', head: true }),
    supabase.from('guides').select('*', { count: 'exact', head: true }),
    supabase.from('roles').select('*', { count: 'exact', head: true }),
    supabase.from('tasks').select('*', { count: 'exact', head: true }),
    supabase.from('content_posts').select('*', { count: 'exact', head: true }),
  ])

  const stats: StatCard[] = [
    { label: 'Workflows', count: workflowCount ?? 0, href: '/admin/workflows' },
    { label: 'Tools', count: toolCount ?? 0, href: '/admin/tools' },
    { label: 'Guides', count: guideCount ?? 0, href: '/admin/guides' },
    { label: 'Roles', count: roleCount ?? 0, href: '/admin/roles' },
    { label: 'Tasks', count: taskCount ?? 0, href: '/admin/tasks' },
    { label: 'Content Posts', count: contentCount ?? 0, href: '/admin/content' },
  ]

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-slate-900">Admin Dashboard</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <a
            key={stat.label}
            href={stat.href}
            className="rounded-lg border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{stat.count}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
