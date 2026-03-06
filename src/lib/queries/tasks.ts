import { createClient } from '@/lib/supabase/server'
import type { Task } from '@/types'

export async function getTasks(): Promise<Task[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function getTaskBySlug(slug: string): Promise<Task | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('tasks')
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

export async function getTaskSlugs(): Promise<{ slug: string }[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('tasks')
    .select('slug')
    .eq('status', 'published')

  if (error) throw error
  return data ?? []
}
