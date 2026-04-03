import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button-variants'

interface PromptPackBannerProps {
  className?: string
  context?: 'workflow' | 'template'
}

const PROMPT_PACK_URL = '/prompt-pack'

/**
 * Mid-page horizontal banner for the Construction AI Prompt Pack.
 * Sits above the prompt/template content section to catch readers before they copy.
 */
export function PromptPackBanner({ className, context = 'workflow' }: PromptPackBannerProps) {
  const isTemplate = context === 'template'

  return (
    <div
      className={cn(
        'my-10 rounded-lg border border-primary/20 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 px-6 py-6 sm:px-8 sm:py-8',
        className
      )}
    >
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-semibold text-slate-900">
            {isTemplate
              ? 'Want all 13 templates as editable Word docs?'
              : 'Want all 50 prompts in one downloadable pack?'}
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            {isTemplate
              ? 'The Construction AI Prompt Pack includes every template as an editable document, plus 50 AI prompts and role cheat sheets.'
              : 'The Construction AI Prompt Pack includes every workflow prompt, 13 editable templates, and role-specific cheat sheets.'}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-center gap-1.5">
          <a
            href={PROMPT_PACK_URL}
            className={buttonVariants({ className: 'whitespace-nowrap' })}
          >
            Get the Pack - £29
          </a>
          <p className="text-xs text-slate-400">Instant download</p>
        </div>
      </div>
    </div>
  )
}
