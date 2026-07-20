#!/usr/bin/env node
/**
 * enrich-batch3.mjs — indexing remediation, run 3.
 *
 * Usage:  node scripts/enrich-batch3.mjs [--dry-run]
 *
 * Covers: 1 workflow, 2 tools, 3 tasks (/ai-for/ hub pages).
 * Upserts by slug, same pattern as scripts/enrich-batch2.mjs. Never inserts.
 *
 * All long-form fields render as plain text under whitespace-pre-wrap, so no
 * markdown syntax in these strings.
 */

import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@supabase/supabase-js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

function loadEnv() {
  const env = {}
  try {
    const raw = readFileSync(resolve(ROOT, '.env.local'), 'utf8')
    for (const line of raw.split('\n')) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
      if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim()
    }
  } catch {
    /* fall back to process.env */
  }
  return { ...env, ...process.env }
}

// ── /ai-workflows/draft-pre-qualification-questionnaire ─────────────

const PQQ_LONG = `This workflow drafts a Pre-Qualification Questionnaire: the document you send to subcontractors and suppliers before you let them anywhere near a tender list.

A PQQ answers one question. Can this firm actually do this work, and will they still be trading when it completes?

Most PQQs in circulation are somebody's old one with the dates changed. They ask for three years of accounts and never read them, demand ISO 9001 from a two-man groundworks outfit that will never have it, and score everyone at 70 percent because nobody agreed what the scoring meant. The output is a filing exercise that filters nothing.

The prompt produces a structured questionnaire across the standard areas: company information, financial standing, experience, resources, health and safety, quality, environmental, insurance, and the declarations. Aligned to PAS 91 where that is useful.

WHEN TO USE THIS

Use it when you are setting up a supply chain from scratch, or opening a new trade you have not bought before.

Use it for framework prequalification, where you are building a list you will draw from for two or three years and the quality of that list determines a lot of your delivery risk.

Use it when your existing PQQ is old. Anything drafted before the Building Safety Act 2022 will not ask the right competence questions for higher-risk buildings, and anything drafted before 2015 predates CDM 2015 duties entirely.

Use it when you have been burned. The honest trigger for most PQQ reviews is a subcontractor going under mid-package, and the question afterwards is always whether the warning signs were in the return and nobody looked.

WHEN NOT TO USE THIS

Do not send a full PQQ for a small package. A £15,000 job does not warrant a 40-question document, and sending one to a good local firm is a fast way to get no return at all. Small trades bin PQQs. Ask for insurances, accreditations, two references and proof they have done it before.

Do not use it where a recognised scheme already does the job. If a firm holds SSIP membership through CHAS, SafeContractor or SMAS, that is the point of the scheme: accept the certificate and stop re-asking the health and safety questions. Making a firm answer 30 H&S questions they have already answered for SSIP is exactly the duplication PAS 91 was written to reduce.

Do not use a PQQ to do a tender's job. Prequalification asks whether they are capable. It does not ask what they will charge or how they will build it. Questions about programme, method and price belong in the ITT, and asking them at PQQ stage means you are evaluating a bid from firms you have not yet qualified.

And do not use a generic PQQ on higher-risk buildings. Under the Building Safety Act regime, competence assessment for work on higher-risk buildings is a specific duty with specific requirements, and a general capability questionnaire does not discharge it. Get that one right with advice rather than a template.

COMMON MISTAKES

Asking for information you will not read. Every question costs the respondent time and costs you assessment time. If three years of full accounts arrive and nobody in your business will open them, ask instead for the two or three ratios you actually care about. A PQQ nobody assesses is worse than no PQQ, because it creates a record suggesting you checked.

Setting thresholds that exclude the firms you want. A minimum £5m turnover on a £200,000 package rules out most specialist subcontractors, who are frequently the best ones. The usual rule of thumb is that your package should not exceed roughly 20 to 25 percent of a subcontractor's annual turnover, and that is a guide rather than a rule. Set the threshold from the package, not from a template.

No scoring methodology. If you have not decided before issue what a good answer looks like, you will score on impression. Write the scoring guidance at the same time as the questions, and if two people are assessing, have them score independently before comparing.

FREQUENTLY ASKED QUESTIONS

Is PAS 91 still current?

PAS 91:2013+A1:2017 is the standard set of prequalification questions for UK construction, and it was withdrawn by BSI in 2022 rather than replaced. That leaves an awkward position: it is no longer maintained, but it is still widely referenced and its structure is still the common language of prequalification, particularly through SSIP schemes that were built around it. Treat it as a sensible structure rather than a live standard, and be aware that on public work the Procurement Act 2023 regime governs, and on higher-risk buildings the Building Safety Act competence requirements apply on top.

What financial checks should a PQQ actually include?

Turnover and profit for three years, so you can see the trend rather than one year. A credit reference, since a deteriorating score is a much earlier warning than filed accounts. Confirmation that accounts are filed on time, because late filing is a genuine red flag. Any CCJs, winding-up petitions or insolvency proceedings. And the ratio that matters most: your package value against their annual turnover. A subcontractor taking on a job worth 60 percent of their turnover is a risk regardless of how healthy the accounts look.

Can AI assess the returns as well as draft the questionnaire?

It can help enormously with the reading and not at all with the deciding. Give it ten returns and ask it to build a comparison table of accreditations held, turnover, incident rates and gaps, and it will save you a day. What it cannot do is judge whether a firm with one poor year and a good explanation is a better bet than a firm with flat numbers and no explanation. That is a commercial judgement, and if a firm is excluded on the back of it you need a human who can say why.

How long should a PQQ be?

As short as your risk allows. A useful discipline: for every question, name who reads the answer and what decision it changes. Questions that fail that test get cut. Most PQQs could lose a third of their content and filter just as well, and a shorter one gets better returns from the firms you actually want.

How often should prequalification be refreshed?

Annually for financial and insurance information, since both go stale fast and both are how you catch a firm in trouble. Accreditations get checked at their expiry dates. Experience and capacity only need revisiting when something changes, such as a firm losing key staff or moving into a sector they have not worked in. The failure mode is a framework list qualified in year one and never revisited, where by year three you are drawing from a list that describes companies as they were.`

const PQQ_EXAMPLE = `WORKED EXAMPLE: GROUNDWORKS SUBCONTRACTOR, HOUSING FRAMEWORK

── WHAT GOES IN ──

Purpose: Prequalification of groundworks subcontractors for a two-year housing framework
Project: Framework, not project specific
Package / Trade: Groundworks and external works, including drainage and substructure
Estimated Value: £150k to £900k per site, 4 to 6 sites per year

Specific requirements:
- Must hold current SSIP membership (any recognised scheme)
- Must have completed at least three residential schemes of 20+ units in the last 5 years
- Sector Scheme accreditation for drainage adoption work, since several sites will be S104
- We are the principal contractor on all sites, so CDM 2015 subcontractor duties apply
- Package values will run up to £900k, so turnover threshold set at £3.6M (package not to exceed 25% of turnover)

── WHAT COMES OUT (extract) ──

PRE-QUALIFICATION QUESTIONNAIRE
Groundworks and External Works, Housing Framework 2027-2029
Issued by: [Contractor], Principal Contractor
Return by: [date]

SCORING GUIDANCE
Sections 1, 8, 9 and 10 are pass/fail. A fail in any of these excludes the return from further assessment.
Sections 2 to 7 are scored 0-4:
0 = no response or wholly inadequate
1 = significant concerns, would require specific mitigation
2 = acceptable, meets our minimum requirement
3 = good, evidenced
4 = strong, evidenced with examples
Weighting: Financial 25%, Experience 25%, Resources 20%, H&S 20%, Quality 5%, Environmental 5%.
Minimum threshold for framework inclusion: 60% overall, with no individual section below 2.

SECTION 1: COMPANY INFORMATION (PASS/FAIL)
1.1 Registered company name, number and registered address
1.2 Trading address if different
1.3 Year established, and years trading in groundworks specifically
1.4 Company structure
1.5 Parent or holding company, and whether any guarantee is offered
1.6 Key contact for this framework

SECTION 2: FINANCIAL STANDING (25%)
2.1 Turnover, last 3 financial years
2.2 Pre-tax profit, last 3 financial years
2.3 Current credit reference score and provider
2.4 Confirmation that statutory accounts are filed and up to date
2.5 Any CCJs, winding-up petitions, administration or insolvency proceedings in the last 3 years. If yes, give details.
2.6 Largest single contract value undertaken in the last 3 years
2.7 Current committed order book and the period it covers

Assessment note: 2.1 against 2.6 and 2.7 is the question that matters. A firm with £4M turnover whose largest contract has been £200k is being asked to take a step up at £900k, and that is a conversation, not necessarily a rejection.

SECTION 3: RELEVANT EXPERIENCE (25%)
3.1 Three residential schemes of 20+ units completed in the last 5 years. For each: client, value, unit numbers, scope, start and completion dates, and whether completed to programme.
3.2 Two client references, with contact details, whom we may approach.
3.3 Experience of S104 drainage adoption, with the adopting authority named.
3.4 Any scheme in the last 5 years terminated, or completed more than 8 weeks late. If yes, give details.

Assessment note: 3.4 is the question most PQQs leave out and the one that tells you most. A firm that answers it honestly with a decent explanation scores better here than a firm that leaves it blank.

SECTION 5: HEALTH AND SAFETY (20%)
5.1 SSIP membership: scheme, registration number, expiry date. (Where held, sections 5.4 to 5.7 need not be completed.)
5.2 RIDDOR reportable incidents, last 3 years, with AFR based on hours worked
5.3 Any HSE enforcement notice or prosecution in the last 5 years. If yes, give details and the remedial action taken.
5.4-5.7 [H&S policy, risk assessment arrangements, competence, consultation. Waived where SSIP held per 5.1.]
5.8 Percentage of operatives holding a current CSCS card appropriate to their role
5.9 Named person responsible for H&S, and their qualifications
5.10 Arrangements for temporary works, including who acts as Temporary Works Coordinator on excavation and deep drainage

Assessment note: 5.10 is trade-specific and deliberately so. On groundworks the excavation and temporary works arrangements are where people get killed, and a generic PQQ never asks about them.

SECTION 8: INSURANCE (PASS/FAIL)
8.1 Employers' liability, minimum £10M. Insurer, policy number, expiry.
8.2 Public liability, minimum £5M. Insurer, policy number, expiry.
8.3 Contractors' all risks, where applicable.
8.4 Confirmation that cover will be maintained for the framework duration and evidence provided annually.

── WHAT THE AI GOT RIGHT, AND WHAT IT DIDN'T ──

It produced the full structure, wrote sensible scoring guidance, and correctly applied the SSIP waiver at 5.1 so respondents are not asked to re-evidence health and safety they have already certified. That waiver alone takes a chunk out of the response burden and it came from telling the prompt that SSIP was mandatory.

Three things needed a human.

The £3.6M turnover threshold came from us, not the AI. It was calculated from the package: £900k maximum at 25 percent. Left to itself the AI proposed £5M, which is a round number with no reasoning behind it and would have excluded several good regional groundworkers.

Question 5.10 on temporary works coordination is trade-specific and had to be added. The AI produced a competent generic H&S section. It does not know that on groundworks the excavation collapse risk is the one that matters, because nothing in the prompt told it.

Question 3.4, on terminated or late schemes, needed adding too. The AI's experience section asked for three successful projects, which is what every PQQ asks and which nobody fails. Asking about the failures is where the information is.

That is the pattern across all of this. The AI gives you a complete, competent, generic document in two minutes. The value you add is the three trade-specific questions that turn it into a filter.`

const PQQ_USE_CASE = `Use when you need a prequalification questionnaire for a new trade, a framework, or a supply chain refresh, and you want a complete structure rather than last year's document with the dates changed.

Give it the trade, the package value range, and any mandatory requirements such as SSIP membership or sector accreditations. Set the turnover threshold from your package value rather than accepting a round number, since the usual guide is that a package should not exceed roughly 20 to 25 percent of a subcontractor's annual turnover.

Then add the two or three trade-specific questions the AI will not know to ask. On groundworks that is temporary works and excavation. On roofing it is working at height and edge protection. On M&E it is commissioning and competency. Those questions are what turn a generic document into something that actually filters.`

// ── /ai-tools/procore ───────────────────────────────────────────────

const PROCORE_LONG = `Procore is the platform a lot of UK construction runs on, and it is worth being clear about what it is before talking about AI: it is a construction management system, not an AI tool. Drawings, RFIs, submittals, daily logs, snagging, commercial data, all in one place with a decent mobile app.

The AI sits on top of that. Which is exactly why it is interesting, and also why it can disappoint.

WHY THE AI IS DIFFERENT FROM A CHATBOT

A general AI tool knows nothing about your project until you tell it. Every prompt starts from zero, you paste in context, and it gives you something generic back.

Procore's AI already has your project. It knows the RFI log, the drawing revisions, the daily logs, who is on site. When it suggests something, it is drawing on your data rather than on general knowledge about construction.

That is a real advantage and it is the honest reason to care. Ask ChatGPT to summarise your open RFIs and you cannot, because it has never seen them. Ask a tool sitting on your project data and it can.

The flip side is that it is only as good as what your team put in. A site running Procore properly, with daily logs completed and RFIs logged as they arise, gets useful output. A site where half the team still emails drawings and the daily log gets filled in on Friday for the whole week gets AI suggestions built on a fiction. Garbage in applies with more force here than anywhere, because the output looks authoritative.

WHAT IT IS GENUINELY USEFUL FOR

Document search across a project. Finding the drawing revision that changed a detail, or every RFI that touched a particular grid line, across thousands of documents. This is unglamorous and it is where most of the time saving actually is.

Daily log assistance. Turning brief field notes into a complete record, prompting for what is missing. The value is not the writing, it is that a complete daily log is worth a great deal in a delay claim and an incomplete one is worth almost nothing.

Surfacing risk patterns. Flagging that a package has an unusual number of open RFIs, or that a subcontractor's snag rate is climbing. It does not tell you anything an attentive PM would not spot. It tells you across twelve projects at once, which no PM can.

Document comparison across revisions. What changed between Rev C and Rev D. Genuinely useful and genuinely tedious to do by eye.

THE HONEST LIMITS

It will not fix bad process. If your team does not log RFIs promptly, no AI feature will produce a reliable RFI analysis. Procore's AI amplifies whatever discipline you already have.

The commercial side is weaker in the UK than the US. Procore was built American-first and it shows in the financial modules: the vocabulary is change orders and pay applications rather than variations, valuations and payment notices, and the underlying assumptions do not map cleanly onto JCT or NEC4 payment mechanisms. Plenty of UK contractors run Procore for document and field management while keeping commercial in a separate system. That is a sensible pattern rather than an admission of defeat.

Feature availability moves and varies by tier. AI capabilities have been rolling out steadily and what is included depends on your product tier and region. Anything specific you read about it, including this, needs checking against what is actually in your account.

WHAT IT COSTS, ROUGHLY

Procore does not publish list pricing. It is quoted per customer, typically based on annual construction volume rather than user seats, which is unusual and matters: adding users does not increase the cost, so there is no reason to ration access. That model suits main contractors with a lot of occasional users and suits small subcontractors much less well.

For a UK regional contractor, expect a five-figure annual commitment and expect the implementation to need real internal effort. It is not a tool you buy and switch on.

WHO IT SUITS

Main contractors and larger subcontractors running multiple projects with real document volume. That is the sweet spot, and if you are already there the AI features are a reason to use what you are paying for rather than a reason to buy.

It suits you much less if you are a small subcontractor, if your projects are short, or if your commercial process is the thing you most want to fix. A two-man fit-out firm does not need this.

FREQUENTLY ASKED QUESTIONS

Is Procore worth it for a UK contractor specifically?

For document control, drawing management, RFIs and field data, it is strong and the UK presence is now well established. The caveat is commercial. The financial tools were designed around US contracting practice, and if you are running NEC4 with compensation events and defined cost, or JCT with interim valuations and payment notices, you will find yourself adapting. Many UK firms use it for what it is good at and keep commercial elsewhere. Ask any vendor specifically how their system handles the payment notice regime under the Construction Act, and judge the answer.

Does Procore replace ChatGPT or Claude?

No, they do different jobs. Procore's AI works on your project data and cannot help you draft a contractual letter from scratch. A general AI tool drafts beautifully and knows nothing about your project. Most people who use both use Procore to find and organise, and a general tool to write. The gap is closing but it is not closed.

Can Procore's AI write my RFI responses?

It can help draft, and the same rule applies as anywhere else: an RFI response is a design decision on the record, and it needs a competent person to own it. The genuine advantage over a general AI tool is that it can pull the relevant drawings and prior correspondence into the draft, which is the part that takes you longest. The judgement is still yours.

Is our project data safe in it?

Procore is an established enterprise platform with the certifications you would expect, and the practical questions are the ones you should ask any vendor: where is the data hosted, what happens to it if you leave, and specifically whether your project data is used to train models. Get that last one answered in writing rather than from a sales conversation, and check it against your client's requirements, since some public sector and defence clients have specific rules about where project data sits.

What is the biggest reason implementations fail?

Not the software. It is running Procore alongside the old way of working, so half the team uses it and half still emails drawings, and the data in the system stops being trustworthy. At that point the AI features become actively misleading, because they report confidently on an incomplete picture. Whoever leads the implementation needs the authority to insist it is the only route, and that is an organisational decision rather than a software one.`

// ── /ai-tools/bluebeam-revu ─────────────────────────────────────────

const BLUEBEAM_LONG = `Bluebeam Revu is the tool most UK quantity surveyors and estimators actually spend their day in. PDF markup, measurement, drawing comparison, and a shared review session that works.

It is not really an AI tool and it is worth saying so plainly. Bluebeam has automation features, some of them genuinely clever, and the marketing increasingly calls them AI. Most of what makes Bluebeam valuable is good, mature software engineering rather than machine learning.

That is not a criticism. For measurement work, deterministic beats clever.

WHAT IT IS ACTUALLY FOR

Measurement and takeoff. Calibrate a drawing to a known dimension, then measure lengths, areas, volumes and counts directly on the PDF, with the quantities dropping into a table you can export. For a QS pricing off drawings this is the core function and it is what justifies the licence.

Drawing comparison. Overlay Rev C against Rev D and every change is highlighted. If you have ever missed a drawing change that arrived in a batch of forty and found out on site, you already know what this is worth. This one feature has probably prevented more variations arguments than anything else in the software.

Markup and shared review. Multiple people marking up the same drawing set, with a searchable markup list. Better than emailing PDFs back and forth, which is still what a lot of the industry does.

Snagging. Markups on a drawing become a snag list with locations, exported to a report.

WHERE THE AUTOMATION HELPS

Visual search. Pick a symbol, say a double socket, and it finds every instance across the drawing set and counts them. On an electrical takeoff this turns an hour of clicking into a couple of minutes.

The important caveat: it finds what matches visually. It does not know what a socket is. Change the symbol between drawing sets, or run it across a set with inconsistent conventions, and it will quietly under-count. Always spot-check a sample against a manual count on a page or two before trusting a total.

Automatic quantity counting and dynamic fill for irregular areas. Both save real time on complex shapes.

Batch operations across hundreds of sheets. Deeply unglamorous and it is where the hours go.

WHAT IT WILL NOT DO

It will not read a specification and tell you what to measure. Measurement rules are your job, and if you are measuring to NRM2 the tool has no opinion about whether you have applied it correctly.

It will not catch a calibration error. This is the one that actually costs money. Calibrate to the wrong scale and every quantity you take off is wrong by a consistent factor, and the output looks completely normal. Calibrate against a known dimension on every sheet, not just the first, because drawing sets are not always consistently scaled.

It will not measure from a scanned or poor-quality PDF reliably. Vector PDFs exported from CAD behave well. A scan of a drawing behaves badly, and a photograph of a drawing behaves worse.

It is not a cost database. It gives you quantities. Rates are yours.

WHAT IT COSTS

Bluebeam moved to a subscription model, with tiers roughly from around £200 to £400 per user per year depending on the tier and whether you need the full measurement and comparison feature set. The higher tiers are where the takeoff and Studio collaboration features sit, which for a QS is the whole point.

Check current pricing directly, since the tiering has changed more than once and UK pricing moves with the exchange rate. For a working QS or estimator it is one of the easier software cases to make, because the measurement time saved covers it inside a month.

BLUEBEAM VERSUS THE ALTERNATIVES

Against Adobe Acrobat, Bluebeam wins comfortably for construction because of measurement and comparison. Acrobat is a general PDF tool.

Against dedicated takeoff packages such as Cubit or CostX, it depends what you need. Those are built as estimating systems with rate libraries and BoQ generation. Bluebeam is a markup and measurement tool that exports to your spreadsheet. If your estimating already lives in Excel, Bluebeam fits how you work. If you want an integrated estimating system, look at the dedicated packages.

Against measuring from a model, if you have a reliable federated model, quantities from the model beat quantities from drawings. In UK practice, on refurbishment and on a lot of mid-size new build, you are still measuring from drawings, which is why Bluebeam remains the default.

FREQUENTLY ASKED QUESTIONS

Does Bluebeam actually have AI, or is that marketing?

Both, and the honest split matters. Features like visual search and automatic count use pattern recognition, which is reasonably described as AI. The measurement engine, comparison and markup tools are conventional software. Very little of Bluebeam is a language model, so if you are expecting something that answers questions about your drawings in plain English, that is not what this is. What it is instead is a mature measurement tool with some smart automation, and for takeoff that is the more useful thing.

Can I trust automated quantity counts?

Trust them after you have checked them, and check by sampling. Take one or two representative sheets, count manually, and compare against the automated total for those sheets. If they match, the automation is reading your symbols correctly and you can rely on it across the set. If they do not, you have learned that before pricing rather than after award. The failure mode is silent under-counting where a symbol convention changes partway through a drawing set, and no software will warn you about that.

Is it worth it for a small QS practice?

For anyone measuring from drawings regularly, yes, and it is one of the clearest software cases in a QS practice. The drawing comparison feature alone tends to pay for the licence the first time it catches a revision change you would have missed. The case is weaker if you mostly work from models or from bills prepared by others.

Does it work on a tablet on site?

There is an iPad version and it is decent for markup and snagging, less suited to serious takeoff. Most people use the desktop for measurement and the tablet for site markup, syncing through Studio. Worth checking current feature parity, since the mobile version has been catching up.

What is the single most common mistake?

Calibration. Measuring a whole drawing set that was calibrated against the wrong dimension, or assuming every sheet in a set shares one scale when it does not. The quantities look entirely plausible and they are uniformly wrong. Calibrate per sheet against a dimension you can verify, and if a sheet has no printed dimension to calibrate against, that is a query to the design team rather than a guess.`

// ── /ai-for/claims-management ───────────────────────────────────────

const CLAIMS_LONG = `Claims management is the work of establishing entitlement and proving it. Extensions of time, loss and expense, disruption, and the correspondence that either builds a case or quietly dismantles it.

It is document work, which is why AI helps. It is also judgement work with money attached, which is why the limits matter more here than on almost any other page on this site.

The prompts collected here cover the drafting: structuring an EOT submission, building a chronology, summarising a dispute position, and writing the notices that have to go out before entitlement is lost.

WHERE AI GENUINELY HELPS

Chronologies. Building a dated sequence of events from correspondence, site records and minutes is the foundation of any claim, and it is brutally slow. Give an AI a folder of dated material and ask for a chronology and you get in twenty minutes what takes two days. This is the single highest-value use and almost nobody does it.

Structure. A claim submission has a conventional shape: the contractual basis, the facts, the causal link, the effect, the relief sought. AI holds that structure reliably, which stops the common failure of a submission that describes what happened at length and never quite says which clause it relies on.

First drafts of notices. Under NEC4 the clock is short and unforgiving. A draft in front of you the same day is what gets a notice served on time.

Finding the gaps. Ask an AI to read your draft and list every assertion that is not supported by a document reference. It is uncomfortable reading and it is exactly what the other side's consultant will do.

WHERE IT STOPS, AND THIS IS THE IMPORTANT PART

Delay analysis. AI cannot do it and should not be asked. Whether a delay is critical, whether it is concurrent, which of two competing causes drove completion, all of that requires proper analysis of a programme by someone who knows what they are doing. The recognised methods, as set out in the SCL Delay and Disruption Protocol, are technical exercises on real programme data. An AI narrative that says the delay was critical, with no analysis behind it, is worse than useless because it reads convincingly.

Entitlement. Whether your facts fall within clause 60.1 of NEC4 or constitute a Relevant Event under JCT is a legal question about your contract, including whatever Z clauses or bespoke amendments sit on top of it. AI will answer confidently. Do not act on that answer.

Quantum. Loss and expense has to be proven, from records, to a standard that survives scrutiny. Global claims fail regularly in UK courts precisely because the causal link between event and cost was never established item by item. AI cannot establish it and cannot substitute for the records you either kept or did not.

CONFIDENTIALITY, AND THIS ONE IS NOT OPTIONAL

Before any live dispute material goes into an AI tool, three checks. What your contract says about confidentiality. What your firm's policy is. Whether the tool trains on your inputs.

And a fourth that people miss: privilege. Material prepared for a dispute may attract legal privilege, and how you handle it can affect whether that protection holds. If solicitors are instructed, ask them before putting anything through a third-party tool. Assume that in a dispute everything you generate may become disclosable, and that a document created by an AI on your instruction is your document.

WHEN NOT TO USE THESE PROMPTS AT ALL

Where the matter is already in adjudication, arbitration or litigation. At that point you are working to your legal team's direction and freelancing with AI-drafted submissions can actively harm your position.

Where the claim is the last resort for a relationship that could still be saved. A well-drafted claim submission is an escalation. Sometimes the commercially better move is a conversation, and once the submission lands that option narrows.

Where you do not have the records. The uncomfortable truth about claims is that most are won or lost long before anyone drafts anything, in whether site records, delay notices and correspondence were kept contemporaneously. If they were not, no amount of drafting fixes it, and a well-written claim on poor records just makes the weakness more visible.

FREQUENTLY ASKED QUESTIONS

What is the difference between an EOT claim and a loss and expense claim?

They are separate claims with separate tests and they need separate evidence. An extension of time relieves you of liability for delay damages and moves the completion date. Loss and expense, or compensation under NEC4, recovers the money. Winning the first does not automatically get you the second, and this catches people constantly: an EOT award tells you that a relevant event delayed completion, but the costs still have to be proven separately. Under NEC4 the compensation event mechanism handles both together, which is one of its genuine advantages.

Can AI do the delay analysis?

No. Say the word critical about a delay and you are making a technical assertion about the programme that has to be supported by proper analysis on real programme data. AI can write the narrative around an analysis somebody competent has done. It cannot do the analysis, and a submission where the delay conclusion came from a language model will not survive the first serious challenge.

How important are contemporaneous records really?

They are usually the whole case. Records made at the time carry weight that reconstructions do not, and a tribunal knows the difference. Daily logs, delay notices served when the event happened, photographs with dates, minutes recording the discussion. The firms that win claims are the ones whose site teams kept records when nothing was going wrong. The best claims advice is not about drafting at all: it is to notify early and record everything, because by the time you know you have a claim it is generally too late to create the evidence.

What happens if we miss a notice deadline?

Depends on the contract, and the difference matters. NEC4 clause 61.3 has a genuine time bar: fail to notify a compensation event within eight weeks of becoming aware and, subject to the exceptions, you lose entitlement outright. JCT is generally less brutal, with notice requirements that are conditions but rarely absolute bars, though late notice damages your position and can reduce what you recover. Never rely on that softness. Diary the dates off your own contract and treat every one as absolute.

Should we use AI on a claim that is already with solicitors?

Ask them first, every time. Once lawyers are instructed there are privilege considerations that affect how documents should be created and handled, and putting draft material through a third-party tool may have consequences nobody wants to discover at disclosure. Your solicitors may be entirely comfortable with it for background work. Get that in writing rather than assuming.`

// ── /ai-for/budget-forecasting ──────────────────────────────────────

const BUDGET_LONG = `Budget forecasting is the discipline of saying, honestly, where a job will finish financially and how confident you are about it.

The forecast is not the interesting bit. The movement is. A single number tells you nothing; a number that has drifted the same direction for three months tells you the job has a problem nobody has named yet.

The prompts here cover cashflow forecasting, cost-value reconciliation, variance reporting and the commentary that goes around the numbers. The commentary is where the value is, because most forecasting failures are not arithmetic failures. They are people producing accurate numbers with no interpretation attached, and a board reading them as reassurance.

WHAT AI IS FOR HERE, AND WHAT IT IS NOT

Say this plainly at the top: AI does not calculate. It is a language model, it approximates arithmetic, and it will produce a table that looks immaculate and does not add up. On forecasting, where the margin is a small difference between two large numbers, a modest error in one category becomes a large percentage error in the answer.

Every figure comes from your cost system, your valuations and your subcontract ledger. The AI structures, formats and narrates. That is the deal, and breaking it produces confident fiction.

Within that boundary it is genuinely useful for four things.

Structure and consistency. A CVR or variance report that looks the same every month is what makes the trend readable. AI holds a format better than a person under time pressure.

Narrative. Turning a table into the paragraph that explains what moved and why. Most commercial managers are better at the numbers than at the writing, and the writing is what the board actually reads.

Scenario framing. What does a six-week delay do to the position. What if the client rejects the pending variations. AI structures the comparison; you supply the figures.

Interrogation. Paste in your own draft commentary and ask what a sceptical FD would ask. It finds the soft assertions.

WHEN TO USE THESE PROMPTS

Monthly, on the same date, as part of the commercial cycle. Consistency matters more than sophistication.

When you have inherited a job and need to establish where it actually stands.

Before a difficult conversation, so you know your position precisely rather than approximately.

When something has moved and you cannot yet size it.

WHEN NOT TO

Do not use them to produce a number you do not have. If the subcontract forecast is genuinely uncertain, the honest output is a range with the uncertainty stated, not a single figure the AI made look precise.

Do not use them on a job too small to warrant it. A £120,000 fit-out needs a cost check, not a twelve-category reconciliation.

Do not use them to smooth a bad month. This is the real failure mode in construction forecasting and it is worth naming. The temptation when the position deteriorates is to hold an optimistic forecast, move a risk into opportunities, or delay recognising a loss until next month. Everyone in commercial management knows the shape of it. The problem is that a loss reported late is a far worse conversation than a loss reported early, and the question afterwards is always what you knew and when. A forecast that exists to reassure has stopped being a forecast.

FREQUENTLY ASKED QUESTIONS

What is the difference between a cashflow forecast and a CVR?

They answer different questions and confusing them is expensive. The cashflow tells you when money moves and therefore how much funding you need at the worst point. The CVR tells you whether the job is making money. A project can be profitable and still run out of cash, and it can have comfortable cash while quietly losing margin. You need both, and a board briefed on only one is being told half the story.

How often should a forecast be updated?

Monthly, aligned to the valuation cycle. Some contractors go quarterly on short jobs, which is defensible but means a problem can run unnoticed for a quarter. What matters more than frequency is consistency of date and method, because the number you actually care about is the movement between periods, and movement is meaningless if the interval or the basis keeps shifting.

Can AI calculate our forecast margin?

No, and do not let it try. Margin is a small difference between two large numbers, which is the worst possible case for a tool that approximates arithmetic. Calculate in your cost system or a spreadsheet, verify the totals, then hand the verified figures to the AI to structure and narrate. Any workflow where the AI produces the numbers is one where you will eventually report something wrong with total confidence.

Should unapproved variations be in the forecast?

Show them, clearly labelled, and keep them out of the headline margin. Anticipated variations indicate where value might go. Reporting them in the top line means reporting profit you have not earned and may not get, and it means that when one is rejected you take the whole hit in a single month having never properly booked it. The discipline is to quantify the pipeline separately and let the reader decide how much weight to give it.

What is a warning sign in a forecast?

Two patterns. A large movement nobody can explain, and no movement at all. The second is more dangerous and more common: a forecast that reports the same margin for four months, then corrects sharply near completion. That pattern almost always means nobody was really forecasting, they were repeating last month's number, and the correction arrives when it is too late to do anything about it. A forecast that never moves is not stable, it is unattended.`

// ── /ai-for/contract-review ─────────────────────────────────────────

const CONTRACT_REVIEW_LONG = `Contract review is reading a contract before you sign it and working out what you have actually agreed to.

In UK construction that almost never means reading a standard form. It means reading a standard form plus a schedule of amendments, and the amendments are where the risk lives. NEC4 and JCT are reasonably balanced documents as published. What arrives from an employer's solicitor is those documents with the balance moved, and the job is finding out how far.

The prompts here cover clause summarising, comparing terms across forms, flagging amendments against the standard, and drafting the correspondence that follows.

THE THING THAT MATTERS MOST

AI has read the published standard forms. It has never read your Z clauses.

That single fact governs everything on this page. Ask about NEC4 clause 60.1 and you will get a decent general answer about compensation events. Ask whether you can recover for the ground conditions on your job and the honest answer depends on Z clause 14, which nobody has told the AI about, and which may well have deleted the very thing it just described.

So the workflow that works is: give the AI the actual text. Paste the clause, paste the amendment, ask what it means and how it differs from the standard. That is a reading comprehension task and AI is good at it. Asking from memory is where it invents.

WHAT IT IS GENUINELY GOOD AT

Comparing an amendment against the standard. Paste both and ask what changed and who it favours. This is the highest-value use and it is fast.

Plain English translation. Turning a dense clause into something you can put in front of a site manager or a director who is not going to read 400 pages.

Building a risk register from a schedule of amendments. Ask it to list every amendment, summarise the effect, and flag which shift risk onto the contractor. You get a working document in minutes that would take an afternoon.

Consistency checking. Does the payment schedule match the payment clause. Does the definition used in clause 12 match the one in the appendix. Cross-referencing is tedious and it is where drafting errors hide.

Spotting what is missing. Ask what a standard NEC4 Option A contains that this document does not. Deletions are harder to notice than additions and often more significant.

WHAT IT CANNOT DO

Tell you whether a term is enforceable. That is legal advice and it needs a solicitor.

Know your commercial context. Whether an onerous clause is acceptable depends on the margin, the relationship and your appetite this quarter. AI has no view worth having on that.

Be relied on for clause numbers from memory. It will produce a number in the right format that is wrong. Every reference gets checked against the document.

Catch everything. It is a second pair of eyes, not a substitute for a first pair.

A NOTE ON CONFIDENTIALITY

Draft contracts are confidential and frequently subject to an NDA. Before pasting one into an AI tool, check the confidentiality terms, your firm's policy, and whether the tool trains on inputs. Use a business tier with training disabled. If solicitors are involved, ask them first, since privilege considerations may apply to how the review is conducted and recorded.

THE AMENDMENTS THAT DESERVE ATTENTION

Not exhaustive, and not a substitute for advice, but these are the ones that come up:

Payment terms extended, or a payment mechanism amended in ways that sit awkwardly with the Housing Grants, Construction and Regeneration Act 1996 as amended. The Act sets requirements about payment and adjudication that cannot simply be contracted out of, and where a contract falls short the Scheme for Construction Contracts can apply instead. Worth knowing, and worth advice.

Time bars tightened. NEC4 already has an eight-week bar at clause 61.3. Amendments that shorten notice periods further, or add bars where the standard has none, deserve close reading because they are entitlement-killers.

Fitness for purpose obligations. A standard reasonable skill and care obligation is usually insured. A fitness for purpose obligation frequently is not, which means an amendment can create a liability your professional indemnity policy does not cover. Check with your broker rather than assuming.

Design responsibility shifted, particularly where design is novated and the amendments quietly make you responsible for what the novated team did before you arrived.

Liquidated damages raised, or caps on liability removed.

Unamended standard forms are worth reading properly once. Amended ones are worth reading properly every time, because no two schedules of amendments are the same.

FREQUENTLY ASKED QUESTIONS

Can AI replace a solicitor for contract review?

No, and the distinction is worth being precise about. AI can help you understand what a document says. It cannot advise you on what it means for you, whether a term is enforceable, or what to do about it. Those are legal services and there is a real difference between comprehension and advice. Use AI to arrive at your solicitor's door already understanding the document, with specific questions. That makes the legal spend go further, which is the genuine commercial benefit.

Will AI know our bespoke amendments?

Only if you show it. This is the single most important point about using AI on contracts. It has been trained on the published standard forms and knows nothing about your Z clauses, your schedule of amendments or your particular conditions. Paste the actual text in. An answer about NEC4 given from memory may describe a clause your contract deleted.

Which contract forms does it handle best?

The widely published ones, so JCT and NEC4 are reasonably well understood, FIDIC decently, and more specialised or regional forms less reliably. But this ranking matters less than it sounds, because you should be pasting the text in regardless. A tool working from the document in front of it performs consistently across forms. A tool working from memory is unreliable on all of them.

Is it safe to upload a draft contract?

Check three things first: the confidentiality terms in the document or the NDA around it, your firm's policy, and the tool's data handling including whether it trains on inputs. Business and enterprise tiers generally do not train on your data and consumer tiers often do by default. Where solicitors are instructed, ask them before uploading anything, because privilege can be affected by how documents are handled.

What should I look at first in an amended contract?

Payment, time bars and liability, in that order. Payment because cashflow kills more contractors than bad building. Time bars because they silently destroy entitlement you would otherwise have. Liability because caps, indemnities and fitness for purpose obligations are where an amendment can create exposure your insurance does not cover. After those, read the deletions. What has been taken out of a standard form tells you as much as what has been added, and it is much easier to miss.`

// ── updates ─────────────────────────────────────────────────────────

const UPDATES = [
  {
    table: 'workflows',
    slug: 'draft-pre-qualification-questionnaire',
    path: '/ai-workflows/draft-pre-qualification-questionnaire',
    fields: {
      long_description: PQQ_LONG,
      example_output: PQQ_EXAMPLE,
      use_case: PQQ_USE_CASE,
      meta_title: 'Construction PQQ Template: Free AI Prompt',
      meta_description:
        'Free AI prompt that drafts a construction PQQ with scoring guidance, plus a worked groundworks example and the trade-specific questions templates always miss.',
    },
  },
  {
    table: 'tools',
    slug: 'procore',
    path: '/ai-tools/procore',
    fields: {
      long_description: PROCORE_LONG,
      meta_title: 'Procore AI: Honest Review for UK Contractors',
      meta_description:
        'What Procore AI actually does for UK construction, where the commercial modules fall short against JCT and NEC4, what it costs, and who it genuinely suits.',
    },
  },
  {
    table: 'tools',
    slug: 'bluebeam-revu',
    path: '/ai-tools/bluebeam-revu',
    fields: {
      long_description: BLUEBEAM_LONG,
      meta_title: 'Bluebeam Revu for QS Takeoff: Honest Review',
      meta_description:
        'What Bluebeam Revu is genuinely good at for UK takeoff and drawing comparison, how far to trust automated counts, what it costs, and the calibration trap.',
    },
  },
  {
    table: 'tasks',
    slug: 'claims-management',
    path: '/ai-for/claims-management',
    fields: {
      long_description: CLAIMS_LONG,
      meta_title: 'AI for Construction Claims: What It Can and Cannot Do',
      meta_description:
        'Where AI helps on EOT and loss and expense claims, where it must not go near delay analysis, and the confidentiality rules for live disputes. Free prompts.',
    },
  },
  {
    table: 'tasks',
    slug: 'budget-forecasting',
    path: '/ai-for/budget-forecasting',
    fields: {
      long_description: BUDGET_LONG,
      meta_title: 'AI for Construction Budget Forecasting',
      meta_description:
        'Free AI prompts for cashflow forecasts, CVRs and variance commentary, plus why AI must never produce the numbers and what a forecast that never moves means.',
    },
  },
  {
    table: 'tasks',
    slug: 'contract-review',
    path: '/ai-for/contract-review',
    fields: {
      long_description: CONTRACT_REVIEW_LONG,
      meta_title: 'AI for Contract Review: NEC4, JCT and Z Clauses',
      meta_description:
        'Free AI prompts to read amended construction contracts. Why AI has never seen your Z clauses, the amendments worth checking first, and where advice is needed.',
    },
  },
]

function words(s) {
  return String(s ?? '').trim().split(/\s+/).filter(Boolean).length
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const env = loadEnv()
  const url = env.NEXT_PUBLIC_SUPABASE_URL
  const key = env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
    process.exit(1)
  }

  const supabase = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  let failures = 0
  for (const u of UPDATES) {
    const cols = ['id', ...Object.keys(u.fields)].join(', ')
    const { data: existing, error: selErr } = await supabase
      .from(u.table)
      .select(cols)
      .eq('slug', u.slug)
      .maybeSingle()

    if (selErr || !existing) {
      console.error(`SKIP ${u.path}: ${selErr ? selErr.message : 'row not found'}`)
      failures++
      continue
    }

    console.log(`\n${u.path} (${u.table}/${u.slug})`)
    for (const [k, v] of Object.entries(u.fields)) {
      if (k.startsWith('meta_')) {
        console.log(`  ${k}: ${v.length} chars`)
      } else {
        console.log(`  ${k}: ${words(existing[k])} -> ${words(v)} words`)
      }
    }

    if (dryRun) {
      console.log('  [dry-run] not written')
      continue
    }

    const { error: updErr } = await supabase
      .from(u.table)
      .update({ ...u.fields, updated_at: new Date().toISOString() })
      .eq('id', existing.id)

    if (updErr) {
      console.error(`  FAILED: ${updErr.message}`)
      failures++
    } else {
      console.log('  updated')
    }
  }

  if (failures > 0) {
    console.error(`\n${failures} update(s) failed.`)
    process.exit(1)
  }
  console.log(dryRun ? '\nDry run complete. Re-run without --dry-run to apply.' : '\nBatch 3 pages updated.')
}

main().catch((err) => {
  console.error('Update failed:', err.message)
  process.exit(1)
})
