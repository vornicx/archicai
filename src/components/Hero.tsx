import { GITHUB_URL } from '../constants'

const SIGNALS = [
  { label: 'Recall@K', value: '0.83' },
  { label: 'Correct', value: '0.38' },
  { label: 'Efficiency', value: '0.77' },
]

function Hero() {
  return (
    <section id="top" className="section-padding pt-32 md:pt-40">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div id="midas" className="min-w-0">
            <div className="section-label">Midas by Archic</div>
            <h1 className="heading-serif max-w-[760px] text-[2.9rem] sm:text-[3.2rem] md:text-[5.4rem]">
              Agentic memory for long-horizon AI agents.
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

          <div className="glass-panel min-h-[430px] min-w-0">
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
                      'radial-gradient(circle, #fffaf0 0 24%, #d7b866 25% 44%, transparent 45%)',
                    boxShadow: '0 0 42px rgba(184,148,60,0.28)',
                  }}
                />
              </div>

              <div className="relative mt-10 aspect-square max-h-[280px] w-full">
                <div className="absolute inset-6 rounded-full border" style={{ borderColor: 'rgba(126,93,30,0.16)' }} />
                <div className="absolute inset-16 rounded-full border" style={{ borderColor: 'rgba(126,93,30,0.2)' }} />
                <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,250,240,0.92), rgba(215,184,102,0.42))',
                    boxShadow: '0 24px 60px rgba(126,93,30,0.18), inset 0 1px 0 rgba(255,255,255,0.8)',
                  }}
                />
                <span className="absolute left-[18%] top-[28%] h-3 w-3 rounded-full" style={{ background: 'var(--gold)' }} />
                <span className="absolute right-[20%] top-[16%] h-2.5 w-2.5 rounded-full" style={{ background: '#f8e0a2' }} />
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
