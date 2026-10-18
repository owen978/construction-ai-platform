import rawResults from '@/content/workflow-results.generated.json'

/**
 * "Typical result" data for workflow pages, compiled from
 * marketing/workflow-results/workflow-results.csv (Owen edits it in Excel).
 * Times are cautious typical estimates that include gathering the inputs
 * and checking the output. Drafts only show in local development.
 */
export interface WorkflowResult {
  timeByHandMins: number
  timeWithAiMins: number
  whatItReplaces: string | null
  whatToCheck: string[]
  status: 'draft' | 'approved'
}

const ALL = rawResults as Record<string, WorkflowResult>

export function getWorkflowResult(slug: string): WorkflowResult | null {
  const result = ALL[slug]
  if (!result) return null
  if (result.status !== 'approved' && process.env.NODE_ENV !== 'development') return null
  return result
}
