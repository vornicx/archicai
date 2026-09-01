# Archic Engineering Quality Contract

This document defines the engineering guarantees that sit underneath the public Archic quality standard. It is a release contract, not a style guide.

## Review order

For non-trivial changes, review in this order:

1. Problem and user outcome.
2. Contracts and invariants.
3. Failure model and blast radius.
4. Data/state model and concurrency.
5. Architecture and dependency boundaries.
6. Implementation quality.
7. Runtime, rendered behaviour and operability.
8. Evidence that the change is safe to release.

A green build is necessary but not sufficient.

## Mandatory invariants

Every relevant change must preserve or improve:

- correctness on happy paths and boundary conditions;
- bounded memory, payloads, queues and user-controlled input;
- explicit deadlines and cancellation for external dependencies;
- authorization at the resource boundary, not only authentication;
- idempotency/atomicity where repeated or concurrent work can occur;
- safe error handling without leaking secrets or personal data;
- strict TypeScript and runtime validation at untrusted boundaries;
- no unintended horizontal overflow, clipped semantic text or inaccessible controls;
- reduced-motion behaviour and keyboard-accessible critical flows;
- production observability sufficient to correlate a failed operation;
- backward-compatible evolution unless an intentional breaking change is explicitly designed;
- a tested rollback/recovery path when blast radius justifies one.

## Risk tiers

### Low

Copy, isolated styling or other reversible local changes. Build plus targeted rendered verification is normally sufficient.

### Medium

Shared components, routing, forms, SEO generators, data transformations or dependencies. Require build, automated gate, relevant tests and rendered verification.

### High

Authentication, payments, persistence, migrations, concurrency, public APIs, destructive operations or infrastructure. Define invariants before implementation and add regression/integration tests, failure behaviour, observability and rollback criteria before release.

## Boundary testing

The public site is tested at normal desktop/mobile sizes and at a 320 CSS-pixel compact viewport. The compact run acts as the reflow boundary and must not rely on `overflow: hidden` to hide broken layout. Critical pages are also exercised with `prefers-reduced-motion: reduce`.

Extreme content, untrusted input, zero/one/many records, duplicate events, timeouts, cancellation and partial dependency failure must be considered whenever the touched feature can encounter them.

## Contact system invariants

The enquiry path is a business-critical boundary. It therefore has explicit limits:

- browser request deadline and cancellation on navigation;
- bounded field lengths before network transfer;
- bounded request body on the server;
- bounded in-memory rate-limit cardinality;
- trusted Railway client-IP header for the abuse-control key;
- Resend delivery deadline;
- correct 4xx vs 5xx classification of client and dependency failures;
- correlation ID on API responses/logs;
- graceful connection draining on platform shutdown;
- mail-client fallback if automatic delivery fails while the user is still on the form.

## Architecture fitness functions

Important architectural decisions should become executable checks where practical. The Staff Engineering Gate currently protects TypeScript strictness, contact-system failure boundaries, server invariant tests, rendered boundary auditing and the global CSS cascade budget.

The global stylesheet chain is existing debt: `src/main.tsx` currently carries many historical compatibility layers. The gate deliberately prevents that layer count from growing further. Future refactors should reduce it under screenshot/regression coverage rather than adding another final/fix/hardening stylesheet.

## Definition of done

A change is done only when there is evidence for the properties it claims to preserve. Depending on risk this can include type-checking, invariant/unit tests, integration tests, rendered Playwright checks, console/network health, accessibility/reflow checks, performance budgets, migration verification or recovery tests.

The goal is not maximal process. The goal is the smallest set of guarantees strong enough for the actual blast radius of the change.
