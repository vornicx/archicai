import { Reveal } from '../useReveal'
import StackOverview from './StackOverview'

function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6">
      <div className="mx-auto max-w-page">
        <div className="max-w-prose">
          <Reveal>
            <p className="section-eyebrow mb-6">Research &amp; infrastructure</p>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="font-display text-[2.75rem] sm:text-5xl md:text-[3.5rem] font-medium tracking-[-0.03em] leading-[1.05] text-ink">
              Intelligence from first principles.
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="section-lead mt-6">
              We&apos;re building a layered stack for personal agentic intelligence — where memory,
              control, and execution are separate, auditable systems. Not another chatbot.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="flex flex-wrap gap-3 mt-10">
              <a href="#ecosystem" className="btn-primary">
                Explore the stack
              </a>
              <a href="#research" className="btn-ghost">
                Our approach
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={260} className="mt-16 md:mt-20">
          <StackOverview />
        </Reveal>
      </div>
    </section>
  )
}

export default Hero
