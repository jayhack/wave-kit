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

test("server-renders the Wave Kit showcase", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Wave Kit — the jay\.ai component system<\/title>/i);
  assert.match(html, /npm install wave-kit/);
  assert.match(html, /class="wk-wave-field"/);
  assert.match(html, /class="wk-index"/);
  assert.match(html, /class="wk-image/);
  assert.match(html, /Four anchors, including the canvas/);
  assert.doesNotMatch(html, />Principles</);
});

test("the showcase consumes the published package surface", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /from "wave-kit"/);
  assert.match(layout, /import "wave-kit\/styles\.css"/);
  assert.match(packageJson, /"wave-kit": "\*"/);
  assert.doesNotMatch(page, /function (WaveField|LightboxImage|NavigationIndex)/);
});
