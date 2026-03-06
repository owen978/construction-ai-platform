import { cn } from '@/lib/utils'

interface CopilotCTAProps {
  className?: string
  variant?: 'sidebar' | 'inline'
}

export function CopilotCTA({ className, variant = 'sidebar' }: CopilotCTAProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border border-[#ff6b35]/20 bg-gradient-to-br from-[#1a1a2e] to-[#1a1a2e]/95 p-6',
        variant === 'inline' && 'my-8',
        className
      )}
    >
      <div className="relative">
        <div className="mb-2 inline-flex items-center rounded-full bg-[#ff6b35]/10 px-3 py-1 text-xs font-medium text-[#ff6b35]">
          Try our software
        </div>
        <h3 className="text-lg font-semibold text-white">
          Want these prompts pre-built?
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          AI Construction Copilot has all these workflows ready to run — no copy-pasting needed. Built specifically for construction professionals.
        </p>
        <a
          href="https://aiconstructioncopilot.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center rounded-lg bg-[#ff6b35] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#ff6b35]/25 hover:bg-[#e85d26] transition-all"
        >
          Try Free
          <svg
            className="ml-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}
