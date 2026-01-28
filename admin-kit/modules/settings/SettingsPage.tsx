"use client"
import { useState, useEffect } from "react"
import { FormGenerator } from "../../ui/FormGenerator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { CheckCircle } from "lucide-react"
import type { FormField } from "../../core/types"
import { useAdminApi } from "../../core/hooks/useAdminApi"
import { RoleGuard } from "../../core/auth/RoleGuard"

interface Settings {
  siteName: string
  theme: "light" | "dark" | "system"
  emailNotifications: boolean
  maintenanceMode: boolean
  maxUploadSize: number
  allowRegistration: boolean
  defaultUserRole: string
}

const generalSettingsFields: FormField[] = [
  {
    name: "siteName",
    label: "Site Name",
    type: "text",
    required: true,
    placeholder: "My Admin Panel",
    description: "The name of your application",
  },
  {
    name: "theme",
    label: "Default Theme",
    type: "select",
    required: true,
    options: [
      { value: "light", label: "Light" },
      { value: "dark", label: "Dark" },
      { value: "system", label: "System" },
    ],
    description: "Default theme for new users",
  },
  {
    name: "allowRegistration",
    label: "Allow User Registration",
    type: "checkbox",
    description: "Allow new users to register accounts",
  },
  {
    name: "defaultUserRole",
    label: "Default User Role",
    type: "select",
    required: true,
    options: [
      { value: "user", label: "User" },
      { value: "editor", label: "Editor" },
      { value: "admin", label: "Administrator" },
    ],
    description: "Default role assigned to new users",
  },
]

const systemSettingsFields: FormField[] = [
  {
    name: "maintenanceMode",
    label: "Maintenance Mode",
    type: "checkbox",
    description: "Enable maintenance mode to prevent user access",
  },
  {
    name: "emailNotifications",
    label: "Email Notifications",
    type: "checkbox",
    description: "Send email notifications for system events",
  },
  {
    name: "maxUploadSize",
    label: "Max Upload Size (MB)",
    type: "number",
    required: true,
    placeholder: "10",
    description: "Maximum file upload size in megabytes",
  },
]

export function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const api = useAdminApi()

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const response = await api.get("/settings")
      if (response.success) {
        setSettings(response.data)
      }
    } catch (error) {
      console.error("Failed to load settings:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveGeneralSettings = async (data: Record<string, any>) => {
    try {
      const response = await api.put("/settings", data)
      if (response.success) {
        setSettings((prev) => ({ ...prev!, ...data }))
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 3000)
      }
    } catch (error) {
      console.error("Failed to save settings:", error)
    }
  }

  const handleSaveSystemSettings = async (data: Record<string, any>) => {
    try {
      const response = await api.put("/settings", data)
      if (response.success) {
        setSettings((prev) => ({ ...prev!, ...data }))
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 3000)
      }
    } catch (error) {
      console.error("Failed to save settings:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <RoleGuard permissions={["settings.read"]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Configure your application settings and preferences</p>
        </div>

        {saveSuccess && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Settings saved successfully!</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic application configuration and user defaults</CardDescription>
            </CardHeader>
            <CardContent>
              <RoleGuard permissions={["settings.update"]}>
                {settings && (
                  <FormGenerator
                    fields={generalSettingsFields}
                    initialData={settings}
                    onSubmit={handleSaveGeneralSettings}
                    submitLabel="Save General Settings"
                    layout="grid"
                    columns={2}
                  />
                )}
              </RoleGuard>
            </CardContent>
          </Card>

          <Separator />

          {/* System Settings */}
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Advanced system configuration and maintenance options</CardDescription>
            </CardHeader>
            <CardContent>
              <RoleGuard permissions={["settings.update"]}>
                {settings && (
                  <FormGenerator
                    fields={systemSettingsFields}
                    initialData={settings}
                    onSubmit={handleSaveSystemSettings}
                    submitLabel="Save System Settings"
                    layout="grid"
                    columns={2}
                  />
                )}
              </RoleGuard>
            </CardContent>
          </Card>
        </div>
      </div>
    </RoleGuard>
  )
}
