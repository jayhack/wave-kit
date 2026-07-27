"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";

export type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
};

export type TabsProps = {
  items: TabItem[];
  defaultId?: string;
  ariaLabel?: string;
};

export function Tabs({ items, defaultId, ariaLabel = "Sections" }: TabsProps) {
  const [active, setActive] = useState(defaultId ?? items[0]?.id);
  const uid = useId();

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (items.length === 0) return;
    const currentIndex = items.findIndex((item) => item.id === active);
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? items.length - 1
          : (currentIndex + (event.key === "ArrowRight" ? 1 : -1) + items.length) % items.length;
    const next = items[nextIndex];
    setActive(next.id);
    document.getElementById(`${uid}-tab-${next.id}`)?.focus();
  }

  return (
    <div className="wk-tabs">
      <div aria-label={ariaLabel} className="wk-tab-list" onKeyDown={onKeyDown} role="tablist">
        {items.map((item) => (
          <button
            aria-controls={`${uid}-panel-${item.id}`}
            aria-selected={active === item.id}
            className="wk-tab"
            id={`${uid}-tab-${item.id}`}
            key={item.id}
            onClick={() => setActive(item.id)}
            role="tab"
            tabIndex={active === item.id ? 0 : -1}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item) => (
        <div
          aria-labelledby={`${uid}-tab-${item.id}`}
          className="wk-tab-panel"
          hidden={active !== item.id}
          id={`${uid}-panel-${item.id}`}
          key={item.id}
          role="tabpanel"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
