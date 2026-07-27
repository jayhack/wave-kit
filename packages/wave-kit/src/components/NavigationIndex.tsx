"use client";

import { useEffect, useState } from "react";

export type NavigationIndexItem = readonly [id: string, label: string];

export function NavigationIndex({
  items,
  label = "Index",
}: {
  items: readonly NavigationIndexItem[];
  label?: string;
}) {
  const [activeId, setActiveId] = useState(items[0]?.[0] ?? "");

  useEffect(() => {
    let frame = 0;

    const updateActiveItem = () => {
      const marker = window.innerHeight * 0.28;
      let nextActiveId = items[0]?.[0] ?? "";

      for (const [id] of items) {
        const section = document.getElementById(id);

        if (section && section.getBoundingClientRect().top <= marker) {
          nextActiveId = id;
        }
      }

      setActiveId(nextActiveId);
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActiveItem);
    };

    updateActiveItem();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, [items]);

  return (
    <nav aria-label={label}>
      <div className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-neutral-600">
        {label}
      </div>
      <ol className="border-l border-white/10 text-sm leading-5">
        {items.map(([id, itemLabel]) => (
          <li key={id}>
            <a
              aria-current={activeId === id ? "location" : undefined}
              className={`-ml-px block border-l-2 py-1.5 pl-3 ${
                activeId === id
                  ? "border-white/60 text-neutral-300"
                  : "border-transparent text-neutral-600 hover:text-neutral-300"
              }`}
              href={`#${id}`}
              onClick={() => setActiveId(id)}
            >
              {itemLabel}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export type NavigationIndexProps = Parameters<typeof NavigationIndex>[0];
