import { createClient } from '@/lib/supabase/server'
import type { Workflow, WorkflowWithRelations } from '@/types'

export async function getWorkflows(): Promise<Workflow[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('workflows')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function getWorkflowBySlug(slug: string): Promise<WorkflowWithRelations | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('workflows')
    .select('*, role:roles(*), task:tasks(*), tool:tools(*), guide:guides(*)')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }
  return data as WorkflowWithRelations
}

export async function getFeaturedWorkflows(limit: number = 6): Promise<Workflow[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('workflows')
    .select('*')
    .eq('status', 'published')
    .eq('featured', true)
    .order('sort_order', { ascending: true })
    .limit(limit)

  if (error) throw error
  return data ?? []
}

export async function getWorkflowsByRoleId(roleId: string): Promise<Workflow[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('workflows')
    .select('*')
    .eq('status', 'published')
    .eq('role_id', roleId)
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function getWorkflowsByTaskId(taskId: string): Promise<Workflow[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('workflows')
    .select('*')
    .eq('status', 'published')
    .eq('task_id', taskId)
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function getWorkflowsByToolId(toolId: string): Promise<Workflow[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('workflows')
    .select('*')
    .eq('status', 'published')
    .eq('tool_id', toolId)
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function getWorkflowSlugs(): Promise<{ slug: string }[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('workflows')
    .select('slug')
    .eq('status', 'published')

  if (error) throw error
  return data ?? []
}
