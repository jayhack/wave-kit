#!/usr/bin/env node
// Wave Kit project setup. Wires the global stylesheet for Wave Kit and clears
// the create-next-app light-mode defaults that otherwise fight the dark canvas.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { relative, resolve } from "node:path";

const args = process.argv.slice(2);
const cmd = args[0] ?? "init";

if (cmd === "-h" || cmd === "--help" || (cmd !== "init")) {
  const known = cmd === "init" || cmd === "-h" || cmd === "--help";
  console.log(`wave-kit — set up a project to build with Wave Kit

Usage:
  npx wave-kit init    Point the global stylesheet at Wave Kit and remove the
                       create-next-app light-mode defaults. Run it from your
                       app root after installing @jayhack/wave-kit.`);
  if (!known) console.error(`\nUnknown command: ${cmd}`);
  process.exit(known ? 0 : 1);
}

const cwd = process.cwd();
const rel = (p) => relative(cwd, p) || p;
const changed = [];
const skipped = [];
const notes = [];

// --- 1. Global stylesheet ---------------------------------------------------
const CSS_CANDIDATES = [
  "app/globals.css",
  "src/app/globals.css",
  "styles/globals.css",
  "src/styles/globals.css",
  "app/global.css",
];
const WAVE_MARKER = "@jayhack/wave-kit/styles.css";
const WAVE_CSS = `@import "tailwindcss";
@import "@jayhack/wave-kit/styles.css";

/* Wave Kit is dark by default. */
@layer base {
  html {
    color-scheme: dark;
  }
  body {
    background-color: var(--color-wave-ink, #000);
    color: var(--color-neutral-300, #d4d4d4);
  }
}
`;

const cssPath = CSS_CANDIDATES.map((p) => resolve(cwd, p)).find(existsSync);
if (!cssPath) {
  notes.push(
    'No global stylesheet found (looked in app/, src/app/, styles/). Create one that imports "tailwindcss" then "@jayhack/wave-kit/styles.css".',
  );
} else {
  const cur = readFileSync(cssPath, "utf8");
  if (cur.includes(WAVE_MARKER)) {
    skipped.push(`${rel(cssPath)} already imports Wave Kit`);
  } else {
    const looksLikeStarter = /--background|--font-geist|@theme\s+inline/.test(cur);
    const onlyTailwind = /^\s*@import\s+["']tailwindcss["'];?\s*$/.test(cur.trim());
    if (looksLikeStarter || onlyTailwind || cur.trim() === "") {
      writeFileSync(cssPath, WAVE_CSS);
      changed.push(`${rel(cssPath)} — replaced starter styles with the Wave Kit setup`);
    } else {
      // A stylesheet with real custom rules: keep it, just add the import.
      const next = /@import\s+["']tailwindcss["'];?/.test(cur)
        ? cur.replace(
            /(@import\s+["']tailwindcss["'];?[ \t]*\n?)/,
            `$1@import "${WAVE_MARKER}";\n`,
          )
        : `@import "tailwindcss";\n@import "${WAVE_MARKER}";\n\n${cur}`;
      writeFileSync(cssPath, next);
      changed.push(`${rel(cssPath)} — added the Wave Kit import above your custom rules`);
      notes.push(
        `${rel(cssPath)} has custom CSS: confirm it does not set a light background or remap --font-sans.`,
      );
    }
  }
}

// --- 2. Root layout: drop create-next-app's Geist font wiring ---------------
// Wave Kit ships its own system font stack, so the bundled Geist fonts are dead
// weight once the stylesheet is rewired.
const LAYOUT_CANDIDATES = [
  "app/layout.tsx",
  "src/app/layout.tsx",
  "app/layout.jsx",
  "src/app/layout.jsx",
];
const layoutPath = LAYOUT_CANDIDATES.map((p) => resolve(cwd, p)).find(existsSync);
if (layoutPath) {
  const cur = readFileSync(layoutPath, "utf8");
  if (/next\/font\/google/.test(cur) && /Geist/.test(cur)) {
    let next = cur
      .replace(/import\s*\{[^}]*\}\s*from\s*["']next\/font\/google["'];?[ \t]*\n/, "")
      .replace(/const\s+\w+\s*=\s*Geist\w*\(\{[\s\S]*?\}\);[ \t]*\n/g, "")
      .replace(/\$\{\s*\w+\.variable\s*\}\s*/g, "");
    // Collapse a className template literal that no longer interpolates anything.
    next = next.replace(/className=\{`([^`]*)`\}/g, (match, inner) =>
      inner.includes("${") ? match : `className="${inner.replace(/\s+/g, " ").trim()}"`,
    );
    if (next !== cur) {
      writeFileSync(layoutPath, next);
      changed.push(`${rel(layoutPath)} — removed the unused Geist font wiring`);
    } else {
      skipped.push(`${rel(layoutPath)} — nothing to change`);
    }
  } else {
    skipped.push(`${rel(layoutPath)} — no create-next-app font wiring found`);
  }
}

// --- Report -----------------------------------------------------------------
const line = (s) => console.log(`  ${s}`);
console.log("\nWave Kit setup");
if (changed.length) {
  console.log("\nUpdated:");
  changed.forEach(line);
}
if (skipped.length) {
  console.log("\nLeft as-is:");
  skipped.forEach(line);
}
if (notes.length) {
  console.log("\nCheck:");
  notes.forEach(line);
}
console.log(
  "\nNext: import components from \"@jayhack/wave-kit\" and build with the responsive page shell.\n",
);
