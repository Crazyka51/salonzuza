"use client"

import { useEffect, useState } from "react"
import { AdminProvider } from "../../../admin-kit/core/context/AdminProvider"
import { AuthProvider } from "../../../admin-kit/core/auth/AuthProvider"
import { AdminLayout } from "../../../admin-kit/core/layout/AdminLayout"
import { Dashboard } from "../../../admin-kit/ui/Dashboard"
import { UsersPage } from "../../../admin-kit/modules/users"
import { PostsPage } from "../../../admin-kit/modules/posts"
import { SettingsPage } from "../../../admin-kit/modules/settings"
import { AccessDenied } from "../../../admin-kit/ui/AccessDenied"
import { LoadingSpinner } from "../../../admin-kit/ui/LoadingSpinner"
import { ErrorBoundary } from "../../../admin-kit/ui/ErrorBoundary"
import { ProtectedRoute } from "../../../admin-kit/core/auth/ProtectedRoute"
import type { AdminConfig } from "../../../admin-kit/core/types"

// Component mapping for client-side routing
const componentMap = {
  Dashboard,
  UsersPage,
  PostsPage,
  SettingsPage,
  AccessDenied,
}

// Admin configuration
const adminConfig: Partial<AdminConfig> = {
  title: "Admin Panel",
  theme: "system",
  navigation: [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/admin",
      icon: "Home",
    },
    {
      id: "users",
      label: "Users",
      href: "/admin/users",
      icon: "Users",
      permission: "users.read",
    },
    {
      id: "posts",
      label: "Posts",
      href: "/admin/posts",
      icon: "FileText",
      permission: "posts.read",
    },
    {
      id: "settings",
      label: "Settings",
      href: "/admin/settings",
      icon: "Settings",
      permission: "settings.read",
    },
  ],
  modules: [
    {
      id: "users",
      name: "Users",
      path: "/admin/users",
      component: UsersPage,
      permissions: ["users.read"],
    },
    {
      id: "posts",
      name: "Posts",
      path: "/admin/posts",
      component: PostsPage,
      permissions: ["posts.read"],
    },
    {
      id: "settings",
      name: "Settings",
      path: "/admin/settings",
      component: SettingsPage,
      permissions: ["settings.read"],
    },
  ],
  auth: {
    provider: "custom",
    loginPath: "/admin/login",
    redirectAfterLogin: "/admin",
    permissions: true,
  },
}

interface AdminCatchAllPageProps {
  slug: string[]
}

export function AdminCatchAllPage({ slug }: AdminCatchAllPageProps) {
  const [currentComponent, setCurrentComponent] = useState<keyof typeof componentMap | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Determine which component to render based on slug
    const determineComponent = () => {
      if (slug.length === 0) {
        return "Dashboard"
      }

      const [route] = slug
      switch (route) {
        case "users":
          return "UsersPage"
        case "posts":
          return "PostsPage"
        case "settings":
          return "SettingsPage"
        default:
          return null
      }
    }

    const component = determineComponent()
    setCurrentComponent(component)
    setLoading(false)
  }, [slug])

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading admin panel..." />
  }

  const ComponentToRender = currentComponent ? componentMap[currentComponent] : null

  return (
    <ErrorBoundary>
      <AuthProvider>
        <AdminProvider config={adminConfig}>
          <ProtectedRoute>
            <AdminLayout>
              {ComponentToRender ? (
                <ComponentToRender />
              ) : (
                <AccessDenied message="Page not found" showBackButton showHomeButton />
              )}
            </AdminLayout>
          </ProtectedRoute>
        </AdminProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}
