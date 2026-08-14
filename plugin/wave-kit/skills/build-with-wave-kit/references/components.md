# Component reference

Import runtime pieces from `wave-kit`. In the application stylesheet, import
`tailwindcss` first and `@jayhack/wave-kit/styles.css` second.

## Navigation and links

- `BackLink`: the history-aware inline back control used on jay.ai blog pages.
  Pass `fallbackHref` for direct visits and optional string children.
- `GitHubButton`: compact external source button. Pass `href`, children, and
  optional `className`.
- `TextLink`: inline link with `orange`, `sky`, `amber`, or `quiet` tone.
  Ripe orange is the default long-form accent; do not make an entire
  supporting sentence a link.
- `NavigationIndex`: pass readonly `[id, label]` tuples whose IDs match page
  heading IDs. It renders a continuous rail and tracks the active section.

```tsx
const sections = [
  ["overview", "Overview"],
  ["details", "Details"],
] as const;

<NavigationIndex items={sections} />
```

## Structure

- `CodeBlock`: consistently highlighted `python`, `bash`, `css`, `json`,
  `text`, or `tsx`. Pass the source as `code`, the `language`, and an optional
  technical `label` (such as the file name). Use `python` for post source and
  `text` for output or anything without a supported grammar.
- `EditableTitle` and `EditableText`: static title and paragraph renderers that
  become click-to-edit controls only during local development. Both require a
  stable `id`; they save to versioned local storage by default. Pass `onSave`
  to persist `{ id, value }` through the consuming app's development-only
  route or server action. Pass `demo` for a production-visible playground that
  keeps edits in memory only and resets on reload.
- `Divider`: quiet full-width rule with `subtle` or `strong` emphasis.
- `Tabs`: accepts `items: { id, label, content }[]` and optional `label`.
  Arrow, Home, and End keys move focus.

## Images

- `ImageCard`: compact, equal-height image card with edge-to-edge media, a
  golden-ratio image area by default, one title line, at most two description
  lines, and one full-card link target. Pass responsive
  `src`/`srcSet`/`placeholder` for the card preview.
- `MediaRow`: full-row editorial link with title, metadata, clamped supporting
  copy, and an optional 1.91:1 progressive preview. Media stacks below the copy
  on mobile and moves right at wider breakpoints. Use `renderLink` to retain a
  host framework's client-side routing and prefetch behavior.
- `ProgressiveImage`: use the blog image pipeline's responsive `src`,
  `srcSet`, intrinsic `width`/`height`, and tiny inline `placeholder`.
- `Lightbox`: accepts
  `items: { src, alt, caption?, previewSrc?, placeholder? }[]`, `startIndex`,
  and `onClose`. Pass the responsive image's `currentSrc` as `previewSrc` so
  the lightbox paints the already-decoded candidate immediately, then fades in
  `src`. It includes gallery arrows, counter, thumbnails, backdrop close, and
  keyboard controls.

Keep lightbox state in a client component:

```tsx
const [openIndex, setOpenIndex] = useState<number | null>(null);
const [previewSrc, setPreviewSrc] = useState<string>();
const images = [{ src: "/work.webp", alt: "Project diagram" }];

<button onClick={() => setOpenIndex(0)} type="button">
  <ProgressiveImage
    alt={images[0].alt}
    height={900}
    onLoad={(event) => setPreviewSrc(event.currentTarget.currentSrc)}
    placeholder={tinyPlaceholder}
    src="/work-1024.webp"
    srcSet="/work-672.webp 672w, /work-1024.webp 1024w"
    width={1024}
  />
</button>
{openIndex !== null ? (
  <Lightbox
    items={[{ ...images[0], previewSrc, placeholder: tinyPlaceholder }]}
    onClose={() => setOpenIndex(null)}
    startIndex={openIndex}
  />
) : null}
```

## Experiment registry

Register research experiments as data, then render them; do not hand-build
one-off experiment lists. The registry is a JSON array of `ExperimentRecord`:

```json
[
  {
    "slug": "nano-1p5mb",
    "title": "The 1.5 MB capacity cliff",
    "description": "A width-72, four-block transformer with 10.27x fewer parameters.",
    "date": "2026-07-14",
    "metrics": [{ "label": "12-frame error", "value": "4.98 px" }],
    "meta": { "preset": "nano", "parameters": "357k" }
  }
]
```

- `parseExperiments`: validates loaded JSON and returns typed records. Use it
  at the module boundary when importing a `.json` registry.
- `ExperimentIndex`: renders the registry as a compact list of linked rows —
  title with a quiet `• date` beside it (system sans, not monospace), a
  one-line description, and a gray chevron. Rows link to
  `/experiments/<slug>` unless the record sets `href`; pass `hrefFor` to
  remap routes. Do not add eyebrow labels, badges, or per-row metrics;
  results belong on the experiment page.
- `ExperimentPage`: the detail-page shell. It renders the header (title, quiet
  timestamp, description, optional `backHref`), then its free-form `children`,
  then the record's `metrics` table and quiet `meta` footer. Page-specific
  figures, rollouts, or interactive code belong in the children.
- `ExperimentHeader`, `ExperimentMetrics`, `ExperimentMeta`: the individual
  pieces when a page needs a custom arrangement. `ExperimentHeader` accepts
  `level` (1–3) when the page already has an `h1`.

All experiment components are server-renderable; only make the page a client
component when its custom body needs state.

## Diagrams

Create diagrams as original SVG assets with intrinsic dimensions and complete
text labels. Present them through `ProgressiveImage` and open the source SVG
through `Lightbox`. Keep axes, series, stages, units, and color roles explicit.
Do not rely on color alone to communicate a distinction.

## Generative field

- `WaveField`: the exact jay.ai `FluidAnimation` rendered in cellular mode with
  a black resting field and large gutters. Give its parent an explicit height
  or aspect ratio.
- `FluidAnimation`: lower-level export for character/cell mode, face fit, cell
  size, frame rate, device-pixel ratio, and automatic ripple control.

## Tokens

- `waveColorFamilies`: the four canonical anchors and their associated shades.
- `wavePalette`: the flattened animation palette.
- `waveColors`, `waveTailwindColors`, and `waveRadii`: lower-level token
  objects.

Importing `@jayhack/wave-kit/styles.css` adds named Tailwind utilities for:

- `wave-ink` and `wave-paper`
- `wave-blue`, `wave-blue-vivid`, and supporting blue shades
- `wave-red`, `wave-red-vivid`, and `wave-red-hot`
- `wave-orange` and supporting orange shades
- `wave-amber`, `wave-yellow`, and `wave-yellow-pale`

Use them through normal utilities such as `bg-wave-ink`,
`text-wave-blue-light`, and `border-wave-amber`.
