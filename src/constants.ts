import { REPOS } from './data/resources'

export const GITHUB_URL = REPOS.midas
export const CONTACT_EMAIL = 'mailto:vornic@archic.es'

export const NAV_LINKS = [
  { label: 'Midas', href: '#midas' },
  { label: 'Benchmarks', href: '#benchmarks' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'SDK', href: '#docs' },
] as const

export { REPOS, PACKAGES, DOCS, CODE_REPOS, LAYER_LINKS } from './data/resources'
