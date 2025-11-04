import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // const token = req.cookies.get('token')?.value || req.headers.get('authorization')?.split(' ')[1]
  // const { pathname } = req.nextUrl

  // if (!token && pathname !== '/login') {
  //   const loginUrl = new URL('/login', req.url)
  //   return NextResponse.redirect(loginUrl)
  // }
  // else if (token && pathname === '/login') {
  //   const homeUrl = new URL('/', req.url)
  //   return NextResponse.redirect(homeUrl)
  // }

  // return NextResponse.next()
  // return NextResponse.redirect(new URL('/', req.url))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
