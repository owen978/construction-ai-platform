---
title: "Check a subcontractor's interim application against your valuation"
slug: "check-a-subcontractor-application"
metaTitle: "Check a subcontractor's application against your valuation"
summary: "Line up a subcontractor's application against your own measure and get a clear list of differences, the reasons for each, and the queries to send back."
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
Every month when interim applications land, especially on packages with lots of line items, variations or materials on site. It does the lining up and the arithmetic so your time goes on the judgement calls.

## Prompt
You are an experienced UK quantity surveyor working for a main contractor. I'm valuing a subcontractor's interim application under a [SUBCONTRACT FORM, e.g. JCT DB Sub-Contract 2024].

Below are two lists:
1. The subcontractor's application, line by line, with their quantities and amounts.
2. My valuation of the same items from my own measure and records.

Compare them and give me:
- A table with columns: Item, Their amount, My amount, Difference, Likely reason (quantity, rate, scope, variation not yet agreed, materials on site, retention, or other).
- A separate list of any items they have applied for that are not in my valuation, and any in my valuation they have left out.
- A list of queries I should send back, written politely and specifically.
- Totals for both, and check the arithmetic in their application.

Rules: do not decide who is right. Flag anything you can't reconcile from what I've given you. Use UK spelling.

Their application:
[PASTE APPLICATION]

My valuation:
[PASTE YOUR VALUATION]

## What it produced
A side-by-side table of every line with the difference and a likely reason against each, a short list of items that appear on one side only, an arithmetic check of the application, and a set of specific queries ready to send to the subcontractor.

## What you still check
- Quantities against your own measure and site records, not just the tool's reading of the two lists.
- Variations: only value what has actually been instructed, and check how the subcontract treats unagreed ones.
- Retention, discounts and materials on site against the subcontract terms.
- Your payment and pay less notice dates under the subcontract and the Construction Act. Check the subcontract and take advice if you're unsure.

## Steps
1. Export or copy both lists in the same order where you can.
2. Run the prompt, then work through the "likely reason" column line by line.
3. Send the queries, then issue your payment notice on time.
