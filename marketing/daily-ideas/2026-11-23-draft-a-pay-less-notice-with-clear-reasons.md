---
title: "Draft a pay less notice with clear reasons"
slug: "draft-a-pay-less-notice-with-clear-reasons"
summary: "Turn your own figures and records into a pay less notice that states the sum you consider due and the reason for each deduction, ready to check."
roles: [quantity-surveyor, commercial-manager]
task: "payment-notices"
contractForms: [construction-act]
tool: "claude"
timeByHandMins: 90
timeWithAiMins: 40
difficulty: "advanced"
riskIfWrong: "high"
relatedWorkflow: ""
relatedPage: ""
sourceKind: "owen"
sourceUrl: ""
sourceLabel: ""
status: "approved"
---

## When to use it
When you intend to pay less than the notified sum and the deadline for a pay less notice is coming up. Under the Construction Act the notice has to state the sum you consider due on the date it is served and the basis on which that sum is calculated. Get it wrong, or get it out late, and you can end up having to pay the full notified sum. This drafts the notice from your own figures and records so each deduction has a clear reason against it. It doesn't decide whether a deduction is allowed. This is a high risk notice, so advice is strongly recommended before you issue it, especially where the sum is large or already in dispute.

## Prompt
You are an experienced UK quantity surveyor drafting a pay less notice under the Housing Grants, Construction and Regeneration Act 1996 (the Construction Act), as amended. We are the payer. The contract is a [CONTRACT OR SUBCONTRACT FORM, e.g. JCT DB Sub-Contract 2024] for a [SIZE AND TYPE OF PACKAGE].

Facts:
- Payee: [PAYEE, role only, e.g. "the dry lining subcontractor"]
- Contract reference: [CONTRACT REFERENCE]
- Payment cycle or application number: [NUMBER]
- Notified sum, and the notice or application it comes from: [SUM AND SOURCE]
- Final date for payment: [FINAL DATE]
- Last date for a pay less notice under the contract: [DEADLINE]

The sum I consider due, and how I get there from the notified sum:
[PASTE YOUR CALCULATION]

Each deduction, with the amount, what it is for and the records that support it (valuation lines, defect notices, contra charge notifications, instructions, photos, emails, with dates):
[PASTE DEDUCTIONS AND RECORDS]

Draft a pay less notice that:
- Identifies the parties, the contract and the payment it relates to.
- States the sum we consider due on the date the notice is served, as one clear figure. If that figure is nil, say so plainly.
- Sets out the basis of calculation as a table: Notified sum, then one row per deduction with Item, Amount, Reason and Supporting record, then the sum considered due.
- Writes each reason in one or two plain, factual sentences that someone outside the project could follow. No blame and no opinion.
- Leaves placeholders for the date of issue, the name and role of the person issuing it, and the method of service.
- Uses plain UK English.

Rules: use only the figures and records I have given you. Do not calculate a new figure, add a deduction or invent a reason. If a deduction has no supporting record, the reason is vague, or the arithmetic doesn't reconcile, put it in a list headed "Check before issue" instead of filling the gap. Do not quote clause numbers you are not sure of. Add a final line: "Check the contract terms and take advice before relying on this."

## What it produced
A short notice: a header with the parties, contract reference and payment cycle, a single "sum considered due" figure, and a basis-of-calculation table that runs from the notified sum down through each deduction to the net sum. Every deduction row has its amount, a plain reason and the record it relies on. Under that sit placeholders for the issue date, signatory and method of service, and a "Check before issue" list of any deduction with a thin reason, a missing record or arithmetic that didn't add up. It ends with the reminder to check the contract.

## What you still check
- Every figure matches your own signed-off calculation, and the table adds up from the notified sum to the sum considered due.
- Each deduction is one the contract actually allows, and any notice the contract needs first (for a contra charge or defect, say) was given.
- The notice goes out before the contract's pay less deadline, by the method of service and to the address the contract requires.
- The reasons are specific enough to stand on their own. "Defective work" with no location, date or record isn't a reason.
- Check the contract terms and take advice before relying on this. With a pay less notice, advice is strongly recommended.

## Steps
1. Work out your own figure first and pull together the record behind each deduction. Check the pay less deadline in the contract before anything else.
2. Run the prompt in your company's approved AI tool, then clear every item on the "Check before issue" list and have the notice reviewed.
3. Issue it before the deadline by the contract's method of service, and file a copy with proof of when and how it was sent.
