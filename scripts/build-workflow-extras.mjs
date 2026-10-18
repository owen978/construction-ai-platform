#!/usr/bin/env node
/**
 * build-workflow-extras.mjs: compile marketing/workflow-extras/<slug>.md into
 * src/content/workflow-extras.generated.json. These add the sections the
 * brief asks every workflow to have (when not to use it, common mistakes,
 * FAQs) without touching the database. Runs before `npm run dev` and build.
 *
 * File format:
 *   ---
 *   status: "draft"            # or "approved"; only approved shows on the live site
 *   ---
 *   ## When not to use it
 *   Paragraph(s).
 *   ## Common mistakes
 *   - Bullet points.
 *   ## FAQs
 *   ### A question?
 *   The answer.
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = resolve(ROOT, 'marketing/workflow-extras')
const OUT = resolve(ROOT, 'src/content/workflow-extras.generated.json')

const SECTIONS = { 'when not to use it': 'whenNotToUse', 'common mistakes': 'commonMistakes', 'faqs': 'faqs' }

function parse(file) {
  const raw = readFileSync(resolve(SRC, file), 'utf8').replace(/\r\n/g, '\n')
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!m) throw new Error(`${file}: missing --- frontmatter ---`)
  const status = m[1].match(/^status:\s*["']?(draft|approved)["']?\s*$/m)?.[1]
  if (!status) throw new Error(`${file}: status must be "draft" or "approved"`)

  const extra = { status, whenNotToUse: null, commonMistakes: [], faqs: [] }
  const parts = m[2].split(/^## +(.+)$/m)
  for (let i = 1; i < parts.length; i += 2) {
    const key = SECTIONS[parts[i].trim().toLowerCase()]
    if (!key) throw new Error(`${file}: unknown section "## ${parts[i].trim()}"`)
    const body = parts[i + 1].trim()
    if (key === 'whenNotToUse') extra.whenNotToUse = body
    if (key === 'commonMistakes') {
      extra.commonMistakes = body.split('\n').map((l) => l.match(/^\s*[-*]\s+(.*)$/)?.[1]?.trim()).filter(Boolean)
    }
    if (key === 'faqs') {
      const qa = body.split(/^### +(.+)$/m)
      for (let j = 1; j < qa.length; j += 2) {
        const answer = qa[j + 1].trim()
        if (!answer) throw new Error(`${file}: FAQ "${qa[j]}" has no answer`)
        extra.faqs.push({ question: qa[j].trim(), answer })
      }
    }
  }
  return extra
}

let files = []
try {
  files = readdirSync(SRC).filter((f) => f.endsWith('.md') && f !== 'README.md')
} catch {
  // No extras yet.
}

const extras = Object.fromEntries(files.map((f) => [f.replace(/\.md$/, ''), parse(f)]))
mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, JSON.stringify(extras, null, 1) + '\n')
const approved = Object.values(extras).filter((e) => e.status === 'approved').length
console.log(`workflow extras: ${files.length} compiled (${approved} approved) -> src/content/workflow-extras.generated.json`)
