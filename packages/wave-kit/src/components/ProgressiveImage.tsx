"use client";

import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";

export type ProgressiveImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  placeholder?: string;
};

export function ProgressiveImage({
  src,
  srcSet,
  placeholder,
  alt = "",
  width,
  height,
  sizes = "(max-width: 712px) calc(100vw - 2.5rem), 672px",
  className = "mx-auto w-full rounded-lg border border-white/10",
  loading = "lazy",
  onLoad,
  ...props
}: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setLoaded(false);
    if (imageRef.current?.complete && imageRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <span
      className={`relative block max-w-full overflow-hidden bg-white/[0.03] ${className}`}
      style={
        width && height
          ? { aspectRatio: `${Number(width)} / ${Number(height)}` }
          : undefined
      }
    >
      {placeholder ? (
        <img
          alt=""
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 h-full w-full scale-105 object-cover blur-md transition-opacity duration-500 ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
          height={height}
          src={placeholder}
          width={width}
        />
      ) : null}
      <img
        {...props}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover opacity-100"
        decoding="async"
        height={height}
        loading={loading}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        ref={imageRef}
        sizes={sizes}
        src={src}
        srcSet={srcSet}
        width={width}
      />
    </span>
  );
}
