#!/usr/bin/env node
/**
 * build-daily-ideas.mjs: compile marketing/daily-ideas/*.md into
 * src/content/daily-ideas.generated.json for the site to import.
 *
 * Runs automatically before `npm run dev` and `npm run build`.
 *
 * Each file is `<YYYY-MM-DD>-<slug>.md`: a frontmatter block, then sections
 * headed `## Prompt`, `## What it produced`, `## What you still check`,
 * `## Steps` and optionally `## When to use it`. See
 * marketing/daily-ideas/README.md for the full format.
 *
 * Approved ideas must also pass the search checks below (title and
 * description lengths, enough substance, no em dashes), so a page that
 * would show badly in Google never reaches the live site.
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = resolve(ROOT, 'marketing/daily-ideas')
const OUT = resolve(ROOT, 'src/content/daily-ideas.generated.json')

const REQUIRED = ['title', 'slug', 'summary', 'roles', 'task', 'tool', 'difficulty', 'riskIfWrong', 'status']
const ENUMS = {
  difficulty: ['beginner', 'intermediate', 'advanced'],
  riskIfWrong: ['low', 'medium', 'high'],
  status: ['draft', 'approved'],
  sourceKind: ['owen', 'community'],
}
// Search checks for approved ideas.
const MAX_SEO_TITLE = 60 // Google shows about 60 characters of a title
const DESCRIPTION_RANGE = [120, 160] // the summary is the meta description
const MIN_WORDS = 330 // body text across all sections, so pages aren't thin
const MIN_LIST_ITEMS = 3 // checks and steps
const RELATED_PAGE = /^\/(guides|templates|ai-tools)\/[a-z0-9-]+$/
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const SECTIONS = {
  'prompt': 'prompt',
  'what it produced': 'result',
  'what you still check': 'whatToCheck',
  'steps': 'steps',
  'when to use it': 'whenToUse',
}

function parseValue(raw) {
  const v = raw.trim()
  if (v.startsWith('[') && v.endsWith(']')) {
    return v.slice(1, -1).split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean)
  }
  const unquoted = v.replace(/^["']|["']$/g, '')
  if (unquoted === '' || unquoted === 'null') return null
  if (unquoted === 'true') return true
  if (unquoted === 'false') return false
  if (/^\d+$/.test(unquoted)) return parseInt(unquoted, 10)
  return unquoted
}

function listItems(text) {
  return text
    .split('\n')
    .map((l) => l.match(/^\s*(?:[-*]|\d+\.)\s+(.*)$/)?.[1]?.trim())
    .filter(Boolean)
}

function checkSearchQuality(file, idea) {
  const problems = []
  const seoTitle = idea.metaTitle ?? idea.title
  if (seoTitle.length > MAX_SEO_TITLE) {
    problems.push(idea.metaTitle
      ? `metaTitle is ${seoTitle.length} characters; keep it to ${MAX_SEO_TITLE} or fewer`
      : `title is ${seoTitle.length} characters, too long for search results; add a metaTitle of ${MAX_SEO_TITLE} characters or fewer (the page heading keeps the full title)`)
  }
  const [lo, hi] = DESCRIPTION_RANGE
  if (idea.summary.length < lo || idea.summary.length > hi) {
    problems.push(`summary is ${idea.summary.length} characters; it is the meta description, so keep it between ${lo} and ${hi}`)
  }
  if (!idea.whenToUse) problems.push('add a "## When to use it" section')
  if ((idea.whatToCheck?.length ?? 0) < MIN_LIST_ITEMS) problems.push(`"## What you still check" needs at least ${MIN_LIST_ITEMS} points`)
  if ((idea.steps?.length ?? 0) < MIN_LIST_ITEMS) problems.push(`"## Steps" needs at least ${MIN_LIST_ITEMS} steps`)
  const text = [idea.title, idea.metaTitle, idea.summary, idea.whenToUse, idea.prompt, idea.result, ...(idea.whatToCheck ?? []), ...(idea.steps ?? [])]
    .filter(Boolean)
    .join(' ')
  const words = text.split(/\s+/).filter(Boolean).length
  if (words < MIN_WORDS) problems.push(`only ${words} words; approved ideas need at least ${MIN_WORDS} so the page isn't thin`)
  if (text.includes('\u2014')) problems.push('contains an em dash; use a comma, colon or full stop instead')
  if (problems.length) throw new Error(`${file}:\n  - ${problems.join('\n  - ')}`)
}

function parseFile(file) {
  const raw = readFileSync(resolve(SRC, file), 'utf8').replace(/\r\n/g, '\n')
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!m) throw new Error(`${file}: missing --- frontmatter ---`)

  const idea = {}
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z]+):\s*(.*)$/)
    if (kv) idea[kv[1]] = parseValue(kv[2])
  }

  // Sections: split the body on "## Heading" lines.
  const parts = m[2].split(/^## +(.+)$/m)
  for (let i = 1; i < parts.length; i += 2) {
    const key = SECTIONS[parts[i].trim().toLowerCase()]
    if (!key) throw new Error(`${file}: unknown section "## ${parts[i].trim()}"`)
    const body = parts[i + 1].trim()
    idea[key] = key === 'whatToCheck' || key === 'steps' ? listItems(body) : body
  }

  const fileMatch = file.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/)
  if (!fileMatch) throw new Error(`${file}: name must be YYYY-MM-DD-slug.md`)
  idea.publishDate = fileMatch[1]
  if (idea.slug !== fileMatch[2]) throw new Error(`${file}: slug "${idea.slug}" must match the file name`)

  for (const k of REQUIRED) if (idea[k] == null) throw new Error(`${file}: missing ${k}`)
  for (const [k, allowed] of Object.entries(ENUMS)) {
    if (idea[k] != null && !allowed.includes(idea[k])) throw new Error(`${file}: ${k} must be one of ${allowed.join(', ')}`)
  }
  if (!idea.prompt) throw new Error(`${file}: missing "## Prompt" section`)
  if (!Array.isArray(idea.roles) || idea.roles.length === 0) throw new Error(`${file}: roles must be a non-empty [list]`)
  if (idea.status === 'approved' && (!idea.result || !idea.whatToCheck?.length)) {
    throw new Error(`${file}: approved ideas need "## What it produced" and "## What you still check"`)
  }
  if (idea.relatedWorkflow != null && !SLUG.test(idea.relatedWorkflow)) {
    throw new Error(`${file}: relatedWorkflow must be a workflow slug, e.g. "write-toolbox-talk"`)
  }
  if (idea.relatedPage != null && !RELATED_PAGE.test(idea.relatedPage)) {
    throw new Error(`${file}: relatedPage must be a /guides/, /templates/ or /ai-tools/ path, e.g. "/guides/construction-daily-report-guide"`)
  }
  if (idea.status === 'approved') checkSearchQuality(file, idea)

  return {
    slug: idea.slug,
    publishDate: idea.publishDate,
    title: idea.title,
    metaTitle: idea.metaTitle ?? null,
    summary: idea.summary,
    roles: idea.roles,
    task: idea.task,
    contractForms: idea.contractForms ?? [],
    tool: idea.tool,
    timeByHandMins: idea.timeByHandMins ?? null,
    timeWithAiMins: idea.timeWithAiMins ?? null,
    difficulty: idea.difficulty,
    riskIfWrong: idea.riskIfWrong,
    whenToUse: idea.whenToUse ?? null,
    prompt: idea.prompt,
    result: idea.result ?? null,
    whatToCheck: idea.whatToCheck ?? [],
    steps: idea.steps ?? [],
    source: idea.sourceKind === 'community'
      ? { kind: 'community', url: idea.sourceUrl ?? null, label: idea.sourceLabel ?? null }
      : { kind: 'owen', url: null, label: null },
    relatedWorkflow: idea.relatedWorkflow ?? null,
    relatedPage: idea.relatedPage ?? null,
    status: idea.status,
  }
}

let files = []
try {
  files = readdirSync(SRC).filter((f) => /^\d{4}-\d{2}-\d{2}-.+\.md$/.test(f)).sort()
} catch {
  // No ideas folder yet: write an empty list.
}

// Check every file before failing, so one run lists every problem.
const ideas = []
const errors = []
for (const f of files) {
  try {
    ideas.push(parseFile(f))
  } catch (e) {
    errors.push(e.message)
  }
}
if (errors.length) {
  console.error(`daily ideas: ${errors.length} file(s) need fixing\n\n${errors.join('\n\n')}`)
  process.exit(1)
}
const dates = new Map()
for (const idea of ideas) {
  if (dates.has(idea.publishDate)) {
    throw new Error(`Two ideas share ${idea.publishDate}: ${dates.get(idea.publishDate)} and ${idea.slug}`)
  }
  dates.set(idea.publishDate, idea.slug)
}

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, JSON.stringify(ideas, null, 1) + '\n')
const approved = ideas.filter((i) => i.status === 'approved').length
console.log(`daily ideas: ${ideas.length} compiled (${approved} approved, ${ideas.length - approved} draft) -> src/content/daily-ideas.generated.json`)
