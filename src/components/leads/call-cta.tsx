import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button-variants'
import { servicesFormUrl } from '@/lib/ghl'
import { cn } from '@/lib/utils'

function ExternalIcon() {
  return (
    <svg className="ml-1.5 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  )
}

interface CtaBandProps {
  heading: string
  body: string
  /** utm_content for the Roadmap Review form link: "{placement}". */
  utmContent: string
  className?: string
}

/**
 * Services band for the workflow, template and role hubs: the services page
 * and the paid Roadmap Review. Placed just above the newsletter sign-up so the
 * page ends with both. Light, so it doesn't merge into the dark newsletter band.
 */
export function CtaBand({ heading, body, utmContent, className }: CtaBandProps) {
  return (
    <section data-cta aria-label="Work with us" className={cn('mx-auto max-w-7xl px-4 pt-12 sm:pt-16', className)}>
      <div className="rounded-lg border border-primary/20 bg-orange-50/70 px-6 py-10 text-center sm:px-12">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{heading}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-600">{body}</p>
        <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
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
        </div>
      </div>
    </section>
  )
}
