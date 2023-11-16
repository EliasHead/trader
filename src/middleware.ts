import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')?.value

  const signInURL = new URL('/login', request.url)
  const homeURL = new URL('/', request.url)

  if (!token) {
    if (request.nextUrl.pathname === '/login') {
      return NextResponse.next()
    }

    return NextResponse.redirect(signInURL)
  }

  console.log(request.nextUrl.pathname)

  if (request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(homeURL)
  }
}

export const config = {
  matcher: ['/', '/login'],
}
