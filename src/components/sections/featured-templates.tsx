import Link from 'next/link'
import { TemplateCard } from '@/components/cards/template-card'
import type { Template } from '@/types'

/** The templates people search for most, shown first when they're published. */
const LEAD_TEMPLATES = ['rams', 'method-statement', 'risk-assessment', 'toolbox-talk', 'site-diary', 'construction-phase-plan']

export function FeaturedTemplates({ templates, limit = 6 }: { templates: Template[]; limit?: number }) {
  if (templates.length === 0) return null
  const rank = (t: Template) => {
    const i = LEAD_TEMPLATES.indexOf(t.slug)
    return i === -1 ? LEAD_TEMPLATES.length + (t.sort_order ?? 100) : i
  }
  const shown = [...templates].sort((a, b) => rank(a) - rank(b)).slice(0, limit)

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Free Templates</p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Free Construction Templates</h2>
          <p className="mt-4 text-lg text-slate-600">UK construction templates to copy and adapt, each with tips for filling it in with AI.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/templates" className="inline-flex items-center text-sm font-semibold text-primary transition-colors hover:text-primary/90">
            View all templates
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
