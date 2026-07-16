import Link from 'next/link'
import { GuideCard } from '@/components/cards/guide-card'
import { FreeToolCallout } from '@/components/sections/free-tool-callout'
import type { Guide } from '@/types'

interface LatestGuidesProps {
  guides: Guide[]
}

export function LatestGuides({ guides }: LatestGuidesProps) {
  if (guides.length === 0) return null

  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Latest Guides</p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Learn AI for Construction, Step by Step</h2>
          <p className="mt-4 text-lg text-slate-600">Practical guides written for UK construction professionals, from RAMS to cost plans.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
        <FreeToolCallout
          heading="Generate your RAMS in minutes"
          text="Our free RAMS generator drafts a task-specific risk assessment and method statement for you. Review it, tailor it to your site, and issue it."
          href="/tools/rams-generator"
          linkLabel="Try the free RAMS generator"
          className="mx-auto mt-12 mb-0 max-w-3xl"
        />
        <div className="mt-10 text-center">
          <Link href="/guides" className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/90 transition-colors">
            View all guides
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
