import rawBodies from '@/content/page-bodies.generated.json'

/**
 * Written page bodies for template and tool pages, compiled from
 * marketing/page-bodies/<section>/<slug>.md. Where a page has one, it
 * replaces the page's fixed database sections. Drafts only show in local
 * development.
 */
export interface PageBody {
  status: 'draft' | 'approved'
  h1: string
  /** The opening answer, shown under the H1. */
  intro: string
  /** Markdown: question headings, QS take, FAQ. */
  body: string
}

const ALL = rawBodies as Record<string, PageBody>

export function getPageBody(section: 'templates' | 'ai-tools', slug: string): PageBody | null {
  const body = ALL[`${section}/${slug}`]
  if (!body) return null
  if (body.status !== 'approved' && process.env.NODE_ENV !== 'development') return null
  return body
}
