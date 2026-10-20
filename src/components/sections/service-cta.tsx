import Link from 'next/link'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button-variants'
import { ROADMAP_REVIEW_OFFER, type ServiceCtaConfig } from '@/lib/service-cta'
import { bookingUrl, servicesFormUrl } from '@/lib/ghl'

interface ServiceCTAProps {
  /** Page-specific offer from SERVICE_CTA_MAP; null shows the Roadmap Review. */
  config: ServiceCtaConfig | null
  /** utm_content for the booking link: "{page-type}-{slug}". */
  utmContent: string
  className?: string
}

function ExternalLinkIcon() {
  return (
    <svg
      className="ml-1.5 h-3.5 w-3.5"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  )
}

/**
 * Done-for-you band shown on every workflow, template, guide and /ai-for page.
 * Pages mapped in SERVICE_CTA_MAP keep their specific offer (one sentence or
 * price items, linking /services and the booking call); every other page gets
 * the £950 Roadmap Review.
 */
export function ServiceCTA({ config, utmContent, className }: ServiceCTAProps) {
  return (
    <aside
      data-cta
      aria-label="Done-for-you service"
      className={cn(
        'my-10 rounded-lg border border-slate-200 bg-slate-50 px-6 py-6 sm:px-8',
        className
      )}
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
        {config ? 'Done for you' : ROADMAP_REVIEW_OFFER.kicker}
      </p>

      {config ? (
        <MappedOffer config={config} utmContent={utmContent} />
      ) : (
        <RoadmapReviewOffer utmContent={utmContent} />
      )}
    </aside>
  )
}

function MappedOffer({ config, utmContent }: { config: ServiceCtaConfig; utmContent: string }) {
  return (
    <>
      {config.variant === 'full' ? (
        <>
          {config.heading && (
            <h3 className="text-lg font-semibold text-slate-900">{config.heading}</h3>
          )}
          {config.items && config.items.length > 0 && (
            <dl className="mt-4 grid gap-4 sm:grid-cols-3">
              {config.items.map((item) => (
                <div key={item.label} className="rounded-lg border border-slate-200 bg-white p-4">
                  <dt className="text-sm text-slate-600">{item.label}</dt>
                  <dd className="mt-1 font-semibold text-slate-900">{item.price}</dd>
                </div>
              ))}
            </dl>
          )}
        </>
      ) : (
        <p className="text-base leading-relaxed text-slate-700">{config.text}</p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Link href="/services" className={buttonVariants()}>
          See the service
        </Link>
        <a
          href={bookingUrl(utmContent)}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: 'outline' })}
        >
          Book a 15-minute call
          <ExternalLinkIcon />
        </a>
      </div>
    </>
  )
}

function RoadmapReviewOffer({ utmContent }: { utmContent: string }) {
  const offer = ROADMAP_REVIEW_OFFER

  return (
    <>
      <h3 className="text-lg font-semibold text-slate-900">{offer.heading}</h3>
      <p className="mt-2 text-base leading-relaxed text-slate-700">{offer.body}</p>

      <ul className="mt-4 space-y-2">
        {offer.points.map((point) => (
          <li key={point} className="flex gap-2 text-sm leading-relaxed text-slate-700">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <a
          href={servicesFormUrl(utmContent)}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants()}
        >
          {offer.bookLabel}
          <ExternalLinkIcon />
        </a>
        <Link href="/newsletter" className={buttonVariants({ variant: 'outline' })}>
          {offer.newsletterLabel}
        </Link>
      </div>
    </>
  )
}
