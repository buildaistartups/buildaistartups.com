import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isRouteDisabled } from './modules.config'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Block routes for disabled modules → redirect to home
  if (isRouteDisabled(pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Future: Auth protection for /app/** routes
  // const token = request.cookies.get('next-auth.session-token')
  // if (pathname.startsWith('/app') && !token) {
  //   const loginUrl = new URL('/signin', request.url)
  //   loginUrl.searchParams.set('callbackUrl', pathname)
  //   return NextResponse.redirect(loginUrl)
  // }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/app/:path*',
    '/product/:path*',
    '/generate/:path*',
    '/blog/:path*',
    '/docs/:path*',
  ],
}
