---
title: "ChatGPT Prompts for Quantity Surveyors: 22 Copy-Paste Prompts for UK QS Work"
slug: "chatgpt-prompts-for-quantity-surveyors"
description: "The best ChatGPT prompts for quantity surveyors give the AI a QS role, the real commercial facts, the measurement or contract rules to follow, and an instruction to flag gaps rather than guess. This guide gives you 22 copy-paste prompts for cost plans, NRM2 bills, tender analysis, valuations, variations and contracts, with a UK worked example."
difficulty: "beginner"
reading_time_minutes: 12
featured: false
sort_order: 26
meta_title: "22 ChatGPT Prompts for Quantity Surveyors (UK, Copy-Paste)"
meta_description: "22 copy-paste ChatGPT prompts for UK quantity surveyors: NRM1 cost plans, NRM2 bill items, tender comparisons, valuations, variations and JCT/NEC4 work."
---

**ChatGPT prompts for quantity surveyors** are structured instructions that get ChatGPT, Claude or Copilot to do the document-heavy parts of QS work: wording bill items, comparing tender returns, checking an interim application, drafting a variation assessment or summarising a contract. The prompts that work give the AI four things: a QS role, the real commercial facts, the rules it must follow (NRM1, NRM2, the JCT or NEC4 form in use), and an instruction to flag anything missing rather than invent it. The QS still makes every commercial judgement. The AI removes the hours of formatting, cross-checking and first drafts.

This guide gives you 22 copy-paste prompts grouped by stage of the job, a worked UK example of an interim valuation check, and the rules that keep AI output safe to put in front of a client or a subcontractor. If you want the wider picture of where AI fits in the role, start with our [AI for quantity surveyors guide](/guides/ai-for-quantity-surveyors-guide) or the [quantity surveyor hub](/ai-for/quantity-surveyor).

## Why generic prompts fail quantity surveyors

Ask ChatGPT to "price a bill of quantities for a two-storey extension" and you will get a confident list of rates that came from nowhere, in a format no client would accept, often with American units and terminology. That output is worse than useless because it looks plausible.

QS work has three features that make lazy prompts dangerous:

- **Numbers carry liability.** A wrong rate, a missed qualification or a misread clause can cost real money. The AI must be told never to invent figures.
- **There are rules of measurement.** NRM1 for cost planning and NRM2 for detailed measurement give a fixed structure. If you do not name the rules, the AI will not follow them.
- **The contract decides everything.** A variation under JCT is not handled the same way as a compensation event under NEC4. The AI needs to know which form, which edition and which amendments apply.

So every prompt below names the standard, supplies the facts, fixes the output format and includes a guardrail.

## The QS prompt formula

| Part | What it does | Example wording |
|------|--------------|-----------------|
| **Role** | Sets QS expertise and UK context | "You are a chartered quantity surveyor (MRICS) working for a UK main contractor." |
| **Facts** | Gives the real commercial data | "Contract: JCT Design and Build 2024 with client amendments. Application 9 attached." |
| **Rules** | Names the standard to follow | "Structure the output to NRM2 work sections." |
| **Format** | Fixes the output shape | "Return a table: item, applied, assessed, difference, reason." |
| **Guardrails** | Stops invention | "Do not invent rates, quantities or clause numbers. Write [CONFIRM] where data is missing." |

The guardrail matters more for a QS than for almost any other role. "Do not invent rates" and "show your arithmetic" are the two phrases that turn AI from a liability into a useful checker.

## Cost planning and estimating prompts

### 1. NRM1 elemental cost plan from a brief

> You are a UK cost consultant. Using the brief below, draft an outline cost plan structured to NRM1 group elements (substructure, superstructure, internal finishes, fittings, services, external works, preliminaries, overheads and profit, risk, inflation). Use only the rates I provide. Where I have not given a rate, leave the cell blank and write [RATE NEEDED]. Show GIFA, cost per m2 for each element and the total. Brief and rates: [paste]

The structure is the time saver here, not the rates. Our [preliminary cost plan workflow](/ai-workflows/generate-preliminary-cost-plan) has a fuller version, and the [free cost plan template](/templates/cost-plan) gives you the layout to paste into.

### 2. Cost plan sense check

> Review this cost plan as a senior QS would before it goes to the client. Flag: elements that look high or low as a percentage of total, missing elements, double counting, preliminaries outside a typical range for this project size, and risk allowances with no stated basis. Do not change any figure. Return a numbered list of queries. Cost plan: [paste]

### 3. Cost plan narrative and assumptions

> Write the assumptions and exclusions section for this cost plan in plain UK English. Group under: basis of estimate, design information used, procurement assumptions, exclusions, and risks. Use only what is in the notes. Notes: [paste]

### 4. Value engineering options

> Here is the cost plan and the specification summary. Suggest up to 10 value engineering options a UK contractor might propose. For each give: element, current spec, alternative, likely effect on cost (higher, lower, neutral, no figures), and impact on programme, buildability and performance. Flag anything that would affect fire safety or Building Regulations compliance. Data: [paste]

## Measurement and bill of quantities prompts

### 5. Turn take-off notes into NRM2 bill items

> You are a UK QS. Turn my measured take-off notes below into bill of quantities items structured to NRM2 work sections. For each item give: NRM2 section, description in full bill language, unit, quantity. Do not change any quantity. If a description needs information I have not given (thickness, grade, finish), write [CONFIRM]. Notes: [paste]

This is the prompt QS teams use most. The step by step version is in our [generate a bill of quantities workflow](/ai-workflows/generate-bill-of-quantities).

### 6. Scope gap check against the specification

> Compare the bill of quantities against the specification clauses below. List every specification item that has no matching bill item, and every bill item with no specification reference. Return a two-column table. Do not assume anything is included elsewhere unless the documents say so. Bill: [paste] Specification: [paste]

### 7. Clean up a messy take-off schedule

> Reformat this take-off schedule into a consistent table: reference, location, description, dimensions, quantity, unit. Standardise units to metric (m, m2, m3, nr, t). Do not recalculate. Flag any line where the dimensions do not appear to produce the stated quantity. Schedule: [paste]

## Tendering and procurement prompts

### 8. Tender return comparison

> You are a UK QS preparing a tender report. Compare the subcontract tender returns below. Produce: (1) a table of each tenderer's total, preliminaries and key package totals; (2) a table of every qualification, exclusion and assumption by tenderer; (3) a list of items one tenderer has priced that others have not; (4) any rate more than 20 percent above or below the average for the same item. Do not recommend a winner. Returns: [paste]

The full workflow, with a sample output, is in [analyse tender returns](/ai-workflows/analyse-tender-returns), and our [tender evaluation template](/templates/tender-evaluation) gives you the scoring layout.

### 9. Extract qualifications from a tender letter

> List every qualification, exclusion, assumption and condition in this tender submission as a numbered list. Quote the original wording for each. Then mark each one as: commercial risk, programme risk, scope gap or acceptable. Submission: [paste]

### 10. Draft tender queries

> Based on the qualifications and gaps above, draft a set of clarification queries to send to each tenderer. Keep each query to one question, neutral in tone, and reference the tender document page or item. Do not reveal other tenderers' prices.

### 11. Tender report summary

> Draft the executive summary of a tender report for the client using the comparison below. Cover: number of returns, range of prices, the normalised position after adjustments, key risks and qualifications, and the questions still open. Leave the recommendation section blank for me to complete. Data: [paste]

## Post-contract prompts

### 12. Interim application check

> You are a UK QS assessing a subcontractor's interim application. Compare the application with my site notes and the previous valuation. Return a table: item, applied value, my assessed value (from my notes only), difference, reason. Then calculate the gross assessed value, retention at [X] percent, less previously certified, and the net amount due. Show every step of the arithmetic. Do not invent any progress figure. Data: [paste]

### 13. Variation assessment

> Draft a variation assessment for the instruction below. Include: instruction reference and date, description of the change, basis of valuation under the contract (use the clause I give, do not guess), measured quantities, rates applied and their source, total, and any time implications. Write [CONFIRM] where information is missing. Data: [paste]

Our [write variation assessment workflow](/ai-workflows/write-variation-assessment) has the full prompt and a worked example.

### 14. Payment notice and pay less notice wording

> Draft a payment notice for the assessed sum below under a contract subject to the Housing Grants, Construction and Regeneration Act 1996 (as amended). State the sum considered due, the basis on which it is calculated, and the due date. Then draft a separate pay less notice template stating the sum we intend to pay and the basis. Use plain, factual wording. Leave all dates and sums as placeholders I will fill. Data: [paste]

Always have the final notice checked against the contract's own timing provisions. Notice periods are where payment disputes are won and lost.

### 15. Change control register update

> Update this change register with the new instructions below. For each: reference, date, description, status (instructed, pending, disputed), estimated value, agreed value, time impact. Do not change existing agreed values. Register and new items: [paste]

### 16. CVR commentary

> Write the commentary for this month's cost value reconciliation. Explain the movement in margin from last month, the main over and under recoveries by package, and the risks and opportunities not yet in the figures. Use only the numbers provided. Data: [paste]

### 17. Final account reconciliation

> Compare our final account statement with the subcontractor's. Produce a table of every line where the values differ, with both figures, the difference and the likely reason based on the documents. Total the agreed items, the disputed items and the gap. Data: [paste]

## Contract prompts

### 18. Contract clause summary

> Summarise the payment, variation, loss and expense, extension of time and termination provisions of this contract. For each give the clause number exactly as it appears, the obligation, any time limit and who it applies to. Quote time limits word for word. Flag every amendment to the standard form. Contract: [paste]

Use [Claude](/ai-tools/claude) for this one if you can. It handles long contract documents well and is strong at following quote-exactly rules.

### 19. NEC4 compensation event notification

> Draft a notification of a compensation event under NEC4 ECC for the event below. State the event, the date we became aware, the clause under which it is a compensation event (use the one I give), and that a quotation will follow. Keep it factual and short. Event: [paste]

Under NEC4 the Contractor generally has eight weeks to notify a compensation event once aware of it, so speed of drafting genuinely matters.

### 20. Early warning or relevant event notice

> Draft an early warning notice (NEC4) or a notice of delay (JCT, clause as I specify) for the issue below. Describe the issue, its likely effect on cost, time and quality, and propose a meeting. Factual tone, no admissions. Issue: [paste]

## Reporting prompts

### 21. Monthly cost report narrative

> Write the narrative for a monthly cost report to the client. Cover: anticipated final cost against budget, movement since last report, approved and pending changes, risk allowance drawdown, and key issues. Use only the figures given. Data: [paste]

### 22. Explain a commercial position to a non-QS

> Rewrite this commercial position for a client director with no construction background. Keep every figure. Explain what has happened, why the cost has moved, and what decision we need from them, in under 250 words. Text: [paste]

## Which AI tool for which QS task

| Task | Best tool | Why |
|------|-----------|-----|
| Contract and specification reading | Claude | Handles long documents and quotes accurately |
| Tender comparisons | Claude or ChatGPT | Both build clear tables; Claude is better on very long returns |
| Quick letters and notices | ChatGPT | Fast drafting and easy to iterate |
| Excel cost data and CVRs | Microsoft Copilot | Works directly inside your spreadsheets |
| Reading scanned drawings or photos | ChatGPT | Strong image understanding for quick checks |

See [ChatGPT for construction](/ai-tools/chatgpt) and [Claude for construction](/ai-tools/claude) for set-up advice, and the [general construction prompts guide](/guides/chatgpt-prompts-for-construction) for prompts other members of the team can use.

## Worked example: checking a drylining application in 40 minutes

**The job.** A 32-unit residential scheme in Nottingham, JCT Design and Build 2024 main contract, with the drylining package let on a JCT subcontract with 3 percent retention. The drylining subcontractor submits interim application 9.

**The application.** The subcontractor claims a cumulative gross value of £412,600: measured works £381,200 and variations £31,400.

**Without AI.** The package QS rekeys the application into their own spreadsheet, walks the site, cross-references every line against the progress notes and the variation register, then builds the valuation. Typically two and a half to three hours for a package this size.

**With AI.** The QS pastes the application, last month's valuation, their site walk notes and the variation register into Claude using prompt 12. In under a minute it returns a line by line table and flags two issues:

- Level 3 partitions are claimed at 100 percent complete. The site notes say 70 percent. Adjusting that line reduces measured works by £12,300, to £368,900.
- Two of the five variations claimed (worth £12,650 together) have no instruction in the register. Assessed variations drop from £31,400 to £18,750.

**The arithmetic, shown step by step.**

| Line | Applied | Assessed |
|------|---------|----------|
| Measured works | £381,200.00 | £368,900.00 |
| Variations | £31,400.00 | £18,750.00 |
| **Gross value** | **£412,600.00** | **£387,650.00** |
| Less retention at 3% | | £11,629.50 |
| Net cumulative | | £376,020.50 |
| Less previously certified | | £331,480.00 |
| **Due this period** | | **£44,540.50** |

**What the QS still did.** They checked the 70 percent figure against photos, confirmed with the site manager that the two variations really were never instructed, and checked the arithmetic. They then used prompt 14 to draft the payment notice and a short covering email explaining the two adjustments. Total time: about 40 minutes, with a cleaner audit trail than the manual version.

The AI did not decide anything. It did the comparison and the maths so the QS could spend their time on the two items that actually mattered.

## Rules for using AI safely as a QS

- **Never let it invent a rate.** Supply rates from your own cost data, BCIS, or the tender returns. Tell it to leave blanks where you have not.
- **Always ask for the arithmetic.** "Show every step" lets you check the maths in seconds. AI can still make calculation slips, especially on long tables.
- **Name the contract and edition.** JCT 2016 and JCT 2024 differ in places, and bespoke amendments change everything. Paste the amended clauses rather than relying on what the AI thinks the standard form says.
- **Protect commercial data.** Use a business account with training on your data switched off, and check your firm's policy before pasting client or tender information. Never paste one tenderer's prices into a query to another.
- **Keep the professional judgement.** RICS professional standards still apply to work you sign off. AI output is a first draft, not advice.
- **Save prompts that work.** Build a short library of your best prompts so the whole commercial team uses the same structure. The prompts in this guide are a good place to start, and new ones go out in our [free weekly newsletter](/newsletter).

## Frequently asked questions

### What are the best ChatGPT prompts for quantity surveyors?

The most useful are prompts that turn take-off notes into NRM2 bill items, compare tender returns into a single table of prices and qualifications, check interim applications against site progress, and draft variation assessments. The common thread is that each gives the AI the real data, a fixed output format and an instruction not to invent figures.

### Can ChatGPT price a bill of quantities?

Not reliably on its own. ChatGPT does not have access to current UK rates for your region, project size or market conditions, so any rates it produces are guesses. Use it to structure and word the bill, then apply rates from your own cost data, BCIS or tender returns.

### Does ChatGPT understand NRM1 and NRM2?

It has general knowledge of both and can structure output to NRM1 group elements or NRM2 work sections if you ask it to by name. It is not a substitute for the published RICS documents, so check that its descriptions and units match the rules your project uses.

### Is it safe to put tender returns into ChatGPT?

Only on a business account with data training switched off, and only if your company policy and any confidentiality terms in the tender allow it. Remove names where you can, and never share one tenderer's pricing with another through a query.

### Should a QS use ChatGPT or Claude?

Both work with the prompts in this guide. Claude tends to be better for long contracts, specifications and tender submissions because it reads large documents carefully and follows quoting rules well. ChatGPT is quick for letters, notices and short drafts. Many QS teams use both.

### Will AI replace quantity surveyors?

No. AI removes the formatting, rekeying and first-draft work, which can be a large share of a QS's week, but the commercial judgement, negotiation, contract interpretation and professional sign-off remain human work. QS teams who use AI well will simply get more done with the same headcount.
