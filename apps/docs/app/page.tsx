"use client";

import { useState, type KeyboardEvent, type ReactNode } from "react";
import {
  BackLink,
  CodeBlock,
  Divider,
  EditableText,
  EditableTitle,
  ExperimentIndex,
  GitHubButton,
  ImageCard,
  Lightbox,
  MediaRow,
  NavigationIndex,
  ProgressiveImage,
  Tabs,
  TextLink,
  ThemeToggle,
  WaveField,
  waveColorFamilies,
  wavePalette,
  type ExperimentRecord,
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

const componentSections = [
  ["inspiration", "Inspiration"],
  ["wave", "Wave motif"],
  ["color", "Color"],
  ["type", "Typography"],
  ["links", "Links"],
  ["navigation", "Navigation"],
  ["images", "Images"],
  ["cards", "Image cards"],
  ["media-rows", "Media rows"],
  ["diagrams", "Diagrams"],
  ["dividers", "Dividers"],
  ["code-blocks", "Code blocks"],
  ["experiments", "Experiments"],
] as const;

const codeSections = [
  ["code", "Code samples"],
  ["stack", "Tech stack"],
  ["install", "Install"],
] as const;

const showcaseViews = [
  ["components", "Components"],
  ["style-guide", "Style guide"],
  ["code", "Code samples"],
  ["blog", "Blog playground"],
] as const;

type ShowcaseView = (typeof showcaseViews)[number][0];

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

const registeredExperiments: ExperimentRecord[] = [
  {
    slug: "nano-1p5mb",
    title: "The 1.5 MB capacity cliff",
    description:
      "A width-72, four-block transformer trained on the same passive Blocket League curriculum as the deployed model, with 10.27× fewer parameters.",
    date: "2026-07-14",
    href: "https://blocket-league.vercel.app/nano-1p5mb/",
  },
  {
    slug: "all-angle-control",
    title: "The all-angle control",
    description:
      "A matched 3.67M-parameter control trained from scratch on all puck-motion directions.",
    date: "2026-07-18",
    href: "https://blocket-league.vercel.app/",
  },
  {
    slug: "unseen-east",
    title: "A 60° hole in motion",
    description:
      "A 3.67M-parameter transformer trained from scratch after rejecting every 24-frame window containing due-east motion.",
    date: "2026-07-21",
    href: "https://blocket-league.vercel.app/",
  },
  {
    slug: "unseen-quadrant",
    title: "Collision physics without the upper-right",
    description:
      "A 3.67M-parameter transformer trained after rejecting every 24-frame world crossing into the upper-right quadrant.",
    date: "2026-07-26",
    href: "https://blocket-league.vercel.app/",
  },
];

const experimentRegistryJson = `[
  {
    "slug": "nano-1p5mb",
    "title": "The 1.5 MB capacity cliff",
    "description": "A width-72, four-block transformer with 10.27x fewer parameters.",
    "date": "2026-07-14",
    "metrics": [
      { "label": "12-frame error", "value": "4.98 px" },
      { "label": "64-frame error", "value": "19.10 px" }
    ],
    "meta": { "preset": "nano", "parameters": "357k" }
  }
]`;

const fibonacciSample = `def fib(n: int) -> int:
    """Return the n-th Fibonacci number."""
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

print([fib(i) for i in range(8)])  # [0, 1, 1, 2, 3, 5, 8, 13]`;

const experimentPagesSample = `import { ExperimentIndex, ExperimentPage, parseExperiments } from "@jayhack/wave-kit";
import registry from "@/experiments.json";

const experiments = parseExperiments(registry);

// app/experiments/page.tsx — the index
export default function ExperimentsPage() {
  return <ExperimentIndex experiments={experiments} />;
}

// app/experiments/[slug]/page.tsx — one page per record
export default async function Experiment({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experiment = experiments.find((entry) => entry.slug === slug)!;

  return (
    <ExperimentPage backHref="/experiments" experiment={experiment}>
      {/* Free-form body: figures, rollouts, experiment-specific code */}
      <RolloutViewer slug={experiment.slug} />
    </ExperimentPage>
  );
}`;

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
    label: "Responsive page shell",
    language: "tsx",
    code: `import { NavigationIndex, WaveField } from "@jayhack/wave-kit";

const sections = [
  ["overview", "Overview"],
  ["details", "Details"],
] as const;

export function ProjectPage() {
  return (
    <div className="min-h-screen bg-wave-ink text-wave-body">
      <div className="mx-auto w-full max-w-[78rem] px-5 py-10 sm:py-16">
        <div className="min-[72rem]:grid min-[72rem]:grid-cols-[minmax(0,1fr)_minmax(0,42rem)_minmax(0,1fr)] min-[72rem]:gap-8">
          <aside className="hidden min-w-0 min-[72rem]:block">
            <div className="sticky top-1/2 -translate-y-1/2">
              <NavigationIndex items={sections} />
            </div>
          </aside>

          <main className="mx-auto min-w-0 max-w-2xl min-[72rem]:mx-0 min-[72rem]:max-w-none">
            <section id="overview">
              <div className="relative aspect-[16/7] overflow-hidden rounded-lg bg-wave-ink">
                <WaveField className="absolute inset-0 h-full w-full" />
              </div>
            </section>
          </main>

          <div aria-hidden className="hidden min-[72rem]:block" />
        </div>
      </div>
    </div>
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
  {
    label: "Python source in a post",
    language: "python",
    code: `import numpy as np

def fit(xs, ys):
    # least-squares slope and intercept
    slope = np.cov(xs, ys)[0, 1] / np.var(xs)
    return slope, ys.mean() - slope * xs.mean()`,
  },
] as const;

function SectionTitle({ id, children }: { id: string; children: ReactNode }) {
  return (
    <header className="mb-6">
      <h2
        className="scroll-mt-16 text-2xl font-extrabold tracking-tight text-wave-heading"
        id={id}
      >
        {children}
      </h2>
    </header>
  );
}

function TokenLabel({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-wave-surface-raised px-1.5 py-0.5 font-mono text-[0.78rem] text-wave-body">
      {children}
    </code>
  );
}

function BlogPlayground() {
  const [accent, setAccent] = useState<"blue" | "orange">("blue");
  const [measure, setMeasure] = useState<"focused" | "wide">("focused");
  const [title, setTitle] = useState("What the model learns between frames");
  const [introduction, setIntroduction] = useState(
    "A small visual study of how motion emerges inside a video model. Click the title or this paragraph to try the editable states.",
  );

  const accentClass =
    accent === "blue" ? "text-wave-link-sky" : "text-wave-link-orange";

  return (
    <div className="space-y-8" id="blog-playground">
      <div className="rounded-lg border border-wave-border bg-wave-surface p-4 sm:flex sm:items-center sm:justify-between sm:gap-6">
        <div>
          <h2 className="font-bold text-wave-heading">Blog playground</h2>
          <p className="mt-1 text-sm leading-6 text-wave-muted">
            Try the controls and edit the copy. Changes stay in this demo only.
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 sm:mt-0" aria-label="Blog styling controls">
          <button
            aria-pressed={accent === "blue"}
            className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors ${
              accent === "blue"
                ? "border-wave-blue-vivid bg-wave-blue-vivid text-black"
                : "border-wave-border text-wave-muted hover:text-wave-heading"
            }`}
            onClick={() => setAccent("blue")}
            type="button"
          >
            Blue accent
          </button>
          <button
            aria-pressed={accent === "orange"}
            className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors ${
              accent === "orange"
                ? "border-wave-orange bg-wave-orange text-black"
                : "border-wave-border text-wave-muted hover:text-wave-heading"
            }`}
            onClick={() => setAccent("orange")}
            type="button"
          >
            Orange accent
          </button>
          <button
            aria-pressed={measure === "wide"}
            className="rounded-md border border-wave-border px-3 py-1.5 text-xs font-semibold text-wave-muted transition-colors hover:text-wave-heading"
            onClick={() =>
              setMeasure((current) =>
                current === "focused" ? "wide" : "focused",
              )
            }
            type="button"
          >
            {measure === "focused" ? "Widen article" : "Narrow article"}
          </button>
        </div>
      </div>

      <article
        className={`mx-auto transition-[max-width] duration-300 ${
          measure === "focused" ? "max-w-xl" : "max-w-2xl"
        }`}
      >
        <div className="relative aspect-[16/7] overflow-hidden rounded-lg border border-wave-border bg-black">
          <WaveField className="absolute inset-0 h-full w-full" />
        </div>
        <header className="pb-8 pt-8">
          <p className={`text-sm font-semibold ${accentClass}`}>
            Research note · 8 min read
          </p>
          <div className="mt-3">
            <EditableTitle
              className="text-3xl font-extrabold tracking-[-0.035em] text-wave-heading sm:text-5xl"
              demo
              id="blog-demo-title"
              level={2}
              onSave={({ value }) => setTitle(value)}
            >
              {title}
            </EditableTitle>
          </div>
          <div className="mt-5">
            <EditableText
              className="text-lg leading-8 text-wave-muted"
              demo
              id="blog-demo-introduction"
              onSave={({ value }) => setIntroduction(value)}
              rows={5}
            >
              {introduction}
            </EditableText>
          </div>
        </header>

        <Divider />

        <div className="space-y-6 py-8 text-[1.03rem] leading-8 text-wave-body">
          <p>
            A model never sees motion directly. It sees a sequence of still
            images and learns which changes tend to follow others. The useful
            question is not whether it memorized pixels, but where a stable
            representation of direction begins to appear.
          </p>
          <blockquote className={`border-l-2 pl-5 text-xl leading-8 text-wave-heading ${
            accent === "blue" ? "border-wave-blue-vivid" : "border-wave-orange"
          }`}>
            The gap between two frames is where the model has to invent a
            theory of the world.
          </blockquote>
          <CodeBlock
            code={`const probe = trainLinearProbe({\n  layer: 8,\n  target: "motion_direction",\n});`}
            label="A probe for direction"
            language="tsx"
          />
          <p className="text-wave-muted">
            This is a visual sandbox, so edits reset when the page reloads and
            nothing is written to the blog source.
          </p>
        </div>
      </article>
    </div>
  );
}


export default function Home() {
  const [activeView, setActiveView] = useState<ShowcaseView>("components");
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

  function handleShowcaseKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) {
    let nextIndex = currentIndex;
    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % showcaseViews.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex =
        (currentIndex - 1 + showcaseViews.length) % showcaseViews.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = showcaseViews.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveView(showcaseViews[nextIndex][0]);
    const tabs =
      event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]',
      );
    tabs?.[nextIndex]?.focus();
  }

  return (
    <div className="min-h-screen bg-wave-canvas text-wave-body">
      <ThemeToggle className="fixed right-5 top-5 z-50 sm:right-7 sm:top-7" />
      <div className="mx-auto w-full max-w-[78rem] px-5 py-10 sm:py-16">
        <div className="min-[72rem]:grid min-[72rem]:grid-cols-[minmax(0,1fr)_minmax(0,42rem)_minmax(0,1fr)] min-[72rem]:gap-8">
          <aside className="hidden min-w-0 min-[72rem]:block">
            <div className="sticky top-1/2 -translate-y-1/2 py-1 pr-2">
              {activeView === "components" ? (
                <NavigationIndex items={componentSections} />
              ) : activeView === "code" ? (
                <NavigationIndex items={codeSections} />
              ) : null}
            </div>
          </aside>

          <main className="mx-auto min-w-0 max-w-2xl min-[72rem]:mx-0 min-[72rem]:max-w-none">
            <header className="mt-10 pb-9">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-4xl font-extrabold tracking-[-0.035em] text-wave-heading sm:text-5xl">
                  wave-kit
                </h1>
                <GitHubButton href="https://github.com/jayhack/wave-kit">
                  View source
                </GitHubButton>
              </div>
              <p className="mt-4 max-w-2xl text-[1.03rem] leading-8 text-wave-body">
                Design system and UI kit developed for{" "}
                <TextLink href="https://jay.ai/writing">
                  Jay Hack
                </TextLink>
                &apos;s personal projects. Emphasizes simplicity, legibility and
                performance for technical writing.
              </p>
              <div className="mt-6 flex min-w-0 overflow-hidden rounded-md border border-wave-border bg-wave-surface">
                <pre className="min-w-0 flex-1 overflow-x-auto px-4 py-3 font-mono text-[0.78rem] leading-5 text-wave-body">
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
                  className="inline-flex shrink-0 cursor-pointer items-center gap-2 border-l border-wave-border px-4 font-sans text-sm font-semibold text-wave-muted hover:bg-wave-surface-hover hover:text-wave-heading"
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
              <p className="mt-3 text-sm leading-6 text-wave-subtle">
                Optional. This installs the agent skill for building with Wave
                Kit. You can also just{" "}
                <button
                  className="text-wave-link-sky underline decoration-wave-link-sky/55 underline-offset-2 hover:text-wave-link-sky-hover hover:decoration-wave-link-sky-hover"
                  onClick={() => setActiveView("code")}
                  type="button"
                >
                  install the package
                </button>{" "}
                and compose the components yourself.
              </p>
            </header>

            <div
              aria-label="Wave Kit showcase"
              className="no-scrollbar tab-scroll-x sticky top-0 z-40 flex gap-7 border-b border-wave-border bg-wave-canvas pt-3"
              role="tablist"
            >
              {showcaseViews.map(([id, label], index) => {
                const selected = activeView === id;
                return (
                  <button
                    aria-controls={`${id}-showcase-panel`}
                    aria-selected={selected}
                    className={`relative shrink-0 cursor-pointer pb-3 text-sm transition-colors focus-visible:outline-none ${
                      selected
                        ? "font-semibold text-wave-heading"
                        : "text-wave-muted hover:text-wave-heading"
                    }`}
                    id={`${id}-showcase-tab`}
                    key={id}
                    onClick={() => setActiveView(id)}
                    onKeyDown={(event) =>
                      handleShowcaseKeyDown(event, index)
                    }
                    role="tab"
                    tabIndex={selected ? 0 : -1}
                    type="button"
                  >
                    {label}
                    {selected ? (
                      <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-wave-heading" />
                    ) : null}
                  </button>
                );
              })}
            </div>

            <article className="mt-10 text-[1.03rem] leading-8 text-wave-body">
              <div
                aria-labelledby="components-showcase-tab"
                className="space-y-16"
                hidden={activeView !== "components"}
                id="components-showcase-panel"
                role="tabpanel"
              >
              <section aria-labelledby="inspiration">
                <SectionTitle id="inspiration">Inspiration</SectionTitle>
                <p>
                  This design system is inspired by the work of{" "}
                  <strong className="font-semibold text-wave-heading">
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
                      className="group block w-full cursor-zoom-in overflow-hidden rounded-lg border border-wave-border p-0 text-left outline-none hover:border-wave-border-strong focus-visible:border-wave-blue-vivid/60"
                      onClick={() =>
                        setLightbox({ items: inspirationItems, index: 0 })
                      }
                      type="button"
                    >
                      <ProgressiveImage
                        alt={inspirationItems[0].alt}
                        className="w-full rounded-none border-0"
                        height={1417}
                        loading="eager"
                        src={inspirationItems[0].src}
                        width={1000}
                      />
                    </button>
                    <figcaption className="mt-3 text-sm leading-6 text-wave-subtle">
                      Kazumasa Nagai, primary reference
                    </figcaption>
                  </figure>
                  <figure>
                    <button
                      aria-label="Open secondary inspiration image"
                      className="group block w-full cursor-zoom-in overflow-hidden rounded-lg border border-wave-border p-0 text-left outline-none hover:border-wave-border-strong focus-visible:border-wave-blue-vivid/60"
                      onClick={() =>
                        setLightbox({ items: inspirationItems, index: 1 })
                      }
                      type="button"
                    >
                      <ProgressiveImage
                        alt={inspirationItems[1].alt}
                        className="w-full rounded-none border-0"
                        height={894}
                        loading="eager"
                        src={inspirationItems[1].src}
                        width={640}
                      />
                    </button>
                    <figcaption className="mt-3 text-sm leading-6 text-wave-subtle">
                      Secondary reference for radial systems and optical depth
                    </figcaption>
                  </figure>
                  <figure>
                    <button
                      aria-label="Open No More War inspiration image"
                      className="group block w-full cursor-zoom-in overflow-hidden rounded-lg border border-wave-border p-0 text-left outline-none hover:border-wave-border-strong focus-visible:border-wave-blue-vivid/60"
                      onClick={() =>
                        setLightbox({ items: inspirationItems, index: 2 })
                      }
                      type="button"
                    >
                      <ProgressiveImage
                        alt={inspirationItems[2].alt}
                        className="w-full rounded-none border-0"
                        height={898}
                        loading="eager"
                        src={inspirationItems[2].src}
                        width={640}
                      />
                    </button>
                    <figcaption className="mt-3 text-sm leading-6 text-wave-subtle">
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
                <div className="relative mt-6 aspect-[16/7] w-full overflow-hidden rounded-lg border border-wave-border bg-black">
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
                      className="overflow-hidden rounded-lg border border-wave-border bg-wave-surface"
                      key={family.name}
                    >
                      <div className="flex items-start gap-3 p-4">
                        <span
                          className="mt-0.5 h-6 w-6 shrink-0 rounded-full border border-wave-border"
                          style={{ backgroundColor: family.anchor }}
                        />
                        <div>
                          <h3 className="text-sm font-semibold text-wave-heading">
                            {family.name}
                          </h3>
                          <code className="font-mono text-[0.7rem] text-wave-subtle">
                            {family.token}
                          </code>
                          <p className="mt-1 text-xs leading-5 text-wave-subtle">
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
                  <div className="rounded-lg border border-wave-border bg-wave-surface p-4">
                    <span className="block h-5 w-5 rounded-full border border-wave-border bg-black" />
                    <p className="mt-3 text-wave-heading">Canvas</p>
                    <TokenLabel>#000000</TokenLabel>
                  </div>
                  <div className="rounded-lg border border-wave-border bg-wave-surface p-4">
                    <span className="block h-5 w-5 rounded-full bg-neutral-300" />
                    <p className="mt-3 text-wave-heading">Reading text</p>
                    <TokenLabel>neutral-300</TokenLabel>
                  </div>
                  <div className="rounded-lg border border-wave-border bg-wave-surface p-4">
                    <span className="block h-5 w-5 rounded-full bg-sky-300" />
                    <p className="mt-3 text-wave-heading">Navigation</p>
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
                  <code className="font-mono text-[0.88em] text-wave-muted">
                    max-w-2xl
                  </code>
                  ), matching the measure used by this page.
                </p>
                <div className="mt-6 overflow-hidden rounded-lg border border-wave-border">
                  <div className="border-b border-wave-border p-6">
                    <div className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-wave-subtle">
                      EditableTitle · Display / 48 / 800
                    </div>
                    <div className="mt-3">
                      <EditableTitle
                        className="text-4xl font-extrabold tracking-[-0.035em] text-wave-heading sm:text-5xl"
                        id="typography-display"
                        level={3}
                      >
                        Intelligence in motion.
                      </EditableTitle>
                    </div>
                  </div>
                  <div className="border-b border-wave-border p-6">
                    <div className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-wave-subtle">
                      EditableTitle · Heading / 24 / 800
                    </div>
                    <div className="mt-3">
                      <EditableTitle
                        className="text-2xl font-extrabold tracking-tight text-wave-heading"
                        id="typography-heading"
                        level={3}
                      >
                        Build the sharpest version.
                      </EditableTitle>
                    </div>
                  </div>
                  <div className="border-b border-wave-border p-6">
                    <div className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-wave-subtle">
                      EditableText · Body / 16.5 / 32 · Column / 42rem / 672px
                    </div>
                    <div className="mt-3">
                      <EditableText
                        className="max-w-2xl text-[1.03rem] leading-8 text-wave-body"
                        id="typography-body"
                        rows={5}
                      >
                        Software should feel immediate. Structure the page so
                        the useful thing appears first, then let detail reward
                        attention.
                      </EditableText>
                    </div>
                  </div>
                  <div className="border-b border-wave-border p-6">
                    <div className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-wave-subtle">
                      Subtle / 14 / 24
                    </div>
                    <p className="mt-3 text-sm leading-6 text-wave-subtle">
                      Supporting context stays present without competing with
                      the work.
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-wave-subtle">
                      Code / 12.5 / 20
                    </div>
                    <code className="mt-3 block font-mono text-[0.78rem] leading-5 text-wave-subtle">
                      wave-orange&nbsp;&nbsp;#f97316
                    </code>
                  </div>
                </div>
              </section>

              <section aria-labelledby="links">
                <SectionTitle id="links">Links</SectionTitle>
                <div className="rounded-lg border border-wave-border bg-wave-surface p-6">
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
                    className="group block w-full cursor-zoom-in overflow-hidden rounded-lg border border-wave-border p-0 text-left outline-none hover:border-wave-border-strong focus-visible:border-wave-blue-vivid/60"
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
                      className="w-full rounded-none border-0"
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
                  <figcaption className="mt-3 text-center text-sm text-wave-subtle">
                    Placeholder → responsive source set → full-resolution lightbox
                  </figcaption>
                </figure>
              </section>

              <section aria-labelledby="cards">
                <SectionTitle id="cards">Image cards</SectionTitle>
                <p>
                  Image cards use a golden-ratio image by default, carry media
                  all the way to the card edges, and keep one-line titles with
                  at most two lines of supporting detail. When an href is
                  provided, the entire card behaves as one link.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <ImageCard
                    description="A compact image-led entry with a responsive preview and full-resolution source."
                    href="https://jay.ai/blog/llms-are-not-a-black-box"
                    image={{
                      src: "/blog/image-cache/llms-are-not-a-black-box/header-55330a11a7-1024.webp",
                      srcSet:
                        "/blog/image-cache/llms-are-not-a-black-box/header-55330a11a7-672.webp 672w, /blog/image-cache/llms-are-not-a-black-box/header-55330a11a7-1024.webp 1024w",
                      fullSrc:
                        "/blog/images/llms-are-not-a-black-box/header.png",
                      alt: "A diagram from the essay LLMs Are Not a Black Box",
                      width: 1024,
                      height: 583,
                      placeholder: progressivePlaceholder,
                    }}
                    title="LLMs Are Not a Black Box"
                  />
                  <ImageCard
                    description="A second card stays exactly aligned even when its source image and copy differ."
                    href="#diagrams"
                    image={{
                      src: "/design/diagrams/intervention-pipeline.svg",
                      alt: "Intervention pipeline diagram",
                      width: 1200,
                      height: 640,
                    }}
                    title="Intervention pipeline"
                  />
                </div>
              </section>

              <section aria-labelledby="media-rows">
                <SectionTitle id="media-rows">Media rows</SectionTitle>
                <p>
                  Media rows are full-surface links for editorial indexes. The
                  preview moves to the right on wider screens and stacks below
                  the text on mobile, with progressive loading and optional
                  line clamping built in.
                </p>
                <div className="mt-3">
                  <MediaRow
                    description="A hands-on world model lab showing how a pixel transformer learns interpretable physical dynamics."
                    descriptionLines={3}
                    href="https://jay.ai/writing"
                    image={{
                      src: "/blog/image-cache/llms-are-not-a-black-box/header-55330a11a7-1024.webp",
                      alt: "A diagram from the essay LLMs Are Not a Black Box",
                      placeholder: progressivePlaceholder,
                    }}
                    meta="Jay Hack · Jul 2026"
                    title="J-Lens for video models"
                  />
                  <MediaRow
                    description="A text-only row keeps the same hierarchy, divider, hover state, and full-width click target."
                    href="#code"
                    meta="Wave Kit · Component"
                    title="MediaRow without a preview"
                  />
                </div>
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
                        className="group block w-full cursor-zoom-in overflow-hidden rounded-lg border border-wave-border p-0 text-left outline-none hover:border-wave-border-strong focus-visible:border-wave-blue-vivid/60"
                        onClick={() =>
                          setLightbox({ items: diagramItems, index })
                        }
                        type="button"
                      >
                        <ProgressiveImage
                          alt={item.alt}
                          className="w-full rounded-none border-0"
                          height={640}
                          src={item.src}
                          width={1200}
                        />
                      </button>
                      <figcaption className="mt-3 text-sm leading-6 text-wave-subtle">
                        {item.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
                <div className="mt-7 border-y border-wave-border text-sm">
                  <div className="grid grid-cols-[auto_1fr] gap-4 border-b border-wave-border py-3">
                    <span className="mt-1 size-3 rounded-full bg-wave-paper" />
                    <p>
                      <TokenLabel>wave-paper</TokenLabel>{" "}
                      <span className="text-wave-subtle">
                        Primary labels, titles, and high-contrast values.
                      </span>
                    </p>
                  </div>
                  <div className="grid grid-cols-[auto_1fr] gap-4 border-b border-wave-border py-3">
                    <span className="mt-1 size-3 rounded-full bg-wave-blue-vivid" />
                    <p>
                      <TokenLabel>wave-blue-vivid</TokenLabel>{" "}
                      <span className="text-wave-subtle">
                        Observations, measured structure, and primary series.
                      </span>
                    </p>
                  </div>
                  <div className="grid grid-cols-[auto_1fr] gap-4 border-b border-wave-border py-3">
                    <span className="mt-1 size-3 rounded-full bg-wave-red-vivid" />
                    <p>
                      <TokenLabel>wave-red-vivid</TokenLabel>{" "}
                      <span className="text-wave-subtle">
                        Interventions, causal emphasis, and comparison series.
                      </span>
                    </p>
                  </div>
                  <div className="grid grid-cols-[auto_1fr] gap-4 py-3">
                    <span className="mt-1 size-3 rounded-full bg-neutral-700" />
                    <p>
                      <TokenLabel>neutral-700</TokenLabel>{" "}
                      <span className="text-wave-subtle">
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
                <div className="mt-6 space-y-5 text-sm text-wave-subtle">
                  <span>Subtle</span>
                  <Divider />
                  <span>Strong</span>
                  <Divider emphasis="strong" />
                </div>
              </section>

              <section aria-labelledby="code-blocks">
                <SectionTitle id="code-blocks">Code blocks</SectionTitle>
                <CodeBlock
                  code={fibonacciSample}
                  label="fibonacci.py"
                  language="python"
                />
              </section>

              <section aria-labelledby="experiments">
                <SectionTitle id="experiments">
                  Experiment registry
                </SectionTitle>
                <p>
                  Register each run as a JSON record — slug, title,
                  description, timestamp, optional metrics and checkpoint
                  metadata — and render the registry with{" "}
                  <code className="font-mono text-[0.88em] text-wave-muted">
                    ExperimentIndex
                  </code>
                  .
                </p>
                <div className="mt-6">
                  <ExperimentIndex experiments={registeredExperiments} />
                </div>
                <p className="mt-3 text-sm leading-6 text-wave-subtle">
                  Live registry from the{" "}
                  <TextLink href="https://blocket-league.vercel.app/" tone="sky">
                    Blocket League lab
                  </TextLink>
                  .
                </p>
                <div className="mt-8 space-y-4">
                  <CodeBlock
                    code={experimentRegistryJson}
                    label="experiments.json"
                    language="json"
                  />
                  <CodeBlock
                    code={experimentPagesSample}
                    label="Registry-driven pages"
                    language="tsx"
                  />
                </div>
              </section>

              </div>

              <div
                aria-labelledby="style-guide-showcase-tab"
                hidden={activeView !== "style-guide"}
                id="style-guide-showcase-panel"
                role="tabpanel"
              >
                <section aria-labelledby="style-guide">
                  <SectionTitle id="style-guide">Style guide</SectionTitle>
                  <p>
                    Simplicity is an editing discipline. Every visual element
                    should improve meaning, navigation, or reading rhythm.
                  </p>
                  <div className="mt-8 space-y-8">
                    <div>
                      <h3 className="text-lg font-bold text-wave-heading">
                        Remove ornamental UI
                      </h3>
                      <p className="mt-2 text-wave-muted">
                        Avoid AI slop such as eyebrows, sequence numbers,
                        badges, and labels that only repeat nearby content. If
                        an element adds no information or function, remove it.
                      </p>
                    </div>
                    <Divider />
                    <div>
                      <h3 className="text-lg font-bold text-wave-heading">
                        Keep titles in proportion
                      </h3>
                      <p className="mt-2 text-wave-muted">
                        Use the smallest title that establishes hierarchy.
                        Avoid oversized hero text that pushes useful content
                        below the fold or turns every page into a landing page.
                      </p>
                    </div>
                    <Divider />
                    <div>
                      <h3 className="text-lg font-bold text-wave-heading">
                        Compose for vertical reading
                      </h3>
                      <p className="mt-2 text-wave-muted">
                        Structure pages like blog posts when possible. Assume
                        vertical scrolling, use semantic sections and
                        paragraphs, and intersperse images or interactive assets
                        with the text they support.
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              <div
                aria-labelledby="code-showcase-tab"
                className="space-y-16"
                hidden={activeView !== "code"}
                id="code-showcase-panel"
                role="tabpanel"
              >

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
                <div className="mt-6 overflow-hidden rounded-md border border-wave-border">
                  {techStack.map(([name, role], index) => (
                    <div
                      className={`flex items-baseline justify-between gap-4 px-4 py-3 ${
                        index === 3 ? "" : "border-b border-wave-border"
                      }`}
                      key={name}
                    >
                      <strong className="font-semibold text-wave-heading">
                        {name}
                      </strong>
                      <span className="text-right text-sm text-wave-subtle">
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

              </div>

              <div
                aria-labelledby="blog-showcase-tab"
                hidden={activeView !== "blog"}
                id="blog-showcase-panel"
                role="tabpanel"
              >
                <BlogPlayground />
              </div>

            </article>

            <footer className="mt-20 border-t border-wave-border pt-8 text-sm text-wave-subtle">
              Built from the components already used across jay.ai. This page is
              the source of truth for the portable kit.
            </footer>
          </main>

          <div aria-hidden="true" className="hidden min-[72rem]:block" />
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
