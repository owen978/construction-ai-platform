'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { generateSlug } from '@/lib/utils'
import type { RoleInsert, RoleUpdate } from '@/types'

export async function createRole(formData: FormData) {
  const supabase = createAdminClient()

  const name = formData.get('name') as string

  const role: RoleInsert = {
    name,
    slug: generateSlug(name),
    description: formData.get('description') as string || null,
    icon: formData.get('icon') as string || null,
    meta_title: formData.get('meta_title') as string || null,
    meta_description: formData.get('meta_description') as string || null,
    status: (formData.get('status') as string || 'draft') as RoleInsert['status'],
    sort_order: parseInt(formData.get('sort_order') as string || '0', 10),
  }

  const { error } = await supabase
    .from('roles')
    .insert(role)

  if (error) throw error

  revalidatePath('/roles')
  revalidatePath('/admin/roles')
  redirect('/admin/roles')
}

export async function updateRole(id: string, formData: FormData) {
  const supabase = createAdminClient()

  const name = formData.get('name') as string

  const role: RoleUpdate = {
    name,
    slug: generateSlug(name),
    description: formData.get('description') as string || null,
    icon: formData.get('icon') as string || null,
    meta_title: formData.get('meta_title') as string || null,
    meta_description: formData.get('meta_description') as string || null,
    status: (formData.get('status') as string || 'draft') as RoleUpdate['status'],
    sort_order: parseInt(formData.get('sort_order') as string || '0', 10),
  }

  const { error } = await supabase
    .from('roles')
    .update(role)
    .eq('id', id)

  if (error) throw error

  revalidatePath('/roles')
  revalidatePath('/admin/roles')
  redirect('/admin/roles')
}

export async function deleteRole(id: string) {
  const supabase = createAdminClient()

  const { error } = await supabase
    .from('roles')
    .delete()
    .eq('id', id)

  if (error) throw error

  revalidatePath('/roles')
  revalidatePath('/admin/roles')
}
