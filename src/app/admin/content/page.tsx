import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { deleteContentPost } from '@/lib/actions/content-posts'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button-variants'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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
        <h1 className="text-2xl font-bold text-foreground">Content Posts</h1>
        <Link href="/admin/content/new" className={buttonVariants()}>New Post</Link>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts?.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>
                  <Badge variant={post.status === 'published' ? 'success' : post.status === 'draft' ? 'warning' : 'default'}>
                    {post.status}
                  </Badge>
                </TableCell>
                <TableCell>{post.platform ?? '-'}</TableCell>
                <TableCell>{post.content_type ?? '-'}</TableCell>
                <TableCell className="text-muted-foreground">{formatDate(post.updated_at)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/content/${post.id}/edit`} className={buttonVariants({ variant: "ghost", size: "sm" })}>Edit</Link>
                    <DeleteButton id={post.id} action={deleteContentPost} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {(!posts || posts.length === 0) && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No content posts yet. Create your first one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
