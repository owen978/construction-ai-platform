---
title: "Turn meeting minutes into an action tracker"
slug: "turn-meeting-minutes-into-an-action-tracker"
summary: "Paste in rough minutes from a progress or design team meeting and get back a clean action list with owners, dates and the items still waiting on someone."
roles: [project-manager, site-manager]
task: "meetings"
contractForms: []
tool: "any"
timeByHandMins: 60
timeWithAiMins: 15
difficulty: "beginner"
riskIfWrong: "low"
relatedWorkflow: "generate-meeting-minutes"
sourceKind: "owen"
sourceUrl: ""
sourceLabel: ""
status: "approved"
---

## When to use it
Straight after a progress meeting, design team meeting or subcontractor coordination meeting, while the notes are still fresh and before the actions get lost in an email chain.

## Prompt
You are an assistant to a UK construction project manager. Below are my rough notes from a [TYPE OF MEETING] on [DATE] for a [SIZE AND TYPE OF PROJECT].

Turn them into an action tracker as a table with these columns: Ref, Action, Owner (company and role), Due date, Status (Open, Waiting on someone, Closed), and Notes.

Rules:
- Only include actions that are actually in my notes. Do not invent owners or dates.
- Where an owner or date is missing, write "TBC" and add the item to a short list headed "Need confirming" under the table.
- Carry forward any open actions from the previous tracker I paste below, and mark any that my notes say are now done as Closed.
- Use UK spelling and plain English.

My notes:
[PASTE NOTES]

Previous tracker (optional):
[PASTE PREVIOUS TRACKER]

## What it produced
A numbered action table, one row per action, with owners written as company and role, due dates where the notes gave one, and a status for each. Under it, a short "Need confirming" list of the actions with no owner or date, ready to ask about before the minutes go out.

## What you still check
- Every owner is right, and nobody has been given an action they didn't agree to in the meeting.
- Dates match what was said, not a date the tool guessed.
- Nothing sensitive (commercial positions, disputes, people issues) has ended up in a tracker that goes to the whole team.

## Steps
1. Paste your notes straight after the meeting, plus last meeting's tracker if you have one.
2. Fill the "Need confirming" gaps before you circulate it.
3. Send the tracker with the minutes and use it as the first agenda item next time.
