import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About BuildCopilot',
  description:
    'BuildCopilot provides free AI workflows, prompts, and guides built specifically for construction professionals. Learn more about our mission.',
}

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:pt-16">
          <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-[#ff6b35] transition-colors">Home</Link>
            <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
            <span className="font-medium text-slate-900">About</span>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">About BuildCopilot</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">Helping construction professionals work smarter with AI.</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="space-y-8 text-slate-600 leading-relaxed">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">Our Mission</h2>
            <p>
              BuildCopilot exists to help construction professionals save time using artificial intelligence. We believe AI is one of the most powerful tools available to the construction industry today — but only if people know how to use it effectively.
            </p>
            <p className="mt-4">
              That&apos;s why we build free, practical AI workflows and guides tailored to the specific needs of Quantity Surveyors, Project Managers, Site Managers, Estimators, and other construction professionals.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">What We Do</h2>
            <p>
              We create ready-to-use AI prompts and workflows that construction professionals can copy, paste, and immediately use with tools like ChatGPT, Claude, and Microsoft Copilot. Every workflow is designed by people who understand construction — not generic AI templates, but prompts that reference real standards, real processes, and real project scenarios.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">Who It&apos;s For</h2>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-sm">📊</span>
                <span><strong className="text-slate-900">Quantity Surveyors</strong> — cost plans, BOQs, valuations, tender analysis, final accounts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-sm">📋</span>
                <span><strong className="text-slate-900">Project Managers</strong> — progress reports, risk registers, stakeholder communication, closeout reports</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-sm">🏗️</span>
                <span><strong className="text-slate-900">Site Managers</strong> — daily reports, method statements, toolbox talks, snagging lists</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-sm">🧮</span>
                <span><strong className="text-slate-900">Estimators</strong> — bid pricing, scope documents, PQQs, cost benchmarking</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-sm">📄</span>
                <span><strong className="text-slate-900">Contracts Managers</strong> — notices, EOT assessments, claims, contract summaries</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-sm">👔</span>
                <span><strong className="text-slate-900">Construction Directors</strong> — executive summaries, portfolio reviews, strategic planning</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">Our Approach</h2>
            <p>
              Every workflow on this platform follows the same principle: <strong className="text-slate-900">practical over theoretical</strong>. We don&apos;t write about AI in vague, abstract terms. We give you the exact prompt to copy, explain when to use it, and show you what to expect back.
            </p>
            <p className="mt-4">
              All our content is free to access. We believe the construction industry benefits most when AI knowledge is shared openly, not locked behind paywalls.
            </p>
          </div>

          <div className="rounded-lg border border-[#ff6b35]/20 bg-gradient-to-br from-[#1a1a2e] to-[#1a1a2e]/95 p-8 text-center">
            <h2 className="mb-2 text-xl font-bold text-white">Ready to get started?</h2>
            <p className="mb-6 text-slate-300">Browse our library of AI workflows built for construction professionals.</p>
            <Link
              href="/ai-workflows"
              className="inline-flex items-center rounded-lg bg-[#ff6b35] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#ff6b35]/25 hover:bg-[#e85d26] transition-all"
            >
              Explore Workflows
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
