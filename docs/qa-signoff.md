# Quality Gate Sign-off — Archic Website

| | |
|---|---|
| Project | Archic Website |
| Mode | production |
| Foundation version | 1.0.0 |
| Build / commit | working tree, 2026-08-29 |
| Reviewer | implementation self-review; independent review pending |
| Date | 2026-08-29 |
| Reviewer is not the sole builder, or ≥24h have passed | ☐ |

## Measured results

| Metric | Budget | Measured | Pass |
|---|---:|---:|---|
| LCP | ≤2.0 s | pending production runtime | ☐ |
| INP | ≤200 ms | pending production runtime | ☐ |
| CLS | ≤0.05 | pending production runtime | ☐ |
| Lighthouse performance | ≥90 | pending | ☐ |
| Lighthouse accessibility | ≥95 | pending | ☐ |
| axe violations | 0 | pending | ☐ |
| Total JS (gzip) | ≤150 KB | 125.83 KB | ☑ |
| Total CSS (gzip) | ≤50 KB | 46.88 KB | ☑ |
| Total page weight | ≤1.5 MB | pending clean build | ☐ |

Static WCAG contrast checks for the new home direction:

| Pair | Ratio | Result |
|---|---:|---|
| Archic black `#0A0A0B` / mineral paper `#F1EFE8` | 17.20:1 | pass |
| Body `#4C4F48` / mineral paper `#F1EFE8` | 7.24:1 | pass |
| Functional gold `#765422` / mineral paper `#F1EFE8` | 5.96:1 | pass |
| Archic black `#0A0A0B` / canonical gold `#C9A56A` | 8.55:1 | pass |
| Light body `#C8C7C0` / Archic black `#0A0A0B` | 11.67:1 | pass |

## Automated checks

| Check | Command | Current result |
|---|---|---|
| Static pages | `npm run gen:pages` | pass; 31 public documents generated and SEO validation completed |
| Public routes | local production preview + sitemap request sweep | pass; all 31 sitemap routes return HTTP 200 and `text/html` |
| Generator runtime | `node --import tsx` through package scripts | pass; Bun-only path and runner dependencies removed |
| Product proof render | Inkscape raster check at 1200×760 | pass for hospitality, mobility and real-estate SVGs; canonical symbol and gold/black tokens visible |
| TypeScript + production bundle | `npm run build` | pass; 177 modules transformed by Vite 6.4.2 |
| Project quality gate | `npm run quality:gate` | pass; 197/197 checks including production artifact and bundle budgets |
| Browser render | 320 / 375 / 768 / 1024 / 1440 / 2560 | pending; this environment has no local browser binary and the remote capture service cannot access loopback |
| Accessibility | keyboard + screen reader + axe | pending |
| Reduced motion | OS/browser preference | pending |

## Manual verification

- [ ] Primary task completed with keyboard only.
- [ ] System switcher exposes the active tab and panel relationship correctly.
- [ ] Menu focus trap and Escape behaviour verified.
- [ ] Contact and phone actions verified end to end.
- [ ] Spanish and English hero, proof and navigation checked.
- [ ] 200% browser zoom.
- [ ] Landscape phone.
- [ ] Reduced motion leaves all content visible.
- [ ] No horizontal overflow at any quality-gate width.
- [x] Unknown-provenance concept imagery excluded from all active production imports.

## Findings

| # | Severity | Location | Issue | Owner | Resolution | Fixed |
|---|---|---|---|---|---|---|
| 1 | resolved | project dependencies | The workspace initially had no installed dependency graph and the generators depended on Bun-specific execution. | implementation | Installed the locked dependency graph, added `tsx`, migrated scripts to Node's `--import tsx`, and replaced `import.meta.dir` with standards-based `import.meta.url`. | ☑ |
| 2 | resolved | legacy concept imagery | Source and licence evidence are absent from the repository. | implementation | Moved JPG/WebP files under `src/assets/concept`, removed public references and replaced every active proof with Archic-authored white-label SVG interfaces. | ☑ |
| 3 | resolved | full-site CSS | Historical style layers risked exceeding the production entry budget. | implementation | Product and exploration styles are route-split; measured main CSS is 46.88 KB gzip, below the 50 KB budget. | ☑ |
| 4 | major | rendered browser QA | Automated browser screenshots, axe and interaction playback cannot run without a browser binary; the external capture service cannot reach `127.0.0.1`. | independent reviewer | Run the viewport, keyboard, reduced-motion, zoom and axe matrix in a browser-enabled environment before production deployment. | ☐ |

## The Polish question

> Is there anything on this site that would make a user feel it is a template, a demo, or unfinished?

Current answer: the direction is authored, product-led and provenance-safe, and the real production build passes every repository gate. Final sign-off still requires an independent rendered-browser pass; that evidence is intentionally not inferred from source checks.

## Verdict

- [ ] SHIP
- [x] **FIX AND RE-RUN** — automated production evidence passes; complete the rendered-browser and independent-review evidence before deployment.
