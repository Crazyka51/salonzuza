"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { 
  Users, FileText, Settings, TrendingUp, TrendingDown, Activity, Calendar, Bell,
  Folder, Image, MessageSquare, Eye, Mail, Database, Shield, Clock, BarChart3,
  FileCode, Package, Zap, HardDrive, Globe, CheckCircle2, AlertCircle, XCircle
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"

interface DashboardProps {
  title?: string
  widgets?: DashboardWidget[]
  quickActions?: QuickAction[]
  recentActivity?: ActivityItem[]
  systemHealth?: SystemHealthItem[]
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
  link?: string
}

interface QuickAction {
  id: string
  title: string
  description?: string
  icon?: React.ComponentType<{ className?: string }>
  onClick: () => void
  permission?: string
  badge?: string
}

interface ActivityItem {
  id: string
  title: string
  description?: string
  timestamp: string
  type?: "info" | "success" | "warning" | "error"
  user?: string
  icon?: React.ComponentType<{ className?: string }>
}

interface SystemHealthItem {
  id: string
  name: string
  status: "healthy" | "warning" | "error"
  value: number
  description: string
}

// Data pro grafy
const visitorsChartData = [
  { name: "Lis", value: 1420, previous: 1200 },
  { name: "Pro", value: 1680, previous: 1400 },
  { name: "Úno", value: 1890, previous: 1650 },
  { name: "Bře", value: 2100, previous: 1800 },
  { name: "Dub", value: 2340, previous: 2000 },
  { name: "Kvě", value: 2180, previous: 2200 },
  { name: "Čer", value: 2450, previous: 2100 },
  { name: "Čvc", value: 2280, previous: 2300 },
  { name: "Srp", value: 2390, previous: 2250 },
  { name: "Zář", value: 2520, previous: 2400 },
  { name: "Říj", value: 2180, previous: 2100 },
  { name: "Lis", value: 2350, previous: 2200 },
]

const pageViewsData = [
  { name: "Po", views: 4200 },
  { name: "Út", views: 3800 },
  { name: "St", views: 5100 },
  { name: "Čt", views: 4600 },
  { name: "Pá", views: 3900 },
  { name: "So", views: 2800 },
  { name: "Ne", views: 3200 },
]

const articlesPerformanceData = [
  { name: "Leden", published: 12, draft: 8, views: 8500 },
  { name: "Únor", published: 15, draft: 6, views: 9200 },
  { name: "Březen", published: 18, draft: 10, views: 11300 },
  { name: "Duben", published: 14, draft: 7, views: 9800 },
  { name: "Květen", published: 20, draft: 12, views: 13500 },
  { name: "Červen", published: 16, draft: 9, views: 10200 },
]

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
    color: "primary",
    link: "/admin/articles"
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
    color: "success",
    link: "/admin/analytics"
  },
  {
    id: "media",
    title: "Mediální soubory",
    value: 234,
    description: "1.2 GB celkem",
    icon: Image,
    color: "secondary",
    link: "/admin/media"
  },
  {
    id: "newsletter",
    title: "Odběratelé newsletteru",
    value: "1,543",
    description: "24.5% míra otevření",
    icon: Mail,
    trend: {
      value: 2.1,
      direction: "down",
      period: "tento měsíc"
    },
    color: "warning",
    link: "/admin/newsletter"
  },
  {
    id: "categories",
    title: "Kategorie",
    value: 12,
    description: "8 aktivních",
    icon: Folder,
    color: "default",
    link: "/admin/categories"
  },
  {
    id: "comments",
    title: "Komentáře",
    value: 156,
    description: "23 čeká na schválení",
    icon: MessageSquare,
    trend: {
      value: 15.2,
      direction: "up",
      period: "tento týden"
    },
    color: "primary",
    link: "/admin/comments"
  },
  {
    id: "pageviews",
    title: "Zobrazení stránek",
    value: "45.2K",
    description: "Tento měsíc",
    icon: Eye,
    trend: {
      value: 18.7,
      direction: "up",
      period: "oproti minulému měsíci"
    },
    color: "success",
    link: "/admin/analytics"
  },
  {
    id: "storage",
    title: "Využití úložiště",
    value: "67%",
    description: "3.2 GB z 5 GB",
    icon: HardDrive,
    color: "warning",
    link: "/admin/settings/storage"
  },
]

const defaultQuickActions: QuickAction[] = [
  {
    id: "new-article",
    title: "Nový článek",
    description: "Vytvořit nový příspěvek",
    icon: FileText,
    onClick: () => console.log("Nový článek"),
    badge: "⌘N"
  },
  {
    id: "add-user",
    title: "Přidat uživatele",
    description: "Vytvořit nový uživatelský účet",
    icon: Users,
    onClick: () => console.log("Přidat uživatele"),
  },
  {
    id: "upload-media",
    title: "Nahrát média",
    description: "Nahrát obrázky nebo soubory",
    icon: Image,
    onClick: () => console.log("Nahrát média"),
    badge: "⌘U"
  },
  {
    id: "create-category",
    title: "Nová kategorie",
    description: "Přidat kategorii obsahu",
    icon: Folder,
    onClick: () => console.log("Nová kategorie"),
  },
  {
    id: "backup",
    title: "Záloha databáze",
    description: "Vytvořit záložní kopii",
    icon: Database,
    onClick: () => console.log("Záloha"),
  },
  {
    id: "system-settings",
    title: "Nastavení systému",
    description: "Konfigurace systému",
    icon: Settings,
    onClick: () => console.log("Nastavení systému"),
  },
]

const defaultActivity: ActivityItem[] = [
  {
    id: "1",
    title: "Nový uživatel zaregistrován",
    description: "jan.novak@example.com se připojil k platformě",
    timestamp: "před 2 minutami",
    type: "success",
    user: "Systém",
    icon: Users,
  },
  {
    id: "2",
    title: "Článek publikován",
    description: "Začínáme s Next.js 14",
    timestamp: "před 15 minutami",
    type: "info",
    user: "Admin",
    icon: FileText,
  },
  {
    id: "3",
    title: "Záloha dokončena",
    description: "Denní záloha úspěšně dokončena",
    timestamp: "před 1 hodinou",
    type: "success",
    user: "Systém",
    icon: Database,
  },
  {
    id: "4",
    title: "Neúspěšný pokus o přihlášení",
    description: "Více neúspěšných pokusů z IP 192.168.1.100",
    timestamp: "před 2 hodinami",
    type: "warning",
    user: "Bezpečnost",
    icon: Shield,
  },
  {
    id: "5",
    title: "Nový komentář",
    description: "Komentář čeká na schválení",
    timestamp: "před 3 hodinami",
    type: "info",
    user: "Návštěvník",
    icon: MessageSquare,
  },
]

const defaultSystemHealth: SystemHealthItem[] = [
  {
    id: "database",
    name: "Databáze",
    status: "healthy",
    value: 95,
    description: "Výkon databáze je optimální"
  },
  {
    id: "storage",
    name: "Úložiště",
    status: "warning",
    value: 67,
    description: "67% kapacity využito"
  },
  {
    id: "api",
    name: "API",
    status: "healthy",
    value: 99,
    description: "Všechny API služby funkční"
  },
  {
    id: "cache",
    name: "Cache",
    status: "healthy",
    value: 88,
    description: "Cache funguje správně"
  },
]

export function Dashboard({
  title = "Přehled",
  widgets = defaultWidgets,
  quickActions = defaultQuickActions,
  recentActivity = defaultActivity,
  systemHealth = defaultSystemHealth,
  className,
}: DashboardProps) {
  const getWidgetColorClasses = (color: DashboardWidget["color"]) => {
    return "border-border bg-card hover:border-accent transition-all duration-300 shadow-sm"
  }

  const getActivityTypeColor = (type: ActivityItem["type"]) => {
    switch (type) {
      case "success":
        return "bg-[oklch(0.60_0.12_160)]"
      case "warning":
        return "bg-[oklch(0.65_0.12_70)]"
      case "error":
        return "bg-[oklch(0.50_0.18_25)]"
      default:
        return "bg-[oklch(0.55_0.15_264)]"
    }
  }

  const getSystemHealthColor = (status: SystemHealthItem["status"]) => {
    switch (status) {
      case "healthy":
        return "text-[oklch(0.60_0.12_160)]"
      case "warning":
        return "text-[oklch(0.65_0.12_70)]"
      case "error":
        return "text-[oklch(0.50_0.18_25)]"
      default:
        return "text-muted-foreground"
    }
  }

  const getSystemHealthIcon = (status: SystemHealthItem["status"]) => {
    switch (status) {
      case "healthy":
        return CheckCircle2
      case "warning":
        return AlertCircle
      case "error":
        return XCircle
      default:
        return Activity
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">Vítejte zpět! Zde je přehled aktivit.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Dnes
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analýzy
          </Button>
        </div>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {widgets.map((widget) => {
          const IconComponent = widget.icon
          return (
            <Card 
              key={widget.id} 
              className={`cursor-pointer ${getWidgetColorClasses(widget.color)}`}
              onClick={() => widget.link && console.log(`Navigate to ${widget.link}`)}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{widget.title}</CardTitle>
                {IconComponent && <IconComponent className="h-4 w-4 text-muted-foreground" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{widget.value}</div>
                {widget.description && <p className="text-xs text-muted-foreground mt-1">{widget.description}</p>}
                {widget.trend && (
                  <div className="flex items-center pt-2">
                    {widget.trend.direction === "up" ? (
                      <TrendingUp className="h-3 w-3 text-[oklch(0.60_0.12_160)] mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-[oklch(0.50_0.18_25)] mr-1" />
                    )}
                    <span className={`text-xs font-medium ${widget.trend.direction === "up" ? "text-[oklch(0.60_0.12_160)]" : "text-[oklch(0.50_0.18_25)]"}`}>
                      {widget.trend.value}% {widget.trend.period}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitors Chart */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Users className="h-5 w-5 text-[oklch(0.55_0.15_264)]" />
              Návštěvníci - Měsíční přehled
            </CardTitle>
            <CardDescription>Porovnání aktuálního a předchozího období</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={visitorsChartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.55 0.15 264)" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="oklch(0.55 0.15 264)" stopOpacity={0.05}/>
                  </linearGradient>
                  <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.52 0.18 300)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="oklch(0.52 0.18 300)" stopOpacity={0.02}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.24 0.01 250)" opacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  stroke="oklch(0.45 0 0)"
                  tick={{ fill: 'oklch(0.55 0 0)', fontSize: 12 }}
                />
                <YAxis 
                  stroke="oklch(0.45 0 0)"
                  tick={{ fill: 'oklch(0.55 0 0)', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'oklch(0.18 0.01 250)', 
                    border: '1px solid oklch(0.24 0.01 250)',
                    borderRadius: '8px',
                    color: 'oklch(0.85 0 0)'
                  }}
                  labelStyle={{ color: 'oklch(0.85 0 0)' }}
                />
                <Legend 
                  wrapperStyle={{ color: 'oklch(0.70 0 0)' }}
                  formatter={(value) => value === 'value' ? 'Aktuální' : 'Předchozí'}
                />
                <Area 
                  type="monotone" 
                  dataKey="previous" 
                  stroke="oklch(0.52 0.18 300)" 
                  fillOpacity={1}
                  fill="url(#colorPrevious)"
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="oklch(0.55 0.15 264)" 
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Page Views Chart */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Eye className="h-5 w-5 text-[oklch(0.60_0.12_160)]" />
              Zobrazení stránek - Tento týden
            </CardTitle>
            <CardDescription>Denní statistika návštěvnosti</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pageViewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.24 0.01 250)" opacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  stroke="oklch(0.45 0 0)"
                  tick={{ fill: 'oklch(0.55 0 0)', fontSize: 12 }}
                />
                <YAxis 
                  stroke="oklch(0.45 0 0)"
                  tick={{ fill: 'oklch(0.55 0 0)', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'oklch(0.18 0.01 250)', 
                    border: '1px solid oklch(0.24 0.01 250)',
                    borderRadius: '8px',
                    color: 'oklch(0.85 0 0)'
                  }}
                  labelStyle={{ color: 'oklch(0.85 0 0)' }}
                  formatter={(value) => [`${value} zobrazení`, 'Návštěvy']}
                />
                <Bar 
                  dataKey="views" 
                  fill="oklch(0.60 0.12 160)"
                  radius={[8, 8, 0, 0]}
                  animationDuration={1000}
                  activeBar={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Articles Performance Chart */}
      <Card className="bg-card border-border shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <FileText className="h-5 w-5 text-[oklch(0.52_0.18_300)]" />
            Výkon článků - 6 měsíců
          </CardTitle>
          <CardDescription>Publikované, koncepty a zobrazení</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={articlesPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.24 0.01 250)" opacity={0.3} />
              <XAxis 
                dataKey="name" 
                stroke="oklch(0.45 0 0)"
                tick={{ fill: 'oklch(0.55 0 0)', fontSize: 12 }}
              />
              <YAxis 
                yAxisId="left"
                stroke="oklch(0.45 0 0)"
                tick={{ fill: 'oklch(0.55 0 0)', fontSize: 12 }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="oklch(0.45 0 0)"
                tick={{ fill: 'oklch(0.55 0 0)', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'oklch(0.18 0.01 250)', 
                  border: '1px solid oklch(0.24 0.01 250)',
                  borderRadius: '8px',
                  color: 'oklch(0.85 0 0)'
                }}
                labelStyle={{ color: 'oklch(0.85 0 0)' }}
              />
              <Legend wrapperStyle={{ color: 'oklch(0.70 0 0)' }} />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="published" 
                stroke="oklch(0.55 0.15 264)" 
                strokeWidth={2}
                dot={{ fill: 'oklch(0.55 0.15 264)', r: 4 }}
                name="Publikováno"
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="draft" 
                stroke="oklch(0.50 0.18 25)" 
                strokeWidth={2}
                dot={{ fill: 'oklch(0.50 0.18 25)', r: 4 }}
                name="Koncepty"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="views" 
                stroke="oklch(0.60 0.12 160)" 
                strokeWidth={2}
                dot={{ fill: 'oklch(0.60 0.12 160)', r: 4 }}
                name="Zobrazení"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* System Health */}
      <Card className="bg-card border-border shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Activity className="h-5 w-5 text-[oklch(0.55_0.15_264)]" />
            Stav systému
          </CardTitle>
          <CardDescription>Monitorování výkonu a dostupnosti služeb</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {systemHealth.map((item) => {
              const StatusIcon = getSystemHealthIcon(item.status)
              const progressColorClass = item.status === "healthy" 
                ? "[&>div]:bg-[oklch(0.60_0.12_160)]" 
                : item.status === "warning" 
                ? "[&>div]:bg-[oklch(0.65_0.12_70)]" 
                : "[&>div]:bg-[oklch(0.50_0.18_25)]"
              
              return (
                <div key={item.id} className="space-y-2 p-4 rounded-lg bg-secondary border border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <StatusIcon className={`h-4 w-4 ${getSystemHealthColor(item.status)}`} />
                      {item.name}
                    </span>
                    <span className={`text-sm font-bold ${getSystemHealthColor(item.status)}`}>
                      {item.value}%
                    </span>
                  </div>
                  <Progress value={item.value} className={`h-2 bg-muted ${progressColorClass}`} />
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-card border-border shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Clock className="h-5 w-5 text-[oklch(0.55_0.15_264)]" />
            Nedávná aktivita
          </CardTitle>
          <CardDescription>Poslední systémové události a akce uživatelů</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((item, index) => {
              const ActivityIcon = item.icon
              return (
                <div key={item.id}>
                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full mt-2 ${getActivityTypeColor(item.type)} shadow-[0_0_6px_currentColor]`} />
                      {ActivityIcon && (
                        <div className="p-2 rounded-md bg-secondary">
                          <ActivityIcon className="h-3 w-3 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium">{item.title}</p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{item.timestamp}</span>
                      </div>
                      {item.description && (
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      )}
                      {item.user && (
                        <Badge variant="outline" className="mt-2 text-xs">
                          {item.user}
                        </Badge>
                      )}
                    </div>
                  </div>
                  {index < recentActivity.length - 1 && <Separator className="mt-4 bg-gray-200" />}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
