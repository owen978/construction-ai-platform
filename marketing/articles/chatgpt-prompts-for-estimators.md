---
title: "ChatGPT Prompts for Estimators: 20 Copy-Paste Prompts for UK Construction Tenders"
slug: "chatgpt-prompts-for-estimators"
description: "The best ChatGPT prompts for estimators turn tender documents, drawings lists and subcontractor quotes into scope summaries, query lists, quote comparisons, preliminaries builds and tender qualifications. This guide gives you 20 copy-paste prompts built for UK tendering under NRM, with a worked example of levelling three subcontractor quotes."
difficulty: "beginner"
reading_time_minutes: 12
featured: false
sort_order: 29
meta_title: "20 ChatGPT Prompts for Construction Estimators (UK)"
meta_description: "20 copy-paste ChatGPT prompts for UK construction estimators: tender reviews, RFIs, quote levelling, preliminaries, risk allowances and qualifications."
---

**ChatGPT prompts for estimators** are structured instructions that get ChatGPT, Claude or Copilot to handle the reading, sorting and writing side of pricing construction work: summarising a tender pack, listing what is missing from the drawings, levelling subcontractor quotes, building a preliminaries schedule or drafting tender qualifications. The prompts that work give the AI five things: an estimator role, the real documents or figures, the tender context (procurement route, contract form, measurement basis such as NRM2), a fixed output format, and an instruction never to invent rates or quantities. The estimator still owns every number. The AI clears the admin so you spend tender time on pricing judgement, not copy and paste.

This guide gives you 20 copy-paste prompts grouped by the stages of a tender, a worked UK example of levelling three groundworks quotes, and the rules that stop AI from putting a made-up rate into a live bid. For the wider picture of AI in the role, start with our [estimator hub](/ai-for/estimator).

## Why estimators get so much from AI (and where it goes wrong)

An estimator's week is mostly reading. A mid-sized tender can arrive with 200 drawings, a 90-page specification, a set of employer's requirements, a pre-construction information pack and a contract with amendments, all due back in three weeks. Before a single rate goes in, someone has to find the scope, spot the gaps and get enquiries out to the supply chain. That reading and sorting is where AI earns its keep.

But estimating has three features that make lazy prompts dangerous:

- **The numbers are commercial commitments.** A tender sum, once accepted, is what you build for. If an AI quietly fills a gap with a rate it found plausible, that guess can become a loss on site.
- **Exclusions decide margins.** The difference between a profitable job and a painful one is often in what a subcontractor left out of their quote. AI is very good at finding those gaps, but only if you ask it to look.
- **Rates go out of date fast.** General AI tools have no reliable view of current UK material and labour prices. Use them to structure and check, never as a price book.

So every prompt below gives the AI your real documents, fixes the format and includes a guardrail. If you want the bigger strategic picture first, read our guide to [AI construction estimating](/guides/ai-construction-estimating).

## The estimator prompt formula

| Part | What it does | Example wording |
|------|--------------|-----------------|
| **Role** | Sets expertise and UK context | "You are a senior estimator at a UK main contractor pricing a design and build tender." |
| **Documents** | Gives the AI the real source material | "Here is the specification section for external works and the drawing register." |
| **Context** | Names the route, contract and measurement basis | "Two-stage tender, JCT Design and Build 2024, measured to NRM2." |
| **Format** | Fixes the output shape | "Return a table: item, drawing ref, spec clause, query, priority." |
| **Guardrails** | Stops invented numbers | "Do not suggest rates or quantities. Write [CHECK] where the documents are unclear." |

The guardrail is the line that matters. "Do not suggest rates" sounds obvious, but without it most AI tools will happily fill a blank with a confident-looking figure.

### Getting tender documents into the AI

- **Paste text, not just file names.** Copy the specification section or the scope clauses directly. If your tool accepts PDFs, upload one section at a time rather than a 300-page pack.
- **Work package by package.** Ask about groundworks, then frame, then envelope. Smaller inputs give sharper answers and fewer missed items.
- **Strip client confidential details** if your company AI policy requires it. Project names and addresses rarely matter to the output.
- **Use Claude for long documents.** It handles large specifications and full contract documents well. Our [Claude guide](/ai-tools/claude) covers setup.

## Tender review prompts

### 1. Tender pack summary

> You are a senior estimator at a UK main contractor. Summarise this tender invitation and the documents listed below into a one-page bid summary: client, project, location, procurement route, contract form and amendments, tender return date and time, mid-tender interview dates, site visit, form of tender, required submissions (pricing document, programme, method statements, quality questions), and evaluation weighting between price and quality. Write [CHECK] where anything is missing or unclear. Documents: [paste]

### 2. Scope extraction by package

> Read the specification and employer's requirements below for [package, e.g. external works]. List every item of scope as a table: item, description, spec clause, drawing reference, and whether it is clearly measurable or needs a query. Do not price anything. Do not add items that are not in the documents. Text: [paste]

### 3. Drawing register gap check

> Here is the drawing register and the specification contents. Identify any element the specification describes that has no corresponding drawing, any drawing marked "preliminary", "not for construction" or with an old revision, and any discipline (structural, MEP, landscape) that seems to be missing. Return a numbered list. Register and contents: [paste]

### 4. Contract amendments risk review

> You are an estimator reviewing the contract amendments for pricing risk. From the schedule of amendments below, list each amendment that shifts risk to the contractor (for example design responsibility, ground conditions, liquidated damages, payment terms, fluctuations, retention). For each, state the risk in one line and whether it needs a price allowance, a qualification or a commercial manager review. Do not give legal advice. Amendments: [paste]

For a deeper contract read, the [variation assessment workflow](/ai-workflows/write-variation-assessment) shows how the same approach works post-contract.

### 5. Pre-construction information hazards for pricing

> Read this pre-construction information pack issued under CDM 2015. List every hazard or site constraint that affects price or programme: access restrictions, working hours, asbestos, live services, contamination, adjacent occupied buildings, crane limits, traffic management. For each, say which package it affects. Text: [paste]

### 6. Tender query list (RFIs)

> From the scope table and gap check below, draft a tender query list to send to the client's quantity surveyor. Number each query, quote the document and clause, ask one clear question per query, and suggest an assumption we will price on if no answer is received before the return date. Professional, concise tone. Input: [paste]

## Supply chain and enquiry prompts

### 7. Subcontract enquiry letter

> Draft a subcontract enquiry for [package] on this project. Include: project summary, scope of works, the documents attached, the contract form and key amendments being passed down, programme dates for the package, attendance we will provide, the return date, and a request to price on the attached pricing schedule and state all exclusions and assumptions. Facts: [paste]

### 8. Package pricing schedule

> Turn this scope table into a pricing schedule a subcontractor can fill in. Columns: ref, description, unit, quantity, rate, total. Leave rate and total blank. Where the quantity is not in my input, leave it blank and mark [CHECK]. Group items under NRM2 work section headings. Scope: [paste]

### 9. Chase email for late quotes

> Write a short, polite chase email to subcontractors who have not yet returned a quote for [package]. Remind them of the return date and time, ask them to confirm whether they intend to price, and offer a quick call if they have questions on the scope. Under 100 words.

## Pricing and analysis prompts

### 10. Subcontractor quote levelling

> You are a UK estimator levelling subcontract quotes for [package]. Compare the quotes below against our scope table. Return: (1) a table with one row per scope item and one column per subcontractor showing included, excluded or not stated; (2) a list of every exclusion and qualification per subcontractor; (3) the items we would need to add to each quote to make them comparable, marked [PRICE NEEDED]. Do not suggest values for the missing items. Scope and quotes: [paste]

This is the single biggest time saver in a tender. The [analyse tender returns workflow](/ai-workflows/analyse-tender-returns) gives an extended version, and the [tender evaluation template](/templates/tender-evaluation) gives you a scoring layout.

### 11. Preliminaries build-up checklist

> Create a preliminaries checklist for a [project type, value, duration] project using the NRM2 preliminaries headings: employer's requirements and the main contractor's cost items such as site management and staff, site establishment, temporary services, security, safety and environmental protection, control and protection, mechanical plant, temporary works, site records, completion and post-completion, cleaning, fees and charges, and insurances. For each heading list the typical items I need to consider. Do not suggest costs. Project: [paste]

### 12. Staff and time-related prelims table

> From the programme dates below, build a staff and site set-up table for preliminaries: role or item, start week, end week, number of weeks, and a blank weekly rate column. Include project manager, site manager, assistant site manager, quantity surveyor, welfare cabins, hoarding and security. Leave every rate blank. Programme: [paste]

### 13. Risk register for the bid

> From the tender review notes below, create a pricing risk register: risk, cause, effect, likelihood (1 to 5), impact (1 to 5), score, and treatment (price, qualify, exclude or accept). Do not assign money values. Sort by score. Notes: [paste]

Our [project risk register workflow](/ai-workflows/generate-project-risk-register) covers how to carry this into the delivery phase.

### 14. Early cost plan structure

> Lay out a preliminary cost plan structure for a [building type, GIFA] using NRM1 group elements: facilitating works, substructure, superstructure, internal finishes, fittings, services, prefabricated buildings, work to existing buildings, external works, then main contractor's preliminaries, overheads and profit, project and design team fees, other development costs, risk allowances and inflation. Leave all values blank for me to complete from our own cost data or BCIS. Brief: [paste]

The [generate preliminary cost plan workflow](/ai-workflows/generate-preliminary-cost-plan), our [construction cost plan guide](/guides/construction-cost-plan-guide) and the [free cost plan template](/templates/cost-plan) take this further.

### 15. Rate build-up sense check

> Here is my build-up for [item]: labour hours and gang, plant, materials with waste factor, and the resulting rate. Check the arithmetic, flag any component that seems to be missing (for example waste, overtime, small plant, disposal), and point out any unit mismatch. Do not tell me whether the rate is high or low. Build-up: [paste]

## Bid finalisation prompts

### 16. Tender qualifications and clarifications

> From our assumptions log and quote exclusions below, draft a schedule of tender qualifications and clarifications for submission. Number each item, write it in neutral contractual language, and group under: general, design, programme, scope, commercial. Remove anything that duplicates the tender documents. Input: [paste]

### 17. Tender adjudication summary

> Write a two-page tender adjudication summary for the directors: project overview, contract and risk position, tender sum broken into net cost, preliminaries, risk and margin (using my figures exactly), key subcontract packages and how competitive they are, main qualifications, top five risks, and a recommendation section left blank for me. Figures and notes: [paste]

### 18. Quality question first draft

> Draft a response to this tender quality question within [word limit]. Use only the evidence I give you about our approach, past projects and people. Structure it to mirror the scoring criteria. Where a criterion has no evidence from me, write [EVIDENCE NEEDED] instead of making something up. Question, criteria and evidence: [paste]

For qualification stage questions, see our [PQQ and PAS 91 guide](/guides/construction-pqq-pas91-guide).

### 19. Lessons learned after a result

> We [won or lost] this tender. From the feedback and our scores below, write a short lessons learned note: what scored well, what lost marks, how our price compared, and three specific changes for the next similar bid. Feedback: [paste]

### 20. Handover from estimating to delivery

> Write an estimating to delivery handover note for the project team: tender sum make-up, key assumptions, qualifications, subcontractors priced and their exclusions, allowances held for risk, and items the delivery team must buy carefully. Use only my notes. Notes: [paste]

## Prompt quality compared: weak vs strong

| | Weak prompt | Strong prompt |
|---|-------------|---------------|
| **Example** | "Compare these three quotes." | Prompt 10 above, with your scope table and quotes pasted in |
| **Source material** | Quotes only, no scope baseline | Quotes measured against your own scope table |
| **Context** | No package, contract or measurement basis | Package, contract terms and NRM2 grouping named |
| **Format** | Whatever the AI decides | Included / excluded / not stated grid plus exclusions list |
| **Guardrails** | None, so it may "estimate" missing items | "Do not suggest values", [PRICE NEEDED] markers |
| **Commercial risk** | High: cheapest quote looks cheapest | Low: true like-for-like comparison |
| **Time to levelled package** | 2 to 3 hours by hand | 20 to 30 minutes including checking |

## Worked example: levelling three groundworks quotes

Here is prompt 10 on a real-style tender.

**The project:** a two-storey, 1,850 m² GIFA primary school extension in Nottinghamshire. Single-stage design and build tender under JCT Design and Build 2024, measured to NRM2, 52-week programme. The main contractor will be principal contractor under CDM 2015.

**The scope table for groundworks** had 14 items, including site clearance, reduced level dig, muck away, piling mat, pile caps and ground beams, ground-bearing slab, below-ground drainage, attenuation tank, external hardstandings and kerbs, and dewatering if needed.

**The three quotes (illustrative figures):**

- Groundworks A: £412,000
- Groundworks B: £448,500
- Groundworks C: £439,000

On headline price, A looks £27,000 cheaper than its nearest rival.

**What the AI produced (extract):**

| Scope item | A | B | C |
|------------|---|---|---|
| Reduced level dig | Included | Included | Included |
| Muck away (inert) | Included | Included | Included |
| Muck away (contaminated) | Excluded | Not stated | Included, provisional |
| Piling mat | Excluded | Included | Included |
| Attenuation tank | Included | Included | Included |
| Dewatering | Excluded | Excluded | Not stated |
| Traffic management | Not stated | Included | Included |

**Exclusions flagged for A:** piling mat, contaminated muck away, dewatering, traffic management not stated, price valid 30 days only, no allowance for working within the school's term-time restricted hours.

**Items to add to make A comparable:** piling mat [PRICE NEEDED], contaminated muck away [PRICE NEEDED], traffic management [PRICE NEEDED], restricted hours uplift [PRICE NEEDED].

The estimator then priced those gaps from the company's own cost data and the site investigation report. Once the piling mat and traffic management were added, A was no longer the cheapest. The real comparison was between B and C, and C's provisional sum for contaminated material was the deciding factor given the site investigation results.

Notice what the AI did not do: it did not guess what a piling mat costs. It found the gap and left the number to the person accountable for it. Total time: about 25 minutes from three PDFs to a levelled package, against two to three hours by hand.

## Rules for using AI safely as an estimator

- **Never accept an AI rate.** Use your company's cost data, current supplier quotes and recognised benchmarks such as BCIS. Treat any figure the AI offers as a prompt to check, not a price.
- **Always level against your own scope.** Comparing quotes to each other hides what they all missed. Compare each to the scope table.
- **Check the arithmetic yourself.** AI can make simple maths errors in long tables. Recalculate totals in a spreadsheet before anything goes into the tender sum.
- **Keep the source documents.** The tender pack, quotes and query responses are the record. The AI output sits on top of them, not in place of them.
- **Respect confidentiality.** Subcontractor prices are commercially sensitive. Use approved tools only and follow your company's AI policy.
- **Save the prompts that work.** Build a library for your company's formats so every estimator levels quotes the same way.

Want more? The [quantity surveyor prompts](/guides/chatgpt-prompts-for-quantity-surveyors) pair well with the pricing section above, the [bill of quantities workflow](/ai-workflows/generate-bill-of-quantities) helps with measurement, our [AI tender analysis guide](/guides/ai-tender-analysis-guide) covers tender evaluation in depth, our full [ChatGPT prompts for construction](/guides/chatgpt-prompts-for-construction) library covers every role, and new prompts go out every week in our [free newsletter](/newsletter).

## Frequently asked questions

### What are the best ChatGPT prompts for construction estimators?

The most useful prompts cover the reading and admin that fills a tender period: summarising the tender pack, extracting scope by package, finding drawing gaps, drafting tender queries, writing subcontract enquiries, levelling quotes, building a preliminaries checklist and drafting qualifications. The best prompts give the AI an estimator role, the real documents, the procurement and contract context, a fixed format and an instruction never to invent rates or quantities.

### Can ChatGPT price a construction job?

Not reliably. General AI tools do not have accurate, current UK material and labour rates, and they will sometimes produce confident figures that are simply wrong. Use AI to structure the estimate, check build-ups, level quotes and find missing scope. The rates must come from your own cost data, live supplier and subcontractor quotes, and benchmarks such as BCIS.

### Can AI do quantity take-off from drawings?

Some specialist take-off tools now use AI to measure from PDF drawings, and general tools like ChatGPT and Claude can read a drawing and describe what is on it. For tender quantities you should still measure in a proper take-off tool and check the output. See our [material take-off hub](/ai-for/material-takeoff) for the tools and methods that work.

### Is it safe to paste subcontractor quotes into ChatGPT?

Subcontractor prices are commercially confidential, so follow your company's AI policy and use an approved business account where data is not used for training. Many contractors use Microsoft Copilot or a business tier of ChatGPT or Claude for this reason. If in doubt, remove company names and replace them with A, B and C before pasting.

### Do these prompts work with NRM1 and NRM2?

Yes. Naming the measurement standard in the prompt tells the AI how to group and describe items. Ask for NRM1 group elements when building an early cost plan and NRM2 work sections when building a pricing schedule or bill. The AI understands both structures, but always check its grouping against the RICS standard your client has specified.

### How much time can AI save an estimator?

The biggest savings are on tender reviews, query lists, enquiry letters and quote levelling. Levelling a package of three quotes typically drops from two or three hours to under half an hour, and a tender pack summary drops from half a day to an hour including checking. Across a tender period that can free a day or more for the pricing decisions that actually win work.
