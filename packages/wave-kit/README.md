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
import { ImageCard, NavigationIndex, WaveField } from "@jayhack/wave-kit";
```

Wave Kit is React + Tailwind CSS v4. Its stylesheet registers the package build
as a Tailwind source and installs the native system font stack and shared
utilities. React, React DOM, and Tailwind are peer dependencies.

`ImageCard` provides an edge-to-edge, golden-ratio image, compact aligned copy,
and a built-in progressive lightbox:

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

## Local content editing

`EditableTitle` and `EditableText` become editable only in development builds
served from `localhost`, `127.0.0.1`, or `::1`. Save uses versioned local
storage by default. Pass `onSave` to persist through a development API route or
server action instead.

```tsx
<EditableTitle id="post-title" level={1}>
  A working title
</EditableTitle>

<EditableText
  id="post-introduction"
  onSave={async ({ id, value }) => saveDraft({ id, value })}
>
  Draft introduction.
</EditableText>
```
