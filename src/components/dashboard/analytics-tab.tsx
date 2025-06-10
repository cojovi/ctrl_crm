import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Clock, Star, DollarSign, CheckCircle } from 'lucide-react';

const metricsData = [
  { name: 'Jan', serviceCalls: 198, responseTime: 28, satisfaction: 4.6, revenue: 45280, completionRate: 92 },
  { name: 'Feb', serviceCalls: 215, responseTime: 31, satisfaction: 4.7, revenue: 48560, completionRate: 91 },
  { name: 'Mar', serviceCalls: 234, responseTime: 35, satisfaction: 4.5, revenue: 51200, completionRate: 89 },
  { name: 'Apr', serviceCalls: 221, responseTime: 29, satisfaction: 4.8, revenue: 49840, completionRate: 95 },
  { name: 'May', serviceCalls: 267, responseTime: 33, satisfaction: 4.7, revenue: 58920, completionRate: 93 },
  { name: 'Jun', serviceCalls: 247, responseTime: 32, satisfaction: 4.8, revenue: 52680, completionRate: 94 },
];

const serviceTypeData = [
  { name: 'Garage Door Installation', value: 35, revenue: 18500 },
  { name: 'Repair Services', value: 28, revenue: 12600 },
  { name: 'Maintenance', value: 22, revenue: 8900 },
  { name: 'Emergency Services', value: 15, revenue: 12680 },
];

const COLORS = ['#14b8a6', '#f59e0b', '#8b5cf6', '#ef4444'];

export function AnalyticsTab() {
  const currentMonth = metricsData[metricsData.length - 1];
  const previousMonth = metricsData[metricsData.length - 2];

  const calculateChange = (current: number, previous: number) => {
    return ((current - previous) / previous * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Total Service Calls"
          value="247"
          change={calculateChange(currentMonth.serviceCalls, previousMonth.serviceCalls)}
          icon={<CheckCircle className="h-4 w-4" />}
          trend="up"
        />
        <MetricCard
          title="Avg Response Time"
          value="32 min"
          change={calculateChange(currentMonth.responseTime, previousMonth.responseTime)}
          icon={<Clock className="h-4 w-4" />}
          trend="down"
        />
        <MetricCard
          title="Customer Satisfaction"
          value="4.8/5"
          change={calculateChange(currentMonth.satisfaction, previousMonth.satisfaction)}
          icon={<Star className="h-4 w-4" />}
          trend="up"
        />
        <MetricCard
          title="Monthly Revenue"
          value="$52,680"
          change={calculateChange(currentMonth.revenue, previousMonth.revenue)}
          icon={<DollarSign className="h-4 w-4" />}
          trend="up"
        />
        <MetricCard
          title="Service Completion Rate"
          value="94%"
          change={calculateChange(currentMonth.completionRate, previousMonth.completionRate)}
          icon={<CheckCircle className="h-4 w-4" />}
          trend="up"
        />
        <MetricCard
          title="Active Technicians"
          value="5"
          change="0"
          icon={<CheckCircle className="h-4 w-4" />}
          trend="stable"
        />
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Performance Trends</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="services">Service Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Service Calls & Completion Rate</CardTitle>
                <CardDescription>6-month trend analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={metricsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="serviceCalls" fill="#14b8a6" name="Service Calls" />
                    <Line yAxisId="right" type="monotone" dataKey="completionRate" stroke="#f59e0b" strokeWidth={3} name="Completion Rate %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Time & Satisfaction</CardTitle>
                <CardDescription>Customer experience metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={metricsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="responseTime" stroke="#ef4444" strokeWidth={3} name="Response Time (min)" />
                    <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke="#8b5cf6" strokeWidth={3} name="Satisfaction (1-5)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={metricsData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                  <Area type="monotone" dataKey="revenue" stroke="#14b8a6" fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Service Distribution</CardTitle>
                <CardDescription>Breakdown by service type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={serviceTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {serviceTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Service Type</CardTitle>
                <CardDescription>Monthly revenue breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={serviceTypeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                    <Bar dataKey="revenue" fill="#14b8a6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'stable';
}

function MetricCard({ title, value, change, icon, trend }: MetricCardProps) {
  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-500" />;
    return null;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== '0' && (
          <div className={`flex items-center text-xs ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="ml-1">
              {Math.abs(parseFloat(change))}% from last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}