"use client";

import {
  BackLink,
  Divider,
  GitHubButton,
  LightboxImage,
  NavigationIndex,
  Tabs,
  TextLink,
  WaveField,
} from "wave-kit";

const indexItems = [
  { href: "#wave", label: "Wave field" },
  { href: "#color", label: "Color" },
  { href: "#type", label: "Typography" },
  { href: "#links", label: "Links & controls" },
  { href: "#tabs", label: "Tabs" },
  { href: "#images", label: "Images" },
  { href: "#dividers", label: "Dividers" },
  { href: "#install", label: "Install" },
];

const colors = [
  { name: "Ink", role: "The field", shades: ["#000000", "#090909", "#171717", "#292929"] },
  { name: "Blue", role: "Signal", shades: ["#07111f", "#126aa0", "#2090c8", "#7dd3fc"] },
  { name: "Red", role: "Heat", shades: ["#5a1010", "#b91c1c", "#dc2626", "#ff3b30"] },
  { name: "Yellow", role: "Energy", shades: ["#f97316", "#fbbf24", "#fde68a", "#fef3c7"] },
];

const exampleTabs = [
  { id: "work", label: "work", content: "Companies, products, and AI systems." },
  { id: "projects", label: "projects", content: "Independent experiments and generative tools." },
  { id: "writing", label: "writing", content: "Essays, notes, and conversations." },
];

function Code({ children }: { children: string }) {
  return <code className="inline-code">{children}</code>;
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top">wave kit</a>
        <div className="header-links">
          <TextLink href="#install">npm</TextLink>
          <TextLink external href="https://jay.ai/design">jay.ai</TextLink>
        </div>
      </header>

      <div className="page-grid" id="top">
        <aside><NavigationIndex items={indexItems} /></aside>

        <div className="page-content">
          <section className="hero">
            <p className="eyebrow">The jay.ai component system</p>
            <h1>Small pieces.<br />One visual frequency.</h1>
            <p className="lede">
              A public React kit for dark interfaces, fast images, immediate
              interactions, and cellular motion. The package is the source of
              truth; this page is built from it.
            </p>
            <div className="hero-actions">
              <a className="install-command" href="#install">
                <span>$</span> npm install wave-kit
              </a>
              <GitHubButton href="https://github.com/jayhack/wave-kit" />
            </div>
          </section>

          <section className="section wave-section" id="wave">
            <div className="section-heading">
              <h2>Wave field</h2>
              <p>Discrete cells carry energy across a field that rests at black.</p>
            </div>
            <WaveField aria-label="Interactive Wave Kit cellular field" />
            <p className="caption">
              A damped two-dimensional wave equation, rendered as separated cells.
            </p>
          </section>

          <Divider />

          <section className="section" id="color">
            <div className="section-heading">
              <h2>Color</h2>
              <p>
                Four anchors, including the canvas. Blue is signal, red is heat,
                yellow is energy, and black is the field. Shades support those
                anchors; they are not new color families.
              </p>
            </div>
            <div className="palette">
              {colors.map((family) => (
                <article className="color-family" key={family.name}>
                  <div className="swatches">
                    {family.shades.map((shade) => (
                      <span key={shade} style={{ backgroundColor: shade }} title={shade} />
                    ))}
                  </div>
                  <div>
                    <p className="eyebrow">{family.role}</p>
                    <h3>{family.name}</h3>
                  </div>
                  <code>{family.shades[2]}</code>
                </article>
              ))}
            </div>
          </section>

          <Divider />

          <section className="section" id="type">
            <div className="section-heading">
              <h2>Typography</h2>
              <p>
                A neutral grotesk carries the page. Monospace is reserved for
                labels, code, and small pieces of system information.
              </p>
            </div>
            <div className="type-specimens">
              <article>
                <p className="eyebrow">Display / Sans</p>
                <p className="display-sample">Energy has a shape.</p>
                <code>Geist · 64/62 · 650</code>
              </article>
              <article>
                <p className="eyebrow">Body / Sans</p>
                <p className="body-sample">
                  Useful content arrives first. The interface stays quiet enough
                  for the work to remain visible.
                </p>
                <code>Geist · 20/32 · 400</code>
              </article>
              <article>
                <p className="eyebrow">System / Mono</p>
                <p className="mono-sample">SIGNAL_04 / CELL_2090C8</p>
                <code>Geist Mono · 12/16 · 600</code>
              </article>
            </div>
          </section>

          <Divider />

          <section className="section" id="links">
            <div className="section-heading">
              <h2>Links & controls</h2>
              <p>
                Controls are compact rectangles. Hover feedback is immediate:
                no easing, slide, scale, or delayed reveal.
              </p>
            </div>
            <div className="component-row">
              <BackLink fallbackHref="https://jay.ai">Back home</BackLink>
              <GitHubButton href="https://github.com/jayhack/wave-kit" />
              <TextLink href="#install">Read installation</TextLink>
              <TextLink external href="https://jay.ai">Visit jay.ai</TextLink>
            </div>
          </section>

          <Divider />

          <section className="section" id="tabs">
            <div className="section-heading">
              <h2>Tabs</h2>
              <p>
                A restrained tab row for switching context without turning the
                interface into a tray of pills.
              </p>
            </div>
            <Tabs
              ariaLabel="Example portfolio sections"
              items={exampleTabs}
            />
          </section>

          <Divider />

          <section className="section" id="images">
            <div className="section-heading">
              <h2>Images</h2>
              <p>
                Reserve the geometry, paint a tiny placeholder, fade in the
                responsive source, and open the full asset in the same lightbox
                used across the blog.
              </p>
            </div>
            <LightboxImage
              alt="A black cellular wave field moving from blue into red and yellow"
              caption="Wave Kit field study — click to inspect the full image."
              fullSrc="/wave-kit-field.png"
              height={900}
              placeholderSrc="/wave-kit-field-placeholder.webp"
              sizes="(max-width: 900px) 100vw, 860px"
              src="/wave-kit-field.webp"
              srcSet="/wave-kit-field-960.webp 960w, /wave-kit-field.webp 1600w"
              width={1600}
            />
            <div className="image-notes">
              <span><strong>No shift</strong><Code>width + height</Code></span>
              <span><strong>Fast paint</strong><Code>tiny placeholder</Code></span>
              <span><strong>Low cost</strong><Code>decoding=&quot;async&quot;</Code></span>
            </div>
          </section>

          <Divider />

          <section className="section" id="dividers">
            <div className="section-heading">
              <h2>Dividers</h2>
              <p>
                A single quiet rule carries structure across long pages. Use it
                instead of placing every section inside a card.
              </p>
            </div>
            <div className="divider-demo">
              <p>First thought</p><Divider />
              <p>Second thought</p><Divider />
              <p>Third thought</p>
            </div>
          </section>

          <Divider />

          <section className="section install-section" id="install">
            <p className="eyebrow">Open source / MIT</p>
            <h2>Bring the frequency with you.</h2>
            <pre><code>npm install wave-kit</code></pre>
            <pre><code>{`import { WaveField, LightboxImage } from "wave-kit";
import "wave-kit/styles.css";`}</code></pre>
            <p>
              React and React DOM stay as peer dependencies. Styles are compiled
              CSS, so projects do not need Tailwind content scanning or a Wave
              Kit-specific build plugin.
            </p>
          </section>

          <footer>
            <span>Wave Kit / 0.1.0</span>
            <TextLink href="#top">Back to top ↑</TextLink>
          </footer>
        </div>
      </div>
    </main>
  );
}
