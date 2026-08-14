export function Divider({
  emphasis = "subtle",
  className = "",
}: {
  emphasis?: "subtle" | "strong";
  className?: string;
}) {
  return (
    <hr
      className={`border-0 border-t ${
        emphasis === "strong" ? "border-wave-border-strong" : "border-wave-border"
      } ${className}`}
    />
  );
}
