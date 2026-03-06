-- expand-workflows-part2.sql
-- Workflows 34-50 for Construction AI Platform
-- Run in Supabase SQL Editor (PostgreSQL)

INSERT INTO workflows (title, slug, description, long_description, prompt, example_output, use_case, difficulty, icon, status, featured, sort_order, role_id, task_id, tool_id, guide_id) VALUES

-- WORKFLOW 34: Draft a Contractual Notice for Delay
(
  'Draft a Contractual Notice for Delay',
  'draft-contractual-notice-for-delay',
  'Generate a formal contractual notice for delay events under NEC4 or JCT, with proper clause references and factual narrative.',
  'This workflow helps Contracts Managers draft early warning notices or compensation event notifications under NEC4, or relevant delay notices under JCT. The generated notice includes precise contract clause references, a structured factual narrative of the delay event, and clearly stated requested relief. It ensures contractual time bars are addressed and the notice is formatted for formal submission.',
  'You are an experienced UK construction Contracts Manager. Draft a formal contractual notice for a delay event based on the following details:

Contract Form: [CONTRACT FORM, e.g., NEC4 ECC Option A / JCT D&B 2016]
Project: [PROJECT NAME AND BRIEF DESCRIPTION]
Employer / Client: [EMPLOYER NAME]
Contractor: [CONTRACTOR NAME]
Contract Reference: [CONTRACT REF NUMBER]
Notice Type: [NOTICE TYPE, e.g., Early Warning (cl. 15.1) / Compensation Event notification (cl. 61.3) / JCT Relevant Event notice (cl. 2.27)]

Delay Event Description:
- Date event occurred or was first identified: [DATE]
- Nature of the event: [DESCRIBE THE EVENT, e.g., unforeseen ground conditions encountered during pile installation at Grid Lines A3-A7]
- Affected works / activities: [AFFECTED ACTIVITIES, e.g., piling works, ground floor slab pour]
- Current programme impact: [ESTIMATED DELAY, e.g., 3 weeks to critical path activity]

Supporting Information:
- Relevant drawings / specifications: [LIST ANY REFS]
- Site diary / photographic evidence dates: [DATES]
- Previous correspondence: [ANY PRIOR LETTERS OR EMAILS]

Structure the notice as follows:
1. Header block with contract details, date, reference, and recipient
2. Subject line referencing the specific contract clause
3. Opening paragraph citing the contractual obligation to notify
4. Factual narrative of the delay event in chronological order
5. Impact assessment on the programme and critical path
6. Requested relief (extension of time and/or additional cost as applicable)
7. Reservation of rights
8. List of supporting documents enclosed
9. Sign-off block

Use formal contractual language appropriate for the selected contract form. Reference specific clause numbers throughout. Include a statement confirming the notice is given within the contractual time bar period.',
  NULL,
  'Use when a delay event occurs on site and you need to issue a formal contractual notice to protect your position and comply with notification requirements under NEC4 or JCT.',
  'advanced',
  '⏰',
  'published',
  false,
  34,
  (SELECT id FROM roles WHERE slug = 'contracts-manager'),
  (SELECT id FROM tasks WHERE slug = 'claims-management'),
  (SELECT id FROM tools WHERE slug = 'claude'),
  (SELECT id FROM guides WHERE slug = 'ai-for-contract-administration')
),

-- WORKFLOW 35: Write an Extension of Time Assessment
(
  'Write an Extension of Time Assessment',
  'write-extension-of-time-assessment',
  'Produce a detailed Extension of Time assessment analysing delay events, critical path impact, and contractual entitlement.',
  'This workflow assists Contracts Managers in preparing a thorough EOT assessment that evaluates reported delay events against the contract programme. It analyses whether delay events sit on the critical path, determines the contractor''s entitlement under the relevant contract conditions, and presents findings in a format suitable for submission to the Project Manager or Contract Administrator.',
  'You are an experienced UK construction Contracts Manager and delay analyst. Prepare an Extension of Time (EOT) assessment based on the following information:

Contract Form: [CONTRACT FORM, e.g., NEC4 ECC Option C / JCT SBC/Q 2016]
Project: [PROJECT NAME]
Original Completion Date: [DATE]
Current Completion Date (if previously extended): [DATE]
EOT Claim Reference: [REFERENCE NUMBER]

Delay Events Claimed:
1. Event: [DESCRIBE EVENT 1, e.g., Late design information for structural steelwork connections]
   - Date notified: [DATE]
   - Period claimed: [DURATION, e.g., 14 days]
   - Contract clause: [CLAUSE, e.g., Compensation Event cl. 60.1(3) / Relevant Event cl. 2.29.6]
   - Supporting evidence: [LIST EVIDENCE]

2. Event: [DESCRIBE EVENT 2]
   - Date notified: [DATE]
   - Period claimed: [DURATION]
   - Contract clause: [CLAUSE]
   - Supporting evidence: [LIST EVIDENCE]

[Add further events as required]

Programme Information:
- Baseline programme approval date: [DATE]
- Current accepted programme revision: [REV NUMBER]
- Critical path activities affected: [LIST ACTIVITIES]

Structure the assessment as:
1. Executive summary with recommendation
2. Contractual basis for EOT entitlement under the stated contract form
3. Chronology of events
4. Analysis of each delay event:
   a. Factual description
   b. Notification compliance (was it within the contractual time bar?)
   c. Critical path impact analysis (is the delay on the critical path or does float absorb it?)
   d. Concurrency assessment (are there concurrent contractor delays?)
   e. Entitlement determination (days recommended)
5. Cumulative impact and revised completion date
6. Summary table of events, periods claimed vs recommended
7. Supporting documents referenced

Apply the SCL Delay and Disruption Protocol (2nd Edition) principles where relevant. State clear reasoning for any reduction or rejection of claimed periods.',
  NULL,
  'Use when you receive an EOT application from a contractor or need to prepare your own EOT submission, and require a structured assessment of delay events against programme and contract.',
  'advanced',
  '📅',
  'published',
  false,
  35,
  (SELECT id FROM roles WHERE slug = 'contracts-manager'),
  (SELECT id FROM tasks WHERE slug = 'claims-management'),
  (SELECT id FROM tools WHERE slug = 'claude'),
  (SELECT id FROM guides WHERE slug = 'ai-for-contract-administration')
),

-- WORKFLOW 36: Generate a Dispute Summary Document
(
  'Generate a Dispute Summary Document',
  'generate-dispute-summary-document',
  'Create a structured dispute summary covering background, issues, positions, evidence, and recommended resolution.',
  'This workflow helps Contracts Managers prepare a comprehensive dispute summary document suitable for adjudication preparation, mediation, or internal review. It organises complex dispute information into a clear, structured format covering the factual background, legal and contractual issues, each party''s position, the evidence available, and a recommended resolution strategy.',
  'You are an experienced UK construction dispute resolution specialist. Prepare a structured dispute summary document based on the following:

Contract Form: [CONTRACT FORM, e.g., NEC4 ECC Option B / JCT D&B 2016]
Project: [PROJECT NAME AND VALUE]
Parties: [REFERRING PARTY] vs [RESPONDING PARTY]
Dispute Value: [APPROXIMATE VALUE, e.g., £340,000]
Dispute Resolution Stage: [STAGE, e.g., Pre-adjudication / Mediation preparation / Internal review]

Background:
- Contract award date: [DATE]
- Original contract sum: [VALUE]
- Current account position: [VALUE]
- Key project milestones: [LIST]
- Brief project description: [2-3 SENTENCES]

Dispute Description:
[PROVIDE A NARRATIVE OF THE DISPUTE, e.g., The dispute concerns the valuation of variations to the mechanical services installation. The Contractor claims additional payment of £340,000 for works it considers variations under the contract. The Employer contends the works fall within the original scope.]

Key Issues in Dispute:
1. [ISSUE 1, e.g., Whether the revised M&E specification constitutes a variation]
2. [ISSUE 2, e.g., Valuation methodology for the claimed variations]
3. [ISSUE 3, if applicable]

Evidence Available:
- [LIST KEY DOCUMENTS, e.g., Original tender documents, Revised specification Rev C, Site instructions SI-045 to SI-052, Correspondence chain dated March-June 2025]

Structure the document as:
1. Executive summary (1 paragraph)
2. Parties and contract details
3. Factual background and chronology
4. Issues in dispute (each issue as a separate section)
5. Referring party''s position on each issue
6. Responding party''s position on each issue
7. Analysis of merits (strengths and weaknesses of each position)
8. Evidence summary matrix (document, relevance, which issue it supports)
9. Recommended resolution approach and estimated outcome range
10. Next steps and timeline

Use objective, balanced language. Identify risks and weaknesses in both parties'' positions. Reference specific contract clauses where relevant.',
  NULL,
  'Use when preparing for adjudication, mediation, or senior management review of a construction dispute and you need a clear, structured summary of the issues and merits.',
  'advanced',
  '⚖️',
  'published',
  false,
  36,
  (SELECT id FROM roles WHERE slug = 'contracts-manager'),
  (SELECT id FROM tasks WHERE slug = 'claims-management'),
  (SELECT id FROM tools WHERE slug = 'chatgpt'),
  NULL
),

-- WORKFLOW 37: Draft a Contract Change Order
(
  'Draft a Contract Change Order',
  'draft-contract-change-order',
  'Generate a formal contract change order or project manager''s instruction with scope, cost, programme impact, and approvals.',
  'This workflow enables Contracts Managers to produce a properly formatted contract change order or Project Manager''s instruction that captures the scope of a variation, its cost and programme implications, and the required approval chain. The output is suitable for formal issue under NEC4 or JCT contract procedures and ensures all necessary information is documented for valuation and administration.',
  'You are an experienced UK construction Contracts Manager. Draft a formal contract change order based on the following:

Contract Form: [CONTRACT FORM, e.g., NEC4 ECC Option A / JCT SBC/Q 2016]
Project: [PROJECT NAME]
Change Order Number: [CO NUMBER, e.g., CO-027]
Date of Issue: [DATE]
Originated By: [NAME AND ROLE]

Change Description:
- Title: [BRIEF TITLE, e.g., Additional fire stopping to risers at Levels 2-5]
- Detailed scope: [DESCRIBE THE CHANGE IN DETAIL, including affected areas, specifications, drawings]
- Reason for change: [REASON, e.g., Design development / Employer requirement / Unforeseen condition / Statutory requirement]
- Relevant drawings: [LIST DRAWING NUMBERS AND REVISIONS]
- Relevant specifications: [SPEC REFERENCES]

Cost Impact:
- Contractor''s quotation reference: [REF AND DATE]
- Quoted amount: [VALUE]
- Assessed fair value (if different): [VALUE]
- Basis of valuation: [e.g., Measured rates from BoQ / Defined cost + fee / Daywork / Lump sum quotation]
- Impact on provisional sums: [IF APPLICABLE]

Programme Impact:
- Affected activities: [LIST ACTIVITIES]
- Estimated time impact: [DURATION, e.g., 5 working days]
- Impact on completion date: [YES/NO AND EXPLANATION]

Structure the change order as:
1. Header with project details, CO number, date, and distribution
2. Change order description and scope of works
3. Reason and justification
4. Drawings and specifications affected
5. Cost assessment with breakdown
6. Programme impact statement
7. Contractual basis (cite relevant contract clauses for instruction and valuation)
8. Approval signatures block (Originated by / Checked by / Approved by)
9. Distribution list

Format as a professional document ready for printing and signature.',
  NULL,
  'Use when a variation has been agreed or instructed and you need to formally document it as a contract change order with full scope, cost, and programme details for the project record.',
  'intermediate',
  '📄',
  'published',
  false,
  37,
  (SELECT id FROM roles WHERE slug = 'contracts-manager'),
  (SELECT id FROM tasks WHERE slug = 'variation-management'),
  (SELECT id FROM tools WHERE slug = 'microsoft-copilot'),
  (SELECT id FROM guides WHERE slug = 'ai-for-contract-administration')
),

-- WORKFLOW 38: Summarise a Sub-Contract Agreement
(
  'Summarise a Sub-Contract Agreement',
  'summarise-sub-contract-agreement',
  'Produce a plain-English summary of key sub-contract terms including scope, payment, variations, and risk allocation.',
  'This workflow helps Contracts Managers quickly produce a clear, accessible summary of a sub-contract agreement for use by project teams who need to understand their obligations without reading the full legal document. It extracts and summarises the critical commercial and operational terms, highlights key risks, and flags any unusual or onerous clauses.',
  'You are an experienced UK construction Contracts Manager. Produce a plain-English summary of a sub-contract agreement based on the following details:

Sub-Contract Form: [FORM, e.g., NEC4 ECS Option A / JCT DBSub/C 2016 / Bespoke sub-contract]
Main Contract Form: [MAIN CONTRACT FORM, e.g., NEC4 ECC Option A]
Sub-Contractor: [NAME]
Sub-Contract Package: [PACKAGE, e.g., Mechanical services installation]
Sub-Contract Value: [VALUE]
Sub-Contract Date: [DATE]

Key Clauses / Terms to Summarise (paste or describe the key provisions):
[PASTE THE KEY TERMS OR PROVIDE A SUMMARY OF EACH SECTION. If pasting full clauses, include sections on: scope of works, programme and completion, payment terms, variations, insurance, indemnities, limitation of liability, termination, dispute resolution, parent company guarantee / bond requirements, retention, defects liability period, and any bespoke amendments.]

Structure the summary as:
1. Overview (parties, package, value, dates)
2. Scope of Works (what is included and excluded, design responsibility if any)
3. Programme (start date, completion date, key milestones, liquidated damages rate and cap)
4. Payment (application dates, payment terms, pay less notice periods, retention percentage and release)
5. Variations (how instructed, how valued, time limits for notification)
6. Insurance (required policies, minimum cover levels, joint names requirements)
7. Indemnities and Liability (scope of indemnity, liability cap if any, consequential loss exclusions)
8. Termination (grounds for termination, notice periods, consequences)
9. Dispute Resolution (adjudication, arbitration, or litigation; governing law)
10. Key Risks and Red Flags (highlight any unusual, onerous, or non-standard clauses that differ from the standard form and could create risk)

Use clear, non-legal language that a Site Manager or Project Manager could understand. Highlight any back-to-back gaps with the main contract.',
  NULL,
  'Use when a new sub-contract has been executed or is under review, and you need to brief the project team on the key terms and obligations in accessible language.',
  'intermediate',
  '📝',
  'published',
  false,
  38,
  (SELECT id FROM roles WHERE slug = 'contracts-manager'),
  (SELECT id FROM tasks WHERE slug = 'contract-review'),
  (SELECT id FROM tools WHERE slug = 'claude'),
  NULL
),

-- WORKFLOW 39: Write a Programme Narrative
(
  'Write a Programme Narrative',
  'write-programme-narrative',
  'Draft a programme narrative explaining the construction sequence, critical path, key milestones, and assumptions for a baseline programme.',
  'This workflow helps Planning Engineers produce a professional programme narrative to accompany a baseline or revised construction programme. The narrative explains the planned construction methodology and sequence, identifies the critical path and key milestones, and documents the assumptions and constraints underpinning the programme logic. It is suitable for submission with Asta Powerproject or Primavera P6 programmes.',
  'You are an experienced UK construction Planning Engineer. Write a programme narrative to accompany a baseline construction programme based on the following:

Project: [PROJECT NAME AND DESCRIPTION, e.g., New-build 120-bed care home, steel frame, 3 storeys plus basement]
Client: [CLIENT NAME]
Contract Form: [CONTRACT FORM, e.g., NEC4 ECC Option A]
Contract Duration: [DURATION, e.g., 78 weeks]
Start on Site Date: [DATE]
Completion Date: [DATE]

Key Project Information:
- Gross Internal Floor Area: [GIFA]
- Number of storeys / blocks: [DETAILS]
- Structural frame type: [e.g., Steel frame / RC frame / Timber frame]
- Key constraints: [LIST, e.g., Live hospital environment adjacent, restricted working hours weekends, phased handover required]
- Sectional completion requirements: [IF ANY]

Key Milestones:
1. [MILESTONE 1 AND TARGET DATE]
2. [MILESTONE 2 AND TARGET DATE]
3. [MILESTONE 3 AND TARGET DATE]
[Add as required]

Programme Assumptions:
- Working hours: [e.g., Mon-Fri 07:30-18:00, Sat 08:00-13:00]
- Holiday shutdowns: [e.g., 2 weeks Christmas, 1 week Easter]
- Lead-in times assumed for key packages: [LIST, e.g., Steelwork 12 weeks, Cladding 14 weeks, Lifts 20 weeks]
- Weather allowance: [e.g., 2 days per month Nov-Feb]

Structure the narrative as:
1. Introduction and project overview
2. Programme overview (start, finish, duration, calendar)
3. Enabling works and site establishment
4. Substructure phase description
5. Superstructure phase description
6. Building envelope and weathertightness
7. Internal fit-out sequence (describe floor-by-floor or zone-by-zone approach)
8. External works
9. Commissioning, testing, and handover
10. Critical path description (identify the critical path through the programme and explain why)
11. Key milestones summary table
12. Programme assumptions and exclusions
13. Key risks to programme

Write in a professional technical style suitable for formal programme submissions.',
  NULL,
  'Use when submitting a baseline programme, revised programme, or programme update and you need a clear written narrative to explain the construction sequence and logic to the client or project manager.',
  'intermediate',
  '📊',
  'published',
  false,
  39,
  (SELECT id FROM roles WHERE slug = 'planning-engineer'),
  (SELECT id FROM tasks WHERE slug = 'programme-narrative-writing'),
  (SELECT id FROM tools WHERE slug = 'chatgpt'),
  NULL
),

-- WORKFLOW 40: Generate a Lookahead Schedule Summary
(
  'Generate a Lookahead Schedule Summary',
  'generate-lookahead-schedule-summary',
  'Create a 3-4 week lookahead summary with key activities, resources needed, and potential blockers per week.',
  'This workflow helps Planning Engineers quickly produce a structured short-term lookahead summary for weekly planning meetings. It breaks down the upcoming 3-4 weeks into key activities per week, identifies resource requirements, predecessor dependencies, and flags potential blockers or risks that could affect progress.',
  'You are an experienced UK construction Planning Engineer. Create a short-term lookahead schedule summary based on the following:

Project: [PROJECT NAME]
Lookahead Period: [START DATE] to [END DATE, e.g., 3 or 4 weeks]
Current Project Phase: [PHASE, e.g., Superstructure - Level 3 slab pour complete, Level 4 steelwork in progress]

Activities Planned for the Lookahead Period:
[LIST THE MAIN ACTIVITIES PLANNED, e.g.:
- Level 4 steelwork erection (continuing)
- Level 3 metal deck and stud welding
- Level 2 internal blockwork commencing
- Cladding installation Zones A-B
- M&E first fix Level 1
- External drainage runs 4-7
- Tower crane dismantlement (weekend of Week 3)]

Known Constraints / Issues:
[LIST ANY KNOWN CONSTRAINTS, e.g.:
- Cladding delivery delayed by 4 days, revised delivery 15th March
- Tower crane oversail licence expires 28th March
- Road closure permit required for crane dismantle]

Structure the lookahead as:

Week 1 ([DATE RANGE]):
- Key activities (list each with location/zone)
- Resources required (labour, plant, materials)
- Predecessors that must complete
- Potential blockers / risks

Week 2 ([DATE RANGE]):
- Key activities
- Resources required
- Predecessors that must complete
- Potential blockers / risks

Week 3 ([DATE RANGE]):
- Key activities
- Resources required
- Predecessors that must complete
- Potential blockers / risks

[Week 4 if applicable]

Followed by:
- Summary of critical activities (anything on or near the critical path)
- Key decisions required this period
- Design information required this period (with required-by dates)
- Material deliveries scheduled

Keep it concise and action-focused. Use bullet points throughout. This should be a practical working document for site teams.',
  NULL,
  'Use when preparing for weekly progress meetings and you need a clear, structured short-term lookahead to communicate planned activities, resources, and risks to the site team.',
  'beginner',
  '📅',
  'published',
  false,
  40,
  (SELECT id FROM roles WHERE slug = 'planning-engineer'),
  (SELECT id FROM tasks WHERE slug = 'programme-narrative-writing'),
  (SELECT id FROM tools WHERE slug = 'chatgpt'),
  NULL
),

-- WORKFLOW 41: Draft a Delay Analysis Report
(
  'Draft a Delay Analysis Report',
  'draft-delay-analysis-report',
  'Structure a delay analysis report using recognised methodologies with cause, effect, and entitlement assessment.',
  'This workflow assists Planning Engineers in preparing a formal delay analysis report using industry-recognised methodologies such as Time Impact Analysis, As-Planned vs As-Built, or Windows Analysis. The report identifies delay events, analyses their impact on the critical path, determines responsibility, and quantifies the entitlement to extensions of time in accordance with the SCL Delay and Disruption Protocol.',
  'You are an experienced UK construction delay analyst and Planning Engineer. Draft a delay analysis report based on the following:

Contract Form: [CONTRACT FORM, e.g., NEC4 ECC Option C / JCT D&B 2016]
Project: [PROJECT NAME AND DESCRIPTION]
Analysis Methodology: [METHODOLOGY, e.g., Time Impact Analysis / As-Planned vs As-Built / Windows Analysis / Collapsed As-Built]
Analysis Period: [START DATE] to [END DATE]

Programme Information:
- Baseline programme: [PROGRAMME NAME, REVISION, APPROVAL DATE]
- As-built data source: [e.g., Monthly progress reports, site diaries, photo records]
- Original completion date: [DATE]
- Actual / forecast completion date: [DATE]
- Total delay to completion: [DURATION]

Delay Events to Analyse:
1. Event: [DESCRIPTION]
   - Cause: [EMPLOYER RISK / CONTRACTOR RISK / NEUTRAL]
   - Date range: [START] to [END]
   - Claimed impact: [DURATION]
   - Evidence: [KEY DOCUMENTS]

2. Event: [DESCRIPTION]
   - Cause: [EMPLOYER RISK / CONTRACTOR RISK / NEUTRAL]
   - Date range: [START] to [END]
   - Claimed impact: [DURATION]
   - Evidence: [KEY DOCUMENTS]

[Add further events as required]

Concurrency Issues:
[DESCRIBE ANY PERIODS OF CONCURRENT DELAY, e.g., During weeks 22-26, the employer late information event ran concurrently with a contractor resource shortage on blockwork]

Structure the report as:
1. Executive summary
2. Introduction and purpose
3. Methodology (explain the chosen method, why it was selected, and its limitations)
4. Programme and data sources
5. Chronological narrative
6. Delay event analysis (for each event):
   a. Description and cause
   b. Impact on critical path (with logic explanation)
   c. Float consumption analysis
   d. Responsibility allocation
   e. Assessed delay to completion
7. Concurrency analysis (applying SCL Protocol 2nd Edition principles)
8. Summary of delay allocation (Employer risk / Contractor risk / Neutral events)
9. Recommended Extension of Time
10. Appendices list (programmes, correspondence, site records)

Reference the Society of Construction Law Delay and Disruption Protocol (2nd Edition, 2017) throughout. Present findings objectively.',
  NULL,
  'Use when you need to prepare a formal delay analysis to support an EOT claim, defend against a claim, or provide an independent assessment of delay events on a construction project.',
  'advanced',
  '⏱️',
  'published',
  false,
  41,
  (SELECT id FROM roles WHERE slug = 'planning-engineer'),
  (SELECT id FROM tasks WHERE slug = 'claims-management'),
  (SELECT id FROM tools WHERE slug = 'claude'),
  NULL
),

-- WORKFLOW 42: Create a Recovery Programme Narrative
(
  'Create a Recovery Programme Narrative',
  'create-recovery-programme-narrative',
  'Draft a recovery programme narrative explaining acceleration measures, revised sequence, resource increases, and key risks.',
  'This workflow helps Planning Engineers prepare a recovery programme narrative when a project has fallen behind schedule. It documents the proposed acceleration or mitigation measures, explains how the construction sequence will be revised, details resource increases, and identifies the key risks associated with the recovery approach. It is suitable for submission alongside a recovery programme in Asta or Primavera.',
  'You are an experienced UK construction Planning Engineer. Draft a recovery programme narrative based on the following:

Project: [PROJECT NAME AND DESCRIPTION]
Contract Form: [CONTRACT FORM]
Original Completion Date: [DATE]
Current Forecast Completion (without recovery): [DATE]
Required Completion Date (recovery target): [DATE]
Current Delay: [DURATION AND BRIEF CAUSE, e.g., 6 weeks delay due to late steelwork delivery and adverse weather in Jan-Feb]

Current Status:
[DESCRIBE CURRENT PROGRESS, e.g., Substructure 100% complete. Superstructure steelwork at Level 3 of 5. Envelope works not yet started. M&E first fix at Level 1 only.]

Proposed Recovery Measures:
[LIST THE MEASURES YOU ARE CONSIDERING, e.g.:
- Increase steelwork erection to 2 crews working concurrently on different zones
- Saturday working for internal fit-out trades
- Commence cladding from Level 1 before frame completion using independent scaffold
- Accelerate M&E second fix with additional labour
- Re-sequence commissioning to zone-by-zone rather than full building]

Resource Changes:
[LIST RESOURCE INCREASES, e.g.:
- Additional steelwork crew (6 operatives + crane)
- Additional 8 M&E operatives
- Saturday premium time for fit-out trades
- Second hoist installation for vertical access]

Structure the narrative as:
1. Introduction and purpose (why a recovery programme is needed)
2. Current status and progress summary
3. Causes of delay (brief summary)
4. Recovery strategy overview
5. Revised construction sequence (explain changes from baseline logic)
6. Acceleration measures (detail each measure with expected time saving)
7. Resource plan changes (additional labour, plant, extended hours)
8. Revised critical path description
9. Key milestones comparison (original vs recovery)
10. Cost implications of acceleration (if applicable)
11. Risks to the recovery programme (what could prevent recovery)
12. Monitoring and reporting (how progress against recovery will be tracked)

Write in a professional tone suitable for formal submission to the client or Project Manager.',
  NULL,
  'Use when a project is behind programme and you need to prepare a recovery programme narrative explaining how you intend to mitigate the delay and achieve the required completion date.',
  'intermediate',
  '🔧',
  'published',
  false,
  42,
  (SELECT id FROM roles WHERE slug = 'planning-engineer'),
  (SELECT id FROM tasks WHERE slug = 'programme-narrative-writing'),
  (SELECT id FROM tools WHERE slug = 'chatgpt'),
  NULL
),

-- WORKFLOW 43: Generate a Subcontractor Scope of Works
(
  'Generate a Subcontractor Scope of Works',
  'generate-subcontractor-scope-of-works',
  'Create a detailed scope of works document for a subcontract package including inclusions, exclusions, attendances, and specifications.',
  'This workflow helps Estimators and Procurement Managers draft a comprehensive scope of works document for tendering subcontract packages. It covers the detailed description of works included and excluded, attendances provided and required, programme requirements, quality standards, and specification references. The output is structured for direct inclusion in a subcontract enquiry or agreement.',
  'You are an experienced UK construction Estimator preparing subcontract procurement documents. Generate a detailed scope of works for the following subcontract package:

Package: [PACKAGE NAME, e.g., Drylining and Ceiling Systems]
Project: [PROJECT NAME AND DESCRIPTION, e.g., New-build 6-storey residential block, 48 apartments, RC frame]
Project Location: [LOCATION]
Estimated Package Value: [APPROXIMATE VALUE]
Programme Duration for Package: [DURATION, e.g., 16 weeks]

Works Description:
[DESCRIBE THE SCOPE AT A HIGH LEVEL, e.g., Supply and install all internal drylining, metal stud partitions, plasterboard linings to concrete surfaces, suspended ceilings, bulkheads, fire-rated encasements to steelwork and services, acoustic upgrades to party walls.]

Key Specifications:
[LIST KEY SPECS, e.g.:
- Partitions to BS EN 520 / BS 8212
- Fire-rated partitions and encasements to achieve ratings per fire strategy (30/60/120 min)
- Acoustic partitions to achieve Rw values per acoustic report
- Ceiling systems: MF concealed grid with 15mm plasterboard to apartments, suspended tile grid to corridors and plant rooms]

Structure the scope of works as:
1. Package overview and description of works
2. Detailed scope inclusions (list every element of work included, by area or system)
3. Scope exclusions (clearly state what is NOT included)
4. Main contractor''s attendances (what the main contractor provides, e.g., access, storage, welfare, hoisting, power, water, scaffolding)
5. Subcontractor''s attendances (what the subcontractor must provide, e.g., their own plant, tools, PPE, supervision, setting out)
6. Design responsibilities (if any, e.g., performance specification design for fire-rated systems)
7. Programme requirements (start date, sectional completions, sequence, access constraints)
8. Quality and standards (reference relevant BS, EN standards, and project specifications)
9. Testing and commissioning requirements (if applicable, e.g., acoustic testing, fire stopping inspection)
10. Health and safety requirements (RAMS, CDM 2015 compliance, specific hazards)
11. Documentation and O&M deliverables
12. Key assumptions

Write in clear, unambiguous technical language suitable for tender issue. Be specific about interfaces with other trades.',
  NULL,
  'Use when preparing a subcontract enquiry and you need a comprehensive scope of works document to issue to potential subcontractors, ensuring clarity on inclusions, exclusions, and responsibilities.',
  'intermediate',
  '📦',
  'published',
  false,
  43,
  (SELECT id FROM roles WHERE slug = 'estimator'),
  (SELECT id FROM tasks WHERE slug = 'subcontractor-management'),
  (SELECT id FROM tools WHERE slug = 'claude'),
  (SELECT id FROM guides WHERE slug = 'ai-for-construction-procurement')
),

-- WORKFLOW 44: Draft a Pre-Qualification Questionnaire
(
  'Draft a Pre-Qualification Questionnaire',
  'draft-pre-qualification-questionnaire',
  'Generate a PQQ covering company details, financial standing, experience, resources, H&S record, quality, and environmental credentials.',
  'This workflow helps Procurement Managers create a structured Pre-Qualification Questionnaire for vetting potential subcontractors or suppliers before inviting them to tender. The PQQ covers all standard assessment areas including company information, financial health, relevant experience, resource capability, health and safety track record, quality management systems, and environmental credentials, aligned with PAS 91 guidance.',
  'You are an experienced UK construction Procurement Manager. Generate a Pre-Qualification Questionnaire (PQQ) for the following:

Purpose: [PURPOSE, e.g., Prequalification of mechanical services subcontractors for framework agreement / Prequalification for a specific project tender]
Project (if specific): [PROJECT NAME AND VALUE, or "Framework" if general]
Package / Trade: [TRADE, e.g., Mechanical Services / Structural Steelwork / Groundworks]
Estimated Value: [VALUE RANGE, e.g., £500k - £2M per project]

Specific Requirements:
[LIST ANY SPECIFIC REQUIREMENTS, e.g.:
- Must hold BESA membership
- Must have experience with healthcare projects
- Minimum turnover of £5M per annum
- ISO 9001 and ISO 14001 certification required]

Structure the PQQ as follows with questions under each section:

1. Company Information
   - Registered company name, number, address
   - Year established
   - Company structure (Ltd / PLC / Partnership)
   - Key contact details
   - Parent company details (if applicable)

2. Financial Standing
   - Annual turnover (last 3 years)
   - Pre-tax profit (last 3 years)
   - Credit score / Dun & Bradstreet rating
   - Accounts filing confirmation
   - Details of any CCJs, insolvency proceedings, or winding up orders

3. Relevant Experience
   - 3-5 comparable projects completed in last 5 years (with client name, value, scope, completion date)
   - Client references (minimum 2)
   - Experience with similar project types / sectors

4. Resources and Capacity
   - Number of directly employed operatives
   - Number of management / supervisory staff
   - Current workload and available capacity
   - Key personnel proposed (CVs)
   - Apprenticeship and training programmes

5. Health and Safety
   - H&S policy statement
   - RIDDOR reportable incidents (last 3 years) and AFR / AIR rates
   - CSCS card compliance percentage
   - H&S accreditations (CHAS, SafeContractor, SMAS, Constructionline, SSIP)
   - Enforcement notices or prosecutions (last 5 years)
   - CDM 2015 competency arrangements

6. Quality Management
   - Quality management system (ISO 9001 or equivalent)
   - Quality procedures and inspection regime
   - Defects and rework record
   - Supply chain management approach

7. Environmental and Sustainability
   - Environmental management system (ISO 14001 or equivalent)
   - Carbon reduction commitments
   - Waste management procedures
   - Social value commitments

8. Insurance
   - Employers'' liability (minimum £10M)
   - Public liability (minimum £5M)
   - Professional indemnity (if design element, minimum £2M)
   - Policy expiry dates

9. Equal Opportunities and Modern Slavery
   - Equal opportunities policy
   - Modern Slavery Act statement (if applicable)

10. Declarations and Consent

Include a scoring guidance note explaining how each section will be weighted and assessed. Align with PAS 91:2013 where applicable.',
  NULL,
  'Use when setting up a new subcontractor or supplier prequalification process and you need a comprehensive PQQ template that covers all standard assessment areas aligned with UK construction industry practice.',
  'intermediate',
  '📋',
  'published',
  false,
  44,
  (SELECT id FROM roles WHERE slug = 'procurement-manager'),
  (SELECT id FROM tasks WHERE slug = 'tender-analysis'),
  (SELECT id FROM tools WHERE slug = 'chatgpt'),
  (SELECT id FROM guides WHERE slug = 'ai-for-construction-procurement')
),

-- WORKFLOW 45: Create a Bid/No-Bid Decision Framework
(
  'Create a Bid/No-Bid Decision Framework',
  'create-bid-no-bid-decision-framework',
  'Produce a structured bid/no-bid assessment matrix evaluating key factors to support tender pursuit decisions.',
  'This workflow helps Estimators and Business Development teams make informed bid/no-bid decisions by creating a structured assessment framework. It evaluates the opportunity against factors including client relationship, project type alignment, competition, resource availability, risk profile, and margin opportunity, producing a scored matrix with a clear recommendation.',
  'You are an experienced UK construction Estimator and Business Development professional. Create a bid/no-bid decision assessment for the following tender opportunity:

Project: [PROJECT NAME, e.g., New-build primary school, 2-storey, 3FE]
Client: [CLIENT NAME, e.g., Westshire County Council via Faithful+Gould]
Location: [LOCATION]
Estimated Value: [VALUE, e.g., £8.5M]
Contract Form: [FORM, e.g., NEC4 ECC Option A]
Tender Return Date: [DATE]
Start on Site: [DATE]
Contract Period: [DURATION]
Procurement Route: [ROUTE, e.g., Framework mini-competition / Open tender / Negotiated]

Our Company Context:
- Sector experience: [DESCRIBE, e.g., Strong education sector portfolio, 12 schools in last 5 years]
- Client relationship: [DESCRIBE, e.g., New client, no previous relationship / Repeat client, strong relationship]
- Current workload: [DESCRIBE, e.g., Currently at 75% capacity, 2 estimators available]
- Geographic presence: [DESCRIBE, e.g., Regional office 15 miles from site]
- Recent win rate: [RATE, e.g., 1 in 4 on similar projects]

Known Competition: [LIST COMPETITORS IF KNOWN]
Number of Tenderers: [NUMBER, e.g., 4-6 firms invited]

Key Concerns or Risks:
[LIST ANY CONCERNS, e.g., Tight programme, contaminated land flagged in site investigation, novated design team we have not worked with before]

Produce a bid/no-bid assessment with:

1. Opportunity Summary (1 paragraph)
2. Scoring Matrix — score each factor 1-5 (1 = poor, 5 = excellent) with justification:
   a. Strategic fit (does this align with our business plan and target sectors?)
   b. Client relationship (existing relationship, repeat business potential?)
   c. Project type and complexity (do we have proven capability?)
   d. Geographic fit (proximity to our offices and supply chain?)
   e. Competition (how many bidders, who are they, what is our win probability?)
   f. Resource availability (do we have estimating and delivery capacity?)
   g. Programme and timing (is the programme realistic, does it clash with other commitments?)
   h. Risk profile (are the risks manageable and proportionate?)
   i. Commercial terms (contract form, payment terms, retention, bonds, LDs — are they acceptable?)
   j. Margin opportunity (is there a realistic prospect of achieving target margin?)
   k. Design status (how developed is the design, is there scope risk?)
   l. Supply chain (do we have suitable subcontractors and suppliers?)
3. Total Score and RAG Rating (Red / Amber / Green thresholds)
4. Key risks if we bid
5. Key risks if we don''t bid
6. Recommendation: BID / NO-BID / BID WITH CONDITIONS
7. Conditions or actions required before tender submission (if applicable)

Present the matrix as a clear table. Provide honest, balanced assessment.',
  NULL,
  'Use when a new tender opportunity arises and you need a structured framework to evaluate whether to commit estimating resources to pursue it, ensuring consistent and objective bid/no-bid decisions.',
  'beginner',
  '✅',
  'published',
  false,
  45,
  (SELECT id FROM roles WHERE slug = 'estimator'),
  (SELECT id FROM tasks WHERE slug = 'tender-analysis'),
  (SELECT id FROM tools WHERE slug = 'chatgpt'),
  NULL
),

-- WORKFLOW 46: Draft a CDM Principal Contractor Plan
(
  'Draft a CDM Principal Contractor Plan',
  'draft-cdm-principal-contractor-plan',
  'Generate a construction phase plan in line with CDM 2015 Regulation 12 covering all statutory requirements.',
  'This workflow helps Health and Safety Managers produce a comprehensive Construction Phase Plan as required by CDM 2015 Regulation 12. The plan covers the project description, management structure, site rules, risk management arrangements, emergency procedures, welfare provisions, and training requirements. It is structured to satisfy the Principal Contractor''s legal duties and is suitable for submission to the Principal Designer and Client.',
  'You are an experienced UK construction Health and Safety Manager acting as the Principal Contractor''s competent person. Draft a Construction Phase Plan in accordance with CDM 2015 Regulation 12 based on the following:

Project: [PROJECT NAME AND DESCRIPTION, e.g., Demolition and new-build of 4-storey office building with single-level basement car park]
Client: [CLIENT NAME]
Principal Designer: [PD NAME]
Principal Contractor: [PC NAME]
Site Address: [FULL ADDRESS]
Project Value: [VALUE]
Planned Start Date: [DATE]
Planned Completion Date: [DATE]
Peak Number of Workers on Site: [NUMBER]
Notifiable Project: [YES/NO — projects lasting more than 30 working days with more than 20 workers, or exceeding 500 person-days]

Key Hazards Identified in Pre-Construction Information:
[LIST HAZARDS, e.g.:
- Demolition of existing 3-storey structure
- Asbestos identified in existing building (R&D survey completed)
- Deep basement excavation (5m depth)
- Adjacent live highway
- Overhead power lines crossing site
- Contaminated ground (made ground with hydrocarbons)]

Structure the Construction Phase Plan as:
1. Project description and programme overview
2. Management structure and responsibilities
   - Client duties and arrangements
   - Principal Designer and their role
   - Principal Contractor''s management team (names, roles, qualifications)
   - Contractor and subcontractor management arrangements
   - Worker consultation arrangements
3. Phase-specific hazards and controls (for each phase: demolition, substructure, superstructure, fit-out, external works)
4. Site rules (including PPE, permits to work, hot works, lifting operations, confined spaces)
5. Site induction and ongoing training requirements
6. Emergency procedures (fire, first aid, rescue from height/excavation, environmental spill)
7. Welfare arrangements (toilets, washing facilities, changing rooms, rest areas, drying room — per Schedule 2 of CDM 2015)
8. Arrangements for monitoring and review
9. Reporting structure for incidents (RIDDOR 2013 requirements)
10. Design change management and communication
11. Working hours and noise/nuisance controls
12. Traffic management plan principles
13. Arrangements for coordination with other contractors
14. Document control and plan review dates

Reference CDM 2015 Regulations throughout, particularly Regulations 8, 12, 13, and 15. Reference relevant ACOPs and HSE guidance (L153). Ensure the plan addresses all items listed in CDM 2015 Regulation 12(2).',
  NULL,
  'Use when mobilising a new project and you need to prepare or update the Construction Phase Plan as required by CDM 2015. Essential before works commence on any notifiable project.',
  'advanced',
  '🦺',
  'published',
  false,
  46,
  (SELECT id FROM roles WHERE slug = 'health-and-safety-manager'),
  (SELECT id FROM tasks WHERE slug = 'safety-planning'),
  (SELECT id FROM tools WHERE slug = 'claude'),
  (SELECT id FROM guides WHERE slug = 'ai-for-health-and-safety-documentation')
),

-- WORKFLOW 47: Generate a COSHH Risk Assessment
(
  'Generate a COSHH Risk Assessment',
  'generate-coshh-risk-assessment',
  'Create a COSHH assessment for a specific substance covering hazards, exposure, controls, PPE, and emergency procedures.',
  'This workflow helps Health and Safety Managers produce a COSHH risk assessment for hazardous substances used on construction sites. It covers hazard identification from the Safety Data Sheet, exposure routes and risk evaluation, hierarchy of control measures, PPE requirements, emergency and first aid procedures, and health surveillance requirements in line with the Control of Substances Hazardous to Health Regulations 2002.',
  'You are an experienced UK construction Health and Safety Manager. Generate a COSHH risk assessment for the following substance / product used on a construction site:

Substance / Product Name: [NAME, e.g., Sika MonoTop 612 cementitious repair mortar / Tremco illbruck FM330 fire rated expanding foam / Dulux Trade Diamond Matt emulsion]
Manufacturer: [MANUFACTURER]
Safety Data Sheet Date: [SDS DATE AND VERSION]

Usage Details:
- Task / activity: [DESCRIBE HOW IT IS USED, e.g., Hand-applied cementitious repair to concrete surfaces using trowel application]
- Location on site: [LOCATION, e.g., Basement car park soffits, enclosed area with limited natural ventilation]
- Frequency of use: [FREQUENCY, e.g., Daily for 3 weeks during concrete repair phase]
- Duration of exposure per shift: [DURATION, e.g., 4-6 hours]
- Number of workers exposed: [NUMBER]
- Method of application: [METHOD, e.g., Hand mixing and trowel application / Spray application / Brush application]

Hazard Information from SDS:
[PASTE OR SUMMARISE KEY HAZARD INFO, e.g.:
- Contains Portland cement (CAS 65997-15-1) — causes serious eye damage (H318), skin irritation (H315), may cause respiratory irritation (H335), may cause an allergic skin reaction (H317)
- WEL: Portland cement — 10 mg/m3 inhalable dust, 4 mg/m3 respirable dust
- pH when mixed: approximately 13 (highly alkaline)]

Structure the COSHH assessment as:
1. Assessment details (assessor, date, review date, task, location)
2. Substance identification (product name, manufacturer, hazard classification, GHS pictograms, signal word, H-statements)
3. Hazardous components and workplace exposure limits (WELs)
4. Routes of exposure (inhalation, skin contact, eye contact, ingestion) with assessment of each
5. Risk evaluation (who is at risk, level of risk before controls)
6. Control measures applying the hierarchy of control:
   a. Elimination / substitution (can a less hazardous alternative be used?)
   b. Engineering controls (LEV, ventilation, enclosure)
   c. Administrative controls (reduced exposure time, job rotation, signage, designated areas)
   d. PPE requirements (specify exact type and standard, e.g., EN 166 safety goggles, EN 374 nitrile gloves, FFP2 dust mask to EN 149)
7. Residual risk rating after controls
8. Storage and handling requirements
9. Emergency procedures (spill response, first aid for each exposure route)
10. Health surveillance requirements (e.g., skin checks for cement dermatitis, respiratory surveillance for dust exposure)
11. Information, instruction, and training requirements
12. Monitoring and review arrangements

Reference COSHH Regulations 2002, relevant EH40 workplace exposure limits, and HSE construction-specific guidance. Use a risk rating matrix (Likelihood x Severity) for before and after controls.',
  NULL,
  'Use when introducing a new hazardous substance to site or reviewing existing COSHH assessments. Required under COSHH Regulations 2002 before any work involving hazardous substances commences.',
  'intermediate',
  '⚗️',
  'published',
  false,
  47,
  (SELECT id FROM roles WHERE slug = 'health-and-safety-manager'),
  (SELECT id FROM tasks WHERE slug = 'safety-planning'),
  (SELECT id FROM tools WHERE slug = 'chatgpt'),
  (SELECT id FROM guides WHERE slug = 'ai-for-health-and-safety-documentation')
),

-- WORKFLOW 48: Draft an RFI Response
(
  'Draft an RFI Response',
  'draft-rfi-response',
  'Draft a professional RFI response covering the query, design intent, resolution, cross-discipline impact, and drawing updates.',
  'This workflow helps Design Managers prepare clear, comprehensive responses to Requests for Information. It structures the response to address the original query, explain the design intent, provide a proposed resolution, assess impact on other disciplines, and identify any required drawing or specification updates. The output is suitable for formal issue through the project CDE or document management system.',
  'You are an experienced UK construction Design Manager. Draft a professional RFI response based on the following:

Project: [PROJECT NAME]
RFI Number: [RFI NUMBER, e.g., RFI-0142]
RFI Date: [DATE RECEIVED]
Response Due Date: [DATE]
Originated By: [NAME, ROLE, ORGANISATION, e.g., John Smith, Site Manager, ABC Construction]
Discipline: [DISCIPLINE, e.g., Structural / Architectural / MEP / Civil]

Original RFI Query:
[PASTE OR DESCRIBE THE QUERY, e.g., "Drawing S-201 Rev C shows a 300x600 RC beam at Grid Line B/4-5 at Level 2, however the architectural reflected ceiling plan A-RC-201 shows a bulkhead at 2700mm AFFL in this location. The structural beam depth would project 150mm below the ceiling line. Please confirm the correct beam depth or advise if the ceiling level can be adjusted."]

Available Design Information:
[LIST RELEVANT DRAWINGS, SPECS, OR DETAILS, e.g.:
- Structural drawing S-201 Rev C
- Architectural RCP A-RC-201 Rev B
- Room data sheet showing minimum ceiling height 2550mm AFFL
- MEP routing drawing M-201 Rev A shows ductwork in this zone]

Design Intent:
[DESCRIBE THE DESIGN INTENT IF KNOWN, e.g., The structural beam is sized for the loading requirements at this location. The architectural ceiling level was set before the structural design was finalised.]

Proposed Resolution:
[SUGGEST A RESOLUTION IF YOU HAVE ONE, e.g., Investigate whether the beam can be made shallower (300x500) with additional reinforcement, or whether the ceiling can drop locally with a bulkhead. MEP coordination also needed as ductwork routes through this zone.]

Structure the RFI response as:
1. Response header (RFI number, date, project, response number)
2. Reference to original query (restate the question clearly)
3. Design review summary (what was investigated and by whom)
4. Response and resolution (clear, unambiguous answer or instruction)
5. Impact on other disciplines (structural, architectural, MEP, fire — flag any coordination issues)
6. Drawing and specification updates required (list specific drawings and revisions needed)
7. Cost and programme implications (if any — flag if a variation may arise)
8. Distribution list
9. Action required (who needs to do what by when)

Use clear technical language. If the response requires further design development, state the timeline for a final answer. Flag if a formal instruction or variation is required to implement the change.',
  NULL,
  'Use when you receive an RFI from the site team or contractor and need to coordinate a design response across disciplines, ensuring all impacts are identified and communicated clearly.',
  'intermediate',
  '📐',
  'published',
  false,
  48,
  (SELECT id FROM roles WHERE slug = 'design-manager'),
  (SELECT id FROM tasks WHERE slug = 'stakeholder-communication'),
  (SELECT id FROM tools WHERE slug = 'claude'),
  (SELECT id FROM guides WHERE slug = 'ai-for-bim-workflows')
),

-- WORKFLOW 49: Generate a BIM Execution Plan Summary
(
  'Generate a BIM Execution Plan Summary',
  'generate-bim-execution-plan-summary',
  'Draft a BIM Execution Plan covering objectives, roles, standards, coordination procedures, and information exchanges aligned with ISO 19650.',
  'This workflow helps BIM Managers produce a comprehensive BIM Execution Plan that defines how building information modelling will be managed throughout the project lifecycle. It covers BIM objectives, roles and responsibilities, software environments, naming conventions, coordination workflows, and information exchange requirements, all aligned with the ISO 19650 series and the UK BIM Framework.',
  'You are an experienced UK construction BIM Manager. Draft a BIM Execution Plan (BEP) based on the following project information:

Project: [PROJECT NAME AND DESCRIPTION, e.g., New-build 15-storey residential tower, mixed-use ground floor, with 2-level basement car park]
Client: [CLIENT NAME]
Client BIM Requirements: [DESCRIBE, e.g., ISO 19650 compliant, EIR requires LOD 300 at Stage 3, COBie data drops at Stages 3, 4 and 5, Asset Information Model for FM handover]
Project Stage: [CURRENT RIBA STAGE, e.g., Stage 3 Spatial Coordination]
Appointing Party: [APPOINTING PARTY NAME]
Lead Appointed Party: [LEAD APPOINTED PARTY NAME]

Design Team:
[LIST DISCIPLINES AND SOFTWARE, e.g.:
- Architecture: [FIRM] — Revit 2024
- Structural Engineering: [FIRM] — Revit 2024
- MEP Engineering: [FIRM] — Revit 2024
- Civil Engineering: [FIRM] — Civil 3D 2024
- Landscape: [FIRM] — Revit 2024 / SketchUp]

Common Data Environment (CDE): [CDE PLATFORM, e.g., Autodesk Construction Cloud / Asite / Aconex / Viewpoint]

Key BIM Deliverables:
[LIST KEY DELIVERABLES, e.g.:
- Federated model for spatial coordination
- Clash detection reports (fortnightly)
- COBie data drops at Stages 3, 4, 5
- Construction sequencing (4D) model
- Asset Information Model at practical completion]

Structure the BEP as:
1. Project Information
   - Project details, key dates, project team
2. BIM Objectives and Uses
   - List specific BIM uses (design coordination, clash detection, quantity extraction, 4D planning, asset management)
   - Link to project outcomes and client requirements
3. Roles and Responsibilities
   - Information Management roles per ISO 19650 (Appointing Party, Lead Appointed Party, Appointed Parties, Information Manager, Task Information Managers)
   - RACI matrix for key BIM activities
4. Information Standard and Methods
   - Standards compliance (ISO 19650-1:2018, ISO 19650-2:2018, BS EN 17412-1 for LOD)
   - Classification system (Uniclass 2015)
   - Units, coordinate system, project origin point
5. Software and Formats
   - Authoring tools by discipline
   - Exchange formats (IFC 2x3 / IFC4, COBie, PDF, DWG)
   - Software versions and interoperability approach
6. Naming Conventions
   - File naming convention per ISO 19650 / BS EN ISO 19650-2 Annex A
   - Model naming, drawing naming, document naming
   - Suitability codes and revision numbering
7. Common Data Environment (CDE) Workflow
   - CDE platform and access arrangements
   - Status codes (Work in Progress, Shared, Published, Archived)
   - Approval workflows
8. Model Coordination Procedures
   - Federation strategy and frequency
   - Clash detection process, tolerance rules, clash categorisation
   - Coordination meeting cadence and attendees
   - Clash resolution workflow and responsibilities
9. Level of Information Need
   - Geometrical information (LOD) requirements by stage and discipline
   - Alphanumeric information requirements (COBie / asset data)
   - Documentation requirements
10. Information Exchange Schedule
    - Data drops aligned to RIBA stages
    - What is delivered, by whom, in what format, at what stage
11. Quality Assurance and Model Audit
    - Model checking procedures (Solibri / Navisworks rules)
    - QA review frequency
12. Security and Access
    - Information security per ISO 19650-5
    - Access permissions by role

Reference ISO 19650 series, UK BIM Framework, and BS EN 17412-1 throughout.',
  NULL,
  'Use at the start of a project or when responding to a client''s Exchange Information Requirements (EIR) and you need to establish the BIM strategy, standards, and procedures for the delivery team.',
  'advanced',
  '🖥️',
  'published',
  false,
  49,
  (SELECT id FROM roles WHERE slug = 'bim-manager'),
  (SELECT id FROM tasks WHERE slug = 'document-control'),
  (SELECT id FROM tools WHERE slug = 'chatgpt'),
  (SELECT id FROM guides WHERE slug = 'ai-for-bim-workflows')
),

-- WORKFLOW 50: Create a Waste Management Plan
(
  'Create a Waste Management Plan',
  'create-waste-management-plan',
  'Generate a Site Waste Management Plan covering waste streams, segregation, disposal routes, recycling targets, and monitoring.',
  'This workflow helps Site Managers produce a Site Waste Management Plan (SWMP) to manage construction waste responsibly and in compliance with environmental regulations. It covers anticipated waste streams and quantities, segregation procedures, disposal and recycling routes, waste minimisation targets, and monitoring and reporting requirements aligned with duty of care obligations under the Environmental Protection Act 1990.',
  'You are an experienced UK construction Site Manager responsible for environmental compliance. Generate a Site Waste Management Plan (SWMP) for the following project:

Project: [PROJECT NAME AND DESCRIPTION, e.g., Refurbishment of 1960s 8-storey office building including strip-out, new M&E, new fit-out, and facade overcladding]
Client: [CLIENT NAME]
Site Address: [FULL ADDRESS]
Principal Contractor: [PC NAME]
Project Value: [VALUE]
Project Duration: [START DATE] to [END DATE]
Estimated Total Waste Arisings: [ESTIMATE IF KNOWN, e.g., approximately 2,500 tonnes]
BREEAM or Sustainability Target: [IF APPLICABLE, e.g., BREEAM Excellent — Wst 01 credit requires diversion of 95% from landfill]

Demolition / Strip-Out Scope:
[DESCRIBE IF APPLICABLE, e.g., Full internal strip-out of floors 1-8 including raised floors, suspended ceilings, partitions, sanitaryware, and M&E services. No structural demolition. Asbestos removal by licensed contractor (separate waste management).]

Key Waste Streams Expected:
[LIST MAIN WASTE STREAMS, e.g.:
- Concrete and masonry (from strip-out)
- Plasterboard (from ceiling and partition removal)
- Metal (ceiling grids, M&E, raised floor pedestals)
- Timber (formwork, temporary works, packaging)
- Mixed packaging (cardboard, plastic wrap, pallets)
- WEEE (removed light fittings, electrical equipment)
- Hazardous (asbestos — managed separately, paints, sealants, adhesives)
- General mixed waste]

Waste Management Facilities:
[DESCRIBE SITE ARRANGEMENTS, e.g., Limited site compound area. Skips located in basement loading bay. Nearest licensed recycling facility: XYZ Waste Management, 8 miles from site.]

Structure the SWMP as:
1. Project information and key contacts (site waste champion, waste carrier details)
2. Legal and regulatory framework
   - Environmental Protection Act 1990 Duty of Care
   - Waste (England and Wales) Regulations 2011
   - Hazardous Waste (England and Wales) Regulations 2005
   - Clean Neighbourhoods and Environment Act 2005
   - BREEAM / sustainability requirements (if applicable)
3. Waste streams forecast table
   - Waste type, EWC code, estimated quantity (tonnes), hazardous Y/N, disposal route (reuse / recycle / recovery / landfill), carrier and destination
4. Waste minimisation strategy
   - Design for waste reduction measures
   - Off-site manufacture and prefabrication
   - Just-in-time delivery
   - Material reuse on site
   - Packaging take-back arrangements
5. Site segregation arrangements
   - Designated waste storage area plan
   - Segregation categories and skip/bin colours
   - Signage and labelling
   - Contamination prevention measures
6. Hazardous waste management
   - Identification and classification
   - Separate storage requirements
   - Licensed disposal routes
   - Consignment note procedures
7. Waste carrier and disposal site details
   - Carrier licence numbers
   - Exemptions or permits held
   - Transfer note / waste transfer procedures
8. Targets and KPIs
   - Diversion from landfill target (% by weight)
   - Waste per 100 sqm of GIA target
   - Recycling rate target
9. Monitoring and reporting
   - Monthly waste returns process
   - Waste transfer note filing
   - Dashboard / tracker format
   - Review frequency and responsible person
10. Training and awareness
    - Site induction content on waste management
    - Toolbox talk schedule
    - Responsibilities of all site operatives

Present quantities in a clear table format. Include realistic UK waste generation benchmarks where estimates are not provided.',
  NULL,
  'Use when setting up a new project and you need to prepare a Site Waste Management Plan to comply with environmental regulations and meet sustainability targets such as BREEAM waste credits.',
  'beginner',
  '♻️',
  'published',
  false,
  50,
  (SELECT id FROM roles WHERE slug = 'site-manager'),
  (SELECT id FROM tasks WHERE slug = 'environmental-compliance'),
  (SELECT id FROM tools WHERE slug = 'chatgpt'),
  NULL
);
