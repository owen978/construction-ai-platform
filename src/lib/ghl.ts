/**
 * GoHighLevel (GHL) booking and form endpoints.
 *
 * Every GHL URL on the site comes from this file, so moving GHL to another
 * domain (e.g. a contractorsystems.co.uk subdomain) is a one-line change to
 * GHL_ORIGIN. These are public embed URLs, not secrets.
 */
const GHL_ORIGIN = 'https://link.contractorsystems.co.uk'

/** The 15-minute call calendar ("Book a 15-minute call"). */
export const GHL_BOOKING_URL = `${GHL_ORIGIN}/widget/booking/SYGqnM5OyTFztWt7yQUg`

/**
 * Services enquiry form: name, contact details and which service they're
 * interested in. Owen follows up and books the call. Used wherever the site
 * offers a paid service (the Roadmap Review and the done-for-you offers).
 */
export const GHL_SERVICES_FORM_URL = `${GHL_ORIGIN}/widget/form/6HJLSFrH7Q61nDZ72Tn1`

function withUtm(url: string, content: string) {
  const params = new URLSearchParams({
    utm_source: 'buildcopilot',
    utm_medium: 'cta',
    utm_content: content,
  })
  return `${url}?${params}`
}

/**
 * 15-minute call link tagged with UTMs so bookings can be traced to the page
 * that sent them. `content` is "{page-type}-{slug}", e.g. "workflow-write-daily-site-report".
 */
export function bookingUrl(content: string) {
  return withUtm(GHL_BOOKING_URL, content)
}

/** Services enquiry form link, tagged the same way as bookingUrl(). */
export function servicesFormUrl(content: string) {
  return withUtm(GHL_SERVICES_FORM_URL, content)
}

export const GHL_NEWSLETTER_FORM_ID = 'rncFCtEjzs4hnT5jgHsB'
export const GHL_NEWSLETTER_FORM_URL = `${GHL_ORIGIN}/widget/form/${GHL_NEWSLETTER_FORM_ID}`

/** Loader script that sizes and activates embedded GHL forms. */
export const GHL_FORM_EMBED_SCRIPT = `${GHL_ORIGIN}/js/form_embed.js`
