// All numbers below are sourced from Midas/BENCHMARKS.md (vornicx/Midas) for Midas,
// and from each rival's own published paper / docs for the rivals. We deliberately
// keep two metric tracks SEPARATE because they measure different things:
//
//   1) recall@k — memory-layer isolated, deterministic. Midas wins by a wide margin
//      vs a recency-window baseline. N/A for LLM-fact-synthesising systems
//      (mem0, Hindsight) because they don't return source turn IDs.
//
//   2) Answer correctness on LongMemEval-s — reader-dependent headline metric.
//      Rivals' published numbers run THEIR full pipeline with THEIR reader; Midas
//      is measured holding the reader fixed. On this metric, mem0 and Zep currently
//      score higher than Midas, and we say so.

export type ComparisonRow = {
  feature: string
  midas: string
  rival: string
  why: string
}

export type ComparisonFaq = { q: string; a: string }

/** Reader-independent retrieval quality. Midas vs a recency-window baseline. */
export type RecallTrack = {
  midas: { longmem: number; locomo: number }     // from BENCHMARKS.md §1
  baseline: { longmem: number; locomo: number }  // recency window, same source
  rival:
    | { kind: 'na'; reason: string }             // mem0/Hindsight class: no source IDs
    | { kind: 'value'; longmem?: number | null; locomo?: number | null; source: string }
}

/** Answer correctness on LongMemEval-s — reader-dependent, secondary, wide bars. */
export type AnswerTrack = {
  midas: { value: number; reader: string; n: number }
  rival: { value: number; reader: string; source: string } | null
  honestNote: string
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
    recall: RecallTrack
    answer: AnswerTrack
  }
  /** Honest places where the rival is stronger or where Midas is weaker today. */
  caveats: string[]
}

// Midas's own measured numbers (single source of truth: BENCHMARKS.md)
export const MIDAS_RECALL = { longmem: 0.95, locomo: 0.85 } as const
export const BASELINE_RECALL = { longmem: 0.03, locomo: 0.02 } as const
// Best Midas answer on LongMemEval-s with a fixed strong reader, n=40, seed 0
export const MIDAS_ANSWER = { value: 0.84, reader: 'gpt-4o', n: 40 } as const

export const COMPARISONS: Comparison[] = [
  {
    slug: 'midas-vs-mem0',
    rival: 'mem0',
    rivalSlug: 'mem0',
    title: 'Midas vs mem0 — local-first AI agent memory compared',
    description:
      'Technical comparison of Midas and mem0 for AI agent memory: architecture, ingest cost, recall, provenance, MCP delivery and eval. Local-first vs hosted.',
    hookline: 'Local-first SQLite + MCP, $0 ingest. mem0 wins the LongMemEval headline.',
    intro:
      "Both Midas and mem0 give AI agents long-term memory — but they make opposite architectural bets. Midas is local-first, deterministic and MCP-native, with no LLM in the ingest path. mem0 is a hosted platform with LLM-graded extraction that publishes a higher answer score on LongMemEval.",
    tldr: {
      pickMidas:
        'when you want local persistence, $0 ingest, source-traceable recall, MCP-first delivery, and a reproducible eval harness.',
      pickRival:
        "when you want a hosted memory service with the highest published LongMemEval answer score (mem0 reports ~0.944) and don't mind paying an LLM call per write.",
      both: 'Midas dominates on memory-layer recall@k and ingest cost; mem0 currently leads on LongMemEval answer correctness.',
    },
    rows: [
      { feature: 'Architecture', midas: 'Local-first SDK + MCP server', rival: 'Hosted platform with optional self-host', why: 'Where the system of record lives.' },
      { feature: 'Persistence', midas: 'Embedded SQLite, zero deps in core', rival: 'Vector DB (Qdrant/PGVector) + graph store', why: 'One file vs a stack to provision.' },
      { feature: 'Ingest cost', midas: '$0 — no LLM in the ingest path', rival: '≥1 LLM call per session for fact extraction', why: 'Recurring cost at agent scale.' },
      { feature: 'Ingest latency', midas: '~116 ms cold · ~0 ms cached (local embed)', rival: '~668 ms (LLM round-trip, from BENCHMARKS.md §2)', why: 'Blocks the agent on every write.' },
      { feature: 'Determinism', midas: 'Same input → same memory', rival: 'LLM-graded, may vary across runs', why: 'Matters for replay and eval.' },
      { feature: 'Provenance', midas: 'Source turn ID on every recall', rival: 'LLM-rewritten facts — no source pointer', why: 'Audit and compliance.' },
      { feature: 'Delivery', midas: 'MCP-first (Claude, Cursor, Codex, Windsurf) + Python SDK', rival: 'Python/TS SDKs + REST API', why: 'How the agent host wires it in.' },
      { feature: 'Offline', midas: 'Yes — runs without network', rival: 'Cloud by default; self-host possible', why: 'Privacy and air-gapped workflows.' },
      { feature: 'LongMemEval-s answer', midas: '0.84 (gpt-4o, n=40)', rival: '~0.944 (mem0 published)', why: 'Headline correctness — mem0 leads.' },
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
      { q: 'Who scores higher on LongMemEval?', a: 'mem0 publishes ~0.944 answer correctness; Midas measures 0.84 with gpt-4o (n=40). On the memory-layer recall@k metric Midas measures 0.95 vs a baseline of 0.03; mem0 cannot be scored on recall@k because it returns LLM-rewritten facts, not source turn IDs.' },
      { q: 'Can I use Midas with Claude, Cursor or Codex?', a: 'Yes. Midas runs as an MCP server, so any MCP-compatible host can give its agent durable memory without extra glue code.' },
    ],
    benchmarks: {
      recall: {
        midas: MIDAS_RECALL,
        baseline: BASELINE_RECALL,
        rival: {
          kind: 'na',
          reason:
            'mem0 returns LLM-rewritten facts, not source turn IDs, so reader-independent recall@k is not computable for it (see BENCHMARKS.md §3).',
        },
      },
      answer: {
        midas: MIDAS_ANSWER,
        rival: { value: 0.944, reader: 'mem0 full pipeline', source: 'mem0 published LongMemEval result' },
        honestNote:
          'On LongMemEval-s answer correctness, mem0 currently scores higher than Midas. mem0 runs its full LLM-at-ingest pipeline; Midas runs $0 LLM at ingest and matches Mastra Observational Memory (0.84) at the gpt-4o reader.',
      },
    },
    caveats: [
      'mem0 has a much larger ecosystem today — managed platform, dashboards, integrations, hosted infra. Midas is alpha-stage tooling.',
      'mem0 ships a polished graph + entity layer out of the box; Midas does not extract entities at ingest by design.',
      'On the LongMemEval answer-correctness headline, mem0 (~0.944) is ahead of Midas (0.84 at gpt-4o, n=40).',
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
      { feature: 'LongMemEval-s answer', midas: '0.84 (gpt-4o, n=40)', rival: '~0.55 (MemGPT class, varies by config)', why: 'Midas leads on this dataset.' },
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
      recall: {
        midas: MIDAS_RECALL,
        baseline: BASELINE_RECALL,
        rival: {
          kind: 'na',
          reason:
            "Letta / MemGPT does not publish a directly comparable reader-independent recall@k on the same harness; its memory is paged inside the agent runtime, not exposed as a retrieval layer.",
        },
      },
      answer: {
        midas: MIDAS_ANSWER,
        rival: { value: 0.55, reader: 'MemGPT class, varies by config', source: 'MemGPT / LongMemEval-class reports' },
        honestNote:
          'On LongMemEval-s answer correctness Midas is ahead of MemGPT-class results (0.84 vs ~0.55), but Letta is a full agent runtime; the comparison only covers the memory dimension.',
      },
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
    hookline: 'Local-first SQLite vs hosted temporal knowledge graph. Zep leads the answer headline.',
    intro:
      "Zep builds memory around Graphiti, a temporal knowledge graph that an LLM keeps updated with entities, relations and validity windows. Midas keeps memory as a flat, source-traceable store on SQLite with no LLM on the write path. Zep's published LongMemEval answer score is higher than Midas's.",
    tldr: {
      pickMidas:
        'when you want local, deterministic, MCP-native memory with $0 ingest, source-traceable recall and offline operation.',
      pickRival:
        'when your product needs a hosted knowledge graph over chat history with entity / relationship reasoning, and you want the highest published LongMemEval answer score in this set.',
      both: 'Zep is ahead on LongMemEval answer correctness (~0.948 vs Midas 0.84). Midas leads on memory-layer recall@k, ingest cost and provenance.',
    },
    rows: [
      { feature: 'Memory model', midas: 'Flat tiered store + tags + provenance', rival: 'Temporal knowledge graph (Graphiti)', why: 'How much structure is extracted at write time.' },
      { feature: 'Persistence', midas: 'Embedded SQLite', rival: 'Hosted graph + vector store', why: 'Laptop vs cloud footprint.' },
      { feature: 'Ingest cost', midas: '$0 — no LLM in the write path', rival: 'LLM call per ingest to update the graph', why: 'Recurring spend per memory.' },
      { feature: 'Ingest latency', midas: '~116 ms cold (local embed)', rival: 'Hundreds of ms (LLM + graph write)', why: 'Blocks the agent on every turn.' },
      { feature: 'Determinism', midas: 'Same input → same memory', rival: 'LLM-graded graph updates can vary', why: 'Replay and audit.' },
      { feature: 'Delivery', midas: 'MCP-first + Python SDK', rival: 'Python/TS SDK + REST against Zep Cloud', why: 'How the host wires it in.' },
      { feature: 'Offline', midas: 'Yes', rival: 'Cloud-first; self-host available', why: 'Privacy and air-gapped use.' },
      { feature: 'LongMemEval-s answer', midas: '0.84 (gpt-4o, n=40)', rival: '~0.948 (Zep paper)', why: 'Zep leads on this dataset.' },
    ],
    sections: [
      {
        heading: 'Structure now vs structure on demand',
        body: [
          'Zep pays an LLM at write time to maintain a temporal knowledge graph: entities, relationships, validity intervals. That graph powers rich reasoning queries and is part of why Zep scores so high on LongMemEval-s — but it also means every memory write is an LLM call, and the resulting structure depends on the model and prompt.',
          'Midas takes the opposite stance: store the original turn with embeddings, tags and provenance, and only derive structure when recall actually needs it. That keeps ingest free, deterministic and auditable — at the cost of a lower answer-correctness headline today.',
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
      { q: 'Who scores higher on LongMemEval?', a: 'Zep (~0.948 published) is currently ahead of Midas (0.84 at gpt-4o, n=40) on answer correctness. Midas leads on memory-layer recall@k (0.95 vs a baseline 0.03) and on ingest cost ($0 LLM).' },
      { q: 'Which one is cheaper at scale?', a: 'Midas at ingest, by construction: no LLM on the write path. At read time, both cost roughly a vector + filter query.' },
    ],
    benchmarks: {
      recall: {
        midas: MIDAS_RECALL,
        baseline: BASELINE_RECALL,
        rival: {
          kind: 'na',
          reason:
            'Zep returns LLM-curated graph context, not raw source turn IDs on a fixed harness, so reader-independent recall@k is not directly comparable here.',
        },
      },
      answer: {
        midas: MIDAS_ANSWER,
        rival: { value: 0.948, reader: 'Zep full pipeline', source: 'Zep / Graphiti paper on LongMemEval' },
        honestNote:
          'Zep currently leads LongMemEval answer correctness (~0.948 vs Midas 0.84). Zep runs an LLM at every write to maintain its temporal knowledge graph; Midas does $0 LLM at ingest.',
      },
    },
    caveats: [
      'Zep is ahead of Midas on the LongMemEval-s answer-correctness headline (~0.948 vs 0.84).',
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
      both: 'Both are open and Python-friendly; the split is framework lock-in vs framework freedom. No published head-to-head benchmark exists.',
    },
    rows: [
      { feature: 'Framework coupling', midas: 'Framework-agnostic — MCP + plain Python SDK', rival: 'LangGraph / LangChain native', why: 'Whether memory drags a framework with it.' },
      { feature: 'Persistence', midas: 'Embedded SQLite', rival: 'LangGraph store (in-memory, Postgres, Redis, etc.)', why: 'Where memory actually lives.' },
      { feature: 'Ingest cost', midas: '$0 — no LLM at write', rival: 'LLM-driven extraction / reflection utilities', why: 'Per-write spend at agent scale.' },
      { feature: 'Delivery', midas: 'MCP-first (Claude, Cursor, Codex, Windsurf)', rival: 'Python imports inside a LangGraph app', why: 'How an IDE-side agent reaches it.' },
      { feature: 'Provenance', midas: 'Source pointer on every recall', rival: 'Depends on store + utility used', why: 'Audit which item drove a recall.' },
      { feature: 'Benchmark', midas: 'LongMemEval-s recall@k 0.95 · answer 0.84 (gpt-4o, n=40)', rival: 'No canonical published number', why: 'No like-for-like comparison exists.' },
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
      recall: {
        midas: MIDAS_RECALL,
        baseline: BASELINE_RECALL,
        rival: {
          kind: 'na',
          reason:
            'LangMem has no canonical recall@k benchmark — results depend entirely on the LangGraph store and the utilities you compose.',
        },
      },
      answer: {
        midas: MIDAS_ANSWER,
        rival: null,
        honestNote:
          'No published LangMem LongMemEval number exists for a like-for-like comparison. The absence of a bar is honest, not flattering.',
      },
    },
    caveats: [
      'LangMem inherits the full LangChain / LangGraph ecosystem: observability (LangSmith), tool integrations, prebuilt agent patterns. Midas brings none of that.',
      'If your stack is already LangGraph, LangMem is the path of least resistance — Midas would mean adding an MCP layer next to it.',
      'No published head-to-head against Midas exists; treat the comparison as architectural, not numeric.',
    ],
  },
]

export const COMPARISON_INDEX = COMPARISONS.map((c) => ({
  slug: c.slug,
  rival: c.rival,
  hookline: c.hookline,
  description: c.description,
  benchmarks: c.benchmarks,
}))
