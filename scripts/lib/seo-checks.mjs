/**
 * seo-checks.mjs: search checks shared by the publish scripts, so a page
 * that would show badly in Google (title cut off, description cut off or
 * missing, thin, poorly linked) is fixed before it goes live.
 *
 * Errors stop the publish. Warnings are printed but don't. Run a publish
 * script with --check to see the results without publishing, or with
 * --skip-seo-checks to publish anyway (emergencies only).
 */

export const MAX_TITLE = 60 // Google shows about 60 characters of a title
export const DESCRIPTION_RANGE = [120, 160] // and about 160 of a description

const INTERNAL_LINK = /\]\((?:https:\/\/buildcopilot\.ai)?\/(?:guides|ai-workflows|templates|ai-for|ai-tools|daily|services|newsletter)\b[^)]*\)/g

const wordCount = (text) => text.split(/\s+/).filter(Boolean).length

/**
 * @param {object} page
 * @param {'guide'|'template'} page.kind
 * @param {string} page.title        the H1 (guide title or template name)
 * @param {string|null} page.metaTitle
 * @param {string|null} page.description
 * @param {string|null} page.metaDescription
 * @param {string} page.body          the Markdown body
 */
export function checkPage({ kind, title, metaTitle, description, metaDescription, body }) {
  const errors = []
  const warnings = []

  const seoTitle = metaTitle || title
  if (seoTitle.length > MAX_TITLE) {
    errors.push(`${metaTitle ? 'meta_title' : 'title'} is ${seoTitle.length} characters; Google cuts titles off after about ${MAX_TITLE}. Set meta_title to ${MAX_TITLE} characters or fewer (the page heading can stay longer).`)
  } else if (seoTitle.length < 30) {
    warnings.push(`the search title is only ${seoTitle.length} characters; there's room to add the main search term or "UK".`)
  }

  const seoDescription = metaDescription || description
  const [lo, hi] = DESCRIPTION_RANGE
  if (!seoDescription) {
    errors.push('no meta_description or description; Google will make up its own snippet.')
  } else if (seoDescription.length > hi || seoDescription.length < lo) {
    errors.push(`${metaDescription ? 'meta_description' : 'description'} is ${seoDescription.length} characters; keep it between ${lo} and ${hi} so it isn't cut off or too thin.`)
  }

  const allText = [title, metaTitle, description, metaDescription, body].filter(Boolean).join('\n')
  if (allText.includes('—')) errors.push('contains an em dash; use a comma, colon or full stop instead.')

  const words = wordCount(body)
  const links = (body.match(INTERNAL_LINK) || []).length
  if (kind === 'guide') {
    if (words < 1200) errors.push(`only ${words} words; guides need at least 1,200 (aim for 2,000 to 3,000) so the page isn't thin.`)
    else if (words < 2000) warnings.push(`${words} words; the content rules aim for 2,000 to 3,000.`)
    if (links < 3) errors.push(`only ${links} internal links; link at least 3 related BuildCopilot pages (aim for 5 or more).`)
    else if (links < 5) warnings.push(`${links} internal links; aim for 5 or more.`)
    if (!/^## +Frequently asked questions/im.test(body)) warnings.push('no "## Frequently asked questions" section; FAQs answer the follow-up searches and AI overviews pick them up.')
  } else if (links < 2) {
    warnings.push(`${links} internal links; add 2 or 3 to related BuildCopilot pages.`)
  }

  return { errors, warnings, words, links, seoTitle, seoDescription }
}

/** Print the results; returns true when the publish may go ahead. */
export function reportChecks(file, result, { skip = false } = {}) {
  const { errors, warnings, words, links, seoTitle, seoDescription } = result
  console.log(`Search checks for ${file}`)
  console.log(`  title (${seoTitle.length}): ${seoTitle}`)
  console.log(`  description (${seoDescription?.length ?? 0}): ${seoDescription ?? '(none)'}`)
  console.log(`  ${words} words, ${links} internal links`)
  for (const w of warnings) console.log(`  warning: ${w}`)
  for (const e of errors) console.log(`  ERROR: ${e}`)
  if (errors.length && skip) console.log('  --skip-seo-checks given: publishing anyway.')
  if (errors.length && !skip) console.log(`\nNot published: fix the ${errors.length === 1 ? 'error' : 'errors'} above in the Markdown and run this again.`)
  return errors.length === 0 || skip
}
