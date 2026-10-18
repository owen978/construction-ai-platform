---
title: "Tidy a messy spreadsheet before you analyse it"
slug: "tidy-a-messy-spreadsheet-before-you-analyse-it"
summary: "Use Claude Code to turn a messy commercial spreadsheet into a clean table you can sort, filter and analyse, without touching the original and with a log of every change."
roles: [quantity-surveyor, commercial-manager]
task: "spreadsheets"
contractForms: []
tool: "claude-code"
timeByHandMins: 90
timeWithAiMins: 30
difficulty: "intermediate"
riskIfWrong: "medium"
relatedWorkflow: ""
sourceKind: "owen"
sourceUrl: ""
sourceLabel: ""
status: "approved"
---

## When to use it
When a cost report export, supplier ledger or subcontractor's schedule arrives with merged cells, subtotals mixed into the data, numbers stored as text and dates in three formats. Pasting it into a chat works for a short schedule. For a full workbook, Claude Code can work on the file itself and give you a clean copy you can check line by line.

## Prompt
In this folder there is a spreadsheet called [FILE NAME]. It is a [WHAT IT IS, e.g. cost ledger export from our accounts system]. I want a clean copy I can analyse.

Please:
1. Look at the file first and tell me what you find: sheets, header rows, merged cells, subtotal and total rows, blank rows, numbers stored as text, mixed date formats, and anything else that would stop it sorting or filtering properly. Don't change anything yet.
2. Once I say go, create a new file called [FILE NAME]-clean.xlsx with one flat table: one header row, one row per record, no merged cells, no subtotals, numbers as numbers and dates as dates in DD/MM/YYYY.
3. Keep every original value. Don't delete, round or recalculate any figure. Where you can't tell what a value should be, leave it as it is and flag it.
4. Add a sheet called "Changes" listing every change you made, by original sheet and row.
5. Check that the totals of the key money columns in the clean file match the original's figures, excluding the subtotal rows you removed, and show me the comparison.
6. Save the steps as a script so I can run the same clean-up on next month's export.

Never edit or overwrite the original file.

## What it produced
First, a short report of everything wrong with the file before anything was changed. Then, after the go-ahead, a clean copy with one flat table, a "Changes" sheet listing every edit row by row, a totals comparison showing the money columns still agree with the original, and a reusable script for next month's export.

## What you still check
- The totals comparison agrees, and any difference is explained before you use the clean file.
- A sample of rows against the original, especially any line on the "Changes" sheet that was flagged rather than fixed.
- Subtotal rows were removed, not real records that just looked like subtotals.
- Commercial data only goes into an AI account your company has approved for it.

## Steps
1. Put a copy of the spreadsheet in its own folder and open Claude Code there.
2. Run the prompt, read its report on the file, then say go.
3. Check the totals comparison and the "Changes" sheet before you start any analysis.
