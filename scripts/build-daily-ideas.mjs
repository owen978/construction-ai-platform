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

  return {
    slug: idea.slug,
    publishDate: idea.publishDate,
    title: idea.title,
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
    status: idea.status,
  }
}

let files = []
try {
  files = readdirSync(SRC).filter((f) => /^\d{4}-\d{2}-\d{2}-.+\.md$/.test(f)).sort()
} catch {
  // No ideas folder yet: write an empty list.
}

const ideas = files.map(parseFile)
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
