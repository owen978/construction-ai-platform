'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { generateSlug } from '@/lib/utils'
import type { WorkflowInsert, WorkflowUpdate } from '@/types'

export async function createWorkflow(formData: FormData) {
  const supabase = createAdminClient()

  const title = formData.get('title') as string
  const roleId = formData.get('role_id') as string
  const taskId = formData.get('task_id') as string
  const toolId = formData.get('tool_id') as string
  const guideId = formData.get('guide_id') as string

  const workflow: WorkflowInsert = {
    title,
    slug: generateSlug(title),
    description: formData.get('description') as string || null,
    long_description: formData.get('long_description') as string || null,
    prompt: formData.get('prompt') as string || null,
    example_output: formData.get('example_output') as string || null,
    use_case: formData.get('use_case') as string || null,
    difficulty: (formData.get('difficulty') as string || 'beginner') as WorkflowInsert['difficulty'],
    icon: formData.get('icon') as string || null,
    meta_title: formData.get('meta_title') as string || null,
    meta_description: formData.get('meta_description') as string || null,
    status: (formData.get('status') as string || 'draft') as WorkflowInsert['status'],
    featured: formData.get('featured') === 'on',
    sort_order: parseInt(formData.get('sort_order') as string || '0', 10),
    role_id: roleId || null,
    task_id: taskId || null,
    tool_id: toolId || null,
    guide_id: guideId || null,
  }

  const { error } = await supabase
    .from('workflows')
    .insert(workflow)

  if (error) throw error

  revalidatePath('/ai-workflows')
  revalidatePath('/admin/workflows')
  redirect('/admin/workflows')
}

export async function updateWorkflow(id: string, formData: FormData) {
  const supabase = createAdminClient()

  const title = formData.get('title') as string
  const roleId = formData.get('role_id') as string
  const taskId = formData.get('task_id') as string
  const toolId = formData.get('tool_id') as string
  const guideId = formData.get('guide_id') as string

  const workflow: WorkflowUpdate = {
    title,
    slug: generateSlug(title),
    description: formData.get('description') as string || null,
    long_description: formData.get('long_description') as string || null,
    prompt: formData.get('prompt') as string || null,
    example_output: formData.get('example_output') as string || null,
    use_case: formData.get('use_case') as string || null,
    difficulty: (formData.get('difficulty') as string || 'beginner') as WorkflowUpdate['difficulty'],
    icon: formData.get('icon') as string || null,
    meta_title: formData.get('meta_title') as string || null,
    meta_description: formData.get('meta_description') as string || null,
    status: (formData.get('status') as string || 'draft') as WorkflowUpdate['status'],
    featured: formData.get('featured') === 'on',
    sort_order: parseInt(formData.get('sort_order') as string || '0', 10),
    role_id: roleId || null,
    task_id: taskId || null,
    tool_id: toolId || null,
    guide_id: guideId || null,
  }

  const { error } = await supabase
    .from('workflows')
    .update(workflow)
    .eq('id', id)

  if (error) throw error

  revalidatePath('/ai-workflows')
  revalidatePath('/admin/workflows')
  redirect('/admin/workflows')
}

export async function deleteWorkflow(id: string) {
  const supabase = createAdminClient()

  const { error } = await supabase
    .from('workflows')
    .delete()
    .eq('id', id)

  if (error) throw error

  revalidatePath('/ai-workflows')
  revalidatePath('/admin/workflows')
}
