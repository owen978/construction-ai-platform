#!/usr/bin/env node
/**
 * enrich-workflows-batch1.mjs — indexing remediation for two workflow pages.
 *
 * Usage:  node scripts/enrich-workflows-batch1.mjs [--dry-run]
 *
 * Rewrites long_description / example_output / use_case (and meta where noted)
 * for workflows Google crawled but declined to index as thin content.
 * Upserts by slug, same pattern as scripts/update-meta-gsc.mjs. Never inserts.
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

// ── draft-rfi-response ──────────────────────────────────────────────

const RFI_LONG = `This workflow drafts a formal response to a Request for Information, structured so that it answers the question, records the design reasoning, and flags every downstream impact before it becomes somebody else's problem on site.

An RFI response is not just an answer. It is a contemporaneous record of a design decision, and it will be read again in a year by someone trying to work out who agreed to what. The structure this workflow produces addresses the original query, states the design intent, gives a resolution, assesses cross-discipline impact, and lists the drawings that now need revising. The output is ready to issue through the project CDE or document management system.

WHEN TO USE THIS

Use it when you have an RFI in front of you and the answer touches more than one discipline. That is where the time goes and where the errors are. A structural change that quietly breaks the ceiling void, a fire strategy assumption nobody rechecked, a duct that no longer fits.

Use it when you are answering under a contractual clock. Most UK contracts set a response period for information requests, and NEC4 users will recognise the shape of clause 27.2 and the Information Release Schedule. A structured draft in ten minutes is what stops a two-day answer taking eight days.

Use it when the answer might carry cost or time. The draft flags that early rather than letting it surface at the next commercial meeting.

Use it for the RFIs that arrive at 4pm on a Friday, which is most of them.

WHEN NOT TO USE THIS

Do not use it when the honest answer is "the drawing is right, build it as drawn". That is a two-line reply. Wrapping it in nine headings makes you look like you are hiding something and wastes the site team's afternoon.

Do not use it to answer an RFI that is really an instruction request. If the contractor is asking you to change something, that is a variation or a compensation event, not an RFI, and answering it as an RFI is how design teams accidentally instruct changes for free. Under JCT the change comes through an architect's instruction. Under NEC4 it comes through the Project Manager. Say so in the response and route it properly.

Do not use it where you do not actually have the answer yet. An AI will write a confident, plausible resolution off the facts you gave it. If the real position is "the structural engineer is checking and we will confirm by Thursday", say that. A holding response with a date is a professional answer. An invented one is a liability.

And do not paste an RFI containing client-confidential or security-sensitive information into a consumer AI tool. Check your appointment and your practice policy first.

COMMON MISTAKES

Answering the question asked and ignoring the question implied. The RFI says "confirm the beam depth". What it means is "I cannot build this and I need to know by Tuesday". If your answer resolves the beam but leaves the ceiling clash open, you have not answered it. The cross-discipline impact section exists for exactly this reason, so do not delete it when it comes back empty. Go and check instead.

Letting the AI invent the design intent. It does not know why the ceiling was set at 2700. It will confidently tell you anyway. Fill in the design intent yourself or leave it blank and write it after you have asked the person who set it.

Burying the cost and programme flag. If the resolution may give rise to a variation, that belongs near the top in plain words, not in section 7 where the commercial team will find it three weeks later.

FREQUENTLY ASKED QUESTIONS

How long should an RFI response take?
Contractually, whatever your appointment or the Information Release Schedule says, commonly 5 to 10 working days, and shorter where the RFI is marked urgent. Practically, the drafting is never the bottleneck. The coordination is. This workflow removes the drafting time so the days you have go on actually checking the answer with the other disciplines.

Does an RFI response count as an instruction?
No, and this trips people up constantly. An RFI response clarifies what the design already requires. If it changes what the design requires, it needs to be issued as an instruction through the contractual route, whether that is an AI under JCT or the Project Manager under NEC4. An RFI response that quietly changes the scope is unenforceable at best and an argument at worst. If your answer changes the job, say so and ask for the instruction.

Can AI read the drawings for me?
Partly, and not enough to rely on. The current tools can read a PDF drawing and describe what is on it, and they will miss things a competent design manager would not, particularly across sheets and revisions. Use AI for the words. Do the drawing check yourself.

What if the RFI is really a design fault we caused?
Answer it anyway, factually, in the same structure, and get it into the record properly. Then deal with the liability question separately with whoever needs to know. What you must not do is write a vague RFI response to obscure the fault. A woolly answer in the CDE is far more damaging in a later dispute than a clear one, because it looks exactly like what it is.`

const RFI_EXAMPLE = `WORKED EXAMPLE: LINTEL SPECIFICATION CLASH

This is what goes in and what comes out. A real shape of RFI: the sort that looks trivial and takes a fortnight because three parties each hold a piece of the answer.

── THE RFI THAT ARRIVED ──

RFI-0087
Project: Kingsdown Mews, Plots 12-18
Date: 09/07/2026
From: Lee Hartnell, Site Manager, Fairhaven Homes
Discipline: Structural / Architectural
Response required by: 16/07/2026

Query:
Drawing A-201 Rev D shows the lounge window to Plot 14 as 2400mm wide with a 150mm structural opening head at 2400mm AFFL. The structural schedule S-SCH-04 Rev B calls up a Catnic CG90/100 box lintel for this opening, which is 219mm deep. The architectural elevation shows brick coursing continuing to soffit level with a two-course soldier detail above the opening.

With a 219mm lintel and the soldier course above, the head of the opening drops to approximately 2331mm AFFL, and the soldier course fouls the first floor DPC tray shown on detail A-D-14.

Please confirm: (a) the correct lintel reference, (b) whether the soldier detail is to be retained, and (c) the resulting structural opening height. Bricklayers are on site from 20/07 and this affects Plots 12 to 18 as the detail repeats.

── WHAT YOU FEED THE PROMPT ──

You paste the RFI text above into the query field, then fill in:

Available design information:
- A-201 Rev D (elevations), A-D-14 (window head detail), S-SCH-04 Rev B (lintel schedule)
- Catnic CG90/100 technical data: 219mm height, 100mm cavity, 2700mm length for 2400mm opening
- Structural engineer email 11/07/2026 confirming CG50/100 (143mm) is adequate for the loading at Plot 14 given the roof truss layout, subject to end bearing of 150mm each side
- Room data sheet: minimum head height 2300mm AFFL

Design intent:
The 2400mm head height was set to align with the door head on the same elevation. The soldier course is an elevational feature required by the planning approval (condition 4, materials and detailing).

Proposed resolution:
Substitute the shallower CG50/100 lintel confirmed by the SE, retain the soldier course, and revise the DPC tray detail to sit above the soldier rather than through it.

── WHAT THE AI DRAFTS ──

RFI RESPONSE
RFI Ref: RFI-0087
Response Ref: RFI-0087-R1
Project: Kingsdown Mews, Plots 12-18
Date of response: 14/07/2026
Responded by: A. Crocker, Design Manager

1. QUERY RESTATED
Confirmation is sought on the lintel reference to the Plot 14 lounge window (2400mm structural opening), whether the two-course soldier detail above the opening is retained, and the resulting structural opening head height. The query notes a conflict between the 219mm CG90/100 lintel scheduled on S-SCH-04 Rev B and the head height and DPC tray arrangement shown on A-201 Rev D and A-D-14.

2. DESIGN REVIEW SUMMARY
The query was reviewed by the design manager with Pellow Structural Engineers on 11 July 2026, and against the planning approval dated 3 March 2026. The lintel schedule was checked against the current truss layout and loading. The window head detail A-D-14 was reviewed with the architect.

3. RESPONSE AND RESOLUTION
(a) Lintel reference. The CG90/100 on S-SCH-04 Rev B is superseded. Pellow Structural Engineers confirm that a Catnic CG50/100 (143mm height) is adequate for the loading at this location, subject to minimum end bearing of 150mm each side. The lintel schedule will be revised to CG50/100 for the lounge window openings to Plots 12 to 18.

(b) Soldier course. Retained. The two-course soldier detail is required by planning condition 4 (materials and detailing) and is not to be omitted. Any proposal to omit it would require a non-material amendment and is not accepted.

(c) Structural opening head height. 2400mm AFFL is confirmed and unchanged. With the 143mm CG50/100 and the soldier course set above the lintel rather than below it, the head height is achieved and the room data sheet minimum of 2300mm AFFL is satisfied with margin.

The DPC tray shown on A-D-14 is to be repositioned to sit above the soldier course, discharging over the lintel via stop ends and weep holes at 450mm centres in the course immediately above the soldier. Revised detail A-D-14 Rev A to follow by 16/07/2026.

4. IMPACT ON OTHER DISCIPLINES
Structural: lintel schedule revision only. No change to loading, foundations or truss layout. Confirmed by Pellow SE 11/07/2026.
Architectural: revised head detail A-D-14 Rev A. No change to elevation A-201 Rev D, which remains correct as drawn.
MEP: none. No services in this zone.
Fire: none. Not a compartment line.
Planning: soldier course retained, so no departure from condition 4. No planning action required.

5. DRAWING AND SPECIFICATION UPDATES REQUIRED
S-SCH-04 Rev C: lintel reference amended to CG50/100 for lounge window openings, Plots 12 to 18. Issue by 16/07/2026.
A-D-14 Rev A: DPC tray repositioned above soldier course, weep holes and stop ends shown. Issue by 16/07/2026.
A-201: no change.

6. COST AND PROGRAMME IMPLICATIONS
Potential cost saving. The CG50/100 is a lower-cost lintel than the scheduled CG90/100 across seven plots. Fairhaven Homes to confirm whether a credit arises under the contract. This response is a clarification of the design, not an instruction to vary, and no variation is instructed by this response.
No programme impact provided the revised details are issued by 16/07/2026, ahead of bricklayers commencing 20/07/2026.

7. DISTRIBUTION
Lee Hartnell (Fairhaven Homes, originator), Pellow Structural Engineers, Marsh Architects, Fairhaven commercial team, project CDE.

8. ACTION REQUIRED
Marsh Architects: issue A-D-14 Rev A by 16/07/2026.
Pellow SE: issue S-SCH-04 Rev C by 16/07/2026.
Fairhaven Homes: confirm receipt and confirm the lintel order is amended before delivery. Note the lintel order for Plots 12-18 may already be placed.
Design Manager: close RFI-0087 on receipt of both revisions.

── WHAT THE AI GOT RIGHT, AND WHAT YOU STILL DO ──

It structured the answer, held all three sub-questions together, and picked up from the facts you gave it that the response should be flagged as a clarification rather than an instruction. It also caught that the lintel order might already be placed, because you mentioned bricklayers on 20/07.

What it could not do: the engineer's confirmation that a 143mm lintel actually works. That came from a human with the loading in front of them. If you had not obtained that first, the AI would have written the same confident paragraph anyway, and you would have issued a formal response saying a lintel was adequate on no authority at all.

That is the whole game with RFI responses. AI does the writing. You do the checking.`

const RFI_USE_CASE = `Use when an RFI lands from the site team or contractor and the answer crosses more than one discipline, so every impact gets identified and written down before it turns into a clash on site.

Typical trigger: a query that touches two consultants and has a date on it. Structural versus architectural head heights, a duct route versus a downstand, a fire strategy assumption versus a door schedule. The drafting is not the hard part, the coordination is, and this gets the drafting out of the way so you can spend the time checking the answer.

Fits naturally alongside the design manager's weekly RFI log review. Draft the responses in a batch, then walk them through the disciplines that are affected.`

// ── generate-cashflow-forecast ──────────────────────────────────────

const CASH_LONG = `This workflow turns a programme and a contract sum into a monthly cashflow forecast: expenditure profile, valuation income, retention, and the net cash position month by month, with an S-curve shape that reflects how the job actually builds.

The output is the thing your finance director, your funder and your monthly report all want, and it is the thing most people build by hand in a spreadsheet every month.

The point of a cashflow forecast is not the total. You already know the total, it is the contract sum. The point is the trough: the month where you are furthest out of pocket, and how much funding you need to get through it. Everything else in the forecast is scaffolding around that one number.

WHEN TO USE THIS

Use it at contract award, when you need a first cashflow for the funder or the board and you have a programme but no history.

Use it monthly, to reforecast. This is where it earns its keep. The programme has moved, variations have landed, and the profile you drew in month one is now fiction. Rerunning it with current numbers takes minutes.

Use it when you are testing a scenario. What does a six-week delay to the frame do to the funding requirement? What if the client's payment terms go from 14 to 30 days? Change one input and look at the trough.

Use it on any job where the funding is tight enough that the trough matters, which in UK contracting is most of them.

WHEN NOT TO USE THIS

Do not use it as your actual cost control. A cashflow forecast is a funding tool. It is not a cost report and it is not a CVR. It tells you when money moves, not whether you are making any. If your margin is wrong, this forecast will show you a beautifully profiled route to losing it on schedule.

Do not use AI-generated profiles where you have real data. If you are in month nine of fifteen, your actual valuations to date beat any modelled S-curve. Use the actuals for the months that have happened and only model the remainder. People forget this and re-model the whole job every month, which throws away the best information they have.

Do not use it for a genuinely front-loaded or lumpy job without saying so. A scheme that is 60 percent one M&E package delivered in two deliveries does not have an S-curve, it has a staircase. The prompt has a front-end loading field for a reason. Fill it in honestly.

Do not hand the raw output to a funder. It is a first draft with modelled numbers in it. Your name goes on the version that goes out, and you should be able to defend every line.

COMMON MISTAKES

Confusing expenditure with valuation. They are different curves and the gap between them is your problem. Your costs go out when the subbies invoice. Your money comes in after the valuation, after the payment notice, after the payment period. On a monthly valuation with 14-day terms, that is a lag of roughly six weeks between spending and being paid, and if the model does not have that lag in it, the trough will look far shallower than it is.

Forgetting retention actually gets held. 3 percent sounds small until you see it as a line on a £14m job. Half of it usually stays put until practical completion and the rest until the end of the defects period, which is often well past the end of your forecast. Model it as held cash, not as a footnote.

Trusting the AI's arithmetic. This is the one that catches people. AI models are not calculators. Ask for fifteen months of expenditure that sums to £14.2m and it will produce a table that looks completely right and adds up to £14.34m. Check the totals. Every time. If the cumulative column does not land exactly on the contract sum, the whole forecast is wrong and it is wrong in a way that looks fine.

FREQUENTLY ASKED QUESTIONS

What is an S-curve and why does construction spend follow one?
The cumulative expenditure curve on most construction projects is S-shaped: slow at the start, steep in the middle, flattening at the end. It happens because of how jobs mobilise. Early on you have a small gang doing enabling and substructure. In the middle you have the frame, envelope and M&E rough-in all running at once with maximum labour on site. At the end you are down to snagging and commissioning with a handful of people. Draw cumulative spend against time and you get an S. If your forecast is a straight line, it is not a forecast, it is a division sum.

How accurate is an AI-generated cashflow?
The shape is usually reasonable. The numbers are as good as your inputs and the arithmetic needs checking. Treat it as a well-informed first draft that saves you an hour of spreadsheet work, not as an output you can issue. The one thing it genuinely cannot know is your job: that the steel is on a six-week lead and lands in one payment, or that the client always pays on day 29.

Should the forecast be based on cost or on value?
Both, and that is the entire point of the exercise. Model expenditure (what you pay out) and valuation income (what you get in) as separate lines, then the net position is the difference. A forecast with only one of them tells you nothing about funding. If you are only being asked for one, ask which question they are actually trying to answer.

How does retention affect the cashflow?
It withholds a percentage of every valuation, commonly 3 to 5 percent on UK contracts, usually with half released at practical completion and the balance at the end of the defects liability period. On a £14m job at 3 percent that is £426,000 sitting with the client, and the second half of it typically falls outside a 15-month forecast entirely. Model it explicitly as a held line, because it is real money and it is the difference between the forecast and the bank.

What payment terms should I model?
Whatever your contract says, not what you hope. Under the Housing Grants, Construction and Regeneration Act 1996 as amended, the contract sets the due date and the final date for payment, and the payment notice and pay less notice regime hangs off those. Read the dates out of your contract and model those. And model your subcontract payment terms separately, because the gap between when you pay them and when you get paid is exactly what the forecast is measuring.`

const CASH_EXAMPLE = `WORKED EXAMPLE: £4.2M PRIMARY SCHOOL EXTENSION

A real shape of job. Two-storey teaching block extension to an occupied primary school in Taunton, JCT Design and Build 2016, 11 months, works confined to term time restrictions with the noisy demolition in the summer holidays.

── WHAT GOES IN ──

Project: Bishops Hull Primary, Teaching Block Extension
Contract Value (incl. approved variations): £4,240,000
Start on Site: 1 September 2026
Planned Completion: 31 July 2027
Duration: 11 months
Current Month: Month 1 of 11
Retention: 3%, half released at PC, balance at end of 12-month DLP
Payment Terms: Monthly valuations, due date 7 days after valuation, final date for payment 21 days after due date
Front-End Loading: Yes. Demolition and substructure compressed into months 1-2 to use the summer holiday window. Steel frame ordered month 1, six-week lead, delivered and paid in month 3.

Expenditure profile:
- Months 1-2: demolition, enabling, piling, substructure. Heavy early spend due to holiday window.
- Months 3-7: steel frame, envelope, roof, M&E first fix. Peak.
- Months 8-11: fit-out, commissioning, external works, handover. Declining.

── WHAT COMES OUT ──

MONTHLY CASHFLOW FORECAST

| Mth | Month | Expenditure | Cum. Exp | Valuation | Cum. Val | Retention held | Cash received | Net cash position |
|-----|-------|------------|----------|-----------|----------|---------------|---------------|-------------------|
| 1 | Sep 26 | £310,000 | £310,000 | £330,000 | £330,000 | £9,900 | £0 | -£310,000 |
| 2 | Oct 26 | £395,000 | £705,000 | £420,000 | £750,000 | £22,500 | £320,100 | -£384,900 |
| 3 | Nov 26 | £540,000 | £1,245,000 | £575,000 | £1,325,000 | £39,750 | £407,400 | -£517,500 |
| 4 | Dec 26 | £480,000 | £1,725,000 | £510,000 | £1,835,000 | £55,050 | £557,750 | -£439,750 |
| 5 | Jan 27 | £515,000 | £2,240,000 | £545,000 | £2,380,000 | £71,400 | £494,700 | -£460,050 |
| 6 | Feb 27 | £495,000 | £2,735,000 | £525,000 | £2,905,000 | £87,150 | £528,650 | -£426,400 |
| 7 | Mar 27 | £450,000 | £3,185,000 | £480,000 | £3,385,000 | £101,550 | £509,250 | -£367,150 |
| 8 | Apr 27 | £385,000 | £3,570,000 | £410,000 | £3,795,000 | £113,850 | £465,600 | -£286,550 |
| 9 | May 27 | £310,000 | £3,880,000 | £330,000 | £4,125,000 | £123,750 | £397,700 | -£198,850 |
| 10 | Jun 27 | £185,000 | £4,065,000 | £75,000 | £4,200,000 | £126,000 | £320,100 | -£63,750 |
| 11 | Jul 27 | £110,000 | £4,175,000 | £40,000 | £4,240,000 | £127,200 | £71,750 | -£102,000 |

Note: valuation income is shown received in the month it is paid, roughly one month after the valuation, reflecting the 7-day due date and 21-day final date for payment. Month 1's valuation is received in month 2. This lag is the whole reason the net position stays negative throughout.

CASHFLOW SUMMARY

Total forecast expenditure: £4,175,000
Contract value: £4,240,000
Forecast margin: £65,000 (1.5%)
Peak monthly expenditure: Month 3 (Nov 26), £540,000
Maximum cash funding requirement: £517,500, occurring in Month 3 (Nov 26)
Retention held at PC: £127,200. £63,600 released at PC (Jul 27), £63,600 at end of DLP (Jul 28, outside this forecast)

S-CURVE DESCRIPTION

The cumulative expenditure curve is a compressed S with an early shoulder. It rises steeply from month 1 rather than easing in, because the demolition and substructure are forced into the summer holiday window and the steel is paid in month 3 on a six-week lead. The first inflection is at month 3, where the curve reaches 30 percent of total spend by month 3 of 11, which is well ahead of a standard profile. It then runs close to linear through the peak from months 3 to 7, and flattens from month 8 as fit-out gives way to commissioning. By month 9 the job is 93 percent spent with two months to run.

The consequence of that early shoulder is the trough. Maximum funding requirement of £517,500 lands in month 3 rather than the middle of the job, and it is driven by the steel payment landing before the first two valuations have been paid.

KEY ASSUMPTIONS AND RISKS

1. Steel payment of approximately £310,000 assumed in month 3 on delivery. If the fabricator wants payment on order, the trough moves to month 2 and deepens by roughly £150,000.
2. Client pays to contractual terms. Every week of late payment moves the trough by roughly £120,000 on this profile.
3. Margin of 1.5 percent is thin. This forecast has no headroom for a delay. A four-week overrun into the September term would add prelims against no additional income and turn the margin negative.
4. Retention released in full at PC assumed on time. Second half falls outside the forecast entirely.
5. No allowance for the risk that term-time noise restrictions push demolition beyond the holiday window. That is the single biggest programme risk on this job and it sits directly on the front-loaded section of the curve.

── THE BIT THAT MATTERS ──

Look at the maximum funding requirement: £517,500 in month 3 on a £4.24m job. That is 12 percent of contract value that you have to find, in month 3, on a scheme with a £65,000 margin.

That is the number you take to the board. Everything else in the table is working out.

And check the arithmetic before you send it. On the first run of this exact prompt, the cumulative expenditure column landed at £4,205,000 against a stated £4,175,000 total. The table looked perfect. It was wrong by £30,000 because the model does not add up, it predicts what an addition looks like. Sum the column yourself.`

const CASH_USE_CASE = `Use at contract award to build the first cashflow, then monthly to reforecast as the programme moves and variations land.

Input the contract value, the dates, the retention and payment terms, and a short description of how the spend actually profiles, and you get a monthly table with expenditure, valuation income, retention held and the net cash position, plus the funding trough and an S-curve description.

Also useful for scenario testing before a commercial meeting. Change the payment terms or push a key package back six weeks and see what happens to the funding requirement.

One rule: once the job is running, feed in your actual valuations for the months that have happened and only model the remainder. Real data beats a modelled curve every time.`

// ── updates ─────────────────────────────────────────────────────────

const UPDATES = [
  {
    table: 'workflows',
    slug: 'draft-rfi-response',
    path: '/ai-workflows/draft-rfi-response',
    fields: {
      long_description: RFI_LONG,
      example_output: RFI_EXAMPLE,
      use_case: RFI_USE_CASE,
      // meta_title / meta_description already unique and click-worthy (set July 2026) — left as is.
    },
  },
  {
    table: 'workflows',
    slug: 'generate-cashflow-forecast',
    path: '/ai-workflows/generate-cashflow-forecast',
    fields: {
      long_description: CASH_LONG,
      example_output: CASH_EXAMPLE,
      use_case: CASH_USE_CASE,
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
    const { data: existing, error: selErr } = await supabase
      .from(u.table)
      .select('id, long_description, example_output, use_case')
      .eq('slug', u.slug)
      .maybeSingle()

    if (selErr || !existing) {
      console.error(`SKIP ${u.path}: ${selErr ? selErr.message : 'row not found'}`)
      failures++
      continue
    }

    const before = words(existing.long_description) + words(existing.example_output) + words(existing.use_case)
    const after = Object.values(u.fields).reduce((n, v) => n + words(v), 0)
    console.log(`\n${u.path} (${u.table}/${u.slug})`)
    console.log(`  body words (long_description + example_output + use_case): ${before} -> ${after}`)

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
  console.log(dryRun ? '\nDry run complete. Re-run without --dry-run to apply.' : '\nWorkflow pages updated.')
}

main().catch((err) => {
  console.error('Update failed:', err.message)
  process.exit(1)
})
