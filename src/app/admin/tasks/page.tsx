import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { deleteTask } from '@/lib/actions/tasks'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button-variants'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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
        <h1 className="text-2xl font-bold text-foreground">Tasks</h1>
        <Link href="/admin/tasks/new" className={buttonVariants()}>New Task</Link>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Icon</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sort Order</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks?.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="text-2xl">{task.icon || '-'}</TableCell>
                <TableCell className="font-medium">{task.name}</TableCell>
                <TableCell>
                  <Badge variant={task.status === 'published' ? 'success' : task.status === 'draft' ? 'warning' : 'default'}>
                    {task.status}
                  </Badge>
                </TableCell>
                <TableCell>{task.sort_order}</TableCell>
                <TableCell className="text-muted-foreground">{formatDate(task.updated_at)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/tasks/${task.id}/edit`} className={buttonVariants({ variant: "ghost", size: "sm" })}>Edit</Link>
                    <DeleteButton id={task.id} action={deleteTask} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {(!tasks || tasks.length === 0) && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No tasks yet. Create your first one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
