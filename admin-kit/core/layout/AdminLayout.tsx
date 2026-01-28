"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Menu,
  Home,
  Users,
  FileText,
  Settings,
  LogOut,
  Bell,
  Search,
  Moon,
  Sun,
  Monitor,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { useAdmin } from "../context/AdminProvider"
import { useAuth } from "../auth/AuthProvider"
import type { NavigationItem } from "../types"

interface AdminLayoutProps {
  children: React.ReactNode
  navigation?: NavigationItem[]
  className?: string
}

const defaultNavigation: NavigationItem[] = [
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
]

const iconMap = {
  Home,
  Users,
  FileText,
  Settings,
  Bell,
  Search,
  Menu,
  LogOut,
  Moon,
  Sun,
  Monitor,
  ChevronDown,
  ChevronRight,
}

export function AdminLayout({ children, navigation = defaultNavigation, className }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const { state, dispatch, hasPermission } = useAdmin()
  const { user, logout } = useAuth()

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedItems(newExpanded)
  }

  const handleThemeChange = (theme: "light" | "dark" | "system") => {
    dispatch({ type: "SET_THEME", payload: theme })
    // Apply theme to document
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else if (theme === "light") {
      root.classList.remove("dark")
    } else {
      // System theme
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      if (prefersDark) {
        root.classList.add("dark")
      } else {
        root.classList.remove("dark")
      }
    }
  }

  const renderNavigationItem = (item: NavigationItem, level = 0) => {
    const IconComponent = iconMap[item.icon as keyof typeof iconMap]
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.has(item.id)

    // Check permissions
    if (item.permission && !hasPermission(item.permission)) {
      return null
    }

    return (
      <div key={item.id}>
        <Button
          variant="ghost"
          className={`w-full justify-start h-auto p-3 ${level > 0 ? "ml-4" : ""}`}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id)
            } else {
              // Navigate to href
              window.location.href = item.href
            }
          }}
        >
          <div className="flex items-center gap-3 w-full">
            {IconComponent && <IconComponent className="h-4 w-4" />}
            <span className="flex-1 text-left">{item.label}</span>
            {hasChildren && (
              <div className="ml-auto">
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </div>
            )}
          </div>
        </Button>
        {hasChildren && isExpanded && (
          <div className="ml-4 mt-1 space-y-1">
            {item.children!.map((child) => renderNavigationItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo/Brand */}
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold">{state.config.title}</h2>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-2">{navigation.map((item) => renderNavigationItem(item))}</div>
      </ScrollArea>

      {/* User Info */}
      {user && (
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar || "/placeholder.svg"} />
              <AvatarFallback>{user.name?.charAt(0) || user.email.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name || user.email}</p>
              <Badge variant="outline" className="text-xs">
                {user.role}
              </Badge>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-80">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Layout */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-80 lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:bg-card">
          <SidebarContent />
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-80">
          {/* Header */}
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center gap-4 px-6">
              {/* Mobile Menu Button */}
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>

              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-2">
                {/* Notifications */}
                <Button variant="ghost" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>

                {/* Theme Selector */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      {state.theme === "light" && <Sun className="h-4 w-4" />}
                      {state.theme === "dark" && <Moon className="h-4 w-4" />}
                      {state.theme === "system" && <Monitor className="h-4 w-4" />}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleThemeChange("light")}>
                      <Sun className="h-4 w-4 mr-2" />
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
                      <Moon className="h-4 w-4 mr-2" />
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleThemeChange("system")}>
                      <Monitor className="h-4 w-4 mr-2" />
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                {user && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{user.name?.charAt(0) || user.email.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user.name || "User"}</p>
                          <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => (window.location.href = "/admin/profile")}>
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => (window.location.href = "/admin/settings")}>
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
