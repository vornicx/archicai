import { REPOS } from './data/resources'

export const GITHUB_URL = REPOS.archic
export const CONTACT_EMAIL = 'mailto:vornic@archic.es'

export const NAV_LINKS = [
  { label: 'Research', href: '#research' },
  { label: 'Stack', href: '#ecosystem' },
  { label: 'Docs', href: '#docs' },
  { label: 'GitHub', href: GITHUB_URL, external: true },
] as const

export { REPOS, PACKAGES, DOCS, CODE_REPOS, LAYER_LINKS } from './data/resources'
