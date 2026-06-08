import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { COMPARISON_INDEX } from '../data/comparisons'

function ComparisonsIndex() {
  const url = 'https://archic.es/docs/comparisons'
  return (
    <>
      <Helmet>
        <title>Midas comparisons — vs mem0, Letta, Zep, LangMem</title>
        <meta
          name="description"
          content="Head-to-head comparisons of Midas against the most-used AI agent memory frameworks: mem0, Letta (MemGPT), Zep and LangMem."
        />
        <link rel="canonical" href={url} />
        <meta property="og:title" content="Midas comparisons — vs mem0, Letta, Zep, LangMem" />
        <meta property="og:description" content="How Midas's local-first, SQLite-backed, MCP-first memory compares to the best-known AI agent memory frameworks." />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
      </Helmet>

      <article className="section-padding">
        <div className="container-page space-y-14">
          <header className="max-w-3xl space-y-6">
            <nav aria-label="Breadcrumb" className="text-[12px] uppercase tracking-[0.22em] text-[color:var(--muted-soft)]">
              <Link to="/" className="hover:text-[color:var(--gold-bright)]">Archic</Link>
              <span className="mx-2">/</span>
              <Link to="/midas" className="hover:text-[color:var(--gold-bright)]">Midas</Link>
              <span className="mx-2">/</span>
              <span>Comparisons</span>
            </nav>
            <div className="section-label !mb-0">AI agent memory · comparisons</div>
            <h1 className="heading-serif text-[2.4rem] sm:text-[3rem] md:text-[3.6rem] font-light">
              Midas vs the field.
            </h1>
            <p className="text-lg leading-relaxed text-[color:var(--muted)]">
              Honest, technical comparisons against the most-used AI agent memory frameworks today.
              Same shape every time: feature table, architectural trade-offs, when to pick each one.
            </p>
          </header>

          <div className="grid gap-5 md:grid-cols-2">
            {COMPARISON_INDEX.map((c) => (
              <Link
                key={c.slug}
                to={`/docs/comparisons/${c.slug}`}
                className="card-panel p-7 block group transition-colors hover:bg-[color:var(--line)]/30"
              >
                <div className="section-label !mb-2">vs {c.rival}</div>
                <h2 className="heading-serif text-[1.4rem] md:text-[1.6rem] mb-3 group-hover:text-[color:var(--gold-bright)] transition-colors">
                  Midas vs {c.rival}
                </h2>
                <p className="text-[14px] leading-relaxed text-[color:var(--muted)]">{c.hookline}</p>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </>
  )
}

export default ComparisonsIndex
