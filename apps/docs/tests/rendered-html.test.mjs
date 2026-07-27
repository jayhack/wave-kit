import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the canonical jay.ai design page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Wave Kit — the jay\.ai component system<\/title>/i);
  assert.match(html, /<h1[^>]*>wave-kit<\/h1>/);
  assert.match(html, /Developed for Jay Hack&#x27;s personal projects\./);
  assert.match(html, /href="https:\/\/jay\.ai\/writing"/);
  assert.match(html, /Kazumasa Nagai — primary reference/);
  assert.match(html, /\/design\/kazumasa-nagai-inspiration\.webp/);
  assert.match(html, /\/design\/growth-inspiration\.webp/);
  assert.match(html, /npm install wave-kit tailwindcss/);
  assert.match(html, /Four color anchors|four color anchors/);
  assert.doesNotMatch(html, />Principles</);
});

test("the showcase consumes React, Tailwind, and package components", async () => {
  const [page, styles, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /from "wave-kit"/);
  assert.match(styles, /@import "tailwindcss"/);
  assert.match(styles, /@import "wave-kit\/styles\.css"/);
  assert.match(packageJson, /"wave-kit": "\*"/);
  assert.doesNotMatch(page, /function (WaveField|ProgressiveImage|NavigationIndex)/);
});
