// Module registry and exports - CMS modules
export { UsersPage } from "./users"
export { PostsPage } from "./posts" 
export { SettingsPage } from "./settings"
export { ArticlesPage } from "./articles"
export { CategoriesPage } from "./categories"

// Module definitions for configuration
export const defaultModules = [
  {
    id: "dashboard",
    name: "Dashboard",
    path: "/admin",
    component: "Dashboard",
  },
  {
    id: "articles",
    name: "Správa článků",
    path: "/admin/articles",
    component: "ArticlesPage",
    permissions: ["articles.read"],
    api: {
      list: "/api/admin/articles",
      create: "/api/admin/articles",
      read: "/api/admin/articles/:id",
      update: "/api/admin/articles/:id",
      delete: "/api/admin/articles/:id",
    },
  },
  {
    id: "categories",
    name: "Správa kategorií",
    path: "/admin/categories",
    component: "CategoriesPage",
    permissions: ["categories.read"],
    api: {
      list: "/api/admin/categories",
      create: "/api/admin/categories",
      read: "/api/admin/categories/:id",
      update: "/api/admin/categories/:id",
      delete: "/api/admin/categories/:id",
    },
  },
  {
    id: "media",
    name: "Správa médií",
    path: "/admin/media",
    component: "MediaPage",
    permissions: ["media.read"],
    api: {
      list: "/api/admin/media",
      create: "/api/admin/media",
      delete: "/api/admin/media/:id",
    },
  },
  {
    id: "analytics",
    name: "Analytika",
    path: "/admin/analytics",
    component: "AnalyticsPage",
    permissions: ["analytics.read"],
  },
  {
    id: "newsletter",
    name: "Newsletter",
    path: "/admin/newsletter",
    component: "NewsletterPage",
    permissions: ["newsletter.read"],
    api: {
      list: "/api/admin/newsletter/subscribers",
      create: "/api/admin/newsletter/campaigns",
    },
  },
  {
    id: "backups",
    name: "Zálohy",
    path: "/admin/backups",
    component: "BackupsPage",
    permissions: ["backups.read"],
    api: {
      list: "/api/admin/backups",
      create: "/api/admin/backups",
    },
  },
  {
    id: "diagnostics",
    name: "Diagnostika",
    path: "/admin/diagnostics",
    component: "DiagnosticsPage",
    permissions: ["diagnostics.read"],
  },
  {
    id: "users",
    name: "Uživatelé",
    path: "/admin/users",
    component: "UsersPage", 
    permissions: ["users.read"],
    api: {
      list: "/api/admin/users",
      create: "/api/admin/users",
      read: "/api/admin/users/:id",
      update: "/api/admin/users/:id",
      delete: "/api/admin/users/:id",
    },
  },
  {
    id: "settings",
    name: "Nastavení",
    path: "/admin/settings",
    component: "SettingsPage",
    permissions: ["settings.read"],
    api: {
      read: "/api/admin/settings",
      update: "/api/admin/settings",
    },
  },
]

// Module component map for dynamic loading
export const moduleComponents = {
  Dashboard: () => import("../ui/Dashboard").then((m) => m.Dashboard),
  UsersPage: () => import("./users").then((m) => m.UsersPage),
  PostsPage: () => import("./posts").then((m) => m.PostsPage),
  SettingsPage: () => import("./settings").then((m) => m.SettingsPage),
  ArticlesPage: () => import("./articles").then((m) => m.ArticlesPage),
  CategoriesPage: () => import("./categories").then((m) => m.CategoriesPage),
  MediaPage: () => import("./media").then((m) => m.MediaPage),
  AnalyticsPage: () => import("./analytics").then((m) => m.AnalyticsPage),
  NewsletterPage: () => import("./newsletter").then((m) => m.NewsletterPage),
  BackupsPage: () => import("./backups").then((m) => m.BackupsPage),
  DiagnosticsPage: () => import("./diagnostics").then((m) => m.DiagnosticsPage),
}