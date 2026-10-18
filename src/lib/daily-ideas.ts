import rawIdeas from '@/content/daily-ideas.generated.json'

/**
 * "Construction AI workflow of the day". Ideas are written as Markdown in
 * marketing/daily-ideas/ and compiled by scripts/build-daily-ideas.mjs.
 *
 * "Today" is the Europe/London date. An idea only appears from its
 * publishDate onwards, so ideas can be written days ahead and switch over
 * at midnight without a deploy (pages revalidate on a timer).
 */

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'
export type Risk = 'low' | 'medium' | 'high'

export interface DailyIdea {
  slug: string
  publishDate: string // YYYY-MM-DD, Europe/London
  title: string
  summary: string
  roles: string[]
  task: string
  contractForms: string[]
  tool: string
  timeByHandMins: number | null
  timeWithAiMins: number | null
  difficulty: Difficulty
  riskIfWrong: Risk
  whenToUse: string | null
  prompt: string
  result: string | null
  whatToCheck: string[]
  steps: string[]
  source: { kind: 'owen' | 'community'; url: string | null; label: string | null }
  relatedWorkflow: string | null
  status: 'draft' | 'approved'
}

const ALL = rawIdeas as DailyIdea[]

/** Drafts show only in local development, so they can be previewed before approval. */
function visible(): DailyIdea[] {
  return process.env.NODE_ENV === 'development' ? ALL : ALL.filter((i) => i.status === 'approved')
}

export function londonDate(at: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/London',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(at)
}

/** Ideas whose day has come, newest first. */
export function getPublishedIdeas(today = londonDate()): DailyIdea[] {
  return visible()
    .filter((i) => i.publishDate <= today)
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate))
}

function hash(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}

/**
 * Today's idea, or, on a day with nothing new, one rotated in from the
 * library. The rotation walks a fixed shuffle of the library one step per
 * day, so every visitor sees the same card and nothing repeats until the
 * whole library has been shown. Rotated ideas keep their original date.
 */
export function getIdeaOfTheDay(today = londonDate()): { idea: DailyIdea; rotated: boolean } | null {
  const published = getPublishedIdeas(today)
  const fresh = published.find((i) => i.publishDate === today)
  if (fresh) return { idea: fresh, rotated: false }
  if (published.length === 0) return null

  const shuffled = [...published].sort((a, b) => hash(a.slug) - hash(b.slug))
  const dayNumber = Math.floor(Date.parse(`${today}T00:00:00Z`) / 86_400_000)
  return { idea: shuffled[dayNumber % shuffled.length], rotated: true }
}

/** The most recent other ideas, for the "More ideas" strip. */
export function getRecentIdeas(excludeSlug: string | null, limit = 3, today = londonDate()): DailyIdea[] {
  return getPublishedIdeas(today).filter((i) => i.slug !== excludeSlug).slice(0, limit)
}

/** Ideas sharing a role or task, most shared tags first, then newest. */
export function getRelatedIdeas(idea: DailyIdea, limit = 3, today = londonDate()): DailyIdea[] {
  return getPublishedIdeas(today)
    .filter((i) => i.slug !== idea.slug)
    .map((i) => ({
      i,
      score: i.roles.filter((r) => idea.roles.includes(r)).length + (i.task === idea.task ? 2 : 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.i.publishDate.localeCompare(a.i.publishDate))
    .slice(0, limit)
    .map((x) => x.i)
}

/** URL segment for an idea's permanent page: "2026-10-20-check-a-subcontractor-application". */
export function ideaParam(idea: Pick<DailyIdea, 'publishDate' | 'slug'>) {
  return `${idea.publishDate}-${idea.slug}`
}

export function ideaPath(idea: Pick<DailyIdea, 'publishDate' | 'slug'>) {
  return `/daily/${ideaParam(idea)}`
}

export function getIdeaByParam(param: string, today = londonDate()): DailyIdea | null {
  const m = param.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/)
  if (!m) return null
  return getPublishedIdeas(today).find((i) => i.publishDate === m[1] && i.slug === m[2]) ?? null
}

// ─── Labels ──────────────────────────────────────────────────────────

const ROLE_LABELS: Record<string, string> = {
  'quantity-surveyor': 'Quantity Surveyor',
  'commercial-manager': 'Commercial Manager',
  'project-manager': 'Project Manager',
  'site-manager': 'Site Manager',
  'contracts-manager': 'Contracts Manager',
  'construction-director': 'Construction Director',
  'health-and-safety-manager': 'H&S Manager',
  'estimator': 'Estimator',
  'planning-engineer': 'Planner',
  'design-manager': 'Design Manager',
  'bim-manager': 'BIM Manager',
  'procurement-manager': 'Buyer',
  'document-control': 'Document Controller',
  'subcontractor': 'Subcontractor',
  'operations-manager': 'Operations Manager',
}

const TOOL_LABELS: Record<string, string> = {
  'claude': 'Claude',
  'chatgpt': 'ChatGPT',
  'copilot': 'Microsoft Copilot',
  'claude-code': 'Claude Code',
  'gemini': 'Gemini',
  'grok': 'Grok',
  'any': 'Any AI assistant',
}

const titleCase = (slug: string) =>
  slug.split('-').map((w) => (w.length <= 3 && w === w.toUpperCase() ? w : w.charAt(0).toUpperCase() + w.slice(1))).join(' ')

export const roleLabel = (slug: string) => ROLE_LABELS[slug] ?? titleCase(slug)
export const toolLabel = (slug: string) => TOOL_LABELS[slug] ?? titleCase(slug)
export const taskLabel = (slug: string) => titleCase(slug)

export function formatMins(mins: number) {
  if (mins < 60) return `${mins}m`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return m ? `${h}h ${m}m` : `${h}h`
}

/** "~3h → 40m" when both typical figures exist, else null. */
export function timeSavedLabel(idea: Pick<DailyIdea, 'timeByHandMins' | 'timeWithAiMins'>) {
  if (!idea.timeByHandMins || !idea.timeWithAiMins) return null
  return `~${formatMins(idea.timeByHandMins)} → ${formatMins(idea.timeWithAiMins)}`
}

export function formatIdeaDate(date: string, opts: { weekday?: boolean } = {}) {
  return new Intl.DateTimeFormat('en-GB', {
    ...(opts.weekday ? { weekday: 'long' } : {}),
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`))
}
