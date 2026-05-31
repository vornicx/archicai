import { useEffect, useState } from 'react'
import { Reveal } from '../useReveal'
import { CYCLE_STEPS } from '../data/ecosystem'

function Cycle() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % CYCLE_STEPS.length)
    }, 3200)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section id="research" className="relative py-20 md:py-28 px-6 section-band">
      <div className="mx-auto max-w-page">
        <Reveal>
          <p className="section-eyebrow mb-4">How we build</p>
          <h2 className="section-title mb-4">Benchmark, then build, then benchmark again.</h2>
          <p className="section-lead mb-14">
            Measure honestly before claiming improvement. Define metrics, run the harness, find
            where retrieval fails, improve the system, and publish results transparently.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="cycle-steps">
            {CYCLE_STEPS.map((step, i) => (
              <button
                key={step.id}
                type="button"
                className={`cycle-step ${i === active ? 'cycle-step-active' : ''}`}
                onClick={() => setActive(i)}
                aria-pressed={i === active}
              >
                <span className="cycle-step-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="cycle-step-label">{step.step.charAt(0) + step.step.slice(1).toLowerCase()}</span>
                <span className="cycle-step-via">
                  via <em>{step.layer}</em>
                </span>
                <span className="cycle-step-sub">{step.sub}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={180}>
          <blockquote className="quote-block mt-16 md:mt-20">
            &ldquo;Superiority is a goal we measure toward, not a claim.&rdquo;
          </blockquote>
          <p className="text-center text-sm text-ink-muted mt-4 max-w-md mx-auto">
            Same embedders. Same conditions. Transparent leaderboard.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export default Cycle
