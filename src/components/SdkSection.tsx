function SdkSection() {
  return (
    <section id="docs" className="section-padding">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="section-label !mb-0">Python SDK + MCP</div>
            <h2 className="heading-serif text-[2.4rem] md:text-[3.25rem]">
              Memory that remembers on its own.
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-[color:var(--muted)]">
              Install the alpha as a library, or run it as an MCP server and your agent starts
              remembering by itself — scoring importance, skipping trivia, with no extraction LLM
              in the ingest path.
            </p>
            <div className="rounded-lg border border-[color:var(--gold)]/25 bg-[color:var(--gold)]/5 p-4 font-mono text-xs text-[color:var(--gold-bright)]">
              Supported: Claude Code · Cursor · Codex · Windsurf · Claude Desktop
            </div>
          </div>

          <div className="code-window">
            <div className="code-window-bar">
              <span /><span /><span />
            </div>
            <div className="code-window-body">
              <pre>
<span className="code-comment"># library: pip install ".[all]"</span>
<span className="code-keyword">from</span> midas <span className="code-keyword">import</span> Memory, LocalEmbedder

<span className="code-comment"># initialize with local persistence</span>
mem = Memory(embedder=LocalEmbedder())

<span className="code-comment"># auto-capture, kept only if it passes the relevance policy</span>
mem.capture(<span className="code-string">"Decision: primary database is PostgreSQL"</span>)

<span className="code-comment"># deterministic retrieval with provenance</span>
print(mem.assemble(<span className="code-string">"Which database did we pick?"</span>, token_budget=<span className="code-keyword">128</span>))
<span className="code-comment"># &gt;&gt; "PostgreSQL (confidence: 0.98)"</span>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SdkSection
