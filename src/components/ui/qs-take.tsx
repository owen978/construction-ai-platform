import Link from 'next/link'
import { cn } from '@/lib/utils'
import { AUTHOR } from '@/lib/author'

/**
 * Owen's "QS take" box: his own view on the page's topic, in his words.
 * Only use wording Owen has approved. Guides get it from Markdown by
 * starting a blockquote with "**QS take:**" (see MarkdownContent); other
 * pages pass the text after "QS take:" as children.
 */
export function QsTakeBox({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <aside aria-label="QS take" className={cn('my-8 rounded-lg border border-primary/30 bg-orange-50/60 px-6 py-5', className)}>
      <div className="text-base leading-relaxed text-slate-800 [&>p]:mb-0">{children}</div>
      <p className="mt-3 text-sm text-slate-500">
        <Link href={AUTHOR.path} className="font-medium text-slate-700 hover:text-primary">
          {AUTHOR.name}
        </Link>
        , {AUTHOR.jobTitle}
      </p>
    </aside>
  )
}

export function QsTake({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <QsTakeBox className={className}>
      <p>
        <strong className="font-semibold text-slate-900">QS take:</strong> {children}
      </p>
    </QsTakeBox>
  )
}
