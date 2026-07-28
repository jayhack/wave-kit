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

## Responsive layout

There is one canonical page shell. Reproduce it rather than inventing a new
responsive structure per page.

```tsx
<div className="min-h-screen bg-wave-ink text-neutral-200">
  {/* Shell: full width, capped at 78rem, with padding that grows on wider screens */}
  <div className="mx-auto w-full max-w-[78rem] px-5 py-10 sm:py-16">
    {/* Below 72rem: one column. At/above 72rem: [gutter | 42rem reading column | gutter]. */}
    <div className="min-[72rem]:grid min-[72rem]:grid-cols-[minmax(0,1fr)_minmax(0,42rem)_minmax(0,1fr)] min-[72rem]:gap-8">
      {/* Sticky index — wide screens only */}
      <aside className="hidden min-w-0 min-[72rem]:block">
        <div className="sticky top-1/2 -translate-y-1/2">
          <NavigationIndex items={sections} />
        </div>
      </aside>

      {/* Reading column: centered 42rem below 72rem, the grid's middle cell above it */}
      <main className="mx-auto min-w-0 max-w-2xl min-[72rem]:mx-0 min-[72rem]:max-w-none">
        {/* sections … */}
      </main>

      {/* Balances the trailing gutter so the reading column stays centered */}
      <div aria-hidden className="hidden min-[72rem]:block" />
    </div>
  </div>
</div>
```

Rules:

- The reading measure is `max-w-2xl` (42rem / 672px). Keep body content in this
  column; do not widen prose to the full shell.
- `72rem` (1152px) is the single layout breakpoint, expressed as the arbitrary
  variant `min-[72rem]:` so the shell is self-contained and needs no Tailwind
  config in the host project. It is the point at which the side gutter first
  gets wide enough (~188px) to hold the index without crowding the 42rem
  measure; do not lower it further or the index labels start to clip.
- Below `72rem` the page is a single scrolling column and the sticky index is
  hidden — that absence is intended, not a bug. Do not add a floating or fixed
  mobile index that overlaps the text; the vertical reading flow *is* the
  navigation on narrow screens.
- Put `min-w-0` on grid and flex children that contain code, tables, or long
  tokens. Without it a wide child forces the whole page to scroll sideways on a
  phone.
- Any element that can exceed the measure — `CodeBlock`, wide tables, diagrams —
  must scroll inside its own `overflow-x-auto` container. `CodeBlock` already
  does this; give hand-authored tables the same treatment. The page body itself
  must never scroll horizontally.
- Keep shell padding as `px-5 py-10 sm:py-16`; let the reading column collapse to
  full width (minus padding) on small screens rather than adding extra mobile
  breakpoints.

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

## Diagrams

Treat diagrams as academic figures rather than illustrations. Prefer original
SVGs with crisp geometry, sparse composition, explicit axes, units, legends,
stage labels, and captions. Every color has a stable semantic role:

- `wave-paper` for primary labels and high-contrast values
- `wave-blue-vivid` for observations, measured structure, and primary series
- `wave-red-vivid` for interventions, causal emphasis, and comparison series
- `neutral-700` for axes, guides, borders, and secondary structure

Use shape, position, line style, or a direct text label alongside color so the
meaning survives grayscale and color-vision differences. Make diagrams
clickable and open the source SVG through `Lightbox`.

## Code

Use the package `CodeBlock` for displayed code so bash, CSS, text, and TSX use
one syntax-color mapping. Reserve monospace for the code and its optional
technical label; do not hand-roll page-specific tokenizers.

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
