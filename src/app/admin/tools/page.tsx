import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { deleteTool } from '@/lib/actions/tools'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button-variants'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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
        <h1 className="text-2xl font-bold text-foreground">Tools</h1>
        <Link href="/admin/tools/new" className={buttonVariants()}>New Tool</Link>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Pricing</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tools?.map((tool) => (
              <TableRow key={tool.id}>
                <TableCell className="font-medium">{tool.name}</TableCell>
                <TableCell>
                  <Badge variant={tool.status === 'published' ? 'success' : tool.status === 'draft' ? 'warning' : 'default'}>
                    {tool.status}
                  </Badge>
                </TableCell>
                <TableCell>{tool.category ?? '-'}</TableCell>
                <TableCell>{tool.pricing ?? '-'}</TableCell>
                <TableCell>{tool.featured ? 'Yes' : 'No'}</TableCell>
                <TableCell className="text-muted-foreground">{formatDate(tool.updated_at)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/tools/${tool.id}/edit`} className={buttonVariants({ variant: "ghost", size: "sm" })}>Edit</Link>
                    <DeleteButton id={tool.id} action={deleteTool} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {(!tools || tools.length === 0) && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No tools yet. Create your first one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
