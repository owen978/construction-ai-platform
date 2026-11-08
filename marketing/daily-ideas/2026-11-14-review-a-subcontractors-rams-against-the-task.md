---
title: "Review a subcontractor's RAMS against the task"
slug: "review-a-subcontractors-rams-against-the-task"
summary: "Check a subcontractor's RAMS against the real task and site so you get a clear list of missing hazards, vague controls and comments to send back."
roles: [health-and-safety-manager, site-manager]
task: "rams-review"
contractForms: []
tool: "claude"
timeByHandMins: 60
timeWithAiMins: 25
difficulty: "intermediate"
riskIfWrong: "high"
relatedWorkflow: ""
relatedPage: "/templates/rams"
sourceKind: "owen"
sourceUrl: ""
sourceLabel: ""
status: "approved"
---

## When to use it
When a subcontractor sends RAMS for a task before they start, and especially when the document looks like it was written for a different job. Generic RAMS are common: the right trade, the wrong site. This prompt reads the RAMS against what is actually happening on your site, so your review time goes on the gaps that matter. The competent person reviewing the RAMS owns the decision to accept or reject it. AI only lines up the document against the task and drafts the comments.

## Prompt
You are an experienced UK construction health and safety adviser working for a principal contractor under CDM 2015. I need a first pass review of a subcontractor's RAMS before our competent person reviews it.

The task, as it will actually happen on our site:
- Activity: [ACTIVITY, e.g. installing first floor steel beams]
- Location and access: [WHERE ON SITE, HOW THEY GET THERE]
- Plant and equipment: [PLANT, ACCESS EQUIPMENT, TOOLS]
- Other trades working nearby: [TRADES AND WHERE]
- Site conditions: [e.g. live roads, overhead services, occupied building, weather exposure]
- Permits we run on this site: [e.g. hot works, permit to dig, permit to load]
- Our site rules that apply: [PASTE KEY RULES]

The subcontractor's RAMS:
[PASTE RAMS]

Review the RAMS against the task and give me:
1. A table with columns: Ref, RAMS section, Issue, Why it matters on this site, Suggested comment to the subcontractor. Group issues under: missing hazards, vague or unenforceable controls, sequence gaps, permits not referenced, plant and competence evidence missing, emergency and rescue arrangements, and anything that does not match our site.
2. A list of anything in the RAMS that looks copied from another job, such as a different site name, wrong plant or a trade not on our site.
3. A short list of questions to ask the supervisor at the RAMS briefing.

Rules: only judge the RAMS against the information I have given you. If something is needed to review a point properly and I have not given it, list it under "Information needed". Do not quote regulation numbers unless you are certain. Do not say the RAMS is acceptable or approved; that decision belongs to our competent person. Use UK spelling.

## What it produced
A grouped issues table, one row per point, with the RAMS section it relates to, why it matters on this site and a comment worded ready to send back. Under it, a short list of signs the document was copied from another job, a set of briefing questions for the supervisor, and an "Information needed" list for anything it could not review.

## What you still check
- Every flagged issue against the RAMS itself and the actual site, not just the tool's summary of it.
- Hazards the tool could not know about because they were not in your task description.
- Competence cards, plant certificates and lifting plans are actually supplied, not just mentioned.
- The competent person reviews and signs the outcome. The AI review is a first pass, not an approval.

## Steps
1. Write a short, honest description of the task as it will happen on your site, then paste it with the RAMS.
2. Run the prompt and check each row against the document before you send any comments.
3. Return the comments, get a revised RAMS, and brief it to the gang before work starts.
