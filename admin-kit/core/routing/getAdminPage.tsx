import type { GetServerSidePropsContext } from "next"
import type { AdminModule } from "../types"
import { defaultModules } from "../../modules"
import { AdminAuthMiddleware } from "../auth/middleware"

interface AdminPageResult {
  pageComponent: string | null
  pageProps: Record<string, any>
  redirect?: string
}

export async function getAdminPage(
  slug: string[],
  context: GetServerSidePropsContext,
  modules: AdminModule[] = defaultModules,
): Promise<AdminPageResult> {
  const authMiddleware = new AdminAuthMiddleware()
  const pathname = `/admin/${slug.join("/")}`

  // Check authentication
  const user = await authMiddleware.authenticate(context.req as any)

  // If not authenticated and not on login page, redirect to login
  if (!user && !authMiddleware.isPublicPath(pathname)) {
    return {
      pageComponent: null,
      pageProps: {},
      redirect: authMiddleware.getLoginUrl(pathname),
    }
  }

  // Handle root admin path
  if (slug.length === 0 || (slug.length === 1 && slug[0] === "")) {
    return {
      pageComponent: "Dashboard",
      pageProps: { user },
    }
  }

  // Find matching module
  const [modulePath] = slug
  const module = modules.find((m) => m.path === `/admin/${modulePath}`)

  if (!module) {
    return {
      pageComponent: null,
      pageProps: {},
    }
  }

  // Check module permissions
  if (module.permissions && user) {
    const hasPermission = module.permissions.some((permission) => user.permissions?.includes(permission))
    if (!hasPermission) {
      return {
        pageComponent: "AccessDenied",
        pageProps: { requiredPermissions: module.permissions },
      }
    }
  }

  return {
    pageComponent: module.component as string,
    pageProps: {
      user,
      module,
      slug: slug.slice(1), // Pass remaining slug parts
    },
  }
}

// Component map for server-side rendering
export const adminPageComponents = {
  Dashboard: () => import("../../ui/Dashboard").then((m) => m.Dashboard),
  UsersPage: () => import("../../modules/users").then((m) => m.UsersPage),
  PostsPage: () => import("../../modules/posts").then((m) => m.PostsPage),
  SettingsPage: () => import("../../modules/settings").then((m) => m.SettingsPage),
  AccessDenied: () => Promise.resolve(() => <div>Access Denied</div>),
}

// Client-side component resolver
export function resolveAdminComponent(componentName: string) {
  const componentLoader = adminPageComponents[componentName as keyof typeof adminPageComponents]
  return componentLoader ? componentLoader() : null
}
