'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { generateSlug } from '@/lib/utils'
import type { ToolInsert, ToolUpdate } from '@/types'

export async function createTool(formData: FormData) {
  const supabase = createAdminClient()

  const name = formData.get('name') as string

  const tool: ToolInsert = {
    name,
    slug: generateSlug(name),
    description: formData.get('description') as string || null,
    long_description: formData.get('long_description') as string || null,
    url: formData.get('url') as string || null,
    logo_url: formData.get('logo_url') as string || null,
    category: formData.get('category') as string || null,
    pricing: formData.get('pricing') as string || null,
    meta_title: formData.get('meta_title') as string || null,
    meta_description: formData.get('meta_description') as string || null,
    status: (formData.get('status') as string || 'draft') as ToolInsert['status'],
    featured: formData.get('featured') === 'on',
    sort_order: parseInt(formData.get('sort_order') as string || '0', 10),
  }

  const { error } = await supabase
    .from('tools')
    .insert(tool)

  if (error) throw error

  revalidatePath('/ai-tools')
  revalidatePath('/admin/tools')
  redirect('/admin/tools')
}

export async function updateTool(id: string, formData: FormData) {
  const supabase = createAdminClient()

  const name = formData.get('name') as string

  const tool: ToolUpdate = {
    name,
    slug: generateSlug(name),
    description: formData.get('description') as string || null,
    long_description: formData.get('long_description') as string || null,
    url: formData.get('url') as string || null,
    logo_url: formData.get('logo_url') as string || null,
    category: formData.get('category') as string || null,
    pricing: formData.get('pricing') as string || null,
    meta_title: formData.get('meta_title') as string || null,
    meta_description: formData.get('meta_description') as string || null,
    status: (formData.get('status') as string || 'draft') as ToolUpdate['status'],
    featured: formData.get('featured') === 'on',
    sort_order: parseInt(formData.get('sort_order') as string || '0', 10),
  }

  const { error } = await supabase
    .from('tools')
    .update(tool)
    .eq('id', id)

  if (error) throw error

  revalidatePath('/ai-tools')
  revalidatePath('/admin/tools')
  redirect('/admin/tools')
}

export async function deleteTool(id: string) {
  const supabase = createAdminClient()

  const { error } = await supabase
    .from('tools')
    .delete()
    .eq('id', id)

  if (error) throw error

  revalidatePath('/ai-tools')
  revalidatePath('/admin/tools')
}
