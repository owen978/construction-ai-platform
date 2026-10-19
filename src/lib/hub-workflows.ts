/**
 * Extra workflows to list on an /ai-for/ role or task hub. A workflow has one
 * role and one task in the database, so useful workflows were missing from
 * hubs whose descriptions promised them (H&S listed 2 workflows, procurement
 * and BIM 1). These are shown after the hub's own workflows. Unpublished slugs
 * are skipped by the query, so nothing here can link to a missing page.
 */
const HUB_WORKFLOWS: Record<string, string[]> = {
  // Roles
  'health-and-safety-manager': ['draft-method-statement', 'write-toolbox-talk', 'draft-site-induction-briefing'],
  'procurement-manager': ['generate-material-procurement-schedule', 'generate-subcontractor-scope-of-works', 'analyse-subcontractor-quotes', 'analyse-tender-returns'],
  'bim-manager': ['create-design-review-checklist', 'draft-rfi-response'],
  'construction-director': ['draft-monthly-progress-report', 'write-commercial-risk-summary', 'generate-cashflow-forecast', 'create-bid-no-bid-decision-framework', 'draft-lessons-learned-report'],
  'commercial-manager': ['draft-valuation-payment-application', 'write-variation-assessment', 'draft-final-account-summary', 'analyse-subcontractor-quotes'],
  'design-manager': ['generate-bim-execution-plan-summary', 'write-change-control-notice'],
  'estimator': ['generate-preliminary-cost-plan', 'generate-bill-of-quantities', 'analyse-subcontractor-quotes', 'analyse-tender-returns'],
  'planning-engineer': ['write-extension-of-time-assessment', 'write-weather-delay-impact-assessment', 'create-project-execution-plan-summary'],
  'contracts-manager': ['write-change-control-notice', 'write-variation-assessment', 'draft-professional-correspondence'],
  'quantity-surveyor': ['create-cost-value-reconciliation', 'generate-cashflow-forecast'],
  // Tasks
  'document-control': ['create-design-review-checklist', 'draft-rfi-response'],
  'quality-control': ['generate-snagging-list-template', 'create-project-closeout-report'],
  'snagging-and-defects': ['generate-quality-inspection-checklist', 'create-project-closeout-report'],
  'site-induction-documentation': ['write-toolbox-talk', 'draft-method-statement'],
  'subcontractor-management': ['analyse-subcontractor-quotes', 'summarise-sub-contract-agreement', 'draft-pre-qualification-questionnaire'],
  'material-takeoff': ['generate-bill-of-quantities', 'generate-preliminary-cost-plan'],
  'valuation-and-payment-applications': ['create-cost-value-reconciliation', 'write-variation-assessment'],
}

export function getHubWorkflowSlugs(slug: string): string[] {
  return HUB_WORKFLOWS[slug] ?? []
}
