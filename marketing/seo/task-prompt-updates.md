# Proposed updates to the two content tasks

For Owen to approve. Nothing here has been applied: both scheduled tasks still run exactly as approved. These lines line the tasks up with the search checks on the `claude/seo-guards` branch, so they get it right first time instead of fixing errors after the check fails.

Apply only after the branch is merged (the checks don't exist on `main` until then).

## Daily idea writer (`buildcopilot-daily-idea`)

In STEP 4, after the "Frontmatter:" bullet, add:

> - Search fields: `summary` is also the meta description, so it must be 120 to 160 characters. If the title is over 60 characters, add `metaTitle`: a shorter version of 60 characters or fewer that keeps the main search words (the page heading keeps the full title). If the pipeline's relatedPage starts with /guides/, /templates/ or /ai-tools/, set `relatedPage` to it.
> - Substance: approved ideas need a "## When to use it" section, at least 3 checks, at least 3 steps and at least 330 words in total, or the build rejects them.

In STEP 5, change the first paragraph to:

> First: node scripts/build-daily-ideas.mjs
> It must finish with "daily ideas: N compiled". If it fails, it lists every problem in every file at once: fix each one in the file you wrote and run it again.

## Mon/Thu content task (`buildcopilot-weekly-content`)

In the guide branch, before "Then publish: node scripts/publish-guide.mjs ...", add:

> Before publishing, run: node scripts/publish-guide.mjs marketing/articles/<slug>.md --check
> Fix every line marked ERROR (meta_title 60 characters or fewer, meta_description 120 to 160 characters, no em dashes, at least 3 internal links, at least 1,200 words) and run --check again until it passes. Warnings are advisory.

In the template branch, the same with publish-template.mjs:

> Before publishing, run: node scripts/publish-template.mjs marketing/templates/<slug>.md --check and fix every ERROR.

## Gold-standard examples the tasks copy from

The content task copies the frontmatter of two example files, and both currently fail the new checks. Fixing them changes live copy, so they wait for you:

- `marketing/articles/construction-daily-report-guide.md`: meta_description is 162 characters (2 over).
- `marketing/templates/fire-risk-assessment.md`: uses em dashes in the five steps ("Step 1 — Identify the fire hazards").
