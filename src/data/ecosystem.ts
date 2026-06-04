export type LayerAccent = 'cyan' | 'violet' | 'neutral' | 'dim'
export type LayerStatus = 'active' | 'building' | 'in-progress' | 'planned' | 'parked'
export type LayerZone = 'active' | 'north-star' | 'foundation' | 'core' | 'extension' | 'platform'

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
  active: 'Active',
  building: 'In development',
  'in-progress': 'Early access',
  planned: 'Coming soon',
  parked: 'North-star',
}

export const CYCLE_STEPS = [
  { id: 'benchmark', step: 'BENCHMARK', layer: 'Eval', sub: 'define metrics, run harness', accent: 'violet' as const },
  { id: 'analyze', step: 'ANALYZE', layer: 'Eval', sub: 'find where retrieval fails', accent: 'violet' as const },
  { id: 'build', step: 'BUILD', layer: 'Midas', sub: 'improve the memory system', accent: 'cyan' as const },
  { id: 'measure', step: 'MEASURE', layer: 'Eval', sub: 're-run, compare', accent: 'violet' as const },
  { id: 'publish', step: 'PUBLISH', layer: 'Archic', sub: 'share results transparently', accent: 'neutral' as const },
]

export const LAYERS: ArchicLayer[] = [
  {
    id: 'midas',
    name: 'MIDAS',
    role: 'Agentic memory SDK',
    zone: 'active',
    status: 'active',
    verb: 'remembers',
    desc: 'Local-first Python SDK and MCP server for long-horizon agent memory.',
    tags: ['recall', 'mcp', 'retention'],
    detail: 'Memory facade with remember, recall, assemble, selective forgetting, temporal tiers, SQLite persistence, source provenance and local embedders. Core remains zero dependency; extras add local semantic models and integrations.',
    accent: 'cyan',
  },
  {
    id: 'eval',
    name: 'EVAL',
    role: 'Benchmark suite',
    zone: 'active',
    status: 'active',
    verb: 'measures',
    desc: 'Honest evaluation for memory systems: recall@k, cost, latency and reader sweeps.',
    tags: ['dataset', 'metrics', 'leaderboard'],
    detail: 'LoCoMo + LongMemEval datasets. Adapter protocol for memory systems and reproduce commands in BENCHMARKS.md. Current alpha: LongMemEval-s recall@k 0.95 and LoCoMo 0.85 while ingest stays LLM-free.',
    accent: 'violet',
  },
  {
    id: 'archic',
    name: 'ARCHIC',
    role: 'Ecosystem vision',
    zone: 'north-star',
    status: 'parked',
    desc: 'The full Archic ecosystem — Origin, Atlas, Apollo, Nexus, Forge — as a layered stack for personal agentic intelligence.',
    tags: ['control', 'execution', 'extensions'],
    detail: 'Our north-star. A complete layered stack where memory (Midas/Atlas), control (Origin), and execution (Apollo) are separate, auditable systems. Not actively building the full ecosystem right now — Midas comes first.',
    accent: 'neutral',
    package: '@archic/spec',
  },
]

export const PLATFORMS: ArchicLayer[] = []

export const CORE_LAYERS = LAYERS.filter((l) => l.zone === 'active')

export const ZONE_LABELS: Record<LayerZone, string> = {
  active: 'Active',
  'north-star': 'North-star',
  foundation: 'Foundation',
  core: 'In development',
  extension: 'Roadmap',
  platform: 'Roadmap',
}

export const ZONE_ORDER: LayerZone[] = ['active', 'north-star']
