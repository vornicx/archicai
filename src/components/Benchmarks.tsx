const RESULTS = [
  { name: 'Baseline raw', recall: '0.00', correct: '0.05', efficiency: '0.10' },
  { name: 'Mem0', recall: '-', correct: '0.30', efficiency: '0.61' },
  { name: 'Midas', recall: '0.83', correct: '0.38', efficiency: '0.77' },
]

function Benchmarks() {
  return (
    <section id="benchmarks" className="section-border section-padding">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <div className="section-label">Evaluation harness</div>
            <h2 className="heading-serif text-[2.7rem] md:text-[3.7rem]">
              Built as an open benchmark, not a slide claim.
            </h2>
            <p className="text-muted mt-6 max-w-[520px] text-[1.05rem] leading-relaxed">
              Midas is being developed around LoCoMo-style long-context evaluation:
              recall, answer correctness and token efficiency are measured before the
              architecture is widened.
            </p>
          </div>

          <div className="glass-panel">
            <div className="glass-inner p-6 md:p-8">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="section-label !mb-2">LoCoMo fair fight</div>
                  <h3 className="heading-serif text-[2rem]">n=40 current run</h3>
                </div>
                <span className="rounded-full px-3 py-1 text-[12px]" style={{ background: 'rgba(184,148,60,0.13)', color: 'var(--gold-deep)' }}>
                  bge-base setup
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] text-left text-[14px]">
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--line)' }}>
                      <th className="pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">System</th>
                      <th className="pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Recall@K</th>
                      <th className="pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Correct</th>
                      <th className="pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Efficiency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RESULTS.map((row) => (
                      <tr key={row.name} style={{ borderBottom: '1px solid var(--line)' }}>
                        <td className="py-4 font-medium">{row.name}</td>
                        <td className="py-4">{row.recall}</td>
                        <td className="py-4">{row.correct}</td>
                        <td className="py-4">{row.efficiency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="gold-line my-6" />
              <p className="text-muted text-[14px] leading-relaxed">
                The +0.08 correctness gap over Mem0 is about three questions in this run,
                roughly one standard error. The next research milestone is n=150+ before
                positioning it as a statistically defensible win.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Benchmarks
