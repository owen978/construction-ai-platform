import { createPublicClient } from '@/lib/supabase/public'

/**
 * Topic-based related-content matcher. The data model only has FK relations
 * (workflows -> role/task/tool/guide), so guides, templates and workflows are
 * not otherwise cross-linked. This matches them by shared keyword tokens in
 * their titles, giving every detail page a "Related resources" block. That
 * spreads internal links across clusters and helps thin/unindexed pages get
 * crawled and ranked.
 */

const STOP = new Set([
  'ai', 'for', 'the', 'a', 'an', 'to', 'and', 'of', 'in', 'on', 'with', 'your',
  'how', 'what', 'is', 'are', 'construction', 'guide', 'guides', 'template',
  'templates', 'generate', 'draft', 'write', 'create', 'build', 'building',
  'using', 'use', 'free', 'complete', 'step', 'by',
])

function tokens(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/[\s-]+/)
    .filter((t) => t.length > 2 && !STOP.has(t))
}

export type RelatedType = 'guide' | 'template' | 'workflow'

export interface RelatedItem {
  type: RelatedType
  slug: string
  title: string
  href: string
}

interface GetRelatedOptions {
  keywords: string
  excludeType: RelatedType | null
  excludeSlug: string
  limit?: number
}

export async function getRelatedContent(opts: GetRelatedOptions): Promise<RelatedItem[]> {
  const want = new Set(tokens(opts.keywords))
  if (want.size === 0) return []

  const supabase = createPublicClient()
  const [guidesRes, workflowsRes] = await Promise.all([
    supabase.from('guides').select('slug, title').eq('status', 'published'),
    supabase.from('workflows').select('slug, title').eq('status', 'published'),
  ])
  // The templates table is not in the generated Database types, so query it untyped.
  const templatesRes = await (supabase as unknown as {
    from: (t: string) => {
      select: (c: string) => { eq: (k: string, v: string) => Promise<{ data: { slug: string; name: string }[] | null }> }
    }
  })
    .from('templates')
    .select('slug, name')
    .eq('status', 'published')

  const guidesData = (guidesRes.data ?? []) as { slug: string; title: string }[]
  const workflowsData = (workflowsRes.data ?? []) as { slug: string; title: string }[]
  const templatesData = templatesRes.data ?? []

  const candidates: RelatedItem[] = []
  for (const g of guidesData) {
    candidates.push({ type: 'guide', slug: g.slug, title: g.title, href: `/guides/${g.slug}` })
  }
  for (const t of templatesData) {
    candidates.push({ type: 'template', slug: t.slug, title: t.name, href: `/templates/${t.slug}` })
  }
  for (const w of workflowsData) {
    candidates.push({ type: 'workflow', slug: w.slug, title: w.title, href: `/ai-workflows/${w.slug}` })
  }

  const scored = candidates
    .filter((c) => !(c.type === opts.excludeType && c.slug === opts.excludeSlug))
    .map((c) => {
      const ct = tokens(c.title)
      let score = 0
      for (const t of ct) if (want.has(t)) score += 1
      return { c, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)

  // Prefer a mix of types so a page links across clusters, not just to siblings.
  const limit = opts.limit ?? 6
  const out: RelatedItem[] = []
  const perType: Record<RelatedType, number> = { guide: 0, template: 0, workflow: 0 }
  for (const { c } of scored) {
    if (perType[c.type] >= Math.ceil(limit / 2)) continue
    out.push(c)
    perType[c.type] += 1
    if (out.length >= limit) break
  }
  // Backfill if type-capping left us short.
  if (out.length < limit) {
    for (const { c } of scored) {
      if (out.find((o) => o.href === c.href)) continue
      out.push(c)
      if (out.length >= limit) break
    }
  }
  return out
}
