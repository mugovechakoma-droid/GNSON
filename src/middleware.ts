import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This middleware uses a mocked cookie 'role' set during login to handle RBAC.
export function middleware(request: NextRequest) {
  const roleCookie = request.cookies.get('role')?.value
  const { pathname } = request.nextUrl

  // Protected Admin Routes
  if (pathname.startsWith('/admin')) {
    if (!roleCookie) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    if (roleCookie !== 'Admin') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Protected Student Routes
  if (pathname.startsWith('/student')) {
    if (!roleCookie) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    if (roleCookie !== 'Student') {
      // If admin tries to access student, we let them or redirect?
      // Strict RBAC: only student accesses student routes.
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // If logged in and trying to access login or landing page, redirect to respective dashboard
  if (pathname === '/login' || pathname === '/') {
    if (roleCookie === 'Admin') {
      return NextResponse.redirect(new URL('/admin', request.url))
    } else if (roleCookie === 'Student') {
      // In a real app we'd fetch their block from Firestore. We mock it to y1b1.
      return NextResponse.redirect(new URL('/student/y1b1', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
