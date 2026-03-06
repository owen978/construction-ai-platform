import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { updateTask } from '@/lib/actions/tasks'
import type { Task } from '@/types'
import { requireAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

interface EditTaskPageProps {
  params: Promise<{ id: string }>
}

export default async function EditTaskPage({ params }: EditTaskPageProps) {
  await requireAdmin()
  const { id } = await params
  const supabase = createAdminClient()

  const { data } = await supabase.from('tasks').select('*').eq('id', id).single()
  const task = data as Task | null

  if (!task) {
    notFound()
  }

  const updateWithId = updateTask.bind(null, task.id)

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Edit Task</h1>
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <form action={updateWithId} className="space-y-6">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">Name *</label>
            <input id="name" name="name" type="text" required defaultValue={task.name} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>

          <div>
            <label htmlFor="description" className="mb-1 block text-sm font-medium text-slate-700">Description</label>
            <textarea id="description" name="description" rows={3} defaultValue={task.description ?? ''} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="icon" className="mb-1 block text-sm font-medium text-slate-700">Icon (emoji)</label>
              <input id="icon" name="icon" type="text" defaultValue={task.icon ?? ''} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>

            <div>
              <label htmlFor="sort_order" className="mb-1 block text-sm font-medium text-slate-700">Sort Order</label>
              <input id="sort_order" name="sort_order" type="number" defaultValue={task.sort_order} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>

            <div>
              <label htmlFor="status" className="mb-1 block text-sm font-medium text-slate-700">Status</label>
              <select id="status" name="status" defaultValue={task.status} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <button type="submit" className="rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
            Update Task
          </button>
        </form>
      </div>
    </div>
  )
}
