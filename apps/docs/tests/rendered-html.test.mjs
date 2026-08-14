import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  return readFile(
    new URL("../.next/server/app/index.html", import.meta.url),
    "utf8",
  );
}

async function renderEditablePlayground() {
  return readFile(
    new URL("../.next/server/app/editable.html", import.meta.url),
    "utf8",
  );
}

test("server-renders the canonical jay.ai design page", async () => {
  const html = await render();
  assert.match(html, /<title>Wave Kit \| the jay\.ai component system<\/title>/i);
  assert.match(html, /<h1[^>]*>wave-kit<\/h1>/);
  assert.match(
    html,
    /Emphasizes simplicity, legibility and performance for technical writing\./,
  );
  assert.match(html, />Jay Hack<\/a>&#x27;s personal projects\./);
  assert.match(html, /href="https:\/\/jay\.ai\/writing"/);
  assert.match(html, /Kazumasa Nagai, primary reference/);
  assert.match(
    html,
    /a Japanese graphic designer, and other poster art from the/,
  );
  assert.match(html, /HAL(?:<!-- -->)? 9000, but in a benevolent manner/);
  assert.doesNotMatch(html, /The visual system takes its clearest cue/);
  assert.match(html, /\/design\/kazumasa-nagai-inspiration\.webp/);
  assert.match(html, /\/design\/growth-inspiration\.webp/);
  assert.match(html, /\/design\/no-more-war-inspiration\.png/);
  assert.match(html, /No More War, repeated form and concentrated color/);
  assert.match(html, />Diagrams</);
  assert.match(html, /\/design\/diagrams\/intervention-pipeline\.svg/);
  assert.match(html, /\/design\/diagrams\/probe-depth\.svg/);
  assert.match(html, /Observations, measured structure, and primary series/);
  assert.match(html, /Interventions, causal emphasis, and comparison series/);
  assert.match(html, /npx skills add/);
  assert.match(html, />jayhack\/wave-kit<\/span>/);
  assert.match(html, />build-with-wave-kit<\/span>/);
  assert.match(
    html,
    /<code>npx skills add(?:<!-- -->)? <span class="text-wave-blue-light">jayhack\/wave-kit<\/span> --skill <span class="text-wave-blue-light">build-with-wave-kit<\/span> -y<\/code>/,
  );
  assert.match(html, /aria-label="Copy skill install command"/);
  assert.match(html, /text-wave-link-orange decoration-wave-link-orange/);
  assert.match(html, /data-theme-toggle/);
  assert.match(html, /Switch between light and dark mode/);
  assert.match(html, /bg-wave-canvas text-wave-body/);
  assert.doesNotMatch(html, /Add the agent skill/);
  assert.match(html, /Four color anchors|four color anchors/);
  assert.match(html, /Subtle \/ 14 \/ 24/);
  assert.match(html, /Code \/ 12\.5 \/ 20/);
  assert.match(html, /wave-orange.*#f97316/);
  assert.match(html, />Code samples</);
  assert.match(html, /aria-label="Wave Kit showcase"/);
  assert.match(html, />Components/);
  assert.match(html, />Blog playground<\/button>/);
  assert.match(html, /Changes stay in this demo only/);
  assert.match(html, /What the model learns between frames/);
  assert.match(html, /data-language="bash"/);
  assert.match(html, /data-language="css"/);
  assert.match(html, /Highlighted code/);
  assert.match(html, /CodeBlock/);
  assert.match(html, /NavigationIndex, WaveField/);
  assert.match(html, /ProgressiveImage/);
  assert.match(html, />Image cards</);
  assert.match(html, />Media rows</);
  assert.match(html, /J-Lens for video models/);
  assert.match(html, /LLMs Are Not a Black Box/);
  assert.match(html, /Intervention pipeline/);
  assert.match(html, /border-wave-blue-vivid/);
  assert.match(html, /text-wave-blue-light/);
  assert.match(html, /text-wave-syntax-keyword/);
  assert.match(html, /text-wave-syntax-string/);
  assert.match(html, /text-wave-syntax-number/);
  assert.match(html, /class="text-wave-syntax-number">900<\/span>/);
  assert.match(html, />Style guide</);
  assert.match(html, /Avoid AI slop/);
  assert.match(html, /Keep titles in proportion/);
  assert.match(html, /Compose for vertical reading/);
  assert.match(html, /Install the public package from npm/);
  assert.match(html, />Experiment(?:<!-- -->)? registry</);
  assert.match(html, /The 1\.5(?:<!-- -->)? MB capacity cliff/);
  assert.match(html, /12-frame error/i);
  assert.match(html, /4\.98(?:<!-- -->)? px/);
  assert.match(html, /href="https:\/\/blocket-league\.vercel\.app\/nano-1p5mb\/"/);
  assert.match(html, /2026-07-14/);
  assert.doesNotMatch(html, /Experiment(?:<!-- -->)? \/ (?:<!-- -->)?nano-1p5mb/i);
  assert.doesNotMatch(html, /Experiment-specific content renders here\./);
  assert.match(html, /data-language="json"/);
  assert.match(html, /experiments\.json/);
  assert.match(html, /parseExperiments/);
  assert.match(html, />Code(?:<!-- -->)? blocks</);
  assert.match(html, /def<\/span> fib\(/);
  assert.match(html, /Return the n-th Fibonacci number/);
  assert.match(html, />Tech stack</);
  assert.match(html, />Next\.js</);
  assert.match(html, />Vercel</);
  assert.match(html, />Tailwind CSS</);
  assert.match(html, />shadcn\/ui</);
  assert.doesNotMatch(html, />Principles</);
});

test("the showcase consumes React, Tailwind, and package components", async () => {
  const [page, styles, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /from "@jayhack\/wave-kit"/);
  assert.match(styles, /@import "tailwindcss"/);
  assert.match(
    styles,
    /@import "@jayhack\/wave-kit\/styles\.css"/,
  );
  assert.match(packageJson, /"@jayhack\/wave-kit": "\*"/);
  assert.match(page, /npm install @jayhack\/wave-kit tailwindcss/);
  assert.match(page, /git clone https:\/\/github\.com\/jayhack\/wave-kit\.git/);
  assert.doesNotMatch(packageJson, /vinext|wrangler|vite/);
  assert.doesNotMatch(
    page,
    /function (CodeBlock|ImageCard|MediaRow|WaveField|ProgressiveImage|NavigationIndex|ExperimentIndex|ExperimentPage)/,
  );
});

test("the package exposes semantic Tailwind color names", async () => {
  const styles = await readFile(
    new URL("../../../packages/wave-kit/src/styles.css", import.meta.url),
    "utf8",
  );

  assert.match(styles, /--color-wave-blue-vivid: #2090c8/);
  assert.match(styles, /--color-wave-red-vivid: #dc2626/);
  assert.match(styles, /--color-wave-orange: #f97316/);
  assert.match(styles, /--color-wave-amber: #fbbf24/);
  assert.match(styles, /--color-wave-canvas: var\(--wave-canvas\)/);
  assert.match(styles, /\[data-theme="light"\]/);
  assert.match(styles, /--wave-canvas: #f7f5ef/);
});

test("image cards keep compact, aligned golden-ratio layouts", async () => {
  const source = await readFile(
    new URL(
      "../../../packages/wave-kit/src/components/ImageCard.tsx",
      import.meta.url,
    ),
    "utf8",
  );

  assert.match(source, /aspectRatio = "1\.618 \/ 1"/);
  assert.match(source, /rounded-lg/);
  assert.match(source, /ring-1 ring-inset ring-wave-border/);
  assert.match(source, /flex-col p-4/);
  assert.match(source, /truncate text-sm/);
  assert.match(source, /!m-0 truncate/);
  assert.match(source, /\[&>p\]:!m-0/);
  assert.match(source, /absolute inset-0 z-10 rounded-lg/);
  assert.match(source, /line-clamp-2/);
  assert.doesNotMatch(source, /<Lightbox/);
});

test("media rows preserve responsive editorial index behavior", async () => {
  const source = await readFile(
    new URL(
      "../../../packages/wave-kit/src/components/MediaRow.tsx",
      import.meta.url,
    ),
    "utf8",
  );

  assert.match(source, /sm:flex sm:items-start sm:justify-between sm:gap-5/);
  assert.match(source, /sm:w-\[180px\] md:w-\[220px\]/);
  assert.match(source, /aspect-\[1\.91\/1\]/);
  assert.match(source, /group-hover:text-wave-link-sky/);
  assert.match(source, /renderLink/);
  assert.match(source, /fallbackSrc/);
});

test("the cellular wave field settles and uses rounded cells", async () => {
  const source = await readFile(
    new URL(
      "../../../packages/wave-kit/src/components/FluidAnimation.tsx",
      import.meta.url,
    ),
    "utf8",
  );

  assert.match(source, /const DAMPING = 0\.955/);
  assert.match(source, /const SETTLE_THRESHOLD = 0\.02/);
  assert.match(source, /next\[\(gridH - 1\) \* gridW \+ x\] = 0/);
  assert.match(source, /path\.roundRect/);
  assert.match(source, /const AUTO_RIPPLE_IDLE_MS = 8000/);
});

test("editable content is static in the production render", async () => {
  const html = await renderEditablePlayground();

  assert.match(html, /<h1[^>]*>A locally editable title<\/h1>/);
  assert.match(
    html,
    /<p[^>]*>Click this paragraph while the development server is running\./,
  );
  assert.doesNotMatch(html, /data-wave-editable/);
  assert.doesNotMatch(html, />Save<\/button>/);
  assert.doesNotMatch(html, />Cancel<\/button>/);
});

test("demo editable content remains interactive in production", async () => {
  const html = await render();

  assert.match(html, /data-wave-editable="blog-demo-title"/);
  assert.match(html, /data-wave-editable="blog-demo-introduction"/);
  assert.match(html, /Edit title: blog-demo-title/);
});
