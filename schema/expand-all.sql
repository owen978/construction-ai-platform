-- ============================================================
-- Construction AI Platform — Expand Roles & Tasks
-- Run this in Supabase SQL Editor AFTER the initial seed data
-- ============================================================
-- This will:
-- 1. Add 6 new professional roles
-- 2. Add 10 new construction tasks
-- 3. Create role-task associations for new roles
-- 4. Add new task associations for existing roles
-- ============================================================

-- ============================================================
-- NEW ROLES (6 additional professional construction roles)
-- ============================================================

INSERT INTO roles (name, slug, description, icon, status, sort_order) VALUES
(
  'Contracts Manager',
  'contracts-manager',
  'AI workflows for Contracts Managers — automate contractual correspondence, claims assessment, extension of time evaluations, and dispute documentation.',
  '📄',
  'published',
  7
),
(
  'Commercial Manager',
  'commercial-manager',
  'AI workflows for Commercial Managers — streamline CVRs, commercial reporting, forecasting, and subcontractor commercial management.',
  '💼',
  'published',
  8
),
(
  'Planning Engineer',
  'planning-engineer',
  'AI workflows for Planning Engineers — accelerate programme narratives, delay analysis, lookahead schedules, and recovery programme documentation.',
  '📊',
  'published',
  9
),
(
  'Health & Safety Manager',
  'health-and-safety-manager',
  'AI workflows for Health & Safety Managers — generate RAMS, CDM documentation, toolbox talks, and safety audit reports faster.',
  '🦺',
  'published',
  10
),
(
  'Procurement Manager',
  'procurement-manager',
  'AI workflows for Procurement Managers — speed up supplier evaluations, procurement schedules, scope documents, and PQQ assessments.',
  '📦',
  'published',
  11
),
(
  'BIM Manager',
  'bim-manager',
  'AI workflows for BIM Managers — create BIM execution plans, coordination reports, clash resolution documentation, and model audit summaries.',
  '🖥️',
  'published',
  12
);

-- ============================================================
-- NEW TASKS (10 additional construction tasks)
-- ============================================================

INSERT INTO tasks (name, slug, description, icon, status, sort_order) VALUES
(
  'Valuation & Payment Applications',
  'valuation-and-payment-applications',
  'Use AI to draft interim valuations, payment applications, and supporting documentation for construction projects.',
  '💷',
  'published',
  11
),
(
  'Variation Management',
  'variation-management',
  'Use AI to assess variations, draft variation notices, and prepare variation accounts for construction contracts.',
  '🔄',
  'published',
  12
),
(
  'Programme Narrative Writing',
  'programme-narrative-writing',
  'Leverage AI to write programme narratives, explain critical path logic, and document scheduling assumptions.',
  '📝',
  'published',
  13
),
(
  'Subcontractor Management',
  'subcontractor-management',
  'Use AI to draft subcontractor scope documents, evaluate performance, and manage subcontract correspondence.',
  '🤝',
  'published',
  14
),
(
  'Snagging & Defects',
  'snagging-and-defects',
  'Generate snagging lists, defect reports, and remedial works schedules using AI-powered templates.',
  '🔍',
  'published',
  15
),
(
  'Claims Management',
  'claims-management',
  'Use AI to structure delay claims, disruption claims, and loss and expense submissions for construction disputes.',
  '⚖️',
  'published',
  16
),
(
  'Budget Forecasting',
  'budget-forecasting',
  'Leverage AI to draft cost forecasts, budget variance reports, and financial commentary for construction projects.',
  '📉',
  'published',
  17
),
(
  'Site Induction Documentation',
  'site-induction-documentation',
  'Use AI to create site induction presentations, visitor briefings, and contractor induction checklists.',
  '📋',
  'published',
  18
),
(
  'Document Control',
  'document-control',
  'Use AI to generate document registers, transmittal letters, and document management procedures.',
  '🗂️',
  'published',
  19
),
(
  'Environmental Compliance',
  'environmental-compliance',
  'Use AI to draft environmental management plans, waste management documentation, and sustainability reports.',
  '🌱',
  'published',
  20
);

-- ============================================================
-- ROLE-TASK ASSOCIATIONS: New roles
-- ============================================================

INSERT INTO role_tasks (role_id, task_id) VALUES
-- Contracts Manager tasks
((SELECT id FROM roles WHERE slug = 'contracts-manager'), (SELECT id FROM tasks WHERE slug = 'contract-review')),
((SELECT id FROM roles WHERE slug = 'contracts-manager'), (SELECT id FROM tasks WHERE slug = 'variation-management')),
((SELECT id FROM roles WHERE slug = 'contracts-manager'), (SELECT id FROM tasks WHERE slug = 'claims-management')),
((SELECT id FROM roles WHERE slug = 'contracts-manager'), (SELECT id FROM tasks WHERE slug = 'stakeholder-communication')),
-- Commercial Manager tasks
((SELECT id FROM roles WHERE slug = 'commercial-manager'), (SELECT id FROM tasks WHERE slug = 'cost-estimation')),
((SELECT id FROM roles WHERE slug = 'commercial-manager'), (SELECT id FROM tasks WHERE slug = 'budget-forecasting')),
((SELECT id FROM roles WHERE slug = 'commercial-manager'), (SELECT id FROM tasks WHERE slug = 'valuation-and-payment-applications')),
((SELECT id FROM roles WHERE slug = 'commercial-manager'), (SELECT id FROM tasks WHERE slug = 'variation-management')),
-- Planning Engineer tasks
((SELECT id FROM roles WHERE slug = 'planning-engineer'), (SELECT id FROM tasks WHERE slug = 'project-scheduling')),
((SELECT id FROM roles WHERE slug = 'planning-engineer'), (SELECT id FROM tasks WHERE slug = 'programme-narrative-writing')),
((SELECT id FROM roles WHERE slug = 'planning-engineer'), (SELECT id FROM tasks WHERE slug = 'progress-reporting')),
-- Health & Safety Manager tasks
((SELECT id FROM roles WHERE slug = 'health-and-safety-manager'), (SELECT id FROM tasks WHERE slug = 'safety-planning')),
((SELECT id FROM roles WHERE slug = 'health-and-safety-manager'), (SELECT id FROM tasks WHERE slug = 'site-induction-documentation')),
((SELECT id FROM roles WHERE slug = 'health-and-safety-manager'), (SELECT id FROM tasks WHERE slug = 'environmental-compliance')),
((SELECT id FROM roles WHERE slug = 'health-and-safety-manager'), (SELECT id FROM tasks WHERE slug = 'quality-control')),
-- Procurement Manager tasks
((SELECT id FROM roles WHERE slug = 'procurement-manager'), (SELECT id FROM tasks WHERE slug = 'tender-analysis')),
((SELECT id FROM roles WHERE slug = 'procurement-manager'), (SELECT id FROM tasks WHERE slug = 'subcontractor-management')),
((SELECT id FROM roles WHERE slug = 'procurement-manager'), (SELECT id FROM tasks WHERE slug = 'material-takeoff')),
-- BIM Manager tasks
((SELECT id FROM roles WHERE slug = 'bim-manager'), (SELECT id FROM tasks WHERE slug = 'document-control')),
((SELECT id FROM roles WHERE slug = 'bim-manager'), (SELECT id FROM tasks WHERE slug = 'quality-control')),
((SELECT id FROM roles WHERE slug = 'bim-manager'), (SELECT id FROM tasks WHERE slug = 'stakeholder-communication'));

-- ============================================================
-- ROLE-TASK ASSOCIATIONS: Existing roles with new tasks
-- ============================================================

INSERT INTO role_tasks (role_id, task_id) VALUES
-- Quantity Surveyor new task associations
((SELECT id FROM roles WHERE slug = 'quantity-surveyor'), (SELECT id FROM tasks WHERE slug = 'valuation-and-payment-applications')),
((SELECT id FROM roles WHERE slug = 'quantity-surveyor'), (SELECT id FROM tasks WHERE slug = 'variation-management')),
((SELECT id FROM roles WHERE slug = 'quantity-surveyor'), (SELECT id FROM tasks WHERE slug = 'claims-management')),
((SELECT id FROM roles WHERE slug = 'quantity-surveyor'), (SELECT id FROM tasks WHERE slug = 'budget-forecasting')),
-- Project Manager new task associations
((SELECT id FROM roles WHERE slug = 'project-manager'), (SELECT id FROM tasks WHERE slug = 'subcontractor-management')),
((SELECT id FROM roles WHERE slug = 'project-manager'), (SELECT id FROM tasks WHERE slug = 'document-control')),
((SELECT id FROM roles WHERE slug = 'project-manager'), (SELECT id FROM tasks WHERE slug = 'budget-forecasting')),
-- Site Manager new task associations
((SELECT id FROM roles WHERE slug = 'site-manager'), (SELECT id FROM tasks WHERE slug = 'snagging-and-defects')),
((SELECT id FROM roles WHERE slug = 'site-manager'), (SELECT id FROM tasks WHERE slug = 'site-induction-documentation')),
((SELECT id FROM roles WHERE slug = 'site-manager'), (SELECT id FROM tasks WHERE slug = 'environmental-compliance')),
-- Estimator new task associations
((SELECT id FROM roles WHERE slug = 'estimator'), (SELECT id FROM tasks WHERE slug = 'subcontractor-management')),
((SELECT id FROM roles WHERE slug = 'estimator'), (SELECT id FROM tasks WHERE slug = 'budget-forecasting')),
-- Construction Director new task associations
((SELECT id FROM roles WHERE slug = 'construction-director'), (SELECT id FROM tasks WHERE slug = 'budget-forecasting')),
((SELECT id FROM roles WHERE slug = 'construction-director'), (SELECT id FROM tasks WHERE slug = 'claims-management')),
-- Design Manager new task associations
((SELECT id FROM roles WHERE slug = 'design-manager'), (SELECT id FROM tasks WHERE slug = 'document-control')),
((SELECT id FROM roles WHERE slug = 'design-manager'), (SELECT id FROM tasks WHERE slug = 'snagging-and-defects'));

-- ============================================================
-- DONE! You should now have:
-- - 12 roles (6 original + 6 new)
-- - 20 tasks (10 original + 10 new)
-- - All role-task associations for new and existing roles
-- ============================================================
-- ============================================================
-- Construction AI Platform — Expanded Tools & Guides
-- Run this in Supabase SQL Editor to add 4 new tools + 5 new guides
-- Safe to run on existing data (uses unique slugs)
-- ============================================================

-- ============================================================
-- NEW TOOLS (4)
-- ============================================================

INSERT INTO tools (name, slug, description, long_description, url, category, pricing, status, featured, sort_order) VALUES
(
  'Bluebeam Revu',
  'bluebeam-revu',
  'Industry-standard PDF markup and takeoff tool for construction. AI features help automate quantity takeoffs and document comparison.',
  'Bluebeam Revu is the construction industry''s go-to tool for PDF markup, digital takeoffs, and document management. Used by QS professionals, estimators, and project teams worldwide, it streamlines plan review, punch lists, and RFI workflows. Recent AI-powered features include automated quantity counting, intelligent markup suggestions, and document comparison that highlights changes between drawing revisions — saving hours of manual checking on every project.',
  'https://www.bluebeam.com',
  'Construction Software',
  'From $240/year',
  'published',
  false,
  7
),
(
  'Procore',
  'procore',
  'Leading construction management platform with AI-powered insights for project management, quality, safety, and financial tracking.',
  'Procore is the most widely adopted construction management platform globally, connecting everyone on a project — from the office to the field. Its AI capabilities are growing rapidly, with features like automated daily log suggestions, predictive safety insights that identify high-risk activities before incidents occur, and intelligent document routing. For construction professionals already using Procore, its built-in AI features provide a natural entry point to AI-augmented project management without adopting separate tools.',
  'https://www.procore.com',
  'Construction Management',
  'Custom pricing',
  'published',
  true,
  8
),
(
  'Autodesk Construction Cloud',
  'autodesk-construction-cloud',
  'Unified platform connecting BIM data with field management. AI features for clash detection, risk prediction, and design review.',
  'Autodesk Construction Cloud (ACC) brings together BIM 360, PlanGrid, and BuildingConnected into a single platform. Its AI capabilities are particularly strong in design coordination — automatically detecting clashes between disciplines, predicting potential construction issues from model data, and prioritising RFIs by impact. For teams already in the Autodesk ecosystem (Revit, AutoCAD, Navisworks), ACC provides seamless AI-powered workflows from design through construction and handover.',
  'https://construction.autodesk.com',
  'BIM & Construction',
  'From $85/user/month',
  'published',
  false,
  9
),
(
  'Gamma AI',
  'gamma-ai',
  'AI-powered presentation and document tool. Create professional construction presentations, proposals, and reports in minutes.',
  'Gamma is an AI-first presentation tool that is transforming how construction professionals create client-facing documents. Instead of spending hours in PowerPoint, you can describe what you need and Gamma generates a polished presentation with professional layouts, relevant visuals, and structured content. It is particularly useful for construction professionals who need to create tender presentations, project progress decks, client proposals, and board report packs. It exports to PDF and PowerPoint, so it fits into existing workflows.',
  'https://gamma.app',
  'AI Presentations',
  'Free / Plus $10/mo',
  'published',
  false,
  10
);

-- ============================================================
-- NEW GUIDES (5)
-- ============================================================

INSERT INTO guides (title, slug, description, content, difficulty, reading_time_minutes, status, featured, sort_order) VALUES
(
  'AI for Contract Administration in Construction',
  'ai-for-contract-administration',
  'How to use AI to manage contracts, variations, claims, and contractual correspondence more efficiently in construction.',
  'Contract administration is one of the most document-heavy disciplines in construction. From issuing notices and instructions to managing variations, preparing valuations, and handling claims, a contracts professional can spend the majority of their time drafting, reviewing, and cross-referencing contractual documents. AI tools offer a genuine opportunity to speed up this work — not by replacing professional judgement, but by handling the heavy lifting of first drafts, structuring arguments, and ensuring nothing falls through the cracks.

This guide covers the key areas where AI can support contract administration under NEC4 and JCT contract forms.

AI FOR CONTRACTUAL CORRESPONDENCE

Construction contracts generate enormous volumes of correspondence: early warning notices under NEC4, architect''s instructions under JCT, requests for information, confirmation of verbal instructions, and more. Each letter must be precise, reference the correct contract clauses, and follow the right contractual procedures.

AI excels at drafting this correspondence quickly. You can provide the tool with the contract form (e.g., NEC4 Option A), the relevant facts, and the clause you are acting under, and it will produce a well-structured draft in seconds. For example, you might prompt: "Draft an early warning notice under NEC4 clause 15.1 regarding unforeseen ground conditions discovered during piling works on Plot 7. The ground investigation report indicated clay but we have encountered rock at 3m depth."

The output gives you a professional starting point that you can refine, rather than staring at a blank page. This is particularly valuable for junior contract administrators learning the conventions of contractual letter writing.

AI FOR VARIATION MANAGEMENT

Variations are a constant reality on construction projects. Whether it is a client change, a design development, or an unforeseen condition, each variation needs to be assessed, priced, and formally recorded. AI can assist at every stage.

For assessment, you can ask AI to summarise the contractual entitlement to a variation under the relevant contract clause — for instance, clause 60.1 compensation events under NEC4 or clause 5.2 variations under JCT DB 2016. For pricing, AI can help structure a variation account by generating a breakdown template covering labour, materials, plant, preliminaries, overheads, and profit. For record-keeping, AI can draft variation registers, status summaries, and monthly variation reports that keep the project team and client informed.

The key benefit is consistency. AI helps you produce variation documentation in a standardised format every time, which is invaluable when managing dozens of variations across a project.

AI FOR CLAIMS AND DISPUTES

Delay claims and contractual disputes require carefully structured arguments supported by evidence. Preparing a claim submission — whether it is a contractor''s claim for an extension of time or an employer''s claim for liquidated damages — involves reviewing programme data, correspondence records, and contract provisions, then weaving them into a coherent narrative.

AI is remarkably good at structuring these documents. You can provide the key facts, the relevant contract clauses, and the relief sought, and the AI will draft a structured submission with headings, a chronology of events, contractual basis, and particulars of the claim. This does not replace the expert analysis of a claims consultant or contracts manager, but it dramatically reduces the time spent on the first draft.

For NEC4 projects, AI can help structure clause 61.3 notifications, clause 62.2 quotations for compensation events, and clause 63 assessments. For JCT projects, it can assist with clause 2.27 relevant event notices and clause 4.23 loss and expense claims.

AI FOR PAYMENT ADMINISTRATION

Payment administration follows strict contractual timelines — payment applications, payment notices, pay less notices, and final accounts all have prescribed periods under the Housing Grants, Construction and Regeneration Act 1996 (as amended) and the specific contract terms.

AI can help prepare interim valuation summaries, draft payment certificates, and structure final account statements. You can feed in measured quantities, agreed rates, and variation values, and AI will generate a formatted valuation document. It is also useful for producing the narrative sections of payment recommendations that explain adjustments to the client.

BEST PRACTICES FOR AI IN CONTRACT ADMINISTRATION

First, always have a qualified contracts professional review any AI-generated contractual document before it is issued. AI does not understand the specific circumstances of your project, the history of negotiations, or the nuances of site relationships.

Second, always specify the exact contract form and edition when prompting. There are significant differences between NEC3 and NEC4, between JCT SBC 2016 and JCT DB 2016, and between the various options within each form. A clause reference that is correct under one form may be wrong under another.

Third, never rely on AI for legal interpretation. AI can draft a letter referencing clause 60.1(12) of the NEC4, but it cannot advise you on whether your situation actually falls within that clause. That requires professional judgement, and potentially legal advice.

Finally, use AI as an accelerator, not a replacement. The professionals who get the most from AI in contract administration are those who already understand the contractual framework and use AI to do the routine drafting faster — freeing themselves to focus on strategy, negotiation, and the decisions that actually matter.',
  'intermediate',
  11,
  'published',
  true,
  6
),
(
  'AI for Construction Site Management: A Complete Guide',
  'ai-for-site-management',
  'A practical guide to using AI tools for daily site operations, from morning briefings to end-of-day reporting.',
  'If you are a site manager, you already know that your day is a relentless cycle of coordination, documentation, and problem-solving. Between managing subcontractors, dealing with deliveries, running safety briefings, and trying to keep the programme on track, the last thing you want is to spend your evenings writing up reports that nobody reads properly anyway. AI tools can take a serious chunk out of that paperwork burden and give you back time for what actually matters — running the job.

This guide covers the practical ways site managers are using AI right now.

DAILY SITE REPORTS AND DIARIES

This is where most site managers start with AI, and for good reason. Instead of spending 30 to 45 minutes at the end of a long day writing up your site diary, you can dictate rough notes into your phone — weather, labour numbers, what trades were on site, what got done, any issues — and then paste those notes into ChatGPT or Claude with a simple prompt: "Turn these rough site notes into a professional daily site diary for a construction project."

The AI will organise your notes into a clean, structured report with proper headings, complete sentences, and professional language. You review it, make any corrections, and you are done in ten minutes instead of forty. Over a five-day week, that is over two hours saved on site diaries alone.

For weekly and monthly progress reports, the time savings are even greater. You can feed in a week''s worth of daily notes and ask the AI to produce a consolidated weekly progress report covering work completed, upcoming activities, issues, and programme status.

SAFETY DOCUMENTATION

Every site manager knows the volume of safety paperwork that modern construction demands. Method statements, risk assessments, toolbox talk records, permit-to-work documentation — it never ends. AI can help you generate first drafts of all of these.

For toolbox talks, you might prompt: "Write a 5-minute toolbox talk on working at height for a residential construction site. Cover the main risks, control measures, and what to do if conditions change. Keep the language simple and practical for site operatives." The AI produces a structured briefing that you can review, adjust for your specific site conditions, and deliver to your team.

For method statements and RAMS, AI can generate a comprehensive first draft from a description of the activity. You still need to review it against actual site conditions and ensure it reflects the real risks, but starting from a structured draft is far faster than starting from scratch.

QUALITY MANAGEMENT

Snagging lists, inspection checklists, and non-conformance reports all follow predictable formats. AI is excellent at generating these templates and at turning rough inspection notes into formal NCR documents.

You can describe a defect you have identified — "Blockwork in stairwell core on level 3 is out of plumb by 15mm over 2.4m height, exceeding the 10mm tolerance specified in the contract" — and ask the AI to draft a formal non-conformance report. It will produce a structured document with the defect description, reference to the specification, required corrective action, and a follow-up inspection requirement.

TEAM COORDINATION AND COMMUNICATION

AI can help you prepare for coordination meetings by generating agendas from your notes, drafting meeting minutes from rough bullet points, and producing subcontractor coordination schedules. It is also useful for drafting site induction materials, producing look-ahead programmes in written format, and writing professional emails to subcontractors about programme, quality, or safety issues.

A prompt like "Write a firm but professional email to a brickwork subcontractor who is two weeks behind programme, requesting a recovery plan within 5 working days" takes the AI about ten seconds and saves you the mental energy of crafting diplomatic language when you are frustrated.

GETTING STARTED

If you are new to AI, start with one tool — ChatGPT or Claude — and try these three workflows in your first week:

1. Paste your rough daily notes and ask it to write a professional site diary
2. Ask it to generate a toolbox talk on a topic relevant to your current works
3. Give it the details of a defect and ask it to draft a non-conformance report

Once you see how much time these three tasks save, you will quickly find other ways to use AI across your daily routine. The site managers getting the most from AI are not tech experts — they are practical people who spotted an opportunity to work smarter.',
  'beginner',
  9,
  'published',
  true,
  7
),
(
  'AI for Construction Procurement',
  'ai-for-construction-procurement',
  'Speed up procurement with AI — from writing scope documents to evaluating supplier returns and managing procurement schedules.',
  'Procurement timelines have a direct impact on construction programmes. A late subcontract award or a delayed material order can push back an entire sequence of works, and the knock-on effects ripple through the project. Yet procurement documentation — scope of works, pre-qualification questionnaires, tender analyses, and recommendation reports — is often produced under intense time pressure. AI tools can significantly accelerate this process without sacrificing quality.

This guide covers how AI can support construction procurement from scope definition through to order placement.

SCOPE OF WORKS DOCUMENTS

A clear, comprehensive scope of works is the foundation of any good subcontract or supply order. Ambiguity in the scope leads to disputes, variations, and misaligned expectations. AI can help you draft thorough scope documents by generating structured content from your brief description of the required works.

For example, you might prompt: "Draft a scope of works for a brickwork subcontract package on a 120-unit residential development. Include facing brickwork, blockwork, movement joints, cavity insulation, lintels, DPCs, and all associated sundries. The subcontractor is to allow for their own scaffolding and to coordinate with the window installer." The AI will produce a detailed scope with inclusions, exclusions, specification references, and programme requirements that you can refine to match your project.

The key advantage is completeness. AI tends to produce comprehensive scopes that cover items you might forget when drafting under pressure — things like waste removal, protection of completed work, or coordination with following trades.

PRE-QUALIFICATION QUESTIONNAIRES

When you need to pre-qualify subcontractors or suppliers, AI can generate PQQ templates tailored to your specific requirements. It can also help evaluate returned PQQs by summarising key information, flagging gaps or concerns, and producing comparison tables.

A useful prompt pattern is: "Create a pre-qualification questionnaire for a mechanical services subcontractor on a commercial office development valued at 2.5 million pounds. Include sections on financial standing, relevant experience, health and safety record, quality management, and resource availability." This gives you a structured starting point that covers the standard assessment criteria.

TENDER EVALUATION

Comparing tender returns is one of the most time-consuming procurement tasks, especially on large packages with multiple bidders. AI can help you structure the evaluation process and produce clear recommendation reports.

You can input the key commercial data from each tender — lump sum prices, provisional sums, daywork rates, programme durations, qualifications, and exclusions — and ask AI to produce a tender comparison summary highlighting the key differences. It is particularly good at identifying qualifications and exclusions that might represent hidden costs.

For the recommendation report, AI can draft a structured document that covers the evaluation criteria, a summary of each tender, the commercial and technical assessment, identified risks, and a clear recommendation. This is the kind of report that might take a procurement manager half a day to write from scratch but can be drafted by AI in minutes and refined in an hour.

PROCUREMENT SCHEDULING

Managing procurement lead times is critical to programme delivery. AI can help you structure procurement schedules by taking your list of packages and generating a tracker with key dates: scope issue date, tender return date, evaluation period, approval date, order date, and expected delivery or start on site.

While AI cannot know the specific lead times for your project, it can generate a comprehensive template and help you think through the sequencing. It can also draft chasing emails and follow-up correspondence when suppliers or subcontractors are slow to respond.

SUPPLIER COMMUNICATION

Professional procurement correspondence — tender invitations, order confirmations, tender queries, and clarification requests — all follow standard formats. AI can draft these quickly and consistently. Whether you need to write a polite but firm letter chasing a late tender return or a detailed set of tender queries seeking clarification on pricing assumptions, AI produces professional correspondence that maintains good supplier relationships while protecting your commercial position.

The procurement professionals getting the most from AI treat it as a drafting accelerator. They still apply their commercial judgement to every decision, but they spend far less time on the mechanics of document production.',
  'intermediate',
  10,
  'published',
  false,
  8
),
(
  'AI for Health & Safety Documentation in Construction',
  'ai-for-health-and-safety-documentation',
  'Generate RAMS, method statements, toolbox talks, CDM documentation, and safety audit reports faster with AI assistance.',
  'Construction generates more health and safety documentation than almost any other industry. Between risk assessments, method statements, RAMS packages, toolbox talk records, CDM documentation, safety inspection reports, and incident investigations, the paperwork demands on site teams and safety professionals are enormous. AI tools can help produce this documentation faster — but it is essential to understand that AI assists with drafting, it does not replace the competent person who must review and approve every safety document.

This guide covers the key areas where AI can support H&S documentation under the UK regulatory framework, particularly the CDM 2015 Regulations.

METHOD STATEMENTS AND RAMS

Risk Assessment Method Statements are the backbone of safe systems of work on construction sites. Every significant activity needs a RAMS package before work begins, and producing these documents from scratch is time-consuming.

AI can generate a comprehensive first draft from a description of the planned activity. For example: "Generate a risk assessment and method statement for installing precast concrete staircases using a tower crane on a multi-storey residential project. Include risks related to crane operations, working at height, manual handling, and coordination with other trades."

The AI will produce a structured document with a step-by-step method, identified hazards, risk ratings, and control measures. This gives the site team a solid foundation to work from. The critical step is review — a competent person must check the RAMS against actual site conditions, the specific equipment being used, the operatives involved, and any site-specific constraints that the AI could not know about.

TOOLBOX TALKS

Weekly toolbox talks are a legal and practical necessity on construction sites, but writing fresh, engaging content every week is a challenge. AI excels at generating toolbox talk scripts on specific topics, tailored to the language level of site operatives.

Effective prompts include the topic, the type of site, and any specific hazards to emphasise: "Write a 5-minute toolbox talk on manual handling for a groundworks team carrying out drainage installation. Focus on practical techniques for handling pipes, working in trenches, and knowing when to use mechanical aids instead of manual lifting."

The output is a ready-to-deliver briefing that covers the key points, asks engagement questions, and reinforces the core safety messages. Over time, you can build a library of AI-generated toolbox talks that cover your annual programme of safety topics.

CDM DOCUMENTATION

The Construction (Design and Management) Regulations 2015 place specific documentation requirements on clients, principal designers, and principal contractors. The principal contractor must produce a construction phase plan before work begins, and the client must ensure pre-construction information is provided.

AI can help structure these documents. You can prompt it to generate a construction phase plan template covering the management arrangements, site rules, welfare provisions, fire and emergency procedures, and arrangements for controlling significant site risks. Similarly, AI can help compile pre-construction information packs by generating structured templates that prompt you to include all the information required under CDM Regulation 4.

These are framework documents that absolutely must be populated with project-specific information by competent professionals, but AI provides the structure and standard content much faster than building from a blank document.

INCIDENT REPORTING AND INVESTIGATION

When incidents occur, there is pressure to produce thorough investigation reports quickly. AI can help structure investigation reports using recognised methodologies. You can describe what happened and ask the AI to structure an investigation report covering the incident description, immediate causes, underlying causes, root causes, and recommended corrective actions.

AI is also useful for trend analysis. If you feed in a summary of near-miss reports from the past month, it can identify patterns and suggest targeted interventions — for example, highlighting that a disproportionate number of near misses relate to a particular trade or a specific area of the site.

IMPORTANT CAVEATS

These points cannot be overstated:

First, every AI-generated health and safety document must be reviewed by a competent person before it is issued or used on site. Under CDM 2015, the duty holder retains legal responsibility regardless of how the document was produced.

Second, AI does not know your site conditions. It cannot see the overhead power lines near your crane, the contaminated ground on your site, or the inexperienced operatives on your team. Site-specific conditions must always be assessed and incorporated by someone who knows the project.

Third, AI-generated RAMS and method statements are starting points, not finished products. They provide structure and coverage, but they require professional review to ensure they are accurate, practical, and legally compliant.

Used properly, AI can halve the time spent drafting H&S documentation while maintaining quality. Used improperly — without competent review — it creates a dangerous illusion of compliance. Treat AI as your drafting assistant, not your safety advisor.',
  'beginner',
  8,
  'published',
  false,
  9
),
(
  'How to Use AI with BIM Workflows',
  'ai-for-bim-workflows',
  'Explore how AI enhances BIM coordination, clash detection documentation, model audits, and design-to-construction handover.',
  'Building Information Modelling has transformed how construction projects are designed, coordinated, and delivered. As AI capabilities advance, the intersection of AI and BIM is creating new opportunities to automate documentation, improve coordination, and streamline information management throughout the project lifecycle. While some of these applications are mature and others are still emerging, understanding where AI fits into BIM workflows today will help you prepare for where the industry is heading.

This guide covers the practical ways AI can enhance BIM processes, with reference to ISO 19650 as the international standard for information management using BIM.

BIM EXECUTION PLANS

A BIM Execution Plan (BEP) is a fundamental document on any BIM-enabled project, setting out the information management processes, standards, and responsibilities. Under ISO 19650, the appointed party prepares a BEP in response to the Exchange Information Requirements (EIR) or Asset Information Requirements (AIR).

AI can help draft BEPs by generating structured documents that cover all the required sections: project information, standards and procedures, modelling conventions, information exchanges, collaboration processes, and quality assurance methods. You can prompt: "Draft a BIM Execution Plan for a new-build secondary school project using ISO 19650 conventions. The project is at RIBA Stage 3, the common data environment is Autodesk Construction Cloud, and the lead appointed party is an architectural practice." The AI will produce a comprehensive framework document that the BIM manager can then populate with project-specific details.

This is particularly valuable for smaller practices that may not have extensive BEP templates, or for teams responding to multiple tenders simultaneously who need to produce tailored BEPs efficiently.

CLASH DETECTION AND RESOLUTION

Clash detection is one of the most labour-intensive aspects of BIM coordination. Tools like Navisworks and Solibri identify thousands of clashes between disciplines, but documenting, prioritising, and tracking the resolution of those clashes requires significant manual effort.

AI can assist in several ways. After running a clash detection report, you can feed the summary data into an AI tool and ask it to categorise the clashes by severity, discipline responsibility, and resolution priority. AI can draft clash resolution meeting agendas that organise clashes by area or discipline, and it can produce meeting minutes that record decisions and assign actions.

For clash reports, AI can take raw clash data and produce professional documentation that clearly describes each clash, identifies the responsible parties, and recommends resolution approaches. This turns what might be a spreadsheet of coordinates and element IDs into a readable report that the design team can act on.

MODEL AUDIT REPORTS

Quality assurance of BIM models is essential but often inconsistent. AI can help structure model audit reports that follow a standard format, covering naming conventions, classification compliance, level of information need, georeferencing accuracy, and data completeness.

You can describe the findings of a model review — "The structural model has 47 elements with missing classification codes, the ceiling heights on Level 2 do not match the architectural model, and the fire rating data is incomplete for the corridor walls" — and ask the AI to draft a formal model audit report with findings, non-conformances, and required actions. The output is a professional document that drives accountability and improvement.

AI FOR DESIGN COORDINATION

Beyond clash detection, AI can support the broader design coordination process. This includes drafting RFI documents based on identified coordination issues, producing design review reports that summarise comments from multiple stakeholders, and generating coordination tracker updates.

For RFI management specifically, AI can draft clear, well-structured RFIs from brief descriptions of the issue: "There is a conflict between the structural beam at gridline C-7 on Level 4 and the mechanical ductwork routing shown on the MEP coordination drawing. The beam soffit is at 3100mm and the duct requires 400mm clearance below." The AI produces a formal RFI with the issue description, reference drawings, and a request for design resolution — saving the coordinator time on every submission.

INFORMATION HANDOVER AND O&M DOCUMENTATION

One of the greatest promises of BIM is the structured handover of information at project completion. Under ISO 19650, the project information model feeds into the asset information model, providing the client or facilities management team with organised, accessible data about the building.

AI can help structure Operation and Maintenance manuals by generating templates that cover all building systems, organising manufacturer data, and producing user-friendly summaries from technical specifications. It can also assist with COBie (Construction Operations Building Information Exchange) documentation by helping to format and validate data exports.

For handover packs, AI can draft structured documents that cover as-built information, warranty details, maintenance schedules, and operating instructions — pulling together the various data sources into a coherent, client-facing package.

THE ROAD AHEAD

The integration of AI and BIM is still in its early stages. Current AI tools are strongest at helping with the documentation that surrounds BIM processes rather than working directly within models. However, this is changing rapidly. Autodesk, Bentley, and other platform providers are embedding AI capabilities directly into their tools — from generative design options to predictive analytics based on model data.

For construction professionals working with BIM today, the practical advice is this: start using AI for the documentation tasks that sit alongside your BIM workflows. Draft your BEPs, clash reports, and model audit reports with AI assistance. As the technology matures, AI will move deeper into the modelling process itself. The professionals who are comfortable using AI for BIM documentation today will be best positioned to adopt those more advanced capabilities as they arrive.',
  'advanced',
  12,
  'published',
  false,
  10
);
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
