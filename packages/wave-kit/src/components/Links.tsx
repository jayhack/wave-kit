import type { MouseEvent, ReactNode } from "react";

const linkStyles = {
  orange:
    "text-wave-orange decoration-wave-orange/55 hover:text-wave-orange-light hover:decoration-wave-orange-light",
  sky: "text-sky-300 decoration-sky-300/55 hover:text-sky-200 hover:decoration-sky-200",
  amber:
    "text-amber-300 decoration-amber-300/40 hover:text-amber-200 hover:decoration-amber-200",
  quiet:
    "text-neutral-400 decoration-neutral-500/60 hover:text-neutral-200 hover:decoration-neutral-300",
} as const;

export type TextLinkProps = {
  href: string;
  tone?: keyof typeof linkStyles;
  children: ReactNode;
};

export function TextLink({ href, tone = "orange", children }: TextLinkProps) {
  const external = /^(https?:)?\/\//.test(href);
  return (
    <a
      className={`underline underline-offset-2 ${linkStyles[tone]}`}
      href={href}
      rel={external ? "noopener noreferrer" : undefined}
      target={external ? "_blank" : undefined}
    >
      {children}
    </a>
  );
}

export type BackLinkProps = {
  fallbackHref?: string;
  children?: string;
  className?: string;
};

export function BackLink({
  fallbackHref = "/",
  children = "Back",
  className = "",
}: BackLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const index =
      typeof window !== "undefined"
        ? (window.history.state?.idx as number | undefined)
        : undefined;
    if (typeof index === "number" && index > 0) {
      event.preventDefault();
      window.history.back();
    }
  }

  return (
    <a
      className={`inline-flex items-center gap-2 text-sm text-gray-400 hover:text-amber-300 ${className}`}
      href={fallbackHref}
      onClick={handleClick}
    >
      <span aria-hidden="true" className="text-xs">←</span>
      {children}
    </a>
  );
}

export type GitHubButtonProps = {
  href?: string;
  children?: ReactNode;
  className?: string;
};

export function GitHubButton({
  href = "https://github.com/jayhack",
  children = "GitHub",
  className = "",
}: GitHubButtonProps) {
  return (
    <a
      className={`inline-flex min-h-9 items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-3 text-sm font-semibold text-white hover:border-white/30 hover:bg-white/[0.09] ${className}`}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <svg aria-hidden="true" className="text-base" height="1em" viewBox="0 0 24 24" width="1em">
        <path
          d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.24c-3.23.7-3.91-1.37-3.91-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.74-1.55-2.58-.3-5.29-1.29-5.29-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.98 10.98 0 0 1 5.75 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.41-2.72 5.39-5.31 5.68.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z"
          fill="currentColor"
        />
      </svg>
      {children}
    </a>
  );
}
