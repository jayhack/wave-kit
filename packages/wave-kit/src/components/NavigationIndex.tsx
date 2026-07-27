export type NavigationIndexItem = readonly [id: string, label: string];

export function NavigationIndex({
  items,
  label = "Index",
}: {
  items: readonly NavigationIndexItem[];
  label?: string;
}) {
  return (
    <nav aria-label={label}>
      <div className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-neutral-600">
        {label}
      </div>
      <ol className="space-y-1.5 text-sm leading-5">
        {items.map(([id, itemLabel]) => (
          <li key={id}>
            <a
              className="block border-l border-white/10 py-0.5 pl-3 text-neutral-600 hover:border-white/25 hover:text-neutral-300"
              href={`#${id}`}
            >
              {itemLabel}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export type NavigationIndexProps = Parameters<typeof NavigationIndex>[0];
