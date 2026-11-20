---
title: "Keep the early warning register up to date"
slug: "keep-the-early-warning-register-up-to-date"
summary: "Feed in this week's notices, meeting notes and the current register, and get an updated NEC4 early warning register with actions, owners and gaps flagged."
roles: [project-manager, contracts-manager]
task: "early-warnings"
contractForms: [nec4-ecc]
tool: "any"
timeByHandMins: 60
timeWithAiMins: 20
difficulty: "beginner"
riskIfWrong: "medium"
relatedWorkflow: ""
relatedPage: ""
sourceKind: "owen"
sourceUrl: ""
sourceLabel: ""
status: "approved"
---

## When to use it
Once a week, or straight after an early warning meeting. Under NEC4 the Project Manager keeps the Early Warning Register, but the contractor's team needs its own up-to-date view of every matter, the actions agreed and who owns them. Registers drift when notices sit in email and meeting decisions never make it back in. This keeps it current in a few minutes.

## Prompt
You are an experienced UK contracts manager on an NEC4 Engineering and Construction Contract for a [SIZE AND TYPE OF PROJECT]. Help me bring our copy of the early warning register up to date.

Current register:
[PASTE REGISTER: ref, matter, date notified, notified by, could affect (Prices, Completion, Key Date, performance), actions, owner, status]

New information since the last update:
- Early warnings notified this week: [PASTE NOTICES]
- Notes from the latest early warning meeting: [PASTE NOTES]
- Other updates (site, design, supply chain): [PASTE]

Return:
1. The updated register as a table with the same columns, adding new matters with the next reference number.
2. For each matter, the actions agreed and the owner, using only what is in my notes. Write "TBC" where an owner or date is missing.
3. A list of matters that look ready to close, with the reason from my notes.
4. A list of matters that may also need a compensation event notification, labelled "Consider CE notice", without deciding whether one is due.
5. A short "Gaps" list: matters with no action, no owner or no update for a while.

Rules: do not invent dates, owners or effects. Do not quote clause numbers you are not sure of. Use plain UK English. Add a final line: "Check the contract terms and take advice before relying on this."

## What it produced
An updated register table with new matters added in sequence, actions and owners filled from the notes, and a status for each line. Under it, short lists of matters ready to close, matters to consider for a compensation event notice and gaps that need chasing, then the reminder to check the contract.

## What you still check
- Your copy agrees with the Project Manager's register, and any differences are raised with them.
- Every new matter was actually notified through the communication method the contract requires.
- Any "Consider CE notice" item is reviewed against the contract time limits straight away. Check the contract terms and take advice before relying on this.
- Matters are only closed when the meeting notes or the Project Manager say so.

## Steps
1. Paste the current register, this week's notices and the latest meeting notes.
2. Run the prompt and work through the Gaps and "Consider CE notice" lists first.
3. Save the updated register and share any differences with the Project Manager before the next meeting.
