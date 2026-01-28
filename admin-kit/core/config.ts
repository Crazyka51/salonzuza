import type { AdminConfig } from "./types"

// Default configuration for the admin-kit system
export const defaultAdminConfig: AdminConfig = {
  title: "CMS Admin Panel",
  theme: "system",
  navigation: [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/admin",
      icon: "Home",
    },
    {
      id: "articles",
      label: "Správa článků",
      href: "/admin/articles",
      icon: "FileText",
      permission: "articles.read",
    },
    {
      id: "categories",
      label: "Správa kategorií",
      href: "/admin/categories",
      icon: "Folder",
      permission: "categories.read",
    },
    {
      id: "media",
      label: "Správa médií",
      href: "/admin/media",
      icon: "Image",
      permission: "media.read",
    },
    {
      id: "analytics",
      label: "Analytika",
      href: "/admin/analytics",
      icon: "BarChart3",
      permission: "analytics.read",
    },
    {
      id: "newsletter",
      label: "Newsletter",
      href: "/admin/newsletter",
      icon: "Mail",
      permission: "newsletter.read",
    },
    {
      id: "backups",
      label: "Zálohy",
      href: "/admin/backups",
      icon: "Database",
      permission: "backups.read",
    },
    {
      id: "diagnostics",
      label: "Diagnostika",
      href: "/admin/diagnostics",
      icon: "Activity",
      permission: "diagnostics.read",
    },
    {
      id: "users",
      label: "Uživatelé",
      href: "/admin/users",
      icon: "Users",
      permission: "users.read",
    },
    {
      id: "settings",
      label: "Nastavení",
      href: "/admin/settings",
      icon: "Settings",
      permission: "settings.read",
    },
  ],
  modules: [],
  auth: {
    provider: "jwt", // Updated default provider to JWT
    loginPath: "/admin/login",
    redirectAfterLogin: "/admin",
    permissions: true,
    jwt: {
      secret: process.env.JWT_SECRET || "nK8mP2vR9sT4wX7zA3bC6eF1gH5jL8nQ2rS5uV8yB1dE4fG7hJ0kM3pN6qT9wZ2",
      expiresIn: "7d",
    },
  },
}

// Configuration merger utility
export function mergeAdminConfig(userConfig: Partial<AdminConfig>): AdminConfig {
  return {
    ...defaultAdminConfig,
    ...userConfig,
    navigation: userConfig.navigation || defaultAdminConfig.navigation,
    modules: userConfig.modules || defaultAdminConfig.modules,
    auth: {
      ...defaultAdminConfig.auth,
      ...userConfig.auth,
      jwt: {
        ...defaultAdminConfig.auth.jwt,
        ...userConfig.auth?.jwt,
      },
    },
  }
}
