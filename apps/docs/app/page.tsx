"use client";

import { useState, type ReactNode } from "react";
import {
  BackLink,
  CodeBlock,
  Divider,
  EditableText,
  EditableTitle,
  GitHubButton,
  Lightbox,
  NavigationIndex,
  ProgressiveImage,
  Tabs,
  TextLink,
  WaveField,
  waveColorFamilies,
  wavePalette,
  type LightboxItem,
} from "@jayhack/wave-kit";

const inspirationItems: LightboxItem[] = [
  {
    src: "/design/kazumasa-nagai-inspiration.webp",
    alt: "Kazumasa Nagai poster with blue wave lines surrounding a red, orange, and yellow concentric form",
    caption: "Kazumasa Nagai, primary reference",
  },
  {
    src: "/design/growth-inspiration.webp",
    alt: "Growth poster with red radial geometry and a blue gridded sphere on black",
    caption: "Secondary reference for radial systems and optical depth",
  },
  {
    src: "/design/no-more-war-inspiration.png",
    alt: "No More War poster with repeated blue and red circular forms around an orange center",
    caption: "No More War, repeated form and concentrated color",
  },
];

const progressiveImageItems: LightboxItem[] = [
  {
    src: "/blog/images/llms-are-not-a-black-box/header.png",
    alt: "A diagram from the essay LLMs Are Not a Black Box",
    caption: "Responsive preview; full-resolution source in the lightbox",
  },
];

const diagramItems: LightboxItem[] = [
  {
    src: "/design/diagrams/intervention-pipeline.svg",
    alt: "Intervention pipeline diagram showing observation, measurement, and causal intervention stages",
    caption:
      "Process diagram · signal blue encodes observed structure; heat red encodes the intervention.",
  },
  {
    src: "/design/diagrams/probe-depth.svg",
    alt: "Line chart comparing direction and speed probe accuracy across representation depth",
    caption:
      "Measurement chart · every axis, series, and annotation remains labeled without relying on color alone.",
  },
];

const progressivePlaceholder =
  "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAACwAwCdASoYAA4APwFqrU8rJiQiMAgBYCAJaQAAW+jWTMSLo8ilgAD+6xxW0lfTE6TztZXxADvMdGbfPQxLHo+vJiSWKlkfxW7nIRbC/YNB2YooAAA=";

const skillInstallCommand =
  "npx skills add jayhack/wave-kit --skill build-with-wave-kit -y";

const sections = [
  ["inspiration", "Inspiration"],
  ["wave", "Wave motif"],
  ["color", "Color"],
  ["type", "Typography"],
  ["links", "Links"],
  ["navigation", "Navigation"],
  ["images", "Images"],
  ["diagrams", "Diagrams"],
  ["dividers", "Dividers"],
  ["style-guide", "Style guide"],
  ["code", "Code samples"],
  ["stack", "Tech stack"],
  ["install", "Install"],
] as const;

const tabItems = [
  {
    id: "work",
    label: "work",
    content:
      "Companies, products, and AI systems. The active state is precise and quiet.",
  },
  {
    id: "projects",
    label: "projects",
    content:
      "Code, demos, and experiments. Tabs remain horizontally scrollable on small screens.",
  },
  {
    id: "writing",
    label: "writing",
    content:
      "Essays and notes. Every tab is a real accessible control with an associated panel.",
  },
];

const techStack = [
  ["Next.js", "Application framework"],
  ["Vercel", "Hosting and delivery"],
  ["Tailwind CSS", "Tokens and utility composition"],
  ["shadcn/ui", "Extended interface primitives"],
] as const;

const codeSamples = [
  {
    label: "Global CSS",
    language: "css",
    code: `@import "tailwindcss";
@import "@jayhack/wave-kit/styles.css";`,
  },
  {
    label: "Wave field and page index",
    language: "tsx",
    code: `import { NavigationIndex, WaveField } from "@jayhack/wave-kit";

const sections = [
  ["overview", "Overview"],
  ["details", "Details"],
] as const;

export function ProjectPage() {
  return (
    <main className="min-h-screen bg-wave-ink text-neutral-300">
      <aside className="fixed left-8 top-12">
        <NavigationIndex items={sections} />
      </aside>
      <section id="overview">
        <div className="relative aspect-[16/7] overflow-hidden rounded-lg">
          <WaveField className="absolute inset-0 h-full w-full" />
        </div>
      </section>
    </main>
  );
}`,
  },
  {
    label: "Progressive image and lightbox",
    language: "tsx",
    code: `"use client";

import { useState } from "react";
import { Lightbox, ProgressiveImage } from "@jayhack/wave-kit";

const images = [
  { src: "/project-full.png", alt: "Project system diagram" },
];

export function ProjectImage() {
  const [open, setOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string>();

  return (
    <>
      <button onClick={() => setOpen(true)} type="button">
        <ProgressiveImage
          alt={images[0].alt}
          height={900}
          onLoad={(event) => setPreviewSrc(event.currentTarget.currentSrc)}
          src="/project-1024.webp"
          srcSet="/project-672.webp 672w, /project-1024.webp 1024w"
          width={1024}
        />
      </button>
      {open ? (
        <Lightbox
          items={[{ ...images[0], previewSrc }]}
          onClose={() => setOpen(false)}
          startIndex={0}
        />
      ) : null}
    </>
  );
}`,
  },
  {
    label: "Named colors",
    language: "tsx",
    code: `<div className="border border-wave-blue-vivid bg-wave-ink text-wave-paper">
  <span className="text-wave-amber">High energy</span>
</div>`,
  },
  {
    label: "Highlighted code",
    language: "tsx",
    code: `import { CodeBlock } from "@jayhack/wave-kit";

<CodeBlock
  code={'const energy = "wave-orange";'}
  label="Theme token"
  language="tsx"
/>`,
  },
] as const;

function SectionTitle({ id, children }: { id: string; children: ReactNode }) {
  return (
    <header className="mb-6">
      <h2
        className="scroll-mt-16 text-2xl font-extrabold tracking-tight text-neutral-50"
        id={id}
      >
        {children}
      </h2>
    </header>
  );
}

function TokenLabel({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-white/[0.07] px-1.5 py-0.5 font-mono text-[0.78rem] text-neutral-300">
      {children}
    </code>
  );
}


export default function Home() {
  const [skillCopied, setSkillCopied] = useState(false);
  const [progressivePreviewSrc, setProgressivePreviewSrc] = useState<
    string | undefined
  >();
  const [lightbox, setLightbox] = useState<{
    items: LightboxItem[];
    index: number;
  } | null>(null);

  async function copySkillCommand() {
    try {
      await navigator.clipboard.writeText(skillInstallCommand);
      setSkillCopied(true);
      window.setTimeout(() => setSkillCopied(false), 1800);
    } catch {
      setSkillCopied(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-neutral-200">
      <div className="mx-auto w-full max-w-[78rem] px-5 py-10 sm:py-16">
        <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,42rem)_minmax(0,1fr)] xl:gap-8">
          <aside className="hidden min-w-0 xl:block">
            <div className="sticky top-16 py-1 pr-2">
              <NavigationIndex items={sections} label="Index" />
            </div>
          </aside>

          <main className="mx-auto min-w-0 max-w-2xl xl:mx-0 xl:max-w-none">
            <header className="mt-10 pb-9">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-4xl font-extrabold tracking-[-0.035em] text-white sm:text-5xl">
                  wave-kit
                </h1>
                <GitHubButton href="https://github.com/jayhack/wave-kit">
                  View source
                </GitHubButton>
              </div>
              <p className="mt-4 max-w-2xl text-[1.03rem] leading-8 text-neutral-300">
                Design system and UI kit developed for{" "}
                <TextLink href="https://jay.ai/writing">
                  Jay Hack
                </TextLink>
                &apos;s personal projects. Emphasizes simplicity, legibility and
                performance for technical writing.
              </p>
              <div className="mt-6 flex min-w-0 overflow-hidden rounded-md border border-white/10 bg-white/[0.02]">
                <pre className="min-w-0 flex-1 overflow-x-auto px-4 py-3 font-mono text-[0.78rem] leading-5 text-neutral-300">
                  <code>
                    npx skills add{" "}
                    <span className="text-wave-blue-light">
                      jayhack/wave-kit
                    </span>
                    {" --skill "}
                    <span className="text-wave-blue-light">
                      build-with-wave-kit
                    </span>
                    {" -y"}
                  </code>
                </pre>
                <button
                  aria-label="Copy skill install command"
                  className="inline-flex shrink-0 items-center gap-2 border-l border-white/10 px-4 font-sans text-sm font-semibold text-neutral-400 hover:bg-white/[0.06] hover:text-white"
                  onClick={copySkillCommand}
                  type="button"
                >
                  {skillCopied ? (
                    <svg
                      aria-hidden="true"
                      className="size-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="m5 12 4.5 4.5L19 7"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  ) : (
                    <svg
                      aria-hidden="true"
                      className="size-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        height="13"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        width="13"
                        x="8"
                        y="8"
                      />
                      <path
                        d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="1.75"
                      />
                    </svg>
                  )}
                  <span aria-live="polite">
                    {skillCopied ? "Copied" : "Copy"}
                  </span>
                </button>
              </div>
            </header>

            <article className="mt-10 space-y-16 text-[1.03rem] leading-8 text-neutral-300">
              <section aria-labelledby="inspiration">
                <SectionTitle id="inspiration">Inspiration</SectionTitle>
                <p>
                  This design system is inspired by the work of{" "}
                  <strong className="font-semibold text-neutral-100">
                    Kazumasa Nagai
                  </strong>
                  , a Japanese graphic designer, and other poster art from the
                  &apos;60s onward. Clean, abstract forms reminiscent of HAL
                  9000, but in a benevolent manner.
                </p>
                <div className="mt-7 grid items-start gap-5 sm:grid-cols-3">
                  <figure>
                    <button
                      aria-label="Open Kazumasa Nagai inspiration image"
                      className="group block w-full cursor-zoom-in rounded-xl p-0 text-left outline-none focus-visible:ring-1 focus-visible:ring-wave-blue-vivid/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                      onClick={() =>
                        setLightbox({ items: inspirationItems, index: 0 })
                      }
                      type="button"
                    >
                      <ProgressiveImage
                        alt={inspirationItems[0].alt}
                        className="w-full rounded-xl border border-white/10 group-hover:border-white/25"
                        height={1417}
                        loading="eager"
                        src={inspirationItems[0].src}
                        width={1000}
                      />
                    </button>
                    <figcaption className="mt-3 text-sm leading-6 text-neutral-500">
                      Kazumasa Nagai, primary reference
                    </figcaption>
                  </figure>
                  <figure>
                    <button
                      aria-label="Open secondary inspiration image"
                      className="group block w-full cursor-zoom-in rounded-xl p-0 text-left outline-none focus-visible:ring-1 focus-visible:ring-wave-blue-vivid/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                      onClick={() =>
                        setLightbox({ items: inspirationItems, index: 1 })
                      }
                      type="button"
                    >
                      <ProgressiveImage
                        alt={inspirationItems[1].alt}
                        className="w-full rounded-xl border border-white/10 group-hover:border-white/25"
                        height={894}
                        loading="eager"
                        src={inspirationItems[1].src}
                        width={640}
                      />
                    </button>
                    <figcaption className="mt-3 text-sm leading-6 text-neutral-500">
                      Secondary reference for radial systems and optical depth
                    </figcaption>
                  </figure>
                  <figure>
                    <button
                      aria-label="Open No More War inspiration image"
                      className="group block w-full cursor-zoom-in rounded-xl p-0 text-left outline-none focus-visible:ring-1 focus-visible:ring-wave-blue-vivid/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                      onClick={() =>
                        setLightbox({ items: inspirationItems, index: 2 })
                      }
                      type="button"
                    >
                      <ProgressiveImage
                        alt={inspirationItems[2].alt}
                        className="w-full rounded-xl border border-white/10 group-hover:border-white/25"
                        height={898}
                        loading="eager"
                        src={inspirationItems[2].src}
                        width={640}
                      />
                    </button>
                    <figcaption className="mt-3 text-sm leading-6 text-neutral-500">
                      No More War, repeated form and concentrated color
                    </figcaption>
                  </figure>
                </div>
              </section>

              <section aria-labelledby="wave">
                <SectionTitle id="wave">Wave motif</SectionTitle>
                <p>
                  Waves are the recurring generative gesture across jay.ai. A
                  simple cellular field carries energy outward from a point,
                  turning the same cool-to-warm palette into motion.
                </p>
                <div className="relative mt-6 aspect-[16/7] w-full overflow-hidden rounded-lg border border-white/10 bg-black">
                  <WaveField className="absolute inset-0 h-full w-full" />
                </div>
              </section>

              <section aria-labelledby="color">
                <SectionTitle id="color">Color</SectionTitle>
                <p>
                  The system has four color anchors, not fourteen independent
                  colors. Signal blue, heat red, energy orange, and light
                  yellow carry the identity. The other values are associated
                  shades used to give waves depth and intensity. Product UI
                  stays neutral and usually uses only one anchor at a time.
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {waveColorFamilies.map((family) => (
                    <div
                      className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]"
                      key={family.name}
                    >
                      <div className="flex items-start gap-3 p-4">
                        <span
                          className="mt-0.5 h-6 w-6 shrink-0 rounded-full border border-white/10"
                          style={{ backgroundColor: family.anchor }}
                        />
                        <div>
                          <h3 className="text-sm font-semibold text-white">
                            {family.name}
                          </h3>
                          <code className="font-mono text-[0.7rem] text-neutral-600">
                            {family.token}
                          </code>
                          <p className="mt-1 text-xs leading-5 text-neutral-500">
                            {family.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex h-12">
                        {family.shades.map((shade, index) => (
                          <div
                            className="group relative flex-1"
                            key={shade}
                            style={{ backgroundColor: shade }}
                            title={`${family.shadeTokens[index]} · ${shade}`}
                          >
                            <span className="absolute inset-x-0 bottom-1 hidden text-center font-mono text-[0.42rem] text-black/65 group-hover:block">
                              {family.shadeTokens[index]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex h-3 overflow-hidden rounded-full">
                  {wavePalette.map((color) => (
                    <span
                      className="h-full flex-1"
                      key={color}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
                  <div className="rounded-lg border border-white/10 bg-black p-4">
                    <span className="block h-5 w-5 rounded-full border border-white/10 bg-black" />
                    <p className="mt-3 text-white">Canvas</p>
                    <TokenLabel>#000000</TokenLabel>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                    <span className="block h-5 w-5 rounded-full bg-neutral-300" />
                    <p className="mt-3 text-white">Reading text</p>
                    <TokenLabel>neutral-300</TokenLabel>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                    <span className="block h-5 w-5 rounded-full bg-sky-300" />
                    <p className="mt-3 text-white">Navigation</p>
                    <TokenLabel>sky-300</TokenLabel>
                  </div>
                </div>
              </section>

              <section aria-labelledby="type">
                <SectionTitle id="type">Typography</SectionTitle>
                <p>
                  The stack is native system sans for speed and familiarity,
                  with the platform monospace stack for tokens and small
                  technical labels. Tight headlines meet relaxed body copy.
                  The reading column is capped at 42rem (672px,{" "}
                  <code className="font-mono text-[0.88em] text-neutral-400">
                    max-w-2xl
                  </code>
                  ), matching the measure used by this page.
                </p>
                <div className="mt-6 overflow-hidden rounded-lg border border-white/10">
                  <div className="border-b border-white/10 p-6">
                    <div className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                      EditableTitle · Display / 48 / 800
                    </div>
                    <div className="mt-3">
                      <EditableTitle
                        className="text-4xl font-extrabold tracking-[-0.035em] text-white sm:text-5xl"
                        id="typography-display"
                        level={3}
                      >
                        Intelligence in motion.
                      </EditableTitle>
                    </div>
                  </div>
                  <div className="border-b border-white/10 p-6">
                    <div className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                      EditableTitle · Heading / 24 / 800
                    </div>
                    <div className="mt-3">
                      <EditableTitle
                        className="text-2xl font-extrabold tracking-tight text-neutral-50"
                        id="typography-heading"
                        level={3}
                      >
                        Build the sharpest version.
                      </EditableTitle>
                    </div>
                  </div>
                  <div className="border-b border-white/10 p-6">
                    <div className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                      EditableText · Body / 16.5 / 32 · Column / 42rem / 672px
                    </div>
                    <div className="mt-3">
                      <EditableText
                        className="max-w-2xl text-[1.03rem] leading-8 text-neutral-300"
                        id="typography-body"
                        rows={5}
                      >
                        Software should feel immediate. Structure the page so
                        the useful thing appears first, then let detail reward
                        attention.
                      </EditableText>
                    </div>
                  </div>
                  <div className="border-b border-white/10 p-6">
                    <div className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                      Subtle / 14 / 24
                    </div>
                    <p className="mt-3 text-sm leading-6 text-neutral-500">
                      Supporting context stays present without competing with
                      the work.
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                      Code / 12.5 / 20
                    </div>
                    <code className="mt-3 block font-mono text-[0.78rem] leading-5 text-neutral-500">
                      wave-orange&nbsp;&nbsp;#f97316
                    </code>
                  </div>
                </div>
              </section>

              <section aria-labelledby="links">
                <SectionTitle id="links">Links</SectionTitle>
                <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
                  <p>
                    Use <TextLink href="#navigation">ripe orange links by default</TextLink>,{" "}
                    <TextLink href="#images" tone="sky">
                      sky links for secondary navigation
                    </TextLink>
                    , and{" "}
                    <TextLink href="https://github.com/jayhack" tone="quiet">
                      quiet links for supporting metadata
                    </TextLink>
                    .
                  </p>
                </div>
              </section>

              <section aria-labelledby="navigation">
                <SectionTitle id="navigation">Navigation</SectionTitle>
                <p>
                  Back controls preserve in-app history when it exists and fall
                  back to a known route for direct visits. Primary tabs use a
                  simple two-pixel underline without filled pills or heavy
                  chrome.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <BackLink fallbackHref="https://jay.ai">Back home</BackLink>
                  <GitHubButton />
                </div>
                <div className="mt-6">
                  <Tabs items={tabItems} label="Component kit sections" />
                </div>
              </section>

              <section aria-labelledby="images">
                <SectionTitle id="images">Progressive image</SectionTitle>
                <p>
                  Reserve the final aspect ratio up front, paint a tiny inline
                  placeholder immediately, then fade in a responsive WebP. The
                  full image is lazy-loaded and asynchronously decoded, so the
                  reading experience never waits on it.
                </p>
                <figure className="mt-6">
                  <button
                    aria-label="Open full-resolution image"
                    className="group block w-full cursor-zoom-in rounded-xl p-0 text-left outline-none focus-visible:ring-1 focus-visible:ring-wave-blue-vivid/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    onClick={() =>
                      setLightbox({
                        items: [
                          {
                            ...progressiveImageItems[0],
                            placeholder: progressivePlaceholder,
                            previewSrc: progressivePreviewSrc,
                          },
                        ],
                        index: 0,
                      })
                    }
                    type="button"
                  >
                    <ProgressiveImage
                      alt={progressiveImageItems[0].alt}
                      className="w-full rounded-xl border border-white/10 group-hover:border-white/25"
                      height={583}
                      onLoad={(event) =>
                        setProgressivePreviewSrc(event.currentTarget.currentSrc)
                      }
                      placeholder={progressivePlaceholder}
                      src="/blog/image-cache/llms-are-not-a-black-box/header-55330a11a7-1024.webp"
                      srcSet="/blog/image-cache/llms-are-not-a-black-box/header-55330a11a7-672.webp 672w, /blog/image-cache/llms-are-not-a-black-box/header-55330a11a7-1024.webp 1024w"
                      width={1024}
                    />
                  </button>
                  <figcaption className="mt-3 text-center text-sm text-neutral-500">
                    Placeholder → responsive source set → full-resolution lightbox
                  </figcaption>
                </figure>
              </section>

              <section aria-labelledby="diagrams">
                <SectionTitle id="diagrams">Diagrams</SectionTitle>
                <p>
                  Treat diagrams as academic figures: use crisp SVG geometry,
                  label every stage, axis, and series, and keep the composition
                  minimal. Color must encode a stated meaning rather than act as
                  decoration. Click either figure to inspect the original SVG.
                </p>
                <div className="mt-6 space-y-6">
                  {diagramItems.map((item, index) => (
                    <figure key={item.src}>
                      <button
                        aria-label={`Open diagram: ${item.alt}`}
                        className="group block w-full cursor-zoom-in rounded-lg p-0 text-left outline-none focus-visible:ring-1 focus-visible:ring-wave-blue-vivid/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        onClick={() =>
                          setLightbox({ items: diagramItems, index })
                        }
                        type="button"
                      >
                        <ProgressiveImage
                          alt={item.alt}
                          className="w-full rounded-lg border border-white/10 group-hover:border-white/25"
                          height={640}
                          src={item.src}
                          width={1200}
                        />
                      </button>
                      <figcaption className="mt-3 text-sm leading-6 text-neutral-500">
                        {item.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
                <div className="mt-7 border-y border-white/10 text-sm">
                  <div className="grid grid-cols-[auto_1fr] gap-4 border-b border-white/10 py-3">
                    <span className="mt-1 size-3 rounded-full bg-wave-paper" />
                    <p>
                      <TokenLabel>wave-paper</TokenLabel>{" "}
                      <span className="text-neutral-500">
                        Primary labels, titles, and high-contrast values.
                      </span>
                    </p>
                  </div>
                  <div className="grid grid-cols-[auto_1fr] gap-4 border-b border-white/10 py-3">
                    <span className="mt-1 size-3 rounded-full bg-wave-blue-vivid" />
                    <p>
                      <TokenLabel>wave-blue-vivid</TokenLabel>{" "}
                      <span className="text-neutral-500">
                        Observations, measured structure, and primary series.
                      </span>
                    </p>
                  </div>
                  <div className="grid grid-cols-[auto_1fr] gap-4 border-b border-white/10 py-3">
                    <span className="mt-1 size-3 rounded-full bg-wave-red-vivid" />
                    <p>
                      <TokenLabel>wave-red-vivid</TokenLabel>{" "}
                      <span className="text-neutral-500">
                        Interventions, causal emphasis, and comparison series.
                      </span>
                    </p>
                  </div>
                  <div className="grid grid-cols-[auto_1fr] gap-4 py-3">
                    <span className="mt-1 size-3 rounded-full bg-neutral-700" />
                    <p>
                      <TokenLabel>neutral-700</TokenLabel>{" "}
                      <span className="text-neutral-500">
                        Axes, guides, borders, and secondary structure.
                      </span>
                    </p>
                  </div>
                </div>
              </section>

              <section aria-labelledby="dividers">
                <SectionTitle id="dividers">Dividers</SectionTitle>
                <p>
                  Quiet rules divide long-form sections without turning every
                  idea into a card.
                </p>
                <div className="mt-6 space-y-5 text-sm text-neutral-500">
                  <span>Subtle</span>
                  <Divider />
                  <span>Strong</span>
                  <Divider emphasis="strong" />
                </div>
              </section>

              <section aria-labelledby="style-guide">
                <SectionTitle id="style-guide">Style guide</SectionTitle>
                <p>
                  Simplicity is an editing discipline. Every visual element
                  should improve meaning, navigation, or reading rhythm.
                </p>
                <div className="mt-8 space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-100">
                      Remove ornamental UI
                    </h3>
                    <p className="mt-2 text-neutral-400">
                      Avoid AI slop such as eyebrows, sequence numbers, badges,
                      and labels that only repeat nearby content. If an element
                      adds no information or function, remove it.
                    </p>
                  </div>
                  <Divider />
                  <div>
                    <h3 className="text-lg font-bold text-neutral-100">
                      Keep titles in proportion
                    </h3>
                    <p className="mt-2 text-neutral-400">
                      Use the smallest title that establishes hierarchy. Avoid
                      oversized hero text that pushes useful content below the
                      fold or turns every page into a landing page.
                    </p>
                  </div>
                  <Divider />
                  <div>
                    <h3 className="text-lg font-bold text-neutral-100">
                      Compose for vertical reading
                    </h3>
                    <p className="mt-2 text-neutral-400">
                      Structure pages like blog posts when possible. Assume
                      vertical scrolling, use semantic sections and paragraphs,
                      and intersperse images or interactive assets with the
                      text they support.
                    </p>
                  </div>
                </div>
              </section>

              <section aria-labelledby="code">
                <SectionTitle id="code">Code samples</SectionTitle>
                <p>
                  Install the package, import the global stylesheet once, then
                  compose the real components. These examples are complete
                  enough for an agent to copy into a React or Next.js project
                  and adapt without recreating the design system.
                </p>
                <div className="mt-6 space-y-4">
                  {codeSamples.map((sample) => (
                    <CodeBlock
                      code={sample.code}
                      key={sample.label}
                      label={sample.label}
                      language={sample.language}
                    />
                  ))}
                </div>
              </section>

              <section aria-labelledby="stack">
                <SectionTitle id="stack">Tech stack</SectionTitle>
                <p>
                  Wave Kit is designed for a focused application stack: Next.js
                  for the React framework, Vercel for deployment, Tailwind CSS
                  for named design tokens and composition, and shadcn/ui for
                  accessible primitives when a project needs controls beyond
                  the core kit.
                </p>
                <div className="mt-6 overflow-hidden rounded-md border border-white/10">
                  {techStack.map(([name, role], index) => (
                    <div
                      className={`flex items-baseline justify-between gap-4 px-4 py-3 ${
                        index === 3 ? "" : "border-b border-white/10"
                      }`}
                      key={name}
                    >
                      <strong className="font-semibold text-neutral-100">
                        {name}
                      </strong>
                      <span className="text-right text-sm text-neutral-600">
                        {role}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section aria-labelledby="install">
                <SectionTitle id="install">Install</SectionTitle>
                <p className="mb-5">
                  Install the public package from npm. Use the GitHub checkout
                  when contributing to Wave Kit itself.
                </p>
                <div className="space-y-3">
                  <CodeBlock
                    code="npm install @jayhack/wave-kit tailwindcss"
                    language="bash"
                  />
                  <CodeBlock
                    code={`git clone https://github.com/jayhack/wave-kit.git
npm install ./wave-kit/packages/wave-kit tailwindcss`}
                    language="bash"
                  />
                  <CodeBlock
                    code={`@import "tailwindcss";
@import "@jayhack/wave-kit/styles.css";`}
                    language="css"
                  />
                </div>
              </section>
            </article>

            <footer className="mt-20 border-t border-white/10 pt-8 text-sm text-neutral-600">
              Built from the components already used across jay.ai. This page is
              the source of truth for the portable kit.
            </footer>
          </main>

          <div aria-hidden="true" className="hidden xl:block" />
        </div>
      </div>

      {lightbox ? (
        <Lightbox
          items={lightbox.items}
          onClose={() => setLightbox(null)}
          startIndex={lightbox.index}
        />
      ) : null}
    </div>
  );
}
