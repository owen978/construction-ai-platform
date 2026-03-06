'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { generateSlug } from '@/lib/utils'
import type { GuideInsert, GuideUpdate } from '@/types'

export async function createGuide(formData: FormData) {
  const supabase = createAdminClient()

  const title = formData.get('title') as string

  const guide: GuideInsert = {
    title,
    slug: generateSlug(title),
    description: formData.get('description') as string || null,
    content: formData.get('content') as string || null,
    difficulty: (formData.get('difficulty') as string || 'beginner') as GuideInsert['difficulty'],
    reading_time_minutes: formData.get('reading_time_minutes')
      ? parseInt(formData.get('reading_time_minutes') as string, 10)
      : null,
    icon: formData.get('icon') as string || null,
    meta_title: formData.get('meta_title') as string || null,
    meta_description: formData.get('meta_description') as string || null,
    status: (formData.get('status') as string || 'draft') as GuideInsert['status'],
    featured: formData.get('featured') === 'on',
    sort_order: parseInt(formData.get('sort_order') as string || '0', 10),
  }

  const { error } = await supabase
    .from('guides')
    .insert(guide)

  if (error) throw error

  revalidatePath('/guides')
  revalidatePath('/admin/guides')
  redirect('/admin/guides')
}

export async function updateGuide(id: string, formData: FormData) {
  const supabase = createAdminClient()

  const title = formData.get('title') as string

  const guide: GuideUpdate = {
    title,
    slug: generateSlug(title),
    description: formData.get('description') as string || null,
    content: formData.get('content') as string || null,
    difficulty: (formData.get('difficulty') as string || 'beginner') as GuideUpdate['difficulty'],
    reading_time_minutes: formData.get('reading_time_minutes')
      ? parseInt(formData.get('reading_time_minutes') as string, 10)
      : null,
    icon: formData.get('icon') as string || null,
    meta_title: formData.get('meta_title') as string || null,
    meta_description: formData.get('meta_description') as string || null,
    status: (formData.get('status') as string || 'draft') as GuideUpdate['status'],
    featured: formData.get('featured') === 'on',
    sort_order: parseInt(formData.get('sort_order') as string || '0', 10),
  }

  const { error } = await supabase
    .from('guides')
    .update(guide)
    .eq('id', id)

  if (error) throw error

  revalidatePath('/guides')
  revalidatePath('/admin/guides')
  redirect('/admin/guides')
}

export async function deleteGuide(id: string) {
  const supabase = createAdminClient()

  const { error } = await supabase
    .from('guides')
    .delete()
    .eq('id', id)

  if (error) throw error

  revalidatePath('/guides')
  revalidatePath('/admin/guides')
}
