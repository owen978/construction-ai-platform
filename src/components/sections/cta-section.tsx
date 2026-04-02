import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button-variants'

export function CTASection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-lg bg-charcoal geometric-grid px-8 py-16 text-center sm:px-16 sm:py-20">
          <div className="relative">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Save Hours Every Week?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
              Browse our collection of AI-powered workflows designed specifically for construction professionals.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/ai-workflows"
                className={buttonVariants({ size: 'lg', className: 'px-8 py-3.5 h-auto shadow-lg shadow-primary/25' })}
              >
                Browse All Workflows
              </Link>
              <Link
                href="/guides"
                className={buttonVariants({ variant: 'outline-dark', size: 'lg', className: 'px-8 py-3.5 h-auto' })}
              >
                Read the Guides
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
