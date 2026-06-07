import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { GITHUB_URL } from '../constants'
import { LAYERS } from '../data/ecosystem'
import { StatusBadge } from '../components/StatusBadge'

const PRINCIPLES = [
  {
    title: 'Memory before everything',
    body: 'Agents that forget cannot reason across days. Durable, source-traceable memory is the foundation — not a feature bolted on.',
  },
  {
    title: 'Eval-first, not vibe-first',
    body: 'Every claim ships with a reproducible benchmark. No leaderboard theatre, same embedders, same conditions.',
  },
  {
    title: 'Local-first, auditable',
    body: 'Your context lives on your machine. No vendor lock-in, no opaque pipelines, no LLM in the ingest path.',
  },
]

function ArchicHome() {
  return (
    <>
      <Helmet>
        <title>Archic — Foundations for agents that remember</title>
        <meta
          name="description"
          content="Archic is building the open, auditable foundations for personal agentic intelligence — starting with Midas, a local-first memory framework."
        />
        <link rel="canonical" href="https://archic.es/" />
        <meta property="og:title" content="Archic — Foundations for agents that remember" />
        <meta property="og:description" content="Open, auditable foundations for personal agentic intelligence. Memory, control and execution as separate, inspectable layers." />
        <meta property="og:url" content="https://archic.es/" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Archic',
          url: 'https://archic.es/',
          description:
            'Open, auditable foundations for personal agentic intelligence. Memory, control and execution as separate, inspectable layers.',
        })}</script>
      </Helmet>

      {/* Hero */}
      <section id="top" className="section-padding">
        <div className="container-page">
          <div className="grid items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-block rounded-full border border-[color:var(--gold)]/30 px-3 py-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[color:var(--gold)]">
                  Archic
                </span>
              </div>
              <h1 className="heading-serif text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] font-light">
                Foundations for agents that <span className="accent-remember">remember.</span>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-[color:var(--muted)] md:text-xl">
                Archic builds the open, auditable layers personal agentic intelligence is missing —
                memory, control and execution as separate, inspectable systems. Midas is the first
                layer, shipping today.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/midas" className="btn-primary">
                  Explore Midas
                </Link>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  GitHub
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 w-full">
              <div className="editorial-panel editorial-panel--accent p-12 lg:p-16">
                <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted-soft)]">
                  The thesis
                </p>
                <h3 className="heading-serif text-2xl mb-6">
                  Agents are stuck in the present.
                </h3>
                <p className="text-[15px] leading-relaxed text-[color:var(--muted)]">
                  Today's agents can plan, call tools and write code — but they forget the moment a
                  context window ends. Archic treats memory, control and execution as first-class,
                  auditable infrastructure, so long-horizon agents can be trusted to operate over
                  days and weeks instead of minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Archic */}
      <section id="why" className="section-padding">
        <div className="container-page space-y-12">
          <div className="max-w-2xl">
            <div className="section-label">Why Archic exists</div>
            <h2 className="heading-serif text-[2.2rem] md:text-[2.8rem]">
              We got tired of agents that forget.
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-5 text-[15px] leading-relaxed text-[color:var(--muted)]">
              <p>
                The current wave of agent frameworks treats memory as an afterthought — a vector
                store wired in late, opaque pipelines, results that nobody reproduces. The result
                is agents that hallucinate context, drift across sessions, and silently lose
                whatever made them useful the day before.
              </p>
              <p>
                Archic was created to fix the foundations. Not another wrapper around a chat
                completion, but a layered stack where each capability — remembering, deciding,
                executing — is a separate, auditable system that you can run locally and benchmark
                honestly.
              </p>
            </div>
            <div className="space-y-5 text-[15px] leading-relaxed text-[color:var(--muted)]">
              <p>
                The bet is simple: long-horizon agents that operate over days or weeks need the
                same engineering rigour as databases or operating systems. That means provenance,
                determinism, eval-first development, and zero hidden dependencies.
              </p>
              <p>
                We start with the hardest piece — durable memory — and ship it as Midas: an alpha
                Python SDK and MCP server you can install, run locally, and benchmark against the
                same datasets the research community already uses.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="doc-card">
                <h4>{p.title}</h4>
                <p className="text-sm leading-relaxed text-[color:var(--muted)]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision / Ecosystem */}
      <section id="vision" className="section-padding">
        <div className="container-page space-y-12">
          <div className="max-w-2xl">
            <div className="section-label">The vision</div>
            <h2 className="heading-serif text-[2.2rem] md:text-[2.8rem]">
              A layered stack for personal agentic intelligence.
            </h2>
            <p className="mt-5 leading-relaxed text-[color:var(--muted)]">
              Archic's north-star is a complete, layered ecosystem where memory, control and
              execution are independent and inspectable. Midas is shipping. The rest is parked
              until the foundation earns the right to grow.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {LAYERS.map((l) => (
              <div key={l.id} className="doc-card">
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="!mb-0">{l.name}</h4>
                  <StatusBadge status={l.status} />
                </div>
                <p className="text-[12px] uppercase tracking-[0.2em] text-[color:var(--muted-soft)] mb-3">
                  {l.role}
                </p>
                <p className="text-sm leading-relaxed text-[color:var(--muted)]">{l.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-page">
          <div className="editorial-panel editorial-panel--accent p-12 lg:p-16 text-center">
            <div className="section-label justify-center">Shipping today</div>
            <h2 className="heading-serif text-[2rem] md:text-[2.6rem] mb-5">
              Start with Midas.
            </h2>
            <p className="mx-auto max-w-xl text-[color:var(--muted)] mb-8 leading-relaxed">
              The first Archic layer is a local-first memory framework for long-horizon agents.
              Install it, run the benchmark, and see what eval-first memory looks like.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/midas" className="btn-primary">
                Go to Midas
              </Link>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ArchicHome
