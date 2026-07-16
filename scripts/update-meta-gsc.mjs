#!/usr/bin/env node
/**
 * update-meta-gsc.mjs — one-off CTR rewrite of meta_title / meta_description
 * for six pages that rank top-10 in Google Search Console with zero clicks
 * (July 2026 GSC data).
 *
 * Usage:  node scripts/update-meta-gsc.mjs [--dry-run]
 *
 * Updates ONLY meta_title and meta_description. Nothing else is touched.
 * Reads Supabase credentials from .env.local (same as publish-guide.mjs).
 */

import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@supabase/supabase-js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

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

// table → slug → new meta fields
const UPDATES = [
  {
    table: 'tasks',
    slug: 'tender-analysis',
    path: '/ai-for/tender-analysis',
    meta_title: 'Compare Construction Tenders Fast: Free AI Prompts',
    meta_description:
      'Free AI prompts that compare tender returns like for like, flag missing scope and pricing anomalies, and draft an award recommendation you can defend.',
  },
  {
    table: 'workflows',
    slug: 'draft-rfi-response',
    path: '/ai-workflows/draft-rfi-response',
    meta_title: 'Draft an RFI Response in Minutes: Free AI Prompt',
    meta_description:
      'Copy a free AI prompt that drafts a clear construction RFI response: design intent, proposed resolution, impacts and drawing updates, ready to issue.',
  },
  {
    table: 'workflows',
    slug: 'analyse-subcontractor-quotes',
    path: '/ai-workflows/analyse-subcontractor-quotes',
    meta_title: 'Compare Subcontractor Quotes Like for Like: Free AI Prompt',
    meta_description:
      'Free AI prompt that lines up subcontractor quotes side by side, flags exclusions and scope gaps, and gives you a comparison you can take to award.',
  },
  {
    table: 'guides',
    slug: 'ai-for-contract-administration',
    path: '/guides/ai-for-contract-administration',
    meta_title: 'AI for Contract Administration: NEC4 & JCT Guide',
    meta_description:
      'Practical guide to using AI on NEC4 and JCT contracts: notices, variations, EOT claims and correspondence drafted in minutes, not hours.',
  },
  {
    table: 'guides',
    slug: 'construction-cost-plan-guide',
    path: '/guides/construction-cost-plan-guide',
    meta_title: 'Free NRM1 Cost Plan Template + UK Worked Example',
    meta_description:
      'Free NRM1 cost plan template with a UK worked example: the elemental breakdown, each RICS stage explained, and how AI builds a first cost plan in minutes.',
  },
  {
    table: 'workflows',
    slug: 'generate-cashflow-forecast',
    path: '/ai-workflows/generate-cashflow-forecast',
    meta_title: 'Build a Construction Cashflow Forecast: Free AI Prompt',
    meta_description:
      'Free AI prompt that turns your programme and costs into a monthly cashflow forecast with an S-curve, ready for funders and monthly reporting.',
  },
]

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const env = loadEnv()
  const url = env.NEXT_PUBLIC_SUPABASE_URL
  const key = env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
    console.error('Nothing was changed. Planned updates:')
    for (const u of UPDATES) {
      console.log(`\n${u.path} (${u.table})`)
      console.log(`  meta_title       -> ${u.meta_title}`)
      console.log(`  meta_description -> ${u.meta_description}`)
    }
    process.exit(1)
  }

  const supabase = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  let failures = 0
  for (const u of UPDATES) {
    const { data: existing, error: selErr } = await supabase
      .from(u.table)
      .select('id, meta_title, meta_description')
      .eq('slug', u.slug)
      .maybeSingle()

    if (selErr || !existing) {
      console.error(`SKIP ${u.path}: ${selErr ? selErr.message : 'row not found'}`)
      failures++
      continue
    }

    console.log(`\n${u.path} (${u.table}/${u.slug})`)
    console.log(`  title: "${existing.meta_title}"`)
    console.log(`      -> "${u.meta_title}" (${u.meta_title.length} chars)`)
    console.log(`  desc:  "${existing.meta_description}"`)
    console.log(`      -> "${u.meta_description}" (${u.meta_description.length} chars)`)

    if (dryRun) {
      console.log('  [dry-run] not written')
      continue
    }

    const { error: updErr } = await supabase
      .from(u.table)
      .update({ meta_title: u.meta_title, meta_description: u.meta_description })
      .eq('id', existing.id)

    if (updErr) {
      console.error(`  FAILED: ${updErr.message}`)
      failures++
    } else {
      console.log('  updated')
    }
  }

  if (failures > 0) {
    console.error(`\n${failures} update(s) failed.`)
    process.exit(1)
  }
  console.log(dryRun ? '\nDry run complete. Re-run without --dry-run to apply.' : '\nAll six pages updated.')
}

main().catch((err) => {
  console.error('Update failed:', err.message)
  process.exit(1)
})
