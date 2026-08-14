"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const loadedMediaImages = new Set<string>();

export type MediaRowImage = {
  src: string;
  alt: string;
  placeholder?: string;
  fallbackSrc?: string;
  /** Skip the placeholder when the consumer has already decoded this image. */
  initiallyLoaded?: boolean;
  width?: number;
  height?: number;
};

export type MediaRowLinkRenderProps = {
  children: ReactNode;
  className: string;
  href: string;
};

export type MediaRowProps = {
  title: ReactNode;
  meta?: ReactNode;
  description: ReactNode;
  href?: string;
  image?: MediaRowImage | null;
  descriptionLines?: 2 | 3 | 4;
  className?: string;
  /** Use this to preserve client-side routing in frameworks such as React Router. */
  renderLink?: (props: MediaRowLinkRenderProps) => ReactNode;
};

const clampClasses = {
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
} as const;

function MediaPreview({ image }: { image: MediaRowImage }) {
  const [loaded, setLoaded] = useState(
    () => image.initiallyLoaded === true || loadedMediaImages.has(image.src),
  );
  const [failed, setFailed] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setLoaded(image.initiallyLoaded === true || loadedMediaImages.has(image.src));
    setFailed(false);

    if (imageRef.current?.complete && imageRef.current.naturalWidth > 0) {
      loadedMediaImages.add(image.src);
      setLoaded(true);
    }
  }, [image.initiallyLoaded, image.src]);

  if (failed) return null;

  return (
    <div className="relative mt-4 aspect-[1.91/1] shrink-0 overflow-hidden rounded-xl border border-wave-border bg-wave-surface-raised sm:mt-0 sm:w-[180px] md:w-[220px]">
      {image.placeholder ? (
        <img
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full scale-110 object-cover blur-md transition-opacity duration-500 ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
          src={image.placeholder}
        />
      ) : null}
      <img
        alt={image.alt}
        className="absolute inset-0 h-full w-full object-cover opacity-100"
        decoding="async"
        fetchPriority="low"
        height={image.height ?? 440}
        loading="lazy"
        onError={(event) => {
          const element = event.currentTarget;
          if (image.fallbackSrc && !element.src.endsWith(image.fallbackSrc)) {
            element.src = image.fallbackSrc;
          } else {
            setFailed(true);
          }
        }}
        onLoad={() => {
          loadedMediaImages.add(image.src);
          setLoaded(true);
        }}
        ref={imageRef}
        src={image.src}
        width={image.width ?? 840}
      />
    </div>
  );
}

export function MediaRow({
  title,
  meta,
  description,
  href,
  image,
  descriptionLines,
  className = "",
  renderLink,
}: MediaRowProps) {
  const content = (
    <article className={`group border-b border-wave-border py-6 ${className}`}>
      <div
        className={
          image ? "sm:flex sm:items-start sm:justify-between sm:gap-5" : undefined
        }
      >
        <div className="min-w-0">
          <h3 className="!m-0 text-[18px] font-semibold leading-tight text-wave-heading group-hover:text-wave-link-sky">
            {title}
          </h3>
          {meta ? (
            <div className="mt-2 text-[13px] leading-tight text-wave-muted">
              {meta}
            </div>
          ) : null}
          <div
            className={`mt-2 text-[16px] leading-[1.6] text-wave-body [&>p]:!m-0 ${
              descriptionLines ? clampClasses[descriptionLines] : ""
            }`}
          >
            {description}
          </div>
        </div>
        {image ? <MediaPreview image={image} /> : null}
      </div>
    </article>
  );

  if (!href) return content;

  const linkClassName = "block no-underline";
  if (renderLink) {
    return renderLink({ children: content, className: linkClassName, href });
  }

  return (
    <a className={linkClassName} href={href}>
      {content}
    </a>
  );
}
