import { useState } from 'react';
import { Layout } from '../ui-layout/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Search, 
  Plus, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  DollarSign,
  History,
  UserPlus
} from 'lucide-react';
import { format } from 'date-fns';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  status: 'Active' | 'Inactive' | 'VIP';
  totalSpent: number;
  lastService: string;
  nextMaintenance?: string;
  serviceCount: number;
  notes?: string;
  joinDate: string;
  customerSince: string;
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    address: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    status: 'VIP',
    totalSpent: 4850.00,
    lastService: '2025-01-10',
    nextMaintenance: '2025-03-15',
    serviceCount: 8,
    notes: 'VIP customer - always requests Alex Rodriguez. Prefers morning appointments.',
    joinDate: '2023-05-15',
    customerSince: '1 year 8 months'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 234-5678',
    address: '456 Oak Avenue',
    city: 'Oakland',
    state: 'CA',
    zip: '94610',
    status: 'Active',
    totalSpent: 2340.00,
    lastService: '2025-01-08',
    nextMaintenance: '2025-04-08',
    serviceCount: 5,
    notes: 'Has two dogs - ring doorbell instead of knocking.',
    joinDate: '2022-09-12',
    customerSince: '2 years 4 months'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    phone: '(555) 345-6789',
    address: '789 Pine Road',
    city: 'Berkeley',
    state: 'CA',
    zip: '94704',
    status: 'Active',
    totalSpent: 1890.00,
    lastService: '2024-12-15',
    nextMaintenance: '2025-06-15',
    serviceCount: 3,
    notes: 'Works from home - any time is convenient.',
    joinDate: '2024-06-20',
    customerSince: '7 months'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '(555) 456-7890',
    address: '321 Cedar Lane',
    city: 'San Mateo',
    state: 'CA',
    zip: '94401',
    status: 'Inactive',
    totalSpent: 620.00,
    lastService: '2024-08-30',
    serviceCount: 2,
    notes: 'Customer moved - update address if they contact us.',
    joinDate: '2021-03-15',
    customerSince: '3 years 10 months'
  },
  {
    id: '5',
    name: 'Robert Wilson',
    email: 'robert.wilson@email.com',
    phone: '(555) 567-8901',
    address: '654 Elm Street',
    city: 'San Jose',
    state: 'CA',
    zip: '95112',
    status: 'Active',
    totalSpent: 3200.00,
    lastService: '2025-01-05',
    nextMaintenance: '2025-02-20',
    serviceCount: 6,
    notes: 'Prefers weekend appointments. Emergency contact: (555) 567-8902',
    joinDate: '2022-11-08',
    customerSince: '2 years 2 months'
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@email.com',
    phone: '(555) 678-9012',
    address: '987 Maple Drive',
    city: 'Fremont',
    state: 'CA',
    zip: '94536',
    status: 'VIP',
    totalSpent: 6750.00,
    lastService: '2025-01-12',
    nextMaintenance: '2025-03-10',
    serviceCount: 12,
    notes: 'Business owner - prefers detailed invoices. Multiple properties.',
    joinDate: '2021-08-22',
    customerSince: '3 years 5 months'
  },
  {
    id: '7',
    name: 'James Martinez',
    email: 'james.martinez@email.com',
    phone: '(555) 789-0123',
    address: '159 Birch Avenue',
    city: 'Hayward',
    state: 'CA',
    zip: '94541',
    status: 'Active',
    totalSpent: 1450.00,
    lastService: '2024-12-20',
    nextMaintenance: '2025-04-20',
    serviceCount: 4,
    notes: 'Senior citizen discount applied. Prefers technician Carlos.',
    joinDate: '2023-02-14',
    customerSince: '1 year 11 months'
  },
  {
    id: '8',
    name: 'Jennifer Lee',
    email: 'jennifer.lee@email.com',
    phone: '(555) 890-1234',
    address: '753 Walnut Street',
    city: 'Mountain View',
    state: 'CA',
    zip: '94041',
    status: 'Active',
    totalSpent: 2890.00,
    lastService: '2025-01-03',
    nextMaintenance: '2025-05-03',
    serviceCount: 7,
    notes: 'Tech-savvy customer. Prefers text communication and smart home integrations.',
    joinDate: '2022-07-19',
    customerSince: '2 years 6 months'
  }
];

export function CustomerManager() {
  const [customers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VIP': return 'bg-purple-500 hover:bg-purple-600 text-white';
      case 'Active': return 'bg-green-500 hover:bg-green-600 text-white';
      case 'Inactive': return 'bg-gray-500 hover:bg-gray-600 text-white';
      default: return 'bg-gray-500 hover:bg-gray-600 text-white';
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = searchTerm === '' || 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'totalSpent': return b.totalSpent - a.totalSpent;
      case 'lastService': return new Date(b.lastService).getTime() - new Date(a.lastService).getTime();
      default: return 0;
    }
  });

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'Active').length;
  const vipCustomers = customers.filter(c => c.status === 'VIP').length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Customer Management</h2>
            <p className="text-muted-foreground">
              Manage customer profiles, service history, and preferences
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">Customer form would go here...</p>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCustomers}</div>
              <p className="text-xs text-muted-foreground">Registered customers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
              <Badge className="bg-green-500 hover:bg-green-600">{activeCustomers}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeCustomers}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">VIP Customers</CardTitle>
              <Badge className="bg-purple-500 hover:bg-purple-600">{vipCustomers}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{vipCustomers}</div>
              <p className="text-xs text-muted-foreground">Premium tier</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Customer lifetime value</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Search and Filter</CardTitle>
            <CardDescription>Find and manage customer information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2 flex-1">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="sm:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="VIP">VIP</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="sm:w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="totalSpent">Total Spent</SelectItem>
                  <SelectItem value="lastService">Last Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Directory</CardTitle>
            <CardDescription>Complete list of all customers with service details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Service History</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Last Service</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-12">
                        <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-lg font-medium text-muted-foreground">No customers found</p>
                        <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCustomers.map((customer) => (
                      <TableRow key={customer.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={`/placeholder-user.jpg`} />
                              <AvatarFallback>
                                {customer.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{customer.name}</div>
                              <div className="text-sm text-muted-foreground">
                                Customer for {customer.customerSince}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              {customer.email}
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              {customer.phone}
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="flex items-start gap-1">
                            <MapPin className="h-3 w-3 text-muted-foreground mt-0.5" />
                            <div className="text-sm">
                              <div>{customer.address}</div>
                              <div className="text-muted-foreground">
                                {customer.city}, {customer.state} {customer.zip}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <Badge className={getStatusColor(customer.status)}>
                            {customer.status}
                          </Badge>
                        </TableCell>
                        
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              <History className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm font-medium">
                                {customer.serviceCount} services
                              </span>
                            </div>
                            {customer.nextMaintenance && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                Next: {customer.nextMaintenance}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="font-medium text-green-600">
                            ${customer.totalSpent.toLocaleString()}
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="text-sm">
                            {format(new Date(customer.lastService), 'MMM d, yyyy')}
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                            <Button variant="ghost" size="sm">
                              Schedule Service
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}