import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { NewsletterInline } from '@/components/sections/newsletter-inline'
import { CtaBand } from '@/components/leads/call-cta'
import { pageMetadata } from '@/lib/metadata'
import { isDailyIdeasEnabled } from '@/lib/features'
import { SITE_URL } from '@/lib/site'
import { collectionPageSchema, jsonLdScriptProps } from '@/lib/schema'
import { cn } from '@/lib/utils'
import { formatIdeaDate } from '@/lib/daily-ideas'
import { getBrowseItems, KIND_LABELS, type BrowseItem, type BrowseKind } from '@/lib/browse'

const ARCHIVE_TITLE = 'Construction AI Workflow of the Day + Idea Library'
const ARCHIVE_DESCRIPTION =
  'A new construction AI workflow every day, plus every free workflow, guide and template in the library, each with the prompt to copy. Browse them all.'

const PAGE_SIZE = 25
const KINDS: BrowseKind[] = ['daily', 'workflow', 'guide', 'template']
const KIND_FILTER_LABELS: Record<BrowseKind, string> = {
  daily: 'Daily ideas',
  workflow: 'Workflows',
  guide: 'Guides',
  template: 'Templates',
}

interface DailyArchiveProps {
  searchParams: Promise<{ type?: string; role?: string; tool?: string; page?: string }>
}

/**
 * Page 2, 3... of the full list are their own canonical pages, so every item
 * keeps a crawl path. Type, role and tool filters only re-sort the same items
 * (and duplicate the hubs), so they point at /daily and stay out of the index
 * while their links are still followed.
 */
export async function generateMetadata({ searchParams }: DailyArchiveProps): Promise<Metadata> {
  const { type, role, tool, page } = await searchParams
  const pageNumber = Math.max(1, Number(page) || 1)
  if (type || role || tool) {
    return { ...pageMetadata({ path: '/daily', title: ARCHIVE_TITLE, description: ARCHIVE_DESCRIPTION }), robots: { index: false, follow: true } }
  }
  if (pageNumber > 1) {
    const lastPage = Math.max(1, Math.ceil((await getBrowseItems()).length / PAGE_SIZE))
    const n = Math.min(lastPage, pageNumber)
    if (n > 1) {
      return pageMetadata({ path: `/daily?page=${n}`, title: `${ARCHIVE_TITLE} (page ${n})`, description: ARCHIVE_DESCRIPTION })
    }
  }
  return pageMetadata({ path: '/daily', title: ARCHIVE_TITLE, description: ARCHIVE_DESCRIPTION })
}

function filterHref(params: { type?: string; role?: string; tool?: string; page?: number }) {
  const q = new URLSearchParams()
  if (params.type) q.set('type', params.type)
  if (params.role) q.set('role', params.role)
  if (params.tool) q.set('tool', params.tool)
  if (params.page && params.page > 1) q.set('page', String(params.page))
  const s = q.toString()
  return s ? `/daily?${s}` : '/daily'
}

const KIND_STYLES: Record<BrowseKind, string> = {
  daily: 'bg-primary/10 text-primary',
  workflow: 'bg-slate-100 text-slate-700',
  guide: 'bg-blue-50 text-blue-700',
  template: 'bg-emerald-50 text-emerald-700',
}

function BrowseRow({ item }: { item: BrowseItem }) {
  return (
    <li>
      <Link
        href={item.href}
        className={cn(
          'group flex gap-4 rounded-xl border bg-white p-4 transition-all hover:border-primary/40 hover:shadow-sm sm:gap-6 sm:p-5',
          item.isToday ? 'border-primary/50 ring-1 ring-primary/20' : 'border-slate-200'
        )}
      >
        <span className="w-10 shrink-0 pt-0.5 text-right font-mono text-sm tabular-nums text-slate-400 sm:w-12">
          #{item.number}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
            <span className={cn('rounded-full px-2 py-0.5 font-semibold', KIND_STYLES[item.kind])}>
              {KIND_LABELS[item.kind]}
            </span>
            {item.isToday && <span className="rounded-full bg-primary px-2 py-0.5 font-semibold text-white">Today</span>}
            {item.date && !item.isToday && (
              <time dateTime={item.date} className="text-slate-500">{formatIdeaDate(item.date)}</time>
            )}
          </div>
          <h2 className="mt-1.5 text-base font-semibold leading-snug text-slate-900 transition-colors group-hover:text-primary sm:text-lg">
            {item.title}
          </h2>
          {item.description && <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-600">{item.description}</p>}
          {(item.roles.length > 0 || item.tool || item.time) && (
            <div className="mt-2 flex flex-wrap gap-1.5 text-xs text-slate-500">
              {item.roles.slice(0, 3).map((r) => (
                <span key={r.slug} className="rounded border border-slate-200 px-1.5 py-0.5">{r.label}</span>
              ))}
              {item.tool && item.tool.key !== 'any' && (
                <span className="rounded border border-slate-200 px-1.5 py-0.5">{item.tool.label}</span>
              )}
              {item.time && <span className="rounded border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-emerald-700">{item.time} typical</span>}
            </div>
          )}
        </div>
        <span aria-hidden="true" className="hidden shrink-0 self-center text-slate-300 transition-colors group-hover:text-primary sm:block">
          &rarr;
        </span>
      </Link>
    </li>
  )
}

export default async function DailyArchivePage({ searchParams }: DailyArchiveProps) {
  if (!isDailyIdeasEnabled()) notFound()

  // Reading searchParams first keeps this page rendered per request, so a new
  // day's idea appears at midnight without waiting for a deploy.
  const { type, role, tool, page: pageParam } = await searchParams
  const all = await getBrowseItems()
  if (all.length === 0) notFound()

  const kind = KINDS.includes(type as BrowseKind) ? (type as BrowseKind) : undefined
  const filtered = all.filter(
    (i) => (!kind || i.kind === kind) && (!role || i.roles.some((r) => r.slug === role)) && (!tool || i.tool?.key === tool)
  )
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const page = Math.min(pages, Math.max(1, Number(pageParam) || 1))
  const shown = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const first = filtered.length ? (page - 1) * PAGE_SIZE + 1 : 0
  const last = (page - 1) * PAGE_SIZE + shown.length

  const roles = [...new Map(all.flatMap((i) => i.roles).map((r) => [r.slug, r.label])).entries()].sort((a, b) => a[1].localeCompare(b[1]))
  const tools = [...new Map(all.flatMap((i) => (i.tool && i.tool.key !== 'any' ? [[i.tool.key, i.tool.label] as const] : []))).entries()].sort((a, b) => a[1].localeCompare(b[1]))

  // One swipeable line per filter on phones, wrapping on wider screens.
  const filterRow = '-mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0'
  const chip = (active: boolean) =>
    cn(
      'shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-sm transition-colors',
      active ? 'border-primary bg-primary text-primary-foreground' : 'border-slate-200 text-slate-600 hover:border-primary/40'
    )

  return (
    <>
      <script
        {...jsonLdScriptProps(
          collectionPageSchema({
            name: 'Construction AI workflow of the day and idea library',
            description: ARCHIVE_DESCRIPTION,
            url: `${SITE_URL}/daily`,
            items: shown.map((i) => ({ name: i.title, url: `${SITE_URL}${i.href}` })),
          })
        )}
      />

      <div className="bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-4xl px-4 pt-12 pb-6 sm:pt-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Daily ideas</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Construction AI workflow of the day
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            A new practical way to use AI on a UK construction job every day, plus every workflow, guide and template in
            the library. Each one is free, with the prompt to copy and what you still check.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 space-y-3">
          <div className={filterRow}>
            <span className="mr-1 w-10 shrink-0 text-sm font-medium text-slate-500">Type</span>
            <Link href={filterHref({ role, tool })} className={chip(!kind)}>All</Link>
            {KINDS.map((k) => (
              <Link key={k} href={filterHref({ type: k, role, tool })} className={chip(kind === k)}>{KIND_FILTER_LABELS[k]}</Link>
            ))}
          </div>
          {roles.length > 1 && (
            <div className={filterRow}>
              <span className="mr-1 w-10 shrink-0 text-sm font-medium text-slate-500">Role</span>
              <Link href={filterHref({ type: kind, tool })} className={chip(!role)}>All</Link>
              {roles.map(([slug, label]) => (
                <Link key={slug} href={filterHref({ type: kind, role: slug, tool })} className={chip(role === slug)}>{label}</Link>
              ))}
            </div>
          )}
          {tools.length > 1 && (
            <div className={filterRow}>
              <span className="mr-1 w-10 shrink-0 text-sm font-medium text-slate-500">Tool</span>
              <Link href={filterHref({ type: kind, role })} className={chip(!tool)}>All</Link>
              {tools.map(([key, label]) => (
                <Link key={key} href={filterHref({ type: kind, role, tool: key })} className={chip(tool === key)}>{label}</Link>
              ))}
            </div>
          )}
        </div>

        <p className="mb-3 text-sm text-slate-500" aria-live="polite">
          {filtered.length === 0 ? 'Nothing matches those filters yet.' : `${first}-${last} of ${filtered.length} ideas`}
        </p>

        <ol className="space-y-3">
          {shown.map((item) => <BrowseRow key={item.key} item={item} />)}
        </ol>

        {pages > 1 && (
          <nav className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6 text-sm" aria-label="Pages">
            {page > 1 ? (
              <Link href={filterHref({ type: kind, role, tool, page: page - 1 })} className="font-semibold text-primary">&larr; Newer</Link>
            ) : <span />}
            <span className="text-slate-500">Page {page} of {pages}</span>
            {page < pages ? (
              <Link href={filterHref({ type: kind, role, tool, page: page + 1 })} className="font-semibold text-primary">Older &rarr;</Link>
            ) : <span />}
          </nav>
        )}
      </div>

      <CtaBand
        heading="Want ideas like these working in your business?"
        body="A 15-minute call with Owen, a QS with 25+ years in UK construction, about how it could work in your business. No obligation."
        utmContent="hub-daily"
        kind="call"
      />
      <NewsletterInline />
    </>
  )
}
