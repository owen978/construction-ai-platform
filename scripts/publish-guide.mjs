#!/usr/bin/env node
/**
 * publish-guide.mjs — publish (or update) a guide from a Markdown file.
 *
 * Usage:  node scripts/publish-guide.mjs marketing/articles/some-guide.md [--draft]
 *
 * The Markdown file must start with a frontmatter block:
 *   ---
 *   title: "..."
 *   slug: "..."
 *   description: "..."
 *   difficulty: "beginner|intermediate|advanced"
 *   reading_time_minutes: 12
 *   featured: true
 *   sort_order: 1
 *   meta_title: "..."
 *   meta_description: "..."
 *   ---
 *
 * Upserts by slug: updates the existing guide if the slug exists, else inserts.
 * Reads Supabase credentials from .env.local.
 */

import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@supabase/supabase-js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

// ── Load .env.local manually (no dotenv dependency) ──
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

// ── Minimal frontmatter parser ──
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) {
    throw new Error('File is missing a --- frontmatter --- block at the top.')
  }
  const [, fm, body] = match
  const data = {}
  for (const line of fm.split('\n')) {
    const m = line.match(/^([a-z_]+):\s*(.*)$/i)
    if (!m) continue
    let [, key, value] = m
    value = value.trim().replace(/^["']|["']$/g, '')
    if (value === 'true') data[key] = true
    else if (value === 'false') data[key] = false
    else if (/^\d+$/.test(value)) data[key] = parseInt(value, 10)
    else data[key] = value
  }
  return { data, body: body.trim() }
}

async function main() {
  const filePath = process.argv[2]
  const asDraft = process.argv.includes('--draft')
  if (!filePath) {
    console.error('Usage: node scripts/publish-guide.mjs <path-to-md> [--draft]')
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

  if (!data.title || !data.slug) {
    throw new Error('Frontmatter must include at least title and slug.')
  }

  const record = {
    title: data.title,
    slug: data.slug,
    description: data.description ?? null,
    content: body,
    difficulty: data.difficulty ?? 'beginner',
    reading_time_minutes: data.reading_time_minutes ?? null,
    meta_title: data.meta_title ?? null,
    meta_description: data.meta_description ?? null,
    status: asDraft ? 'draft' : 'published',
    featured: data.featured ?? false,
    sort_order: data.sort_order ?? 100,
    updated_at: new Date().toISOString(),
  }

  const supabase = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const { data: existing, error: selErr } = await supabase
    .from('guides')
    .select('id')
    .eq('slug', record.slug)
    .maybeSingle()
  if (selErr) throw selErr

  if (existing) {
    const { error } = await supabase.from('guides').update(record).eq('id', existing.id)
    if (error) throw error
    console.log(`Updated guide "${record.title}" (${record.status})`)
    console.log(`Live at: ${url.includes('supabase') ? '' : ''}/guides/${record.slug}`)
  } else {
    const { error } = await supabase.from('guides').insert(record)
    if (error) throw error
    console.log(`Published new guide "${record.title}" (${record.status})`)
  }
  console.log(`URL path: /guides/${record.slug}`)
}

main().catch((err) => {
  console.error('Publish failed:', err.message)
  process.exit(1)
})
