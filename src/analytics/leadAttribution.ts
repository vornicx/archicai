type Attribution = {
  firstLanding: string
  referrer: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
  intents: string[]
}

const KEY = 'archic:lead-attribution:v1'

function canUseSessionStorage() {
  try {
    const test = '__archic_storage_test__'
    window.sessionStorage.setItem(test, '1')
    window.sessionStorage.removeItem(test)
    return true
  } catch {
    return false
  }
}

function read(): Attribution | null {
  if (typeof window === 'undefined' || !canUseSessionStorage()) return null
  try {
    const raw = window.sessionStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Attribution) : null
  } catch {
    return null
  }
}

function write(value: Attribution) {
  if (typeof window === 'undefined' || !canUseSessionStorage()) return
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(value))
  } catch {
    // Attribution is useful, never required for the site to work.
  }
}

export function captureAttribution() {
  if (typeof window === 'undefined') return
  const existing = read()
  if (existing) return

  const params = new URLSearchParams(window.location.search)
  write({
    firstLanding: `${window.location.pathname}${window.location.search}`,
    referrer: document.referrer || '',
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
    intents: [],
  })
}

export function recordIntent(intent: string) {
  if (!intent || typeof window === 'undefined') return
  captureAttribution()
  const current = read()
  if (!current) return

  const intents = current.intents.includes(intent)
    ? current.intents
    : [...current.intents, intent].slice(-12)

  write({ ...current, intents })
}

export function getAttributionSummary() {
  const current = read()
  if (!current) return [] as string[]

  const rows = [
    current.firstLanding ? `Landing: ${current.firstLanding}` : '',
    current.referrer ? `Referrer: ${current.referrer}` : '',
    current.utmSource ? `UTM source: ${current.utmSource}` : '',
    current.utmMedium ? `UTM medium: ${current.utmMedium}` : '',
    current.utmCampaign ? `UTM campaign: ${current.utmCampaign}` : '',
    current.intents.length ? `Journey: ${current.intents.join(' → ')}` : '',
  ]

  return rows.filter(Boolean)
}
