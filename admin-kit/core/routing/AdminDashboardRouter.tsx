'use client';

import { useAdminRouter } from '../routing/AdminRouter';
import { SalonDashboard } from '../../ui/Dashboard/SalonDashboard';
import { AnalyticsWidget } from '../../modules/analytics/AnalyticsWidget';
import { PageContentEditor } from '../../modules/content/PageContentEditor';

export function AdminDashboardRouter() {
  const { currentView, viewData, navigate } = useAdminRouter();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <SalonDashboard />;

      case 'content':
      case 'editor-obsahu':
        return <PageContentEditor />;

      case 'analytics':
      case 'statistiky':
        return (
          <div className="container mx-auto py-8">
            <AnalyticsWidget />
          </div>
        );

      default:
        return <SalonDashboard />;
    }
  };

  return <div className="flex-1 overflow-auto">{renderView()}</div>;
}
