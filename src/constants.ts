import { REPOS } from './data/resources'

export const GITHUB_URL = REPOS.archic
export const CONTACT_EMAIL = 'mailto:hello@archic.es'

export const NAV_LINKS = [
  { label: 'Research', href: '#research' },
  { label: 'Benchmarks', href: '#benchmarks' },
  { label: 'Docs', href: '#docs' },
] as const

export { REPOS, PACKAGES, DOCS, CODE_REPOS, LAYER_LINKS } from './data/resources'
