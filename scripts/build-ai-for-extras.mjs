#!/usr/bin/env node
/**
 * build-ai-for-extras.mjs: compile marketing/ai-for-extras/<slug>.md into
 * src/content/ai-for-extras.generated.json. These give the /ai-for/ role
 * and task hubs (many of which have barely any text of their own) an
 * overview, where AI helps most, where to be careful and FAQs, without
 * touching the database. Runs before `npm run dev` and `npm run build`.
 *
 * File format (slug = the /ai-for/ page slug, role or task):
 *   ---
 *   status: "draft"            # or "approved"; only approved shows on the live site
 *   ---
 *   ## Overview
 *   Paragraphs.
 *   ## Where AI helps most
 *   - Bullet points.
 *   ## Where to be careful
 *   - Bullet points.
 *   ## FAQs
 *   ### A question?
 *   The answer.
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = resolve(ROOT, 'marketing/ai-for-extras')
const OUT = resolve(ROOT, 'src/content/ai-for-extras.generated.json')

const SECTIONS = {
  'overview': 'overview',
  'where ai helps most': 'helps',
  'where to be careful': 'careful',
  'faqs': 'faqs',
}
const bullets = (body) => body.split('\n').map((l) => l.match(/^\s*[-*]\s+(.*)$/)?.[1]?.trim()).filter(Boolean)

function parse(file) {
  const raw = readFileSync(resolve(SRC, file), 'utf8').replace(/\r\n/g, '\n')
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!m) throw new Error(`${file}: missing --- frontmatter ---`)
  const status = m[1].match(/^status:\s*["']?(draft|approved)["']?\s*$/m)?.[1]
  if (!status) throw new Error(`${file}: status must be "draft" or "approved"`)
  if (raw.includes('—')) throw new Error(`${file}: contains an em dash; use a comma, colon or full stop`)

  const extra = { status, overview: null, helps: [], careful: [], faqs: [] }
  const parts = m[2].split(/^## +(.+)$/m)
  for (let i = 1; i < parts.length; i += 2) {
    const key = SECTIONS[parts[i].trim().toLowerCase()]
    if (!key) throw new Error(`${file}: unknown section "## ${parts[i].trim()}"`)
    const body = parts[i + 1].trim()
    if (key === 'overview') extra.overview = body
    if (key === 'helps' || key === 'careful') extra[key] = bullets(body)
    if (key === 'faqs') {
      const qa = body.split(/^### +(.+)$/m)
      for (let j = 1; j < qa.length; j += 2) {
        const answer = qa[j + 1].trim()
        if (!answer) throw new Error(`${file}: FAQ "${qa[j]}" has no answer`)
        extra.faqs.push({ question: qa[j].trim(), answer })
      }
    }
  }
  if (!extra.overview) throw new Error(`${file}: needs a "## Overview" section`)
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
console.log(`ai-for extras: ${files.length} compiled (${approved} approved) -> src/content/ai-for-extras.generated.json`)
