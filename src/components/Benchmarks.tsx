function Benchmarks() {
  return (
    <section id="benchmarks" className="section-border section-padding">
      <div className="container-page">
        <div className="section-label">Empirical Evaluation // Recall Metrics</div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10">
          <div className="card-panel p-14">
            <div className="flex items-baseline gap-6 mb-6">
              <div className="heading-serif" style={{ fontSize: '7rem', lineHeight: 1 }}>
                0.83
              </div>
              <div className="font-mono text-[12px] uppercase tracking-wider" style={{ color: '#8A8A8A' }}>
                Recall@K [n=150]
              </div>
            </div>
            <p className="text-[14px] leading-relaxed" style={{ color: '#8A8A8A', maxWidth: '440px' }}>
              Measured advantage verified deterministically under continuous context
              injection workloads. Midas preserves the agent's execution path where
              standard vector retrieval collapses.
            </p>
          </div>

          <div className="card-panel p-10 flex flex-col justify-center">
            <div className="pl-6" style={{ borderLeft: '1px solid #333' }}>
              <p className="heading-serif italic mb-4" style={{ fontSize: '1.3rem' }}>
                "Open and rigorous."
              </p>
              <p className="text-[14px] leading-relaxed" style={{ color: '#8A8A8A' }}>
                The +0.29 lead remains consistent throughout extended execution horizons.
                We maintain an open-notebook policy regarding infrastructure boundaries
                to ensure empirical reproducibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Benchmarks
