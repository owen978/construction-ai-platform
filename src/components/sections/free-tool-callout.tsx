import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button-variants'

interface FreeToolCalloutProps {
  kicker?: string
  heading: string
  text: string
  href: string
  linkLabel: string
  className?: string
}

/**
 * Prominent in-content band pointing at a free interactive tool
 * (e.g. the RAMS generator) from related template and guide pages.
 */
export function FreeToolCallout({
  kicker = 'Free tool',
  heading,
  text,
  href,
  linkLabel,
  className,
}: FreeToolCalloutProps) {
  return (
    <aside
      aria-label={kicker}
      className={cn(
        'my-8 rounded-lg border border-primary/20 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 px-6 py-6 sm:px-8',
        className
      )}
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">{kicker}</p>
      <h3 className="text-lg font-semibold text-slate-900">{heading}</h3>
      <p className="mt-1 text-sm leading-relaxed text-slate-600">{text}</p>
      <Link href={href} className={buttonVariants({ className: 'mt-4' })}>
        {linkLabel}
      </Link>
    </aside>
  )
}
