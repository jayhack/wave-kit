import { EditableText, EditableTitle, TextLink } from "@jayhack/wave-kit";

export default function EditablePlayground() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-neutral-300 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-3xl">
        <TextLink href="/">← Back to Wave Kit</TextLink>
        <div className="mt-20 space-y-8">
          <EditableTitle
            className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl"
            id="editable-playground-title"
            level={1}
          >
            A locally editable title
          </EditableTitle>
          <EditableText
            className="max-w-2xl text-lg leading-8 text-neutral-400 sm:text-xl sm:leading-9"
            id="editable-playground-introduction"
            rows={7}
          >
            Click this paragraph while the development server is running. Edit
            the copy, then save it. The local fallback persists your draft in
            this browser; an onSave handler can instead write the value to a
            blog source file.
          </EditableText>
        </div>
      </div>
    </main>
  );
}
