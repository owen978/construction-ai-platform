import { createClient } from '@/lib/supabase/server'
import type { Tool } from '@/types'

export async function getTools(): Promise<Tool[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('tools')
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

export async function getFeaturedTools(limit: number = 6): Promise<Tool[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('status', 'published')
    .eq('featured', true)
    .order('sort_order', { ascending: true })
    .limit(limit)

  if (error) throw error
  return data ?? []
}
