import { createPublicClient } from '@/lib/supabase/public'
import type { Role } from '@/types'

export async function getRoles(): Promise<Role[]> {
  const supabase = createPublicClient()

  const { data, error } = await supabase
    .from('roles')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function getRoleBySlug(slug: string): Promise<Role | null> {
  const supabase = createPublicClient()

  const { data, error } = await supabase
    .from('roles')
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

export async function getRoleSlugs(): Promise<{ slug: string }[]> {
  const supabase = createPublicClient()

  const { data, error } = await supabase
    .from('roles')
    .select('slug')
    .eq('status', 'published')

  if (error) throw error
  return data ?? []
}
