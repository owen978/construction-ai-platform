---
title: "Explain what moved in this month's valuation"
slug: "explain-what-moved-in-this-months-valuation"
summary: "Paste last month's and this month's valuation and get a line-by-line explanation of what changed and why, ready for your CVR or the valuation meeting."
roles: [quantity-surveyor, commercial-manager]
task: "valuations"
contractForms: []
tool: "claude"
timeByHandMins: 60
timeWithAiMins: 25
difficulty: "intermediate"
riskIfWrong: "medium"
relatedWorkflow: "create-cost-value-reconciliation"
relatedPage: "/guides/ai-for-quantity-surveyors-guide"
sourceKind: "owen"
sourceUrl: ""
sourceLabel: ""
status: "approved"
---

## When to use it
Every month once the valuation is done, before the CVR or the valuation meeting. Someone always asks why the gross went up by less than expected or why an item went backwards, and the answer is usually buried in a few lines of the spreadsheet.

## Prompt
You are an experienced UK quantity surveyor. Below are two versions of the same interim valuation on a [SIZE AND TYPE OF PROJECT]: last month's (valuation [NUMBER]) and this month's (valuation [NUMBER]).

Compare them line by line and give me:
- A table with columns: Item, Last month, This month, Movement, Reason. Use one of these reasons where it fits: progress on site, remeasure, variation added or revalued, materials on site in or out, preliminaries, retention, correction of last month, or "not clear".
- A separate list of any line that has gone down, with what could explain it. These are the ones people ask about.
- Any line that is new this month or has dropped out.
- A check that both valuations add up, and that the movement in the gross total equals the sum of the line movements.
- A short commentary, no more than 150 words, explaining the overall movement in plain English.

Rules: only use the figures I give you. Where the reason for a movement isn't clear from the data or my notes, mark it "not clear" and add it to a list of questions for me to answer. Do not guess at progress on site. Use UK spelling.

Last month's valuation:
[PASTE LAST MONTH]

This month's valuation:
[PASTE THIS MONTH]

What happened on site this month (optional):
[E.G. ROOF FINISHED, TWO VARIATIONS INSTRUCTED, SCAFFOLD STRUCK]

## What it produced
A movement table with a reason against every line, a separate list of the lines that went backwards, the lines that are new or have dropped out, an arithmetic check that ties the line movements back to the gross total, and a short paragraph of commentary. Anything it couldn't explain from the figures came back as a question rather than a guess.

## What you still check
- Each reason against what you know about the job, especially anything put down to progress that is really a remeasure or a correction.
- Every line that went down: make sure you can explain it before anyone else asks.
- Variations are only in where they've been instructed, at a value you can support.
- The commentary says nothing you wouldn't want the client or your director to read.

## Steps
1. Export both valuations with the same item references, in the same order where you can.
2. Add a few notes on what happened on site this month, then run the prompt.
3. Answer the "not clear" questions, then use the commentary in your CVR or at the valuation meeting.
