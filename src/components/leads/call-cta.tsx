import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button-variants'
import { bookingUrl, servicesFormUrl } from '@/lib/ghl'
import { cn } from '@/lib/utils'

const CALL_BODY =
  "A 15-minute call with Owen, a QS with 25+ years in UK construction, about how it could work in your business. No obligation."

function ExternalIcon() {
  return (
    <svg className="ml-1.5 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  )
}

interface CallCtaProps {
  heading: string
  body?: string
  /** utm_content for the booking link: "{placement}-{slug}". */
  utmContent: string
  className?: string
}

/**
 * Sidebar card on workflow, template and tool pages: the 15-minute call,
 * with the services page as the quieter option. Marked data-cta so the
 * sticky call bar steps aside while this is on screen.
 */
export function CallCtaCard({ heading, body = CALL_BODY, utmContent, className }: CallCtaProps) {
  return (
    <aside
      data-cta
      aria-label="Book a call"
      className={cn('rounded-lg border border-primary/30 bg-orange-50/60 p-6', className)}
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">15-minute call</p>
      <h3 className="text-base font-semibold text-slate-900">{heading}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
      <a
        href={bookingUrl(utmContent)}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({ size: 'sm', className: 'mt-4 w-full justify-center' })}
      >
        Book a 15-minute call
        <ExternalIcon />
      </a>
      <Link href="/services" className="mt-3 block text-center text-sm font-medium text-primary hover:underline">
        Or see what we can do for you
      </Link>
    </aside>
  )
}

/**
 * Inline box that breaks up long guides: the 15-minute call, sitting
 * between two sections of the article.
 */
export function CallCtaInline({ heading, body = CALL_BODY, utmContent, className }: CallCtaProps) {
  return (
    <aside
      data-cta
      aria-label="Book a call"
      className={cn('my-10 rounded-lg border-l-4 border-primary bg-slate-50 px-6 py-5 sm:flex sm:items-center sm:gap-6', className)}
    >
      <div className="min-w-0 flex-1">
        <p className="text-base font-semibold text-slate-900">{heading}</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">{body}</p>
      </div>
      <a
        href={bookingUrl(utmContent)}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({ className: 'mt-4 shrink-0 sm:mt-0' })}
      >
        Book a 15-minute call
        <ExternalIcon />
      </a>
    </aside>
  )
}

interface CtaBandProps {
  heading: string
  body: string
  /** utm_content for the links: "{placement}". */
  utmContent: string
  /** "call" leads with the 15-minute call; "services" with the services page and enquiry form. */
  kind?: 'call' | 'services'
  className?: string
}

/**
 * Full-width band for hub pages and the about page, placed just above the
 * newsletter sign-up so the page ends with both. Light, so it doesn't merge
 * into the dark newsletter band below it.
 */
export function CtaBand({ heading, body, utmContent, kind = 'services', className }: CtaBandProps) {
  return (
    <section data-cta aria-label="Work with us" className={cn('mx-auto max-w-7xl px-4 pt-12 sm:pt-16', className)}>
      <div className="rounded-lg border border-primary/20 bg-orange-50/70 px-6 py-10 text-center sm:px-12">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{heading}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-600">{body}</p>
        <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {kind === 'call' ? (
            <>
              <a
                href={bookingUrl(utmContent)}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ size: 'lg', className: 'h-auto px-8 py-3 shadow-lg shadow-primary/25' })}
              >
                Book a 15-minute call
                <ExternalIcon />
              </a>
              <Link href="/services" className={buttonVariants({ variant: 'outline', size: 'lg', className: 'h-auto border-slate-300 px-8 py-3' })}>
                See our services
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/services"
                className={buttonVariants({ size: 'lg', className: 'h-auto px-8 py-3 shadow-lg shadow-primary/25' })}
              >
                See our services
              </Link>
              <a
                href={servicesFormUrl(utmContent)}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: 'outline', size: 'lg', className: 'h-auto border-slate-300 px-8 py-3' })}
              >
                Request a Roadmap Review
                <ExternalIcon />
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
