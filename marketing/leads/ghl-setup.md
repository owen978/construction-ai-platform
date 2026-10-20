# GHL setup for BuildCopilot leads

What to set up in GoHighLevel for the two new site features on branch `claude/lead-capture`:

1. **"Download in Word"** on every template page: a short form (work email required; first name, role, company size and an optional marketing opt-in), then the download starts. The site posts each sign-up to a GHL workflow.
2. **A sticky "Book a 15-min call"** card or bar on content pages, linking to the 15-minute calendar with `utm_content=sticky-<section>`.
3. **Calls to action on every page:** "Book a 15-minute call" goes to the calendar (`SYGqnM5OyTFztWt7yQUg`, "BuildCopilot 15mins"); "Request your Roadmap Review" and "Send an enquiry" go to the services form (`6HJLSFrH7Q61nDZ72Tn1`).

Do steps 1 to 3 first. Then tell me, and I'll merge and deploy and we'll run the test in step 7 together. Until the webhook URL is in Vercel, downloads still work but the sign-ups are only logged, not sent to GHL.

---

## 1. Custom fields (Settings → Custom Fields → Contact)

| Field name | Type | Options |
|---|---|---|
| BC Role | Dropdown (single) | Quantity Surveyor, Commercial Manager, Project Manager, Site Manager, Estimator, Contracts Manager, Health & Safety Manager, Director or Owner, Subcontractor, Other |
| BC Company size | Dropdown (single) | Just me, 2-10 people, 11-50 people, 51-250 people, 250+ people |
| BC Template | Single line | (the template name) |
| BC Source page | Single line | (the page URL) |
| BC Marketing consent | Checkbox or Yes/No | Yes |
| BC Interested in | Checkbox (multiple) | Roadmap Review, Build a workflow or automation, Team AI training, Templates and prompts only, Not sure yet |

The site sends role and company size with exactly the option text above, so keep the spellings the same.

## 2. Tags

- `buildcopilot` on every contact from the site
- `bc-template-download`
- `bc-template-<slug>`, e.g. `bc-template-rams` (from the webhook's `template_slug`)
- `bc-consent-marketing` only when they ticked the opt-in
- `bc-call-booked` once they book
- `bc-hot` for director/owner or 51+ people (see step 3)

## 3. Workflow A: "BuildCopilot: template download"

1. **Trigger: Inbound Webhook.** Copy the webhook URL it gives you.
2. **In Vercel** (Project → Settings → Environment Variables), add `GHL_DOWNLOAD_WEBHOOK_URL` with that URL. Tick Production and Preview, and mark it **Sensitive**. Add it yourself; I don't handle these.
3. **Create/Update Contact**, mapping from the webhook payload:
   - `email` → Email
   - `first_name` → First name
   - `role` → BC Role
   - `company_size` → BC Company size
   - `template_name` → BC Template
   - `page_url` → BC Source page
   - `marketing_consent` → BC Marketing consent
   - `utm_source`, `utm_medium`, `utm_campaign` → the contact's UTM/attribution fields, if you use them

   The payload also includes `source` ("template-download"), `template_slug` and `submitted_at`. After the first test, click "Fetch sample request" so GHL knows the field names.
4. **Add tags:** `buildcopilot`, `bc-template-download`, `bc-template-{{inboundWebhookRequest.template_slug}}`.
5. **If/Else on marketing consent:**
   - **Yes:** add `bc-consent-marketing` and add the contact to Workflow B.
   - **No:** send one email with the template link (`https://buildcopilot.ai/templates/{{template_slug}}/download`) and stop. They asked for the template, so that one email is fine. Don't add them to the nurture.
6. **If/Else on company size or role:** if company size is 51-250 people or 250+ people, or role is Director or Owner:
   - Add tag `bc-hot`.
   - Send yourself an internal notification: "Hot download: {{contact.first_name}} ({{BC Role}}, {{BC Company size}}) took the {{BC Template}}".
   - Create an opportunity in a "BuildCopilot leads" pipeline at stage "Downloaded".

## 4. Workflow B: "BuildCopilot: download nurture" (consented contacts only)

Five short emails. Exit as soon as the tag `bc-call-booked` is added.

| When | Email |
|---|---|
| Straight away | "Your {{BC Template}}": the download link again, plus one practical tip for filling it in |
| Day 2 | The matching AI workflow (the prompt) for that template, so they can draft it with AI next time |
| Day 5 | How a team typically runs this: the process, the checks, who signs off. Describe the steps only, with no invented results or client names |
| Day 9 | "Making the case for AI on your team": what a Roadmap Review covers. Written to be forwarded to a manager |
| Day 14 | "Worth a 15-minute chat?": your calendar link with `?utm_source=buildcopilot&utm_medium=email&utm_content=nurture` |

## 5. Calendar ("BuildCopilot 15mins", SYGqnM5OyTFztWt7yQUg)

- **On 20 Oct 2026 it showed no free slots at all** ("No slot available" through April 2027). Check it has you assigned as the team member, opening hours set, and a booking window that starts now.
- 15 minutes, with a 10-minute buffer.
- Add a custom booking form with these questions:
  - First name and Email (required)
  - Company
  - BC Role (dropdown)
  - BC Company size (dropdown)
  - BC Interested in (checkboxes)
  - "Anything you'd like to cover?" (paragraph)
- **Workflow C "Call booked"** (trigger: appointment booked on this calendar):
  - Add tag `bc-call-booked`, which also stops Workflow B.
  - Move or create the opportunity at "Call booked".
  - Send a confirmation email, plus reminders 24 hours and 1 hour before.
  - On no-show: a follow-up email with the rebooking link.

## 5a. Services form (6HJLSFrH7Q61nDZ72Tn1)

Fields: first and last name, phone (required), email (required), "Services you're interested in" (AI Implementation Roadmap, Commercial & QS Services, AI & Systems Services, Ongoing Commercial Cover) and two SMS consent boxes.

- **Workflow D "Services enquiry"** (trigger: form submitted, this form): add tags `buildcopilot` and `bc-services-enquiry`, notify you by email and SMS, create the opportunity at "Enquiry", and send the contact your calendar link so they can pick a time.
- The SMS consent text says "from BuildCopilot about Construction Systems". Check that's the wording you want (Contractor Systems?).
- Phone is required. If enquiries are slow, try making it optional.

## 6. See which button works

- The site adds `utm_source=buildcopilot&utm_medium=cta&utm_content=<placement>` to every calendar and form link. Placements:
  - `sticky-<section>`: the floating card or bar
  - `workflow-sidebar-<slug>`, `template-sidebar-<slug>`, `tool-sidebar-<slug>`: the sidebar card
  - `guide-inline-<slug>`, `ai-for-inline-<slug>`: the box halfway down
  - `workflow-<slug>`, `template-<slug>`, `guide-<slug>`, `ai-for-<slug>`, `tool-<slug>`, `daily-<slug>`: the done-for-you box
  - `hub-<section>`: the band above the newsletter on each hub
  - `services-hero`, `services-roadmap`, `services-qs`, `services-ai`, `services-ongoing`, `services-final`, `home`, `about`, `contact`, `newsletter`
- In GHL, turn on attribution (Settings → Business Profile / Attribution) and build smart lists by `utm_content`. That shows which placement brings the bookings.
- Vercel Analytics also records `call_bar_click`, `call_bar_dismiss`, `template_download_click` and `template_download_lead`. Custom events need a Vercel plan that includes them.

## 7. Before go-live: email sending

buildcopilot.ai currently publishes SPF `v=spf1 -all` and DMARC `p=reject` (the Squarespace "Email Security" preset). That means **any email sent "from" buildcopilot.ai will be rejected**. Either:
- send these workflow emails from your contractorsystems.co.uk address (if that's already set up as a GHL sending domain), or
- set up a GHL dedicated sending domain on buildcopilot.ai: remove the Squarespace email-security preset and add the SPF, DKIM and DMARC records GHL gives you.

## 8. Test together after the merge

1. Download a template on the live site with your own email, ticking the opt-in.
2. In GHL, check the contact has the fields and tags, and that the first nurture email arrived.
3. Download again with a "51-250 people" test, and check you got the hot-lead notification.
4. Book a test slot from the sticky card, and check the booking form questions and the `bc-call-booked` tag.

## Later (not built yet)

- A "Make the case to your boss" one-page brief to link from email 4 and the service boxes.
- The GHL chat widget on /services and /about only, loaded after the page is interactive, once the forms are bringing leads.
- An "AI readiness score" survey as a second lead magnet.
