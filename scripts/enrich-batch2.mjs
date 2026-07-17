#!/usr/bin/env node
/**
 * enrich-batch2.mjs — indexing remediation, run 2.
 *
 * Usage:  node scripts/enrich-batch2.mjs [--dry-run]
 *
 * Covers the page types with no markdown publish script: tasks (/ai-for/),
 * tools (/ai-tools/) and workflows (/ai-workflows/). Upserts by slug, same
 * pattern as scripts/update-meta-gsc.mjs. Never inserts.
 *
 * tasks.long_description is new (added Jul 2026) and rendered on /ai-for/[slug]
 * under an "Overview" heading, plain text, whitespace-pre-wrap. Same treatment
 * as workflows.long_description, so no markdown syntax in these strings.
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

// ── /ai-for/tender-analysis (tasks.long_description) ────────────────

const TENDER_ANALYSIS_LONG = `Tender analysis is the work of taking a pile of returns that all claim to be for the same package and working out what you are actually being offered. It is not adding up columns. It is finding the gap between what the tender documents asked for and what each bidder has priced, then putting a number on that gap so the comparison means something.

Get it wrong and you award to the cheapest bid, which turns out to be the one that excluded the most. Everyone finds out in month four.

The prompts on this page cover the whole arc: normalising returns onto a common basis, interrogating a suspiciously low bid, scoring quality, and drafting a recommendation you can defend in a room.

WHAT AI IS ACTUALLY GOOD AT HERE

Reading. That is the honest answer. The bulk of tender analysis is reading four covering letters, four sets of qualifications, four programmes and four method statements, then noticing that bidder C mentioned something the other three did not. It is slow, it is detailed, and it is exactly where attention fails at 6pm on a Thursday.

AI does not get bored on page 40. Give it four sets of qualifications and ask for one table listing every exclusion by bidder, flagged where an item appears in some bids but not others, and you get in two minutes what takes an afternoon.

That flag is the whole game. When one bidder excludes the builder's work in connection and the other three priced it, one of two things is true: they spotted something, or they are buying the job. Either way you now know to ask.

WHERE THE JUDGEMENT STAYS WITH YOU

Whether an exclusion matters. AI can find it. It cannot tell you that this client always argues about BWIC, or that the last time you accepted a drainage exclusion it cost £60,000.

What a low bid means. A tender 12 percent below the others is either a mistake, a different scope, or a contractor who wants the work badly. Those three have completely different consequences and no amount of prompting will tell you which one you are looking at. You find out by asking them.

The award itself. On public sector work the panel scores against published criteria and the record has to show the panel did it. An AI score is an unaccountable number in a document that may need to survive a challenge.

WHEN TO USE THESE PROMPTS

Use them the day the returns land, while there is still time to go back to bidders with questions. Tender analysis done in the last 48 hours before award is not analysis, it is arithmetic with a deadline.

Use them on subcontract packages as much as main contract tenders. The prompts do not care about the value, and a £180,000 groundworks package with a buried exclusion will hurt a job just as much as a main contract error.

Use them when there is a gap you cannot explain. If bidder B is £200,000 light and you do not know why, structured interrogation of their breakdown against the others is exactly the job.

WHEN NOT TO

Do not use them on a single quotation. There is nothing to compare. You want a check against your own estimate, not a comparison matrix.

Do not use them where the tender documents were vague. If the ITT did not say who takes the drain-down, four bidders will each have assumed differently and you cannot normalise your way out of it. That is a re-tender or a formal clarification to all bidders, not an analysis problem. Fixing an ambiguous ITT at evaluation stage by adjusting the bids is how challenges start.

Do not paste live tender sums into a consumer AI tool without checking. Bids are commercially sensitive, usually held under ITT terms that say so. Check the tool's data handling, your client's rules and your own policy first. On public sector work, assume the process may be scrutinised in detail.

And do not use these prompts to justify a decision you have already made. An analysis written backwards from a chosen answer is visible, usually because the quality scores do all the work and none of them are evidenced.

FREQUENTLY ASKED QUESTIONS

What is the difference between tender analysis and tender evaluation?

Roughly: analysis is working out what the bids actually say, evaluation is scoring them and choosing. Analysis is normalisation, arithmetic checks, exclusions and anomalies. Evaluation is applying the published criteria and weightings and reaching a recommendation. You cannot evaluate well without analysing first, which is why so many evaluation reports rank bids that were never comparable in the first place.

How much of a price gap should worry me?

There is no universal number, but a bid more than about 10 percent below the next one deserves a specific explanation rather than gratitude. Look first at whether the scope matches, then the arithmetic, then the preliminaries and programme. Genuinely keen pricing shows up as thin margin across the board. A mistake usually shows up in one section that is wildly out of line with the others. An exclusion shows up as a section that is missing.

Can AI read a tender bill or a priced schedule?

It can read one, and it will make mistakes on a big one that you would not make. It is at its best on prose: covering letters, qualifications, method statements, programmes. It is weakest on long numeric documents, where it will confidently mis-transcribe a rate or lose a line. Use it on the words and use your own tools on the numbers.

Should I tell bidders I used AI in the analysis?

Nobody expects a disclosure for using a tool to help read documents, any more than for using a spreadsheet. What matters is that the decision was made by accountable people against published criteria, and that you did not put confidential pricing somewhere it should not go. If you cannot say honestly that the panel made the decision, that is the problem, not the disclosure.

What should I do first when the returns land?

Arithmetic check, before anything else. Errors change the ranking and finding one after you have normalised means doing the normalisation again. Then qualifications and exclusions, then normalisation, then scoring. In that order. Most of the pain in tender analysis comes from doing those four things in the wrong sequence.`

// ── /ai-tools/chatgpt (tools.long_description) ──────────────────────

const CHATGPT_LONG = `ChatGPT is the AI tool most construction professionals try first, and for a lot of the writing that fills a QS or PM's week it is genuinely good. Drafting correspondence, restructuring rough notes, summarising a document you do not have time to read properly, producing a first pass at a report.

It is not a construction tool. It is a general one that happens to be good at the kind of structured writing our industry runs on. That distinction matters, because it explains both what it is brilliant at and where it falls over.

WHAT IT IS ACTUALLY GOOD AT ON A CONSTRUCTION JOB

Turning mess into structure. Rough meeting notes into minutes. A voice memo from a site walk into a snagging list. Six weeks of emails into a chronology. This is the highest-value thing it does and it is the least glamorous.

First drafts of correspondence. A letter you have written four hundred times and still resent starting. It gets you to a draft you can correct, and correcting is much faster than composing.

Interrogating documents. Upload a specification and ask what it says about a specific obligation. It will find things. It will also miss things, so this is a starting point for your reading, not a replacement.

Explaining something unfamiliar. A junior QS asking what a pay less notice is will get a decent answer. A junior QS asking whether their specific pay less notice is valid will get a confident answer that may be wrong.

WORKED EXAMPLE: INTERROGATING A CLADDING SPECIFICATION

A real shape of task. You are pricing a rainscreen package on a Newport office refurbishment. The spec is 62 pages, the tender is due Friday, and you need to know what testing and third-party certification obligations sit with you before you price them.

What you do: upload the PDF and ask a specific question.

"You are helping a UK subcontract estimator price a rainscreen cladding package. I have uploaded the specification, document ref NPT-SPEC-A2-Rev-C.

List every obligation in this specification that falls on the cladding subcontractor for testing, third-party certification, or sample approval. For each one give me: the clause or section number, a one-line summary of the obligation, and who it says pays for it.

Only list obligations that are actually in the document. If the specification is silent or ambiguous on who bears a cost, say so explicitly rather than assuming. Quote the wording where the obligation is unclear. Do not include general workmanship clauses."

What comes back is a table of a dozen or so items with clause references. On a spec like this it will typically surface fire performance certification for the system, a mock-up panel for architect approval, weather-tightness testing on that mock-up, third-party installer accreditation, and a schedule of material samples.

Say two of those you had already priced and one you had not. The specification puts the cost of the weather-tightness test on the mock-up with the subcontractor, and at roughly £4,000 that is a real number on a package this size. Finding it on Wednesday rather than after award is the entire value of the exercise.

Now the part that matters, and this is what you should expect rather than hope to avoid. Some of those clause references will be wrong. Not wildly wrong: off by a section, or a summary that reads slightly more favourably to you than the actual wording does. Both kinds of error are invisible until someone opens the document at that page, and both are exactly the kind you would price against.

So the workflow is: AI finds the candidates, you open the spec and verify every single one before any of it touches a price. It turns an afternoon of reading into forty minutes of targeted checking. It does not remove the checking.

THE LIMITS, PLAINLY

It cannot do arithmetic reliably. This catches people constantly because the output looks so convincing. Ask for a cost breakdown that sums to £840,000 and you will get a beautiful table that sums to £847,300. It predicts what a sum looks like rather than calculating it. Anything numeric gets checked in a spreadsheet, every time.

It invents clause numbers and standards. Confidently, and in exactly the right format. A BS number that is close but wrong. An NEC clause that does not say what it claims. If a reference is going into a document with your name on it, open the actual source.

It does not know your project. It does not know the ground conditions, the history with this client, or what was agreed in the meeting last Thursday. Everything it produces is generic until you make it specific.

Its knowledge has a cutoff and it is not a live source. It is not a substitute for checking current Building Regulations, current standards, or anything that changed recently. On regulatory questions this matters a great deal.

DATA AND CONFIDENTIALITY

Before you paste anything sensitive into it, three checks. What your contract or appointment says about confidentiality. What your firm's policy is, because many now require the business tier only. And whether your tier trains on your inputs, which the consumer tiers often do by default and the business and enterprise tiers generally do not.

Practical rule: use a business tier with training off for anything client-related, and redact names and figures on anything genuinely sensitive. If a matter is in dispute, assume everything you type could one day be disclosable.

CHATGPT VERSUS THE OTHERS, HONESTLY

Claude tends to be better on long documents and holds a careful tone well, which suits contractual writing. Microsoft Copilot's advantage is that it sits inside the Office tools your documents already live in, and on a lot of firms' IT policies that is the deciding factor rather than the model. Gemini is strong if your firm is on Google Workspace.

For most people in construction the honest answer is that the differences between the current frontier models matter far less than whether you write a specific prompt and check the output. Pick the one your IT department will let you use, and spend the effort on the prompt.

FREQUENTLY ASKED QUESTIONS

Is the free version good enough for construction work?

For occasional drafting, it is fine. Two things push you to a paid tier: file uploads for interrogating specifications and drawings, which is where a lot of the real value sits, and the data handling, since the consumer free tier's default training settings are not what you want for client documents. If you are using it for work, use a work tier.

Can ChatGPT read construction drawings?

It can read a drawing and describe what is on it, and it will miss things a competent design manager would catch, particularly relationships across sheets and revisions. Treat it as a second pair of eyes with no experience, not as a checker. For anything dimensional, do not rely on it at all.

Will it get UK construction terminology right?

Mostly, if you tell it to. Left alone it drifts American: dollars, OSHA, "change order" instead of variation, feet and inches. Say UK construction, say the contract form, say £, and it holds the register fine. The drift is worst on anything regulatory, where an American answer can be confidently and dangerously wrong.

Is it safe to use for RAMS or health and safety documents?

For a first draft, with a competent person reviewing and approving before it is used, yes. Never for the approval itself. The legal duty for a suitable and sufficient risk assessment sits with a competent person and cannot be delegated to a tool. The usual failure is that the AI leaves residual risk scores identical to the initial ones, which says in writing that your controls achieve nothing.

How much does it cost in the UK?

The free tier covers casual use. Paid individual plans are around £20 a month, with business tiers priced per seat above that and enterprise pricing on application. Check the current pricing page, since the tiers move regularly. For most construction professionals the paid individual tier is the point where file uploads make it genuinely useful, and the business tier is where the data handling becomes appropriate for client work.`

// ── /ai-workflows/create-bid-no-bid-decision-framework ──────────────

const BIDNOBID_LONG = `This workflow produces a scored bid/no-bid assessment: twelve factors, a total, a RAG rating, and a recommendation you can put in front of the board.

The real purpose is not the score. It is making the conversation happen before someone commits three weeks of estimating time on a hunch.

Most contractors bid too much. The maths is simple and everyone ignores it. If a tender costs you £15,000 in estimating time and you win one in five, every win carries £75,000 of bidding cost. Bid the ones you cannot win and that number gets worse, and it comes straight off the margin of the jobs you do win.

The framework forces the awkward questions into the open. Do we have the resource. Do we have the experience. Is this client going to pay. Are we bidding because it is a good opportunity or because the pipeline looks thin and bidding feels like doing something.

WHEN TO USE THIS

Use it when a tender invitation arrives and the answer is not obvious. That is most of them.

Use it when there is disagreement in the room. The value of a scored matrix is that it makes people say why. "Client relationship: 2" is a claim someone has to defend, where "I'm not keen on them" is not.

Use it at framework mini-competition stage, where the temptation is to bid everything because you are already on the framework and it feels free. It is not free. Your estimators are the constraint.

Use it retrospectively, once a quarter, on the ones you lost. Score them honestly with what you know now and see whether the framework would have told you.

WHEN NOT TO USE THIS

Do not use it on a strategic must-bid. If the board has decided you are entering the healthcare sector and this is the entry point, you are bidding. Scoring it produces an amber rating and a pointless argument. Be honest that it is a strategic decision and record it as one.

Do not use it as a veto on a repeat client. If your largest client invites you to bid, the answer is yes even if the job scores badly, because the relationship is worth more than this tender. What the framework should do there is tell you what conditions to attach, not whether to walk.

Do not use it where you have not got the information. A framework scored on twelve guesses gives you a confident total built on nothing. If you do not know the competition, the design status or the contract form, the honest output is a list of questions for the client, not a score.

And do not let it become a form. The moment bid/no-bid scoring turns into a box someone fills in after the decision has been made, it is worse than useless, because it launders a hunch into a number that looks like analysis.

COMMON MISTAKES

Scoring the project and ignoring the client. The most expensive jobs in UK construction are not the technically hard ones, they are the ones for clients who do not pay. Payment history, retention behaviour, whether they argue every variation, whether their QS is reasonable. Weight those properly. A 5 on project fit and a 1 on client is not an average, it is a no-bid.

Never scoring resource honestly. Everyone says they have capacity. Then the tender lands on the estimator already doing two others and you submit something rushed that loses. If your estimating team is at capacity, the real question is which tender you drop, not whether you can squeeze this one in.

Letting the AI set the weightings. It does not know your business. It will produce a sensible-looking generic weighting and you will inherit it forever. The weightings are a statement of your strategy and they should be argued about once, by your people, and then applied consistently.

FREQUENTLY ASKED QUESTIONS

What is a realistic win rate, and what does it tell me?

For open competition on a competitive package, one in four or one in five is common. On a framework mini-competition with three bidders, closer to one in three. On a negotiated or repeat-client job it should be much higher, and if it is not, something is wrong with your pricing or your relationship. The useful thing is not the number itself, it is the trend and the split. A firm winning one in eight on open tenders and two in three on repeat work has just been told exactly where to spend its bidding budget.

Should we bid a job we cannot resource?

Only if you are honest about which other commitment gives way. The failure mode is bidding it, winning it, and delivering it badly with a team you did not have, which costs you both the margin and the client. If the answer is genuinely that you would resource it by hiring, that is a real answer, but it needs to be a decision rather than an assumption on a scoring sheet.

Can AI make the decision for us?

No, and be careful here, because it will happily produce a confident recommendation. It does not know your cashflow, your appetite for risk this quarter, or that the MD fell out with this client's PM in 2019. Use it to structure the assessment and force the questions. The decision belongs to the people who carry the consequences.

What score should trigger a no-bid?

Set your own thresholds and hold to them. A common shape is green above 70 percent of available marks, amber 50 to 70, red below 50, with amber meaning bid only with named conditions attached. What matters more than the numbers is that you actually respect them. A framework where everything comes out amber and you bid anyway is a framework nobody believes.

Should the framework include a no-bid cost?

It should include the cost of not bidding, which is a different thing and the field people skip. Declining a framework mini-competition may affect your standing on that framework. Declining a repeat client twice may end the relationship. Those are real costs and they belong in the assessment, which is why the prompt asks for the risks of not bidding as well as the risks of bidding.`

const BIDNOBID_EXAMPLE = `WORKED EXAMPLE: 3FE PRIMARY SCHOOL, FRAMEWORK MINI-COMPETITION

── WHAT GOES IN ──

Project: New-build primary school, 2 storey, 3 forms of entry
Client: Wiltshire County Council via Faithful+Gould
Location: Devizes
Estimated Value: £8.5M
Contract Form: NEC4 ECC Option A
Tender Return: 18/09/2026
Start on Site: 04/01/2027
Contract Period: 62 weeks
Procurement Route: SW Regional Framework, Lot 2, mini-competition

Our company context:
- Sector experience: strong education portfolio, 12 schools in 5 years, 4 for this council
- Client relationship: repeat client, good. Last job (Calne primary) completed 3 weeks early, no disputes, final account settled inside 8 weeks
- Current workload: 82% capacity. One estimator free from 25/08, the other committed to the Trowbridge health centre bid until 11/09
- Geographic presence: regional office 19 miles from site
- Recent win rate: 1 in 3 on framework mini-comps, 2 in 5 on education

Known competition: Ashfield Construction, Brightway Group. 3 firms invited off Lot 2.
Number of tenderers: 3

Key concerns or risks:
Novated design team we have not worked with before (Pellow + Marsh). Site is a former playing field with a surface water culvert crossing the north boundary, flagged in the SI but not resolved. Programme has the frame going up over January and February. Start on site is 8 weeks after tender return which is tight for procurement.

── WHAT COMES OUT ──

BID / NO-BID ASSESSMENT
Project: Devizes Primary School, 3FE
Value: £8.5M
Assessed: 21/08/2026
Assessed by: Estimating and BD

1. OPPORTUNITY SUMMARY

An £8.5M NEC4 Option A new-build primary school for a repeat council client on a framework we are already on, in our core sector, 19 miles from our regional office, against two known competitors. This is close to our ideal job profile. The material concerns are an unresolved culvert on the north boundary, a novated design team we have no history with, and an estimating resource clash that runs to 11 September against an 18 September return.

2. SCORING MATRIX

| Factor | Score | Justification |
|--------|-------|---------------|
| a. Strategic fit | 5/5 | Education is our stated core sector. This is squarely in the business plan. |
| b. Client relationship | 5/5 | Four completed jobs for this council. Calne finished early, final account settled in 8 weeks with no dispute. We are a known quantity here. |
| c. Project type and complexity | 5/5 | 3FE primary, 2 storey, traditional. We have built this building four times. |
| d. Geographic fit | 4/5 | 19 miles. Supply chain established. Slightly outside our densest subcontractor coverage but not materially. |
| e. Competition | 4/5 | 3 bidders, both known. Ashfield are strong on education and will price it keenly. Brightway have been chasing volume and may buy it. 1 in 3 base rate, better than that on our record in this sector. |
| f. Resource availability | 2/5 | This is the problem. One estimator free 25/08, the second not free until 11/09, leaving 5 working days of two-hander on an 8.5M NEC4 bid. Deliverable but thin, and it competes directly with the Trowbridge health centre bid. |
| g. Programme and timing | 3/5 | 62 weeks is realistic for the building. Start on site 8 weeks after return is tight for procurement, and frame erection across Jan/Feb carries weather risk we will need to price. |
| h. Risk profile | 3/5 | The culvert is the open item. SI identifies it, no resolution proposed, and it sits under the north boundary where the access road is shown. Could be a drainage diversion or could be a redesign. Unquantified. |
| i. Commercial terms | 4/5 | NEC4 Option A, framework terms, known and acceptable. Council pays to terms in our experience. LDs at framework standard. |
| j. Margin opportunity | 3/5 | Framework rates constrain the upside. Achievable but not generous, and Brightway buying it would compress it further. |
| k. Design status | 3/5 | Stage 4 at tender, which is workable, but novated to a design team we have not worked with. Unknown quality of coordination. |
| l. Supply chain | 4/5 | Established groundworks, frame and M&E subcontractors within range. Frame availability over January needs confirming early. |

3. TOTAL SCORE AND RAG RATING

Total: 45 / 60 (75%)
RAG: GREEN (thresholds: Green above 70%, Amber 50-70%, Red below 50%)

Note that the score is green despite two 2s and 3s in places that matter. This is why the recommendation is conditional rather than a straight bid.

4. KEY RISKS IF WE BID

The culvert. If it needs diverting and that is not resolved before tender return, we either carry an unquantified risk or we qualify the bid and lose competitiveness against two bidders who may not have spotted it.
Estimating resource. Five days of two-hander is thin for NEC4 Option A at this value. A rushed bid on a framework where we have a reputation is worse than no bid.
Winning both. If we win this and Trowbridge, we are over capacity in Q1 2027 with no plan.
Novated design team. Unknown coordination quality. Under Option A the design risk allocation needs reading carefully before we price it.

5. KEY RISKS IF WE DON'T BID

Framework standing. Three invited, and declining a Lot 2 mini-competition in our core sector, for a council we have done four jobs for, is noticed. Two consecutive declines would put our position on Lot 2 at risk.
Relationship. This client gives us repeat work. Declining their flagship education scheme without a good reason damages that.
Pipeline. Q1 2027 currently has 40% cover. This is exactly the job that fills it.

6. RECOMMENDATION

BID WITH CONDITIONS

The strategic case is strong: core sector, repeat client, known competition, a building we have built four times. The concerns are all resource and information problems rather than fundamentals, and both are addressable before return.

7. CONDITIONS AND ACTIONS BEFORE SUBMISSION

1. Raise a formal tender query on the culvert by 28/08. We need either a resolution or written confirmation of who carries the risk. If neither is forthcoming by 08/09, escalate the decision back to this group. Do not price an unquantified diversion.
2. Confirm the Trowbridge return date. If it can be requested a week later, take the extension and free the second estimator from 04/09. If not, this bid gets the freelance estimator from 01/09 and that cost goes in the bid budget.
3. Frame availability over January confirmed with our two steel subcontractors before we commit to the programme.
4. Pre-tender meeting requested with the novated design team. If they will not meet, note it and price the coordination risk accordingly.
5. Capacity plan for winning both this and Trowbridge, presented to the board before submission. If we cannot resource both wins, decide now which one we are actually trying to win.

── THE POINT ──

The score is 75 percent and green. The recommendation is still conditional, and condition 5 is the one that matters: what happens if we win both.

That is the question nobody asks until February. A framework that surfaces it in August has already paid for itself, regardless of what the total says.`

const BIDNOBID_USE_CASE = `Use when a tender invitation lands and you need a structured way to decide whether to commit estimating time to it, rather than deciding on instinct and finding out in three weeks.

Best used early, in the first day or two after the invitation, while there is still time to raise tender queries and shuffle resource. A bid/no-bid run the week before return is not a decision, it is a formality.

Also worth running retrospectively once a quarter on tenders you lost. Score them honestly against what you know now and see whether the framework would have told you to walk. That is how the weightings get calibrated to your business rather than staying at whatever seemed sensible on day one.`

// ── /ai-workflows/generate-meeting-minutes ──────────────────────────

const MINUTES_LONG = `Meeting minutes are a project record that people treat as admin. Then a dispute arrives and the minutes are the only contemporaneous evidence of what was agreed, by whom, on what date.

This workflow turns rough notes into structured minutes with a proper action table: ID, description, owner, due date. Every action has a name against it and a date, because an action without both is a wish.

The tedious part is the formatting and the chasing of actions, which is exactly the part that gets skipped when minutes get written three days late from memory. Getting them out the same day is worth more than getting them perfect.

WHEN TO USE THIS

Use it immediately after the meeting, while your notes still make sense to you. Notes decay fast. Something you scrawled at 2pm is obvious at 3pm and cryptic on Thursday.

Use it for progress meetings, design team meetings, subcontractor coordination, pre-start meetings. Anything with actions coming out of it.

Use it on a voice memo. Walk to the car, talk through what happened for four minutes, transcribe it, paste it in. This is the single best use of this workflow and almost nobody does it.

Use it when you have inherited someone else's illegible notes and need to produce something distributable.

WHEN NOT TO USE THIS

Do not use it for anything contractual that needs to be precise about words. If the meeting included a discussion that might turn into a variation or a claim, the minute of that item needs to be written by you, carefully, in the words you choose. An AI paraphrase of a contractual exchange is a paraphrase, and it will get read in two years by someone looking for exactly the words.

Do not use it where the meeting is confidential or the transcript is sensitive. A commercial settlement discussion, a disciplinary, anything involving people's personal information. Check your policy and think about UK GDPR before a recording of colleagues goes into an AI tool. If you are recording at all, everyone needs to know.

Do not use it to invent what you did not capture. If you missed an item, the minute says nothing about it. AI will happily produce a plausible discussion of a topic you mentioned in passing, and a fabricated minute is far worse than an incomplete one.

And do not let it decide what a decision was. The AI sees "discussed the roof, Dave to check" and may write "agreed the roof detail". Those are different, and on a bad day the difference is a claim.

COMMON MISTAKES

Actions without owners. "Team to review" is not an action. AI does this constantly when your notes are vague, because it will not invent a name it does not have. If your notes say "someone needs to chase the DNO", the minute needs a name in it before it goes out, and you are the one who has to decide whose.

Minutes that record discussion instead of decisions. The test for every item: in six months, will a reader know what was decided and who is doing what? Three paragraphs of "the team discussed options" fails that. One line of "agreed: option B, Marsh to issue revised detail by 24/07" passes.

Distributing without reading. The whole point is speed, and the failure mode of speed is issuing a document with the AI's inference in it. Read it once, properly, before it goes to the distribution list. It takes two minutes and it is the only quality control in the process.

FREQUENTLY ASKED QUESTIONS

Are meeting minutes contractually binding?

Generally the minutes themselves are a record rather than a contract document, but that undersells them badly. They are contemporaneous evidence, and in a dispute contemporaneous evidence is what wins arguments. If minutes record an instruction and nobody objected to them at the time, that is powerful. Some contracts also give specific meetings a formal status, so check yours. The practical point is that unchallenged minutes tend to be treated as what happened, which is exactly why you read them before they go out, and why you object in writing if someone else's minutes are wrong.

Can I record a meeting and have AI transcribe it?

Technically yes, easily. Legally and professionally, tell everyone first and get their agreement. Covert recording of colleagues or a client damages trust permanently and creates UK GDPR problems, since a recording of identifiable people is personal data and needs a lawful basis, a retention period and appropriate handling. Check where the transcription tool sends the audio and whether it trains on it. Many firms have a policy on this now. Read it before you press record, not after.

How quickly should minutes go out?

Within 24 hours, ideally the same day. The value decays fast: actions do not start until people know they own them, and any error in the minutes is easier to correct while everyone remembers. Same-day minutes with one typo beat immaculate minutes issued the following Tuesday.

What if someone disputes the minutes?

Correct them if they are wrong, and record the correction rather than silently editing. The standard mechanism is to raise it at the next meeting and minute the amendment. Where the disputed item is contractual, get the objection in writing at the time. Silence against minutes that record something against your interest is not a good look later.

Should I use AI on a Teams transcript?

That is one of the better uses, because the transcript is complete and your notes never are. Two warnings. Teams transcripts mangle names, technical terms and anything said over a bad connection, so the AI is working from flawed input and will not tell you which bits. And the transcript is a recording of your colleagues, so the consent and data points above apply in full.`

const MINUTES_EXAMPLE = `WORKED EXAMPLE: PROGRESS MEETING, CARE HOME EXTENSION

── WHAT GOES IN (the rough notes) ──

This is what real notes look like. Typed one-handed during the meeting.

Meeting: Progress Meeting #9
Date: 14/07/2026
Location: MS Teams
Attendees: me (A Crocker, PM), Dan Hollis (Site Man), Priya Raval (client rep, Fairmont Care), Tom Beckett (Marsh Architects), Sue Nadeem (M&E sub, Coleford), Rob Tozer (QS)
Apologies: Jim Weston (structural)

Notes:
prev actions - 8.2 window schedule, Tom done issued 09/07. 8.4 asbestos survey plant room, still outstanding, Priya chasing, was due 07/07, now says end of week. 8.5 crane licence, Dan done.
frame - complete, signed off, 2 days ahead
roof - started 08/07, going ok, weather held. felt down on 60%. Dan says finish 25/07 barring rain
windows - delivery confirmed 28/07. Tom flagged cill detail on north elevation still not resolved, needs Jim, Jim not here. Tom will email him. this is blocking, windows can't go in without it. Tom says he can turn it round 48hrs after Jim confirms
M&E - Sue says first fix started ground floor, 30%. plant room can't start til asbestos survey done. Sue getting antsy, says if survey not done by 21/07 she loses her gang, they go to another job, 3 wk delay
- big discussion. Priya said she'd escalate today. Rob asked if that's a comp event, said depends, park it
- Sue asked about temp power. currently on genny. permanent supply date? nobody knew. Dan to check with Western Power
snagging - Priya asked about the handover process, agreed we'd do a snagging walk 2 wks before PC not 1
commercial - Rob: val 8 submitted 10/07, cert due 24/07. 3 variations pending, VO-11 12 13. VO-11 (extra sockets) agreed £4,200. VO-12 (roof upgrade) Priya wants a price before she approves, Rob to issue by 18/07. VO-13 (drainage) Rob says needs Jim's input
- Rob raised retention, says contract says 3% but client's last cert deducted 5%, Priya to check with finance
H&S - one near miss 11/07, dropped tool from scaffold, no injury, exclusion zone reinforced, Dan did toolbox talk 12/07
next meeting 28/07 2pm Teams

── WHAT COMES OUT ──

PROGRESS MEETING MINUTES

Meeting: Progress Meeting #9
Project: Fairmont Care Home, Chippenham, Extension and Refurbishment
Date: 14 July 2026, 14:00
Location: Microsoft Teams

Attendees:
A. Crocker (AC), Project Manager
D. Hollis (DH), Site Manager
P. Raval (PR), Client Representative, Fairmont Care
T. Beckett (TB), Marsh Architects
S. Nadeem (SN), Coleford M&E
R. Tozer (RT), Quantity Surveyor

Apologies: J. Weston (JW), Structural Engineer

1. PREVIOUS ACTIONS REVIEW

| Ref | Action | Owner | Status |
|-----|--------|-------|--------|
| 8.2 | Issue window schedule | TB | CLOSED. Issued 09/07/2026. |
| 8.4 | Asbestos survey, plant room | PR | OPEN. Was due 07/07/2026. PR advises now expected end of week commencing 14/07. See item 4. |
| 8.5 | Crane licence | DH | CLOSED. |

2. PROGRESS

Frame: Complete and signed off. Two days ahead of programme.

Roof: Commenced 08/07/2026. Progressing well, no weather delays to date. Felt at 60% complete. DH forecasts completion 25/07/2026 subject to weather.

M&E first fix: Commenced ground floor, 30% complete. Plant room cannot commence pending the asbestos survey (item 4).

3. WINDOWS: NORTH ELEVATION CILL DETAIL

Window delivery confirmed for 28/07/2026.

TB advised the north elevation cill detail remains unresolved and requires structural input from JW, who sent apologies. Windows cannot be installed until the detail is issued. TB confirmed he can issue the revised detail within 48 hours of JW's confirmation.

Recorded as a blocking item against a confirmed 28/07 delivery.

4. ASBESTOS SURVEY, PLANT ROOM (ESCALATED)

The plant room asbestos survey remains outstanding against an original due date of 07/07/2026.

SN advised that if the survey is not complete by 21/07/2026, Coleford will redeploy their plant room gang to another project, and the earliest return would be approximately three weeks later.

PR undertook to escalate within Fairmont Care on 14/07/2026.

RT raised whether a delay arising from the outstanding survey would constitute a compensation event. No conclusion was reached and the item was parked for further discussion. This minute records only that the question was raised, not that any position was agreed by either party.

5. TEMPORARY AND PERMANENT POWER

SN queried the date for permanent supply, the site currently being on generator. No date was available at the meeting. DH to confirm with Western Power.

6. HANDOVER AND SNAGGING

PR queried the handover process. Agreed that the snagging walk will take place two weeks prior to Practical Completion rather than one week.

7. COMMERCIAL

Valuation 8 submitted 10/07/2026. Certificate due 24/07/2026.

Variations pending:
VO-11, additional sockets. Agreed at £4,200.
VO-12, roof specification upgrade. PR requires a price prior to approval. RT to issue by 18/07/2026.
VO-13, drainage. Requires structural input from JW before pricing.

RT raised that the contract provides for retention at 3%, but the previous certificate deducted 5%. PR to check with Fairmont Care finance.

8. HEALTH AND SAFETY

One near miss recorded 11/07/2026: a tool was dropped from the scaffold. No injury and no damage. The exclusion zone below the scaffold has been reinforced. DH delivered a toolbox talk on 12/07/2026.

9. NEW ACTIONS

| ID | Action | Owner | Due |
|----|--------|-------|-----|
| 9.1 | Email JW requesting confirmation of the north elevation cill detail | TB | 15/07/2026 |
| 9.2 | Issue revised north elevation cill detail, within 48 hours of JW confirmation | TB | 48 hrs from 9.1 response |
| 9.3 | Escalate outstanding plant room asbestos survey within Fairmont Care | PR | 14/07/2026 |
| 9.4 | Confirm permanent supply date with Western Power | DH | 21/07/2026 |
| 9.5 | Issue price for VO-12, roof specification upgrade | RT | 18/07/2026 |
| 9.6 | Provide structural input to VO-13, drainage | JW | 21/07/2026 |
| 9.7 | Confirm contractual retention percentage with Fairmont Care finance | PR | 21/07/2026 |
| 9.8 | Carry over: complete plant room asbestos survey | PR | 21/07/2026 |

10. NEXT MEETING
28 July 2026, 14:00, Microsoft Teams.

11. DISTRIBUTION
All attendees, J. Weston, Fairmont Care project file, project CDE.

── WHAT YOU STILL HAD TO DO ──

Three things, and they are the reason you read it before sending.

Action 9.6 has JW's name on it and JW was not in the meeting. The notes say "Rob says needs Jim's input", which is not the same as Jim accepting an action with a date. You either flag it as proposed or you speak to Jim. The AI put a name and a date on it because you asked for a name and a date on everything, and it did not know Jim was absent.

Item 4 needed handling carefully. The raw note says "Rob asked if that's a comp event, said depends, park it". A careless minute would say the parties discussed a compensation event, which sounds like a position was taken. The wording here records only that the question was raised. That distinction is exactly the kind of thing that gets read closely later, and it is why contractual items get written by you rather than paraphrased.

The three-week delay threat in item 4 is the most important thing in the meeting and the AI buried it in a paragraph. It got promoted to its own numbered item with the escalation flagged. AI structures what you give it. It does not know what matters.`

const MINUTES_USE_CASE = `Use straight after the meeting, while the notes still make sense. Paste in rough bullets, a scrawled list, or a voice memo transcript from the walk back to the car, and you get formatted minutes with a proper action table.

The voice memo route is the one worth building a habit around. Four minutes of talking through what happened, transcribed, gives the AI far more to work with than the three lines you managed to type while chairing.

Read it before you distribute. Check every action has the right owner, especially where someone was not in the room to accept it, and write any contractual item yourself in your own words. Those are the two things the AI will get wrong, and they are both quick to fix once you know to look.`

// ── /ai-workflows/create-cost-value-reconciliation ──────────────────

const CVR_LONG = `A CVR answers one question: are we making what we thought we were making, and if not, when did that change?

This workflow structures the monthly reconciliation. Value against cost, category by category, with a margin position, a risk and opportunity schedule, and the movement since last month. That last section is the one that matters and the one people skip.

A CVR is not a cashflow forecast. The cashflow tells you when money moves. The CVR tells you whether there is any. Different documents, different questions, and mixing them up is how a job with healthy cash and no margin gets reported as fine right up until it is not.

WHEN TO USE THIS

Use it monthly, on the same date, as part of the commercial cycle. The value of a CVR is the trend, and a trend needs consistent dates and consistent treatment. A CVR done properly in March and skipped in April tells you nothing in May.

Use it when you have taken over a job and need to understand where it actually stands. Rebuilding the position from scratch is how you find out what you have inherited.

Use it before a difficult conversation with the client or the board. Knowing your margin position to the nearest £10,000 changes how that meeting goes.

Use it when something has moved and you do not yet know how much. A late variation, a subcontractor in trouble, a programme slip.

WHEN NOT TO USE THIS

Do not use AI-generated figures. Ever. Every number in a CVR comes from your cost system, your subcontract ledger and your valuation. The AI structures and narrates. It does not know what your groundworks subcontractor has actually invoiced and it must never guess.

Do not use it as a substitute for the cost report. The CVR is a summary for a commercial audience. It sits on top of the detail, it does not replace it. If you cannot trace every line in the CVR back to the underlying cost report, the CVR is fiction.

Do not use it to smooth a bad month. The temptation on a CVR is to move a risk into the opportunity column, or hold a forecast that you know is optimistic, because the movement looks bad. Everyone in commercial management knows the shape of this. The problem is that a loss reported late is a much worse conversation than a loss reported early, and the person who spots it will ask what you knew and when. The whole point of a monthly CVR is early warning. Turning it into a reassurance document destroys the only thing it is for.

And do not run it on a job too small to warrant it. A £120,000 fit-out does not need a twelve-category reconciliation with a risk schedule. It needs a cost check against the valuation.

COMMON MISTAKES

Treating anticipated variations as certain value. That £180,000 pipeline of unapproved variations is not value until it is approved, and reporting it as though it is turns a break-even job into a profitable one on paper. Show it, separately, clearly labelled, and never in the headline margin.

Forecasting the final cost as the budget. If the forecast final cost for every category exactly equals the budget, nobody has forecast anything. The forecast is a judgement about where each package actually lands, and it should move. A CVR where nothing has moved since last month is a CVR nobody did.

Trusting the arithmetic. Same as every AI table. Ask for a category breakdown that reconciles to a stated total and you will get one that looks perfect and is £30,000 out. The margin is a small difference between two big numbers, which is exactly the condition where a small arithmetic error becomes a large percentage error. Check every total against the cost system.

FREQUENTLY ASKED QUESTIONS

What is the difference between a CVR and a cashflow forecast?

The CVR is about profit, the cashflow is about liquidity. The CVR compares value earned against cost incurred to tell you the margin. The cashflow maps when money leaves and arrives to tell you the funding requirement. A job can be profitable and still run out of money, and it can have healthy cash while quietly losing margin. You need both, and confusing them is one of the more expensive mistakes in construction commercial management.

How often should a CVR be produced?

Monthly, aligned to the valuation cycle, on the same date every month. Some contractors go quarterly on smaller jobs, which is defensible on a short programme but means a problem can run for three months before anyone sees it. The frequency matters less than the consistency: the number you care about is the movement, and movement is meaningless if the interval keeps changing.

What is a healthy margin movement?

Small and explained. A forecast margin that drifts by a fraction of a percent with a clear reason is normal commercial life. What should worry you is either a large unexplained movement, or no movement at all for months followed by a sudden correction. The second pattern is the classic signature of a job where nobody was really forecasting, and it usually surfaces about two months before completion when it is too late to do anything.

Should the CVR include unapproved variations?

Show them, separately, and never in the headline margin. Anticipated variations are an indication of where the value might go. Including them in the reported position means reporting profit you have not earned and might not get, and it means the day the client rejects VO-24 you take the hit in one month rather than never having booked it. Label it, quantify it, keep it out of the top line.

Can AI calculate our margin?

No. Do not let it try. It cannot add reliably, it has no access to your cost system, and margin is a small difference between two large numbers, which is the worst possible case for a tool that approximates arithmetic. Calculate in your cost system or a spreadsheet, then use AI to structure the report and write the narrative around figures you have verified.`

const CVR_EXAMPLE = `WORKED EXAMPLE: MONTH 8, £9.5M NEC4 OPTION C

The interesting CVR is not the healthy one. This is a job where the margin has moved the wrong way and the report has to say so.

── WHAT GOES IN ──

Project: Weston Gateway, Phase 2 Commercial Unit
Client: Sedgemoor Developments Ltd
Contract Form: NEC4 ECC Option C (target cost with activity schedule)
Original Contract Value: £9,500,000
Approved Variations to Date: £620,000
Anticipated Variations (pipeline): £180,000
Reporting Period: March 2027
Programme Completion: November 2027
Percentage Complete: 55%

Cost data by category (committed / to date / forecast final):
Subcontract packages: £5,200,000 / £2,750,000 / £5,350,000
Materials (direct): £850,000 / £480,000 / £870,000
Labour (direct): £1,100,000 / £620,000 / £1,150,000
Plant: £380,000 / £195,000 / £400,000
Preliminaries: £1,200,000 / £710,000 / £1,250,000
Design fees: £220,000 / £185,000 / £225,000
Overheads: £280,000 / £155,000 / £290,000

── WHAT COMES OUT ──

COST-VALUE RECONCILIATION
Project: Weston Gateway, Phase 2
Period: March 2027
Percentage complete: 55%
Prepared by: Commercial Manager

1. VALUE SUMMARY

| Item | Value |
|------|-------|
| Original Contract Value | £9,500,000 |
| Approved Variations to Date | £620,000 |
| CURRENT CONTRACT VALUE | £10,120,000 |
| Anticipated Variations (pipeline, not approved) | £180,000 |
| TOTAL ANTICIPATED FINAL VALUE | £10,300,000 |

The £180,000 pipeline is shown for information and is excluded from the margin position below. It is not earned value.

2. COST SUMMARY

| Category | Budget | Committed | Cost to Date | Forecast Final | Variance to Budget |
|----------|--------|-----------|--------------|----------------|--------------------|
| Subcontract packages | £5,200,000 | £5,200,000 | £2,750,000 | £5,350,000 | (£150,000) |
| Materials (direct) | £850,000 | £850,000 | £480,000 | £870,000 | (£20,000) |
| Labour (direct) | £1,100,000 | £1,100,000 | £620,000 | £1,150,000 | (£50,000) |
| Plant | £380,000 | £380,000 | £195,000 | £400,000 | (£20,000) |
| Preliminaries | £1,200,000 | £1,200,000 | £710,000 | £1,250,000 | (£50,000) |
| Design fees | £220,000 | £220,000 | £185,000 | £225,000 | (£5,000) |
| Overheads | £280,000 | £280,000 | £155,000 | £290,000 | (£10,000) |
| TOTAL | £9,230,000 | £9,230,000 | £5,095,000 | £9,535,000 | (£305,000) |

Every category is forecast above budget, totalling £305,000. Read at face value that says the whole job is drifting. It does not, and the reason is important: these budgets are the tender budgets for the base scope and they have never been re-baselined for the £620,000 of approved variations. The cost of doing the variation work is landing in these categories against budgets that were never uplifted for it.

So the variance column above is currently meaningless. Fixing that is action 2 below.

3. MARGIN ANALYSIS

| Item | Value | % |
|------|-------|---|
| Current Contract Value (incl. £620,000 approved variations) | £10,120,000 | |
| Forecast Final Cost | £9,535,000 | |
| FORECAST FINAL MARGIN | £585,000 | 5.8% |
| Of which: base scope (£9,500,000 value vs £9,230,000 budget) | £270,000 | 2.8% |
| Of which: approved variations (£620,000 value vs £305,000 cost) | £315,000 | 51% |

The headline is 5.8%, more than double the 2.8% we tendered. That reads as a job going well. It is not, and the split is why.

The base scope is forecasting exactly its tender margin: £270,000, or 2.8%. It has not improved at all. Every penny of the uplift comes from the variations, which are carrying a 51% margin.

A 51% margin on variations under Option C should stop you. Compensation events under this contract are assessed on defined cost plus the contract fee, not at commercial rates. A 51% return says these have been valued optimistically and will not survive the Project Manager's assessment or a defined cost audit.

If the £620,000 were reassessed on defined cost plus the fee, the value would be nearer £329,000 and the forecast margin would fall from £585,000 to roughly £294,000, or 2.9%. That is the same 2.8% job we tendered, with all the risk of the last 45% still to run.

The reported number is not wrong. It is just resting entirely on an assumption nobody has tested.

4. RISK AND OPPORTUNITY SCHEDULE

Top 5 risks:
R1. Subcontract position unclear. Packages are forecasting £150,000 above a budget that was never uplifted for variations, so we cannot currently say whether that is variation work or genuine overrun. Until the re-baseline is done this is an unquantified risk, not a known one. HIGH.
R2. The £180,000 anticipated variation pipeline. VO-31 (£95,000, external works redesign) has been with the client since January with no response. If rejected, we have already incurred approximately £40,000 of the work. MEDIUM.
R3. Preliminaries overrun to completion. £1,250,000 forecast assumes November completion. Every week beyond adds approximately £14,000. Currently no float. HIGH.
R4. Labour rates. £1,150,000 forecast assumes current rates hold to November. Two subcontractors have signalled increases. MEDIUM, £35,000.
R5. Option C pain/gain share. At forecast, we are above target cost. Under the share ranges, our exposure on the overrun is roughly 50% of the excess. This is not currently reflected in the margin above and needs quantifying next month. HIGH.

Top 5 opportunities:
O1. VO-31 approval at full value. £95,000, approximately £48,000 margin. MEDIUM.
O2. Groundworks final account. £45,000 of contra-charges against the groundworks subcontractor for the January reworks, not yet booked. MEDIUM.
O3. Steel package underspend. Forecast £30,000 below committed on final measure. LOW/CERTAIN.
O4. Prelims release. If the fit-out sequence holds, two weeks of site management could come off in October. £28,000. LOW.
O5. Materials rebate. Q4 volume rebate with the main supplier, approximately £18,000. LIKELY.

5. MOVEMENT SINCE LAST REPORT (February 2027)

| Item | Feb | Mar | Movement |
|------|-----|-----|----------|
| Current Contract Value | £10,020,000 | £10,120,000 | +£100,000 |
| Forecast Final Cost | £9,465,000 | £9,535,000 | +£70,000 |
| Forecast Final Margin | £555,000 | £585,000 | +£30,000 |
| Margin % | 5.5% | 5.8% | +0.3% |

Margin is up £30,000 this month. Every bit of that came from £100,000 of newly approved variations. Cost rose £70,000 over the same period.

How much of that £70,000 is the cost of doing the new variation work, and how much is the base job slipping? On the current budget structure we cannot tell, because the budgets have never been re-baselined for variations. That is not a small reporting nicety. It means that for three months we have reported an improving margin without being able to say whether the underlying job is getting better or worse.

That is the finding of this CVR.

6. ACTIONS AND RECOMMENDATIONS

1. Re-baseline the category budgets to include approved variations, before the April CVR. Until that is done the variance column is not telling us anything and we cannot separate base performance from variation work. This is the priority.
2. Quantify the Option C pain share exposure at forecast and report it as a discrete line next month. We are forecasting above target cost and our share of the excess is not reflected in the £585,000 above. It is the largest unreported item in this report.
3. Stress-test the variation valuations against defined cost plus fee. A 51% margin on compensation events will not survive assessment. Model the downside (roughly £294,000 margin, 2.9%) and report both.
4. Escalate VO-31 to the client in writing this week. Ten weeks with no response on a £95,000 variation where we have incurred £40,000 of cost is not sustainable. If the answer is no, we need it now.
5. Book the £45,000 groundworks contra-charge or explain why not. It has been an opportunity for three months, which usually means nobody is chasing it.
6. Present the base versus variation margin split to the board. The headline 5.8% without that split is misleading, and reporting it unqualified is how a 2.8% job gets managed as if it were a 5.8% one.

── THE POINT ──

The margin went up and the report still has bad news in it. Both of those are true, and a CVR that only says the first one is not doing its job.

An AI given this data will produce every table above quite happily and they will look immaculate. What it will not do is notice that the 5.8% is entirely variations, that a 51% margin on Option C compensation events is not credible, or that the budgets were never re-baselined so the variance column means nothing. That is not a formatting problem. It is knowing what to look for, and it is the whole reason a commercial manager reads a CVR rather than generates one.

Then check the arithmetic. The cost categories here sum to £9,535,000 and the margin is a £585,000 difference between two eight-figure numbers. An AI table that is £30,000 out on one category total moves the reported margin by 5%, and it will look exactly as convincing as a correct one.

And check the arithmetic. On this data the cost categories sum to £9,535,000 and the margin is a £585,000 difference between two eight-figure numbers. An AI table that is £30,000 out on a category total moves the reported margin by 5%, and it will look exactly as convincing as a correct one.`

const CVR_USE_CASE = `Run monthly as part of the commercial cycle, on the same date each month, with figures pulled from your cost system rather than estimated. The AI structures the report, writes the narrative, and holds the format consistent. It does not produce the numbers.

Input the value position, the cost data by category, and last month's figures for the movement section. What you get back is the value summary, the cost table, the margin analysis, a risk and opportunity schedule, and the month-on-month movement.

Two rules. Verify every total against the cost system before it goes anywhere, because margin is a small difference between two large numbers and an approximate table is worse than none. And write the interpretation yourself. The AI will tell you the margin moved. It will not tell you why that is bad news.`

// ── updates ─────────────────────────────────────────────────────────

const UPDATES = [
  {
    table: 'tasks',
    slug: 'tender-analysis',
    path: '/ai-for/tender-analysis',
    fields: { long_description: TENDER_ANALYSIS_LONG },
    // meta_title / meta_description already unique and click-worthy (set Jul 2026).
  },
  {
    table: 'tools',
    slug: 'chatgpt',
    path: '/ai-tools/chatgpt',
    fields: {
      long_description: CHATGPT_LONG,
      meta_title: 'ChatGPT for Construction: Honest UK Review',
      meta_description:
        'What ChatGPT is genuinely good at on a UK construction job, with a worked example interrogating a cladding spec, plus the limits, the data rules and the costs.',
    },
  },
  {
    table: 'workflows',
    slug: 'create-bid-no-bid-decision-framework',
    path: '/ai-workflows/create-bid-no-bid-decision-framework',
    fields: {
      long_description: BIDNOBID_LONG,
      example_output: BIDNOBID_EXAMPLE,
      use_case: BIDNOBID_USE_CASE,
      meta_title: 'Bid/No-Bid Framework + Worked £8.5M Example',
      meta_description:
        'Free AI prompt that scores a tender opportunity across 12 factors and gives a RAG rating, with a worked £8.5M school example and a defensible recommendation.',
    },
  },
  {
    table: 'workflows',
    slug: 'generate-meeting-minutes',
    path: '/ai-workflows/generate-meeting-minutes',
    fields: {
      long_description: MINUTES_LONG,
      example_output: MINUTES_EXAMPLE,
      use_case: MINUTES_USE_CASE,
      meta_title: 'Meeting Minutes from Rough Notes: Free AI Prompt',
      meta_description:
        'Free AI prompt that turns scrawled site notes or a voice memo into construction meeting minutes with a proper action table. Worked progress meeting example.',
    },
  },
  {
    table: 'workflows',
    slug: 'create-cost-value-reconciliation',
    path: '/ai-workflows/create-cost-value-reconciliation',
    fields: {
      long_description: CVR_LONG,
      example_output: CVR_EXAMPLE,
      use_case: CVR_USE_CASE,
      meta_title: 'Construction CVR Report: Free AI Prompt + Example',
      meta_description:
        'Free AI prompt that structures a monthly cost-value reconciliation: margin analysis, risk and opportunity schedule, and the movement that shows a job slipping.',
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
        console.log(`     "${existing[k]}" -> "${v}"`)
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
  console.log(dryRun ? '\nDry run complete. Re-run without --dry-run to apply.' : '\nBatch 2 pages updated.')
}

main().catch((err) => {
  console.error('Update failed:', err.message)
  process.exit(1)
})
