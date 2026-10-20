export const revalidate = 3600

import type { Metadata } from 'next'
import Link from 'next/link'
import { getTools } from '@/lib/queries/tools'
import { ToolCard } from '@/components/cards/tool-card'
import { breadcrumbSchema, collectionPageSchema, jsonLdScriptProps } from '@/lib/schema'
import { NewsletterInline } from '@/components/sections/newsletter-inline'
import { CtaBand } from '@/components/leads/call-cta'
import { SITE_URL } from '@/lib/site'
import { pageMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  const tools = await getTools()
  return pageMetadata({
    path: '/ai-tools',
    title: 'AI Tools for UK Construction Teams',
    description: `How ${tools.length} AI tools, from ChatGPT and Claude to Microsoft Copilot and Procore, fit UK construction work, with workflows to try in each.`,
  })
}

export default async function ToolsPage() {
  const tools = await getTools()

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'AI Tools' },
    ]),
    collectionPageSchema({
      name: 'AI Tools for Construction',
      description:
        'Discover the best AI tools for construction professionals. Compare features, pricing, and find the right tool for your needs.',
      url: `${SITE_URL}/ai-tools`,
      items: tools.map((t) => ({
        name: t.name,
        url: `${SITE_URL}/ai-tools/${t.slug}`,
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
            <span className="font-medium text-slate-900">AI Tools</span>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">AI Tools for Construction</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">Discover the best AI tools for construction professionals. Compare features, pricing, and find the right tool.</p>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        {tools.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <p className="text-slate-500">No items available yet. Check back soon.</p>
          </div>
        )}
      </div>

      <CtaBand
        heading="Not sure which AI tools fit your team?"
        body="A 15-minute call with Owen, a QS with 25+ years in UK construction, about how it could work in your business. No obligation."
        utmContent="hub-ai-tools"
        kind="call"
      />
      <NewsletterInline />
    </>
  )
}
