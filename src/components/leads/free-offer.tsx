import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button-variants'
import { servicesFormUrl } from '@/lib/ghl'
import { FREE_OFFERS, freeOfferFor } from '@/lib/service-cta'
import { cn } from '@/lib/utils'

interface FreeOfferProps {
  /** The page's own path, e.g. "/ai-workflows/generate-bill-of-quantities": picks Roadmap or Benchmark. */
  path: string
  /** "{page-type}-{slug}"; the offer is prefixed, giving utm_content "roadmap-guide-..." or "benchmark-workflow-...". */
  utmContent: string
  className?: string
}

function ExternalIcon() {
  return (
    <svg className="ml-1.5 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  )
}

function Signature({ className }: { className?: string }) {
  return (
    <p className={cn('text-xs text-slate-500', className)}>
      Owen Hagger,{' '}
      <a href="https://contractorsystems.co.uk/" target="_blank" rel="noopener" className="font-medium text-slate-600 underline-offset-2 hover:underline">
        Contractor Systems
      </a>
    </p>
  )
}

/**
 * Sidebar card on workflow, template and tool pages: the free 20-minute
 * Roadmap, or the Benchmark on commercial pages. Marked data-cta so the
 * sticky bar steps aside while this is on screen.
 */
export function FreeOfferCard({ path, utmContent, className }: FreeOfferProps) {
  const key = freeOfferFor(path)
  const offer = FREE_OFFERS[key]
  return (
    <aside
      data-cta
      aria-label={offer.heading}
      className={cn('rounded-lg border border-primary/30 bg-orange-50/60 p-6', className)}
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">Free 20-minute session</p>
      <h3 className="text-base font-semibold text-slate-900">{offer.heading}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{offer.shortBody}</p>
      <a
        href={servicesFormUrl(`${key}-${utmContent}`)}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({ size: 'sm', className: 'mt-4 w-full justify-center' })}
      >
        {offer.button}
        <ExternalIcon />
      </a>
      <Signature className="mt-3 text-center" />
    </aside>
  )
}

/**
 * The full Roadmap or Benchmark block, inline in the page: halfway through
 * guides (or where the guide marks it), and after the long text on /ai-for pages.
 */
export function FreeOfferBlock({ path, utmContent, className }: FreeOfferProps) {
  const key = freeOfferFor(path)
  const offer = FREE_OFFERS[key]
  return (
    <aside
      data-cta
      aria-label={offer.heading}
      className={cn('my-10 rounded-lg border-l-4 border-primary bg-slate-50 px-6 py-6', className)}
    >
      <p className="text-lg font-semibold text-slate-900">{offer.heading}</p>
      <p className="mt-2 text-base leading-relaxed text-slate-700">{offer.body}</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
        <a
          href={servicesFormUrl(`${key}-${utmContent}`)}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants()}
        >
          {offer.button}
          <ExternalIcon />
        </a>
        <Signature />
      </div>
    </aside>
  )
}

/**
 * Band for the guide, tool and daily hubs, above the newsletter sign-up: the
 * free Roadmap, with the services page as the quieter option.
 */
export function FreeOfferBand({ utmContent, className }: { utmContent: string; className?: string }) {
  const offer = FREE_OFFERS.roadmap
  return (
    <section data-cta aria-label={offer.heading} className={cn('mx-auto max-w-7xl px-4 pt-12 sm:pt-16', className)}>
      <div className="rounded-lg border border-primary/20 bg-orange-50/70 px-6 py-10 text-center sm:px-12">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{offer.heading}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-600">{offer.body}</p>
        <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={servicesFormUrl(`roadmap-${utmContent}`)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: 'lg', className: 'h-auto px-8 py-3 shadow-lg shadow-primary/25' })}
          >
            {offer.button}
            <ExternalIcon />
          </a>
          <Link href="/services" className={buttonVariants({ variant: 'outline', size: 'lg', className: 'h-auto border-slate-300 px-8 py-3' })}>
            See our services
          </Link>
        </div>
        <Signature className="mt-5" />
      </div>
    </section>
  )
}
