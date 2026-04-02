import type { MetadataRoute } from 'next'
import { createPublicClient } from '@/lib/supabase/public'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buildcopilot.ai'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createPublicClient()

  // Fetch all published slugs in parallel
  const [workflows, roles, tasks, tools, guides, templates] = await Promise.all([
    supabase.from('workflows').select('slug, updated_at').eq('status', 'published'),
    supabase.from('roles').select('slug, updated_at').eq('status', 'published'),
    supabase.from('tasks').select('slug, updated_at').eq('status', 'published'),
    supabase.from('tools').select('slug, updated_at').eq('status', 'published'),
    supabase.from('guides').select('slug, updated_at').eq('status', 'published'),
    (supabase as any).from('templates').select('slug, updated_at').eq('status', 'published'),
  ])

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/ai-workflows`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/ai-tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/templates`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/ai-for`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/newsletter`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Dynamic workflow pages
  const workflowPages: MetadataRoute.Sitemap = (workflows.data ?? []).map((w) => ({
    url: `${BASE_URL}/ai-workflows/${w.slug}`,
    lastModified: new Date(w.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Dynamic role pages
  const rolePages: MetadataRoute.Sitemap = (roles.data ?? []).map((r) => ({
    url: `${BASE_URL}/ai-for/${r.slug}`,
    lastModified: new Date(r.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Dynamic task pages (under /ai-for/ since tasks use same route structure)
  const taskPages: MetadataRoute.Sitemap = (tasks.data ?? []).map((t) => ({
    url: `${BASE_URL}/ai-for/${t.slug}`,
    lastModified: new Date(t.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Dynamic tool pages
  const toolPages: MetadataRoute.Sitemap = (tools.data ?? []).map((t) => ({
    url: `${BASE_URL}/ai-tools/${t.slug}`,
    lastModified: new Date(t.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Dynamic guide pages
  const guidePages: MetadataRoute.Sitemap = (guides.data ?? []).map((g) => ({
    url: `${BASE_URL}/guides/${g.slug}`,
    lastModified: new Date(g.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Dynamic template pages
  const templatePages: MetadataRoute.Sitemap = (templates.data ?? []).map((t: any) => ({
    url: `${BASE_URL}/templates/${t.slug}`,
    lastModified: new Date(t.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    ...staticPages,
    ...workflowPages,
    ...templatePages,
    ...rolePages,
    ...taskPages,
    ...toolPages,
    ...guidePages,
  ]
}
