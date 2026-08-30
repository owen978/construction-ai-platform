---
title: "AI for BIM Model Checking and QA: What It Can Check, What It Cannot"
slug: "ai-bim-model-checking-and-qa"
description: "AI assisted BIM quality assurance uses language models to check the information layer of a model: naming, metadata, classification, parameter completeness, and clash report triage. This guide covers what AI can genuinely check, what still needs a rule engine or a human, and how to build a weekly QA loop on a UK project."
difficulty: "intermediate"
reading_time_minutes: 13
featured: false
sort_order: 15
meta_title: "AI for BIM Model Checking and QA: What It Can Actually Check"
meta_description: "How AI assisted BIM quality assurance works in practice: metadata and naming checks, clash triage, EIR compliance, ISO 19650 guardrails, and a UK worked example. Free guide."
---

**AI assisted BIM model checking uses a language model to audit the information layer of a model: element naming, classification codes, parameter completeness, status codes, and the consistency between the model and the documents that govern it.** It does not check geometry. It cannot see whether a duct physically clashes with a beam, and it cannot judge whether a clash matters on site. What it does exceptionally well is read the tens of thousands of rows that come out of a model export or a clash report and tell you, in seconds, which ones break the rules your project agreed to follow.

That distinction is the whole subject. Most BIM QA effort is not spent looking at geometry. It is spent checking that the information attached to the geometry is complete, correctly named, correctly classified, and matches what the client asked for in the exchange information requirements. That work is text and pattern matching, and it is exactly where AI is strongest. This guide sets out what AI can genuinely check, where a traditional rule engine still beats it, how to build a weekly checking loop on a live UK project, and the ISO 19650 guardrails that keep the whole thing defensible.

## What BIM model checking actually involves

"Model checking" gets used as one phrase for four quite different activities, and confusing them is why so many teams either over-trust or dismiss AI here.

**Geometric checking.** Does the model contain physical conflicts? This is clash detection in Navisworks, Solibri, or [Autodesk Construction Cloud](/ai-tools/autodesk-construction-cloud). It requires reading the geometry itself.

**Rule based validation.** Does every fire door have a fire rating parameter? Is every element classified? Solibri, Navisworks, and the checking tools built into most CDEs handle this with deterministic rules that either pass or fail.

**Information and metadata checking.** Do file and element names follow the agreed convention? Are suitability and status codes correct for the current stage? Is the classification consistent across disciplines? Does the model actually deliver what the exchange information requirements asked for?

**Judgement.** Is this clash real or a modelling artefact? Is this level of detail appropriate for Stage 4? Should this element have been in the architectural model or the structural one?

AI is useless at the first, unnecessary at the second, transformative at the third, and dangerous if you let it do the fourth unsupervised. Nearly all the value is in the third layer, which happens to be the layer that consumes the most BIM coordinator hours and gets skipped most often when the deadline is tight.

## What AI can and cannot check

Here is the boundary, stated plainly, based on what these tools are actually doing under the bonnet.

| Check | Can AI do it? | Why |
|-------|--------------|-----|
| Element and file naming against a stated convention | Yes, reliably | Pattern matching on strings |
| Suitability and status codes correct for the stage | Yes, reliably | Rule stated in text, applied to a schedule |
| Classification code completeness and consistency (Uniclass 2015) | Yes, with review | Reads schedules, spots gaps and mismatches |
| Parameter and property set completeness | Yes, reliably | Column-by-column gap analysis on an export |
| Model content checked against the EIR and BEP | Yes, with review | Compares two documents and a schedule |
| Clash report triage, grouping, and prioritisation | Yes, with review | Pattern matching across thousands of rows |
| Drafting the coordination report from a clash export | Yes, with review | Document generation from structured data |
| Spotting duplicate or orphaned elements in a schedule | Yes, with review | Detects repetition and nulls |
| Geometric clash detection | No | It cannot read geometry |
| Deciding whether a clash is acceptable on site | No | Spatial judgement, needs eyes on the model |
| Checking level of information need is met visually | No | Requires seeing the model |
| Signing off information for the golden thread | No | A legal accountability, not a task |

The pattern is consistent. If the check can be done by reading a spreadsheet, a schedule export, or a document, AI can do it and will do it faster than you can. If the check requires seeing the model in three dimensions or accepting professional liability, it cannot.

## The three checks worth automating first

Not every information check is worth the setup. These three return the most hours for the least effort.

### 1. Naming and metadata compliance

Every project has an information protocol that specifies a naming convention, usually a BS EN ISO 19650-2 style field structure of project, originator, volume, level, type, role, and number. Every project also drifts from it, because people are typing under pressure.

Export the element schedule or the drawing register to CSV, give the AI the convention in plain text, and ask it to list every entry that does not comply and say which field is wrong. This takes about two minutes and reliably catches things a human scanning 4,000 rows will miss: transposed level codes, wrong originator prefixes after a subcontractor change, inconsistent zero-padding on sequential numbers.

This is the single highest-return check because naming errors are cheap to fix at the time and expensive to fix at handover, when they have propagated into the asset information model.

### 2. Clash report triage

A federated clash run on a mid-size project routinely returns 3,000 to 9,000 clashes. Perhaps 200 are real coordination issues. The rest are duplicates of the same intersection reported at different tolerances, insulation overlaps, tolerance noise, and clashes between elements that were never meant to coordinate.

AI cannot tell you whether clash 4,412 is genuine. It can group the export by element pair, location, and discipline combination, tell you that 1,900 rows are eleven underlying issues, rank the groups by likely severity, and draft the coordination report around them. The coordinator then reviews eleven issues in the model rather than scrolling nine thousand rows. That is the difference between a half-day job and a forty-minute one, and it is covered in more depth in our guide to [AI for BIM workflows](/guides/ai-for-bim-workflows).

### 3. Deliverable checks against the EIR

At each information exchange the client's exchange information requirements say what should be delivered. The BIM execution plan says who delivers it. The model delivers something. Checking the three against each other is tedious, so it usually happens once, late, and superficially.

Give the AI the EIR, the relevant section of the BEP, and the model export or drawing register, and ask it to produce a table of required deliverable, responsible party, delivered yes or no, and gap. This turns a compliance exercise nobody enjoys into a fifteen minute job that produces an auditable record. It is also the check that most often surfaces a genuine problem before the exchange rather than after it.

## Rule engines vs AI vs manual review

AI does not replace Solibri. The three approaches solve different problems and the right setup uses all three.

| | Rule engine (Solibri, Navisworks) | AI checker | Manual review |
|---|---|---|---|
| **Best at** | Geometry, deterministic parameter rules | Text, metadata, documents, triage | Judgement, spatial reasoning |
| **Setup cost** | High, ruleset configuration | Low, a written prompt | None |
| **Handles new rules** | Slowly, needs reconfiguration | Immediately, restate the rule in words | Immediately |
| **Repeatability** | Perfect and deterministic | Good, varies slightly between runs | Poor |
| **Explains its reasoning** | Pass or fail only | Yes, in plain English | Yes |
| **Trustworthy unsupervised** | Yes, within its ruleset | No, always review | Yes |
| **Typical cost** | Licence per seat | Pennies per run | Hours of a coordinator |

Read that table as a division of labour. The rule engine owns geometry and hard parameter rules. AI owns everything textual, plus the triage layer that turns rule engine output into something a person can act on. The human owns the decisions. A team that adds AI to the middle of that chain does not check less rigorously, it checks the same things while spending its coordinator hours on the issues that actually need a coordinator.

## A worked example: Stage 4 exchange on a UK school project

A £14m secondary school extension in Leeds, Stage 4, four disciplines federating weekly into a CDE. The BIM coordinator has one day a week for QA and the information exchange is Friday.

**Monday, naming check, 12 minutes.** The coordinator exports the federated element schedule to CSV, 6,400 rows. She pastes the project naming convention from the BEP and asks the model to flag non-compliant entries by field. It returns 41 failures: 22 mechanical elements using the old MEP subcontractor's originator code from before the novation, 14 with level code L01 where the volume convention requires ZZ for building-wide services, and 5 with duplicate sequential numbers. She sends three targeted emails instead of a generic "please check your naming" that nobody actions.

**Tuesday, clash triage, 35 minutes.** The Navisworks run returns 5,180 clashes. The AI groups them into 34 underlying coordination issues and ranks them. Two rank high: a primary duct run through a structural downstand in the sports hall roof void, and sprinkler pipework conflicting with the ceiling zone in the corridor spine on both floors. She opens the model, confirms both are genuine, and finds the third ranked group is insulation tolerance noise and can be closed. Previous weeks she reviewed roughly the top 200 rows and stopped. This week she has seen all 34 groups.

**Wednesday, EIR check, 20 minutes.** She gives the model the client's EIR, the BEP responsibility matrix, and the drawing register, and asks for a delivered-versus-required table. It flags that the fire strategy overlay required at Stage 4 has no corresponding model file from the fire engineer, and that six architectural elements carry no Uniclass classification. The fire overlay gap would previously have been discovered at the exchange on Friday afternoon. It is raised on Wednesday morning and closed by Thursday.

**Thursday, coordination report, 15 minutes.** The AI drafts the weekly coordination report from the triaged clash groups and the naming exceptions. She edits it, adds her judgement on the two high-priority issues and what she wants done, and issues it.

Total: about 82 minutes of AI-assisted work replacing what had been a full day, with better coverage. Note where the human stayed in charge: every geometric confirmation, the decision that a clash group was noise, the judgement calls in the report, and the sign-off. That is the correct division, and it is the one your [quality control processes](/ai-for/quality-control) should reflect if you write this into a procedure.

## ISO 19650 and Building Safety Act guardrails

Two constraints matter on UK projects, and neither is a reason not to do this. They are reasons to do it properly.

**Information security under ISO 19650-5.** Most client information protocols restrict where project information can be processed. Before you paste a drawing register or a model export into any AI tool, check three things: whether the tool trains on your inputs (it should not, and the enterprise tiers of the major providers do not), where the data is processed, and whether your client's protocol requires named-tool approval. A CSV of element names is usually low sensitivity. A structural model export on a secure project may not be. Ask the information manager before the first run, not after.

**The golden thread under the Building Safety Act 2022.** For higher-risk buildings the accountable person must maintain an accurate, accessible information record. AI can help you check that record for completeness. It cannot be the party that attests to its accuracy. Keep the audit trail human: record who ran the check, what the output was, who reviewed it, and what was fixed. An AI-assisted check that is properly logged strengthens your golden thread evidence. An unlogged one adds nothing to it.

**A practical guardrail that matters more than either.** AI will occasionally state something with confidence that is not in the source data. On a naming check this is obvious and harmless, because you go and look at the row. On an EIR completeness check it is not obvious, because a hallucinated "delivered" is invisible. So invert the prompt: ask it to list gaps and to quote the source line for every item it marks as delivered. Anything it cannot quote, it did not find.

## Setting up a weekly checking loop

You do not need a platform. You need four saved prompts, the relevant project documents, and a fixed slot in the week.

1. **Write down the rules once.** Extract the naming convention, status code table, classification requirement, and the EIR deliverable list into a single plain text project brief. This is the reference the AI needs on every run, and writing it down usually exposes at least one ambiguity in the BEP.
2. **Save four prompts.** Naming and metadata check, clash triage and grouping, EIR deliverable check, coordination report draft. Each one takes the project brief plus that week's export.
3. **Fix the slot.** Run the checks the same day each week, before the exchange, not after. Checking after the exchange is auditing. Checking before it is quality assurance.
4. **Log everything.** Save the export, the output, and what you did about it. This is your evidence trail, and on a higher-risk building it is not optional.
5. **Review every output.** Especially anything reported as compliant. Spot-check five rows a week against the model. If the AI is wrong, you want to find out on a spot check rather than at handover.

The prompts themselves are the fiddly part, and the ones for information checking are in the [BuildCopilot Prompt Pack](/prompt-pack) alongside the wider set of [construction AI workflows](/ai-workflows). If you want the assistant layer that runs these continuously rather than weekly, that is covered in the [BIM AI copilot guide](/guides/bim-ai-copilot-guide), and the role-level view is in the [AI for BIM managers collection](/ai-for/bim-manager).

## Common mistakes

- **Asking it to check geometry.** It will produce an answer. The answer will be invented. It has never seen your model.
- **Skipping the project brief.** Without the naming convention in front of it the model applies a generic ISO 19650 pattern and flags compliant entries as failures.
- **Trusting a clean result.** A check that reports zero issues is the one to spot-check. Silence is more often a prompt problem than a quality result.
- **Pasting the whole IFC.** Export the schedule you actually need to check. Feeding raw model data wastes context and degrades accuracy.
- **Running it after the exchange.** The value is in catching the gap before it becomes a formal deliverable. Move the slot earlier.
- **No audit trail.** On a higher-risk building an undocumented check is worth nothing when someone asks how the information record was assured.

## Frequently asked questions

### Can AI detect clashes in a BIM model?

No. AI language models cannot read geometry and cannot perform clash detection. That remains the job of Navisworks, Solibri, or the clash tools in your CDE. What AI does well is process the clash report those tools produce: grouping thousands of rows into a manageable number of underlying issues, ranking them by likely severity, and drafting the coordination report. The detection is geometric, the triage is textual, and only the second part is an AI job.

### What can AI actually check in a BIM model?

The information layer. Element and file naming against your convention, suitability and status codes, classification code completeness and consistency, parameter and property set gaps, duplicate or orphaned entries in a schedule, and whether what the model delivers matches the exchange information requirements. All of these are checks on exported text and schedules rather than on the geometry itself.

### Does AI replace Solibri or Navisworks for model checking?

No, it complements them. Rule engines are deterministic, repeatable, and handle geometry, which AI cannot do at all. AI handles the textual and document-based checks that rule engines configure poorly, and turns rule engine output into prioritised, readable issues. The strongest setup runs the rule engine for geometry and hard parameter rules, AI for metadata and triage, and a human for judgement and sign-off.

### Is it safe to upload model data to an AI tool on a UK project?

It depends on your client's information protocol and ISO 19650-5 security requirements. Check whether the tool trains on your inputs (enterprise tiers of the major providers do not), where processing happens, and whether your protocol requires named-tool approval. An element name and classification schedule is usually low sensitivity. Confirm with your information manager before the first run rather than seeking forgiveness later.

### How does AI assisted QA fit with the golden thread?

It helps you check the information record for completeness and consistency, which is useful evidence that the record was actively assured. It cannot hold the accountability. Under the Building Safety Act 2022 the accountable person attests to the accuracy of the golden thread, so keep a human audit trail: who ran the check, what it returned, who reviewed it, and what changed as a result.

### How long does an AI assisted BIM QA loop take to set up?

About half a day for the first run and roughly an hour a week after that. Most of the setup is extracting your naming convention, status codes, classification requirement, and EIR deliverable list into a single plain text project brief that every check references. Once that exists, the four saved prompts run against each week's export in minutes.
