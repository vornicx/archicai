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
                The public artifact is the benchmark harness.
              </h3>
              <p className="text-muted mt-5 max-w-[680px] leading-relaxed">
                Midas is not being framed as a finished protocol yet. The work in
                origin-lab tracks datasets, adapters, metrics and caveats so customers
                can judge the direction from evidence instead of brochure language.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-3">
              <a href={`${GITHUB_URL}/blob/main/README.md`} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Read README
              </a>
              <a href="#docs" className="btn-secondary">
                SDK shape
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Whitepaper
