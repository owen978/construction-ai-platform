---
title: "Triage the 30 RAMS you get each month"
slug: "triage-the-30-rams-you-get-each-month"
summary: "Sort a month's batch of subcontractor RAMS into review order, so the high risk and poorly written ones reach your competent person first."
roles: [health-and-safety-manager]
task: "rams-review"
contractForms: []
tool: "claude"
timeByHandMins: 180
timeWithAiMins: 75
difficulty: "intermediate"
riskIfWrong: "high"
relatedWorkflow: ""
relatedPage: ""
sourceKind: "owen"
sourceUrl: ""
sourceLabel: ""
status: "approved"
---

## When to use it
When RAMS arrive in a pile and you can't give every one the same attention on day one. A busy job can easily send you a few dozen in a month, and they tend to get reviewed in the order they landed, not the order that matters. This prompt sorts the batch so the high risk activities, the early start dates and the weakest documents come to the top. It is a queue, not a review. Every RAMS still gets a proper review by your competent person, who owns the decision to accept or reject it. AI only organises the pile. Use your company's business AI account, not a personal one.

## Prompt
You are an experienced UK construction health and safety adviser working for a principal contractor under CDM 2015. I have a batch of subcontractor RAMS to review this month and I need help deciding the order to review them in. You are not reviewing or approving any of them.

About the site:
- Project: [SIZE AND TYPE OF PROJECT]
- Current stage of the works: [e.g. frame, envelope, fit-out]
- Site conditions that raise the risk: [e.g. live roads, occupied building, overhead services, deep excavations]
- Permits we run: [e.g. hot works, permit to dig, permit to lift]

For each RAMS below I have given the subcontractor's trade, the activity, the planned start date and the document itself.

Give me:
1. A triage table, one row per RAMS, with columns: Ref, Trade, Activity, Planned start, High risk activities involved (for example work at height, lifting, excavation, confined spaces, hot works, demolition, temporary works, work near live services), Document quality flags, Priority (1 review first, 2 review this week, 3 review before start), Reason for the priority.
2. Under document quality flags, note only what you can see: no site name or the wrong site name, no named supervisor, no sequence of work, controls that are generic, no emergency or rescue arrangements, missing sections, or an old revision date.
3. A list of any RAMS where the planned start is so close that the review needs to happen now.
4. A list headed "Could not assess" for any document that was unreadable, incomplete or missing a start date.

Rules: base every flag on the document or the facts I have given you. Do not guess at missing start dates or activities. Do not mark any RAMS as acceptable, approved or low risk. Priority 3 means review later, not review lightly. Use UK spelling.

The RAMS:
[FOR EACH ONE: TRADE, ACTIVITY, PLANNED START DATE, THEN PASTE OR ATTACH THE RAMS]

## What it produced
A single triage table with one row per RAMS, showing the high risk activities in each, the quality flags it could see in the document, a priority from 1 to 3 and a one-line reason. Under it, a short list of reviews that can't wait because of the start date, and a "Could not assess" list for documents it could not read or that had gaps in the information.

## What you still check
- The priority order against what you know about the site. The tool only knows what you told it and what is in the documents.
- Start dates against the current programme, not the date written on the RAMS.
- Anything marked priority 3. A tidy document can still describe unsafe work, so it still gets a full review.
- That every RAMS in the batch appears in the table and none were dropped or merged.
- The competent person reviews each RAMS and decides whether to accept it. The triage only sets the order.

## Steps
1. List each RAMS with its trade, activity and planned start date, then add the documents.
2. Run the prompt and check the table against your programme and your own knowledge of the site.
3. Review in priority order, and record each review and its outcome in your RAMS register.
