export const revalidate = 3600

import type { Metadata } from 'next'
import Link from 'next/link'
import { getTemplates } from '@/lib/queries/templates'
import { TemplateCard } from '@/components/cards/template-card'
import { breadcrumbSchema, collectionPageSchema, jsonLdScriptProps } from '@/lib/schema'
import { NewsletterInline } from '@/components/sections/newsletter-inline'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buildcopilot.ai'

export const metadata: Metadata = {
  title: 'Free Construction Templates - AI-Powered Document Generators',
  description:
    'Free construction document templates powered by AI. Method statements, RAMS, daily reports, toolbox talks, risk assessments, and more. Download and use instantly.',
}

export default async function TemplatesPage() {
  const templates = await getTemplates()

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Templates' },
    ]),
    collectionPageSchema({
      name: 'Free Construction Templates',
      description:
        'Free construction document templates powered by AI. Method statements, RAMS, daily reports, toolbox talks, risk assessments, and more.',
      url: `${SITE_URL}/templates`,
      items: templates.map((t) => ({
        name: t.name,
        url: `${SITE_URL}/templates/${t.slug}`,
      })),
    }),
  ]

  return (
    <>
      <script {...jsonLdScriptProps(schemas)} />

      {/* Page Header */}
      <div className="bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:pt-16">
          <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
            <span className="font-medium text-slate-900">Templates</span>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Free Construction Templates</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">Professional construction document templates you can generate with AI. Method statements, RAMS, daily reports, and more.</p>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        {templates.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <p className="text-slate-500">Templates coming soon. Check back shortly.</p>
          </div>
        )}
      </div>

      <NewsletterInline />
    </>
  )
}
