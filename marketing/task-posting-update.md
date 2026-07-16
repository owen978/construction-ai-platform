# Content task update — auto-schedule LinkedIn via Metricool MCP
## Replaces the old STEP 5 (draft posts to files) ending. Apply to the buildcopilot-weekly-content scheduled task. Proven in the 16 Jul 2026 test (post ID 350107121: image attach, firstCommentText and scheduling all confirmed).

### NEW STEP 5 — Draft posts (unchanged) THEN schedule via Metricool

5a. Create marketing/linkedin-weekly/<slug>.md as before: three post variants + note of which image belongs to which. BUT the post bodies must now follow the reach format: **NO page URL anywhere in the body** — the link always goes in the first comment. End bodies with a soft pointer ("Full guide linked in the comments." or similar, varied).

5b. **Schedule the primary post via the Metricool MCP** (server: metricool-mcp; if its tools are not loaded, load them via tool search):
- Brand: Owen Hagger personal LinkedIn — blog ID **1683688**
- Body: Post 1 (the listicle variant) from 5a — no URL in body
- Media: the raw GitHub URL of the listicle image, format: `https://raw.githubusercontent.com/owen978/construction-ai-platform/main/marketing/post-images/<slug>-listicle.png` — ONLY after the image is committed and pushed (so do this after STEP 6's git push, or verify the URL returns 200 before using it)
- firstCommentText: "Full guide: <PAGE_URL>" (the page published this run)
- Schedule: the NEXT MORNING at 08:30 Europe/London, autoPublish true
- Read the post back from the calendar to confirm it persisted (media + firstCommentText + datetime), as the test run did.

5c. If Metricool scheduling fails for any reason (MCP unavailable, auth expired, media URL not fetchable): do NOT retry endlessly — fall back to writing the ready-to-paste pack as before and say in BOLD in the run summary that manual scheduling is needed. A silent posting failure is worse than a loud one.

### STEP 7 addition — the summary must now also report: Metricool post ID, scheduled date/time, and confirmation the read-back matched.

### Ordering note
Because 5b needs the image pushed to GitHub first, the working order becomes: publish page → generate images → git commit/push (old STEP 6) → THEN schedule in Metricool → summarise. Adjust the step order accordingly when applying this update.
