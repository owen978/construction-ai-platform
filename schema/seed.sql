-- ============================================================
-- Construction AI Platform — Schema Fix + Seed Data
-- Run this ENTIRE script in Supabase SQL Editor
-- ============================================================
-- This will:
-- 1. Drop existing tables (they're empty anyway)
-- 2. Recreate with the correct schema
-- 3. Insert seed data so the site looks populated
-- ============================================================

-- Drop in reverse dependency order
DROP TABLE IF EXISTS role_tasks CASCADE;
DROP TABLE IF EXISTS content_posts CASCADE;
DROP TABLE IF EXISTS prompts CASCADE;
DROP TABLE IF EXISTS workflows CASCADE;
DROP TABLE IF EXISTS guides CASCADE;
DROP TABLE IF EXISTS tools CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

-- ============================================================
-- RECREATE TABLES WITH CORRECT SCHEMA
-- ============================================================

CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  meta_title TEXT,
  meta_description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  meta_title TEXT,
  meta_description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  long_description TEXT,
  url TEXT,
  logo_url TEXT,
  category TEXT,
  pricing TEXT,
  meta_title TEXT,
  meta_description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  content TEXT,
  difficulty TEXT DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  reading_time_minutes INTEGER,
  icon TEXT,
  meta_title TEXT,
  meta_description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  long_description TEXT,
  prompt TEXT,
  example_output TEXT,
  use_case TEXT,
  difficulty TEXT DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  icon TEXT,
  meta_title TEXT,
  meta_description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  role_id UUID REFERENCES roles(id) ON DELETE SET NULL,
  task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
  tool_id UUID REFERENCES tools(id) ON DELETE SET NULL,
  guide_id UUID REFERENCES guides(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  prompt_text TEXT NOT NULL,
  example_output TEXT,
  category TEXT,
  meta_title TEXT,
  meta_description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE content_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  body TEXT,
  excerpt TEXT,
  platform TEXT,
  content_type TEXT,
  image_url TEXT,
  cta TEXT,
  hashtags TEXT,
  meta_title TEXT,
  meta_description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE role_tasks (
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, task_id)
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_roles_slug ON roles(slug);
CREATE INDEX idx_tasks_slug ON tasks(slug);
CREATE INDEX idx_tools_slug ON tools(slug);
CREATE INDEX idx_guides_slug ON guides(slug);
CREATE INDEX idx_workflows_slug ON workflows(slug);
CREATE INDEX idx_workflows_status ON workflows(status);
CREATE INDEX idx_workflows_role_id ON workflows(role_id);
CREATE INDEX idx_workflows_task_id ON workflows(task_id);
CREATE INDEX idx_workflows_tool_id ON workflows(tool_id);
CREATE INDEX idx_workflows_guide_id ON workflows(guide_id);
CREATE INDEX idx_prompts_slug ON prompts(slug);
CREATE INDEX idx_content_posts_slug ON content_posts(slug);
CREATE INDEX idx_content_posts_status ON content_posts(status);

-- ============================================================
-- ROW-LEVEL SECURITY
-- ============================================================

ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published roles" ON roles FOR SELECT USING (status = 'published');
CREATE POLICY "Public read published tasks" ON tasks FOR SELECT USING (status = 'published');
CREATE POLICY "Public read published tools" ON tools FOR SELECT USING (status = 'published');
CREATE POLICY "Public read published guides" ON guides FOR SELECT USING (status = 'published');
CREATE POLICY "Public read published workflows" ON workflows FOR SELECT USING (status = 'published');
CREATE POLICY "Public read published prompts" ON prompts FOR SELECT USING (status = 'published');
CREATE POLICY "Public read published content_posts" ON content_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Public read role_tasks" ON role_tasks FOR SELECT USING (true);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON roles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON tools FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON guides FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON workflows FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON prompts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON content_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- SEED DATA: ROLES (6 professional construction roles)
-- ============================================================

INSERT INTO roles (name, slug, description, icon, status, sort_order) VALUES
(
  'Quantity Surveyor',
  'quantity-surveyor',
  'AI workflows for Quantity Surveyors — automate cost plans, BOQs, valuations, and tender analysis with AI-powered prompts.',
  '📊',
  'published',
  1
),
(
  'Project Manager',
  'project-manager',
  'AI workflows for Construction Project Managers — streamline reporting, scheduling, risk management, and stakeholder communication.',
  '📋',
  'published',
  2
),
(
  'Site Manager',
  'site-manager',
  'AI workflows for Site Managers — improve daily site reports, safety documentation, quality checks, and team coordination.',
  '🏗️',
  'published',
  3
),
(
  'Estimator',
  'estimator',
  'AI workflows for Construction Estimators — speed up takeoffs, pricing, bid preparation, and cost benchmarking.',
  '🧮',
  'published',
  4
),
(
  'Construction Director',
  'construction-director',
  'AI workflows for Construction Directors — enhance strategic planning, portfolio oversight, and executive reporting.',
  '👔',
  'published',
  5
),
(
  'Design Manager',
  'design-manager',
  'AI workflows for Design Managers — coordinate design reviews, manage RFIs, and streamline design-to-construction handover.',
  '📐',
  'published',
  6
);

-- ============================================================
-- SEED DATA: TASKS (10 construction tasks)
-- ============================================================

INSERT INTO tasks (name, slug, description, icon, status, sort_order) VALUES
(
  'Cost Estimation',
  'cost-estimation',
  'Use AI to generate preliminary cost estimates, benchmark rates, and validate pricing assumptions faster.',
  '💰',
  'published',
  1
),
(
  'Project Scheduling',
  'project-scheduling',
  'Leverage AI to draft programme narratives, identify critical path risks, and optimise construction sequencing.',
  '📅',
  'published',
  2
),
(
  'Risk Assessment',
  'risk-assessment',
  'Use AI to identify project risks, generate risk registers, and draft mitigation strategies for construction projects.',
  '⚠️',
  'published',
  3
),
(
  'Progress Reporting',
  'progress-reporting',
  'Automate monthly progress reports, executive summaries, and client updates with AI-powered writing assistance.',
  '📈',
  'published',
  4
),
(
  'Tender Analysis',
  'tender-analysis',
  'Speed up tender evaluation, bid comparisons, and recommendation reports using AI analysis prompts.',
  '📑',
  'published',
  5
),
(
  'Contract Review',
  'contract-review',
  'Use AI to summarise contract clauses, identify risks in amendments, and draft contractual correspondence.',
  '📝',
  'published',
  6
),
(
  'Quality Control',
  'quality-control',
  'Generate quality inspection checklists, snag lists, and non-conformance reports with AI assistance.',
  '✅',
  'published',
  7
),
(
  'Safety Planning',
  'safety-planning',
  'Draft method statements, RAMS, toolbox talks, and safety briefings faster using AI prompts.',
  '🦺',
  'published',
  8
),
(
  'Material Takeoff',
  'material-takeoff',
  'Use AI to assist with material quantity calculations, waste factors, and procurement schedules.',
  '📦',
  'published',
  9
),
(
  'Stakeholder Communication',
  'stakeholder-communication',
  'Draft professional emails, meeting minutes, and stakeholder updates using AI writing workflows.',
  '💬',
  'published',
  10
);

-- ============================================================
-- SEED DATA: TOOLS (6 AI tools)
-- ============================================================

INSERT INTO tools (name, slug, description, long_description, url, category, pricing, status, featured, sort_order) VALUES
(
  'ChatGPT',
  'chatgpt',
  'OpenAI''s conversational AI assistant. Ideal for drafting reports, analysing data, and generating construction documentation.',
  'ChatGPT is one of the most widely used AI assistants in the construction industry. It excels at drafting professional correspondence, summarising lengthy documents, generating cost breakdowns, and helping construction professionals save hours on repetitive writing tasks. The GPT-4 model offers advanced reasoning capabilities that make it particularly useful for complex construction scenarios like contract analysis and risk assessment.',
  'https://chat.openai.com',
  'AI Assistant',
  'Free / Plus $20/mo',
  'published',
  true,
  1
),
(
  'Claude',
  'claude',
  'Anthropic''s AI assistant known for careful analysis and long document processing. Great for contract review and detailed reports.',
  'Claude by Anthropic is particularly strong at processing and analysing long documents — making it ideal for construction professionals who need to review contracts, specifications, and lengthy tender documents. Claude''s careful, nuanced approach to analysis makes it well-suited for tasks like risk assessment, contract clause identification, and generating detailed project narratives.',
  'https://claude.ai',
  'AI Assistant',
  'Free / Pro $20/mo',
  'published',
  true,
  2
),
(
  'Google Gemini',
  'google-gemini',
  'Google''s AI assistant integrated with Google Workspace. Seamless for teams already using Google Docs and Sheets.',
  'Google Gemini integrates directly with Google Workspace, making it a natural choice for construction teams that use Google Docs, Sheets, and Slides. It can help generate project reports directly in your documents, analyse spreadsheet data, and create presentation materials for client meetings. Its multimodal capabilities allow you to analyse images of site conditions or drawings.',
  'https://gemini.google.com',
  'AI Assistant',
  'Free / One AI Premium',
  'published',
  true,
  3
),
(
  'Microsoft Copilot',
  'microsoft-copilot',
  'AI built into Microsoft 365. Perfect for construction firms using Word, Excel, PowerPoint, and Teams.',
  'Microsoft Copilot is embedded throughout Microsoft 365, making it incredibly powerful for construction companies that rely on Word for specifications, Excel for cost tracking, PowerPoint for client presentations, and Teams for communication. It can draft documents, create formulas, summarise meeting transcripts, and generate reports without leaving the tools you already use daily.',
  'https://copilot.microsoft.com',
  'AI Assistant',
  'Included with M365 Copilot',
  'published',
  true,
  4
),
(
  'Perplexity',
  'perplexity',
  'AI-powered research engine. Ideal for market research, material pricing checks, and regulation lookups.',
  'Perplexity combines AI with real-time web search, making it invaluable for construction professionals who need to research current material prices, look up building regulations, check industry standards, or find the latest guidance on construction legislation. Unlike other AI tools, Perplexity provides sources for its claims, which is essential for professional construction documentation.',
  'https://perplexity.ai',
  'AI Research',
  'Free / Pro $20/mo',
  'published',
  false,
  5
),
(
  'Notion AI',
  'notion-ai',
  'AI writing and organisation built into Notion. Great for project wikis, documentation, and team knowledge bases.',
  'Notion AI is built into the Notion workspace platform, making it ideal for construction teams that use Notion for project documentation, knowledge bases, and team collaboration. It can generate meeting agendas, summarise project notes, create templates, and help organise the vast amount of documentation that construction projects generate.',
  'https://notion.so',
  'AI Workspace',
  'Add-on $10/member/mo',
  'published',
  false,
  6
);

-- ============================================================
-- SEED DATA: GUIDES (5 construction AI guides)
-- ============================================================

INSERT INTO guides (title, slug, description, content, difficulty, reading_time_minutes, status, featured, sort_order) VALUES
(
  'Getting Started with AI in Construction',
  'getting-started-with-ai-in-construction',
  'A beginner-friendly introduction to using AI tools in your daily construction workflows. Learn the basics and start saving time today.',
  'Artificial intelligence is transforming how construction professionals work. Whether you''re a Quantity Surveyor preparing cost plans or a Project Manager writing progress reports, AI tools can help you work faster and more accurately.

This guide covers the fundamentals you need to get started:

1. CHOOSING THE RIGHT AI TOOL

Not all AI tools are created equal. For construction professionals, we recommend starting with:
- ChatGPT or Claude for general writing and analysis tasks
- Microsoft Copilot if your company uses Microsoft 365
- Google Gemini if your team uses Google Workspace

2. WRITING EFFECTIVE PROMPTS

The quality of AI output depends entirely on the quality of your input. When writing prompts for construction tasks:
- Be specific about your role and context
- Provide relevant project details (type, value, stage)
- Specify the format you want (table, bullet points, formal letter)
- Include any constraints or standards that apply

3. COMMON USE CASES

The most impactful AI use cases in construction include:
- Drafting progress reports and client updates
- Generating cost estimate breakdowns
- Creating risk registers and mitigation plans
- Writing professional correspondence
- Summarising lengthy contract documents
- Preparing method statements and RAMS

4. BEST PRACTICES

- Always review and verify AI-generated content
- Don''t share confidential project data with public AI tools
- Use AI as a starting point, not a final product
- Keep learning — AI tools improve rapidly',
  'beginner',
  8,
  'published',
  true,
  1
),
(
  'How to Write Effective AI Prompts for Construction',
  'effective-ai-prompts-for-construction',
  'Master the art of prompt engineering for construction tasks. Learn frameworks and techniques to get better results from AI tools.',
  'The difference between a mediocre AI output and an excellent one comes down to how you write your prompt. This guide teaches you frameworks specifically designed for construction professionals.

THE ROLE-CONTEXT-TASK FRAMEWORK

The most effective prompt structure for construction tasks:

Role: "You are an experienced Quantity Surveyor working on a UK commercial construction project..."
Context: "The project is a 10,000 sqm office fit-out valued at £4.5M. We are at RIBA Stage 4..."
Task: "Generate a preliminary cost plan breakdown with elemental costs using BCIS rates..."
Format: "Present this as a table with columns for Element, Quantity, Rate, and Total..."

ADVANCED TECHNIQUES

1. Chain of Thought: Ask the AI to "think step by step" before producing output
2. Few-Shot Examples: Provide an example of what good output looks like
3. Iterative Refinement: Start broad, then ask follow-up questions to refine
4. Role Stacking: Combine multiple perspectives ("As both a QS and risk assessor...")

COMMON MISTAKES TO AVOID

- Being too vague ("write me a report")
- Not specifying the audience or formality level
- Forgetting to mention relevant standards (NRM, NEC, JCT)
- Not reviewing output for accuracy before using it',
  'intermediate',
  10,
  'published',
  true,
  2
),
(
  'AI for Cost Estimation: A Complete Guide',
  'ai-for-cost-estimation',
  'How to use AI tools to speed up cost estimation, from preliminary budgets to detailed BOQs. Practical workflows for QS and Estimator roles.',
  'Cost estimation is one of the most time-consuming tasks in construction — and one where AI can deliver the biggest time savings. This guide walks through practical ways to use AI at every stage of the cost estimation process.

PRELIMINARY ESTIMATES

At the early feasibility stage, AI can help you:
- Generate order-of-magnitude estimates based on project parameters
- Benchmark costs against similar project types
- Identify key cost drivers for different building types
- Draft cost reports for client presentations

ELEMENTAL COST PLANS

When preparing elemental cost plans, use AI to:
- Break down costs by building element (substructure, superstructure, finishes, etc.)
- Apply appropriate rates from BCIS or your internal database
- Calculate preliminary quantities from basic project dimensions
- Generate narratives explaining cost assumptions and exclusions

BILL OF QUANTITIES

For detailed BOQ preparation, AI can assist with:
- Structuring bill items according to NRM2
- Writing item descriptions in standard measurement format
- Checking quantities for reasonableness
- Identifying commonly missed items

IMPORTANT CAVEATS

AI should never replace professional judgement in cost estimation. Always:
- Verify rates against current market data
- Review quantities against actual drawings
- Apply your knowledge of local market conditions
- Get senior review on significant estimates',
  'intermediate',
  12,
  'published',
  true,
  3
),
(
  'Using AI to Speed Up Progress Reports',
  'ai-for-progress-reports',
  'Save hours every month on progress reporting. Learn how to use AI to draft monthly reports, executive summaries, and client updates.',
  'Monthly progress reports are a necessary but time-consuming part of construction project management. AI can cut your reporting time significantly while improving consistency and quality.

THE MONTHLY REPORT WORKFLOW

Step 1: Gather Your Data
Before using AI, collect your raw inputs:
- Programme update (% complete, key milestones)
- Financial summary (spend vs budget)
- Key issues and risks
- Photos (optional but recommended)

Step 2: Use AI to Draft Sections
Feed your raw data into an AI tool with a structured prompt. For example:
"Draft a monthly progress report section for a £12M residential project. Current status: 45% complete, 2 weeks behind programme due to steel delivery delays. Budget tracking at 98% of forecast. Key risks: subcontractor capacity for M&E works."

Step 3: Review and Personalise
AI gives you a solid first draft. You then:
- Add project-specific context the AI wouldn''t know
- Adjust tone for your specific client
- Verify all facts and figures
- Add your professional recommendations

EXECUTIVE SUMMARY TECHNIQUE

The executive summary is the most-read section. Use AI to create a concise, impactful summary by prompting:
"Summarise this progress report into a 3-paragraph executive summary suitable for a client board meeting. Focus on: overall status, key risks, and recommended actions."

This approach typically saves 2-3 hours per monthly report cycle.',
  'beginner',
  6,
  'published',
  false,
  4
),
(
  'AI-Powered Risk Assessment for Construction Projects',
  'ai-risk-assessment-construction',
  'Learn how to use AI to identify risks, create risk registers, and develop mitigation strategies for construction projects.',
  'Risk management is critical to successful construction delivery. AI tools can help you identify risks you might miss and structure your risk management approach more systematically.

RISK IDENTIFICATION

AI excels at generating comprehensive risk lists because it can draw on patterns from thousands of projects. Use prompts like:
"Identify the top 20 risks for a new-build secondary school project in the UK, value £8M, starting on site in January. Consider: design, procurement, construction, commercial, and programme risks."

RISK REGISTER GENERATION

Once you have identified risks, AI can help structure them into a formal register:
"Create a risk register table with columns for: Risk ID, Category, Description, Likelihood (1-5), Impact (1-5), Risk Score, Owner, Mitigation Strategy, and Status. Populate with the following risks..."

MITIGATION STRATEGIES

AI is particularly useful for drafting mitigation strategies:
"For each of the following construction risks, suggest 2-3 practical mitigation measures that a Project Manager could implement..."

QUANTITATIVE RISK ANALYSIS

For more advanced applications, AI can help with:
- Monte Carlo simulation input preparation
- Sensitivity analysis narratives
- Risk-adjusted programme analysis
- Contingency calculation methodologies

BEST PRACTICES

- Use AI-generated risk lists as a starting point, then review with your project team
- Always validate risks against your specific project conditions
- Update risk registers regularly — AI can help draft update narratives
- Combine AI analysis with professional experience for best results',
  'advanced',
  9,
  'published',
  false,
  5
);

-- ============================================================
-- SEED DATA: WORKFLOWS (15 construction AI workflows)
-- ============================================================

-- We need to reference role/task/tool/guide IDs, so we use subqueries

INSERT INTO workflows (title, slug, description, long_description, prompt, example_output, use_case, difficulty, icon, status, featured, sort_order, role_id, task_id, tool_id, guide_id) VALUES

-- WORKFLOW 1: Cost Plan Generator (QS + Cost Estimation + ChatGPT)
(
  'Generate a Preliminary Cost Plan',
  'generate-preliminary-cost-plan',
  'Quickly generate a structured elemental cost plan for early-stage construction projects using AI.',
  'This workflow helps Quantity Surveyors create preliminary cost plans at RIBA Stage 2-3. It generates an elemental breakdown using standard categories, allowing you to quickly produce a first draft cost plan that can then be refined with project-specific rates and quantities.',
  'You are an experienced UK Quantity Surveyor. Generate a preliminary elemental cost plan for the following project:

Project: [PROJECT TYPE, e.g., New-build secondary school]
Location: [LOCATION, e.g., Greater Manchester]
Gross Internal Floor Area: [GIFA, e.g., 8,500 sqm]
Storeys: [NUMBER, e.g., 3]
Construction Start: [DATE, e.g., Q2 2025]
Budget Envelope: [BUDGET, e.g., £18M]

Present the cost plan as a table with columns:
- Element (using NRM1 categories)
- £/sqm Rate
- Total Cost
- % of Total

Include: Facilitating Works, Substructure, Superstructure, Internal Finishes, Fittings & Furnishings, Services, External Works, Preliminaries, Overheads & Profit, and a Contingency allowance.

Add brief notes explaining key assumptions and exclusions.',
  'PRELIMINARY COST PLAN — New-Build Secondary School
Location: Greater Manchester | GIFA: 8,500 sqm | 3 Storeys

| Element                      | £/sqm  | Total        | % of Total |
|------------------------------|--------|--------------|------------|
| 0 Facilitating Works         | £35    | £297,500     | 1.7%       |
| 1 Substructure               | £145   | £1,232,500   | 7.0%       |
| 2 Superstructure             | £485   | £4,122,500   | 23.4%      |
| 3 Internal Finishes          | £165   | £1,402,500   | 8.0%       |
| 4 Fittings & Furnishings     | £95    | £807,500     | 4.6%       |
| 5 Services                   | £420   | £3,570,000   | 20.3%      |
| 6 External Works             | £110   | £935,000     | 5.3%       |
| 7 Preliminaries (14%)        | £204   | £1,731,300   | 9.8%       |
| 8 OH&P (6%)                  | £99    | £845,850     | 4.8%       |
| 9 Design Risk Contingency    | £105   | £892,500     | 5.1%       |
| 10 Construction Contingency  | £105   | £892,500     | 5.1%       |
| TOTAL                        | £1,968 | £16,730,150  | 95.2%      |

Assumptions:
- Rates based on BCIS median for secondary schools in NW England, Q1 2025
- Excludes: VAT, professional fees, land costs, Section 106 contributions
- Includes for enhanced acoustic and ventilation requirements',
  'Use this at RIBA Stage 2 or Stage 3 when you need to produce a quick cost plan for client budget discussions. Replace the placeholder values with your actual project details.',
  'intermediate',
  '💰',
  'published',
  true,
  1,
  (SELECT id FROM roles WHERE slug = 'quantity-surveyor'),
  (SELECT id FROM tasks WHERE slug = 'cost-estimation'),
  (SELECT id FROM tools WHERE slug = 'chatgpt'),
  (SELECT id FROM guides WHERE slug = 'ai-for-cost-estimation')
),

-- WORKFLOW 2: Monthly Progress Report (PM + Progress Reporting + Claude)
(
  'Draft a Monthly Progress Report',
  'draft-monthly-progress-report',
  'Generate a professional monthly progress report from your raw project data in minutes instead of hours.',
  'This workflow transforms your raw monthly data into a polished progress report suitable for client distribution. It covers programme status, financial summary, key issues, and next period lookahead.',
  'You are a Construction Project Manager writing a formal monthly progress report for a client. Using the following raw project data, draft a professional Monthly Progress Report:

Project Name: [NAME]
Report Period: [MONTH/YEAR]
Contract Value: [VALUE]
Programme Status: [% complete, days ahead/behind]
Financial Status: [Spend to date vs forecast]
Key Activities This Period: [LIST]
Key Issues: [LIST]
Risks: [LIST]
Next Period Planned Activities: [LIST]
Health & Safety: [Incidents, near-misses, observations]

Structure the report with these sections:
1. Executive Summary (3 paragraphs max)
2. Programme Update
3. Financial Summary
4. Key Issues & Risks
5. Health, Safety & Environment
6. Quality
7. Lookahead — Next Period
8. Photographs (placeholder)

Use professional, formal tone appropriate for a client board pack.',
  NULL,
  'Run this workflow at the end of each month. Paste in your raw project data and the AI generates a structured first draft. Review, adjust the tone and details, then issue to the client. Typically saves 2-3 hours per report.',
  'beginner',
  '📋',
  'published',
  true,
  2,
  (SELECT id FROM roles WHERE slug = 'project-manager'),
  (SELECT id FROM tasks WHERE slug = 'progress-reporting'),
  (SELECT id FROM tools WHERE slug = 'claude'),
  (SELECT id FROM guides WHERE slug = 'ai-for-progress-reports')
),

-- WORKFLOW 3: Risk Register Generator (PM + Risk Assessment + ChatGPT)
(
  'Generate a Project Risk Register',
  'generate-project-risk-register',
  'Create a comprehensive risk register with likelihood, impact scores, and mitigation strategies for your construction project.',
  'This workflow generates a structured risk register tailored to your specific project type, value, and stage. It identifies risks across all key categories and provides practical mitigation measures.',
  'You are a senior Construction Project Manager. Generate a comprehensive risk register for the following project:

Project Type: [TYPE, e.g., Commercial office fit-out]
Contract Value: [VALUE, e.g., £4.2M]
Contract Form: [FORM, e.g., JCT Design & Build 2016]
Current Stage: [STAGE, e.g., Pre-construction]
Duration: [DURATION, e.g., 36 weeks]
Key Constraints: [LIST any specific constraints]

Create a risk register table with columns:
- Risk ID (R001, R002, etc.)
- Category (Design / Procurement / Construction / Commercial / Programme / H&S)
- Risk Description
- Likelihood (1-5, where 5 = Almost Certain)
- Impact (1-5, where 5 = Catastrophic)
- Risk Score (L × I)
- Risk Owner
- Mitigation Strategy
- Status (Open)

Identify at least 15 risks. Sort by Risk Score (highest first). Focus on realistic, project-specific risks rather than generic ones.',
  NULL,
  'Use at project kick-off or during pre-construction planning. Update the register monthly by feeding the current register back to AI with a prompt asking it to "review and suggest any new risks based on the current project stage."',
  'intermediate',
  '⚠️',
  'published',
  true,
  3,
  (SELECT id FROM roles WHERE slug = 'project-manager'),
  (SELECT id FROM tasks WHERE slug = 'risk-assessment'),
  (SELECT id FROM tools WHERE slug = 'chatgpt'),
  (SELECT id FROM guides WHERE slug = 'ai-risk-assessment-construction')
),

-- WORKFLOW 4: Tender Evaluation Report (QS + Tender Analysis + Claude)
(
  'Analyse and Compare Tender Returns',
  'analyse-tender-returns',
  'Evaluate multiple tender submissions and generate a structured recommendation report for your client.',
  'This workflow helps Quantity Surveyors analyse tender returns systematically. It compares bids across price, programme, experience, and risk factors, then generates a recommendation report.',
  'You are an experienced Quantity Surveyor evaluating tender returns. Analyse the following tender submissions and produce a Tender Evaluation Report:

Project: [PROJECT NAME]
Tender Package: [PACKAGE, e.g., M&E Installation]
Pre-Tender Estimate: [PTE, e.g., £1.8M]
Number of Returns: [NUMBER]

Tenderer Details:
- Tenderer A: [Name] — Price: [£X], Programme: [X weeks], Qualifications: [list any]
- Tenderer B: [Name] — Price: [£X], Programme: [X weeks], Qualifications: [list any]
- Tenderer C: [Name] — Price: [£X], Programme: [X weeks], Qualifications: [list any]

Produce a report with:
1. Tender Summary Table (ranked by price)
2. Arithmetic Check Notes
3. Qualifications & Exclusions Analysis
4. Commercial Risk Assessment for each tenderer
5. Programme Comparison
6. Recommendation with clear justification

Use professional QS language. Highlight any tenderer qualifications that present commercial risk.',
  NULL,
  'Use when you receive tender returns and need to prepare a recommendation report for the client or project team. Paste in the key data from each submission.',
  'advanced',
  '📑',
  'published',
  true,
  4,
  (SELECT id FROM roles WHERE slug = 'quantity-surveyor'),
  (SELECT id FROM tasks WHERE slug = 'tender-analysis'),
  (SELECT id FROM tools WHERE slug = 'claude'),
  NULL
),

-- WORKFLOW 5: Site Daily Report (Site Manager + Progress Reporting + ChatGPT)
(
  'Write a Daily Site Report',
  'write-daily-site-report',
  'Turn your rough site notes into a professional daily report covering weather, labour, activities, and issues.',
  'Site Managers often spend 30+ minutes at the end of each day writing up site reports. This workflow turns your quick bullet points into a properly formatted daily diary entry.',
  'You are a Construction Site Manager. Convert the following rough notes into a formal Daily Site Report:

Date: [DATE]
Weather: [CONDITIONS, e.g., Overcast, light rain AM, dry PM, 8°C]
Site Hours: [HOURS, e.g., 07:30 - 17:00]

Labour on Site:
[LIST contractors and headcount, e.g.,
- Main contractor: 6 operatives
- Steelwork subcontractor: 4
- Groundworks: 8]

Activities Completed:
[BULLET POINTS of what happened today]

Issues / Delays:
[ANY problems encountered]

Deliveries:
[MATERIALS received]

Visitors:
[WHO visited site]

H&S Observations:
[ANY safety notes]

Format as a professional daily site report with clear section headings. Keep language factual and concise.',
  NULL,
  'Use at the end of each working day. Type your rough notes into the prompt (even just bullet points) and the AI formats them into a proper diary entry. Review and save to your project records.',
  'beginner',
  '🏗️',
  'published',
  true,
  5,
  (SELECT id FROM roles WHERE slug = 'site-manager'),
  (SELECT id FROM tasks WHERE slug = 'progress-reporting'),
  (SELECT id FROM tools WHERE slug = 'chatgpt'),
  NULL
),

-- WORKFLOW 6: Method Statement Generator (Site Manager + Safety Planning + Claude)
(
  'Draft a Method Statement',
  'draft-method-statement',
  'Generate a structured method statement for high-risk construction activities with step-by-step procedures and safety controls.',
  'Method statements are essential safety documents but time-consuming to write from scratch. This workflow generates a detailed first draft that you can review and adapt for your specific site conditions.',
  'You are an experienced Construction Site Manager. Draft a detailed Method Statement for the following activity:

Activity: [ACTIVITY, e.g., Structural steel erection — first floor columns and beams]
Project: [PROJECT NAME]
Location: [SPECIFIC AREA on site]
Duration: [ESTIMATED DURATION]
Key Hazards: [LIST main hazards]
Access Equipment: [LIST, e.g., MEWP, scaffolding]
Relevant Standards: [e.g., BS 5975, CDM 2015]

Include these sections:
1. Scope of Works
2. Key Personnel & Responsibilities
3. Plant & Equipment Required
4. Materials
5. Step-by-Step Procedure (numbered sequence)
6. Hazards & Control Measures (table format)
7. Emergency Procedures
8. Environmental Considerations
9. Permit Requirements
10. Sign-off Section

Ensure the method statement is practical and site-ready, not generic.',
  NULL,
  'Use when you need to prepare a method statement for a new activity. Customise the placeholder details for your specific operation. Always have the method statement reviewed by your H&S advisor before issuing.',
  'intermediate',
  '🦺',
  'published',
  false,
  6,
  (SELECT id FROM roles WHERE slug = 'site-manager'),
  (SELECT id FROM tasks WHERE slug = 'safety-planning'),
  (SELECT id FROM tools WHERE slug = 'claude'),
  NULL
),

-- WORKFLOW 7: Contract Clause Summary (QS + Contract Review + Claude)
(
  'Summarise Key Contract Clauses',
  'summarise-contract-clauses',
  'Get a plain-English summary of critical clauses in NEC, JCT, or other construction contracts.',
  'Construction contracts are complex documents. This workflow helps QS professionals quickly understand the key commercial clauses and their implications without reading every page.',
  'You are a senior Quantity Surveyor with deep knowledge of UK construction contracts. Summarise the key commercial clauses in the following contract:

Contract Form: [FORM, e.g., NEC4 Option A]
Key Details:
- Completion Date: [DATE]
- Delay Damages: [RATE, e.g., £5,000/week]
- Defects Period: [PERIOD, e.g., 52 weeks]
- Payment Terms: [TERMS, e.g., Monthly, 14-day assessment + 14-day payment]

For each of the following clause areas, provide:
1. A plain-English summary of what the clause says
2. Key commercial implications for the contractor
3. Any traps or risks to watch out for

Clause areas to cover:
- Payment mechanism & timing
- Compensation events / variations
- Delay & extension of time
- Liquidated damages
- Termination provisions
- Insurance requirements
- Limitation of liability
- Dispute resolution

Present in a clear, structured format suitable for a commercial team briefing.',
  NULL,
  'Use at contract award or during pre-construction to brief your team on key contract provisions. Also useful when reviewing contract amendments or negotiating terms.',
  'advanced',
  '📝',
  'published',
  false,
  7,
  (SELECT id FROM roles WHERE slug = 'quantity-surveyor'),
  (SELECT id FROM tasks WHERE slug = 'contract-review'),
  (SELECT id FROM tools WHERE slug = 'claude'),
  NULL
),

-- WORKFLOW 8: Executive Project Summary (Construction Director + Progress Reporting + ChatGPT)
(
  'Create an Executive Project Summary',
  'create-executive-project-summary',
  'Distil complex project data into a concise executive summary for board meetings and senior leadership reviews.',
  'Construction Directors need to review and communicate the status of multiple projects quickly. This workflow takes detailed project data and produces a high-level executive summary suitable for board presentations.',
  'You are a Construction Director preparing a portfolio review for the board. Create a concise executive summary for the following project:

Project Name: [NAME]
Client: [CLIENT]
Contract Value: [VALUE]
Current Stage: [STAGE]
Programme Status: [On track / X weeks behind / ahead]
Financial Status: [Cost vs budget summary]
Key Achievement This Period: [HIGHLIGHT]
Key Risk: [TOP RISK]
Action Required: [ANY decisions needed from the board]

Write a concise executive summary (maximum 200 words) that covers:
1. Project status at a glance (RAG rating: Red/Amber/Green)
2. Programme position
3. Commercial position
4. Key risk and mitigation
5. Recommendation or action required

Tone: Authoritative, concise, board-ready. No jargon. Focus on what matters to senior leadership.',
  NULL,
  'Use when preparing for monthly board meetings or portfolio reviews. Run this for each project in your portfolio to create consistent, professional summaries.',
  'intermediate',
  '👔',
  'published',
  false,
  8,
  (SELECT id FROM roles WHERE slug = 'construction-director'),
  (SELECT id FROM tasks WHERE slug = 'progress-reporting'),
  (SELECT id FROM tools WHERE slug = 'chatgpt'),
  NULL
),

-- WORKFLOW 9: Quality Inspection Checklist (Site Manager + Quality Control + Gemini)
(
  'Generate a Quality Inspection Checklist',
  'generate-quality-inspection-checklist',
  'Create a detailed quality inspection checklist tailored to a specific trade or building element.',
  'Quality inspection checklists ensure nothing gets missed during site inspections. This workflow generates checklists specific to the trade or element you are inspecting, saving time and improving consistency.',
  'You are a Construction Site Manager responsible for quality control. Generate a detailed quality inspection checklist for:

Trade / Element: [ELEMENT, e.g., Internal blockwork]
Project Type: [TYPE, e.g., Residential apartments]
Relevant Standards: [STANDARDS, e.g., BS EN 771, NHBC Standards Chapter 6.1]
Stage of Inspection: [STAGE, e.g., Pre-plaster check]

Create a checklist table with columns:
- Item Number
- Inspection Point
- Acceptance Criteria
- Pass / Fail / N/A
- Comments

Include at least 20 inspection points covering:
- Materials and storage
- Setting out and alignment
- Workmanship quality
- Tolerances
- DPC/DPM continuity
- Service penetrations
- Fire stopping
- Interface with other trades

Add notes on common defects to watch for in this element.',
  NULL,
  'Use before site inspections. Generate a checklist for the specific trade you are inspecting, print or use on a tablet, and complete during your walkround.',
  'beginner',
  '✅',
  'published',
  false,
  9,
  (SELECT id FROM roles WHERE slug = 'site-manager'),
  (SELECT id FROM tasks WHERE slug = 'quality-control'),
  (SELECT id FROM tools WHERE slug = 'google-gemini'),
  NULL
),

-- WORKFLOW 10: Bid Pricing Schedule (Estimator + Cost Estimation + ChatGPT)
(
  'Prepare a Bid Pricing Schedule',
  'prepare-bid-pricing-schedule',
  'Structure a competitive bid with itemised pricing, assumptions, and qualifications ready for tender submission.',
  'Estimators can use this workflow to quickly structure a bid pricing document from their calculated rates and quantities. It ensures consistent formatting and helps identify items that need clarification.',
  'You are a Construction Estimator preparing a bid submission. Structure the following pricing data into a professional Bid Pricing Schedule:

Project: [PROJECT NAME]
Client: [CLIENT]
Tender Package: [PACKAGE]
Submission Date: [DATE]
Base Date for Pricing: [DATE]

Pricing Data:
[PASTE your itemised rates and quantities]

Create a professional pricing schedule with:
1. Summary Page (major section totals)
2. Detailed Pricing Breakdown (item, quantity, unit, rate, total)
3. Preliminaries Breakdown
4. Assumptions & Qualifications
5. Exclusions
6. Programme Assumptions

Format the pricing schedule professionally. Flag any items where further information is needed from the client.',
  NULL,
  'Use during tender preparation. Input your calculated rates and quantities and the AI structures them into a professional submission format. Always review rates and totals carefully before submission.',
  'intermediate',
  '🧮',
  'published',
  false,
  10,
  (SELECT id FROM roles WHERE slug = 'estimator'),
  (SELECT id FROM tasks WHERE slug = 'cost-estimation'),
  (SELECT id FROM tools WHERE slug = 'chatgpt'),
  NULL
),

-- WORKFLOW 11: Professional Email Drafter (PM + Stakeholder Communication + Copilot)
(
  'Draft Professional Project Correspondence',
  'draft-professional-correspondence',
  'Generate professional construction emails, letters, and notices with the right tone and contractual awareness.',
  'Construction professionals send dozens of important emails each week. This workflow helps you draft professional correspondence that is clear, contractual where needed, and maintains the right relationship tone.',
  'You are a Construction Project Manager. Draft a professional email for the following scenario:

Purpose: [PURPOSE, e.g., Notify client of a potential 3-week delay due to design information outstanding]
Recipient: [WHO, e.g., Client Project Manager]
Relationship Tone: [TONE, e.g., Formal but collaborative]
Contract Form: [FORM, e.g., NEC4 Option A]
Key Facts: [LIST the key points to communicate]
Desired Outcome: [WHAT you want to happen, e.g., Client to expedite design release]
Any Contractual Notices Required: [YES/NO — if yes, specify clause]

Draft the email with:
- Clear subject line
- Professional greeting
- Context paragraph
- Key issue / information
- Impact statement
- Proposed next steps / request
- Sign-off

Keep the tone professional and factual. If a contractual notice is required, ensure the email references the correct clause and serves as proper written notice.',
  NULL,
  'Use whenever you need to send an important project email. Particularly useful for sensitive communications like delay notifications, cost warnings, or dispute-related correspondence.',
  'beginner',
  '💬',
  'published',
  false,
  11,
  (SELECT id FROM roles WHERE slug = 'project-manager'),
  (SELECT id FROM tasks WHERE slug = 'stakeholder-communication'),
  (SELECT id FROM tools WHERE slug = 'microsoft-copilot'),
  NULL
),

-- WORKFLOW 12: Design Review Checklist (Design Manager + Quality Control + Claude)
(
  'Create a Design Review Checklist',
  'create-design-review-checklist',
  'Generate a thorough design review checklist to catch coordination issues before they become site problems.',
  'Design coordination issues are one of the biggest sources of cost and programme overruns on construction projects. This workflow generates a structured checklist to ensure thorough design review.',
  'You are a Construction Design Manager reviewing design packages for coordination and buildability. Generate a comprehensive design review checklist for:

Design Package: [PACKAGE, e.g., Structural steel — Stage 4 detailed design]
Project Type: [TYPE, e.g., 6-storey residential building]
Key Interfaces: [LIST, e.g., M&E risers, facade connections, lift cores]
Stage: [RIBA STAGE, e.g., Stage 4]

Create a checklist covering:
1. Drawing and Document Quality (scales, revisions, standards)
2. Design Compliance (Building Regs, structural codes, fire strategy)
3. Coordination Issues (clashes with other disciplines)
4. Buildability Review (access, sequence, tolerances)
5. Interface Management (connections to other packages)
6. Information Gaps (missing details or specifications)
7. Value Engineering Opportunities
8. Programme Implications

Format as a table with: Item, Check Description, Status (OK/Issue/N/A), Action Required.',
  NULL,
  'Use when receiving design packages for review. Run the checklist and document any issues in your design tracker. Share findings with the design team for resolution before construction starts.',
  'advanced',
  '📐',
  'published',
  false,
  12,
  (SELECT id FROM roles WHERE slug = 'design-manager'),
  (SELECT id FROM tasks WHERE slug = 'quality-control'),
  (SELECT id FROM tools WHERE slug = 'claude'),
  NULL
),

-- WORKFLOW 13: Material Procurement Schedule (Estimator + Material Takeoff + Gemini)
(
  'Generate a Material Procurement Schedule',
  'generate-material-procurement-schedule',
  'Create a procurement schedule with lead times, order dates, and delivery milestones for key construction materials.',
  'Getting materials to site on time is critical. This workflow helps generate a procurement schedule that accounts for lead times, approval processes, and delivery logistics.',
  'You are a Construction Estimator / Procurement Manager. Generate a material procurement schedule for the following project:

Project: [PROJECT NAME]
Construction Start Date: [DATE]
Key Programme Milestones:
- [MILESTONE 1 + DATE]
- [MILESTONE 2 + DATE]
- [MILESTONE 3 + DATE]

Materials to Schedule:
[LIST key materials, e.g., Structural steel, Curtain walling, Lifts, M&E plant, Brickwork, Windows]

For each material, create a procurement timeline showing:
- Material / Package
- Typical Lead Time (weeks)
- Latest Order Date (working back from need-on-site date)
- Approval / Sample Submission Date
- Expected Delivery Date
- Critical Notes (e.g., "Requires architect approval of samples")

Present as a table, sorted by Latest Order Date (earliest first). Flag any items that need immediate action.',
  NULL,
  'Use during pre-construction or early construction to plan procurement. Update the schedule monthly as lead times change. Particularly important for long-lead items like steel, lifts, and curtain walling.',
  'beginner',
  '📦',
  'published',
  false,
  13,
  (SELECT id FROM roles WHERE slug = 'estimator'),
  (SELECT id FROM tasks WHERE slug = 'material-takeoff'),
  (SELECT id FROM tools WHERE slug = 'google-gemini'),
  NULL
),

-- WORKFLOW 14: Meeting Minutes Generator (PM + Stakeholder Communication + Copilot)
(
  'Generate Meeting Minutes',
  'generate-meeting-minutes',
  'Turn rough meeting notes into properly structured minutes with actions, owners, and deadlines.',
  'Meeting minutes are essential project records but formatting them properly is tedious. This workflow converts your rough notes into structured minutes with clear action tracking.',
  'You are a Construction Project Manager. Convert the following rough meeting notes into formal meeting minutes:

Meeting: [TYPE, e.g., Design Team Meeting #14]
Date: [DATE]
Location: [LOCATION / MS Teams]
Attendees: [LIST]
Apologies: [LIST]

Notes:
[PASTE your rough notes, bullet points, or even voice memo transcript]

Format the minutes with:
1. Header (meeting name, date, attendees, apologies)
2. Previous Actions Review (if provided)
3. Discussion Items (numbered, with key decisions recorded)
4. New Actions Table (Action ID, Description, Owner, Due Date)
5. Next Meeting Date
6. Distribution List

Keep the minutes factual and concise. Capture decisions clearly. Ensure every action has a named owner and a due date.',
  NULL,
  'Use immediately after meetings while your notes are fresh. Paste in your rough notes or even a voice transcription and the AI formats everything properly. Review actions before distributing.',
  'beginner',
  '📝',
  'published',
  false,
  14,
  (SELECT id FROM roles WHERE slug = 'project-manager'),
  (SELECT id FROM tasks WHERE slug = 'stakeholder-communication'),
  (SELECT id FROM tools WHERE slug = 'microsoft-copilot'),
  NULL
),

-- WORKFLOW 15: Toolbox Talk Generator (Site Manager + Safety Planning + ChatGPT)
(
  'Write a Toolbox Talk',
  'write-toolbox-talk',
  'Generate a focused, practical toolbox talk for your site team covering any construction safety topic.',
  'Toolbox talks are short safety briefings delivered on site. This workflow generates a complete toolbox talk that is practical, engaging, and covers the key safety points for any topic.',
  'You are a Construction Site Manager preparing a toolbox talk. Generate a 5-minute toolbox talk on the following topic:

Topic: [TOPIC, e.g., Working at Height — safe use of podium steps and stepladders]
Site Context: [CONTEXT, e.g., Internal fit-out phase, multiple trades working on different floors]
Recent Incidents/Near Misses: [ANY relevant incidents to reference]
Season/Weather: [RELEVANT conditions, e.g., Winter — wet/icy conditions]

Structure the toolbox talk as:
1. Introduction (why this topic matters today)
2. Key Hazards (3-5 specific hazards related to this topic)
3. Control Measures (what everyone must do)
4. Do''s and Don''ts (quick reference list)
5. Discussion Questions (2-3 questions to engage the team)
6. Summary (key takeaway message)

Keep language simple and practical — this is for site operatives, not a board room. Include specific examples relevant to the current site context.',
  NULL,
  'Use to prepare weekly toolbox talks. Generate the talk, print a few copies, and deliver it on site. Get attendees to sign the register. Rotate through different safety topics each week.',
  'beginner',
  '🦺',
  'published',
  true,
  15,
  (SELECT id FROM roles WHERE slug = 'site-manager'),
  (SELECT id FROM tasks WHERE slug = 'safety-planning'),
  (SELECT id FROM tools WHERE slug = 'chatgpt'),
  NULL
);

-- ============================================================
-- SEED DATA: ROLE-TASK ASSOCIATIONS
-- ============================================================

INSERT INTO role_tasks (role_id, task_id) VALUES
-- QS tasks
((SELECT id FROM roles WHERE slug = 'quantity-surveyor'), (SELECT id FROM tasks WHERE slug = 'cost-estimation')),
((SELECT id FROM roles WHERE slug = 'quantity-surveyor'), (SELECT id FROM tasks WHERE slug = 'tender-analysis')),
((SELECT id FROM roles WHERE slug = 'quantity-surveyor'), (SELECT id FROM tasks WHERE slug = 'contract-review')),
((SELECT id FROM roles WHERE slug = 'quantity-surveyor'), (SELECT id FROM tasks WHERE slug = 'material-takeoff')),
-- PM tasks
((SELECT id FROM roles WHERE slug = 'project-manager'), (SELECT id FROM tasks WHERE slug = 'project-scheduling')),
((SELECT id FROM roles WHERE slug = 'project-manager'), (SELECT id FROM tasks WHERE slug = 'risk-assessment')),
((SELECT id FROM roles WHERE slug = 'project-manager'), (SELECT id FROM tasks WHERE slug = 'progress-reporting')),
((SELECT id FROM roles WHERE slug = 'project-manager'), (SELECT id FROM tasks WHERE slug = 'stakeholder-communication')),
-- Site Manager tasks
((SELECT id FROM roles WHERE slug = 'site-manager'), (SELECT id FROM tasks WHERE slug = 'quality-control')),
((SELECT id FROM roles WHERE slug = 'site-manager'), (SELECT id FROM tasks WHERE slug = 'safety-planning')),
((SELECT id FROM roles WHERE slug = 'site-manager'), (SELECT id FROM tasks WHERE slug = 'progress-reporting')),
-- Estimator tasks
((SELECT id FROM roles WHERE slug = 'estimator'), (SELECT id FROM tasks WHERE slug = 'cost-estimation')),
((SELECT id FROM roles WHERE slug = 'estimator'), (SELECT id FROM tasks WHERE slug = 'tender-analysis')),
((SELECT id FROM roles WHERE slug = 'estimator'), (SELECT id FROM tasks WHERE slug = 'material-takeoff')),
-- Construction Director tasks
((SELECT id FROM roles WHERE slug = 'construction-director'), (SELECT id FROM tasks WHERE slug = 'risk-assessment')),
((SELECT id FROM roles WHERE slug = 'construction-director'), (SELECT id FROM tasks WHERE slug = 'progress-reporting')),
((SELECT id FROM roles WHERE slug = 'construction-director'), (SELECT id FROM tasks WHERE slug = 'stakeholder-communication')),
-- Design Manager tasks
((SELECT id FROM roles WHERE slug = 'design-manager'), (SELECT id FROM tasks WHERE slug = 'quality-control')),
((SELECT id FROM roles WHERE slug = 'design-manager'), (SELECT id FROM tasks WHERE slug = 'stakeholder-communication'));

-- ============================================================
-- DONE! Your site should now be fully populated.
-- ============================================================
