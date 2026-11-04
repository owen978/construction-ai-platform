import type { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbSchema, creditsFor, extractFaqFromMarkdown, faqSchema, organizationSchema, jsonLdScriptProps } from '@/lib/schema'
import { getPageBody } from '@/lib/page-bodies'
import { MarkdownContent } from '@/components/markdown-content'
import { Byline } from '@/components/ui/byline'
import { FormwiseEmbed } from '@/components/formwise-embed'
import { NewsletterInline } from '@/components/sections/newsletter-inline'
import { FreeOfferBlock } from '@/components/leads/free-offer'
import { SITE_URL } from '@/lib/site'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
  path: '/tools/rams-generator',
  title: 'Free AI RAMS Generator: Risk Assessment & Method Statement',
  description:
    'Free AI RAMS generator for UK construction. Describe the task and get a risk assessment and method statement draft to review and sign off. CDM 2015 aware.',
})

const PATH = '/tools/rams-generator'

const STEPS = [
  { t: 'Describe the task', d: 'Enter the activity, site, hazards, and equipment.' },
  { t: 'Generate the draft', d: 'The AI produces a full RAMS in seconds.' },
  { t: 'Review and sign off', d: 'Check it against your site and approve it.' },
]

export default function RamsGeneratorPage() {
  // The page's copy lives in marketing/page-bodies/tools/rams-generator.md.
  const body = getPageBody('tools', 'rams-generator')
  const faqItems = body ? extractFaqFromMarkdown(body.body) : []
  const updatedAt = body ? `${body.updated}T12:00:00Z` : null

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Tools', url: `${SITE_URL}/tools/rams-generator` },
      { name: 'RAMS Generator' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'AI RAMS Generator',
      description:
        'Free AI tool that generates a Risk Assessment and Method Statement (RAMS) draft for UK construction tasks.',
      url: `${SITE_URL}/tools/rams-generator`,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
      publisher: organizationSchema(),
      ...creditsFor(PATH),
      ...(updatedAt ? { dateModified: updatedAt } : {}),
    },
    ...(faqItems.length > 0 ? [faqSchema(faqItems)] : []),
  ]

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script {...jsonLdScriptProps(schemas)} />

      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="text-slate-300">/</span>
        <span className="font-medium text-slate-900">RAMS Generator</span>
      </nav>

      {/* Hero */}
      <div className="mb-10 text-center">
        <span className="mb-4 inline-block rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-primary">
          Free tool
        </span>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Free RAMS Generator
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
          {body?.intro ??
            'Describe your task and get a structured Risk Assessment and Method Statement draft, ready for a competent person to review and sign off.'}
        </p>
        <Byline path={PATH} updatedAt={updatedAt} className="mt-4" />
      </div>

      {/* How it works */}
      <h2 className="mb-4 text-2xl font-bold text-slate-900">How does the AI RAMS generator work?</h2>
      <ol className="mb-10 grid gap-4 sm:grid-cols-3">
        {STEPS.map((step, i) => (
          <li key={step.t} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              {i + 1}
            </div>
            <h3 className="mb-1 font-semibold text-slate-900">{step.t}</h3>
            <p className="text-sm text-slate-600">{step.d}</p>
          </li>
        ))}
      </ol>

      {/* The tool */}
      <FormwiseEmbed />

      {/* Sections 2 to 6, the QS take and the FAQ */}
      {body && (
        <div className="mt-12">
          <MarkdownContent content={body.body} />
        </div>
      )}

      <FreeOfferBlock path="/tools/rams-generator" utmContent="tool-rams-generator" />
      <NewsletterInline />
    </div>
  )
}
