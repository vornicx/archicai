const RECIPIENTS = ['vornic@archic.es', 'antero@archic.es']
const MAX_BODY_BYTES = 24_000

function text(value, max = 2_000) {
  return String(value ?? '').trim().slice(0, max)
}

function extractEmail(value) {
  const match = String(value ?? '').match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)
  return match?.[0] ?? null
}

function parseBody(req) {
  if (req.body && typeof req.body === 'object') return req.body
  if (typeof req.body === 'string') return JSON.parse(req.body)
  return {}
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'method_not_allowed' })
  }

  const contentLength = Number(req.headers['content-length'] ?? 0)
  if (contentLength > MAX_BODY_BYTES) {
    return res.status(413).json({ ok: false, error: 'payload_too_large' })
  }

  let input
  try {
    input = parseBody(req)
  } catch {
    return res.status(400).json({ ok: false, error: 'invalid_json' })
  }

  // Honeypot: bots get a successful-looking response without sending mail.
  if (text(input.companyWebsite, 200)) {
    return res.status(200).json({ ok: true })
  }

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
  const startedAt = Number(input.startedAt ?? 0)

  if (!name || !contact || !revenue || !challenge || !outcome || input.consent !== true) {
    return res.status(400).json({ ok: false, error: 'missing_required_fields' })
  }

  // The form contains several required long-answer fields, so a sub-second submit is almost certainly automated.
  if (startedAt > 0 && Date.now() - startedAt < 1_200) {
    return res.status(200).json({ ok: true })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('Archic contact delivery is missing RESEND_API_KEY')
    return res.status(503).json({ ok: false, error: 'delivery_unavailable' })
  }

  const subject = `[Archic web] ${type || 'Consulta de proyecto'} — ${company || name}`
  const lines = [
    `Nombre: ${name}`,
    `Empresa: ${company || '-'}`,
    `Contacto: ${contact}`,
    `Web actual: ${website || '-'}`,
    `Tipo: ${type || '-'}`,
    `Inversión prevista: ${investment || '-'}`,
    `Idioma: ${language.toUpperCase()}`,
    '',
    'Cómo gana dinero el negocio',
    revenue,
    '',
    'Qué no está funcionando',
    challenge,
    '',
    'Qué debería cambiar',
    outcome,
    '',
    'Contexto adicional',
    details || '-',
    ...(attribution.length ? ['', 'Contexto de llegada (sesión, sin tracking externo)', ...attribution] : []),
  ]

  const replyTo = extractEmail(contact)
  const payload = {
    from: 'Archic Web <web@archic.es>',
    to: RECIPIENTS,
    subject,
    text: lines.join('\n'),
    ...(replyTo ? { reply_to: replyTo } : {}),
    tags: [{ name: 'source', value: 'archic-web' }],
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const detail = await response.text().catch(() => '')
      console.error('Archic contact delivery failed', response.status, detail.slice(0, 500))
      return res.status(502).json({ ok: false, error: 'delivery_failed' })
    }

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Archic contact delivery request failed', error instanceof Error ? error.message : 'unknown_error')
    return res.status(502).json({ ok: false, error: 'delivery_failed' })
  }
}
