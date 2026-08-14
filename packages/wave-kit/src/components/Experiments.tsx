import type { ReactNode } from "react";

export type ExperimentMetric = {
  label: string;
  value: string;
};

export type ExperimentRecord = {
  slug: string;
  title: string;
  description: string;
  date?: string;
  metrics?: readonly ExperimentMetric[];
  meta?: Readonly<Record<string, string>>;
  href?: string;
};

function isMetric(value: unknown): value is ExperimentMetric {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as ExperimentMetric).label === "string" &&
    typeof (value as ExperimentMetric).value === "string"
  );
}

export function parseExperiments(input: unknown): ExperimentRecord[] {
  if (!Array.isArray(input)) {
    throw new Error("Experiment registry must be a JSON array of records.");
  }

  return input.map((record, index) => {
    const at = `experiments[${index}]`;
    if (typeof record !== "object" || record === null) {
      throw new Error(`${at} must be an object.`);
    }
    const candidate = record as ExperimentRecord;

    for (const field of ["slug", "title", "description"] as const) {
      if (typeof candidate[field] !== "string" || candidate[field] === "") {
        throw new Error(`${at}.${field} must be a non-empty string.`);
      }
    }
    if (candidate.date !== undefined && typeof candidate.date !== "string") {
      throw new Error(`${at}.date must be a string.`);
    }
    if (
      candidate.metrics !== undefined &&
      (!Array.isArray(candidate.metrics) || !candidate.metrics.every(isMetric))
    ) {
      throw new Error(`${at}.metrics must be an array of { label, value } strings.`);
    }
    if (
      candidate.meta !== undefined &&
      (typeof candidate.meta !== "object" ||
        candidate.meta === null ||
        Array.isArray(candidate.meta) ||
        !Object.values(candidate.meta).every((value) => typeof value === "string"))
    ) {
      throw new Error(`${at}.meta must map string keys to string values.`);
    }
    if (candidate.href !== undefined && typeof candidate.href !== "string") {
      throw new Error(`${at}.href must be a string.`);
    }

    return candidate;
  });
}

export type ExperimentIndexProps = {
  experiments: readonly ExperimentRecord[];
  hrefFor?: (experiment: ExperimentRecord) => string;
  className?: string;
};

export function ExperimentIndex({
  experiments,
  hrefFor = (experiment) => experiment.href ?? `/experiments/${experiment.slug}`,
  className = "",
}: ExperimentIndexProps) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-wave-border bg-wave-surface ${className}`}
    >
      {experiments.map((experiment, index) => (
        <a
          className={`group flex items-center justify-between gap-6 px-5 py-4 no-underline hover:bg-wave-surface-raised sm:px-6 ${
            index === 0 ? "" : "border-t border-wave-border"
          }`}
          href={hrefFor(experiment)}
          key={experiment.slug}
        >
          <div className="min-w-0">
            <div className="flex items-baseline gap-2.5">
              <h3 className="truncate text-lg font-bold tracking-tight text-wave-heading">
                {experiment.title}
              </h3>
              {experiment.date ? (
                <span className="shrink-0 text-sm text-wave-subtle">
                  • {experiment.date}
                </span>
              ) : null}
            </div>
            <p className="mt-1 truncate text-sm leading-6 text-wave-subtle">
              {experiment.description}
            </p>
          </div>
          <svg
            aria-hidden="true"
            className="size-4 shrink-0 text-wave-subtle group-hover:text-wave-body"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="m9 6 6 6-6 6"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </a>
      ))}
    </div>
  );
}

export type ExperimentHeaderProps = {
  experiment: ExperimentRecord;
  backHref?: string;
  backLabel?: string;
  level?: 1 | 2 | 3;
  className?: string;
};

export function ExperimentHeader({
  experiment,
  backHref,
  backLabel = "Back",
  level = 1,
  className = "",
}: ExperimentHeaderProps) {
  const Title = `h${level}` as const;
  return (
    <header className={className}>
      {backHref ? (
        <a
          className="inline-flex items-center gap-2 text-sm text-wave-muted no-underline hover:text-wave-link-amber"
          href={backHref}
        >
          <span aria-hidden="true" className="text-xs">
            ←
          </span>
          {backLabel}
        </a>
      ) : null}
      <Title
        className={`text-3xl font-extrabold tracking-tight text-wave-heading sm:text-4xl ${
          backHref ? "mt-6" : ""
        }`}
      >
        {experiment.title}
      </Title>
      {experiment.date ? (
        <div className="mt-3 text-sm text-wave-subtle">{experiment.date}</div>
      ) : null}
      <p className="mt-4 max-w-2xl text-[1.03rem] leading-8 text-wave-body">
        {experiment.description}
      </p>
    </header>
  );
}

export type ExperimentMetricsProps = {
  metrics: readonly ExperimentMetric[];
  className?: string;
};

export function ExperimentMetrics({ metrics, className = "" }: ExperimentMetricsProps) {
  if (metrics.length === 0) {
    return null;
  }
  return (
    <dl className={`overflow-hidden rounded-lg border border-wave-border ${className}`}>
      {metrics.map((metric, index) => (
        <div
          className={`flex items-baseline justify-between gap-4 px-4 py-3 ${
            index === 0 ? "" : "border-t border-wave-border"
          }`}
          key={metric.label}
        >
          <dt className="text-sm text-wave-muted">{metric.label}</dt>
          <dd className="text-right font-mono text-sm text-wave-heading">
            {metric.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export type ExperimentMetaProps = {
  meta: Readonly<Record<string, string>>;
  className?: string;
};

export function ExperimentMeta({ meta, className = "" }: ExperimentMetaProps) {
  const entries = Object.entries(meta);
  if (entries.length === 0) {
    return null;
  }
  return (
    <dl
      className={`space-y-1.5 border-t border-wave-border pt-5 font-mono text-[0.78rem] leading-5 ${className}`}
    >
      {entries.map(([key, value]) => (
        <div className="flex flex-wrap gap-x-4" key={key}>
          <dt className="text-wave-subtle">{key}</dt>
          <dd className="min-w-0 break-all text-wave-muted">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export type ExperimentPageProps = {
  experiment: ExperimentRecord;
  backHref?: string;
  backLabel?: string;
  level?: 1 | 2 | 3;
  children?: ReactNode;
  className?: string;
};

export function ExperimentPage({
  experiment,
  backHref,
  backLabel,
  level,
  children,
  className = "",
}: ExperimentPageProps) {
  return (
    <article className={className}>
      <ExperimentHeader
        backHref={backHref}
        backLabel={backLabel}
        experiment={experiment}
        level={level}
      />
      {children ? <div className="mt-10">{children}</div> : null}
      {experiment.metrics && experiment.metrics.length > 0 ? (
        <ExperimentMetrics className="mt-10" metrics={experiment.metrics} />
      ) : null}
      {experiment.meta && Object.keys(experiment.meta).length > 0 ? (
        <ExperimentMeta className="mt-10" meta={experiment.meta} />
      ) : null}
    </article>
  );
}
