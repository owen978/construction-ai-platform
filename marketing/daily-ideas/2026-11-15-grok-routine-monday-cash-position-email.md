---
title: "Grok routine: a Monday cash position email drafted for review"
slug: "grok-routine-monday-cash-position-email"
metaTitle: "Grok routine: a Monday cash position email for review"
summary: "Save a Grok routine that turns your weekly cash figures into a short Monday email for the directors, drafted for you to check before anything is sent."
roles: [commercial-manager]
task: "agents"
contractForms: []
tool: "grok"
timeByHandMins: 45
timeWithAiMins: 20
difficulty: "advanced"
riskIfWrong: "medium"
relatedWorkflow: ""
relatedPage: ""
sourceKind: "owen"
sourceUrl: ""
sourceLabel: ""
status: "approved"
---

## When to use it
When you send the directors a cash position update every Monday and spend too long turning the same spreadsheet into the same email. A routine is a saved prompt you run the same way each week, and if your Grok plan offers scheduled tasks you can set it to remind you on Monday morning. Grok only sees the figures you give it. It does not connect to your bank or accounts, and it never sends the email. Use a business account your company has approved for financial data, not a personal one.

## Prompt
You are helping a UK construction commercial manager write the weekly cash position email to the directors. Write it from the figures below only.

This week's figures, from our own records as at [DATE]:
- Cash at bank: [FIGURE]
- Receipts expected in the next four weeks, by project: [PASTE LIST WITH DUE DATES]
- Payments due in the next four weeks (subcontractors, suppliers, payroll, VAT, other): [PASTE LIST WITH DUE DATES]
- Overdue debtors over 30 days: [PASTE LIST]
- Retention held by clients and due for release: [PASTE LIST]
- Last week's email (optional, for comparison): [PASTE]

Write an email of no more than 250 words with:
1. A one-line headline on the position this week.
2. A short table: week, receipts in, payments out, closing balance, using only the figures above.
3. The three items that matter most this week, such as a large receipt at risk or a payment run that needs approval.
4. What has changed since last week, if I gave you last week's email.
5. Any actions needed from the directors.

Rules: use only the figures I have given you. Do not estimate, forecast beyond them or fill gaps. Check the arithmetic and show any figure that does not add up under "Check before sending". If something is missing, list it there too. Plain UK English, no jargon, no exclamation marks. Do not name clients or subcontractors unless I have named them above.

## What it produced
A short draft email: a one-line headline, a four-week table of receipts, payments and closing balances built only from the figures given, the three items that need attention, changes since last week and any actions for the directors. Under it, a "Check before sending" list of arithmetic that did not add up and any missing figures.

## What you still check
- Every figure against the bank, the ledger and the payment schedule. The routine is only as good as the numbers you paste.
- Receipt dates are realistic, based on payment notices and what clients have actually said, not just invoice dates.
- Nothing commercially sensitive goes to people who should not see it.
- You read and send the email yourself. The routine drafts; it never sends.

## Steps
1. Save the prompt as a routine in your company's approved Grok account, with a Monday reminder if your plan offers scheduled tasks.
2. Each Monday, paste in this week's figures from your own records and run it.
3. Clear the "Check before sending" list, edit the wording, then send it yourself.
