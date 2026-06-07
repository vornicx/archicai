import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { GITHUB_URL } from '../constants'

type Row = {
  feature: string
  midas: string
  mem0: string
  why: string
}

const COMPARISON: Row[] = [
  { feature: 'Architecture', midas: 'Local-first SDK + MCP server', mem0: 'Hosted platform with optional self-host', why: 'Where the system of record lives.' },
  { feature: 'Persistence', midas: 'Embedded SQLite, zero deps in core', mem0: 'Vector DB (Qdrant/PGVector) + graph store', why: 'One file vs a stack to provision.' },
  { feature: 'Ingest cost', midas: '$0 — no LLM in the ingest path', mem0: 'LLM call per ingest for extraction', why: 'Recurring cost at agent scale.' },
  { feature: 'Ingest latency', midas: 'Single-digit ms (local embed + insert)', mem0: 'Hundreds of ms (LLM round-trip)', why: 'Blocks the agent on every write.' },
  { feature: 'Determinism', midas: 'Same input → same memory', mem0: 'LLM-graded, may vary across runs', why: 'Matters for replay and eval.' },
  { feature: 'Provenance', midas: 'Source-traceable recall by default', mem0: 'Available via metadata fields', why: 'Audit which item drove a recall.' },
  { feature: 'Delivery', midas: 'MCP-first (Claude, Cursor, Codex, Windsurf) + Python SDK', mem0: 'Python/TS SDKs + REST API', why: 'How the agent host wires it in.' },
  { feature: 'Offline', midas: 'Yes — runs without network', mem0: 'Cloud by default; self-host possible', why: 'Privacy and air-gapped workflows.' },
  { feature: 'Eval', midas: 'LongMemEval-S 0.95 · LoCoMo 0.85 (reproducible)', mem0: 'Published LoCoMo numbers, less direct repro', why: 'Can you re-run the claim?' },
  { feature: 'License', midas: 'Open source, run anywhere', mem0: 'Open-core + managed cloud', why: 'Lock-in and deployment freedom.' },
]

const FAQ = [
  {
    q: 'What is the main difference between Midas and mem0?',
    a: 'Midas is local-first and ships as a Python SDK plus MCP server with zero LLM calls in the ingest path. mem0 is a hosted platform (with a self-host option) that uses an LLM to extract and grade memories on every ingest. The result: Midas runs offline on a laptop with predictable $0 ingest cost; mem0 trades that for richer LLM-assisted extraction.',
  },
  {
    q: 'Why does Midas avoid an LLM at ingest?',
    a: 'LLM-based extraction is non-deterministic, expensive at scale, and adds latency to every write. Midas uses a deterministic local policy plus embeddings to decide what is worth keeping, which keeps ingest fast, free and auditable.',
  },
  {
    q: 'Can I use Midas with Claude, Cursor or Codex?',
    a: 'Yes. Midas runs as an MCP server, so any MCP-compatible host — Claude Desktop, Claude Code, Cursor, Codex, Windsurf — can give its agent durable memory without extra glue code.',
  },
  {
    q: 'How does Midas measure recall?',
    a: 'Midas ships with an eval harness over LongMemEval-S and LoCoMo using reader-independent recall@k. Current alpha: 0.95 on LongMemEval-S and 0.85 on LoCoMo, with reproducible commands in the repository.',
  },
]

function MidasVsMem0() {
  const url = 'https://archic.es/docs/comparisons/midas-vs-mem0'
  return (
    <>
      <Helmet>
        <title>Midas vs mem0 — local-first AI agent memory compared</title>
        <meta
          name="description"
          content="Technical comparison of Midas and mem0 for AI agent memory: architecture, ingest cost, recall, provenance, MCP delivery and eval. Local-first vs hosted."
        />
        <link rel="canonical" href={url} />
        <meta property="og:title" content="Midas vs mem0 — local-first AI agent memory compared" />
        <meta property="og:description" content="How Midas's local-first, SQLite-backed, MCP-first memory compares to mem0's LLM-graded hosted platform." />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Midas vs mem0 — local-first AI agent memory compared',
          description:
            "Technical comparison of Midas and mem0 for AI agent memory: architecture, ingest cost, recall, provenance, MCP delivery and eval.",
          url,
          author: { '@type': 'Organization', name: 'Archic', url: 'https://archic.es/' },
          publisher: { '@type': 'Organization', name: 'Archic', url: 'https://archic.es/' },
          mainEntityOfPage: url,
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Archic', item: 'https://archic.es/' },
            { '@type': 'ListItem', position: 2, name: 'Midas', item: 'https://archic.es/midas' },
            { '@type': 'ListItem', position: 3, name: 'Midas vs mem0', item: url },
          ],
        })}</script>
      </Helmet>

      <article className="section-padding">
        <div className="container-page space-y-16">
          {/* Header */}
          <header className="max-w-3xl space-y-6">
            <nav aria-label="Breadcrumb" className="text-[12px] uppercase tracking-[0.22em] text-[color:var(--muted-soft)]">
              <Link to="/" className="hover:text-[color:var(--gold-bright)]">Archic</Link>
              <span className="mx-2">/</span>
              <Link to="/midas" className="hover:text-[color:var(--gold-bright)]">Midas</Link>
              <span className="mx-2">/</span>
              <span>Midas vs mem0</span>
            </nav>
            <div className="section-label !mb-0">Comparison · AI agent memory</div>
            <h1 className="heading-serif text-[2.4rem] sm:text-[3rem] md:text-[3.6rem] font-light">
              Midas vs <span className="accent-remember">mem0</span>.
            </h1>
            <p className="text-lg leading-relaxed text-[color:var(--muted)]">
              Both Midas and mem0 give AI agents long-term memory — but they make opposite
              architectural bets. Midas is local-first, deterministic and MCP-native, with no LLM
              in the ingest path. mem0 is a hosted platform with LLM-graded extraction. This page
              compares the two so you can pick the right tool.
            </p>
          </header>

          {/* TL;DR */}
          <section className="editorial-panel editorial-panel--accent p-10 lg:p-12">
            <div className="section-label">TL;DR</div>
            <ul className="space-y-3 text-[15px] leading-relaxed text-[color:var(--muted)]">
              <li>
                <strong className="text-[color:var(--ink)]">Pick Midas</strong> when you want
                local persistence, $0 ingest, source-traceable recall, MCP-first delivery, and a
                reproducible eval harness.
              </li>
              <li>
                <strong className="text-[color:var(--ink)]">Pick mem0</strong> when you want a
                hosted memory service with LLM-graded extraction and a managed control plane.
              </li>
              <li>
                Both score competitively on LoCoMo; Midas adds reproducible LongMemEval-S
                recall@k 0.95 with reader-independent runs.
              </li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="heading-serif text-[1.8rem] md:text-[2.2rem]">Feature comparison</h2>
            <p className="text-[14px] text-[color:var(--muted-soft)] max-w-2xl">
              Side-by-side on the dimensions that matter for an agentic memory framework. The last
              column says why the row matters in production, not just on a slide.
            </p>
            <div className="card-panel overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-[14px]">
                  <thead>
                    <tr className="border-b border-[color:var(--line-strong)]">
                      <th className="px-5 py-4 font-medium text-[color:var(--muted-soft)] uppercase tracking-[0.18em] text-[11px] w-[20%]">Dimension</th>
                      <th className="px-5 py-4 font-medium text-[color:var(--gold-bright)] uppercase tracking-[0.18em] text-[11px] w-[30%]">Midas</th>
                      <th className="px-5 py-4 font-medium text-[color:var(--muted)] uppercase tracking-[0.18em] text-[11px] w-[30%]">mem0</th>
                      <th className="px-5 py-4 font-medium text-[color:var(--muted-soft)] uppercase tracking-[0.18em] text-[11px] w-[20%]">Why it matters</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON.map((row) => (
                      <tr key={row.feature} className="border-b border-[color:var(--line)] last:border-0 align-top hover:bg-[color:var(--line)]/30 transition-colors">
                        <td className="px-5 py-4 font-medium text-[color:var(--ink)]">{row.feature}</td>
                        <td className="px-5 py-4 text-[color:var(--ink)]">{row.midas}</td>
                        <td className="px-5 py-4 text-[color:var(--muted)]">{row.mem0}</td>
                        <td className="px-5 py-4 text-[13px] text-[color:var(--muted-soft)] italic">{row.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Flow example */}
          <section className="space-y-6">
            <h2 className="heading-serif text-[1.8rem] md:text-[2.2rem]">Example: ingest and recall in Midas</h2>
            <p className="text-[15px] leading-relaxed text-[color:var(--muted)] max-w-3xl">
              Concretely, here is what happens when an MCP-aware host (Claude Code, Cursor,
              Codex) talks to Midas. Persistence is SQLite; delivery is MCP. No network, no LLM
              on the write path.
            </p>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="card-panel p-6 space-y-3">
                <div className="section-label !mb-0">1 · Ingest</div>
                <p className="text-[13px] text-[color:var(--muted)]">
                  Agent calls the <code className="font-mono text-[12px] text-[color:var(--gold-bright)]">remember</code> MCP tool.
                  Midas embeds locally, scores importance with a deterministic policy, and writes
                  one row to SQLite.
                </p>
                <pre className="text-[12px] leading-relaxed bg-[color:var(--ink)]/[0.04] border border-[color:var(--line)] rounded-md p-4 overflow-x-auto font-mono"><code>{`// MCP tool call from Claude / Cursor / Codex
remember({
  text: "User prefers pnpm over npm for this repo.",
  source: "chat:2026-06-07#msg-481",
  tags: ["preference", "tooling"]
})

// Midas, internally:
//   embed(text)            -> local sentence-transformer
//   score(text, ctx)       -> deterministic policy
//   INSERT INTO memories   -> embedded SQLite (one file)
//   $0 cost · ~3 ms · no network`}</code></pre>
              </div>

              <div className="card-panel p-6 space-y-3">
                <div className="section-label !mb-0">2 · Recall</div>
                <p className="text-[13px] text-[color:var(--muted)]">
                  On the next turn, the host calls <code className="font-mono text-[12px] text-[color:var(--gold-bright)]">recall</code>.
                  Midas does a single SQLite query (vector + metadata) and returns ranked items
                  with their source pointer.
                </p>
                <pre className="text-[12px] leading-relaxed bg-[color:var(--ink)]/[0.04] border border-[color:var(--line)] rounded-md p-4 overflow-x-auto font-mono"><code>{`recall({ query: "which package manager?", k: 3 })

// → [
//   {
//     text: "User prefers pnpm over npm for this repo.",
//     score: 0.87,
//     source: "chat:2026-06-07#msg-481",
//     tags: ["preference", "tooling"]
//   },
//   ...
// ]
// One SELECT against SQLite. Provenance included.`}</code></pre>
              </div>
            </div>

            <div className="card-panel p-6 space-y-3">
              <div className="section-label !mb-0">3 · Wire it in (MCP-first)</div>
              <p className="text-[13px] text-[color:var(--muted)]">
                Two lines in the host's MCP config and the agent gains memory tools. No glue code,
                no adapter per IDE.
              </p>
              <pre className="text-[12px] leading-relaxed bg-[color:var(--ink)]/[0.04] border border-[color:var(--line)] rounded-md p-4 overflow-x-auto font-mono"><code>{`// ~/.claude/mcp.json  (or cursor / codex equivalent)
{
  "mcpServers": {
    "midas": {
      "command": "uvx",
      "args": ["midas-mcp", "--db", "~/.midas/agent.db"]
    }
  }
}`}</code></pre>
            </div>
          </section>



          {/* Architecture */}
          <section className="grid gap-10 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="heading-serif text-[1.6rem] md:text-[2rem]">Architecture: local-first vs hosted</h2>
              <p className="text-[15px] leading-relaxed text-[color:var(--muted)]">
                Midas is a Python package and an MCP server you run yourself. The core has zero
                external dependencies, persistence is embedded SQLite, and embeddings can be a
                local sentence-transformer. Nothing leaves the machine unless you wire it up.
              </p>
              <p className="text-[15px] leading-relaxed text-[color:var(--muted)]">
                mem0 ships as both an open-source library and a managed platform. The library
                pairs a vector store (Qdrant, PGVector, etc.) with an optional graph store and
                relies on an LLM to extract atomic memories on write. The hosted version handles
                infra for you.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="heading-serif text-[1.6rem] md:text-[2rem]">Ingest: $0 vs LLM-graded</h2>
              <p className="text-[15px] leading-relaxed text-[color:var(--muted)]">
                Every <code className="font-mono text-[13px] text-[color:var(--gold-bright)]">remember</code> in mem0
                typically triggers an LLM call to decide what's salient and how to phrase it. That
                buys richer extraction at the cost of latency, spend and non-determinism.
              </p>
              <p className="text-[15px] leading-relaxed text-[color:var(--muted)]">
                Midas keeps ingest LLM-free by design. A deterministic local policy plus embedding
                similarity decides what to keep. Writes are fast, free and reproducible — which
                matters when an agent is capturing thousands of items per session.
              </p>
            </div>
          </section>

          {/* What is AI agent memory */}
          <section className="space-y-4 max-w-3xl">
            <h2 className="heading-serif text-[1.6rem] md:text-[2rem]">What is AI agent memory?</h2>
            <p className="text-[15px] leading-relaxed text-[color:var(--muted)]">
              AI agent memory is the persistence layer that lets an LLM agent remember facts,
              decisions and prior interactions across sessions — beyond the context window. A
              memory framework decides what to store, how to recall it, and how to feed it back
              into the prompt. Both Midas and mem0 sit in this category, alongside tools like
              Letta (MemGPT), Zep and LangMem. They differ on where memory lives, who pays for
              ingest, and how recall is graded.
            </p>
            <p className="text-[15px] leading-relaxed text-[color:var(--muted)]">
              The practical question for engineers picking an AI agent memory framework in 2026 is
              less "which one stores vectors" and more: does ingest stay deterministic at scale,
              does recall stay traceable to a source, and can the agent run offline when needed.
              Those three questions are where Midas and mem0 diverge most.
            </p>
          </section>

          {/* Local-first */}
          <section className="space-y-4 max-w-3xl">
            <h2 className="heading-serif text-[1.6rem] md:text-[2rem]">Local-first by default</h2>
            <p className="text-[15px] leading-relaxed text-[color:var(--muted)]">
              Local-first means the system of record lives on the user's machine, not in a vendor
              cloud. With Midas, the agent's memory is a file on disk. No account, no API key, no
              network round-trip on the hot path. You can disconnect the laptop and the agent
              still remembers everything it learned yesterday.
            </p>
            <p className="text-[15px] leading-relaxed text-[color:var(--muted)]">
              mem0 can be self-hosted, but its happy path is the managed cloud: writes and reads
              hit a hosted control plane, and an LLM is invoked server-side per ingest. That is a
              valid trade — you offload infra — but it is not local-first. For agents that handle
              private code, customer data or regulated content, the difference shows up in the
              threat model, not just the latency budget.
            </p>
          </section>

          {/* SQLite */}
          <section className="space-y-4 max-w-3xl">
            <h2 className="heading-serif text-[1.6rem] md:text-[2rem]">SQLite-based persistence</h2>
            <p className="text-[15px] leading-relaxed text-[color:var(--muted)]">
              Midas persists to embedded SQLite. One file, no daemon, no separate vector database
              to provision. Embeddings sit next to metadata in the same store, which keeps recall
              joins cheap and makes the entire memory portable — copy the <code className="font-mono text-[13px] text-[color:var(--gold-bright)]">.db</code> file
              and the agent's history moves with it. Backups are <code className="font-mono text-[13px] text-[color:var(--gold-bright)]">cp</code>.
            </p>
            <p className="text-[15px] leading-relaxed text-[color:var(--muted)]">
              mem0 expects a vector store such as Qdrant or PGVector, often paired with a graph
              database for relationships. That architecture scales horizontally and supports
              richer queries, at the cost of more infrastructure to run and reason about. For
              single-user agents — coding copilots, research assistants, desktop tools — SQLite is
              usually the right amount of database.
            </p>
          </section>

          {/* MCP-first */}
          <section className="space-y-4 max-w-3xl">
            <h2 className="heading-serif text-[1.6rem] md:text-[2rem]">MCP-first delivery</h2>
            <p className="text-[15px] leading-relaxed text-[color:var(--muted)]">
              Midas ships as a Model Context Protocol (MCP) server first, Python SDK second. Any
              MCP-aware host — Claude Desktop, Claude Code, Cursor, Codex, Windsurf — picks up
              memory tools automatically, with no per-host integration code. Add the server to the
              host's config and the agent gains <code className="font-mono text-[13px] text-[color:var(--gold-bright)]">remember</code>,&nbsp;
              <code className="font-mono text-[13px] text-[color:var(--gold-bright)]">recall</code> and&nbsp;
              <code className="font-mono text-[13px] text-[color:var(--gold-bright)]">forget</code> tools immediately.
            </p>
            <p className="text-[15px] leading-relaxed text-[color:var(--muted)]">
              mem0 exposes Python and TypeScript SDKs plus a REST API. Wiring it into an MCP host
              means writing the MCP adapter yourself. That is fine for a backend service, but it
              is friction for desktop and IDE agents where MCP is now the default integration
              surface.
            </p>
          </section>

          {/* Recall */}
          <section className="space-y-4 max-w-3xl">
            <h2 className="heading-serif text-[1.6rem] md:text-[2rem]">Recall and eval</h2>
            <p className="text-[15px] leading-relaxed text-[color:var(--muted)]">
              Both projects publish numbers on LoCoMo. Midas adds reader-independent recall@k on
              LongMemEval-S (0.95) and LoCoMo (0.85), with the harness, datasets and reproduce
              commands in the repository so you can run them on your own embedder. The point is
              not who wins a single benchmark — it's whether you can reproduce the claim.
            </p>
          </section>

          {/* When to choose */}
          <section className="grid gap-5 md:grid-cols-2">
            <div className="doc-card">
              <h4>Choose Midas if…</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed text-[color:var(--muted)]">
                <li>You're building a coding, research or operational agent that runs locally.</li>
                <li>You need source-traceable recall and deterministic ingest.</li>
                <li>You want MCP-first delivery into Claude, Cursor, Codex or Windsurf.</li>
                <li>You care about reproducible benchmarks, not vendor claims.</li>
              </ul>
            </div>
            <div className="doc-card">
              <h4>Choose mem0 if…</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed text-[color:var(--muted)]">
                <li>You want a managed memory service with no infra to run.</li>
                <li>You're happy paying an LLM per ingest for richer extraction.</li>
                <li>You need a hosted control plane and dashboards out of the box.</li>
              </ul>
            </div>
          </section>

          {/* FAQ */}
          <section className="space-y-6">
            <h2 className="heading-serif text-[1.8rem] md:text-[2.2rem]">FAQ</h2>
            <div className="space-y-4">
              {FAQ.map((f) => (
                <details key={f.q} className="card-panel p-6 group">
                  <summary className="cursor-pointer text-[color:var(--ink)] font-medium list-none flex items-center justify-between gap-4">
                    <span>{f.q}</span>
                    <span aria-hidden className="text-[color:var(--gold)] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--muted)]">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="editorial-panel editorial-panel--accent p-10 lg:p-12 text-center">
            <div className="section-label justify-center">Try Midas</div>
            <h2 className="heading-serif text-[1.8rem] md:text-[2.2rem] mb-5">
              Run the alpha in one command.
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/midas" className="btn-primary">Midas overview</Link>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                GitHub
              </a>
            </div>
          </section>
        </div>
      </article>
    </>
  )
}

export default MidasVsMem0
