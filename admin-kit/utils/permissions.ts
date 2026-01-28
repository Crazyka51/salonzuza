import type { AdminUser, AdminPermission } from "../core/types"

// Permission checking utilities
export class PermissionManager {
  private permissions: AdminPermission[] = []

  constructor(permissions: AdminPermission[] = []) {
    this.permissions = permissions
  }

  addPermission(permission: AdminPermission) {
    this.permissions.push(permission)
  }

  can(user: AdminUser, action: string, resource: string, data?: any): boolean {
    // If no permissions system is configured, allow everything
    if (!user.permissions) return true

    // Check if user has the specific permission
    const permissionKey = `${resource}.${action}`
    if (!user.permissions.includes(permissionKey)) return false

    // Check conditional permissions
    const permission = this.permissions.find((p) => p.action === action && p.resource === resource)

    if (permission?.condition) {
      return permission.condition(user, data)
    }

    return true
  }

  cannot(user: AdminUser, action: string, resource: string, data?: any): boolean {
    return !this.can(user, action, resource, data)
  }
}

// Default permission definitions
export const defaultPermissions: AdminPermission[] = [
  { action: "read", resource: "users" },
  { action: "create", resource: "users" },
  { action: "update", resource: "users" },
  { action: "delete", resource: "users" },
  { action: "read", resource: "settings" },
  { action: "update", resource: "settings" },
]

// Permission constants
export const PERMISSIONS = {
  USERS: {
    READ: "users.read",
    CREATE: "users.create",
    UPDATE: "users.update",
    DELETE: "users.delete",
  },
  SETTINGS: {
    READ: "settings.read",
    UPDATE: "settings.update",
  },
} as const
