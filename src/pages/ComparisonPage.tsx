import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { COMPARISONS } from '../data/comparisons'
import BenchmarkBars from '../components/BenchmarkBars'
import NotFound from './NotFound'

function ComparisonPage() {
  const { slug } = useParams<{ slug: string }>()
  const data = COMPARISONS.find((c) => c.slug === slug)
  if (!data) return <NotFound />

  const url = `https://archic.es/docs/comparisons/${data.slug}`

  return (
    <>
      <Helmet>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data.title,
          description: data.description,
          url,
          author: { '@type': 'Organization', name: 'Archic', url: 'https://archic.es/' },
          publisher: { '@type': 'Organization', name: 'Archic', url: 'https://archic.es/' },
          mainEntityOfPage: url,
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: data.faq.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Archic', item: 'https://archic.es/' },
            { '@type': 'ListItem', position: 2, name: 'Midas', item: 'https://archic.es/midas' },
            { '@type': 'ListItem', position: 3, name: 'Comparisons', item: 'https://archic.es/docs/comparisons' },
            { '@type': 'ListItem', position: 4, name: `Midas vs ${data.rival}`, item: url },
          ],
        })}</script>
      </Helmet>

      <article className="section-padding">
        <div className="container-page space-y-16">
          <header className="max-w-3xl space-y-6">
            <nav aria-label="Breadcrumb" className="text-[12px] uppercase tracking-[0.22em] text-[color:var(--muted-soft)]">
              <Link to="/" className="hover:text-[color:var(--gold-bright)]">Archic</Link>
              <span className="mx-2">/</span>
              <Link to="/midas" className="hover:text-[color:var(--gold-bright)]">Midas</Link>
              <span className="mx-2">/</span>
              <Link to="/docs/comparisons" className="hover:text-[color:var(--gold-bright)]">Comparisons</Link>
              <span className="mx-2">/</span>
              <span>vs {data.rival}</span>
            </nav>
            <div className="section-label !mb-0">Comparison · AI agent memory</div>
            <h1 className="heading-serif text-[2.4rem] sm:text-[3rem] md:text-[3.6rem] font-light">
              Midas vs <span className="accent-remember">{data.rival}</span>.
            </h1>
            <p className="text-lg leading-relaxed text-[color:var(--muted)]">{data.intro}</p>
          </header>

          <section className="editorial-panel editorial-panel--accent p-10 lg:p-12">
            <div className="section-label">TL;DR</div>
            <ul className="space-y-3 text-[15px] leading-relaxed text-[color:var(--muted)]">
              <li><strong className="text-[color:var(--ink)]">Pick Midas</strong> {data.tldr.pickMidas}</li>
              <li><strong className="text-[color:var(--ink)]">Pick {data.rival}</strong> {data.tldr.pickRival}</li>
              <li>{data.tldr.both}</li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="heading-serif text-[1.8rem] md:text-[2.2rem]">Feature comparison</h2>
            <div className="card-panel overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-[14px]">
                  <thead>
                    <tr className="border-b border-[color:var(--line-strong)]">
                      <th className="px-5 py-4 font-medium text-[color:var(--muted-soft)] uppercase tracking-[0.18em] text-[11px] w-[20%]">Dimension</th>
                      <th className="px-5 py-4 font-medium text-[color:var(--gold-bright)] uppercase tracking-[0.18em] text-[11px] w-[30%]">Midas</th>
                      <th className="px-5 py-4 font-medium text-[color:var(--muted)] uppercase tracking-[0.18em] text-[11px] w-[30%]">{data.rival}</th>
                      <th className="px-5 py-4 font-medium text-[color:var(--muted-soft)] uppercase tracking-[0.18em] text-[11px] w-[20%]">Why it matters</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.rows.map((row) => (
                      <tr key={row.feature} className="border-b border-[color:var(--line)] last:border-0 align-top hover:bg-[color:var(--line)]/30 transition-colors">
                        <td className="px-5 py-4 font-medium text-[color:var(--ink)]">{row.feature}</td>
                        <td className="px-5 py-4 text-[color:var(--ink)]">{row.midas}</td>
                        <td className="px-5 py-4 text-[color:var(--muted)]">{row.rival}</td>
                        <td className="px-5 py-4 text-[13px] text-[color:var(--muted-soft)] italic">{row.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <BenchmarkBars
            rival={data.rival}
            midas={data.benchmarks.midas}
            rivalScores={data.benchmarks.rival}
            note={data.benchmarks.note}
          />

          {/* Honest caveats — where the rival is stronger or Midas is weaker */}
          <section className="space-y-4 max-w-3xl">
            <div className="space-y-1">
              <div className="section-label !mb-0">Honest caveats</div>
              <h2 className="heading-serif text-[1.6rem] md:text-[2rem]">
                Where {data.rival} is stronger.
              </h2>
              <p className="text-[14px] text-[color:var(--muted-soft)]">
                Trade-offs we will not hide. If any of these matter more than the Midas wins above,
                pick {data.rival}.
              </p>
            </div>
            <ul className="card-panel p-6 md:p-7 space-y-3">
              {data.caveats.map((c) => (
                <li key={c} className="flex gap-3 text-[14px] leading-relaxed text-[color:var(--muted)]">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--muted-soft)]" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </section>

          {data.sections.map((s) => (
            <section key={s.heading} className="space-y-4 max-w-3xl">
              <h2 className="heading-serif text-[1.6rem] md:text-[2rem]">{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-[color:var(--muted)]">{p}</p>
              ))}
            </section>
          ))}

          <section className="space-y-6 max-w-3xl">
            <h2 className="heading-serif text-[1.8rem] md:text-[2.2rem]">FAQ</h2>
            <div className="space-y-5">
              {data.faq.map((f) => (
                <div key={f.q} className="card-panel p-6 space-y-2">
                  <div className="font-medium text-[color:var(--ink)]">{f.q}</div>
                  <p className="text-[14px] leading-relaxed text-[color:var(--muted)]">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="editorial-panel editorial-panel--accent p-10 lg:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="section-label !mb-0">Try Midas</div>
              <h2 className="heading-serif text-[1.6rem] md:text-[2rem]">Local-first memory in two commands.</h2>
              <p className="text-[15px] leading-relaxed text-[color:var(--muted)]">
                Install the SDK, point your MCP host at it, and the agent gains remember, recall and forget.
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/midas" className="btn-primary whitespace-nowrap">Go to Midas</Link>
              <Link to="/docs/comparisons" className="nav-link whitespace-nowrap self-center">All comparisons →</Link>
            </div>
          </section>
        </div>
      </article>
    </>
  )
}

export default ComparisonPage
