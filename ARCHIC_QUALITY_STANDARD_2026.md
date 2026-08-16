# Archic Quality Standard 2026.1

Archic itself is the reference implementation of this standard. Client work may adapt the visual language, but it should not ship below this bar.

## 1. Identity

- The canonical Archic symbol is `/brand/archic-symbol-2026.svg`.
- The canonical lockups live in `/brand/` and are the only Archic identity assets that may represent the current brand.
- Legacy logos, old favicons and previous brand marks must not be reintroduced.
- Brand identity must stay consistent across favicon, metadata, structured data, social previews and UI.

## 2. Direction

- Every project needs an intentional visual idea. A generic template with premium styling is not enough.
- Typography, spacing, imagery, hierarchy and motion must reinforce the same direction.
- Avoid decorative complexity that does not improve perception, comprehension or conversion.
- Real product work and real workflows are preferred over abstract mockups whenever they can be shown safely.

## 3. Product proof

- Archic demos are white-label derivatives of systems that have actually been developed.
- Client identity, contacts, credentials and operational data must be removed before a system is used as a public demo.
- Demo data must be fictional and visibly marked as such.
- Preserve useful product logic: states, workflows, relationships, management patterns and operational context.

## 4. Interaction

- Every interactive element needs a clear hover, active and keyboard-focus state where applicable.
- Motion should feel deliberate and calm; it must not block input or make content harder to scan.
- `prefers-reduced-motion` must be respected.
- Tap targets must remain usable on phone-sized viewports.
- The interface must not rely on hover to expose essential information.

## 5. Responsive

- Mobile is designed independently, not produced by shrinking desktop.
- No horizontal page overflow.
- No clipped headings, controls, tables, cards, drawers or modals.
- Dense product UI must simplify gracefully below tablet widths.
- Important text remains readable without zooming.

## 6. Content and conversion

- The visitor should understand what Archic does, see credible proof and reach a next action without decoding agency language.
- Claims must be supportable. Do not invent clients, results, awards or case-study outcomes.
- Prefer concrete product language over vague claims about innovation or quality.
- Spanish and English should feel authored, not mechanically translated.

## 7. Technical quality

- TypeScript and production build must pass.
- Static SEO generation must pass before deployment.
- Canonical, hreflang, viewport, favicon and current identity metadata must be present on generated entry pages.
- The current performance budget is enforced by `scripts/quality-gate.mjs`.
- The build must preserve self-hosted fonts and avoid unnecessary third-party runtime dependencies.
- Public demos must not contain credentials, secrets or client-private data.

## 8. Archic website reference bar

The Archic website is benchmark #1. It should demonstrate the standard before explaining it:

- Hero: strong direction plus immediate product proof.
- Presence / Control / Business: understandable as a system, not three marketing labels.
- White-label showcase: real interfaces, fictional data, interactive entry points.
- Motion: subtle, responsive and reduced-motion safe.
- Mobile: intentional hierarchy and product UI that remains legible.
- QA: build, SEO generation, identity checks and bundle budgets are blocking gates.

## 9. Release rule

A change should not be considered finished because it compiles. It is finished when:

1. the intended flow works,
2. desktop and mobile layouts hold up,
3. the current Archic identity is preserved,
4. quality gates pass,
5. the result still looks deliberate after the novelty of the change is removed.
