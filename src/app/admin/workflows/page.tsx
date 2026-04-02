export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { deleteWorkflow } from '@/lib/actions/workflows'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button-variants'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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
        <h1 className="text-2xl font-bold text-foreground">Workflows</h1>
        <Link href="/admin/workflows/new" className={buttonVariants()}>New Workflow</Link>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workflows?.map((workflow) => (
              <TableRow key={workflow.id}>
                <TableCell className="font-medium">{workflow.title}</TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>{workflow.difficulty}</TableCell>
                <TableCell>
                  {(workflow.role as { name: string } | null)?.name ?? '-'}
                </TableCell>
                <TableCell>{workflow.featured ? 'Yes' : 'No'}</TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(workflow.updated_at)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/workflows/${workflow.id}/edit`} className={buttonVariants({ variant: "ghost", size: "sm" })}>Edit</Link>
                    <DeleteButton id={workflow.id} action={deleteWorkflow} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {(!workflows || workflows.length === 0) && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No workflows yet. Create your first one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
