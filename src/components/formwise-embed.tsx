'use client'

import { useEffect, useRef } from 'react'

const FORM_BASE_URL =
  'https://app.formwise.ai/form_single/1781468699941x755015863171285000'

/**
 * Embeds the Formwise RAMS tool via its inline loader. The form is a SPA that
 * needs the loader's postMessage handshake to initialise, so a bare iframe will
 * not work. We set window.FormwiseInlineConfig and ensure the container exists
 * before injecting the loader script.
 */
export function FormwiseEmbed({ height = 820 }: { height?: number }) {
  const done = useRef(false)

  useEffect(() => {
    if (done.current) return
    done.current = true
    ;(window as unknown as { FormwiseInlineConfig?: Record<string, unknown> }).FormwiseInlineConfig = {
      baseUrl: FORM_BASE_URL,
      containerId: 'formwise-inline-container',
    }
    const script = document.createElement('script')
    script.src = 'https://app.formwise.ai/formwise-inline.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div
      id="formwise-inline-container"
      style={{ width: '100%', height: `${height}px` }}
      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
    />
  )
}
