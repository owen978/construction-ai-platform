#!/usr/bin/env node
/**
 * publish-template.mjs — publish (or update) a template page from a Markdown file.
 *
 * Usage:  node scripts/publish-template.mjs marketing/templates/some-template.md [--draft]
 *
 * The file has frontmatter for the meta fields, then the body uses
 * "## <section>" headings whose names match the templates table columns:
 *   ## what_is_it / ## key_sections / ## template_content /
 *   ## when_to_use / ## who_uses_it / ## ai_tips
 *
 *   ---
 *   name: "Fire Risk Assessment Template"
 *   slug: "fire-risk-assessment"
 *   description: "..."
 *   icon: "🔥"
 *   primary_keyword: "fire risk assessment template uk"
 *   meta_title: "..."
 *   meta_description: "..."
 *   sort_order: 1
 *   ---
 *   ## what_is_it
 *   ...
 *   ## key_sections
 *   ...
 *
 * Upserts the `templates` table by slug. Reads Supabase creds from .env.local.
 */

import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@supabase/supabase-js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const SECTION_KEYS = [
  'what_is_it',
  'key_sections',
  'template_content',
  'when_to_use',
  'who_uses_it',
  'ai_tips',
]

function loadEnv() {
  const env = {}
  try {
    const raw = readFileSync(resolve(ROOT, '.env.local'), 'utf8')
    for (const line of raw.split('\n')) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
      if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim()
    }
  } catch {
    /* fall back to process.env */
  }
  return { ...env, ...process.env }
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) throw new Error('File is missing a --- frontmatter --- block at the top.')
  const [, fm, body] = match
  const data = {}
  for (const line of fm.split('\n')) {
    const m = line.match(/^([a-z_]+):\s*(.*)$/i)
    if (!m) continue
    let [, key, value] = m
    value = value.trim().replace(/^["']|["']$/g, '')
    if (/^\d+$/.test(value)) data[key] = parseInt(value, 10)
    else data[key] = value
  }
  return { data, body: body.trim() }
}

/** Splits body into sections keyed by "## section_name" headings. */
function parseSections(body) {
  const sections = {}
  const parts = body.split(/^##\s+/m)
  for (const part of parts) {
    const nl = part.indexOf('\n')
    if (nl === -1) continue
    const key = part.slice(0, nl).trim().toLowerCase().replace(/\s+/g, '_')
    const text = part.slice(nl + 1).trim()
    if (SECTION_KEYS.includes(key)) sections[key] = text
  }
  return sections
}

async function main() {
  const filePath = process.argv[2]
  const asDraft = process.argv.includes('--draft')
  if (!filePath) {
    console.error('Usage: node scripts/publish-template.mjs <path-to-md> [--draft]')
    process.exit(1)
  }

  const env = loadEnv()
  const url = env.NEXT_PUBLIC_SUPABASE_URL
  const key = env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
    process.exit(1)
  }

  const raw = readFileSync(resolve(ROOT, filePath), 'utf8')
  const { data, body } = parseFrontmatter(raw)
  const sections = parseSections(body)

  if (!data.name || !data.slug) {
    throw new Error('Frontmatter must include at least name and slug.')
  }

  const record = {
    name: data.name,
    slug: data.slug,
    description: data.description ?? null,
    icon: data.icon ?? '📄',
    primary_keyword: data.primary_keyword ?? null,
    meta_title: data.meta_title ?? null,
    meta_description: data.meta_description ?? null,
    what_is_it: sections.what_is_it ?? null,
    key_sections: sections.key_sections ?? null,
    template_content: sections.template_content ?? null,
    when_to_use: sections.when_to_use ?? null,
    who_uses_it: sections.who_uses_it ?? null,
    ai_tips: sections.ai_tips ?? null,
    status: asDraft ? 'draft' : 'published',
    sort_order: data.sort_order ?? 100,
    updated_at: new Date().toISOString(),
  }

  const supabase = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const { data: existing, error: selErr } = await supabase
    .from('templates')
    .select('id')
    .eq('slug', record.slug)
    .maybeSingle()
  if (selErr) throw selErr

  if (existing) {
    const { error } = await supabase.from('templates').update(record).eq('id', existing.id)
    if (error) throw error
    console.log(`Updated template "${record.name}" (${record.status})`)
  } else {
    const { error } = await supabase.from('templates').insert(record)
    if (error) throw error
    console.log(`Published new template "${record.name}" (${record.status})`)
  }
  console.log(`URL path: /templates/${record.slug}`)
}

main().catch((err) => {
  console.error('Publish failed:', err.message)
  process.exit(1)
})
