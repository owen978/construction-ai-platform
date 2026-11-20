---
title: "Prepare the client monthly report"
slug: "prepare-the-client-monthly-report"
summary: "Pull programme, cost, risk and site updates into a clear monthly report draft for the client, with gaps flagged so nothing goes out unchecked."
roles: [project-manager, quantity-surveyor]
task: "reporting"
contractForms: []
tool: "claude"
timeByHandMins: 240
timeWithAiMins: 90
difficulty: "intermediate"
riskIfWrong: "medium"
relatedWorkflow: "draft-monthly-progress-report"
relatedPage: ""
sourceKind: "owen"
sourceUrl: ""
sourceLabel: ""
status: "approved"
---

## When to use it
In the last few days of the month, once the valuation, the programme update and the site records are in. The report usually takes a morning to stitch together from four or five sources. This gets the structure and the first draft done so your time goes on the commercial and programme messages, which are the bits the client actually reads.

## Prompt
You are an experienced UK project manager working with the quantity surveyor on a [SIZE AND TYPE OF PROJECT] under a [CONTRACT FORM, e.g. JCT D&B 2024 or NEC4 ECC Option A]. Help me draft this month's report to the client for the period [START DATE] to [END DATE].

Here is what I have:
- Programme update: [PASTE: planned v actual progress, key dates, float, critical path changes]
- Cost and valuation summary: [PASTE: contract sum, valuation to date, agreed and pending variations, forecast final account]
- Risks and early warnings: [PASTE REGISTER OR SUMMARY]
- Health and safety: [PASTE: incidents, inspections, observations]
- Site progress and key events: [PASTE NOTES OR DIARY SUMMARY]
- Design and information: [PASTE: RFIs open, drawings awaited, decisions needed]

Write the report with these sections: 1. Executive summary (five bullet points at most). 2. Programme. 3. Commercial. 4. Risks and early warnings. 5. Health and safety. 6. Design and information. 7. Decisions needed from the client, with dates.

Rules:
- Only use figures and dates I have given you. Do not calculate new totals unless I ask, and do not round.
- If a section has no information, write "No update provided" rather than filling it.
- List anything that looks inconsistent between sources (for example, progress that does not match the valuation) under a heading "Check before issue".
- Plain UK English, factual, no blame and no sales language.

## What it produced
A structured report draft with a short executive summary, one section for each heading, and a clear list of decisions the client needs to make with dates against them. At the end, a "Check before issue" list of mismatches between the programme, the cost figures and the site notes, plus any sections left without an update.

## What you still check
- Every figure matches the signed-off valuation and the cost report, line for line.
- Programme statements match the latest accepted or submitted programme, not a working copy.
- Nothing commercially sensitive, such as internal margin or a claim strategy, has gone into a client-facing document.
- The tone of any delay or risk wording has been agreed with your commercial lead before it goes out.

## Steps
1. Gather the programme update, cost summary, risk register and site notes for the month.
2. Run the prompt, then clear every item on the "Check before issue" list.
3. Have the QS and PM both read it before it goes to the client.
