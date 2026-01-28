"use client"

import type React from "react"
import { useAuth } from "./AuthProvider"
import { LoginForm } from "./LoginForm"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermissions?: string[]
  fallback?: React.ComponentType
  showLogin?: boolean
}

export function ProtectedRoute({
  children,
  requiredPermissions = [],
  fallback: Fallback,
  showLogin = true,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    if (showLogin) {
      return <LoginForm />
    }

    if (Fallback) {
      return <Fallback />
    }

    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">You need to be logged in to access this page.</p>
        </div>
      </div>
    )
  }

  // Check permissions
  if (requiredPermissions.length > 0) {
    const hasPermissions = requiredPermissions.every((permission) => user.permissions?.includes(permission))

    if (!hasPermissions) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Insufficient Permissions</h1>
            <p className="text-muted-foreground">You don't have the required permissions to access this page.</p>
            <p className="text-sm text-muted-foreground mt-2">Required: {requiredPermissions.join(", ")}</p>
          </div>
        </div>
      )
    }
  }

  return <>{children}</>
}
