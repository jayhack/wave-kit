---
name: build-with-wave-kit
description: Build, migrate, or restyle React and Next.js interfaces with Wave Kit, Jay Hack's open component system for jay.ai. Use when a user requests the jay.ai aesthetic, Wave Kit installation or components, its cellular wave motif, progressive lightbox images, navigation index, JSON-registered experiment indexes and pages, rectangular controls, tabs, dividers, typography, or named cool-to-warm Tailwind palette.
---

# Build With Wave Kit

Wave Kit is the public React design system behind
[jay.ai](https://jay.ai). It emphasizes simplicity and legibility, drawing
from classic math and physics diagrams and 1960s Japanese poster art,
especially Kazumasa Nagai.

Treat [jay.ai/design](https://jay.ai/design) as the canonical visual reference
and the installed `@jayhack/wave-kit` package as the implementation source of
truth. Compose real exports; do not copy component implementations into the
host project.

The primary use case is technical writing: a blog post or project writeup that
mixes prose, Python source, and the figures generated alongside it, then ships
as a page or a README. Optimize for that first — a vertical reading column,
`CodeBlock` for source, `ProgressiveImage` plus `Lightbox` for figures, and
`ImageCard` for compact image-led links.

## This skill is optional

This skill is a convenience, not a dependency. Wave Kit works without it: a
person or agent can install `@jayhack/wave-kit`, read this repository's
`README.md` and the package's exported types, and compose components directly.
Use the skill when you want the workflow and guardrails below applied
automatically.

If you do want it installed into an agent, it is published through the open
`skills` CLI and works with any supported agent (including Claude Code):

```bash
npx skills add jayhack/wave-kit --skill build-with-wave-kit -y
```

Drop `-y` to choose the scope interactively, or add `--list` to see the
available skills without installing anything.

## Workflow

1. Inspect the project framework, package manager, React version, styling entry
   point, and existing user changes.
2. Read [references/setup.md](references/setup.md), then install the package and
   run `npx wave-kit init` to wire the stylesheet, without replacing the host
   project's architecture.
3. Read [references/composition-rules.md](references/composition-rules.md)
   before making visual decisions.
4. Read the relevant portion of
   [references/components.md](references/components.md). Verify the installed
   package exports if its version differs from this skill.
5. Build with Wave Kit components and named Tailwind colors. Use shadcn/ui only
   for application primitives the kit does not provide.
6. Keep content and page structure project-specific. Extend Wave Kit with
   composition, not copied or subtly modified package source.
7. Run typecheck, lint, tests, and a production build. Exercise keyboard
   interactions for tabs and lightboxes and inspect narrow and wide layouts.

## Guardrails

- Preserve existing application architecture and unrelated user changes.
- Keep React, React DOM, and Tailwind CSS v4 in the host application; they are
  peer dependencies.
- Keep the intended stack Next.js, Vercel, Tailwind CSS, and shadcn/ui unless
  the host project already has an equivalent architecture.
- Prefer semantic page structure over wrapping every section in a card.
- Default to a blog-post reading model: vertical scrolling, semantic sections,
  paragraphs, and images or interactive assets interspersed with the text they
  support.
- Remove ornamental UI. Do not add eyebrows, sequence numbers, badges, or
  labels that merely repeat nearby content.
- Keep page titles restrained. Do not use oversized hero text that delays the
  useful content or makes every page resemble a landing page.
- Prefer simplicity and minimalism. If an element adds no meaning, navigation,
  or function, remove it.
- Keep hover state changes immediate. Image loading fades are allowed.
- Keep the resting wave field black with visible black gutters between cells.
- Use four chromatic anchors: signal blue, heat red, energy orange, and light
  yellow. Associated shades are not separate color families.
- Do not add brown as a color family.
- Use system sans for headings, body, and meaningful labels. Reserve monospace
  for code, tokens, metrics, and technical values.
- Use original supplied imagery with `ProgressiveImage` and `Lightbox`; do not
  substitute generic cards or a second gallery implementation.
- Do not package copyrighted inspiration artwork.

## Missing Package Support

If an export does not cover the request, first compose existing exports and CSS
variables. If a genuinely reusable primitive is missing, implement it in the
`wave-kit` repository and consume the new package version rather than forking
source into the application.
