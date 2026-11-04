import Link from 'next/link'
import { START_HERE } from '@/lib/related-guides'
import { cn } from '@/lib/utils'

/** "New to this? Start with our ... guide." under a page heading, where START_HERE has an entry. */
export function StartHere({ path, className }: { path: string; className?: string }) {
  const entry = START_HERE[path]
  if (!entry) return null
  return (
    <p className={cn('max-w-2xl text-base text-slate-700', className)}>
      {entry.lead}{' '}
      {entry.links.map((l, i) => (
        <span key={l.href}>
          {i > 0 && (i === entry.links.length - 1 ? ' and ' : ', ')}
          <Link href={l.href} className="font-semibold text-primary hover:underline">{l.anchor}</Link>
        </span>
      ))}
      .
    </p>
  )
}
