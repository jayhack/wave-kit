# Composition rules

## Palette

Use four anchors: black, blue, red, and yellow. Black is the canvas, blue is
signal, red is heat, and yellow is energy. Lighter and darker values support
these anchors; do not present them as new families.

## Type

Use a neutral sans serif for display and body copy. Use monospace only for
eyebrows, code, labels, and compact system information. Eyebrows are uppercase,
small, tracked, and always monospace.

## Shape and hierarchy

Controls are compact rectangles with a 3px radius. Panels and media use a 4–6px
radius. Prefer dividers and whitespace to nested cards. Keep the navigation
index quiet and vertical on wide layouts; it may disappear or become a compact
horizontal index on small screens.

## Motion

Hover and focus state changes are immediate: no animated color, transform,
scale, underline, or position transitions. Progressive images may fade after
loading. The cellular field may animate continuously and should honor the
application's reduced-motion policy when one exists.

## Images

Reserve intrinsic dimensions, load an intentionally tiny placeholder, use
responsive sources, decode asynchronously, and open the full asset through
`LightboxImage`. Captions belong below the image and inside the lightbox.

## Wave field

The resting state is nearly or completely black. Render separated cells with
generous black gutters. Energy moves from blue through red to yellow, but most
of the frame should remain black at any instant.
