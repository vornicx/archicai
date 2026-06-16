import { Helmet } from 'react-helmet-async'
import { useEffect, useRef } from 'react'
import { GITHUB_URL } from '../constants'
import { StatusBadge } from '../components/StatusBadge'

type Product = {
  id: string
  num: string
  name: string
  role: string
  status: 'active' | 'building' | 'in-progress' | 'planned' | 'parked'
  desc: string
  href: string
  external?: boolean
  cta: string
}

const PRODUCTS: Product[] = [
  {
    id: 'midas',
    num: '01',
    name: 'MIDAS',
    role: 'Agentic Memory SDK',
    status: 'active',
    desc: 'Local-first Python SDK and MCP server for long-horizon agent memory. Source-traceable, eval-first.',
    href: 'https://midas.archic.es',
    external: true,
    cta: 'MIDAS.ARCHIC.ES →',
  },
  {
    id: 'apollo',
    num: '02',
    name: 'APOLLO',
    role: 'Mission Runtime',
    status: 'in-progress',
    desc: 'Mission runtime and CLI — plan, execute, replan under human control. The execution layer of the stack.',
    href: 'https://apollo.archic.es',
    external: true,
    cta: 'APOLLO.ARCHIC.ES →',
  },
]

const CHAPTERS = [
  { num: '00', title: 'Prologue — System status', meta: 'Hero', href: '#top' },
  { num: '01', title: 'The problem — Structural amnesia', meta: 'Setup', href: '#problem' },
  { num: '02', title: 'The thesis — Memory is infrastructure', meta: 'Turn', href: '#manifesto' },
  { num: '03', title: 'The stack — One layer per subdomain', meta: 'Build', href: '#products' },
  { num: '04', title: 'The horizon — A layered intelligence', meta: 'Future', href: '#vision' },
  { num: '05', title: 'The invitation — Start with Midas', meta: 'Action', href: '#cta' },
]

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const els = root.querySelectorAll<HTMLElement>('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    )
    els.forEach((el) => io.observe(el))
    const fallback = window.setTimeout(() => {
      els.forEach((el) => el.classList.add('visible'))
    }, 2200)
    return () => {
      io.disconnect()
      window.clearTimeout(fallback)
    }
  }, [])
  return ref
}

function ArchicHome() {
  const ref = useReveal()

  return (
    <>
      <Helmet>
        <title>Archic — Foundations for Agents That Remember</title>
        <meta
          name="description"
          content="Archic builds open, auditable layers for personal agentic intelligence: memory, control and execution as separate, inspectable systems."
        />
        <link rel="canonical" href="https://archic.es/" />
        <meta property="og:title" content="Archic — Foundations for Agents That Remember" />
        <meta property="og:description" content="Open, auditable layers for personal agentic intelligence: memory, control and execution as separate, inspectable systems." />
        <meta property="og:url" content="https://archic.es/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Archic" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Archic — Foundations for Agents That Remember" />
        <meta name="twitter:description" content="Memory, control and execution as inspectable systems for personal agentic intelligence." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Archic',
          url: 'https://archic.es/',
          description:
            'Open, auditable layers for personal agentic intelligence: memory, control and execution as separate, inspectable systems.',
          sameAs: ['https://midas.archic.es', 'https://apollo.archic.es', 'https://github.com/vornicx'],
        })}</script>
      </Helmet>

      <div className="container-page" ref={ref}>
        <div className="blueprint-frame frame-corners">

          {/* CH.00 — PROLOGUE / HERO */}
          <section id="top" aria-labelledby="hero-title" className="grid grid-cols-1 md:grid-cols-12 border-b border-[color:var(--line)]">
            <div className="md:col-span-7 p-8 md:p-16 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[color:var(--line)]">
              <div className="chapter-tag mb-6 reveal" aria-hidden="true">CH.00 / PROLOGUE</div>
              <div className="tag-gold mb-8 flex items-center gap-2 reveal" aria-hidden="true">
                <span className="w-2 h-2 bg-[color:var(--gold)] rounded-full animate-pulse" />
                SYSTEM_STATUS: ACTIVE
              </div>
              <h1 id="hero-title" className="display-xl text-[2.5rem] sm:text-[3.4rem] md:text-[4.4rem] mb-8 reveal">
                Foundations for<br />
                agents that <span className="gold-mark accent-underline">remember.</span>
              </h1>
              <p className="text-[13px] md:text-[14px] text-[color:var(--muted)] max-w-xl leading-relaxed uppercase tracking-[0.04em] reveal">
                Open, auditable memory, control and execution layers for long-horizon agentic intelligence. A six-chapter argument for why agents need an inspectable substrate — and the layers we're shipping to build it.
              </p>
              <div className="mt-12 flex flex-wrap gap-3 reveal">
                <a href="#products" className="btn-primary">Explore the stack ↓</a>
                <a href="https://midas.archic.es" target="_blank" rel="noopener noreferrer" className="btn-secondary" aria-label="Start with Midas — open Midas site">
                  Start with Midas ↗
                </a>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost" aria-label="View Archic repositories on GitHub">
                  View on GitHub ↗
                </a>
              </div>
            </div>

            <div className="md:col-span-5 p-8 md:p-10 flex flex-col justify-between bg-[color:var(--bg-soft)] gap-10">
              <div className="space-y-1 text-[10px] text-[color:var(--muted-deep)] uppercase tracking-[0.22em] reveal" aria-hidden="true">
                <div>ID: ARCH_HUB_001</div>
                <div>BUILD: 2026.06.08</div>
                <div>COORDS: 40.4168° N · 3.7038° W</div>
                <div>LATENCY: 12MS · UPLINK: STABLE</div>
              </div>

              <div className="grid grid-cols-2 gap-6 reveal">
                <div className="metric"><div className="metric-value">0.95</div><div className="metric-label">Recall@k · LongMemEval-s</div></div>
                <div className="metric"><div className="metric-value">0.85</div><div className="metric-label">Recall@k · LoCoMo</div></div>
                <div className="metric"><div className="metric-value">0</div><div className="metric-label">LLM calls on ingest</div></div>
                <div className="metric"><div className="metric-value">100%</div><div className="metric-label">Local-first · auditable</div></div>
              </div>

              <div className="border-t border-[color:var(--line)] pt-8 reveal">
                <div className="tag-mono mb-4">[ TABLE_OF_CONTENTS ]</div>
                <div className="chapter-index">
                  {CHAPTERS.map((c) => (
                    <a key={c.num} href={c.href} className="chapter-index-row">
                      <span className="chapter-index-num">§{c.num}</span>
                      <span className="chapter-index-title">{c.title}</span>
                      <span className="chapter-index-meta">{c.meta}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CH.01 — THE PROBLEM */}
          <section id="problem" className="px-8 md:px-16 py-20 md:py-28 border-b border-[color:var(--line)]">
            <div className="flex items-center gap-3 mb-10 reveal">
              <span className="chapter-tag">CH.01 / THE PROBLEM</span>
              <span className="section-rule flex-1 h-px bg-[color:var(--line-strong)]" />
              <span className="tag-mono">[ READ: 45S ]</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
              <div className="md:col-span-7 reveal">
                <p className="display text-[1.8rem] md:text-[2.4rem] leading-[1.15] mb-8">
                  Today's agents can <span className="gold-mark">plan, call tools, write code</span> — and then forget everything the moment a context window ends.
                </p>
                <p className="text-[14px] leading-relaxed text-[color:var(--muted)] drop-cap">
                  The current wave of agent frameworks treats memory as an afterthought: a vector store wired in late, opaque pipelines, benchmarks nobody reproduces. The result is agents that hallucinate context, drift across sessions, and silently lose whatever made them useful the day before. We've been here before — every "intelligent" system that couldn't persist state collapsed under its own complexity.
                </p>
              </div>
              <div className="md:col-span-5 reveal">
                <div className="pull-quote">
                  <span className="strike">"Just give it a bigger context window."</span><br />
                  That's not memory. That's <span className="gold-mark">paying rent on amnesia.</span>
                </div>
              </div>
            </div>

            <div className="ba-split reveal">
              <div className="ba-cell ba-before">
                <div className="ba-label">[ BEFORE — TODAY'S STACK ]</div>
                <div className="ba-statement">Memory bolted on as an external service.</div>
                <p className="ba-detail">RAG over embeddings retrieves by surface similarity. No provenance, no belief revision, no retention policy. Each session starts from zero — or worse, with stale fragments masquerading as truth.</p>
              </div>
              <div className="ba-cell ba-after">
                <div className="ba-label">[ AFTER — ARCHIC ]</div>
                <div className="ba-statement">Memory as a first-class, inspectable system.</div>
                <p className="ba-detail">Source-traceable graphs that consolidate experience and discard noise. Local-first, deterministic, benchmarked under adversarial loss. Built so an agent operating for two weeks is the same agent that started on day one.</p>
              </div>
            </div>
          </section>

          {/* CH.02 — THE THESIS / MANIFESTO */}
          <section id="manifesto" className="manifesto-section">
            <span className="manifesto-mark" aria-hidden="true">§02</span>
            <div className="px-8 md:px-16 relative">
              <div className="flex items-center gap-3 mb-12 reveal">
                <span className="chapter-tag">CH.02 / THE THESIS</span>
                <span className="section-rule flex-1 h-px bg-[color:var(--line-strong)]" />
                <span className="tag-mono">[ READ: 90S ]</span>
              </div>

              <p className="display text-[1.6rem] md:text-[2.4rem] lg:text-[3rem] max-w-5xl leading-[1.15] mb-16 reveal">
                If amnesia is the disease, <span className="gold-mark">infrastructure is the cure.</span>
                <span className="text-[color:var(--muted-soft)]"> Three commitments we make before writing a single line of agent code.</span>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[color:var(--line)]">
                <div className="manifesto-pillar p-8 md:p-10 border-b md:border-b-0 md:border-r border-[color:var(--line)] reveal reveal-delay-1">
                  <div className="tag-gold mb-5">[ 01 / MEMORY ]</div>
                  <p className="text-[13px] leading-relaxed text-[color:var(--muted)]">
                    Memory is a <span className="text-[color:var(--ink-strong)]">systems problem</span>, not an embeddings one. Indexing vectors is not remembering. Archic implements traceable graphs that let agents consolidate experience and discard noise on their own.
                  </p>
                </div>
                <div className="manifesto-pillar p-8 md:p-10 border-b md:border-b-0 md:border-r border-[color:var(--line)] reveal reveal-delay-2">
                  <div className="tag-gold mb-5">[ 02 / DETERMINISM ]</div>
                  <p className="text-[13px] leading-relaxed text-[color:var(--muted)]">
                    If it isn't deterministic, it isn't <span className="text-[color:var(--ink-strong)]">infrastructure</span>. Every iteration ships behind an eval harness that measures real Recall@k under adversarial loss, not happy paths.
                  </p>
                </div>
                <div className="manifesto-pillar p-8 md:p-10 reveal reveal-delay-3">
                  <div className="tag-gold mb-5">[ 03 / OPEN ]</div>
                  <p className="text-[13px] leading-relaxed text-[color:var(--muted)]">
                    Open engineering over <span className="text-[color:var(--ink-strong)]">marketing promises</span>. We publish caveats with the same weight as wins. Reproducible commands, honest leaderboards, zero hidden dependencies.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CH.03 — THE STACK */}
          <section id="products" className="border-b border-[color:var(--line)]">
            <div className="px-8 md:px-16 pt-16 md:pt-20 pb-10 reveal">
              <div className="flex items-center gap-3 mb-10">
                <span className="chapter-tag">CH.03 / THE STACK</span>
                <span className="flex-1 h-px bg-[color:var(--line-strong)]" />
                <span className="tag-mono">[ 2 LAYERS · SHIPPING ]</span>
              </div>
              <h2 className="display text-[2rem] md:text-[2.8rem] max-w-3xl mb-6 leading-[1.05]">
                First we built the memory.<br />
                <span className="gold-mark">Now we're building the runtime that uses it.</span>
              </h2>
              <p className="text-[14px] text-[color:var(--muted)] max-w-2xl leading-relaxed">
                Two products, one subdomain each. They version and benchmark independently and compose without coupling — because a stack you can't take apart isn't infrastructure either.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-[color:var(--line)]">
              {PRODUCTS.map((p, i) => (
                <a
                  key={p.id}
                  href={p.href}
                  target={p.external ? '_blank' : undefined}
                  rel={p.external ? 'noopener noreferrer' : undefined}
                  className={`product-cell reveal ${i === 0 ? 'md:border-r' : ''} border-b border-[color:var(--line)]`}
                >
                  <div className="flex justify-between items-start mb-12 gap-3">
                    <div>
                      <div className="tag-mono mb-2">[ {p.num} ]</div>
                      <h3>{p.name}</h3>
                      <div className="tag-mono mt-2 text-[color:var(--muted-soft)]">{p.role}</div>
                    </div>
                    <StatusBadge status={p.status} />
                  </div>
                  <p className="text-[12.5px] leading-relaxed text-[color:var(--muted)] min-h-[72px] mb-8">
                    {p.desc}
                  </p>
                  <span className="tag-gold cell-cta">{p.cta}</span>
                </a>
              ))}
            </div>
          </section>

          {/* CH.04 — THE HORIZON */}
          <section id="vision" className="px-8 md:px-16 py-20 md:py-28 border-b border-[color:var(--line)]">
            <div className="flex items-center gap-3 mb-10 reveal">
              <span className="chapter-tag">CH.04 / THE HORIZON</span>
              <span className="flex-1 h-px bg-[color:var(--line-strong)]" />
              <span className="tag-mono">[ NORTH_STAR ]</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-6 reveal">
                <h2 className="display text-[2rem] md:text-[2.8rem] mb-8 leading-[1.05]">
                  A layered stack for<br />
                  <span className="gold-mark">personal agentic intelligence.</span>
                </h2>
                <p className="text-[14px] leading-relaxed text-[color:var(--muted)] max-w-xl mb-6">
                  The north star is an ecosystem where memory, control and execution are independent and inspectable. Some layers ship today. The rest stay parked until the foundation earns the right to grow.
                </p>
                <p className="text-[13px] leading-relaxed text-[color:var(--muted-soft)] max-w-xl italic">
                  We'd rather ship two layers that hold under load than five that look good in a diagram.
                </p>
              </div>

              <div className="md:col-span-6 reveal">
                <div className="story-timeline">
                  <div className="story-step live">
                    <div className="tag-gold mb-2">[ NOW · MEMORY ]</div>
                    <div className="text-[15px] text-[color:var(--ink-strong)] mb-1">Midas — live</div>
                    <p className="text-[12.5px] text-[color:var(--muted)] leading-relaxed">Local-first SDK and MCP server. Benchmarked, traceable, in production.</p>
                  </div>
                  <div className="story-step">
                    <div className="tag-gold mb-2">[ NEXT · EXECUTION ]</div>
                    <div className="text-[15px] text-[color:var(--ink-strong)] mb-1">Apollo — early</div>
                    <p className="text-[12.5px] text-[color:var(--muted)] leading-relaxed">Mission runtime and CLI. Plan, execute and replan under human control.</p>
                  </div>
                  <div className="story-step future">
                    <div className="tag-mono mb-2 text-[color:var(--muted-soft)]">[ LATER · CONTROL ]</div>
                    <div className="text-[15px] text-[color:var(--muted)] mb-1">Parked — by design</div>
                    <p className="text-[12.5px] text-[color:var(--muted-soft)] leading-relaxed">Policy, observability and orchestration. Unlocked when memory and execution earn it.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CH.05 — THE INVITATION */}
          <section id="cta" className="px-8 md:px-16 py-20 md:py-28">
            <div className="flex items-center gap-3 mb-10 reveal">
              <span className="chapter-tag">CH.05 / THE INVITATION</span>
              <span className="flex-1 h-px bg-[color:var(--line-strong)]" />
              <span className="tag-mono">[ SHIPPING_NOW ]</span>
            </div>
            <div className="max-w-3xl reveal">
              <h2 className="display text-[2.2rem] md:text-[3.2rem] mb-6 leading-[1.05]">
                The story doesn't end here.<br />
                <span className="gold-mark">It starts with Midas.</span>
              </h2>
              <p className="text-[14px] leading-relaxed text-[color:var(--muted)] mb-10 max-w-xl">
                Install the SDK, run the benchmark, read the eval harness. See what eval-first memory actually looks like — then help us write the next chapter.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://midas.archic.es" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Go to Midas ↗
                </a>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  View on GitHub
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default ArchicHome
