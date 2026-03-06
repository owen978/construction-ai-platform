import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { deleteTool } from '@/lib/actions/tools'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { DeleteButton } from '@/components/admin/delete-button'
import type { Tool } from '@/types'
import { requireAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export default async function AdminToolsPage() {
  await requireAdmin()
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .order('updated_at', { ascending: false })

  if (error) throw error
  const tools = data as Tool[] | null

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Tools</h1>
        <Link
          href="/admin/tools/new"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          New Tool
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Category</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Pricing</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Featured</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Updated</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {tools?.map((tool) => (
              <tr key={tool.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-slate-900">{tool.name}</td>
                <td className="px-4 py-3">
                  <Badge variant={tool.status === 'published' ? 'success' : tool.status === 'draft' ? 'warning' : 'default'}>
                    {tool.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{tool.category ?? '-'}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{tool.pricing ?? '-'}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{tool.featured ? 'Yes' : 'No'}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{formatDate(tool.updated_at)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/tools/${tool.id}/edit`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                      Edit
                    </Link>
                    <DeleteButton id={tool.id} action={deleteTool} />
                  </div>
                </td>
              </tr>
            ))}
            {(!tools || tools.length === 0) && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-sm text-slate-500">
                  No tools yet. Create your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
