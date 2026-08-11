"use client";

import { useState, type ReactNode } from "react";
import { Lightbox } from "./Lightbox";
import { ProgressiveImage } from "./ProgressiveImage";

export type ImageCardImage = {
  src: string;
  alt: string;
  fullSrc?: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  placeholder?: string;
  caption?: string;
};

export type ImageCardProps = {
  title: ReactNode;
  description?: ReactNode;
  href?: string;
  image: ImageCardImage;
  /** CSS aspect-ratio value. Defaults to the golden ratio. */
  aspectRatio?: string;
  className?: string;
  /** Set false when the image should remain static. */
  lightbox?: boolean;
};

export function ImageCard({
  title,
  description,
  href,
  image,
  aspectRatio = "1.618 / 1",
  className = "",
  lightbox = true,
}: ImageCardProps) {
  const [open, setOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string>();
  const external = !!href && /^(https?:)?\/\//.test(href);

  const cardImage = (
    <ProgressiveImage
      alt={image.alt}
      className="h-full w-full rounded-none border-0"
      height={image.height}
      onLoad={(event) => setPreviewSrc(event.currentTarget.currentSrc)}
      placeholder={image.placeholder}
      sizes={image.sizes}
      src={image.src}
      srcSet={image.srcSet}
      width={image.width}
    />
  );

  return (
    <>
      <article
        className={`flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] ${className}`}
      >
        {lightbox ? (
          <button
            aria-label={`Open image: ${image.alt}`}
            className="group block w-full shrink-0 cursor-zoom-in overflow-hidden bg-white/[0.03] p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-wave-blue-vivid"
            onClick={(event) => {
              event.stopPropagation();
              setOpen(true);
            }}
            style={{ aspectRatio }}
            type="button"
          >
            {cardImage}
          </button>
        ) : (
          <div
            className="block w-full shrink-0 overflow-hidden bg-white/[0.03]"
            style={{ aspectRatio }}
          >
            {cardImage}
          </div>
        )}

        <div className="flex min-h-[5.5rem] flex-1 flex-col px-4 py-3">
          <h3 className="truncate text-base font-semibold leading-6 text-neutral-100">
            {href ? (
              <a
                className="text-wave-orange no-underline hover:text-wave-orange-light"
                href={href}
                rel={external ? "noopener noreferrer" : undefined}
                target={external ? "_blank" : undefined}
              >
                {title}
              </a>
            ) : (
              title
            )}
          </h3>
          {description ? (
            <div className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-neutral-400">
              {description}
            </div>
          ) : null}
        </div>
      </article>

      {open ? (
        <Lightbox
          items={[
            {
              src: image.fullSrc ?? image.src,
              alt: image.alt,
              caption: image.caption,
              previewSrc,
              placeholder: image.placeholder,
            },
          ]}
          onClose={() => setOpen(false)}
          startIndex={0}
        />
      ) : null}
    </>
  );
}
