# AI-for extras

Extra text for the /ai-for/ role and task hubs, one file per page slug (e.g. `quantity-surveyor.md`, `snagging-and-defects.md`): an overview, where AI helps most, where to be careful, and FAQs. The FAQs also produce FAQPage structured data. Many of these hubs had barely any text of their own, which is why Google crawled them without indexing them.

`status: "draft"` files only show in local development. Change to `status: "approved"` once Owen has reviewed the copy; it then appears on the live site at the next deploy. Format: see scripts/build-ai-for-extras.mjs. UK spelling, no em dashes (the build rejects them), no invented figures, and a "check your contract and take advice" line wherever notices or legal timings come up.
