import Link from 'next/link'

export function NewsletterCTA() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-50 to-white border border-slate-200/60 px-8 py-12 sm:px-16 sm:py-16">
          <div className="flex flex-col items-center text-center lg:flex-row lg:text-left lg:justify-between lg:gap-12">
            <div className="lg:max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#ff6b35] mb-2">
                Free Newsletter
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Get AI Workflows in Your Inbox
              </h2>
              <p className="mt-3 text-slate-600">
                New prompts, guides, and construction AI tips delivered weekly. Join professionals already using AI to save hours on every project.
              </p>
            </div>
            <div className="mt-8 flex shrink-0 flex-col items-center gap-3 lg:mt-0">
              <Link
                href="/newsletter"
                className="inline-flex items-center rounded-lg bg-[#ff6b35] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#ff6b35]/25 hover:bg-[#e85d26] transition-all"
              >
                Subscribe Free
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <p className="text-xs text-slate-500">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
