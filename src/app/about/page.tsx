import type { Metadata } from 'next'
import Link from 'next/link'
import { pageMetadata } from '@/lib/metadata'
import { AUTHOR } from '@/lib/author'

export const metadata: Metadata = pageMetadata({
  path: '/about',
  title: 'About BuildCopilot',
  description:
    'BuildCopilot is a free library of AI workflows, prompts and templates for UK construction, run by quantity surveyor Owen Hagger.',
})

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:pt-16">
          <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
            <span className="font-medium text-slate-900">About</span>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">About BuildCopilot</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">Free AI workflows for UK construction, run by a quantity surveyor.</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="space-y-8 text-slate-600 leading-relaxed">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">Why I built it</h2>
            <p>
              I&apos;m{' '}
              <Link href={AUTHOR.path} className="font-semibold text-primary hover:text-primary/90 transition-colors">
                Owen Hagger
              </Link>
              , a quantity surveyor with 25 years in UK construction.
            </p>
            <p className="mt-4">
              Most AI advice is written for marketers and software people. Very little of it knows what a valuation is, or why a buried exclusion in a subbie&apos;s quote matters.
            </p>
            <p className="mt-4">
              So I built BuildCopilot. Free prompts, workflows and templates for the people who actually run construction jobs.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">What you&apos;ll find here</h2>
            <p>
              Ready-to-use prompts and workflows you can copy into ChatGPT, Claude or Microsoft Copilot. Each one tells you when to use it, what to give it, and what to check before you trust the output.
            </p>
            <p className="mt-4">
              They&apos;re written around how UK jobs actually run, and reference standards and contracts like NRM, JCT, NEC and CDM where it matters.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">Who It&apos;s For</h2>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-sm">📊</span>
                <span><strong className="text-slate-900">Quantity Surveyors</strong>: cost plans, BOQs, valuations, tender analysis, final accounts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-sm">📋</span>
                <span><strong className="text-slate-900">Project Managers</strong>: progress reports, risk registers, stakeholder communication, closeout reports</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-sm">🏗️</span>
                <span><strong className="text-slate-900">Site Managers</strong>: daily reports, method statements, toolbox talks, snagging lists</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-sm">🧮</span>
                <span><strong className="text-slate-900">Estimators</strong>: bid pricing, scope documents, PQQs, cost benchmarking</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-sm">📄</span>
                <span><strong className="text-slate-900">Contracts Managers</strong>: notices, EOT assessments, claims, contract summaries</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-sm">👔</span>
                <span><strong className="text-slate-900">Construction Directors</strong>: executive summaries, portfolio reviews, strategic planning</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">Why it&apos;s free</h2>
            <p>Everything here is free. No login, no paywall.</p>
            <p className="mt-4">
              If you want these workflows built into your own systems, I do that through {AUTHOR.company.name}, starting with a £950{' '}
              <Link href="/services" className="font-semibold text-primary hover:text-primary/90 transition-colors">
                Roadmap Review
              </Link>
              .
            </p>
          </div>

          <div className="rounded-lg border border-primary/20 bg-gradient-to-br from-charcoal to-charcoal/95 p-8 text-center">
            <h2 className="mb-2 text-xl font-bold text-white">Ready to get started?</h2>
            <p className="mb-6 text-slate-300">Browse the library of AI workflows built for construction professionals.</p>
            <Link
              href="/ai-workflows"
              className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all"
            >
              Explore Workflows
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
