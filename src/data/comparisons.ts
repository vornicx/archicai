export type ComparisonRow = {
  feature: string
  midas: string
  rival: string
  why: string
}

export type ComparisonFaq = { q: string; a: string }

export type BenchmarkScores = {
  longmem?: number | null
  locomo?: number | null
}

export type Comparison = {
  slug: string
  rival: string
  rivalSlug: string
  title: string
  description: string
  hookline: string
  intro: string
  tldr: { pickMidas: string; pickRival: string; both: string }
  rows: ComparisonRow[]
  sections: { heading: string; body: string[] }[]
  faq: ComparisonFaq[]
  benchmarks: {
    midas: BenchmarkScores
    rival: BenchmarkScores
    note?: string
  }
  /** Honest places where the rival is stronger or where Midas is weaker today. */
  caveats: string[]
}

export const MIDAS_SCORES: BenchmarkScores = { longmem: 0.95, locomo: 0.85 }

export const COMPARISONS: Comparison[] = [
  {
    slug: 'midas-vs-mem0',
    rival: 'mem0',
    rivalSlug: 'mem0',
    title: 'Midas vs mem0 — local-first AI agent memory compared',
    description:
      'Technical comparison of Midas and mem0 for AI agent memory: architecture, ingest cost, recall, provenance, MCP delivery and eval. Local-first vs hosted.',
    hookline: 'Local-first SQLite + MCP vs hosted LLM-graded extraction.',
    intro:
      "Both Midas and mem0 give AI agents long-term memory — but they make opposite architectural bets. Midas is local-first, deterministic and MCP-native, with no LLM in the ingest path. mem0 is a hosted platform with LLM-graded extraction.",
    tldr: {
      pickMidas:
        'when you want local persistence, $0 ingest, source-traceable recall, MCP-first delivery, and a reproducible eval harness.',
      pickRival:
        'when you want a hosted memory service with LLM-graded extraction and a managed control plane.',
      both: 'Both score competitively on LoCoMo; Midas adds reproducible LongMemEval-S recall@k 0.95.',
    },
    rows: [
      { feature: 'Architecture', midas: 'Local-first SDK + MCP server', rival: 'Hosted platform with optional self-host', why: 'Where the system of record lives.' },
      { feature: 'Persistence', midas: 'Embedded SQLite, zero deps in core', rival: 'Vector DB (Qdrant/PGVector) + graph store', why: 'One file vs a stack to provision.' },
      { feature: 'Ingest cost', midas: '$0 — no LLM in the ingest path', rival: 'LLM call per ingest for extraction', why: 'Recurring cost at agent scale.' },
      { feature: 'Ingest latency', midas: 'Single-digit ms (local embed + insert)', rival: 'Hundreds of ms (LLM round-trip)', why: 'Blocks the agent on every write.' },
      { feature: 'Determinism', midas: 'Same input → same memory', rival: 'LLM-graded, may vary across runs', why: 'Matters for replay and eval.' },
      { feature: 'Delivery', midas: 'MCP-first (Claude, Cursor, Codex, Windsurf) + Python SDK', rival: 'Python/TS SDKs + REST API', why: 'How the agent host wires it in.' },
      { feature: 'Offline', midas: 'Yes — runs without network', rival: 'Cloud by default; self-host possible', why: 'Privacy and air-gapped workflows.' },
      { feature: 'Eval', midas: 'LongMemEval-S 0.95 · LoCoMo 0.85 (reproducible)', rival: 'Published LoCoMo numbers, less direct repro', why: 'Can you re-run the claim?' },
    ],
    sections: [
      {
        heading: 'Architecture: local-first vs hosted',
        body: [
          'Midas is a Python package and an MCP server you run yourself. The core has zero external dependencies, persistence is embedded SQLite, and embeddings can be a local sentence-transformer. Nothing leaves the machine unless you wire it up.',
          'mem0 ships as both an open-source library and a managed platform. The library pairs a vector store with an optional graph store and relies on an LLM to extract atomic memories on write.',
        ],
      },
    ],
    faq: [
      { q: 'What is the main difference between Midas and mem0?', a: 'Midas is local-first with zero LLM calls at ingest. mem0 is a hosted platform that uses an LLM to extract memories on every write.' },
      { q: 'Can I use Midas with Claude, Cursor or Codex?', a: 'Yes. Midas runs as an MCP server, so any MCP-compatible host can give its agent durable memory without extra glue code.' },
    ],
    benchmarks: {
      midas: MIDAS_SCORES,
      rival: { longmem: 0.62, locomo: 0.68 },
      note: 'mem0 numbers from the published mem0 paper and LoCoMo reports. Midas numbers from the reproducible harness shipped in the repo (Alpha; both score and config can move).',
    },
    caveats: [
      'mem0 has a much larger ecosystem today — managed platform, dashboards, integrations, hosted infra. Midas is alpha-stage tooling.',
      'mem0 ships a polished graph + entity layer out of the box; Midas does not extract entities at ingest by design.',
      'Midas’s published numbers come from a single team’s harness. Treat the gap as directional until third parties reproduce it.',
    ],
  },
  {
    slug: 'midas-vs-letta',
    rival: 'Letta (MemGPT)',
    rivalSlug: 'letta',
    title: 'Midas vs Letta (MemGPT) — agent memory frameworks compared',
    description:
      'Compare Midas and Letta (MemGPT) for AI agent memory: local-first SQLite + MCP vs stateful agent server with hierarchical context paging.',
    hookline: 'Local memory layer vs full stateful agent server.',
    intro:
      "Letta (formerly MemGPT) is a stateful agent runtime built around hierarchical memory paging — the agent itself manages an OS-like context. Midas is the opposite shape: a thin local memory layer that any agent host (Claude Code, Cursor, Codex) can plug into via MCP.",
    tldr: {
      pickMidas:
        'when you already have an agent (Claude Code, Cursor, Codex, a custom loop) and just need durable, local, MCP-native memory.',
      pickRival:
        "when you want Letta's full stateful agent server with built-in memory paging, tool calls and a hosted control plane.",
      both: 'Both treat memory as first-class; they differ on whether memory is a layer or an agent runtime.',
    },
    rows: [
      { feature: 'Product shape', midas: 'Memory layer + MCP server', rival: 'Stateful agent runtime + server', why: 'Bring-your-own-agent vs full agent stack.' },
      { feature: 'Persistence', midas: 'Embedded SQLite, single file', rival: 'Postgres + pgvector, server process', why: 'Laptop friendliness vs server ops.' },
      { feature: 'Memory model', midas: 'Tiered store + selective forgetting + provenance', rival: 'Hierarchical core/archival memory paged by the agent', why: 'Who decides what stays in context.' },
      { feature: 'Ingest cost', midas: '$0 — no LLM at write', rival: 'LLM-driven memory edits inside the agent loop', why: 'Recurring cost at agent scale.' },
      { feature: 'Delivery', midas: 'MCP-first (Claude, Cursor, Codex, Windsurf)', rival: 'Letta server + SDK / ADE UI', why: 'How you reach the memory from a host.' },
      { feature: 'Agent coupling', midas: 'Agent-agnostic — any MCP host', rival: 'Tightly coupled to the Letta agent runtime', why: 'Portability across hosts.' },
      { feature: 'Eval', midas: 'Reproducible LongMemEval-S 0.95 · LoCoMo 0.85', rival: 'Published MemGPT/Letta benchmarks; varies by config', why: 'Can you re-run the claim?' },
      { feature: 'License', midas: 'Open source, run locally', rival: 'Open source + Letta Cloud', why: 'Lock-in and deployment freedom.' },
    ],
    sections: [
      {
        heading: 'Memory layer vs agent runtime',
        body: [
          'Letta packages memory inside a complete agent server: the LLM, a tool loop, hierarchical core/archival memory and a control plane. You adopt the Letta agent to get the memory.',
          'Midas decouples memory from the agent. Your existing host (Claude Code, Cursor, Codex, Windsurf, a custom loop) keeps doing the planning and tool calling; Midas only owns the remember/recall/forget surface.',
        ],
      },
      {
        heading: 'Operational footprint',
        body: [
          'Letta wants a Postgres + pgvector and a long-running server. That is fine for cloud-deployed products and not great for a single developer wiring memory into their IDE.',
          'Midas runs as a uvx-launched MCP process against a SQLite file. It boots in milliseconds and survives offline use, which is what most agent-in-the-IDE workflows actually need.',
        ],
      },
    ],
    faq: [
      { q: 'Is Letta the same as MemGPT?', a: 'Letta is the productionised, renamed continuation of the MemGPT research project from the same team.' },
      { q: 'Can I use Midas inside a Letta agent?', a: 'Yes, in principle — Midas exposes MCP tools, so any agent runtime that speaks MCP (or wraps it) can call remember/recall/forget.' },
      { q: 'When should I prefer Letta?', a: 'When you want a turnkey stateful agent server with built-in memory paging and a UI, and are happy to run Postgres alongside it.' },
    ],
    benchmarks: {
      midas: MIDAS_SCORES,
      rival: { longmem: 0.55, locomo: null },
      note: 'Letta / MemGPT reports vary by model and config; the figure shown reflects MemGPT-class results on LongMemEval-S. No directly comparable LoCoMo number published.',
    },
    caveats: [
      'Letta ships a full stateful agent runtime with a UI (Agent Development Environment), tool calling and memory management. Midas only owns the memory surface.',
      'For users who do not already have an agent host, Letta is a more complete out-of-the-box product.',
      'Letta has more permissive memory editing primitives inside the agent loop; Midas keeps editing deterministic and external.',
    ],
  },
  {
    slug: 'midas-vs-zep',
    rival: 'Zep',
    rivalSlug: 'zep',
    title: 'Midas vs Zep — temporal knowledge graph memory compared',
    description:
      'Compare Midas and Zep for AI agent memory: local-first SQLite + MCP vs hosted temporal knowledge graph (Graphiti) with LLM-driven entity extraction.',
    hookline: 'Local-first SQLite vs hosted temporal knowledge graph.',
    intro:
      "Zep builds memory around Graphiti, a temporal knowledge graph that an LLM keeps updated with entities, relations and validity windows. Midas keeps memory as a flat, source-traceable store on SQLite with no LLM on the write path. Two very different bets on how much structure to extract upfront.",
    tldr: {
      pickMidas:
        'when you want local, deterministic, MCP-native memory with $0 ingest and offline operation.',
      pickRival:
        'when your product needs a hosted knowledge graph over chat history with entity / relationship reasoning out of the box — Zep is the more mature option there.',
      both: 'On published recall@k, the two are close: Zep is roughly tied with Midas on LongMemEval-S (~0.94 vs 0.95) and competitive on LoCoMo. The real split is architecture, not score.',
    },
    rows: [
      { feature: 'Memory model', midas: 'Flat tiered store + tags + provenance', rival: 'Temporal knowledge graph (Graphiti)', why: 'How much structure is extracted at write time.' },
      { feature: 'Persistence', midas: 'Embedded SQLite', rival: 'Hosted graph + vector store', why: 'Laptop vs cloud footprint.' },
      { feature: 'Ingest cost', midas: '$0 — no LLM in the write path', rival: 'LLM call per ingest to update the graph', why: 'Recurring spend per memory.' },
      { feature: 'Ingest latency', midas: 'Single-digit ms', rival: 'Hundreds of ms (LLM + graph write)', why: 'Blocks the agent on every turn.' },
      { feature: 'Determinism', midas: 'Same input → same memory', rival: 'LLM-graded graph updates can vary', why: 'Replay and audit.' },
      { feature: 'Delivery', midas: 'MCP-first + Python SDK', rival: 'Python/TS SDK + REST against Zep Cloud', why: 'How the host wires it in.' },
      { feature: 'Offline', midas: 'Yes', rival: 'Cloud-first; self-host available', why: 'Privacy and air-gapped use.' },
      { feature: 'Eval', midas: 'LongMemEval-S 0.95 · LoCoMo 0.85 (own harness)', rival: 'LongMemEval-S ~0.94 · LoCoMo ~0.75 (Zep paper)', why: 'Both publish; Zep is roughly tied on LongMemEval.' },
    ],
    sections: [
      {
        heading: 'Structure now vs structure on demand',
        body: [
          'Zep pays an LLM at write time to maintain a temporal knowledge graph: entities, relationships, validity intervals. That graph powers rich reasoning queries — but it also means every memory write is an LLM call, and the resulting structure depends on the model and prompt.',
          'Midas takes the opposite stance: store the original turn with embeddings, tags and provenance, and only derive structure when recall actually needs it. That keeps ingest free, deterministic and easy to audit.',
        ],
      },
      {
        heading: 'Deployment shape',
        body: [
          'Zep is a hosted service first, with a self-host path. Production usage typically lives in Zep Cloud with managed scaling.',
          'Midas is a SQLite file and a small MCP server. It runs the same way on a laptop, in CI, or in a container, without a separate database service.',
        ],
      },
    ],
    faq: [
      { q: 'Is Zep the same as Graphiti?', a: 'Graphiti is the open-source temporal knowledge graph library Zep built. Zep is the product around it.' },
      { q: 'Does Midas have a knowledge graph?', a: 'No. Midas stores turns with embeddings, tags and source pointers. If you need a graph, you can build one over recall results — but ingest stays LLM-free.' },
      { q: 'Which one is cheaper at scale?', a: 'Midas at ingest, by construction: no LLM on the write path. At read time, both cost roughly a vector + filter query.' },
    ],
    benchmarks: {
      midas: MIDAS_SCORES,
      rival: { longmem: 0.94, locomo: 0.75 },
      note: 'Zep / Graphiti numbers from the Zep paper on LongMemEval and LoCoMo. On LongMemEval-S the two systems are effectively tied; the difference is well within noise of model and reader choice.',
    },
    caveats: [
      'Zep is essentially tied with Midas on LongMemEval-S (~0.94 vs 0.95). Calling Midas a clear "winner" on that dataset would be dishonest.',
      'Zep’s knowledge-graph layer (Graphiti) gives richer entity / relationship queries out of the box. Midas does not extract entities at ingest.',
      'Zep is a more mature managed product with auth, dashboards and scaling. Midas is alpha-stage local tooling.',
    ],
  },
  {
    slug: 'midas-vs-langmem',
    rival: 'LangMem',
    rivalSlug: 'langmem',
    title: 'Midas vs LangMem — agent memory for LangGraph compared',
    description:
      'Compare Midas and LangMem (LangChain) for AI agent memory: framework-agnostic local SQLite + MCP vs LangGraph-native memory utilities.',
    hookline: 'Framework-agnostic MCP layer vs LangGraph-native memory utilities.',
    intro:
      "LangMem is LangChain's memory toolkit for agents built on LangGraph. It plugs into the LangGraph store and shines if your stack is already LangChain end-to-end. Midas is framework-agnostic and host-agnostic: it ships as an MCP server first, so any MCP host or Python agent can use it without adopting a framework.",
    tldr: {
      pickMidas:
        'when your agent runs in Claude Code, Cursor, Codex, Windsurf or a custom Python loop — and you want memory without adopting LangChain.',
      pickRival:
        'when you are already building on LangGraph and want memory primitives that compose with the rest of LangChain.',
      both: 'Both are open and Python-friendly; the split is framework lock-in vs framework freedom.',
    },
    rows: [
      { feature: 'Framework coupling', midas: 'Framework-agnostic — MCP + plain Python SDK', rival: 'LangGraph / LangChain native', why: 'Whether memory drags a framework with it.' },
      { feature: 'Persistence', midas: 'Embedded SQLite', rival: 'LangGraph store (in-memory, Postgres, Redis, etc.)', why: 'Where memory actually lives.' },
      { feature: 'Ingest cost', midas: '$0 — no LLM at write', rival: 'LLM-driven extraction / reflection utilities', why: 'Per-write spend at agent scale.' },
      { feature: 'Delivery', midas: 'MCP-first (Claude, Cursor, Codex, Windsurf)', rival: 'Python imports inside a LangGraph app', why: 'How an IDE-side agent reaches it.' },
      { feature: 'Provenance', midas: 'Source pointer on every recall', rival: 'Depends on store + utility used', why: 'Audit which item drove a recall.' },
      { feature: 'Eval', midas: 'Reproducible LongMemEval-S 0.95 · LoCoMo 0.85 harness', rival: 'No single canonical benchmark harness', why: 'Apples-to-apples comparison.' },
      { feature: 'License', midas: 'Open source, run anywhere', rival: 'Open source under LangChain', why: 'Deployment freedom.' },
    ],
    sections: [
      {
        heading: 'Framework freedom vs framework integration',
        body: [
          'LangMem is designed to feel native inside LangGraph: same store abstraction, same patterns for reflection and summarisation. If your agent is already a LangGraph app, that integration is the whole point.',
          'Midas does not care what your agent is built with. It exposes MCP tools (remember, recall, forget) and a tiny Python SDK. That means the same memory works for an IDE assistant, a CLI agent and a server-side loop.',
        ],
      },
      {
        heading: 'Memory writes',
        body: [
          'LangMem leans on LLM-driven utilities (summarise, reflect, extract) to shape what goes into the store. That is powerful, but it puts an LLM in the write path.',
          'Midas keeps writes deterministic: local embeddings + a scoring policy decide what to keep, and the original turn is preserved with a source pointer. You can layer LLM reflection on top, but it is not required to use the system.',
        ],
      },
    ],
    faq: [
      { q: 'Do I need LangGraph to use LangMem?', a: 'In practice yes — LangMem is built around the LangGraph store and patterns.' },
      { q: 'Can Midas be used from a LangGraph agent?', a: 'Yes. The Python SDK is a normal package and the MCP server is reachable from any host.' },
      { q: 'Which one is easier to drop into Claude Code or Cursor?', a: 'Midas — those hosts speak MCP natively, so it is a config change rather than building a LangGraph app.' },
    ],
    benchmarks: {
      midas: MIDAS_SCORES,
      rival: { longmem: null, locomo: null },
      note: 'LangMem has no canonical recall@k benchmark; results depend entirely on the LangGraph store and utilities you compose.',
    },
  },
]

export const COMPARISON_INDEX = COMPARISONS.map((c) => ({
  slug: c.slug,
  rival: c.rival,
  hookline: c.hookline,
  description: c.description,
  benchmarks: c.benchmarks,
}))
