import Link from 'next/link'
import { cn } from '@/lib/utils'
import { getGuidesBySlugs } from '@/lib/queries/guides'
import { getRelatedGuideSlugs, type RelatedGuidesSection } from '@/lib/related-guides'

interface RelatedGuidesProps {
  section: RelatedGuidesSection
  slug: string
  className?: string
}

/**
 * "Further reading" block linking a detail page to topically related guides.
 * Driven by the slug mapping in src/lib/related-guides.ts, so new pages can
 * be wired up by adding a mapping entry rather than editing page code.
 * Pages with no mapping render nothing.
 */
export async function RelatedGuides({ section, slug, className }: RelatedGuidesProps) {
  const guideSlugs = getRelatedGuideSlugs(section, slug)
  if (guideSlugs.length === 0) return null

  const guides = await getGuidesBySlugs(guideSlugs)
  if (guides.length === 0) return null

  return (
    <section className={cn('mx-auto mt-12 max-w-3xl', className)}>
      <h2 className="mb-6 border-b border-slate-200 pb-3 text-2xl font-bold text-slate-900">
        Further reading
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-4 py-3 transition-colors hover:border-primary hover:bg-slate-50"
          >
            <span className="font-medium text-slate-800 group-hover:text-primary">
              {guide.title}
            </span>
            <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
              Guide
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
