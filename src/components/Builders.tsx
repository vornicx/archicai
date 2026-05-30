import { Reveal } from '../useReveal'

const audiences = [
  {
    title: 'Platform engineers',
    desc: 'Compose control, execution, and memory in your own products — with clear boundaries between layers.',
  },
  {
    title: 'Agent builders',
    desc: 'Swap runtimes without rewriting governance, memory, or audit trails.',
  },
  {
    title: 'Teams shipping with AI',
    desc: 'Human agency by default, verifiable outcomes, and traces you can replay.',
  },
]

function Builders() {
  return (
    <section id="builders" className="relative py-20 md:py-28 px-6">
      <div className="mx-auto max-w-page">
        <Reveal>
          <p className="section-eyebrow mb-4">Who it&apos;s for</p>
          <h2 className="section-title mb-14">Built for people who build systems.</h2>
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
