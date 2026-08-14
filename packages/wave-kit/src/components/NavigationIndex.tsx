"use client";

import { useEffect, useState } from "react";

export type NavigationIndexItem = readonly [id: string, label: string];

export function NavigationIndex({
  items,
  label = "Contents",
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
    <nav className="w-44 font-sans" aria-label={label}>
      <div className="mb-3.5 ml-[18px] text-[11px] font-semibold uppercase tracking-[0.12em] text-wave-subtle">
        {label}
      </div>
      <ol className="m-0 list-none p-0">
        {items.map(([id, itemLabel]) => (
          <li key={id}>
            <a
              aria-current={activeId === id ? "location" : undefined}
              className={`flex min-h-[42px] items-center border-l-2 py-2 pr-2.5 pl-[17px] text-[13px] font-medium leading-[1.35] no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 ${
                activeId === id
                  ? "border-wave-blue-vivid text-wave-heading"
                  : "border-wave-border text-wave-subtle hover:border-wave-border-strong hover:text-wave-body"
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
