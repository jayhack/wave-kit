import type { AnchorHTMLAttributes, ReactNode } from "react";

export type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  external?: boolean;
};

export function TextLink({ className = "", external, children, ...props }: TextLinkProps) {
  return (
    <a
      className={`wk-text-link ${className}`.trim()}
      rel={external ? "noreferrer" : props.rel}
      target={external ? "_blank" : props.target}
      {...props}
    >
      {children}
      {external ? <span aria-hidden="true"> ↗</span> : null}
    </a>
  );
}

export type BackLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  fallbackHref?: string;
  icon?: ReactNode;
};

export function BackLink({
  fallbackHref = "/",
  href = fallbackHref,
  icon = <span aria-hidden="true">←</span>,
  className = "",
  children = "Back",
  onClick,
  ...props
}: BackLinkProps) {
  return (
    <a
      className={`wk-button wk-back-link ${className}`.trim()}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || typeof window === "undefined") return;
        if (window.history.length > 1) {
          event.preventDefault();
          window.history.back();
        }
      }}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </a>
  );
}

export type GitHubButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  label?: string;
};

export function GitHubButton({
  label = "GitHub",
  className = "",
  href = "https://github.com",
  ...props
}: GitHubButtonProps) {
  return (
    <a
      className={`wk-button ${className}`.trim()}
      href={href}
      rel="noreferrer"
      target="_blank"
      {...props}
    >
      <svg aria-hidden="true" height="18" viewBox="0 0 24 24" width="18">
        <path
          d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.24c-3.23.7-3.91-1.37-3.91-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.74-1.55-2.58-.3-5.29-1.29-5.29-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.98 10.98 0 0 1 5.75 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.41-2.72 5.39-5.31 5.68.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z"
          fill="currentColor"
        />
      </svg>
      <span>{label}</span>
    </a>
  );
}
