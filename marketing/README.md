# BuildCopilot Marketing & Growth Hub

Everything for growing buildcopilot.ai lives in this `marketing/` folder. This is the index. Start here.

## The content engine (automated)

| File | What it is |
|------|------------|
| `articles/CONTENT-BACKLOG.md` | The master list of articles to publish. Wave 1 = fix existing keyword gaps. Wave 2 = new pages from Ahrefs research. The weekly scheduled task works through this top to bottom. |
| `articles/*.md` | The published/draft article source files (Markdown with frontmatter). |
| `linkedin-weekly/` | Auto-generated LinkedIn + group posts for each week's new article, ready to paste. |
| `../scripts/publish-guide.mjs` | The publish engine. `node scripts/publish-guide.mjs articles/<file>.md` puts an article live. |

**How publishing works:** an article is a Markdown file in `articles/`. Running the publish script inserts it into the Supabase `guides` table and it goes live at `/guides/<slug>` immediately (no deploy needed). The weekly scheduled task does this automatically every Monday.

## Research (the strategy behind the content)

| File | What it is |
|------|------------|
| `keyword-research.md` | Real Ahrefs data. The full list of pages worth building, by search volume and difficulty. This is the source for Wave 2 of the backlog. |
| `guest-post-research.md` | Target sites for backlinks via guest posting. |

## Promotion (manual, at your pace)

| File | What it is |
|------|------------|
| `directory-submissions.md` | Verified-free directory list with ready copy. Background task. |
| `linkedin-posts.md` | 20 pre-written launch posts. |
| `product-hunt-launch.md` | Product Hunt + Show HN copy. Save for a proper launch day. |
| `social-profiles.md` | Ready copy for LinkedIn company page and X/Twitter profile. |

## Brand assets

- `linkedin-banner.png`, `twitter-banner.png` — social header images.

## Current priorities (June 2026)

1. Content engine is running automatically (weekly). No action needed beyond pre-approving the scheduled task once.
2. Create a LinkedIn company page (copy in `social-profiles.md`), then send the URL to wire into the site's GEO schema.
3. Keep chipping at directory submissions at your own pace.
4. Later dev sprint: build the page types in the backlog marked "need a developer" (ChatGPT prompt hubs, tool comparison pages, UK compliance section).
