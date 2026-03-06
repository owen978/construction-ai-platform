import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { deleteRole } from '@/lib/actions/roles'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { DeleteButton } from '@/components/admin/delete-button'
import type { Role } from '@/types'
import { requireAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export default async function AdminRolesPage() {
  await requireAdmin()
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('roles')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) throw error
  const roles = data as Role[] | null

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Roles</h1>
        <Link
          href="/admin/roles/new"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          New Role
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
            {roles?.map((role) => (
              <tr key={role.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-2xl">{role.icon || '-'}</td>
                <td className="px-4 py-3 text-sm font-medium text-slate-900">{role.name}</td>
                <td className="px-4 py-3">
                  <Badge variant={role.status === 'published' ? 'success' : role.status === 'draft' ? 'warning' : 'default'}>
                    {role.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{role.sort_order}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{formatDate(role.updated_at)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/roles/${role.id}/edit`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                      Edit
                    </Link>
                    <DeleteButton id={role.id} action={deleteRole} />
                  </div>
                </td>
              </tr>
            ))}
            {(!roles || roles.length === 0) && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-500">
                  No roles yet. Create your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
