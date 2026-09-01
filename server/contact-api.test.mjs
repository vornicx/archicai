import test from 'node:test'
import assert from 'node:assert/strict'
import { clientIp, createContactServer, createRateLimiter } from './contact-api.mjs'

const allowedHeaders = {
  Origin: 'https://archic.es',
  'Content-Type': 'application/json',
  'X-Real-IP': '203.0.113.42',
}

const validPayload = () => ({
  name: 'Ada Lovelace',
  contact: 'ada@example.com',
  company: 'Analytical Engines',
  website: 'https://example.com',
  type: 'Software a medida',
  revenue: 'Servicios',
  challenge: 'Demasiado trabajo manual',
  outcome: 'Automatizar el flujo',
  investment: '3.000–7.500 €',
  details: 'Contexto',
  language: 'es',
  consent: true,
  startedAt: Date.now() - 5_000,
})

async function withServer(options, run) {
  const server = createContactServer(options)
  await new Promise((resolve, reject) => {
    server.once('error', reject)
    server.listen(0, '127.0.0.1', resolve)
  })

  const address = server.address()
  assert.ok(address && typeof address === 'object')
  const baseUrl = `http://127.0.0.1:${address.port}`

  try {
    return await run(baseUrl)
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
  }
}

test('rate limiter enforces the fixed window and resets after expiry', () => {
  let now = 1_000
  const limiter = createRateLimiter({ windowMs: 1_000, maxRequests: 2, maxBuckets: 10, now: () => now })

  assert.equal(limiter.isLimited('203.0.113.10'), false)
  assert.equal(limiter.isLimited('203.0.113.10'), false)
  assert.equal(limiter.isLimited('203.0.113.10'), true)

  now += 1_001
  assert.equal(limiter.isLimited('203.0.113.10'), false)
})

test('rate limiter bounds memory under high-cardinality client traffic', () => {
  let now = 5_000
  const limiter = createRateLimiter({ windowMs: 60_000, maxRequests: 10, maxBuckets: 3, now: () => now })

  for (let index = 0; index < 20; index += 1) {
    limiter.isLimited(`198.51.100.${index}`)
    now += 1
  }

  assert.ok(limiter.size <= 3, `expected <= 3 buckets, got ${limiter.size}`)
})

test('client IP uses Railway trusted edge header instead of spoofable forwarded chain', () => {
  const req = {
    headers: {
      'x-real-ip': '203.0.113.42',
      'x-forwarded-for': '198.51.100.9, 203.0.113.42',
    },
    socket: { remoteAddress: '10.0.0.5' },
  }

  assert.equal(clientIp(req), '203.0.113.42')
})

test('client IP falls back to socket address when edge header is unavailable', () => {
  const req = { headers: {}, socket: { remoteAddress: '127.0.0.1' } }
  assert.equal(clientIp(req), '127.0.0.1')
})

test('contact endpoint rejects unexpected media types before parsing a body', async () => {
  await withServer({ apiKey: 'test' }, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { Origin: 'https://archic.es', 'Content-Type': 'text/plain' },
      body: 'hello',
    })

    assert.equal(response.status, 415)
    assert.deepEqual(await response.json(), { ok: false, error: 'unsupported_media_type' })
  })
})

test('contact endpoint rejects oversized payloads with 413', async () => {
  await withServer({ apiKey: 'test' }, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: allowedHeaders,
      body: JSON.stringify({ ...validPayload(), details: 'x'.repeat(25_000) }),
    })

    assert.equal(response.status, 413)
    assert.deepEqual(await response.json(), { ok: false, error: 'payload_too_large' })
  })
})

test('Resend rejection is a dependency failure, not a client 400', async () => {
  const fetchImpl = async () => new Response('upstream rejected', { status: 500 })

  await withServer({ fetchImpl, apiKey: 'test' }, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: allowedHeaders,
      body: JSON.stringify(validPayload()),
    })

    assert.equal(response.status, 502)
    assert.ok(response.headers.get('x-request-id'))
    assert.deepEqual(await response.json(), { ok: false, error: 'delivery_failed' })
  })
})

test('Resend timeout is bounded and classified as 504', async () => {
  const fetchImpl = async (_url, options) => new Promise((_resolve, reject) => {
    const signal = options.signal
    const rejectFromSignal = () => reject(signal.reason ?? new DOMException('Aborted', 'AbortError'))
    if (signal.aborted) rejectFromSignal()
    else signal.addEventListener('abort', rejectFromSignal, { once: true })
  })

  await withServer({ fetchImpl, apiKey: 'test', deliveryTimeoutMs: 10 }, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: allowedHeaders,
      body: JSON.stringify(validPayload()),
    })

    assert.equal(response.status, 504)
    assert.deepEqual(await response.json(), { ok: false, error: 'delivery_timeout' })
  })
})
