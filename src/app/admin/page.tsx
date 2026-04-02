import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { requireAdmin } from '@/lib/auth'
import { Card, CardContent } from '@/components/ui/card'

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
      <h1 className="mb-8 text-2xl font-bold text-foreground">Admin Dashboard</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-foreground">{stat.count}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
