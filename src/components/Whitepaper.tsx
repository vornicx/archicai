import { GITHUB_URL } from '../constants'

function Whitepaper() {
  return (
    <section id="research" className="section-padding">
      <div className="container-page">
        <div className="editorial-panel flex flex-col gap-10 rounded-[2rem] p-10 md:flex-row md:items-center md:p-16 lg:p-20">
          <div className="flex-1 space-y-6">
            <div className="section-label !mb-0">Research Notebook</div>
            <h2 className="heading-serif text-[2.2rem] md:text-[3.25rem]">
              Alpha means usable, typed and measured.
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-[color:var(--muted)]">
              The repo includes the SDK, SQLite persistence, local embedders, MCP tools,
              LangGraph integration, retention primitives, tests and benchmark commands.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:min-w-[240px]">
            <a href={`${GITHUB_URL}/blob/main/README.md`} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Read README
            </a>
            <a href={`${GITHUB_URL}/blob/main/BENCHMARKS.md`} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Benchmarks
            </a>
            <a href="#docs" className="btn-secondary">
              SDK Quickstart
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Whitepaper
