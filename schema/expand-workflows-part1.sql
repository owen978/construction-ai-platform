-- ============================================================
-- Construction AI Platform — Expanded Workflows (16-33)
-- Run this in Supabase SQL Editor AFTER the initial seed data
-- and after expand-roles-tasks.sql
-- ============================================================
-- Adds 18 new workflows across QS/Commercial, Project Manager,
-- and Site Manager clusters.
-- ============================================================

INSERT INTO workflows (title, slug, description, long_description, prompt, example_output, use_case, difficulty, icon, status, featured, sort_order, role_id, task_id, tool_id, guide_id) VALUES

-- ============================================================
-- QS / COMMERCIAL CLUSTER (Workflows 16-23)
-- ============================================================

-- WORKFLOW 16: Generate a Bill of Quantities
(
  'Generate a Bill of Quantities',
  'generate-bill-of-quantities',
  'Produce a structured Bill of Quantities section in NRM2 format for a specific building element using AI.',
  'This workflow helps Quantity Surveyors rapidly draft BoQ sections following NRM2 measurement rules. It generates properly structured items with descriptions, units, and quantities for a given building element, which you can then price and refine against project drawings.',
  'You are an experienced UK Quantity Surveyor preparing a Bill of Quantities in accordance with NRM2 (RICS New Rules of Measurement: Detailed measurement for building works). Generate a detailed BoQ section for the following building element:

Building Element: [ELEMENT, e.g., Reinforced concrete frame — columns, beams, and suspended slabs]
Project Type: [PROJECT TYPE, e.g., 4-storey commercial office building]
Gross Internal Floor Area: [GIFA, e.g., 3,200 sqm]
Structural Grid: [GRID, e.g., 7.5m x 7.5m typical bays]
Specification Notes: [SPEC, e.g., C40 concrete, B500B reinforcement, typical slab thickness 275mm]

Structure the BoQ as a table with the following columns:
- Item Reference (e.g., 2.1.1, 2.1.2)
- NRM2 Work Section Reference
- Description (full measured item description including specification)
- Unit (m3, m2, kg, m, nr, etc.)
- Quantity
- Rate (leave blank for pricing)
- Amount (leave blank for pricing)

Follow NRM2 measurement rules for each item. Include:
- All concrete work measured in m3 separated by element (columns, beams, slabs, upstands)
- Formwork measured in m2 by type (sides of beams, soffits, column faces, slab soffits)
- Reinforcement measured in tonnes separated by bar diameter
- Any associated sundry items (construction joints, waterstops, cast-in fixings)

Add brief notes at the end covering measurement assumptions and any items excluded from this section.',
  NULL,
  'Use this when you need to quickly draft a BoQ section for a specific element during the measurement phase. Replace the placeholders with your actual project details and review against the drawings before issuing for pricing.',
  'intermediate',
  '📊',
  'published',
  false,
  16,
  (SELECT id FROM roles WHERE slug = 'quantity-surveyor'),
  (SELECT id FROM tasks WHERE slug = 'cost-estimation'),
  (SELECT id FROM tools WHERE slug = 'chatgpt'),
  (SELECT id FROM guides WHERE slug = 'ai-for-cost-estimation')
),

-- WORKFLOW 17: Draft a Valuation & Payment Application
(
  'Draft a Valuation & Payment Application',
  'draft-valuation-payment-application',
  'Generate a structured interim valuation and payment application summary with cumulative values, retention, and payment calculations.',
  'This workflow helps Quantity Surveyors draft interim valuation summaries that accompany payment applications. It calculates cumulative amounts, retention deductions, and the net payment due, formatted for attachment to the contractor''s interim application.',
  'You are a UK Quantity Surveyor preparing an interim valuation and payment application. Using the data provided, draft a structured Interim Valuation summary:

Contract Details:
- Project: [PROJECT NAME]
- Employer: [EMPLOYER NAME]
- Contractor: [CONTRACTOR NAME]
- Contract Form: [CONTRACT, e.g., JCT Standard Building Contract With Quantities 2016 / NEC4 Option A]
- Contract Sum: [ORIGINAL CONTRACT SUM, e.g., £6,450,000]
- Valuation Number: [NUMBER, e.g., Interim Valuation No. 7]
- Valuation Date: [DATE, e.g., 28 February 2025]
- Retention Percentage: [RETENTION, e.g., 3%]
- Retention Limit: [LIMIT, e.g., 5% of contract sum]

Current Valuation Data:
- Measured Works Completed to Date: [AMOUNT, e.g., £3,870,000]
- Variations Agreed (cumulative): [AMOUNT, e.g., £215,000]
- Variations Assessed but not Agreed: [AMOUNT, e.g., £48,500]
- Materials on Site: [AMOUNT, e.g., £85,000]
- Fluctuations (if applicable): [AMOUNT, e.g., £0]
- Claims (if applicable): [AMOUNT, e.g., £0]
- Previous Certified Amount (gross): [AMOUNT, e.g., £3,410,000]

Present the valuation as a formal summary table showing:
1. Gross valuation breakdown (works complete, variations, materials on site)
2. Less retention calculation
3. Net valuation to date
4. Less amount previously certified
5. Amount due this certificate
6. Due date and final date for payment per the contract

Add notes on any items where agreement is pending and state the contractual payment notice requirements under the relevant contract terms and the Housing Grants, Construction and Regeneration Act 1996 (as amended).',
  NULL,
  'Use at each valuation date to quickly structure your payment application before review. Fill in the actual figures from your measured works and the AI will format the complete valuation summary with correct calculations.',
  'intermediate',
  '💷',
  'published',
  false,
  17,
  (SELECT id FROM roles WHERE slug = 'quantity-surveyor'),
  (SELECT id FROM tasks WHERE slug = 'valuation-and-payment-applications'),
  (SELECT id FROM tools WHERE slug = 'claude'),
  NULL
),

-- WORKFLOW 18: Write a Variation Assessment
(
  'Write a Variation Assessment',
  'write-variation-assessment',
  'Produce a detailed variation assessment covering cost impact, programme implications, and contractual entitlement under the relevant form of contract.',
  'This workflow assists Quantity Surveyors in drafting comprehensive variation assessments. It evaluates the cost and time impact of a proposed change and references the appropriate contractual clauses to establish entitlement, providing a structured document ready for negotiation.',
  'You are a senior UK Quantity Surveyor assessing a contract variation. Produce a detailed Variation Assessment for the following change:

Contract Details:
- Project: [PROJECT NAME]
- Contract Form: [CONTRACT FORM, e.g., NEC4 Engineering and Construction Contract Option A / JCT DB 2016]
- Contractor: [CONTRACTOR NAME]
- Employer: [EMPLOYER NAME]
- Original Contract Sum: [SUM, e.g., £12,800,000]
- Variation Reference: [REF, e.g., CE-042 / VI-018]

Variation Description:
- Title: [VARIATION TITLE, e.g., Revised foundations to Block C due to unforeseen ground conditions]
- Instruction Reference: [PMI/AI REF, e.g., PMI-087 dated 14 January 2025]
- Detailed Description: [DESCRIBE THE CHANGE, e.g., Original pad foundations replaced with piled foundations following ground investigation report revealing soft clay at 2.5m depth]

Assessment Requirements:
- Identify the contractual clause giving rise to the variation (e.g., NEC4 cl. 60.1(12) or JCT cl. 5.1)
- Break down the cost assessment using the contract-defined valuation method
- Include: additional work, omitted work, net cost impact, any preliminaries adjustment, risk allowance
- Assess the programme impact in working days with justification
- State whether an extension of time is warranted and under which clause
- Identify any follow-on impacts to other works or trades

Structure the assessment as:
1. Background & Instruction
2. Contractual Basis
3. Cost Assessment (detailed breakdown table)
4. Programme Impact Assessment
5. Summary & Recommendation

Use measured rates from the contract where applicable, or build up star rates where no applicable rate exists. Reference the specific contract clauses throughout.',
  NULL,
  'Use when you receive a variation instruction or compensation event notification and need to prepare a formal cost and programme assessment. This is suitable for medium to large variations where a detailed written assessment is required.',
  'advanced',
  '🔄',
  'published',
  false,
  18,
  (SELECT id FROM roles WHERE slug = 'quantity-surveyor'),
  (SELECT id FROM tasks WHERE slug = 'variation-management'),
  (SELECT id FROM tools WHERE slug = 'claude'),
  (SELECT id FROM guides WHERE slug = 'ai-for-contract-administration')
),

-- WORKFLOW 19: Create a Cost-Value Reconciliation
(
  'Create a Cost-Value Reconciliation',
  'create-cost-value-reconciliation',
  'Generate a structured CVR report showing contract value, actual costs, forecast to complete, and projected margin for commercial reporting.',
  'This workflow helps Commercial Managers produce a monthly Cost-Value Reconciliation. It structures the data into a clear summary with variance analysis, enabling leadership to understand the commercial position at a glance and make informed decisions.',
  'You are a Commercial Manager on a UK construction project preparing the monthly Cost-Value Reconciliation (CVR). Using the data below, generate a comprehensive CVR report:

Project Details:
- Project: [PROJECT NAME]
- Client: [CLIENT NAME]
- Contract Form: [CONTRACT, e.g., NEC4 Option C / JCT D&B 2016]
- Original Contract Value: [VALUE, e.g., £9,500,000]
- Approved Variations to Date: [VALUE, e.g., £620,000]
- Anticipated Variations (pipeline): [VALUE, e.g., £180,000]
- Reporting Period: [MONTH/YEAR, e.g., March 2025]
- Programme Completion: [DATE, e.g., November 2025]
- Percentage Complete: [%, e.g., 55%]

Cost Data by Category:
- Subcontract Packages: [COMMITTED VALUE, e.g., £5,200,000] / [COST TO DATE, e.g., £2,750,000] / [FORECAST FINAL, e.g., £5,350,000]
- Materials (direct): [COMMITTED, e.g., £850,000] / [TO DATE, e.g., £480,000] / [FORECAST, e.g., £870,000]
- Labour (direct): [COMMITTED, e.g., £1,100,000] / [TO DATE, e.g., £620,000] / [FORECAST, e.g., £1,150,000]
- Plant: [COMMITTED, e.g., £380,000] / [TO DATE, e.g., £195,000] / [FORECAST, e.g., £400,000]
- Preliminaries: [BUDGET, e.g., £1,200,000] / [TO DATE, e.g., £710,000] / [FORECAST, e.g., £1,250,000]
- Design Fees: [BUDGET, e.g., £220,000] / [TO DATE, e.g., £185,000] / [FORECAST, e.g., £225,000]
- Overheads: [BUDGET, e.g., £280,000] / [TO DATE, e.g., £155,000] / [FORECAST, e.g., £290,000]

Generate the CVR with:
1. Value Summary — showing original contract value, approved variations, anticipated variations, and total anticipated final value
2. Cost Summary Table — by category showing budget, committed, cost to date, forecast final cost
3. Margin Analysis — original margin, current forecast margin, variance, margin percentage
4. Risk & Opportunity Schedule — list the top 5 commercial risks and top 5 opportunities with estimated values
5. Movement Since Last Report — what has changed and why
6. Actions & Recommendations — specific actions to protect or improve margin

Present financial figures in a clear tabular format. Highlight any cost overruns in the commentary.',
  NULL,
  'Run this monthly as part of your commercial reporting cycle. Input the latest cost and value data and the AI will structure the CVR. Review all figures before issuing to senior management.',
  'intermediate',
  '📉',
  'published',
  false,
  19,
  (SELECT id FROM roles WHERE slug = 'commercial-manager'),
  (SELECT id FROM tasks WHERE slug = 'budget-forecasting'),
  (SELECT id FROM tools WHERE slug = 'chatgpt'),
  NULL
),

-- WORKFLOW 20: Analyse Subcontractor Quotes
(
  'Analyse Subcontractor Quotes',
  'analyse-subcontractor-quotes',
  'Compare multiple subcontractor quotations side by side, identifying pricing discrepancies, exclusions, and commercial risks.',
  'This workflow enables Quantity Surveyors to rapidly analyse and compare subcontractor tender returns. It produces a structured comparison highlighting scope gaps, qualifications, and risk areas to support the recommendation for subcontract award.',
  'You are a UK Quantity Surveyor comparing subcontractor quotations for a trade package. Analyse the following tender returns and produce a Subcontractor Quote Comparison Report:

Package Details:
- Trade Package: [PACKAGE, e.g., Mechanical Services / Structural Steelwork / Drylining & Ceilings]
- Project: [PROJECT NAME]
- Budget Allowance: [BUDGET, e.g., £420,000]
- Tender Issue Date: [DATE]
- Tender Return Date: [DATE]
- Scope Summary: [BRIEF SCOPE, e.g., Full mechanical installation including HVAC, plumbing, and BMS to 4-storey office building]

Subcontractor Returns:
[SUBCONTRACTOR 1 NAME]: [TOTAL PRICE, e.g., £385,000]
- Key Qualifications/Exclusions: [LIST, e.g., Excludes builders work, commissioning by others, programme 18 weeks]

[SUBCONTRACTOR 2 NAME]: [TOTAL PRICE, e.g., £412,500]
- Key Qualifications/Exclusions: [LIST, e.g., Includes commissioning, excludes BMS, programme 16 weeks]

[SUBCONTRACTOR 3 NAME]: [TOTAL PRICE, e.g., £398,750]
- Key Qualifications/Exclusions: [LIST, e.g., Provisional sum for BMS £45,000, excludes testing, programme 20 weeks]

Produce the analysis as follows:
1. Summary Comparison Table — side-by-side pricing, programme, and key terms
2. Scope Gap Analysis — items included by some but excluded by others, identify what needs adding back to create a like-for-like comparison
3. Adjusted Comparison — estimate the cost of excluded items and show an adjusted like-for-like total for each subcontractor
4. Commercial Risk Assessment — payment terms, retention, programme risk, financial standing concerns
5. Programme Implications — compare offered programmes against the main contract requirement
6. Recommendation — state which subcontractor offers best value (not just lowest price) with clear rationale

Flag any qualifications that could create significant commercial exposure during the project.',
  NULL,
  'Use when you have received subcontractor tender returns and need to evaluate them before making an award recommendation. Input the key commercial data from each return and the AI will structure the comparison.',
  'intermediate',
  '🤝',
  'published',
  false,
  20,
  (SELECT id FROM roles WHERE slug = 'quantity-surveyor'),
  (SELECT id FROM tasks WHERE slug = 'tender-analysis'),
  (SELECT id FROM tools WHERE slug = 'claude'),
  NULL
),

-- WORKFLOW 21: Draft a Final Account Summary
(
  'Draft a Final Account Summary',
  'draft-final-account-summary',
  'Structure a comprehensive final account document covering original contract sum, all variations, claims, adjustments, and the agreed final sum.',
  'This workflow helps Quantity Surveyors draft the final account summary that records the agreed financial settlement of a construction contract. It organises all adjustments into a clear, auditable format suitable for sign-off by both parties.',
  'You are a senior UK Quantity Surveyor preparing a Final Account for agreement between the Employer and Contractor. Draft a structured Final Account Summary using the following data:

Contract Details:
- Project: [PROJECT NAME]
- Contract Form: [CONTRACT, e.g., JCT Standard Building Contract With Quantities 2016]
- Employer: [EMPLOYER NAME]
- Contractor: [CONTRACTOR NAME]
- Original Contract Sum: [SUM, e.g., £7,250,000]
- Date of Practical Completion: [DATE, e.g., 14 March 2025]
- Defects Rectification Period: [PERIOD, e.g., 12 months]

Adjustments:
- Agreed Variations (list totals): [ADDITIONS, e.g., £485,000] / [OMISSIONS, e.g., £132,000]
- Provisional Sums — Defined (budget vs actual): [BUDGET, e.g., £320,000] / [ACTUAL, e.g., £298,500]
- Provisional Sums — Undefined (budget vs actual): [BUDGET, e.g., £180,000] / [ACTUAL, e.g., £205,200]
- Prime Cost Sums (budget vs actual): [BUDGET, e.g., £95,000] / [ACTUAL, e.g., £88,400]
- Daywork (if any): [AMOUNT, e.g., £12,300]
- Fluctuations (if applicable): [AMOUNT, e.g., £0]
- Claims Agreed: [AMOUNT AND BRIEF DESCRIPTION, e.g., £35,000 — prolongation costs for delayed steel delivery]
- Liquidated Damages Applied: [AMOUNT, e.g., £0]
- Contra Charges: [AMOUNT, e.g., £8,500]

Draft the Final Account as follows:
1. Final Account Summary Statement — a formal reconciliation table showing:
   a. Original Contract Sum
   b. Net Variations (additions less omissions)
   c. Adjustment of Provisional Sums (defined and undefined separately)
   d. Adjustment of Prime Cost Sums
   e. Daywork
   f. Fluctuations
   g. Agreed Claims
   h. Less Liquidated Damages
   i. Less Contra Charges
   j. Final Account Sum
2. Schedule of Variations — numbered list with brief description and net value of each
3. Statement of Retention — showing retention held, moiety released at PC, balance due at end of DLP
4. Statement of Payments — all certificates issued, amounts paid, balance outstanding
5. Agreement Clause — standard wording for both parties to sign confirming the final account as full and final settlement under the contract

Reference the relevant JCT or NEC clauses for final account procedures.',
  NULL,
  'Use when the project has reached practical completion and you are compiling the final account for agreement. Input all the adjustment figures and the AI will structure the complete final account document.',
  'advanced',
  '📑',
  'published',
  false,
  21,
  (SELECT id FROM roles WHERE slug = 'quantity-surveyor'),
  (SELECT id FROM tasks WHERE slug = 'valuation-and-payment-applications'),
  (SELECT id FROM tools WHERE slug = 'chatgpt'),
  NULL
),

-- WORKFLOW 22: Generate a Cashflow Forecast
(
  'Generate a Cashflow Forecast',
  'generate-cashflow-forecast',
  'Create a monthly cashflow forecast with cumulative expenditure profile and S-curve data for construction project financial planning.',
  'This workflow helps Commercial Managers produce a project cashflow forecast showing monthly income and expenditure profiles. It generates an S-curve expenditure pattern based on project parameters and presents the data in a format ready for financial reporting.',
  'You are a Commercial Manager preparing a cashflow forecast for a UK construction project. Generate a monthly cashflow forecast based on the following:

Project Details:
- Project: [PROJECT NAME]
- Contract Value (including approved variations): [VALUE, e.g., £14,200,000]
- Start on Site Date: [DATE, e.g., January 2025]
- Planned Completion Date: [DATE, e.g., March 2026]
- Contract Duration: [MONTHS, e.g., 15 months]
- Current Month: [MONTH, e.g., Month 5 of 15]
- Retention Percentage: [%, e.g., 3%]
- Payment Terms: [TERMS, e.g., Monthly valuations, 14 days for payment]
- Front-End Loading: [YES/NO and brief note, e.g., Yes — significant substructure and steel package in first 4 months]

Expenditure Profile Characteristics:
- Early Works (Months 1-3): [DESCRIPTION, e.g., Enabling works, piling, substructure — moderate spend]
- Peak Construction (Months 4-10): [DESCRIPTION, e.g., Frame, envelope, and M&E rough-in — high spend period]
- Fit-Out & Commissioning (Months 11-15): [DESCRIPTION, e.g., Fit-out, commissioning, external works — declining spend]

Generate:
1. Monthly Cashflow Table with columns:
   - Month Number and Calendar Month
   - Monthly Expenditure (cost)
   - Cumulative Expenditure
   - Monthly Valuation (income)
   - Cumulative Valuation
   - Retention Held
   - Net Cash Position

2. Cashflow Summary showing:
   - Total forecast expenditure vs contract value
   - Peak monthly expenditure month and amount
   - Maximum cash funding requirement and the month it occurs
   - Forecast margin and margin percentage

3. S-Curve Description — describe the shape of the cumulative expenditure curve in text (since we cannot draw a graph), noting the inflection points and the months of peak activity

4. Key Assumptions and Risks to the cashflow forecast

Ensure the expenditure profile follows a realistic S-curve pattern for a UK construction project of this type.',
  NULL,
  'Use at project start or during monthly commercial reporting to produce or update the cashflow forecast. Input the project financials and the AI will generate a realistic monthly profile based on the project characteristics.',
  'intermediate',
  '💰',
  'published',
  false,
  22,
  (SELECT id FROM roles WHERE slug = 'commercial-manager'),
  (SELECT id FROM tasks WHERE slug = 'budget-forecasting'),
  (SELECT id FROM tools WHERE slug = 'chatgpt'),
  (SELECT id FROM guides WHERE slug = 'ai-for-cost-estimation')
),

-- WORKFLOW 23: Write a Commercial Risk Summary
(
  'Write a Commercial Risk Summary',
  'write-commercial-risk-summary',
  'Identify and present commercial risks in a structured summary suitable for senior leadership review and decision-making.',
  'This workflow helps Commercial Managers prepare a commercial risk summary for the monthly board pack or project review meeting. It structures commercial risks with quantified exposure, likelihood, and recommended actions to support leadership decision-making.',
  'You are a Commercial Manager preparing a Commercial Risk Summary for the senior leadership team on a UK construction project. Using the data below, produce a structured commercial risk report:

Project Details:
- Project: [PROJECT NAME]
- Contract Value: [VALUE, e.g., £22,000,000]
- Contract Form: [CONTRACT, e.g., NEC4 Option C target cost with activity schedule]
- Current CVR Position: [FORECAST MARGIN, e.g., 4.2% / £924,000]
- Percentage Complete: [%, e.g., 62%]
- Reporting Period: [DATE, e.g., March 2025]

Known Commercial Risks:
[LIST KNOWN RISKS, e.g.,
- 3 compensation events totalling £340,000 under assessment, client disputing quantum
- Mechanical subcontractor in financial difficulty, bonding in place but programme risk
- Provisional sum for external works likely to exceed allowance by £120,000
- Steel price fluctuation clause triggered, estimated impact £85,000
- Delay to Phase 2 handover may trigger sectional completion damages of £5,000/week]

Known Opportunities:
[LIST OPPORTUNITIES, e.g.,
- Value engineering saving on cladding specification under review — potential £95,000
- Early completion bonus for Phase 1 — £50,000 if achieved by target date
- Subcontractor package buyout savings on remaining packages — estimated £60,000]

Produce the Commercial Risk Summary as follows:
1. Executive Summary — 2-3 sentences on the overall commercial position and risk profile
2. Risk Register Table with columns: Risk ID, Description, Gross Exposure (£), Likelihood (H/M/L), Weighted Exposure (£), Owner, Mitigation Action, Status
3. Opportunity Register Table — same format as risks
4. Net Commercial Exposure — total risk exposure less total opportunity value
5. Impact on Forecast Margin — show current forecast margin and adjusted margin after risk/opportunity weighting
6. Recommended Actions — prioritised list of actions for leadership decision
7. Watchlist — items not yet quantified but requiring monitoring

Keep the tone factual and concise. This is a board-level document — avoid jargon, present clear numbers, and focus on actions.',
  NULL,
  'Use this monthly alongside the CVR to prepare your commercial risk summary for the project review or board meeting. Input your known risks and opportunities and the AI will structure them into a leadership-ready report.',
  'intermediate',
  '⚠️',
  'published',
  false,
  23,
  (SELECT id FROM roles WHERE slug = 'commercial-manager'),
  (SELECT id FROM tasks WHERE slug = 'risk-assessment'),
  (SELECT id FROM tools WHERE slug = 'claude'),
  (SELECT id FROM guides WHERE slug = 'ai-risk-assessment-construction')
),

-- ============================================================
-- PROJECT MANAGER CLUSTER (Workflows 24-29)
-- ============================================================

-- WORKFLOW 24: Create a Project Execution Plan Summary
(
  'Create a Project Execution Plan Summary',
  'create-project-execution-plan-summary',
  'Draft a structured Project Execution Plan covering scope, organisation, programme approach, procurement strategy, and risk management.',
  'This workflow helps Project Managers produce a PEP summary document during the pre-construction phase. It generates a structured plan covering all key workstreams that can be expanded and refined as the project develops.',
  'You are a UK Construction Project Manager drafting a Project Execution Plan (PEP) for the pre-construction phase. Generate a comprehensive PEP summary based on the following project information:

Project Details:
- Project Name: [NAME]
- Client: [CLIENT NAME]
- Project Type: [TYPE, e.g., New-build mixed-use development — 120 residential units with ground-floor commercial]
- Contract Form: [CONTRACT, e.g., JCT Design and Build Contract 2016]
- Contract Value: [VALUE, e.g., £28,000,000]
- Site Location: [LOCATION, e.g., Birmingham city centre]
- Programme: [START DATE] to [COMPLETION DATE, e.g., April 2025 to September 2027]
- Key Constraints: [LIST, e.g., Adjacent live railway, party wall agreements required, restricted working hours]

Team Structure:
- Project Director: [NAME]
- Project Manager: [NAME]
- Senior QS: [NAME]
- Site Manager: [NAME]
- Design Manager: [NAME]

Structure the PEP with the following sections:
1. Project Overview — brief description, objectives, key success criteria
2. Scope Definition — what is included and excluded from the contract
3. Project Organisation — team structure, roles, responsibilities, reporting lines, meeting schedule
4. Design Management — design responsibility matrix, information required schedule approach, design review process
5. Programme Strategy — overall approach, key milestones, phasing, critical path summary
6. Procurement Strategy — packaging strategy, long-lead items, preferred supply chain approach
7. Commercial Management — cost control procedures, change management, valuation and payment process
8. Risk Management — approach to risk identification, top 5 project risks with initial mitigation
9. Health, Safety & Wellbeing — CDM duties, principal contractor responsibilities, safety targets
10. Quality Management — inspection and test plans, handover and commissioning approach
11. Stakeholder & Communication Management — key stakeholders, communication plan, reporting frequency
12. Environmental & Sustainability — BREEAM/sustainability targets, waste management approach, considerate constructors

For each section provide 2-3 paragraphs of substantive content specific to the project type described. Reference relevant standards and regulations (CDM 2015, Building Safety Act 2022, Building Regulations) where appropriate.',
  NULL,
  'Use at the start of a project when you need to draft the PEP. Input your project details and team structure, then expand each section with project-specific detail before issuing for review.',
  'intermediate',
  '📋',
  'published',
  false,
  24,
  (SELECT id FROM roles WHERE slug = 'project-manager'),
  (SELECT id FROM tasks WHERE slug = 'project-scheduling'),
  (SELECT id FROM tools WHERE slug = 'microsoft-copilot'),
  NULL
),

-- WORKFLOW 25: Draft a Lessons Learned Report
(
  'Draft a Lessons Learned Report',
  'draft-lessons-learned-report',
  'Structure a lessons learned report from project completion data, capturing what went well, what could improve, and actionable recommendations.',
  'This workflow helps Project Managers compile a structured lessons learned report at project completion or key milestones. It organises feedback into categories and produces actionable recommendations that can be shared across the business.',
  'You are a UK Construction Project Manager compiling a Lessons Learned Report at the end of a project. Using the raw data below, structure a comprehensive lessons learned document:

Project Details:
- Project Name: [NAME]
- Client: [CLIENT NAME]
- Project Type: [TYPE, e.g., Office refurbishment]
- Contract Value: [ORIGINAL VALUE] / Final Account: [FINAL VALUE]
- Original Programme: [START] to [PLANNED END]
- Actual Completion: [ACTUAL END]
- Project Team Size: [NUMBER, e.g., 12 site-based staff at peak]

Project Outcomes:
- Programme Performance: [e.g., Completed 3 weeks late due to design changes in Months 4-6]
- Cost Performance: [e.g., Final account £120K over original contract sum, mainly due to unforeseen asbestos]
- Quality Performance: [e.g., 142 snagging items at PC, 95% closed within 4 weeks]
- Safety Performance: [e.g., Zero RIDDOR, 2 minor first-aid incidents, 14 near-miss reports]
- Client Satisfaction: [e.g., Generally positive, concerns raised about communication during design changes]

Key Observations (raw feedback):
[PASTE RAW NOTES, e.g.,
- Subcontractor procurement started too late for M&E package
- BIM model was not maintained after RIBA Stage 4, caused coordination clashes on site
- Weekly client meetings worked well, kept issues visible
- Material deliveries from Europe had longer lead times than planned
- Site induction process was praised by HSE inspector]

Structure the report as:
1. Executive Summary — 3-4 sentence overview of the project and key outcomes
2. What Went Well — categorised by Design, Procurement, Construction, Commercial, H&S, Client Relationship
3. What Could Be Improved — same categories
4. Root Cause Analysis — for the top 3 issues, identify the underlying cause
5. Recommendations — numbered, actionable recommendations with suggested owner (e.g., "Pre-construction team", "Commercial department")
6. Metrics Summary Table — programme, cost, quality, and safety KPIs in a simple table

Keep the tone constructive and forward-looking. Focus on actionable improvements rather than blame.',
  NULL,
  'Use at practical completion or after any significant project milestone. Gather raw feedback from the project team and paste it in — the AI will organise it into a professional lessons learned report.',
  'beginner',
  '💡',
  'published',
  false,
  25,
  (SELECT id FROM roles WHERE slug = 'project-manager'),
  (SELECT id FROM tasks WHERE slug = 'progress-reporting'),
  (SELECT id FROM tools WHERE slug = 'claude'),
  NULL
),

-- WORKFLOW 26: Generate a Stakeholder Management Plan
(
  'Generate a Stakeholder Management Plan',
  'generate-stakeholder-management-plan',
  'Create a stakeholder register with influence and interest mapping, communication preferences, and a tailored engagement strategy.',
  'This workflow helps Project Managers develop a comprehensive stakeholder management plan. It maps stakeholders by influence and interest, defines communication approaches, and creates an engagement strategy to manage expectations throughout the project lifecycle.',
  'You are a UK Construction Project Manager developing a Stakeholder Management Plan. Using the project and stakeholder details below, create a comprehensive stakeholder engagement strategy:

Project Details:
- Project Name: [NAME]
- Project Type: [TYPE, e.g., New-build 200-bed hotel in town centre]
- Contract Value: [VALUE, e.g., £35,000,000]
- Location: [LOCATION, e.g., Central Bristol]
- Duration: [DURATION, e.g., 24 months]
- Key Sensitivities: [LIST, e.g., Adjacent residential properties, listed building nearby, busy high street access, local councillor interest]

Known Stakeholders:
[LIST STAKEHOLDERS, e.g.,
- Client project team (3 people, very engaged)
- Client board / investors (quarterly interest)
- Local authority planning department
- Building control
- Neighbouring residents (terraced houses to the east)
- Local business owners on the high street
- Highways authority
- Heritage officer (listed building adjacent)
- Utility companies (complex diversions required)
- End-user operator (hotel chain, involved in fit-out specification)]

Generate the following:
1. Stakeholder Register Table with columns: Stakeholder, Category (Internal/External/Regulatory), Interest Level (H/M/L), Influence Level (H/M/L), Quadrant (Manage Closely / Keep Satisfied / Keep Informed / Monitor), Key Concerns, Lead Contact

2. Influence-Interest Grid — describe which stakeholders sit in each quadrant and why

3. Communication Plan Table with columns: Stakeholder, Communication Method, Frequency, Content/Purpose, Responsible Person

4. Engagement Strategy — for each high-influence stakeholder, describe the specific approach (e.g., monthly face-to-face meetings, dedicated liaison officer, community newsletter)

5. Risk & Issues — potential stakeholder-related risks and proactive mitigation measures

6. Monitoring — how stakeholder satisfaction will be tracked and escalation procedures

Ensure the plan considers Section 61 consent (Control of Pollution Act 1974), Considerate Constructors Scheme requirements, and any planning condition obligations related to community engagement.',
  NULL,
  'Use during pre-construction planning when setting up the project communication framework. Input your known stakeholders and the AI will map them and generate a tailored engagement strategy.',
  'intermediate',
  '👥',
  'published',
  false,
  26,
  (SELECT id FROM roles WHERE slug = 'project-manager'),
  (SELECT id FROM tasks WHERE slug = 'stakeholder-communication'),
  (SELECT id FROM tools WHERE slug = 'chatgpt'),
  NULL
),

-- WORKFLOW 27: Write a Change Control Notice
(
  'Write a Change Control Notice',
  'write-change-control-notice',
  'Draft a formal change control notice with a clear description of the change, impact assessment on cost and programme, and approval routing.',
  'This workflow helps Project Managers quickly draft a formal change control notice when a variation or change is identified. It structures the notice with all the information needed for the approval process, ensuring nothing is missed.',
  'You are a UK Construction Project Manager drafting a formal Change Control Notice. Complete the following change control form:

Project Details:
- Project: [PROJECT NAME]
- Contract Form: [CONTRACT, e.g., JCT Design and Build 2016]
- Change Control Number: [NUMBER, e.g., CCN-024]
- Date Raised: [DATE]
- Raised By: [NAME AND ROLE]

Change Details:
- Change Title: [TITLE, e.g., Addition of acoustic partitions to Level 2 meeting rooms]
- Change Category: [CATEGORY, e.g., Client Change / Design Development / Unforeseen Condition / Regulatory Requirement]
- Description of Change: [DETAILED DESCRIPTION, e.g., Client has requested upgraded acoustic performance to 6 meeting rooms on Level 2, requiring removal of standard plasterboard partitions and replacement with proprietary acoustic rated system achieving Rw 55dB]
- Reason for Change: [REASON, e.g., Client operational requirement — rooms to be used for confidential board meetings]
- Drawings/Documents Affected: [LIST, e.g., Drawing A-201 Rev C, Specification Section 45-20]

Impact Assessment Data:
- Estimated Cost Impact: [AMOUNT, e.g., £18,500 addition]
- Estimated Programme Impact: [IMPACT, e.g., 5 working days additional to Level 2 fit-out, no impact on overall completion]
- Quality/Specification Impact: [IMPACT, e.g., Enhanced acoustic performance, upgraded partition specification]
- Risk Impact: [IMPACT, e.g., Low — standard proprietary system, lead time 2 weeks]

Draft a formal Change Control Notice containing:
1. Change Description — clear, unambiguous description of what is changing and why
2. Contractual Basis — identify the relevant contract clause (e.g., JCT cl. 3.14 Change, or NEC4 cl. 60.1(1) compensation event)
3. Cost Impact — itemised estimate with sufficient detail for approval
4. Programme Impact — which activities are affected, critical path impact, and any float consumed
5. Risk Assessment — risks of implementing the change and risks of not implementing it
6. Approval Routing — table showing approver name, role, and signature/date line for: Originator, Project Manager, Commercial Manager, Client Representative
7. Decision Options — Approve / Approve with Conditions / Reject / Defer — with a brief note on each

Use clear, concise language appropriate for a formal project control document.',
  NULL,
  'Use whenever a change is identified on the project that requires formal approval. Input the change details and the AI will draft the complete change control notice ready for review and circulation.',
  'beginner',
  '🔄',
  'published',
  false,
  27,
  (SELECT id FROM roles WHERE slug = 'project-manager'),
  (SELECT id FROM tasks WHERE slug = 'variation-management'),
  (SELECT id FROM tools WHERE slug = 'microsoft-copilot'),
  NULL
),

-- WORKFLOW 28: Create a Project Closeout Report
(
  'Create a Project Closeout Report',
  'create-project-closeout-report',
  'Generate a comprehensive project closeout report covering programme, cost, quality, safety performance, and key learnings for the project record.',
  'This workflow helps Project Managers compile a complete closeout report at project handover. It brings together all the key performance data into a single document that serves as the definitive project record and supports continuous improvement across the business.',
  'You are a UK Construction Project Manager compiling a Project Closeout Report at handover. Using the following project data, generate a comprehensive closeout report:

Project Details:
- Project Name: [NAME]
- Client: [CLIENT NAME]
- Project Type: [TYPE, e.g., New-build primary school, 2-form entry]
- Contract Form: [CONTRACT, e.g., NEC4 Option A]
- Site Location: [LOCATION]
- Planned Dates: [START DATE] to [PLANNED COMPLETION]
- Actual Dates: [ACTUAL START] to [ACTUAL COMPLETION]
- Practical Completion Certificate Date: [DATE]

Financial Summary:
- Original Contract Sum: [SUM, e.g., £8,200,000]
- Final Account Sum: [SUM, e.g., £8,540,000]
- Total Variations: [NUMBER and VALUE, e.g., 34 variations totalling net +£340,000]
- Original Budget Margin: [%, e.g., 5.2%]
- Final Outturn Margin: [%, e.g., 4.8%]

Programme Performance:
- Original Duration: [WEEKS, e.g., 56 weeks]
- Actual Duration: [WEEKS, e.g., 60 weeks]
- Extensions of Time Granted: [WEEKS and REASON, e.g., 4 weeks — 2 weeks adverse weather, 2 weeks client design changes]
- Key Programme Milestones Achieved: [LIST with planned vs actual dates]

Quality:
- Snagging Items at PC: [NUMBER, e.g., 187]
- Snagging Items Closed Within 4 Weeks: [%, e.g., 91%]
- Outstanding Items at 8 Weeks Post-PC: [NUMBER, e.g., 8]
- BREEAM/Sustainability Rating Achieved: [RATING, e.g., BREEAM Excellent]

Health & Safety:
- Total Hours Worked: [HOURS, e.g., 285,000]
- RIDDOR Reportable Incidents: [NUMBER, e.g., 0]
- Lost Time Incidents: [NUMBER, e.g., 1]
- Near Miss Reports: [NUMBER, e.g., 47]
- AFR (Accident Frequency Rate): [RATE]
- CCS Score: [SCORE, e.g., 42/50]

Generate the closeout report with these sections:
1. Executive Summary — project description and overall performance assessment
2. Programme Performance — planned vs actual, reasons for variance, key milestones table
3. Financial Performance — contract sum reconciliation, variation summary, margin analysis
4. Quality Performance — snagging analysis, defects profile, certification achieved
5. Health, Safety & Environmental Performance — KPIs, notable achievements, incidents summary
6. Stakeholder Satisfaction — client feedback, end-user feedback, community impact
7. Key Achievements — notable successes and innovations
8. Lessons Learned Summary — top 5 lessons (reference the detailed lessons learned report)
9. Outstanding Actions — defects liability period obligations, retention release dates, O&M manuals status, building log book
10. Project Metrics Dashboard — single-page summary table of all key KPIs

This report should be suitable for inclusion in the company project archive and for sharing with the client as a professional handover document.',
  NULL,
  'Use at practical completion when compiling the project handover documentation. Input all the project performance data and the AI will produce a professional closeout report for the project archive.',
  'intermediate',
  '📊',
  'published',
  false,
  28,
  (SELECT id FROM roles WHERE slug = 'project-manager'),
  (SELECT id FROM tasks WHERE slug = 'progress-reporting'),
  (SELECT id FROM tools WHERE slug = 'claude'),
  (SELECT id FROM guides WHERE slug = 'ai-for-progress-reports')
),

-- WORKFLOW 29: Draft a Pre-Construction Meeting Agenda
(
  'Draft a Pre-Construction Meeting Agenda',
  'draft-pre-construction-meeting-agenda',
  'Create a structured agenda for the first pre-construction meeting covering introductions, scope review, programme, procurement, H&S, and action items.',
  'This workflow helps Project Managers prepare a comprehensive agenda for the initial pre-construction kick-off meeting. It ensures all critical topics are covered and provides a professional format that sets the right tone for the project.',
  'You are a UK Construction Project Manager preparing the agenda for the first Pre-Construction Meeting (also known as a Kick-Off Meeting). Draft a comprehensive meeting agenda using the following details:

Meeting Details:
- Project: [PROJECT NAME]
- Meeting Date: [DATE]
- Meeting Time: [TIME, e.g., 10:00 - 13:00]
- Location: [LOCATION, e.g., Project site office / Client offices / Microsoft Teams]
- Chair: [NAME AND ROLE]
- Minute Taker: [NAME]

Project Context:
- Project Type: [TYPE, e.g., Residential development — 85 apartments across 2 blocks]
- Client: [CLIENT NAME]
- Contract Form: [CONTRACT, e.g., JCT Design and Build 2016]
- Contract Value: [VALUE, e.g., £16,500,000]
- Programme: [START] to [COMPLETION]
- Key Attendees: [LIST ROLES, e.g., Client PM, Client QS, Architect, Structural Engineer, M&E Consultant, Principal Designer, Contractor PM, Site Manager, Design Manager, QS]

Draft a detailed meeting agenda with:
1. Welcome & Introductions — attendee list template with name, organisation, role, contact details
2. Project Overview — scope summary, employer''s requirements, key objectives and success criteria
3. Contract & Commercial — contract form, key dates (access, sectional completions, longstop), contract administrator role, change control process, payment procedures
4. Design Management — design responsibility matrix status, information required schedule, design deliverables, BIM requirements (if applicable), design review and approval process
5. Programme — master programme review, key milestones, phasing, early works, long-lead items, critical path
6. Procurement — packaging strategy, subcontractor procurement status, long-lead orders, novation of consultants
7. Health, Safety & Wellbeing — CDM 2015 duties confirmation (PD, PC, Client), construction phase plan status, site rules, emergency procedures, H&S targets
8. Quality — quality management plan, inspection and test plan, material approval process, mock-ups and benchmarks required
9. Logistics & Site Setup — site compound, hoarding, tower crane (if applicable), traffic management, working hours, Section 61 consent, CCS registration
10. Stakeholder & Community — neighbours, local authority, highways, utility diversions, community engagement plan
11. Document Control — common data environment, drawing register, transmittal procedures, naming conventions
12. Meeting Schedule — regular meeting cadence (progress meetings, design team meetings, H&S meetings)
13. Actions & Next Steps — action table template with columns: Action, Owner, Due Date
14. Date of Next Meeting

Include estimated time allocations for each agenda item. The total meeting duration should not exceed [DURATION, e.g., 3 hours].',
  NULL,
  'Use when setting up a new project and preparing for the first formal meeting with the project team and client. Input your project details and the AI will generate a comprehensive agenda you can issue to attendees.',
  'beginner',
  '📝',
  'published',
  false,
  29,
  (SELECT id FROM roles WHERE slug = 'project-manager'),
  (SELECT id FROM tasks WHERE slug = 'stakeholder-communication'),
  (SELECT id FROM tools WHERE slug = 'chatgpt'),
  NULL
),

-- ============================================================
-- SITE MANAGER CLUSTER (Workflows 30-33)
-- ============================================================

-- WORKFLOW 30: Generate a Snagging List Template
(
  'Generate a Snagging List Template',
  'generate-snagging-list-template',
  'Create a detailed room-by-room snagging checklist tailored to a specific building type for systematic defect identification at practical completion.',
  'This workflow helps Site Managers prepare comprehensive snagging checklists before carrying out pre-completion inspections. It generates a structured, room-by-room template covering all typical defect categories for the specific building type.',
  'You are an experienced UK Site Manager preparing for a pre-completion snagging inspection. Generate a detailed snagging checklist for the following:

Building Details:
- Project: [PROJECT NAME]
- Building Type: [TYPE, e.g., 2-bedroom apartment / Hotel room / Office floor plate / Primary school classroom wing]
- Number of Units/Rooms to Inspect: [NUMBER, e.g., 12 apartments]
- Construction Type: [TYPE, e.g., RC frame, brick/block cavity walls, drylining internally]
- Fit-Out Level: [LEVEL, e.g., Full fit-out including kitchen and bathroom / Cat A office / Shell and core]
- Key Specification Items: [LIST, e.g., Engineered oak flooring, porcelain wall tiles to bathrooms, spray-painted MDF kitchens, MVHR system]

Generate a snagging checklist structured as follows:

For each room/area type (e.g., Entrance Hall, Living Room, Kitchen, Bedroom 1, Bedroom 2, Bathroom, En-suite, Storage Cupboard, Communal Corridor, External):

Create a checklist table with columns:
- Item Number
- Location (room/area)
- Element (e.g., Walls, Ceiling, Floor, Door, Window, Ironmongery, Joinery, Sanitaryware, Electrical, Mechanical)
- Check Point (specific item to inspect)
- Status (blank — to be filled: Pass / Snag / N/A)
- Snag Description (blank — to be filled on site)
- Priority (blank — to be filled: 1-Critical / 2-Major / 3-Minor / 4-Cosmetic)
- Photo Ref (blank — to be filled)

Include check points for:
- Surface finish quality (walls, ceilings, floors — flatness, decoration, damage)
- Doors (operation, ironmongery, fire door signage and intumescent strips where applicable)
- Windows (operation, seals, locks, trickle vents, cleaning)
- M&E (switches, sockets, lights — operation and alignment, extract fans, radiators/UFH)
- Sanitaryware (taps, basins, WCs, baths/showers — operation, sealing, leaks)
- Joinery (kitchens, wardrobes — doors aligned, drawers operating, worktop joints)
- Fire safety (detection heads, signage, compartmentation seals visible)
- Building Regulations compliance items (safety glazing manifestation, Part M items, ventilation)
- External (brickwork pointing, DPC, drainage, paths, landscaping)

Add a summary section at the end for:
- Total snags by priority
- Sign-off for re-inspection
- Date of inspection and inspector name

Reference the NHBC Standards where applicable for residential projects.',
  NULL,
  'Use 2-4 weeks before planned practical completion to prepare your snagging templates. Customise the checklist to your specific building type and specification, then print or use digitally during the inspection walkthrough.',
  'beginner',
  '🔍',
  'published',
  false,
  30,
  (SELECT id FROM roles WHERE slug = 'site-manager'),
  (SELECT id FROM tasks WHERE slug = 'snagging-and-defects'),
  (SELECT id FROM tools WHERE slug = 'chatgpt'),
  (SELECT id FROM guides WHERE slug = 'ai-for-site-management')
),

-- WORKFLOW 31: Draft a Site Induction Briefing
(
  'Draft a Site Induction Briefing',
  'draft-site-induction-briefing',
  'Generate a comprehensive site induction covering safety rules, emergency procedures, welfare facilities, and site-specific hazards for new personnel.',
  'This workflow helps Site Managers prepare a thorough site induction document that covers all the key topics required under CDM 2015 and company procedures. It can be used as a script for delivering inductions or as a handout document.',
  'You are a UK Site Manager preparing a site induction briefing for a construction project. Generate a comprehensive site induction document based on the following:

Site Details:
- Project: [PROJECT NAME]
- Principal Contractor: [COMPANY NAME]
- Site Address: [ADDRESS]
- Site Manager: [NAME]
- H&S Manager/Advisor: [NAME]
- Project Duration: [START] to [COMPLETION]
- Current Phase: [PHASE, e.g., Substructure / Superstructure / Fit-out]

Site-Specific Information:
- Working Hours: [HOURS, e.g., 08:00-18:00 Mon-Fri, 08:00-13:00 Sat]
- Site Access Points: [DESCRIPTION, e.g., Main gate on High Street, emergency exit on Park Lane]
- Welfare Facilities: [DESCRIPTION, e.g., Canteen in Block A compound, toilets at ground level each block, drying room in main compound]
- Parking: [DESCRIPTION, e.g., No on-site parking, nearest public car park 200m on Mill Road]
- Key Hazards: [LIST, e.g., Live services in south corner, asbestos in existing building (licenced removal ongoing in Block B), adjacent school — safeguarding measures in place, tower crane operational zone]

Generate a site induction briefing covering:

1. Welcome & Project Overview — brief description of the project, client, principal contractor
2. CDM 2015 Responsibilities — principal contractor duties, worker duties, right to raise concerns
3. Site Rules — PPE requirements (minimum and task-specific), prohibited items/behaviours, drugs and alcohol policy, mobile phone policy, smoking areas
4. Emergency Procedures — fire assembly point, first aiders (names and locations), nearest A&E, emergency contact numbers, action on discovering a fire, evacuation signal
5. Accident & Incident Reporting — how to report accidents, near misses, dangerous occurrences, RIDDOR requirements
6. Site-Specific Hazards — detailed briefing on each hazard listed above with the specific control measures in place
7. Permits to Work — when required (hot works, confined spaces, excavations, electrical isolation, work at height), how to obtain them
8. Working at Height — general requirements, edge protection policy, harness use, scaffold tagging system, MEWP procedures
9. Plant & Equipment — rules for operating plant, banksmen requirements, exclusion zones, CPCS/CSCS requirements
10. Housekeeping & Waste — site cleanliness expectations, waste segregation, material storage
11. Welfare — facilities available, break times, first aid kit locations
12. Environmental Controls — dust suppression, noise limits, working near watercourses, pollution prevention
13. Safeguarding — DBS requirements (if near schools/vulnerable people), site boundary security
14. Communication — toolbox talk schedule, safety noticeboard location, who to speak to with concerns, worker engagement forum
15. Sign-Off — declaration text for inductee to sign confirming understanding

Ensure the induction meets CDM 2015 Regulation 14 requirements and references current HSE guidance. The tone should be clear, direct, and suitable for delivery to all levels of site operative.',
  NULL,
  'Use when setting up a new site or updating your existing induction for a new project phase. Customise with your site-specific details and print as a handout or use as a presentation script for delivering inductions.',
  'beginner',
  '📋',
  'published',
  false,
  31,
  (SELECT id FROM roles WHERE slug = 'site-manager'),
  (SELECT id FROM tasks WHERE slug = 'site-induction-documentation'),
  (SELECT id FROM tools WHERE slug = 'claude'),
  (SELECT id FROM guides WHERE slug = 'ai-for-health-and-safety-documentation')
),

-- WORKFLOW 32: Write a Weather Delay Impact Assessment
(
  'Write a Weather Delay Impact Assessment',
  'write-weather-delay-impact-assessment',
  'Assess the impact of adverse weather on the construction programme, recommend recovery measures, and prepare a contractual delay notice.',
  'This workflow helps Site Managers document and assess the impact of adverse weather events on the project programme. It produces a structured assessment that can support an extension of time claim and includes practical recovery recommendations.',
  'You are a UK Site Manager assessing the impact of adverse weather on your construction project. Produce a Weather Delay Impact Assessment and supporting notice:

Project Details:
- Project: [PROJECT NAME]
- Contract Form: [CONTRACT, e.g., JCT D&B 2016 / NEC4 Option A]
- Site Location: [LOCATION]
- Current Programme Activity: [ACTIVITY, e.g., Roof steelwork erection and decking to Block A]
- Planned Completion Date: [DATE]
- Available Float on Affected Activities: [DAYS, e.g., 5 working days]

Weather Event Details:
- Period of Adverse Weather: [START DATE] to [END DATE, e.g., 6 January 2025 to 17 January 2025]
- Weather Conditions: [DESCRIPTION, e.g., Sustained high winds exceeding 35mph for 7 of 10 working days, combined with heavy rainfall (total 68mm over period), temperatures below -2°C on 3 days]
- Weather Data Source: [SOURCE, e.g., Met Office data for nearest station — Birmingham Edgbaston]
- Normal Weather Allowance in Programme: [ALLOWANCE, e.g., 2 days per month for inclement weather November-March]

Impact on Works:
- Activities Directly Affected: [LIST, e.g., Roof steelwork erection stopped (crane wind limit exceeded), concrete pours postponed (temperature below 2°C), external brickwork stopped (driving rain)]
- Working Days Lost: [NUMBER, e.g., 7 working days]
- Less Weather Allowance in Programme: [DAYS, e.g., 2 days already allowed]
- Net Delay Claimed: [DAYS, e.g., 5 working days]
- Knock-On Effects: [DESCRIPTION, e.g., Roof completion delay pushes back watertight date, delaying internal fit-out start to Block A by 5 days]

Generate the assessment as follows:
1. Delay Notice — formal notice under the contract (reference the specific clause, e.g., JCT cl. 2.27.1 / NEC4 cl. 60.1(13)) notifying the Contract Administrator/Project Manager of the delay event
2. Weather Data Summary — tabulate the daily weather conditions vs the working thresholds (wind speed, temperature, rainfall) that prevent specific activities
3. Programme Impact Analysis — which activities were affected, the critical path impact, and whether float was consumed
4. Comparison with Weather Allowance — demonstrate the weather experienced was beyond what a competent contractor would have allowed for in the programme
5. Recovery Measures — practical steps being taken or proposed to mitigate delay (e.g., weekend working, additional resources, re-sequencing)
6. Extension of Time Assessment — the net delay to completion after deducting weather allowance and any mitigation, with the revised completion date requested
7. Cost Implications — whether the delay event entitles the contractor to loss and expense under the contract (note: weather events under JCT are typically time only, not cost)

Reference the relevant contract clauses and Met Office data standards. The notice should be suitable for formal submission to the Contract Administrator.',
  NULL,
  'Use when adverse weather has caused programme delays and you need to formally notify the client and support an extension of time application. Input the weather data and programme impact details from your daily site diary.',
  'intermediate',
  '🌧️',
  'published',
  false,
  32,
  (SELECT id FROM roles WHERE slug = 'site-manager'),
  (SELECT id FROM tasks WHERE slug = 'progress-reporting'),
  (SELECT id FROM tools WHERE slug = 'chatgpt'),
  NULL
),

-- WORKFLOW 33: Create a Subcontractor Coordination Schedule
(
  'Create a Subcontractor Coordination Schedule',
  'create-subcontractor-coordination-schedule',
  'Generate a weekly subcontractor coordination schedule showing planned activities, access requirements, plant needs, and trade interdependencies.',
  'This workflow helps Site Managers produce a structured weekly coordination schedule for managing multiple subcontractors on site. It maps out activities, resource requirements, and interdependencies to support effective short-term planning and daily briefings.',
  'You are a UK Site Manager preparing the weekly subcontractor coordination schedule for an active construction site. Generate a detailed coordination schedule using the following information:

Project Details:
- Project: [PROJECT NAME]
- Week Commencing: [DATE, e.g., Monday 10 March 2025]
- Current Phase: [PHASE, e.g., Superstructure to Blocks A & B, substructure to Block C]
- Site Working Hours: [HOURS, e.g., 07:30-17:30 Mon-Fri, 08:00-13:00 Sat]
- Tower Crane Available: [YES/NO, if yes note capacity and exclusion zones]

Subcontractors on Site This Week:
[LIST EACH SUBCONTRACTOR WITH DETAILS, e.g.,
- ABC Concrete Ltd — RC frame Block A Level 3 columns and slab pour, 8 operatives, requires crane, concrete pump Wed AM
- DEF Steel Ltd — Steelwork erection Block B, 6 operatives + 1 crane driver, requires crane priority Mon-Tue
- GHI M&E Services — First fix mechanical risers Block A Levels 1-2, 4 operatives, requires goods hoist access
- JKL Brickwork — External masonry Block A south elevation, 10 operatives + 2 labourers, scaffold required
- MNO Drylining — Metal stud partitions Block A Level 1, 6 operatives, materials delivery Tuesday
- PQR Groundworks — Drainage run Block C, 4 operatives + mini excavator, requires banksman]

Key Constraints:
[LIST, e.g., Concrete pour scheduled Wednesday requires road closure TMP in place, noise-sensitive school adjacent — no percussive works before 09:00, Block B crane out of service Thursday for maintenance]

Generate the coordination schedule as follows:

1. Weekly Overview Table — columns: Subcontractor, Package, Location/Zone, Planned Activity This Week, Labour Count, Key Plant/Equipment, Deliveries, Crane Time Required, Dependencies/Clashes

2. Daily Breakdown (Monday to Friday) — for each day show:
   - Crane allocation schedule (30-minute slots if applicable)
   - Goods hoist allocation
   - Concrete/material deliveries with times
   - Activities by zone to avoid clashes
   - Permit requirements (hot works, confined space, etc.)

3. Interdependencies & Sequencing — identify where one trade must complete before another can start and flag any potential clashes (e.g., "DEF Steel must complete Level 3 connections before ABC Concrete can fix slab reinforcement")

4. Access & Logistics — delivery vehicle schedule, road closure requirements, material storage allocation, skip/waste collection schedule

5. Safety Considerations — specific hazards this week, exclusion zones, any concurrent high-risk activities requiring additional supervision, toolbox talk topics

6. Key Decisions Required — items needing Site Manager or Project Manager decision this week

7. Look-Ahead (Following Week) — brief note on what is planned for the next week to enable advance coordination

Format each section clearly so it can be printed and used at the Monday morning subcontractor coordination meeting and updated daily.',
  NULL,
  'Use every Friday or Monday morning to prepare the weekly coordination schedule. Input the planned subcontractor activities and the AI will identify clashes, sequence activities, and produce a structured schedule for the coordination meeting.',
  'intermediate',
  '🤝',
  'published',
  false,
  33,
  (SELECT id FROM roles WHERE slug = 'site-manager'),
  (SELECT id FROM tasks WHERE slug = 'subcontractor-management'),
  (SELECT id FROM tools WHERE slug = 'microsoft-copilot'),
  NULL
);
