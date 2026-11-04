#!/usr/bin/env node
/**
 * build-page-bodies.mjs: compile marketing/page-bodies/<section>/<slug>.md
 * into src/content/page-bodies.generated.json. A page body replaces the
 * fixed, database-driven sections of a template or tool page with a written
 * page: an H1, an opening answer, question headings, a QS take and an FAQ
 * (which also becomes the page's FAQPage data). Runs before dev and build.
 *
 * File format:
 *   ---
 *   status: "approved"          # or "draft"; drafts only show in local development
 *   h1: "Free Method Statement Template for UK Construction"
 *   intro: "The opening answer, under 60 words."
 *   ---
 *   ## A question heading?
 *   Markdown. A blockquote starting **QS take:** becomes the QS take box.
 *   ## Frequently asked questions
 *   ### A question?
 *   The answer, 40 to 80 words.
 *
 * Sections are <section>/<slug>, e.g. templates/method-statement or
 * ai-tools/claude. Errors stop the build.
 */

import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = resolve(ROOT, 'marketing/page-bodies')
const OUT = resolve(ROOT, 'src/content/page-bodies.generated.json')
const SECTIONS = ['templates', 'ai-tools']
const MAX_INTRO_WORDS = 60

const words = (s) => s.split(/\s+/).filter(Boolean).length

function field(front, name) {
  const m = front.match(new RegExp(`^${name}:\\s*(.*)$`, 'm'))
  if (!m) return null
  const v = m[1].trim()
  return v.startsWith('"') ? JSON.parse(v) : v
}

function parse(section, file) {
  const path = join(SRC, section, file)
  const raw = readFileSync(path, 'utf8').replace(/\r\n/g, '\n')
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!m) throw new Error(`${path}: missing --- frontmatter ---`)
  const [, front, body] = m
  const status = field(front, 'status')
  if (status !== 'draft' && status !== 'approved') throw new Error(`${path}: status must be "draft" or "approved"`)
  const h1 = field(front, 'h1')
  const intro = field(front, 'intro')
  if (!h1) throw new Error(`${path}: add an h1`)
  if (!intro) throw new Error(`${path}: add an intro (the opening answer)`)

  const problems = []
  if (words(intro) > MAX_INTRO_WORDS) problems.push(`intro is ${words(intro)} words; keep the opening answer to ${MAX_INTRO_WORDS} or fewer`)
  if ([h1, intro, body].some((t) => t.includes('—'))) problems.push('contains an em dash; use a comma, colon or full stop instead')
  const faq = body.split(/^## +Frequently asked questions\s*$/m)[1]
  if (faq) {
    const questions = (faq.split(/^## /m)[0].match(/^### /gm) || []).length
    if (questions < 3 || questions > 6) problems.push(`the FAQ has ${questions} questions; keep it to 3 to 6`)
  }
  if (problems.length) throw new Error(`${path}:\n  - ${problems.join('\n  - ')}`)

  return { status, h1, intro, body: body.trim() }
}

const out = {}
for (const section of SECTIONS) {
  const dir = join(SRC, section)
  if (!existsSync(dir)) continue
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.md')).sort()) {
    out[`${section}/${file.replace(/\.md$/, '')}`] = parse(section, file)
  }
}

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n')
const approved = Object.values(out).filter((b) => b.status === 'approved').length
console.log(`page bodies: ${Object.keys(out).length} compiled (${approved} approved) -> src/content/page-bodies.generated.json`)
