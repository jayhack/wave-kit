"use client";

import {
  createElement,
  useEffect,
  useId,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

export type EditableSavePayload = {
  id: string;
  value: string;
};

export type EditableSaveHandler = (
  payload: EditableSavePayload,
) => Promise<void> | void;

type EditableContentProps = {
  id: string;
  value: string;
  ariaLabel: string;
  editorClassName?: string;
  multiline: boolean;
  rows?: number;
  onSave?: EditableSaveHandler;
  renderValue: (value: string) => ReactNode;
};

export type EditableTextProps = {
  id: string;
  children: string;
  className?: string;
  rows?: number;
  onSave?: EditableSaveHandler;
};

export type EditableTitleProps = {
  id: string;
  children: string;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  onSave?: EditableSaveHandler;
};

const editableStorageVersion = "v1";
const localHostnames = new Set(["localhost", "127.0.0.1", "::1", "[::1]"]);

function isLocalDevelopment() {
  return (
    process.env.NODE_ENV === "development" &&
    typeof window !== "undefined" &&
    localHostnames.has(window.location.hostname)
  );
}

function storageKey(id: string) {
  return `wave-kit:editable:${editableStorageVersion}:${window.location.pathname}:${id}`;
}

function EditableContent({
  id,
  value,
  ariaLabel,
  editorClassName = "",
  multiline,
  rows = 5,
  onSave,
  renderValue,
}: EditableContentProps) {
  const statusId = useId();
  const [enabled, setEnabled] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [draft, setDraft] = useState(value);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setEnabled(isLocalDevelopment());
  }, []);

  useEffect(() => {
    setCurrentValue(value);
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (!enabled || onSave) {
      return;
    }

    const storedValue = window.localStorage.getItem(storageKey(id));
    if (storedValue !== null) {
      setCurrentValue(storedValue);
      setDraft(storedValue);
    }
  }, [enabled, id, onSave]);

  useEffect(() => {
    if (status !== "saved") {
      return;
    }

    const timeoutId = window.setTimeout(() => setStatus("idle"), 1200);
    return () => window.clearTimeout(timeoutId);
  }, [status]);

  function beginEditing() {
    setDraft(currentValue);
    setError(null);
    setStatus("idle");
    setEditing(true);
  }

  function cancelEditing() {
    setDraft(currentValue);
    setError(null);
    setEditing(false);
  }

  async function save() {
    if (saving || draft === currentValue) {
      return;
    }

    setSaving(true);
    setError(null);

    try {
      if (onSave) {
        await onSave({ id, value: draft });
      } else {
        window.localStorage.setItem(storageKey(id), draft);
      }
      setCurrentValue(draft);
      setEditing(false);
      setStatus("saved");
    } catch (saveError) {
      setError(
        saveError instanceof Error ? saveError.message : "Could not save this content.",
      );
    } finally {
      setSaving(false);
    }
  }

  function handleEditorKeyDown(
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    if (event.key === "Escape") {
      event.preventDefault();
      cancelEditing();
      return;
    }

    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      void save();
    }
  }

  if (!enabled) {
    return renderValue(value);
  }

  return (
    <div
      className={`group relative rounded-lg transition-colors ${
        editing
          ? "bg-wave-surface-raised p-3 ring-1 ring-wave-blue-vivid/70"
          : "hover:bg-wave-surface hover:ring-1 hover:ring-wave-border"
      }`}
      data-wave-editable={id}
    >
      {editing ? (
        <>
          {multiline ? (
            <textarea
              aria-describedby={statusId}
              aria-label={ariaLabel}
              autoFocus
              className={`block w-full resize-y rounded-md border border-wave-border-strong bg-wave-canvas px-3 py-2 font-sans text-wave-heading outline-none focus:border-wave-blue-vivid ${editorClassName}`}
              onChange={(event) => setDraft(event.currentTarget.value)}
              onKeyDown={handleEditorKeyDown}
              rows={rows}
              value={draft}
            />
          ) : (
            <input
              aria-describedby={statusId}
              aria-label={ariaLabel}
              autoFocus
              className={`block w-full rounded-md border border-wave-border-strong bg-wave-canvas px-3 py-2 font-sans text-wave-heading outline-none focus:border-wave-blue-vivid ${editorClassName}`}
              onChange={(event) => setDraft(event.currentTarget.value)}
              onKeyDown={handleEditorKeyDown}
              type="text"
              value={draft}
            />
          )}
          <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
            <span
              aria-live="polite"
              className={`mr-auto text-xs ${error ? "text-wave-red-hot" : "text-wave-subtle"}`}
              id={statusId}
            >
              {error ?? "⌘/Ctrl + Enter to save · Esc to cancel"}
            </span>
            <button
              className="rounded-md px-3 py-1.5 text-xs font-semibold text-wave-muted hover:bg-wave-surface-hover hover:text-wave-heading"
              disabled={saving}
              onClick={cancelEditing}
              type="button"
            >
              Cancel
            </button>
            <button
              className="rounded-md bg-wave-blue-vivid px-3 py-1.5 text-xs font-semibold text-black hover:bg-wave-blue-300 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={saving || draft === currentValue}
              onClick={() => void save()}
              type="button"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </>
      ) : (
        <div
          aria-label={ariaLabel}
          className="cursor-text rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-wave-blue-vivid"
          onClick={beginEditing}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              beginEditing();
            }
          }}
          role="button"
          tabIndex={0}
        >
          {renderValue(currentValue)}
          <span className="pointer-events-none absolute right-2 top-2 rounded-md bg-wave-canvas px-2 py-1 text-[0.65rem] font-semibold text-wave-subtle opacity-0 shadow-sm ring-1 ring-wave-border transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
            Edit
          </span>
        </div>
      )}
      {status === "saved" ? (
        <span
          aria-live="polite"
          className="absolute right-2 top-2 rounded-md bg-wave-blue-vivid px-2 py-1 text-[0.65rem] font-semibold text-black"
        >
          Saved
        </span>
      ) : null}
    </div>
  );
}

export function EditableText({
  id,
  children,
  className = "",
  rows = 5,
  onSave,
}: EditableTextProps) {
  return (
    <EditableContent
      ariaLabel={`Edit text: ${id}`}
      editorClassName={className}
      id={id}
      multiline
      onSave={onSave}
      renderValue={(value) => <p className={className}>{value}</p>}
      rows={rows}
      value={children}
    />
  );
}

export function EditableTitle({
  id,
  children,
  className = "",
  level = 2,
  onSave,
}: EditableTitleProps) {
  return (
    <EditableContent
      ariaLabel={`Edit title: ${id}`}
      editorClassName={className}
      id={id}
      multiline={false}
      onSave={onSave}
      renderValue={(value) => createElement(`h${level}`, { className }, value)}
      value={children}
    />
  );
}
