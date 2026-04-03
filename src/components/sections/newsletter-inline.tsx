'use client'

import Script from 'next/script'
import { cn } from '@/lib/utils'

interface NewsletterInlineProps {
  className?: string
}

/**
 * Full-width newsletter signup with embedded GHL form.
 * Use at the bottom of pages, above the footer.
 */
export function NewsletterInline({ className }: NewsletterInlineProps) {
  return (
    <section className={cn('py-16 sm:py-20', className)}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-lg border border-primary/20 bg-gradient-to-br from-charcoal to-charcoal/95 px-8 py-12 sm:px-16 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
              Free Weekly Newsletter
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Get Construction AI Tips in Your Inbox
            </h2>
            <p className="mt-3 text-slate-300">
              New workflows, prompts, and templates delivered weekly. Join construction professionals already saving hours with AI.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-lg">
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

          <p className="mt-4 text-center text-xs text-slate-400">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
