# Daily ideas: "Construction AI workflow of the day"

One file per day: `YYYY-MM-DD-slug.md`. The date is the Europe/London day it first appears on the homepage and gets its permanent page at `/daily/YYYY-MM-DD-slug`. `npm run dev` and `npm run build` compile these files (scripts/build-daily-ideas.mjs) and refuse to build if one is malformed.

Ideas can be written days ahead: an idea only appears from its date onwards, and the site switches over shortly after midnight without a deploy. If a day has no idea, the homepage rotates in one from the library (it keeps its original date and page).

## Format

```markdown
---
title: "Check a subcontractor's interim application against your valuation"
slug: "check-a-subcontractor-application"
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
- `sourceKind: "community"` with `sourceUrl` and `sourceLabel` for ideas seen in the wild (credit and link the post; write it in our words).
- `status`: draft or approved. Only approved ideas appear on the live site; drafts show in local development only.

Writing rules: UK spelling, no em dashes, no invented figures, results or client names; contract notices must carry a "check your contract and get advice" line.
