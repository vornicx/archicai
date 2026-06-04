const TRUTHS = [
  {
    num: '01',
    title: 'Memory is a systems problem, not an embeddings problem',
    desc: 'Indexing vectors is not remembering. The Midas SDK implements dynamic execution graphs that allow agents to consolidate experiences and discard noise autonomously.',
  },
  {
    num: '02',
    title: 'If it is not deterministic, it is not infrastructure',
    desc: 'Enterprise software cannot depend on luck. We evaluate every iteration through a strict eval harness that measures real Recall@K under complex information loss.',
  },
  {
    num: '03',
    title: 'Open engineering over marketing promises',
    desc: 'We share our limitations with the same transparency as our successes. We prefer a verified recall of 0.83 over a commercial promise of perfection.',
  },
]

function Manifesto() {
  return (
    <section id="research" className="section-border section-padding">
      <div className="container-page">
        <div className="section-label">Manifesto // Why Archic Exists</div>

        <h2 className="heading-serif" style={{ fontSize: '2.5rem', maxWidth: '800px', marginBottom: '1rem' }}>
          Toward deterministic context persistence.
        </h2>

        <p className="text-[1.1rem] leading-relaxed mb-16" style={{ color: 'var(--muted)', maxWidth: '700px' }}>
          The current state of AI agents suffers from{' '}
          <strong style={{ color: 'var(--ink-strong)', fontWeight: 500 }}>structural amnesia</strong>.
          Contemporary architectures rely on massive context windows or generic RAG layers.
          Both are expensive patches that fail at scale.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRUTHS.map((t) => (
            <div key={t.num} className="card-panel p-10">
              <div className="heading-serif" style={{ fontSize: '4rem', color: 'var(--gold)', lineHeight: 1, marginBottom: '1.5rem', opacity: 0.85 }}>
                {t.num}
              </div>
              <h3 className="font-mono text-[12px] font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--ink-strong)' }}>
                {t.title}
              </h3>
              <p className="text-[14px] leading-relaxed" style={{ color: 'var(--muted)' }}>
                {t.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Manifesto
