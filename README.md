![wave-kit over the expanding cellular WaveField](.github/assets/wave-kit-header.png)

# Wave Kit

The public component system behind jay.ai: a compact React package, a working
showcase site, and an agent skill that teaches agents how to compose it.

**Website:** [wave-kit.dev](https://wave-kit.dev) — the live styleguide and
component reference.

Wave Kit is built for **technical writing** — blog posts and project writeups
that mix prose, Python source, and the figures generated alongside it, then ship
as a page or a README. It emphasizes simplicity, legibility, and a vertical
reading model over landing-page chrome.

## Install

The package is published to npm. Install it alongside Tailwind CSS v4:

```bash
npm install @jayhack/wave-kit tailwindcss
```

Then wire the global stylesheet:

```bash
npx wave-kit init
```

`wave-kit init` points your global CSS at Wave Kit and, in a fresh
`create-next-app` project, clears the starter's light-mode defaults so the dark
canvas takes over. It is idempotent. To do it by hand instead, import both
stylesheets once, in order, from your application's global CSS:

```css
@import "tailwindcss";
@import "@jayhack/wave-kit/styles.css";
```

Then compose the real exports:

```tsx
import { CodeBlock, ImageCard, Lightbox, MediaRow, ProgressiveImage, WaveField } from "@jayhack/wave-kit";
```

`CodeBlock` highlights `python`, `bash`, `css`, `json`, `tsx`, and `text`; use
`ProgressiveImage` with `Lightbox` for figures, `ImageCard` for compact
image-led links, and `MediaRow` for editorial indexes with right-side previews.
For research writeups, register
runs as JSON `ExperimentRecord`s and render them with `ExperimentIndex` and
`ExperimentPage`. See [wave-kit.dev](https://wave-kit.dev) and
[jay.ai/design](https://jay.ai/design) for the canonical visual reference and
live examples.

> Use the scoped name `@jayhack/wave-kit`. The unscoped `wave-kit` on npm is a
> different, unrelated package.

## Agent skill (optional)

The repository includes a `build-with-wave-kit` skill that teaches an agent to
install the package and compose it with the correct visual language. **It is
optional** — you can install `@jayhack/wave-kit` and build directly, pointing any
agent at this README, the package's exported types, and jay.ai/design.

If you do want it, install it through the open [`skills`](https://www.npmjs.com/package/skills)
CLI. It works with any supported agent, including Claude Code:

```bash
npx skills add jayhack/wave-kit --skill build-with-wave-kit -y
```

Drop `-y` to choose the install scope interactively, or add `--list` to preview
the available skills without installing.

## Workspace

- `packages/wave-kit`: the publishable React package
- `apps/docs`: the public showcase and component reference ([wave-kit.dev](https://wave-kit.dev))
- `plugin/wave-kit`: the installable plugin wrapping the Wave Kit skill

Run `npm install`, then `npm run dev`. Build everything with `npm run build`.
