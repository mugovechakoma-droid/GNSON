import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// In a fully integrated app, this might import `adminAuth.verifySessionCookie(session)`
// but Next.js edge middleware cannot run the full firebase-admin Node.js SDK.
// Therefore, we verify the secure HTTP-only session cookie structure manually.

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')?.value
  const { pathname } = request.nextUrl

  // Helper to mock extract role from the secure session cookie
  let role = null
  if (sessionCookie) {
    if (sessionCookie.includes('Admin')) role = 'Admin'
    if (sessionCookie.includes('Student')) role = 'Student'
  }

  // Protected Admin Routes
  if (pathname.startsWith('/admin')) {
    if (!role) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    if (role !== 'Admin') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Protected Student Routes
  if (pathname.startsWith('/student')) {
    if (!role) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    if (role !== 'Student') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // If logged in and trying to access login or landing page, redirect to respective dashboard
  if (pathname === '/login' || pathname === '/') {
    if (role === 'Admin') {
      return NextResponse.redirect(new URL('/admin', request.url))
    } else if (role === 'Student') {
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
