import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { failed: boolean }

export default class SiteErrorBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.error('Archic render error', error, info)
  }

  render() {
    if (!this.state.failed) return this.props.children

    const english = typeof window !== 'undefined' && (window.location.pathname === '/en' || window.location.pathname.startsWith('/en/'))
    const home = english ? '/en/' : '/'

    return (
      <main className="as-fatal-state" role="alert">
        <div>
          <span>ARCHIC / SYSTEM</span>
          <h1>{english ? 'Something interrupted the experience.' : 'Algo ha interrumpido la experiencia.'}</h1>
          <p>{english ? 'Reload the page. If it persists, return to the homepage.' : 'Recarga la página. Si continúa, vuelve al inicio.'}</p>
          <div>
            <button type="button" onClick={() => window.location.reload()}>{english ? 'Reload' : 'Recargar'}</button>
            <a href={home}>{english ? 'Go home' : 'Volver al inicio'}</a>
          </div>
        </div>
      </main>
    )
  }
}
