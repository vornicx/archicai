/** Canonical documentation repo */
export const DOCS_REPO = 'https://github.com/vornicx/archic' as const

/** Marketing / website repo */
export const WEBSITE_REPO = 'https://github.com/vornicx/archicai' as const

/** Public code repositories */
export const REPOS = {
  archic: DOCS_REPO,
  archicai: WEBSITE_REPO,
  origin: 'https://github.com/vornicx/origin',
  apollo: 'https://github.com/vornicx/apollo-agent',
  org: 'https://github.com/vornicx',
} as const

/** npm packages (published today) */
export const PACKAGES = {
  origin: {
    name: '@vornicx/origin',
    url: 'https://www.npmjs.com/package/@vornicx/origin',
    install: 'npm install @vornicx/origin',
  },
  apollo: {
    name: '@vornicx/apollo-agent',
    url: 'https://www.npmjs.com/package/@vornicx/apollo-agent',
    install: 'npm install -g @vornicx/apollo-agent',
  },
} as const

const doc = (path: string) => `${DOCS_REPO}/blob/main/${path}`

/** Documentation in github.com/vornicx/archic */
export const ARCHIC_DOCS = [
  {
    id: 'docs-index',
    title: 'Documentation index',
    desc: 'Start here — links to every spec, plan, and work package.',
    href: doc('docs/README.md'),
  },
  {
    id: 'ecosystem',
    title: 'Ecosystem boundaries',
    desc: 'Layer responsibilities, anti-patterns, and grounded current state.',
    href: doc('ECOSYSTEM.md'),
  },
  {
    id: 'protocol',
    title: 'Archic Protocol v0.1',
    desc: 'Inter-layer contracts — ContextBundle, PolicyDecision, Certificate, and more.',
    href: doc('docs/spec/archic-protocol-v0.1.md'),
  },
  {
    id: 'build-plan',
    title: 'Build plan',
    desc: 'Monorepo layout, phases, and work packages for the stack split.',
    href: doc('BUILD-PLAN.md'),
  },
  {
    id: 'work-packages',
    title: 'Work packages',
    desc: 'Execution-grade tasks for Phase 0–4.',
    href: doc('docs/work-packages/README.md'),
  },
] as const

/** SDK docs (separate repos; linked from archic docs index) */
export const SDK_DOCS = [
  {
    id: 'origin-readme',
    title: 'Origin SDK',
    desc: 'Install, principles, cycle, and API for @vornicx/origin.',
    href: `${REPOS.origin}/blob/main/README.md`,
  },
  {
    id: 'apollo-readme',
    title: 'Apollo agent',
    desc: 'CLI, missions, and runtime for @vornicx/apollo-agent.',
    href: `${REPOS.apollo}/blob/main/README.md`,
  },
] as const

export const DOCS = [...ARCHIC_DOCS, ...SDK_DOCS] as const

export const CODE_REPOS = [
  {
    id: 'archic',
    name: 'archic',
    desc: 'Documentation, protocol spec, monorepo, and build plan.',
    href: REPOS.archic,
    status: 'Docs + code',
  },
  {
    id: 'archicai',
    name: 'archicai',
    desc: 'archic.es marketing site (this website).',
    href: REPOS.archicai,
    status: 'Website',
  },
  {
    id: 'origin',
    name: 'origin',
    desc: 'TypeScript SDK — Atlas memory, Origin control plane, Apollo adapter.',
    href: REPOS.origin,
    status: 'Published',
  },
  {
    id: 'apollo-agent',
    name: 'apollo-agent',
    desc: 'Mission runtime and CLI — plan, execute, replan under human control.',
    href: REPOS.apollo,
    status: 'Published',
  },
] as const

export const LAYER_LINKS: Record<
  string,
  { repo?: string; npm?: string; doc?: string }
> = {
  archic: {
    repo: REPOS.archic,
    doc: doc('docs/README.md'),
  },
  origin: {
    repo: REPOS.origin,
    npm: PACKAGES.origin.url,
    doc: `${REPOS.origin}/blob/main/README.md`,
  },
  atlas: {
    repo: REPOS.origin,
    npm: PACKAGES.origin.url,
    doc: doc('ECOSYSTEM.md'),
  },
  apollo: {
    repo: REPOS.apollo,
    npm: PACKAGES.apollo.url,
    doc: `${REPOS.apollo}/blob/main/README.md`,
  },
}
