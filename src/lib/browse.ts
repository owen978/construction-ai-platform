import { createPublicClient } from '@/lib/supabase/public'
import { getPublishedIdeas, ideaPath, londonDate, roleLabel, timeSavedLabel, toolLabel, toolPageSlug } from '@/lib/daily-ideas'

/**
 * Everything a visitor can browse on /daily: the daily ideas plus the
 * library's workflows, guides and templates, newest first. Daily ideas show
 * their date; library items don't (most arrived in one upload), but still
 * sort by when they were added and keep their own pages and URLs.
 */
export type BrowseKind = 'daily' | 'workflow' | 'guide' | 'template'

export interface BrowseItem {
  key: string
  kind: BrowseKind
  number: number // 1 = the oldest item, so the count grows by one a day
  title: string
  description: string | null
  href: string
  date: string | null // YYYY-MM-DD, daily ideas only
  isToday: boolean
  roles: { slug: string; label: string }[]
  tool: { key: string; label: string } | null
  time: string | null
}

export const KIND_LABELS: Record<BrowseKind, string> = {
  daily: 'Workflow of the day',
  workflow: 'Workflow',
  guide: 'Guide',
  template: 'Template',
}

type Row = Omit<BrowseItem, 'number'> & { sortKey: string }

export async function getBrowseItems(today = londonDate()): Promise<BrowseItem[]> {
  const supabase = createPublicClient()
  const [workflows, guides, templates] = await Promise.all([
    supabase
      .from('workflows')
      .select('slug, title, description, created_at, sort_order, role:roles(slug, name), tool:tools(slug, name)')
      .eq('status', 'published'),
    supabase.from('guides').select('slug, title, description, created_at').eq('status', 'published'),
    supabase.from('templates').select('slug, name, description, created_at, sort_order').eq('status', 'published'),
  ])

  const rows: Row[] = []

  for (const idea of getPublishedIdeas(today)) {
    const toolKey = toolPageSlug(idea.tool) ?? idea.tool
    rows.push({
      key: `daily-${idea.publishDate}`,
      kind: 'daily',
      title: idea.title,
      description: idea.summary,
      href: ideaPath(idea),
      date: idea.publishDate,
      isToday: idea.publishDate === today,
      roles: idea.roles.map((r) => ({ slug: r, label: roleLabel(r) })),
      tool: { key: toolKey, label: toolLabel(idea.tool) },
      time: timeSavedLabel(idea),
      // Daily ideas sort by their day, after anything added earlier that day.
      sortKey: `${idea.publishDate}T23:59:59`,
    })
  }

  type WorkflowRow = {
    slug: string
    title: string
    description: string | null
    created_at: string
    role: { slug: string; name: string } | null
    tool: { slug: string; name: string } | null
  }
  for (const w of (workflows.data ?? []) as unknown as WorkflowRow[]) {
    rows.push({
      key: `workflow-${w.slug}`,
      kind: 'workflow',
      title: w.title,
      description: w.description,
      href: `/ai-workflows/${w.slug}`,
      date: null,
      isToday: false,
      roles: w.role ? [{ slug: w.role.slug, label: w.role.name }] : [],
      tool: w.tool ? { key: w.tool.slug, label: w.tool.name } : null,
      time: null,
      sortKey: w.created_at,
    })
  }
  for (const g of guides.data ?? []) {
    rows.push({
      key: `guide-${g.slug}`,
      kind: 'guide',
      title: g.title,
      description: g.description,
      href: `/guides/${g.slug}`,
      date: null,
      isToday: false,
      roles: [],
      tool: null,
      time: null,
      sortKey: g.created_at,
    })
  }
  for (const t of templates.data ?? []) {
    rows.push({
      key: `template-${t.slug}`,
      kind: 'template',
      title: t.name,
      description: t.description,
      href: `/templates/${t.slug}`,
      date: null,
      isToday: false,
      roles: [],
      tool: null,
      time: null,
      sortKey: t.created_at,
    })
  }

  // Oldest first to number them, then newest first for display.
  rows.sort((a, b) => a.sortKey.localeCompare(b.sortKey) || a.key.localeCompare(b.key))
  return rows
    .map((row, i) => {
      const { sortKey, ...item } = row
      void sortKey
      return { ...item, number: i + 1 }
    })
    .reverse()
}
