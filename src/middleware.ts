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
  const studentRouteCookie = request.cookies.get('student_route')?.value

  const { pathname } = request.nextUrl

  // Protected Admin Routes
  if (pathname.startsWith('/admin')) {
    if (!sessionCookie || !roleCookie) {
      return NextResponse.redirect(new URL('/', request.url)) // Redirect to Z-pattern landing page login
    }
    if (roleCookie !== 'Admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Protected Student Routes
  if (pathname.startsWith('/student')) {
    if (!sessionCookie || !roleCookie) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    if (roleCookie !== 'Student') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // If logged in and trying to access the landing page (which now houses the login), redirect to respective dashboard
  if ((pathname === '/' || pathname === '/login') && sessionCookie && roleCookie) {
    if (roleCookie === 'Admin') {
      return NextResponse.redirect(new URL('/admin', request.url))
    } else if (roleCookie === 'Student') {
      const targetRoute = studentRouteCookie || '/student/y1b1' // Smart redirect utilizing data from DB fetched at login
      return NextResponse.redirect(new URL(targetRoute, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
