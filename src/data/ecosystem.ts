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
    desc: 'Python SDK for long-horizon agent memory. Pluggable embedders, multiple stores, zero deps.',
    tags: ['recall', 'embed', 'store'],
    detail: 'MemoryRecord, Embedder protocol (Hashing, OpenAI, Local), InMemoryStore, and the Memory facade — relevance × importance × recency scoring. v0 uses real semantic retrieval behind a pluggable embedder.',
    accent: 'cyan',
  },
  {
    id: 'eval',
    name: 'EVAL',
    role: 'Benchmark suite',
    zone: 'active',
    status: 'active',
    verb: 'measures',
    desc: 'Honest evaluation for memory systems. recall@k, answer_recoverable, efficiency metrics.',
    tags: ['dataset', 'metrics', 'leaderboard'],
    detail: 'LoCoMo + LongMemEval datasets. Adapter protocol for any memory system (baseline raw, Midas, Mem0, Zep, Letta, Supermemory). Run `uv run python -m eval.runner` to reproduce. Current results on LoCoMo: Midas semantic 0.76 recall@k vs baseline 0.06.',
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
