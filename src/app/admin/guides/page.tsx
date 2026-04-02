import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { deleteGuide } from '@/lib/actions/guides'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button-variants'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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
        <h1 className="text-2xl font-bold text-foreground">Guides</h1>
        <Link href="/admin/guides/new" className={buttonVariants()}>New Guide</Link>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Reading Time</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {guides?.map((guide) => (
              <TableRow key={guide.id}>
                <TableCell className="font-medium">{guide.title}</TableCell>
                <TableCell>
                  <Badge variant={guide.status === 'published' ? 'success' : guide.status === 'draft' ? 'warning' : 'default'}>
                    {guide.status}
                  </Badge>
                </TableCell>
                <TableCell>{guide.difficulty}</TableCell>
                <TableCell>
                  {guide.reading_time_minutes != null ? `${guide.reading_time_minutes} min` : '-'}
                </TableCell>
                <TableCell>{guide.featured ? 'Yes' : 'No'}</TableCell>
                <TableCell className="text-muted-foreground">{formatDate(guide.updated_at)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/guides/${guide.id}/edit`} className={buttonVariants({ variant: "ghost", size: "sm" })}>Edit</Link>
                    <DeleteButton id={guide.id} action={deleteGuide} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {(!guides || guides.length === 0) && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No guides yet. Create your first one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
