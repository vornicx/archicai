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
          <p className="section-eyebrow mb-4">How it works</p>
          <h2 className="section-title mb-4">Every mission follows a loop.</h2>
          <p className="section-lead mb-14">
            Understand, remember, reason, act, learn — each phase owned by a layer with a single
            responsibility. Today that loop runs through Origin, Atlas, and Apollo.
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
            &ldquo;Intelligence is incomplete until it can act.&rdquo;
          </blockquote>
          <p className="text-center text-sm text-ink-muted mt-4 max-w-md mx-auto">
            Under human control, with proof — not assertion.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export default Cycle
