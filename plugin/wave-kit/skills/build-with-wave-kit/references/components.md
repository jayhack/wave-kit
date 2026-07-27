# Component reference

Import runtime pieces from `wave-kit`. In the application stylesheet, import
`tailwindcss` first and `wave-kit/styles.css` second.

## Navigation and links

- `BackLink`: the history-aware inline back control used on jay.ai blog pages.
  Pass `fallbackHref` for direct visits and optional string children.
- `GitHubButton`: compact external source button. Pass `href`, children, and
  optional `className`.
- `TextLink`: inline link with `sky`, `amber`, or `quiet` tone. Amber is the
  long-form accent; do not make an entire supporting sentence a link.
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

- `Divider`: quiet full-width rule with `subtle` or `strong` emphasis.
- `Tabs`: accepts `items: { id, label, content }[]` and optional `label`.
  Arrow, Home, and End keys move focus.

## Images

- `ProgressiveImage`: use the blog image pipeline's responsive `src`,
  `srcSet`, intrinsic `width`/`height`, and tiny inline `placeholder`.
- `Lightbox`: accepts `items: { src, alt, caption? }[]`, `startIndex`, and
  `onClose`. It includes gallery arrows, counter, thumbnails, backdrop close,
  and keyboard controls.

Keep lightbox state in a client component:

```tsx
const [openIndex, setOpenIndex] = useState<number | null>(null);
const images = [{ src: "/work.webp", alt: "Project diagram" }];

<button onClick={() => setOpenIndex(0)} type="button">
  <ProgressiveImage
    alt={images[0].alt}
    height={900}
    placeholder={tinyPlaceholder}
    src="/work-1024.webp"
    srcSet="/work-672.webp 672w, /work-1024.webp 1024w"
    width={1024}
  />
</button>
{openIndex !== null ? (
  <Lightbox
    items={images}
    onClose={() => setOpenIndex(null)}
    startIndex={openIndex}
  />
) : null}
```

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

Importing `wave-kit/styles.css` adds named Tailwind utilities for:

- `wave-ink` and `wave-paper`
- `wave-blue`, `wave-blue-vivid`, and supporting blue shades
- `wave-red`, `wave-red-vivid`, and `wave-red-hot`
- `wave-orange` and supporting orange shades
- `wave-amber`, `wave-yellow`, and `wave-yellow-pale`

Use them through normal utilities such as `bg-wave-ink`,
`text-wave-blue-light`, and `border-wave-amber`.
