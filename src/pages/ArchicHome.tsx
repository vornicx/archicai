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
  dim?: boolean
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
    // Safety: ensure everything becomes visible even if IO misbehaves
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
        <title>Archic — Foundations for agents that remember</title>
        <meta
          name="description"
          content="Archic builds the open, auditable foundations for personal agentic intelligence — memory, control and execution as separate, inspectable layers."
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
          sameAs: [
            'https://midas.archic.es',
            'https://apollo.archic.es',
            'https://github.com/vornicx',
          ],
        })}</script>
      </Helmet>

      <div className="container-page" ref={ref}>
        <div className="blueprint-frame frame-corners">
          {/* HERO / MANIFESTO ID */}
          <section id="top" className="grid grid-cols-1 md:grid-cols-12 border-b border-[color:var(--line)]">
            <div className="md:col-span-7 p-8 md:p-16 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[color:var(--line)]">
              <div className="tag-gold mb-8 flex items-center gap-2 reveal">
                <span className="w-2 h-2 bg-[color:var(--gold)] rounded-full animate-pulse" />
                SYSTEM_STATUS: ACTIVE
              </div>
              <h1 className="display-xl text-[2.5rem] sm:text-[3.4rem] md:text-[4.4rem] mb-8 reveal">
                Foundations for<br />
                agents that <span className="gold-mark accent-underline">remember.</span>
              </h1>
              <p className="text-[13px] md:text-[14px] text-[color:var(--muted)] max-w-xl leading-relaxed uppercase tracking-[0.04em] reveal">
                Archic builds the open, auditable layers personal agentic intelligence is missing — memory, control and execution as separate, inspectable systems.
              </p>
              <div className="mt-12 flex flex-wrap gap-3 reveal">
                <a href="#products" className="btn-primary">Explore the stack</a>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  GitHub_Repository
                </a>
              </div>
            </div>

            <div className="md:col-span-5 p-8 md:p-10 flex flex-col justify-between bg-[color:var(--bg-soft)] gap-10">
              <div className="space-y-1 text-[10px] text-[color:var(--muted-deep)] uppercase tracking-[0.22em] reveal">
                <div>ID: ARCH_HUB_001</div>
                <div>BUILD: 2026.06.08</div>
                <div>COORDS: 40.4168° N · 3.7038° W</div>
                <div>LATENCY: 12MS · UPLINK: STABLE</div>
              </div>

              <div className="grid grid-cols-2 gap-6 reveal">
                <div className="metric">
                  <div className="metric-value">0.95</div>
                  <div className="metric-label">Recall@k · LongMemEval-s</div>
                </div>
                <div className="metric">
                  <div className="metric-value">0.85</div>
                  <div className="metric-label">Recall@k · LoCoMo</div>
                </div>
                <div className="metric">
                  <div className="metric-value">0</div>
                  <div className="metric-label">LLM calls on ingest</div>
                </div>
                <div className="metric">
                  <div className="metric-value">100%</div>
                  <div className="metric-label">Local-first · auditable</div>
                </div>
              </div>

              <div className="border-t border-[color:var(--line)] pt-8 reveal">
                <div className="tag-mono mb-4">[ CORE_THESIS ]</div>
                <p className="text-[12px] leading-relaxed text-[color:var(--muted)]">
                  Today's agents can plan, call tools and write code — but they forget the moment a context window ends. Archic treats memory as infrastructure, so long-horizon agents can be trusted to operate over days instead of minutes.
                </p>
              </div>
            </div>
          </section>

          {/* MANIFESTO — full screen */}
          <section id="manifesto" className="manifesto-section">
            <span className="manifesto-mark" aria-hidden="true">§01</span>
            <div className="px-8 md:px-16 relative">
              <div className="flex items-center gap-3 mb-12 reveal">
                <span className="section-num">§01 / MANIFESTO</span>
                <span className="flex-1 h-px bg-[color:var(--line-strong)]" />
                <span className="tag-mono">[ READ_TIME: 90S ]</span>
              </div>

              <p className="display text-[1.6rem] md:text-[2.4rem] lg:text-[3rem] max-w-5xl leading-[1.15] mb-16 reveal">
                The current wave of agent frameworks treats memory as an afterthought —
                <span className="text-[color:var(--muted-soft)]"> a vector store wired in late, opaque pipelines, results that nobody reproduces.</span>
                The result is agents that <span className="gold-mark">hallucinate context</span>, drift across sessions, and silently lose whatever made them useful the day before.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[color:var(--line)]">
                <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-[color:var(--line)] reveal">
                  <div className="tag-gold mb-5">[ 01 / MEMORY ]</div>
                  <p className="text-[13px] leading-relaxed text-[color:var(--muted)]">
                    Memory is a <span className="text-[color:var(--ink-strong)]">systems problem</span>, not an embeddings one. Indexing vectors is not remembering. Archic implements traceable graphs that let agents consolidate experience and discard noise on their own.
                  </p>
                </div>
                <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-[color:var(--line)] reveal">
                  <div className="tag-gold mb-5">[ 02 / DETERMINISM ]</div>
                  <p className="text-[13px] leading-relaxed text-[color:var(--muted)]">
                    If it isn't deterministic, it isn't <span className="text-[color:var(--ink-strong)]">infrastructure</span>. Every iteration ships behind an eval harness that measures real Recall@k under adversarial loss, not happy paths.
                  </p>
                </div>
                <div className="p-8 md:p-10 reveal">
                  <div className="tag-gold mb-5">[ 03 / OPEN ]</div>
                  <p className="text-[13px] leading-relaxed text-[color:var(--muted)]">
                    Open engineering over <span className="text-[color:var(--ink-strong)]">marketing promises</span>. We publish caveats with the same weight as wins. Reproducible commands, honest leaderboards, zero hidden dependencies.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* PRODUCT GRID */}
          <section id="products" className="border-b border-[color:var(--line)]">
            <div className="px-8 md:px-16 pt-16 md:pt-20 pb-10 reveal">
              <div className="flex items-center gap-3 mb-8">
                <span className="section-num">§02 / THE STACK</span>
                <span className="flex-1 h-px bg-[color:var(--line-strong)]" />
                <span className="tag-mono">[ 2 LAYERS · 1 SUBDOMAIN EACH ]</span>
              </div>
              <h2 className="display text-[2rem] md:text-[2.8rem] max-w-2xl mb-4">
                One layer per subdomain.
              </h2>
              <p className="text-[13px] text-[color:var(--muted)] uppercase tracking-[0.04em] max-w-2xl">
                Each product ships, versions and benchmarks independently. They compose — none of them require the others.
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
                  <span className="tag-gold cell-cta">
                    {p.cta}
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* VISION */}
          <section id="vision" className="px-8 md:px-16 py-20 md:py-28 border-b border-[color:var(--line)]">
            <div className="flex items-center gap-3 mb-10 reveal">
              <span className="section-num">§03 / VISION</span>
              <span className="flex-1 h-px bg-[color:var(--line-strong)]" />
              <span className="tag-mono">[ NORTH_STAR ]</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              <div className="md:col-span-7 reveal">
                <h2 className="display text-[2rem] md:text-[2.8rem] mb-8 leading-[1.05]">
                  A layered stack for<br />
                  <span className="gold-mark">personal agentic intelligence.</span>
                </h2>
                <p className="text-[14px] leading-relaxed text-[color:var(--muted)] max-w-xl">
                  Archic's north-star is a complete ecosystem where memory, control and execution are independent and inspectable. Some layers ship today. The rest is parked until the foundation earns the right to grow.
                </p>
              </div>

              <div className="md:col-span-5 reveal">
                <div className="border border-[color:var(--line)] divide-y divide-[color:var(--line)]">
                  {[
                    { layer: 'MEMORY', name: 'Midas', status: 'LIVE' },
                    { layer: 'EXECUTION', name: 'Apollo', status: 'EARLY' },
                  ].map((row) => (
                    <div key={row.layer} className="flex items-center justify-between px-5 py-4">
                      <div>
                        <div className="tag-mono text-[color:var(--muted-soft)]">[ {row.layer} ]</div>
                        <div className="text-[14px] text-[color:var(--ink-strong)] mt-1">{row.name}</div>
                      </div>
                      <span
                        className="tag-mono"
                        style={{
                          color: row.status === 'LIVE' ? 'var(--gold)' :
                                 row.status === 'EARLY' ? 'var(--ink)' :
                                 'var(--muted-deep)',
                        }}
                      >
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="px-8 md:px-16 py-20 md:py-28">
            <div className="flex items-center gap-3 mb-10 reveal">
              <span className="section-num">§04 / SHIPPING_NOW</span>
              <span className="flex-1 h-px bg-[color:var(--line-strong)]" />
            </div>
            <div className="max-w-3xl reveal">
              <h2 className="display text-[2.2rem] md:text-[3.2rem] mb-6 leading-[1.05]">
                Start with <span className="gold-mark">Midas.</span>
              </h2>
              <p className="text-[14px] leading-relaxed text-[color:var(--muted)] mb-10 max-w-xl">
                The first Archic layer is a local-first memory framework for long-horizon agents. Install it, run the benchmark, and see what eval-first memory looks like.
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
