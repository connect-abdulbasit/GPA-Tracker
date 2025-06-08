import { authMiddleware } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req) {
    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
