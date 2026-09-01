import http from 'node:http'
import { randomUUID } from 'node:crypto'
import { pathToFileURL } from 'node:url'

const PORT = Number(process.env.PORT || 3000)
const RECIPIENTS = ['vornic@archic.es', 'antero@archic.es']
const ALLOWED_ORIGINS = new Set(['https://archic.es', 'https://www.archic.es'])
const MAX_BODY_BYTES = 24_000
const WINDOW_MS = 15 * 60 * 1000
const MAX_REQUESTS_PER_WINDOW = 8
const MAX_RATE_BUCKETS = 5_000
const DELIVERY_TIMEOUT_MS = 8_000
const REQUEST_TIMEOUT_MS = 12_000

function text(value, max = 2_000) {
  return String(value ?? '').trim().slice(0, max)
}

function extractEmail(value) {
  const match = String(value ?? '').match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)
  return match?.[0] ?? null
}

export function clientIp(req) {
  // Railway terminates the public connection and exposes the remote client as
  // X-Real-IP. Do not trust arbitrary X-Forwarded-For chains as a rate-limit key.
  const railwayIp = text(req.headers?.['x-real-ip'], 128)
  return railwayIp || text(req.socket?.remoteAddress, 128) || 'unknown'
}

export function createRateLimiter({
  windowMs = WINDOW_MS,
  maxRequests = MAX_REQUESTS_PER_WINDOW,
  maxBuckets = MAX_RATE_BUCKETS,
  now = () => Date.now(),
} = {}) {
  const buckets = new Map()
  let operationsSinceSweep = 0

  const sweep = (timestamp) => {
    operationsSinceSweep += 1
    if (operationsSinceSweep < 100 && buckets.size < maxBuckets) return
    operationsSinceSweep = 0

    for (const [key, bucket] of buckets) {
      if (timestamp - bucket.startedAt >= windowMs) buckets.delete(key)
    }

    while (buckets.size >= maxBuckets) {
      const oldestKey = buckets.keys().next().value
      if (oldestKey === undefined) break
      buckets.delete(oldestKey)
    }
  }

  return {
    isLimited(key) {
      const timestamp = now()
      sweep(timestamp)

      const current = buckets.get(key)
      if (!current || timestamp - current.startedAt >= windowMs) {
        buckets.delete(key)
        buckets.set(key, { startedAt: timestamp, count: 1 })
        return false
      }

      current.count += 1
      return current.count > maxRequests
    },
    get size() {
      return buckets.size
    },
  }
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
  res.setHeader('X-Content-Type-Options', 'nosniff')
  return origin
}

function json(res, status, payload) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

async function readJson(req) {
  const declaredSize = Number(req.headers['content-length'] ?? 0)
  if (Number.isFinite(declaredSize) && declaredSize > MAX_BODY_BYTES) {
    throw new Error('payload_too_large')
  }

  let size = 0
  const chunks = []
  for await (const chunk of req) {
    size += chunk.length
    if (size > MAX_BODY_BYTES) throw new Error('payload_too_large')
    chunks.push(chunk)
  }

  const parsed = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('invalid_json_shape')
  return parsed
}

async function deliver(input, requestId, fetchImpl = fetch) {
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

  // Honeypot and minimum-fill-time checks intentionally return success so bots
  // do not get an oracle that helps them tune around the anti-abuse controls.
  if (text(input.companyWebsite, 200)) return { status: 200, payload: { ok: true } }
  const startedAt = Number(input.startedAt ?? 0)
  if (Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < 1_200) {
    return { status: 200, payload: { ok: true } }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('Contact delivery unavailable', { requestId, reason: 'missing_resend_api_key' })
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

  try {
    const response = await fetchImpl('https://api.resend.com/emails', {
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
      signal: AbortSignal.timeout(DELIVERY_TIMEOUT_MS),
    })

    if (!response.ok) {
      const detail = await response.text().catch(() => '')
      console.error('Contact delivery rejected', { requestId, status: response.status, detail: detail.slice(0, 300) })
      return { status: 502, payload: { ok: false, error: 'delivery_failed' } }
    }
  } catch (error) {
    const timedOut = error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError')
    console.error('Contact delivery dependency failed', {
      requestId,
      reason: timedOut ? 'timeout' : 'network_error',
      error: error instanceof Error ? error.message.slice(0, 180) : 'unknown_error',
    })
    return { status: timedOut ? 504 : 502, payload: { ok: false, error: timedOut ? 'delivery_timeout' : 'delivery_failed' } }
  }

  return { status: 200, payload: { ok: true } }
}

export function createContactServer() {
  const limiter = createRateLimiter()
  const server = http.createServer(async (req, res) => {
    const requestId = text(req.headers['x-railway-request-id'], 100) || randomUUID()
    res.setHeader('X-Request-Id', requestId)

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

    const contentType = String(req.headers['content-type'] ?? '').split(';', 1)[0].trim().toLowerCase()
    if (contentType !== 'application/json') return json(res, 415, { ok: false, error: 'unsupported_media_type' })
    if (limiter.isLimited(clientIp(req))) return json(res, 429, { ok: false, error: 'rate_limited' })

    try {
      const input = await readJson(req)
      const result = await deliver(input, requestId)
      return json(res, result.status, result.payload)
    } catch (error) {
      if (error instanceof Error && error.message === 'payload_too_large') {
        return json(res, 413, { ok: false, error: 'payload_too_large' })
      }
      console.error('Contact API rejected request', {
        requestId,
        reason: error instanceof Error ? error.message.slice(0, 180) : 'unknown_error',
      })
      return json(res, 400, { ok: false, error: 'invalid_request' })
    }
  })

  server.requestTimeout = REQUEST_TIMEOUT_MS
  server.headersTimeout = 6_000
  server.keepAliveTimeout = 5_000
  server.maxRequestsPerSocket = 100
  server.maxHeadersCount = 64
  return server
}

function start() {
  const server = createContactServer()
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Archic contact API listening on :${PORT}`)
  })

  const shutdown = (signal) => {
    console.log(`Archic contact API received ${signal}; draining connections`)
    server.close((error) => {
      if (error) {
        console.error('Contact API shutdown failed', error.message)
        process.exitCode = 1
      }
    })
  }

  process.once('SIGTERM', () => shutdown('SIGTERM'))
  process.once('SIGINT', () => shutdown('SIGINT'))
}

const entry = process.argv[1] ? pathToFileURL(process.argv[1]).href : ''
if (entry === import.meta.url) start()
