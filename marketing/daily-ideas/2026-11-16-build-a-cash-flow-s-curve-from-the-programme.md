---
title: "Build a cash flow S-curve from the programme"
slug: "build-a-cash-flow-s-curve-from-the-programme"
summary: "Spread your cost plan or contract sum across the programme activities to get a monthly cash flow forecast and S-curve built only from your own figures."
roles: [quantity-surveyor, commercial-manager]
task: "cash-flow"
contractForms: []
tool: "claude"
timeByHandMins: 180
timeWithAiMins: 75
difficulty: "advanced"
riskIfWrong: "medium"
relatedWorkflow: "generate-cashflow-forecast"
relatedPage: ""
sourceKind: "owen"
sourceUrl: ""
sourceLabel: ""
status: "approved"
---

## When to use it
At tender stage, at contract award, or whenever the programme is re-baselined and the client or your finance director asks what the money looks like month by month. It does the spreading and the arithmetic. You still decide how each package really draws its cost, and where the retention and payment lag sit.

## Prompt
You are an experienced UK quantity surveyor working for a main contractor. I need a monthly cash flow forecast and S-curve for a [SIZE AND TYPE OF PROJECT] running from [START DATE] to [COMPLETION DATE].

Below are two lists:
1. The programme: each activity with its start date, finish date and any link to a cost item.
2. The cost plan or contract sum analysis, broken down by package or element, with the value of each.

Do the following:
- Map each cost item to the programme activity or activities it belongs to. Show the mapping as a table so I can check it.
- Spread each item across the months it runs. Use an even spread unless I tell you otherwise below. Where I give a different profile (front loaded, back loaded, or a lump at a set month), use that.
- Return a table with columns: Month, Value in month, Cumulative value, Cumulative percentage of total.
- Then adjust it for cash: apply retention at [RETENTION %], release of half at [PRACTICAL COMPLETION DATE] and the rest at [END OF DEFECTS PERIOD], and a payment lag of [NUMBER] days from valuation to payment. Show this as a second table: Month, Gross value, Retention held, Net cash received, Cumulative net cash.
- Give me the cumulative figures in a format I can paste into a spreadsheet to draw the S-curve.

Rules:
- Only use the figures, dates and percentages I give you. Do not invent rates, values or profiles.
- If a cost item doesn't match any activity, or an activity has no cost, list it under "Not mapped" rather than guessing.
- Check that the total of the monthly values equals the total of the cost plan, and tell me if it doesn't.
- Use UK spelling and plain English.

Profiles for specific items (optional):
[E.G. PRELIMINARIES EVEN ACROSS THE JOB, CLADDING BACK LOADED]

Programme:
[PASTE PROGRAMME ACTIVITIES AND DATES]

Cost plan:
[PASTE COST PLAN OR CONTRACT SUM ANALYSIS]

## What it produced
A mapping table showing which cost items sit against which programme activities, plus a "Not mapped" list for anything it couldn't place. Then a monthly value table with cumulative totals and percentages, a second table adjusted for retention and payment lag, a check that the spread adds back to the cost plan total, and a column of cumulative figures ready to chart as an S-curve.

## What you still check
- The mapping. A wrong link between a package and an activity shifts money into the wrong months.
- The profiles. An even spread rarely matches how groundworks, frame or cladding actually draw cost, so adjust the big packages by hand.
- Retention, payment terms and any milestone or advance payments against the actual contract.
- That the total still reconciles to your cost plan after every change, and that preliminaries follow the programme, not the value.
- That the programme you used is the current one, not last month's revision.

## Steps
1. Export the programme activities with dates, and the cost plan by package, into two plain lists.
2. Run the prompt, then fix the mapping and the profiles for your largest packages.
3. Paste the cumulative figures into a spreadsheet, draw the S-curve and update it whenever the programme moves.
