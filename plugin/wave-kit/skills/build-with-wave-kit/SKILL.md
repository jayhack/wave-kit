---
name: build-with-wave-kit
description: Build or restyle React interfaces with Wave Kit, the open jay.ai component system. Use when a user requests the jay.ai aesthetic, Wave Kit components, its cellular wave motif, lightbox images, navigation index, rectangular controls, tabs, dividers, typography, or palette.
---

# Build With Wave Kit

Use the published `wave-kit` package as the source of truth. Compose its real
exports; do not copy component implementations into the host project.

## Workflow

1. Inspect the project framework, package manager, React version, styling entry
   point, and existing user changes.
2. Install `wave-kit` with the project's package manager.
3. Import `wave-kit/styles.css` exactly once at the application root.
4. Read [references/components.md](references/components.md) for the export and
   prop needed by the request.
5. Read [references/composition-rules.md](references/composition-rules.md) before
   making visual decisions.
6. Build with package components and CSS variables. Add project-specific layout
   CSS only where the package intentionally leaves composition open.
7. Run the project's typecheck/build and exercise keyboard interactions for tabs
   and lightboxes.

## Guardrails

- Preserve existing application architecture and unrelated user changes.
- Do not require Tailwind; Wave Kit ships compiled CSS.
- Keep React and React DOM in the host application. They are peer dependencies.
- Prefer semantic page structure over wrapping every section in a card.
- Keep hover state changes immediate. Image loading fades are allowed.
- Keep the resting wave field black with visible black gutters between cells.
- Do not add brown as a color family.
- Do not package copyrighted inspiration artwork.

## Missing Package Support

If an export does not cover the request, first compose existing exports and CSS
variables. If a genuinely reusable primitive is missing, implement it in the
`wave-kit` repository and consume the new package version rather than forking
source into the application.
