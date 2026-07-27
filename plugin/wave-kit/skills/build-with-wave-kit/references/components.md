# Component reference

Import runtime pieces from `wave-kit` and import `wave-kit/styles.css` once.

## Navigation and links

- `BackLink`: rectangular history-aware control. `fallbackHref` is used when
  there is no useful in-app history.
- `GitHubButton`: rectangular external link with the GitHub mark.
- `TextLink`: inline link. Set `external` to add a new-tab target and arrow.
- `NavigationIndex`: accepts `items: { href, label }[]` and optional
  `activeHref`.

## Structure

- `Divider`: quiet full-width horizontal rule.
- `Tabs`: accepts `items: { id, label, content }[]`, optional `defaultId`, and
  optional `ariaLabel`. Arrow, Home, and End keys move focus.

## Images

- `LightboxImage`: progressive image plus modal viewer. Always provide `alt`,
  intrinsic `width` and `height`, `src`, responsive `srcSet`/`sizes`, and a
  tiny `placeholderSrc`. Use `fullSrc` for the original asset and `caption`
  when provenance or context matters.

## Generative field

- `WaveField`: canvas cellular wave simulation. Props include `columns`,
  `damping`, and `interactive`. It automatically seeds pulses and supports
  pointer disturbance without rendering instructional UI.

## Tokens

- `waveColors`: black/ink plus blue, red, and yellow families with associated
  shades.
- `waveRadii`: small radii for controls, panels, and images.

All components accept their documented native attributes where applicable.
