import { GITHUB_URL } from '../constants'

function Whitepaper() {
  return (
    <section id="research" className="section-border section-padding">
      <div className="container-page">
        <div className="glass-panel">
          <div className="glass-inner grid gap-8 p-7 md:grid-cols-[1fr_260px] md:p-10 lg:p-14">
            <div>
              <div className="section-label">Research notebook</div>
              <h3 className="heading-serif max-w-[720px] text-[2.4rem] md:text-[3.1rem]">
                Alpha means usable, typed and measured.
              </h3>
              <p className="text-muted mt-5 max-w-[680px] leading-relaxed">
                The repo includes the SDK, SQLite persistence, local embedders, MCP tools,
                LangGraph integration, retention primitives, tests and benchmark commands.
                The API is still pre-1.0, but the product loop is now concrete enough to try.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-3">
              <a href={`${GITHUB_URL}/blob/main/README.md`} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Read README
              </a>
              <a href={`${GITHUB_URL}/blob/main/BENCHMARKS.md`} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Benchmarks
              </a>
              <a href="#docs" className="btn-secondary">
                SDK quickstart
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Whitepaper
