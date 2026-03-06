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
