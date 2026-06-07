import { GITHUB_URL } from '../constants'

const SIGNALS = [
  { label: 'LongMemEval-S', value: '0.95' },
  { label: 'LoCoMo', value: '0.85' },
  { label: 'LLM Ingest', value: '$0' },
]

function Hero() {
  return (
    <section id="top" className="section-padding">
      <div className="container-page">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-block rounded-full border border-[color:var(--gold)]/30 px-3 py-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[color:var(--gold)]">
                Midas by Archic
              </span>
            </div>
            <h1 className="heading-serif text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] font-light">
              Local-first memory for agents that <span className="accent-remember">remember.</span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-[color:var(--muted)] md:text-xl">
              Midas is an alpha Python SDK and MCP server for durable, source-traceable agent
              memory across multi-day coding, research and operational work.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                View Midas Alpha
              </a>
              <a href="#benchmarks" className="btn-secondary">
                See Benchmarks
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 w-full">
            <div className="editorial-panel editorial-panel--accent p-10 lg:p-12">
              <div className="mb-10">
                <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted-soft)]">
                  Current Signal
                </p>
                <h3 className="heading-serif text-2xl">Usable alpha, measured first.</h3>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {SIGNALS.map((s) => (
                  <div key={s.label}>
                    <div className="metric-number">{s.value}</div>
                    <div className="metric-label">{s.label}</div>
                  </div>
                ))}
              </div>

              <p className="mt-10 border-t border-[color:var(--line)] pt-5 text-[12px] italic leading-relaxed text-[color:var(--muted-soft)]">
                Reader-independent recall@k on reproducible local runs. Ingest stays LLM-free by design.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
