import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#1a1a2e] geometric-grid py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-4 text-center">
        <div className="mb-6 inline-flex items-center rounded-full bg-[#ff6b35]/10 px-4 py-1.5 text-sm font-medium text-[#ff6b35] ring-1 ring-[#ff6b35]/30">
          AI-Powered Construction Workflows
        </div>

        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Work Smarter on{' '}
          <span className="text-[#ff6b35]">Every Project</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
          Ready-to-use AI prompts and workflows for Quantity Surveyors, Project
          Managers, and Site Managers. Copy, paste, and save hours every week.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/ai-workflows"
            className="inline-flex items-center rounded-lg bg-[#ff6b35] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#ff6b35]/25 hover:bg-[#e85d26] transition-all"
          >
            Explore Workflows
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
          <Link
            href="/guides"
            className="inline-flex items-center rounded-lg px-8 py-3.5 text-sm font-semibold text-white ring-1 ring-slate-600 hover:bg-white/10 transition-all"
          >
            Read the Guides
          </Link>
        </div>

        <div className="mt-16 border-t border-slate-700/60 pt-8">
          <p className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-slate-500">
            Workflows for professionals using
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-50">
            <span className="text-lg font-semibold text-slate-400">ChatGPT</span>
            <span className="text-lg font-semibold text-slate-400">Claude</span>
            <span className="text-lg font-semibold text-slate-400">Gemini</span>
            <span className="text-lg font-semibold text-slate-400">Copilot</span>
          </div>
        </div>
      </div>
    </section>
  )
}
