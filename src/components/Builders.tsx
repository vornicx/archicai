import { Reveal } from '../useReveal'

const audiences = [
  {
    title: 'Memory researchers',
    desc: 'Benchmark and improve retrieval for long-horizon agents. Honest comparisons, same embedders, same conditions.',
  },
  {
    title: 'Agent builders',
    desc: 'Drop-in memory for coding and research agents. Framework-agnostic Python SDK with a pluggable embedder protocol.',
  },
  {
    title: 'Platform engineers',
    desc: 'Zero-deps core, SQLite for scale, and a clean MemoryAdapter protocol for extending to any backend.',
  },
]

function Builders() {
  return (
    <section id="builders" className="relative py-20 md:py-28 px-6">
      <div className="mx-auto max-w-page">
        <Reveal>
          <p className="section-eyebrow mb-4">Who it&apos;s for</p>
          <h2 className="section-title mb-14">Built for builders who measure.</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {audiences.map((a, i) => (
            <Reveal key={a.title} delay={i * 60}>
              <div className="principle-card">
                <h3 className="text-base font-medium text-ink mb-3">{a.title}</h3>
                <p className="text-[15px] text-ink-muted leading-relaxed">{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Builders
