/**
 * Mapping of detail-page paths to done-for-you service CTA content.
 *
 * Keyed by `${section}/${slug}` (e.g. 'ai-for/quantity-surveyor').
 * Pages whose path is not in this map render no service CTA at all.
 */

export interface ServiceCtaItem {
  label: string
  price: string
}

export interface ServiceCtaConfig {
  /** 'full' renders the richer treatment with price items; default is the single-sentence band. */
  variant?: 'full'
  /** Lead sentence for the full variant. */
  heading?: string
  /** Price anchor items for the full variant. */
  items?: ServiceCtaItem[]
  /** Single sentence (with price anchor) for the standard variant. */
  text?: string
}

const TENDER_REVIEW: ServiceCtaConfig = {
  text: 'Independent quote comparison and gap review by a qualified QS, from £495 per trade.',
}

const CASHFLOW_FORECAST: ServiceCtaConfig = {
  text: 'Project cash flow forecasts built from your programme and costs, from £950. Or start with the £950 AI Roadmap Review.',
}

const COMMERCIAL_DASHBOARD: ServiceCtaConfig = {
  text: 'Your job costs, applications and cash flow in one live dashboard, setup from £1,450.',
}

const ROADMAP_REVIEW: ServiceCtaConfig = {
  text: 'Not sure where AI fits your commercial team? The £950 Roadmap Review maps it, credited against any build.',
}

export const SERVICE_CTA_MAP: Record<string, ServiceCtaConfig> = {
  'ai-for/quantity-surveyor': {
    variant: 'full',
    heading: 'The systems behind this page are a service.',
    items: [
      { label: 'Independent quote comparisons', price: 'from £495' },
      { label: 'Project cash flow forecasts', price: 'from £950' },
      { label: 'AI Roadmap Review', price: '£950, credited against any build' },
    ],
  },
  'ai-workflows/generate-bill-of-quantities': {
    text: 'Want the BoQ and procurement pack done for you? Trade-by-trade packages from £395.',
  },
  'ai-for/tender-analysis': TENDER_REVIEW,
  'ai-workflows/analyse-tender-returns': TENDER_REVIEW,
  'ai-workflows/analyse-subcontractor-quotes': TENDER_REVIEW,
  'guides/ai-for-cost-estimation': CASHFLOW_FORECAST,
  'ai-for/cost-estimation': CASHFLOW_FORECAST,
  'ai-for/estimator': CASHFLOW_FORECAST,
  'guides/construction-cost-plan-guide': CASHFLOW_FORECAST,
  'templates/cost-plan': CASHFLOW_FORECAST,
  'ai-workflows/generate-cashflow-forecast': COMMERCIAL_DASHBOARD,
  'ai-workflows/draft-valuation-payment-application': COMMERCIAL_DASHBOARD,
  'ai-workflows/create-cost-value-reconciliation': COMMERCIAL_DASHBOARD,
  'ai-for/valuation-and-payment-applications': COMMERCIAL_DASHBOARD,
  'ai-for/budget-forecasting': COMMERCIAL_DASHBOARD,
  'ai-for/commercial-manager': ROADMAP_REVIEW,
  'ai-for/claims-management': ROADMAP_REVIEW,
  'ai-for/variation-management': ROADMAP_REVIEW,
}

export function getServiceCta(
  section: 'ai-for' | 'ai-workflows' | 'guides' | 'templates',
  slug: string
): ServiceCtaConfig | null {
  return SERVICE_CTA_MAP[`${section}/${slug}`] ?? null
}
