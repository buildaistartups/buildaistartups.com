import { NextResponse } from 'next/server'

export const runtime = 'nodejs' // avoid edge by default

export async function POST(_req: Request) {
  return NextResponse.json(
    {
      ok: false,
      code: 'NOT_IMPLEMENTED',
      message:
        'Email/password login is not wired yet. Replace this route with your auth handler (NextAuth/Clerk/custom).',
    },
    { status: 501 },
  )
}

export async function GET() {
  return NextResponse.json(
    {
      ok: false,
      code: 'NOT_IMPLEMENTED',
      message:
        'Use POST /api/auth/login after you implement your auth handler.',
    },
    { status: 501 },
  )
}
