type BenchmarkBarsProps = {
  rival: string
  /** Score 0..1 for Midas */
  midas: { longmem?: number | null; locomo?: number | null }
  /** Score 0..1 for rival; null = not published */
  rivalScores: { longmem?: number | null; locomo?: number | null }
  note?: string
}

type Metric = { key: 'longmem' | 'locomo'; label: string; desc: string }
const METRICS: Metric[] = [
  { key: 'longmem', label: 'LongMemEval-S', desc: 'recall@k · higher is better' },
  { key: 'locomo', label: 'LoCoMo', desc: 'recall@k · higher is better' },
]

function Bar({ value, highlight, name }: { value: number | null | undefined; highlight?: boolean; name: string }) {
  const pct = typeof value === 'number' ? Math.max(0, Math.min(1, value)) * 100 : 0
  const hasValue = typeof value === 'number'
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className={`text-[12px] uppercase tracking-[0.18em] ${highlight ? 'text-[color:var(--gold-bright)]' : 'text-[color:var(--muted-soft)]'}`}>
          {name}
        </span>
        <span className={`font-mono text-[13px] ${highlight ? 'text-[color:var(--gold-bright)] font-bold' : 'text-[color:var(--muted)]'}`}>
          {hasValue ? value!.toFixed(2) : '—'}
        </span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-[color:var(--line)]/60">
        {hasValue && (
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-700"
            style={{
              width: `${pct}%`,
              background: highlight
                ? 'linear-gradient(90deg, var(--gold), var(--gold-bright))'
                : 'var(--muted-soft)',
              opacity: highlight ? 1 : 0.55,
            }}
          />
        )}
      </div>
    </div>
  )
}

function BenchmarkBars({ rival, midas, rivalScores, note }: BenchmarkBarsProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2 max-w-3xl">
        <h2 className="heading-serif text-[1.8rem] md:text-[2.2rem]">Benchmarks</h2>
        <p className="text-[14px] text-[color:var(--muted-soft)]">
          Reader-independent recall@k on long-horizon memory datasets. Higher is better. Where a
          system has no comparable published number, the bar is left empty.
        </p>
      </div>

      <div className="card-panel p-6 md:p-8 space-y-7">
        {METRICS.map((m) => (
          <div key={m.key} className="space-y-3">
            <div className="flex items-baseline justify-between gap-3 border-b border-[color:var(--line)] pb-2">
              <div className="font-display text-[15px] font-medium text-[color:var(--ink)]">{m.label}</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted-soft)]">{m.desc}</div>
            </div>
            <Bar name="Midas" value={midas[m.key]} highlight />
            <Bar name={rival} value={rivalScores[m.key]} />
          </div>
        ))}
        {note && (
          <p className="text-[12px] leading-relaxed text-[color:var(--muted-soft)] italic border-t border-[color:var(--line)] pt-4">
            {note}
          </p>
        )}
      </div>
    </section>
  )
}

export default BenchmarkBars
