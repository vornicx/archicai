const RESULTS = [
  { name: 'Recency window', longmem: '0.03', locomo: '0.02', ingest: 'N/A' },
  { name: 'Midas', longmem: '0.95', locomo: '0.85', ingest: '$0 / no egress' },
]

function Benchmarks() {
  return (
    <section id="benchmarks" className="section-border section-padding">
      <div className="container-page">
        <div className="benchmarks-grid grid gap-8 lg:grid-cols-[0.78fr_1fr]">
          <div>
            <div className="section-label">Evaluation harness</div>
            <h2 className="heading-serif text-[2.7rem] md:text-[3.7rem]">
              Benchmarked where memory can be isolated.
            </h2>
            <p className="text-muted mt-6 max-w-[520px] text-[1.05rem] leading-relaxed">
              Midas leads with deterministic recall@k and structural ingest cost, not
              demo anecdotes. The alpha ships with the eval harness, reproduce commands,
              latency instrumentation and honest caveats in the repo.
            </p>
          </div>

          <div className="glass-panel">
            <div className="glass-inner p-6 md:p-8">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="section-label !mb-2">Reader-independent recall</div>
                  <h3 className="heading-serif text-[2rem]">Current alpha results</h3>
                </div>
                <span className="rounded-full px-3 py-1 text-[12px]" style={{ background: 'rgba(184,148,60,0.13)', color: 'var(--gold-deep)' }}>
                  bge-base, no LLM ingest
                </span>
              </div>

              <div>
                <table className="w-full text-left text-[14px]">
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--line)' }}>
                      <th className="pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">System</th>
                      <th className="pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">LongMemEval-s</th>
                      <th className="pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">LoCoMo</th>
                      <th className="pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Ingest</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RESULTS.map((row) => (
                      <tr key={row.name} style={{ borderBottom: '1px solid var(--line)' }}>
                        <td className="py-4 font-medium">{row.name}</td>
                        <td className="py-4">{row.longmem}</td>
                        <td className="py-4">{row.locomo}</td>
                        <td className="py-4">{row.ingest}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="gold-line my-6" />
              <p className="text-muted text-[14px] leading-relaxed">
                LongMemEval-s uses n=40 buried-evidence questions; LoCoMo uses 5 conversations,
                n=50. Midas also reports 0.82 answer correctness with gpt-4.1-mini and ties
                0.84 at gpt-4o against LLM-ingest SOTA, while keeping ingest local. On a
                500-session haystack (~4,944 turns) it assembles a bounded ~480-token context
                where keep-everything-in-context designs overflow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Benchmarks
