import { GITHUB_URL } from '../constants'

const SIGNALS = [
  { label: 'Recall@K', value: '0.83' },
  { label: 'Correct', value: '0.38' },
  { label: 'Efficiency', value: '0.77' },
]

function Hero() {
  return (
    <section id="top" className="section-padding hero-section pt-28 md:pt-36">
      <div className="container-page">
        <div className="hero-grid grid items-center gap-8 lg:grid-cols-[0.98fr_0.82fr]">
          <div id="midas" className="min-w-0">
            <div className="section-label">Midas by Archic</div>
            <h1 className="heading-serif hero-title max-w-[680px] text-[2.9rem] sm:text-[3.2rem] md:text-[4.8rem]">
              Infrastructure for agents that <span className="accent-remember">remember</span>.
            </h1>
            <p className="text-muted mt-7 max-w-[650px] text-[1.12rem] leading-relaxed md:text-[1.22rem]">
              Midas is a framework-agnostic Python SDK and evaluation harness for agents
              that need durable context across multi-day coding, research and operational work.
            </p>
            <p className="text-muted mt-4 max-w-[610px] leading-relaxed">
              Archic is focused on one measured wedge: memory that can be inspected,
              benchmarked and improved before it becomes a broader agent infrastructure layer.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                View origin-lab
              </a>
              <a href="#benchmarks" className="btn-secondary">
                See current benchmark
              </a>
            </div>
          </div>

          <div className="glass-panel hero-signal min-h-[400px] min-w-0">
            <div className="glass-inner p-7 md:p-9">
              <div className="flex items-center justify-between gap-6">
                <div>
                  <div className="section-label !mb-2">Current signal</div>
                  <h2 className="heading-serif text-[2.25rem]">Measured context quality.</h2>
                </div>
                <div
                  className="hidden h-16 w-16 rounded-full md:block"
                  style={{
                    background:
                      'radial-gradient(circle, #E0BC68 0 24%, #C9A24A 25% 44%, transparent 45%)',
                    boxShadow: '0 0 42px rgba(201,162,74,0.45)',
                  }}
                />
              </div>

              <div className="midas-orbit relative mt-8 aspect-square max-h-[250px] w-full">
                <div className="absolute inset-6 rounded-full border" style={{ borderColor: 'rgba(201,162,74,0.18)' }} />
                <div className="absolute inset-16 rounded-full border" style={{ borderColor: 'rgba(201,162,74,0.24)' }} />
                <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(224,188,104,0.55), rgba(201,162,74,0.15) 60%, transparent 75%)',
                    boxShadow: '0 0 60px rgba(201,162,74,0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
                  }}
                />
                <span className="absolute left-[18%] top-[28%] h-3 w-3 rounded-full" style={{ background: 'var(--gold)' }} />
                <span className="absolute right-[20%] top-[16%] h-2.5 w-2.5 rounded-full" style={{ background: '#E0BC68' }} />
                <span className="absolute bottom-[21%] left-[31%] h-2 w-2 rounded-full" style={{ background: 'var(--gold-deep)' }} />
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {SIGNALS.map((signal) => (
                  <div className="metric-card" key={signal.label}>
                    <div className="heading-serif text-[2.1rem]">{signal.value}</div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: 'var(--muted)' }}>
                      {signal.label}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-muted mt-5 text-[13px]">
                LoCoMo fair fight, n=40. Correctness lead over Mem0 is directional, not yet statistically final.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
