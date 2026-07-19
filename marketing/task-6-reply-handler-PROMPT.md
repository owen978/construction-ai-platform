# Task 6 — Reply Handler + Weekly Scoreboard (create on the mini)
## Two schedules from one task file: reply sweep EVERY WEEKDAY 08:00 and 14:00 (create as "reply-handler", cron: 0 8,14 * * 1-5), scoreboard included in the Monday 08:00 run.

## PART A — Reply sweep (every run)
1. Via the Gmail connector, check the connected inbox for NEW replies since the last run related to outreach: match senders/threads against the companies in "AAA - AI & SMS/Worklists/" files and "Client Acquisition/QS-Openers-Batch1.md" (adjust paths to this machine). Also check for forwarded replies (Owen forwards LinkedIn/Zap-mail replies into this inbox with FWD — treat the original sender inside as the prospect).
2. Classify each: INTERESTED (answered the question, positive/curious) / QUESTION (asked something back) / NOT-NOW (polite deferral) / NO (clear decline) / UNSUBSCRIBE-TONE (remove and suppress).
3. For every reply EXCEPT clear NO: draft Owen's response following the consultative rules in "AAA - AI & SMS/07 - Hiring-Intent Outreach Kit.md" §6.0 (reflect their answer, one natural follow-up; only introduce what we do after they've engaged once; booking link only when they've shown interest) and the voice guide at marketing/owen-voice-guide.md in this repo (short paragraphs, no em dashes, no jargon, sound like Owen). Create each as a Gmail DRAFT in the thread — NEVER send. Owen reviews and sends.
4. Update the relevant worklist/openers file: mark the prospect's status (REPLIED-INTERESTED etc.) and stop-cadence flag so the VA stops touching them.
5. If any reply is INTERESTED: make it unmissable in the run summary (first line, bold). Speed matters most on these.

## PART B — Monday scoreboard (Mondays only, after the sweep)
Compile from: the worklist status fields, this task's own classification log (keep marketing/reply-log.md in the repo: date, company, cycle/source, classification), and any VA EOD emails found in the inbox that week.
Output a short scoreboard in the run summary AND append to marketing/scoreboard.md:
- Sends this week (per source: AAA verticals / AAA sales-roles / QS batch) if derivable, else "unknown - VA EOD missing"
- Replies + reply rate per source and per cycle (A-F)
- INTERESTED count and names
- The decision rules, stated with numbers: CDR messaging rule (under 4% replies after 100 sends = revisit messaging; over 6% = scale); AAA gates from "AAA - AI & SMS/12 - ICP Test Plan": 2+ booked audits by ~7 Aug, 1+ paying client by 26 Sep
- One honest sentence: what the numbers say to do next.

RULES: never send anything (drafts only), never contact prospects, mark data honestly ("unknown" beats guessed), keep the reply-log append-only. Email the Monday scoreboard to owen@subcontractorhub.co.uk via the Gmail connector with subject "Outreach scoreboard - week of <date>".
