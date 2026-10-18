---
title: "Build the assessment date calendar under NEC4"
slug: "build-the-assessment-date-calendar-under-nec4"
summary: "Set out every assessment date for the job, with your application deadline, the certificate date and the payment dates either side, so nothing gets missed or applied for late."
roles: [quantity-surveyor]
task: "payment-timing"
contractForms: [nec4-ecc]
tool: "any"
timeByHandMins: 60
timeWithAiMins: 25
difficulty: "intermediate"
riskIfWrong: "high"
relatedWorkflow: ""
sourceKind: "owen"
sourceUrl: ""
sourceLabel: ""
status: "approved"
---

## When to use it
At the start of an NEC4 job, or as soon as the first assessment date is set. Under NEC4 the application has to be in before each assessment date, so a calendar for the whole job saves a scramble every month and makes the dates easy to share with your team and your subcontractors.

## Prompt
You are helping a UK contractor's quantity surveyor build an assessment date calendar for an NEC4 Engineering and Construction Contract.

Here is what I have:
- First assessment date: [DATE, AS SET BY THE PROJECT MANAGER]
- Assessment interval: [FROM THE CONTRACT DATA]
- Expected completion date: [DATE]
- Payment periods and any changes in the Contract Data: [PASTE]
- The payment clauses as amended in our contract, including Option Y(UK)2 if it applies: [PASTE]
- Bank holidays and shutdown periods to allow for: [E.G. CHRISTMAS SHUTDOWN DATES]

Build a table with one row per assessment, up to completion, with these columns: Assessment number, Assessment date, Our internal draft deadline (five working days before), Application must be submitted by, Certificate due, Payment due date, Final date for payment, Pay less notice deadline, Notes.

Rules:
- Work every period out only from the Contract Data and the clauses I've pasted. Do not fill a period from memory or a default. If a period isn't in what I've given you, leave the column blank and list it under "Not found in what you gave me".
- Flag any date that falls on a weekend, bank holiday or shutdown day, and say what the contract text says about it, if anything.
- After the table, list every assumption you made.
- Add a final line: "Check the contract terms and take advice before relying on this calendar."

## What it produced
A row for every assessment through to completion, with the internal draft deadline, application deadline, certificate date and the payment dates the pasted clauses support. Weekend and holiday clashes are flagged, missing periods are listed rather than guessed, and it ends with its assumptions and the reminder to check the contract.

## What you still check
- The first assessment date and the assessment interval match what the Project Manager actually set and the Contract Data says.
- Every period against the contract as amended, especially if Option Y(UK)2 or bespoke Z clauses change the payment timing.
- Your subcontract assessment dates sit early enough to feed your own application.
- Check the contract terms and take advice before relying on this calendar.

## Steps
1. Gather the Contract Data, the amended payment clauses and the first assessment date.
2. Run the prompt and check the first three rows by hand against the contract.
3. Put the dates in the team calendar and send the relevant ones to your subcontractors.
