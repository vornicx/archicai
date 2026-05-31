import { Reveal } from '../useReveal'
import { REPOS } from '../data/resources'

const codeLines = [
  { num: 1, parts: [{ t: 'from ', c: 'kw' }, { t: 'midas', c: 'var' }, { t: ' import ', c: 'kw' }, { t: 'Memory', c: 'type' }] },
  { num: 2, parts: [] },
  { num: 3, parts: [{ t: 'memory = ', c: 'plain' }, { t: 'Memory', c: 'type' }, { t: '.open()', c: 'plain' }] },
  { num: 4, parts: [] },
  { num: 5, parts: [{ t: 'await ', c: 'kw' }, { t: 'memory', c: 'var' }, { t: '.remember(', c: 'plain' }] },
  { num: 6, parts: [{ t: '    context=', c: 'plain' }, { t: '"API design"', c: 'str' }, { t: ',', c: 'plain' }] },
  { num: 7, parts: [{ t: '    content=', c: 'plain' }, { t: '"Decided on REST."', c: 'str' }, { t: ',', c: 'plain' }] },
  { num: 8, parts: [{ t: '    importance=', c: 'plain' }, { t: '0.8', c: 'str' }, { t: ',', c: 'plain' }] },
  { num: 9, parts: [{ t: ')', c: 'plain' }] },
  { num: 10, parts: [] },
  { num: 11, parts: [{ t: 'results = await ', c: 'plain' }, { t: 'memory', c: 'var' }, { t: '.recall(', c: 'plain' }] },
  { num: 12, parts: [{ t: '    query=', c: 'plain' }, { t: '"What did we decide?"', c: 'str' }, { t: ',', c: 'plain' }] },
  { num: 13, parts: [{ t: '    budget_tokens=', c: 'plain' }, { t: '1024', c: 'str' }, { t: ',', c: 'plain' }] },
  { num: 14, parts: [{ t: ')', c: 'plain' }] },
  { num: 15, parts: [{ t: '# recall@k:', c: 'comment' }, { t: ' 1.0 (semantic)', c: 'plain' }] },
]

const colorMap = {
  kw: 'text-ink-faint',
  type: 'text-ink',
  str: 'text-ink-muted',
  var: 'text-ink',
  plain: 'text-ink-muted',
  comment: 'text-ink-faint',
}

function Composition() {
  return (
    <section id="composition" className="relative py-20 md:py-28 px-6">
      <div className="mx-auto max-w-page">
        <Reveal>
          <p className="section-eyebrow mb-4">Developers</p>
          <h2 className="section-title mb-4">Zero-deps Python SDK.</h2>
          <p className="section-lead mb-14">
            Clone{' '}
            <a href={REPOS.midas} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70">
              origin-lab
            </a>{' '}
            and run with{' '}
            <code className="font-mono text-sm bg-surface-muted px-1.5 py-0.5 rounded">uv run python -m eval.runner</code>
            . Core Midas has zero third-party dependencies.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <Reveal delay={80}>
            <div className="code-panel">
              <div className="px-4 py-3 border-b border-line text-xs text-ink-faint font-mono">
                midas/memory.py
              </div>
              <pre className="p-5 sm:p-6 overflow-x-auto text-[13px] leading-7">
                <code className="font-mono block">
                  {codeLines.map((line) => (
                    <div key={line.num} className="flex">
                      <span className="code-line-num">{line.num}</span>
                      <span>
                        {line.parts.length === 0
                          ? '\u00A0'
                          : line.parts.map((part, i) => (
                              <span key={i} className={colorMap[part.c as keyof typeof colorMap]}>
                                {part.t}
                              </span>
                            ))}
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <ul className="space-y-6 pt-2">
              <LegendItem name="Midas SDK" desc="Remember and recall across sessions — with pluggable embedders." />
              <LegendItem name="Eval harness" desc="recall@k, answer_recoverable, and efficiency metrics per token." />
              <LegendItem name="Benchmark datasets" desc="LoCoMo for long-context evaluation. LongMemEval coming next." />
            </ul>
            <div className="mt-8 pt-6 border-t border-line flex flex-wrap gap-4">
              <a href={REPOS.midas} target="_blank" rel="noopener noreferrer" className="text-sm text-ink hover:opacity-70 transition-opacity">
                origin-lab repo →
              </a>
              <a href={`${REPOS.midas}/blob/main/README.md`} target="_blank" rel="noopener noreferrer" className="text-sm text-ink hover:opacity-70 transition-opacity">
                strategy & results →
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function LegendItem({ name, desc }: { name: string; desc: string }) {
  return (
    <li>
      <p className="font-medium text-ink">{name}</p>
      <p className="text-[15px] text-ink-muted mt-1">{desc}</p>
    </li>
  )
}

export default Composition
