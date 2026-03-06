'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { generateSlug } from '@/lib/utils'
import type { TaskInsert, TaskUpdate } from '@/types'

export async function createTask(formData: FormData) {
  const supabase = createAdminClient()

  const name = formData.get('name') as string

  const task: TaskInsert = {
    name,
    slug: generateSlug(name),
    description: formData.get('description') as string || null,
    icon: formData.get('icon') as string || null,
    meta_title: formData.get('meta_title') as string || null,
    meta_description: formData.get('meta_description') as string || null,
    status: (formData.get('status') as string || 'draft') as TaskInsert['status'],
    sort_order: parseInt(formData.get('sort_order') as string || '0', 10),
  }

  const { error } = await supabase
    .from('tasks')
    .insert(task)

  if (error) throw error

  revalidatePath('/tasks')
  revalidatePath('/admin/tasks')
  redirect('/admin/tasks')
}

export async function updateTask(id: string, formData: FormData) {
  const supabase = createAdminClient()

  const name = formData.get('name') as string

  const task: TaskUpdate = {
    name,
    slug: generateSlug(name),
    description: formData.get('description') as string || null,
    icon: formData.get('icon') as string || null,
    meta_title: formData.get('meta_title') as string || null,
    meta_description: formData.get('meta_description') as string || null,
    status: (formData.get('status') as string || 'draft') as TaskUpdate['status'],
    sort_order: parseInt(formData.get('sort_order') as string || '0', 10),
  }

  const { error } = await supabase
    .from('tasks')
    .update(task)
    .eq('id', id)

  if (error) throw error

  revalidatePath('/tasks')
  revalidatePath('/admin/tasks')
  redirect('/admin/tasks')
}

export async function deleteTask(id: string) {
  const supabase = createAdminClient()

  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)

  if (error) throw error

  revalidatePath('/tasks')
  revalidatePath('/admin/tasks')
}
