#!/usr/bin/env node
/**
 * fix-scheduling-taxonomy.mjs — resolve the overlap between
 * /ai-for/project-scheduling and /ai-for/programme-narrative-writing.
 *
 * Usage:  node scripts/fix-scheduling-taxonomy.mjs [--dry-run] [--revert]
 *
 * BACKGROUND
 * Both task pages carried near-identical descriptions ("programme narratives"
 * + "critical path"), and the child workflows did not match either page's
 * intent. Run 4 scoped the body copy apart:
 *   project-scheduling          = building/maintaining the programme
 *                                 (logic, sequencing, float, critical path,
 *                                 short-term lookaheads)
 *   programme-narrative-writing = writing the prose about the programme
 *                                 (baseline narrative, monthly commentary,
 *                                 recovery narrative)
 * This script makes the taxonomy and the descriptions match that scoping.
 *
 * CHANGES
 * 1. Re-parent generate-lookahead-schedule-summary from
 *    programme-narrative-writing -> project-scheduling. A lookahead is a
 *    short-term programme, not prose about a programme.
 * 2. Rewrite both task `description` fields so they no longer overlap
 *    (and so neither opens with "Leverage", per the voice guide).
 * 3. Add a short lookahead passage to project-scheduling.long_description so
 *    the page covers the workflow it now owns.
 *
 * DELIBERATELY NOT CHANGED
 * - write-programme-narrative and create-recovery-programme-narrative stay
 *   under programme-narrative-writing. Both are narratives.
 * - create-project-execution-plan-summary stays under project-scheduling.
 *   A PEP is a planning document; there is no better home in the current
 *   task list, and moving it somewhere less apt to tidy up would be worse
 *   than leaving it. Flagged for Owen instead.
 *
 * --revert restores the previous task_id and descriptions exactly.
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

const TASK_SCHEDULING = 'project-scheduling'
const TASK_NARRATIVE = 'programme-narrative-writing'

// ── 1. workflow re-parenting ────────────────────────────────────────

const REPARENT = [
  {
    slug: 'generate-lookahead-schedule-summary',
    fromTaskSlug: TASK_NARRATIVE,
    toTaskSlug: TASK_SCHEDULING,
    why: 'A 3-4 week lookahead is a short-term programme, not a narrative about one.',
  },
]

// ── 2. task descriptions ────────────────────────────────────────────

const OLD_DESCRIPTIONS = {
  [TASK_SCHEDULING]:
    'Leverage AI to draft programme narratives, identify critical path risks, and optimise construction sequencing.',
  [TASK_NARRATIVE]:
    'Leverage AI to write programme narratives, explain critical path logic, and document scheduling assumptions.',
}

const NEW_DESCRIPTIONS = {
  [TASK_SCHEDULING]:
    'Build and maintain the programme itself: activity logic, sequencing, float and critical path, plus the short-term lookaheads the site team works to.',
  [TASK_NARRATIVE]:
    'Write the prose that explains the programme: baseline narratives, monthly commentary, and recovery narratives that hold up when a job goes wrong.',
}

// ── 3. lookahead passage appended to project-scheduling body ────────

const LOOKAHEAD_ANCHOR = `Interrogating durations. Ask it to list every activity where the duration looks optimistic for the quantity involved. It will be wrong sometimes and it will still surface two you had not questioned.`

const LOOKAHEAD_ADDITION = `

Producing the lookahead. Pulling a three or four week window out of the programme and turning it into something a site team will actually read, with the activities, the resources needed and the things likely to block them. The programme holds the data; the lookahead is a communication job, and that is language work rather than calculation. It is one of the few scheduling outputs AI can genuinely draft, because the hard part has already been done by the software.`

function words(s) {
  return String(s ?? '').trim().split(/\s+/).filter(Boolean).length
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const revert = process.argv.includes('--revert')
  const env = loadEnv()
  const url = env.NEXT_PUBLIC_SUPABASE_URL
  const key = env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
    process.exit(1)
  }

  const supabase = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  // resolve task ids
  const { data: taskRows, error: taskErr } = await supabase
    .from('tasks')
    .select('id, slug, description, long_description')
    .in('slug', [TASK_SCHEDULING, TASK_NARRATIVE])
  if (taskErr) throw taskErr
  const taskBySlug = Object.fromEntries(taskRows.map((t) => [t.slug, t]))

  for (const s of [TASK_SCHEDULING, TASK_NARRATIVE]) {
    if (!taskBySlug[s]) {
      console.error(`Task not found: ${s}. Nothing changed.`)
      process.exit(1)
    }
  }

  console.log(revert ? '=== REVERT ===' : '=== APPLY ===')
  let failures = 0

  // ── 1. re-parent ──
  console.log('\n1. WORKFLOW RE-PARENTING')
  for (const r of REPARENT) {
    const targetSlug = revert ? r.fromTaskSlug : r.toTaskSlug
    const expectSlug = revert ? r.toTaskSlug : r.fromTaskSlug
    const { data: w, error: wErr } = await supabase
      .from('workflows')
      .select('id, title, task_id')
      .eq('slug', r.slug)
      .maybeSingle()

    if (wErr || !w) {
      console.error(`  SKIP ${r.slug}: ${wErr ? wErr.message : 'not found'}`)
      failures++
      continue
    }

    const currentSlug = taskRows.find((t) => t.id === w.task_id)?.slug ?? '(other)'
    console.log(`  ${w.title}`)
    console.log(`    ${currentSlug} -> ${targetSlug}`)
    console.log(`    why: ${r.why}`)

    if (currentSlug !== expectSlug) {
      console.log(`    NOTE: expected it to currently sit under "${expectSlug}" but found "${currentSlug}".`)
      if (currentSlug === targetSlug) {
        console.log('    Already in the target state, nothing to do.')
        continue
      }
    }

    if (dryRun) {
      console.log('    [dry-run] not written')
      continue
    }
    const { error } = await supabase
      .from('workflows')
      .update({ task_id: taskBySlug[targetSlug].id, updated_at: new Date().toISOString() })
      .eq('id', w.id)
    if (error) {
      console.error(`    FAILED: ${error.message}`)
      failures++
    } else {
      console.log('    moved')
    }
  }

  // ── 2. descriptions ──
  console.log('\n2. TASK DESCRIPTIONS')
  const descSet = revert ? OLD_DESCRIPTIONS : NEW_DESCRIPTIONS
  for (const slug of [TASK_SCHEDULING, TASK_NARRATIVE]) {
    const t = taskBySlug[slug]
    console.log(`  /ai-for/${slug}`)
    console.log(`    old: "${t.description}"`)
    console.log(`    new: "${descSet[slug]}"`)
    if (dryRun) {
      console.log('    [dry-run] not written')
      continue
    }
    const { error } = await supabase
      .from('tasks')
      .update({ description: descSet[slug], updated_at: new Date().toISOString() })
      .eq('id', t.id)
    if (error) {
      console.error(`    FAILED: ${error.message}`)
      failures++
    } else {
      console.log('    updated')
    }
  }

  // ── 3. lookahead passage ──
  console.log('\n3. LOOKAHEAD PASSAGE (project-scheduling body)')
  const sched = taskBySlug[TASK_SCHEDULING]
  const body = sched.long_description ?? ''
  const hasAddition = body.includes(LOOKAHEAD_ADDITION.trim())

  if (!body.includes(LOOKAHEAD_ANCHOR)) {
    console.error('    SKIP: anchor paragraph not found in long_description. Body may have changed.')
    failures++
  } else if (revert) {
    if (!hasAddition) {
      console.log('    Passage not present, nothing to remove.')
    } else {
      const restored = body.replace(LOOKAHEAD_ADDITION, '')
      console.log(`    removing passage: ${words(body)} -> ${words(restored)} words`)
      if (dryRun) {
        console.log('    [dry-run] not written')
      } else {
        const { error } = await supabase
          .from('tasks')
          .update({ long_description: restored, updated_at: new Date().toISOString() })
          .eq('id', sched.id)
        if (error) {
          console.error(`    FAILED: ${error.message}`)
          failures++
        } else {
          console.log('    removed')
        }
      }
    }
  } else if (hasAddition) {
    console.log('    Passage already present, nothing to do.')
  } else {
    const updated = body.replace(LOOKAHEAD_ANCHOR, LOOKAHEAD_ANCHOR + LOOKAHEAD_ADDITION)
    console.log(`    adding passage: ${words(body)} -> ${words(updated)} words`)
    if (dryRun) {
      console.log('    [dry-run] not written')
    } else {
      const { error } = await supabase
        .from('tasks')
        .update({ long_description: updated, updated_at: new Date().toISOString() })
        .eq('id', sched.id)
      if (error) {
        console.error(`    FAILED: ${error.message}`)
        failures++
      } else {
        console.log('    added')
      }
    }
  }

  // ── report resulting shape ──
  if (!dryRun) {
    console.log('\n=== RESULTING TASK SHAPE ===')
    for (const slug of [TASK_SCHEDULING, TASK_NARRATIVE]) {
      const t = taskBySlug[slug]
      const { data: ws } = await supabase
        .from('workflows')
        .select('title, slug')
        .eq('task_id', t.id)
        .eq('status', 'published')
      console.log(`\n/ai-for/${slug}: ${ws?.length ?? 0} workflows`)
      for (const w of ws ?? []) console.log(`   - ${w.title}`)
    }
  }

  if (failures > 0) {
    console.error(`\n${failures} operation(s) failed.`)
    process.exit(1)
  }
  console.log(dryRun ? '\nDry run complete. Re-run without --dry-run to apply.' : '\nDone.')
}

main().catch((err) => {
  console.error('Failed:', err.message)
  process.exit(1)
})
