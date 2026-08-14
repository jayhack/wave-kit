# wave-kit

A small, dark-by-default React component system with a generative cellular
wave field, progressive lightbox images, typography, links, tabs, navigation,
syntax-highlighted code blocks, local-development editing, JSON-registered
experiment indexes and pages, and dividers.

Live styleguide: [wave-kit.dev](https://wave-kit.dev).

```bash
npm install @jayhack/wave-kit
```

```css
@import "tailwindcss";
@import "@jayhack/wave-kit/styles.css";
```

```tsx
import { ImageCard, MediaRow, NavigationIndex, WaveField } from "@jayhack/wave-kit";
```

Wave Kit is React + Tailwind CSS v4. Its stylesheet registers the package build
as a Tailwind source and installs the native system font stack and shared
utilities. React, React DOM, and Tailwind are peer dependencies.

`ImageCard` provides an edge-to-edge, golden-ratio image and compact aligned
copy in one link:

```tsx
<ImageCard
  title="Project title"
  description="One or two lines of supporting detail."
  href="/project"
  image={{
    src: "/project-1024.webp",
    fullSrc: "/project.png",
    alt: "Project preview",
    width: 1024,
    height: 640,
    placeholder: tinyPlaceholder,
  }}
/>
```

`MediaRow` provides the responsive editorial-index layout used on jay.ai, with
progressive right-side media on wide screens and stacked media on mobile:

```tsx
<MediaRow
  title="Essay title"
  meta="Jay Hack · Jul 2026"
  description="A short summary of the essay."
  descriptionLines={4}
  href="/writing/essay"
  image={{
    src: "/essay-preview.webp",
    alt: "Essay preview",
    placeholder: tinyPlaceholder,
  }}
/>
```

## Local content editing

`EditableTitle` and `EditableText` become editable only in development builds
served from `localhost`, `127.0.0.1`, or `::1`. Save uses versioned local
storage by default. Pass `onSave` to persist through a development API route or
server action instead. For a public, non-persistent component preview, pass
`demo`; edits remain in memory and reset when the page reloads.

```tsx
<EditableTitle id="post-title" level={1}>
  A working title
</EditableTitle>

<EditableText
  demo
  id="post-introduction"
>
  Try editing this preview.
</EditableText>
```
