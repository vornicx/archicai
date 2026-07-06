import { Helmet } from 'react-helmet-async'
import { GITHUB_URL } from '../constants'
import acropolisUrl from '../assets/acropolis-header.png'
import logoUrl from '../assets/archic-logo.png'
const acropolisAsset = { url: acropolisUrl }
const logoAsset = { url: logoUrl }

const BLUE = '#0c1a60'
const BLUE_INK = '#14267c'
const CREAM = '#f2e8d0'
const PAPER = '#f3ecdc'
const PAPER_SOFT = '#fdf9f0'
const GOLD = '#c9a24a'
const GOLD_BRIGHT = '#e6c877'
const GOLD_DEEP = '#b0863a'

const mono: React.CSSProperties = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }
const serif: React.CSSProperties = { fontFamily: 'Marcellus, serif' }
const sans: React.CSSProperties = { fontFamily: 'Archivo, sans-serif' }

const STATS = [
  { val: '3', label: 'LAYERS · MEMORY / HARNESS / INTERFACE' },
  { val: '1', label: 'FOUNDER · SHIPPING IN PUBLIC' },
  { val: 'SS26', label: 'MIDAS + APOLLO · SUMMER 2026' },
  { val: '0', label: 'LLM CALLS AT INGEST · MIDAS' },
]

const LAYERS = [
  {
    layer: 'L1 · MEMORY',
    name: 'Midas',
    desc: 'Long-horizon agent memory. Source-grounded recall with full provenance. No LLM calls at ingest — durable context across sessions.',
    url: 'MIDAS.ARCHIC.ES',
    href: 'https://midas.archic.es',
    status: 'BUILDING · SS26',
  },
  {
    layer: 'L2 · HARNESS',
    name: 'Apollo',
    desc: 'Local-first CLI and desktop harness. Native autorouter across providers — reasoning model plans, coding model acts.',
    url: 'APOLLO.ARCHIC.ES',
    href: 'https://apollo.archic.es',
    status: 'BUILDING · SS26',
  },
  {
    layer: 'L3 · INTERFACE',
    name: 'Origin',
    desc: 'A personal interface for the stack. Design phase — unlocked once memory and execution earn it.',
    url: '— PARKED —',
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

function TopBar() {
  return (
    <div
      style={{
        background: BLUE,
        color: 'rgba(242,232,208,0.55)',
        borderBottom: `1px solid rgba(201,162,74,0.28)`,
        ...mono,
        fontSize: 10,
        letterSpacing: '0.18em',
        fontWeight: 500,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 40px',
        }}
      >
        <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
          <span style={{ color: GOLD }}>[ ECOSYSTEM ]</span>
          <span style={{ color: CREAM, borderBottom: `2px solid ${GOLD}`, paddingBottom: 2 }}>ARCHIC.ES</span>
          <a href="https://midas.archic.es" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>/ MIDAS</a>
          <a href="https://apollo.archic.es" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>/ APOLLO</a>
          <span>/ ORIGIN</span>
        </div>
        <span>
          <span style={{ color: GOLD }}>◆</span> SYS · OK
        </span>
      </div>
    </div>
  )
}

function Nav() {
  return (
    <div
      style={{
        background: BLUE,
        borderBottom: `1px solid rgba(201,162,74,0.24)`,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '18px 40px',
        }}
      >
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none' }}>
          <img
            src={logoAsset.url}
            alt="Archic"
            style={{ width: 40, height: 40, borderRadius: 6, boxShadow: `0 0 0 1px rgba(201,162,74,0.4)` }}
          />
          <span style={{ ...serif, fontSize: 19, letterSpacing: '0.4em', color: GOLD_BRIGHT }}>ARCHIC</span>
        </a>
        <div
          style={{
            ...mono,
            fontSize: 10.5,
            fontWeight: 500,
            letterSpacing: '0.16em',
            color: 'rgba(242,232,208,0.7)',
            display: 'flex',
            alignItems: 'center',
            gap: 28,
          }}
        >
          <a href="#thesis" style={{ color: 'inherit', textDecoration: 'none' }}>MANIFESTO</a>
          <a href="#stack" style={{ color: 'inherit', textDecoration: 'none' }}>STACK</a>
          <a href="#horizon" style={{ color: 'inherit', textDecoration: 'none' }}>VISION</a>
          <span style={{ color: 'rgba(201,162,74,0.5)' }}>|</span>
          <a href="https://midas.archic.es" target="_blank" rel="noreferrer" style={{ color: GOLD_BRIGHT, textDecoration: 'none' }}>MIDAS ↗</a>
          <a href="https://apollo.archic.es" target="_blank" rel="noreferrer" style={{ color: GOLD_BRIGHT, textDecoration: 'none' }}>APOLLO ↗</a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              border: `1px solid rgba(201,162,74,0.55)`,
              padding: '6px 12px',
              color: CREAM,
              textDecoration: 'none',
            }}
          >
            [ GITHUB ]
          </a>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <div style={{ background: BLUE, color: CREAM }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ position: 'relative' }}>
          <img
            src={acropolisAsset.url}
            alt="Acropolis rendered in digital pointillism"
            style={{ display: 'block', width: '100%', height: 520, objectFit: 'cover', objectPosition: 'center 30%' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg,rgba(12,26,96,0.35) 0%,rgba(12,26,96,0) 30%,rgba(12,26,96,0.2) 62%,rgba(12,26,96,0.92) 88%,#0c1a60 100%)',
            }}
          />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 30, textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-block',
                ...mono,
                fontWeight: 500,
                fontSize: 10,
                letterSpacing: '0.22em',
                color: GOLD_BRIGHT,
                background: 'rgba(12,26,96,0.75)',
                border: `1px solid rgba(201,162,74,0.55)`,
                borderRadius: 999,
                padding: '7px 16px',
              }}
            >
              EST. MMXXVI · LOCAL-FIRST INFRASTRUCTURE
            </div>
          </div>
        </div>

        <div style={{ padding: '34px 40px 74px', textAlign: 'center' }}>
          <h1
            style={{
              margin: '0 auto',
              maxWidth: 980,
              ...serif,
              fontWeight: 400,
              fontSize: 'clamp(44px, 6.4vw, 74px)',
              lineHeight: 1.12,
              color: CREAM,
            }}
          >
            Foundations for agents<br />
            that <span style={{ color: GOLD_BRIGHT, borderBottom: `3px solid ${GOLD}` }}>remember</span>.
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 28 }}>
            <div style={{ width: 120, height: 1, background: 'rgba(201,162,74,0.5)' }} />
            <span style={{ color: GOLD, fontSize: 11 }}>◆</span>
            <div style={{ width: 120, height: 1, background: 'rgba(201,162,74,0.5)' }} />
          </div>
          <p
            style={{
              margin: '24px auto 0',
              maxWidth: 620,
              ...mono,
              fontSize: 12.5,
              lineHeight: 2,
              letterSpacing: '0.06em',
              color: 'rgba(242,232,208,0.75)',
              textTransform: 'uppercase',
            }}
          >
            The local-first infrastructure for a personal agentic system — memory, harness and interface as separate, inspectable layers.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 38, flexWrap: 'wrap' }}>
            <a
              href="#stack"
              style={{
                background: GOLD,
                color: BLUE,
                ...sans,
                fontWeight: 600,
                fontSize: 13,
                padding: '14px 28px',
                borderRadius: 999,
                textDecoration: 'none',
              }}
            >
              Explore the stack ↓
            </a>
            <a
              href="https://midas.archic.es"
              target="_blank"
              rel="noreferrer"
              style={{
                border: `1px solid rgba(242,232,208,0.4)`,
                color: CREAM,
                ...sans,
                fontWeight: 500,
                fontSize: 13,
                padding: '13px 26px',
                borderRadius: 999,
                textDecoration: 'none',
              }}
            >
              Start with Midas ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function Stats() {
  return (
    <div
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        background: PAPER,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        borderBottom: `1px solid rgba(20,38,124,0.18)`,
      }}
    >
      {STATS.map((s, i) => (
        <div
          key={i}
          style={{
            padding: '24px 32px',
            borderRight: i < STATS.length - 1 ? `1px solid rgba(20,38,124,0.14)` : 'none',
          }}
        >
          <div style={{ ...serif, fontSize: 30, color: GOLD_DEEP }}>{s.val}</div>
          <div style={{ marginTop: 7, ...mono, fontWeight: 500, fontSize: 8.5, letterSpacing: '0.12em', color: 'rgba(20,38,124,0.6)' }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  )
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ ...mono, fontWeight: 500, fontSize: 10, letterSpacing: '0.22em', color: GOLD_DEEP }}>
      {children}
    </div>
  )
}

function Thesis() {
  return (
    <section id="thesis" style={{ maxWidth: 1280, margin: '0 auto', background: PAPER, padding: '70px 40px 30px' }}>
      <SectionTag>§02 / THE THESIS</SectionTag>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 60,
          marginTop: 18,
          alignItems: 'start',
        }}
      >
        <h2 style={{ margin: 0, ...serif, fontSize: 'clamp(30px, 3.6vw, 44px)', lineHeight: 1.22, color: BLUE_INK }}>
          Infrastructure before intelligence.
        </h2>
        <p style={{ margin: '6px 0 0', ...sans, fontSize: 14.5, lineHeight: 1.85, color: 'rgba(20,38,124,0.72)' }}>
          A personal agent you can trust doesn't start with a bigger model — it starts with a substrate you can inspect. Archic builds that substrate as separate, local-first layers: memory with provenance, a harness with limits, an interface that answers to you. One layer at a time, in the open.
        </p>
      </div>
    </section>
  )
}

function Stack() {
  return (
    <section id="stack" style={{ maxWidth: 1280, margin: '0 auto', background: PAPER, padding: '40px 40px 70px' }}>
      <SectionTag>§03 / THE STACK</SectionTag>
      <h2 style={{ margin: '16px 0 0', ...serif, fontSize: 'clamp(30px, 3.6vw, 44px)', lineHeight: 1.15, color: BLUE_INK }}>
        One layer at a time.
      </h2>

      <div style={{ marginTop: 24 }}>
        {LAYERS.map((l, i) => {
          const Row = (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '130px 220px 1fr 190px 130px',
                gap: 24,
                alignItems: 'baseline',
                padding: '28px 0',
                borderBottom: i < LAYERS.length - 1 ? `1px solid rgba(20,38,124,0.16)` : `1px solid rgba(20,38,124,0.16)`,
                color: BLUE_INK,
                textDecoration: 'none',
              }}
              className="stack-row"
            >
              <span style={{ ...mono, fontSize: 10, letterSpacing: '0.14em', color: GOLD_DEEP }}>{l.layer}</span>
              <span style={{ ...serif, fontSize: 34, color: BLUE_INK }}>{l.name}</span>
              <span style={{ ...sans, fontSize: 13, lineHeight: 1.7, color: 'rgba(20,38,124,0.7)' }}>{l.desc}</span>
              <span style={{ ...mono, fontWeight: 500, fontSize: 10, letterSpacing: '0.12em', color: 'rgba(20,38,124,0.6)' }}>{l.url}</span>
              <span style={{ ...mono, fontWeight: 500, fontSize: 8.5, letterSpacing: '0.12em', textAlign: 'right', color: GOLD_DEEP }}>
                {l.status}
              </span>
            </div>
          )
          return l.href ? (
            <a key={l.name} href={l.href} target="_blank" rel="noreferrer" style={{ display: 'block', textDecoration: 'none' }}>
              {Row}
            </a>
          ) : (
            <div key={l.name}>{Row}</div>
          )
        })}
      </div>
    </section>
  )
}

function Horizon() {
  return (
    <section id="horizon" style={{ maxWidth: 1280, margin: '0 auto', background: PAPER, padding: '10px 40px 70px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 60,
          alignItems: 'center',
        }}
      >
        <div>
          <SectionTag>§04 / THE HORIZON</SectionTag>
          <h2 style={{ margin: '16px 0 0', ...serif, fontSize: 'clamp(30px, 3.4vw, 42px)', lineHeight: 1.2, color: BLUE_INK }}>
            One system,<br />built in layers.
          </h2>
          <p style={{ margin: '22px 0 0', ...sans, fontSize: 14, lineHeight: 1.85, color: 'rgba(20,38,124,0.7)', maxWidth: 460 }}>
            The destination is a personal system that runs where you live: memory with provenance, a harness that acts within limits you set, an interface you can see and speak to. No dates promised — each layer ships when it can be inspected.
          </p>
        </div>

        <div
          style={{
            border: `1px solid rgba(201,162,74,0.5)`,
            background: BLUE,
            ...mono,
            fontSize: 12,
            lineHeight: 1.9,
            boxShadow: `0 10px 34px rgba(20,38,124,0.16)`,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '12px 20px',
              borderBottom: `1px solid rgba(201,162,74,0.3)`,
              fontSize: 9.5,
              letterSpacing: '0.14em',
              color: 'rgba(242,232,208,0.5)',
            }}
          >
            <span>archic-status</span>
            <span>LOCAL ONLY</span>
          </div>
          <div style={{ padding: '22px 24px', color: 'rgba(242,232,208,0.82)' }}>
            <span style={{ color: GOLD_BRIGHT }}>$ archic status</span>
            <br />→ local-first · open · auditable
            <br />
            <br />
            L1&nbsp;&nbsp;memory&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;midas&nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ color: GOLD_BRIGHT }}>building · ss26</span>
            <br />
            L2&nbsp;&nbsp;harness&nbsp;&nbsp;&nbsp;&nbsp;apollo&nbsp;&nbsp;&nbsp;
            <span style={{ color: GOLD_BRIGHT }}>building · ss26</span>
            <br />
            L3&nbsp;&nbsp;interface&nbsp;&nbsp;origin&nbsp;&nbsp;&nbsp;
            <span style={{ color: 'rgba(242,232,208,0.5)' }}>design phase</span>
            <br />
            <br />
            <span style={{ color: 'rgba(242,232,208,0.5)' }}># nothing ships before it can be inspected</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Principles() {
  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', background: PAPER, padding: '0 40px 70px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 20,
        }}
      >
        {PRINCIPLES.map((p) => (
          <div
            key={p.num}
            style={{
              border: `1px solid rgba(20,38,124,0.2)`,
              padding: 30,
              background: PAPER_SOFT,
            }}
          >
            <div style={{ ...mono, fontSize: 10, letterSpacing: '0.16em', color: GOLD_DEEP }}>{p.num}</div>
            <div style={{ marginTop: 14, ...serif, fontSize: 25, color: BLUE_INK }}>{p.title}</div>
            <p style={{ margin: '12px 0 0', ...sans, fontSize: 13, lineHeight: 1.75, color: 'rgba(20,38,124,0.7)' }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', background: PAPER, padding: '0 40px 70px' }}>
      <div
        style={{
          padding: '52px 48px',
          border: `1px solid rgba(176,134,58,0.6)`,
          background: PAPER_SOFT,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 40,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <h2 style={{ margin: 0, ...serif, fontSize: 'clamp(28px, 3.2vw, 40px)', lineHeight: 1.2, color: BLUE_INK }}>
            Start with <span style={{ color: GOLD_DEEP }}>Midas</span>.
          </h2>
          <p style={{ margin: '14px 0 0', ...sans, fontSize: 13, lineHeight: 1.7, color: 'rgba(20,38,124,0.72)', maxWidth: 520 }}>
            The memory layer is the first to ship. Apollo follows the same pattern: open, inspectable, announced when it runs. Origin waits its turn.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <a
            href="https://midas.archic.es"
            target="_blank"
            rel="noreferrer"
            style={{
              background: BLUE_INK,
              color: PAPER,
              ...sans,
              fontWeight: 600,
              fontSize: 13,
              padding: '14px 28px',
              borderRadius: 999,
              textDecoration: 'none',
            }}
          >
            Get Midas ↗
          </a>
          <a
            href="mailto:hello@archic.es"
            style={{
              border: `1px solid rgba(20,38,124,0.45)`,
              color: BLUE_INK,
              ...sans,
              fontWeight: 500,
              fontSize: 13,
              padding: '13px 26px',
              borderRadius: 999,
              textDecoration: 'none',
            }}
          >
            hello@archic.es
          </a>
        </div>
      </div>
    </section>
  )
}

function FooterBar() {
  return (
    <footer
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        background: PAPER,
        padding: '30px 40px',
        borderTop: `1px solid rgba(20,38,124,0.16)`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
        flexWrap: 'wrap',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src={logoAsset.url} alt="" style={{ width: 28, height: 28, borderRadius: 5 }} />
        <span style={{ ...serif, fontSize: 13, letterSpacing: '0.34em', color: BLUE_INK }}>ARCHIC</span>
      </div>
      <div style={{ display: 'flex', gap: 26, ...mono, fontSize: 10, letterSpacing: '0.14em', color: 'rgba(20,38,124,0.62)' }}>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>GITHUB</a>
        <a href="https://midas.archic.es" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>MIDAS</a>
        <a href="https://apollo.archic.es" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>APOLLO</a>
        <a href="mailto:hello@archic.es" style={{ color: 'inherit', textDecoration: 'none' }}>HELLO@ARCHIC.ES</a>
      </div>
      <span style={{ ...mono, fontSize: 10, color: 'rgba(20,38,124,0.45)' }}>© 2026 ARCHIC</span>
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

      <div id="top" style={{ background: BLUE, minHeight: '100vh' }}>
        <TopBar />
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
