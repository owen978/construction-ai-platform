/**
 * Site feature switches.
 */
export const features = {
  /**
   * AI Construction Copilot (aiconstructioncopilot.com) is being rebuilt.
   * While false, its sidebar box, the contact-page section and its tool
   * listing are hidden, and /ai-tools/ai-construction-copilot redirects to
   * /ai-tools (next.config.ts).
   */
  copilot: false,
  /**
   * "Construction AI workflow of the day": homepage card, /daily archive and
   * /daily/{date}-{slug} pages. On since Owen approved the 365-day pipeline
   * (18 Oct 2026). Nothing shows until the first idea's date arrives.
   * Always on in local development so the feature can be built and reviewed.
   */
  dailyIdeas: true,
}

export function isDailyIdeasEnabled() {
  return features.dailyIdeas || process.env.NODE_ENV === 'development'
}

export const COPILOT_TOOL_SLUG = 'ai-construction-copilot'

/** False for tools hidden by a feature switch: they must not list, render or appear in feeds. */
export function isToolVisible(slug: string) {
  return features.copilot || slug !== COPILOT_TOOL_SLUG
}
