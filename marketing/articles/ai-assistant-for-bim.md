---
title: "AI Assistant for BIM: What to Ask It, Stage by Stage"
slug: "ai-assistant-for-bim"
description: "An AI assistant for BIM is a language model you brief with your project information standard and then ask to draft, check, and summarise the documents and data around the model. This guide covers what to ask it at each RIBA stage, a copy-ready prompt library, and the verification routine that keeps the output safe to issue."
difficulty: "intermediate"
reading_time_minutes: 13
featured: false
sort_order: 16
meta_title: "AI Assistant for BIM: Stage by Stage Prompts for UK BIM Managers"
meta_description: "What to ask a BIM AI assistant at RIBA Stages 2 to 7, a copy-ready prompt library, an assistant capability table, a UK worked example, and how to verify the output before you issue it."
---

An **AI assistant for BIM** is a large language model that you brief with your project's information standard, then ask to draft, check, and summarise the documents and data that surround the model. It does not model, it does not run clash detection, and it does not replace your rule engine. What it does is absorb the EIRs, the BEP, the naming convention, and the exported schedules, and then answer questions and produce documents against them in minutes rather than days.

The question most BIM managers ask is not "what is it" but "what do I actually ask it on a Tuesday morning". This guide answers that: a stage-by-stage map of the asks that pay off, a prompt library you can copy, and the verification routine that stops a plausible wrong answer from reaching the client. If you are still choosing between an embedded vendor tool and a general model, start with the [BIM AI copilot guide](/guides/bim-ai-copilot-guide) instead, then come back here for the daily use.

## What an assistant is good at, and what it is not

The single most useful mental model is this: an AI assistant works on the **information layer**, not the **geometry layer**. Anything expressed as text, tables, parameters, or exported data is in scope. Anything that requires reading solid geometry, calculating tolerances, or resolving a physical intersection is not.

| Task | Suited to an AI assistant? | Why |
|------|----------------------------|-----|
| Drafting a BEP from the EIRs | Yes, strongly | Document to document, structured, repetitive |
| Auditing file and container names against ISO 19650 | Yes, on exported lists | Pattern matching over text |
| Grouping and prioritising a clash report | Yes, on exported CSV | Categorisation and summarisation |
| Detecting the clashes in the first place | No | Requires geometric computation, use Navisworks or Solibri |
| Cleaning and gap-checking COBie data | Yes, with care | Tabular data, rule checkable |
| Deciding whether a clash is acceptable | No, human call | Requires design judgement and site knowledge |
| Writing the coordination report and actions | Yes, strongly | Summarising a meeting into structured output |
| Confirming a model is fit to issue | No, human sign off | Accountability sits with a named person |

Read that table as a boundary, not a limitation. The information layer is where BIM managers lose most of their week. On a typical UK contractor project the BEP, the responsibility matrix, the naming audit, the weekly clash narrative, and the handover data checks are all information layer work, and all of them shrink dramatically once an assistant is briefed properly.

## Brief the assistant once, benefit all project

The difference between an assistant that produces usable output and one that produces confident nonsense is almost always the brief, not the model. Before you ask anything on a project, give it a standing context pack:

- **The EIRs or Exchange Information Requirements**, in full, not summarised.
- **The BIM Execution Plan** as currently issued, so the assistant answers with your actual commitments rather than generic ISO 19650 theory.
- **The naming convention and container ID structure**, with two or three correct worked examples and one deliberately wrong one.
- **The Master Information Delivery Plan**, so it knows what is due at which stage and from whom.
- **The classification system in use**, normally Uniclass 2015 on UK projects, and which tables apply.
- **A statement of what it must never do**, for example: never invent a parameter value, never guess a container ID, flag anything uncertain rather than filling the gap.

That last instruction matters more than people expect. A model asked to produce a complete table will produce a complete table, filling gaps with something plausible. A model told to write UNKNOWN and list the gaps separately will do that instead, and the gap list is the useful output.

Save this pack as a project into whichever tool you use. In [Claude](/ai-tools/claude) that means a Project with the documents attached, so every new chat starts already briefed. It takes an hour once and saves that hour back in the first week.

## What to ask it, stage by stage

### RIBA Stage 2 to 3: setting up the information

This is where the assistant earns its keep fastest, because almost everything is document work.

Ask it to draft the BEP section by section from the EIRs, quoting the EIR clause each section responds to. Ask it to produce a responsibility matrix mapping every information requirement to a task team, a Level of Information Need, and a delivery milestone. Ask it to read the EIRs against your standard BEP template and list every requirement your template does not currently answer, which is the fastest gap check available.

A prompt that works:

> You are reviewing our BIM Execution Plan against the client's EIRs, both attached. Produce a table with three columns: EIR requirement (quote it), where our BEP responds (section number and a short quote), and status (Answered, Partially answered, Not answered). Do not summarise or paraphrase the EIR requirements. Where you find nothing in the BEP, write Not answered rather than guessing.

### RIBA Stage 4: coordination and technical design

Weekly clash triage is the highest volume ask at this stage. Export the clash report to CSV, strip anything commercially sensitive, and give the assistant the file with the model and level structure.

Ask it to group clashes by system pair and location, rank the groups by likely construction impact, and draft a short narrative per group naming the discipline that owns the resolution. Ask it to compare this week's report against last week's and tell you which groups are new, which have closed, and which have been open for three weeks or more. That last one is the question nobody has time to answer manually, and it is the one that changes the coordination meeting.

The [AI for BIM workflows guide](/guides/ai-for-bim-workflows) covers the full triage workflow, and the [model checking and QA guide](/guides/ai-bim-model-checking-and-qa) covers where the line sits between an assistant and a rule engine like Solibri.

### RIBA Stage 5: construction

The asks shift from design coordination to information supply. Ask it to check the drawing register against the MIDP and list what is late, what is issued but unreviewed, and what has no revision history. Ask it to turn the weekly coordination meeting notes into minutes with a clean action table, owners, and dates. Ask it to draft the RFI response summary for the design team from the thread history.

Site facing teams get value here too, and the same briefing approach applies across roles. The [AI for BIM managers hub](/ai-for/bim-manager) collects the role specific workflows.

### RIBA Stage 6 to 7: handover and the golden thread

COBie and asset data are tabular, which suits an assistant well. Ask it to check every asset record for missing mandatory fields, inconsistent manufacturer naming, duplicate serials, and classification codes that do not exist in the Uniclass table you are using. Ask it to draft the handover narrative explaining how the information model satisfies each EIR requirement, which is otherwise a two-day writing job.

For higher risk residential buildings, ask it to map your information deliverables against the golden thread duties under the Building Safety Act 2022, and to flag which records have no clear owner. The assistant will not make you compliant, but it will find the holes far faster than a manual read through.

## A worked UK example: naming audit on a hospital extension

A tier two contractor is delivering a 40 million pound hospital extension in the Midlands. The federated model has around 9,000 containers across six task teams. The client's EIRs mandate ISO 19650 naming with a project specific field structure, and the BIM manager has been sampling roughly 200 containers a month by eye because a full audit was never affordable.

The setup took under an hour. The BIM manager exported the full container list from the CDE to CSV: container ID, revision, status code, suitability, and originator. They created a project in their AI tool holding the EIRs, the BEP, the naming convention with three correct examples and two deliberately wrong ones, and a standing instruction to flag rather than fill.

The ask:

> Attached is a CSV of 9,047 model container names and the project naming convention. Check every name against the convention field by field. Return three tables. Table 1: names that fail, with the container ID, the field that fails, and what is wrong. Table 2: names that pass but use a non-standard originator code, listing the codes found. Table 3: a count of failures by originator and by failure type. Do not correct any names. Do not invent codes that are not in the convention.

The output took four minutes and found 312 failures. Two thirds came from a single mechanical subcontractor using a volume code that had been superseded at Stage 3 and never updated in their template. That is a fifteen minute conversation with one supply chain partner, and it fixed 208 containers at once. A further 61 failures were status codes that had been left at S0 after formal issue, which is a genuine compliance problem at an information exchange. The remaining 43 were scattered typos.

Two details make this example honest. First, the BIM manager spot checked 40 of the 312 flagged failures by hand and found the assistant correct on 39, with one false positive caused by a legitimate exception agreed in a Stage 3 minute the assistant had never been given. Second, the assistant found no failures that the human sample had already caught but did miss a pattern the BIM manager spotted independently, where a task team was using correct names but the wrong revision sequence, because revision logic was not part of the naming convention document supplied. The lesson is that the assistant checks what you brief it on, precisely and exhaustively, and is blind to what you leave out.

## The prompt library worth keeping

Six asks cover most of a BIM manager's week. Keep them saved and reuse them rather than rewriting each time.

| Ask | Frequency | Input needed | Output |
|-----|-----------|--------------|--------|
| BEP gap check against EIRs | Once per project, again on EIR revision | EIRs, current BEP | Requirement by requirement status table |
| Naming and status audit | Monthly, and before each exchange | Container list CSV, naming convention | Failure table by originator |
| Clash triage and week on week comparison | Weekly at Stage 4 | This week and last week clash CSV | Grouped, ranked narrative plus open ageing |
| Coordination minutes and actions | Weekly | Rough meeting notes | Minutes with owner and date action table |
| COBie completeness check | Monthly from Stage 5 | COBie export | Missing field and inconsistency report |
| Register versus MIDP check | Fortnightly | Drawing register, MIDP | Late, unreviewed, and unversioned list |

The full set of construction prompts, including the BIM ones with the exact wording, is in the [BuildCopilot Prompt Pack](/prompt-pack), and the [AI workflows library](/ai-workflows) has the step by step versions.

## The verification routine that makes this safe

An assistant that is right 95 percent of the time is dangerous if you cannot tell which 5 percent is wrong. The fix is a routine, applied every time, not a judgement call made when you happen to feel cautious.

1. **Sample the flags.** Check 10 percent of anything the assistant flagged, by hand, against the source. If your sample is clean, trust the batch. If you find two errors in the sample, discard the batch and fix the brief.
2. **Never accept a filled gap.** If the assistant supplied a value you did not give it, treat that value as invented until proven otherwise. This is the single most common failure mode.
3. **Check what it did not say.** Ask it explicitly what it could not check and why. A good assistant will tell you it had no revision logic, no agreed exceptions, or no classification table.
4. **Keep the source of truth in the CDE.** The assistant produces a working document. The issued document lives in the common data environment, in [Autodesk Construction Cloud](/ai-tools/autodesk-construction-cloud) or whichever CDE the project uses, with the normal review and authorisation workflow intact.
5. **A named person signs off.** ISO 19650 assigns accountability to people, not tools. Nothing an assistant produces gets issued without a human authoriser who has read it.

That routine takes minutes and is what lets you use the output confidently rather than nervously.

## Where teams go wrong

- **Briefing it with a summary instead of the source.** A paraphrased EIR produces a paraphrased BEP. Attach the real document.
- **Asking it to check geometry.** It will produce an answer, and the answer will be fiction. Keep clash and tolerance work in the rule engine.
- **Pasting client data without checking the terms.** Confirm what your appointment and the client's IT policy permit before anything leaves your environment, and use business tier tools where training on your data is contractually excluded.
- **Treating a clean output as a clean model.** No failures found means no failures found in what you supplied, against the rules you supplied. It is not a certificate.
- **Rewriting the prompt every time.** Inconsistent prompts produce inconsistent audits, which makes trend comparison worthless. Save them and reuse them.

## Getting started this week

Pick one ask, not six. The naming and status audit is the best first choice because the input is a single CSV export, the rules are objective, the output is checkable by hand, and the result is immediately useful in a supply chain conversation. Build the context pack, run the audit, sample 10 percent of the flags, and see what it finds. If it works, add the clash triage next, then the coordination minutes. By the fourth week you have a briefed assistant that knows your project, and the asks start compounding.

## Frequently asked questions

### What is an AI assistant for BIM?

An AI assistant for BIM is a large language model briefed with your project information standard, EIRs, BEP, and naming convention, which you then ask to draft, audit, and summarise the documents and data around the model. It works on the information layer, meaning text, tables, and exported parameters, rather than on the geometry itself.

### Can an AI assistant edit the BIM model?

No. A general purpose AI assistant reads and writes text and data, it does not open or modify an authoring model in Revit, ArchiCAD, or Tekla. Some vendor tools embed automation that can act on a model, but that is a different category of product, covered in the BIM AI copilot guide.

### What is the difference between an AI assistant and a BIM copilot?

In practice the terms overlap. Copilot usually implies a product embedded inside a design or CDE tool, while assistant usually means a general purpose model you brief yourself with your project documents. The assistant approach is cheaper to start, works across every tool you use, and gives you control over the brief.

### Is using an AI assistant compatible with ISO 19650?

Yes, provided accountability stays with people. ISO 19650 requires named responsibility for information production, review, and authorisation. An assistant can draft and check, but a named individual must review and authorise anything issued, and the CDE remains the single source of truth.

### Is it safe to upload EIRs and model data to an AI tool?

It depends on your appointment terms and the tool's data policy. Use business or enterprise tiers where training on your inputs is contractually excluded, check what your client contract says about third party processing, and strip commercially sensitive or personal data before uploading. When in doubt, ask the client's information manager first.

### How long does it take to set an AI assistant up on a project?

About an hour to assemble the context pack of EIRs, BEP, naming convention, MIDP, and classification tables, and a further hour to run and verify your first audit. Most BIM managers recover that time within the first week, because the first naming or register audit typically surfaces issues that would otherwise have been found at an information exchange.
