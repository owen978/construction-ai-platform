'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { track } from '@vercel/analytics'
import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'

const REMEMBER_KEY = 'bc_download_ok'

const ROLES = [
  'Quantity Surveyor',
  'Commercial Manager',
  'Project Manager',
  'Site Manager',
  'Estimator',
  'Contracts Manager',
  'Health & Safety Manager',
  'Director or Owner',
  'Subcontractor',
  'Other',
]
const SIZES = ['Just me', '2-10 people', '11-50 people', '51-250 people', '250+ people']

const field = 'mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'

/** Start a file download without leaving the page. */
function startDownload(url: string) {
  const a = document.createElement('a')
  a.href = url
  a.rel = 'nofollow'
  document.body.appendChild(a)
  a.click()
  a.remove()
}

function remembered() {
  try {
    return window.localStorage.getItem(REMEMBER_KEY) === '1'
  } catch {
    return false
  }
}

/**
 * "Download in Word" for a template. First time, a short form (email
 * required; name, role and company size help Owen follow up) sends the lead
 * to GoHighLevel, then the download starts. After that the browser remembers
 * and downloads straight away.
 */
export function TemplateDownload({ slug, name, className }: { slug: string; name: string; className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')

  const downloadUrl = `/templates/${slug}/download`

  function open() {
    const known = remembered()
    track('template_download_click', { slug, known })
    if (known) {
      startDownload(downloadUrl)
      return
    }
    setState('idle')
    setError('')
    dialog.current?.showModal()
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const params = new URLSearchParams(window.location.search)
    setState('sending')
    setError('')
    try {
      const res = await fetch('/api/template-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.get('email'),
          firstName: data.get('firstName'),
          role: data.get('role'),
          companySize: data.get('companySize'),
          marketingConsent: data.get('marketingConsent') === 'on',
          website: data.get('website'),
          slug,
          templateName: name,
          pageUrl: window.location.href,
          utmSource: params.get('utm_source'),
          utmMedium: params.get('utm_medium'),
          utmCampaign: params.get('utm_campaign'),
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Something went wrong. Please try again.')
      try {
        window.localStorage.setItem(REMEMBER_KEY, '1')
      } catch {}
      setState('done')
      track('template_download_lead', { slug })
      if (json.downloadUrl) startDownload(json.downloadUrl)
    } catch (err) {
      setState('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <>
      <button type="button" onClick={open} className={cn(buttonVariants(), 'gap-2', className)}>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        Download in Word
      </button>

      <dialog
        ref={dialog}
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-xl p-0 shadow-2xl backdrop:bg-slate-900/60"
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Download the {name}</h2>
              <p className="mt-1 text-sm text-slate-600">A free, editable Word version. Tell us where to send updates and we&apos;ll start the download.</p>
            </div>
            <button type="button" onClick={() => dialog.current?.close()} className="rounded p-1 text-slate-400 hover:text-slate-700" aria-label="Close">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {state === 'done' ? (
            <div className="mt-5 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-800">
              Your download has started.{' '}
              <a href={downloadUrl} className="font-semibold underline">Download again</a>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-5 space-y-3">
              <label className="block text-sm font-medium text-slate-700">
                Work email <span className="text-primary">*</span>
                <input name="email" type="email" required autoComplete="email" className={field} />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                First name
                <input name="firstName" type="text" autoComplete="given-name" className={field} />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Your role
                  <select name="role" className={field} defaultValue="">
                    <option value="">Choose…</option>
                    {ROLES.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Company size
                  <select name="companySize" className={field} defaultValue="">
                    <option value="">Choose…</option>
                    {SIZES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </label>
              </div>
              {/* Honeypot, hidden from people. */}
              <input name="website" type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <label className="flex items-start gap-2 text-sm text-slate-600">
                <input name="marketingConsent" type="checkbox" className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-primary" />
                <span>Send me new templates and AI workflows for construction. Unsubscribe any time.</span>
              </label>
              {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
              <button type="submit" disabled={state === 'sending'} className={cn(buttonVariants(), 'w-full')}>
                {state === 'sending' ? 'Starting your download…' : 'Download the template'}
              </button>
              <p className="text-xs text-slate-500">
                We use your details to send the template and, if you tick the box, occasional emails. See our{' '}
                <Link href="/privacy" className="underline">privacy policy</Link>.
              </p>
            </form>
          )}
        </div>
      </dialog>
    </>
  )
}
