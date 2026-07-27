# Wave Kit

The public component system behind jay.ai: a compact React package, a working
showcase site, and a Codex skill that teaches agents how to compose it.

```bash
npm install wave-kit
```

```tsx
import { Divider, TextLink, WaveField } from "wave-kit";
```

Import Tailwind and `wave-kit/styles.css` from the application stylesheet.

## Workspace

- `packages/wave-kit` — publishable React package
- `apps/docs` — public showcase and component reference
- `plugin/wave-kit` — installable Codex plugin with the Wave Kit skill

Run `npm install`, then `npm run dev`. Build everything with `npm run build`.
