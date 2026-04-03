import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button-variants'

interface PromptPackCTAProps {
  className?: string
  context?: 'workflow' | 'template' | 'role' | 'default'
  roleName?: string
}

const PROMPT_PACK_URL = '/prompt-pack'

const contextCopy = {
  workflow: {
    badge: 'All 50 Prompts',
    heading: 'Get every prompt in one pack',
    description:
      'Stop copy-pasting one prompt at a time. The Construction AI Prompt Pack includes all 50 workflows as editable documents, organised by role, ready to use offline.',
    cta: 'Get the Prompt Pack',
  },
  template: {
    badge: 'All 13 Templates',
    heading: 'Get every template as a Word doc',
    description:
      'Download all 13 construction templates as editable Word documents. Fill in your project details and submit. No formatting needed.',
    cta: 'Get the Prompt Pack',
  },
  role: {
    badge: 'Complete AI Toolkit',
    heading: 'Get the complete AI toolkit',
    description:
      'All prompts, templates, and cheat sheets for your role in one downloadable pack. Hand it to your team and get everyone using AI this week.',
    cta: 'Get the Prompt Pack',
  },
  default: {
    badge: 'Digital Download',
    heading: 'The Construction AI Prompt Pack',
    description:
      '50 prompts, 13 templates, role cheat sheets, and setup guides. Everything on BuildCopilot packaged as editable documents you can use offline.',
    cta: 'Get the Prompt Pack',
  },
}

/**
 * Sidebar CTA for the Construction AI Prompt Pack.
 * Visually distinct from the newsletter CTA (orange/warm tones vs charcoal).
 */
export function PromptPackCTA({ className, context = 'default', roleName }: PromptPackCTAProps) {
  const copy = contextCopy[context]
  const heading = context === 'role' && roleName
    ? `Get the complete AI toolkit for ${roleName}`
    : copy.heading

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border border-primary/30 bg-gradient-to-br from-orange-50 to-amber-50 p-6',
        className
      )}
    >
      <div className="relative">
        <div className="mb-2 inline-flex items-center rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
          {copy.badge}
        </div>
        <h3 className="text-lg font-semibold text-slate-900">
          {heading}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {copy.description}
        </p>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-slate-900">£29</span>
          <span className="text-sm text-slate-500">one-time</span>
        </div>
        <a
          href={PROMPT_PACK_URL}
          className={buttonVariants({ className: 'mt-3 w-full justify-center shadow-lg shadow-primary/25' })}
        >
          {copy.cta}
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
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </a>
        <p className="mt-2 text-center text-xs text-slate-400">Instant download. Editable files.</p>
      </div>
    </div>
  )
}
