import type { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbSchema, faqSchema, organizationSchema, jsonLdScriptProps } from '@/lib/schema'
import { FormwiseEmbed } from '@/components/formwise-embed'
import { NewsletterInline } from '@/components/sections/newsletter-inline'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buildcopilot.ai'

export const metadata: Metadata = {
  title: 'Free RAMS Generator: Risk Assessment & Method Statement',
  description:
    'Free AI RAMS generator for UK construction. Enter your task and get a structured Risk Assessment and Method Statement draft in minutes. Built around CDM 2015.',
}

const FAQ = [
  {
    question: 'Is the RAMS generator free?',
    answer:
      'Yes. The RAMS generator is free to use. You enter your task details and receive a structured Risk Assessment and Method Statement draft. You provide your email to receive the completed document.',
  },
  {
    question: 'Is an AI-generated RAMS legally valid?',
    answer:
      'An AI-generated RAMS is a first draft, not a finished document. It must be reviewed, tailored to the actual site, and signed off by a competent person before use. Used that way it is just as valid as one written from scratch, and far quicker to produce.',
  },
  {
    question: 'What does the generator produce?',
    answer:
      'A complete RAMS draft: scope of works, a risk assessment table with likelihood and severity scoring and control measures, a step-by-step method statement, required PPE, competence requirements, and emergency arrangements.',
  },
  {
    question: 'Does it follow UK regulations?',
    answer:
      'The output is built around UK practice, referencing CDM 2015 and the Management of Health and Safety at Work Regulations 1999. You should always check it against your own site conditions and company procedures.',
  },
]

export default function RamsGeneratorPage() {
  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Tools', url: `${SITE_URL}/tools/rams-generator` },
      { name: 'RAMS Generator' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'RAMS Generator',
      description:
        'Free AI tool that generates a Risk Assessment and Method Statement (RAMS) draft for UK construction tasks.',
      url: `${SITE_URL}/tools/rams-generator`,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
      publisher: organizationSchema(),
    },
    faqSchema(FAQ),
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
          Turn a two-hour job into two minutes. Describe your task and get a structured Risk
          Assessment and Method Statement draft, ready for a competent person to review and sign off.
        </p>
      </div>

      {/* How it works */}
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        {[
          { n: '1', t: 'Describe the task', d: 'Enter the activity, site, hazards, and equipment.' },
          { n: '2', t: 'Generate the draft', d: 'The AI produces a full RAMS in seconds.' },
          { n: '3', t: 'Review and sign off', d: 'Check it against your site and approve it.' },
        ].map((s) => (
          <div key={s.n} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              {s.n}
            </div>
            <h3 className="mb-1 font-semibold text-slate-900">{s.t}</h3>
            <p className="text-sm text-slate-600">{s.d}</p>
          </div>
        ))}
      </div>

      {/* The tool */}
      <FormwiseEmbed height={820} />

      {/* What is a RAMS */}
      <div className="mt-12 rounded-lg border border-primary/20 bg-primary/5 p-6">
        <h2 className="mb-2 text-xl font-semibold text-slate-900">New to RAMS?</h2>
        <p className="text-slate-700">
          A RAMS combines a risk assessment and a method statement in one document. For a full
          explanation of what to include and why, read our{' '}
          <Link href="/guides/what-is-a-rams-construction-guide" className="font-medium text-primary underline underline-offset-2">
            complete guide to RAMS
          </Link>
          , or grab the editable{' '}
          <Link href="/templates/rams" className="font-medium text-primary underline underline-offset-2">
            free RAMS template
          </Link>
          {' '}and{' '}
          <Link href="/templates/method-statement" className="font-medium text-primary underline underline-offset-2">
            method statement template
          </Link>
          .
        </p>
      </div>

      {/* FAQ */}
      <div className="mt-12">
        <h2 className="mb-6 border-b border-slate-200 pb-3 text-2xl font-bold text-slate-900">
          Frequently asked questions
        </h2>
        <div className="space-y-6">
          {FAQ.map((item) => (
            <div key={item.question}>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">{item.question}</h3>
              <p className="leading-relaxed text-slate-700">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <NewsletterInline />
    </div>
  )
}
