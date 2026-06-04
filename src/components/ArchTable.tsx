const ROWS = [
  {
    dim: 'Product shape',
    baseline: 'Raw transcripts, broad context windows, or LLM-extracted memory facts.',
    midas: 'Framework-agnostic Python SDK, MCP server and reproducible eval harness.',
  },
  {
    dim: 'Ingest path',
    baseline: 'Send every session through an LLM to summarize or extract memories.',
    midas: 'Local embeddings, local ranking and local importance scoring. $0 API spend at ingest.',
  },
  {
    dim: 'Auditability',
    baseline: 'Return rewritten facts that can hide extraction-time hallucinations.',
    midas: 'Recall returns source turns, timestamps and provenance the agent can inspect.',
  },
  {
    dim: 'Memory lifecycle',
    baseline: 'Let stores grow or prune by simple recency.',
    midas: 'Belief revision, selective forgetting, temporal tiers and extractive consolidation.',
  },
]

function ArchTable() {
  return (
    <section id="architecture" className="section-border section-padding">
      <div className="container-page">
        <div className="section-label">Architecture</div>
        <div className="mb-10 max-w-[760px]">
          <h2 className="heading-serif text-[2.7rem] md:text-[3.8rem]">
            The alpha is a memory layer, not a promise deck.
          </h2>
          <p className="text-muted mt-5 text-[1.05rem] leading-relaxed">
            Midas is the active Archic wedge: one concrete SDK that agents can run today,
            with local-first defaults and measurable behavior before any broader platform
            layer is widened.
          </p>
        </div>

        <div className="glass-panel">
          <div className="glass-inner overflow-x-auto p-5 md:p-8">
            <table className="w-full min-w-[680px] text-left text-[14px]" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--line)' }}>
                  <th className="pb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Dimension</th>
                  <th className="pb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Common baseline</th>
                  <th className="pb-5 font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: 'var(--gold-deep)' }}>Midas</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.dim} style={{ borderBottom: '1px solid var(--line)' }}>
                    <td className="py-5 font-semibold">{row.dim}</td>
                    <td className="py-5 text-muted">{row.baseline}</td>
                    <td className="py-5">{row.midas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArchTable
