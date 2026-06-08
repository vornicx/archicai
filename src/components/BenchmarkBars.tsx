import type { RecallTrack, AnswerTrack } from '../data/comparisons'

type Props = {
  rival: string
  recall: RecallTrack
  answer: AnswerTrack
}

function Bar({
  name,
  value,
  highlight,
  muted,
  suffix,
}: {
  name: string
  value: number | null | undefined
  highlight?: boolean
  muted?: boolean
  suffix?: string
}) {
  const has = typeof value === 'number'
  const pct = has ? Math.max(0, Math.min(1, value!)) * 100 : 0
  const tone = highlight
    ? 'text-[color:var(--gold-bright)]'
    : muted
      ? 'text-[color:var(--muted-soft)]'
      : 'text-[color:var(--muted)]'
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className={`text-[12px] uppercase tracking-[0.18em] ${tone}`}>{name}</span>
        <span className={`font-mono text-[13px] ${highlight ? 'font-bold' : ''} ${tone}`}>
          {has ? value!.toFixed(2) : '—'}
          {suffix && has ? <span className="text-[10px] ml-1 opacity-70">{suffix}</span> : null}
        </span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-[color:var(--line)]/60">
        {has && (
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-700"
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

function NaBlock({ label, reason }: { label: string; reason: string }) {
  return (
    <div className="rounded-md border border-dashed border-[color:var(--line)] px-4 py-3 text-[12px] leading-relaxed text-[color:var(--muted-soft)] italic">
      <span className="not-italic font-mono uppercase tracking-[0.18em] text-[11px] text-[color:var(--muted)] mr-2">
        {label} · N/A
      </span>
      {reason}
    </div>
  )
}

function BenchmarkBars({ rival, recall, answer }: Props) {
  return (
    <section className="space-y-6">
      <div className="space-y-2 max-w-3xl">
        <h2 className="heading-serif text-[1.8rem] md:text-[2.2rem]">Benchmarks</h2>
        <p className="text-[14px] text-[color:var(--muted-soft)]">
          Two separate tracks, because they measure different things. Numbers from{' '}
          <a
            href="https://github.com/vornicx/Midas/blob/main/BENCHMARKS.md"
            className="underline hover:text-[color:var(--gold-bright)]"
            target="_blank"
            rel="noreferrer"
          >
            Midas/BENCHMARKS.md
          </a>{' '}
          for Midas, and each rival's own published source. Where the rival is ahead, the bar
          shows it.
        </p>
      </div>

      {/* Track 1 — Memory-layer recall@k (reader-independent) */}
      <div className="card-panel p-6 md:p-8 space-y-5">
        <div className="flex items-baseline justify-between gap-3 border-b border-[color:var(--line)] pb-2">
          <div className="font-display text-[15px] font-medium text-[color:var(--ink)]">
            1 · Memory-layer recall@k <span className="text-[color:var(--muted-soft)] font-normal">(reader-independent · deterministic)</span>
          </div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted-soft)]">higher is better</div>
        </div>

        <div className="space-y-4">
          <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted-soft)]">LongMemEval-s</div>
          <Bar name="Midas" value={recall.midas.longmem} highlight />
          <Bar name="Recency baseline" value={recall.baseline.longmem} muted />
          {recall.rival.kind === 'value' ? (
            <Bar name={rival} value={recall.rival.longmem ?? null} />
          ) : (
            <NaBlock label={rival} reason={recall.rival.reason} />
          )}
        </div>

        <div className="space-y-4 pt-3 border-t border-[color:var(--line)]">
          <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted-soft)]">LoCoMo</div>
          <Bar name="Midas" value={recall.midas.locomo} highlight />
          <Bar name="Recency baseline" value={recall.baseline.locomo} muted />
          {recall.rival.kind === 'value' ? (
            <Bar name={rival} value={recall.rival.locomo ?? null} />
          ) : null}
        </div>

        {recall.rival.kind === 'value' && (
          <p className="text-[12px] leading-relaxed text-[color:var(--muted-soft)] italic border-t border-[color:var(--line)] pt-4">
            {recall.rival.source}
          </p>
        )}
      </div>

      {/* Track 2 — LongMemEval answer correctness (reader-dependent, headline) */}
      <div className="card-panel p-6 md:p-8 space-y-5">
        <div className="flex items-baseline justify-between gap-3 border-b border-[color:var(--line)] pb-2">
          <div className="font-display text-[15px] font-medium text-[color:var(--ink)]">
            2 · LongMemEval-s answer correctness <span className="text-[color:var(--muted-soft)] font-normal">(reader-dependent · headline)</span>
          </div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted-soft)]">higher is better</div>
        </div>

        <Bar
          name={`Midas · ${answer.midas.reader}`}
          value={answer.midas.value}
          highlight
          suffix={`n=${answer.midas.n}`}
        />
        {answer.rival ? (
          <Bar name={`${rival} · ${answer.rival.reader}`} value={answer.rival.value} />
        ) : (
          <NaBlock label={rival} reason="No comparable published number." />
        )}

        <p className="text-[12px] leading-relaxed text-[color:var(--muted-soft)] italic border-t border-[color:var(--line)] pt-4">
          {answer.honestNote}
          {answer.rival && (
            <>
              {' '}
              <span className="not-italic">Source:</span> {answer.rival.source}.
            </>
          )}
        </p>
      </div>
    </section>
  )
}

export default BenchmarkBars
