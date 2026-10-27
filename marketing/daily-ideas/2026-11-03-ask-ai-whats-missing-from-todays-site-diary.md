---
title: "Ask AI what's missing from today's site diary before a delay claim needs it"
slug: "ask-ai-whats-missing-from-todays-site-diary"
metaTitle: "Ask AI what's missing from today's site diary entry"
summary: "Paste in today's diary entry and get a list of the gaps, vague lines and missing facts someone would need months from now if the day ends up in a delay claim."
roles: [site-manager]
task: "daily-reports"
contractForms: []
tool: "claude"
timeByHandMins: 15
timeWithAiMins: 10
difficulty: "beginner"
riskIfWrong: "medium"
relatedWorkflow: "write-daily-site-report"
relatedPage: ""
sourceKind: "owen"
sourceUrl: ""
sourceLabel: ""
status: "approved"
---

## When to use it
At the end of the day, once the diary is written but before you close it off. The diary is often the first record a QS or contracts manager reaches for when a delay is argued over, and by then nobody remembers what "lost time due to weather" actually meant. This prompt doesn't write the diary for you. It reads what you've written and tells you what's thin, so you can fill it while the day is still fresh. Use your company's approved AI account, not a personal one.

## Prompt
You are an experienced UK site manager and commercial reviewer on a [SIZE AND TYPE OF PROJECT, e.g. 60-unit timber frame housing scheme]. Below is my site diary entry for [DATE].

Read it as if you were someone trying to rely on it six months from now to show what happened on this day, and what caused any lost time. Do not rewrite the entry.

Give me:
1. A table with columns: Heading, What's recorded, What's missing or vague, Question to answer. Cover weather (with times and effect on work), labour by trade and numbers, plant, work done by area, deliveries, delays and disruption (start time, end time, cause, who was affected), instructions received (who gave them, how, and when), visitors and inspections, and health and safety.
2. A list of any lines that state an opinion or blame rather than a fact, with a plainer factual way to say the same thing.
3. A list of anything that refers to another document (a photo, a delivery ticket, an email, an instruction) where the reference number or time isn't given.
4. A short list of the three most important gaps to fix today.

Rules:
- Only use what is in my entry. Do not invent facts, times, names or causes to fill a gap.
- If you can't tell whether something is missing or simply didn't happen, ask me.
- Plain UK English. No legal conclusions about entitlement or who is at fault.

Diary entry:
[PASTE TODAY'S DIARY ENTRY]

## What it produced
A table running down each diary heading, showing what's there, what's missing or vague, and a direct question to answer against each one. Under it, a short list of lines that read as opinion with a factual rewording, a list of references to photos, tickets or instructions that need a number or time adding, and the three gaps most worth fixing before you finish for the day.

## What you still check
- Every answer you add comes from your own notes, photos, sign-in sheet and delivery tickets, not memory alone.
- Delay start and end times and causes are accurate, because these are the lines most likely to be tested later.
- Instructions are recorded as given, by the right person, and any verbal instruction is followed up in writing.
- The tool hasn't nudged you into adding detail you can't actually back up. A blank is better than a guess.

## Steps
1. Write today's diary as you normally would.
2. Paste it into the prompt and work through the questions in the table.
3. Add the missing facts and references, then save and close the entry.
