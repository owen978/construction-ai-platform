import { createPublicClient } from '@/lib/supabase/public'
import { isToolVisible } from '@/lib/features'
import type { Tool } from '@/types'

export async function getTools(): Promise<Tool[]> {
  const supabase = createPublicClient()

  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true })

  if (error) throw error
  return (data ?? []).filter((t) => isToolVisible(t.slug))
}

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  if (!isToolVisible(slug)) return null

  const supabase = createPublicClient()

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
  const supabase = createPublicClient()

  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('status', 'published')
    .eq('featured', true)
    .order('sort_order', { ascending: true })

  if (error) throw error
  return (data ?? []).filter((t) => isToolVisible(t.slug)).slice(0, limit)
}

export async function getOtherTools(excludeSlug: string, limit: number = 5): Promise<Tool[]> {
  const supabase = createPublicClient()

  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('status', 'published')
    .neq('slug', excludeSlug)
    .order('sort_order', { ascending: true })

  if (error) throw error
  return (data ?? []).filter((t) => isToolVisible(t.slug)).slice(0, limit)
}

export async function getToolSlugs(): Promise<{ slug: string }[]> {
  const supabase = createPublicClient()

  const { data, error } = await supabase
    .from('tools')
    .select('slug')
    .eq('status', 'published')

  if (error) throw error
  return (data ?? []).filter((t) => isToolVisible(t.slug))
}
