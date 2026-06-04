const ROADMAP = [
  'Tighten larger-sample benchmark runs while keeping recall@k primary.',
  'Improve novelty-vs-store salience for better no-LLM retention.',
  'Deepen framework integrations around MCP and LangGraph.',
  'Keep abstention and calibrated uncertainty as the open research frontier.',
]

function ExtendedDocs() {
  return (
    <section id="extended-docs" className="section-border section-padding">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-28">
            <div className="section-label">Operating model</div>
            <h2 className="heading-serif text-[2.5rem]">Alpha, not vapor.</h2>
            <p className="text-muted mt-5 leading-relaxed">
              The page now points to what exists today: install, run, remember, recall,
              maintain and benchmark. The roadmap stays narrow because the product is
              proving memory before expanding the platform.
            </p>
          </aside>

          <div className="grid gap-5">
            <div className="glass-panel">
              <div className="glass-inner p-7 md:p-9">
                <div className="section-label">Evaluation commands</div>
                <div className="code-container">
                  <div><span className="code-comment"># deterministic retrieval benchmark, no API key</span></div>
                  <div>python -m eval.runner --dataset longmemeval --variant s --local --midas-no-rerank --max-questions 15 --limit 20 --seed 0</div>
                  <div className="mt-3"><span className="code-comment"># retention: bounded memory vs recency/random controls</span></div>
                  <div>python -m eval.retention --dataset locomo --max-convs 1 --local --derive-importance</div>
                  <div className="mt-3"><span className="code-comment"># MCP server — connect Claude Code, Cursor, Codex, Windsurf</span></div>
                  <div>claude mcp add midas -- midas-mcp</div>
                </div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="glass-panel">
                <div className="glass-inner p-7">
                  <div className="section-label">Why customers care</div>
                  <h3 className="heading-serif text-[2rem]">Memory without data egress.</h3>
                  <p className="text-muted mt-4 leading-relaxed">
                    Teams can give agents durable recall without sending every turn to
                    an extraction model. That changes the cost and privacy shape of
                    long-running assistants.
                  </p>
                </div>
              </div>

              <div className="glass-panel">
                <div className="glass-inner p-7">
                  <div className="section-label">Why builders care</div>
                  <h3 className="heading-serif text-[2rem]">A memory layer they can inspect.</h3>
                  <p className="text-muted mt-4 leading-relaxed">
                    Recall returns source turns rather than rewritten facts, and the
                    harness makes retrieval, retention and cost changes measurable.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-panel">
              <div className="glass-inner p-7 md:p-9">
                <div className="section-label">Next research milestones</div>
                <div className="grid gap-3 md:grid-cols-2">
                  {ROADMAP.map((item) => (
                    <div className="metric-card" key={item}>
                      <p className="leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExtendedDocs
