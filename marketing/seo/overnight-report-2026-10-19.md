# Overnight SEO work: report for Owen (19 Oct 2026)

Everything is on the branch `claude/seo-guards`, kept in its own folder (`.claude/worktrees/seo-guards`) so your main folder stayed clean for the 06:21 daily writer and the 07:41 content task. **Nothing went to `main` or the database.** The branch builds (305 pages), type-checks and lints clean.

To ship it, say "merge claude/seo-guards and push". Every commit is separate, so any one can be dropped.

## What's on the branch

**Daily ideas**
1. Search checks: an approved idea fails the build if its search title is over 60 characters, its description is outside 120-160, it's thin (under 330 words, fewer than 3 checks or steps) or it has an em dash. The 10 written ideas were fixed to pass. New `metaTitle` field keeps long headings but gives Google a short title.
2. Internal links: role and tool chips link to their hubs; a "Go further" box links the workflow, a related guide or template and the role hub (live titles, never a dead link); workflow, role, tool, guide and template pages list their related daily ideas.
3. Archive paging: page 2, 3... are their own canonical pages; role and tool filters are noindex.

**Checks before anything is published**
4. `publish-guide.mjs` and `publish-template.mjs` now refuse a publish with a title over 60 characters, a description outside 120-160, an em dash, under 1,200 words or fewer than 3 internal links (`--check` to test, `--skip-seo-checks` for emergencies). Today 26 of 28 guide files and 1 of 4 templates would fail, mostly long descriptions: see "Needs you" below.
5. IndexNow key file and `npm run indexnow` script to tell Bing (and ChatGPT search, which uses Bing) about new pages. Not run yet.

**Whole site**
6. Workflow pages (50, the biggest page type, and dead ends before): role and task badges link to their hubs, a "More AI workflows for <role>s" row, and the Related resources block.
7. Role pages: "AI for Quantity Surveyors" headings to match searches; breadcrumb links the hub.
8. Homepage: a Free Construction Templates section (the homepage linked no template before); the stats bar shows live counts (50 workflows, 14 templates, 36 guides, 12 roles) instead of "6 Construction Roles" (wrong) and "5min Average Time Saved" (no source).
9. Footer: Free Templates column, all 12 roles, Workflow of the Day.
10. Structured data: the Organization logo was a 404 (fixed); guides and templates gain images and dates; AI tool pages no longer claim BuildCopilot publishes ChatGPT or Procore.
11. Speed: one font instead of two (Geist was loaded but never shown), lazy newsletter form, default share image 278 KB instead of 2.4 MB, `lang="en-GB"`.
12. Housekeeping: /admin noindex, every tool page links all 10 tools, "What is a RAMS?" style template headings.
13. Related resources: no longer repeats links already on the page, and no longer matches on one generic word (it was linking the variation assessment workflow to the RAMS, PQQ and fire risk pages, and the BIM guide to every role page).
14. **Copy change, for your approval** (commit f0f9c0a, drop it if you prefer the old wording): hub titles and headings now name the topic ("AI Workflows for Construction: Free Copy-Paste Prompts", "AI Guides for UK Construction Professionals", "Free Construction Templates for UK Sites", "<Tool> for Construction"), descriptions carry live counts, and the templates hub no longer says "AI-Powered Document Generators" or "Download and use instantly" (there's no download).

**Drafts for you to approve (hidden on the live site until approved)**
15. Workflow extras for the 21 workflow pages on the July Search Console "crawled, not indexed" list: when not to use it, common mistakes, FAQs (FAQPage data). About 440 words each. `marketing/workflow-extras/`
16. Hub text for the 22 thinnest /ai-for/ pages (the 13 role hubs and 9 task hubs had under 60 words of their own, against head terms like "AI for quantity surveyors"): overview, where AI helps, where to be careful, FAQs. About 600 words each. `marketing/ai-for-extras/`
17. To approve a draft: change `status: "draft"` to `status: "approved"` in the file. Or tell me "approve all extras" and I'll flip them. Please check these first: the QS page mentions the RICS professional standard on responsible use of AI; the payment, defects and NEC4 notice answers make general contract statements (all carry "Check your contract and take advice").

## Needs you (I didn't change these)

1. **Merge the branch** (see top).
2. **Approve the drafts** (items 15-17), the 5 earlier workflow extras, and the task prompt updates in `marketing/seo/task-prompt-updates.md` (so the daily writer and content task meet the new checks first time and ping IndexNow).
3. **Long titles and descriptions**: the crawl found 15 titles over 60 characters and 56 descriptions over 160 (29 of 36 guides, 9 templates, 5 tools, 5 roles, 4 workflows, /services, /about/owen-hagger). Suggested wording for many is in `marketing/seo/title-and-description-review.md`. Publishing the fixes is a database write. The two files the content task copies from also fail the checks: `construction-daily-report-guide.md` (description 162) and `fire-risk-assessment.md` (em dashes).
4. **Homepage**: the title and H1 lead with the brand and "Work Smarter on Every Project". Suggested: title "BuildCopilot: Free AI Workflows for UK Construction", H1 "Free AI workflows, prompts and templates for UK construction".
5. **/services**: title is 79 characters and description 282, both carrying price terms, so it's yours to rewrite.
6. **Database content problems the writers found** (all need an admin edit):
   - Em dashes in many live workflow prompts and in all role descriptions; "streamline" in some.
   - Possible wrong references: change control notice cites "JCT cl. 3.14" with a Design and Build example; weather delay uses a "competent contractor" test rather than the JCT "exceptionally adverse" or NEC4 one-in-ten-year test; site induction cites CDM "Regulation 14" (the induction duty is likely Regulation 13). Please check.
   - Prompts that invite made-up detail: "cite relevant contract clauses" (change order, dispute summary), "realistic UK waste generation benchmarks" (waste plan), "estimated outcome range" (dispute).
   - The closeout report prompt includes margin analysis yet calls it a client handover document.
   - Tool cards show US dollar prices on a UK site.
   - Several hub descriptions promise workflows the hub doesn't list (H&S, BIM, procurement, document control, quality control, snagging); some existing workflows could simply be tagged to those roles or tasks.
7. **Thin old guides**: five April guides of 400-500 words overlap stronger ones. Suggested 301s: getting-started-with-ai-in-construction to how-to-use-ai-in-construction, ai-for-cost-estimation to ai-construction-estimating, effective-ai-prompts-for-construction to chatgpt-prompts-for-construction, ai-for-progress-reports to /ai-for/progress-reporting; ai-risk-assessment-construction is your call.
8. **Templates say "Free Download"** in some titles but have no download: either build a Word download or drop the wording.
9. **Dates**: the database stamps `updated_at` on every edit, so tweaking a title re-dates the page (27 guides were re-dated yesterday). A `content_updated_at` column would fix it (a database migration).
10. **Search Console**: once merged, resubmit the sitemap and request indexing for the workflow and /ai-for pages as their drafts are approved. If you can share a Search Console export (queries and pages with impressions and CTR), I can target the titles with the most impressions and lowest click-through.
11. **Bing Webmaster Tools**: worth adding the site (it can import from Search Console), then IndexNow covers new pages automatically.
12. Still open from before: rotate ADMIN_PASSWORD and SUPABASE_SERVICE_ROLE_KEY in Vercel (as Secret), and Vercel's suggested apex A record. http://www.buildcopilot.ai takes two redirects; one domain-settings change fixes it.

## Overnight checks

- Midnight daily ideas launch: **live and verified at 00:03.** The pipeline commit pushed at 00:01:59 and Vercel deployed by 00:02:47. Monday's idea is on the homepage; the Daily nav link shows on the home, about and services pages; /daily and /daily/2026-10-19-explain-what-moved-in-this-months-valuation return 200 with a working share image; Tuesday's page still 404s as it should; the sitemap and feed include the idea.
- 06:21 daily writer and 07:41 content task: results reported in the session when they finish.
