function SdkSection() {
  return (
    <section id="docs" className="section-border section-padding">
      <div className="container-page">
        <div className="section-label">Core Integration</div>
        <div className="code-container">
          <div><span className="code-keyword">import</span> {'{'} MidasMemory {'}'} <span className="code-keyword">from</span> <span className="code-string">"@archic/midas"</span>;</div>
          <div style={{ marginTop: '0.5rem' }}><span className="code-comment">// Initialize the physical persistence layer</span></div>
          <div><span className="code-keyword">const</span> memory = <span className="code-keyword">new</span> MidasMemory({'{'} horizon: <span className="code-string">"14d"</span> {'}'});</div>
          <div style={{ marginTop: '0.5rem' }}><span className="code-keyword">await</span> memory.commit(agentState);</div>
          <div><span className="code-keyword">const</span> context = <span className="code-keyword">await</span> memory.recall(query);</div>
        </div>
      </div>
    </section>
  )
}

export default SdkSection
