/**
 * Canonical site origin used for absolute URLs (metadata, sitemap, robots,
 * RSS feed and JSON-LD).
 *
 * Trimmed because a trailing newline in the Vercel env var once broke every
 * absolute URL on the site; trailing slashes are stripped so `${SITE_URL}/path`
 * never produces a double slash.
 */
export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL ?? '').trim().replace(/\/+$/, '') ||
  'https://buildcopilot.ai'
