function DocsSection() {
  return (
    <section id="docs" className="section-border section-padding">
      <div className="container-page">
        <div className="section-label">Midas Core Reference // SDK Architecture</div>

        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-16">
          {/* Sidebar */}
          <div className="flex flex-col gap-4" style={{ borderRight: '1px solid #161616', paddingRight: '2rem' }}>
            <a href="#concepts" className="font-mono font-bold text-[#FFFFFF] no-underline uppercase" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
              1. Core Concepts
            </a>
            <a href="#lifecycle" className="no-underline" style={{ color: '#8A8A8A', fontSize: '13px' }}>
              The memory lifecycle
            </a>
            <a href="#persistence" className="no-underline" style={{ color: '#8A8A8A', fontSize: '13px' }}>
              Persistence strategies
            </a>
            <div style={{ height: '1px', background: '#161616', margin: '0.5rem 0' }} />
            <a href="#api" className="font-mono font-bold text-[#FFFFFF] no-underline uppercase" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
              2. API Reference
            </a>
            <a href="#method-commit" className="no-underline" style={{ color: '#8A8A8A', fontSize: '13px' }}>
              Midas.commit()
            </a>
            <a href="#method-recall" className="no-underline" style={{ color: '#8A8A8A', fontSize: '13px' }}>
              Midas.recall()
            </a>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-16">
            <div id="concepts">
              <h3 className="heading-serif text-[1.6rem] mb-4">
                The memory lifecycle in long horizons
              </h3>
              <p className="text-[14px] leading-relaxed mb-6" style={{ color: '#8A8A8A' }}>
                Unlike traditional vector databases that store interactions passively,
                the Midas lifecycle consists of three automated phases that run in the background:
              </p>
              <ul className="flex flex-col gap-4 text-[14px] ml-6" style={{ color: '#8A8A8A' }}>
                <li className="leading-relaxed">
                  <strong style={{ color: '#FFFFFF', fontWeight: 500 }}>Immediate Consolidation:</strong>{' '}
                  Captures agent state changes and stores them in a low-latency
                  fast-access memory cache.
                </li>
                <li className="leading-relaxed">
                  <strong style={{ color: '#FFFFFF', fontWeight: 500 }}>Abstract Compression:</strong>{' '}
                  At the end of an execution block, Midas synthesizes key events
                  and connects them to the agent's historical graph.
                </li>
                <li className="leading-relaxed">
                  <strong style={{ color: '#FFFFFF', fontWeight: 500 }}>Context Pruning:</strong>{' '}
                  Deterministically removes redundant telemetry to ensure optimal{' '}
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#A78BFA' }}>recall</span>{' '}
                  without token waste.
                </li>
              </ul>
            </div>

            <div id="api" style={{ borderTop: '1px solid #161616', paddingTop: '4rem' }}>
              <h3 className="heading-serif text-[1.6rem] mb-4">
                Midas.commit(agentState)
              </h3>
              <p className="text-[14px] leading-relaxed mb-6" style={{ color: '#8A8A8A' }}>
                Asynchronously persists the current agent state. This method analyzes
                the agent's decision tree and generates a memory node indexed by
                relevance and temporality.
              </p>

              <div className="code-container mb-6">
                <div><span className="code-keyword">await</span> memory.commit({'{'}</div>
                <div>&nbsp;&nbsp;id: <span className="code-string">"task_098"</span>,</div>
                <div>&nbsp;&nbsp;logs: agent.getExecutionLogs(),</div>
                <div>&nbsp;&nbsp;metrics: {'{'} tokensUsed: 1420 {'}'},</div>
                <div>&nbsp;&nbsp;metadata: {'{'} priority: <span className="code-string">"high"</span> {'}'}</div>
                <div>{'}'});</div>
              </div>

              <div
                className="text-[13px] p-4 rounded"
                style={{ color: '#8A8A8A', background: '#0A0A0A', border: '1px solid #161616' }}
              >
                <span style={{ color: '#A78BFA', fontWeight: 500 }}>Technical note:</span>{' '}
                The <code style={{ fontFamily: 'JetBrains Mono, monospace' }}>commit()</code> method is idempotent.
                If the state has no significant structural mutations, Midas will update
                the graph pointer without duplicating vectors.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DocsSection
