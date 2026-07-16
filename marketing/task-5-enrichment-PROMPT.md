# Task 5 — Page Enrichment Machine (fixes "Crawled – currently not indexed")
## Ad-hoc task on the mini: run it manually ("Run now") or schedule daily until the checklist is empty. Each run enriches 6 pages.

CONTEXT: Google crawled these pages and declined to index them — the verdict is thin/too-similar content, not a technical fault. The fix is making each page genuinely deeper and distinct. Content lives in Supabase; publishing scripts upsert by slug, so enriching = rewriting the page's content fields. The site is the repo at construction-ai-platform (adjust path to this machine).

STEP 1 — Read "marketing/enrichment-checklist.md" in the repo (git pull --rebase origin main first). Take the FIRST 6 unchecked URLs.

STEP 2 — For each URL, look at how its page type stores content (study the admin CRUD + publish scripts to find the right table/columns: workflows, tasks/roles, templates, guides, tools). Read the CURRENT content first.

STEP 3 — Rewrite/expand each page so it would deserve its own place in an index. Every enriched page must gain, in the site's established voice (UK English, no em dashes, no hype):
a) A **worked UK example**: realistic input → realistic output for that workflow/topic (e.g. for draft-rfi-response: an actual sample RFI about a lintel spec clash and the drafted response). This is the single biggest thinness fix — no two pages can share an example.
b) A **"When to use this / when not to"** section with UK construction context (JCT/NEC/CDM/RICS references where genuinely relevant).
c) **3-4 FAQ entries** unique to that page (these generate FAQPage schema on guides; for workflows add them in the content body).
d) A **common-mistakes or pro-tips block** (3 bullets, practical).
e) Check the meta_title/meta_description are unique and click-worthy — if generic, rewrite (under 60/160 chars).
Target: each page ends 800+ words of UNIQUE content. Do not pad with boilerplate — if a page cannot honestly support this depth, note it in the checklist as "CONSOLIDATE candidate" instead (it may deserve merging or noindex, human decision).

STEP 4 — Publish via the appropriate script/DB update (same pattern as scripts/update-meta-gsc.mjs and publish scripts). Verify each URL renders the new content (curl the live URL after revalidation, or check the DB row updated).

STEP 5 — Tick the 6 URLs in marketing/enrichment-checklist.md (- [x]), commit "Content: enrich 6 pages (indexing remediation)", git pull --rebase, push.

STEP 6 — Summarise: which pages, word counts before/after, any CONSOLIDATE flags, how many remain unchecked.

RULES: never touch /tools/rams-generator's launch card. Never delete existing good content — extend it. If Supabase env is missing, stop and report.
