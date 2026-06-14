import Link from 'next/link'
import type { RelatedItem } from '@/lib/queries/related'

const TYPE_LABEL: Record<RelatedItem['type'], string> = {
  guide: 'Guide',
  template: 'Template',
  workflow: 'Workflow',
}

/**
 * Sitewide "Related resources" block. Renders topic-matched links to guides,
 * templates and workflows so every detail page cross-links across clusters.
 */
export function RelatedResources({ items }: { items: RelatedItem[] }) {
  if (!items || items.length === 0) return null

  return (
    <section className="mx-auto mt-12 max-w-3xl">
      <h2 className="mb-6 border-b border-slate-200 pb-3 text-2xl font-bold text-slate-900">
        Related resources
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-4 py-3 transition-colors hover:border-primary hover:bg-slate-50"
          >
            <span className="font-medium text-slate-800 group-hover:text-primary">
              {item.title}
            </span>
            <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
              {TYPE_LABEL[item.type]}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
