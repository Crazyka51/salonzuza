// Module registry and exports - Salon Zuza admin modules
export { PageContentEditor } from "./content/PageContentEditor"
export { AnalyticsWidget } from "./analytics/AnalyticsWidget"
export { EmployeeManager } from "./employees/EmployeeManager"
export { SettingsManager } from "./settings/SettingsManager"
// Note: MediaManager import will be handled directly in SalonDashboard due to existing structure

// Module definitions for configuration
export const defaultModules = [
  {
    id: "dashboard",
    name: "Přehled",
    path: "/admin",
    component: "SalonDashboard",
  },
  {
    id: "content", 
    name: "Editor obsahu",
    path: "/admin/editor-obsahu",
    component: "PageContentEditor",
    api: {
      list: "/api/admin/page-content",
      create: "/api/admin/page-content",
      update: "/api/admin/page-content/:id",
      delete: "/api/admin/page-content/:id",
    },
  },
  {
    id: "analytics",
    name: "Statistiky", 
    path: "/admin/statistiky",
    component: "AnalyticsWidget",
  },
]

// Dynamic import mapping for components
export const componentMap = {
  SalonDashboard: () => import("../ui/Dashboard/SalonDashboard").then((m) => m.SalonDashboard),
  PageContentEditor: () => import("./content/PageContentEditor").then((m) => m.PageContentEditor),
  AnalyticsWidget: () => import("./analytics/AnalyticsWidget").then((m) => m.AnalyticsWidget),
}

// Export alias for backward compatibility
export const moduleComponents = componentMap;