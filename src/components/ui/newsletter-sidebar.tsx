import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button-variants'

interface NewsletterSidebarProps {
  className?: string
}

/**
 * Compact newsletter CTA for sidebars on detail pages.
 * Links to /newsletter for the actual form.
 */
export function NewsletterSidebar({ className }: NewsletterSidebarProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6',
        className
      )}
    >
      <div className="mb-2 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
        Free newsletter
      </div>
      <h3 className="text-base font-semibold text-slate-900">
        Get AI Tips Weekly
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        New construction AI workflows, prompts, and templates delivered to your inbox every week.
      </p>
      <Link
        href="/newsletter"
        className={buttonVariants({ variant: 'default', size: 'sm', className: 'mt-4 w-full justify-center' })}
      >
        Subscribe Free
      </Link>
      <p className="mt-2 text-center text-xs text-slate-400">No spam. Unsubscribe anytime.</p>
    </div>
  )
}
