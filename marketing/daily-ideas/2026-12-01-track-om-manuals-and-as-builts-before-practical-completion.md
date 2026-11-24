---
title: "Track O&M manuals and as-builts before practical completion"
slug: "track-om-manuals-and-as-builts-before-practical-completion"
summary: "Turn your handover document list and subcontractor replies into one tracker showing what's in, what's missing and who to chase before practical completion."
roles: [project-manager, quantity-surveyor]
task: "handover"
contractForms: []
tool: "any"
timeByHandMins: 120
timeWithAiMins: 40
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
Start six to eight weeks before practical completion, then rerun it every week. O&M manuals, as-built drawings, test certificates and warranties are the things that hold up handover and final accounts, and they are usually chased from memory and scattered emails. This gives you one list to work from.

## Prompt
You are an assistant to a UK main contractor's project manager preparing for practical completion on a [SIZE AND TYPE OF PROJECT, e.g. three-storey school extension].

Below are three things:
1. The handover document list from the contract, employer's requirements or our handover plan.
2. Our subcontract packages, with the trade and the person we deal with.
3. What we have received so far, from my document register or email notes.

Build a handover tracker as a table with these columns: Ref, Document (e.g. O&M manual, as-built drawings, test and commissioning certificates, warranties, Building Regulations completion documents, health and safety file information), Package, Responsible subcontractor, Status (Received, Received but needs review, Not received), Date received, Comments, Next action.

Then give me:
- A short "Chase this week" list, grouped by subcontractor, written as polite one-line requests I can send.
- A list of documents on the handover list that don't match any package, so I can decide who owns them.
- A list of anything I've marked received that looks incomplete from my notes (for example, an O&M manual with no test certificates).

Rules:
- Only use the documents, packages and dates I give you. Do not invent subcontractors, dates or document names.
- Where something is unclear, write "TBC" and list it under "Need confirming".
- Use UK spelling and plain English.

Handover document list:
[PASTE LIST]

Subcontract packages and contacts:
[PASTE PACKAGES]

Received so far:
[PASTE REGISTER OR NOTES]

## What it produced
A single tracker table with one row per document per package, each with a status and a next action. Underneath, a "Chase this week" list grouped by subcontractor, a list of orphan documents with no obvious owner, and a short list of items marked received that look thin from the notes.

## What you still check
- The handover list is the full contractual list, including anything the employer's requirements or the principal designer ask for under CDM 2015 for the health and safety file.
- "Received" really means reviewed: open the O&M manual and as-builts and check they match what was built, not just that a file arrived.
- Ownership of orphan documents is agreed with the package managers before you chase anyone.
- Any retention release or final account linked to handover documents in the subcontract terms is handled by the QS, not assumed from the tracker.

## Steps
1. Gather the handover list, your package list and whatever register or emails show what has come in.
2. Run the prompt, fix the "Need confirming" items and send the chase list.
3. Rerun it every week with the updated register until everything shows as received and reviewed.
