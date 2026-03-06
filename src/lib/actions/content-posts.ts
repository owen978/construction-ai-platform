'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { generateSlug } from '@/lib/utils'
import type { ContentPostInsert, ContentPostUpdate } from '@/types'

export async function createContentPost(formData: FormData) {
  const supabase = createAdminClient()

  const title = formData.get('title') as string

  const post: ContentPostInsert = {
    title,
    slug: generateSlug(title),
    body: formData.get('body') as string || null,
    excerpt: formData.get('excerpt') as string || null,
    platform: formData.get('platform') as string || null,
    content_type: formData.get('content_type') as string || null,
    image_url: formData.get('image_url') as string || null,
    cta: formData.get('cta') as string || null,
    hashtags: formData.get('hashtags') as string || null,
    meta_title: formData.get('meta_title') as string || null,
    meta_description: formData.get('meta_description') as string || null,
    status: (formData.get('status') as string || 'draft') as ContentPostInsert['status'],
    published_at: formData.get('published_at') as string || null,
  }

  const { error } = await supabase
    .from('content_posts')
    .insert(post)

  if (error) throw error

  revalidatePath('/content')
  revalidatePath('/admin/content-posts')
  redirect('/admin/content-posts')
}

export async function updateContentPost(id: string, formData: FormData) {
  const supabase = createAdminClient()

  const title = formData.get('title') as string

  const post: ContentPostUpdate = {
    title,
    slug: generateSlug(title),
    body: formData.get('body') as string || null,
    excerpt: formData.get('excerpt') as string || null,
    platform: formData.get('platform') as string || null,
    content_type: formData.get('content_type') as string || null,
    image_url: formData.get('image_url') as string || null,
    cta: formData.get('cta') as string || null,
    hashtags: formData.get('hashtags') as string || null,
    meta_title: formData.get('meta_title') as string || null,
    meta_description: formData.get('meta_description') as string || null,
    status: (formData.get('status') as string || 'draft') as ContentPostUpdate['status'],
    published_at: formData.get('published_at') as string || null,
  }

  const { error } = await supabase
    .from('content_posts')
    .update(post)
    .eq('id', id)

  if (error) throw error

  revalidatePath('/content')
  revalidatePath('/admin/content-posts')
  redirect('/admin/content-posts')
}

export async function deleteContentPost(id: string) {
  const supabase = createAdminClient()

  const { error } = await supabase
    .from('content_posts')
    .delete()
    .eq('id', id)

  if (error) throw error

  revalidatePath('/content')
  revalidatePath('/admin/content-posts')
}
