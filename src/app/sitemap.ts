import type { MetadataRoute } from 'next'
import { createPublicClient } from '@/lib/supabase/public'
import { SITE_URL } from '@/lib/site'
import { contentDate } from '@/lib/utils'
import { isDailyIdeasEnabled, isToolVisible } from '@/lib/features'
import { getPublishedIdeas, ideaPath } from '@/lib/daily-ideas'

// Hourly, so each day's idea page joins the sitemap on its day without a deploy.
export const revalidate = 3600

/**
 * Newest content date across the given rows. Hub pages use this so their lastmod
 * moves only when their content does, not on every build.
 */
function newest(...lists: { updated_at: string; content_updated_at?: string | null }[][]): Date | undefined {
  const times = lists.flat().map((r) => Date.parse(contentDate(r))).filter(Number.isFinite)
  return times.length ? new Date(Math.max(...times)) : undefined
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createPublicClient()

  // Fetch all published slugs in parallel
  const [workflows, roles, tasks, tools, guides, templates] = await Promise.all([
    supabase.from('workflows').select('slug, updated_at, content_updated_at').eq('status', 'published'),
    supabase.from('roles').select('slug, updated_at, content_updated_at').eq('status', 'published'),
    supabase.from('tasks').select('slug, updated_at, content_updated_at').eq('status', 'published'),
    supabase.from('tools').select('slug, updated_at, content_updated_at').eq('status', 'published'),
    supabase.from('guides').select('slug, updated_at, content_updated_at').eq('status', 'published'),
    supabase.from('templates').select('slug, updated_at, content_updated_at').eq('status', 'published'),
  ])

  const workflowRows = workflows.data ?? []
  const roleRows = roles.data ?? []
  const taskRows = tasks.data ?? []
  const toolRows = (tools.data ?? []).filter((t) => isToolVisible(t.slug))
  const guideRows = guides.data ?? []
  const templateRows: { slug: string; updated_at: string; content_updated_at?: string | null }[] = templates.data ?? []

  // Static pages. Hubs take their newest child's date; pages with no content
  // source omit lastmod rather than claim the build time.
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: newest(workflowRows, roleRows, taskRows, toolRows, guideRows, templateRows),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/ai-workflows`,
      lastModified: newest(workflowRows),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/ai-tools`,
      lastModified: newest(toolRows),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides`,
      lastModified: newest(guideRows),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/templates`,
      lastModified: newest(templateRows),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/rams-generator`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/ai-for`,
      lastModified: newest(roleRows, taskRows),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/newsletter`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/services`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/about/owen-hagger`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Dynamic workflow pages
  const workflowPages: MetadataRoute.Sitemap = workflowRows.map((w) => ({
    url: `${SITE_URL}/ai-workflows/${w.slug}`,
    lastModified: new Date(contentDate(w)),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Dynamic role pages
  const rolePages: MetadataRoute.Sitemap = roleRows.map((r) => ({
    url: `${SITE_URL}/ai-for/${r.slug}`,
    lastModified: new Date(contentDate(r)),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Dynamic task pages (under /ai-for/ since tasks use same route structure)
  const taskPages: MetadataRoute.Sitemap = taskRows.map((t) => ({
    url: `${SITE_URL}/ai-for/${t.slug}`,
    lastModified: new Date(contentDate(t)),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Dynamic tool pages
  const toolPages: MetadataRoute.Sitemap = toolRows.map((t) => ({
    url: `${SITE_URL}/ai-tools/${t.slug}`,
    lastModified: new Date(contentDate(t)),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Dynamic guide pages
  const guidePages: MetadataRoute.Sitemap = guideRows.map((g) => ({
    url: `${SITE_URL}/guides/${g.slug}`,
    lastModified: new Date(contentDate(g)),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Dynamic template pages
  const templatePages: MetadataRoute.Sitemap = templateRows.map((t) => ({
    url: `${SITE_URL}/templates/${t.slug}`,
    lastModified: new Date(contentDate(t)),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const dailyIdeas = isDailyIdeasEnabled() ? getPublishedIdeas() : []
  const dailyPages: MetadataRoute.Sitemap = dailyIdeas.length
    ? [
        {
          url: `${SITE_URL}/daily`,
          lastModified: new Date(`${dailyIdeas[0].publishDate}T00:00:00Z`),
          changeFrequency: 'daily' as const,
          priority: 0.8,
        },
        ...dailyIdeas.map((i) => ({
          url: `${SITE_URL}${ideaPath(i)}`,
          lastModified: new Date(`${i.publishDate}T00:00:00Z`),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        })),
      ]
    : []

  return [
    ...staticPages,
    ...dailyPages,
    ...workflowPages,
    ...templatePages,
    ...rolePages,
    ...taskPages,
    ...toolPages,
    ...guidePages,
  ]
}
