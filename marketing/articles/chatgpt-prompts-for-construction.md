---
title: "ChatGPT Prompts for Construction: 25 Copy-Paste Prompts for UK Site and Office Teams"
slug: "chatgpt-prompts-for-construction"
description: "The best ChatGPT prompts for construction give the AI a role, the project facts, a fixed output format, and a rule not to invent anything. This guide gives you 25 tested, copy-paste prompts for site reports, RAMS, tenders, variations, cost plans and more, with a UK worked example."
difficulty: "beginner"
reading_time_minutes: 13
featured: false
sort_order: 24
meta_title: "25 ChatGPT Prompts for Construction (Copy-Paste, UK Examples)"
meta_description: "25 copy-paste ChatGPT prompts for construction: daily reports, RAMS, COSHH, tender analysis, variations, cost plans and meeting minutes. Built for UK site and commercial teams."
---

**ChatGPT prompts for construction** are written instructions that tell ChatGPT (or Claude, or Copilot) exactly how to produce a piece of construction work, such as a daily site report, a method statement, a tender comparison or a variation letter. The prompts that work give the AI four things: a role, the real project facts, a fixed output format, and a rule not to invent anything it was not told. Get those four right and a 40 minute document becomes a 5 minute review.

This guide gives you 25 copy-paste prompts grouped by job, a simple formula for writing your own, a UK worked example, and the mistakes that make AI output useless or risky. Every prompt below links to a step-by-step workflow in our [AI workflows library](/ai-workflows), and new prompts go out in our [free weekly newsletter](/newsletter).

## Why most construction prompts fail

Type "write a method statement for brickwork" and you get a generic, American-flavoured document that mentions OSHA and could apply to any job in the world. The problem is not the tool. It is the prompt. ChatGPT knows construction in general and nothing about your project, so a short prompt forces it to guess.

There are three common failure patterns:

- **No project facts.** The AI cannot know the scheme, the programme, the contract form or the subcontractor names unless you tell it.
- **No output format.** Without a fixed structure you get a different shape of document every time, which is useless for consistent records.
- **No guard against invention.** Unless you tell it to flag missing information, the AI will fill gaps with plausible fiction, including clause numbers, quantities and dates.

## The four-part construction prompt formula

Every prompt in this guide follows the same pattern. Once you see it, you can write your own for any document.

| Part | What it does | Example wording |
|------|--------------|-----------------|
| **Role** | Sets the expertise and the UK context | "You are an experienced UK site manager working under CDM 2015." |
| **Facts** | Gives the real project information | "Project: 24-unit housing scheme, Leicester. Notes below." |
| **Format** | Fixes the output structure | "Use these headings in this order. Put actions in a table." |
| **Guardrails** | Stops invention and flags gaps | "Do not invent anything. Write [CONFIRM] where information is missing." |

The guardrail is the part most people leave out, and it matters most. "Write [CONFIRM] where information is missing" turns the AI from a confident guesser into a careful assistant that shows you exactly where it needs your input.

## ChatGPT vs Claude vs Copilot for construction prompts

All the prompts below work in any of the major tools. Each has strengths worth knowing.

| Tool | Best at | Watch out for | Good for |
|------|---------|---------------|----------|
| **ChatGPT** | Fast drafting, images of drawings and site photos, voice notes | Can be confidently wrong on UK regulation detail | Daily reports, letters, toolbox talks |
| **Claude** | Long documents, careful reading of contracts and specs, following format rules | Smaller free-tier limits on very large files | Tender analysis, contract clauses, RAMS review |
| **Microsoft Copilot** | Working inside Word, Excel, Outlook and Teams | Quality depends on your licence tier | Minutes from Teams calls, Excel cost data |

If you are choosing one tool to start with, see our pages on [ChatGPT for construction](/ai-tools/chatgpt) and [Claude for construction](/ai-tools/claude). The honest answer for most UK contractors is to try the same prompt in two tools for a week and keep the one whose output needs less correcting.

## Site management prompts

### 1. Daily site report from rough notes

> You are an experienced UK site manager. Turn my rough notes below into a complete daily site report with these headings in this order: Weather, Labour on site (table: company, trade, operatives, hours), Plant, Deliveries, Work completed by location, Delays and causes, Instructions received, Health and safety, Visitors. Keep my wording on delays and instructions exact. Do not invent anything. Write [CONFIRM] where information is missing. Notes: [paste notes]

This is the single most useful prompt for site teams. The full version, with an example output, is in our [write daily site report workflow](/ai-workflows/write-daily-site-report).

### 2. Three-week lookahead summary

> You are a UK construction planner. From the programme extract below, write a three-week lookahead for the site team. List activities by week, flag any that depend on deliveries, design information or other trades, and highlight anything already behind. Use plain English a foreman would read on a phone. Do not add activities that are not in the extract. Extract: [paste]

### 3. Toolbox talk

> Write a 10 minute toolbox talk for a UK construction site on [topic]. Audience: [trade] operatives. Include: why it matters on this site, three key hazards, the controls we use, one short real-world incident example, and three questions to check understanding. Reference CDM 2015 and HSE guidance in general terms only. Do not quote regulation numbers unless you are certain.

### 4. Snagging list from walkround notes

> Turn my walkround notes below into a snagging list table with columns: Ref, Plot or room, Location, Defect, Trade responsible, Priority (High, Medium, Low). Group by plot. Use consistent defect wording. Do not add defects that are not in my notes. Notes: [paste]

### 5. Weekly client progress email

> Write a short weekly progress email to the client's project manager from the notes below. Structure: progress this week, planned next week, issues needing a client decision (with dates needed), and health and safety summary. Professional, factual, no sales language. Under 250 words. Notes: [paste]

## Health and safety prompts

### 6. Method statement first draft

> You are a UK construction health and safety adviser. Draft a method statement for [activity] on [project type]. Sections: scope, sequence of works (numbered steps), plant and equipment, permits required, PPE, emergency arrangements, supervision and competence. Assume CDM 2015 applies. Write [CONFIRM] for any site-specific detail I have not given. Project details: [paste]

Full workflow: [draft method statement](/ai-workflows/draft-method-statement). For how method statements fit with risk assessments, see our [RAMS template](/templates/rams).

### 7. COSHH assessment from a safety data sheet

> From the safety data sheet below, prepare a COSHH assessment for use on a UK construction site. Include: product, hazard classification, routes of exposure, tasks where it is used, control measures in the hierarchy of control order, PPE, health surveillance needs, first aid, storage and disposal. Only use information from the data sheet. Data sheet: [paste]

Full workflow: [generate COSHH risk assessment](/ai-workflows/generate-coshh-risk-assessment).

### 8. RAMS review against the task

> You are reviewing a subcontractor's RAMS for [activity]. Check it against the task description below. List: hazards that are missing, controls that are vague or unenforceable, permits that should be referenced but are not, and anything inconsistent with CDM 2015 principal contractor duties. Output as a table with a comment I can send back. Task: [paste] RAMS: [paste]

### 9. Near-miss write-up

> Turn these notes into a near-miss report. Sections: what happened, when and where, who was involved (roles only, no names), immediate actions, likely root cause, recommended actions with owners. Neutral, factual tone with no blame. Notes: [paste]

## Commercial and quantity surveying prompts

### 10. Tender comparison

> You are a UK quantity surveyor. Compare the subcontract tenders below for [package]. Produce a table: tenderer, tender sum, exclusions, qualifications, programme assumptions, and items priced as provisional. Then list the scope gaps between them and what each tender would cost once normalised. Quote exclusions word for word. Tenders: [paste]

Full workflow: [analyse tender returns](/ai-workflows/analyse-tender-returns).

### 11. Variation assessment

> You are a UK commercial manager. Assess the instruction below as a potential variation under [JCT or NEC] terms. Set out: what changed from the original scope, the likely cost and time impact headings, records needed to support it, and the notice requirements to check in the contract. Do not quote clause numbers unless they appear in the text I give you. Instruction and scope: [paste]

Full workflow: [write variation assessment](/ai-workflows/write-variation-assessment).

### 12. Bill of quantities structure

> Using NRM2 conventions, set out a bill of quantities structure for [work package] from the description below. Columns: item ref, description, unit, quantity, rate, total. Leave quantity and rate blank where I have not given them and mark [MEASURE]. Do not invent quantities. Description: [paste]

Full workflow: [generate bill of quantities](/ai-workflows/generate-bill-of-quantities).

### 13. Payment application cover letter

> Draft a covering letter for interim application number [X] on [project]. Include the gross valuation, retention, previous certified amount and the sum now due, using only the figures below. Mention that the application is made under the contract payment provisions and the Housing Grants, Construction and Regeneration Act 1996. Figures: [paste]

### 14. Early warning or notice letter

> Draft a factual notice to the client about the event below. State what happened, when we became aware, the likely effect on time and cost, and what we propose. Neutral tone. Leave the contract clause reference as [CLAUSE] for me to complete. Event: [paste]

### 15. Final account reconciliation notes

> Compare these two lists (our final account and the client's) and produce a reconciliation table: item, our value, their value, difference, likely reason for the difference. Sort by largest difference first. Lists: [paste]

## Project management prompts

### 16. Project risk register

> You are a UK construction project manager. Build a risk register for the project below. Columns: ID, risk description (cause, event, effect), category, likelihood 1 to 5, impact 1 to 5, score, owner, mitigation, residual score. Give 15 to 20 risks specific to this project, not generic ones. Project: [paste]

Full workflow: [generate project risk register](/ai-workflows/generate-project-risk-register).

### 17. Meeting minutes with action table

> Turn this meeting transcript or set of notes into formal minutes. Sections: attendees, apologies, items discussed (numbered), decisions made, and an action table with columns: action, owner, due date. Keep it concise. Do not invent owners or dates; write [CONFIRM]. Notes: [paste]

Full workflow: [generate meeting minutes](/ai-workflows/generate-meeting-minutes).

### 18. Monthly progress report narrative

> Write the narrative sections of a monthly progress report from the data below: executive summary, progress against programme, key issues, look ahead, health and safety, and commercial summary. Factual, under 600 words. Flag anything that looks inconsistent in the data. Data: [paste]

### 19. RFI drafting

> Draft a request for information to the design team about the issue below. Include: the drawing or specification reference, the exact question, why it matters to the programme, and the date a response is needed. One question per RFI. Issue: [paste]

### 20. Programme delay narrative

> Write a short delay narrative for the event below, suitable as a first draft for an extension of time submission. Cover: the event, its cause, the activities affected, the critical path effect as I have described it, and the records available. Do not reach conclusions on entitlement. Notes: [paste]

## Estimating and pre-construction prompts

### 21. Preliminary cost plan

> Using NRM1 element headings, prepare an outline cost plan structure for the scheme below. Include facilitating works, substructure, superstructure, finishes, services, external works, preliminaries, overheads and profit, and risk allowance. Leave rates as [RATE] unless I give them. Scheme: [paste]

### 22. Scope gap check on drawings and specification

> Read the specification extract and drawing notes below. List anything that is specified but not drawn, drawn but not specified, or ambiguous, with a suggested question for the designer. Do not guess at intent. Extract: [paste]

### 23. Tender query list

> From these tender documents, produce a list of clarification questions to send to the client before we price. Group by: scope, programme, contract terms, and design information. Number each question. Documents: [paste]

### 24. Pre-qualification answer draft

> Draft an answer to the PQQ question below using only the company facts I provide. Keep it under the word limit of [X]. Use specific evidence, not general claims. Question: [paste] Company facts: [paste]

### 25. Value engineering options

> For the element below, suggest five value engineering options suitable for UK construction. For each give: the change, likely saving direction (not a figure), programme effect, risk to quality or compliance, and who must approve it. Element and current specification: [paste]

## A worked UK example: one prompt, one Tuesday

Here is how prompt 1 performed on a real-style day on a 24-unit housing scheme in Leicester, built under a JCT Design and Build contract with a £5.8m contract sum.

The site manager, Priya, typed these notes into her phone at 16:40:

"Rain till 10. Groundworkers (Midland Civils) 5 men, stood till 10. Brickies (Hall Bros) 8 on plots 7 to 10, scaffold on plot 9 not handed over so moved to 10. Bricks 12 pallets in, 2 broken, photos taken. Building control visited plot 4 DPC, passed. Client PM asked for extra window on plot 12 gable, said he'd email. Toolbox talk on manual handling."

She pasted them into ChatGPT with prompt 1. In under a minute she had a full report with every heading filled. Three things stood out:

- **The [CONFIRM] markers did their job.** The AI flagged "Hours worked for Hall Bros [CONFIRM]" and "Plant on site [CONFIRM]" rather than inventing figures. Priya filled them in from memory in 30 seconds.
- **The verbal instruction was preserved word for word** under "Instructions received", which is exactly what a QS needs if the plot 12 window becomes a variation.
- **The scaffold handover issue was captured as a delay**, with the cause recorded. That is the kind of detail that gets lost when a tired site manager writes the diary at 18:00.

Time to finished report: 6 minutes, against her usual 30. Over a 60-week programme that is roughly 120 hours saved, and the records are more complete than before. The QS later used the same diary entry with prompt 11 to draft the variation assessment for the extra window, so one set of good notes fed two documents.

## Prompt mistakes that create risk

- **Pasting confidential or personal data without thinking.** Check your company policy. Use business or team plans where data is not used for training, and strip personal details from incident reports.
- **Treating the output as finished.** AI drafts, a competent person checks. Under CDM 2015 the duties stay with people, not software.
- **Accepting regulation or clause references without checking.** If a prompt does not include the source text, any clause number in the answer needs verifying.
- **Using one giant prompt for everything.** Break big jobs into steps: summarise, then analyse, then draft.
- **Forgetting the format.** If you want a table, say so, and give the columns.
- **Not saving what works.** When a prompt gives a great result, save it. That is how a team builds its own prompt library.

## How to build your own construction prompt library

Start with the three documents your team writes most often. For most contractors that is the daily report, meeting minutes and RAMS. Take the prompts above, adjust the headings to match your company formats, and save them somewhere everyone can reach: a shared Word document, a Teams channel, or the custom instructions feature in ChatGPT.

Review them monthly and update the shared copy when someone finds a better wording. Our guide on [how to use AI in construction](/guides/how-to-use-ai-in-construction) covers how to roll this out across a team, and [AI use cases in construction](/guides/ai-use-cases-in-construction) ranks which documents to start with by time saved.

## Frequently asked questions

### What are the best ChatGPT prompts for construction?

The most useful are prompts for daily site reports, meeting minutes, method statement drafts, COSHH assessments, tender comparisons and variation assessments. These are frequent, document-heavy tasks where AI saves the most time. The best prompts give a role, the project facts, a fixed format and an instruction not to invent missing information.

### Can ChatGPT write a RAMS or method statement?

ChatGPT can write a solid first draft of a method statement or risk assessment if you give it the activity, the site conditions and your company headings. It cannot know your site, so a competent person must review, correct and sign it off. Under CDM 2015 the responsibility stays with the duty holders, not the tool.

### Is it safe to put project information into ChatGPT?

It depends on your plan and your company policy. Business and team plans from OpenAI, Anthropic and Microsoft generally do not use your data for training, while free consumer plans may. Avoid pasting personal data, and check client confidentiality clauses before uploading tender or contract documents.

### Do these prompts work in Claude and Copilot too?

Yes. The four-part formula of role, facts, format and guardrails works in ChatGPT, Claude, Microsoft Copilot and Gemini. Claude tends to be stronger on long contracts and specifications, while Copilot is convenient inside Word, Excel and Teams. Test the same prompt in two tools and keep the one that needs less correction.

### How do I stop ChatGPT making things up?

Tell it explicitly: "Do not invent anything. Write [CONFIRM] where information is missing." Give it the source text rather than asking it to recall regulations or clauses from memory, and ask it to quote exclusions or instructions word for word. Always check figures, dates and clause numbers before anything is issued.

### Is there a free library of construction prompts?

Yes. Every prompt in this guide is free to copy, and each links to a free step-by-step workflow in the BuildCopilot AI workflows library. New prompts go out in the free weekly BuildCopilot newsletter as we publish them.
