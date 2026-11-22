---
title: "Find scope gaps between subcontract packages"
slug: "find-scope-gaps-between-subcontract-packages"
summary: "Lay the scopes of neighbouring subcontract packages side by side and get a list of items nobody has picked up, the overlaps, and the questions to settle."
roles: [quantity-surveyor, estimator]
task: "packages"
contractForms: []
tool: "claude"
timeByHandMins: 180
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
Before you place subcontract orders, or when you're checking tender returns from two or more trades that meet each other. The gaps usually sit at the interfaces: who supplies the fixings, who makes good, who does the fire stopping, who seals the joint. Finding them before order is far cheaper than finding them on site.

## Prompt
You are an experienced UK quantity surveyor working for a main contractor. I'm checking the scopes of [NUMBER] subcontract packages on a [SIZE AND TYPE OF PROJECT] before we place orders.

For each package below I've pasted the scope of works, the subcontractor's inclusions and exclusions from their tender, and any qualifications. Where I have it, I've also pasted the relevant part of the main contract specification or the trade's NRM2 work sections.

Compare the packages against each other and give me:
- A table of interfaces with columns: Interface (e.g. drylining to M&E, roofing to cladding), Item, Package A says, Package B says, Status (Gap, Overlap, Unclear, Covered).
- A list of gaps: items the specification or drawings need that no package clearly includes. Say where in my documents the requirement comes from.
- A list of overlaps: items two packages both appear to include, so we don't pay twice.
- A list of exclusions and qualifications in one package that push work onto another package or back onto us, such as attendances, scaffolding, waste, setting out, temporary works, testing and making good.
- A short set of clarification questions for each subcontractor, written politely and specifically.

Rules: only use what is in the documents I've pasted. Do not assume a trade includes something because it usually does. If you can't tell from the wording, mark it Unclear and say what you'd need to see. Do not put prices on anything. Use UK spelling.

Package documents:
[PASTE PACKAGE 1: SCOPE, INCLUSIONS, EXCLUSIONS, QUALIFICATIONS]
[PASTE PACKAGE 2: SCOPE, INCLUSIONS, EXCLUSIONS, QUALIFICATIONS]
[PASTE FURTHER PACKAGES]

Specification or work sections (optional):
[PASTE RELEVANT EXTRACTS]

## What it produced
An interface table grouped by the pairs of trades that meet, with each item marked as a gap, overlap, unclear or covered. Under it, separate lists of gaps with where the requirement comes from, overlaps to strip out, exclusions that land back on the main contractor, and a set of clarification questions for each subcontractor ready to send.

## What you still check
- Every gap against the drawings and specification yourself. The tool only sees the extracts you gave it, so a missing drawing means a missing gap.
- Attendances, scaffolding, waste and temporary works against your own preliminaries, so the item isn't sitting in prelims already.
- That the clarifications are answered in writing and the answers go into the subcontract order, not just an email.
- Anything marked Unclear. Treat it as a gap until the subcontractor confirms otherwise.

## Steps
1. Gather the scope, tender inclusions and exclusions for each package that meets another, in one place.
2. Run the prompt, then walk the interface table against the drawings with the estimator or package buyer.
3. Send the clarifications, then write the agreed answers into each subcontract order before it's placed.
