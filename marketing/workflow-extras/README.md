# Workflow extras

Extra sections for workflow pages, one file per workflow slug (e.g. `write-variation-assessment.md`): "When not to use it", "Common mistakes" and FAQs. The FAQs also produce FAQPage structured data.

`status: "draft"` files only show in local development. Change to `status: "approved"` once Owen has reviewed the copy; it then appears on the live site at the next deploy. Format and rules: see scripts/build-workflow-extras.mjs. UK spelling, no em dashes, no invented figures, and a "check your contract and take advice" line wherever notices or legal timings come up.
