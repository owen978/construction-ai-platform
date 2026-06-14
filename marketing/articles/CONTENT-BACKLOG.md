# BuildCopilot Content Backlog

> 12 pillar articles = ~3 months of weekly publishing.
> Each is chosen from Search Console data: high impressions, poor position (the gap = the opportunity).
> The weekly engine takes the next `status: queued` item, writes it, and publishes it.
> Mark `status: published` once live.

| # | Status | Target keyword cluster | GSC signal | Slug | Internal links |
|---|--------|------------------------|-----------|------|----------------|
| 1 | PUBLISHED | rams / rams template / what is a rams | /templates/rams 439 impr @ pos 73 | what-is-a-rams-construction-guide | /templates/rams, /templates/method-statement, /templates/risk-assessment, /ai-workflows/draft-method-statement, /ai-workflows/generate-coshh-risk-assessment, /prompt-pack |
| 2 | queued | construction daily report template / daily site report | ~348 impr across variations @ pos 55-73 | construction-daily-report-guide | /templates/daily-report, /templates/site-diary, /ai-workflows/write-daily-site-report, /ai-for/site-manager |
| 3 | queued | project risk register / construction risk register | 239 impr @ pos 47 + "construction risk register" cluster | how-to-build-a-construction-risk-register | /templates/risk-register, /ai-workflows/generate-project-risk-register, /guides/ai-risk-assessment-construction |
| 4 | queued | construction meeting minutes / meeting minutes software | 156 impr @ pos 12 (quickest win) | construction-meeting-minutes-guide | /templates/meeting-minutes, /ai-workflows/generate-meeting-minutes, /ai-workflows/draft-pre-construction-meeting-agenda |
| 5 | queued | ai for quantity surveyors / quantity surveyor ai | best-performing role page, strong cluster | ai-for-quantity-surveyors-guide | /ai-for/quantity-surveyor, /ai-workflows/generate-bill-of-quantities, /ai-workflows/analyse-tender-returns, /ai-tools/claude, /prompt-pack |
| 6 | queued | method statement / construction method statement template | "method statement" cluster @ pos 27-47 | construction-method-statement-guide | /templates/method-statement, /ai-workflows/draft-method-statement, /templates/rams |
| 7 | queued | snag list / snagging list template | "snag list template" 20 impr + cluster | construction-snagging-list-guide | /ai-workflows/generate-snagging-list-template, /ai-for/snagging-and-defects |
| 8 | queued | toolbox talk template / toolbox talks | "toolbox talk template" cluster @ pos 68-86 | construction-toolbox-talks-guide | /templates/toolbox-talk, /ai-workflows/write-toolbox-talk |
| 9 | queued | ai tender analysis / tender evaluation | "ai tender analysis" 52 impr @ pos 87 | ai-tender-analysis-guide | /ai-workflows/analyse-tender-returns, /templates/tender-evaluation, /ai-for/tender-analysis |
| 10 | queued | cost plan / nrm1 cost plan template | /templates/cost-plan pos 6.57, expand cluster | construction-cost-plan-guide | /templates/cost-plan, /ai-workflows/generate-preliminary-cost-plan, /ai-for/cost-estimation |
| 11 | queued | pre qualification questionnaire / pas 91 / pqq | "pre qualification questionnaire" cluster | construction-pqq-pas91-guide | /ai-workflows/draft-pre-qualification-questionnaire |
| 12 | queued | cdm construction phase plan template | "cdm construction phase plan" cluster | cdm-construction-phase-plan-guide | /templates/construction-phase-plan, /ai-workflows/create-waste-management-plan |

## Wave 2 — new pages from Ahrefs keyword research (marketing/keyword-research.md)

These target the bigger US AI market and blue-ocean (zero-competition) terms. They are all `/guides/` pages, so the existing weekly engine publishes them with no code changes. The weekly engine works through Wave 1 first, then Wave 2.

| # | Status | Target keyword | Volume / KD | Slug | Internal links |
|---|--------|----------------|-------------|------|----------------|
| 13 | queued | ai in construction | US 2,000 / KD 31 (hub page) | ai-in-construction | /ai-tools/claude, /ai-workflows, /guides/ai-for-cost-estimation, /ai-for/quantity-surveyor, /prompt-pack |
| 14 | queued | generative ai in construction | US 150 / KD 0 (easy win) | generative-ai-in-construction | /guides/ai-in-construction, /ai-tools/claude, /ai-workflows, /prompt-pack |
| 15 | queued | ai in construction safety | US 200 / KD 3 (easy win) | ai-in-construction-safety | /ai-workflows/generate-coshh-risk-assessment, /templates/rams, /ai-for/health-and-safety-manager, /prompt-pack |
| 16 | queued | will ai replace construction workers | US 80 / KD 0 (engagement) | will-ai-replace-construction-workers | /guides/ai-in-construction, /ai-for/quantity-surveyor, /ai-workflows |
| 17 | queued | how to use ai in construction | US 200 / KD 37 | how-to-use-ai-in-construction | /ai-workflows, /prompt-pack, /ai-tools/claude, /guides/ai-in-construction |
| 18 | queued | ai construction estimating | US 300 / $7 CPC (high value) | ai-construction-estimating | /guides/ai-for-cost-estimation, /ai-workflows/generate-bill-of-quantities, /templates/cost-plan, /prompt-pack |
| 19 | queued | ai for construction project management | US 200 / KD 56 | ai-for-construction-project-management | /ai-workflows/generate-project-risk-register, /ai-workflows/draft-monthly-progress-report, /guides/ai-in-construction |
| 20 | queued | ai use cases in construction | US 150 | ai-use-cases-in-construction | /ai-workflows, /guides/ai-in-construction, /prompt-pack |
| 21 | queued | chatgpt prompts for construction | blue ocean / first-mover | chatgpt-prompts-for-construction | /prompt-pack, /ai-workflows, /ai-tools/chatgpt |
| 22 | queued | golden thread construction | UK 250 / KD 9 (UK moat) | golden-thread-construction-explained | /guides/ai-for-health-and-safety-documentation, /templates/rams, /ai-workflows |

### Page types that need a developer (not the weekly engine)

These need new code routes, so they are a separate build sprint, not auto-publishable as guides:

- **ChatGPT prompt hub pages** per role (`/chatgpt-prompts-for-quantity-surveyors`, etc.) — zero competition, first-mover advantage
- **Tool comparison pages** (`/best-ai-tools-for-construction`, `/free-ai-construction-estimating` — KD 7, $4.50 CPC) — high commercial intent
- **UK compliance section** (`/uk/golden-thread-construction`, `/uk/building-safety-act-ai`)
- **Missing template pages** (`/templates/fire-risk-assessment` — UK SV 200, KD 4)

## Article quality rules (every article must follow these for SEO + GEO)

1. **Direct-answer opening.** First paragraph defines the term in bold and answers the core query in 2-3 sentences. This is what Google AI Overviews and ChatGPT quote.
2. **Clear H2/H3 structure.** Use `##` and `###`. No walls of text.
3. **At least one comparison table.** AI engines extract tables readily (e.g. RAMS vs method statement vs risk assessment).
4. **A worked example.** Concrete, UK-specific, realistic.
5. **FAQ section.** End with `## Frequently asked questions` and 5-6 `###` questions. This auto-generates FAQPage schema (built into the guide page).
6. **5+ internal links** to the relevant template / workflow / role pages and /prompt-pack.
7. **UK construction context.** Reference CDM 2015, RICS, NRM, real cards/tickets where relevant.
8. **No em dashes.** Use commas, colons, or parentheses.
9. **2,000-3,000 words.**

## How to publish (manual or scheduled)

```
node scripts/publish-guide.mjs marketing/articles/<file>.md          # publish live
node scripts/publish-guide.mjs marketing/articles/<file>.md --draft  # publish as draft
```

The script upserts by slug, so re-running updates an existing article rather than duplicating it.
