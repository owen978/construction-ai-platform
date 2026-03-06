import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { deleteContentPost } from '@/lib/actions/content-posts'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { DeleteButton } from '@/components/admin/delete-button'
import type { ContentPost } from '@/types'
import { requireAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export default async function AdminContentPage() {
  await requireAdmin()
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('content_posts')
    .select('*')
    .order('updated_at', { ascending: false })

  if (error) throw error
  const posts = data as ContentPost[] | null

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Content Posts</h1>
        <Link
          href="/admin/content/new"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          New Post
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Title</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Platform</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Updated</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {posts?.map((post) => (
              <tr key={post.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-slate-900">{post.title}</td>
                <td className="px-4 py-3">
                  <Badge variant={post.status === 'published' ? 'success' : post.status === 'draft' ? 'warning' : 'default'}>
                    {post.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{post.platform ?? '-'}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{post.content_type ?? '-'}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{formatDate(post.updated_at)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/content/${post.id}/edit`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                      Edit
                    </Link>
                    <DeleteButton id={post.id} action={deleteContentPost} />
                  </div>
                </td>
              </tr>
            ))}
            {(!posts || posts.length === 0) && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-500">
                  No content posts yet. Create your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
