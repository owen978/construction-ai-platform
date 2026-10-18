---
title: "Check the drawings on site are the latest revision"
slug: "check-the-drawings-on-site-are-the-latest-revision"
summary: "Compare the drawings actually in use on site with the drawing register and get a clear list of anything superseded, missing or not issued for construction."
roles: [site-manager, document-control]
task: "drawings"
contractForms: []
tool: "any"
timeByHandMins: 60
timeWithAiMins: 25
difficulty: "beginner"
riskIfWrong: "medium"
relatedWorkflow: ""
sourceKind: "owen"
sourceUrl: ""
sourceLabel: ""
status: "approved"
---

## When to use it
Once a week, and always after a batch of revised drawings comes in. Building off a superseded drawing is one of the most avoidable causes of rework, and a quick list comparison catches most of it before anything gets built.

## Prompt
You are helping a UK site manager check that the drawings in use on site are current. Below are two lists.

1. The drawing register: drawing number, title, latest revision and status (for example Preliminary, For information, For construction).
2. The drawings I found in use on site: drawing number, title and revision, and where each one was (site office wall, a subcontractor's pack, a tablet, a gang box).

Compare them and give me a table with these columns: Drawing number, Title, Revision on site, Latest revision on register, Where found, Result. Use one of these results: Current, Superseded, Not for construction, Not on register, or On register but not found on site.

Then list, in this order:
- Every superseded or not-for-construction drawing, with where it was found, so I can remove it.
- Drawings on the register that nobody on site seems to have.
- Any drawing numbers or titles that nearly match but not exactly, in case of a typo on either list.

Rules: only compare what is in the two lists. Do not assume a revision is current because it is the highest you can see. Use UK spelling.

Drawing register:
[PASTE REGISTER]

Drawings found on site:
[PASTE YOUR LIST]

## What it produced
A single table with a result against every drawing, followed by a short removal list of superseded and not-for-construction copies grouped by where they were found, a list of current drawings missing from site, and a few near matches flagged for a second look.

## What you still check
- The register itself is up to date with the latest transmittals. The check is only as good as the register.
- Superseded copies are physically removed or clearly stamped, including in subcontractors' packs and on tablets.
- Anything already built from a superseded drawing is raised with the design team straight away.
- Drawings marked preliminary or for information aren't being worked from.

## Steps
1. Walk the site office and the work areas and list every drawing in use, with its revision and where it was.
2. Export the drawing register and run the prompt.
3. Pull the superseded copies the same day and issue current ones where they're missing.
