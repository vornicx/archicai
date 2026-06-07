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
              <pre
                dangerouslySetInnerHTML={{
                  __html: [
                    '<span class="code-comment"># library: pip install ".[all]"</span>',
                    '<span class="code-keyword">from</span> midas <span class="code-keyword">import</span> Memory, LocalEmbedder',
                    '',
                    '<span class="code-comment"># initialize with local persistence</span>',
                    'mem = Memory(embedder=LocalEmbedder())',
                    '',
                    '<span class="code-comment"># auto-capture — kept only if it passes the policy</span>',
                    'mem.capture(<span class="code-string">"Decision: primary db is PostgreSQL"</span>)',
                    '',
                    '<span class="code-comment"># deterministic retrieval with provenance</span>',
                    'print(mem.assemble(<span class="code-string">"Which db did we pick?"</span>, token_budget=<span class="code-keyword">128</span>))',
                    '<span class="code-comment"># &gt;&gt; "PostgreSQL (confidence: 0.98)"</span>',
                  ].join('\n'),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SdkSection
