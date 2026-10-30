---
title: "Check a preliminaries build-up for gaps"
slug: "check-a-preliminaries-build-up-for-gaps"
summary: "Paste in your preliminaries build-up and the key job facts and get a list of missing items, odd durations and allowances that don't match the programme."
roles: [quantity-surveyor, estimator]
task: "prelims"
contractForms: []
tool: "claude"
timeByHandMins: 90
timeWithAiMins: 40
difficulty: "intermediate"
riskIfWrong: "medium"
relatedWorkflow: ""
relatedPage: ""
sourceKind: "owen"
sourceUrl: ""
sourceLabel: ""
status: "approved"
---

## When to use it
Before a tender goes out, or before you sign off a prelims budget at the start of a job. Prelims are where money quietly goes missing: a crane hired for twelve weeks on a sixteen week frame, no allowance for winter working, or a site manager priced but no one to cover holidays. This gives you a second pair of eyes on the build-up so you can spend your time on the items that matter.

## Prompt
You are an experienced UK quantity surveyor and estimator reviewing a main contractor's preliminaries build-up, set out broadly in line with NRM 2 Part 1 (preliminaries).

Job facts:
- Project: [SIZE AND TYPE, e.g. three storey timber frame school extension]
- Contract form: [e.g. JCT DB 2024]
- Contract period: [WEEKS], start [MONTH AND YEAR]
- Site constraints: [ACCESS, LIVE OCCUPIED BUILDING, CITY CENTRE, LIMITED STORAGE, etc.]
- Key programme dates: [PASTE MILESTONES, e.g. frame complete, watertight, handover]

My preliminaries build-up (item, quantity, unit, duration, rate, total):
[PASTE BUILD-UP]

Review it and give me:
1. A table of items that look missing for a job like this, with a one-line reason each.
2. A table of items where the duration does not line up with the programme dates I gave you (for example, scaffold, hoists, cranes, welfare, site staff).
3. A list of items that look duplicated or priced twice elsewhere.
4. Any assumptions I should state as a tender qualification.
5. An arithmetic check of the totals.

Rules: only use the rates and quantities I have given you. Do not suggest your own rates or prices. Where you can't judge something from the information given, say so and list the question I need to answer. Use UK spelling.

## What it produced
Three short tables: likely missing items with a reason against each, duration mismatches set against the programme dates, and possible duplicates. Under them, a list of assumptions worth stating as qualifications, a note of any arithmetic errors, and a short list of open questions where the information wasn't enough to judge.

## What you still check
- Every "missing" item against the employer's requirements, the contract and what is already priced in the trade packages.
- Durations against your actual programme, not just the milestones you pasted.
- Site staffing and supervision levels against how your business really runs a job of this size.
- Any qualifications it suggests read properly and won't put the client off before they go into the tender.

## Steps
1. Export your prelims build-up and pull out the key programme dates.
2. Run the prompt, then work through each table and decide what to add, change or leave.
3. Update the build-up, add the agreed qualifications and record why you made each change.
