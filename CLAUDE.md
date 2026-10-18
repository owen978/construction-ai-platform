# BuildCopilot (buildcopilot.ai)

Free AI workflows, prompts, templates and guides for UK construction professionals, run by Owen Hagger (QS, Contractor Systems). The site's job is to win trust and send people to two calls to action:

1. **£950 AI Roadmap Review** (primary): booked through the GoHighLevel (GHL) booking widget.
2. **Free weekly newsletter** (secondary): the GHL form on `/newsletter` and the inline embeds.

## Stack and commands

- Next.js 16 (App Router), React 19, Tailwind 4, shadcn/ui; content in Supabase; hosted on Vercel.
- **Pushing `main` deploys production.** Check the deploy via the "Vercel" commit status on GitHub.
- `npm run dev`, `npm run build`, `npx tsc --noEmit`, `npx eslint .` (should report 0 problems).
- Preview server: `.claude/launch.json` → `dev` on port 3000. If it hangs on start, macOS is asking whether `node` may access the Documents folder.

## Where content lives

- Supabase tables: `workflows`, `guides`, `templates`, `roles`, `tasks`, `tools` (+ `prompts`, `content_posts`). RLS lets the public read only `status = 'published'` rows. Pages revalidate hourly.
- Admin CMS at `/admin` (single `ADMIN_PASSWORD`, signed session cookie).
- Guides are written as Markdown in `marketing/articles/` and published with `node scripts/publish-guide.mjs <file>`; templates with `scripts/publish-template.mjs`.
  - These upsert by slug and **overwrite every field**, including SEO titles tuned by other scripts. Before republishing, compare the live row with the Markdown.
  - Database writes go live immediately (within the hourly revalidation), without a deploy.
- `marketing/articles/CONTENT-BACKLOG.md` drives the scheduled **buildcopilot-weekly-content** task (Mon and Thu, 07:30). It works in this folder, publishes the next queued row, commits `marketing/` and runs `git push origin main`. Anything committed on local `main` ships with it.

## Key files

| File | What it does |
|---|---|
| `src/lib/site.ts` | `SITE_URL`, trimmed (the Vercel env var once had a trailing newline). Never read `NEXT_PUBLIC_SITE_URL` directly. |
| `src/lib/metadata.ts` | `pageMetadata()`: canonical, Open Graph and Twitter tags per page. Next.js replaces top-level metadata keys rather than merging, so always use it. Pass `routeImage: true` on routes with an `opengraph-image.tsx`. |
| `src/lib/og-image.tsx` | Shared renderer for the per-page share images in `*/[slug]/opengraph-image.tsx`. |
| `src/lib/ghl.ts` | Every GHL URL; `bookingUrl(content)` adds UTM tags. |
| `src/lib/service-cta.ts` | `ROADMAP_REVIEW_OFFER` (the only place its price, guarantee and credit terms live; must match `/services`) and the per-page offers in `SERVICE_CTA_MAP`. |
| `src/lib/features.ts` | Feature switches. `copilot` is off while aiconstructioncopilot.com is rebuilt. |
| `src/lib/queries/related.ts` | "Related resources" matching. |
| `next.config.ts` | Redirects and security headers. |

## Rules

- UK spelling. Never name clients. Never invent figures, results or testimonials.
- One commit per change. Don't push to `main`, or write to the production database, until Owen says so. After a push, wait for the Vercel deploy and verify on the live site.
- `robots.txt` comes only from `src/app/robots.ts`, and the sitemap from `src/app/sitemap.ts`.
- The templates table type in `src/types/database.ts` was added by hand. Keep it in step with `schema/templates-migration.sql`.
