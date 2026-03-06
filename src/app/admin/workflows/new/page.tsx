export const dynamic = 'force-dynamic'

import { createAdminClient } from '@/lib/supabase/admin'
import { createWorkflow } from '@/lib/actions/workflows'
import { WorkflowForm } from '@/components/admin/workflow-form'
import type { Role, Task, Tool, Guide } from '@/types'
import { requireAdmin } from '@/lib/auth'

export default async function NewWorkflowPage() {
  await requireAdmin()
  const supabase = createAdminClient()

  const [
    { data: rolesData },
    { data: tasksData },
    { data: toolsData },
    { data: guidesData },
  ] = await Promise.all([
    supabase.from('roles').select('*').order('name'),
    supabase.from('tasks').select('*').order('name'),
    supabase.from('tools').select('*').order('name'),
    supabase.from('guides').select('*').order('title'),
  ])

  const roles = rolesData as Role[] | null
  const tasks = tasksData as Task[] | null
  const tools = toolsData as Tool[] | null
  const guides = guidesData as Guide[] | null

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">New Workflow</h1>
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <WorkflowForm
          action={createWorkflow}
          roles={roles ?? []}
          tasks={tasks ?? []}
          tools={tools ?? []}
          guides={guides ?? []}
        />
      </div>
    </div>
  )
}
