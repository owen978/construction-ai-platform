import { createPublicClient } from '@/lib/supabase/public'

export interface ContentCounts {
  workflows: number
  templates: number
  guides: number
  roles: number
}

/** Live counts of published content, for the homepage stats and hub descriptions. */
export async function getContentCounts(): Promise<ContentCounts> {
  const supabase = createPublicClient()
  const count = async (table: 'workflows' | 'templates' | 'guides' | 'roles') => {
    const { count, error } = await supabase
      .from(table)
      .select('id', { count: 'exact', head: true })
      .eq('status', 'published')
    if (error) throw error
    return count ?? 0
  }
  const [workflows, templates, guides, roles] = await Promise.all([
    count('workflows'),
    count('templates'),
    count('guides'),
    count('roles'),
  ])
  return { workflows, templates, guides, roles }
}
