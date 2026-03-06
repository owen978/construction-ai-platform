export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { getGuides } from '@/lib/queries/guides'
import { GuideCard } from '@/components/cards/guide-card'

export const metadata: Metadata = {
  title: 'Guides',
  description:
    'Learn how to use AI effectively in construction. Step-by-step guides for professionals.',
}

export default async function GuidesPage() {
  const guides = await getGuides()

  return (
    <>
      {/* Page Header */}
      <div className="bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:pt-16">
          <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-[#ff6b35] transition-colors">Home</Link>
            <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
            <span className="font-medium text-slate-900">Guides</span>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Guides</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">Learn how to use AI effectively in construction. Step-by-step guides for professionals.</p>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        {guides.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <p className="text-slate-500">No items available yet. Check back soon.</p>
          </div>
        )}
      </div>
    </>
  )
}
