/**
 * Mapping of detail-page paths to done-for-you service CTA content.
 *
 * Keyed by `${section}/${slug}` (e.g. 'ai-for/quantity-surveyor').
 * Pages whose path is not in this map show ROADMAP_REVIEW_OFFER instead.
 */

/**
 * The £950 AI Roadmap Review box. Its price, guarantee and credit terms live
 * only here and must match what /services promises.
 */
export const ROADMAP_REVIEW_OFFER = {
  price: '£950',
  kicker: 'AI Roadmap Review',
  heading: 'Want this done for your team?',
  body: "A QS with 25+ years' experience reviews your workflows across commercial, operations, site management and H&S, and hands you a written roadmap: quick wins, costed options, what each step saves.",
  points: [
    '£950 fixed, delivered in days, 45-minute walkthrough',
    "If we can't find 20+ hours a month of recoverable time, you don't pay",
    'Credited in full against any build over £2,500 within 60 days',
  ],
  bookLabel: 'Request your Roadmap Review',
  newsletterLabel: 'Get the free weekly newsletter',
}

/**
 * The free 20-minute sessions that sit on content pages instead of the
 * 15-minute call (Owen, 30 Oct 2026). Requests go through the services form;
 * Owen added an option for each one there. The Benchmark goes on commercial
 * pages (BENCHMARK_PAGES), the Roadmap everywhere else.
 */
export const FREE_OFFERS = {
  roadmap: {
    heading: 'Free 20-minute Business Roadmap',
    shortHeading: 'Free 20-minute Roadmap',
    body: `Not sure where AI would actually save your team time? Request one and I'll take you through 30 quick checks across six areas: pre-construction, commercial, site, finance, admin and comms, and people and growth. You'll come away with a clear picture of where the gaps are. If you then want the fixes designed, that's the ${ROADMAP_REVIEW_OFFER.price} AI Roadmap Review.`,
    shortBody: 'Not sure where AI would save your team time? 30 quick checks across six areas of the business, and a clear picture of where the gaps are.',
    button: 'Request my free Roadmap',
  },
  benchmark: {
    heading: 'Free 20-minute Commercial Benchmark',
    shortHeading: 'Free 20-minute Benchmark',
    body: "Not sure how tight your commercial side really is? Request one and I'll take you through 38 commercial tasks, from valuations and variations to CVR, applications and cash flow, each one scored Covered, Stretched or Exposed. You'll see exactly where money is leaking before it shows up in the margin.",
    shortBody: '38 commercial tasks, from valuations to cash flow, each scored Covered, Stretched or Exposed. See where money is leaking before it hits the margin.',
    button: 'Request my free Benchmark',
  },
} as const

export type FreeOfferKey = keyof typeof FREE_OFFERS

/** Commercial pages that offer the Benchmark rather than the Roadmap (from the 30 Oct brief). */
export const BENCHMARK_PAGES = new Set([
  '/ai-workflows/create-cost-value-reconciliation',
  '/ai-workflows/draft-valuation-payment-application',
  '/ai-workflows/generate-bill-of-quantities',
  '/ai-workflows/generate-cashflow-forecast',
  '/ai-workflows/write-variation-assessment',
  '/ai-workflows/draft-contract-change-order',
  '/ai-workflows/draft-final-account-summary',
  '/ai-workflows/analyse-subcontractor-quotes',
  '/ai-workflows/write-commercial-risk-summary',
  '/ai-workflows/prepare-bid-pricing-schedule',
  '/ai-workflows/generate-preliminary-cost-plan',
  '/ai-for/quantity-surveyor',
  '/ai-for/commercial-manager',
  '/ai-for/valuation-and-payment-applications',
  '/ai-for/variation-management',
  '/ai-for/budget-forecasting',
  '/ai-for/cost-estimation',
  '/ai-for/material-takeoff',
])

export function freeOfferFor(path: string): FreeOfferKey {
  return BENCHMARK_PAGES.has(path) ? 'benchmark' : 'roadmap'
}

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
  'guides/ai-construction-estimating': CASHFLOW_FORECAST,
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
