'use client'

import { useEffect, useRef } from 'react'

const FORM_BASE_URL =
  'https://app.formwise.ai/form_single/1781468699941x755015863171285000'

/**
 * Embeds the Formwise inline tool. Sets window.FormwiseInlineConfig BEFORE
 * loading formwise-inline.js so the script finds its config when it runs.
 */
export function FormwiseEmbed({ height = 820 }: { height?: number }) {
  const loaded = useRef(false)

  useEffect(() => {
    if (loaded.current) return
    loaded.current = true
    ;(window as unknown as { FormwiseInlineConfig?: { baseUrl: string } }).FormwiseInlineConfig = {
      baseUrl: FORM_BASE_URL,
    }
    const script = document.createElement('script')
    script.src = 'https://app.formwise.ai/formwise-inline.js'
    script.defer = true
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
