'use client';

import { useAdminRouter } from '../routing/AdminRouter';
import { SalonDashboard } from '../../ui/Dashboard/SalonDashboard';
import { AnalyticsWidget } from '../../modules/analytics/AnalyticsWidget';

export function AdminDashboardRouter() {
  const { currentView, viewData, navigate } = useAdminRouter();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
      default:
        return <SalonDashboard />;

      case 'analytics':
      case 'statistiky':
        return (
          <div className="container mx-auto py-8">
            <AnalyticsWidget />
          </div>
        );
    }
  };

  return <div className="flex-1 overflow-auto">{renderView()}</div>;
}
