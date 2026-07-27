"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type LightboxItem = { src: string; alt: string; caption?: string };

export function Lightbox({
  items,
  startIndex,
  onClose,
}: {
  items: LightboxItem[];
  startIndex: number;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(startIndex);
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = items.length;
  const hasMultiple = count > 1;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowLeft" && hasMultiple)
        setIndex((value) => (value - 1 + count) % count);
      else if (event.key === "ArrowRight" && hasMultiple)
        setIndex((value) => (value + 1) % count);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [mounted, onClose, count, hasMultiple]);

  if (!mounted) return null;
  const current = items[index];
  if (!current) return null;

  return createPortal(
    <div
      aria-label={current.alt || "Image preview"}
      aria-modal="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-black/90 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
      role="dialog"
    >
      <button
        aria-label="Close image"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-gray-100 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        onClick={onClose}
        ref={closeRef}
        type="button"
      >
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </svg>
      </button>

      {hasMultiple ? (
        <div className="absolute left-4 top-4 z-10 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-gray-200">
          {index + 1} / {count}
        </div>
      ) : null}

      {hasMultiple ? (
        <>
          <button
            aria-label="Previous image"
            className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-md bg-white/10 text-gray-100 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 sm:left-4"
            onClick={(event) => {
              event.stopPropagation();
              setIndex((value) => (value - 1 + count) % count);
            }}
            type="button"
          >
            <svg
              aria-hidden="true"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
          <button
            aria-label="Next image"
            className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-md bg-white/10 text-gray-100 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 sm:right-4"
            onClick={(event) => {
              event.stopPropagation();
              setIndex((value) => (value + 1) % count);
            }}
            type="button"
          >
            <svg
              aria-hidden="true"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
        </>
      ) : null}

      <figure
        className="flex min-h-0 max-h-[72vh] max-w-[88vw] flex-col items-center gap-3"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          alt={current.alt}
          className="min-h-0 flex-1 rounded-lg object-contain shadow-2xl"
          src={current.src}
        />
        {current.caption ? (
          <figcaption className="max-w-2xl shrink-0 text-center text-sm text-gray-300">
            {current.caption}
          </figcaption>
        ) : null}
      </figure>

      {hasMultiple ? (
        <div
          className="flex max-w-[90vw] shrink-0 gap-2 overflow-x-auto pb-1"
          onClick={(event) => event.stopPropagation()}
        >
          {items.map((item, itemIndex) => (
            <button
              aria-current={itemIndex === index}
              aria-label={`View image ${itemIndex + 1}`}
              className={`shrink-0 overflow-hidden rounded-md border focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                itemIndex === index
                  ? "border-sky-400 ring-2 ring-sky-400/50"
                  : "border-white/15 opacity-50 hover:opacity-100"
              }`}
              key={`${item.src}-${itemIndex}`}
              onClick={() => setIndex(itemIndex)}
              type="button"
            >
              <img alt="" className="h-14 w-24 object-cover" src={item.src} />
            </button>
          ))}
        </div>
      ) : null}
    </div>,
    document.body,
  );
}
