import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { deleteGuide } from '@/lib/actions/guides'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { DeleteButton } from '@/components/admin/delete-button'
import type { Guide } from '@/types'
import { requireAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export default async function AdminGuidesPage() {
  await requireAdmin()
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('guides')
    .select('*')
    .order('updated_at', { ascending: false })

  if (error) throw error
  const guides = data as Guide[] | null

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Guides</h1>
        <Link
          href="/admin/guides/new"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          New Guide
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Title</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Difficulty</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Reading Time</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Featured</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Updated</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {guides?.map((guide) => (
              <tr key={guide.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-slate-900">{guide.title}</td>
                <td className="px-4 py-3">
                  <Badge variant={guide.status === 'published' ? 'success' : guide.status === 'draft' ? 'warning' : 'default'}>
                    {guide.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{guide.difficulty}</td>
                <td className="px-4 py-3 text-sm text-slate-600">
                  {guide.reading_time_minutes != null ? `${guide.reading_time_minutes} min` : '-'}
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{guide.featured ? 'Yes' : 'No'}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{formatDate(guide.updated_at)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/guides/${guide.id}/edit`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                      Edit
                    </Link>
                    <DeleteButton id={guide.id} action={deleteGuide} />
                  </div>
                </td>
              </tr>
            ))}
            {(!guides || guides.length === 0) && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-sm text-slate-500">
                  No guides yet. Create your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
