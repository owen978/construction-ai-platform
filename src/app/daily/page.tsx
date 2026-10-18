import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { IdeaTeaser } from '@/components/daily/idea-teaser'
import { NewsletterInline } from '@/components/sections/newsletter-inline'
import { pageMetadata } from '@/lib/metadata'
import { isDailyIdeasEnabled } from '@/lib/features'
import { SITE_URL } from '@/lib/site'
import { collectionPageSchema, jsonLdScriptProps } from '@/lib/schema'
import { cn } from '@/lib/utils'
import { getPublishedIdeas, ideaPath, roleLabel, toolLabel, type DailyIdea } from '@/lib/daily-ideas'

export const metadata: Metadata = pageMetadata({
  path: '/daily',
  title: 'Construction AI Workflow of the Day: Archive',
  description:
    'A new construction AI workflow every day: the prompt to copy, what it produced and what you still check. Browse every one by role, task and tool.',
})

const PAGE_SIZE = 30

interface DailyArchiveProps {
  searchParams: Promise<{ role?: string; tool?: string; page?: string }>
}

function monthLabel(date: string) {
  return new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(`${date}T00:00:00Z`)
  )
}

function filterHref(params: { role?: string; tool?: string; page?: number }) {
  const q = new URLSearchParams()
  if (params.role) q.set('role', params.role)
  if (params.tool) q.set('tool', params.tool)
  if (params.page && params.page > 1) q.set('page', String(params.page))
  const s = q.toString()
  return s ? `/daily?${s}` : '/daily'
}

export default async function DailyArchivePage({ searchParams }: DailyArchiveProps) {
  if (!isDailyIdeasEnabled()) notFound()

  const all = getPublishedIdeas()
  if (all.length === 0) notFound()

  const { role, tool, page: pageParam } = await searchParams
  const filtered = all.filter((i) => (!role || i.roles.includes(role)) && (!tool || i.tool === tool))
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const page = Math.min(pages, Math.max(1, Number(pageParam) || 1))
  const shown = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const roles = [...new Set(all.flatMap((i) => i.roles))].sort((a, b) => roleLabel(a).localeCompare(roleLabel(b)))
  const tools = [...new Set(all.map((i) => i.tool))].sort()

  const byMonth = new Map<string, DailyIdea[]>()
  for (const idea of shown) {
    const m = monthLabel(idea.publishDate)
    byMonth.set(m, [...(byMonth.get(m) ?? []), idea])
  }

  const chip = (active: boolean) =>
    cn(
      'rounded-full border px-3 py-1 text-sm transition-colors',
      active ? 'border-primary bg-primary text-primary-foreground' : 'border-slate-200 text-slate-600 hover:border-primary/40'
    )

  return (
    <>
      <script
        {...jsonLdScriptProps(
          collectionPageSchema({
            name: 'Construction AI workflow of the day',
            description: 'A new construction AI workflow every day, with the prompt, what it produced and what to check.',
            url: `${SITE_URL}/daily`,
            items: shown.map((i) => ({ name: i.title, url: `${SITE_URL}${ideaPath(i)}` })),
          })
        )}
      />

      <div className="bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:pt-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Daily ideas</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Construction AI workflow of the day
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            One practical way to use AI on a UK construction job, every day. Each comes with the prompt to copy, what it
            produced and what you still check. All free.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10">
        {(roles.length > 1 || tools.length > 1) && (
          <div className="mb-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-sm font-medium text-slate-500">Role</span>
              <Link href={filterHref({ tool })} className={chip(!role)}>All</Link>
              {roles.map((r) => (
                <Link key={r} href={filterHref({ role: r, tool })} className={chip(role === r)}>{roleLabel(r)}</Link>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-sm font-medium text-slate-500">Tool</span>
              <Link href={filterHref({ role })} className={chip(!tool)}>All</Link>
              {tools.map((t) => (
                <Link key={t} href={filterHref({ role, tool: t })} className={chip(tool === t)}>{toolLabel(t)}</Link>
              ))}
            </div>
          </div>
        )}

        {shown.length === 0 ? (
          <p className="text-slate-500">No ideas match those filters yet.</p>
        ) : (
          [...byMonth.entries()].map(([month, ideas]) => (
            <section key={month} className="mb-10">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">{month}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {ideas.map((idea) => <IdeaTeaser key={idea.slug} idea={idea} />)}
              </div>
            </section>
          ))
        )}

        {pages > 1 && (
          <nav className="flex items-center justify-between border-t border-slate-200 pt-6 text-sm" aria-label="Archive pages">
            {page > 1 ? (
              <Link href={filterHref({ role, tool, page: page - 1 })} className="font-semibold text-primary">&larr; Newer</Link>
            ) : <span />}
            <span className="text-slate-500">Page {page} of {pages}</span>
            {page < pages ? (
              <Link href={filterHref({ role, tool, page: page + 1 })} className="font-semibold text-primary">Older &rarr;</Link>
            ) : <span />}
          </nav>
        )}
      </div>

      <NewsletterInline />
    </>
  )
}
