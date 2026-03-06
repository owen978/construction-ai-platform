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
