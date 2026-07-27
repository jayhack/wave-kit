"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ImgHTMLAttributes,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";

export type LightboxImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "onClick"> & {
  caption?: string;
  fullSrc?: string;
  placeholderSrc?: string;
  lightboxLabel?: string;
};

export function LightboxImage({
  alt,
  caption,
  className = "",
  fullSrc,
  placeholderSrc,
  lightboxLabel = "Open full-size image",
  src,
  ...imageProps
}: LightboxImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const dialogLabel = useId();
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") {
        event.preventDefault();
        closeButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [open]);

  function closeOnBackdrop(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) setOpen(false);
  }

  return (
    <>
      <figure className={`wk-image ${className}`.trim()}>
        <button aria-label={lightboxLabel} className="wk-image-trigger" onClick={() => setOpen(true)} type="button">
          {placeholderSrc ? (
            <img aria-hidden="true" alt="" className="wk-image-placeholder" src={placeholderSrc} />
          ) : null}
          <img
            {...imageProps}
            alt={alt}
            className={`wk-image-full ${loaded ? "is-loaded" : ""}`}
            decoding="async"
            loading={imageProps.loading ?? "lazy"}
            onLoad={() => setLoaded(true)}
            src={src}
          />
        </button>
        {caption ? <figcaption>{caption}</figcaption> : null}
      </figure>
      {open && typeof document !== "undefined"
        ? createPortal(
            <div
              aria-labelledby={dialogLabel}
              aria-modal="true"
              className="wk-lightbox"
              onClick={closeOnBackdrop}
              role="dialog"
            >
              <p className="wk-sr-only" id={dialogLabel}>
                {alt || "Full-size image"}
              </p>
              <button
                aria-label="Close image"
                className="wk-lightbox-close"
                onClick={() => setOpen(false)}
                ref={closeButton}
                type="button"
              >
                Close
              </button>
              <img alt={alt} decoding="async" src={fullSrc ?? src} />
              {caption ? <p className="wk-lightbox-caption">{caption}</p> : null}
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
