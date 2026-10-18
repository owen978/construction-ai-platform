# Daily ideas: "Construction AI workflow of the day"

One file per day: `YYYY-MM-DD-slug.md`. The date is the Europe/London day it first appears on the homepage and gets its permanent page at `/daily/YYYY-MM-DD-slug`. `npm run dev` and `npm run build` compile these files (scripts/build-daily-ideas.mjs) and refuse to build if one is malformed.

Ideas can be written days ahead: an idea only appears from its date onwards, and the site switches over shortly after midnight without a deploy. If a day has no idea, the homepage rotates in one from the library (it keeps its original date and page).

## Format

```markdown
---
title: "Check a subcontractor's interim application against your valuation"
slug: "check-a-subcontractor-application"
metaTitle: "Check a subcontractor's application against your valuation"
summary: "One or two sentences: what it does and why it matters."
roles: [quantity-surveyor, commercial-manager]
task: "valuations"
contractForms: [jct-db-2024, nec4-ecc]
tool: "claude"
timeByHandMins: 120
timeWithAiMins: 45
difficulty: "intermediate"
riskIfWrong: "high"
relatedWorkflow: "draft-valuation-payment-application"
relatedPage: ""
sourceKind: "owen"
sourceUrl: ""
sourceLabel: ""
status: "approved"
---

## When to use it
Optional short paragraph.

## Prompt
The copyable prompt, with [PLACEHOLDERS] in square brackets.

## What it produced
What the output looks like. Anonymised: sizes and trades, never client, scheme or company names.

## What you still check
- Human checks before anything is sent or relied on.

## Steps
1. Optional short how-to.
```

Field rules:
- `roles`: slugs from /ai-for where one exists (quantity-surveyor, commercial-manager, project-manager, site-manager, contracts-manager, construction-director, health-and-safety-manager, estimator, planning-engineer, design-manager, bim-manager, procurement-manager, document-control) or a new kebab-case slug.
- `tool`: claude, chatgpt, copilot, claude-code, gemini, grok or any.
- `timeByHandMins` / `timeWithAiMins`: cautious typical figures, shown as "~2h → 45m" and labelled typical. Leave both empty to hide the chip.
- `difficulty`: beginner, intermediate or advanced. `riskIfWrong`: low, medium or high (how bad an unchecked error would be).
- `metaTitle`: the title Google shows. Only needed when `title` is over 60 characters; keep it to 60 or fewer. The page heading always uses the full `title`.
- `summary`: also the meta description, so 120 to 160 characters.
- `relatedWorkflow`: the slug of the matching /ai-workflows/ page, if there is one.
- `relatedPage`: optional extra internal link to a /guides/, /templates/ or /ai-tools/ page, e.g. `/guides/construction-daily-report-guide`.
- `sourceKind: "community"` with `sourceUrl` and `sourceLabel` for ideas seen in the wild (credit and link the post; write it in our words).
- `status`: draft or approved. Only approved ideas appear on the live site; drafts show in local development only.

Search checks: approved ideas fail the build unless the search title (metaTitle, or title if there's no metaTitle) is 60 characters or fewer, the summary is 120 to 160 characters, there's a "## When to use it" section, at least 3 checks and 3 steps, at least 330 words in total, and no em dashes. `node scripts/build-daily-ideas.mjs` lists every problem at once.

Writing rules: UK spelling, no em dashes, no invented figures, results or client names; contract notices must carry a "check your contract and get advice" line.
