---
title: "Respond to a programme submitted for acceptance under NEC4"
slug: "respond-to-an-nec4-programme-submitted-for-acceptance"
summary: "Check a submitted programme against what NEC4 asks it to show, then draft a clear reply that accepts it or gives reasons for not accepting it."
roles: [project-manager, planning-engineer]
task: "programme"
contractForms: [nec4-ecc]
tool: "claude"
timeByHandMins: 180
timeWithAiMins: 90
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
When a programme has come in for acceptance and the clock is running. Under NEC4 the Project Manager has a fixed period to accept it or say why not, and only certain reasons count. Miss the period and the contract can treat the programme as accepted. A vague "not accepted, please revise" helps nobody. This gets you a structured review and a reply that names the specific gaps. The accepted programme drives how compensation events are assessed, so advice from someone who knows NEC4 is strongly recommended before you send it.

## Prompt
You are an experienced UK project manager reviewing a programme submitted for acceptance under an NEC4 Engineering and Construction Contract (ECC). Our main Option is [OPTION A/B/C/D/E/F] and these Z clauses affect the programme: [LIST, OR "NONE" OR "NOT SURE"].

Here are the facts:
- Date the programme was received and the date our reply is due: [DATES]
- Is this the first programme or a revised one, and what was the last accepted programme: [DETAILS]
- Contract dates: starting date, access dates, Key Dates, planned and contract Completion: [DATES]
- What the Scope says the programme must show, if anything extra: [PASTE OR "NOTHING EXTRA"]
- The submitted programme, exported as a task list with dates, links, float and resources: [PASTE THE EXPORT]
- The Contractor's narrative or method statement: [PASTE OR "NONE PROVIDED"]
- Compensation events and early warnings that should be reflected: [LIST WITH REFERENCES]
- Anything we already know is unrealistic, from site progress or records: [NOTES]

Do two things.

First, review the programme in a table with columns: item the programme should show, where it appears (or "not shown"), comment, and whether it could be a reason for not accepting. Cover the dates and float the contract requires, the order and timing of the work, the Client's and Others' work, items we must provide, method and resource information, time risk allowances, and how implemented compensation events are shown. Only judge what the export and narrative actually show.

Second, draft a reply to the Contractor that either accepts the programme or gives the reasons for not accepting it. Only use reasons the contract allows (check them against clause 31.3 of the contract), tie each reason to a specific gap from the table, and say what a revised programme needs to show. Keep it factual and neutral, under 350 words, with placeholders for the contract reference, date and sender.

Only give a clause number if you are confident it is correct for NEC4 ECC. Otherwise write [CHECK CLAUSE]. Do not invent dates, durations, activities or progress. If the information is not enough to reach a view, list what is missing instead of guessing.

Add a final line: "Check the contract terms and take advice before relying on this."

## What it produced
A review table that runs through what the programme should show, item by item, marking each as shown, partly shown or missing, with a short comment and a flag where it could support not accepting. Under it sits a draft reply: either a short acceptance or a list of reasons, each tied to a specific gap, with a line on what the revised programme needs. It ends with a list of information it couldn't check and the reminder to check the contract.

## What you still check
- The reply goes out within the period your contract allows, through the communication route it requires, so it can't be treated as accepted by default.
- Every reason for not accepting is one the contract actually allows, and isn't just a preference about how the Contractor should build it.
- The dates in the review match the native programme file, not just the export, and the logic and float look sensible when you open it yourself.
- Implemented compensation events and Client dates are shown correctly, because the accepted programme becomes the baseline for assessing future ones.
- Check the contract terms and take advice before relying on this.

## Steps
1. Export the programme as a task list with dates, links and float, and gather the contract dates, Scope requirements and event registers. Use an AI account your organisation has approved for contract documents.
2. Run the prompt, then open the native file and check every flagged item yourself.
3. Get the reply reviewed, tighten the wording against the contract, and issue it before the deadline.
