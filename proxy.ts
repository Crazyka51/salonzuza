import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { AdminAuthMiddleware } from "./admin-kit/core/auth/middleware"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only handle admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  // Authentication disabled - allow all admin routes without login
  // const authMiddleware = new AdminAuthMiddleware({
  //   publicPaths: ["/admin/login"],
  //   loginPath: "/admin/login",
  // })

  // // Check if route requires authentication
  // if (authMiddleware.requiresAuth(pathname)) {
  //   const user = await authMiddleware.authenticate(request)

  //   if (!user) {
  //     // Redirect to login with return URL
  //     const loginUrl = authMiddleware.getLoginUrl(pathname)
  //     return NextResponse.redirect(new URL(loginUrl, request.url))
  //   }
  // }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - _not-found (Next.js internal not found page)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|_not-found).*)",
  ],
}
