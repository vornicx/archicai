# Archic Website — Agent Contract

AAA Design is mandatory for every visual/UI change in this repository, including small changes.

## Authority

1. Verified business truth, legal/SEO/i18n/accessibility and production behavior.
2. Canonical Archic brand assets and colors documented in `README.md` / `project.config.json`.
3. Active project art direction in `AAA_VISUAL_DIRECTION.md`.
4. Central AAA Design process in `vornicx/archic-design-system`.
5. Framework/component libraries are implementation sources only.

## Small visual changes

Do **not** restart art direction. Read `AAA_VISUAL_DIRECTION.md`, preserve its creative platform and visual world, then run an authorship/slop sweep on every affected viewport.

A small change must not introduce generic cards, pills, gradients, icon tiles, blanket reveal animations, library-demo styling or another AI-default cluster.

## Substantial redesign / new visual chapter

Use this order before full production UI:

```text
truth → exactly 3 territories → creative platform → visual world → rendered signature prototype → storyboard → asset production matrix → system extraction → implementation → rendered critique → subtraction
```

Hard rules:
- exactly three materially different territories before replacing the active direction;
- materialize the signature before extracting a design system;
- critical assets cannot remain hypothetical while the whole page is built;
- use real Archic/project material before generic illustration;
- mobile retains/recomposes art direction;
- no invented proof;
- component libraries never become identity;
- build success does not replace rendered visual QA.

## Active Archic visual world

Read `AAA_VISUAL_DIRECTION.md` before touching the homepage.

Current platform (v4, owner-approved 2026-11): **Diseñamos lo que viene.** Editorial light surface with Archic blue `#075BCD` as accent; signature is Weather as a real product. Details in `AAA_VISUAL_DIRECTION.md`.

Do not silently replace this with dark-tech, editorial-cream, glass, random 3D, generic dashboard or Awwwards-style effects.

## Required completion checks

Run the repository's applicable commands:

```bash
npm run build
npm run quality:gate
```

Also inspect rendered desktop + mobile, reduced motion, contact/critical paths, and compare against the active Visual Direction Bible. If the site feels more complex but not more authored, subtract and revise.

## Light/blue page styling
- Home, Lab and Weather use `src/styles/archic-light.css` scoped under `.al-site` (plus `archic-lab.css` for Lab/Weather); they must not use the legacy `.as-site` root, because the global legacy stylesheets target it and would leak dark styles in.
- Shared header/footer overrides in `archic-light.css` use the doubled `.al-site.al-site` root instead of `!important`, which is kept only to counter legacy declarations that are themselves `!important`; this keeps the cascade explicit.
- Weather condition text/glyph/sky tone derive only from MET `symbol_code` via `src/lab/weatherSymbol.ts` (tested in `tests/lab-weather-symbol.test.mjs`); browser calls go through `src/lab/weatherClient.ts` only.
- Weather rain totals/chart scale come only from `src/lab/weatherMath.ts` (contiguous 1 h intervals, tested in `tests/lab-weather-math.test.mjs`) so totals never mix 6 h blocks or elapsed hours.

## Archic Lab Weather backend
- Weather data is served only by the Lovable Cloud Edge Function `lab-weather` (logic in `supabase/functions/_shared/labWeather.ts`, tested by `npm run test:weather`); never reintroduce `/api/*` hosting functions or browser calls to api.met.no — Lovable hosting does not run them and MET requires an identifying User-Agent.
- Its cache and rate limit are per-isolate memory, not shared across Edge instances; treat them as abuse mitigation, not a guaranteed provider cache.
- Weather's `forecastView(state, currentKey)` must receive the key of the place being rendered, so the render after a place change (before the fetch effect runs) never shows the previous place's data; tested in `tests/lab-forecast-state.test.mjs`.
- Home portfolio images are local WebPs under `public/media/work/` with a visible provenance caption per project (client material vs representative photography); no hotlinked images.

## Quality audits
- `npm run audit:a11y` (axe + menu keyboard checks, Weather via `scripts/audit-fixture.mjs`) and `npm run audit:perf` (Lighthouse lab) are dev-only gates documented in `docs/lab-quality-audit.md`; fix violations in components, never by excluding rules or selectors.
