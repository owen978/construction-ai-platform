import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button-variants'

interface NewsletterBannerProps {
  className?: string
}

/**
 * Mid-page newsletter banner for long content pages.
 * Sits between content sections to catch readers mid-scroll.
 */
export function NewsletterBanner({ className }: NewsletterBannerProps) {
  return (
    <div
      className={cn(
        'my-10 rounded-lg border border-slate-200/60 bg-gradient-to-r from-slate-50 to-white px-6 py-6 sm:px-8 sm:py-8',
        className
      )}
    >
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-semibold text-slate-900">
            Want more templates like this?
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Get new AI workflows and construction templates delivered weekly. Free.
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-center gap-1.5">
          <Link
            href="/newsletter"
            className={buttonVariants({ className: 'whitespace-nowrap' })}
          >
            Subscribe Free
          </Link>
          <p className="text-xs text-slate-400">No spam ever.</p>
        </div>
      </div>
    </div>
  )
}
