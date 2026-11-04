---
title: "ChatGPT Prompts for Health and Safety Managers: 20 Copy-Paste Prompts for UK Construction"
slug: "chatgpt-prompts-for-health-and-safety-managers"
description: "The best ChatGPT prompts for health and safety managers turn site notes, subcontractor RAMS, incident reports and inspection findings into reviews, toolbox talks, investigation summaries and board reports. This guide gives you 20 copy-paste prompts built for UK construction under CDM 2015, with a worked example of reviewing a subcontractor's RAMS."
difficulty: "beginner"
reading_time_minutes: 12
featured: false
sort_order: 31
meta_title: "20 ChatGPT Prompts for Health and Safety Managers (UK)"
meta_description: "20 copy-paste ChatGPT prompts for UK construction health and safety managers: RAMS reviews, COSHH, toolbox talks, RIDDOR checks and audit reports."
---

**ChatGPT prompts for health and safety managers** are structured instructions that get ChatGPT, Claude or Copilot to handle the reading and writing side of construction safety: reviewing a subcontractor's RAMS, drafting a toolbox talk, turning inspection notes into an action list, structuring an incident investigation or summarising the month's safety performance for the board. The prompts that work give the AI five things: a safety professional's role, the real documents or notes, the UK legal context (CDM 2015, the Management of Health and Safety at Work Regulations 1999, RIDDOR 2013, COSHH 2002), a fixed output format, and an instruction never to invent controls, findings or legal duties. The competent person still signs everything off. The AI clears the paperwork so you spend more time on site and less time at a keyboard.

This guide gives you 20 copy-paste prompts grouped by the jobs a construction H&S manager actually does, a worked UK example of reviewing a roofing subcontractor's RAMS, and the rules that keep AI output safe to use. For the wider picture of AI in the role, start with our [health and safety manager hub](/ai-for/health-and-safety-manager).

## Why H&S managers get so much from AI (and where it goes wrong)

A construction health and safety manager spends a surprising share of the week on documents. Subcontractor RAMS arrive in every format imaginable and all need reviewing before work starts. Inspections produce pages of notes that need turning into actions. Every incident needs a report, every near miss needs logging, and the monthly safety report needs writing whether or not anyone reads it. On a multi-site role, that admin can swallow two or three days a week.

AI is very good at that reading, sorting and drafting. But safety has three features that make careless prompts dangerous:

- **The documents are legal records.** A risk assessment, an accident investigation or a RIDDOR decision may be read by the HSE, an insurer or a court. Anything the AI writes has to be accurate and checked by someone competent.
- **Generic controls are worse than none.** A RAMS full of plausible boilerplate ("operatives will take care") gives false assurance. The value is in site-specific controls, and only you know the site.
- **The law is specific.** General AI tools sometimes blur UK regulations with US OSHA rules or out-of-date guidance. Always name the UK regulations you want it to work to, and check any legal statement against the HSE source.

So every prompt below gives the AI your real material, fixes the format and includes a guardrail. If you want the strategic view first, read our guide to [AI in construction safety](/guides/ai-in-construction-safety).

## The H&S prompt formula

| Part | What it does | Example wording |
|------|--------------|-----------------|
| **Role** | Sets expertise and UK context | "You are a NEBOSH-qualified health and safety manager at a UK principal contractor." |
| **Material** | Gives the AI the real source | "Here is the subcontractor's method statement and risk assessment for roof sheeting." |
| **Context** | Names the law, site and activity | "Work at height on a two-storey steel frame, CDM 2015 applies, project notified on an F10." |
| **Format** | Fixes the output shape | "Return a table: hazard, control proposed, gap, required action, priority." |
| **Guardrails** | Stops invented content | "Do not invent controls or legal duties. Write [CHECK] where the document is unclear." |

The guardrail matters most. Without it, AI tools tend to fill gaps with confident-sounding safety language that nobody on site will recognise.

### Getting site material into the AI

- **Paste text, not just file names.** Copy the method statement sequence or the inspection notes straight in. If your tool accepts PDFs, upload one document at a time.
- **Strip personal data.** Injured persons' names, medical details and home addresses should not go into a general AI tool. Use roles ("operative A", "groundworks supervisor") instead. Check your company AI policy and UK GDPR obligations.
- **Work activity by activity.** Ask about the lifting operation, then the excavation, then the hot works. Smaller inputs give sharper reviews.
- **Use Claude for long packs.** It handles full construction phase plans and long RAMS well. Our [Claude guide](/ai-tools/claude) covers setup.

## RAMS and risk assessment prompts

### 1. Subcontractor RAMS review

> You are a health and safety manager at a UK principal contractor reviewing a subcontractor's RAMS before work starts. Review the method statement and risk assessment below against CDM 2015 and the Management of Health and Safety at Work Regulations 1999. Return a table: section, issue found, why it matters, required change, priority (high, medium, low). Check specifically for: a clear sequence of work, named competent supervisor, site-specific hazards (not generic), the hierarchy of control applied, PPE listed as a last resort, emergency and rescue arrangements, permits required, and plant and training evidence. Do not invent site details. Write [CHECK] where something is missing. RAMS: [paste]

For background on what a good RAMS contains, see our [guide to RAMS in construction](/guides/what-is-a-rams-construction-guide).

### 2. Risk assessment from a job description

> You are a construction health and safety manager. Draft a risk assessment for the activity below using a 5x5 likelihood and severity matrix. For each hazard list: who might be harmed and how, existing controls, initial risk rating, additional controls following the hierarchy of control, residual risk rating, and who is responsible. Use UK regulations only. Mark every control I have not confirmed as [CONFIRM ON SITE]. Activity and site conditions: [paste]

### 3. Method statement sequence check

> Read the method statement sequence below and check it is in a logical, buildable order. Flag any step where a hazard is introduced before its control is in place (for example, working at the leading edge before edge protection is fitted). Return a numbered list of issues and a corrected sequence. Do not add steps that are not implied by the work described. Sequence: [paste]

If you need to write one from scratch, the [method statement workflow](/ai-workflows/draft-method-statement) gives a full prompt.

### 4. COSHH assessment from a safety data sheet

> You are a health and safety manager preparing a COSHH assessment under the Control of Substances Hazardous to Health Regulations 2002. From the safety data sheet text below, extract: product name, hazard statements, routes of exposure, workplace exposure limits if listed, required controls (ventilation, RPE type and APF, gloves material, eye protection), storage, spill response, first aid and health surveillance needs. Use only what is in the SDS and write [NOT IN SDS] where information is missing. SDS: [paste]

Our [COSHH risk assessment workflow](/ai-workflows/generate-coshh-risk-assessment) turns this into a finished assessment.

### 5. Permit to work checklist

> Create a permit to work checklist for [hot works / confined space / excavation / work on live services] on a UK construction site. Include pre-start checks, isolations, gas testing where relevant, fire watch or standby person duties, emergency arrangements, sign-on, hand-back and cancellation. Keep it to one page and use tick boxes. Do not reference any legislation you are not certain applies.

## Site inspection and audit prompts

### 6. Inspection notes to action list

> You are a construction health and safety manager. Turn my rough site inspection notes below into a formal inspection report: a short summary, then a table of findings with location, observation, risk level, action required, owner (trade or role), and target date. Group findings by category (work at height, housekeeping, plant, fire, welfare, PPE). Do not add findings I have not written. Notes: [paste]

### 7. Audit scoring summary

> Here are the results of a site safety audit scored against our company standard. Summarise them into: overall score and trend versus last audit, top three strengths, top five risks, and actions ranked by priority. Write in plain English for a site manager. Results: [paste]

### 8. Scaffold and work at height check prompts

> Create a weekly work at height inspection checklist for a UK construction site, covering scaffolds, MEWPs, ladders and stepladders, edge protection and fall arrest. Reference the Work at Height Regulations 2005 requirement for scaffold inspection by a competent person before first use, after alterations or adverse weather, and at intervals not exceeding seven days. Use yes, no and N/A columns with space for comments.

### 9. Welfare facilities check

> Create a site welfare inspection checklist based on Schedule 2 of CDM 2015: toilets, washing facilities, drinking water, changing rooms and lockers, and rest facilities. Include columns for compliant, not compliant, and action needed. Keep it practical for a site manager to complete in ten minutes.

## Toolbox talk and briefing prompts

### 10. Toolbox talk from a recent incident

> You are a construction health and safety manager. Write a ten-minute toolbox talk for operatives based on the incident summary below, with names removed. Structure: what happened (plain English, no blame), why it matters, the three key controls, what each person must do differently from today, and three questions to check understanding. Use short sentences suitable for reading aloud on site. Incident: [paste]

Our [toolbox talk workflow](/ai-workflows/write-toolbox-talk) and [free toolbox talk template](/templates/toolbox-talk) give you a full set-up for weekly talks.

### 11. Site induction script

> Draft a 20-minute site induction script for [project type] under CDM 2015. Cover: project overview and key contacts, site rules, hazards specific to this site, traffic management, emergency procedures and assembly point, first aid and welfare, reporting incidents and near misses, and the right to stop work if unsafe. Mark every site-specific detail I need to fill in as [SITE DETAIL].

### 12. Simplified briefing for operatives with limited English

> Rewrite the safety briefing below in plain English at a reading age of about nine, using short sentences and simple words. Keep every control and instruction. Then list any terms that would benefit from a picture or demonstration. Briefing: [paste]

Always have a competent translator or bilingual supervisor confirm any translated version. AI translation is a starting point, not a check.

### 13. Daily activity briefing

> Turn tomorrow's planned activities below into a five-minute daily activity briefing for the start-of-shift meeting. For each activity, list the main hazard, the key control and any interface with other trades. Finish with any permits that must be in place before work starts. Activities: [paste]

## Incident and investigation prompts

### 14. RIDDOR reportability check

> You are a health and safety manager in the UK. Based on the incident details below, set out whether the incident is likely to be reportable under RIDDOR 2013 and under which category (death, specified injury, over-seven-day incapacitation, occupational disease, dangerous occurrence). Explain your reasoning, state the reporting deadline that would apply, and list the facts I still need to confirm. Make clear this is guidance only and the final decision rests with the responsible person. Details: [paste]

### 15. Accident investigation structure

> Structure an accident investigation report from my notes below. Sections: summary, sequence of events with times, immediate causes, underlying causes, root causes (using a five whys approach), actions to prevent recurrence with owners and dates, and lessons to share. Keep facts and opinions separate. Do not speculate beyond the evidence and write [EVIDENCE NEEDED] where a conclusion is not supported. Notes: [paste]

### 16. Near miss trend analysis

> Here is our near miss log for the last three months. Group the near misses by category, location, trade and time of day. Identify the top three trends, suggest a likely underlying cause for each, and propose one targeted intervention per trend. Show your counts in a table. Log: [paste]

## Planning and reporting prompts

### 17. Construction phase plan gap check

> You are reviewing a construction phase plan for a UK project under CDM 2015. Check the draft below against the contents expected by Appendix 3 of the HSE's L153 guidance: project description and management, arrangements for controlling significant site risks, welfare, emergency procedures, and site rules. Return a table of sections that are missing, thin or generic, with suggested additions. Draft: [paste]

The [construction phase plan guide](/guides/cdm-construction-phase-plan-guide) explains each section in detail.

### 18. Monthly safety report for the board

> Turn the monthly safety data below into a one-page board report. Include: headline figures (hours worked, accident frequency rate, RIDDOR reports, near misses, inspections completed, close-out rate), trend versus the last three months, two things going well, two concerns, and decisions or resources needed from the board. Calculate the accident frequency rate per 100,000 hours worked and show the working. Data: [paste]

### 19. Fire safety plan for a site

> Draft a site fire safety plan for a UK construction project in line with HSE guidance HSG168. Include fire risks by phase, hot works controls, storage of flammables, fire points and detection, means of escape as the building grows, emergency procedure and responsible persons. Mark every site-specific item as [SITE DETAIL].

You can pair this with our [free fire risk assessment template](/templates/fire-risk-assessment).

### 20. Lessons learned bulletin

> Turn the incident and near miss summaries below into a one-page safety bulletin to share across all our sites. For each item give a headline, what happened in two sentences, the lesson and the action every site should take this week. Remove all names and project identifiers. Summaries: [paste]

## A worked example: reviewing a roofing subcontractor's RAMS

Here is how prompt 1 works on a real-world style submission. A principal contractor is building a two-storey steel-framed industrial unit in Northamptonshire. The project has been notified to the HSE on an F10 because it will last more than 30 working days with more than 20 workers on site at once. The roofing subcontractor submits a four-page RAMS for installing composite roof panels.

The H&S manager pastes the RAMS into Claude with prompt 1. Within a minute it returns a table. A shortened version looks like this:

| Section | Issue found | Required change | Priority |
|---------|-------------|-----------------|----------|
| Sequence | Panels lifted before edge protection confirmed at eaves | Add hold point: edge protection inspected and signed off before first lift | High |
| Rescue plan | Harness use listed but no rescue plan for a suspended worker | Add rescue method, equipment and trained persons | High |
| Fragile surfaces | Rooflights mentioned but no cover or netting method | State rooflight protection method and when it is installed | High |
| Lifting | Crane lifts referenced but no lift plan or appointed person named | Attach lift plan under LOLER and name the appointed person | High |
| Weather | No wind speed limit for panel handling | State maximum wind speed for lifting panels and stop-work trigger | Medium |
| Competence | Operatives "trained" but no cards listed | List CSCS cards, IPAF or PASMA where used, and harness training | Medium |
| PPE | PPE listed first in controls | Reorder controls to follow the hierarchy, with PPE last | Low |

The review took under ten minutes including reading the output, against roughly 45 minutes doing it from scratch. More importantly, it caught the missing rescue plan, which is a common and serious gap in work at height RAMS.

The H&S manager then checks every point against the actual site. Two findings need adjusting: the netting is already installed by the steel erector, so the fragile surfaces comment becomes "reference the existing netting and its inspection record". Everything else goes back to the subcontractor as a formal comment sheet, and work does not start until the revised RAMS is accepted. The AI did the reading. The competent person made the judgement. That is the split you want. Our [free RAMS template](/templates/rams) shows the standard layout subcontractors should be working to.

## What AI should and should not do in a safety role

| Task | Good use of AI? | Why |
|------|-----------------|-----|
| First-pass RAMS review | Yes | Finds missing sections and generic controls quickly |
| Drafting toolbox talks | Yes | Saves time and keeps language simple |
| Turning inspection notes into reports | Yes | Pure structuring work |
| Trend analysis on near miss logs | Yes | Good at grouping and counting text data |
| Deciding if an incident is RIDDOR reportable | Draft only | A responsible person must make the final call |
| Signing off a risk assessment | No | Requires a competent person who knows the site |
| Giving legal advice after an HSE visit | No | Speak to a qualified adviser or solicitor |
| Storing injured persons' medical details | No | Personal and special category data under UK GDPR |

## Tips for getting better safety output from AI

- **Name the regulation.** "Under the Work at Height Regulations 2005" gets far better answers than "for working at height".
- **Ask for gaps, not just content.** "What is missing from this?" is often more valuable than "write this for me".
- **Keep a library.** Save the prompts that work and share them with site managers so the whole team gets consistent output. Our [ChatGPT prompts for site managers](/guides/chatgpt-prompts-for-site-managers) are a good companion set.
- **Always ask for [CHECK] markers.** It makes the AI flag its own uncertainty instead of covering it with confident wording.
- **Review on site, not just on screen.** No AI has walked your site. Every control must match what is actually there.

We send new construction safety prompts and workflows out every week in our [free newsletter](/newsletter).

## Frequently asked questions

### Can ChatGPT write a risk assessment for construction?

Yes, ChatGPT can draft a construction risk assessment if you give it the activity, the site conditions and the UK regulations to follow. The draft must then be reviewed and signed off by a competent person who knows the site, because AI cannot see local hazards and may produce generic controls.

### Is it safe to put incident details into ChatGPT?

Only after removing personal data. Do not paste injured persons' names, medical details or other identifying information into a general AI tool. Use roles instead of names, follow your company AI policy, and consider an enterprise version of the tool where data is not used for training.

### Can AI decide whether an incident is RIDDOR reportable?

AI can set out the likely RIDDOR 2013 category and the reasons, which is a useful first check. The legal duty to report sits with the responsible person, usually the employer or the person in control of the premises, so the final decision must be made by them, checked against HSE guidance.

### Which AI tool is best for health and safety managers?

Claude is strong for long documents such as full RAMS packs and construction phase plans. ChatGPT is quick and widely available for toolbox talks and briefings. Microsoft Copilot works well if your company already uses Microsoft 365. The prompts in this guide work in all three.

### Will AI replace construction health and safety managers?

No. CDM 2015 and the wider law require competent people to plan, manage and monitor safety, and that competence includes site knowledge, judgement and the ability to challenge unsafe work in person. AI removes much of the paperwork so H&S managers can spend more of their time on site.

### How do I stop AI inventing safety controls?

Tell it explicitly not to invent controls, findings or legal duties, and ask it to mark anything unclear with [CHECK] or [CONFIRM ON SITE]. Give it your real documents rather than asking it to work from memory, and always review every control against the actual site before issuing anything.
