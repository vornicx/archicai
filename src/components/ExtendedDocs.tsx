const DOCS = [
  {
    title: 'Benchmarking',
    body: 'Detailed runs across LongMemEval-S and LoCoMo datasets, with reproducible commands.',
  },
  {
    title: 'Architecture',
    body: 'The underlying SQLite + local-embedding implementation, retention tiers and provenance.',
  },
  {
    title: 'MCP Protocol',
    body: 'How to connect Midas to any Model Context Protocol host — Claude, Cursor, Codex, Windsurf.',
  },
  {
    title: 'Research',
    body: 'Open research frontier on calibrated uncertainty, selective forgetting and consolidation.',
  },
]

function ExtendedDocs() {
  return (
    <section id="extended-docs" className="section-padding">
      <div className="container-page space-y-12">
        <div className="max-w-2xl">
          <div className="section-label">Operating Model</div>
          <h2 className="heading-serif text-[2.2rem] md:text-[2.8rem]">Alpha, not vapor.</h2>
          <p className="mt-5 leading-relaxed text-[color:var(--muted)]">
            The page points to what exists today: install, run, remember, recall, maintain and
            benchmark. The roadmap stays narrow because the product is proving memory before
            expanding the platform.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {DOCS.map((d) => (
            <div key={d.title} className="doc-card">
              <h4>{d.title}</h4>
              <p className="text-sm leading-relaxed text-[color:var(--muted)]">{d.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExtendedDocs
