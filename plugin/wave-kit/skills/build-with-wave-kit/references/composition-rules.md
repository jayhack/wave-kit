# Composition rules

## Palette

Use four anchors: signal blue, heat red, energy orange, and light yellow. Black
is the canvas. Lighter and darker values support these anchors; do not present
them as independent color families.

## Type

Use the native system sans stack installed by `wave-kit/styles.css`. Headlines
are extrabold and tightly tracked; body copy is approximately 16.5px with a
32px line height. Small labels and eyebrows stay in system sans. Reserve the
platform monospace stack for tokens and technical values.

## Layout and shape

Long-form pages use a centered 42rem reading column inside a 78rem shell, with a
quiet sticky index on wide screens. Panels use Tailwind `rounded-lg`; images use
`rounded-xl`. Prefer dividers and whitespace to unnecessary nested cards.

## Motion

Hover and focus changes are immediate: do not add transition utilities to
hover color, border, transform, or position states. Progressive image opacity
may fade for 500ms. The cellular field may animate continuously and already
honors reduced motion.

## Images

Use the original project assets when they are supplied. Reserve intrinsic
dimensions, load a tiny inline placeholder, use responsive sources, decode
asynchronously, and open the original asset through `Lightbox`.

## Wave field

Use the package `WaveField`; do not reimplement it. The resting state is black,
cells have generous black gutters, and energy moves through the canonical
cool-to-warm palette.
