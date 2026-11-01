---
title: "Claude Skill: an interim valuation checker for QSs"
slug: "claude-skill-interim-valuation-checker-for-qss"
summary: "Set up a reusable Claude Skill that checks every interim valuation the same way, from arithmetic to retention and variations, and flags issues for you to check."
roles: [quantity-surveyor]
task: "agents"
contractForms: []
tool: "claude"
timeByHandMins:
timeWithAiMins:
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
When you check interim valuations every month and keep typing the same long prompt, or when you want everyone in the commercial team to check them the same way. A Claude Skill is a saved set of instructions that Claude loads whenever the task comes up, so your checklist runs every time without you pasting it in. Set it up once in a business or team Claude account your company has approved, not a personal one, because valuations hold commercial data.

## Prompt
You are helping a UK quantity surveyor at a [MAIN CONTRACTOR / SUBCONTRACTOR] build a Claude Skill called "interim-valuation-checker". Write the skill instructions file for me.

The skill should run whenever I upload or paste an interim valuation, payment application or valuation spreadsheet and ask for it to be checked. When it runs, it must:
1. Check the arithmetic: line totals, sub-totals, the gross valuation, retention, previous payments and the amount due.
2. Check retention is applied at [RETENTION %] and that any release matches the stage we are at ([PRACTICAL COMPLETION / NOT YET]).
3. List every variation or compensation event included, and flag any that are not marked as instructed or agreed.
4. Flag materials on site or off site, and remind me to check they meet the contract conditions for payment.
5. Compare against the previous valuation if I provide it, and list any line that has gone down or jumped by more than [THRESHOLD %].
6. Note the valuation date and remind me to check the payment and pay less notice dates under the contract and the Construction Act.

Output format for the skill: a short summary at the top, then a table with columns Item, Issue, What I found, What to check. Finish with a list of questions to raise.

Rules for the skill: only use figures from the documents I provide. Never invent a rate, quantity or date. If something is missing or unclear, say so and list it under "Couldn't check". Do not decide what should be paid. Use UK spelling and NRM terms where they apply.

Our house rules to include: [ANY FIRM-SPECIFIC CHECKS, e.g. dayworks need signed sheets, preliminaries valued by time-related and fixed items].

## What it produced
A skill instructions file with a short description of when the skill should run, the six checks in order, the output table format and the rules about missing information. Once saved as a skill, a valuation dropped into a chat comes back as a summary, an issues table, a "Couldn't check" list and the questions to raise.

## What you still check
- Test the skill on two or three past valuations where you already know the answers before trusting it on a live one.
- Every flagged figure against the source documents. The skill points you to issues; you still make the valuation.
- Retention, materials on site and variation terms against the actual contract, which the skill hasn't read unless you gave it.
- Your notice dates under the contract and the Construction Act. Check the contract and take advice if you're unsure.
- The account you are using is one your company has approved for commercial data.

## Steps
1. Run the prompt with your retention, thresholds and house rules filled in.
2. Save the result as a skill in your Claude team or business account, following Claude's current help pages for adding skills.
3. Test it on past valuations, tighten the instructions, then share it with the team.
