import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Download, FileText, Users, DollarSign, Settings, Star } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const monthlyServiceSummary = {
  totalCalls: 247,
  completedCalls: 232,
  averageTime: 32,
  customerSatisfaction: 4.8,
  revenue: 52680,
  topServices: [
    { service: 'Garage Door Installation', count: 87, revenue: 18500 },
    { service: 'Repair Services', count: 69, revenue: 12600 },
    { service: 'Maintenance', count: 54, revenue: 8900 },
    { service: 'Emergency Services', count: 37, revenue: 12680 },
  ]
};

const technicianPerformance = [
  { 
    name: 'Alex Rodriguez', 
    callsCompleted: 52, 
    avgResponseTime: 28, 
    customerRating: 4.9, 
    revenue: 12450,
    efficiency: 96 
  },
  { 
    name: 'Carlos Mendez', 
    callsCompleted: 48, 
    avgResponseTime: 31, 
    customerRating: 4.8, 
    revenue: 11200,
    efficiency: 94 
  },
  { 
    name: 'Jessica Taylor', 
    callsCompleted: 45, 
    avgResponseTime: 35, 
    customerRating: 4.7, 
    revenue: 10800,
    efficiency: 92 
  },
  { 
    name: 'David Brown', 
    callsCompleted: 44, 
    avgResponseTime: 33, 
    customerRating: 4.8, 
    revenue: 9850,
    efficiency: 89 
  },
  { 
    name: 'Maria Garcia', 
    callsCompleted: 43, 
    avgResponseTime: 29, 
    customerRating: 4.9, 
    revenue: 8380,
    efficiency: 95 
  },
  {
    name: 'Priya Shah',
    callsCompleted: 39,
    avgResponseTime: 34,
    customerRating: 4.8,
    revenue: 14220,
    efficiency: 93
  },
  {
    name: 'Nate Coleman',
    callsCompleted: 36,
    avgResponseTime: 26,
    customerRating: 4.6,
    revenue: 7640,
    efficiency: 91
  },
  {
    name: 'Elena Vasquez',
    callsCompleted: 41,
    avgResponseTime: 30,
    customerRating: 4.9,
    revenue: 11870,
    efficiency: 97
  },
];

const customerFeedback = [
  { 
    customer: 'John Smith', 
    rating: 5, 
    service: 'Installation', 
    feedback: 'Excellent service, very professional team',
    date: '2025-01-15'
  },
  { 
    customer: 'Sarah Johnson', 
    rating: 4, 
    service: 'Repair', 
    feedback: 'Quick response time, good quality work',
    date: '2025-01-14'
  },
  { 
    customer: 'Michael Brown', 
    rating: 5, 
    service: 'Maintenance', 
    feedback: 'Thorough inspection and maintenance',
    date: '2025-01-13'
  },
  { 
    customer: 'Emily Davis', 
    rating: 4, 
    service: 'Emergency', 
    feedback: 'Fast emergency response, helpful staff',
    date: '2025-01-12'
  },
  {
    customer: 'Jennifer Lee',
    rating: 5,
    service: 'Opener Upgrade',
    feedback: 'myQ was working before the tech left the driveway',
    date: '2026-09-30'
  },
  {
    customer: 'Daniel Okonkwo',
    rating: 5,
    service: 'Commercial',
    feedback: 'Bay door was back online the same afternoon',
    date: '2026-10-07'
  },
  {
    customer: 'Lisa Anderson',
    rating: 5,
    service: 'Maintenance',
    feedback: 'Invoice matched the rental-property checklist',
    date: '2026-10-06'
  },
];

const equipmentLogs = [
  { 
    equipment: 'Hydraulic Lift #1', 
    lastMaintenance: '2025-01-10', 
    nextDue: '2025-02-10', 
    status: 'Good',
    technician: 'Alex Rodriguez'
  },
  { 
    equipment: 'Diagnostic Scanner #2', 
    lastMaintenance: '2025-01-08', 
    nextDue: '2025-02-08', 
    status: 'Needs Attention',
    technician: 'Carlos Mendez'
  },
  { 
    equipment: 'Air Compressor #1', 
    lastMaintenance: '2025-01-05', 
    nextDue: '2025-02-05', 
    status: 'Good',
    technician: 'Jessica Taylor'
  },
  { 
    equipment: 'Tool Set #3', 
    lastMaintenance: '2025-01-03', 
    nextDue: '2025-02-03', 
    status: 'Excellent',
    technician: 'David Brown'
  },
];

export function ReportsTab() {
  const [dateRange, setDateRange] = useState<{from: Date | undefined, to: Date | undefined}>({
    from: new Date(2025, 0, 1),
    to: new Date()
  });

  const handleExport = (reportType: string) => {
    // Simulate export functionality
    console.log(`Exporting ${reportType} report...`);
  };

  return (
    <div className="space-y-6">
      {/* Date Range Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Report Generator
          </CardTitle>
          <CardDescription>
            Select date range and generate comprehensive reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex gap-2">
              <DatePicker 
                label="From Date" 
                date={dateRange.from} 
                onDateChange={(date) => setDateRange(prev => ({...prev, from: date}))} 
              />
              <DatePicker 
                label="To Date" 
                date={dateRange.to} 
                onDateChange={(date) => setDateRange(prev => ({...prev, to: date}))} 
              />
            </div>
            <Button onClick={() => handleExport('custom-range')}>
              <Download className="mr-2 h-4 w-4" />
              Export All Reports
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports Tabs */}
      <Tabs defaultValue="summary" className="space-y-4">
        <div className="overflow-x-auto pb-1">
        <TabsList className="h-auto w-max min-w-full justify-start bg-slate-950/60">
          <TabsTrigger value="summary">Service Summary</TabsTrigger>
          <TabsTrigger value="performance">Technician Performance</TabsTrigger>
          <TabsTrigger value="feedback">Customer Feedback</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="equipment">Equipment Logs</TabsTrigger>
        </TabsList>
        </div>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Monthly Service Summary</CardTitle>
                <CardDescription>Comprehensive overview of service operations</CardDescription>
              </div>
              <Button variant="outline" onClick={() => handleExport('service-summary')}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Total Service Calls</p>
                  <p className="text-2xl font-bold">{monthlyServiceSummary.totalCalls}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Completed Calls</p>
                  <p className="text-2xl font-bold text-green-600">{monthlyServiceSummary.completedCalls}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                  <p className="text-2xl font-bold">{monthlyServiceSummary.averageTime} min</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold text-green-600">${monthlyServiceSummary.revenue.toLocaleString()}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-3">Top Services</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service Type</TableHead>
                      <TableHead>Count</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Percentage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monthlyServiceSummary.topServices.map((service, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{service.service}</TableCell>
                        <TableCell>{service.count}</TableCell>
                        <TableCell>${service.revenue.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {((service.count / monthlyServiceSummary.totalCalls) * 100).toFixed(1)}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Technician Performance Metrics
                </CardTitle>
                <CardDescription>Individual performance analysis and rankings</CardDescription>
              </div>
              <Button variant="outline" onClick={() => handleExport('performance')}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Technician</TableHead>
                    <TableHead>Calls Completed</TableHead>
                    <TableHead>Avg Response Time</TableHead>
                    <TableHead>Customer Rating</TableHead>
                    <TableHead>Revenue Generated</TableHead>
                    <TableHead>Efficiency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {technicianPerformance.map((tech, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{tech.name}</TableCell>
                      <TableCell>{tech.callsCompleted}</TableCell>
                      <TableCell>{tech.avgResponseTime} min</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {tech.customerRating}
                        </div>
                      </TableCell>
                      <TableCell>${tech.revenue.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={tech.efficiency >= 95 ? "default" : tech.efficiency >= 90 ? "secondary" : "destructive"}
                          className={tech.efficiency >= 95 ? "bg-green-500 hover:bg-green-600" : ""}
                        >
                          {tech.efficiency}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Customer Feedback Analysis
                </CardTitle>
                <CardDescription>Recent customer reviews and satisfaction ratings</CardDescription>
              </div>
              <Button variant="outline" onClick={() => handleExport('feedback')}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Feedback</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customerFeedback.map((feedback, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{feedback.customer}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {[...Array(feedback.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          {[...Array(5 - feedback.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-gray-300" />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{feedback.service}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{feedback.feedback}</TableCell>
                      <TableCell>{feedback.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Revenue Breakdown by Service Type
                </CardTitle>
                <CardDescription>Detailed financial analysis and profit margins</CardDescription>
              </div>
              <Button variant="outline" onClick={() => handleExport('revenue')}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service Type</TableHead>
                    <TableHead>Total Revenue</TableHead>
                    <TableHead>Number of Jobs</TableHead>
                    <TableHead>Average Job Value</TableHead>
                    <TableHead>Profit Margin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthlyServiceSummary.topServices.map((service, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{service.service}</TableCell>
                      <TableCell>${service.revenue.toLocaleString()}</TableCell>
                      <TableCell>{service.count}</TableCell>
                      <TableCell>${(service.revenue / service.count).toFixed(0)}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {(Math.random() * 20 + 15).toFixed(1)}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Equipment Maintenance Logs
                </CardTitle>
                <CardDescription>Equipment status and maintenance schedules</CardDescription>
              </div>
              <Button variant="outline" onClick={() => handleExport('equipment')}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Equipment</TableHead>
                    <TableHead>Last Maintenance</TableHead>
                    <TableHead>Next Due</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned Technician</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {equipmentLogs.map((equipment, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{equipment.equipment}</TableCell>
                      <TableCell>{equipment.lastMaintenance}</TableCell>
                      <TableCell>{equipment.nextDue}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            equipment.status === 'Excellent' ? "default" :
                            equipment.status === 'Good' ? "secondary" :
                            "destructive"
                          }
                          className={equipment.status === 'Excellent' ? "bg-green-500 hover:bg-green-600" : ""}
                        >
                          {equipment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{equipment.technician}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface DatePickerProps {
  label: string;
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

function DatePicker({ label, date, onDateChange }: DatePickerProps) {
  return (
    <div className="flex flex-col space-y-2">
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[200px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}