import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { deleteTask } from '@/lib/actions/tasks'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { DeleteButton } from '@/components/admin/delete-button'
import type { Task } from '@/types'
import { requireAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export default async function AdminTasksPage() {
  await requireAdmin()
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) throw error
  const tasks = data as Task[] | null

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Tasks</h1>
        <Link
          href="/admin/tasks/new"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          New Task
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Icon</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Sort Order</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Updated</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {tasks?.map((task) => (
              <tr key={task.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-2xl">{task.icon || '-'}</td>
                <td className="px-4 py-3 text-sm font-medium text-slate-900">{task.name}</td>
                <td className="px-4 py-3">
                  <Badge variant={task.status === 'published' ? 'success' : task.status === 'draft' ? 'warning' : 'default'}>
                    {task.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{task.sort_order}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{formatDate(task.updated_at)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/tasks/${task.id}/edit`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                      Edit
                    </Link>
                    <DeleteButton id={task.id} action={deleteTask} />
                  </div>
                </td>
              </tr>
            ))}
            {(!tasks || tasks.length === 0) && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-500">
                  No tasks yet. Create your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
