import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact Us — BuildCopilot',
  description:
    'Get in touch with the BuildCopilot team. Questions, feedback, or partnership enquiries welcome.',
}

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:pt-16">
          <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-[#ff6b35] transition-colors">Home</Link>
            <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
            <span className="font-medium text-slate-900">Contact</span>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Get in Touch</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">Have a question, feedback, or want to work together? We&apos;d love to hear from you.</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2">
          {/* General Enquiries */}
          <div className="rounded-lg border border-slate-200/60 border-l-4 border-l-transparent bg-white p-6 shadow-sm hover:border-l-[#ff6b35] transition-all">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-lg">
              💬
            </div>
            <h2 className="text-lg font-semibold text-slate-900">General Enquiries</h2>
            <p className="mt-2 text-sm text-slate-600">
              Questions about our workflows, guides, or how to use AI in construction.
            </p>
            <a
              href="mailto:hello@buildcopilot.ai"
              className="mt-4 inline-flex items-center text-sm font-semibold text-[#ff6b35] hover:text-[#e85d26] transition-colors"
            >
              hello@buildcopilot.ai
            </a>
          </div>

          {/* Partnerships */}
          <div className="rounded-lg border border-slate-200/60 border-l-4 border-l-transparent bg-white p-6 shadow-sm hover:border-l-[#ff6b35] transition-all">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-lg">
              🤝
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Partnerships</h2>
            <p className="mt-2 text-sm text-slate-600">
              Interested in contributing workflows, tools, or partnering with us.
            </p>
            <a
              href="mailto:partners@buildcopilot.ai"
              className="mt-4 inline-flex items-center text-sm font-semibold text-[#ff6b35] hover:text-[#e85d26] transition-colors"
            >
              partners@buildcopilot.ai
            </a>
          </div>

          {/* Consulting */}
          <div className="rounded-lg border border-slate-200/60 border-l-4 border-l-transparent bg-white p-6 shadow-sm hover:border-l-[#ff6b35] transition-all">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-lg">
              👔
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Consulting & Implementation</h2>
            <p className="mt-2 text-sm text-slate-600">
              Need help deploying AI workflows in your construction business.
            </p>
            <a
              href="mailto:consulting@buildcopilot.ai"
              className="mt-4 inline-flex items-center text-sm font-semibold text-[#ff6b35] hover:text-[#e85d26] transition-colors"
            >
              consulting@buildcopilot.ai
            </a>
          </div>

          {/* Feedback */}
          <div className="rounded-lg border border-slate-200/60 border-l-4 border-l-transparent bg-white p-6 shadow-sm hover:border-l-[#ff6b35] transition-all">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-lg">
              💡
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Feedback & Suggestions</h2>
            <p className="mt-2 text-sm text-slate-600">
              Got an idea for a workflow or spotted something we can improve.
            </p>
            <a
              href="mailto:feedback@buildcopilot.ai"
              className="mt-4 inline-flex items-center text-sm font-semibold text-[#ff6b35] hover:text-[#e85d26] transition-colors"
            >
              feedback@buildcopilot.ai
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-lg border border-[#ff6b35]/20 bg-gradient-to-br from-[#1a1a2e] to-[#1a1a2e]/95 p-8 text-center">
          <h2 className="mb-2 text-xl font-bold text-white">Looking for AI Construction Copilot?</h2>
          <p className="mb-6 text-slate-300">Our software product has all these workflows pre-built and ready to run.</p>
          <a
            href="https://aiconstructioncopilot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-[#ff6b35] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#ff6b35]/25 hover:bg-[#e85d26] transition-all"
          >
            Visit AI Construction Copilot
            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
      </div>
    </>
  )
}
