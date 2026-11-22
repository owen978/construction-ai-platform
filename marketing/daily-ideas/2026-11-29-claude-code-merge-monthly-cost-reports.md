---
title: "Claude Code: merge monthly cost reports into one clean table"
slug: "claude-code-merge-monthly-cost-reports"
summary: "Point Claude Code at a folder of monthly cost reports and get one combined table, plus a log of every line it couldn't match, so trends are easy to see."
roles: [commercial-manager, quantity-surveyor]
task: "agents"
contractForms: []
tool: "claude-code"
timeByHandMins:
timeWithAiMins:
difficulty: "advanced"
riskIfWrong: "medium"
relatedWorkflow: ""
relatedPage: ""
sourceKind: "owen"
sourceUrl: ""
sourceLabel: ""
status: "approved"
---

## When to use it
When you have a year of monthly cost reports sitting in a folder as separate spreadsheets, and someone asks how a cost code has moved over the job. Each month the layout drifts a little: a column gets renamed, a code gets split, a new tab appears. Claude Code works on the files on your own machine, writes a small script to read them all, and runs it, so you end up with one table and a script you can run again next month. Use it through a Claude account your company has approved for commercial data, and work on copies of the reports, not the originals.

## Prompt
You are helping a UK commercial manager on a [SIZE AND TYPE OF PROJECT]. In this folder there is a subfolder called "cost-reports" holding [NUMBER] monthly cost reports as [EXCEL / CSV] files, one per month, named like [EXAMPLE FILE NAME].

Write and run a script that merges them into one clean table. Before you write any code, open three of the files and tell me the column layout you found in each, and any differences between them. Wait for me to confirm the column mapping before you carry on.

The combined table should have these columns: Month, Cost code, Description, Budget, Committed, Cost to date, Forecast final cost, Variance to budget, Source file.

Rules:
- Only use figures that are in the files. Never fill a gap with an estimate or a calculated guess.
- Where a column is missing or a cost code can't be matched to the codes in [COST CODE LIST FILE], leave the cell blank and add the row to a separate "exceptions" sheet with the reason.
- Do not change, move or delete the original files. Write the output to a new file called [OUTPUT FILE NAME].
- Check that each month's total in your table matches the total in that month's report, and list any month that doesn't match.
- Keep the script in the folder with short comments in plain English so I can run it again next month.
- Use UK spelling and £ for amounts.

At the end, give me a short summary: how many files you read, how many rows went into the table, how many went to exceptions, and which month totals didn't reconcile.

## What it produced
First, a short description of the column layouts it found and where they differed, then a pause for you to confirm the mapping. After that, a combined spreadsheet with one row per cost code per month, an exceptions sheet listing every row it couldn't place and why, a reconciliation of each month's total against the original report, and a commented script saved in the folder ready for next month.

## What you still check
- The column mapping before you let it run. If "Cost to date" means something different in older reports, the whole table is wrong.
- Every month's reconciliation line. Any month that doesn't match the original report needs looking at by hand.
- The exceptions sheet. Split or renamed cost codes are usually where the real story is, so don't just delete them.
- A handful of rows picked at random against the source file, especially the forecast final cost.
- That you used a company-approved account and only pointed it at copies of the reports.

## Steps
1. Copy the monthly reports and your cost code list into a new folder and open Claude Code there.
2. Run the prompt, check the column mapping it reports, and confirm or correct it.
3. Check the reconciliation and exceptions, then keep the script and rerun it when the next report lands.
