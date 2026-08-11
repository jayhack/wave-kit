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
    return "text-neutral-600";
  }
  // Python line comment: `#` followed by anything that is not a bare hex color.
  if (token.startsWith("#") && !/^#[\dA-Fa-f]{3,8}$/.test(token)) {
    return "text-neutral-600";
  }
  if (/^(True|False|None|self|cls)$/.test(token)) {
    return "text-wave-orange-light";
  }
  if (
    token.startsWith('"') ||
    token.startsWith("'") ||
    token.startsWith("`") ||
    token.startsWith("http") ||
    // Python string prefixes: r"…", b'…', f"…"
    /^[rbf]["']/.test(token)
  ) {
    return "text-wave-yellow-pale/80";
  }
  if (token.startsWith("<") || token.startsWith("--")) {
    return "text-wave-orange";
  }
  if (token.startsWith("@")) {
    return "text-wave-blue-light";
  }
  if (/^#[\dA-Fa-f]/.test(token) || /^\d/.test(token)) {
    return "text-wave-red-vivid";
  }
  if (/^(true|false|null|undefined)$/.test(token)) {
    return "text-wave-orange-light";
  }
  if (/^(useState|setOpen|setLightbox|install|add|clone|run|build|dev)$/.test(token)) {
    return "text-wave-blue-300";
  }
  return "text-wave-blue-light";
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
      className={`overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] ${className}`}
      data-language={language}
    >
      {label ? (
        <div className="border-b border-white/10 px-5 py-3 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-neutral-600">
          {label}
        </div>
      ) : null}
      <pre className="overflow-x-auto p-5 font-mono text-[0.78rem] leading-6 text-neutral-400">
        <code>{highlight(code, language)}</code>
      </pre>
    </div>
  );
}
