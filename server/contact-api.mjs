import http from 'node:http'

const PORT = Number(process.env.PORT || 3000)
const RECIPIENTS = ['vornic@archic.es', 'antero@archic.es']
const ALLOWED_ORIGINS = new Set(['https://archic.es', 'https://www.archic.es'])
const MAX_BODY_BYTES = 24_000
const WINDOW_MS = 15 * 60 * 1000
const MAX_REQUESTS_PER_WINDOW = 8
const buckets = new Map()

function text(value, max = 2_000) {
  return String(value ?? '').trim().slice(0, max)
}

function extractEmail(value) {
  const match = String(value ?? '').match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)
  return match?.[0] ?? null
}

function clientIp(req) {
  const forwarded = String(req.headers['x-forwarded-for'] ?? '').split(',')[0].trim()
  return forwarded || req.socket.remoteAddress || 'unknown'
}

function rateLimited(ip) {
  const now = Date.now()
  const current = buckets.get(ip)
  if (!current || now - current.startedAt >= WINDOW_MS) {
    buckets.set(ip, { startedAt: now, count: 1 })
    return false
  }
  current.count += 1
  return current.count > MAX_REQUESTS_PER_WINDOW
}

function cors(req, res) {
  const origin = String(req.headers.origin ?? '')
  if (ALLOWED_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Cache-Control', 'no-store')
  return origin
}

function json(res, status, payload) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

async function readJson(req) {
  let size = 0
  const chunks = []
  for await (const chunk of req) {
    size += chunk.length
    if (size > MAX_BODY_BYTES) throw new Error('payload_too_large')
    chunks.push(chunk)
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
}

async function deliver(input) {
  const name = text(input.name, 120)
  const company = text(input.company, 160)
  const contact = text(input.contact, 240)
  const website = text(input.website, 300)
  const type = text(input.type, 120)
  const investment = text(input.investment, 120)
  const revenue = text(input.revenue)
  const challenge = text(input.challenge)
  const outcome = text(input.outcome)
  const details = text(input.details, 3_000)
  const language = input.language === 'en' ? 'en' : 'es'
  const attribution = Array.isArray(input.attribution)
    ? input.attribution.map((item) => text(item, 300)).filter(Boolean).slice(0, 12)
    : []

  if (!name || !contact || !revenue || !challenge || !outcome || input.consent !== true) {
    return { status: 400, payload: { ok: false, error: 'missing_required_fields' } }
  }

  if (text(input.companyWebsite, 200)) return { status: 200, payload: { ok: true } }
  const startedAt = Number(input.startedAt ?? 0)
  if (startedAt > 0 && Date.now() - startedAt < 1_200) return { status: 200, payload: { ok: true } }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('Missing RESEND_API_KEY')
    return { status: 503, payload: { ok: false, error: 'delivery_unavailable' } }
  }

  const lines = [
    `Nombre: ${name}`,
    `Empresa: ${company || '-'}`,
    `Contacto: ${contact}`,
    `Web actual: ${website || '-'}`,
    `Tipo: ${type || '-'}`,
    `Inversión prevista: ${investment || '-'}`,
    `Idioma: ${language.toUpperCase()}`,
    '', 'Cómo gana dinero el negocio', revenue,
    '', 'Qué no está funcionando', challenge,
    '', 'Qué debería cambiar', outcome,
    '', 'Contexto adicional', details || '-',
    ...(attribution.length ? ['', 'Contexto de llegada (sesión, sin tracking externo)', ...attribution] : []),
  ]

  const replyTo = extractEmail(contact)
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Archic Web <web@archic.es>',
      to: RECIPIENTS,
      subject: `[Archic web] ${type || 'Consulta de proyecto'} — ${company || name}`,
      text: lines.join('\n'),
      ...(replyTo ? { reply_to: replyTo } : {}),
      tags: [{ name: 'source', value: 'archic-web' }],
    }),
  })

  if (!response.ok) {
    const detail = await response.text().catch(() => '')
    console.error('Resend delivery failed', response.status, detail.slice(0, 500))
    return { status: 502, payload: { ok: false, error: 'delivery_failed' } }
  }
  return { status: 200, payload: { ok: true } }
}

const server = http.createServer(async (req, res) => {
  const origin = cors(req, res)
  const url = new URL(req.url || '/', 'http://localhost')

  if (url.pathname === '/health') return json(res, 200, { ok: true })
  if (url.pathname !== '/api/contact') return json(res, 404, { ok: false, error: 'not_found' })

  if (req.method === 'OPTIONS') {
    if (origin && !ALLOWED_ORIGINS.has(origin)) return json(res, 403, { ok: false, error: 'origin_not_allowed' })
    res.statusCode = 204
    return res.end()
  }
  if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'method_not_allowed' })
  if (!ALLOWED_ORIGINS.has(origin)) return json(res, 403, { ok: false, error: 'origin_not_allowed' })
  if (rateLimited(clientIp(req))) return json(res, 429, { ok: false, error: 'rate_limited' })

  try {
    const input = await readJson(req)
    const result = await deliver(input)
    return json(res, result.status, result.payload)
  } catch (error) {
    if (error instanceof Error && error.message === 'payload_too_large') return json(res, 413, { ok: false, error: 'payload_too_large' })
    console.error('Contact API error', error instanceof Error ? error.message : 'unknown_error')
    return json(res, 400, { ok: false, error: 'invalid_request' })
  }
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Archic contact API listening on :${PORT}`)
})
