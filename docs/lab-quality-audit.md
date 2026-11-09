# Archic Lab — quality audit (4th pass, 2026-11-09)

## Reproduce
```bash
npm run build && npx vite preview --port 4173 &
BASE_URL=http://localhost:4173 npm run audit:a11y            # axe + menu keyboard checks; exit 1 on any violation
CHROME_PATH=<chromium> LABEL=after RUNS=3 npm run audit:perf  # Lighthouse lab run, median of 3
```
Raw output: `docs/audit/a11y-latest.json`, `docs/audit/perf-before.json`, `docs/audit/perf-after.json`.

## Accessibility (axe-core 4 via @axe-core/playwright, Chromium)
Tags: wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa. Home, Lab, Weather ES/EN at 390 and 1440; Weather Detail; Weather night/storm fixture; mobile menu open.
Result: 28 scans, 0 violations. Automated checks cover only part of WCAG; this is not a conformance claim.
Weather uses `scripts/audit-fixture.mjs` because the Cloud function correctly rejects localhost (CORS). The real Lovable preview was not audited.

Fixed by manual review (axe does not catch these):
- Menu: background made `inert` while open (only menu button + panel reachable); dialog role/aria-modal only when open, `inert` + aria-hidden when closed. Scripted check: background inert, Tab never leaves menu over 12 presses, Escape restores focus to the menu button.
- Weather: removed `aria-live` from the whole data region (it read the full forecast on every update). One short `role=status` line now announces loading / "Place: 14 °C · model forecast" / refresh; errors stay `role=alert`.
- Lab preview: removed `aria-live` (static on load).
- Footer: legal links were `display:none` ≤960px through a legacy stylesheet — restored. All footer links ≥44px tall (brand link was 22px).
- Route loading screen: was a black full-screen flash with the old "ARCHIC" mark; now light with "ARCHIC LAB".

## Performance (Lighthouse 13, local `vite preview`, median of 3)
Lab numbers in this sandbox, not field Core Web Vitals. No CrUX/field data checked.

| Page | Mobile before → after: score / LCP / CLS | Desktop after: score / LCP |
|---|---|---|
| / | 91 / 3.46 s / 0 → 94 / 3.06 s / 0 | 100 / 0.60 s |
| /lab/ | 91 / 2.88 s / 0.033 → 94 / 3.07 s / 0.029 | 100 / 0.63 s |
| /lab/weather/ | 88 / 3.52 s / 0.095 → 89 / 3.41 s / 0.095 | 100 / 0.61 s |

Weather runs show the error state (no fixture in Lighthouse; CORS), so its LCP/CLS are not representative of real data.
Changes: Home LCP image (sky band) preloaded from `index.html` (it was only discoverable after React rendered); header/menu/buttons/footer pinned to Geist so light pages stop using legacy DM Sans text.
Remaining bottlenecks (not fixed): 261 kB (45 kB gzip) render-blocking global CSS of legacy stylesheets; 122 kB gzip main JS; DM Sans / Space Grotesk still requested because body/html whitespace inherits the legacy global font. Fix: split legacy CSS/fonts out of `main` so they load only for legacy routes.

## Layout
No page-level horizontal overflow at 320 and 640 (≈200% zoom at 1280) on Home, Lab, Weather ES/EN. Footer checked at 1440/1024/768/390/320: no clipped links, no tap targets under 44px.
