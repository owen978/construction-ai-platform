import { NextResponse } from 'next/server'

/**
 * Template download sign-up. Validates the form, forwards the lead to a
 * GoHighLevel workflow (Inbound Webhook trigger; URL in the
 * GHL_DOWNLOAD_WEBHOOK_URL environment variable), then hands back the Word
 * download link. A failed forward never blocks the download.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const clip = (v: unknown, n = 120) => (typeof v === 'string' ? v.trim().slice(0, n) : '')

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Honeypot: real people never fill this hidden field.
  if (clip(body.website)) return NextResponse.json({ ok: true, downloadUrl: null })

  const email = clip(body.email, 200).toLowerCase()
  const slug = clip(body.slug, 80)
  if (!EMAIL.test(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  if (!/^[a-z0-9-]+$/.test(slug)) return NextResponse.json({ error: 'Unknown template.' }, { status: 400 })

  const lead = {
    email,
    first_name: clip(body.firstName, 60),
    role: clip(body.role, 60),
    company_size: clip(body.companySize, 30),
    marketing_consent: body.marketingConsent === true,
    source: 'template-download',
    template_slug: slug,
    template_name: clip(body.templateName, 120),
    page_url: clip(body.pageUrl, 300),
    utm_source: clip(body.utmSource, 80),
    utm_medium: clip(body.utmMedium, 80),
    utm_campaign: clip(body.utmCampaign, 120),
    submitted_at: new Date().toISOString(),
  }

  const hook = process.env.GHL_DOWNLOAD_WEBHOOK_URL
  if (hook) {
    try {
      const r = await fetch(hook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) })
      if (!r.ok) console.error('template-download: GHL webhook returned', r.status)
    } catch (e) {
      console.error('template-download: GHL webhook failed', e)
    }
  } else {
    console.error('template-download: GHL_DOWNLOAD_WEBHOOK_URL is not set, lead not sent to GHL', { slug, role: lead.role })
  }

  return NextResponse.json({ ok: true, downloadUrl: `/templates/${slug}/download` })
}
