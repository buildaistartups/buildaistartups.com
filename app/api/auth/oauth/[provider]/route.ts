// app/api/auth/oauth/[provider]/route.ts
import { NextResponse } from 'next/server'

export const runtime = 'nodejs' // or 'edge' if you prefer

export async function GET(
  _req: Request,
  context: { params: { provider: string } }
) {
  const { provider } = context.params
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

export async function POST(
  _req: Request,
  context: { params: { provider: string } }
) {
  const { provider } = context.params
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
