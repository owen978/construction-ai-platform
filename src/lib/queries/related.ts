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
  // Every page on the site is about workflows and prompts, so these never signal a topic.
  'workflow', 'workflows', 'prompt', 'prompts', 'tool', 'tools', 'uk',
  'example', 'explained', 'practical',
  // Role names are 'X Manager': the shared 'manager' says nothing about the topic.
  'manager',
])

function tokens(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/[\s-]+/)
    // Light plural folding, so "Toolbox Talks" matches "Toolbox Talk" and "Method Statements" matches "Method Statement".
    .map((t) => (t.length > 4 && t.endsWith('s') && !t.endsWith('ss') ? t.slice(0, -1) : t))
    .filter((t) => t.length > 2 && !STOP.has(t) && !/^\d+$/.test(t)) // drop years like "2026"
}

// Calibrated on the live content (Oct 2026): two shared description words need
// a combined weight of 4.5, roughly two words that appear in under 5% of titles.
const MIN_CONTEXT_SCORE = 4.5
// A word in this many candidate titles or fewer is specific enough to match on alone.
const RARE_WORD_TITLES = 3

export type RelatedType = 'guide' | 'template' | 'workflow'

export interface RelatedItem {
  type: RelatedType
  slug: string
  title: string
  href: string
}

/** Drop related items the page already links elsewhere, so no link appears twice. */
export function withoutShown(
  items: RelatedItem[],
  shown: { workflows?: string[]; guides?: string[]; templates?: string[] }
): RelatedItem[] {
  const seen: Record<RelatedType, string[]> = {
    workflow: shown.workflows ?? [],
    guide: shown.guides ?? [],
    template: shown.templates ?? [],
  }
  return items.filter((i) => !seen[i.type].includes(i.slug))
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
  const [guidesRes, workflowsRes, templatesRes] = await Promise.all([
    supabase.from('guides').select('slug, title').eq('status', 'published'),
    supabase.from('workflows').select('slug, title').eq('status', 'published'),
    supabase.from('templates').select('slug, name').eq('status', 'published'),
  ])

  const guidesData = guidesRes.data ?? []
  const workflowsData = workflowsRes.data ?? []
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

  // A single shared title word only counts if it's the page's most distinctive
  // word that other titles use, or a rare word (in 3 titles or fewer): "Write a
  // Variation Assessment" should match variation pages, not every "assessment".
  const anchor = [...primary]
    .filter((t) => docFreq.has(t))
    .sort((a, b) => weight(b) - weight(a))[0]

  const scored = candidates
    .filter((c) => !(c.type === opts.excludeType && c.slug === opts.excludeSlug))
    .map((c) => {
      const ct = new Set(tokens(c.title))
      const titleHits = [...ct].filter((t) => primary.has(t))
      const contextHits = [...ct].filter((t) => secondary.has(t))
      const contextScore = contextHits.reduce((sum, t) => sum + weight(t), 0)
      const score = titleHits.reduce((sum, t) => sum + 2 * weight(t), 0) + contextScore
      const qualifies =
        titleHits.length >= 2 ||
        (titleHits.length === 1 && (titleHits[0] === anchor || (docFreq.get(titleHits[0]) ?? 0) <= RARE_WORD_TITLES)) ||
        (contextHits.length >= 2 && contextScore >= MIN_CONTEXT_SCORE)
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
