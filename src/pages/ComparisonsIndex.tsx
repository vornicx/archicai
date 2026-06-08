import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { COMPARISON_INDEX, MIDAS_RECALL, MIDAS_ANSWER, BASELINE_RECALL } from '../data/comparisons'

function ScoreBar({
  value,
  highlight,
  muted,
  label,
}: {
  value: number | null | undefined
  highlight?: boolean
  muted?: boolean
  label: string
}) {
  const has = typeof value === 'number'
  const pct = has ? Math.max(0, Math.min(1, value!)) * 100 : 0
  const tone = highlight
    ? 'text-[color:var(--gold-bright)]'
    : muted
      ? 'text-[color:var(--muted-soft)]'
      : 'text-[color:var(--muted)]'
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between gap-3">
        <span className={`text-[11px] uppercase tracking-[0.18em] ${tone}`}>{label}</span>
        <span className={`font-mono text-[12px] ${highlight ? 'font-bold' : ''} ${tone}`}>
          {has ? value!.toFixed(2) : '—'}
        </span>
      </div>
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-[color:var(--line)]/60">
        {has && (
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: `${pct}%`,
              background: highlight
                ? 'linear-gradient(90deg, var(--gold), var(--gold-bright))'
                : 'var(--muted-soft)',
              opacity: highlight ? 1 : muted ? 0.4 : 0.6,
            }}
          />
        )}
      </div>
    </div>
  )
}

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
              All Midas numbers come straight from{' '}
              <a
                href="https://github.com/vornicx/Midas/blob/main/BENCHMARKS.md"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-[color:var(--gold-bright)]"
              >
                Midas/BENCHMARKS.md
              </a>
              ; rival numbers come from each project's own published source.
            </p>
          </header>

          {/* Track 1 leaderboard — recall@k */}
          <section className="space-y-6">
            <div className="space-y-2 max-w-3xl">
              <div className="section-label !mb-0">Track 1 · Memory-layer recall@k</div>
              <h2 className="heading-serif text-[1.8rem] md:text-[2.4rem]">Reader-independent retrieval.</h2>
              <p className="text-[14px] text-[color:var(--muted-soft)]">
                Fraction of gold supporting turns retrieved. Deterministic, no LLM. Midas
                vs a recency-window baseline on the same harness. <strong className="text-[color:var(--muted)]">N/A for
                LLM-fact-synthesising systems</strong> (mem0, Zep, Letta) — they don't return source
                turn IDs, so recall@k isn't computable for them.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="card-panel p-6 space-y-3">
                <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted-soft)]">LongMemEval-s</div>
                <ScoreBar label="Midas" value={MIDAS_RECALL.longmem} highlight />
                <ScoreBar label="Recency baseline" value={BASELINE_RECALL.longmem} muted />
              </div>
              <div className="card-panel p-6 space-y-3">
                <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted-soft)]">LoCoMo</div>
                <ScoreBar label="Midas" value={MIDAS_RECALL.locomo} highlight />
                <ScoreBar label="Recency baseline" value={BASELINE_RECALL.locomo} muted />
              </div>
            </div>
          </section>

          {/* Track 2 leaderboard — answer correctness */}
          <section className="space-y-6">
            <div className="space-y-2 max-w-3xl">
              <div className="section-label !mb-0">Track 2 · LongMemEval-s answer correctness</div>
              <h2 className="heading-serif text-[1.8rem] md:text-[2.4rem]">Reader-dependent headline.</h2>
              <p className="text-[14px] text-[color:var(--muted-soft)]">
                Full-pipeline answer score on LongMemEval-s. Each rival runs its own reader; Midas
                is measured at <span className="font-mono">{MIDAS_ANSWER.reader}</span> (n={MIDAS_ANSWER.n}).
                <strong className="text-[color:var(--muted)]"> mem0 and Zep are ahead of Midas on this
                metric today</strong> — and we publish them as such. They pay an LLM at every write to get
                there; Midas pays $0.
              </p>
            </div>

            <div className="card-panel p-6 md:p-8 space-y-4">
              <ScoreBar label={`Midas · ${MIDAS_ANSWER.reader}`} value={MIDAS_ANSWER.value} highlight />
              {COMPARISON_INDEX.map((c) =>
                c.benchmarks.answer.rival ? (
                  <ScoreBar
                    key={c.slug}
                    label={`${c.rival} · ${c.benchmarks.answer.rival.reader}`}
                    value={c.benchmarks.answer.rival.value}
                  />
                ) : null,
              )}
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="heading-serif text-[1.6rem] md:text-[2rem]">Pick a comparison</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {COMPARISON_INDEX.map((c) => {
                const rivalAnswer = c.benchmarks.answer.rival
                const midasAhead = !rivalAnswer || MIDAS_ANSWER.value >= rivalAnswer.value
                return (
                  <Link
                    key={c.slug}
                    to={`/docs/comparisons/${c.slug}`}
                    className="card-panel p-7 block group transition-colors hover:bg-[color:var(--line)]/30 space-y-4"
                  >
                    <div>
                      <div className="section-label !mb-2">vs {c.rival}</div>
                      <h3 className="heading-serif text-[1.4rem] md:text-[1.6rem] mb-3 group-hover:text-[color:var(--gold-bright)] transition-colors">
                        Midas vs {c.rival}
                      </h3>
                      <p className="text-[14px] leading-relaxed text-[color:var(--muted)]">{c.hookline}</p>
                    </div>
                    <div className="pt-3 border-t border-[color:var(--line)] space-y-2 text-[12px]">
                      <div className="flex items-center justify-between">
                        <span className="uppercase tracking-[0.18em] text-[10px] text-[color:var(--muted-soft)]">LongMemEval answer</span>
                        <span className={`font-mono ${midasAhead ? 'text-[color:var(--gold-bright)]' : 'text-[color:var(--muted)]'}`}>
                          Midas {MIDAS_ANSWER.value.toFixed(2)} · {c.rival.split(' ')[0]}{' '}
                          {rivalAnswer ? rivalAnswer.value.toFixed(2) : '—'}
                        </span>
                      </div>
                      <div className="text-[11px] text-[color:var(--muted-soft)] italic">
                        {midasAhead ? 'Midas ahead or N/A' : `${c.rival.split(' ')[0]} ahead on this headline`}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        </div>
      </article>
    </>
  )
}

export default ComparisonsIndex
