'use client'

import { useState } from 'react'

interface CopyButtonProps {
  text: string
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={
        copied
          ? 'rounded-lg bg-[#ff6b35] px-3 py-1.5 text-sm font-medium text-white'
          : 'rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium text-slate-300 hover:bg-white/20 transition-colors'
      }
      aria-label={copied ? 'Copied to clipboard' : 'Copy to clipboard'}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}
