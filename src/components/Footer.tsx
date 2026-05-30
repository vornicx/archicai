import { GITHUB_URL } from '../constants'
import { REPOS } from '../data/resources'

function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-line">
      <div className="mx-auto max-w-page">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-sm text-ink-faint">
          <p>&copy; 2026 Archic</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="#docs" className="hover:text-ink transition-colors">Docs</a>
            <a href="#ecosystem" className="hover:text-ink transition-colors">Stack</a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
              archic
            </a>
            <a href={REPOS.origin} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
              origin
            </a>
            <a href={REPOS.apollo} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
              apollo-agent
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
