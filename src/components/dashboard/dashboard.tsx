import { Layout } from '../ui-layout/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Overview } from './overview';
import { RecentCustomers } from './recent-customers';
import { UpcomingAppointments } from './upcoming-appointments';
import { StatsCards } from './stats-cards';
import { AnalyticsTab } from './analytics-tab';
import { ReportsTab } from './reports-tab';
import { NotificationsTab } from './notifications-tab';
import { EnhancedTechnicians } from './enhanced-technicians';
import { EnhancedCustomers } from './enhanced-customers';

export function Dashboard() {
  return (
    <Layout>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="technicians">Technicians</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <StatsCards />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-4 space-y-4">
              <div className="grid gap-4">
                <div className="bg-card rounded-lg border p-6">
                  <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
                  <Overview />
                </div>
              </div>
            </div>
            <div className="col-span-3 space-y-4">
              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Customers</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You have 6 active customer projects
                </p>
                <RecentCustomers />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Upcoming Appointments</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You have 8 appointments scheduled
            </p>
            <UpcomingAppointments />
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsTab />
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <ReportsTab />
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <NotificationsTab />
        </TabsContent>
        
        <TabsContent value="technicians" className="space-y-4">
          <EnhancedTechnicians />
        </TabsContent>
        
        <TabsContent value="customers" className="space-y-4">
          <EnhancedCustomers />
        </TabsContent>
      </Tabs>
    </Layout>
  );
}