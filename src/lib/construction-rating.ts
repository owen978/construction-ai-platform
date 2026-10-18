/**
 * Links to constructionrating.co.uk (Owen's sister site: how UK main
 * contractors pay, who has failed, and subcontractor reviews) from the
 * payment-related pages here. Plain links: both sites are Owen's.
 */

export const CONSTRUCTION_RATING_URL = 'https://constructionrating.co.uk'

export interface ConstructionRatingNote {
  text: string
  linkLabel: string
  href: string
}

const LATE_PAYMENT: ConstructionRatingNote = {
  text: 'Waiting on a payment? Work out what a late payer owes you with the',
  linkLabel: 'late payment interest calculator on constructionrating.co.uk',
  href: `${CONSTRUCTION_RATING_URL}/tools/late-payment-interest-calculator`,
}

const CASH_TIED_UP: ConstructionRatingNote = {
  text: 'See how much of your money a job ties up with the',
  linkLabel: 'cash tied up calculator on constructionrating.co.uk',
  href: `${CONSTRUCTION_RATING_URL}/tools/cash-tied-up-calculator`,
}

const CHECK_THE_CONTRACTOR: ConstructionRatingNote = {
  text: 'Before you sign, check how the main contractor pays: the',
  linkLabel: 'payment league table on constructionrating.co.uk',
  href: `${CONSTRUCTION_RATING_URL}/payment-league-table`,
}

/** Keyed by `${section}/${slug}`, like SERVICE_CTA_MAP. Unlisted pages show nothing. */
const NOTE_MAP: Record<string, ConstructionRatingNote> = {
  'ai-workflows/draft-valuation-payment-application': LATE_PAYMENT,
  'ai-workflows/draft-final-account-summary': LATE_PAYMENT,
  'ai-for/valuation-and-payment-applications': LATE_PAYMENT,
  'ai-for/quantity-surveyor': LATE_PAYMENT,
  'guides/chatgpt-prompts-for-quantity-surveyors': LATE_PAYMENT,
  'guides/ai-for-quantity-surveyors-guide': LATE_PAYMENT,
  'ai-workflows/generate-cashflow-forecast': CASH_TIED_UP,
  'ai-for/budget-forecasting': CASH_TIED_UP,
  'ai-workflows/summarise-sub-contract-agreement': CHECK_THE_CONTRACTOR,
  'ai-for/subcontractor-management': CHECK_THE_CONTRACTOR,
  'guides/ai-for-contract-administration': CHECK_THE_CONTRACTOR,
}

export function getConstructionRatingNote(
  section: 'ai-for' | 'ai-workflows' | 'guides',
  slug: string
): ConstructionRatingNote | null {
  return NOTE_MAP[`${section}/${slug}`] ?? null
}
