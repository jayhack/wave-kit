"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";

export type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
};

export type TabsProps = {
  items: TabItem[];
  label?: string;
};

export function Tabs({ items, label = "Examples" }: TabsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const groupId = useId();
  const active = items.find((item) => item.id === activeId) ?? items[0];

  function handleTabKey(
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) {
    if (!items.length) return;
    let nextIndex = currentIndex;
    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % items.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + items.length) % items.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = items.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveId(items[nextIndex].id);
    const tabs =
      event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]',
      );
    tabs?.[nextIndex]?.focus();
  }

  if (!active) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-wave-border bg-wave-surface">
      <div
        aria-label={label}
        className="no-scrollbar tab-scroll-x flex gap-6 border-b border-wave-border px-5"
        role="tablist"
      >
        {items.map((item, index) => {
          const selected = item.id === active.id;
          return (
            <button
              aria-controls={`${groupId}-${item.id}-panel`}
              aria-selected={selected}
              className={`relative shrink-0 py-3 text-sm ${
                selected
                  ? "font-semibold text-wave-heading"
                  : "text-wave-muted hover:text-wave-heading"
              }`}
              id={`${groupId}-${item.id}-tab`}
              key={item.id}
              onClick={() => setActiveId(item.id)}
              onKeyDown={(event) => handleTabKey(event, index)}
              role="tab"
              tabIndex={selected ? 0 : -1}
              type="button"
            >
              {item.label}
              {selected ? (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-wave-heading" />
              ) : null}
            </button>
          );
        })}
      </div>
      <div
        aria-labelledby={`${groupId}-${active.id}-tab`}
        className="min-h-28 p-5 text-[0.98rem] leading-7 text-wave-body"
        id={`${groupId}-${active.id}-panel`}
        role="tabpanel"
      >
        {active.content}
      </div>
    </div>
  );
}
