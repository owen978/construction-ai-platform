import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button-variants'
import type { ServiceCtaConfig } from '@/lib/service-cta'

const BOOKING_URL = 'https://link.contractorsystems.co.uk/widget/booking/mzWN8jEzZDL5SxkY71ut'

interface ServiceCTAProps {
  config: ServiceCtaConfig
  className?: string
}

/**
 * Inline done-for-you service band shown on mapped detail pages only.
 * Small kicker, one sentence with a price anchor, and two links:
 * the services page and the 15-minute booking call.
 */
export function ServiceCTA({ config, className }: ServiceCTAProps) {
  const isFull = config.variant === 'full'

  return (
    <aside
      aria-label="Done-for-you service"
      className={cn(
        'my-10 rounded-lg border border-slate-200 bg-slate-50 px-6 py-6 sm:px-8',
        className
      )}
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
        Done for you
      </p>

      {isFull ? (
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
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: 'outline' })}
        >
          Book a 15-minute call
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
        </a>
      </div>
    </aside>
  )
}
