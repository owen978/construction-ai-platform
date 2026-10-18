/**
 * GoHighLevel (GHL) booking and form endpoints.
 *
 * Every GHL URL on the site comes from this file, so moving GHL to another
 * domain (e.g. a contractorsystems.co.uk subdomain) is a one-line change to
 * GHL_ORIGIN. These are public embed URLs, not secrets.
 */
const GHL_ORIGIN = 'https://link.contractorsystems.co.uk'

/** Roadmap Review / 15-minute call booking widget. */
export const GHL_BOOKING_URL = `${GHL_ORIGIN}/widget/booking/mzWN8jEzZDL5SxkY71ut`

export const GHL_NEWSLETTER_FORM_ID = 'rncFCtEjzs4hnT5jgHsB'
export const GHL_NEWSLETTER_FORM_URL = `${GHL_ORIGIN}/widget/form/${GHL_NEWSLETTER_FORM_ID}`

/** Loader script that sizes and activates embedded GHL forms. */
export const GHL_FORM_EMBED_SCRIPT = `${GHL_ORIGIN}/js/form_embed.js`
