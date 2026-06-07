const RESULTS = [
  { name: 'Recency window', longmem: '0.03', locomo: '0.02', ingest: 'N/A', highlight: false },
  { name: 'Midas (Alpha)', longmem: '0.95', locomo: '0.85', ingest: '$0 / no egress', highlight: true },
]

function Benchmarks() {
  return (
    <section id="benchmarks" className="section-padding">
      <div className="container-page space-y-12">
        <div className="max-w-3xl">
          <div className="section-label">Evaluation Harness</div>
          <h2 className="heading-serif text-[2.5rem] md:text-[3.75rem]">
            Benchmarked where memory can be isolated.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[color:var(--muted)]">
            Midas leads with deterministic recall@k and structural ingest cost, not demo anecdotes.
            The alpha ships with the eval harness, reproduce commands and honest caveats in the repo.
          </p>
        </div>

        <div className="editorial-panel overflow-x-auto">
          <table className="editorial-table min-w-[640px]">
            <thead>
              <tr>
                <th>System</th>
                <th>LongMemEval-S</th>
                <th>LoCoMo</th>
                <th>Ingest Cost</th>
              </tr>
            </thead>
            <tbody>
              {RESULTS.map((row) => (
                <tr key={row.name} className={row.highlight ? 'is-highlight' : ''}>
                  <td className={row.highlight ? 'text-[color:var(--gold-bright)] font-bold' : 'font-mono text-[color:var(--muted)]'}>
                    {row.name}
                  </td>
                  <td className={row.highlight ? 'font-bold' : ''}>{row.longmem}</td>
                  <td className={row.highlight ? 'font-bold' : ''}>{row.locomo}</td>
                  <td className={row.highlight ? 'font-bold text-[color:var(--gold-bright)]' : ''}>{row.ingest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Benchmarks
