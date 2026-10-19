# BIM AI pages: cannibalisation map and fixes (19 Oct 2026)

Search Console, sc-domain:buildcopilot.ai, last 3 months to 17 Oct 2026. Queries containing "bim": 8.57k impressions, 0 clicks, average position 27.7.

## The problem in one line

The workflows guide is the page Google shows for almost every BIM query, at positions 13 to 72. The guide that actually matches the query usually ranks far higher when Google does show it, but it rarely gets the slot. In the guide bodies the workflows guide linked to none of the other three, the QA guide had 1 inbound link and the assistant guide had none.

## Query to page map

Impressions @ average position, per page. A query's page figures can add up to more than its total, because one search can show two of our pages.

| Query (total impr @ pos) | Workflows guide | BIM manager hub | QA guide | Copilot guide | Assistant guide | Owner |
|---|---|---|---|---|---|---|
| bim ai copilot (963 @ 8.3) | 694 @ 60.1 | **925 @ 10.9** | 39 @ 42.3 | 392 @ 11.9 | 18 @ 58.9 | Copilot |
| bim copilot (44 @ 13.8) | 19 @ 66.9 | 21 @ 37.7 | | **30 @ 8.9** | | Copilot |
| ai for bim model checking (917 @ 26.2) | **890 @ 29.3** | 29 @ 79.2 | 79 @ 3.6 | | | QA |
| ai assisted bim quality assurance (906 @ 15.6) | **862 @ 18.7** | | 83 @ 1.3 | | | QA |
| ai bim workflow (883 @ 13.8) | **869 @ 13.1** | 575 @ 61.6 | 1 @ 3.0 | | | Workflows |
| bim rule configuration ai (797 @ 17.3) | **713 @ 25.8** | 62 @ 84.4 | 162 @ 4.5 | 256 @ 84.6 | 13 @ 75.4 | QA |
| ai assistant for bim (675 @ 40.0) | **649 @ 43.5** | 110 @ 71.1 | 1 @ 5.0 | | 42 @ 9.3 | Assistant |
| ai-powered bim assistant (556 @ 42.1) | **304 @ 72.3** | 279 @ 55.7 | | | 182 @ 24.3 | Assistant |
| bim ai assistant (529 @ 36.7) | **474 @ 50.3** | 200 @ 41.3 | 1 @ 2.0 | | 29 @ 6.7 | Assistant |
| ai component query bim (440 @ 30.9) | **418 @ 30.2** | | 50 @ 55.3 | 262 @ 74.3 | 5 @ 68.2 | Copilot |
| workflow file bim automation (300 @ 50.7) | 300 @ 50.7 | | | | | Workflows |
| automated bim checking workflow (306 @ 55.0) | 291 @ 55.8 | | 18 @ 44.4 | | | QA |
| bim workflow automation (174 @ 57.3) | 174 @ 57.3 | | | | | Workflows |
| session-aware bim ai (141 @ 59.0) | 141 @ 59.0 | | | | | Copilot |
| unattended bim model checking (133 @ 24.9) | 35 @ 71.9 | | 98 @ 8.2 | | | QA |
| conversational bim checking (114 @ 30.5) | 42 @ 64.7 | | 72 @ 10.5 | | | QA |
| deterministic bim validation (103 @ 62.6) | 95 @ 64.7 | | 9 @ 40.6 | | | QA |
| natural language bim checking (76 @ 17.7) | | | 76 @ 17.7 | | | QA |
| bim checking chat interface, command line / batch / cloud bim checking | | | 29 to 51 each @ 18 to 34 | | | QA |
| ai help with solibri rules (31) | 31 @ 28.0 | | | | | QA |
| naming convention checking bim (32 @ 23.9) | | | | | 27 @ 19.6 | QA |

Bold = the page Google showed most for that query.

Final cluster owners:

| Page | Owns |
|---|---|
| /guides/ai-for-bim-workflows | ai bim workflow, ai for bim, bim workflow automation, workflow file bim automation, automated coordination reports, which BIM workflows to automate first |
| /guides/ai-bim-model-checking-and-qa | ai for bim model checking, ai assisted bim quality assurance, bim rule configuration ai, natural language / conversational / unattended / batch / deterministic bim checking, solibri rules, naming convention checking |
| /guides/bim-ai-copilot-guide | bim ai copilot, bim copilot, ai component query bim, session-aware bim ai, issue navigation |
| /guides/ai-assistant-for-bim | ai assistant for bim, bim ai assistant, ai-powered bim assistant |
| /ai-for/bim-manager | the role ("ai for bim managers"); sends each cluster to its guide |

## Merge or keep?

Keep all four, no 301s. The two closest pages are the copilot and assistant guides, but Google already treats their queries as different: the assistant guide gets 18 of the 963 "bim ai copilot" impressions, and the copilot guide gets none of the assistant queries. Neither competes with the other. Both compete with the workflows guide and the hub, which the changes below deal with. If the assistant guide still hasn't won its queries 8 weeks after republishing, merging it into the copilot guide (301 to /guides/bim-ai-copilot-guide) is the fallback.

## What changed on the branch

| Page | Title tag before → after | H1 before → after | Added |
|---|---|---|---|
| Workflows | AI for BIM Workflows: 8 Practical Uses + Prompts (UK Guide) → **AI for BIM Workflows: 8 to Automate First, With Prompts** | The Practical Guide for UK BIM Managers → **8 BIM Tasks Worth Automating First** | Series signpost; "Turning a prompt into a repeatable BIM workflow" (workflow files, 3 levels of automation); 2 FAQs replace the clash detection FAQ the QA guide owns; links to all 3 spokes |
| QA | AI for BIM Model Checking and QA: What It Can Actually Check → **AI for BIM Model Checking and QA: Rules, Checks and Limits** | What It Can Check, What It Cannot → **Rule Setup, Checks and Limits** | "Configuring BIM checking rules with AI" (EIR to rule table, IDS, prompt); "Natural language checks on a model export"; "Batch and unattended model checking"; deterministic validation heading; 2 FAQs |
| Copilot | BIM AI Copilot: What It Does + How to Set One Up (UK Guide) → **BIM AI Copilot: 3 Types Compared + How to Set One Up (UK)** | What It Actually Does, and How to Set One Up → **The 3 Types Compared, and How to Set One Up** | "Component queries" (table by copilot type); "Project memory" (session-aware set-ups); corrected the "cannot edit the model" claim (some add-ins act through the API); 1 FAQ |
| Assistant | AI Assistant for BIM: Stage by Stage Prompts (UK Guide) → **AI Assistant for BIM: What to Ask at Each RIBA Stage (UK)** | What to Ask It, Stage by Stage → **What to Ask It at Each RIBA Stage** | Intro names "BIM AI assistant" and "AI-powered BIM assistant"; copy-ready prompts for Stages 4, 5 and 6 to 7; Stage 3 rule set-up pointer; 1 FAQ |
| Hub | unchanged (database) | unchanged | "Further reading" block listing the 4 guides (src/lib/related-guides.ts) |

Meta descriptions, all 148 to 153 characters:

- Workflows: The 8 AI BIM workflows UK BIM managers should automate first: BEP drafting, clash triage, naming audits, COBie and coordination reports, with prompts.
- QA: AI-assisted BIM quality assurance: turning EIRs into checking rules, natural language checks on model exports, clash triage and a UK worked example.
- Copilot: What a BIM AI copilot does: the 3 types compared (embedded, general-purpose, custom), component queries, what data to give it and a UK worked example.
- Assistant: How to use an AI-powered BIM assistant from RIBA Stage 2 to 7: what to ask it, copy-ready prompts, a UK naming audit example and how to check the output.

Links between the four guides (in-body Markdown):

| Guide | Links out before | Links out after | Inbound before | Inbound after |
|---|---|---|---|---|
| Workflows | 0 | 6 | 3 | 4 |
| QA | 2 | 7 | 1 | 6 |
| Copilot | 1 | 4 | 2 | 7 |
| Assistant | 3 | 5 | 0 | 5 |

Words: workflows 3,119 → 3,792; QA 2,960 → 4,237; copilot 2,889 → 3,669; assistant 2,727 → 3,181. All four pass `publish-guide --check` with no errors or warnings.

## Not done (needs Owen's go-ahead)

1. **Republish the four guides.** The live rows matched the pre-edit Markdown on every field (checked 19 Oct, rows last updated 08:10 that morning), so a republish carries only these changes. Re-check just before publishing in case anything else touches them first.
   `node scripts/publish-guide.mjs marketing/articles/<slug>.md` for each, then request indexing for the four URLs in Search Console.
2. **Deploy the hub block.** It needs the branch merged and `main` pushed.
3. **Backlog row 64** ("chatgpt prompts for bim managers", queued) will be a fifth BIM page and overlaps the assistant guide's prompts. When it is written, it should link to /guides/ai-assistant-for-bim and stick to ChatGPT prompt wording, not RIBA stage asks, or it will split the assistant queries again.
4. **Optional hub description (database).** It still says "clash detection processes". A possible replacement (147 characters): "AI workflows and guides for UK BIM managers: BEP drafting, clash triage, model checking, naming audits and coordination reports, with free prompts."

## Caveats

- Several long-tail queries read like machine-generated sub-queries ("session-aware bim ai", "command line bim checking", "evaluate the prompt expansion company ... on BIM"). They may come from Google's AI features rather than people typing, so treat the totals as an upper bound on human demand.
- Expect Google to take 2 to 6 weeks to settle on the new owner pages. Check again in mid-November: for each query in the map, the owner page should carry most of the impressions.
