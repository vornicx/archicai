import { Helmet } from 'react-helmet-async'
import { GITHUB_URL } from '../constants'
import acropolisUrl from '../assets/acropolis-header.png'
import logoUrl from '../assets/archic-logo.png'

const acropolisAsset = { url: acropolisUrl }
const logoAsset = { url: logoUrl }

const STATS = [
  { val: '1', label: 'LAYER · MEMORY' },
  { val: '1', label: 'FOUNDER · SHIPPING IN PUBLIC' },
  { val: 'SS26', label: 'MIDAS · SUMMER 2026' },
  { val: '0', label: 'LLM CALLS AT INGEST · MIDAS' },
]

const LAYERS = [
  {
    layer: 'L1 · MEMORY',
    name: 'Midas',
    desc: 'Long-horizon agent memory. Source-grounded recall with full provenance. No LLM calls at ingest — durable context across sessions.',
    url: 'midas.archic.es',
    href: 'https://midas.archic.es',
    status: 'BUILDING · SS26',
  },
  {
    layer: 'L2 · INTERFACE',
    name: 'Origin',
    desc: 'A personal interface for the stack. Design phase — unlocked once memory earns it.',
    url: '— parked —',
    href: null,
    status: 'DESIGN PHASE',
  },
] as const

const PRINCIPLES = [
  {
    num: '§ 01',
    title: 'Local-first',
    desc: 'Your data, your models, your machine. Cloud is an option, not the default. Nothing phones home.',
  },
  {
    num: '§ 02',
    title: 'Grounded',
    desc: 'Memory returns sources, not summaries. Provenance on every fact. No LLM at ingest — context stays cheap and auditable.',
  },
  {
    num: '§ 03',
    title: 'Honest',
    desc: 'Real benchmarks, real caveats. Working demos before slogans. We say what does not work yet.',
  },
]

function Nav() {
  return (
    <nav className="ah-nav">
      <div className="ah-container ah-nav-inner">
        <a href="#top" className="ah-brand">
          <img src={logoAsset.url} alt="Archic" />
          <span>ARCHIC</span>
        </a>
        <div className="ah-nav-links">
          <a href="#thesis">MANIFESTO</a>
          <a href="#stack">STACK</a>
          <a href="#horizon">VISION</a>
          <span className="ah-nav-sep" aria-hidden>|</span>
          <a href="https://midas.archic.es" target="_blank" rel="noreferrer" className="ah-nav-gold">MIDAS ↗</a>
          <a href="https://apollo.archic.es" target="_blank" rel="noreferrer" className="ah-nav-gold">APOLLO ↗</a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="ah-nav-btn">{"\n"}</a>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <header className="ah-hero">
      <div className="ah-container">
        <div className="ah-hero-image-wrap">
          <img src={acropolisAsset.url} alt="Acropolis rendered in digital pointillism" />
          <div className="ah-hero-fade" />
          <div className="ah-hero-chip-wrap">
            <span className="ah-hero-chip">EST. MMXXVI · LOCAL-FIRST INFRASTRUCTURE</span>
          </div>
        </div>

        <div className="ah-hero-body">
          <h1 className="ah-hero-title">
            Foundations for agents<br />
            that <span className="ah-hero-accent">remember</span>.
          </h1>
          <div className="ah-hero-rule" aria-hidden>
            <span /><em>◆</em><span />
          </div>
          <p className="ah-hero-lede">
            The local-first infrastructure for a personal agentic system — memory, harness and interface as separate, inspectable layers.
          </p>
          <div className="ah-hero-ctas">
            <a href="#stack" className="ah-btn ah-btn-gold">Explore the stack ↓</a>
            <a href="https://midas.archic.es" target="_blank" rel="noreferrer" className="ah-btn ah-btn-ghost">Start with Midas ↗</a>
          </div>
        </div>
      </div>
    </header>
  )
}

function Stats() {
  return (
    <div className="ah-container">
      <div className="ah-stats">
        {STATS.map((s, i) => (
          <div key={i} className="ah-stat">
            <div className="ah-stat-val">{s.val}</div>
            <div className="ah-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return <div className="ah-section-tag">{children}</div>
}

function Thesis() {
  return (
    <section id="thesis" className="ah-container ah-section">
      <SectionTag>§02 / THE THESIS</SectionTag>
      <div className="ah-two-col">
        <h2 className="ah-h2">Infrastructure before intelligence.</h2>
        <p className="ah-body">
          A personal agent you can trust doesn't start with a bigger model — it starts with a substrate you can inspect. Archic builds that substrate as separate, local-first layers: memory with provenance, a harness with limits, an interface that answers to you. One layer at a time, in the open.
        </p>
      </div>
    </section>
  )
}

function Stack() {
  return (
    <section id="stack" className="ah-container ah-section">
      <SectionTag>§03 / THE STACK</SectionTag>
      <h2 className="ah-h2 ah-h2-tight">One layer at a time.</h2>

      <div className="ah-stack">
        {LAYERS.map((l) => {
          const inner = (
            <>
              <div className="ah-stack-head">
                <span className="ah-stack-layer">{l.layer}</span>
                <span className="ah-stack-status">{l.status}</span>
              </div>
              <div className="ah-stack-name">{l.name}</div>
              <p className="ah-stack-desc">{l.desc}</p>
              <div className="ah-stack-url">{l.url}</div>
            </>
          )
          return l.href ? (
            <a key={l.name} href={l.href} target="_blank" rel="noreferrer" className="ah-stack-row ah-stack-row-link">
              {inner}
            </a>
          ) : (
            <div key={l.name} className="ah-stack-row">{inner}</div>
          )
        })}
      </div>
    </section>
  )
}

function Horizon() {
  return (
    <section id="horizon" className="ah-container ah-section">
      <div className="ah-two-col ah-two-col-center">
        <div>
          <SectionTag>§04 / THE HORIZON</SectionTag>
          <h2 className="ah-h2 ah-h2-tight">One system,<br />built in layers.</h2>
          <p className="ah-body ah-body-narrow">
            The destination is a personal system that runs where you live: memory with provenance, a harness that acts within limits you set, an interface you can see and speak to. No dates promised — each layer ships when it can be inspected.
          </p>
        </div>

        <div className="ah-terminal">
          <div className="ah-terminal-bar">
            <span>archic-status</span>
            <span>LOCAL ONLY</span>
          </div>
          <div className="ah-terminal-body">
            <span className="ah-term-gold">$ archic status</span><br />
            → local-first · open · auditable<br /><br />
            L1&nbsp;&nbsp;memory&nbsp;&nbsp;&nbsp;&nbsp;midas&nbsp;&nbsp;&nbsp;&nbsp;<span className="ah-term-gold">building · ss26</span><br />
            L2&nbsp;&nbsp;harness&nbsp;&nbsp;&nbsp;apollo&nbsp;&nbsp;&nbsp;<span className="ah-term-gold">building · ss26</span><br />
            L3&nbsp;&nbsp;interface&nbsp;origin&nbsp;&nbsp;&nbsp;<span className="ah-term-mute">design phase</span><br /><br />
            <span className="ah-term-mute"># nothing ships before it can be inspected</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Principles() {
  return (
    <section className="ah-container ah-section-tight">
      <div className="ah-principles">
        {PRINCIPLES.map((p) => (
          <div key={p.num} className="ah-principle">
            <div className="ah-principle-num">{p.num}</div>
            <div className="ah-principle-title">{p.title}</div>
            <p className="ah-principle-desc">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="ah-container ah-section-tight">
      <div className="ah-cta">
        <div>
          <h2 className="ah-h2 ah-h2-tight">Start with <span className="ah-cta-gold">Midas</span>.</h2>
          <p className="ah-body ah-body-narrow">
            The memory layer is the first to ship. Apollo follows the same pattern: open, inspectable, announced when it runs. Origin waits its turn.
          </p>
        </div>
        <div className="ah-cta-actions">
          <a href="https://midas.archic.es" target="_blank" rel="noreferrer" className="ah-btn ah-btn-ink">Get Midas ↗</a>
          <a href="mailto:vornic@archic.es" className="ah-btn ah-btn-outline">vornic@archic.es</a>
        </div>
      </div>
    </section>
  )
}

function FooterBar() {
  return (
    <footer className="ah-container ah-footer">
      <div className="ah-footer-brand">
        <img src={logoAsset.url} alt="" />
        <span>ARCHIC</span>
      </div>
      <div className="ah-footer-links">
        <a href={GITHUB_URL} target="_blank" rel="noreferrer">GITHUB</a>
        <a href="https://midas.archic.es" target="_blank" rel="noreferrer">MIDAS</a>
        <a href="https://apollo.archic.es" target="_blank" rel="noreferrer">APOLLO</a>
        <a href="mailto:vornic@archic.es">VORNIC@ARCHIC.ES</a>
      </div>
      <span className="ah-footer-copy">© 2026 ARCHIC</span>
    </footer>
  )
}

export default function ArchicHome() {
  return (
    <>
      <Helmet>
        <title>Archic — Foundations for agents that remember</title>
        <meta
          name="description"
          content="Local-first infrastructure for a personal agentic system. Memory, harness and interface as separate, inspectable layers. Midas + Apollo shipping summer 2026."
        />
        <link rel="canonical" href="https://archic.es/" />
        <meta property="og:title" content="Archic — Foundations for agents that remember" />
        <meta
          property="og:description"
          content="Local-first infrastructure for a personal agentic system. Midas for memory, Apollo for execution, Origin for interface — one layer at a time."
        />
        <meta property="og:url" content="https://archic.es/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Archic" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Archic — Foundations for agents that remember" />
        <meta
          name="twitter:description"
          content="Local-first infrastructure for a personal agentic system. Midas, Apollo, Origin — separate, inspectable layers."
        />
      </Helmet>

      <div id="top" className="ah-root">
        <Nav />
        <Hero />
        <Stats />
        <Thesis />
        <Stack />
        <Horizon />
        <Principles />
        <CTA />
        <FooterBar />
      </div>
    </>
  )
}
