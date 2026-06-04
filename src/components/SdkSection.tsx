function SdkSection() {
  return (
    <section id="docs" className="section-border section-padding">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <div className="section-label">Python SDK</div>
            <h2 className="heading-serif text-[2.7rem] md:text-[3.6rem]">Memory as an agent primitive.</h2>
            <p className="text-muted mt-5 max-w-[520px] leading-relaxed">
              Install the alpha as a library or run it as an MCP server. Agents can
              remember decisions, recall source-traceable context and assemble compact
              prompt blocks without an extraction LLM in the ingest path.
            </p>
          </div>

          <div className="code-container">
            <div><span className="code-comment"># pip install ".[all]" inside the Midas repo</span></div>
            <div><span className="code-keyword">from</span> midas <span className="code-keyword">import</span> Memory, LocalEmbedder, ContentImportance</div>
            <div className="mt-4">mem = Memory(</div>
            <div>&nbsp;&nbsp;embedder=LocalEmbedder(),</div>
            <div>&nbsp;&nbsp;importance_scorer=ContentImportance(),</div>
            <div>)</div>
            <div className="mt-4">mem.remember(<span className="code-string">"Decision: primary database is PostgreSQL."</span>, kind=<span className="code-string">"constraint"</span>)</div>
            <div>mem.remember(<span className="code-string">"The launch date moved to September 14."</span>, kind=<span className="code-string">"fact"</span>)</div>
            <div className="mt-4">print(mem.assemble(<span className="code-string">"When do we launch?"</span>, token_budget=128))</div>
            <div className="mt-4"><span className="code-comment"># MCP: python -m midas.mcp_server</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SdkSection
