// app/api/contact/route.ts
export const runtime = 'edge' // fast, no Node.js deps

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // Basic validation
    const { name, email, message, reason, company_website } = data || {}

    // Honeypot: if bot filled the hidden field, pretend success
    if (company_website) {
      return Response.json({ ok: true })
    }

    if (!name || !email || !message) {
      return Response.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
    }

    // TODO: wire to your email provider or webhook
    // Example: if (process.env.CONTACT_WEBHOOK_URL) await fetch(process.env.CONTACT_WEBHOOK_URL, { method:'POST', body: JSON.stringify(data), headers:{'content-type':'application/json'} })

    // For now, log (visible in Vercel logs)
    console.log('CONTACT_FORM', {
      receivedAt: new Date().toISOString(),
      reason,
      name,
      email,
      message: (message as string)?.slice(0, 5000),
    })

    return Response.json({ ok: true })
  } catch (err) {
    return Response.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}
