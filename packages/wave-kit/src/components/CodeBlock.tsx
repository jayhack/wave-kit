import type { ReactNode } from "react";

export type CodeLanguage = "bash" | "css" | "json" | "python" | "text" | "tsx";

export type CodeBlockProps = {
  code: string;
  language?: CodeLanguage;
  label?: string;
  className?: string;
};

const syntaxTokenPattern =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|https?:\/\/[^\s"'`]+|<\/?[A-Za-z][\w.-]*|#[\dA-Fa-f]{3,8}\b|@[a-z-]+|--[\w-]+|\b(?:import|from|const|export|function|return|as|if|else|type|interface|extends)\b|\b(?:npm|npx|pnpm|yarn|bun|git)\b|\b(?:install|add|clone|run|build|dev)\b|\b(?:true|false|null|undefined)\b|\b(?:useState|setOpen|setLightbox)\b|\b\d+(?:\.\d+)?\b)/g;

// Python uses `#` line comments and a distinct keyword set, so it needs its own
// token pattern. The `#` comment alternative is listed before triple/single
// quoted strings and numbers so it wins on a whole line, and `#` here never
// means a hex color the way it can in css/tsx samples.
const pythonTokenPattern =
  /(#[^\n]*|"""[\s\S]*?"""|'''[\s\S]*?'''|[rbf]?"(?:\\.|[^"\\])*"|[rbf]?'(?:\\.|[^'\\])*'|@[A-Za-z_][\w.]*|\b(?:def|class|return|import|from|as|if|elif|else|for|while|in|is|not|and|or|with|try|except|finally|raise|lambda|yield|pass|break|continue|global|nonlocal|assert|del|async|await)\b|\b(?:True|False|None)\b|\b(?:self|cls)\b|\b\d+(?:\.\d+)?\b)/g;

function patternForLanguage(language: CodeLanguage) {
  return language === "python" ? pythonTokenPattern : syntaxTokenPattern;
}

function tokenClassName(token: string) {
  if (token.startsWith("//") || token.startsWith("/*")) {
    return "text-wave-subtle";
  }
  // Python line comment: `#` followed by anything that is not a bare hex color.
  if (token.startsWith("#") && !/^#[\dA-Fa-f]{3,8}$/.test(token)) {
    return "text-wave-subtle";
  }
  if (/^(True|False|None|self|cls)$/.test(token)) {
    return "text-wave-syntax-literal";
  }
  if (
    token.startsWith('"') ||
    token.startsWith("'") ||
    token.startsWith("`") ||
    token.startsWith("http") ||
    // Python string prefixes: r"…", b'…', f"…"
    /^[rbf]["']/.test(token)
  ) {
    return "text-wave-syntax-string";
  }
  if (token.startsWith("<") || token.startsWith("--")) {
    return "text-wave-syntax-literal";
  }
  if (token.startsWith("@")) {
    return "text-wave-syntax-keyword";
  }
  if (/^#[\dA-Fa-f]/.test(token) || /^\d/.test(token)) {
    return "text-wave-syntax-number";
  }
  if (/^(true|false|null|undefined)$/.test(token)) {
    return "text-wave-syntax-literal";
  }
  if (/^(useState|setOpen|setLightbox|install|add|clone|run|build|dev)$/.test(token)) {
    return "text-wave-syntax-keyword";
  }
  return "text-wave-syntax-keyword";
}

function highlight(code: string, language: CodeLanguage) {
  if (language === "text") {
    return code;
  }

  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of code.matchAll(patternForLanguage(language))) {
    const index = match.index;
    const token = match[0];

    if (index > cursor) {
      nodes.push(code.slice(cursor, index));
    }
    nodes.push(
      <span className={tokenClassName(token)} key={`${index}-${token}`}>
        {token}
      </span>,
    );
    cursor = index + token.length;
  }

  if (cursor < code.length) {
    nodes.push(code.slice(cursor));
  }
  return nodes;
}

export function CodeBlock({
  code,
  language = "text",
  label,
  className = "",
}: CodeBlockProps) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-wave-border bg-wave-surface ${className}`}
      data-language={language}
    >
      {label ? (
        <div className="border-b border-wave-border px-5 py-3 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-wave-subtle">
          {label}
        </div>
      ) : null}
      <pre className="overflow-x-auto p-5 font-mono text-[0.78rem] leading-6 text-wave-muted">
        <code>{highlight(code, language)}</code>
      </pre>
    </div>
  );
}
