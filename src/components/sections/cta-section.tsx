import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button-variants'
import { bookingUrl } from '@/lib/ghl'

export function CTASection() {
  return (
    <section data-cta className="pt-16 sm:pt-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-lg bg-charcoal geometric-grid px-8 py-16 text-center sm:px-16 sm:py-20">
          <div className="relative">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Want this working in your business?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
              Book a 15-minute call with Owen to talk through where AI would save your team the most
              time, or see the services we offer.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={bookingUrl('home')}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ size: 'lg', className: 'px-8 py-3.5 h-auto shadow-lg shadow-primary/25' })}
              >
                Book a 15-minute call
              </a>
              <Link
                href="/services"
                className={buttonVariants({ variant: 'outline-dark', size: 'lg', className: 'px-8 py-3.5 h-auto' })}
              >
                See our services
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-400">
              Or keep exploring:{' '}
              <Link href="/ai-workflows" className="font-medium text-primary-bright hover:underline">
                browse all workflows
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
