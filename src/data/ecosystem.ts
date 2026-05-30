export type LayerAccent = 'cyan' | 'violet' | 'neutral' | 'dim'
export type LayerStatus = 'building' | 'in-progress' | 'planned'
export type LayerZone = 'foundation' | 'core' | 'extension' | 'platform'

export interface ArchicLayer {
  id: string
  name: string
  role: string
  zone: LayerZone
  status: LayerStatus
  verb?: string
  package?: string
  desc: string
  tags: string[]
  detail: string
  accent: LayerAccent
}

export const STATUS_LABELS: Record<LayerStatus, string> = {
  building: 'In development',
  'in-progress': 'Early access',
  planned: 'Coming soon',
}

export const CYCLE_STEPS = [
  { id: 'understand', step: 'UNDERSTAND', layer: 'Origin', sub: 'context scan', accent: 'cyan' as const },
  { id: 'remember', step: 'REMEMBER', layer: 'Atlas', sub: 'recall prior state', accent: 'cyan' as const },
  { id: 'reason', step: 'REASON', layer: 'Apollo', sub: 'plan the mission', accent: 'violet' as const },
  { id: 'act', step: 'ACT', layer: 'Apollo', sub: 'execute steps, gated by Origin', accent: 'violet' as const },
  { id: 'learn', step: 'LEARN', layer: 'Atlas', sub: 'persist learnings', accent: 'cyan' as const },
]

export const LAYERS: ArchicLayer[] = [
  {
    id: 'archic',
    name: 'ARCHIC',
    role: 'Foundation',
    zone: 'foundation',
    status: 'in-progress',
    desc: 'Protocol spec, composition SDK, and conformance.',
    tags: ['spec', 'compose', 'conformance'],
    detail: '@archic/spec v0.1 defines the contracts between layers. The monorepo at archic is where the stack is being split and formalized.',
    accent: 'neutral',
    package: '@archic/spec',
  },
  {
    id: 'origin',
    name: 'ORIGIN',
    role: 'Control plane',
    zone: 'core',
    status: 'building',
    verb: 'governs',
    package: '@vornicx/origin',
    desc: 'Context, policy, verification, and observability.',
    tags: ['policy', 'traces', 'contracts'],
    detail: 'ContextEngine, Policy gate, human approvals, traces, and contract verification → Certificate. Every mutation passes through Origin.',
    accent: 'cyan',
  },
  {
    id: 'apollo',
    name: 'APOLLO',
    role: 'Execution runtime',
    zone: 'core',
    status: 'building',
    verb: 'executes',
    package: '@vornicx/apollo-agent',
    desc: 'Plan, execute, replan — under human control.',
    tags: ['missions', 'tools', 'orchestration'],
    detail: 'Mission runtime: goal → Plan → steps → replan. CLI and programmatic adapter today; decoupling from local memory is part of the Archic split.',
    accent: 'violet',
  },
  {
    id: 'atlas',
    name: 'ATLAS',
    role: 'Memory',
    zone: 'core',
    status: 'building',
    verb: 'remembers',
    package: '@vornicx/origin',
    desc: 'Persistent state across sessions, decisions, and workflows.',
    tags: ['recall', 'scope', 'sync'],
    detail: 'Structured recall, scoped memory, local↔cloud sync, controlled forget. Already exported as Atlas from the Origin SDK; becoming its own layer in the monorepo.',
    accent: 'cyan',
  },
  {
    id: 'nexus',
    name: 'NEXUS',
    role: 'Integrations',
    zone: 'extension',
    status: 'planned',
    desc: 'External systems as typed, governed capabilities.',
    tags: ['connectors', 'auth', 'invoke'],
    detail: 'Connector registry, auth vault, and ToolAdapter — the bus to GitHub, browsers, MCP, and everything outside the stack.',
    accent: 'dim',
  },
  {
    id: 'forge',
    name: 'FORGE',
    role: 'Extensions',
    zone: 'extension',
    status: 'planned',
    desc: 'Create, validate, and publish skills, workflows, and experts.',
    tags: ['compose', 'validate', 'publish'],
    detail: 'Capability factory: compose artifacts, validate in sandbox, publish to Registry. Phase 3 of the build plan.',
    accent: 'dim',
  },
]

export const PLATFORMS: ArchicLayer[] = [
  {
    id: 'registry',
    name: 'REGISTRY',
    role: 'Capability catalog',
    zone: 'platform',
    status: 'planned',
    desc: 'Discover, version, and pin capabilities.',
    tags: ['discover', 'version', 'pin'],
    detail: 'resolve(id@version) for skills, workflows, and subagents — planned with Forge in Phase 3.',
    accent: 'neutral',
  },
  {
    id: 'gateway',
    name: 'GATEWAY',
    role: 'API boundary',
    zone: 'platform',
    status: 'planned',
    desc: 'Unified API boundary for the ecosystem.',
    tags: ['route', 'auth', 'invoke'],
    detail: 'Single governed frontier for routing and invocation — Phase 4 sketch.',
    accent: 'neutral',
  },
]

export const CORE_LAYERS = LAYERS.filter((l) => l.zone === 'core')

export const ZONE_LABELS: Record<LayerZone, string> = {
  foundation: 'Foundation',
  core: 'In development',
  extension: 'Roadmap',
  platform: 'Roadmap',
}

export const ZONE_ORDER: LayerZone[] = ['core', 'foundation', 'extension', 'platform']
