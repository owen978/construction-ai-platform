import { createPublicClient } from '@/lib/supabase/public'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buildcopilot.ai'

interface FeedItem {
  title: string
  url: string
  description: string
  pubDate: string
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function toRfc822(date: string): string {
  return new Date(date).toUTCString()
}

export async function GET() {
  const supabase = createPublicClient()

  const [workflows, guides, tools, roles, tasks, templates] = await Promise.all([
    supabase
      .from('workflows')
      .select('title, slug, description, created_at')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(50),
    supabase
      .from('guides')
      .select('title, slug, description, created_at')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(20),
    supabase
      .from('tools')
      .select('name, slug, description, created_at')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(10),
    supabase
      .from('roles')
      .select('name, slug, description, created_at')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(10),
    supabase
      .from('tasks')
      .select('name, slug, description, created_at')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(10),
    (supabase as any)
      .from('templates')
      .select('name, slug, description, created_at')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(20),
  ])

  const items: FeedItem[] = []

  for (const w of workflows.data ?? []) {
    items.push({
      title: w.title,
      url: `${SITE_URL}/ai-workflows/${w.slug}`,
      description: w.description || `AI workflow for construction professionals: ${w.title}`,
      pubDate: w.created_at,
    })
  }

  for (const g of guides.data ?? []) {
    items.push({
      title: g.title,
      url: `${SITE_URL}/guides/${g.slug}`,
      description: g.description || `Construction AI guide: ${g.title}`,
      pubDate: g.created_at,
    })
  }

  for (const t of tools.data ?? []) {
    items.push({
      title: t.name,
      url: `${SITE_URL}/ai-tools/${t.slug}`,
      description: t.description || `AI tool for construction: ${t.name}`,
      pubDate: t.created_at,
    })
  }

  for (const r of roles.data ?? []) {
    items.push({
      title: `AI for ${r.name}`,
      url: `${SITE_URL}/ai-for/${r.slug}`,
      description: r.description || `AI workflows for ${r.name} in construction`,
      pubDate: r.created_at,
    })
  }

  for (const t of tasks.data ?? []) {
    items.push({
      title: `AI for ${t.name}`,
      url: `${SITE_URL}/ai-for/${t.slug}`,
      description: t.description || `AI workflows for ${t.name} in construction`,
      pubDate: t.created_at,
    })
  }

  for (const tpl of templates.data ?? []) {
    items.push({
      title: tpl.name,
      url: `${SITE_URL}/templates/${tpl.slug}`,
      description: tpl.description || `Free construction template: ${tpl.name}`,
      pubDate: tpl.created_at,
    })
  }

  // Sort all items by date, most recent first
  items.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>BuildCopilot</title>
    <link>${SITE_URL}</link>
    <description>AI-powered workflows, prompts, and guides for construction professionals.</description>
    <language>en-gb</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items
  .map(
    (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.url}</link>
      <guid isPermaLink="true">${item.url}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${toRfc822(item.pubDate)}</pubDate>
    </item>`
  )
  .join('\n')}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
