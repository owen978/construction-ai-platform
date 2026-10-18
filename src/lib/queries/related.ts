import { createPublicClient } from '@/lib/supabase/public'

/**
 * Topic-based related-content matcher. The data model only has FK relations
 * (workflows -> role/task/tool/guide), so guides, templates and workflows are
 * not otherwise cross-linked. This matches them by shared keyword tokens in
 * their titles, giving every detail page a "Related resources" block. That
 * spreads internal links across clusters and helps thin/unindexed pages get
 * crawled and ranked.
 *
 * A candidate must share a word with the page's own title, or share at least
 * two uncommon words with its description. Words are weighted by how rare they
 * are across candidate titles, so one generic word ("risk", "projects") can't
 * pull in an unrelated item. Pages with no real match get no block.
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

// Calibrated on the live content (Oct 2026): two shared description words need
// a combined weight of 4.5, roughly two words that appear in under 5% of titles.
const MIN_CONTEXT_SCORE = 4.5

export type RelatedType = 'guide' | 'template' | 'workflow'

export interface RelatedItem {
  type: RelatedType
  slug: string
  title: string
  href: string
}

interface GetRelatedOptions {
  /** The page's own title or name; any shared word here qualifies a candidate. */
  title: string
  /** Description or keyword text; adds weight, and qualifies on its own only with 2+ rare shared words. */
  context?: string
  excludeType: RelatedType | null
  excludeSlug: string
  limit?: number
}

export async function getRelatedContent(opts: GetRelatedOptions): Promise<RelatedItem[]> {
  const primary = new Set(tokens(opts.title))
  const secondary = new Set(tokens(opts.context ?? '').filter((t) => !primary.has(t)))
  if (primary.size === 0 && secondary.size === 0) return []

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

  // Inverse document frequency over candidate titles: rare words count for more.
  const docFreq = new Map<string, number>()
  for (const c of candidates) for (const t of new Set(tokens(c.title))) docFreq.set(t, (docFreq.get(t) ?? 0) + 1)
  const weight = (t: string) => Math.log((candidates.length + 1) / ((docFreq.get(t) ?? 0) + 1)) + 1

  const scored = candidates
    .filter((c) => !(c.type === opts.excludeType && c.slug === opts.excludeSlug))
    .map((c) => {
      const ct = new Set(tokens(c.title))
      const titleHits = [...ct].filter((t) => primary.has(t))
      const contextHits = [...ct].filter((t) => secondary.has(t))
      const contextScore = contextHits.reduce((sum, t) => sum + weight(t), 0)
      const score = titleHits.reduce((sum, t) => sum + 2 * weight(t), 0) + contextScore
      const qualifies =
        titleHits.length > 0 || (contextHits.length >= 2 && contextScore >= MIN_CONTEXT_SCORE)
      return { c, score, qualifies }
    })
    .filter((x) => x.qualifies)
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
