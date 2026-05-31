function Whitepaper() {
  return (
    <section id="whitepaper" className="section-border section-padding">
      <div className="container-page">
        <div className="section-label">Publications // Technical Reports</div>

        <div className="card-panel p-16" style={{ display: 'grid', gridTemplateColumns: '1fr 250px', gap: '4rem', alignItems: 'center' }}>
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest block mb-4" style={{ color: '#8A8A8A' }}>
              ARCHIC-TR-2026-01 // Technical Preprint
            </span>
            <h3 className="heading-serif" style={{ fontSize: '2rem', lineHeight: 1.2, marginBottom: '1.5rem' }}>
              Architecting Graph-Based State Consolidation for Long-Horizon Agent Memory
            </h3>
            <p className="text-[14.5px] leading-relaxed" style={{ color: '#8A8A8A', maxWidth: '600px' }}>
              Our formal technical report breaks down the mathematical foundations
              supporting asynchronous context persistence and hallucination mitigation
              in enterprise multi-agent execution.
            </p>
          </div>
          <div className="text-right">
            <a href="#" className="btn-primary block w-full text-center py-4">
              Download PDF
            </a>
            <a href="#abstract" className="block w-full text-center text-[13px] mt-4 no-underline" style={{ color: '#8A8A8A' }}>
              Read Abstract online &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Whitepaper
