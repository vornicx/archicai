import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { COMPARISON_INDEX, MIDAS_SCORES } from '../data/comparisons'

type MetricKey = 'longmem' | 'locomo'
const METRICS: { key: MetricKey; label: string }[] = [
  { key: 'longmem', label: 'LongMemEval-S' },
  { key: 'locomo', label: 'LoCoMo' },
]

function ScoreBar({ value, highlight, label }: { value: number | null | undefined; highlight?: boolean; label: string }) {
  const has = typeof value === 'number'
  const pct = has ? Math.max(0, Math.min(1, value!)) * 100 : 0
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between gap-3">
        <span className={`text-[11px] uppercase tracking-[0.18em] ${highlight ? 'text-[color:var(--gold-bright)]' : 'text-[color:var(--muted-soft)]'}`}>{label}</span>
        <span className={`font-mono text-[12px] ${highlight ? 'text-[color:var(--gold-bright)] font-bold' : 'text-[color:var(--muted)]'}`}>{has ? value!.toFixed(2) : '—'}</span>
      </div>
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-[color:var(--line)]/60">
        {has && (
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: `${pct}%`,
              background: highlight ? 'linear-gradient(90deg, var(--gold), var(--gold-bright))' : 'var(--muted-soft)',
              opacity: highlight ? 1 : 0.55,
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
              Same shape every time: feature table, architectural trade-offs, when to pick each one.
            </p>
          </header>

          {/* Visual leaderboard */}
          <section className="space-y-6">
            <div className="space-y-2 max-w-3xl">
              <div className="section-label !mb-0">Leaderboard</div>
              <h2 className="heading-serif text-[1.8rem] md:text-[2.4rem]">Recall@k across the field.</h2>
              <p className="text-[14px] text-[color:var(--muted-soft)]">
                Reader-independent recall@k on two long-horizon memory datasets. Higher is better.
                Empty bars mean no comparable number has been published. Where a rival ties or
                beats Midas, the bar shows it — we publish the field as it is, not as we wish it
                were. Midas numbers come from a single team’s harness; treat margins under ~0.02
                as ties.
              </p>
            </div>

            {METRICS.map((m) => (
              <div key={m.key} className="card-panel p-6 md:p-8 space-y-4">
                <div className="flex items-baseline justify-between gap-3 border-b border-[color:var(--line)] pb-2">
                  <div className="font-display text-[15px] font-medium text-[color:var(--ink)]">{m.label}</div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted-soft)]">recall@k · higher is better</div>
                </div>
                <ScoreBar label="Midas" value={MIDAS_SCORES[m.key]} highlight />
                {COMPARISON_INDEX.map((c) => (
                  <ScoreBar key={c.slug} label={c.rival} value={c.benchmarks.rival[m.key]} />
                ))}
              </div>
            ))}
          </section>

          <section className="space-y-5">
            <h2 className="heading-serif text-[1.6rem] md:text-[2rem]">Pick a comparison</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {COMPARISON_INDEX.map((c) => (
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
                  <div className="space-y-2 pt-3 border-t border-[color:var(--line)]">
                    {METRICS.map((m) => {
                      const shortMetric = m.key === 'longmem' ? 'LongMem' : 'LoCoMo'
                      const rivalShort = c.rival.split(' ')[0]
                      return (
                        <div key={m.key} className="space-y-1.5 text-[12px]">
                          <div className="flex items-center justify-between">
                            <span className="uppercase tracking-[0.18em] text-[color:var(--muted-soft)] text-[10px]">{shortMetric}</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--gold-bright)] shrink-0">Midas</span>
                              <div className="relative h-1.5 flex-1 min-w-0 overflow-hidden rounded-full bg-[color:var(--line)]/60">
                                <div
                                  className="absolute inset-y-0 left-0 rounded-full"
                                  style={{
                                    width: `${(MIDAS_SCORES[m.key] ?? 0) * 100}%`,
                                    background: 'linear-gradient(90deg, var(--gold), var(--gold-bright))',
                                  }}
                                />
                              </div>
                              <span className="font-mono text-[11px] text-[color:var(--gold-bright)] shrink-0 w-9 text-right">{MIDAS_SCORES[m.key]?.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted-soft)] shrink-0 max-w-[60px] truncate">{rivalShort}</span>
                              <div className="relative h-1.5 flex-1 min-w-0 overflow-hidden rounded-full bg-[color:var(--line)]/60">
                                {typeof c.benchmarks.rival[m.key] === 'number' && (
                                  <div
                                    className="absolute inset-y-0 left-0 rounded-full bg-[color:var(--muted-soft)]/60"
                                    style={{ width: `${(c.benchmarks.rival[m.key] as number) * 100}%` }}
                                  />
                                )}
                              </div>
                              <span className="font-mono text-[11px] text-[color:var(--muted)] shrink-0 w-9 text-right">
                                {typeof c.benchmarks.rival[m.key] === 'number' ? (c.benchmarks.rival[m.key] as number).toFixed(2) : '—'}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </article>
    </>
  )
}

export default ComparisonsIndex
