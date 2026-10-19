'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { track } from '@vercel/analytics'
import { buttonVariants } from '@/components/ui/button-variants'
import { bookingUrl } from '@/lib/ghl'
import { cn } from '@/lib/utils'

const DISMISS_KEY = 'bc_call_bar_dismissed'
const HIDE_FOR_DAYS = 7
/** Content pages only: not the homepage, services, contact, newsletter or admin. */
const SHOW_ON = /^\/(ai-workflows|guides|templates|ai-for|ai-tools|daily|tools)\//

function dismissedRecently() {
  try {
    const at = Number(window.localStorage.getItem(DISMISS_KEY))
    return Number.isFinite(at) && at > 0 && Date.now() - at < HIDE_FOR_DAYS * 86_400_000
  } catch {
    return false
  }
}

/**
 * One quiet, dismissible call to action: appears once a reader is a third of
 * the way down a content page. A bar along the bottom on phones, a small card
 * in the corner on larger screens. Dismissing hides it for a week.
 */
export function StickyCallBar() {
  const pathname = usePathname()
  if (!SHOW_ON.test(`${pathname}/`)) return null
  // Keyed by page, so each new page starts hidden until the reader scrolls.
  return <CallBar key={pathname} pathname={pathname} />
}

function CallBar({ pathname }: { pathname: string }) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (max > 0 && window.scrollY / max > 0.33 && !dismissedRecently()) {
        setVisible(true)
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (dismissed || !visible) return null

  const section = pathname.split('/')[1] || 'page'
  const href = bookingUrl(`sticky-${section}`)

  function dismiss() {
    try {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now()))
    } catch {}
    setDismissed(true)
    track('call_bar_dismiss', { section })
  }

  return (
    <aside
      aria-label="Book a call"
      className={cn(
        'fixed z-40 border-slate-200 bg-white shadow-xl motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4',
        'inset-x-0 bottom-0 border-t px-4 py-3',
        'sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-80 sm:rounded-xl sm:border sm:p-5'
      )}
    >
      <button
        type="button"
        onClick={dismiss}
        className="absolute top-2 right-2 rounded p-1 text-slate-400 hover:text-slate-700"
        aria-label="Hide for a week"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
      </button>
      <div className="flex items-center gap-3 pr-6 sm:block sm:pr-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900">Want this set up for your team?</p>
          <p className="hidden text-sm text-slate-600 sm:mt-1 sm:block">
            A 15-minute call with Owen, a QS with 25+ years in UK construction. No obligation.
          </p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('call_bar_click', { section })}
          className={cn(buttonVariants(), 'shrink-0 sm:mt-3 sm:w-full')}
        >
          Book a 15-min call
        </a>
      </div>
    </aside>
  )
}
