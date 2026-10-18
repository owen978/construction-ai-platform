import Link from 'next/link'
import { cn } from '@/lib/utils'
import { AUTHOR } from '@/lib/author'

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Europe/London',
})

/**
 * "Editor: Owen Hagger · Last updated 15 October 2026" under guide and
 * workflow titles. Pass the same updated_at the page's JSON-LD uses as
 * dateModified so the two always agree.
 */
export function Byline({ updatedAt, className }: { updatedAt?: string | null; className?: string }) {
  return (
    <p className={cn('text-sm text-slate-500', className)}>
      {AUTHOR.bylineLabel}:{' '}
      <Link href={AUTHOR.path} className="font-medium text-slate-700 hover:text-primary transition-colors">
        {AUTHOR.name}
      </Link>
      {updatedAt && (
        <>
          <span aria-hidden="true"> · </span>
          Last updated <time dateTime={updatedAt}>{dateFormat.format(new Date(updatedAt))}</time>
        </>
      )}
    </p>
  )
}
