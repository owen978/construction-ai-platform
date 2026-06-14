#!/usr/bin/env node
/**
 * dump-titles.mjs — print current slug + meta_title for the striking-distance
 * pages so titles can be reviewed and rewritten. Read-only.
 */
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@supabase/supabase-js'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const env = {}
for (const line of readFileSync(resolve(ROOT, '.env.local'), 'utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim()
}
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const tables = [
  ['tools', 'name'],
  ['roles', 'name'],
  ['tasks', 'name'],
  ['workflows', 'title'],
  ['guides', 'title'],
  ['templates', 'name'],
]

for (const [table, nameCol] of tables) {
  const { data, error } = await supabase.from(table).select(`slug, ${nameCol}, meta_title`)
  if (error) {
    console.log(`# ${table}: ERROR ${error.message}`)
    continue
  }
  console.log(`\n# ${table} (${data.length})`)
  for (const row of data) {
    console.log(`${table}|${row.slug}|${row.meta_title ?? '(none)'}`)
  }
}
