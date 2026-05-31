import { Reveal } from '../useReveal'

const principles = [
  {
    title: 'Measure first',
    statement:
      'Superiority is a goal we measure toward, not a claim. Every improvement starts with an honest benchmark.',
  },
  {
    title: 'Honest comparisons',
    statement:
      'Same embedders, same conditions, same budget. Compare against real alternatives — not strawmen.',
  },
  {
    title: 'Narrow wedge',
    statement:
      'One problem solved well before expanding. Memory for long-horizon agents — not another platform.',
  },
  {
    title: 'Open core',
    statement:
      'The memory SDK is open source. The ecosystem is the moat. Zero deps for the core harness.',
  },
]

function Principles() {
  return (
    <section id="principles" className="relative py-20 md:py-28 px-6">
      <div className="mx-auto max-w-page">
        <Reveal>
          <p className="section-eyebrow mb-4">Principles</p>
          <h2 className="section-title mb-14">Built narrow. Measured first.</h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <article className="principle-card">
                <p className="principle-numeral">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="text-lg font-medium text-ink mb-3">{p.title}</h3>
                <p className="text-[15px] text-ink-muted leading-relaxed">{p.statement}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Principles
