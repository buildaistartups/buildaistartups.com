// app/api/auth/oauth/[provider]/route.ts
import { NextResponse } from 'next/server'

export const runtime = 'nodejs' // or 'edge' if you prefer

function getProviderFromURL(req: Request) {
  const { pathname } = new URL(req.url)
  const parts = pathname.split('/').filter(Boolean)
  return parts[parts.length - 1] || 'unknown'
}

export async function GET(req: Request) {
  const provider = getProviderFromURL(req)
  return NextResponse.json(
    {
      ok: false,
      code: 'NOT_IMPLEMENTED',
      provider,
      message: `OAuth for "${provider}" not implemented. Wire this to your provider init (e.g., NextAuth signIn('${provider}')).`,
    },
    { status: 501 },
  )
}

export async function POST(req: Request) {
  const provider = getProviderFromURL(req)
  return NextResponse.json(
    {
      ok: false,
      code: 'NOT_IMPLEMENTED',
      provider,
      message: `OAuth POST/callback for "${provider}" not implemented.`,
    },
    { status: 501 },
  )
}
