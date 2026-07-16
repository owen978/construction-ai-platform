import { createPublicClient } from '@/lib/supabase/public'
import type { Guide } from '@/types'

export async function getGuides(): Promise<Guide[]> {
  const supabase = createPublicClient()

  const { data, error } = await supabase
    .from('guides')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  const supabase = createPublicClient()

  const { data, error } = await supabase
    .from('guides')
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

export async function getFeaturedGuides(limit: number = 6): Promise<Guide[]> {
  const supabase = createPublicClient()

  const { data, error } = await supabase
    .from('guides')
    .select('*')
    .eq('status', 'published')
    .eq('featured', true)
    .order('sort_order', { ascending: true })
    .limit(limit)

  if (error) throw error
  return data ?? []
}

/**
 * Fetch published guides for a list of slugs, preserving the order of the
 * input list. Slugs that are missing or unpublished are silently skipped.
 */
export async function getGuidesBySlugs(slugs: string[]): Promise<Guide[]> {
  if (slugs.length === 0) return []

  const supabase = createPublicClient()

  const { data, error } = await supabase
    .from('guides')
    .select('*')
    .in('slug', slugs)
    .eq('status', 'published')

  if (error) throw error

  const bySlug = new Map((data ?? []).map((guide) => [guide.slug, guide]))
  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((guide): guide is Guide => guide !== undefined)
}

/**
 * Latest published guides for the homepage. Guarantees any `mustIncludeSlugs`
 * appear, then fills the remaining places with the newest guides, and returns
 * the result in newest-first order.
 */
export async function getLatestGuides(
  limit: number = 6,
  mustIncludeSlugs: string[] = []
): Promise<Guide[]> {
  const supabase = createPublicClient()

  const { data, error } = await supabase
    .from('guides')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (error) throw error

  const guides = data ?? []
  const picked = guides.filter((guide) => mustIncludeSlugs.includes(guide.slug))

  for (const guide of guides) {
    if (picked.length >= limit) break
    if (!picked.some((p) => p.slug === guide.slug)) picked.push(guide)
  }

  return picked.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )
}

export async function getGuideSlugs(): Promise<{ slug: string }[]> {
  const supabase = createPublicClient()

  const { data, error } = await supabase
    .from('guides')
    .select('slug')
    .eq('status', 'published')

  if (error) throw error
  return data ?? []
}
