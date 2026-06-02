const ROADMAP = [
  'Scale LoCoMo runs to statistical significance.',
  'Add category breakdowns across all ten conversations.',
  'Move from in-memory/local stores toward sqlite-vec.',
  'Prototype hierarchical compression only after the eval loop is stable.',
]

function ExtendedDocs() {
  return (
    <section id="extended-docs" className="section-border section-padding">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-28">
            <div className="section-label">Operating model</div>
            <h2 className="heading-serif text-[2.5rem]">Measured first.</h2>
            <p className="text-muted mt-5 leading-relaxed">
              Midas should read as a serious research-backed product, not a broad
              platform promise. Each section points back to what exists today.
            </p>
          </aside>

          <div className="grid gap-5">
            <div className="glass-panel">
              <div className="glass-inner p-7 md:p-9">
                <div className="section-label">Evaluation commands</div>
                <div className="code-container">
                  <div><span className="code-comment"># full evaluation runner</span></div>
                  <div>uv run python -m eval.runner</div>
                  <div className="mt-3"><span className="code-comment"># LoCoMo, one conversation</span></div>
                  <div>uv run python -m eval.runner --dataset locomo --max-convs 1</div>
                  <div className="mt-3"><span className="code-comment"># local semantic retrieval</span></div>
                  <div>uv run --no-sync python -m eval.runner --dataset locomo --local</div>
                </div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="glass-panel">
                <div className="glass-inner p-7">
                  <div className="section-label">Why customers care</div>
                  <h3 className="heading-serif text-[2rem]">Less context loss in longer work.</h3>
                  <p className="text-muted mt-4 leading-relaxed">
                    Coding and research agents fail when the right past detail drops out
                    of the prompt. Midas targets that failure mode directly.
                  </p>
                </div>
              </div>

              <div className="glass-panel">
                <div className="glass-inner p-7">
                  <div className="section-label">Why builders care</div>
                  <h3 className="heading-serif text-[2rem]">A memory layer that can be tested.</h3>
                  <p className="text-muted mt-4 leading-relaxed">
                    The harness makes memory changes measurable, so teams can compare
                    retrieval choices instead of guessing from demos.
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
