import { Layout } from '../ui-layout/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Overview } from './overview';
import { RecentLeads } from './recent-leads';
import { UpcomingAppointments } from './upcoming-appointments';
import { StatsCards } from './stats-cards';
import { AnalyticsTab } from './analytics-tab';
import { ReportsTab } from './reports-tab';
import { NotificationsTab } from './notifications-tab';
import { EnhancedTechnicians } from './enhanced-technicians';
import { EnhancedCustomers } from './enhanced-customers';
import { appointments, newLeadCount, upcomingAppointments } from '@/data/demo';

export function Dashboard() {
  return (
    <Layout>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-teal-300">Floor overview</p>
          <h2 className="page-title">Dashboard</h2>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <div className="overflow-x-auto pb-1">
        <TabsList className="h-auto w-max min-w-full justify-start bg-slate-950/60">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="technicians">Technicians</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>
        </div>
        
        <TabsContent value="overview" className="space-y-4">
          <StatsCards />
          <div className="grid gap-4 lg:grid-cols-7">
            <div className="min-w-0 space-y-4 lg:col-span-4">
              <div className="grid gap-4">
                <div className="console-panel rounded-lg border border-cyan-400/20 bg-card/80 p-6 backdrop-blur-md">
                  <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
                  <Overview />
                </div>
              </div>
            </div>
            <div className="min-w-0 space-y-4 lg:col-span-3">
              <div className="console-panel rounded-lg border border-cyan-400/20 bg-card/80 p-6 backdrop-blur-md">
                <h3 className="text-lg font-semibold mb-4">Recent Leads</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {newLeadCount} new leads in the current list
                </p>
                <RecentLeads />
              </div>
            </div>
          </div>
          <div className="console-panel rounded-lg border border-cyan-400/20 bg-card/80 p-6 backdrop-blur-md">
            <h3 className="text-lg font-semibold mb-4">Upcoming Appointments</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {upcomingAppointments.length} upcoming of {appointments.length} jobs this week
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