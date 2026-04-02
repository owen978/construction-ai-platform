import { createPublicClient } from '@/lib/supabase/public'
import type { Template } from '@/types'

// Note: 'templates' table is not yet in the generated database types.
// Using type assertion until types are regenerated with `supabase gen types`.

export async function getTemplates(): Promise<Template[]> {
  const supabase = createPublicClient()

  const { data, error } = await (supabase as any)
    .from('templates')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true })

  if (error) throw error
  return (data ?? []) as Template[]
}

export async function getTemplateBySlug(slug: string): Promise<Template | null> {
  const supabase = createPublicClient()

  const { data, error } = await (supabase as any)
    .from('templates')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }
  return data as Template
}

export async function getTemplateSlugs(): Promise<{ slug: string }[]> {
  const supabase = createPublicClient()

  const { data, error } = await (supabase as any)
    .from('templates')
    .select('slug')
    .eq('status', 'published')

  if (error) throw error
  return (data ?? []) as { slug: string }[]
}
