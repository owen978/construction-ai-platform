/**
 * Mapping of detail-page paths to related guide slugs for the
 * "Further reading" block.
 *
 * Keyed by `${section}/${slug}` (e.g. 'ai-for/quantity-surveyor'), following
 * the same convention as src/lib/service-cta.ts. Pages whose path is not in
 * this map render no further-reading block at all, so new pages can be wired
 * up by adding an entry here without touching page code.
 */

export type RelatedGuidesSection = 'ai-for' | 'ai-workflows' | 'guides' | 'templates'

export const RELATED_GUIDES_MAP: Record<string, string[]> = {
  'ai-for/quantity-surveyor': [
    'ai-for-quantity-surveyors-guide',
    'construction-cost-plan-guide',
    'ai-tender-analysis-guide',
  ],
  // One guide per BIM search cluster: workflows, model checking, copilots, assistants.
  'ai-for/bim-manager': [
    'ai-for-bim-workflows',
    'ai-bim-model-checking-and-qa',
    'bim-ai-copilot-guide',
    'ai-assistant-for-bim',
  ],
  'ai-workflows/generate-bill-of-quantities': [
    'ai-for-quantity-surveyors-guide',
    'construction-cost-plan-guide',
  ],
  'ai-for/site-manager': [
    'construction-daily-report-guide',
    'construction-toolbox-talks-guide',
  ],
  'templates/method-statement': [
    'what-is-a-rams-construction-guide',
  ],
}

/**
 * "Start here" line under an /ai-for hub's heading, pointing to the guide
 * that owns the hub's main search, with the exact anchor text to use. The
 * hub stays the home for workflows; the guide owns the topic.
 */
export const START_HERE: Record<string, { lead: string; links: { href: string; anchor: string }[] }> = {
  'ai-for/cost-estimation': {
    lead: 'New to this? Start with our',
    links: [{ href: '/guides/ai-construction-estimating', anchor: 'AI cost estimation guide' }],
  },
  'ai-tools/chatgpt': {
    lead: 'Weighing up assistants? See',
    links: [{ href: '/ai-tools/claude', anchor: 'Claude for construction' }],
  },
}

export function getRelatedGuideSlugs(
  section: RelatedGuidesSection,
  slug: string
): string[] {
  return RELATED_GUIDES_MAP[`${section}/${slug}`] ?? []
}
