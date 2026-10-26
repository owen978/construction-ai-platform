/**
 * Proof figures for the About page, approved by Owen on 26 Oct 2026 and
 * counted that day (source: the hq vault note `20 Sales/Proof stats.md`).
 *
 * Rules: every figure is a floor, so round down and add "+"; recount monthly;
 * part-built work counts only as "built", never as "live"; never use client
 * names, client types or client figures. The workflow, guide and template
 * counts are not typed in here: the About page reads them live from Supabase.
 */

/** Owen's short credentials. Keep them word for word the same on every site. */
export const AUTHOR_CREDENTIALS =
  'UK quantity surveyor since 2001 (25+ years): 50+ projects, £150m+ of project value and 1,500+ homes delivered.'

/** When Owen started using AI at work: February 2021. */
const USING_AI_SINCE = { year: 2021, month: 2, label: 'February 2021' }

export const AI_START_LABEL = USING_AI_SINCE.label

/** Whole years since February 2021, so "5+ years" becomes "6+ years" in February 2027 on its own. */
export function yearsUsingAi(now: Date = new Date()): number {
  const months =
    (now.getFullYear() - USING_AI_SINCE.year) * 12 + (now.getMonth() + 1 - USING_AI_SINCE.month)
  return Math.floor(months / 12)
}

/** Typed-in figures, as counted on 26 Oct 2026. */
export const PROOF = {
  builtWithAi: { value: '50+', label: 'things built with AI in 2026' },
  weeklyAutomations: { value: '19', label: 'automations running every week' },
  linesOfCode: { value: '150,000+', label: 'lines of code written with AI' },
} as const
