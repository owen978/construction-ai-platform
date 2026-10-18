#!/usr/bin/env node
/**
 * indexnow.mjs: tell Bing (and the other IndexNow search engines, which
 * also feed ChatGPT search and Copilot) that pages are new or changed, so
 * they're crawled within hours instead of days. Google doesn't use
 * IndexNow; it finds pages through the sitemap.
 *
 * Usage:
 *   node scripts/indexnow.mjs /guides/some-guide /daily/2026-10-19-some-idea
 *   node scripts/indexnow.mjs --today     today's daily idea, /daily and the homepage
 *   node scripts/indexnow.mjs --dry-run /guides/some-guide
 *
 * Ownership is proved by the key file in public/ (<key>.txt), which must be
 * live on buildcopilot.ai before the first submission.
 */

import { readdirSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const HOST = 'buildcopilot.ai'
const ORIGIN = `https://${HOST}`
const KEY = readdirSync(resolve(ROOT, 'public')).find((f) => /^[a-f0-9]{32}\.txt$/.test(f))?.replace('.txt', '')
if (!KEY) {
  console.error('No IndexNow key file (32 hex characters + .txt) in public/.')
  process.exit(1)
}

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const paths = args.filter((a) => !a.startsWith('--'))

if (args.includes('--today')) {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date())
  const idea = readdirSync(resolve(ROOT, 'marketing/daily-ideas')).find((f) => f.startsWith(`${today}-`) && f.endsWith('.md'))
  if (idea) {
    const status = readFileSync(resolve(ROOT, 'marketing/daily-ideas', idea), 'utf8').match(/^status:\s*"?(\w+)/m)?.[1]
    if (status === 'approved') paths.push(`/daily/${idea.replace(/\.md$/, '')}`)
  }
  paths.push('/daily', '/')
}

const urls = [...new Set(paths.map((p) => (p.startsWith('http') ? p : `${ORIGIN}${p.startsWith('/') ? p : `/${p}`}`)))]
const foreign = urls.filter((u) => new URL(u).host !== HOST)
if (foreign.length) {
  console.error(`Only ${HOST} URLs can be submitted: ${foreign.join(', ')}`)
  process.exit(1)
}
if (urls.length === 0) {
  console.error('Usage: node scripts/indexnow.mjs [--today] [--dry-run] /path ...')
  process.exit(1)
}

const body = { host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList: urls }
console.log(`IndexNow: ${urls.length} URL(s)\n  ${urls.join('\n  ')}`)
if (dryRun) {
  console.log('Dry run: nothing sent.')
  process.exit(0)
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
})
// 200 and 202 both mean accepted; 403 means the key file isn't live yet.
console.log(`IndexNow response: ${res.status} ${res.statusText}`)
if (res.status !== 200 && res.status !== 202) process.exit(1)
