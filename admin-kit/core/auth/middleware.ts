import type { NextRequest } from "next/server"
import type { AdminUser } from "../types"
import { verifyJWT, extractTokenFromRequest } from "./jwt"
import { verifyStackAuthToken, getStackAuthConfig } from "./stack-auth"

// Server-side authentication middleware
export interface AuthMiddlewareOptions {
  publicPaths?: string[]
  loginPath?: string
  sessionCookieName?: string
  jwtSecret?: string
}

export class AdminAuthMiddleware {
  private options: Required<AuthMiddlewareOptions>

  constructor(options: AuthMiddlewareOptions = {}) {
    this.options = {
      publicPaths: ["/admin/login", "/api/admin/auth/login", ...(options.publicPaths || [])],
      loginPath: "/admin/login",
      sessionCookieName: "admin-token", // Updated cookie name to match JWT implementation
      jwtSecret: process.env.JWT_SECRET || "nK8mP2vR9sT4wX7zA3bC6eF1gH5jL8nQ2rS5uV8yB1dE4fG7hJ0kM3pN6qT9wZ2",
      ...options,
    }
  }

  async authenticate(request: NextRequest): Promise<AdminUser | null> {
    const stackAuthConfig = getStackAuthConfig()
    if (stackAuthConfig) {
      const token = extractTokenFromRequest(request)
      if (token) {
        const user = await verifyStackAuthToken(token)
        if (user) {
          return user
        }
      }
    }

    const sessionToken = request.cookies.get(this.options.sessionCookieName)?.value

    if (!sessionToken) {
      return null
    }

    try {
      const payload = await verifyJWT(sessionToken)
      if (!payload) {
        return null
      }

      return {
        id: payload.userId,
        email: payload.email,
        name: payload.email, // You might want to store name in JWT payload
        role: payload.role,
        permissions: payload.permissions,
      }
    } catch (error) {
      console.error("Authentication error:", error)
      return null
    }
  }

  private async verifySession(token: string): Promise<AdminUser | null> {
    // This is where you'd verify the JWT token or look up the session
    // Implementation depends on your auth strategy

    // Example JWT verification (you'd use a proper JWT library)
    try {
      // const decoded = jwt.verify(token, this.options.jwtSecret)
      // return await getUserById(decoded.userId)

      // For demo purposes, return a mock user
      return {
        id: "1",
        email: "admin@example.com",
        name: "Admin User",
        role: "admin",
        permissions: ["users.read", "users.create", "users.update", "users.delete", "settings.read", "settings.update"],
      }
    } catch (error) {
      return null
    }
  }

  isPublicPath(pathname: string): boolean {
    return this.options.publicPaths.some((path) => pathname.startsWith(path))
  }

  requiresAuth(pathname: string): boolean {
    return pathname.startsWith("/admin") && !this.isPublicPath(pathname)
  }

  getLoginUrl(returnTo?: string): string {
    const url = new URL(this.options.loginPath, "http://localhost")
    if (returnTo) {
      url.searchParams.set("returnTo", returnTo)
    }
    return url.pathname + url.search
  }
}

// Utility function for API route authentication
export async function authenticateApiRequest(request: NextRequest): Promise<AdminUser | null> {
  const middleware = new AdminAuthMiddleware()
  return await middleware.authenticate(request)
}

// Permission checking for API routes
export function requirePermission(user: AdminUser | null, permission: string): boolean {
  if (!user) return false
  return user.permissions?.includes(permission) || false
}

export function requirePermissions(user: AdminUser | null, permissions: string[]): boolean {
  if (!user) return false
  return permissions.every((permission) => user.permissions?.includes(permission))
}
