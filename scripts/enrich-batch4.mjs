#!/usr/bin/env node
/**
 * enrich-batch4.mjs — indexing remediation, run 4.
 *
 * Usage:  node scripts/enrich-batch4.mjs [--dry-run]
 *
 * Six /ai-for/ task hub pages. All six were previously description-only
 * (38-47 words) with long_description NULL.
 *
 * Each page gets a DISTINCT worked example. These are domain worked examples
 * (a takeoff, a float calculation, a scored register) constructed and checked
 * by hand, not claimed runs of any product. All arithmetic verified manually.
 *
 * Upserts by slug. Never inserts. Renders as plain text under
 * whitespace-pre-wrap, so no markdown syntax in these strings.
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

// ── /ai-for/environmental-compliance ────────────────────────────────

const ENV_LONG = `Environmental compliance on a UK site is mostly paperwork with legal teeth. Waste transfer notes, consignment notes for hazardous waste, permits, discharge consents, and the records that prove you did what you said.

The paperwork is where AI helps. The duties are not negotiable and no tool discharges them for you.

Start with a correction, because a lot of people have this wrong. Site Waste Management Plans stopped being a statutory requirement in England when the 2008 Regulations were repealed in December 2013. That is often reported as "SWMPs are gone". They are not. Duty of care under section 34 of the Environmental Protection Act 1990 never went anywhere, waste transfer notes are still required for every movement, hazardous waste has its own consignment note regime, and most clients, funders and BREEAM assessments require a SWMP contractually regardless of what the statute book says. Devolved nations differ, so check the regime for where you are actually building.

So the SWMP is now a commercial and contractual document rather than a statutory one. It still gets written, it still gets audited, and it is still the thing that shows whether your diversion figures are real.

WORKED EXAMPLE: WASTE FORECAST, 40-UNIT HOUSING REFURBISHMENT

Strip-out and refurbishment of 40 flats across two blocks. Here is the forecast that goes in the SWMP, and the arithmetic behind the headline number everyone quotes.

Forecast arisings by stream:

| Stream | Tonnes | Route |
|--------|--------|-------|
| Mixed construction and demolition | 180 | Licensed transfer station, sorted off site |
| Timber | 35 | Segregated skip, recycled |
| Plasterboard | 22 | Segregated, gypsum recycler |
| Metals | 12 | Segregated, scrap merchant |
| Hazardous (ACMs per R&D survey) | 3 | Licensed hazardous facility, consignment note |
| TOTAL | 252 | |

Diversion from landfill:

| Stream | Tonnes | Diversion rate | Diverted |
|--------|--------|---------------|----------|
| Mixed C&D | 180 | 75% | 135.0 |
| Timber | 35 | 90% | 31.5 |
| Plasterboard | 22 | 85% | 18.7 |
| Metals | 12 | 100% | 12.0 |
| Hazardous | 3 | 0% | 0.0 |
| TOTAL | 252 | | 197.2 |

Diversion from landfill = 197.2 / 252 = 78.3%.

Now the useful part. If the contract or the BREEAM target says 90% diversion, this plan does not meet it, and the arithmetic tells you exactly where the problem is. The mixed skip is 71% of all arisings and it has the worst diversion rate. Improving the timber rate from 90% to 95% moves the headline by less than a percent. Segregating even half the mixed stream on site to 90% shifts it substantially.

That is a decision about skip space and site logistics, made in week two, not a reporting problem discovered in month eight.

Two things the arithmetic will not tell you. Plasterboard cannot go to landfill mixed with biodegradable waste, which is a separation duty rather than a recycling target. And the 3 tonnes of ACMs are not a diversion problem at all, they are a consignment note, a licensed carrier and a licensed facility, and getting that chain wrong is a criminal matter rather than a missed KPI.

WHERE AI GENUINELY HELPS

Drafting the SWMP itself, once you have the forecast quantities. Structure, format, the standard sections.

Turning waste transfer note data into monthly reporting. This is dull, repetitive reconciliation and it is exactly where a tool earns its keep.

Drafting environmental method statements and pollution incident response plans, which are conventional documents with conventional structures.

Explaining a permit or an exemption in plain English so a site manager can actually act on it.

Checking your own documentation for gaps. Ask what a site of this type would normally need that your list does not mention.

WHERE IT DOES NOT

It cannot tell you whether you need a permit. Bespoke permits, standard rules permits and registered exemptions are a genuinely technical area and the answer depends on what you are doing, where, and how close you are to a watercourse or a protected site. Get that from the regulator or a consultant.

It cannot classify waste. Assigning EWC codes and deciding whether something is hazardous is a technical assessment, and getting it wrong is an offence rather than an error.

It has no idea what is actually in your ground. Only the site investigation and the asbestos survey know that.

It will cite regulations from memory that were repealed. This page opened with one example. Check every reference.

WHEN NOT TO USE AI HERE AT ALL

Anything involving a pollution incident. If something has entered a watercourse or a drain, you are on the phone to the Environment Agency incident line, not drafting. Reporting duties are immediate and the drafting comes afterwards.

Anything where the answer determines whether an activity is lawful. Permits, exemptions, hazardous waste classification, protected species. Wrong answers there are prosecutions.

FREQUENTLY ASKED QUESTIONS

Are Site Waste Management Plans still a legal requirement?

Not in England, where the 2008 Regulations were repealed in December 2013. But this is the most over-read fact in construction environmental management. Duty of care under section 34 of the EPA 1990 still applies to every movement of waste, waste transfer notes are still mandatory, hazardous waste still needs consignment notes, and you must still check that your carrier is registered. On top of that, most main contract clients and every BREEAM assessment require a SWMP contractually. So in practice you are almost always writing one, just for a different reason than you were in 2012. Check the position for the nation you are building in, since the devolved regimes differ.

What is the difference between a waste transfer note and a consignment note?

A transfer note covers non-hazardous waste and records the transfer between parties. A consignment note covers hazardous waste and is a more demanding regime with notification requirements and longer record retention. Using the wrong one for asbestos, contaminated soil, oils or solvents is a compliance failure, not an administrative slip. If your R&D survey found ACMs, that stream needs a consignment note and a licensed facility, and the paperwork is checked.

Can AI classify our waste and assign EWC codes?

No, and do not let it try. Waste classification is a technical assessment involving the composition of the material and the relevant hazardous property thresholds, and misclassifying hazardous waste as non-hazardous is a criminal offence. Use AI to draft your documentation once someone competent has done the classification. Guidance from the regulator and, for anything borderline, a consultant.

How do we improve a poor diversion rate?

Segregate more streams on site and do it early, because the answer is almost always in the mixed skip. As the worked example shows, tinkering with well-performing streams barely moves the headline when one badly-performing stream is most of your tonnage. The constraint is usually site space for skips, which is a logistics decision made at mobilisation. Deciding to improve diversion in month eight is deciding not to.

Does the Environment Agency actually inspect this?

Yes, and the pattern is that they arrive after a complaint or an incident rather than at random. What they ask for is the paper chain: transfer notes, consignment notes, carrier registration checks, permits and exemptions. A site with tidy records and one genuine mistake is in a very different position from a site that cannot produce the notes at all. Keep the records as you go, because reconstructing them afterwards is both obvious and worse.`

// ── /ai-for/material-takeoff ────────────────────────────────────────

const TAKEOFF_LONG = `A material takeoff turns drawings into quantities you can buy from. Areas, lengths, counts, waste allowances, and the pack sizes the merchant actually sells.

It is arithmetic on top of judgement. The arithmetic is easy to check and the judgement is where the money is: what you deduct, what waste factor you apply, and whether you have understood how the thing gets built.

This is also the single worst use of a general AI tool if you let it do the sums. Language models approximate arithmetic. On a takeoff, a plausible-looking wrong number gets ordered.

WORKED EXAMPLE: FACING BRICK TO A SEMI-DETACHED PAIR

Outer skin facing brickwork, two-storey semi-detached pair, stretcher bond. Here is the whole calculation, because the interesting part is the deductions and the waste factor, not the multiplication.

Gross external wall area:

| Elevation | Calculation | Area (m2) |
|-----------|-------------|-----------|
| Front | 8.4 x 5.2 | 43.68 |
| Rear | 8.4 x 5.2 | 43.68 |
| Gable end 1, rectangular | 7.6 x 5.2 | 39.52 |
| Gable end 1, triangle | 7.6 x 2.1 / 2 | 7.98 |
| Gable end 2, rectangular | 7.6 x 5.2 | 39.52 |
| Gable end 2, triangle | 7.6 x 2.1 / 2 | 7.98 |
| GROSS TOTAL | | 182.36 |

Deductions for openings:

| Opening | Calculation | Area (m2) |
|---------|-------------|-----------|
| Front, 2 no. windows | 2 x (1.2 x 1.2) | 2.88 |
| Front, 1 no. window | 2.4 x 1.2 | 2.88 |
| Front, entrance door | 0.9 x 2.1 | 1.89 |
| Rear, 3 no. windows | 3 x (1.2 x 1.2) | 4.32 |
| Rear, patio door | 1.8 x 2.1 | 3.78 |
| Gables, 4 no. windows | 4 x (0.6 x 0.9) | 2.16 |
| TOTAL DEDUCTIONS | | 17.91 |

Net area = 182.36 - 17.91 = 164.45 m2

Brick quantity:
Standard UK format brick (215 x 102.5 x 65mm) in stretcher bond with 10mm joints = 60 bricks per m2.
164.45 x 60 = 9,867 bricks

Waste allowance at 5% for facing brick:
9,867 x 1.05 = 10,360.35, say 10,361 bricks

Ordering quantity, packs of 400:
10,361 / 400 = 25.9, so 26 packs = 10,400 bricks

THE THREE THINGS THAT GO WRONG HERE

The bricks per m2 figure. 60 per m2 is the calculated figure for standard format in stretcher bond. You will very often see 65 quoted, because that number already has waste rolled into it. Use 65 and then add 5% waste on top and you have double-counted, ordering roughly 8% more brick than you need. On this job that is nearly two extra packs. Decide which convention you are using and be consistent.

The deductions. 17.91 m2 is just under 10% of the gross area, worth about 1,075 bricks or nearly three packs. Ask an AI for a brick quantity from a wall area and it will not deduct openings unless you tell it to, because it does not know they exist.

The waste factor. 5% suits straightforward facing brickwork. Heavy cutting, intricate detailing, a fussy bond or a small job with lots of corners pushes it towards 10%. Reclaimed or hand-made brick with variable sizing wants more again. A flat 5% applied to everything is a habit, not a calculation.

WHERE AI ACTUALLY HELPS ON A TAKEOFF

Not the sums. Four other things.

Building the schedule structure. Every material, every location, every unit, in a table you can price. Tedious and mechanical.

Converting between units and pack sizes, once you give it the conversion. Bags per m3, sheets per m2, packs per thousand.

Cross-checking a takeoff against a specification. Paste both and ask what the spec calls for that your takeoff does not include. This catches genuine omissions: the wall ties, the DPC, the cavity closers, the movement joint filler. Rarely the brick, frequently the bits around it.

Drafting the procurement schedule and the call-off programme once quantities are settled.

WHEN NOT TO USE IT

Do not use it to measure from a drawing. It cannot reliably read dimensions off a PDF and it will not tell you when it has guessed. Measure in a proper takeoff tool, or by hand.

Do not use it where the measurement rules matter. If you are measuring to NRM2 for a formal bill, the rules govern what is included, what is deducted and how it is described, and a language model has no reliable grasp of them.

Do not use it as the only check on a big order. Anything you are about to buy in quantity gets a second pair of human eyes, because the cost of being wrong is the cost of the material plus the delay.

FREQUENTLY ASKED QUESTIONS

How many bricks per square metre should I use?

60 per m2 for standard UK format in stretcher bond with 10mm joints, calculated rather than rounded. The commonly quoted 65 already includes a waste allowance, so if you use it, do not then add waste again. Other bonds change the figure: Flemish and English bond use more brick per m2 because of the headers. Metric modular and imperial-sized bricks are different again. State which convention you are using at the top of the takeoff so whoever checks it knows.

What waste factor should I apply?

It depends on the material and the job, not on habit. Around 5% for straightforward facing brickwork and blockwork, more like 10% where there is heavy cutting, complex geometry or a lot of corners. Plasterboard on a cut-heavy layout can exceed 10%. Ready-mixed concrete is usually 5% or less on a decent pour. Reclaimed materials with variable sizing need more. The honest approach is to apply a factor you can justify for that specific job, and to record why.

Can AI do a takeoff from a PDF drawing?

Not reliably, and this is the most dangerous question on this page. It can describe what is on a drawing. It cannot measure it accurately, and it will produce confident dimensions that were never on the sheet. Use a measurement tool for measurement. Use AI for the schedule, the cross-check against the spec, and the procurement paperwork.

What is the most commonly missed item in a takeoff?

The accessories. Wall ties, DPC, cavity trays, weep vents, movement joint filler and sealant, insulation clips, lintel end caps. The primary material gets measured carefully because it is expensive and obvious. The bits that hold it together get forgotten, and then a site stops for a delivery of something that costs very little and was never ordered. Reading the specification against your takeoff catches these, and that is a genuinely good AI task.

Should the takeoff include a contingency on top of waste?

Keep them separate and be clear which is which. Waste is the material you will physically lose to cutting, breakage and offcuts, and it belongs in the quantity you order. A contingency for design change or scope uncertainty is a commercial allowance and belongs in the cost plan, not in the delivery schedule. Rolling them together produces an order quantity nobody can explain and a stack of surplus brick on site.`

// ── /ai-for/programme-narrative-writing ─────────────────────────────

const NARRATIVE_LONG = `A programme narrative is the prose that explains the programme. Not the bar chart, the words: what moved, why, what it means for completion, and what you are doing about it.

It is a separate discipline from building the programme itself, and it is the one planners tend to like least. It is also, when a job goes wrong, the document that gets read most closely, because the monthly narratives are a contemporaneous record of what everybody knew and when.

That is worth sitting with. A narrative written to sound reassuring in month seven is evidence in month nineteen.

WORKED EXAMPLE: THE SAME MONTH, WRITTEN TWICE

Month 7 of 14 on a distribution centre. Frame complete. Envelope two weeks behind. One compensation event notified and not yet assessed. Completion still shown as programmed.

Here is the narrative most people write:

"Good progress has been made during the period. The steel frame is now complete and the envelope package is progressing well. Some minor delays have been experienced due to adverse weather and material deliveries. The team continues to work hard to mitigate these issues and completion remains as programmed. The compensation event notified last month is being progressed with the Project Manager."

Read it as an auditor would. It says nothing. Which envelope activity, behind by how much, against what float? Was the weather exceptional or just weather? What does "mitigate" mean in practice? If completion remains as programmed, what absorbed the two weeks? And if the compensation event is not assessed, what happens to the date if it is refused?

Every one of those questions gets asked eventually. The narrative that dodged them looks, in hindsight, like it was written to avoid them.

Here is the same month written properly:

"Steelwork completed 3 July, two days ahead of the Accepted Programme.

Cladding installation to the north and east elevations is 14 days behind the Accepted Programme. The cause is the late release of the revised parapet detail (RFI-0112, issued 26 June against a requested date of 12 June). Cladding was the driving activity on the critical path from week 24.

The 14 days have been absorbed by resequencing: internal blockwork has been brought forward from week 32 to week 28, using the float previously held on that activity. Completion is therefore unchanged at 19 December. That resequencing consumes the whole of the blockwork float, so the path through blockwork is now critical and any further delay to either activity will move Completion day for day.

Compensation event CE-014 (parapet detail delay) was notified 27 June and remains unassessed. Our quotation of 4 July sought no extension of time on the basis of the resequencing above, but did seek the associated cost. If the resequencing does not hold, a time quotation will follow.

Action required: the Project Manager's assessment of CE-014 is now 11 days beyond the period in clause 62.3. We have written separately on 14 July."

Same facts. The second one names the activity, quantifies the delay, identifies the cause with a document reference, explains what absorbed it and what that cost in float, states the contractual position honestly, and ends with a specific ask.

It is also longer, more uncomfortable to write, and much harder to argue with in eighteen months.

WHAT MAKES A NARRATIVE HOLD UP

Name the activity, not the package. "Cladding to north and east elevations" beats "the envelope".

Quantify against the Accepted Programme, not against last month's feeling.

Give the cause a document reference. An RFI number, a date, an instruction. Assertions without references are opinions.

Say what happened to the float. This is the one people omit and it is the one that matters. Absorbing a delay is not the same as not having a delay, and a narrative that reports an unchanged completion date without saying what it cost is misleading by omission.

End with the ask. What do you need, from whom, by when.

WHERE AI HELPS, AND WHERE IT WILL BURY YOU

It helps with the writing. Give it the facts above as bullets and it will produce clean, structured prose in the right register. That is genuinely useful, particularly for planners who find the writing a chore.

It will also, left alone, produce the first version. Vague, positive, reassuring, and hedged. That register is what most training text sounds like, so it is the default it reverts to. If you paste in thin facts you will get comfortable prose, and comfortable prose is precisely the failure mode this document has.

And it cannot do the analysis. Whether cladding is genuinely critical, how much float blockwork actually had, whether the delay is concurrent with something of your own making, all of that comes from the programme and from someone who can read it. AI writing a narrative that asserts a delay was critical, with no analysis behind it, is writing a claim you cannot support.

WHEN NOT TO USE AI HERE

Where the narrative is going into a claim or a dispute. At that point the words are evidence and they should be yours, or your advisers'.

Where you do not yet know what happened. A narrative written from incomplete facts reads as confident and commits you to a version of events you may have to retract.

FREQUENTLY ASKED QUESTIONS

What is the difference between a programme narrative and a progress report?

The narrative is about time: the programme, the critical path, float, and the causes of movement. The progress report is the broader monthly document covering progress, commercial position, safety, quality and risk, and it usually contains the narrative as one section. Different audiences too. The narrative is read by planners, contract administrators and, later, by anyone analysing delay. Confusing the two produces a narrative padded with information nobody reads it for.

Should the narrative admit our own delays?

Yes, and this is the hardest discipline in the job. A narrative that only ever reports employer-caused delay is not credible and it destroys your position when a genuine claim comes along, because the pattern is visible across twelve months of reports. Recording your own delays accurately costs you nothing you were going to keep, and it makes every other statement in the document believable. Concurrency is a complicated area and how it affects entitlement is a technical and legal question, so record the facts accurately and take advice on what they mean.

How long should a monthly narrative be?

As long as the movement requires. A quiet month where everything tracked the programme is three or four honest paragraphs. A month where the critical path changed needs the full treatment, because the reader has to be able to reconstruct what happened without you in the room. Length is not the measure. Whether a stranger could follow the logic in a year is the measure.

Can AI identify the critical path from a description?

No. The critical path comes from the programme logic, through a forward and backward pass, not from a description of what feels important. AI given a written summary will produce a confident statement about what is critical and it will frequently be wrong, because activities that look important often carry float and unglamorous ones often do not. Get the critical path from the programme, then use AI to write about it.

What if the client disputes the narrative?

Get the disagreement recorded in writing at the time. Unchallenged narratives tend to be treated later as an agreed account, which cuts both ways: it is exactly why you should object promptly to someone else's narrative that misstates the position, and why your own should be defensible when it is written rather than when it is challenged.`

// ── /ai-for/progress-reporting ──────────────────────────────────────

const PROGRESS_LONG = `A monthly progress report is read by people who will not read it. That is the design problem.

The site team knows everything in it already. The client's project manager will read the first page and skim for anything about money or dates. The board will read five lines. Your report has to work at all three levels at once, and most reports are written at one level, usually the wrong one.

Reporting is also where an uncomfortable habit lives. The month you first suspect the job is slipping is the month it is easiest to write "on programme, monitoring closely". It is almost never a lie when it is written. It becomes one over about three months.

WORKED EXAMPLE: ONE MONTH, THREE ALTITUDES

Month 9 of 16, mixed-use scheme. The month's facts, as they come off site:

Structure complete to level 6. Curtain walling started, one week behind. Two RFIs outstanding on the plant room layout, both over 20 days. Valuation 9 certified in full. Two variations pending totalling £310k, one with the client since April. One RIDDOR-reportable incident, a fall from a step-up, three days lost. Fire strategy sign-off outstanding from Building Control. Programme shows completion holding at 12 February.

For the board, five lines:

"Weston Quay, month 9 of 16. Completion holding at 12 February.
Curtain walling one week behind, absorbed within float, no impact on completion.
Fire strategy sign-off outstanding with Building Control. This is now the principal programme risk; it constrains fit-out from week 44.
£310k of variations pending, £180k of which has been with the client since April. Cashflow impact if unresolved by valuation 11.
One RIDDOR incident this period, three days lost, investigation closed with actions."

Nothing there they cannot act on. The fire strategy is called out as the principal risk, in one line, with the date it starts to bite.

For the client, the same month expands to explain and to ask. Curtain walling gets its cause and its float position. The fire strategy gets a specific request naming what is needed and by when. The two overdue RFIs get listed with their ages, because that is the client's team holding them. The variations get itemised with dates of submission, because a report that says "variations pending" without dates lets a four-month-old submission look like this month's.

For the site team, none of the above is the point. They need the two-week lookahead, the delivery dates, the outstanding RAMS approvals and who is chasing what. It is a different document with a different purpose, and stapling it onto the client report just buries the things the client needed to see.

The mistake almost every report makes is writing one document at the middle altitude and hoping. It gives the board too much and the site team too little.

THE RAG STATUS PROBLEM

Most reports carry a red, amber, green status. Most of them are green.

The pattern to watch for is a project that reports green for months and then goes straight to red. That almost never means it deteriorated suddenly. It means amber was avoided because amber invites questions.

Two things make RAG honest. Define the thresholds in advance, so amber means a stated condition rather than a feeling. And make amber cheap: if flagging amber triggers a difficult meeting every time, nobody will ever flag it, and your reporting will keep telling you everything is fine right up until it is not.

WHERE AI HELPS

Compressing. Give it the full month of detail and ask for the five-line board summary. This is genuinely the best use, because compression is a skill and most people are bad at it under time pressure.

Layering. Same facts, three audiences, one prompt each. Consistency between the three matters, and doing it by hand is where inconsistencies creep in.

Consistency of format month to month, which is what makes a trend readable.

Interrogating your own draft. Ask what a sceptical client PM would question. It finds the soft statements: "progressing well", "minor delays", "being monitored".

WHERE IT DOES NOT

It cannot decide what matters. Given the month above, AI will report all of it evenly. Knowing that the fire strategy sign-off is the thing that will hurt you, and that the curtain walling is noise, is judgement built from having watched jobs go wrong.

It cannot set the RAG status, and it should not be asked to.

It does not know the politics. Whether to name the client's own team as the cause of the overdue RFIs, and how to word it, is a relationship decision.

FREQUENTLY ASKED QUESTIONS

What should be in a monthly progress report?

At minimum: progress against programme with the completion position, commercial position including variations and their ages, health and safety, quality, key risks with owners, and the specific decisions or information you need from the client. The commonest omission is the last one. A report that describes the month without asking for anything wastes the one moment each month when senior people on the client side are definitely reading.

How do I stop the report being ignored?

Put the ask at the top, not the end. Most reports build to their conclusion like an essay, so the request for the decision you actually need sits on page nine. Invert it: completion position, principal risk, what you need from the reader, then the detail behind it for anyone who wants it. If a reader stops after four lines, they should still have received the thing you most needed them to know.

Should bad news go in the report or be raised separately?

Both, in that order. Raise it directly with the person who needs to know first, then record it in the report. Bad news that appears in a report without warning damages trust even when the report is accurate, because the reader learns it in front of other people. Bad news that is discussed and then recorded reads as management. What must not happen is bad news that gets raised in a corridor and never written down, because then there is no record that anyone was told.

Can AI write the whole report from site data?

It can write a competent draft from good input, and the quality of the input is the whole story. Feed it a complete set of site records and it produces something usable. Feed it a thin week of notes and it produces confident prose that fills the gaps with generalities, which is worse than a short honest report. The judgement about what leads, what is buried and what the RAG status is stays with you.

How honest should the risk section be?

More honest than feels comfortable, and specific enough to be actionable. A risk section listing "programme risk" and "cost risk" with amber against both is decoration. A risk section that says fire strategy sign-off is outstanding, that it constrains fit-out from week 44, and that the mitigation is a meeting requested for the 20th, is a working document. Risks with no owner and no date are not being managed, they are being noted.`

// ── /ai-for/project-scheduling ──────────────────────────────────────

const SCHEDULING_LONG = `Project scheduling is building and maintaining the programme itself. The activities, the durations, the logic that connects them, the critical path that falls out of it, and the float that tells you where you have room.

This is distinct from writing about the programme, which is its own discipline. Here the output is the plan. There the output is the prose.

The reason that distinction matters for AI is simple. Scheduling is a calculation. A language model does not calculate, it predicts what an answer looks like, and a predicted critical path is worthless.

WORKED EXAMPLE: WHERE THE FLOAT ACTUALLY IS

A fit-out sequence on a single floor. Seven activities, finish-to-start logic throughout.

| Ref | Activity | Duration (days) | Follows |
|-----|----------|----------------|---------|
| A | Partitions | 10 | - |
| B | First fix M&E | 15 | A |
| C | Plaster and dry lining | 12 | B |
| D | Ceiling grid | 8 | C |
| E | Second fix M&E | 10 | D |
| F | Floor finishes | 6 | C |
| G | Decoration | 8 | E and F |

Two paths run through this from C to G.

Path via ceilings: A + B + C + D + E + G = 10 + 15 + 12 + 8 + 10 + 8 = 63 days
Path via floors: A + B + C + F + G = 10 + 15 + 12 + 6 + 8 = 51 days

Project duration is 63 days, and the critical path runs through the ceiling grid and second fix. Floor finishes carry 63 - 51 = 12 days of total float.

Check it the other way: F runs in parallel with D and E, which together take 18 days. F takes 6. So F has 18 - 6 = 12 days of float. Same answer, which is what you want from a check.

Now the useful part. A five-day delay to floor finishes costs you nothing at all. A five-day delay to the ceiling grid moves completion to day 68, one for one. Two activities, similar duration, similar cost, completely different consequence.

Ask a site manager which of those two they would chase and most will say floor finishes, because it is visible and it is behind. The programme says otherwise.

One more thing this example shows. If floor finishes slip by 15 days rather than 5, they consume the 12 days of float and become critical themselves, and the project now has two critical paths. Float is not a permanent property of an activity. It is a relationship between paths, and it moves.

WHY AI CANNOT DO THIS PART

Everything above came from adding durations along paths and comparing them. That is a forward and backward pass, and it is what scheduling software does deterministically and correctly every time.

A language model asked "which of these activities is critical" will give you a fluent answer derived from which activity sounds important. On the example above, a plausible wrong answer is that first fix M&E is critical because it is the longest activity. It is on the critical path, but so is everything before G on that branch, and length has nothing to do with it.

Use scheduling software for the calculation. P6, Asta, MS Project, whatever your business runs. Then use AI for the parts that are language.

WHERE AI IS GENUINELY USEFUL IN SCHEDULING

Building the first activity list. Give it a project type and scope and it will produce a sensible list of activities and a reasonable sequence to react to. Faster than a blank page, and the value is in what you delete.

Sense-checking logic in plain English. Describe your sequence and ask what is missing. It will ask about commissioning, about the lead-in on long-lead items, about whether you have allowed for testing. Not because it understands your job, but because it has seen the shape of many programmes.

Turning a programme into readable text for people who cannot read a bar chart. Most clients cannot, whatever they say.

Drafting the assumptions and exclusions register that should sit alongside every programme and usually does not.

Interrogating durations. Ask it to list every activity where the duration looks optimistic for the quantity involved. It will be wrong sometimes and it will still surface two you had not questioned.

WHEN NOT TO USE IT

Any calculation. Critical path, float, dates, resource levelling. All of it belongs in the software.

Delay analysis. Establishing what caused a delay and whether it was critical is a technical exercise on real programme data, and the recognised methods exist precisely because the intuitive answer is often wrong.

Anything going into a claim. The programme underpinning a claim needs to survive expert scrutiny.

FREQUENTLY ASKED QUESTIONS

What is the difference between total float and free float?

Total float is how long an activity can slip without delaying project completion. Free float is how long it can slip without delaying the next activity. They are frequently different, and the difference is what causes arguments. An activity with 12 days of total float but zero free float can slip a single day without moving the end date, and still push the activity immediately after it. Reporting only total float hides that.

Who owns the float?

Contractually this is one of the most argued questions in construction scheduling, and the answer depends on your contract and its amendments rather than on any general principle. Some forms and amendments address it explicitly, many do not, and the position on whether an employer delay may consume contractor float is genuinely contested. Read your contract, and if float ownership is likely to matter on your job, take advice before you need it rather than during the argument.

Can AI build a programme for us?

It can draft an activity list and a plausible sequence, which is a real time-saver at the start. It cannot produce a programme, because a programme is a calculated network with dates and float, and those come from software operating on logic you have set. Treat AI output as a checklist to react to, then build the actual programme properly.

How detailed should a construction programme be?

Detailed enough to manage and coarse enough to maintain. The failure mode at both extremes is the same: the programme stops being updated. A tender programme with 60 activities and a construction programme with 600 are both appropriate in their place. The test is whether you can genuinely update it every period. A 2,000-line programme that gets updated properly twice a year is worth less than a 300-line one that is current.

What makes a programme defensible if things go wrong?

That it was accepted, that it was updated regularly with actual progress recorded, and that the logic is sound rather than propped up with constraints. Programmes riddled with hard date constraints do not behave like networks, so delay does not propagate and the critical path becomes meaningless. Record actual start and finish dates as you go. A programme that was updated monthly during the job is worth vastly more, later, than one reconstructed afterwards.`

// ── /ai-for/risk-assessment ─────────────────────────────────────────

const RISK_LONG = `This page is about project and commercial risk: the register that tracks what could go wrong on a job, what it would cost, and who owns doing something about it.

It is not about health and safety risk assessment. That is a separate legal duty under the Management of Health and Safety at Work Regulations 1999, discharged through risk assessments and RAMS by a competent person, and it has its own page and its own template. The two get conflated constantly because they share a word. They have different purposes, different audiences and different consequences for getting them wrong.

A project risk register exists to make uncertainty visible early enough to act. Most are maintained to satisfy a client requirement and read by nobody, which is a waste of the one tool that would have told you what was coming.

WORKED EXAMPLE: RISK REGISTER, £6.2M INDUSTRIAL UNIT AT TENDER

Five live risks at tender stage, scored as probability against cost impact, with expected monetary value.

| Ref | Risk | Prob. | Impact | EMV | Owner |
|-----|------|-------|--------|-----|-------|
| R1 | DNO connection delayed beyond programme | 40% | £180,000 | £72,000 | Project Manager |
| R2 | Contamination beyond SI findings | 25% | £240,000 | £60,000 | Commercial Manager |
| R3 | Structural steel price movement before order | 60% | £45,000 | £27,000 | Buyer |
| R4 | Planning condition discharge delays start | 30% | £90,000 | £27,000 | Client (shared) |
| R5 | Key groundworks subcontractor insolvency | 15% | £320,000 | £48,000 | Commercial Manager |
| | TOTAL EMV | | | £234,000 | |

The tender carries a risk allowance of £150,000.

So the register is saying the allowance is £84,000 light, and that is a conversation to have before submission rather than in month five.

But read it more carefully, because the total is the least useful number on the page.

R5 is the largest single exposure by some distance. Its worst case is £320,000, a third more than the next worst and seven times R3. By EMV it ranks third, behind two risks whose entire downside is smaller than R5's.

That is what multiplying by probability does. It systematically demotes low-probability high-impact risks, and that is exactly the category that ends projects. A groundworks subcontractor going under at £320,000 on a £6.2m job is not a number you absorb, it is your margin and more. Manage that register top-down by EMV and R5 gets attention third, after a steel price movement you could have fixed with a forward order.

R3 is the opposite: highly likely, and small enough that it is really a pricing decision rather than a risk. A 60% probability item is not uncertain, it is a thing that is probably going to happen, and it arguably belongs in the estimate rather than the register.

R4 has a shared owner, which usually means no owner. Either your PM is chasing the client weekly or nobody is.

That is what the register is for. Not the total, which nobody will ever pay. The pattern.

Also worth stating plainly: the £234,000 total is not a budget. You will not experience the average outcome. You will experience some subset of these events at full cost and none of the others. EMV is a comparison tool for ranking and for sizing an allowance across a portfolio of risks, not a prediction of what this job will cost you.

HOW AI HELPS

Generating the first list. This is the strongest use by far. Give it the project type, procurement route, site constraints and programme, and ask for risks. You will get thirty, of which twenty are obvious, five are irrelevant, and five are things nobody in the room had said out loud. Those five are worth the exercise.

Structuring the register consistently, with categories, owners, dates and mitigation.

Drafting mitigation actions that are specific rather than "monitor closely".

Writing the risk narrative for a report from the register.

Challenging your own register. Ask what a project of this type typically suffers that your register does not mention.

WHERE IT FALLS DOWN

Probability and impact are yours. AI will assign numbers if asked and they will be invented. Those figures should come from your experience, your cost data and, ideally, from what actually happened on the last three jobs like this.

It cannot tell you your appetite. Whether a £48,000 EMV on subcontractor insolvency is acceptable depends on your balance sheet and how the year is going.

It does not know the specifics that matter most: this particular client's payment record, this particular subcontractor's order book, this particular site.

WHEN NOT TO USE THIS APPROACH

For health and safety risk. Use a proper risk assessment and RAMS process with a competent person. Scoring workplace hazards by cost is not how that duty works.

Where the risk is a known certainty. If a thing is going to happen, price it. A register full of 80% probability items is an estimate wearing a disguise.

Where nobody will own the actions. A register with no owners and no dates is documentation, not management, and producing one creates a record suggesting the risk was managed when it was not.

FREQUENTLY ASKED QUESTIONS

What is the difference between this and a RAMS?

Purpose and law. A project risk register manages commercial and delivery uncertainty: cost, time, procurement, resource. A risk assessment and method statement discharges a legal duty to identify hazards to people and control them, prepared and approved by a competent person. Different scoring, different audience, different consequences. You need both and neither substitutes for the other.

How do you score probability and impact?

However you like, as long as it is consistent and you write down what the scale means. Percentage probability against a cost impact, as above, works well commercially because it produces an EMV you can compare against your allowance. A 1-5 matrix is simpler and suits a register with many qualitative risks. What matters is that a 4 means the same thing on Tuesday as it did in March, and that the basis is recorded so a new commercial manager can pick it up.

Should the risk register drive the contingency?

It should inform it, not set it mechanically. The EMV total gives you a defensible starting point for sizing an allowance, which is better than a percentage plucked from habit. But it needs adjusting for the shape of the risks: a register dominated by one enormous low-probability item needs different treatment from one made of many small likely ones, because you can absorb the second and not the first. Judgement on top of the arithmetic.

How often should the register be reviewed?

Monthly as part of the commercial cycle, and immediately whenever something material changes. The most common failure is a register written at tender, filed, and rediscovered at handover with every entry still open and still scored as it was eighteen months earlier. Risks that have passed should be closed and the actual outcome recorded, because that is the only way your next tender gets better numbers.

Can AI predict risks we have not thought of?

To a degree, and it is genuinely useful for it. It has been trained on a great deal of construction material and will surface category risks that are common in your project type: statutory undertaker delays, party wall matters, archaeology, protected species, adoption agreements. What it cannot do is know your specific circumstances, so it will never flag that this client always disputes variations or that your groundworker's order book has doubled in six months. Use it to widen the net, then apply what you know.`

// ── updates ─────────────────────────────────────────────────────────

const UPDATES = [
  {
    table: 'tasks',
    slug: 'environmental-compliance',
    path: '/ai-for/environmental-compliance',
    fields: {
      long_description: ENV_LONG,
      meta_title: 'AI for Construction Environmental Compliance',
      meta_description:
        'Free AI prompts for waste plans and environmental documentation, with a worked 252-tonne diversion calculation and why SWMPs still get written after 2013.',
    },
  },
  {
    table: 'tasks',
    slug: 'material-takeoff',
    path: '/ai-for/material-takeoff',
    fields: {
      long_description: TAKEOFF_LONG,
      meta_title: 'AI for Material Takeoff: Worked Brick Example',
      meta_description:
        'Free AI prompts for material schedules, with a worked facing brick takeoff: deductions, waste factors, pack quantities, and why 60 per m2 is not 65 per m2.',
    },
  },
  {
    table: 'tasks',
    slug: 'programme-narrative-writing',
    path: '/ai-for/programme-narrative-writing',
    fields: {
      long_description: NARRATIVE_LONG,
      meta_title: 'Writing Programme Narratives: Free AI Prompts',
      meta_description:
        'Free AI prompts for programme narratives, with the same month written twice: the vague version everyone writes and the version that survives a delay claim.',
    },
  },
  {
    table: 'tasks',
    slug: 'progress-reporting',
    path: '/ai-for/progress-reporting',
    fields: {
      long_description: PROGRESS_LONG,
      meta_title: 'AI for Construction Progress Reporting',
      meta_description:
        'Free AI prompts for monthly progress reports, with one month written for three audiences, plus the RAG status habit that hides a slipping job until it is red.',
    },
  },
  {
    table: 'tasks',
    slug: 'project-scheduling',
    path: '/ai-for/project-scheduling',
    fields: {
      long_description: SCHEDULING_LONG,
      meta_title: 'AI for Construction Scheduling: Float Explained',
      meta_description:
        'Free AI prompts for programme work, with a worked float calculation showing why the activity everyone chases is the one that does not matter. UK construction.',
    },
  },
  {
    table: 'tasks',
    slug: 'risk-assessment',
    path: '/ai-for/risk-assessment',
    fields: {
      long_description: RISK_LONG,
      meta_title: 'AI for Project Risk Registers: Worked Example',
      meta_description:
        'Free AI prompts for construction risk registers, with a worked EMV example on a £6.2M job and why ranking by expected value buries the risk that kills you.',
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
  console.log(dryRun ? '\nDry run complete. Re-run without --dry-run to apply.' : '\nBatch 4 pages updated.')
}

main().catch((err) => {
  console.error('Update failed:', err.message)
  process.exit(1)
})
