'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  FileText,
  BarChart3,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  Eye,
  TrendingUp,
  Edit,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useAdminRouter } from '@/admin-kit/core/routing/AdminRouter';
import AnalyticsWidget from '../../../adminfunctions/admin/components/AnalyticsWidget';
import { BookingWidget } from '../../../adminfunctions/admin/components/BookingWidget';
import { PageContentEditor } from '../../modules/content/PageContentEditor';

interface QuickAction {
  label: string;
  view: any;
  icon: any;
  color: string;
}

interface StatCard {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
  icon: any;
  color: string;
}

interface RecentActivity {
  id: string;
  type: string;
  title: string;
  time: string;
  user: string;
}

// Chart data for salon statistics
const visitorsChartData = [
  { name: 'Po', value: 45, bookings: 8 },
  { name: 'Út', value: 52, bookings: 12 },
  { name: 'St', value: 38, bookings: 6 },
  { name: 'Čt', value: 67, bookings: 15 },
  { name: 'Pá', value: 89, bookings: 18 },
  { name: 'So', value: 124, bookings: 25 },
  { name: 'Ne', value: 32, bookings: 4 },
];

export function SalonDashboard() {
  const { navigate } = useAdminRouter();
  const [activeTab, setActiveTab] = useState('overview');

  const stats: StatCard[] = [
    {
      title: 'Návštěvy webu',
      value: '2.4k',
      change: '+12%',
      trend: 'up',
      icon: Eye,
      color: '#8b5cf6', // purple-500
    },
    {
      title: 'Rezervace tento týden',
      value: 88,
      change: '+23%',
      trend: 'up', 
      icon: Calendar,
      color: '#10b981', // emerald-500
    },
    {
      title: 'Potvrzené termíny',
      value: 76,
      change: '+8',
      trend: 'up',
      icon: CheckCircle,
      color: '#06b6d4', // cyan-500
    },
    {
      title: 'Průměrná doba na stránce',
      value: '3:42',
      change: '+18s',
      trend: 'up',
      icon: Clock,
      color: '#ec4899', // pink-500
    },
  ];

  const recentActivity: RecentActivity[] = [
    {
      id: '1',
      type: 'booking',
      title: 'Nová rezervace: Marie Nováková',
      time: 'před 15 minutami',
      user: 'Online',
    },
    {
      id: '2',
      type: 'content',
      title: 'Upraven obsah stránky služby',
      time: 'před 2 hodinami',
      user: 'Admin',
    },
    {
      id: '3', 
      type: 'booking',
      title: 'Potvrzena rezervace: Jana Svobodová',
      time: 'před 3 hodinami',
      user: 'Admin',
    },
    {
      id: '4',
      type: 'content',
      title: 'Aktualizován ceník služeb',
      time: 'před 1 dnem',
      user: 'Admin',
    },
    {
      id: '5',
      type: 'booking',
      title: 'Zrušena rezervace: Petra Novotná',
      time: 'před 2 dny',
      user: 'Admin',
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <Calendar className="h-4 w-4 text-blue-500 dark:text-blue-400" />;
      case 'content':
        return <Edit className="h-4 w-4 text-purple-500 dark:text-purple-400" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-[#B8A876]">Salon Zuza - Administrace</h1>
        <p className="text-muted-foreground mt-2">
          Administrační panel pro správu salonu krásy
        </p>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Přehled</TabsTrigger>
          <TabsTrigger value="content">Obsah</TabsTrigger>
          <TabsTrigger value="analytics">Statistiky</TabsTrigger>
          <TabsTrigger value="booking">Rezervace</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 gap-4">
            <Card
              className="cursor-pointer transition-all hover:shadow-lg border-l-4"
              style={{ borderLeftColor: '#B8A876' }}
              onClick={() => setActiveTab('content')}
            >
              <CardContent className="flex items-center p-6">
                <FileText 
                  className="h-8 w-8 mr-4" 
                  style={{ color: '#B8A876' }}
                />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Editor obsahu</h3>
                  <p className="text-sm text-muted-foreground">
                    Spravujte obsah stránek webu
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon 
                    className="h-4 w-4 text-muted-foreground" 
                    style={{ color: stat.color }}
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <div className="h-3 w-3" />
                    )}
                    <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                      {stat.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts and Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Website Traffic Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Návštěvnost webu a rezervace</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={visitorsChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#B8A876" 
                      strokeWidth={2}
                      name="Návštěvy"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="bookings" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      name="Rezervace"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Nedávná aktivita</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {activity.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time} • {activity.user}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Welcome Message */}
          <Card className="bg-gradient-to-r from-[#B8A876]/10 to-[#A39566]/10 border-[#B8A876]">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Users className="h-12 w-12 text-[#B8A876]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#B8A876]">
                    Vítejte v administraci Salon Zuza
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    Spravujte obsah webu a sledujte statistiky návštěvnosti. 
                    Využijte rychlé akce pro editaci obsahu nebo záložku Statistiky pro detailní analýzy.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Editor Tab */}
        <TabsContent value="content" className="mt-6">
          <PageContentEditor />
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="mt-6">
          <AnalyticsWidget />
        </TabsContent>

        {/* Booking System Tab */}
        <TabsContent value="booking" className="mt-6">
          <BookingWidget />
        </TabsContent>
      </Tabs>
    </div>
  );
}