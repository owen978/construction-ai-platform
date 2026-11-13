---
title: "Draft a subcontract order letter from an agreed quote"
slug: "draft-a-subcontract-order-letter-from-an-agreed-quote"
summary: "Turn an agreed quote and the tender emails behind it into a subcontract order letter that pins down price, scope, programme and terms before work starts."
roles: [quantity-surveyor]
task: "procurement"
contractForms: []
tool: "claude"
timeByHandMins: 90
timeWithAiMins: 40
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
When you've agreed a price with a subcontractor and they're due on site soon. The quote says one thing, the clarification emails say another, and the buried exclusions are still sitting in the small print. If the order letter doesn't settle all of that in one place, it comes back as a dispute at the final account. This pulls the agreed position together, lists every exclusion and qualification so you decide on each one, and drafts the letter. It is a draft for you to check, not a substitute for your company's standard subcontract terms.

## Prompt
You are an experienced UK quantity surveyor working for a main contractor. I need to place a subcontract order for the [TRADE PACKAGE] package on a [SIZE AND TYPE OF PROJECT].

Here are the facts:
- Subcontract form and our standard terms to be incorporated: [e.g. JCT DB Sub-Contract 2024 with our amendments, or "OUR STANDARD TERMS, ATTACHED"]
- The agreed quote, including all its exclusions, qualifications and assumptions: [PASTE QUOTE]
- Tender clarifications, emails and meeting notes after the quote: [PASTE IN DATE ORDER]
- Agreed subcontract sum and how it is made up (lump sum, remeasure, schedule of rates): [DETAILS]
- Drawings, specification and scope documents the order is based on, with revisions: [LIST]
- Programme dates, periods on site and any sectional or key dates: [DATES]
- Payment terms, retention, any discount, and the damages rate for delay: [DETAILS FROM OUR TERMS]
- Insurances, design responsibility and any bonds or warranties required: [DETAILS]
- Attendances and items we are providing: [LIST]

Do three things.

First, make a table of every exclusion, qualification and assumption in the quote, with columns: item, where it came from, whether the clarifications have resolved it, and what the order letter needs to say about it. Do not resolve anything yourself. If the documents don't settle it, mark it "Needs a decision".

Second, list any conflicts between the quote, the clarifications and our terms, such as a different sum, a programme the subcontractor hasn't agreed to, or terms they've tried to attach.

Third, draft the order letter. Include the parties with placeholders, the package and scope, the documents that form the order in order of priority, the sum and basis, programme, payment terms, retention, insurances, design responsibility, attendances, and a clear statement that the subcontractor's own terms and conditions do not apply. Ask the subcontractor to sign and return an acceptance copy before starting on site. Use UK spelling and plain English.

Only use figures, dates and terms from what I've given you. Do not invent anything. Where information is missing, put [TBC] in the letter and add it to a list headed "Still to confirm".

Add a final line: "Check the contract terms and take advice before relying on this."

## What it produced
A table of every exclusion and qualification from the quote, each marked as resolved, still open or needing a decision, with a note on how the letter should deal with it. Then a short list of conflicts between the quote, the emails and your terms. Then a draft order letter with a numbered list of contract documents, the sum and basis, programme, payment and retention, and an acceptance block for the subcontractor to sign. It ends with a "Still to confirm" list and the reminder to check the contract.

## What you still check
- Every exclusion in the quote has been dealt with in the letter, either accepted, priced back in or expressly withdrawn by the subcontractor in writing.
- The sum, retention, payment periods and damages rate match what was agreed and what your main contract allows you to pass down.
- The documents listed are the right revisions, and the order of priority puts your terms above their quote.
- Design responsibility, insurances and any warranties match what the main contract requires of you for this package.
- Check the contract terms and take advice before relying on this.

## Steps
1. Gather the quote, the clarification trail, your standard terms and the agreed figures in one place. Use an AI account your organisation has approved for commercial documents.
2. Run the prompt, then decide every item marked "Needs a decision" before you touch the letter.
3. Get the letter checked, issue it, and don't let the subcontractor start until you have the signed acceptance back.
