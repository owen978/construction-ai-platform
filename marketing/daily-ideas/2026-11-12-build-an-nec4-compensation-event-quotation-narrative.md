---
title: "Build an NEC4 compensation event quotation narrative"
slug: "build-an-nec4-compensation-event-quotation-narrative"
summary: "Turn your build-up, programme effect and records into a clear narrative that explains an NEC4 compensation event quotation to the Project Manager."
roles: [quantity-surveyor, contracts-manager]
task: "compensation-events"
contractForms: [nec4-ecc]
tool: "claude"
timeByHandMins: 120
timeWithAiMins: 60
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
When the Project Manager has instructed a quotation for a compensation event and you have the numbers worked out, but need the words that explain them. A quotation that only shows a total invites a low assessment. A clear narrative shows what changed, why it costs what it costs and how it moves the programme. Money and time ride on this, so advice from someone who knows NEC4 is strongly recommended before you submit.

## Prompt
You are an experienced UK quantity surveyor working for a contractor under an NEC4 Engineering and Construction Contract (ECC). Our main Option is [OPTION A/B/C/D/E/F] and these secondary Options and Z clauses apply: [LIST, OR "NOT SURE"].

The Project Manager has instructed a quotation for this compensation event:
- Compensation event reference and description: [REFERENCE AND SHORT DESCRIPTION]
- Date of the instruction to quote and the date it is due: [DATES]
- What we planned to do before the event: [THE ORIGINAL METHOD AND SEQUENCE]
- What we now have to do instead: [THE CHANGED METHOD, EXTRA WORK OR DISRUPTION]
- Our cost build-up, from our own records and estimates: [PASTE THE BUILD-UP: PEOPLE, EQUIPMENT, PLANT AND MATERIALS, SUBCONTRACTORS, FEE]
- Our assessment of the effect on the programme: [EFFECT ON PLANNED COMPLETION, KEY DATES AND THE ACCEPTED PROGRAMME]
- Risk allowances we have included and why: [LIST, OR "NONE"]
- Supporting records: [DIARY ENTRIES, PHOTOS, SUBCONTRACTOR QUOTES, LABOUR RETURNS, WITH REFERENCES]

Write a quotation narrative that:
- Opens with a short summary of the event and what the quotation covers.
- Explains the difference between the planned work and the changed work in plain UK English.
- Walks through each part of the build-up and says where each figure comes from. Use only the figures I have given you. Do not add, change or round any figure.
- Explains the programme effect and how it links to the revised programme we will submit with the quotation.
- Explains each risk allowance and why it is a fair allowance for a matter with a significant chance of happening.
- Lists any assumptions the quotation depends on.
- Only refers to a clause number if you are confident it is correct for NEC4 ECC. Otherwise write [CHECK CLAUSE].
- Stays factual, with no blame and no admissions.

Then, under the narrative, list any figures, records or explanations that are missing or that do not add up, so I can fix them before it goes. Do not invent costs, rates, durations, dates or records.

Add a final line: "Check the contract terms and take advice before relying on this."

## What it produced
A structured narrative ready to sit in front of the build-up: a short summary, a "planned against changed" section, a cost section that follows the build-up line by line and names the record behind each figure, a programme section, a risk allowance section and a list of assumptions. Under it sits a list of gaps, such as a cost line with no supporting record or a programme effect that doesn't match the dates given, and the reminder to check the contract.

## What you still check
- Every figure in the narrative matches the build-up exactly, and the totals still add up.
- The build-up follows the assessment rules for your main Option and any Z clauses, including how the fee and Defined Cost are treated.
- The programme effect matches the revised programme you are submitting, not a rough estimate.
- The quotation goes in through the contract's communication route before the reply period runs out.
- Check the contract terms and take advice before relying on this.

## Steps
1. Finish the cost build-up and programme assessment first, and gather the records behind them.
2. Run the prompt, then fix every gap and mismatch it lists.
3. Get it reviewed, attach the build-up and revised programme, and submit it before the deadline.
