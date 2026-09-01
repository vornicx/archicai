import test from 'node:test'
import assert from 'node:assert/strict'
import { clientIp, createRateLimiter } from './contact-api.mjs'

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
