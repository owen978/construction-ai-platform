---
title: "Build an exclusions-by-bidder table from tender letters"
slug: "build-an-exclusions-by-bidder-table-from-tender-letters"
summary: "Put every bidder's exclusions and qualifications side by side against your scope, so you can see who has left what out before you compare prices."
roles: [quantity-surveyor]
task: "tendering"
contractForms: []
tool: "claude"
timeByHandMins: 120
timeWithAiMins: 45
difficulty: "intermediate"
riskIfWrong: "medium"
relatedWorkflow: "analyse-tender-returns"
relatedPage: ""
sourceKind: "owen"
sourceUrl: ""
sourceLabel: ""
status: "approved"
---

## When to use it
When three or more subcontract tenders have come back for a package and each covering letter lists its own exclusions, assumptions and qualifications in its own order and wording. Reading them one at a time, it is easy to miss that one bidder has quietly left out something the others have included. This builds one table against your own scope list, so the gaps show up before you level the prices. Use it on a business AI account your company approves for tender documents, as tender returns are commercially confidential.

## Prompt
You are an experienced UK quantity surveyor working for a main contractor. I have received subcontract tenders for the [PACKAGE, e.g. drylining and ceilings] package on a [SIZE AND TYPE OF PROJECT]. I need to compare what each bidder has excluded or qualified before I compare prices.

Below are:
1. My scope list for the package, one item per line, taken from the enquiry documents.
2. The covering letter and any qualifications schedule from each bidder, labelled Bidder A, Bidder B and so on.

Give me:
- A table with one row per scope item and one column per bidder. In each cell write one of: Included, Excluded, Qualified (with a few words on the condition), or Not mentioned. Quote the bidder's wording in brackets where it is excluded or qualified.
- A second table of any exclusion, assumption or qualification a bidder has raised that does not match a line in my scope list, with the original wording and which bidder raised it.
- A list of the general conditions each bidder has attached (for example validity period, programme assumptions, attendances, payment terms, retention, design responsibility), side by side.
- A short list of the items where bidders differ most, as these are the ones to level before comparing prices.
- Draft clarification queries for each bidder, one question per query, neutral in tone, and never mentioning another bidder's name, price or position.

Rules: do not price anything or put a value on an exclusion. Do not recommend a bidder. Treat "Not mentioned" as a question, not as included. If wording is unclear, say so instead of guessing what the bidder meant. Use UK spelling.

My scope list:
[PASTE SCOPE LIST]

Bidder letters:
[PASTE EACH BIDDER'S LETTER, LABELLED]

## What it produced
A grid with your scope items down the side and the bidders across the top, each cell marked Included, Excluded, Qualified or Not mentioned, with the bidder's own words quoted where it matters. Under it, a table of extra qualifications that sit outside your scope list, a side-by-side list of general conditions, a short list of the biggest differences to level, and a set of clarification queries split by bidder.

## What you still check
- Every Excluded and Qualified cell against the bidder's actual letter, as a misread line changes the levelling.
- Every Not mentioned cell, by reading the bidder's priced schedule as well as the letter before you assume anything.
- That your scope list covers the whole enquiry, including attendances, design responsibility and interfaces with the trades either side.
- That no query gives away another bidder's price, name or approach before it is sent.
- Any value you put on an exclusion when levelling comes from your own rates or records, not from the tool.

## Steps
1. Write or export your scope list from the enquiry documents, one item per line.
2. Paste the scope list and each bidder's letter, run the prompt, and check every Excluded, Qualified and Not mentioned cell against the source.
3. Send the clarification queries, update the table with the answers, then level and compare the prices.
