import { Reveal } from '../useReveal'
import { ARCHIC_DOCS, CODE_REPOS, DOCS_REPO, PACKAGES, SDK_DOCS, WEBSITE_REPO } from '../data/resources'

function Resources() {
  return (
    <section id="docs" className="relative py-20 md:py-28 px-6 section-band">
      <div className="mx-auto max-w-page">
        <Reveal>
          <p className="section-eyebrow mb-4">Documentation &amp; code</p>
          <h2 className="section-title mb-4">Docs live in the archic repo.</h2>
          <p className="section-lead mb-14">
            Protocol, ecosystem law, and build plan —{' '}
            <a
              href={DOCS_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-70"
            >
              github.com/vornicx/archic
            </a>
            . This site is built from{' '}
            <a
              href={WEBSITE_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-70"
            >
              github.com/vornicx/archicai
            </a>
            .
          </p>
        </Reveal>

        <div className="resources-grid">
          <Reveal delay={60}>
            <div className="resource-block">
              <h3 className="resource-heading">Archic documentation</h3>
              <ul className="resource-list">
                {ARCHIC_DOCS.map((doc) => (
                  <li key={doc.id}>
                    <a href={doc.href} target="_blank" rel="noopener noreferrer" className="resource-link">
                      {doc.title}
                    </a>
                    <p className="resource-desc">{doc.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="resource-block">
              <h3 className="resource-heading">Repositories</h3>
              <ul className="resource-list">
                {CODE_REPOS.map((repo) => (
                  <li key={repo.id}>
                    <div className="resource-link-row">
                      <a href={repo.href} target="_blank" rel="noopener noreferrer" className="resource-link">
                        vornicx/{repo.name}
                      </a>
                      <span className="resource-badge">{repo.status}</span>
                    </div>
                    <p className="resource-desc">{repo.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="resource-block">
              <h3 className="resource-heading">SDK reference</h3>
              <ul className="resource-list">
                {SDK_DOCS.map((doc) => (
                  <li key={doc.id}>
                    <a href={doc.href} target="_blank" rel="noopener noreferrer" className="resource-link">
                      {doc.title}
                    </a>
                    <p className="resource-desc">{doc.desc}</p>
                  </li>
                ))}
              </ul>
              <h4 className="resource-subheading">Packages</h4>
              <ul className="resource-list mt-4">
                <li>
                  <a href={PACKAGES.origin.url} target="_blank" rel="noopener noreferrer" className="resource-link">
                    {PACKAGES.origin.name}
                  </a>
                  <code className="resource-code">{PACKAGES.origin.install}</code>
                </li>
                <li>
                  <a href={PACKAGES.apollo.url} target="_blank" rel="noopener noreferrer" className="resource-link">
                    {PACKAGES.apollo.name}
                  </a>
                  <code className="resource-code">{PACKAGES.apollo.install}</code>
                </li>
              </ul>
              <p className="resource-note">
                <span className="font-mono text-xs">@archic/spec</span> lives in the archic monorepo — not on npm yet.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Resources
