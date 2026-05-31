const ROWS = [
  {
    dim: 'Temporal Horizon',
    rag: 'Minutes / Hours. Attention degradation via noise.',
    archic: 'Days / Weeks of continuous execution without state drift.',
  },
  {
    dim: 'Retrieval Mechanism',
    rag: 'Superficial K-NN semantic embedding distance.',
    archic: 'Hierarchical execution state graph consolidation.',
  },
  {
    dim: 'Context Window Load',
    rag: 'Linearly redundant (Unbounded token growth).',
    archic: 'Deterministic pruning optimized via algorithmic relevance.',
  },
  {
    dim: 'Production Validation',
    rag: 'Heuristic / Non-deterministic benchmarks.',
    archic: 'Measured via an open-source Evaluation Harness.',
  },
]

function ArchTable() {
  return (
    <section id="architecture" className="section-border section-padding">
      <div className="container-page">
        <div className="section-label">Architectural Paradigm // Comparison</div>
        <h2 className="heading-serif" style={{ fontSize: '2rem', marginBottom: '3rem' }}>
          Moving Beyond Traditional Vector RAG
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <table className="w-full text-left" style={{ borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #161616' }}>
                <th className="font-mono text-[11px] uppercase tracking-wider font-normal pb-6" style={{ color: '#8A8A8A' }}>
                  Technical Dimension
                </th>
                <th className="font-mono text-[11px] uppercase tracking-wider font-normal pb-6" style={{ color: '#8A8A8A' }}>
                  Standard Vector RAG
                </th>
                <th className="font-mono text-[11px] uppercase tracking-wider font-normal pb-6" style={{ color: '#FFFFFF' }}>
                  Archic Midas Engine
                </th>
              </tr>
            </thead>
            <tbody style={{ color: '#8A8A8A' }}>
              {ROWS.map((r) => (
                <tr key={r.dim} style={{ borderBottom: '1px solid #161616' }}>
                  <td className="py-6 font-medium" style={{ color: '#FFFFFF' }}>{r.dim}</td>
                  <td className="py-6">{r.rag}</td>
                  <td className="py-6" style={{ color: '#FFFFFF' }}>{r.archic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default ArchTable
