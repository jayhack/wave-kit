import type { ReactNode } from "react";
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
};

export function ImageCard({
  title,
  description,
  href,
  image,
  aspectRatio = "1.618 / 1",
  className = "",
}: ImageCardProps) {
  const external = !!href && /^(https?:)?\/\//.test(href);

  const cardImage = (
    <ProgressiveImage
      alt={image.alt}
      className="h-full w-full rounded-none border-0"
      height={image.height}
      placeholder={image.placeholder}
      sizes={image.sizes}
      src={image.src}
      srcSet={image.srcSet}
      width={image.width}
    />
  );

  return (
    <article
      className={`relative flex h-full min-w-0 flex-col overflow-hidden rounded-lg bg-wave-surface ring-1 ring-inset ring-wave-border ${
        href ? "transition-shadow hover:ring-wave-border-strong" : ""
      } ${className}`}
    >
      <div
        className="block w-full shrink-0 overflow-hidden bg-wave-surface"
        style={{ aspectRatio }}
      >
        {cardImage}
      </div>

      <div className="pointer-events-none flex min-h-[5.75rem] flex-1 flex-col p-4">
        <h3 className="!m-0 truncate text-sm font-semibold leading-5 text-wave-heading">
          {title}
        </h3>
        {description ? (
          <div className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-wave-muted [&>p]:!m-0">
            {description}
          </div>
        ) : null}
      </div>

      {href ? (
        <a
          aria-label={typeof title === "string" ? title : undefined}
          className="absolute inset-0 z-10 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-wave-blue-vivid"
          href={href}
          rel={external ? "noopener noreferrer" : undefined}
          target={external ? "_blank" : undefined}
        >
          <span className="sr-only">{title}</span>
        </a>
      ) : null}
    </article>
  );
}
