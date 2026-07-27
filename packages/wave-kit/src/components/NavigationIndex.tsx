import type { AnchorHTMLAttributes } from "react";

export type NavigationIndexItem = {
  href: string;
  label: string;
};

export type NavigationIndexProps = {
  items: NavigationIndexItem[];
  label?: string;
  activeHref?: string;
  linkProps?: AnchorHTMLAttributes<HTMLAnchorElement>;
};

export function NavigationIndex({
  items,
  label = "Index",
  activeHref,
  linkProps,
}: NavigationIndexProps) {
  return (
    <nav aria-label={label} className="wk-index">
      <p className="wk-eyebrow">{label}</p>
      <ol>
        {items.map((item) => (
          <li key={item.href}>
            <a
              aria-current={activeHref === item.href ? "location" : undefined}
              href={item.href}
              {...linkProps}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
