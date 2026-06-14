#!/usr/bin/env node
/**
 * update-titles.mjs — rewrite meta_title for striking-distance pages
 * (positions 5-20 with real impressions). Keyword-led, no em dashes.
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

const updates = [
  // tools
  ['tools', 'claude', 'Claude AI for Construction: Use Cases & Prompts'],
  ['tools', 'autodesk-construction-cloud', 'Autodesk Construction Cloud AI: Features (2026)'],
  ['tools', 'perplexity', 'Perplexity AI for Construction: Use Cases'],
  ['tools', 'bluebeam-revu', 'Bluebeam Revu for Construction: AI Features'],
  ['tools', 'procore', 'Procore AI for Construction: Features & Review'],
  // guides
  ['guides', 'ai-for-bim-workflows', 'AI for BIM: Workflows, Tools & Use Cases (2026)'],
  ['guides', 'ai-for-cost-estimation', 'AI for Construction Cost Estimation: Tools & Tips'],
  ['guides', 'ai-for-contract-administration', 'AI for Construction Contract Administration'],
  ['guides', 'ai-for-health-and-safety-documentation', 'AI for Construction Health & Safety Documents'],
  ['guides', 'ai-for-construction-procurement', 'AI for Construction Procurement: Tools & Workflows'],
  // roles
  ['roles', 'quantity-surveyor', 'AI for Quantity Surveyors: Tools, Workflows & Prompts'],
  ['roles', 'planning-engineer', 'AI for Planning Engineers: Tools & Workflows'],
  // tasks
  ['tasks', 'tender-analysis', 'AI Tender Analysis for Construction: Tools & Tips'],
  ['tasks', 'claims-management', 'AI for Construction Claims Management'],
  ['tasks', 'material-takeoff', 'AI Material Takeoff for Construction'],
  ['tasks', 'safety-planning', 'AI for Construction Safety Planning'],
  ['tasks', 'stakeholder-communication', 'AI for Stakeholder Communication in Construction'],
  ['tasks', 'quality-control', 'AI for Construction Quality Control: Tools'],
  // workflows
  ['workflows', 'generate-bill-of-quantities', 'Bill of Quantities Generator: Free AI Tool'],
  ['workflows', 'generate-meeting-minutes', 'Construction Meeting Minutes Generator (Free AI)'],
  ['workflows', 'generate-coshh-risk-assessment', 'COSHH Risk Assessment Generator: Free AI Tool'],
  ['workflows', 'draft-method-statement', 'Method Statement Generator: Free AI Tool'],
  ['workflows', 'create-bid-no-bid-decision-framework', 'Bid/No-Bid Decision Framework: Free AI Template'],
  ['workflows', 'draft-monthly-progress-report', 'Monthly Progress Report Generator (Free AI)'],
  ['workflows', 'draft-delay-analysis-report', 'Delay Analysis Report Generator: Free AI'],
  ['workflows', 'write-toolbox-talk', 'Toolbox Talk Generator: Free AI Tool'],
  ['workflows', 'draft-professional-correspondence', 'Construction Letter Writer: Free AI Tool'],
  ['workflows', 'draft-rfi-response', 'RFI Response Generator: Free AI Tool'],
  ['workflows', 'draft-valuation-payment-application', 'Payment Application Generator: Free AI'],
  ['workflows', 'analyse-subcontractor-quotes', 'Subcontractor Quote Analysis: Free AI Tool'],
  ['workflows', 'create-subcontractor-coordination-schedule', 'Subcontractor Coordination Schedule: Free AI'],
  ['workflows', 'generate-lookahead-schedule-summary', 'Lookahead Schedule Summary: Free AI Tool'],
]

let ok = 0
for (const [table, slug, meta_title] of updates) {
  const { error, count } = await supabase
    .from(table)
    .update({ meta_title }, { count: 'exact' })
    .eq('slug', slug)
  if (error) {
    console.log(`FAIL ${table}/${slug}: ${error.message}`)
  } else if (count === 0) {
    console.log(`SKIP ${table}/${slug}: no row matched`)
  } else {
    ok += 1
    console.log(`OK   ${table}/${slug} -> ${meta_title}`)
  }
}
console.log(`\nUpdated ${ok}/${updates.length} titles.`)
