import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button-variants'
import type { DailyIdea } from '@/lib/daily-ideas'

/** The roles most visitors come for, each linking to its /ai-for/ hub. */
const ROLE_PICKER = [
  { slug: 'quantity-surveyor', label: 'Quantity Surveyor' },
  { slug: 'project-manager', label: 'Project Manager' },
  { slug: 'site-manager', label: 'Site Manager' },
  { slug: 'estimator', label: 'Estimator' },
  { slug: 'commercial-manager', label: 'Commercial Manager' },
  { slug: 'contracts-manager', label: 'Contracts Manager' },
  { slug: 'health-and-safety-manager', label: 'H&S Manager' },
  { slug: 'planning-engineer', label: 'Planner' },
]

/**
 * Homepage hero. The pill above the headline points to the workflow of the
 * day, which sits just below the hero, so first-time visitors know it's
 * there without scrolling.
 */
export function Hero({ idea, rotated = false }: { idea?: DailyIdea | null; rotated?: boolean }) {
  return (
    <section className="relative overflow-hidden bg-charcoal geometric-grid py-14 sm:py-20">
      <div className="relative mx-auto max-w-7xl px-4 text-center">
        {idea ? (
          <a
            href="#workflow-of-the-day"
            className="group mb-6 inline-flex max-w-full items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary-bright ring-1 ring-primary/30 transition-colors hover:bg-primary/20"
          >
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-bright opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-bright" />
            </span>
            <span className="shrink-0 font-semibold">{rotated ? 'Workflow of the day:' : 'New today:'}</span>
            <span className="truncate text-slate-200 group-hover:text-white">{idea.title}</span>
            <span aria-hidden="true" className="shrink-0">&darr;</span>
          </a>
        ) : (
          <div className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary-bright ring-1 ring-primary/30">
            Free for UK construction teams
          </div>
        )}

        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Free AI workflows, prompts and templates for{' '}
          <span className="text-primary-bright">UK construction</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
          Ready-to-use prompts for quantity surveyors, project managers, site
          managers and more. Copy, paste, and save hours every week.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/ai-workflows"
            className={buttonVariants({ size: 'lg', className: 'px-8 py-3.5 h-auto shadow-lg shadow-primary/25' })}
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
            className={buttonVariants({ variant: 'outline-dark', size: 'lg', className: 'px-8 py-3.5 h-auto' })}
          >
            Read the Guides
          </Link>
        </div>

        <nav aria-label="Find workflows for your role" className="mt-10 border-t border-slate-700/60 pt-6">
          <p className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-slate-400">
            I&apos;m a&hellip;
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {ROLE_PICKER.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/ai-for/${r.slug}`}
                  className="inline-flex rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 ring-1 ring-slate-600 transition-colors hover:bg-primary/15 hover:text-white hover:ring-primary/50"
                >
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
