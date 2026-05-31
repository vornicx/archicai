function Pillars() {
  return (
    <section className="section-border section-padding">
      <div className="container-page">
        <div className="section-label">Architecture // Three Pillars</div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-panel p-10">
            <h3 className="heading-serif italic text-xl mb-4">Measure.</h3>
            <p className="text-[14px] leading-relaxed" style={{ color: '#8A8A8A' }}>
              We do not optimize blindly. Every structural change in the memory SDK
              is measured under a strict evaluation harness with zero tolerance
              for context hallucinations.
            </p>
          </div>

          <div className="card-panel p-10">
            <h3 className="heading-serif italic text-xl mb-4">Remember.</h3>
            <p className="text-[14px] leading-relaxed" style={{ color: '#8A8A8A' }}>
              We build abstraction layers so agents retain abstract plans and execution
              threads during complex long-horizon runs.
            </p>
          </div>

          <div className="card-panel p-10">
            <h3 className="heading-serif italic text-xl mb-4">Act.</h3>
            <p className="text-[14px] leading-relaxed" style={{ color: '#8A8A8A' }}>
              Memory without utility is noise. Midas transforms historical data retention
              into precise, deterministic tool calls for the agent.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pillars
