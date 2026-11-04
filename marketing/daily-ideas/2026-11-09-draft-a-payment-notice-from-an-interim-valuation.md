---
title: "Draft a payment notice from an interim valuation"
slug: "draft-a-payment-notice-from-an-interim-valuation"
summary: "Turn a finished interim valuation into a payment notice that states the sum you consider due and how you worked it out, ready to check and issue on time."
roles: [quantity-surveyor, commercial-manager]
task: "payment-notices"
contractForms: [construction-act]
tool: "claude"
timeByHandMins: 60
timeWithAiMins: 25
difficulty: "intermediate"
riskIfWrong: "high"
relatedWorkflow: "draft-valuation-payment-application"
relatedPage: ""
sourceKind: "owen"
sourceUrl: ""
sourceLabel: ""
status: "approved"
---

## When to use it
Once your interim valuation is done and you need to get the payment notice out before the contract deadline. Under the Construction Act a payment notice has to state the sum you consider due and the basis on which it was calculated, and a late or vague notice can cost you the right to pay what you think is fair. This drafts the notice from your own figures. It doesn't decide what's due, and it doesn't replace checking the contract.

## Prompt
You are an experienced UK quantity surveyor drafting a payment notice under the Housing Grants, Construction and Regeneration Act 1996 (the Construction Act), as amended. We are the payer. The contract is a [CONTRACT OR SUBCONTRACT FORM, e.g. JCT DB Sub-Contract 2024] for a [SIZE AND TYPE OF PACKAGE].

Facts:
- Payee: [PAYEE, role only, e.g. "the groundworks subcontractor"]
- Contract reference: [CONTRACT REFERENCE]
- Valuation number and valuation date: [NUMBER AND DATE]
- Due date for this payment: [DUE DATE]
- Final date for payment: [FINAL DATE]

My interim valuation, line by line, with gross value, retention, any agreed deductions and previous payments:
[PASTE YOUR VALUATION]

Draft a payment notice that:
- Identifies the parties, the contract and the payment cycle it relates to.
- States the sum we consider due at the due date, as one clear figure.
- Sets out the basis of calculation as a short table: gross valuation, less retention, less previous payments, less any other agreed deductions, equals the sum due. Use only the figures I have given you.
- Notes, in one or two plain sentences each, the main differences from the payee's application if I list them here: [PASTE KEY DIFFERENCES, or write "none"].
- Leaves placeholders for the date of issue, the name and role of the person issuing it, and the method of service.
- Uses plain UK English and stays factual and neutral.

Rules: do not calculate or invent any figure I haven't given you. If the arithmetic in my valuation doesn't add up, or a figure is missing, flag it in a list headed "Check before issue" instead of filling the gap. Do not quote clause numbers you are not sure of. Add a final line: "Check the contract terms and take advice before relying on this."

## What it produced
A one-page notice: a header with the parties, contract reference and valuation number, a single "sum considered due" figure, and a short basis-of-calculation table running from gross value down to the net sum. Under that, a few neutral lines on the main differences from the application, placeholders for the issue date, signatory and service method, and a "Check before issue" list of any gaps or arithmetic that didn't reconcile. It ends with the reminder to check the contract.

## What you still check
- Every figure in the notice matches your signed-off valuation, and the arithmetic in the basis table adds up.
- The notice goes out within the contract's deadline for payment notices and by the method of service the contract requires.
- Retention, deductions and any contra charges are allowed under the contract, and none of them should really be in a separate pay less notice.
- Whether you also need a pay less notice later in the cycle, and its own deadline.
- Check the contract terms and take advice before relying on this, especially if the sum is disputed.

## Steps
1. Finish and sign off your interim valuation first. The notice is only as good as the figures behind it.
2. Run the prompt with your valuation, the dates and any key differences from the application, then clear the "Check before issue" list.
3. Issue it before the deadline by the contract's method of service, and file a copy with proof of when and how it was sent.
