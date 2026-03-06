export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { deleteWorkflow } from '@/lib/actions/workflows'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { DeleteButton } from '@/components/admin/delete-button'
import { requireAdmin } from '@/lib/auth'

type WorkflowRow = {
  id: string
  title: string
  slug: string
  status: string
  difficulty: string
  featured: boolean
  updated_at: string
  role: { name: string } | null
}

export default async function AdminWorkflowsPage() {
  await requireAdmin()
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('workflows')
    .select('*, role:roles(name)')
    .order('updated_at', { ascending: false })

  if (error) throw error
  const workflows = data as WorkflowRow[] | null

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Workflows</h1>
        <Link
          href="/admin/workflows/new"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          New Workflow
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                Title
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                Difficulty
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                Role
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                Featured
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                Updated
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {workflows?.map((workflow) => (
              <tr key={workflow.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-slate-900">
                  {workflow.title}
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant={
                      workflow.status === 'published'
                        ? 'success'
                        : workflow.status === 'draft'
                        ? 'warning'
                        : 'default'
                    }
                  >
                    {workflow.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{workflow.difficulty}</td>
                <td className="px-4 py-3 text-sm text-slate-600">
                  {(workflow.role as { name: string } | null)?.name ?? '-'}
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">
                  {workflow.featured ? 'Yes' : 'No'}
                </td>
                <td className="px-4 py-3 text-sm text-slate-500">
                  {formatDate(workflow.updated_at)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/workflows/${workflow.id}/edit`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={workflow.id} action={deleteWorkflow} />
                  </div>
                </td>
              </tr>
            ))}
            {(!workflows || workflows.length === 0) && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-sm text-slate-500">
                  No workflows yet. Create your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
