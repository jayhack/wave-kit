# Component reference

Import runtime pieces from `wave-kit`. In the application stylesheet, import
`tailwindcss` first and `wave-kit/styles.css` second.

## Navigation and links

- `BackLink`: the history-aware inline back control used on jay.ai blog pages.
  `fallbackHref` handles direct visits.
- `GitHubButton`: compact external source button with the GitHub mark.
- `TextLink`: inline link with `sky`, `amber`, or `quiet` tone.
- `NavigationIndex`: accepts readonly `[id, label]` tuples.

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

## Generative field

- `WaveField`: the exact jay.ai `FluidAnimation` rendered in cellular mode with
  a black resting field and large gutters.
- `FluidAnimation`: lower-level export for character/cell mode, face fit, cell
  size, frame rate, device-pixel ratio, and automatic ripple control.

## Tokens

- `waveColorFamilies`: the four canonical anchors and their associated shades.
- `wavePalette`: the flattened animation palette.
- `waveColors` and `waveRadii`: lower-level token objects.
