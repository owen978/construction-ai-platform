---
title: "Summarise the RFI log for a client meeting"
slug: "summarise-the-rfi-log-for-a-client-meeting"
summary: "Turn a long RFI log into a short, client-ready summary of what's open, what's overdue and what's holding up design or site, so the meeting goes on decisions."
roles: [project-manager, design-manager]
task: "rfis"
contractForms: []
tool: "any"
timeByHandMins: 60
timeWithAiMins: 20
difficulty: "beginner"
riskIfWrong: "low"
relatedWorkflow: "draft-rfi-response"
relatedPage: ""
sourceKind: "owen"
sourceUrl: ""
sourceLabel: ""
status: "approved"
---

## When to use it
The day before a client progress meeting or design team meeting, when the RFI log has grown to a few hundred lines and nobody wants to scroll through it on the screen. It pulls out the handful of questions that actually need the client or design team to decide something, and leaves the routine ones in the log where they belong.

## Prompt
You are an assistant to a UK main contractor's project manager. I have a client progress meeting on [MEETING DATE] for a [SIZE AND TYPE OF PROJECT]. Below is our RFI log exported as a table, with columns for RFI number, subject, date raised, raised to, date response due, date answered and status.

Write a one-page summary for the client meeting with these sections:
1. Headline: total RFIs raised, how many are open, and how many are past their response date, counted only from the log I've pasted.
2. Overdue RFIs: a table with RFI number, subject, raised to, days overdue as at [MEETING DATE], and what it is holding up (design, procurement, site work or not stated).
3. Decisions needed from the client: RFIs where the answer depends on the client, written as a plain question they can answer in the room.
4. Themes: any repeated subjects, such as one design package or one interface, that suggest a wider problem worth raising.
5. Closed since last meeting: a short count only, with no detail.

Rules:
- Only use what is in the log. Do not invent dates, owners or impacts.
- Where the log doesn't say what an RFI is holding up, write "not stated" rather than guessing.
- Keep the tone factual and neutral. No blame, and no wording that suggests entitlement to time or money.
- Use plain UK English and keep it to one page.

RFI log:
[PASTE RFI LOG]

Date of last meeting (optional):
[DATE]

## What it produced
A one-page summary that opens with the open and overdue counts, then a short table of overdue RFIs with who they sit with and what they're holding up. Under that, a list of plain questions for the client to answer in the meeting, a few lines on repeating themes, and a single line on how many were closed since the last meeting. Anything the log didn't cover is marked "not stated".

## What you still check
- The counts match the log itself. Filter it by status and check the open and overdue numbers before you put them in front of the client.
- What each overdue RFI is holding up. Only the site and design teams know that properly, so confirm it with them.
- Nothing commercially sensitive, such as a likely delay or cost claim, is in a summary that goes to the client before you've decided how to raise it.
- The "decisions needed" questions are fair and properly worded, and actually belong to the client rather than the design team.

## Steps
1. Export the RFI log to a spreadsheet with the response due and answered dates filled in.
2. Run the prompt, then check the counts and the "holding up" column with the team.
3. Circulate it with the agenda so the client comes ready to answer the decisions list.
