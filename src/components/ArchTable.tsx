const ROWS = [
  {
    dim: 'Product shape',
    midas: 'Framework-agnostic Python SDK, MCP server and reproducible eval harness. Runs locally, scales globally.',
  },
  {
    dim: 'Ingest path',
    midas: 'Local embeddings and local importance scoring. $0 API spend at ingest. No data leaves your infrastructure.',
  },
  {
    dim: 'Auditability',
    midas: 'Recall returns source turns, timestamps and provenance the agent can inspect — no rewritten facts.',
  },
  {
    dim: 'Lifecycle',
    midas: 'Belief revision, selective forgetting, temporal tiers and extractive consolidation. It evolves with the session.',
  },
  {
    dim: 'Agent integration',
    midas: 'One MCP server for Claude Code, Cursor, Codex and Windsurf — injects a memory policy so the agent recalls and captures on its own.',
  },
]

function ArchTable() {
  return (
    <section id="architecture" className="section-padding">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-6">
              <div className="section-label !mb-0">Architecture</div>
              <h2 className="heading-serif text-[2.2rem] md:text-[2.6rem]">
                A memory layer, not a promise deck.
              </h2>
              <p className="text-sm leading-relaxed text-[color:var(--muted)]">
                Midas is the active Archic wedge: one concrete SDK that agents can run today,
                with local-first defaults and measurable behavior.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-10">
              <div className="grid grid-cols-12 gap-6 border-b border-[color:var(--line-strong)] pb-5">
                <div className="col-span-4 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted-soft)]">Dimension</div>
                <div className="col-span-8 text-[10px] uppercase tracking-[0.22em] text-[color:var(--gold)]">Midas approach</div>
              </div>

              {ROWS.map((row) => (
                <div key={row.dim} className="grid grid-cols-12 gap-6 group">
                  <div className="col-span-12 sm:col-span-4 font-display text-lg font-medium text-[color:var(--ink-strong)] transition-colors group-hover:text-[color:var(--gold-bright)]">
                    {row.dim}
                  </div>
                  <div className="col-span-12 sm:col-span-8 leading-relaxed text-[color:var(--muted)]">
                    {row.midas}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArchTable
