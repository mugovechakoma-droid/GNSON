import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Next.js edge middleware cannot run the full firebase-admin Node.js SDK to verify the
// session cookie using adminAuth.verifySessionCookie().
// Instead, we verify the presence of the secure session cookie, and rely on the Server Actions
// (which run in a Node environment) to fully validate the session against Firebase before returning data.
// For routing purposes, we read the secure 'role' cookie set during login.

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')?.value
  const roleCookie = request.cookies.get('role')?.value

  const { pathname } = request.nextUrl

  // Protected Admin Routes
  if (pathname.startsWith('/admin')) {
    if (!sessionCookie || !roleCookie) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    if (roleCookie !== 'Admin') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Protected Student Routes
  if (pathname.startsWith('/student')) {
    if (!sessionCookie || !roleCookie) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    if (roleCookie !== 'Student') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // If logged in and trying to access login or landing page, redirect to respective dashboard
  if ((pathname === '/login' || pathname === '/') && sessionCookie && roleCookie) {
    if (roleCookie === 'Admin') {
      return NextResponse.redirect(new URL('/admin', request.url))
    } else if (roleCookie === 'Student') {
      return NextResponse.redirect(new URL('/student/y1b1', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
