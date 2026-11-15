---
title: "Turn your weekly updates from four places into one"
slug: "turn-your-weekly-updates-from-four-places-into-one"
summary: "Set up a Claude Project that merges your weekly updates from email, the cost report, the programme and site notes into one checked summary."
roles: [commercial-manager]
task: "agents"
contractForms: []
tool: "claude"
timeByHandMins: 90
timeWithAiMins: 30
difficulty: "advanced"
riskIfWrong: "low"
relatedWorkflow: ""
relatedPage: ""
sourceKind: "owen"
sourceUrl: ""
sourceLabel: ""
status: "approved"
---

## When to use it
When the same week gets reported four times: an email from site, a line in the cost report, a programme update and the notes from the progress meeting. Each one is right on its own, but nobody sees them side by side, so the differences only come out later. A Claude Project keeps one set of instructions saved, so every week you add that week's four updates and get one summary in the same layout. Claude only sees what you give it and sends nothing. Use a business account your company has approved for project information, not a personal one.

## Prompt
Save this as the instructions for a Claude Project, then start a new chat in it each week.

You are helping a UK construction commercial manager produce one weekly update for a [SIZE AND TYPE OF PROJECT]. Each week I will give you up to four sources for the week ending [DATE]:
1. The site update (email or weekly report from the site manager).
2. The commercial update (cost report extract, valuation status, variations and payment position).
3. The programme update (progress against the current programme and any key dates at risk).
4. Meeting notes and actions (progress meeting, design team or subcontractor meetings).

Write one weekly update of no more than 400 words with these sections:
- Headline: two lines on where the job stands this week.
- Progress: what was done, and what slipped.
- Commercial: what moved, using only the figures in the commercial update.
- Programme: dates at risk and why.
- Actions: owner and due date for each, taken from the sources.
- Conflicts: a table of every place where two sources disagree, with columns Topic, Source A says, Source B says, Who to ask.
- Missing: anything a section needed that none of the sources gave you.

Rules: use only what is in the four sources. Do not estimate, round, forecast or fill gaps. Do not decide which source is right when they disagree; list it under Conflicts. Say which source each figure and date came from. If I only give you some of the four, say which are missing at the top. Do not name clients, subcontractors or people unless they are named in the sources. Plain UK English, short sentences, no exclamation marks.

This week's sources:
[PASTE SITE UPDATE]
[PASTE COMMERCIAL UPDATE]
[PASTE PROGRAMME UPDATE]
[PASTE MEETING NOTES AND ACTIONS]

## What it produced
A one-page weekly update in the same layout every week: a two-line headline, short progress, commercial and programme sections with the source noted against each figure and date, and an action list with owners and due dates. Under it, a conflicts table showing where the sources disagree and who to ask, and a short list of what was missing.

## What you still check
- Every figure and date against the source it came from. The summary is only as good as the four updates you gave it.
- Each item in the conflicts table. Ring the person who knows and correct the source, not just the summary.
- The actions and owners match what was agreed, and nobody has been given something they did not take on.
- Who the update goes to. Commercial positions and anything in dispute should not reach the wider team by accident.

## Steps
1. Create a Claude Project in your company's approved account and save the prompt as its instructions.
2. Each week, add that week's four updates to a new chat in the Project and run it.
3. Clear the conflicts and missing lists with the people who own them, edit the wording, then send it yourself.
