---
title: "Turn site diary entries into a delay record"
slug: "turn-site-diary-entries-into-a-delay-record"
summary: "Paste in a run of site diary entries and get a dated delay record showing each event, the work it held up and the evidence behind it, with gaps flagged."
roles: [site-manager, planning-engineer]
task: "delays"
contractForms: []
tool: "claude"
timeByHandMins: 120
timeWithAiMins: 45
difficulty: "intermediate"
riskIfWrong: "high"
relatedWorkflow: "write-weather-delay-impact-assessment"
relatedPage: ""
sourceKind: "owen"
sourceUrl: ""
sourceLabel: ""
status: "approved"
---

## When to use it
When something has held the job up and you need a clean record of what happened, day by day, before anyone writes a notice or a claim. Diaries are usually full of the right facts, but they are scattered across weeks and mixed in with everything else. This pulls the delay events out and lines them up so the planner and the commercial team are working from the same story. A delay record is often the evidence a notice or extension of time submission rests on, so the facts have to be right.

## Prompt
You are an experienced UK site manager working with a planning engineer on a [SIZE AND TYPE OF PROJECT]. The contract is [CONTRACT FORM, e.g. JCT DB 2024 or NEC4 ECC].

Below are site diary entries from [START DATE] to [END DATE]. I want a delay record built only from what these entries say.

Give me:
1. A table with columns: Date, Event (what happened, in one plain sentence), Cause (weather, late information, access, utilities, another trade, client change, labour or plant, other), Activities or areas affected, Hours or days lost (only if the diary states it), Evidence (the diary wording, photo, email or record it refers to), and Notified to (who was told and when, if the diary says).
2. A short list of events that run over several days, grouped together with a start and end date.
3. A "Gaps" list: days with no entry, entries too vague to rely on, and anywhere the cause or the effect isn't recorded.

Rules:
- Use only the facts in the entries. Do not invent dates, hours, causes or names.
- Do not decide who is responsible or whether anything is a relevant event or compensation event.
- Keep the wording neutral and factual. Use UK spelling.

Diary entries:
[PASTE DIARY ENTRIES]

Programme activities affected (optional):
[PASTE ACTIVITY LIST OR PROGRAMME EXTRACT]

## What it produced
A dated table with one row per delay event, each with a plain description, a cause category, the activities it touched, any time lost the diary actually records and a pointer to the evidence. Under it, a grouped list of the events that ran over several days, and a "Gaps" list showing missing days and entries that need firming up before the record is relied on.

## What you still check
- Every row against the original diary page, photos and emails, not just the tool's summary.
- The gaps list: fill missing days from other records while people still remember, and say plainly where you can't.
- Time lost is what was recorded, not an estimate added later. The effect on Completion is the planner's call from the programme.
- Whether any event needs a notice under the contract, and the time limit for it. Check the contract terms and take advice before relying on this.

## Steps
1. Copy the diary entries for the period into one document, in date order.
2. Run the prompt, then check each row against the source and work through the gaps list.
3. Hand the checked record to the planner and commercial team, and keep it updated weekly while the delay runs.
