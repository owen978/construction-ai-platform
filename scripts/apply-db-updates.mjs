#!/usr/bin/env node
/**
 * apply-db-updates.mjs: apply reviewed field updates to published rows.
 *
 * Usage: node scripts/apply-db-updates.mjs <file.json> [--apply]
 * The JSON maps "<table>/<slug>" to the fields to set, e.g.
 *   { "templates/method-statement": { "meta_title": "..." } }
 * Without --apply it prints what would change. Titles over 60 and
 * descriptions outside 120 to 155 characters, and em dashes, are refused.
 * Content fields move the page's content_updated_at (the "Last updated"
 * date); meta_title and meta_description don't.
 */
import { readFileSync } from 'node:fs'

const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8').split('\n').filter((l) => l.includes('=')).map((l) => {
    const i = l.indexOf('=')
    return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, '')]
  })
)
const key = env.SUPABASE_SERVICE_ROLE_KEY
const headers = { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'return=representation' }
const [file] = process.argv.slice(2).filter((a) => !a.startsWith('--'))
const apply = process.argv.includes('--apply')
const updates = JSON.parse(readFileSync(file, 'utf8'))

for (const [target, fields] of Object.entries(updates)) {
  const [table, slug] = target.split('/')
  const problems = []
  if (fields.meta_title && fields.meta_title.length > 60) problems.push(`meta_title is ${fields.meta_title.length} characters`)
  if (fields.meta_description && (fields.meta_description.length > 155 || fields.meta_description.length < 120)) problems.push(`meta_description is ${fields.meta_description.length} characters`)
  if (Object.values(fields).some((v) => typeof v === 'string' && v.includes('—'))) problems.push('contains an em dash')
  if (problems.length) { console.log(`REFUSED ${target}: ${problems.join('; ')}`); continue }

  const url = `${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/${table}?slug=eq.${slug}`
  const before = (await (await fetch(`${url}&select=${Object.keys(fields).join(',')},content_updated_at`, { headers })).json())[0]
  if (!before) { console.log(`MISSING ${target}`); continue }
  const changed = Object.keys(fields).filter((k) => before[k] !== fields[k])
  if (!apply) { console.log(`would set ${target}: ${changed.join(', ') || 'nothing (already set)'}`); continue }
  if (!changed.length) { console.log(`unchanged ${target}`); continue }
  const res = await fetch(url, { method: 'PATCH', headers, body: JSON.stringify(Object.fromEntries(changed.map((k) => [k, fields[k]]))) })
  const after = (await res.json())[0]
  console.log(`${res.status} ${target}: ${changed.join(', ')}${after.content_updated_at !== before.content_updated_at ? ' (content date moved)' : ''}`)
}
