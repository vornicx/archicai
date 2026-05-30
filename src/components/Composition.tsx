import { Reveal } from '../useReveal'
import { PACKAGES, REPOS } from '../data/resources'

const codeLines = [
  { num: 1, parts: [{ t: 'import ', c: 'kw' }, { t: '{ Origin }', c: 'type' }, { t: ' from ', c: 'kw' }, { t: '"@vornicx/origin"', c: 'str' }, { t: ';', c: 'plain' }] },
  { num: 2, parts: [] },
  { num: 3, parts: [{ t: 'const ', c: 'kw' }, { t: 'origin', c: 'var' }, { t: ' = ', c: 'plain' }, { t: 'await ', c: 'kw' }, { t: 'Origin', c: 'type' }, { t: '.open()', c: 'plain' }, { t: ';', c: 'plain' }] },
  { num: 4, parts: [] },
  { num: 5, parts: [{ t: 'const ', c: 'kw' }, { t: 'agent', c: 'var' }, { t: ' = origin.agent({', c: 'plain' }] },
  { num: 6, parts: [{ t: '  memory: origin.memory,', c: 'plain' }, { t: '  // Atlas', c: 'comment' }] },
  { num: 7, parts: [{ t: '  policy: humanDirected(),', c: 'plain' }, { t: ' // Origin', c: 'comment' }] },
  { num: 8, parts: [{ t: '  // runtime: Apollo', c: 'comment' }] },
  { num: 9, parts: [{ t: '});', c: 'plain' }] },
  { num: 10, parts: [] },
  { num: 11, parts: [{ t: 'await ', c: 'kw' }, { t: 'agent', c: 'var' }, { t: '.run(', c: 'plain' }, { t: '"Prepare the launch plan"', c: 'str' }, { t: ');', c: 'plain' }] },
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
          <h2 className="section-title mb-4">One surface. Three layers.</h2>
          <p className="section-lead mb-14">
            Install{' '}
            <a href={PACKAGES.origin.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70">
              @vornicx/origin
            </a>{' '}
            for memory and governance, or{' '}
            <a href={PACKAGES.apollo.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70">
              @vornicx/apollo-agent
            </a>{' '}
            for the mission CLI. Full docs on{' '}
            <a href={REPOS.origin} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70">
              GitHub
            </a>
            .
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <Reveal delay={80}>
            <div className="code-panel">
              <div className="px-4 py-3 border-b border-line text-xs text-ink-faint font-mono">
                index.ts
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
              <LegendItem name="Atlas" desc="Remembers what matters between sessions." />
              <LegendItem name="Origin" desc="Governs context, policy, and proof." />
              <LegendItem name="Apollo" desc="Plans and executes under human control." />
            </ul>
            <div className="mt-8 pt-6 border-t border-line flex flex-wrap gap-4">
              <a href={REPOS.origin} target="_blank" rel="noopener noreferrer" className="text-sm text-ink hover:opacity-70 transition-opacity">
                origin repo →
              </a>
              <a href={REPOS.apollo} target="_blank" rel="noopener noreferrer" className="text-sm text-ink hover:opacity-70 transition-opacity">
                apollo-agent repo →
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
