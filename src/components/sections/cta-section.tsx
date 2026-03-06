import Link from 'next/link'

export function CTASection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-lg bg-[#1a1a2e] geometric-grid px-8 py-16 text-center sm:px-16 sm:py-20">
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
                className="inline-flex items-center rounded-lg bg-[#ff6b35] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#ff6b35]/25 hover:bg-[#e85d26] transition-all"
              >
                Browse All Workflows
              </Link>
              <Link
                href="/guides"
                className="inline-flex items-center rounded-lg px-8 py-3.5 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/10 transition-all"
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
