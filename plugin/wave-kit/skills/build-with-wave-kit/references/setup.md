# Project setup

## Requirements

- React and React DOM 18.3 or newer
- Tailwind CSS 4.1 or newer
- A React framework; prefer Next.js for new applications

## Install

First check whether the public package is available:

```bash
npm view wave-kit version
```

When it resolves, use the host project's package manager:

```bash
npm install @jayhack/wave-kit tailwindcss
```

If the registry returns `404` and this repository is available locally, install
the package workspace directly:

```bash
npm install /absolute/path/to/wave-kit/packages/wave-kit tailwindcss
```

Do not install an unrelated similarly named package. Do not copy the source
directory into the host application.

Keep React, React DOM, and Tailwind in the application. Wave Kit declares them
as peer dependencies.

## Load styles

Import both stylesheets exactly once in the application's global CSS entry:

```css
@import "tailwindcss";
@import "@jayhack/wave-kit/styles.css";
```

The second import registers the system font stack, utilities, and semantic
`wave-*` Tailwind colors.

## Start composing

Import components from the package root:

```tsx
import {
  Divider,
  GitHubButton,
  NavigationIndex,
  TextLink,
  WaveField,
} from "@jayhack/wave-kit";
```

Give canvas components real dimensions:

```tsx
<div className="relative aspect-[16/7] overflow-hidden rounded-lg bg-wave-ink">
  <WaveField className="absolute inset-0 h-full w-full" />
</div>
```

Use named colors instead of copying hex values:

```tsx
<TextLink href="/writing">Read the essay</TextLink>
<div className="border-wave-blue-vivid bg-wave-ink text-wave-paper" />
```

## Next.js boundaries

Interactive Wave Kit exports already declare client boundaries. A consuming
page only needs `"use client"` when it owns state or event handlers, such as
opening `Lightbox`. Keep static page structure in Server Components when
possible.

## shadcn/ui

Use shadcn/ui for forms, menus, dialogs, tables, and other application controls
Wave Kit does not provide. Keep its accessible behavior, then apply Wave Kit
colors, typography, rectangular shapes, and immediate hover states.

## Verify

Run the host project's typecheck, lint, tests, and production build. Check:

- the global CSS imports are present once and in order;
- section IDs match `NavigationIndex` items;
- progressive images reserve intrinsic dimensions;
- lightboxes close with Escape and restore focus;
- tabs work with arrows, Home, and End;
- hover changes do not animate;
- the wave field remains black between cells.
