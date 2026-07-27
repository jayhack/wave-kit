import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  return readFile(
    new URL("../.next/server/app/index.html", import.meta.url),
    "utf8",
  );
}

test("server-renders the canonical jay.ai design page", async () => {
  const html = await render();
  assert.match(html, /<title>Wave Kit \| the jay\.ai component system<\/title>/i);
  assert.match(html, /<h1[^>]*>wave-kit<\/h1>/);
  assert.match(html, /Design system and UI kit developed for/);
  assert.match(html, />Jay Hack<\/a>&#x27;s personal projects\./);
  assert.match(html, /href="https:\/\/jay\.ai\/writing"/);
  assert.match(html, /Kazumasa Nagai, primary reference/);
  assert.match(html, /\/design\/kazumasa-nagai-inspiration\.webp/);
  assert.match(html, /\/design\/growth-inspiration\.webp/);
  assert.match(html, /\/design\/no-more-war-inspiration\.png/);
  assert.match(html, /No More War, repeated form and concentrated color/);
  assert.match(html, /npx skills add/);
  assert.match(html, />jayhack\/wave-kit<\/span>/);
  assert.match(html, />build-with-wave-kit<\/span>/);
  assert.match(
    html,
    /<code>npx skills add(?:<!-- -->)? <span class="text-wave-blue-light">jayhack\/wave-kit<\/span> --skill <span class="text-wave-blue-light">build-with-wave-kit<\/span> -y<\/code>/,
  );
  assert.match(html, /aria-label="Copy skill install command"/);
  assert.doesNotMatch(html, /Add the agent skill/);
  assert.match(html, /npm install @jayhack\/wave-kit tailwindcss/);
  assert.match(html, /git clone https:\/\/github\.com\/jayhack\/wave-kit\.git/);
  assert.match(html, /Four color anchors|four color anchors/);
  assert.match(html, /Subtle \/ 14 \/ 24/);
  assert.match(html, /Code \/ 12\.5 \/ 20/);
  assert.match(html, /wave-orange.*#f97316/);
  assert.match(html, />Code samples</);
  assert.match(html, /NavigationIndex, WaveField/);
  assert.match(html, /ProgressiveImage/);
  assert.match(html, /border-wave-blue-vivid/);
  assert.match(html, /text-wave-blue-light/);
  assert.match(html, /text-wave-blue-300/);
  assert.match(html, /text-wave-yellow-pale\/80/);
  assert.match(html, /text-wave-red-vivid/);
  assert.match(html, /class="text-wave-red-vivid">900<\/span>/);
  assert.match(html, /text-wave-orange/);
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
  assert.match(styles, /@import "@jayhack\/wave-kit\/styles\.css"/);
  assert.match(packageJson, /"@jayhack\/wave-kit": "\*"/);
  assert.doesNotMatch(packageJson, /vinext|wrangler|vite/);
  assert.doesNotMatch(page, /function (WaveField|ProgressiveImage|NavigationIndex)/);
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
