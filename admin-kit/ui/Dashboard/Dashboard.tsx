"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Users, FileText, Settings, TrendingUp, TrendingDown, Activity, Calendar, Bell } from "lucide-react"

interface DashboardProps {
  title?: string
  widgets?: DashboardWidget[]
  quickActions?: QuickAction[]
  recentActivity?: ActivityItem[]
  className?: string
}

interface DashboardWidget {
  id: string
  title: string
  value: string | number
  description?: string
  icon?: React.ComponentType<{ className?: string }>
  trend?: {
    value: number
    direction: "up" | "down"
    period: string
  }
  color?: "default" | "primary" | "secondary" | "destructive" | "success" | "warning"
}

interface QuickAction {
  id: string
  title: string
  description?: string
  icon?: React.ComponentType<{ className?: string }>
  onClick: () => void
  permission?: string
}

interface ActivityItem {
  id: string
  title: string
  description?: string
  timestamp: string
  type?: "info" | "success" | "warning" | "error"
  user?: string
}

const defaultWidgets: DashboardWidget[] = [
  {
    id: "articles",
    title: "Články",
    value: 45,
    description: "32 publikováno, 13 konceptů",
    icon: FileText,
    trend: {
      value: 12.5,
      direction: "up",
      period: "tento měsíc"
    },
    color: "primary"
  },
  {
    id: "visitors",
    title: "Návštěvníci dnes",
    value: "1,247",
    description: "2,156 tento týden",
    icon: Users,
    trend: {
      value: 8.3,
      direction: "up",
      period: "oproti včerejšku"
    },
    color: "success"
  },
  {
    id: "media",
    title: "Média",
    value: 234,
    description: "1.2 GB celkem",
    icon: Activity,
    color: "secondary"
  },
  {
    id: "newsletter",
    title: "Newsletter",
    value: "1,543",
    description: "24.5% open rate",
    icon: Bell,
    trend: {
      value: 2.1,
      direction: "down",
      period: "tento měsíc"
    },
    color: "warning"
  }
  {
    id: "users",
    title: "Total Users",
    value: "1,234",
    description: "Active users",
    icon: Users,
    trend: { value: 12, direction: "up", period: "from last month" },
    color: "primary",
  },
  {
    id: "posts",
    title: "Posts",
    value: "856",
    description: "Published posts",
    icon: FileText,
    trend: { value: 5, direction: "up", period: "from last week" },
    color: "secondary",
  },
  {
    id: "activity",
    title: "Activity",
    value: "98%",
    description: "System uptime",
    icon: Activity,
    color: "success",
  },
  {
    id: "settings",
    title: "Settings",
    value: "12",
    description: "Pending updates",
    icon: Settings,
    color: "warning",
  },
]

const defaultQuickActions: QuickAction[] = [
  {
    id: "add-user",
    title: "Add User",
    description: "Create a new user account",
    icon: Users,
    onClick: () => console.log("Add user"),
  },
  {
    id: "create-post",
    title: "Create Post",
    description: "Write a new blog post",
    icon: FileText,
    onClick: () => console.log("Create post"),
  },
  {
    id: "system-settings",
    title: "System Settings",
    description: "Configure system preferences",
    icon: Settings,
    onClick: () => console.log("System settings"),
  },
]

const defaultActivity: ActivityItem[] = [
  {
    id: "1",
    title: "New user registered",
    description: "john.doe@example.com joined the platform",
    timestamp: "2 minutes ago",
    type: "success",
    user: "System",
  },
  {
    id: "2",
    title: "Post published",
    description: "Getting Started with Next.js",
    timestamp: "15 minutes ago",
    type: "info",
    user: "Admin",
  },
  {
    id: "3",
    title: "System backup completed",
    description: "Daily backup finished successfully",
    timestamp: "1 hour ago",
    type: "success",
    user: "System",
  },
  {
    id: "4",
    title: "Failed login attempt",
    description: "Multiple failed attempts from IP 192.168.1.100",
    timestamp: "2 hours ago",
    type: "warning",
    user: "Security",
  },
]

export function Dashboard({
  title = "Dashboard",
  widgets = defaultWidgets,
  quickActions = defaultQuickActions,
  recentActivity = defaultActivity,
  className,
}: DashboardProps) {
  const getWidgetColorClasses = (color: DashboardWidget["color"]) => {
    switch (color) {
      case "primary":
        return "border-primary/20 bg-primary/5"
      case "secondary":
        return "border-secondary/20 bg-secondary/5"
      case "destructive":
        return "border-destructive/20 bg-destructive/5"
      case "success":
        return "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
      case "warning":
        return "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950"
      default:
        return ""
    }
  }

  const getActivityTypeColor = (type: ActivityItem["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Today
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {widgets.map((widget) => {
          const IconComponent = widget.icon
          return (
            <Card key={widget.id} className={getWidgetColorClasses(widget.color)}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{widget.title}</CardTitle>
                {IconComponent && <IconComponent className="h-4 w-4 text-muted-foreground" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{widget.value}</div>
                {widget.description && <p className="text-xs text-muted-foreground">{widget.description}</p>}
                {widget.trend && (
                  <div className="flex items-center pt-1">
                    {widget.trend.direction === "up" ? (
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    <span className={`text-xs ${widget.trend.direction === "up" ? "text-green-600" : "text-red-600"}`}>
                      {widget.trend.value}% {widget.trend.period}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action) => {
              const IconComponent = action.icon
              return (
                <Button
                  key={action.id}
                  variant="ghost"
                  className="w-full justify-start h-auto p-3"
                  onClick={action.onClick}
                >
                  <div className="flex items-start gap-3">
                    {IconComponent && (
                      <div className="p-2 rounded-md bg-primary/10">
                        <IconComponent className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div className="text-left">
                      <div className="font-medium">{action.title}</div>
                      {action.description && <div className="text-sm text-muted-foreground">{action.description}</div>}
                    </div>
                  </div>
                </Button>
              )
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events and user actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item, index) => (
                <div key={item.id}>
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${getActivityTypeColor(item.type)}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{item.title}</p>
                        <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                      </div>
                      {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
                      {item.user && (
                        <Badge variant="outline" className="mt-1 text-xs">
                          {item.user}
                        </Badge>
                      )}
                    </div>
                  </div>
                  {index < recentActivity.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
