import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/"];

const authRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute) return NextResponse.next();
  
  const isAuthRoute = authRoutes.includes(pathname);
  
  // Check session for auth routes
  const sessionRes = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
    method: "GET",
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });

  if (!sessionRes.ok) {
    // If no session and trying to access protected route, redirect to sign-in
    if (!isAuthRoute) {
      const signinUrl = new URL("/sign-in", request.url);
      return NextResponse.redirect(signinUrl);
    }
    // If no session and on auth route, allow access
    return NextResponse.next();
  }

  // If has session and on auth route, redirect to home
  if (isAuthRoute) {
    const homeUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};