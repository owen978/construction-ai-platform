import { cn } from '@/lib/utils'
import type { ConstructionRatingNote as Note } from '@/lib/construction-rating'

/** One-line pointer to a constructionrating.co.uk tool on payment-related pages. */
export function ConstructionRatingNote({ note, className }: { note: Note | null; className?: string }) {
  if (!note) return null

  return (
    <p className={cn('my-6 rounded-lg border border-slate-200 bg-white px-5 py-4 text-sm leading-relaxed text-slate-600', className)}>
      {note.text}{' '}
      <a href={note.href} className="font-semibold text-primary hover:underline">
        {note.linkLabel}
      </a>
      .
    </p>
  )
}
