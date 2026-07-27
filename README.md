# Wave Kit

The public component system behind jay.ai: a compact React package, a working
showcase site, and a Codex skill that teaches agents how to compose it.

After the npm release:

```bash
npm install @jayhack/wave-kit
```

Until that release is visible in the registry, install
`packages/wave-kit` from a local checkout.

```tsx
import { Divider, TextLink, WaveField } from "@jayhack/wave-kit";
```

Import Tailwind and `@jayhack/wave-kit/styles.css` from the application stylesheet.

## Workspace

- `packages/wave-kit`: publishable React package
- `apps/docs`: public showcase and component reference
- `plugin/wave-kit`: installable Codex plugin with the Wave Kit skill

Run `npm install`, then `npm run dev`. Build everything with `npm run build`.

## Agent skill

The repository includes the `build-with-wave-kit` skill at
`plugin/wave-kit/skills/build-with-wave-kit`. Install the repository plugin in
Codex, then invoke `$build-with-wave-kit` when building or restyling a React or
Next.js project with the jay.ai visual language.
