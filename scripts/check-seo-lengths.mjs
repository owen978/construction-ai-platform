/**
 * check-seo-lengths.mjs: reads every URL in the live sitemap and lists any
 * page whose search title is over 60 characters or whose meta description is
 * over 155 (or missing). New content is already checked at publish time
 * (scripts/lib/seo-checks.mjs, build-daily-ideas.mjs); this catches anything
 * edited directly in the database or the admin.
 *
 * Usage: npm run check:seo [-- https://buildcopilot.ai]
 * Exits 1 if anything is out of range.
 */
const SITE = (process.argv[2] || 'https://buildcopilot.ai').replace(/\/$/, '')
const MAX_TITLE = 60
const MAX_DESCRIPTION = 155

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')

const sitemap = await (await fetch(`${SITE}/sitemap.xml`)).text()
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
const problems = []
const queue = [...urls]

async function worker() {
  while (queue.length) {
    const url = queue.shift()
    const html = await (await fetch(url)).text()
    const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '')
    const description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '')
    const path = url.replace(SITE, '') || '/'
    if (title.length > MAX_TITLE) problems.push(`${path}: title is ${title.length} characters`)
    if (!description) problems.push(`${path}: no meta description`)
    else if (description.length > MAX_DESCRIPTION) problems.push(`${path}: meta description is ${description.length} characters`)
  }
}
await Promise.all(Array.from({ length: 8 }, worker))

console.log(`${urls.length} pages checked against ${SITE}`)
if (problems.length) {
  console.log(problems.sort().join('\n'))
  process.exit(1)
}
console.log(`All titles are ${MAX_TITLE} characters or fewer and all descriptions ${MAX_DESCRIPTION} or fewer.`)
