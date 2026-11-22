---
status: "approved"
updated: "2026-11-22"
slug: "claude"
h1: "Claude for Construction: How to Use It on UK Projects"
intro: "Claude is Anthropic's AI assistant. In construction it's most useful for reading long documents such as contracts, specifications, tender packs and meeting notes, then summarising, comparing or drafting from them. Treat it as a drafting and checking tool, not a decision maker. Someone who knows the job reviews every output before it goes anywhere."
---

## What is Claude good at in construction?

Claude is a general-purpose assistant, so it isn't built for construction. What makes it useful on a job is that most construction admin is reading and writing, and that's what it does well:

- **Long documents.** A subcontract, a specification or a tender pack can go in whole, and you can ask for a summary, a list of obligations or every mention of a topic. The [summarise key contract clauses](/ai-workflows/summarise-contract-clauses) workflow is the place to start.
- **Contract clauses.** Finding the payment terms, notice periods, time bars and amendments you need to check, with the clause each one came from.
- **Tender comparison.** Putting several returns or quotes into one table and listing every exclusion and qualification. See [analyse and compare tender returns](/ai-workflows/analyse-tender-returns).
- **Reports and letters.** Turning notes into progress reports, minutes, notices and covering letters in a consistent format.
- **Checking a draft.** Asking it to check your document against a list: missing items, dates that don't agree, sections you said you'd include.

## How do you use Claude in construction management?

Use it for the reading and writing that surrounds the programme: progress reports, delay notices, minutes and lessons learned. Give it your own notes and documents, ask for a specific format, and check every fact before anything goes out.

For monthly reporting, the [draft a monthly progress report](/ai-workflows/draft-monthly-progress-report) workflow turns your notes, programme status and issues log into a report in a set structure. When something slips, [draft a contractual notice for delay](/ai-workflows/draft-contractual-notice-for-delay) gets a notice drafted quickly, but you still check the clause, the notice period and the date it has to be served by yourself. After a meeting, paste in your notes and ask for minutes with an action table, or use the [generate meeting minutes](/ai-workflows/generate-meeting-minutes) workflow. At the end of a job, [draft a lessons learned report](/ai-workflows/draft-lessons-learned-report) turns a pile of notes into something the next project will actually read.

The pattern is the same each time: you supply the facts, Claude supplies the structure and the first draft, and you make the decisions.

## Is Claude good for quantity surveyors?

Yes, for the reading-heavy parts of the job: valuations, variations, quote comparison and the narrative around a CVR. Not for setting rates or agreeing a valuation, which stay with the QS.

A QS spends hours reading before making a single decision: the subcontract, the variation backup, a stack of tender returns. Claude gets through that reading quickly and can point you at the clauses, exclusions and gaps to check. The [draft a valuation and payment application](/ai-workflows/draft-valuation-payment-application) and [write a variation assessment](/ai-workflows/write-variation-assessment) workflows are built for this. For the wider picture, read [AI for quantity surveyors](/guides/ai-for-quantity-surveyors-guide) or browse the [AI for quantity surveyors workflows](/ai-for/quantity-surveyor).

> **QS take:** The bit of QS work where Claude earns its keep is reading. A subcontract, a set of tender returns or a stack of variation backup is hours of reading before you can make a single decision, and that's what it gets through fast. I'd never let it set a rate or agree a valuation, but I'm happy for it to tell me where the exclusions are so I can go and check them myself.

## What does Claude get wrong on construction work?

- **Made-up clause references.** It can quote a clause number or wording that isn't in your contract, especially on amended JCT or NEC forms. Check every reference against the document itself.
- **Arithmetic on long bills.** It can slip on long tables of quantities and rates. Do the totals in a spreadsheet, not in the chat.
- **Out-of-date rates and regulations.** What it knows comes from training data with a cut-off date. Don't take rates, prices or the current version of a regulation from it; check them at the source.
- **Documents it hasn't seen.** It only knows what you give it. Ask it to list any documents, drawings or sections that are referred to but weren't supplied.

## Is it safe to put project documents into Claude?

It can be, if you set it up properly first. Before uploading anything:

- Check how your plan handles your data and whether conversations can be used for training, on Anthropic's own [privacy centre](https://privacy.claude.com/en/). Settings and terms differ between personal and business plans.
- Strip out client names and anything personal that the task doesn't need.
- Follow the contract's confidentiality clause and your firm's AI policy. Some tenders and clients don't allow documents to be shared with outside services at all.

## Which Claude plan do you need?

Claude has a free plan with usage limits, which is enough to try it on a real task, and paid plans for individuals and businesses. Plans, limits and prices change, so check [Claude's pricing page](https://claude.com/pricing) for the current options. If you're going to use it on client documents, decide the plan with whoever looks after your firm's data, not on your own personal account.

## How does Claude compare with ChatGPT for construction?

Both are general-purpose assistants that read documents, summarise and draft, and both are used on construction work every day. The differences that matter to a construction team are practical: which one your firm already pays for, which one your IT and data policy allows for client documents, and which one gives better answers on your own documents. The fair test is to run the same real task through both, such as a subcontract summary, and compare the output line by line. [ChatGPT for construction](/ai-tools/chatgpt) covers the same ground for the other tool.

## Claude workflows by role

Every workflow below has a ready-to-use prompt that works in Claude, grouped by who uses it most.

<!-- workflows -->

<!-- cta -->

## Worked example: a monthly valuation on a JCT subcontract

**Illustrative example, not a client result.** The times below are typical estimates for a mid-sized subcontract package, not measured figures from a real job.

**The job:** a groundworks or M&E subcontractor on a JCT Design and Build subcontract, putting together the monthly interim application. The QS has the last valuation, the subcontract order, the site diaries, the instruction emails and the measured quantities for the month.

**By hand:** reading back through a month of diaries and emails to find what's changed, updating the valuation sheet and writing the covering note typically takes about 4 to 6 hours. It's also where unrecorded variations get missed: an instruction given on site in week two that nobody wrote up.

**With Claude:** paste in the diaries and instruction emails and ask it to list every instruction, change or extra work it can find, with the date and who gave it, and to flag any with no variation reference. Then give it last month's valuation and this month's quantities and ask it to draft the covering note and check the arithmetic. Typically that's about 1.5 to 2 hours, including the QS checking every line.

**What the QS still does:** decides what's actually claimable under the subcontract, prices the variations, checks the payment notice dates so the application isn't late, and signs it off. Claude finds and drafts; it doesn't decide.

**Prompt to start with:**

```prompt
Here are the site diaries and instruction emails for October. List every instruction, change or additional work mentioned, with the date, who gave it and the document it came from. Mark any that don't match a variation number on the attached variation register.
```

## Frequently asked questions

### Is Claude free to use for construction work?

Claude has a free plan with usage limits, which is enough to try it on a real task such as summarising a subcontract. For regular use most people move to a paid plan, and for client documents you should check which plan your firm's data policy allows. Plans and prices change, so check Claude's pricing page before deciding.

### Can Claude read construction drawings?

It can read PDF drawings and images and describe what's on them: the title block, notes, schedules, references and general layout. It isn't reliable for measuring or scaling from a drawing, so don't use it for take-off quantities without checking them against a proper measurement. It's most useful for pulling the notes and schedules off a drawing set.

### Can Claude review a JCT or NEC contract?

It can summarise one and find the clauses you ask about, such as payment, notices, time bars and amendments, which makes a first read much faster. It can't give legal advice, and it can get clause numbers wrong on amended forms, so check every reference against the contract and take advice on anything that matters.

### Is Claude better than ChatGPT for construction?

Neither is better for every job. Both read long documents, summarise and draft well, and the gap between them changes with each new model. Choose the one your firm can use safely for client documents, then test both on the same real task, such as a subcontract summary, and keep the one whose output needs the fewest corrections.

### Is it safe to upload tender documents to Claude?

Only if the tender's confidentiality terms and your firm's AI policy allow it. Check how your Claude plan handles data and training on Anthropic's own pages before uploading, remove client names and personal details the task doesn't need, and never put a client's documents into a personal free account without checking first.
