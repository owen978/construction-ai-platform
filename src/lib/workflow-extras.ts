import rawExtras from '@/content/workflow-extras.generated.json'

/**
 * Extra workflow sections (when not to use it, common mistakes, FAQs),
 * compiled from marketing/workflow-extras/<slug>.md. New copy ships as a
 * draft for Owen to approve; drafts only show in local development.
 */
export interface WorkflowExtras {
  status: 'draft' | 'approved'
  whenNotToUse: string | null
  commonMistakes: string[]
  faqs: { question: string; answer: string }[]
}

const ALL = rawExtras as Record<string, WorkflowExtras>

export function getWorkflowExtras(slug: string): WorkflowExtras | null {
  const extras = ALL[slug]
  if (!extras) return null
  if (extras.status !== 'approved' && process.env.NODE_ENV !== 'development') return null
  return extras
}
