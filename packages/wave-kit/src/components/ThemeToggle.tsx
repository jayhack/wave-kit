"use client";

import { useEffect } from "react";

export type ThemeToggleProps = {
  className?: string;
  storageKey?: string;
};

export function ThemeToggle({
  className = "",
  storageKey = "wave-theme",
}: ThemeToggleProps) {
  useEffect(() => {
    const root = document.documentElement;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

    function getSavedTheme(): "light" | "dark" | null {
      let saved: string | null = null;

      try {
        saved = window.localStorage.getItem(storageKey);
      } catch {
        // Keep following the system preference when storage is unavailable.
      }

      return saved === "light" || saved === "dark" ? saved : null;
    }

    function applyTheme(theme: "light" | "dark") {
      root.dataset.theme = theme;
      root.style.colorScheme = theme;
    }

    applyTheme(getSavedTheme() ?? (systemTheme.matches ? "dark" : "light"));

    function handleSystemThemeChange(event: MediaQueryListEvent) {
      if (getSavedTheme() === null) {
        applyTheme(event.matches ? "dark" : "light");
      }
    }

    systemTheme.addEventListener("change", handleSystemThemeChange);
    return () => {
      systemTheme.removeEventListener("change", handleSystemThemeChange);
    };
  }, [storageKey]);

  function toggleTheme() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    root.style.colorScheme = next;

    try {
      window.localStorage.setItem(storageKey, next);
    } catch {
      // The theme still changes when storage is unavailable.
    }
  }

  return (
    <button
      aria-label="Switch between light and dark mode"
      data-theme-toggle=""
      className={`group inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-wave-border bg-wave-canvas text-wave-muted shadow-sm transition-colors hover:border-wave-border-strong hover:bg-wave-surface-hover hover:text-wave-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wave-link-sky ${className}`}
      onClick={toggleTheme}
      title="Switch color theme"
      type="button"
    >
      <svg
        aria-hidden="true"
        className="wave-theme-icon-light size-[18px]"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 3v2m0 14v2M3 12h2m14 0h2M5.64 5.64l1.42 1.42m9.88 9.88 1.42 1.42m0-12.72-1.42 1.42M7.06 16.94l-1.42 1.42"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.7"
        />
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.7" />
      </svg>
      <svg
        aria-hidden="true"
        className="wave-theme-icon-dark size-[18px]"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          d="M20 15.2A8.2 8.2 0 0 1 8.8 4 8.2 8.2 0 1 0 20 15.2Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.7"
        />
      </svg>
    </button>
  );
}
