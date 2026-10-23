---
title: "List your own tender qualifications and clarifications"
slug: "list-your-tender-qualifications-and-clarifications"
summary: "Turn your estimating notes and the tender documents into a clear list of qualifications, clarifications and assumptions to submit with your price."
roles: [estimator]
task: "tendering"
contractForms: []
tool: "claude"
timeByHandMins: 90
timeWithAiMins: 35
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
In the last few days before a tender goes in, once the price is mostly built and your notes are full of "assumed", "excluded" and "TBC". A tidy, specific list protects the price you've put together and stops arguments later about what was and wasn't included. Leave it to the night before and the important ones get missed.

## Prompt
You are an experienced UK main contractor estimator preparing the qualifications and clarifications to submit with a tender for a [SIZE AND TYPE OF PROJECT, e.g. £4m two-storey steel frame school extension].

The procurement route is [ROUTE, e.g. single stage design and build] and the proposed contract is [CONTRACT FORM, e.g. JCT DB 2024 with amendments].

Below are my estimating notes, the list of tender documents I priced from, and any tender queries and answers so far.

Turn them into a schedule with these columns: Ref, Category (Qualification, Clarification, Assumption, Exclusion, Provisional sum), Item, What we've allowed or assumed, Document or drawing it relates to.

Rules:
- Only use what is in my notes and documents. Do not invent allowances, quantities, rates or dates.
- Write each item specifically enough that a client's QS can't misread it. Avoid vague wording like "subject to survey" without saying what survey and what happens if it differs.
- Flag any note that is too vague to turn into a clear item, and any item that looks like it contradicts the tender documents, under a heading "Needs your decision".
- Group the items by work section or package, and put contract and programme items first.
- Use plain UK English and UK spelling.

My estimating notes:
[PASTE NOTES]

Tender documents priced:
[PASTE DOCUMENT AND DRAWING LIST WITH REVISIONS]

Tender queries and answers:
[PASTE TQ LOG]

## What it produced
A numbered schedule grouped by package, with contract and programme items at the top, each line sorted into qualification, clarification, assumption, exclusion or provisional sum and tied back to the document or drawing it came from. Under it, a short "Needs your decision" list of the notes it couldn't turn into a clear item and any that clashed with the tender documents.

## What you still check
- Every item matches what is actually in your price, so you aren't excluding something you've allowed for, or the other way round.
- Nothing breaches the tender instructions. Some clients treat heavy qualifications as a non-compliant bid.
- Document and drawing revisions match the issue you priced.
- Commercial and contract items, such as amendments, insurances and design responsibility, are reviewed by your commercial lead before submission.

## Steps
1. Gather your estimating notes, the document register and the TQ log in one place.
2. Run the prompt and work through the "Needs your decision" list with the bid team.
3. Cross-check the final list against your price build-up, then submit it in the format the tender asks for.
