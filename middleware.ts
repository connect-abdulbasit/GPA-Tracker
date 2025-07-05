import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const publicRoutes = ['/sign-in(.*)', '/sign-up(.*)', '/']
const authRoutes = ['/sign-in', '/sign-up']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for auth cookie to determine if user is authenticated
  const sessionCookie = getSessionCookie(request);
  const isAuthenticated = !!sessionCookie;

  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (isAuthenticated && authRoutes.some(route => pathname.startsWith(route))) {
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(route => {
    const regex = new RegExp(`^${route.replace('(.*)', '.*')}$`);
    return regex.test(pathname);
  });

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // If no session cookie exists, redirect to sign-in page
  if (!sessionCookie) {
    const signinUrl = new URL('/sign-in', request.url);
    return NextResponse.redirect(signinUrl);
  }

  // If session cookie exists, allow access to protected route
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - api routes (including auth callbacks)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
