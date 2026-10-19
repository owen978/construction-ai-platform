---
title: "ChatGPT Prompts for Project Managers: 22 Copy-Paste Prompts for UK Construction PMs"
slug: "chatgpt-prompts-for-project-managers"
description: "The best ChatGPT prompts for construction project managers give the AI a PM role, the real project facts, the contract and programme context, and an instruction to flag gaps rather than guess. This guide gives you 22 copy-paste prompts for risk registers, programmes, progress reports, meetings, change control and stakeholder updates, with a UK worked example."
difficulty: "beginner"
reading_time_minutes: 12
featured: false
sort_order: 27
meta_title: "22 ChatGPT Prompts for Construction Project Managers (UK)"
meta_description: "22 copy-paste ChatGPT prompts for UK construction project managers: risk registers, look-ahead programmes, monthly reports, meeting minutes, early warnings, change control and client updates."
---

**ChatGPT prompts for project managers** are structured instructions that get ChatGPT, Claude or Copilot to do the writing-heavy parts of construction project management: building a risk register, summarising a programme, drafting a monthly progress report, turning meeting notes into minutes or preparing an early warning notice. The prompts that work give the AI five things: a PM role, the real project facts, the contract and programme context, a fixed output format, and an instruction to flag anything missing rather than invent it. The project manager still owns every decision. The AI removes the hours of drafting, chasing and reformatting.

This guide gives you 22 copy-paste prompts grouped by the stage of the job, a worked UK example of a monthly report built from raw notes, and the rules that keep AI output safe to send to a client, a design team or a subcontractor. For the wider picture of where AI fits in the role, start with our [AI for construction project management guide](/guides/ai-for-construction-project-management) or the [project manager hub](/ai-for/project-manager).

## Why generic prompts fail construction project managers

Ask ChatGPT to "write a risk register for a school extension" and you will get twenty tidy rows of generic risks ("adverse weather", "supply chain delays") with made-up scores and no owners. It looks finished, which is the problem. Nobody on your project recognises it, and it would not survive a client review.

Construction project management has three features that make lazy prompts risky:

- **Everything is contractual.** A late notice under NEC4 can cost the contractor its entitlement. A loose phrase in a JCT letter can read as an instruction. The AI must know which contract form applies and must never invent clause numbers.
- **The programme is the spine.** Progress, risk, cost and resources all hang off dates and logic. If you do not give the AI the real dates, it will make them up.
- **Many audiences, one set of facts.** The same issue has to be written differently for the client, the design team, the site team and the board. AI is excellent at this, but only if the facts are fixed first.

So every prompt below supplies the facts, names the contract or standard, fixes the format and includes a guardrail.

## The construction PM prompt formula

| Part | What it does | Example wording |
|------|--------------|-----------------|
| **Role** | Sets PM expertise and UK context | "You are an experienced construction project manager working for a UK main contractor." |
| **Facts** | Gives the real project data | "Project: 3-storey primary school extension, NEC4 ECC Option A, completion 21 August 2027." |
| **Context** | Names the contract, stage or standard | "We are at RIBA Stage 5. CDM 2015 applies; we are principal contractor." |
| **Format** | Fixes the output shape | "Return a table: risk, cause, effect, owner, likelihood 1-5, impact 1-5, action." |
| **Guardrails** | Stops invention | "Use only the facts I give. Write [CONFIRM] where anything is missing. Do not invent dates or clause numbers." |

The guardrail is the line most people leave out, and it is the one that matters most. "Use only what I give you" and "write [CONFIRM] where data is missing" turn AI from a confident guesser into a useful assistant.

## Project set-up and planning prompts

### 1. Project brief summary

> You are a UK construction project manager. Summarise the attached employer's requirements and tender documents into a one-page project brief: scope, key dates, contract form and option, budget, key stakeholders, known constraints, and open questions. Use only what is in the documents. List anything unclear under "Questions for the client". Documents: [paste]

### 2. Stakeholder map

> From the project details below, build a stakeholder register as a table: stakeholder, organisation, role on the project, interest (high or low), influence (high or low), what they need from us, and how often we update them. Include statutory bodies (building control, local authority, utilities) where relevant. Details: [paste]

### 3. Project execution plan outline

> Draft the section headings and a short paragraph under each for a construction project execution plan for this job. Cover: scope, organisation and responsibilities, programme, procurement, design management, cost control, risk, health and safety under CDM 2015, quality, communication, and handover. Mark anything I have not given you as [CONFIRM]. Project facts: [paste]

### 4. Responsibility matrix

> Turn this list of project activities and team members into a RACI matrix (Responsible, Accountable, Consulted, Informed). One activity per row. Flag any activity with no Accountable person or more than one. Data: [paste]

## Risk and issue management prompts

Risk is where AI saves the most time for project managers, because a good register needs structure, consistent wording and a cause-event-effect format that most registers lack.

### 5. Project risk register from scratch

> You are a UK construction project manager. Using the project details below, draft a risk register. Write each risk in cause, event, effect format. Return a table: ID, risk description, category (design, ground, programme, commercial, H&S, stakeholder, supply chain), owner, likelihood 1-5, impact 1-5, score, mitigation, residual score. Only include risks that are plausible for this specific project. Leave owner as [CONFIRM] if I have not told you who. Project details: [paste]

Our [project risk register workflow](/ai-workflows/generate-project-risk-register) has a fuller version of this prompt, and the [free risk register template](/templates/risk-register) gives you the layout to paste into. For the method behind good scoring, see our guide on [how to build a construction risk register](/guides/how-to-build-a-construction-risk-register).

### 6. Risk register health check

> Review this risk register as a senior project manager would before a client risk workshop. Flag: risks written as vague statements rather than cause, event, effect; risks with no owner; scores that do not match the description; mitigations that are not actions; closed or stale risks still showing as live; and obvious risks missing for this type of project. Do not change anything. Return a numbered list of comments. Register: [paste]

### 7. Risk workshop agenda and prompts

> Prepare a 90-minute risk workshop agenda for this project with the client, design team and our commercial lead. Include a short list of questions to draw out risks under each category. Project stage and facts: [paste]

### 8. Issue log entry

> Turn these notes about a problem on site into a clear issue log entry: issue, date raised, raised by, impact on programme, cost and quality, owner, action, target date. Keep it factual and neutral, no blame. Notes: [paste]

## Programme and progress prompts

### 9. Look-ahead programme summary

> Here is an extract of the project programme (activities, start, finish, percentage complete, float). Write a 3-week look-ahead summary for the site team: what must start, what must finish, critical path activities, and any activity with less than 5 days float. Use only the dates given. Programme extract: [paste]

Our [look-ahead schedule summary workflow](/ai-workflows/generate-lookahead-schedule-summary) shows the full method.

### 10. Programme narrative

> Write a programme narrative to accompany this revised programme. Explain the key sequence, the critical path, changes since the last accepted programme, and the reasons for those changes. If this is NEC4, structure it so it can support a submission under clause 32. Do not invent dates or reasons. Data: [paste]

### 11. Delay explanation in plain English

> Explain this programme slip to a client who is not a construction professional. Keep it under 200 words. Say what happened, why, what it means for completion, and what we are doing about it. Facts: [paste]

### 12. Monthly progress report

> You are a UK construction project manager. Turn the raw notes below into a monthly progress report with these sections: executive summary, progress against programme, key achievements this month, look-ahead to next month, health and safety (incidents, RIDDOR reportables, near misses, toolbox talks), design status, commercial summary, risks and issues, and client decisions required. Keep the executive summary to 5 bullet points. Use only my notes; write [CONFIRM] where data is missing. Notes: [paste]

This is the single biggest time saver for most PMs. Our [monthly progress report workflow](/ai-workflows/draft-monthly-progress-report) gives a longer version with a recommended layout.

## Meetings and communication prompts

### 13. Meeting agenda

> Draft an agenda for a fortnightly progress meeting on this project. Attendees: [list]. Include standing items (actions from last meeting, H&S, programme, design, commercial, risks, AOB) and these specific topics: [list]. Add a suggested time for each item, total 90 minutes.

### 14. Meeting minutes from rough notes

> Turn these rough notes into formal meeting minutes. Format: meeting title, date, attendees, apologies, then numbered items each with a short discussion summary and a clear action table (action, owner, due date). Do not add anything that is not in the notes. Where an owner or date is missing, write [CONFIRM]. Notes: [paste]

See our [meeting minutes workflow](/ai-workflows/generate-meeting-minutes) and the [free meeting minutes template](/templates/meeting-minutes) for a ready-made layout.

### 15. Action chaser email

> Write a short, polite email chasing these overdue actions from our last progress meeting. One paragraph, then a bulleted list of each action, owner and original due date. Firm but friendly, UK business tone. Actions: [paste]

### 16. Rewrite one update for three audiences

> Here is a factual update on the project. Rewrite it three ways: (1) a 100-word email to the client, (2) a 5-bullet summary for our board, (3) a plain-language briefing for the site team. Do not change any facts or dates. Update: [paste]

## Change control and contract prompts

Project managers sit between the client and the commercial team on change. These prompts help you get the paperwork right first time, but always have your QS or commercial manager check anything with money attached.

### 17. Early warning notice (NEC4)

> Draft an early warning notice under NEC4 ECC clause 15.1 from the contractor to the project manager. Include: the matter, why it could increase the prices, delay completion or a key date, or impair performance, and suggested actions for the early warning register. Factual and neutral. Facts: [paste]

### 18. Change request summary

> Summarise this client change request for our internal change log: what is changing, why, affected drawings or specifications, likely impact on programme, cost, design and H&S (state "to be assessed" rather than guessing figures), and who needs to approve it. Request: [paste]

Our [variation assessment workflow](/ai-workflows/write-variation-assessment) takes this further for the commercial side.

### 19. Contract clause summary

> Summarise the following contract clauses for a project manager. For each: what it requires, who must act, the time limit, and the consequence of missing it. Use plain English. Quote clause numbers exactly as they appear; do not add any that are not in the text. Clauses: [paste]

For longer documents, use our [summarise contract clauses workflow](/ai-workflows/summarise-contract-clauses).

## Health, safety and handover prompts

### 20. CDM duty checklist for the PM

> We are principal contractor under CDM 2015 on this project. Produce a checklist of what the project manager should confirm is in place before work starts: construction phase plan, pre-construction information, welfare, site induction, F10 notification if notifiable, coordination with the principal designer, and subcontractor competence checks. Mark each as a question, not a statement. Project facts: [paste]

The [construction phase plan template](/templates/construction-phase-plan) is a good starting point to check your plan against.

### 21. Lessons learned report

> Turn these project close-out notes into a lessons learned report with sections: what went well, what did not go well, root causes, and specific recommendations for the next project. Keep each point to one or two sentences. Notes: [paste]

### 22. Handover and close-out checklist

> Create a practical completion and handover checklist for this project: O&M manuals, health and safety file, as-built drawings, test and commissioning certificates, building control completion, warranties, training for the end user, and defects period arrangements. Format as a table: item, responsible party, status, date. Project details: [paste]

## Prompt quality compared: weak vs strong

| | Weak prompt | Strong prompt |
|---|-------------|---------------|
| **Example** | "Write a monthly report for my project." | Prompt 12 above, with your real notes pasted in |
| **Facts** | None, so the AI invents progress and figures | Real dates, percentages and events from your notes |
| **Context** | No contract, no stage | Contract form, CDM role, project stage named |
| **Format** | Whatever the AI decides | Fixed sections your client already expects |
| **Guardrails** | None | "Use only my notes", "[CONFIRM] where missing" |
| **Time to usable output** | 30+ minutes of rewriting | 5-10 minutes of checking |

## Worked example: a monthly report from rough notes

Here is how prompt 12 works on a real-style job.

**The project:** A £6.2m three-storey primary school extension in Leicestershire. NEC4 ECC Option A. Contract completion 21 August 2027, so the school can open for the September term. The contractor is principal contractor under CDM 2015.

**The PM's rough notes at the end of month 7:**

- Frame 85% erected, east stair core done
- Roof steel delayed 8 working days, fabricator QA issue, early warning EW-014 raised 3 Oct
- Recovered 3 days by resequencing internal blockwork
- 1 near miss: unsecured pallet at height, toolbox talk delivered
- No RIDDOR
- Client still to confirm kitchen equipment spec, needed by 7 Nov or M&E first fix slips
- Forecast completion 28 Aug, 5 days behind
- Cumulative cost on budget, 2 CEs pending

**What the AI produced (executive summary extract):**

- Frame 85% complete with the east stair core finished.
- Roof steel delivery is 8 working days late due to a fabricator quality issue (early warning EW-014, raised 3 October). Resequencing of internal blockwork has recovered 3 days.
- Forecast completion is 28 August 2027, 5 working days after contract completion of 21 August 2027. Recovery options are being reviewed.
- One near miss (unsecured pallet at height) was closed out with a toolbox talk. No RIDDOR reportable incidents.
- **Client decision required:** confirm kitchen equipment specification by 7 November to protect M&E first fix.

Under "Commercial summary" the AI wrote "Cumulative cost on budget. Two compensation events pending: [CONFIRM CE references and status]." That is exactly the right behaviour: it kept the fact, refused to invent the detail, and told the PM what to fill in.

Total time: about 8 minutes from notes to a report ready for a final read, against the 60 to 90 minutes most PMs spend formatting a monthly report by hand. The PM then checked every date, added the CE references and sent it.

## Rules for using AI safely as a project manager

- **Never paste confidential data into a tool your company has not approved.** Check your firm's AI policy. Remove commercially sensitive figures and personal data if in doubt.
- **Check every date, name and figure.** AI is a drafting tool, not a source of truth.
- **Keep contract notices human-reviewed.** An early warning or notice with the wrong date or clause can affect entitlement. Use AI for the first draft only.
- **Keep the original notes.** Your rough notes, photos and emails are the contemporaneous record. The AI-polished version sits on top of them, not in place of them.
- **Build a prompt library.** Save the prompts that work for your company's formats. Small edits each time beat starting from a blank chat.

Want more? Our wider [ChatGPT prompts for construction](/guides/chatgpt-prompts-for-construction) collection covers every role, the [quantity surveyor prompts](/guides/chatgpt-prompts-for-quantity-surveyors) pair well with the change control section above, and new prompts go out every week in our [free newsletter](/newsletter).

## Frequently asked questions

### What are the best ChatGPT prompts for construction project managers?

The most useful prompts cover the jobs that eat PM time: drafting a risk register, summarising a look-ahead programme, writing the monthly progress report, turning meeting notes into minutes, and drafting early warnings or change summaries. The best prompts give the AI a PM role, the real project facts, the contract form, a fixed output format and an instruction to write [CONFIRM] rather than guess.

### Can ChatGPT write a construction risk register?

Yes, it can draft a structured risk register in cause, event, effect format with scores and mitigations in a few minutes. You must give it the real project details, check every risk is relevant to your job, and confirm owners and scores yourself. Treat it as a first draft for your risk workshop, not a finished register.

### Is it safe to use ChatGPT for NEC4 or JCT contract notices?

It is safe for a first draft if a competent person checks it before it is sent. AI can structure an early warning or notice clearly, but it can get time limits, clause numbers or contract option details wrong. Always check the notice against your actual contract and amendments, and never let AI decide whether a notice is needed.

### Which is better for project managers: ChatGPT or Claude?

Both work well with the prompts in this guide. Claude handles very long documents such as full contracts or programme exports particularly well, while ChatGPT is widely available and integrates with many tools. If your company uses Microsoft 365, Copilot may already be approved. The prompt structure matters more than the tool. See our [Claude guide](/ai-tools/claude) for more.

### How much time can AI save a construction project manager?

Most PMs report the biggest savings on monthly reports, meeting minutes and risk register updates, often cutting each from an hour or more to 10 to 15 minutes including checking. Across a typical week that can free several hours for site time, client relationships and actual problem solving.

### Should I paste client documents into ChatGPT?

Only if your company's AI policy allows it and the tool is approved for business data. Many UK contractors use enterprise versions of ChatGPT, Claude or Copilot that do not train on your data. If you are unsure, remove names, prices and confidential details before pasting, or ask your IT team which tools are approved.
