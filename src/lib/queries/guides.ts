import { createPublicClient } from '@/lib/supabase/public'
import type { Guide } from '@/types'

export async function getGuides(): Promise<Guide[]> {
  const supabase = createPublicClient()

  const { data, error } = await supabase
    .from('guides')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  const supabase = createPublicClient()

  const { data, error } = await supabase
    .from('guides')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }
  return data
}

export async function getFeaturedGuides(limit: number = 6): Promise<Guide[]> {
  const supabase = createPublicClient()

  const { data, error } = await supabase
    .from('guides')
    .select('*')
    .eq('status', 'published')
    .eq('featured', true)
    .order('sort_order', { ascending: true })
    .limit(limit)

  if (error) throw error
  return data ?? []
}

export async function getGuideSlugs(): Promise<{ slug: string }[]> {
  const supabase = createPublicClient()

  const { data, error } = await supabase
    .from('guides')
    .select('slug')
    .eq('status', 'published')

  if (error) throw error
  return data ?? []
}
