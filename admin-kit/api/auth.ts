import { type NextRequest, NextResponse } from "next/server"
import type { AdminUser } from "../core/types"
import { validateData, loginSchema } from "../utils/validation"
import { signJWT, verifyJWT, extractTokenFromRequest } from "../core/auth/jwt"
import { verifyStackAuthToken, getStackAuthConfig } from "../core/auth/stack-auth"

// Mock user database - replace with your actual user storage
const mockUsers: AdminUser[] = [
  {
    id: "1",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
    permissions: ["users.read", "users.create", "users.update", "users.delete", "settings.read", "settings.update"],
  },
  {
    id: "2",
    email: "editor@example.com",
    name: "Editor User",
    role: "editor",
    permissions: ["users.read", "settings.read"],
  },
]

// Mock password storage - in production, use proper password hashing
const mockPasswords: Record<string, string> = {
  "admin@example.com": "admin123",
  "editor@example.com": "editor123",
}

export async function handleLogin(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json()

    // Validate input
    const validation = validateData(loginSchema, body)
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid input",
          errors: validation.errors,
        },
        { status: 400 },
      )
    }

    const { email, password } = validation.data

    // Find user
    const user = mockUsers.find((u) => u.email === email)
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        { status: 401 },
      )
    }

    // Check password (in production, use proper password verification)
    if (mockPasswords[email] !== password) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        { status: 401 },
      )
    }

    const token = await signJWT({
      userId: user.id,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
    })

    const response = NextResponse.json({
      success: true,
      data: user,
      token, // Include token in response for client-side storage
      message: "Login successful",
    })

    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}

export async function handleLogout(request: NextRequest): Promise<NextResponse> {
  const response = NextResponse.json({
    success: true,
    message: "Logout successful",
  })

  response.cookies.delete("admin-token")

  return response
}

export async function handleSession(request: NextRequest): Promise<NextResponse> {
  const stackAuthConfig = getStackAuthConfig()
  if (stackAuthConfig) {
    const token = extractTokenFromRequest(request)
    if (token) {
      const user = await verifyStackAuthToken(token)
      if (user) {
        return NextResponse.json({
          success: true,
          data: user,
        })
      }
    }
  }

  const token = request.cookies.get("admin-token")?.value

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: "No session found",
      },
      { status: 401 },
    )
  }

  const payload = await verifyJWT(token)
  if (!payload) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid session",
      },
      { status: 401 },
    )
  }

  // Find user by ID from JWT payload
  const user = mockUsers.find((u) => u.id === payload.userId)
  if (!user) {
    return NextResponse.json(
      {
        success: false,
        message: "User not found",
      },
      { status: 401 },
    )
  }

  return NextResponse.json({
    success: true,
    data: user,
  })
}
