import Link from 'next/link'
import { cn } from '@/lib/utils'
import { AUTHOR, isReviewed } from '@/lib/author'

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Europe/London',
})

/**
 * "Editor: Owen Hagger · Last updated 15 October 2026" under page titles, or
 * "Reviewed by Owen Hagger, QS" on pages in REVIEWED_PAGES. Pass the same
 * date the page's JSON-LD uses as dateModified so the two always agree.
 */
export function Byline({ path, updatedAt, className }: { path: string; updatedAt?: string | null; className?: string }) {
  const reviewed = isReviewed(path)
  return (
    <p className={cn('text-sm text-slate-500', className)}>
      {reviewed ? 'Reviewed by ' : `${AUTHOR.bylineLabel}: `}
      <Link href={AUTHOR.path} className="font-medium text-slate-700 hover:text-primary transition-colors">
        {AUTHOR.name}
      </Link>
      {reviewed && `, ${AUTHOR.credential}`}
      {updatedAt && (
        <>
          <span aria-hidden="true"> · </span>
          Last updated <time dateTime={updatedAt}>{dateFormat.format(new Date(updatedAt))}</time>
        </>
      )}
    </p>
  )
}
