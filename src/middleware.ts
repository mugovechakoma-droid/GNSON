import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { getUserProfile } from './lib/dal';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_for_local_dev');

// Define protected paths that require authentication
const protectedPaths = ['/admin', '/instructor', '/student', '/dashboard'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path needs protection
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

  if (isProtectedPath) {
    const sessionCookie = request.cookies.get('session');

    // If no session cookie, reject with 401 and redirect to landing page
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    try {
      // 1. Verify the cryptographic signature of the JWT
      const { payload } = await jwtVerify(sessionCookie.value, JWT_SECRET);

      const uid = payload.uid as string;
      if (!uid) {
        throw new Error('No UID in token');
      }

      // 2. Query the DAL to get user profile and enforce RBAC
      const profile = await getUserProfile(uid);

      if (!profile) {
         throw new Error('User not found');
      }

      // 3. Smart Routing & Route Guarding

      // Smart Dispatcher
      if (pathname === '/dashboard') {
        if (profile.role === 'Admin') {
          return NextResponse.redirect(new URL('/admin', request.url));
        } else if (profile.role === 'Instructor') {
          return NextResponse.redirect(new URL('/instructor', request.url));
        } else if (profile.role === 'Student') {
          const expectedRoute = `/student/y${profile.currentYear}b${profile.currentBlock}`;
          return NextResponse.redirect(new URL(expectedRoute, request.url));
        }
      }

      // Admin Access
      if (pathname.startsWith('/admin')) {
        if (profile.role !== 'Admin') {
          return NextResponse.redirect(new URL('/unauthorized', request.url));
        }
      }
      // Instructor Access
      else if (pathname.startsWith('/instructor')) {
        if (profile.role !== 'Instructor' && profile.role !== 'Admin') { // Admins usually can access instructor stuff
            return NextResponse.redirect(new URL('/unauthorized', request.url));
        }
      }
      // Student Access
      else if (pathname.startsWith('/student')) {
        if (profile.role !== 'Student') {
            return NextResponse.redirect(new URL('/unauthorized', request.url));
        }

        // Dynamic student routing based on year and block
        const expectedRoute = `/student/y${profile.currentYear}b${profile.currentBlock}`;

        // If they are trying to access a student path that is NOT their designated path
        // (and it's not the base /student path which we'll redirect)
        if (pathname !== expectedRoute && pathname !== '/student') {
             return NextResponse.redirect(new URL(expectedRoute, request.url));
        }

        // If they just go to /student, redirect them to their specific module
        if (pathname === '/student') {
            return NextResponse.redirect(new URL(expectedRoute, request.url));
        }
      }

      // If we got here, they are authorized for the path they are requesting
      return NextResponse.next();

    } catch (error) {
      // Token is invalid, expired, or user not found. Reject.
      console.error('Middleware auth error:', error);
      // Clean redirect to landing page
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Not a protected path, let it pass
  return NextResponse.next();
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
};
