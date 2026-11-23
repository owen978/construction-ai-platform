---
title: "Work out Construction Act payment dates from a valuation date"
slug: "work-out-construction-act-payment-dates"
metaTitle: "Work out Construction Act payment dates from a valuation"
summary: "Turn a valuation date and your contract's payment terms into a clear list of due dates, notice deadlines and final dates, so no notice goes in late."
roles: [quantity-surveyor, commercial-manager, subcontractor]
task: "payment-timing"
contractForms: [construction-act]
tool: "any"
timeByHandMins: 45
timeWithAiMins: 20
difficulty: "beginner"
riskIfWrong: "high"
relatedWorkflow: ""
relatedPage: ""
sourceKind: "owen"
sourceUrl: ""
sourceLabel: ""
status: "approved"
---

## When to use it
At the start of a contract or subcontract, or whenever a valuation date comes round and you're not sure which deadline falls when. Under the Construction Act the dates hang off each other: the due date, the payment notice, the pay less notice and the final date for payment. Miss one and you can lose the right to pay less, or lose track of when you can chase or suspend. This sets the dates out from your own contract terms so they're in one place. It doesn't decide what your contract says. These dates carry real money, so advice is strongly recommended where the terms are unclear or the sums are large.

## Prompt
You are an experienced UK quantity surveyor helping me set out the payment timetable for a construction contract under the Housing Grants, Construction and Regeneration Act 1996 (the Construction Act), as amended. We are the [PAYER OR PAYEE]. The contract is a [CONTRACT OR SUBCONTRACT FORM, e.g. JCT DB Sub-Contract 2024] for a [SIZE AND TYPE OF PACKAGE].

The payment terms, copied from the contract:
[PASTE THE PAYMENT CLAUSES OR SCHEDULE: valuation or application dates, due date, final date for payment, payment notice period, pay less notice period]

Valuation or application dates I need covered:
[LIST THE DATES, e.g. the next valuation date or the dates for the next six months]

Where the work is: [ENGLAND AND WALES, SCOTLAND OR NORTHERN IRELAND]

For each valuation date, give me a table with these columns:
- Valuation or application date
- Due date
- Last day for the payer's payment notice
- Last day for a payee's notice in default, if the contract allows one
- Last day for a pay less notice
- Final date for payment
- Where each date comes from (the contract wording I gave you, or "not stated")

Rules:
- Work only from the terms I've given you. Show how you counted each date, for example "due date plus 5 days".
- Where a period is in days, say whether you've counted calendar days and list any Christmas Day, Good Friday or bank holidays you've left out of the count.
- If the contract is silent or unclear on any date, don't fill the gap. Put it in a list headed "Check before relying on this" and say what's missing. Don't assume the Scheme for Construction Contracts applies without flagging it.
- Don't quote clause or section numbers you aren't sure of.
- Use plain UK English.

Add a final line: "Check the contract terms and take advice before relying on this."

## What it produced
A table with one row per valuation date, running across from the valuation date to the due date, the notice deadlines and the final date for payment. Each date has a short note showing how it was counted and which contract term it comes from. Underneath sits a list of any bank holidays it left out of the count, and a "Check before relying on this" list for anything the terms didn't cover. It ends with the reminder to check the contract.

## What you still check
- Every date against the contract wording yourself, especially where there are amendments or a payment schedule that overrides the standard clauses.
- Whether the periods are calendar days or working days under your contract, and that the right bank holidays for the region have been left out.
- Anything on the "Check before relying on this" list, including whether the Scheme fills a gap.
- That the dates match the payer's or payee's own calendar, so both sides are working to the same deadlines.
- Check the contract terms and take advice before relying on this.

## Steps
1. Copy the payment clauses and any payment schedule from the signed contract, with amendments.
2. Run the prompt in your company's approved AI tool and check each row against the contract.
3. Put the deadlines in your calendar with a reminder a few days before each notice is due.
