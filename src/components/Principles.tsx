import { Reveal } from '../useReveal'

const principles = [
  {
    title: 'First principles',
    statement:
      'Context, memory, reasoning, tools and control are designed as one system — not bolted together.',
  },
  {
    title: 'Human agency',
    statement: 'Agents amplify judgment, never replace it by default.',
  },
  {
    title: 'Context as interface',
    statement: 'The best intelligence understands the work around you before it acts.',
  },
  {
    title: 'Action matters',
    statement:
      'Intelligence is incomplete until it can help you do something meaningful — with you, not without you.',
  },
]

function Principles() {
  return (
    <section id="principles" className="relative py-20 md:py-28 px-6">
      <div className="mx-auto max-w-page">
        <Reveal>
          <p className="section-eyebrow mb-4">Principles</p>
          <h2 className="section-title mb-14">Built carefully, from the ground up.</h2>
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
