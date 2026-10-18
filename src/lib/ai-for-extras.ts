import rawExtras from '@/content/ai-for-extras.generated.json'

/**
 * Extra text for /ai-for/ role and task hubs, compiled from
 * marketing/ai-for-extras/<slug>.md. New copy ships as a draft for Owen to
 * approve; drafts only show in local development.
 */
export interface AiForExtras {
  status: 'draft' | 'approved'
  overview: string | null
  helps: string[]
  careful: string[]
  faqs: { question: string; answer: string }[]
}

const ALL = rawExtras as Record<string, AiForExtras>

export function getAiForExtras(slug: string): AiForExtras | null {
  const extras = ALL[slug]
  if (!extras) return null
  if (extras.status !== 'approved' && process.env.NODE_ENV !== 'development') return null
  return extras
}
