"use client";

import { useState, type ReactNode } from "react";
import {
  BackLink,
  Divider,
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
} from "wave-kit";

const inspirationItems: LightboxItem[] = [
  {
    src: "/design/kazumasa-nagai-inspiration.webp",
    alt: "Kazumasa Nagai poster with blue wave lines surrounding a red, orange, and yellow concentric form",
    caption: "Kazumasa Nagai — primary reference",
  },
  {
    src: "/design/growth-inspiration.webp",
    alt: "Growth poster with red radial geometry and a blue gridded sphere on black",
    caption: "Secondary reference — radial systems and optical depth",
  },
];

const progressiveImageItems: LightboxItem[] = [
  {
    src: "/blog/images/llms-are-not-a-black-box/header.png",
    alt: "A diagram from the essay LLMs Are Not a Black Box",
    caption: "Responsive preview; full-resolution source in the lightbox",
  },
];

const progressivePlaceholder =
  "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAACwAwCdASoYAA4APwFqrU8rJiQiMAgBYCAJaQAAW+jWTMSLo8ilgAD+6xxW0lfTE6TztZXxADvMdGbfPQxLHo+vJiSWKlkfxW7nIRbC/YNB2YooAAA=";

const sections = [
  ["inspiration", "Inspiration"],
  ["wave", "Wave motif"],
  ["color", "Color"],
  ["type", "Typography"],
  ["links", "Links"],
  ["navigation", "Navigation"],
  ["images", "Images"],
  ["dividers", "Dividers"],
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
  const [lightbox, setLightbox] = useState<{
    items: LightboxItem[];
    index: number;
  } | null>(null);

  return (
    <div className="min-h-screen bg-black text-neutral-200">
      <div className="mx-auto w-full max-w-[78rem] px-5 py-10 sm:py-16">
        <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,42rem)_minmax(0,1fr)] xl:gap-8">
          <aside className="hidden min-w-0 xl:block">
            <div className="sticky top-12 py-1 pr-2">
              <NavigationIndex items={sections} label="Index" />
            </div>
          </aside>

          <main className="mx-auto min-w-0 max-w-2xl xl:mx-0 xl:max-w-none">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <BackLink fallbackHref="https://jay.ai">jay.ai</BackLink>
              <GitHubButton href="https://github.com/jayhack/wave-kit">
                View source
              </GitHubButton>
            </div>

            <header className="mt-10 border-b border-white/10 pb-9">
              <h1 className="text-4xl font-extrabold tracking-[-0.035em] text-white sm:text-5xl">
                Jay’s component kit
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-8 text-neutral-400">
                A compact visual language for personal software: black canvas,
                sharp type, quiet structure, and brief flashes of color.
              </p>
              <div className="mt-5 text-sm text-neutral-500">
                Living document · jay.ai
              </div>
            </header>

            <article className="mt-10 space-y-16 text-[1.03rem] leading-8 text-neutral-300">
              <section aria-labelledby="inspiration">
                <SectionTitle id="inspiration">Inspiration</SectionTitle>
                <p>
                  The visual system takes its clearest cue from{" "}
                  <strong className="font-semibold text-neutral-100">
                    Kazumasa Nagai
                  </strong>
                  —specifically the first poster below: repeated lines behaving
                  like a field, cool blue set against concentrated heat, and
                  movement created from disciplined geometry. The second image
                  is a related reference for radial repetition, optical depth,
                  and sparse type on black.
                </p>
                <div className="mt-7 grid items-start gap-5 sm:grid-cols-2">
                  <figure>
                    <button
                      aria-label="Open Kazumasa Nagai inspiration image"
                      className="group block w-full cursor-zoom-in text-left"
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
                      Kazumasa Nagai — primary reference
                    </figcaption>
                  </figure>
                  <figure>
                    <button
                      aria-label="Open secondary inspiration image"
                      className="group block w-full cursor-zoom-in text-left"
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
                      Secondary reference — radial systems and optical depth
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
                  The system has four color anchors—not fourteen independent
                  colors. Signal blue, heat red, energy orange, and light yellow
                  carry the identity; the other values are associated shades
                  used to give waves depth and intensity. Product UI stays
                  neutral and usually uses only one anchor at a time.
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
                          <p className="mt-1 text-xs leading-5 text-neutral-500">
                            {family.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex h-12">
                        {family.shades.map((shade) => (
                          <div
                            className="group relative flex-1"
                            key={shade}
                            style={{ backgroundColor: shade }}
                            title={shade}
                          >
                            <span className="absolute inset-x-0 bottom-1 hidden text-center font-mono text-[0.5rem] text-black/65 group-hover:block">
                              {shade}
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
                </p>
                <div className="mt-6 overflow-hidden rounded-lg border border-white/10">
                  <div className="border-b border-white/10 p-6">
                    <div className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                      Display / 48 / 800
                    </div>
                    <div className="mt-3 text-4xl font-extrabold tracking-[-0.035em] text-white sm:text-5xl">
                      Intelligence in motion.
                    </div>
                  </div>
                  <div className="border-b border-white/10 p-6">
                    <div className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                      Heading / 24 / 800
                    </div>
                    <div className="mt-3 text-2xl font-extrabold tracking-tight text-neutral-50">
                      Build the sharpest version.
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                      Body / 16.5 / 32
                    </div>
                    <p className="mt-3 max-w-xl text-[1.03rem] leading-8 text-neutral-300">
                      Software should feel immediate. Structure the page so the
                      useful thing appears first, then let detail reward
                      attention.
                    </p>
                  </div>
                </div>
              </section>

              <section aria-labelledby="links">
                <SectionTitle id="links">Links</SectionTitle>
                <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
                  <p>
                    Use <TextLink href="#navigation">sky links for navigation</TextLink>,{" "}
                    <TextLink href="#images" tone="amber">
                      amber links in long-form reading
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
                  simple two-pixel underline—no filled pills or heavy chrome.
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
                    className="group block w-full cursor-zoom-in text-left"
                    onClick={() =>
                      setLightbox({ items: progressiveImageItems, index: 0 })
                    }
                    type="button"
                  >
                    <ProgressiveImage
                      alt={progressiveImageItems[0].alt}
                      className="w-full rounded-xl border border-white/10 group-hover:border-white/25"
                      height={583}
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
                <div className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
                  {[
                    ["No layout shift", "width + height"],
                    ["Fast first paint", "inline placeholder"],
                    ["Low main-thread cost", 'decoding="async"'],
                  ].map(([label, token]) => (
                    <div
                      className="rounded-lg border border-white/10 bg-white/[0.02] p-4"
                      key={label}
                    >
                      <div className="font-semibold text-neutral-200">{label}</div>
                      <div className="mt-1 font-mono text-xs text-neutral-600">
                        {token}
                      </div>
                    </div>
                  ))}
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

              <section aria-labelledby="install">
                <SectionTitle id="install">Install</SectionTitle>
                <pre className="overflow-x-auto rounded-lg border border-white/10 bg-white/[0.02] p-5 font-mono text-sm text-neutral-300">
                  <code>npm install wave-kit tailwindcss</code>
                </pre>
                <pre className="mt-3 overflow-x-auto rounded-lg border border-white/10 bg-white/[0.02] p-5 font-mono text-sm leading-6 text-neutral-300">
                  <code>{`@import "tailwindcss";
@import "wave-kit/styles.css";`}</code>
                </pre>
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
