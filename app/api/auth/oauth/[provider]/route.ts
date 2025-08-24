import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

type Params = { params: { provider: string } }

export async function GET(_req: Request, { params }: Params) {
  const { provider } = params
  return NextResponse.json(
    {
      ok: false,
      code: 'NOT_IMPLEMENTED',
      provider,
      message: `OAuth for "${provider}" not implemented. Point this route to your provider init (e.g., NextAuth signIn('github')).`,
    },
    { status: 501 },
  )
}

export async function POST(_req: Request, { params }: Params) {
  const { provider } = params
  return NextResponse.json(
    {
      ok: false,
      code: 'NOT_IMPLEMENTED',
      provider,
      message: `OAuth callback/POST for "${provider}" not implemented.`,
    },
    { status: 501 },
  )
}
