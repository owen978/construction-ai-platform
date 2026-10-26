---
title: "Match supplier invoices to purchase orders and flag the differences"
slug: "match-supplier-invoices-to-purchase-orders"
metaTitle: "Match supplier invoices to purchase orders with AI"
summary: "Line up a batch of supplier invoices against your purchase orders and delivery notes, and get a short list of the ones that don't match and why."
roles: [quantity-surveyor, procurement-manager]
task: "invoices"
contractForms: []
tool: "claude"
timeByHandMins: 90
timeWithAiMins: 35
difficulty: "intermediate"
riskIfWrong: "medium"
relatedWorkflow: ""
relatedPage: ""
sourceKind: "owen"
sourceUrl: ""
sourceLabel: ""
status: "approved"
---

## When to use it
At month end, or whenever a pile of supplier invoices needs approving before the payment run. Most invoices match and just need a tick. The job is finding the few that don't: the wrong rate, the extra delivery charge, the quantity nobody received. This does the lining up so you can spend your time on the exceptions.

## Prompt
You are an experienced UK construction quantity surveyor checking supplier invoices for a main contractor on a [SIZE AND TYPE OF PROJECT].

Below are three lists:
1. The supplier invoices, with invoice number, date, PO number, items, quantities, rates and totals.
2. The purchase orders they relate to, with PO number, items, quantities, agreed rates and any agreed charges.
3. The delivery notes or goods received records, with date, PO number, items and quantities received.

Match each invoice line to its purchase order and delivery record, then give me:
- A table of every invoice with columns: Invoice no., PO no., Invoice total, PO value for those items, Difference, Status (Matches, Query, Can't match).
- A separate table of every line with a difference, with columns: Invoice no., Item, What's different (rate, quantity, item not on PO, not delivered, extra charge, VAT, arithmetic), Invoice says, PO or delivery record says.
- A list of invoices with no PO number or a PO I haven't given you.
- Any invoices that look like duplicates (same supplier, similar amount, same items or dates).
- A short, polite query to each supplier with a difference, listing the specific lines.

Rules: only use the figures in the lists I've given you. Do not assume a rate or quantity that isn't there. If you can't match something, say so and put it under "Can't match" rather than guessing. Check the arithmetic on each invoice. Use UK spelling.

Invoices:
[PASTE INVOICES]

Purchase orders:
[PASTE PURCHASE ORDERS]

Delivery notes or goods received:
[PASTE DELIVERY RECORDS]

## What it produced
A summary table with one row per invoice and a status against each, so the matches can be approved quickly. Under it, a table of the lines that don't match, showing what the invoice says against what the PO or delivery record says. Then a list of invoices with no PO, any possible duplicates, and a short query for each supplier ready to send.

## What you still check
- Every "Matches" status against the source documents for a sample of invoices, not just the exceptions.
- Deliveries the tool couldn't find: check site records and the storeman before you dispute anything.
- Rates and charges against any later agreed changes to the order that aren't in the PO you pasted.
- Possible duplicates against your accounts system before you reject them.
- Supplier invoices and pricing are commercially sensitive. Use your company's approved AI tool, not a personal account.

## Steps
1. Export the invoices, purchase orders and delivery records for the period, keeping the PO numbers on every line.
2. Run the prompt and work through the "Query" and "Can't match" rows first.
3. Approve the matches, send the supplier queries, and hold the disputed lines out of the payment run.
