// app/api/contact/route.ts
import { NextResponse } from 'next/server'

export const runtime = 'edge'

const MAX_BYTES = 20_000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function cors(origin?: string) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

export async function OPTIONS(req: Request) {
  const origin = req.headers.get('origin') || '*'
  return new NextResponse(null, { status: 204, headers: cors(origin) })
}

export async function GET() {
  return NextResponse.json({ ok: false, error: 'Method not allowed' }, { status: 405 })
}

export async function POST(req: Request) {
  const origin = req.headers.get('origin') || '*'

  try {
    const ct = req.headers.get('content-type') || ''
    if (!ct.includes('application/json')) {
      return NextResponse.json(
        { ok: false, error: 'Unsupported content-type' },
        { status: 415, headers: cors(origin) },
      )
    }

    const raw = await req.text()
    if (raw.length > MAX_BYTES) {
      return NextResponse.json(
        { ok: false, error: 'Payload too large' },
        { status: 413, headers: cors(origin) },
      )
    }

    let data: any = {}
    try {
      data = JSON.parse(raw)
    } catch {
      return NextResponse.json(
        { ok: false, error: 'Invalid JSON' },
        { status: 400, headers: cors(origin) },
      )
    }

    const { name, email, message, reason, company_website, turnstileToken } = data || {}

    // Honeypot: if bots fill the hidden field, pretend success
    if (company_website) {
      return NextResponse.json({ ok: true }, { headers: cors(origin) })
    }

    if (
      !name ||
      !email ||
      !message ||
      !EMAIL_RE.test(String(email)) ||
      String(name).length > 200 ||
      String(message).length > 10_000
    ) {
      return NextResponse.json(
        { ok: false, error: 'Missing or invalid fields' },
        { status: 400, headers: cors(origin) },
      )
    }

    // Optional: Cloudflare Turnstile verification
    if (process.env.TURNSTILE_SECRET_KEY && turnstileToken) {
      const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: String(turnstileToken),
        }),
      })
        .then((r) => r.json())
        .catch(() => ({ success: false }))

      if (!verify?.success) {
        return NextResponse.json(
          { ok: false, error: 'Captcha failed' },
          { status: 400, headers: cors(origin) },
        )
      }
    }

    // Lightweight logging (trim big strings)
    const ua = req.headers.get('user-agent') || ''
    const ref = req.headers.get('referer') || ''
    console.log('CONTACT_FORM', {
      ts: new Date().toISOString(),
      reason: reason || 'general',
      name,
      email,
      ua: ua.slice(0, 200),
      ref: ref.slice(0, 200),
      msgLen: String(message).length,
      preview: String(message).slice(0, 300),
    })

    // Optional webhook fan-out
    if (process.env.CONTACT_WEBHOOK_URL) {
      await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...data, ua, ref }),
      }).catch(() => null)
    }

    return NextResponse.json({ ok: true }, { headers: cors(origin) })
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Server error' },
      { status: 500, headers: cors(origin) },
    )
  }
}
