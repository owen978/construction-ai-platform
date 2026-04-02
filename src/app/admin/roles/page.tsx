import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { deleteRole } from '@/lib/actions/roles'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button-variants'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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
        <h1 className="text-2xl font-bold text-foreground">Roles</h1>
        <Link href="/admin/roles/new" className={buttonVariants()}>New Role</Link>
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
            {roles?.map((role) => (
              <TableRow key={role.id}>
                <TableCell className="text-2xl">{role.icon || '-'}</TableCell>
                <TableCell className="font-medium">{role.name}</TableCell>
                <TableCell>
                  <Badge variant={role.status === 'published' ? 'success' : role.status === 'draft' ? 'warning' : 'default'}>
                    {role.status}
                  </Badge>
                </TableCell>
                <TableCell>{role.sort_order}</TableCell>
                <TableCell className="text-muted-foreground">{formatDate(role.updated_at)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/roles/${role.id}/edit`} className={buttonVariants({ variant: "ghost", size: "sm" })}>Edit</Link>
                    <DeleteButton id={role.id} action={deleteRole} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {(!roles || roles.length === 0) && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No roles yet. Create your first one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
