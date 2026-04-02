import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Newsletter — BuildCopilot',
  description:
    'Subscribe to the BuildCopilot newsletter. Get new AI workflows, prompts, and guides for construction professionals delivered to your inbox.',
}

export default function NewsletterPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:pt-16">
          <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
            <span className="font-medium text-slate-900">Newsletter</span>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Stay Ahead with AI</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Get new AI workflows, practical prompts, and construction industry guides delivered straight to your inbox. Free, no spam, unsubscribe anytime.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-12">
        {/* What You Get */}
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200/60 bg-white p-6 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-lg">
              🔧
            </div>
            <h3 className="font-semibold text-slate-900">New Workflows</h3>
            <p className="mt-2 text-sm text-slate-600">
              Ready-to-use AI prompts for QS, PM, Site Managers, and more — delivered as we publish them.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/60 bg-white p-6 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-lg">
              📖
            </div>
            <h3 className="font-semibold text-slate-900">Guides & Tips</h3>
            <p className="mt-2 text-sm text-slate-600">
              Practical guides on using ChatGPT, Claude, and Copilot effectively in construction.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/60 bg-white p-6 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-lg">
              🚀
            </div>
            <h3 className="font-semibold text-slate-900">Early Access</h3>
            <p className="mt-2 text-sm text-slate-600">
              Be the first to know about new tools, features, and construction AI developments.
            </p>
          </div>
        </div>

        {/* GHL Embedded Form */}
        <div className="rounded-lg border border-primary/20 bg-gradient-to-br from-charcoal to-charcoal/95 p-8 sm:p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Subscribe to the Newsletter</h2>
            <p className="mt-3 text-slate-300">Join construction professionals already using AI to work smarter.</p>
          </div>

          <div className="mx-auto max-w-lg">
            <iframe
              src="https://link.contractorsystems.co.uk/widget/form/rncFCtEjzs4hnT5jgHsB"
              style={{ width: '100%', height: '554px', border: 'none', borderRadius: '3px' }}
              id="inline-rncFCtEjzs4hnT5jgHsB"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name=""
              data-height="554"
              data-layout-iframe-id="inline-rncFCtEjzs4hnT5jgHsB"
              data-form-id="rncFCtEjzs4hnT5jgHsB"
              title="Newsletter signup form"
            />
            <Script
              src="https://link.contractorsystems.co.uk/js/form_embed.js"
              strategy="lazyOnload"
            />
          </div>
        </div>

        {/* Trust Line */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            We respect your privacy. Unsubscribe anytime. Read our{' '}
            <Link href="/privacy" className="text-primary hover:text-primary/90 transition-colors">
              Privacy Policy
            </Link>.
          </p>
        </div>
      </div>
    </>
  )
}
