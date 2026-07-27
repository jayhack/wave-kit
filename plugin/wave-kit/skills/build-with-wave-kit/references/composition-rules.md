# Composition rules

## Origin

Wave Kit is Jay Hack's personal-project design system and the public component
language behind [jay.ai](https://jay.ai). Its references combine classic
math/physics diagrams with 1960s Japanese poster art, specifically Kazumasa
Nagai: strict geometry, repeated lines, optical depth, black negative space,
and concentrated cool-to-warm energy.

## Palette

Use four anchors: signal blue, heat red, energy orange, and light yellow. Black
is the canvas. Lighter and darker values support these anchors; do not present
them as independent color families.

## Type

Use the native system sans stack installed by
`@jayhack/wave-kit/styles.css`. Headlines are extrabold and tightly tracked;
body copy is approximately 16.5px with a 32px line height. Keep page titles
proportional to the reading column and visible content. Do not use oversized
hero text by default. Reserve the platform monospace stack for tokens and
technical values.

## Layout and shape

Long-form pages use a centered 42rem reading column inside a 78rem shell, with a
quiet sticky index on wide screens. Panels use Tailwind `rounded-lg`; images use
`rounded-xl`. Prefer dividers and whitespace to unnecessary nested cards.

Buttons and backlinks are compact and rectangular. Do not turn them into pills.
Use modest radii on panels and sections.

Default to the structure of a blog post: one vertical reading flow, semantic
sections, paragraphs, and images or interactive assets placed near the text
they explain. Do not replace this with a dashboard grid unless the content
genuinely requires one.

Practice aggressive visual editing. Avoid decorative eyebrows, numbered section
labels, badges, metadata chips, and other AI-generated interface filler that
adds no meaning or function. Do not restate a heading in a smaller label above
it. Remove any element that does not improve comprehension, navigation, or
interaction.

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
cells have slightly rounded corners and generous black gutters, and energy
moves through the canonical cool-to-warm palette. Let the built-in decay settle
low energy to black. Do not add a second automatic ripple loop around the
component.

## Application stack

Prefer Next.js, deploy on Vercel, compose with Tailwind CSS v4, and use shadcn/ui
for accessible application controls outside Wave Kit's scope. Restyle shadcn
primitives with Wave Kit tokens; do not introduce a competing theme.
