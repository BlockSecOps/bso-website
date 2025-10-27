import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect /admin login to custom login page
  if (pathname === '/admin/login' || pathname === '/admin/login/') {
    const url = request.nextUrl.clone()
    url.pathname = '/admin-login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/login', '/admin/login/'],
}
