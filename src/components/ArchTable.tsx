const ROWS = [
  {
    dim: 'Product shape',
    baseline: 'Raw transcript or vector retrieval glued around an agent loop.',
    midas: 'Framework-agnostic Python SDK plus evaluation harness.',
  },
  {
    dim: 'Proof loop',
    baseline: 'Often judged by demos or anecdotal retrieval quality.',
    midas: 'Recall, correctness and efficiency are measured on repeatable runs.',
  },
  {
    dim: 'Current goal',
    baseline: 'Retrieve plausible nearby text.',
    midas: 'Build compact context that helps the agent answer long-horizon questions.',
  },
  {
    dim: 'Roadmap',
    baseline: 'More documents, larger context windows, more prompt glue.',
    midas: 'Scale evals, sqlite-vec store, hierarchical compression and one deep framework integration.',
  },
]

function ArchTable() {
  return (
    <section id="architecture" className="section-border section-padding">
      <div className="container-page">
        <div className="section-label">Architecture</div>
        <div className="mb-10 max-w-[760px]">
          <h2 className="heading-serif text-[2.7rem] md:text-[3.8rem]">
            A narrower foundation for reliable agent context.
          </h2>
          <p className="text-muted mt-5 text-[1.05rem] leading-relaxed">
            The Archic ecosystem is parked while Midas proves the memory layer. The site
            should sell that discipline: one wedge, one benchmark loop, one concrete SDK.
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
