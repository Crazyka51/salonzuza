"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
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
  LogOut,
  Bell,
  Search,
  User,
} from "lucide-react"
import { useAdmin } from "../context/AdminProvider"
import { useAuth } from "../auth/AuthProvider"

interface AdminLayoutProps {
  children: React.ReactNode
  className?: string
}

export function AdminLayout({ children, className }: AdminLayoutProps) {
  const { state, dispatch, hasPermission } = useAdmin()
  const { user, logout } = useAuth()

  return (
    <div className={`min-h-screen bg-background relative ${className}`}>
      
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-gray-900 text-white">
        <div className="flex h-14 sm:h-16 items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6">
          {/* Title */}
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-white">{state.config.title}</h1>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="flex-1 max-w-xs sm:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Vyhledávání..."
                  className="w-full pl-10 pr-4 py-1.5 sm:py-2 text-sm border border-gray-600 rounded-md bg-gray-800 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* User Info and Actions */}
            {user && (
              <div className="flex items-center gap-3">
                {/* User Avatar and Info */}
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || "/zajac.jpg"} />
                    <AvatarFallback className="bg-gray-700 text-white">{user.name?.charAt(0) || user.email.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-white">{user.name || user.email}</p>
                    <Badge variant="secondary" className="text-xs bg-gray-700 text-white border-gray-600">
                      {user.role}
                    </Badge>
                  </div>
                </div>

                {/* Logout Button */}
                <Button variant="ghost" size="sm" onClick={logout} className="text-white hover:bg-gray-800 border-gray-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Odhlásit se
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 p-3 sm:p-4 lg:p-6">{children}</main>
    </div>
  )
}
