---
title: "ChatGPT Prompts for Contract Managers: 20 Copy-Paste Prompts for UK JCT and NEC Contracts"
slug: "chatgpt-prompts-for-contract-managers"
description: "The best ChatGPT prompts for contract managers turn contracts, site records and correspondence into clause summaries, notice registers, compensation event notifications, variation assessments and extension of time submissions. This guide gives you 20 copy-paste prompts built for UK JCT and NEC4 contracts, with a worked example of an NEC4 compensation event caught inside the time bar."
difficulty: "beginner"
reading_time_minutes: 12
featured: false
sort_order: 30
meta_title: "20 ChatGPT Prompts for Contract Managers (UK JCT & NEC)"
meta_description: "20 copy-paste ChatGPT prompts for UK contract managers: clause summaries, notice registers, NEC4 compensation events, variations, EOT claims and final accounts."
---

**ChatGPT prompts for contract managers** are structured instructions that get ChatGPT, Claude or Copilot to handle the reading, tracking and drafting side of running a construction contract: summarising the conditions and amendments, building a notice and time bar register, drafting early warnings and compensation event notifications, assessing variations and structuring an extension of time submission. The prompts that work give the AI five things: a contract manager role, the real contract text or site records, the contract form (JCT or NEC4 and the main option), a fixed output format, and an instruction never to invent facts, dates or clause numbers. The contract manager still owns every notice and every judgement. The AI clears the paperwork so you catch entitlement before the clock runs out.

This guide gives you 20 copy-paste prompts grouped by the stages of a contract, a worked UK example of an NEC4 compensation event notified inside the eight-week time bar, and the rules that keep AI drafts safe to send. For the wider picture of AI in the role, start with our [contracts manager hub](/ai-for/contracts-manager).

## Why contract managers get so much from AI (and where it goes wrong)

Contract management is a reading and recording job with deadlines attached. A typical project gives you a main contract with a schedule of amendments, a stack of subcontracts, the employer's requirements, a programme, weekly site diaries, instructions, RFIs, minutes and hundreds of emails. Somewhere in that pile is the event that entitles you to time or money, and the contract usually gives you a short window to say so in writing.

That is exactly the kind of work AI is good at: reading long documents quickly, pulling out obligations and dates, and producing a clean first draft in the right format. But contract work has three features that make lazy prompts dangerous:

- **Notices have formal requirements.** NEC4 and JCT both say how, when and to whom a notice must be given. An AI draft that looks polished but misses the required content or goes to the wrong person can lose an entitlement.
- **Time bars are real.** Under NEC4 ECC clause 61.3, a contractor that fails to notify a compensation event within eight weeks of becoming aware of it can lose the right to any change to the Prices or Completion Date. A missed deadline cannot be fixed by a better letter later.
- **AI invents clause numbers.** General AI tools will sometimes quote a clause that does not exist, or quote a standard form clause that your amendments have deleted. Always paste the actual text and check every reference.

So every prompt below gives the AI your real documents, fixes the format and includes a guardrail. If your role leans more towards valuations and cost reporting, our [commercial manager hub](/ai-for/commercial-manager) covers that side.

## The contract manager prompt formula

| Part | What it does | Example wording |
|------|--------------|-----------------|
| **Role** | Sets expertise and UK context | "You are a contract manager at a UK main contractor administering an NEC4 ECC Option C contract." |
| **Documents** | Gives the AI the real source material | "Here are the contract data part one, the Z clauses and this week's site diary." |
| **Contract form** | Names the form, option and version | "NEC4 Engineering and Construction Contract, June 2017 with January 2023 amendments, Option C." |
| **Format** | Fixes the output shape | "Return a table: event, date aware, clause, notice deadline, status." |
| **Guardrails** | Stops invented facts and clauses | "Only quote clauses from the text I have pasted. Write [CHECK] where the documents are unclear." |

The guardrail is the line that matters. Without it, most AI tools will fill gaps with confident-sounding clause numbers and dates.

### JCT and NEC4 use different language, so your prompts should too

The AI will write in whichever vocabulary you give it. Mixing the two produces documents that look amateur to the other side and can blur what you are actually claiming.

| Concept | JCT (e.g. Design and Build 2024) | NEC4 ECC |
|---------|-----------------------------------|----------|
| Change to the works | Variation (Change under D&B) | Compensation event |
| Who administers | Employer's Agent or Architect / Contract Administrator | Project Manager |
| Extra time | Extension of time for a Relevant Event | Change to the Completion Date via a compensation event |
| Extra money for disruption | Loss and expense for a Relevant Matter | Assessed within the compensation event (Defined Cost plus Fee) |
| Early risk flag | No formal equivalent in most forms | Early warning (clause 15) |
| Programme | Contractor's programme, limited status | Accepted Programme with formal acceptance (clause 31 and 32) |
| Contract changes | Amendments schedule | Z clauses |

Tell the AI which column you are in at the start of every prompt.

### Getting contract documents into the AI

- **Paste clauses, not just clause numbers.** "Clause 2.26" means different things in different versions and after amendments. Paste the text.
- **Work one issue at a time.** Ask about one event, one variation or one subcontract package per conversation. Smaller inputs give sharper answers.
- **Strip confidential details** if your company AI policy requires it. Party names and addresses rarely matter to the output.
- **Use Claude for long documents.** It handles a full contract with amendments in one go. Our [Claude guide](/ai-tools/claude) covers setup.

## Contract review prompts

### 1. Contract summary on one page

> You are a contract manager at a UK main contractor. Summarise the contract below on one page for the project team: parties, contract form and version, main option, contract sum or Prices, start and completion dates, sectional completion, liquidated or delay damages, retention and its release, payment cycle and periods, insurance obligations, design responsibility, and key notice periods. Quote only from the text I paste. Write [CHECK] where anything is missing. Contract: [paste]

For a faster version, the [summarise contract clauses workflow](/ai-workflows/summarise-contract-clauses) gives a ready-made structure.

### 2. Amendments risk review

> Read the schedule of amendments (or Z clauses) below and compare each one with the standard form wording I have also pasted. For each amendment, state in one line what changed, who the risk moves to, and whether it needs a commercial review, a price allowance or a negotiation point. Do not give legal advice. Standard wording and amendments: [paste]

### 3. Obligations and deadlines register

> From the contract text below, extract every obligation that has a time limit attached. Return a table: obligation, who it applies to, trigger, time limit, clause (as quoted in the text), and consequence of missing it. Sort by length of time limit, shortest first. Do not add any obligation that is not in the text. Contract: [paste]

### 4. Back-to-back check against a subcontract

> Compare the main contract clauses and the subcontract clauses below on: notice periods, payment periods, retention, delay damages, design responsibility and dispute resolution. Return a table showing each item, the main contract position, the subcontract position, and whether we are exposed (for example, a subcontractor with longer to notify us than we have to notify the client). Texts: [paste]

### 5. Contract briefing for the site team

> Turn this contract summary into a plain English briefing for site managers and engineers. Cover only what they need: what counts as a change, who can instruct, how quickly they must tell me about delays or problems, what records to keep, and who not to take instructions from. Under 400 words, bullet points. Summary: [paste]

## Notices and time bar prompts

### 6. Notice and time bar register

> You are a contract manager on an NEC4 ECC contract. From the site diary entries, emails and minutes below, identify every event that might be a compensation event or an early warning matter. Return a table: event, date we became aware, possible clause (from the text I paste only), notice deadline (eight weeks from date aware for compensation events under clause 61.3), notice sent yes or no, and next action. Flag anything within two weeks of its deadline as URGENT. Records: [paste]

### 7. Early warning notice

> Draft an early warning notice under NEC4 clause 15 to the Project Manager about the matter below. State the matter, how it could increase the Prices, delay Completion or a Key Date, or impair performance, and propose that it is added to the Early Warning Register and discussed at the next early warning meeting. Factual, neutral tone. Use only these facts: [paste]

### 8. Compensation event notification

> Draft a notification of a compensation event to the Project Manager under NEC4 clause 61.3. Include: a clear description of the event, the date we became aware of it, the clause in clause 60.1 we believe applies (quoting only from the text I paste), the parts of the works affected, and a statement that a quotation will follow when instructed. Do not include any costs or time. Facts and clause text: [paste]

### 9. JCT notice of delay

> Draft a written notice under a JCT Design and Build 2024 contract informing the Employer that progress of the works is being or is likely to be delayed. State the material circumstances, the cause, whether we consider it a Relevant Event (quoting only from the clause text I paste), and that particulars and an estimate of the expected delay will follow. Facts and clause text: [paste]

### 10. Reply to a deemed acceptance situation

> The Project Manager has not replied to our compensation event notification or quotation within the period in the contract. Using the clause text and dates below, draft a short, professional notice that sets out the timeline and the deemed acceptance procedure in the contract. Quote only the clauses I paste. Dates and clauses: [paste]

## Change and claims prompts

### 11. Variation assessment

> You are a UK contract manager assessing a variation under a JCT Design and Build contract. From the instruction and drawings description below, write an assessment covering: what changed against the Employer's Requirements, whether it is a Change under the contract, the valuation rules that apply (quoting the clause text I paste), the information needed to value it, and the likely time effect to investigate. Leave every value blank. Instruction and contract text: [paste]

The [write variation assessment workflow](/ai-workflows/write-variation-assessment) has a longer version with a full output template.

### 12. Compensation event quotation structure

> Lay out the structure for an NEC4 Option C compensation event quotation for the event below: description, assumptions, changes to the Prices built from Defined Cost by resource (people, equipment, plant and materials, subcontract, charges) plus the Fee, and the change to the Completion Date shown on a revised programme extract. Leave all figures blank and mark [CHECK] where I need to supply records. Event: [paste]

### 13. Extension of time submission outline

> Draft the outline of an extension of time submission for the delay events below. Sections: executive summary, contract provisions (quoting only my pasted text), chronology of events, description of each event and its cause, programme analysis method to be used, effect on the critical path, mitigation taken, time claimed (blank), and appendices list. Do not invent dates or durations. Events and records: [paste]

### 14. Chronology from correspondence

> Build a dated chronology from the emails, letters and minutes below about [issue]. One row per item: date, from, to, document reference, and a one-line factual summary. Do not interpret or argue the case. Sort by date. Correspondence: [paste]

A chronology is the backbone of every claim, and good [meeting minutes](/templates/meeting-minutes) make it far easier to build.

### 15. Responding to a contra charge

> A subcontractor has received our contra charge or a client has issued one to us. From the charge and the facts below, list: what the charge is for, which clause it relies on, what evidence it gives, any notice requirements that may not have been followed, and the questions we should ask before accepting or disputing it. Neutral tone. Do not give legal advice. Charge and facts: [paste]

## Payment and reporting prompts

### 16. Payment application covering letter

> Draft a covering letter for our interim payment application number [x] under the contract below. State the valuation date, the gross sum applied for, the retention deducted, the net sum due and the due date and final date for payment as defined in the contract (using my figures and clause text only). Mention the supporting documents attached. Figures and clauses: [paste]

### 17. Pay less notice check

> We have received the payment notice and pay less notice below. Check them against the payment clauses I paste: were they issued on time, do they state the sum considered due and the basis of calculation, and does the sum match our application? Return a table of findings and a list of questions for our commercial team. Do not give legal advice. Notices and clauses: [paste]

### 18. Monthly contract report

> Write the contract section of our monthly project report from the registers below: compensation events or variations notified, quoted, agreed and outstanding, early warnings open and closed, extension of time position, payment status, retention held, and the top five contractual risks. Use my figures exactly. Registers: [paste]

The [monthly progress report workflow](/ai-workflows/draft-monthly-progress-report) shows how this slots into the full project report.

### 19. Final account agreement tracker

> From the variation register and correspondence below, build a final account tracker: item, description, our value, client's value, difference, status (agreed, in negotiation, disputed), evidence held, and next action. Sum the agreed and disputed totals using my figures only. Register: [paste]

### 20. Lessons learned at contract close

> From the notes below on how this contract ran, write a lessons learned note for the next bid and the next contract team: notices we missed or nearly missed, amendments that hurt us, clauses that worked well, record keeping gaps, and five specific changes to our standard process. Notes: [paste]

## Prompt quality compared: weak vs strong

| | Weak prompt | Strong prompt |
|---|-------------|---------------|
| **Example** | "Write a compensation event letter about the water main." | Prompt 8 above, with your facts and clause 60.1 text pasted in |
| **Source material** | None, the AI guesses the facts | Site diary extract, photos described, date aware |
| **Contract form** | Not stated, so wording is generic | NEC4 ECC, Option C, with the actual clause text |
| **Format** | Whatever the AI decides | Event, date aware, clause, works affected, quotation to follow |
| **Guardrails** | None, so it may quote a clause that does not exist | "Quote only clauses I paste", no costs or time |
| **Contractual risk** | High: wrong clause, missing date, may not be a valid notice | Low: checked against the contract before sending |
| **Time to issue** | 45 minutes to an hour by hand | 10 to 15 minutes including checking |

## Worked example: an NEC4 compensation event caught inside the time bar

Here are prompts 6 and 8 used together on a realistic project.

**The project:** a six-storey, 64-unit residential block in Leeds for a housing association. NEC4 ECC Option C (target contract with activity schedule), with the main contractor as principal contractor under CDM 2015. Contract value around £11.2m, 70-week programme.

**What happened:** in week 9, the groundworks subcontractor hit an uncharted 300 mm cast iron water main while excavating for the lift pit. The site investigation and the utility drawings in the Site Information showed no main in that location. Work in the area stopped for six working days while the water company diverted it. The site manager recorded it in the site diary and mentioned it at the weekly progress meeting, but nobody sent a notice.

**Week 15:** the contract manager pasted six weeks of site diaries, the progress meeting minutes and the clause 60.1 text into Claude and ran prompt 6.

**What the AI produced (extract of the register):**

| Event | Date aware | Possible clause | Notice deadline | Notice sent | Next action |
|-------|-----------|-----------------|-----------------|-------------|-------------|
| Uncharted water main at lift pit | Tue 3 March | 60.1(12) physical conditions | Tue 28 April | No | URGENT: notify |
| PM instruction to change balcony balustrade | Thu 19 March | 60.1(1) change to Scope | Thu 14 May | No | Notify |
| Late access to adjacent car park | Mon 23 March | 60.1(2) access date (check Contract Data) | Mon 18 May | No | [CHECK] access date |

**The notification:** the contract manager then ran prompt 8 with the diary entries for 3 to 11 March, the photos described in words and the clause 60.1(12) text. The draft described the event, gave the date of awareness, identified the lift pit and core walls as the affected works, referenced the Site Information drawings that showed no main, and stated that a quotation would follow on instruction. It contained no costs and no time claim, as instructed.

The contract manager checked every fact against the diary, corrected the date the water company attended, and issued the notice through the contract's communication system in week 15, about two weeks before the time bar. The Project Manager instructed a quotation, which the commercial team built from Defined Cost records using the structure from prompt 12. The event was later agreed with a change to the Completion Date of four working days after the programme analysis showed some float absorbed the rest.

Notice what the AI did not do: it did not decide the event was definitely a compensation event, and it did not put a value on it. It found the gap in the notices and produced a clean draft. The contract manager made the judgement and sent the notice. Total time: about 40 minutes from a pile of diaries to an issued notice and a full register.

## Rules for using AI safely as a contract manager

- **Never send an AI draft unchecked.** Check every date, name, clause number and fact against the source documents before it goes out.
- **Paste the real clause text.** Standard forms change between versions and your amendments may delete or rewrite the clause the AI expects. Only the signed contract counts.
- **Follow the communication rules.** NEC4 clause 13 and the JCT notice provisions set out how notices must be given. A perfect letter sent the wrong way may not be a valid notice.
- **Do not use AI as a lawyer.** It is a drafting and checking tool. For disputes, adjudication or significant claims, take proper legal or claims advice.
- **Keep the records first.** AI can only work from what you give it. Good site diaries, minutes and photos are what win entitlement.
- **Respect confidentiality.** Contract terms and commercial positions are sensitive. Use an approved business account and follow your company's AI policy.
- **Build a shared prompt library.** Save the prompts that work for your company's contract forms so every project team notifies the same way.

Want more? The [quantity surveyor prompts](/guides/chatgpt-prompts-for-quantity-surveyors) cover valuations and cost reporting, the [project manager prompts](/guides/chatgpt-prompts-for-project-managers) cover programme and progress, our full [ChatGPT prompts for construction](/guides/chatgpt-prompts-for-construction) library covers every role, and new prompts go out every week in our [free newsletter](/newsletter).

## Frequently asked questions

### What are the best ChatGPT prompts for contract managers?

The most useful prompts cover the reading and admin that fills a contract manager's week: summarising the contract and amendments, extracting obligations and deadlines, building a notice and time bar register, drafting early warnings and compensation event notifications, assessing variations, building chronologies and outlining extension of time submissions. The best prompts give the AI a contract manager role, the real contract text and records, the contract form and option, a fixed format and an instruction never to invent clauses, dates or facts.

### Can ChatGPT write a valid NEC4 compensation event notice?

It can write a good first draft, but whether it is a valid notice depends on the content, the timing and how it is communicated, all of which you must check. Paste the clause 60.1 text you are relying on and the facts from your records, check the date of awareness, and issue it through the method set out in the contract. Under clause 61.3 the eight-week time bar still applies however good the letter is.

### Does ChatGPT know the difference between JCT and NEC contracts?

General AI tools know the broad structure of both families, but they mix up terms and sometimes quote clause numbers from the wrong version. Name the form, version and main option in every prompt, paste the clauses you rely on, and tell the AI to use only that wording. The comparison table above shows the key terms to keep separate.

### Is it safe to paste a construction contract into ChatGPT?

Contracts and commercial positions are confidential, so follow your company's AI policy and use a business account where your data is not used for training. Many contractors use Microsoft Copilot or a business tier of ChatGPT or Claude for this reason. If in doubt, remove party names, the project address and contract values before pasting.

### Can AI replace a contract manager?

No. AI is very good at reading, sorting and drafting, which frees time, but it cannot judge entitlement, negotiate with a Project Manager or Employer's Agent, or take responsibility for a notice. It also makes mistakes with clause numbers and dates. Used well, it means fewer missed notices and better records, which makes a good contract manager more effective.

### How much time can AI save a contract manager?

The biggest savings are on contract summaries, notice registers, chronologies and first drafts of notices and reports. A one-page contract summary drops from half a day to under an hour including checking, and a chronology built from a month of emails drops from a day to an hour or two. The bigger win is risk: a weekly notice register run over site diaries catches events before the time bar does.
