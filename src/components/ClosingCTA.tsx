import { Reveal } from '../useReveal'
import { CONTACT_EMAIL, GITHUB_URL } from '../constants'
import { REPOS } from '../data/resources'

function ClosingCTA() {
  return (
    <section id="start" className="relative py-24 md:py-32 px-6 border-t border-line">
      <div className="mx-auto max-w-page text-center">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-ink mb-5">
            Building in the open.
          </h2>
          <p className="text-lg text-ink-muted max-w-prose mx-auto mb-10 leading-relaxed">
            Midas is the wedge. The eval harness is the proof. The Archic vision is the north-star.
            Clone the repo and run the benchmark.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href={REPOS.midas} target="_blank" rel="noopener noreferrer" className="btn-primary">
              github.com/vornicx/Midas
            </a>
            <a href="#docs" className="btn-ghost">
              Documentation
            </a>
            <a href={CONTACT_EMAIL} className="btn-ghost">
              Contact
            </a>
          </div>
          <p className="text-sm text-ink-faint mt-8">
            Also:{' '}
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">
              archic docs
            </a>
            {' · '}
            <a href={REPOS.origin} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">
              origin (parked)
            </a>
            {' · '}
            <a href={REPOS.apollo} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">
              apollo-agent (parked)
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export default ClosingCTA
