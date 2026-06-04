function SdkSection() {
  return (
    <section id="docs" className="section-border section-padding">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <div className="section-label">Python SDK · MCP</div>
            <h2 className="heading-serif text-[2.7rem] md:text-[3.6rem]">Memory that remembers on its own.</h2>
            <p className="text-muted mt-5 max-w-[520px] leading-relaxed">
              Install the alpha as a library, or run it as an MCP server and your agent
              starts remembering by itself: Midas injects a memory policy, recalls relevant
              context, then captures durable facts as work happens — scoring importance and
              skipping trivia and duplicates, with no extraction LLM in the ingest path.
            </p>
            <p className="text-muted mt-4 max-w-[520px] text-[13px] leading-relaxed">
              One MCP server, every client:{' '}
              <span style={{ color: 'var(--gold-deep)' }}>Claude Code · Cursor · Codex · Windsurf · Claude Desktop</span>.
            </p>
          </div>

          <div className="code-container">
            <div><span className="code-comment"># library:  pip install ".[all]"   ·   global MCP:  uv tool install . --with mcp --with fastembed</span></div>
            <div><span className="code-keyword">from</span> midas <span className="code-keyword">import</span> Memory, LocalEmbedder, ContentImportance</div>
            <div className="mt-4">mem = Memory(embedder=LocalEmbedder(), importance_scorer=ContentImportance())</div>
            <div className="mt-4"><span className="code-comment"># auto-capture — kept only if it clears the relevance policy (no LLM):</span></div>
            <div>mem.capture(<span className="code-string">"Decision: primary database is PostgreSQL."</span>, kind=<span className="code-string">"constraint"</span>)  <span className="code-comment"># stored</span></div>
            <div>mem.capture(<span className="code-string">"haha yeah sounds good"</span>)  <span className="code-comment"># skipped — below the floor</span></div>
            <div className="mt-4">print(mem.assemble(<span className="code-string">"Which database did we pick?"</span>, token_budget=128))</div>
            <div className="mt-4"><span className="code-comment"># as an MCP server →  midas-mcp   (then: claude mcp add midas -- midas-mcp)</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SdkSection
