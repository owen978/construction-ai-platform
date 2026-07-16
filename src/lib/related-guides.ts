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

export function getRelatedGuideSlugs(
  section: RelatedGuidesSection,
  slug: string
): string[] {
  return RELATED_GUIDES_MAP[`${section}/${slug}`] ?? []
}
