export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { updateWorkflow } from '@/lib/actions/workflows'
import { WorkflowForm } from '@/components/admin/workflow-form'
import type { Workflow, Role, Task, Tool, Guide } from '@/types'
import { requireAdmin } from '@/lib/auth'

interface EditWorkflowPageProps {
  params: Promise<{ id: string }>
}

export default async function EditWorkflowPage({ params }: EditWorkflowPageProps) {
  await requireAdmin()
  const { id } = await params
  const supabase = createAdminClient()

  const [
    { data: workflowData },
    { data: rolesData },
    { data: tasksData },
    { data: toolsData },
    { data: guidesData },
  ] = await Promise.all([
    supabase.from('workflows').select('*').eq('id', id).single(),
    supabase.from('roles').select('*').order('name'),
    supabase.from('tasks').select('*').order('name'),
    supabase.from('tools').select('*').order('name'),
    supabase.from('guides').select('*').order('title'),
  ])

  const workflow = workflowData as Workflow | null
  const roles = rolesData as Role[] | null
  const tasks = tasksData as Task[] | null
  const tools = toolsData as Tool[] | null
  const guides = guidesData as Guide[] | null

  if (!workflow) {
    notFound()
  }

  const updateWithId = updateWorkflow.bind(null, workflow.id)

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Edit Workflow</h1>
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <WorkflowForm
          action={updateWithId}
          workflow={workflow}
          roles={roles ?? []}
          tasks={tasks ?? []}
          tools={tools ?? []}
          guides={guides ?? []}
        />
      </div>
    </div>
  )
}
