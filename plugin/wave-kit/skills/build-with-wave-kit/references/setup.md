# Project setup

## Requirements

- React and React DOM 18.3 or newer
- Tailwind CSS 4.1 or newer
- A React framework; prefer Next.js for new applications

## Install

The package is published to npm. Install it with the host project's package
manager:

```bash
npm install @jayhack/wave-kit tailwindcss
```

Confirm the scoped name resolves before installing if you want to be explicit:

```bash
npm view @jayhack/wave-kit version
```

Use the scoped name `@jayhack/wave-kit`. The unscoped `wave-kit` is a different,
unrelated package — do not install it. If you are working inside a local
checkout of this repository (for example, contributing to Wave Kit itself),
install the package workspace directly instead:

```bash
npm install /absolute/path/to/wave-kit/packages/wave-kit tailwindcss
```

Do not copy the source
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

For the page structure itself, start from the canonical responsive shell (42rem
reading column, 78rem outer shell, sticky index at `xl`, single scrolling column
below it). It is specified with a copyable recipe under "Responsive layout" in
[composition-rules.md](composition-rules.md); reproduce it rather than inventing
a new layout per page.

## Technical writing: code and figures

The most common use is a technical blog post or project writeup: some prose,
Python source, and the figures generated alongside it (charts, diagrams). Build
the page as a vertical reading column and intersperse assets with the text.

Render source with `CodeBlock`. It highlights `python`, `bash`, `css`, `tsx`,
and `text`:

```tsx
import { CodeBlock } from "@jayhack/wave-kit";

<CodeBlock
  label="fit.py"
  language="python"
  code={`import numpy as np

def fit(xs, ys):
    # least-squares slope and intercept
    slope = np.cov(xs, ys)[0, 1] / np.var(xs)
    return slope, ys.mean() - slope * xs.mean()`}
/>;
```

Render figures with `ProgressiveImage`, and wrap them in a `Lightbox` trigger so
a reader can inspect a chart full size. Export figures as WebP (photographic
plots) or SVG (line diagrams), reserve their intrinsic dimensions, and label
every axis and series rather than relying on color alone.

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
