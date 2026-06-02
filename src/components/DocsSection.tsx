function DocsSection() {
  return (
    <section id="docs" className="section-border section-padding">
      <div className="container-page">
        <div className="section-label">Midas Core Reference</div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[250px_1fr]">
          <div className="text-muted flex flex-col gap-4 text-[13px]">
            <a href="#concepts" className="no-underline" style={{ color: 'var(--gold-deep)' }}>
              Core concepts
            </a>
            <a href="#api" className="no-underline" style={{ color: 'var(--muted)' }}>
              Python memory facade
            </a>
            <a href="#eval" className="no-underline" style={{ color: 'var(--muted)' }}>
              Evaluation harness
            </a>
          </div>

          <div className="flex flex-col gap-8">
            <div id="concepts" className="glass-panel">
              <div className="glass-inner p-7">
                <h3 className="heading-serif mb-4 text-[2rem]">The memory lifecycle in long horizons</h3>
                <p className="text-muted leading-relaxed">
                  Midas stores memories, retrieves relevant context and measures whether
                  the returned context improves long-horizon answers.
                </p>
              </div>
            </div>

            <div id="api" className="glass-panel">
              <div className="glass-inner p-7">
                <h3 className="heading-serif mb-4 text-[2rem]">Memory.remember() and build_context()</h3>
                <p className="text-muted mb-6 leading-relaxed">
                  The current product shape is a framework-agnostic Python SDK, not a
                  TypeScript package or broad multi-agent platform.
                </p>
                <div className="code-container">
                  <div>memory.remember(<span className="code-string">"Important project fact"</span>, kind=<span className="code-string">"fact"</span>)</div>
                  <div>context = memory.build_context(<span className="code-string">"What matters now?"</span>, token_budget=1024)</div>
                </div>
              </div>
            </div>

            <div id="eval" className="glass-panel">
              <div className="glass-inner p-7">
                <h3 className="heading-serif mb-4 text-[2rem]">Evaluation harness</h3>
                <p className="text-muted leading-relaxed">
                  The harness tracks recall, answer correctness and efficiency so memory
                  changes can be compared under the same conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DocsSection
