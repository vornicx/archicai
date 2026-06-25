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
    role: 'Long-horizon agent memory',
    status: 'building',
    desc: 'Source-grounded recall with full provenance. No LLM calls at ingest — durable context across sessions, not over-summarized facts.',
    href: 'https://midas.archic.es',
    external: true,
    cta: 'MIDAS.ARCHIC.ES →',
  },
  {
    id: 'apollo',
    num: '02',
    name: 'APOLLO',
    role: 'Local-first AI harness',
    status: 'building',
    desc: 'CLI and desktop app with a native autorouter. Combine providers, subscriptions and APIs — the strongest reasoning model plans, the strongest coding model acts.',
    href: 'https://apollo.archic.es',
    external: true,
    cta: 'APOLLO.ARCHIC.ES →',
  },
]

const CHAPTERS = [
  { num: '00', title: 'Prologue — What Archic is', meta: 'Hero', href: '#top' },
  { num: '01', title: 'The problem — Context dies at the window', meta: 'Setup', href: '#problem' },
  { num: '02', title: 'The thesis — Local-first infrastructure', meta: 'Turn', href: '#manifesto' },
  { num: '03', title: 'The stack — Midas and Apollo', meta: 'Build', href: '#products' },
  { num: '04', title: 'The horizon — Layers we will earn', meta: 'Future', href: '#vision' },
  { num: '05', title: 'The invitation — Follow the build', meta: 'Action', href: '#cta' },
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
        <title>Archic — Local-first AI infrastructure</title>
        <meta
          name="description"
          content="Archic builds local-first AI infrastructure that amplifies human capability: Midas for long-horizon agent memory, Apollo for routed local execution."
        />
        <link rel="canonical" href="https://archic.es/" />
        <meta property="og:title" content="Archic — Local-first AI infrastructure" />
        <meta property="og:description" content="Local-first AI infrastructure. Midas for long-horizon agent memory. Apollo for routed local execution." />
        <meta property="og:url" content="https://archic.es/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Archic" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Archic — Local-first AI infrastructure" />
        <meta name="twitter:description" content="Midas for long-horizon agent memory. Apollo for routed local execution." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Archic',
          url: 'https://archic.es/',
          description:
            'Local-first AI infrastructure. Midas: long-horizon agent memory. Apollo: routed local execution.',
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
                STATUS: BUILDING IN PUBLIC
              </div>
              <h1 id="hero-title" className="display-xl text-[2.5rem] sm:text-[3.4rem] md:text-[4.4rem] mb-8 reveal">
                Local-first AI<br />
                infrastructure to <span className="gold-mark accent-underline">amplify you.</span>
              </h1>
              <p className="text-[13px] md:text-[14px] text-[color:var(--muted)] max-w-xl leading-relaxed uppercase tracking-[0.04em] reveal">
                Archic builds the substrate for agents that remember and execute on your own machine. Two components shipping this summer: Midas for long-horizon memory, Apollo for routed local execution.
              </p>
              <div className="mt-12 flex flex-wrap gap-3 reveal">
                <a href="#products" className="btn-primary">See the stack ↓</a>
                <a href="https://midas.archic.es" target="_blank" rel="noopener noreferrer" className="btn-secondary" aria-label="Open Midas site">
                  Midas ↗
                </a>
                <a href="https://apollo.archic.es" target="_blank" rel="noopener noreferrer" className="btn-ghost" aria-label="Open Apollo site">
                  Apollo ↗
                </a>
              </div>
            </div>

            <div className="md:col-span-5 p-8 md:p-10 flex flex-col justify-between bg-[color:var(--bg-soft)] gap-10">
              <div className="space-y-1 text-[10px] text-[color:var(--muted-deep)] uppercase tracking-[0.22em] reveal" aria-hidden="true">
                <div>ID: ARCHIC / HQ</div>
                <div>SHIPPING WINDOW: SUMMER 2026</div>
                <div>BASED IN: SPAIN</div>
                <div>MODE: SOLO · LOCAL-FIRST</div>
              </div>

              <div className="grid grid-cols-2 gap-6 reveal">
                <div className="metric"><div className="metric-value">2</div><div className="metric-label">Components in build</div></div>
                <div className="metric"><div className="metric-value">0</div><div className="metric-label">LLM calls at ingest · Midas</div></div>
                <div className="metric"><div className="metric-value">100%</div><div className="metric-label">Local-first by default</div></div>
                <div className="metric"><div className="metric-value">1</div><div className="metric-label">Founder · shipping in public</div></div>
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
          <section id="problem" aria-labelledby="problem-title" className="px-8 md:px-16 py-20 md:py-28 border-b border-[color:var(--line)]">
            <div className="flex items-center gap-3 mb-10 reveal">
              <span className="chapter-tag" aria-hidden="true">CH.01 / THE PROBLEM</span>
              <span className="section-rule flex-1 h-px bg-[color:var(--line-strong)]" aria-hidden="true" />
              <span className="tag-mono" aria-hidden="true">[ READ: 45S ]</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
              <div className="md:col-span-7 reveal">
                <p id="problem-title" className="display text-[1.8rem] md:text-[2.4rem] leading-[1.15] mb-8">
                  Today's AI tools <span className="gold-mark">forget what you told them yesterday</span> and run every task through whichever model you happened to open.
                </p>
                <p className="text-[14px] leading-relaxed text-[color:var(--muted)] drop-cap">
                  Context dies at the window. Routing is manual. Your work and your data live on someone else's servers, summarized into something you can't audit. The interesting capability is in the models — the leverage is in the infrastructure around them, and right now that infrastructure barely exists outside cloud silos.
                </p>
              </div>
              <div className="md:col-span-5 reveal">
                <div className="pull-quote">
                  <span className="strike">"Just use a bigger context window."</span><br />
                  That's not memory. That's <span className="gold-mark">paying rent on amnesia.</span>
                </div>
              </div>
            </div>

            <div className="ba-split reveal">
              <div className="ba-cell ba-before">
                <div className="ba-label">[ TODAY ]</div>
                <div className="ba-statement">Cloud-bound, single-model, forgetful.</div>
                <p className="ba-detail">One assistant per tab. Memory bolted on as a vector store with no provenance. Every prompt routed to the same model regardless of task. Your context lives somewhere you can't inspect or move.</p>
              </div>
              <div className="ba-cell ba-after">
                <div className="ba-label">[ ARCHIC ]</div>
                <div className="ba-statement">Local-first, multi-model, persistent.</div>
                <p className="ba-detail">Source-grounded memory you can audit. A native autorouter that sends planning to a reasoning model and execution to a coding model. Your providers, your subscriptions, your machine — composed.</p>
              </div>
            </div>

          </section>

          {/* CH.02 — THE THESIS / MANIFESTO */}
          <section id="manifesto" aria-labelledby="manifesto-title" className="manifesto-section">
            <span className="manifesto-mark" aria-hidden="true">§02</span>
            <div className="px-8 md:px-16 relative">
              <div className="flex items-center gap-3 mb-12 reveal">
                <span className="chapter-tag" aria-hidden="true">CH.02 / THE THESIS</span>
                <span className="section-rule flex-1 h-px bg-[color:var(--line-strong)]" aria-hidden="true" />
                <span className="tag-mono" aria-hidden="true">[ READ: 90S ]</span>
              </div>

              <h2 id="manifesto-title" className="display text-[1.6rem] md:text-[2.4rem] lg:text-[3rem] max-w-5xl leading-[1.15] mb-16 reveal">
                The model isn't the product. <span className="gold-mark">The infrastructure around it is.</span>
                <span className="text-[color:var(--muted-soft)]"> Three commitments Archic makes before shipping anything.</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[color:var(--line)]">
                <div className="manifesto-pillar p-8 md:p-10 border-b md:border-b-0 md:border-r border-[color:var(--line)] reveal reveal-delay-1">
                  <div className="tag-gold mb-5">[ 01 / LOCAL-FIRST ]</div>
                  <p className="text-[13px] leading-relaxed text-[color:var(--muted)]">
                    Your data, your models, your machine. Cloud is an <span className="text-[color:var(--ink-strong)]">option</span>, not the default. Everything Archic ships runs on your hardware without phoning home.
                  </p>
                </div>
                <div className="manifesto-pillar p-8 md:p-10 border-b md:border-b-0 md:border-r border-[color:var(--line)] reveal reveal-delay-2">
                  <div className="tag-gold mb-5">[ 02 / GROUNDED ]</div>
                  <p className="text-[13px] leading-relaxed text-[color:var(--muted)]">
                    Memory that returns <span className="text-[color:var(--ink-strong)]">sources</span>, not summaries. Provenance on every fact. No LLM at ingest, so context stays cheap and durable across sessions.
                  </p>
                </div>
                <div className="manifesto-pillar p-8 md:p-10 reveal reveal-delay-3">
                  <div className="tag-gold mb-5">[ 03 / HONEST ]</div>
                  <p className="text-[13px] leading-relaxed text-[color:var(--muted)]">
                    Real benchmarks, real comparisons, real caveats. We ship <span className="text-[color:var(--ink-strong)]">working demos</span> before slogans, and we say what doesn't work yet.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* CH.03 — THE STACK */}
          <section id="products" aria-labelledby="stack-title" className="border-b border-[color:var(--line)]">
            <div className="px-8 md:px-16 pt-16 md:pt-20 pb-10 reveal">
              <div className="flex items-center gap-3 mb-10">
                <span className="chapter-tag" aria-hidden="true">CH.03 / THE STACK</span>
                <span className="flex-1 h-px bg-[color:var(--line-strong)]" aria-hidden="true" />
                <span className="tag-mono" aria-hidden="true">[ 2 COMPONENTS · SHIPPING SUMMER 2026 ]</span>
              </div>
              <h2 id="stack-title" className="display text-[2rem] md:text-[2.8rem] max-w-3xl mb-6 leading-[1.05]">
                Memory and execution,<br />
                <span className="gold-mark">as independent local components.</span>
              </h2>
              <p className="text-[14px] text-[color:var(--muted)] max-w-2xl leading-relaxed">
                Two components, one subdomain each. Each ships on its own and each works without the other — because infrastructure you can't take apart isn't infrastructure.
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
          <section id="vision" aria-labelledby="vision-title" className="px-8 md:px-16 py-20 md:py-28 border-b border-[color:var(--line)]">
            <div className="flex items-center gap-3 mb-10 reveal">
              <span className="chapter-tag" aria-hidden="true">CH.04 / THE HORIZON</span>
              <span className="flex-1 h-px bg-[color:var(--line-strong)]" aria-hidden="true" />
              <span className="tag-mono" aria-hidden="true">[ NORTH_STAR ]</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-6 reveal">
                <h2 id="vision-title" className="display text-[2rem] md:text-[2.8rem] mb-8 leading-[1.05]">
                  Local-first infrastructure for<br />
                  <span className="gold-mark">a personal intelligence stack.</span>
                </h2>
                <p className="text-[14px] leading-relaxed text-[color:var(--muted)] max-w-xl mb-6">
                  The direction is a full local-first stack: memory, routing, execution, control. Midas and Apollo come first. Everything else stays parked until those two earn the right to grow.
                </p>
                <p className="text-[13px] leading-relaxed text-[color:var(--muted-soft)] max-w-xl italic">
                  Ship two components that hold under load before drawing a five-layer diagram.
                </p>
              </div>

              <div className="md:col-span-6 reveal">
                <div className="story-timeline">
                  <div className="story-step live">
                    <div className="tag-gold mb-2">[ NOW · MEMORY ]</div>
                    <div className="text-[15px] text-[color:var(--ink-strong)] mb-1">Midas — building</div>
                    <p className="text-[12.5px] text-[color:var(--muted)] leading-relaxed">Long-horizon memory for AI agents. Source-grounded recall, provenance, no LLM at ingest.</p>
                  </div>
                  <div className="story-step">
                    <div className="tag-gold mb-2">[ NEXT · EXECUTION ]</div>
                    <div className="text-[15px] text-[color:var(--ink-strong)] mb-1">Apollo — building</div>
                    <p className="text-[12.5px] text-[color:var(--muted)] leading-relaxed">Local-first CLI and desktop harness. Native autorouter across providers, subscriptions and APIs.</p>
                  </div>
                  <div className="story-step future">
                    <div className="tag-mono mb-2 text-[color:var(--muted-soft)]">[ LATER · CONTROL ]</div>
                    <div className="text-[15px] text-[color:var(--muted)] mb-1">Parked — by design</div>
                    <p className="text-[12.5px] text-[color:var(--muted-soft)] leading-relaxed">Policy, observability, orchestration. Unlocked when memory and execution earn it.</p>
                  </div>
                </div>
              </div>
            </div>

          </section>

          {/* CH.05 — THE INVITATION */}
          <section id="cta" aria-labelledby="cta-title" className="px-8 md:px-16 py-20 md:py-28">
            <div className="flex items-center gap-3 mb-10 reveal">
              <span className="chapter-tag" aria-hidden="true">CH.05 / THE INVITATION</span>
              <span className="flex-1 h-px bg-[color:var(--line-strong)]" aria-hidden="true" />
              <span className="tag-mono" aria-hidden="true">[ SHIPPING_NOW ]</span>
            </div>
            <div className="max-w-3xl reveal">
              <h2 id="cta-title" className="display text-[2.2rem] md:text-[3.2rem] mb-6 leading-[1.05]">
                Building in public.<br />
                <span className="gold-mark">Follow the work.</span>
              </h2>
              <p className="text-[14px] leading-relaxed text-[color:var(--muted)] mb-10 max-w-xl">
                Midas and Apollo ship this summer. Open the component sites for demos, benchmarks and progress notes — or read the source on GitHub.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://midas.archic.es" target="_blank" rel="noopener noreferrer" className="btn-primary" aria-label="Open Midas site">
                  Midas ↗
                </a>
                <a href="https://apollo.archic.es" target="_blank" rel="noopener noreferrer" className="btn-secondary" aria-label="Open Apollo site">
                  Apollo ↗
                </a>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost" aria-label="View on GitHub">
                  GitHub ↗
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
