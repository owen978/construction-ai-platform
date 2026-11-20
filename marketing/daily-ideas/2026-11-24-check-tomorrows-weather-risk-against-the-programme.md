---
title: "Check tomorrow's weather risk against the programme"
slug: "check-tomorrows-weather-risk-against-the-programme"
summary: "Paste tomorrow's forecast and the activities planned for the day, and get a short list of the work at risk, what to move and what to record."
roles: [site-manager]
task: "planning"
contractForms: []
tool: "any"
timeByHandMins: 30
timeWithAiMins: 15
difficulty: "beginner"
riskIfWrong: "medium"
relatedWorkflow: ""
relatedPage: ""
sourceKind: "owen"
sourceUrl: ""
sourceLabel: ""
status: "approved"
---

## When to use it
Mid-afternoon, before you finalise tomorrow's plan and before the gangs go home. It is most useful in winter and in shoulder seasons, when wind, rain, frost and low temperatures can stop a pour, a lift or a roofing gang at short notice. It does not replace your own judgement or the limits in the RAMS and lifting plans. It just makes sure nobody forgets to check.

## Prompt
You are an experienced UK site manager on a [SIZE AND TYPE OF PROJECT]. I want to check tomorrow's planned work against the weather forecast before I confirm the plan.

Tomorrow's forecast for the site, hour by hour if I have it:
[PASTE FORECAST: temperature, wind speed and gusts, rain, frost, visibility]

The activities planned for tomorrow, from the programme or the short-term look-ahead:
[PASTE ACTIVITIES: activity, location, trade, plant used]

Any weather limits I already know about from the RAMS, lifting plans, method statements or manufacturers' data:
[PASTE LIMITS, e.g. crane wind limit, minimum temperature for concrete, mortar or membranes]

Give me:
1. A table with columns: Activity, Weather risk, Limit that applies (only if I gave it to you), Risk level (Low, Medium, High), Suggested action (carry on, start later, swap with another task, stop).
2. A list of indoor or sheltered tasks from my list that could be brought forward if work has to stop.
3. A short note of what to record in the site diary tomorrow if weather affects the work.

Rules: only use limits I have given you. Where a limit is missing, say "Limit not given: check the RAMS or manufacturer's data" instead of guessing a figure. Do not decide whether work is safe to proceed. That decision stays with me and the competent people on site. Use UK spelling.

## What it produced
A one-page table of tomorrow's activities, each with the weather risk it faces, the limit that applies where you supplied one and a suggested action. Under it, a short list of tasks that could be swapped in if the weather turns, and a reminder of what to write in the diary so any lost time is on record.

## What you still check
- The forecast is for your site, not the nearest town, and is the latest one.
- Every limit matches the actual RAMS, lifting plan or product data sheet, and the tool has not filled in a missing figure.
- The decision to stop or carry on is made by you and the competent person for that task, on the day, using live conditions.
- Any swapped task has its own RAMS, materials and access ready.

## Steps
1. Copy tomorrow's activities from the look-ahead and the forecast for the site postcode.
2. Run the prompt and go through the High and Medium rows with the foremen.
3. Brief the change at the start of shift and record any weather impact in the site diary.
