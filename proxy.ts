import { type NextRequest } from 'next/server'
import { updateSession } from './lib/supabase/middleware'
import { isRouteDisabled } from './modules.config'
import { NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Block disabled module routes
  if (isRouteDisabled(pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Auth session refresh + protection for /app/** and auth page redirects
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/app/:path*',
    '/signin',
    '/signup',
    '/product/:path*',
    '/generate/:path*',
    '/blog/:path*',
    '/docs/:path*',
  ],
}
