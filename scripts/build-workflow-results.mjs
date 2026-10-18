#!/usr/bin/env node
/**
 * build-workflow-results.mjs: compile marketing/workflow-results/workflow-results.csv
 * into src/content/workflow-results.generated.json for the "Typical result"
 * block on workflow pages. Runs before `npm run dev` and `npm run build`.
 *
 * Owen edits the CSV in Excel. Columns:
 *   slug, time_by_hand_mins, time_with_ai_mins, what_it_replaces,
 *   what_to_check (points separated by " | "), status (draft or approved)
 * Only approved rows with both times appear on the live site.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = resolve(ROOT, 'marketing/workflow-results/workflow-results.csv')
const OUT = resolve(ROOT, 'src/content/workflow-results.generated.json')

/** Minimal RFC 4180 parser: quoted fields, doubled quotes, commas and newlines inside quotes. */
function parseCsv(text) {
  const rows = []
  let row = [], field = '', inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++ }
      else if (c === '"') inQuotes = false
      else field += c
    } else if (c === '"') inQuotes = true
    else if (c === ',') { row.push(field); field = '' }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      row.push(field); field = ''
      if (row.some((f) => f !== '')) rows.push(row)
      row = []
    } else field += c
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row) }
  return rows
}

let text = ''
try {
  text = readFileSync(SRC, 'utf8').replace(/^﻿/, '') // Excel may add a BOM
} catch {
  // No CSV yet: write an empty map.
}

const [header = [], ...rows] = text ? parseCsv(text) : []
const col = (name) => {
  const i = header.indexOf(name)
  if (i < 0 && rows.length) throw new Error(`workflow-results.csv: missing column "${name}"`)
  return i
}
const idx = {
  slug: col('slug'), hand: col('time_by_hand_mins'), ai: col('time_with_ai_mins'),
  replaces: col('what_it_replaces'), check: col('what_to_check'), status: col('status'),
}

const results = {}
for (const [n, r] of rows.entries()) {
  const slug = r[idx.slug]?.trim()
  if (!slug) continue
  const line = n + 2
  const hand = parseInt(r[idx.hand], 10)
  const ai = parseInt(r[idx.ai], 10)
  const status = (r[idx.status] || 'draft').trim().toLowerCase()
  if (!['draft', 'approved'].includes(status)) throw new Error(`workflow-results.csv line ${line}: status must be draft or approved`)
  if (Number.isNaN(hand) || Number.isNaN(ai)) throw new Error(`workflow-results.csv line ${line}: times must be whole minutes`)
  if (ai >= hand) throw new Error(`workflow-results.csv line ${line}: time with AI should be less than by hand`)
  if (results[slug]) throw new Error(`workflow-results.csv line ${line}: duplicate slug ${slug}`)
  results[slug] = {
    timeByHandMins: hand,
    timeWithAiMins: ai,
    whatItReplaces: r[idx.replaces]?.trim() || null,
    whatToCheck: (r[idx.check] || '').split('|').map((s) => s.trim()).filter(Boolean),
    status,
  }
}

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, JSON.stringify(results, null, 1) + '\n')
const approved = Object.values(results).filter((r) => r.status === 'approved').length
console.log(`workflow results: ${Object.keys(results).length} compiled (${approved} approved) -> src/content/workflow-results.generated.json`)
